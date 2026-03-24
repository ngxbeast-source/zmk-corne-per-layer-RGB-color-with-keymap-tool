// _extract_lines.js — Run with: node _extract_lines.js
// (If Node.js is not available, use _extract_lines.ps1 instead)
// Scans RGB_Code_Helper.html and prints every landmark line number
// that the RefDoc references. Output is a ready-to-use mapping table.

var fs = require('fs');
var path = require('path');

var htmlPath = path.join(__dirname, '..', 'RGB_Code_Helper.html');
var lines = fs.readFileSync(htmlPath, 'utf8').split('\n');
var totalLines = lines.length;

// ── helpers ──────────────────────────────────────────────────────
function findLine(pattern, startFrom) {
  var from = (startFrom || 1) - 1;
  for (var i = from; i < lines.length; i++) {
    if (typeof pattern === 'string' ? lines[i].indexOf(pattern) !== -1 : pattern.test(lines[i])) {
      return i + 1; // 1-based
    }
  }
  return null;
}

function findAllLines(pattern) {
  var results = [];
  for (var i = 0; i < lines.length; i++) {
    if (typeof pattern === 'string' ? lines[i].indexOf(pattern) !== -1 : pattern.test(lines[i])) {
      results.push(i + 1);
    }
  }
  return results;
}

// ── structural markers ───────────────────────────────────────────
var structural = {
  '<style>':       findLine('<style>'),
  '<body':         findLine('<body'),
  '<script>':      findLine('<script>'),
  '</html>':       findLine('</html>', totalLines - 5),
};

// ── global vars (top of script section) ──────────────────────────
var scriptLine = structural['<script>'] || 1;
var globalVars = {};
var gvPatterns = [
  'var layers ',        'var macros ',        'var behaviors ',
  'var combos ',        'var blinkMacros ',   'var dtsiNativeBehaviors ',
  'var colorValueMap ', 'var colorLabelMap ',
  'var keymapLayers ',  'var keymapCombos ',  'var keymapMacros ',
  'var keymapBehaviors ','var keymapConditionalLayers ',
  'var keymapSensorBindings ', 'var keyboardLayout ',
  'var currentLayoutId ',
  'var activeLayerIndex ', 'var selectedKeyIndex ',
  'var editingComboIndex ','var editingMacroIndex ','var editingBehaviorIndex ',
  'var comboSelectedPositions ', 'var rgbComboSelectedPositions ',
  'var rgbEditingComboIndex ',
  'var keymapParsedIncludes ', 'var keymapParsedHeaderLines ',
  'var keymapParsedRawBlocks ',
  'var undoStack ', 'var redoStack ', 'var UNDO_LIMIT ',
];
gvPatterns.forEach(function(p) {
  var ln = findLine(p, scriptLine);
  if (ln) globalVars[p.trim()] = ln;
});

// ── named constants / objects ────────────────────────────────────
var constants = {};
var cPatterns = [
  'var DEFAULT_CORNE_LAYOUT',  'var DEFAULT_LOTUS58_LAYOUT',
  'var ZMK_KEYCODES',          'var ZMK_BEHAVIORS',
  'var BT_ACTIONS',            'var RGB_ACTIONS',
  'var OUT_ACTIONS',           'var BL_ACTIONS',
  'var EP_ACTIONS',
  'var MOUSE_BUTTONS',         'var MOUSE_MOVES',
  'var MOUSE_SCROLLS',
  'var BUILTIN_BEHAVIORS',     'var QA_KEYBOARD_MAP',
  'var colorRe ',
  'var behPositionalSelectedPositions',
];
cPatterns.forEach(function(p) {
  var ln = findLine(p, scriptLine);
  if (ln) constants[p.replace('var ', '').trim()] = ln;
});

// ── all function declarations ────────────────────────────────────
var funcRe = /^\s*function\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*\(/;
var functions = {};
for (var i = 0; i < lines.length; i++) {
  var m = funcRe.exec(lines[i]);
  if (m) functions[m[1]] = i + 1;
}

// ── DOMContentLoaded ─────────────────────────────────────────────
var domReady = findLine("document.addEventListener('DOMContentLoaded'", scriptLine)
            || findLine('document.addEventListener("DOMContentLoaded"', scriptLine);

// ── OUTPUT ───────────────────────────────────────────────────────
console.log('=== RGB_Code_Helper.html — Line Number Extract ===');
console.log('Total lines: ' + totalLines);
console.log('');

console.log('── STRUCTURAL ──');
Object.keys(structural).forEach(function(k) {
  console.log('  ' + k.padEnd(12) + ' → L' + structural[k]);
});

console.log('\n── GLOBAL VARS ──');
Object.keys(globalVars).sort(function(a,b){ return globalVars[a]-globalVars[b]; }).forEach(function(k) {
  console.log('  ' + k.padEnd(40) + ' → L' + globalVars[k]);
});

console.log('\n── NAMED CONSTANTS ──');
Object.keys(constants).sort(function(a,b){ return constants[a]-constants[b]; }).forEach(function(k) {
  console.log('  ' + k.padEnd(40) + ' → L' + constants[k]);
});

console.log('\n── ALL FUNCTIONS ──');
var sortedFns = Object.keys(functions).sort(function(a,b){ return functions[a]-functions[b]; });
sortedFns.forEach(function(name) {
  console.log('  ' + name.padEnd(40) + ' → L' + functions[name]);
});

console.log('\n── EVENT HANDLERS ──');
console.log('  DOMContentLoaded'.padEnd(40) + ' → L' + domReady);

console.log('\n── SECTION RANGE ESTIMATES ──');
// Compute ranges: each section starts at its first landmark, ends before the next section starts
var sectionLandmarks = {
  'S2  File Structure':  [structural['<style>'], structural['</html>']],
  'S2  CSS':             [structural['<style>'], structural['<body'] - 1],
  'S2  HTML':            [structural['<body'], structural['<script>'] - 1],
  'S2  JavaScript':      [structural['<script>'] + 1, structural['</html>'] - 2],
  'S3  Global Data':     [globalVars['var layers '] || '?', globalVars['var UNDO_LIMIT '] || '?'],
  'S4  Undo/Redo':       [functions['snapshotState'] || '?', (constants['DEFAULT_CORNE_LAYOUT'] || 0) - 1],
  'S5  Layouts':         [constants['DEFAULT_CORNE_LAYOUT'] || '?', (constants['ZMK_KEYCODES'] || 0) - 1],
  'S6  Keycodes/Beh':    [constants['ZMK_KEYCODES'] || '?', (constants['BUILTIN_BEHAVIORS'] || 0) - 1],
  'S7  Colors':          [functions['hsbToHex'] || '?', (functions['ensureHsbPicker'] || 0) - 1],
  'S8  HSB Picker':      [functions['ensureHsbPicker'] || '?', (functions['layerOptionsHTML'] || 0) - 1],
  'S9  RGB Helpers':     [functions['layerOptionsHTML'] || '?', (functions['parseUserCode'] || 0) - 1],
  'S10 Parser':          [functions['parseUserCode'] || '?', (functions['rgbRenderAll'] || 0) - 1],
  'S11 RGB Rendering':   [functions['rgbRenderAll'] || '?', (functions['updateRgbOutput'] || 0) - 1],
  'S12 RGB Output':      [functions['updateRgbOutput'] || '?', (functions['loadLayout'] || 0) - 1],
  'S13 SVG':             [functions['loadLayout'] || '?', (functions['bindingToLabels'] || 0) - 1],
  'S14 Binding Labels':  [functions['bindingToLabels'] || '?', (functions['parseKeymap'] || 0) - 1],
  'S15 Keymap Parser':   [functions['parseKeymap'] || '?', (functions['renderLayerTabs'] || 0) - 1],
  'S16 Layer Tabs':      [functions['renderLayerTabs'] || '?', (functions['populateKeycodeGrids'] || 0) - 1],
  'S17 Binding Editor':  [functions['populateKeycodeGrids'] || '?', (functions['renderComboMiniKb'] || 0) - 1],
  'S18 Combo/Macro/Beh': [functions['renderComboMiniKb'] || '?', constants['QA_KEYBOARD_MAP'] || '?'],
  'S19 Quick-Assign':    [constants['QA_KEYBOARD_MAP'] || '?', (functions['updateKeymapOutput'] || 0) - 1],
  'S20 Keymap Output':   [functions['updateKeymapOutput'] || '?', (functions['generateBehaviorCode'] || 0) - 1],
  'S21 Beh Code Gen':    [functions['generateBehaviorCode'] || '?', (functions['syncCrossTabData'] || 0) - 1],
  'S22 Cross-Tab Sync':  [functions['syncCrossTabData'] || '?', (functions['fuzzyMatch'] || functions['openValuePicker'] || 0) - 1],
  'S23 Value Picker':    [functions['openValuePicker'] || '?', (functions['switchTab'] || 0) - 1],
  'S24 Tab/DarkMode':    [functions['switchTab'] || '?', domReady - 1],
  'S25 DOMContentLoaded': [domReady, structural['</html>'] - 2],
};
Object.keys(sectionLandmarks).forEach(function(sec) {
  var r = sectionLandmarks[sec];
  console.log('  ' + sec.padEnd(25) + ' → L' + r[0] + '-L' + r[1]);
});

console.log('\nDone.');
