
// ================================================================
// SECTION: SHARED DATA MODEL
// These arrays hold ALL tool data. Think of them as notebooks:
// each one stores a list of items the user has created or parsed.
// The RGB tab and Keymap tab each have their own set of notebooks.
// More on this code can be found in 'RefDoc' line 105
// ================================================================

// --- RGB Tab data (filled when you parse .dtsi code) ---
var layers = [];            // Each entry: { name, index, h, s, b, label } â€” one per keyboard layer
var macros = [];            // RGB macro definitions (MOMENTARY_RGB_MACRO, etc.)
var behaviors = [];         // RGB tab behavior references
var combos = [];            // RGB tab combo definitions
var blinkMacros = [];       // Blink macro LED sequences
var dtsiNativeBehaviors = []; // Native ZMK behaviors found in .dtsi (like &hm, &ltq, &td_numcaps)
var colorValueMap = {};       // Lookup table: color name â†’ { h, s, b } values
var colorLabelMap = {};       // Lookup table: color name â†’ display label string

// --- Keymap Tab data (filled when you parse a .keymap file) ---
// The keymap tab data is separate from RGB data. They are synced via
// syncCrossTabData() (line 4302) and syncRgbToKeymap() (line 4361).
var keymapLayers = [];    // Each layer: { name, displayName, bindings: string[], status }
var keymapCombos = [];    // Each combo: { name, binding, positions: number[], layers, timeout }
var keymapMacros = [];    // { name, label, steps: string[], paramType: 0|1|2, waitMs, tapMs }
var keymapBehaviors = []; // { name, type, label, config }
var keymapConditionalLayers = []; // { name, ifLayers: number[], thenLayer: number }
var keymapSensorBindings = [];    // Encoder rotation bindings: { layerIndex, bindings[] } per layer
var keyboardLayout = null; // Physical key positions from layout JSON (used by SVG renderer, line 2247)

// --- UI State: tracks what the user is currently doing ---
var activeLayerIndex = 0;     // Which layer tab is selected (0 = first layer)
var selectedKeyIndex = -1;    // Which key is being edited (-1 = none selected)
var editingComboIndex = -1;
var editingMacroIndex = -1;
var editingBehaviorIndex = -1;
var comboSelectedPositions = [];
var rgbComboSelectedPositions = [];
var rgbEditingComboIndex = -1;
var keymapParsedIncludes = null; // Saved #include lines from the .keymap file (null = use defaults)
var keymapParsedRawBlocks = null; // Raw devicetree blocks before the keymap{} (preserved in output)

// ================================================================
// SECTION: UNDO/REDO SYSTEM
// Works like a camera: before each edit, take a "snapshot" of all data.
// If you undo, load the previous snapshot. If you redo, go forward again.
// More on this code can be found in 'RefDoc' line 165
// ================================================================
var undoStack = [];      // Array of past snapshots (up to UNDO_LIMIT)
var redoStack = [];      // Array of "undone" snapshots (for redo)
var UNDO_LIMIT = 50;    // Maximum undo steps saved
// snapshotState() â€” Takes a "photo" of all keymap data right now.
// Uses .slice() to make copies of arrays so future changes don't
// affect the saved snapshot. Returns a plain object with everything.
function snapshotState() {
  return {
    layers: keymapLayers.map(function(l) {
      return { name: l.name, displayName: l.displayName, bindings: l.bindings.slice(), status: l.status };
    }),
    combos: keymapCombos.map(function(c) {
      return { name: c.name, binding: c.binding, positions: c.positions.slice(), layers: c.layers, timeout: c.timeout };
    }),
    macros: keymapMacros.map(function(m) {
      return { name: m.name, label: m.label, steps: m.steps.slice(), paramType: m.paramType, waitMs: m.waitMs, tapMs: m.tapMs, _fromRgb: m._fromRgb };
    }),
    behaviors: keymapBehaviors.map(function(b) {
      var cfg = {};
      for (var k in b.config) cfg[k] = b.config[k];
      return { name: b.name, type: b.type, label: b.label, config: cfg, _fromRgb: b._fromRgb, _fromDtsi: b._fromDtsi };
    }),
    condLayers: keymapConditionalLayers.map(function(c) {
      return { name: c.name, ifLayers: c.ifLayers.slice(), thenLayer: c.thenLayer };
    }),
    sensors: keymapSensorBindings.map(function(s) {
      return { layerIndex: s.layerIndex, bindings: s.bindings.slice() };
    }),
    activeLayerIndex: activeLayerIndex
  };
}
// restoreState(snap) â€” Loads a previous snapshot back into the
// global arrays, replacing current data. Used by undo and redo.
function restoreState(snap) {
  keymapLayers = snap.layers.map(function(l) {
    return { name: l.name, displayName: l.displayName, bindings: l.bindings.slice(), status: l.status };
  });
  keymapCombos = snap.combos.map(function(c) {
    return { name: c.name, binding: c.binding, positions: c.positions.slice(), layers: c.layers, timeout: c.timeout };
  });
  keymapMacros = snap.macros.map(function(m) {
    return { name: m.name, label: m.label, steps: m.steps.slice(), paramType: m.paramType, waitMs: m.waitMs, tapMs: m.tapMs, _fromRgb: m._fromRgb };
  });
  keymapBehaviors = snap.behaviors.map(function(b) {
    var cfg = {};
    for (var k in b.config) cfg[k] = b.config[k];
    return { name: b.name, type: b.type, label: b.label, config: cfg, _fromRgb: b._fromRgb, _fromDtsi: b._fromDtsi };
  });
  keymapConditionalLayers = snap.condLayers.map(function(c) {
    return { name: c.name, ifLayers: c.ifLayers.slice(), thenLayer: c.thenLayer };
  });
  keymapSensorBindings = snap.sensors.map(function(s) {
    return { layerIndex: s.layerIndex, bindings: s.bindings.slice() };
  });
  activeLayerIndex = snap.activeLayerIndex;
  if (activeLayerIndex >= keymapLayers.length) activeLayerIndex = Math.max(0, keymapLayers.length - 1);
}
// pushUndo() â€” Call this BEFORE making a change to save the current
// state. If the stack gets too big, it drops the oldest entry.
// Clears redo stack because new edits invalidate old redos.
function pushUndo() {
  undoStack.push(snapshotState());
  if (undoStack.length > UNDO_LIMIT) undoStack.shift();
  redoStack = [];
  updateUndoRedoBtns();
}
// fullRender() â€” Redraws ALL of the keymap tab's UI from scratch.
// Resets selection state, hides all editors, then calls every
// render function in sequence. Called after undo/redo/parse.
function fullRender() {
  selectedKeyIndex = -1;
  editingComboIndex = -1;
  editingMacroIndex = -1;
  editingBehaviorIndex = -1;
  editingCondLayerIndex = -1;
  editingSensorIndex = -1;
  document.getElementById('bindingEditor').classList.remove('visible');
  var kmComboEd = document.getElementById('kmComboEditor'); if (kmComboEd) kmComboEd.style.display = 'none';
  var kmMacroEd = document.getElementById('kmMacroEditor'); if (kmMacroEd) kmMacroEd.style.display = 'none';
  var kmBehEd = document.getElementById('kmBehaviorEditor'); if (kmBehEd) kmBehEd.style.display = 'none';
  var kmCondEd = document.getElementById('kmCondLayerEditor'); if (kmCondEd) kmCondEd.style.display = 'none';
  var sensorOverlay = document.getElementById('sensorModalOverlay'); if (sensorOverlay) sensorOverlay.style.display = 'none';
  renderLayerTabs();
  renderKeyboardSvg('keyboardSvg');
  renderKeymapComboList();
  renderKeymapMacroList();
  renderKeymapBehaviorList();
  renderKeymapCondLayerList();
  renderKeymapSensorList();
  populateBehaviorDropdown();
  updateKeymapOutput();
  updateUndoRedoBtns();
}
function performUndo() {
  if (undoStack.length === 0) return;
  redoStack.push(snapshotState());
  restoreState(undoStack.pop());
  fullRender();
}
function performRedo() {
  if (redoStack.length === 0) return;
  undoStack.push(snapshotState());
  restoreState(redoStack.pop());
  fullRender();
}
function updateUndoRedoBtns() {
  var ub = document.getElementById('kmUndoBtn');
  var rb = document.getElementById('kmRedoBtn');
  if (ub) ub.disabled = undoStack.length === 0;
  if (rb) rb.disabled = redoStack.length === 0;
}

// ================================================================
// SECTION: DEFAULT KEYBOARD LAYOUTS
// These hardcoded objects describe the physical key positions of each
// keyboard. Each key has a row, column, x, and y coordinate that the
// SVG renderer (renderKeyboardSvg, line 2260) uses to draw the keys.
// If no layout JSON is uploaded, these defaults are used.
// More on this code can be found in 'RefDoc' line 215
// ================================================================
var DEFAULT_CORNE_LAYOUT = {
  "id": "corne",
  "layouts": {
    "default_layout": {
      "layout": [
        {"row":0,"col":0,"x":0,"y":1.05},{"row":0,"col":1,"x":1,"y":1.05},{"row":0,"col":2,"x":2,"y":0.35},
        {"row":0,"col":3,"x":3,"y":0},{"row":0,"col":4,"x":4,"y":0.3},{"row":0,"col":5,"x":5,"y":0.45},
        {"row":0,"col":6,"x":9,"y":0.45},{"row":0,"col":7,"x":10,"y":0.3},{"row":0,"col":8,"x":11,"y":0},
        {"row":0,"col":9,"x":12,"y":0.35},{"row":0,"col":10,"x":13,"y":1.05},{"row":0,"col":11,"x":14,"y":1.05},
        {"row":1,"col":0,"x":0,"y":2.05},{"row":1,"col":1,"x":1,"y":2.05},{"row":1,"col":2,"x":2,"y":1.35},
        {"row":1,"col":3,"x":3,"y":1},{"row":1,"col":4,"x":4,"y":1.3},{"row":1,"col":5,"x":5,"y":1.45},
        {"row":1,"col":6,"x":9,"y":1.45},{"row":1,"col":7,"x":10,"y":1.3},{"row":1,"col":8,"x":11,"y":1},
        {"row":1,"col":9,"x":12,"y":1.35},{"row":1,"col":10,"x":13,"y":2.05},{"row":1,"col":11,"x":14,"y":2.05},
        {"row":2,"col":0,"x":0,"y":3.05},{"row":2,"col":1,"x":1,"y":3.05},{"row":2,"col":2,"x":2,"y":2.35},
        {"row":2,"col":3,"x":3,"y":2},{"row":2,"col":4,"x":4,"y":2.3},{"row":2,"col":5,"x":5,"y":2.45},
        {"row":2,"col":6,"x":9,"y":2.45},{"row":2,"col":7,"x":10,"y":2.3},{"row":2,"col":8,"x":11,"y":2},
        {"row":2,"col":9,"x":12,"y":2.35},{"row":2,"col":10,"x":13,"y":3.05},{"row":2,"col":11,"x":14,"y":3.05},
        {"row":3,"col":3,"x":3.9,"y":3.4,"r":0,"rx":0,"ry":0},
        {"row":3,"col":4,"x":4.85,"y":2.3,"r":13,"rx":0,"ry":4.25},
        {"row":3,"col":5,"x":5.3,"y":1,"r":26,"rx":0,"ry":4.6},
        {"row":3,"col":6,"x":8.15,"y":3.4,"r":-26,"rx":9.5,"ry":4.6},
        {"row":3,"col":7,"x":9.05,"y":3.3,"r":-13,"rx":10.5,"ry":4.25},
        {"row":3,"col":8,"x":10.1,"y":3.4,"r":0,"rx":0,"ry":0}
      ]
    }
  }
};

// ================================================
// DEFAULT LOTUS58 LAYOUT (60 keys: 58 + 2 encoder push buttons per side)
// Binding order matches ZMK: rows 0-1 (12 keys each), rows 2-3 (14 keys, with encoder push),
// row 4 (8 thumb keys). Encoder rotation handled via sensor-bindings, not in layout.
// ================================================
var DEFAULT_LOTUS58_LAYOUT = {
  "id": "lotus58",
  "layouts": {
    "default_layout": {
      "layout": [
        // Row 0: 6L + 6R = 12 keys (indices 0-11) â€” number row, no encoders
        {"row":0,"col":0,"x":0,"y":0.75},{"row":0,"col":1,"x":1,"y":0.5},{"row":0,"col":2,"x":2,"y":0.25},
        {"row":0,"col":3,"x":3,"y":0},{"row":0,"col":4,"x":4,"y":0.25},{"row":0,"col":5,"x":5,"y":0.5},
        {"row":0,"col":10,"x":9,"y":0.5},{"row":0,"col":11,"x":10,"y":0.25},{"row":0,"col":12,"x":11,"y":0},
        {"row":0,"col":13,"x":12,"y":0.25},{"row":0,"col":14,"x":13,"y":0.5},{"row":0,"col":15,"x":14,"y":0.75},
        // Row 1: 6L + 6R = 12 keys (indices 12-23) â€” QWERTY row
        {"row":1,"col":0,"x":0,"y":1.75},{"row":1,"col":1,"x":1,"y":1.5},{"row":1,"col":2,"x":2,"y":1.25},
        {"row":1,"col":3,"x":3,"y":1},{"row":1,"col":4,"x":4,"y":1.25},{"row":1,"col":5,"x":5,"y":1.5},
        {"row":1,"col":10,"x":9,"y":1.5},{"row":1,"col":11,"x":10,"y":1.25},{"row":1,"col":12,"x":11,"y":1},
        {"row":1,"col":13,"x":12,"y":1.25},{"row":1,"col":14,"x":13,"y":1.5},{"row":1,"col":15,"x":14,"y":1.75},
        // Row 2: 6L + 2 encoder push + 6R = 14 keys (indices 24-37) â€” home row + top encoder buttons
        {"row":2,"col":0,"x":0,"y":2.75},{"row":2,"col":1,"x":1,"y":2.5},{"row":2,"col":2,"x":2,"y":2.25},
        {"row":2,"col":3,"x":3,"y":2},{"row":2,"col":4,"x":4,"y":2.25},{"row":2,"col":5,"x":5,"y":2.5},
        {"row":2,"col":6,"x":6.5,"y":2},{"row":2,"col":9,"x":7.5,"y":2},
        {"row":2,"col":10,"x":9,"y":2.5},{"row":2,"col":11,"x":10,"y":2.25},{"row":2,"col":12,"x":11,"y":2},
        {"row":2,"col":13,"x":12,"y":2.25},{"row":2,"col":14,"x":13,"y":2.5},{"row":2,"col":15,"x":14,"y":2.75},
        // Row 3: 6L + 2 encoder push + 6R = 14 keys (indices 38-51) â€” bottom row + lower encoder buttons
        {"row":3,"col":0,"x":0,"y":3.75},{"row":3,"col":1,"x":1,"y":3.5},{"row":3,"col":2,"x":2,"y":3.25},
        {"row":3,"col":3,"x":3,"y":3},{"row":3,"col":4,"x":4,"y":3.25},{"row":3,"col":5,"x":5,"y":3.5},
        {"row":3,"col":6,"x":6,"y":3},{"row":3,"col":9,"x":8,"y":3},
        {"row":3,"col":10,"x":9,"y":3.5},{"row":3,"col":11,"x":10,"y":3.25},{"row":3,"col":12,"x":11,"y":3},
        {"row":3,"col":13,"x":12,"y":3.25},{"row":3,"col":14,"x":13,"y":3.5},{"row":3,"col":15,"x":14,"y":3.75},
        // Row 4: 4L + 4R thumb = 8 keys (indices 52-59) â€” flat, no rotation
        {"row":4,"col":2,"x":2.5,"y":4.25},{"row":4,"col":3,"x":3.5,"y":4.25},
        {"row":4,"col":4,"x":4.5,"y":4.5},{"row":4,"col":5,"x":6,"y":4.25},
        {"row":4,"col":10,"x":8,"y":4.25},{"row":4,"col":11,"x":9.5,"y":4.5},
        {"row":4,"col":12,"x":10.5,"y":4.25},{"row":4,"col":13,"x":11.5,"y":4.25}
      ]
    }
  },
  "sensors": []
};

// ================================================================
// SECTION: ZMK KEYCODES & BEHAVIORS DATABASE
// These are lookup tables of every key name and behavior that ZMK
// supports. Used to populate the keycode picker grid in the Binding
// Editor (populateKeycodeGrids, line 3017) and to validate user input.
// ZMK_BEHAVIORS lists all built-in behaviors (&kp, &mo, &lt, etc.).
// More on this code can be found in 'RefDoc' line 245
// ================================================================
var ZMK_KEYCODES = {
  letters: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
  numbers: ['N0','N1','N2','N3','N4','N5','N6','N7','N8','N9','NUMBER_0','NUMBER_1','NUMBER_2','NUMBER_3','NUMBER_4','NUMBER_5','NUMBER_6','NUMBER_7','NUMBER_8','NUMBER_9'],
  modifiers: ['LSHIFT','LSHFT','LEFT_SHIFT','RSHIFT','RSHFT','RIGHT_SHIFT','LCTRL','LEFT_CONTROL','RCTRL','RIGHT_CONTROL','LALT','LEFT_ALT','RALT','RIGHT_ALT','LGUI','LWIN','LCMD','LMETA','LEFT_GUI','RGUI','RWIN','RCMD','RMETA','RIGHT_GUI'],
  navigation: ['UP','DOWN','LEFT','RIGHT','HOME','END','PG_UP','PAGE_UP','PG_DN','PAGE_DOWN'],
  control: ['ESC','ESCAPE','ENTER','RET','RETURN','SPACE','TAB','BSPC','BACKSPACE','DEL','DELETE','INS','INSERT'],
  locks: ['CAPS','CLCK','CAPSLOCK','SLCK','SCROLLLOCK','LNLCK','KP_NLCK','KP_NUM','KP_NUMLOCK'],
  symbols: ['MINUS','EQUAL','LBKT','LBRC','LEFT_BRACKET','RBKT','RBRC','RIGHT_BRACKET','BSLH','BACKSLASH','GRAVE','SQT','APOS','APOSTROPHE','SEMI','COMMA','DOT','FSLH','SLASH','NON_US_HASH','NUHS','NON_US_BSLH','NUBS','TILDE','EXCL','EXCLAMATION','AT','HASH','POUND','DLLR','DOLLAR','PRCNT','PERCENT','CARET','AMPS','AMPERSAND','ASTRK','ASTERISK','STAR','LPAR','RPAR','LEFT_PARENTHESIS','RIGHT_PARENTHESIS','UNDER','UNDERSCORE','PLUS','PIPE','PIPE2','COLON','DQT','DOUBLE_QUOTES','LT','LESS_THAN','GT','GREATER_THAN','QMARK','QUESTION'],
  fkeys: ['F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12','F13','F14','F15','F16','F17','F18','F19','F20','F21','F22','F23','F24'],
  numpad: ['KP_N0','KP_N1','KP_N2','KP_N3','KP_N4','KP_N5','KP_N6','KP_N7','KP_N8','KP_N9','KP_PLUS','KP_MINUS','KP_SUBTRACT','KP_MULTIPLY','KP_ASTERISK','KP_DIVIDE','KP_SLASH','KP_DOT','KP_ENTER','KP_EQUAL','KP_COMMA','KP_LPAR','KP_RPAR','KP_NUMLOCK','KP_NUM','KP_NLCK','KP_CLEAR'],
  media: ['C_VOL_UP','C_VOLUME_UP','C_VOL_DN','C_VOLUME_DOWN','C_MUTE','C_PLAY_PAUSE','C_PP','C_NEXT','C_PREV','C_STOP','C_PLAY','C_PAUSE','C_RECORD','C_REC','C_REWIND','C_RW','C_FAST_FORWARD','C_FF','C_EJECT','C_BRI_UP','C_BRI_INC','C_BRI_DN','C_BRI_DEC','C_BRI_MIN','C_BRI_MAX','C_BRI_AUTO'],
  editing: ['C_AC_CUT','K_CUT','C_AC_COPY','K_COPY','C_AC_PASTE','K_PASTE','C_AC_UNDO','K_UNDO','C_AC_REDO','K_REDO','K_AGAIN','C_AC_SELECT_ALL','C_AC_FIND'],
  applications: ['C_AC_SEARCH','C_AL_CALCULATOR','C_AL_CALC','C_AC_BOOKMARKS','C_AL_MY_COMPUTER','C_AL_FILES','C_AL_TEXT_EDITOR','C_AL_EMAIL','GLOBE','C_AC_HOME','C_AC_BACK','C_AC_FORWARD','C_AC_REFRESH','C_AC_CLOSE','C_AC_EXIT','C_AC_SCROLL_UP','C_AC_SCROLL_DOWN','C_AC_ZOOM_IN','C_AC_ZOOM_OUT'],
  misc: ['PSCRN','PRINTSCREEN','PAUSE_BREAK','K_APP','K_CMENU','K_CANCEL','K_POWER','K_SLEEP'],
  international: ['INT1','INT_RO','INT2','INT_KANA','INT3','INT_YEN','INT4','INT_HENKAN','INT5','INT_MUHENKAN','INT6','INT7','INT8','INT9'],
  language: ['LANG1','LANG_HANGEUL','LANG2','LANG_HANJA','LANG3','LANG_KATAKANA','LANG4','LANG_HIRAGANA','LANG5','LANG_ZENKAKU_HANKAKU','LANG6','LANG7','LANG8','LANG9'],
  power: ['C_PWR','C_POWER','K_PWR','K_POWER','C_SLEEP','K_SLEEP','C_AL_LOCK','C_MENU']
};

var ZMK_BEHAVIORS = [
  // Key press behaviors
  { name: '&kp', label: 'Key Press', params: ['keycode'], cells: 1 },
  { name: '&mt', label: 'Mod-Tap', params: ['modifier', 'keycode'], cells: 2 },
  { name: '&kt', label: 'Key Toggle', params: ['keycode'], cells: 1 },
  { name: '&sk', label: 'Sticky Key', params: ['keycode'], cells: 1 },
  { name: '&gresc', label: 'Grave Escape', params: [], cells: 0 },
  { name: '&caps_word', label: 'Caps Word', params: [], cells: 0 },
  { name: '&key_repeat', label: 'Key Repeat', params: [], cells: 0 },
  // Layer navigation
  { name: '&mo', label: 'Momentary Layer', params: ['layer'], cells: 1 },
  { name: '&lt', label: 'Layer-Tap', params: ['layer', 'keycode'], cells: 2 },
  { name: '&to', label: 'To Layer', params: ['layer'], cells: 1 },
  { name: '&tog', label: 'Toggle Layer', params: ['layer'], cells: 1 },
  { name: '&sl', label: 'Sticky Layer', params: ['layer'], cells: 1 },
  // Mouse emulation
  { name: '&mkp', label: 'Mouse Button Press', params: ['button'], cells: 1 },
  { name: '&mmv', label: 'Mouse Move', params: ['direction'], cells: 1 },
  { name: '&msc', label: 'Mouse Scroll', params: ['direction'], cells: 1 },
  // Output & connectivity
  { name: '&bt', label: 'Bluetooth', params: ['bt_action'], cells: 1 },
  { name: '&out', label: 'Output Selection', params: ['out_action'], cells: 1 },
  // Lighting
  { name: '&rgb_ug', label: 'RGB Underglow', params: ['rgb_action'], cells: 1 },
  { name: '&bl', label: 'Backlight', params: ['bl_action'], cells: 1 },
  // Power & system
  { name: '&ext_power', label: 'External Power', params: ['ep_action'], cells: 1 },
  { name: '&soft_off', label: 'Soft Off', params: [], cells: 0 },
  // Reset
  { name: '&sys_reset', label: 'System Reset', params: [], cells: 0 },
  { name: '&bootloader', label: 'Bootloader', params: [], cells: 0 },
  // Misc
  { name: '&trans', label: 'Transparent', params: [], cells: 0 },
  { name: '&none', label: 'None Binding', params: [], cells: 0 },
  { name: '&studio_unlock', label: 'Studio Unlock', params: [], cells: 0 }
];

var BT_ACTIONS = ['BT_CLR','BT_CLR_ALL','BT_SEL 0','BT_SEL 1','BT_SEL 2','BT_SEL 3','BT_SEL 4','BT_NXT','BT_PRV','BT_DISC 0','BT_DISC 1','BT_DISC 2','BT_DISC 3','BT_DISC 4'];
var RGB_ACTIONS = ['RGB_TOG','RGB_EFF','RGB_EFR','RGB_HUI','RGB_HUD','RGB_SAI','RGB_SAD','RGB_BRI','RGB_BRD','RGB_SPI','RGB_SPD','RGB_COLOR_HSB(0,0,0)'];
var OUT_ACTIONS = ['OUT_TOG','OUT_USB','OUT_BLE'];
var BL_ACTIONS = ['BL_TOG','BL_ON','BL_OFF','BL_INC','BL_DEC','BL_CYCLE','BL_SET 50'];
var EP_ACTIONS = ['EP_TOG','EP_ON','EP_OFF'];
var MOUSE_BUTTONS = ['LCLK','RCLK','MCLK','MB4','MB5'];
var MOUSE_MOVES = ['MOVE_UP','MOVE_DOWN','MOVE_LEFT','MOVE_RIGHT'];
var MOUSE_SCROLLS = ['SCRL_UP','SCRL_DOWN','SCRL_LEFT','SCRL_RIGHT'];

// ================================================================
// SECTION: COLOR UTILITY FUNCTIONS
// These small helper functions convert between color formats:
//   hsbToHex(h,s,b) â€” turns Hue/Saturation/Brightness into a #hex color
//   hexToRgb(hex) â€” turns a #hex color into r,g,b numbers
//   rgbToHsb(r,g,b) â€” turns r,g,b numbers into h,s,b
//   hasHsbVal(v) â€” checks if a value is non-empty
//   baseKey(name) â€” strips "LAYER_" or "RGB_" prefix from a name
//   esc(str) â€” makes a string safe for HTML (prevents code injection)
// More on this code can be found in 'RefDoc' line 280
// ================================================================
function hsbToHex(h, s, b) {
  h = parseInt(h) || 0; s = parseInt(s) || 0; b = parseInt(b) || 0;
  var sf = s / 100, bf = b / 100;
  var k = function(n) { return (n + h / 60) % 6; };
  var f = function(n) { return bf - bf * sf * Math.max(Math.min(k(n), 4 - k(n), 1), 0); };
  var r = Math.round(255 * f(5)), g = Math.round(255 * f(3)), bl = Math.round(255 * f(1));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + bl).toString(16).slice(1);
}
function hexToRgb(hex) {
  hex = hex.replace('#', '');
  var n = parseInt(hex, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
function rgbToHsb(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  var h, s = max === 0 ? 0 : d / max, v = max;
  if (max === min) h = 0;
  else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return { h: Math.round(h), s: Math.round(s * 100), b: Math.round(v * 100) };
}
function hasHsbVal(v) { return v !== '' && v !== undefined && v !== null; }
function baseKey(name) { return name.replace(/^LAYER_/i, '').replace(/^RGB_/i, '').toUpperCase(); }
function esc(str) { return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

// ================================================================
// SECTION: HSB COLOR PICKER POPUP
// A draggable popup that lets you pick a color visually. The big
// square area is the Saturation/Brightness picker; the thin strip
// on the right is the Hue slider. Drag either to choose a color.
// This updates the layer's h/s/b values and regenerates the output.
// Created once by ensureHsbPicker() and reused for every layer.
// More on this code can be found in 'RefDoc' line 320
// ================================================================
var hsbPickerLayerIdx = -1;
var hsbPickerDragging = null; // 'sv' or 'hue'

function ensureHsbPicker() {
  if (document.getElementById('hsbPickerPopup')) return;
  var popup = document.createElement('div');
  popup.id = 'hsbPickerPopup';
  popup.innerHTML =
    '<div class="hsbp-header"><span>HSB Color Picker</span><span class="hsbp-close">&times;</span></div>' +
    '<div class="hsbp-sv-wrap"><canvas width="208" height="150"></canvas><div class="hsbp-sv-cursor"></div></div>' +
    '<div class="hsbp-hue-wrap"><canvas width="208" height="18"></canvas><div class="hsbp-hue-cursor"></div></div>' +
    '<div class="hsbp-row">' +
      '<div class="input-group"><label>H</label><input type="number" min="0" max="360" id="hsbpH"></div>' +
      '<div class="input-group"><label>S</label><input type="number" min="0" max="100" id="hsbpS"></div>' +
      '<div class="input-group"><label>B</label><input type="number" min="0" max="100" id="hsbpB"></div>' +
      '<div class="hsbp-preview" id="hsbpPreview"></div>' +
    '</div>';
  document.body.appendChild(popup);

  // Draw hue bar once
  var hueCanvas = popup.querySelector('.hsbp-hue-wrap canvas');
  var hctx = hueCanvas.getContext('2d');
  var hGrad = hctx.createLinearGradient(0, 0, hueCanvas.width, 0);
  for (var i = 0; i <= 6; i++) hGrad.addColorStop(i / 6, 'hsl(' + (i * 60) + ',100%,50%)');
  hctx.fillStyle = hGrad;
  hctx.fillRect(0, 0, hueCanvas.width, hueCanvas.height);

  // Close button
  popup.querySelector('.hsbp-close').onclick = closeHsbPicker;

  // SV canvas mouse events
  var svWrap = popup.querySelector('.hsbp-sv-wrap');
  function handleSv(e) {
    var rect = svWrap.getBoundingClientRect();
    var x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    var y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    var s = Math.round(x / rect.width * 100);
    var b = Math.round((1 - y / rect.height) * 100);
    applyHsbPickerValue(null, s, b);
  }
  svWrap.addEventListener('mousedown', function(e) { hsbPickerDragging = 'sv'; handleSv(e); e.preventDefault(); });

  // Hue bar mouse events
  var hueWrap = popup.querySelector('.hsbp-hue-wrap');
  function handleHue(e) {
    var rect = hueWrap.getBoundingClientRect();
    var x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    var h = Math.round(x / rect.width * 360);
    applyHsbPickerValue(h, null, null);
  }
  hueWrap.addEventListener('mousedown', function(e) { hsbPickerDragging = 'hue'; handleHue(e); e.preventDefault(); });

  // Global mouse move/up for dragging
  document.addEventListener('mousemove', function(e) {
    if (!hsbPickerDragging) return;
    if (hsbPickerDragging === 'sv') handleSv(e);
    else if (hsbPickerDragging === 'hue') handleHue(e);
  });
  document.addEventListener('mouseup', function() { hsbPickerDragging = null; });

  // Numeric inputs
  var hIn = document.getElementById('hsbpH');
  var sIn = document.getElementById('hsbpS');
  var bIn = document.getElementById('hsbpB');
  function handleNumeric() {
    applyHsbPickerValue(parseInt(hIn.value) || 0, parseInt(sIn.value) || 0, parseInt(bIn.value) || 0);
  }
  hIn.oninput = hIn.onchange = handleNumeric;
  sIn.oninput = sIn.onchange = handleNumeric;
  bIn.oninput = bIn.onchange = handleNumeric;

  // Close on outside click
  document.addEventListener('mousedown', function(e) {
    var popup = document.getElementById('hsbPickerPopup');
    if (popup && popup.style.display !== 'none' && !popup.contains(e.target) && !e.target.closest('[data-color-pick]')) {
      closeHsbPicker();
    }
  });
}

function drawSvCanvas(hue) {
  var popup = document.getElementById('hsbPickerPopup');
  if (!popup) return;
  var canvas = popup.querySelector('.hsbp-sv-wrap canvas');
  var ctx = canvas.getContext('2d');
  var w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  // Horizontal gradient: white â†’ pure hue color
  var gradH = ctx.createLinearGradient(0, 0, w, 0);
  gradH.addColorStop(0, '#ffffff');
  gradH.addColorStop(1, 'hsl(' + hue + ',100%,50%)');
  ctx.fillStyle = gradH;
  ctx.fillRect(0, 0, w, h);
  // Vertical gradient: transparent â†’ black
  var gradV = ctx.createLinearGradient(0, 0, 0, h);
  gradV.addColorStop(0, 'rgba(0,0,0,0)');
  gradV.addColorStop(1, 'rgba(0,0,0,1)');
  ctx.fillStyle = gradV;
  ctx.fillRect(0, 0, w, h);
}

function updateHsbPickerUI(h, s, b) {
  var popup = document.getElementById('hsbPickerPopup');
  if (!popup) return;
  // Update numeric inputs
  document.getElementById('hsbpH').value = h;
  document.getElementById('hsbpS').value = s;
  document.getElementById('hsbpB').value = b;
  // Update preview
  document.getElementById('hsbpPreview').style.background = hsbToHex(h, s, b);
  // Update SV cursor position
  var svWrap = popup.querySelector('.hsbp-sv-wrap');
  var svCursor = popup.querySelector('.hsbp-sv-cursor');
  svCursor.style.left = (s / 100 * svWrap.offsetWidth) + 'px';
  svCursor.style.top = ((1 - b / 100) * svWrap.offsetHeight) + 'px';
  // Update hue cursor position
  var hueWrap = popup.querySelector('.hsbp-hue-wrap');
  var hueCursor = popup.querySelector('.hsbp-hue-cursor');
  hueCursor.style.left = (h / 360 * hueWrap.offsetWidth) + 'px';
}

function applyHsbPickerValue(h, s, b) {
  if (hsbPickerLayerIdx < 0 || hsbPickerLayerIdx >= layers.length) return;
  var l = layers[hsbPickerLayerIdx];
  if (h !== null) l.h = String(h);
  if (s !== null) l.s = String(s);
  if (b !== null) l.b = String(b);
  // Normalize: ensure h/s/b are always strings (guards against numeric 0 from parsed data)
  if (typeof l.h === 'number') l.h = String(l.h);
  if (typeof l.s === 'number') l.s = String(l.s);
  if (typeof l.b === 'number') l.b = String(l.b);
  var ch = parseInt(l.h) || 0, cs = parseInt(l.s) || 0, cb = parseInt(l.b) || 0;
  // Redraw SV canvas if hue changed
  if (h !== null) drawSvCanvas(ch);
  updateHsbPickerUI(ch, cs, cb);
  // Update the layer row inline
  var hex = hsbToHex(ch, cs, cb);
  var items = document.querySelectorAll('#layerList .item');
  // Find the item with matching data-color-pick
  var swatches = document.querySelectorAll('#layerList [data-color-pick="' + hsbPickerLayerIdx + '"]');
  if (swatches.length) {
    var swatch = swatches[0];
    swatch.style.background = hex;
    var item = swatch.closest('.item');
    if (item) {
      var hIn = item.querySelector('[data-field="h"]');
      var sIn = item.querySelector('[data-field="s"]');
      var bIn = item.querySelector('[data-field="b"]');
      if (hIn) hIn.value = ch;
      if (sIn) sIn.value = cs;
      if (bIn) bIn.value = cb;
    }
  }
  updateColorMapFromLayer(hsbPickerLayerIdx);
  updateRgbOutput();
  renderLayerTabs();
}

function openHsbPicker(layerIdx, anchorEl) {
  ensureHsbPicker();
  hsbPickerLayerIdx = layerIdx;
  var popup = document.getElementById('hsbPickerPopup');
  var l = layers[layerIdx];
  var h = parseInt(l.h) || 0, s = parseInt(l.s) || 0, b = parseInt(l.b) || 0;
  // Commit resolved values so all three h/s/b are populated (not left as '')
  l.h = String(h); l.s = String(s); l.b = String(b);
  // Position near the swatch
  var rect = anchorEl.getBoundingClientRect();
  var pw = 232, ph = 290;
  var left = rect.right + 8;
  var top = rect.top - 40;
  // Keep within viewport
  if (left + pw > window.innerWidth) left = rect.left - pw - 8;
  if (top + ph > window.innerHeight) top = window.innerHeight - ph - 8;
  if (top < 4) top = 4;
  popup.style.left = left + 'px';
  popup.style.top = top + 'px';
  popup.style.display = 'block';
  drawSvCanvas(h);
  updateHsbPickerUI(h, s, b);
}

function closeHsbPicker() {
  var popup = document.getElementById('hsbPickerPopup');
  if (popup) popup.style.display = 'none';
  hsbPickerLayerIdx = -1;
}
// ================================================================
// SECTION: RGB TAB HELPER FUNCTIONS
// These build the dropdowns, lists, and rows that the RGB Generator
// tab uses. For example, layerOptionsHTML() builds the <option> list
// for layer dropdown menus, and colorOptionsHTML() does the same for
// colors. The output panel resize handler lives here too.
// More on this code can be found in 'RefDoc' line 365
// ================================================================
function layerOptionsHTML(selected) {
  // Build a sorted copy so dropdown options follow sequential index order (0, 1, 2...)
  var sorted = layers.slice().sort(function(a, b) {
    var ai = (a.index !== '' && a.index !== undefined) ? parseInt(a.index) : 9999;
    var bi = (b.index !== '' && b.index !== undefined) ? parseInt(b.index) : 9999;
    return ai - bi;
  });
  return sorted.map(function(l) {
    var sel = l.name === selected ? ' selected' : '';
    return '<option value="' + esc(l.name) + '"' + sel + '>' + esc(l.name) + '</option>';
  }).join('');
}

function colorOptionsHTML(selected) {
  var opts = [], seen = {};
  layers.forEach(function(l) {
    if (!hasHsbVal(l.h) || !hasHsbVal(l.s) || !hasHsbVal(l.b)) return;
    var bk = baseKey(l.name);
    var rgbName = colorValueMap['RGB_' + bk] ? 'RGB_' + bk : l.name;
    if (seen[rgbName]) return;
    seen[rgbName] = true;
    var sel = rgbName === selected ? ' selected' : '';
    opts.push('<option value="' + esc(rgbName) + '"' + sel + '>' + esc(rgbName) + ' (' + l.h + ',' + l.s + ',' + l.b + ')</option>');
  });
  Object.keys(colorValueMap).forEach(function(ck) {
    if (seen[ck]) return;
    seen[ck] = true;
    var v = colorValueMap[ck];
    var lbl = colorLabelMap[ck] ? ' - ' + colorLabelMap[ck] : '';
    var sel = ck === selected ? ' selected' : '';
    opts.push('<option value="' + esc(ck) + '"' + sel + '>' + esc(ck) + ' (' + v.h + ',' + v.s + ',' + v.b + ')' + esc(lbl) + '</option>');
  });
  if (selected && !seen[selected]) {
    opts.unshift('<option value="' + esc(selected) + '" selected>' + esc(selected) + '</option>');
  }
  return opts.join('');
}

function macroRefOptionsHTML(selected) {
  var opts = [];
  macros.forEach(function(m) {
    var sel = m.name === selected ? ' selected' : '';
    opts.push('<option value="' + esc(m.name) + '"' + sel + '>' + esc(m.name) + '</option>');
  });
  blinkMacros.forEach(function(bm) {
    var sel = bm.name === selected ? ' selected' : '';
    opts.push('<option value="' + esc(bm.name) + '"' + sel + '>' + esc(bm.name) + '</option>');
  });
  if (selected && !opts.some(function(o) { return o.indexOf('selected') > -1; })) {
    opts.unshift('<option value="' + esc(selected) + '" selected>' + esc(selected) + '</option>');
  }
  return opts.join('');
}

function syncColorInputs() {
  var hue = document.getElementById('hue'), hueNum = document.getElementById('hueNum');
  var sat = document.getElementById('sat'), satNum = document.getElementById('satNum');
  var bri = document.getElementById('bri'), briNum = document.getElementById('briNum');
  var wheel = document.getElementById('colorWheel'), preview = document.getElementById('colorPreview');
  function syncDisplay() {
    var hex = hsbToHex(hue.value, sat.value, bri.value);
    wheel.value = hex; preview.style.background = hex;
  }
  function fromSliders() { hueNum.value = hue.value; satNum.value = sat.value; briNum.value = bri.value; syncDisplay(); }
  function fromNums() { hue.value = hueNum.value; sat.value = satNum.value; bri.value = briNum.value; syncDisplay(); }
  function fromWheel() {
    var rgb = hexToRgb(wheel.value), hsb = rgbToHsb(rgb.r, rgb.g, rgb.b);
    hue.value = hueNum.value = hsb.h; sat.value = satNum.value = hsb.s; bri.value = briNum.value = hsb.b;
    preview.style.background = wheel.value;
  }
  hue.oninput = sat.oninput = bri.oninput = fromSliders;
  hueNum.oninput = satNum.oninput = briNum.oninput = fromNums;
  wheel.oninput = fromWheel;
  fromSliders();
}

function initCollapsible() {
  document.querySelectorAll('.section-head[data-toggle]').forEach(function(head) {
    head.addEventListener('click', function() {
      var body = document.getElementById(this.getAttribute('data-toggle'));
      var icon = this.querySelector('.toggle-icon');
      body.classList.toggle('collapsed');
      icon.classList.toggle('collapsed');
    });
  });
}

function initResize(handleId, wrapId) {
  var handle = document.getElementById(handleId);
  var wrap = document.getElementById(wrapId);
  if (!handle || !wrap) return;
  var dragging = false;
  handle.addEventListener('mousedown', function(e) {
    e.preventDefault(); dragging = true;
    handle.classList.add('active');
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  });
  document.addEventListener('mousemove', function(e) {
    if (!dragging) return;
    var newWidth = window.innerWidth - e.clientX;
    if (newWidth < 260) newWidth = 260;
    var maxW = Math.floor(window.innerWidth * 0.6);
    if (newWidth > maxW) newWidth = maxW;
    wrap.style.width = newWidth + 'px';
  });
  document.addEventListener('mouseup', function() {
    if (dragging) { dragging = false; handle.classList.remove('active'); document.body.style.cursor = ''; document.body.style.userSelect = ''; }
  });
}

// ================================================================
// SECTION: .DTSI CODE PARSER (parseUserCode)
// When you paste .dtsi code in the RGB tab and click "Parse", this
// function reads through the text using regular expressions (regex)
// to find color definitions, layers, macros, blink macros, behaviors,
// and combos. It stores them in the global arrays (layers, macros, etc.).
// After parsing, it calls rgbRenderAll() to refresh the UI.
// More on this code can be found in 'RefDoc' line 410
// ================================================================
function parseUserCode() {
  var code = document.getElementById('userCodePaste').value;
  // Preserve cross-tab data (items synced from Keymap tab)
  var savedBehaviors = behaviors.filter(function(b) { return b._fromKeymap; });
  var savedLayers = layers.filter(function(l) { return l._fromKeymap; });
  layers = []; macros = []; behaviors = []; combos = []; blinkMacros = []; dtsiNativeBehaviors = [];
  colorValueMap = {}; colorLabelMap = {};
  // Restore cross-tab data
  savedBehaviors.forEach(function(b) { behaviors.push(b); });
  var m;

  var colorRe = /^#define\s+([A-Za-z0-9_]+)\s+RGB_COLOR_HSB\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*(?:\/\*([^*]*)\*\/)?(?:\s*\/\/(.*))?/gm;
  while ((m = colorRe.exec(code))) {
    var h = parseInt(m[2]), s = parseInt(m[3]), b = parseInt(m[4]);
    if (h === 0 && s === 0 && b === 0) continue;
    var label = (m[5] ? m[5].trim() : '') || (m[6] ? m[6].trim() : '');
    colorValueMap[m[1]] = { h: h, s: s, b: b };
    colorLabelMap[m[1]] = label;
  }

  var layerRe = /^#define\s+(LAYER_[A-Za-z0-9_]+)\s+(\d+)\s*$/gm;
  var foundLayer = false;
  while ((m = layerRe.exec(code))) {
    foundLayer = true;
    var stripped = m[1].replace(/^LAYER_/, '');
    var cv = colorValueMap['RGB_' + stripped] || colorValueMap[stripped] || colorValueMap[m[1]];
    var cl = colorLabelMap['RGB_' + stripped] || colorLabelMap[stripped] || colorLabelMap[m[1]] || '';
    layers.push({ name: m[1], index: m[2], h: cv ? String(cv.h) : '', s: cv ? String(cv.s) : '', b: cv ? String(cv.b) : '', label: cl });
  }
  if (!foundLayer) {
    layerRe = /^#define\s+([A-Za-z0-9_]+)\s+(\d+)\s*$/gm;
    while ((m = layerRe.exec(code))) {
      var cv2 = colorValueMap[m[1]];
      var cl2 = colorLabelMap[m[1]] || '';
      layers.push({ name: m[1], index: m[2], h: cv2 ? String(cv2.h) : '', s: cv2 ? String(cv2.s) : '', b: cv2 ? String(cv2.b) : '', label: cl2 });
    }
  }

  var layerBaseKeys = {};
  layers.forEach(function(l) { layerBaseKeys[baseKey(l.name)] = true; });
  Object.keys(colorValueMap).forEach(function(ck) {
    if (!layerBaseKeys[baseKey(ck)] && !colorValueMap[ck]._autoSync) {
      var v = colorValueMap[ck];
      layers.push({ name: ck, index: '', h: String(v.h), s: String(v.s), b: String(v.b), label: colorLabelMap[ck] || '' });
      layerBaseKeys[baseKey(ck)] = true;
    }
  });
  // Restore keymap-synced layers that aren't already covered by parsed data
  savedLayers.forEach(function(sl) {
    if (!layerBaseKeys[baseKey(sl.name)]) {
      layers.push(sl);
      layerBaseKeys[baseKey(sl.name)] = true;
    }
  });

  var macroRe = /(TO_RGB_MACRO|MOMENTARY_RGB_MACRO|TO_RGB_PRESS_MACRO)\(([^)]+)\)/g;
  while ((m = macroRe.exec(code))) {
    var args = m[2].split(',').map(function(x) { return x.trim(); });
    if (m[1] === 'MOMENTARY_RGB_MACRO') {
      macros.push({ name: args[0], type: m[1], layer: args[2] || '', color: args[3] || '', releaseColor: args[4] || '' });
    } else {
      macros.push({ name: args[0], type: m[1], layer: args[2] || '', color: args[3] || '', releaseColor: '' });
    }
  }

  var behRe = /RGB_HOLD_TAP\(([^)]+)\)/g;
  while ((m = behRe.exec(code))) {
    var bargs = m[1].split(',').map(function(x) { return x.trim(); });
    behaviors.push({ name: bargs[0], label: (bargs[1] || '').replace(/"/g, ''), macro: bargs[2] || '' });
  }

  var comboRe = /COMBO\(([^)]+)\)/g;
  while ((m = comboRe.exec(code))) {
    var cargs = m[1].split(',').map(function(x) { return x.trim(); });
    var pos, layersStr;
    if (cargs.length > 3 && /^\d+$/.test(cargs[3])) {
      pos = cargs[2] + ', ' + cargs[3];
      layersStr = cargs.slice(4).join(' ');
    } else {
      pos = cargs[2] || '';
      layersStr = cargs.slice(3).join(' ');
    }
    combos.push({ name: cargs[0], bind: cargs[1], pos: pos, layers: layersStr });
  }

  var blinkBlockRe = /ZMK_MACRO\(\s*([A-Za-z0-9_]+)\s*,([\s\S]*?)\n\s*\)/g;
  var seenBlinkNames = {};
  var bb;
  while ((bb = blinkBlockRe.exec(code))) {
    var bname = bb[1].trim();
    var body = bb[2];
    if (!body.includes('BLINK_SEQ')) continue;
    if (seenBlinkNames[bname]) continue;
    seenBlinkNames[bname] = true;
    var blabel = '', bkey = '', bcolor = '', breturnColor = '', bwait = 80;
    var labelMatch = body.match(/label\s*=\s*"([^"]*)"/);
    if (labelMatch) blabel = labelMatch[1].trim();
    var kpMatch = body.match(/&kp\s+([A-Za-z0-9_]+)/);
    if (kpMatch) bkey = kpMatch[1];
    if (!bkey) {
      var moMatch = body.match(/&mo\s+([A-Za-z0-9_]+)/);
      if (moMatch) bkey = '&mo ' + moMatch[1];
    }
    var bsMatch = body.match(/BLINK_SEQ\(\s*([A-Za-z0-9_]+)\s*,\s*([A-Za-z0-9_]+)\s*,\s*(\d+)\s*\)/);
    if (bsMatch) { bcolor = bsMatch[1]; breturnColor = bsMatch[2]; bwait = parseInt(bsMatch[3]) || 80; }
    blinkMacros.push({ name: bname, key: bkey, color: bcolor, returnColor: breturnColor, wait: bwait, label: blabel });
  }

  // Parse native ZMK behaviors from dtsi (hold-tap, tap-dance, mod-morph, sticky-key, sensor-rotate)
  var dtsiBehRe = /(\w+)\s*:\s*\w+\s*\{([^}]*compatible\s*=\s*"zmk,behavior-[^"]*"[^}]*)\}/g;
  var dbm;
  var rgbBehNames = {};
  behaviors.forEach(function(b) { rgbBehNames[b.name] = true; });
  while ((dbm = dtsiBehRe.exec(code))) {
    var dbname = dbm[1];
    if (rgbBehNames[dbname]) continue; // skip RGB_HOLD_TAP behaviors already parsed
    var dbbody = dbm[2];
    var dbcompat = dbbody.match(/compatible\s*=\s*"([^"]*)"/);
    if (!dbcompat) continue;
    var dblabel = dbbody.match(/label\s*=\s*"([^"]*)"/);
    var dbtype = '', dbconfig = {};
    if (dbcompat[1] === 'zmk,behavior-hold-tap') {
      dbtype = 'hold-tap';
      var dtt = dbbody.match(/tapping-term-ms\s*=\s*<(\d+)>/);
      var dfl = dbbody.match(/flavor\s*=\s*"([^"]*)"/);
      var dbn = dbbody.match(/bindings\s*=\s*<([^>]*)>\s*,\s*<([^>]*)>/);
      dbconfig = { tappingTerm: dtt ? dtt[1] : '200', flavor: dfl ? dfl[1] : 'tap-preferred', holdBinding: dbn ? dbn[1].trim() : '', tapBinding: dbn ? dbn[2].trim() : '' };
    } else if (dbcompat[1] === 'zmk,behavior-tap-dance') {
      dbtype = 'tap-dance';
      var dtt2 = dbbody.match(/tapping-term-ms\s*=\s*<(\d+)>/);
      var dbn2 = dbbody.match(/bindings\s*=\s*(<[^;]*);/);
      var dtdBindStr = dbn2 ? dbn2[1].trim() : '';
      dbconfig = { tappingTerm: dtt2 ? dtt2[1] : '200', bindings: dtdBindStr };
    } else if (dbcompat[1] === 'zmk,behavior-mod-morph') {
      dbtype = 'mod-morph';
      var dbn3 = dbbody.match(/bindings\s*=\s*<([^>]*)>\s*,\s*<([^>]*)>/);
      var dmods = dbbody.match(/mods\s*=\s*<\(([^)]*)\)>/);
      dbconfig = { normalBinding: dbn3 ? dbn3[1].trim() : '', morphedBinding: dbn3 ? dbn3[2].trim() : '', mods: dmods ? dmods[1].trim() : '' };
    } else if (dbcompat[1] === 'zmk,behavior-sticky-key') {
      dbtype = 'sticky-key';
      var dra = dbbody.match(/release-after-ms\s*=\s*<(\d+)>/);
      var dbn4 = dbbody.match(/bindings\s*=\s*<([^>]*)>/);
      dbconfig = { releaseAfter: dra ? dra[1] : '1000', binding: dbn4 ? dbn4[1].trim() : '' };
    } else if (dbcompat[1] === 'zmk,behavior-sensor-rotate') {
      dbtype = 'sensor-rotate';
      var dbn5 = dbbody.match(/bindings\s*=\s*<([^>]*)>\s*,\s*<([^>]*)>/);
      var dst = dbbody.match(/tap-ms\s*=\s*<(\d+)>/);
      dbconfig = { sensorCW: dbn5 ? dbn5[1].trim() : '', sensorCCW: dbn5 ? dbn5[2].trim() : '', sensorTap: dst ? dst[1] : '' };
    } else if (dbcompat[1] === 'zmk,behavior-macro-one-param' || dbcompat[1] === 'zmk,behavior-macro-two-param') {
      continue; // macros handled separately
    } else {
      continue;
    }
    dtsiNativeBehaviors.push({ name: dbname, type: dbtype, label: dblabel ? dblabel[1] : '', config: dbconfig, _fromDtsi: true });
  }

  var status = document.getElementById('userCodeStatus');
  status.textContent = 'Parsed: ' + layers.length + ' layers, ' + macros.length + ' macros, ' + behaviors.length + ' behaviors, ' + dtsiNativeBehaviors.length + ' native behaviors, ' + combos.length + ' combos, ' + blinkMacros.length + ' blink macros.';
  status.style.display = 'inline';
  setTimeout(function() { status.style.display = 'none'; }, 4000);
  rgbRenderAll();
}

// RGB Render functions
// rgbRenderAll() â€” Redraws the entire RGB tab: layer list, macro
// list, behavior list, combo list, blink macros, and the output text.
function rgbRenderAll() {
  renderLayerList();
  renderMacroList();
  renderBehaviorList();
  renderComboList();
  renderBlinkMacroList();
  updateHeaderDropdowns();
  updateRgbOutput();
  renderLayerTabs();
}

// renderLayerList() â€” Rebuilds the "Layers" card in the RGB tab.
// Each layer gets a row with name, index, HSB color fields, and
// a color preview swatch. Changes trigger updateRgbOutput().
function renderLayerList() {
  var list = document.getElementById('layerList');
  var showOrphans = document.getElementById('showOrphans').checked;
  list.innerHTML = '';
  layers.forEach(function(l, i) {
    // Normalize h/s/b to strings (guards against numeric 0 rendering as blank)
    if (typeof l.h === 'number') l.h = String(l.h);
    if (typeof l.s === 'number') l.s = String(l.s);
    if (typeof l.b === 'number') l.b = String(l.b);
    var isOrphan = (l.index === '' || l.index === undefined);
    if (isOrphan && !showOrphans) return;
    var div = document.createElement('div');
    div.className = 'item';
    if (isOrphan && l.enabled === false) div.style.opacity = '0.4';
    else if (isOrphan) div.style.opacity = '0.7';
    var hex = (hasHsbVal(l.h) && hasHsbVal(l.s) && hasHsbVal(l.b)) ? hsbToHex(l.h, l.s, l.b) : '#ccc';
    var toggleHTML = isOrphan
      ? '<div class="input-group" style="margin-right:6px"><label title="Include in output">On</label><input type="checkbox" data-field="enabled" data-i="' + i + '"' + (l.enabled !== false ? ' checked' : '') + '></div>'
      : '';
    div.innerHTML =
      toggleHTML +
      '<b>' + esc(l.name) + '</b>' +
      '<div class="input-group"><label>Idx</label><input type="number" value="' + esc(l.index) + '" min="0" style="width:38px" data-field="index" data-i="' + i + '"></div>' +
      '<div class="input-group"><label>H</label><input type="number" min="0" max="360" value="' + esc(l.h) + '" style="width:44px" data-field="h" data-i="' + i + '"></div>' +
      '<div class="input-group"><label>S</label><input type="number" min="0" max="100" value="' + esc(l.s) + '" style="width:44px" data-field="s" data-i="' + i + '"></div>' +
      '<div class="input-group"><label>B</label><input type="number" min="0" max="100" value="' + esc(l.b) + '" style="width:44px" data-field="b" data-i="' + i + '"></div>' +
      '<div class="color-swatch" style="background:' + hex + ';" data-color-pick="' + i + '" title="Pick color (HSB)"></div>' +
      '<div class="input-group"><label>Lbl</label><input type="text" value="' + esc(l.label || '') + '" data-field="label" data-i="' + i + '" style="width:110px"></div>' +
      '<button class="btn-danger btn-sm" data-remove="layer" data-i="' + i + '">&#10005;</button>';
    list.appendChild(div);
  });
  list.onclick = function(e) {
    if (e.target.dataset.remove === 'layer') { layers.splice(parseInt(e.target.dataset.i), 1); rgbRenderAll(); return; }
    // Open HSB picker on swatch click
    var swatch = e.target.closest('[data-color-pick]');
    if (swatch && swatch.dataset.colorPick !== undefined) {
      openHsbPicker(parseInt(swatch.dataset.colorPick), swatch);
    }
  };
  list.oninput = list.onchange = function(e) {
    var idx = parseInt(e.target.dataset.i), field = e.target.dataset.field;
    if (field === undefined || isNaN(idx)) return;
    if (field === 'enabled') {
      layers[idx].enabled = e.target.checked;
      var item = e.target.closest('.item');
      if (item) item.style.opacity = e.target.checked ? '0.7' : '0.4';
      updateRgbOutput();
      return;
    }
    layers[idx][field] = e.target.value;
    if (field === 'h' || field === 's' || field === 'b') {
      var newHex = hsbToHex(layers[idx].h, layers[idx].s, layers[idx].b);
      var swatch = e.target.closest('.item').querySelector('.color-swatch');
      if (swatch) swatch.style.background = newHex;
    }
    updateColorMapFromLayer(idx);
    updateRgbOutput();
    renderLayerTabs();
  };
}

function renderMacroList() {
  var list = document.getElementById('macroList');
  list.innerHTML = '';
  macros.forEach(function(m, i) {
    var div = document.createElement('div');
    div.className = 'item';
    var isToggle = (m.type === 'TO_RGB_MACRO' || m.type === 'TO_RGB_PRESS_MACRO');
    var typeLabel = m.type === 'TO_RGB_MACRO' ? 'TO_RGB' : m.type === 'MOMENTARY_RGB_MACRO' ? 'MO_RGB' : 'TO_PRESS';
    div.innerHTML =
      '<b>' + esc(m.name) + '</b>' +
      '<span style="color:#888;font-size:0.85em;margin:0 6px;">' + typeLabel + '</span>' +
      '<span style="color:#aaa;font-size:0.85em;">L:' + esc(m.layer) + ' C:' + esc(m.color) + (m.releaseColor ? ' R:' + esc(m.releaseColor) : '') + '</span>' +
      '<button class="btn-sm" data-edit-macro="' + i + '" style="margin-left:auto;padding:2px 8px;background:#3a3a5a;color:#e0e0e0;border:1px solid #555;border-radius:4px;cursor:pointer;">&#9998; Edit</button>' +
      '<button class="btn-danger btn-sm" data-remove="macro" data-i="' + i + '" style="margin-left:4px;">&#10005;</button>';
    list.appendChild(div);
  });
  list.onclick = function(e) {
    if (e.target.dataset.remove === 'macro') { macros.splice(parseInt(e.target.dataset.i), 1); rgbRenderAll(); }
    if (e.target.dataset.editMacro !== undefined) { openMacroEditor(parseInt(e.target.dataset.editMacro)); }
  };
}

var macroEditorIndex = -1;

function openMacroEditor(idx) {
  macroEditorIndex = idx;
  var m = macros[idx];
  var overlay = document.getElementById('macroEditorOverlay');
  document.getElementById('meditName').value = m.name;
  document.getElementById('meditType').value = m.type;
  document.getElementById('meditLayer').innerHTML = layerOptionsHTML(m.layer);
  document.getElementById('meditColor').innerHTML = colorOptionsHTML(m.color);
  document.getElementById('meditReleaseColor').innerHTML = colorOptionsHTML(m.releaseColor);
  var releaseGroup = document.getElementById('meditReleaseGroup');
  if (m.type === 'MOMENTARY_RGB_MACRO') releaseGroup.style.display = '';
  else releaseGroup.style.display = 'none';
  overlay.style.display = 'flex';
}

function closeMacroEditor() {
  document.getElementById('macroEditorOverlay').style.display = 'none';
  macroEditorIndex = -1;
}

function renderBehaviorList() {
  var list = document.getElementById('behaviorList');
  list.innerHTML = '';
  behaviors.forEach(function(b, i) {
    var div = document.createElement('div');
    div.className = 'item';
    div.innerHTML =
      '<b>' + esc(b.name) + '</b>' +
      '<div class="input-group"><label>Label</label><input type="text" value="' + esc(b.label) + '" data-field="label" data-i="' + i + '" style="width:140px"></div>' +
      '<div class="input-group"><label>Macro</label><select data-field="macro" data-i="' + i + '">' + macroRefOptionsHTML(b.macro) + '</select></div>' +
      '<button class="btn-danger btn-sm" data-remove="behavior" data-i="' + i + '">&#10005;</button>';
    list.appendChild(div);
  });
  list.onclick = function(e) { if (e.target.dataset.remove === 'behavior') { behaviors.splice(parseInt(e.target.dataset.i), 1); rgbRenderAll(); } };
  list.oninput = function(e) {
    var idx = parseInt(e.target.dataset.i), field = e.target.dataset.field;
    if (field !== undefined && !isNaN(idx)) { behaviors[idx][field] = e.target.value; updateRgbOutput(); }
  };
}

function renderComboList() {
  var list = document.getElementById('comboList');
  list.innerHTML = '';
  combos.forEach(function(c, i) {
    var div = document.createElement('div');
    div.className = 'item';
    div.innerHTML =
      '<b>' + esc(c.name) + '</b>' +
      '<div class="input-group"><label>Bind</label><input type="text" value="' + esc(c.bind) + '" data-field="bind" data-i="' + i + '" style="width:120px"></div>' +
      '<div class="input-group"><label>Pos</label><input type="text" value="' + esc(c.pos) + '" data-field="pos" data-i="' + i + '" style="width:55px;cursor:pointer;" readonly title="Click to edit on keyboard"></div>' +
      '<div class="input-group"><label>Layers</label><input type="text" value="' + esc(c.layers) + '" data-field="layers" data-i="' + i + '" style="width:180px"></div>' +
      '<button class="btn-danger btn-sm" data-remove="combo" data-i="' + i + '">&#10005;</button>';
    list.appendChild(div);
  });
  list.onclick = function(e) {
    if (e.target.dataset.remove === 'combo') { combos.splice(parseInt(e.target.dataset.i), 1); rgbRenderAll(); }
    // Click on Pos field to open mini-kb for that combo
    if (e.target.dataset.field === 'pos' && e.target.readOnly) {
      var ci = parseInt(e.target.dataset.i);
      rgbEditingComboIndex = ci;
      var posStr = combos[ci].pos || '';
      rgbComboSelectedPositions = posStr.split(/[\s,]+/).map(Number).filter(function(n) { return !isNaN(n); });
      document.getElementById('rgbComboMiniKbWrap').style.display = '';
      renderRgbComboMiniKb();
    }
  };
  list.oninput = function(e) {
    var idx = parseInt(e.target.dataset.i), field = e.target.dataset.field;
    if (field !== undefined && !isNaN(idx)) { combos[idx][field] = e.target.value; updateRgbOutput(); }
  };
}

function renderBlinkMacroList() {
  var list = document.getElementById('blinkMacroList');
  list.innerHTML = '';
  blinkMacros.forEach(function(bm, i) {
    var colorHex = colorValueMap[bm.color] ? hsbToHex(colorValueMap[bm.color].h, colorValueMap[bm.color].s, colorValueMap[bm.color].b) : '#ccc';
    var retHex = colorValueMap[bm.returnColor] ? hsbToHex(colorValueMap[bm.returnColor].h, colorValueMap[bm.returnColor].s, colorValueMap[bm.returnColor].b) : '#ccc';
    var div = document.createElement('div');
    div.className = 'item';
    div.innerHTML =
      '<b>' + esc(bm.name) + '</b>' +
      '<div class="input-group"><label>Key</label><input type="text" value="' + esc(bm.key) + '" data-field="key" data-i="' + i + '" style="width:90px"></div>' +
      '<div class="input-group"><label>Color</label><select data-field="color" data-i="' + i + '">' + colorOptionsHTML(bm.color) + '</select><span class="color-preview" style="background:' + colorHex + '" title="' + esc(bm.color) + '"></span></div>' +
      '<div class="input-group"><label>Ret</label><select data-field="returnColor" data-i="' + i + '">' + colorOptionsHTML(bm.returnColor) + '</select><span class="color-preview" style="background:' + retHex + '" title="' + esc(bm.returnColor) + '"></span></div>' +
      '<div class="input-group"><label>Wait</label><input type="number" value="' + esc(bm.wait) + '" data-field="wait" data-i="' + i + '" style="width:48px"></div>' +
      '<button class="btn-danger btn-sm" data-remove="blink" data-i="' + i + '">&#10005;</button>';
    list.appendChild(div);
  });
  list.onclick = function(e) { if (e.target.dataset.remove === 'blink') { blinkMacros.splice(parseInt(e.target.dataset.i), 1); rgbRenderAll(); } };
  list.oninput = list.onchange = function(e) {
    var idx = parseInt(e.target.dataset.i), field = e.target.dataset.field;
    if (field !== undefined && !isNaN(idx)) {
      blinkMacros[idx][field] = e.target.value;
      if (field === 'color' || field === 'returnColor') {
        var preview = e.target.parentElement.querySelector('.color-preview');
        var cv = colorValueMap[e.target.value];
        if (preview) preview.style.background = cv ? hsbToHex(cv.h, cv.s, cv.b) : '#ccc';
      }
      updateRgbOutput();
    }
  };
}

function updateHeaderDropdowns() {
  document.getElementById('macroLayer').innerHTML = layerOptionsHTML('');
  var colorOpts = colorOptionsHTML('');
  document.getElementById('macroColor').innerHTML = colorOpts;
  document.getElementById('macroReleaseColor').innerHTML = colorOpts;
  document.getElementById('blinkColor').innerHTML = colorOpts;
  document.getElementById('blinkReturnColor').innerHTML = colorOpts;
  document.getElementById('behaviorMacro').innerHTML = macroRefOptionsHTML('');
  var macroTypeEl = document.getElementById('macroType');
  var releaseGroup = document.getElementById('releaseColorGroup');
  if (macroTypeEl.value === 'MOMENTARY_RGB_MACRO') releaseGroup.classList.remove('hidden');
  else releaseGroup.classList.add('hidden');
}

function addLayer() {
  var name = document.getElementById('layerName').value.trim() || 'NEW_COLOR';
  var idxVal = document.getElementById('layerIndex').value;
  layers.push({ name: name, index: idxVal, h: document.getElementById('hue').value, s: document.getElementById('sat').value, b: document.getElementById('bri').value, label: document.getElementById('layerLabel').value });
  rgbRenderAll();
}
function addMacro() {
  var type = document.getElementById('macroType').value;
  macros.push({ name: document.getElementById('macroName').value.trim() || 'new_macro', type: type, layer: document.getElementById('macroLayer').value, color: document.getElementById('macroColor').value, releaseColor: type === 'MOMENTARY_RGB_MACRO' ? document.getElementById('macroReleaseColor').value : '' });
  rgbRenderAll();
}
function addBehavior() {
  behaviors.push({ name: document.getElementById('behaviorName').value.trim() || 'new_behavior', label: document.getElementById('behaviorLabel').value, macro: document.getElementById('behaviorMacro').value });
  rgbRenderAll();
}
function addCombo() {
  var pos = document.getElementById('comboPos').value.trim();
  if (!pos && rgbComboSelectedPositions.length) {
    pos = rgbComboSelectedPositions.slice().sort(function(a,b) { return a-b; }).join(' ');
  }
  combos.push({ name: document.getElementById('comboName').value.trim() || 'new_combo', bind: document.getElementById('comboBind').value, pos: pos, layers: document.getElementById('comboLayersInput').value });
  rgbComboSelectedPositions = [];
  rgbEditingComboIndex = -1;
  document.getElementById('rgbComboMiniKbWrap').style.display = 'none';
  document.getElementById('comboPos').value = '';
  rgbRenderAll();
}
function addBlinkMacro() {
  blinkMacros.push({ name: document.getElementById('blinkName').value.trim() || 'new_blink', key: document.getElementById('blinkKey').value, color: document.getElementById('blinkColor').value, returnColor: document.getElementById('blinkReturnColor').value, wait: document.getElementById('blinkWait').value || '80', label: '' });
  rgbRenderAll();
}

function updateColorMapFromLayer(i) {
  var l = layers[i];
  var ck = l.name.replace(/^LAYER_/, '');
  if (hasHsbVal(l.h) && hasHsbVal(l.s) && hasHsbVal(l.b)) {
    colorValueMap['RGB_' + ck] = { h: parseInt(l.h) || 0, s: parseInt(l.s) || 0, b: parseInt(l.b) || 0 };
    colorLabelMap['RGB_' + ck] = l.label || '';
  } else {
    // Remove stale color entry when HSB values are cleared
    delete colorValueMap['RGB_' + ck];
    delete colorLabelMap['RGB_' + ck];
  }
}

// RGB Helper strings
var HELPER_BLINK_SEQ =
  '#define BLINK_SEQ(ON, OFF, WAIT) \\\n' +
  '    &macro_tap &rgb_ug ON \\\n' +
  '    &macro_wait_time WAIT \\\n' +
  '    &macro_tap &rgb_ug RGB_TOG \\\n' +
  '    &macro_wait_time WAIT \\\n' +
  '    &macro_tap &rgb_ug RGB_TOG \\\n' +
  '    &macro_wait_time WAIT \\\n' +
  '    &macro_tap &rgb_ug RGB_TOG \\\n' +
  '    &macro_wait_time WAIT \\\n' +
  '    &macro_tap &rgb_ug RGB_TOG \\\n' +
  '    &macro_wait_time WAIT \\\n' +
  '    &macro_tap &rgb_ug OFF\n';

var HELPER_MOMENTARY =
  '#define MOMENTARY_RGB_MACRO(node_name, node_label, layer, active_color, release_color) \\\n' +
  '        ZMK_MACRO(node_name, \\\n' +
  '            bindings = \\\n' +
  '                <&macro_press>, \\\n' +
  '                <&mo layer>, \\\n' +
  '                <&macro_tap>, \\\n' +
  '                <&rgb_ug active_color>, \\\n' +
  '                <&macro_pause_for_release>, \\\n' +
  '                <&macro_release>, \\\n' +
  '                <&mo layer>, \\\n' +
  '                <&macro_tap>, \\\n' +
  '                <&rgb_ug release_color>; \\\n' +
  '            label = node_label; \\\n' +
  '        )\n';

var HELPER_TO =
  '#define TO_RGB_MACRO(node_name, node_label, layer, color) \\\n' +
  '        ZMK_MACRO(node_name, \\\n' +
  '            bindings = \\\n' +
  '                <&macro_tap>, \\\n' +
  '                <&to layer>, \\\n' +
  '                <&macro_tap>, \\\n' +
  '                <&rgb_ug color>; \\\n' +
  '            label = node_label; \\\n' +
  '        )\n';

var HELPER_TO_PRESS =
  '#define TO_RGB_PRESS_MACRO(node_name, node_label, layer, color) \\\n' +
  '        ZMK_MACRO(node_name, \\\n' +
  '            bindings = \\\n' +
  '                <&macro_tap>, \\\n' +
  '                <&to layer>, \\\n' +
  '                <&macro_press>, \\\n' +
  '                <&rgb_ug color>; \\\n' +
  '            label = node_label; \\\n' +
  '        )\n';

var HELPER_HOLD_TAP =
  '#define RGB_HOLD_TAP(node_name, node_label, macro_ref) \\\n' +
  '        node_name: node_name { \\\n' +
  '            compatible = "zmk,behavior-hold-tap"; \\\n' +
  '            label = node_label; \\\n' +
  '            bindings = <&macro_ref>, <&kp>; \\\n' +
  '            #binding-cells = <2>; \\\n' +
  '            tapping-term-ms = <200>; \\\n' +
  '            flavor = "tap-preferred"; \\\n' +
  '        };\n';

var HELPER_COMBO =
  '#define COMBO(name, bind, p1, p2, ...) \\\n' +
  '    name { bindings = <bind>; key-positions = <p1 p2>; layers = <__VA_ARGS__>; timeout-ms = <50>; }\n';

// RGB output generation
// updateRgbOutput() â€” Generates the .dtsi output text for the RGB tab.
// Merges layers from the global layers[] array, deduplicates, sorts by
// index, and writes #define lines, layer macros, blink macros, behaviors,
// and combos into the output textarea.
function updateRgbOutput() {
  var out = '';
  var includeHelpers = document.getElementById('includeHelpers').checked;
  var merged = {};
  // Also build an index-based lookup so layers with the same index but different names merge
  var mergedByIndex = {};
  layers.forEach(function(l) {
    var bk = baseKey(l.name);
    var idx = (l.index !== '' && l.index !== undefined) ? String(l.index) : '';
    // Try index-based merge first (if this layer has an index matching an existing entry)
    var target = merged[bk] || (idx && mergedByIndex[idx]) || null;
    if (!target) {
      merged[bk] = { name: l.name, index: l.index, h: l.h, s: l.s, b: l.b, label: l.label, bk: bk };
      if (idx) mergedByIndex[idx] = merged[bk];
    } else {
      if (!hasHsbVal(target.h) && hasHsbVal(l.h)) target.h = l.h;
      if (!hasHsbVal(target.s) && hasHsbVal(l.s)) target.s = l.s;
      if (!hasHsbVal(target.b) && hasHsbVal(l.b)) target.b = l.b;
      if (!target.label && l.label) target.label = l.label;
      if (target.index === '' && l.index !== '') target.index = l.index;
      // If merging by index into a different baseKey, also register this bk
      if (!merged[bk]) merged[bk] = target;
    }
  });
  // Deduplicate: merged may have multiple keys pointing to the same object
  var seen = new Set();
  var mergedArr = [];
  Object.keys(merged).forEach(function(k) {
    var obj = merged[k];
    if (!seen.has(obj)) { seen.add(obj); mergedArr.push(obj); }
  });

  // Sort merged output by layer index so #define lines are in sequential order (0, 1, 2...)
  // Layers without an index go to the end
  mergedArr.sort(function(a, b) {
    var ai = (a.index !== '' && a.index !== undefined) ? parseInt(a.index) : 9999;
    var bi = (b.index !== '' && b.index !== undefined) ? parseInt(b.index) : 9999;
    return ai - bi;
  });

  out += '/* ---- STEP 1: DEFINE LAYERS ---- */\n';
  mergedArr.forEach(function(l) {
    if (l.index !== '') {
      var name = l.name.startsWith('LAYER_') ? l.name : 'LAYER_' + l.bk;
      out += '#define ' + name + ' ' + l.index + '\n';
    }
  });

  out += '\n/* ---- STEP 1a: DEFINE COLORS ---- */\n';
  mergedArr.forEach(function(l) {
    if (hasHsbVal(l.h) && hasHsbVal(l.s) && hasHsbVal(l.b)) {
      var name = l.name.startsWith('RGB_') ? l.name : 'RGB_' + l.bk;
      out += '#define ' + name.replace(/\s/g, '_') + ' RGB_COLOR_HSB(' + l.h + ',' + l.s + ',' + l.b + ')';
      if (l.label) out += '      /* ' + l.label + ' */';
      out += '\n';
    }
  });

  var mergedBKs = {};
  mergedArr.forEach(function(l) { mergedBKs[l.bk] = true; });
  var orphanColors = [];
  Object.keys(colorValueMap).forEach(function(ck) {
    if (!mergedBKs[baseKey(ck)] && !colorValueMap[ck]._autoSync) orphanColors.push(ck);
  });
  // Build a lookup for disabled orphans from the layers array
  var disabledOrphans = {};
  layers.forEach(function(l) {
    if ((l.index === '' || l.index === undefined) && l.enabled === false) {
      disabledOrphans[l.name] = true;
    }
  });
  if (orphanColors.length) {
    var enabledOrphans = orphanColors.filter(function(ck) { return !disabledOrphans[ck]; });
    if (enabledOrphans.length) {
      out += '\n/* ---- (OPTIONAL) BLINK HELPERS ---- */\n';
      enabledOrphans.forEach(function(ck) {
        var v = colorValueMap[ck];
        out += '#define ' + ck + ' RGB_COLOR_HSB(' + v.h + ',' + v.s + ',' + v.b + ')';
        if (colorLabelMap[ck]) out += '    /* ' + colorLabelMap[ck] + ' */';
        out += '\n';
      });
    }
  }

  if (includeHelpers) {
    out += '\n/* ---- HELPER DEFINITIONS ---- */\n';
    out += HELPER_BLINK_SEQ;
    out += HELPER_MOMENTARY;
    out += HELPER_TO;
    out += HELPER_TO_PRESS;
    out += HELPER_HOLD_TAP;
    out += HELPER_COMBO;
  }

  if (macros.length) {
    out += '\n/* ---- STEP 2+3: MACROS ---- */\n';
    macros.forEach(function(m) {
      if (m.type === 'MOMENTARY_RGB_MACRO') {
        out += 'MOMENTARY_RGB_MACRO(' + m.name + ', "' + m.name + '", ' + m.layer + ', ' + m.color + ', ' + m.releaseColor + ')\n';
      } else if (m.type === 'TO_RGB_PRESS_MACRO') {
        out += 'TO_RGB_PRESS_MACRO(' + m.name + ', "' + m.name + '", ' + m.layer + ', ' + m.color + ')\n';
      } else {
        out += 'TO_RGB_MACRO(' + m.name + ', "' + m.name + '", ' + m.layer + ', ' + m.color + ')\n';
      }
    });
  }

  if (blinkMacros.length) {
    out += '\n/* ---- BLINK/STATUS MACROS ---- */\n';
    var seenBlink = {};
    blinkMacros.forEach(function(bm) {
      if (!bm.color || !bm.returnColor) return;
      if (seenBlink[bm.name]) return;
      seenBlink[bm.name] = true;
      out += 'ZMK_MACRO(' + bm.name + ',\n';
      if (bm.label) out += '    label = "' + bm.label + '";\n';
      if (bm.key.indexOf('&mo') === 0) {
        // Momentary-style blink: press + pause + release
        out += '    bindings = <&macro_press ' + bm.key + ' BLINK_SEQ(' + bm.color + ', ' + bm.returnColor + ', ' + bm.wait + ')>,\n';
        out += '               <&macro_pause_for_release>,\n';
        out += '               <&macro_release ' + bm.key + '>;\n';
      } else {
        out += '    bindings = <&macro_tap &kp ' + bm.key + ' BLINK_SEQ(' + bm.color + ', ' + bm.returnColor + ', ' + bm.wait + ')>;\n';
      }
      out += ')\n';
    });
  }

  if (behaviors.length) {
    out += '\n/* ---- STEP 4: BEHAVIORS ---- */\n';
    behaviors.forEach(function(b) {
      out += 'RGB_HOLD_TAP(' + b.name + ', "' + b.label + '", ' + b.macro + ')\n';
    });
  }

  if (combos.length) {
    out += '\n/* ---- STEP 5: COMBOS ---- */\n';
    combos.forEach(function(c) {
      out += 'COMBO(' + c.name + ', ' + c.bind + ', ' + c.pos + ', ' + c.layers + ')\n';
    });
  }

  document.getElementById('output').value = out;
  var layerCount = mergedArr.filter(function(l) { return l.index !== ''; }).length;
  document.getElementById('outputStats').textContent =
    layerCount + ' layers \u00B7 ' + macros.length + ' macros \u00B7 ' +
    behaviors.length + ' behaviors \u00B7 ' + combos.length + ' combos \u00B7 ' +
    blinkMacros.length + ' blink';
}

// ================================================================
// SECTION: SVG KEYBOARD RENDERER
// Draws the on-screen keyboard picture. Each physical key position
// from keyboardLayout is turned into an SVG <rect> and <text> element.
// Clicking a key calls showBindingEditor() to let you change it.
// Also used in combo mode to show which keys are in a combo.
// More on this code can be found in 'RefDoc' line 595
// ================================================================
var KEY_SCALE = 56; // pixels per unit
var KEY_SIZE = 52;  // inner key size (slightly less than KEY_SCALE for gap)
var KEY_RADIUS = 5;

// loadLayout(layoutObj) â€” Takes a keyboard layout JSON and extracts
// the physical key position array. Falls back to null if invalid.
function loadLayout(layoutObj) {
  if (layoutObj && layoutObj.layouts && layoutObj.layouts.default_layout) {
    keyboardLayout = layoutObj.layouts.default_layout.layout;
  } else if (Array.isArray(layoutObj)) {
    keyboardLayout = layoutObj;
  } else {
    keyboardLayout = null;
  }
}

// renderKeyboardSvg(targetId, options) â€” Draws the keyboard as SVG.
// Each key becomes a clickable rectangle showing the binding label.
// In combo mode, highlights the selected key positions instead.
function renderKeyboardSvg(targetId, options) {
  options = options || {};
  var svg = document.getElementById(targetId);
  if (!svg || !keyboardLayout) { if (svg) svg.innerHTML = '<text x="10" y="30" fill="var(--muted)">No layout loaded</text>'; return; }

  var scale = options.scale || KEY_SCALE;
  var keySize = options.keySize || KEY_SIZE;
  var isComboMode = options.comboMode || false;
  var comboPositions = options.comboPositions || [];

  // Calculate bounding box (accounts for key rotation)
  var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  keyboardLayout.forEach(function(k) {
    var x = k.x * scale, y = k.y * scale;
    var r = k.r || 0;
    if (r !== 0) {
      var rpx = (k.rx || 0) * scale, rpy = (k.ry || 0) * scale;
      var rad = r * Math.PI / 180;
      var cr = Math.cos(rad), sr = Math.sin(rad);
      [[x,y],[x+keySize,y],[x,y+keySize],[x+keySize,y+keySize]].forEach(function(c) {
        var dx = c[0] - rpx, dy = c[1] - rpy;
        var nx = rpx + dx * cr - dy * sr;
        var ny = rpy + dx * sr + dy * cr;
        if (nx < minX) minX = nx; if (ny < minY) minY = ny;
        if (nx > maxX) maxX = nx; if (ny > maxY) maxY = ny;
      });
    } else {
      if (x < minX) minX = x; if (y < minY) minY = y;
      if (x + keySize > maxX) maxX = x + keySize;
      if (y + keySize > maxY) maxY = y + keySize;
    }
  });
  var pad = 10;
  var w = maxX - minX + pad * 2;
  var h = maxY - minY + pad * 2;
  svg.setAttribute('viewBox', (minX - pad) + ' ' + (minY - pad) + ' ' + w + ' ' + h);
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

  var html = '';
  keyboardLayout.forEach(function(k, i) {
    var x = k.x * scale;
    var y = k.y * scale;
    var r = k.r || 0;
    var rx = (k.rx || 0) * scale;
    var ry = (k.ry || 0) * scale;
    var transform = '';
    if (r !== 0) {
      transform = 'rotate(' + r + ' ' + rx + ' ' + ry + ')';
    }

    // Get binding label
    var binding = '';
    var topLabel = '';
    var cssClass = 'key-group';
    if (!isComboMode && keymapLayers.length > 0 && keymapLayers[activeLayerIndex]) {
      binding = keymapLayers[activeLayerIndex].bindings[i] || '';
      var labels = bindingToLabels(binding);
      topLabel = labels.top;
      if (binding === '&trans') cssClass += ' key-trans';
      else if (binding === '&none') cssClass += ' key-none';
    }
    if (!isComboMode && i === selectedKeyIndex) cssClass += ' selected';
    if (isComboMode && comboPositions.indexOf(i) >= 0) cssClass += ' combo-selected';

    var labelText = '';
    if (!isComboMode && keymapLayers.length > 0) {
      var labels2 = bindingToLabels(binding);
      labelText = labels2.main;
      topLabel = labels2.top;
    } else if (isComboMode) {
      labelText = String(i);
    }

    // Truncate long labels to fit key width
    var maxChars = Math.floor(keySize / 6);
    if (labelText.length > maxChars) labelText = labelText.substring(0, maxChars - 1) + '\u2026';
    if (topLabel.length > maxChars) topLabel = topLabel.substring(0, maxChars - 1) + '\u2026';

    // Adaptive font sizing attributes (like reference editor)
    var dataAttrs = '';
    if (!isComboMode && labelText.length === 1 && !topLabel) {
      dataAttrs = ' data-simple="true"';
    } else if (!isComboMode && (labelText.length > 6 || (topLabel.length > 5 && labelText.length > 3))) {
      dataAttrs = ' data-long="true"';
    }

    html += '<g class="' + cssClass + '" data-key="' + i + '"' + dataAttrs + ' transform="' + transform + '">';
    html += '<rect class="key-rect" x="' + x + '" y="' + y + '" width="' + keySize + '" height="' + keySize + '" rx="' + KEY_RADIUS + '" ry="' + KEY_RADIUS + '"/>';
    if (topLabel) {
      html += '<text class="key-label-top" x="' + (x + keySize / 2) + '" y="' + (y + 12) + '">' + esc(topLabel) + '</text>';
    }
    html += '<text class="key-label" x="' + (x + keySize / 2) + '" y="' + (y + keySize / 2 + (topLabel ? 4 : 0)) + '">' + esc(labelText) + '</text>';
    html += '</g>';
  });
  svg.innerHTML = html;
}

// bindingToLabels(binding) â€” Turns a ZMK binding string like "&kp A"
// into a { top, bottom } label pair for display on SVG keys.
// "top" is the behavior name, "bottom" is the parameter (keycode).
function bindingToLabels(binding) {
  if (!binding) return { main: '', top: '' };
  binding = binding.trim();
  if (binding === '&trans') return { main: '\u25BD', top: '' }; // transparent arrow
  if (binding === '&none') return { main: '\u2205', top: '' }; // empty set
  if (binding === '&bootloader') return { main: 'BOOT', top: '' };
  if (binding === '&studio_unlock') return { main: 'STUDIO', top: '' };
  if (binding === '&sys_reset') return { main: 'RESET', top: '' };

  var parts = binding.split(/\s+/);
  var behavior = parts[0];

  if (behavior === '&kp') {
    return { main: simplifyKeycode(parts.slice(1).join(' ')), top: '' };
  }
  if (behavior === '&mo') {
    var layerLabel = getLayerLabel(parts[1]);
    return { main: layerLabel, top: 'MO' };
  }
  if (behavior === '&to') {
    return { main: getLayerLabel(parts[1]), top: 'TO' };
  }
  if (behavior === '&tog') {
    return { main: getLayerLabel(parts[1]), top: 'TOG' };
  }
  if (behavior === '&lt') {
    return { main: simplifyKeycode(parts.slice(2).join(' ')), top: 'LT ' + getLayerLabel(parts[1]) };
  }
  if (behavior === '&mt') {
    return { main: simplifyKeycode(parts.slice(2).join(' ')), top: simplifyMod(parts[1]) };
  }
  if (behavior === '&sk') {
    return { main: simplifyKeycode(parts[1] || ''), top: 'SK' };
  }
  if (behavior === '&sl') {
    return { main: getLayerLabel(parts[1]), top: 'SL' };
  }
  if (behavior === '&bt') {
    return { main: parts.slice(1).join(' '), top: 'BT' };
  }
  if (behavior === '&rgb_ug') {
    return { main: (parts[1] || '').replace('RGB_', ''), top: 'RGB' };
  }
  if (behavior === '&out') {
    return { main: (parts[1] || '').replace('OUT_', ''), top: 'OUT' };
  }
  // Custom behaviors: &hm, &hold_tap_*, &td_*, &f_blink_test, etc.
  var behName = behavior.replace('&', '');
  if (parts.length === 3) {
    // Two-param custom behavior (like hold-tap): show tap key, hold behavior on top
    return { main: simplifyKeycode(parts[2]), top: behName };
  }
  if (parts.length === 2) {
    return { main: simplifyKeycode(parts[1]), top: behName };
  }
  return { main: behName, top: '' };
}

// simplifyKeycode(kc) â€” Shortens long ZMK keycode names for display.
// For example, "LEFT_SHIFT" becomes "LSHFT", "BACKSPACE" becomes "BSPC".
function simplifyKeycode(kc) {
  if (!kc) return '';
  // Handle compound modifiers: LS(LA(DOWN)) â†’ LS+LA DOWN
  var modMatch = kc.match(/^([A-Z]+)\((.+)\)$/);
  if (modMatch) {
    var inner = simplifyKeycode(modMatch[2]);
    var mod = modMatch[1];
    return mod + '(' + inner + ')';
  }
  // Common simplifications
  var map = {
    'BACKSPACE': 'BKSP', 'DELETE': 'DEL', 'ESCAPE': 'ESC', 'ENTER': 'ENT',
    'SPACE': 'SPC', 'LEFT_SHIFT': 'LSFT', 'LEFT_CONTROL': 'LCTL', 'LEFT_ALT': 'LALT',
    'LEFT_GUI': 'LGUI', 'RIGHT_SHIFT': 'RSFT', 'RIGHT_CONTROL': 'RCTL', 'RIGHT_ALT': 'RALT',
    'RIGHT_GUI': 'RGUI', 'PAGE_UP': 'PGUP', 'PAGE_DOWN': 'PGDN', 'SEMICOLON': ';',
    'COMMA': ',', 'DOT': '.', 'FSLH': '/', 'BSLH': '\\', 'GRAVE': '`', 'SQT': "'",
    'MINUS': '-', 'EQUAL': '=', 'LBKT': '[', 'RBKT': ']', 'CAPSLOCK': 'CAPS',
    'PRINTSCREEN': 'PSCR', 'SCROLLLOCK': 'SCLK', 'INSERT': 'INS',
    'C_VOL_UP': 'VOL+', 'C_VOLUME_UP': 'VOL+', 'C_VOL_DN': 'VOL-', 'C_VOLUME_DOWN': 'VOL-',
    'C_MUTE': 'MUTE', 'C_PLAY_PAUSE': '\u23EF', 'C_NEXT': '\u23ED', 'C_PREV': '\u23EE',
    'C_REWIND': '\u23EA', 'C_FAST_FORWARD': '\u23E9', 'C_BRI_UP': 'BRI+', 'C_BRI_DN': 'BRI-'
  };
  return map[kc] || kc;
}

function simplifyMod(mod) {
  var map = {
    'LEFT_SHIFT': 'LSFT', 'LSHIFT': 'LSFT', 'LEFT_CONTROL': 'LCTL', 'LCTRL': 'LCTL',
    'LEFT_ALT': 'LALT', 'LEFT_GUI': 'LGUI', 'RIGHT_SHIFT': 'RSFT', 'RSHIFT': 'RSFT',
    'RIGHT_CONTROL': 'RCTL', 'RCTRL': 'RCTL', 'RIGHT_ALT': 'RALT', 'RGUI': 'RGUI'
  };
  return map[mod] || mod;
}

// getLayerLabel(idx) â€” Returns a human-readable label for a layer
// number, using the layer's displayName if set, otherwise its name.
function getLayerLabel(idx) {
  var n = parseInt(idx);
  if (!isNaN(n) && keymapLayers[n]) {
    return keymapLayers[n].displayName || keymapLayers[n].name || String(n);
  }
  return idx || '?';
}

// ================================================================
// SECTION: .KEYMAP FILE PARSER (parseKeymap)
// When you paste a .keymap file and click "Parse", this reads the
// ZMK devicetree format to extract: layers (with their bindings),
// combos, macros, custom behaviors, conditional layers, and sensor
// bindings. Results go into keymapLayers[], keymapCombos[], etc.
// Layers are assigned sequential index numbers (0, 1, 2...) based
// on the order they appear in the keymap {} block.
// More on this code can be found in 'RefDoc' line 680
// ================================================================
// parseKeymap(text) \u2014 The main .keymap parser. Reads ZMK devicetree text\n// and extracts layers, combos, macros, behaviors, conditional layers, and\n// sensor bindings. This is the biggest function in the file. It works by\n// using regex patterns to find each section of the devicetree format.\nfunction parseKeymap(text) {
  // Preserve cross-tab data (items synced from RGB tab)
  var savedMacros = keymapMacros.filter(function(m) { return m._fromRgb; });
  var savedBehaviors = keymapBehaviors.filter(function(b) { return b._fromRgb || b._fromDtsi; });
  keymapLayers = [];
  keymapCombos = [];
  keymapMacros = [];
  keymapBehaviors = [];
  keymapConditionalLayers = [];
  keymapSensorBindings = [];
  // Restore cross-tab data
  savedMacros.forEach(function(m) { keymapMacros.push(m); });
  savedBehaviors.forEach(function(b) { keymapBehaviors.push(b); });

  // Parse #include lines and header comment from user's pasted text
  keymapParsedIncludes = [];
  var headerLines = [];
  var textLines = text.split('\n');
  for (var li = 0; li < textLines.length; li++) {
    var tl = textLines[li].trim();
    if (tl === '' || tl.startsWith('/*') || tl.startsWith(' *') || tl.startsWith('*') || tl.startsWith('//')) {
      headerLines.push(textLines[li]);
      continue;
    }
    if (tl.startsWith('#include')) {
      keymapParsedIncludes.push(textLines[li]);
      continue;
    }
    break; // Stop once we hit non-header content
  }

  // Capture raw pre-keymap blocks (combos, behaviors, macros) to preserve original formatting
  keymapParsedRawBlocks = null;
  var keymapStart = text.search(/keymap\s*\{/);
  if (keymapStart >= 0) {
    // Find the devicetree root node opening that contains keymap
    // Walk backwards from keymapStart to find the nearest `/ {` or content after includes
    var preKeymapText = text.substring(0, keymapStart);
    // Strip everything up to and including the last `/ {` that opens the keymap's root
    // Find the last opening `/ {` before keymap
    var lastRootOpen = -1;
    var rootOpenRe = /\/\s*\{/g;
    var rm2;
    while ((rm2 = rootOpenRe.exec(preKeymapText))) {
      lastRootOpen = rm2.index;
    }
    if (lastRootOpen >= 0) {
      preKeymapText = preKeymapText.substring(0, lastRootOpen).trim();
    }
    // Now strip includes and header comments from the beginning
    var afterIncludes = preKeymapText;
    var incEndIdx = 0;
    var pkLines = preKeymapText.split('\n');
    for (var pi = 0; pi < pkLines.length; pi++) {
      var pt = pkLines[pi].trim();
      if (pt === '' || pt.startsWith('/*') || pt.startsWith(' *') || pt.startsWith('*') || pt.startsWith('//') || pt.startsWith('#include')) {
        incEndIdx = pi + 1;
        continue;
      }
      break;
    }
    afterIncludes = pkLines.slice(incEndIdx).join('\n').trim();
    if (afterIncludes) {
      keymapParsedRawBlocks = afterIncludes;
    }
  }

  // Extract layers from keymap block
  // Pattern: layer_name { display-name = "..."; bindings = <...>; };
  var layerBlockRe = /(\w+)\s*\{([^}]*?bindings\s*=\s*<([\s\S]*?)>;[\s\S]*?)\}/g;
  var reservedRe = /(\w+)\s*\{\s*status\s*=\s*"reserved"\s*;\s*\}/g;
  var insideKeymap = false;
  var keymapMatch = text.match(/keymap\s*\{[\s\S]*?compatible\s*=\s*"zmk,keymap"\s*;([\s\S]*)\}\s*;\s*\}\s*;/);
  var keymapBody = keymapMatch ? keymapMatch[1] : text;

  // Find reserved layers
  var rm;
  var reservedNames = {};
  while ((rm = reservedRe.exec(keymapBody))) {
    reservedNames[rm[1]] = true;
  }

  // Find actual layers with bindings
  var lm;
  while ((lm = layerBlockRe.exec(keymapBody))) {
    var lname = lm[1];
    if (lname === 'keymap' || lname === '/' || reservedNames[lname]) continue;
    var body = lm[2];
    var bindingsStr = lm[3];

    // Get display-name
    var dnMatch = body.match(/display-name\s*=\s*"([^"]*)"/);
    var labelMatch = body.match(/label\s*=\s*"([^"]*)"/);
    var displayName = dnMatch ? dnMatch[1] : (labelMatch ? labelMatch[1] : lname);

    // Parse bindings
    var bindings = parseBindings(bindingsStr);

    // Parse sensor-bindings for this layer
    var sensorMatch = body.match(/sensor-bindings\s*=\s*<([^>]*)>/);
    var layerIdx = keymapLayers.length;

    keymapLayers.push({
      name: lname,
      displayName: displayName,
      bindings: bindings,
      status: 'active'
    });

    if (sensorMatch) {
      var sensorStr = sensorMatch[1].trim();
      // Parse sensor bindings: could be like &inc_dec_kp C_VOL_UP C_VOL_DN
      var sensorTokens = [];
      var si = 0;
      while (si < sensorStr.length) {
        if (sensorStr[si] === '&') {
          var start = si;
          si++;
          while (si < sensorStr.length && /[a-zA-Z0-9_]/.test(sensorStr[si])) si++;
          var beh = sensorStr.substring(start, si);
          var prms = '';
          while (si < sensorStr.length && sensorStr[si] !== '&') { prms += sensorStr[si]; si++; }
          sensorTokens.push((beh + prms).trim());
        } else { si++; }
      }
      if (sensorTokens.length > 0) {
        keymapSensorBindings.push({ layerIndex: layerIdx, bindings: sensorTokens });
      }
    }
  }

  // Add reserved layers
  Object.keys(reservedNames).forEach(function(rn) {
    keymapLayers.push({ name: rn, displayName: rn, bindings: [], status: 'reserved' });
  });

  // Parse combos if present
  var comboSection = text.match(/combos\s*\{[\s\S]*?compatible\s*=\s*"zmk,combos"\s*;([\s\S]*?)\}\s*;\s*\}/);
  if (comboSection) {
    var comboContent = comboSection[1] + '};';
    var comboRe = /(\w+)\s*\{([^}]*)\}/g;
    var cm;
    while ((cm = comboRe.exec(comboContent))) {
      var cname = cm[1];
      var cbody = cm[2];
      var cbindMatch = cbody.match(/bindings\s*=\s*<([^>]*)>/);
      var cposMatch = cbody.match(/key-positions\s*=\s*<([^>]*)>/);
      var clayerMatch = cbody.match(/layers\s*=\s*<([^>]*)>/);
      var ctimeMatch = cbody.match(/timeout-ms\s*=\s*<(\d+)>/);
      var cslow = /slow-release\s*;/.test(cbody);
      var crpi = cbody.match(/require-prior-idle-ms\s*=\s*<(\d+)>/);
      keymapCombos.push({
        name: cname,
        binding: cbindMatch ? cbindMatch[1].trim() : '',
        positions: cposMatch ? cposMatch[1].trim().split(/\s+/).map(Number) : [],
        layers: clayerMatch ? clayerMatch[1].trim() : '',
        timeout: ctimeMatch ? parseInt(ctimeMatch[1]) : 50,
        slowRelease: cslow,
        requirePriorIdle: crpi ? crpi[1] : ''
      });
    }
  }

  // Parse conditional layers
  var condSection = text.match(/conditional_layers\s*\{[\s\S]*?compatible\s*=\s*"zmk,conditional-layers"\s*;([\s\S]*?)\}\s*;\s*\}/);
  if (condSection) {
    var condContent = condSection[1] + '};';
    var condRe = /(\w+)\s*\{([^}]*)\}/g;
    var cdm;
    while ((cdm = condRe.exec(condContent))) {
      var cdname = cdm[1];
      var cdbody = cdm[2];
      var ifMatch = cdbody.match(/if-layers\s*=\s*<([^>]*)>/);
      var thenMatch = cdbody.match(/then-layer\s*=\s*<([^>]*)>/);
      if (ifMatch && thenMatch) {
        keymapConditionalLayers.push({
          name: cdname,
          ifLayers: ifMatch[1].trim().split(/\s+/).map(Number),
          thenLayer: parseInt(thenMatch[1].trim())
        });
      }
    }
  }

  // Parse macros
  var macroSection = text.match(/macros\s*\{([\s\S]*?)\}\s*;\s*\}/);
  if (macroSection) {
    var macroContent = macroSection[1] + '};';
    var macroRe = /(\w+)\s*:\s*\w+\s*\{([^}]*)\}/g;
    var mm;
    while ((mm = macroRe.exec(macroContent))) {
      var mname = mm[1];
      var mbody = mm[2];
      var mcompat = mbody.match(/compatible\s*=\s*"([^"]*)"/);
      var mlabel = mbody.match(/label\s*=\s*"([^"]*)"/);
      var mbind = mbody.match(/bindings\s*=\s*<([^>]*)>/);
      var mwait = mbody.match(/wait-ms\s*=\s*<(\d+)>/);
      var mtap = mbody.match(/tap-ms\s*=\s*<(\d+)>/);
      var paramType = 0;
      if (mcompat) {
        if (mcompat[1] === 'zmk,behavior-macro-one-param') paramType = 1;
        else if (mcompat[1] === 'zmk,behavior-macro-two-param') paramType = 2;
      }
      var steps = mbind ? parseBindings(mbind[1]) : [];
      keymapMacros.push({
        name: mname,
        label: mlabel ? mlabel[1] : '',
        steps: steps,
        paramType: paramType,
        waitMs: mwait ? mwait[1] : '',
        tapMs: mtap ? mtap[1] : ''
      });
    }
  }

  // Parse custom behaviors
  var behSection = text.match(/behaviors\s*\{([\s\S]*?)\}\s*;\s*\}/);
  if (behSection) {
    var behContent = behSection[1] + '};';
    var behRe = /(\w+)\s*:\s*\w+\s*\{([^}]*)\}/g;
    var bm;
    while ((bm = behRe.exec(behContent))) {
      var bname = bm[1];
      var bbody = bm[2];
      var bcompat = bbody.match(/compatible\s*=\s*"([^"]*)"/);
      var blabel = bbody.match(/label\s*=\s*"([^"]*)"/);
      if (!bcompat) continue;
      var btype = '', config = {};
      if (bcompat[1] === 'zmk,behavior-hold-tap') {
        btype = 'hold-tap';
        var tt = bbody.match(/tapping-term-ms\s*=\s*<(\d+)>/);
        var fl = bbody.match(/flavor\s*=\s*"([^"]*)"/);
        var bn = bbody.match(/bindings\s*=\s*<([^>]*)>\s*,\s*<([^>]*)>/);
        var qt = bbody.match(/quick-tap-ms\s*=\s*<(\d+)>/);
        var rpi = bbody.match(/require-prior-idle-ms\s*=\s*<(\d+)>/);
        var htkp = bbody.match(/hold-trigger-key-positions\s*=\s*<([^>]*)>/);
        var rt = /retro-tap\s*;/.test(bbody);
        var hwu = /hold-while-undecided\s*;/.test(bbody) && !/hold-while-undecided-linger/.test(bbody);
        var hwul = /hold-while-undecided-linger\s*;/.test(bbody);
        var htor = /hold-trigger-on-release\s*;/.test(bbody);
        config = {
          tappingTerm: tt ? tt[1] : '200',
          flavor: fl ? fl[1] : 'tap-preferred',
          holdBinding: bn ? bn[1].trim() : '',
          tapBinding: bn ? bn[2].trim() : '',
          quickTap: qt ? qt[1] : '',
          requirePriorIdle: rpi ? rpi[1] : '',
          holdTriggerPositions: htkp ? htkp[1].trim() : '',
          retroTap: rt,
          holdWhileUndecided: hwu,
          holdWhileUndecidedLinger: hwul,
          holdTriggerOnRelease: htor
        };
      } else if (bcompat[1] === 'zmk,behavior-tap-dance') {
        btype = 'tap-dance';
        var tt2 = bbody.match(/tapping-term-ms\s*=\s*<(\d+)>/);
        var bn2 = bbody.match(/bindings\s*=\s*(<[^;]*);/);
        var tdBindStr = bn2 ? bn2[1].trim() : '';
        config = { tappingTerm: tt2 ? tt2[1] : '200', bindings: tdBindStr };
      } else if (bcompat[1] === 'zmk,behavior-mod-morph') {
        btype = 'mod-morph';
        var bn3 = bbody.match(/bindings\s*=\s*<([^>]*)>\s*,\s*<([^>]*)>/);
        var mods = bbody.match(/mods\s*=\s*<\(([^)]*)\)>/);
        config = { normalBinding: bn3 ? bn3[1].trim() : '', morphedBinding: bn3 ? bn3[2].trim() : '', mods: mods ? mods[1].trim() : '' };
      } else if (bcompat[1] === 'zmk,behavior-sticky-key') {
        btype = 'sticky-key';
        var ra = bbody.match(/release-after-ms\s*=\s*<(\d+)>/);
        var bn4 = bbody.match(/bindings\s*=\s*<([^>]*)>/);
        var skqr = /quick-release\s*;/.test(bbody);
        var sklz = /\blazy\s*;/.test(bbody);
        var skim = /ignore-modifiers\s*;/.test(bbody);
        config = { releaseAfter: ra ? ra[1] : '1000', binding: bn4 ? bn4[1].trim() : '', quickRelease: skqr, lazy: sklz, ignoreMods: skim };
      } else if (bcompat[1] === 'zmk,behavior-sensor-rotate') {
        btype = 'sensor-rotate';
        var bn5 = bbody.match(/bindings\s*=\s*<([^>]*)>\s*,\s*<([^>]*)>/);
        var st = bbody.match(/tap-ms\s*=\s*<(\d+)>/);
        config = { sensorCW: bn5 ? bn5[1].trim() : '', sensorCCW: bn5 ? bn5[2].trim() : '', sensorTap: st ? st[1] : '' };
      } else if (bcompat[1] === 'zmk,behavior-key-toggle') {
        btype = 'key-toggle';
        var ktm = bbody.match(/toggle-mode\s*=\s*"([^"]*)"/);
        config = { toggleMode: ktm ? ktm[1] : '' };
      } else if (bcompat[1] === 'zmk,behavior-caps-word') {
        btype = 'caps-word';
        var cwcl = bbody.match(/continue-list\s*=\s*<([^>]*)>/);
        var cwmods = bbody.match(/mods\s*=\s*<\(([^)]*)\)>/);
        config = { continueList: cwcl ? cwcl[1].trim() : '', mods: cwmods ? cwmods[1].trim() : '' };
      } else {
        continue; // Skip unknown behavior types
      }
      keymapBehaviors.push({ name: bname, type: btype, label: blabel ? blabel[1] : '', config: config });
    }
  }
}

// parseBindings(str) â€” Splits a bindings string like "&kp A &mo 1 &trans"
// into an array of individual binding strings ["&kp A", "&mo 1", "&trans"].
// Handles nested parentheses for complex bindings like "&macro_press &kp LS(A)".
function parseBindings(str) {
  // Tokenize bindings: split on &, keeping the & with the token
  var bindings = [];
  str = str.trim();
  // Remove all newlines and normalize spaces
  str = str.replace(/\s+/g, ' ').trim();

  var tokens = [];
  var i = 0;
  while (i < str.length) {
    if (str[i] === '&') {
      var start = i;
      i++;
      // Read behavior name
      while (i < str.length && /[a-zA-Z0-9_]/.test(str[i])) i++;
      var behaviorPart = str.substring(start, i);
      // Now read parameters (until next & or end)
      var params = '';
      while (i < str.length && str[i] !== '&') {
        params += str[i];
        i++;
      }
      tokens.push((behaviorPart + params).trim());
    } else {
      i++;
    }
  }
  return tokens;
}

// ================================================================
// SECTION: LAYER TABS & MANAGEMENT
// The sidebar on the left shows one tab per layer. Click a tab to
// switch the active layer; right-click for options (rename, move,
// status, delete). renderLayerTabs() rebuilds these tabs whenever
// layers change. The active layer's bindings are shown on the SVG.
// More on this code can be found in 'RefDoc' line 750
// ================================================================
// renderLayerTabs() â€” Rebuilds the layer sidebar tabs (left panel).
// Each layer gets a clickable tab. Active layer is highlighted.
// Reserved layers are shown dimmed. Click a tab to switch layers.
function renderLayerTabs() {
  var container = document.getElementById('layerSidebar');
  var html = '<div class="layer-sidebar-label">Layers</div>';
  keymapLayers.forEach(function(l, i) {
    if (l.status === 'reserved') return;
    var cls = i === activeLayerIndex ? 'layer-tab active' : 'layer-tab';
    // Look up matching RGB layer color â€” match by index first, then by name
    var colorDot = '';
    var idxStr = String(i);
    var lName = l.name.toUpperCase();
    var dispUpper = l.displayName ? l.displayName.toUpperCase().replace(/[^A-Z0-9]/g, '_') : '';
    var rgbMatch = layers.find(function(rl) {
      // Index match (most reliable across name differences)
      if (rl.index !== '' && rl.index !== undefined && String(rl.index) === idxStr) return true;
      // Name match fallbacks
      if (rl.name === l.name || rl.name === 'LAYER_' + lName) return true;
      if (dispUpper && baseKey(rl.name) === dispUpper) return true;
      return false;
    });
    if (rgbMatch && hasHsbVal(rgbMatch.h) && hasHsbVal(rgbMatch.s) && hasHsbVal(rgbMatch.b)) {
      var dotColor = hsbToHex(rgbMatch.h, rgbMatch.s, rgbMatch.b);
      colorDot = '<span class="lt-color" style="background:' + dotColor + ';"></span>';
    }
    html += '<button class="' + cls + '" data-layer="' + i + '" draggable="true" title="' + esc(l.displayName || l.name) + '">';
    html += '<span class="lt-index">' + i + '</span>';
    html += '<span class="lt-name">' + esc(l.displayName || l.name) + '</span>';
    html += colorDot;
    html += '<span class="lt-delete" data-delete-layer="' + i + '" title="Delete layer">&times;</span>';
    html += '</button>';
  });
  html += '<button class="layer-tab layer-tab-add" id="addLayerTabBtn" title="Add layer">+</button>';
  container.innerHTML = html;
  // Update layer header
  updateLayerHeader();
}

function updateLayerHeader() {
  var nameEl = document.getElementById('layerNameDisplay');
  if (keymapLayers.length > 0 && keymapLayers[activeLayerIndex] && keymapLayers[activeLayerIndex].status !== 'reserved') {
    var l = keymapLayers[activeLayerIndex];
    nameEl.textContent = (l.displayName || l.name) + ' (layer ' + activeLayerIndex + ')';
    nameEl.dataset.layerIndex = activeLayerIndex;
  } else {
    nameEl.textContent = 'No layer';
    delete nameEl.dataset.layerIndex;
  }
}

// ================================================================
// SECTION: LAYER CONTEXT MENU
// Right-clicking a layer tab opens a dropdown with options:
// rename, change display name, toggle status, move up/down, delete.
// More on this code can be found in 'RefDoc' line 750
// ================================================================
// showLayerContextMenu(anchorEl) â€” Opens a right-click menu next to
// a layer tab with options to rename, change status, move, or delete.
function showLayerContextMenu(anchorEl) {
  var menu = document.getElementById('layerCtxMenu');
  var items = [
    { label: 'Customize Layer...', action: 'customize' },
    { sep: true },
    { label: 'Duplicate Layer', action: 'duplicate' },
    { label: 'Delete Layer', action: 'delete', danger: true },
    { sep: true },
    { label: 'Quick &kp Assignment...', action: 'quick-kp' },
    { sep: true },
    { label: 'Convert &trans \u2192 &kp', action: 'trans-to-kp' },
    { label: 'Convert &trans \u2192 &none', action: 'trans-to-none' },
    { label: 'Convert &none \u2192 &kp', action: 'none-to-kp' },
    { label: 'Convert &none \u2192 &trans', action: 'none-to-trans' },
    { label: 'Convert &kp () \u2192 &trans', action: 'kp-to-trans' },
    { label: 'Convert &kp () \u2192 &none', action: 'kp-to-none' }
  ];
  var html = '';
  items.forEach(function(item) {
    if (item.sep) { html += '<div class="ctx-menu-sep"></div>'; return; }
    html += '<div class="ctx-menu-item' + (item.danger ? ' ctx-danger' : '') + '" data-action="' + item.action + '">' + item.label + '</div>';
  });
  menu.innerHTML = html;
  // Position relative to anchor
  var rect = anchorEl.getBoundingClientRect();
  menu.style.display = '';
  menu.style.left = rect.left + 'px';
  menu.style.top = (rect.bottom + 4) + 'px';
  menu.style.position = 'fixed';
  // Close on outside click
  setTimeout(function() {
    document.addEventListener('click', closeCtxMenu, { once: true });
  }, 0);
}

function closeCtxMenu() {
  document.getElementById('layerCtxMenu').style.display = 'none';
}

function handleCtxAction(action) {
  closeCtxMenu();
  if (!keymapLayers[activeLayerIndex] || keymapLayers[activeLayerIndex].status === 'reserved') return;
  if (action === 'customize') {
    openLayerCustomizeDialog();
    return;
  }
  pushUndo();
  var layer = keymapLayers[activeLayerIndex];

  if (action === 'duplicate') {
    var dup = {
      name: layer.name + '_copy',
      displayName: (layer.displayName || layer.name) + ' Copy',
      bindings: layer.bindings.slice(),
      status: 'active'
    };
    keymapLayers.splice(activeLayerIndex + 1, 0, dup);
    activeLayerIndex++;
  } else if (action === 'delete') {
    if (keymapLayers.filter(function(l) { return l.status !== 'reserved'; }).length <= 1) return;
    keymapLayers.splice(activeLayerIndex, 1);
    if (activeLayerIndex >= keymapLayers.length) activeLayerIndex = keymapLayers.length - 1;
    // Find nearest non-reserved layer
    while (activeLayerIndex > 0 && keymapLayers[activeLayerIndex].status === 'reserved') activeLayerIndex--;
    if (keymapLayers[activeLayerIndex] && keymapLayers[activeLayerIndex].status === 'reserved') {
      for (var fi = 0; fi < keymapLayers.length; fi++) {
        if (keymapLayers[fi].status !== 'reserved') { activeLayerIndex = fi; break; }
      }
    }
  } else if (action === 'quick-kp') {
    openQuickAssign();
    return; // Don't re-render below, Quick Assign handles it
  } else if (action === 'trans-to-kp') {
    var kc2 = prompt('Replace &trans with &kp [keycode]:');
    if (kc2 && kc2.trim()) {
      for (var i = 0; i < layer.bindings.length; i++) {
        if (layer.bindings[i] === '&trans') layer.bindings[i] = '&kp ' + kc2.trim().toUpperCase();
      }
    }
  } else if (action === 'trans-to-none') {
    for (var i = 0; i < layer.bindings.length; i++) {
      if (layer.bindings[i] === '&trans') layer.bindings[i] = '&none';
    }
  } else if (action === 'none-to-kp') {
    var kc3 = prompt('Replace &none with &kp [keycode]:');
    if (kc3 && kc3.trim()) {
      for (var i = 0; i < layer.bindings.length; i++) {
        if (layer.bindings[i] === '&none') layer.bindings[i] = '&kp ' + kc3.trim().toUpperCase();
      }
    }
  } else if (action === 'none-to-trans') {
    for (var i = 0; i < layer.bindings.length; i++) {
      if (layer.bindings[i] === '&none') layer.bindings[i] = '&trans';
    }
  } else if (action === 'kp-to-trans') {
    for (var i = 0; i < layer.bindings.length; i++) {
      if (layer.bindings[i].startsWith('&kp ')) layer.bindings[i] = '&trans';
    }
  } else if (action === 'kp-to-none') {
    for (var i = 0; i < layer.bindings.length; i++) {
      if (layer.bindings[i].startsWith('&kp ')) layer.bindings[i] = '&none';
    }
  }
  renderLayerTabs();
  renderKeyboardSvg('keyboardSvg');
  updateKeymapOutput();
}

function openLayerCustomizeDialog() {
  var layer = keymapLayers[activeLayerIndex];
  if (!layer) return;
  var overlay = document.getElementById('layerCustomizeOverlay');
  document.getElementById('lcTitle').textContent = layer.name;
  document.getElementById('lcName').value = layer.name;
  document.getElementById('lcLabel').value = layer.displayName || '';
  overlay.style.display = 'flex';
}

function closeLayerCustomizeDialog() {
  document.getElementById('layerCustomizeOverlay').style.display = 'none';
}

// ================================================================
// SECTION: MODIFIER HELPERS
// These helpers translate ZMK modifier function names like LS(A)
// into human-readable labels. MOD_FUNCS maps short names to their
// function wrappers. Used by bindingToLabels() and the binding editor.
// More on this code can be found in 'RefDoc' line 640
// ================================================================
var MOD_FUNCS = {
  LSHFT: 'LS', LALT: 'LA', LCTRL: 'LC', LGUI: 'LG',
  RSHFT: 'RS', RALT: 'RA', RCTRL: 'RC', RGUI: 'RG'
};

function wrapWithModifiers(keycode) {
  var checkboxes = document.querySelectorAll('#beModCheckboxes input[type=checkbox]');
  var mods = [];
  checkboxes.forEach(function(cb) { if (cb.checked) mods.push(cb.dataset.mod); });
  if (mods.length === 0) return keycode;
  // Wrap innermost first: LS(LA(keycode))
  var result = keycode;
  mods.reverse().forEach(function(m) {
    result = MOD_FUNCS[m] + '(' + result + ')';
  });
  return result;
}

function parseModsFromKeycode(kc) {
  // Unwrap modifier functions like LS(LA(X)) -> { mods: ['LSHFT','LALT'], key: 'X' }
  var mods = [];
  var modMap = { LS: 'LSHFT', LA: 'LALT', LC: 'LCTRL', LG: 'LGUI', RS: 'RSHFT', RA: 'RALT', RC: 'RCTRL', RG: 'RGUI' };
  var s = kc.trim();
  while (true) {
    var m = s.match(/^(LS|LA|LC|LG|RS|RA|RC|RG)\((.+)\)$/);
    if (!m) break;
    mods.push(modMap[m[1]]);
    s = m[2];
  }
  return { mods: mods, key: s };
}

function charToZmkKeycode(ch) {
  var map = {
    'a':'A','b':'B','c':'C','d':'D','e':'E','f':'F','g':'G','h':'H','i':'I','j':'J','k':'K','l':'L','m':'M',
    'n':'N','o':'O','p':'P','q':'Q','r':'R','s':'S','t':'T','u':'U','v':'V','w':'W','x':'X','y':'Y','z':'Z',
    'A':'LS(A)','B':'LS(B)','C':'LS(C)','D':'LS(D)','E':'LS(E)','F':'LS(F)','G':'LS(G)','H':'LS(H)','I':'LS(I)',
    'J':'LS(J)','K':'LS(K)','L':'LS(L)','M':'LS(M)','N':'LS(N)','O':'LS(O)','P':'LS(P)','Q':'LS(Q)','R':'LS(R)',
    'S':'LS(S)','T':'LS(T)','U':'LS(U)','V':'LS(V)','W':'LS(W)','X':'LS(X)','Y':'LS(Y)','Z':'LS(Z)',
    '0':'N0','1':'N1','2':'N2','3':'N3','4':'N4','5':'N5','6':'N6','7':'N7','8':'N8','9':'N9',
    ' ':'SPACE','!':'LS(N1)','@':'LS(N2)','#':'LS(N3)','$':'LS(N4)','%':'LS(N5)','^':'LS(N6)',
    '&':'LS(N7)','*':'LS(N8)','(':'LS(N9)',')':'LS(N0)','-':'MINUS','_':'LS(MINUS)',
    '=':'EQUAL','+':'LS(EQUAL)','[':'LBKT',']':'RBKT','{':'LS(LBKT)','}':'LS(RBKT)',
    '\\':'BSLH','|':'LS(BSLH)',';':'SEMI',':':'LS(SEMI)','\'':'SQT','"':'LS(SQT)',
    ',':'COMMA','<':'LS(COMMA)','.':'DOT','>':'LS(DOT)','/':'FSLH','?':'LS(FSLH)',
    '`':'GRAVE','~':'LS(GRAVE)','\t':'TAB','\n':'RET'
  };
  return map[ch] || null;
}

// ================================================================
// SECTION: BINDING EDITOR
// When you click a key on the SVG keyboard, this panel opens.
// It shows a dropdown of behaviors (&kp, &mo, &lt, etc.) and a
// grid of keycodes. Pick a behavior, pick parameters, and click
// Apply to save the binding to the layer. populateKeycodeGrids()
// fills the grid; showBindingEditor() opens the panel.
// More on this code can be found in 'RefDoc' line 829
// ================================================================
// populateKeycodeGrids() â€” Fills the keycode picker tabs (letters,
// numbers, symbols, etc.) with clickable buttons for every ZMK keycode.
function populateKeycodeGrids() {
  var gridMap = {
    letters: 'kcLetters', numbers: 'kcNumbers', modifiers: 'kcMods', navigation: 'kcNav',
    control: 'kcControl', locks: 'kcLocks', editing: 'kcEdit', symbols: 'kcSymbols',
    fkeys: 'kcFkeys', numpad: 'kcNumpad', media: 'kcMedia', applications: 'kcApps',
    misc: 'kcMisc', international: 'kcInternational', language: 'kcLanguage', power: 'kcPower'
  };
  Object.keys(ZMK_KEYCODES).forEach(function(cat) {
    var gridId = gridMap[cat];
    var grid = document.getElementById(gridId);
    if (!grid) return;
    grid.innerHTML = ZMK_KEYCODES[cat].map(function(kc) {
      return '<button class="keycode-btn" data-kc="' + kc + '">' + kc + '</button>';
    }).join('');
  });
}

// populateBehaviorDropdown() â€” Fills the behavior <select> dropdown
// with all built-in behaviors (&kp, &mo, &lt, etc.) plus any custom
// user-defined behaviors from keymapBehaviors[].
function populateBehaviorDropdown() {
  var sel = document.getElementById('beBehavior');
  var html = '';
  ZMK_BEHAVIORS.forEach(function(b) {
    html += '<option value="' + esc(b.name) + '">' + esc(b.name) + ' - ' + esc(b.label) + '</option>';
  });
  // Add custom behaviors from keymap
  keymapBehaviors.forEach(function(cb) {
    html += '<option value="&' + esc(cb.name) + '">&' + esc(cb.name) + ' (custom)</option>';
  });
  // Add macros from keymap editor as behaviors (0-param macros can be used as bindings)
  var addedMacros = {};
  keymapMacros.forEach(function(m) {
    var ref = '&' + m.name;
    if (!addedMacros[ref]) {
      addedMacros[ref] = true;
      var paramLabel = m.paramType === 1 ? ' (1-param macro)' : m.paramType === 2 ? ' (2-param macro)' : ' (macro)';
      html += '<option value="' + esc(ref) + '">' + esc(ref) + paramLabel + '</option>';
    }
  });
  // Add blink macros from RGB tab as behaviors
  blinkMacros.forEach(function(bm) {
    var ref = '&' + bm.name;
    if (!addedMacros[ref]) {
      addedMacros[ref] = true;
      html += '<option value="' + esc(ref) + '">' + esc(ref) + ' (blink macro)</option>';
    }
  });
  // Add RGB tab macros as behaviors
  macros.forEach(function(m) {
    var ref = '&' + m.name;
    if (!addedMacros[ref]) {
      addedMacros[ref] = true;
      html += '<option value="' + esc(ref) + '">' + esc(ref) + ' (RGB macro)</option>';
    }
  });
  // Add behaviors referenced in keymap that aren't in the standard list
  var knownBehaviors = {};
  ZMK_BEHAVIORS.forEach(function(b) { knownBehaviors[b.name] = true; });
  keymapBehaviors.forEach(function(cb) { knownBehaviors['&' + cb.name] = true; });
  Object.keys(addedMacros).forEach(function(k) { knownBehaviors[k] = true; });

  var customFound = {};
  keymapLayers.forEach(function(l) {
    l.bindings.forEach(function(b) {
      var beh = b.split(/\s+/)[0];
      if (beh && !knownBehaviors[beh] && !customFound[beh]) {
        customFound[beh] = true;
        html += '<option value="' + esc(beh) + '">' + esc(beh) + ' (from keymap)</option>';
      }
    });
  });
  sel.innerHTML = html;
}

// showBindingEditor(keyIdx) â€” Opens the binding editor panel for the
// key at position keyIdx. Pre-fills the behavior dropdown and parameters
// from the key's current binding. Called when you click a key on the SVG.
function showBindingEditor(keyIdx) {
  selectedKeyIndex = keyIdx;
  var editor = document.getElementById('bindingEditor');
  editor.classList.add('visible');
  document.getElementById('beKeyIndex').textContent = '(Key ' + keyIdx + ')';

  var binding = keymapLayers[activeLayerIndex].bindings[keyIdx] || '';
  var parts = binding.trim().split(/\s+/);
  var behavior = parts[0] || '&kp';

  // Clear modifier checkboxes
  document.querySelectorAll('#beModCheckboxes input[type=checkbox]').forEach(function(cb) { cb.checked = false; });

  document.getElementById('beBehavior').value = behavior;
  updateBindingEditorFields(behavior, parts.slice(1));
  renderKeyboardSvg('keyboardSvg');
}

function updateBindingEditorFields(behavior, params) {
  var p1Row = document.getElementById('beParam1Row');
  var p2Row = document.getElementById('beParam2Row');
  var p1Label = document.getElementById('beParam1Label');
  var p2Label = document.getElementById('beParam2Label');
  var p1Container = document.getElementById('beParam1Container');
  var p2Container = document.getElementById('beParam2Container');
  var kcSection = document.getElementById('beKeycodeSection');
  var modSection = document.getElementById('beModSection');

  var behDef = ZMK_BEHAVIORS.find(function(b) { return b.name === behavior; });
  var cells = behDef ? behDef.cells : Math.max(params.length, 0);

  p1Row.style.display = cells >= 1 ? '' : 'none';
  p2Row.style.display = cells >= 2 ? '' : 'none';
  kcSection.style.display = 'none';
  modSection.style.display = 'none';

  if (behavior === '&kp') {
    p1Label.textContent = 'Keycode';
    // Parse modifiers from existing keycode
    var parsed = parseModsFromKeycode(params.join(' '));
    p1Container.innerHTML = '<input type="text" id="beParam1" value="' + esc(parsed.key) + '" style="width:160px;">';
    kcSection.style.display = '';
    modSection.style.display = '';
    // Set modifier checkboxes
    document.querySelectorAll('#beModCheckboxes input[type=checkbox]').forEach(function(cb) {
      cb.checked = parsed.mods.indexOf(cb.dataset.mod) >= 0;
    });
  } else if (behavior === '&mo' || behavior === '&to' || behavior === '&tog' || behavior === '&sl') {
    p1Label.textContent = 'Layer';
    var html = '<select id="beParam1">';
    keymapLayers.forEach(function(l, i) {
      if (l.status === 'reserved') return;
      var sel = String(i) === String(params[0]) ? ' selected' : '';
      html += '<option value="' + i + '"' + sel + '>' + i + ' - ' + esc(l.displayName || l.name) + '</option>';
    });
    html += '</select>';
    p1Container.innerHTML = html;
  } else if (behavior === '&lt') {
    p1Label.textContent = 'Layer';
    var lhtml = '<select id="beParam1">';
    keymapLayers.forEach(function(l, i) {
      if (l.status === 'reserved') return;
      var sel = String(i) === String(params[0]) ? ' selected' : '';
      lhtml += '<option value="' + i + '"' + sel + '>' + i + ' - ' + esc(l.displayName || l.name) + '</option>';
    });
    lhtml += '</select>';
    p1Container.innerHTML = lhtml;
    p2Label.textContent = 'Keycode';
    p2Container.innerHTML = '<input type="text" id="beParam2" value="' + esc(params.slice(1).join(' ')) + '" style="width:160px;">';
    kcSection.style.display = '';
    modSection.style.display = '';
  } else if (behavior === '&mt' || behavior === '&sk') {
    p1Label.textContent = behavior === '&mt' ? 'Modifier' : 'Keycode';
    p1Container.innerHTML = '<input type="text" id="beParam1" value="' + esc(params[0] || '') + '" style="width:160px;">';
    if (behavior === '&mt') {
      p2Label.textContent = 'Keycode';
      p2Container.innerHTML = '<input type="text" id="beParam2" value="' + esc(params.slice(1).join(' ')) + '" style="width:160px;">';
    }
    kcSection.style.display = '';
    modSection.style.display = '';
  } else if (behavior === '&bt') {
    p1Label.textContent = 'Action';
    var bhtml = '<select id="beParam1">';
    BT_ACTIONS.forEach(function(a) {
      var sel = params.join(' ') === a ? ' selected' : '';
      bhtml += '<option value="' + a + '"' + sel + '>' + a + '</option>';
    });
    bhtml += '</select>';
    p1Container.innerHTML = bhtml;
  } else if (behavior === '&rgb_ug') {
    p1Label.textContent = 'Action';
    var rhtml = '<select id="beParam1">';
    RGB_ACTIONS.forEach(function(a) {
      var sel = params.join(' ') === a ? ' selected' : '';
      rhtml += '<option value="' + a + '"' + sel + '>' + a + '</option>';
    });
    rhtml += '</select>';
    p1Container.innerHTML = rhtml;
  } else if (behavior === '&out') {
    p1Label.textContent = 'Action';
    var ohtml = '<select id="beParam1">';
    OUT_ACTIONS.forEach(function(a) {
      var sel = params.join(' ') === a ? ' selected' : '';
      ohtml += '<option value="' + a + '"' + sel + '>' + a + '</option>';
    });
    ohtml += '</select>';
    p1Container.innerHTML = ohtml;
  } else if (behavior === '&trans' || behavior === '&none' || behavior === '&bootloader' || behavior === '&studio_unlock' || behavior === '&sys_reset' || behavior === '&gresc' || behavior === '&caps_word' || behavior === '&key_repeat' || behavior === '&soft_off') {
    // no params
  } else if (behavior === '&bl') {
    p1Label.textContent = 'Action';
    var blhtml = '<select id="beParam1">';
    BL_ACTIONS.forEach(function(a) {
      var sel = params.join(' ') === a ? ' selected' : '';
      blhtml += '<option value="' + a + '"' + sel + '>' + a + '</option>';
    });
    blhtml += '</select>';
    p1Container.innerHTML = blhtml;
  } else if (behavior === '&ext_power') {
    p1Label.textContent = 'Action';
    var ephtml = '<select id="beParam1">';
    EP_ACTIONS.forEach(function(a) {
      var sel = params.join(' ') === a ? ' selected' : '';
      ephtml += '<option value="' + a + '"' + sel + '>' + a + '</option>';
    });
    ephtml += '</select>';
    p1Container.innerHTML = ephtml;
  } else if (behavior === '&mkp') {
    p1Label.textContent = 'Button';
    var mkhtml = '<select id="beParam1">';
    MOUSE_BUTTONS.forEach(function(a) {
      var sel = params.join(' ') === a ? ' selected' : '';
      mkhtml += '<option value="' + a + '"' + sel + '>' + a + '</option>';
    });
    mkhtml += '</select>';
    p1Container.innerHTML = mkhtml;
  } else if (behavior === '&mmv') {
    p1Label.textContent = 'Direction';
    var mvhtml = '<select id="beParam1">';
    MOUSE_MOVES.forEach(function(a) {
      var sel = params.join(' ') === a ? ' selected' : '';
      mvhtml += '<option value="' + a + '"' + sel + '>' + a + '</option>';
    });
    mvhtml += '</select>';
    p1Container.innerHTML = mvhtml;
  } else if (behavior === '&msc') {
    p1Label.textContent = 'Direction';
    var mshtml = '<select id="beParam1">';
    MOUSE_SCROLLS.forEach(function(a) {
      var sel = params.join(' ') === a ? ' selected' : '';
      mshtml += '<option value="' + a + '"' + sel + '>' + a + '</option>';
    });
    mshtml += '</select>';
    p1Container.innerHTML = mshtml;
  } else if (behavior === '&kt') {
    p1Label.textContent = 'Keycode';
    p1Container.innerHTML = '<input type=\"text\" id=\"beParam1\" value=\"' + esc(params.join(' ')) + '\" style=\"width:160px;\">';
    kcSection.style.display = '';
    modSection.style.display = '';
  } else {
    // Custom behavior â€” show raw param inputs
    p1Label.textContent = 'Params';
    p1Container.innerHTML = '<input type="text" id="beParam1" value="' + esc(params.join(' ')) + '" style="width:200px;">';
    p1Row.style.display = '';
    p2Row.style.display = 'none';
  }
}

// applyBinding() â€” Reads the current binding editor values (behavior,
// parameters) and saves them to keymapLayers[activeLayerIndex].bindings.
// Triggers pushUndo() before saving so the change can be undone.
function applyBinding() {
  if (selectedKeyIndex < 0 || !keymapLayers[activeLayerIndex]) return;
  pushUndo();
  var behavior = document.getElementById('beBehavior').value;
  var p1El = document.getElementById('beParam1');
  var p2El = document.getElementById('beParam2');
  var binding = behavior;
  if (p1El && p1El.value) {
    var p1Val = p1El.value;
    // Apply modifier wrapping for &kp behavior
    if (behavior === '&kp') {
      p1Val = wrapWithModifiers(p1Val);
    }
    binding += ' ' + p1Val;
  }
  if (p2El && p2El.value) {
    var p2Val = p2El.value;
    // Apply modifier wrapping for keycode param in &lt and &mt
    if (behavior === '&lt' || behavior === '&mt') {
      p2Val = wrapWithModifiers(p2Val);
    }
    binding += ' ' + p2Val;
  }
  keymapLayers[activeLayerIndex].bindings[selectedKeyIndex] = binding;
  renderKeyboardSvg('keyboardSvg');
  updateKeymapOutput();
}

function cancelBindingEditor() {
  selectedKeyIndex = -1;
  document.getElementById('bindingEditor').classList.remove('visible');
  renderKeyboardSvg('keyboardSvg');
}

// ================================================================
// SECTION: COMBO SYSTEM
// Combos let you press multiple keys at once to trigger a binding.
// renderComboMiniKb() draws a small keyboard for picking combo key
// positions. renderKeymapComboList() shows all combos in a list.
// Clicking "Edit" opens the combo editor panel (line 5470+).
// More on this code can be found in 'RefDoc' line 870
// ================================================================
// renderComboMiniKb() â€” Draws a small keyboard inside the combo editor
// panel. Clicking keys toggles their selection as combo positions.
function renderComboMiniKb() {
  var container = document.getElementById('comboMiniKb');
  if (!keyboardLayout) { container.innerHTML = ''; return; }
  container.innerHTML = '<svg class="keyboard-svg combo-mini-kb-svg" id="comboMiniSvg"></svg>';
  renderKeyboardSvg('comboMiniSvg', { scale: 36, keySize: 33, comboMode: true, comboPositions: comboSelectedPositions });
}

function renderRgbComboMiniKb() {
  var container = document.getElementById('rgbComboMiniKb');
  if (!keyboardLayout) { container.innerHTML = ''; return; }
  container.innerHTML = '<svg class="keyboard-svg combo-mini-kb-svg" id="rgbComboMiniSvg"></svg>';
  renderKeyboardSvg('rgbComboMiniSvg', { scale: 36, keySize: 33, comboMode: true, comboPositions: rgbComboSelectedPositions });
  // Sync positions to the relevant field
  var posStr = rgbComboSelectedPositions.slice().sort(function(a,b) { return a-b; }).join(' ');
  if (rgbEditingComboIndex >= 0 && combos[rgbEditingComboIndex]) {
    combos[rgbEditingComboIndex].pos = posStr;
    // Update the inline input
    var posInput = document.querySelector('#comboList input[data-field="pos"][data-i="' + rgbEditingComboIndex + '"]');
    if (posInput) posInput.value = posStr;
    updateRgbOutput();
  } else {
    document.getElementById('comboPos').value = posStr;
  }
}

// renderKeymapComboList() â€” Shows all combos in a list with name, binding,
// and key positions. Each combo has Edit/Delete buttons.
function renderKeymapComboList() {
  var list = document.getElementById('kmComboList');
  list.innerHTML = '';
  keymapCombos.forEach(function(c, i) {
    var div = document.createElement('div');
    div.className = 'item';
    div.innerHTML =
      '<b>' + esc(c.name) + '</b>' +
      '<span>' + esc(c.binding) + '</span>' +
      '<span style="color:var(--muted);">pos: ' + esc(c.positions.join(', ')) + '</span>' +
      '<span style="color:var(--muted);">layers: ' + esc(c.layers || 'all') + '</span>' +
      '<button class="btn-sm" data-edit-combo="' + i + '">Edit</button>' +
      '<button class="btn-danger btn-sm" data-remove-combo="' + i + '">&#10005;</button>';
    list.appendChild(div);
  });
}

// ================================================================
// SECTION: MACRO SYSTEM
// Macros are sequences of key presses that play back in order.
// Each macro has a name, optional timing (wait/tap ms), and a list
// of steps (e.g., "type H-E-L-L-O"). renderKeymapMacroList() shows
// all macros. The macro editor lets you add/remove steps.
// More on this code can be found in 'RefDoc' line 870
// ================================================================
// renderKeymapMacroList() â€” Shows all macros in a list with name, label,
// and step count. Each macro has Edit/Delete buttons.
function renderKeymapMacroList() {
  var list = document.getElementById('kmMacroList');
  list.innerHTML = '';
  keymapMacros.forEach(function(m, i) {
    var paramLabel = '';
    if (m.paramType === 1) paramLabel = ' (1-param)';
    else if (m.paramType === 2) paramLabel = ' (2-param)';
    var div = document.createElement('div');
    div.className = 'item';
    div.innerHTML =
      '<b>' + esc(m.name) + '</b>' +
      '<span style="color:var(--muted);">' + m.steps.length + ' steps' + paramLabel + '</span>' +
      (m.label ? '<span style="color:var(--muted);">"' + esc(m.label) + '"</span>' : '') +
      '<button class="btn-sm" data-edit-macro="' + i + '">Edit</button>' +
      '<button class="btn-danger btn-sm" data-remove-macro="' + i + '">&#10005;</button>';
    list.appendChild(div);
  });
}

// Macro step type definitions for the dropdown sub-menu system
var MACRO_STEP_TYPES = [
  { value: 'kp_tap', label: 'Key Binding (&kp)', desc: 'Key press binding (mode-dependent)', prefix: '&kp', hasKeycode: true },
  { value: 'macro_tap', label: 'Set Tap Mode', desc: 'Subsequent bindings will tap (press+release)', ctrl: '&macro_tap' },
  { value: 'macro_press', label: 'Set Press Mode', desc: 'Subsequent bindings will only press (hold)', ctrl: '&macro_press' },
  { value: 'macro_release', label: 'Set Release Mode', desc: 'Subsequent bindings will only release', ctrl: '&macro_release' },
  { value: 'macro_pause', label: 'Pause for Release', desc: 'Wait until macro key is released', ctrl: '&macro_pause_for_release' },
  { value: 'wait_time', label: 'Wait Time', desc: 'Delay between steps (ms)', ctrl: '&macro_wait_time', hasTime: true },
  { value: 'tap_time', label: 'Tap Time', desc: 'Set how long taps are held (ms)', ctrl: '&macro_tap_time', hasTime: true },
  { value: 'param_1to1', label: 'Param 1\u21921', desc: "Forward macro's 1st param to next binding 1st param", ctrl: '&macro_param_1to1', isParam: true },
  { value: 'param_1to2', label: 'Param 1\u21922', desc: "Forward macro's 1st param to next binding 2nd param", ctrl: '&macro_param_1to2', isParam: true },
  { value: 'param_2to1', label: 'Param 2\u21921', desc: "Forward macro's 2nd param to next binding 1st param", ctrl: '&macro_param_2to1', isParam: true },
  { value: 'param_2to2', label: 'Param 2\u21922', desc: "Forward macro's 2nd param to next binding 2nd param", ctrl: '&macro_param_2to2', isParam: true },
  { value: 'custom', label: 'Custom Binding', desc: 'Enter a raw binding string', hasRaw: true }
];

function classifyMacroStep(stepStr) {
  stepStr = stepStr.trim();
  if (stepStr === '&macro_tap') return { type: 'macro_tap', keycode: '' };
  if (stepStr === '&macro_press') return { type: 'macro_press', keycode: '' };
  if (stepStr === '&macro_release') return { type: 'macro_release', keycode: '' };
  if (stepStr === '&macro_pause_for_release') return { type: 'macro_pause', keycode: '' };
  if (stepStr.startsWith('&macro_wait_time')) return { type: 'wait_time', time: stepStr.replace('&macro_wait_time', '').trim() || '100' };
  if (stepStr.startsWith('&macro_tap_time')) return { type: 'tap_time', time: stepStr.replace('&macro_tap_time', '').trim() || '100' };
  if (stepStr === '&macro_param_1to1') return { type: 'param_1to1', keycode: '' };
  if (stepStr === '&macro_param_1to2') return { type: 'param_1to2', keycode: '' };
  if (stepStr === '&macro_param_2to1') return { type: 'param_2to1', keycode: '' };
  if (stepStr === '&macro_param_2to2') return { type: 'param_2to2', keycode: '' };
  if (stepStr.startsWith('&kp ')) return { type: 'kp_tap', keycode: stepStr.replace('&kp ', '') };
  return { type: 'custom', raw: stepStr };
}

function macroStepToString(type, keycode, time, raw) {
  var def = MACRO_STEP_TYPES.find(function(s) { return s.value === type; });
  if (!def) return raw || '';
  if (def.ctrl && def.hasTime) return def.ctrl + ' ' + (time || '100');
  if (def.ctrl) return def.ctrl;
  if (def.hasKeycode) return '&kp ' + (keycode || 'A');
  if (def.hasRaw) return raw || '';
  return '';
}

function renderMacroSteps() {
  var container = document.getElementById('kmMacroSteps');
  var macro = editingMacroIndex >= 0 ? keymapMacros[editingMacroIndex] : null;
  if (!macro) { container.innerHTML = ''; return; }
  container.innerHTML = '';

  // Group steps: detect mode context (tap/press/release) for display hints
  var currentMode = 'tap';

  macro.steps.forEach(function(step, i) {
    var classified = classifyMacroStep(step);
    var div = document.createElement('div');
    div.className = 'macro-step';

    // Step number + move buttons
    var html = '<span class="step-num">' + (i + 1) + '.</span>';
    html += '<button class="macro-step-move" data-move-up="' + i + '" title="Move up">&#9650;</button>';
    html += '<button class="macro-step-move" data-move-down="' + i + '" title="Move down">&#9660;</button>';

    // Step type dropdown
    html += '<select data-step-type="' + i + '" style="min-width:160px;">';
    MACRO_STEP_TYPES.forEach(function(st) {
      var sel = st.value === classified.type ? ' selected' : '';
      html += '<option value="' + st.value + '"' + sel + '>' + esc(st.label) + ' â€” ' + esc(st.desc) + '</option>';
    });
    html += '</select>';

    // Sub-fields based on type
    html += '<span class="step-fields">';
    var def = MACRO_STEP_TYPES.find(function(s) { return s.value === classified.type; });
    if (def && def.hasKeycode) {
      html += '<input type="text" data-step-keycode="' + i + '" value="' + esc(classified.keycode || '') + '" placeholder="Keycode" style="width:100px;" list="macroKcList">';
    }
    if (def && def.hasTime) {
      html += '<input type="number" data-step-time="' + i + '" value="' + esc(classified.time || '100') + '" min="0" style="width:70px;"> <span class="step-desc">ms</span>';
    }
    if (def && def.hasRaw) {
      html += '<input type="text" data-step-raw="' + i + '" value="' + esc(classified.raw || '') + '" placeholder="Raw binding" style="width:200px;">';
    }
    html += '</span>';

    // Track mode context for visual hint
    if (classified.type === 'macro_tap') currentMode = 'tap';
    else if (classified.type === 'macro_press') currentMode = 'press';
    else if (classified.type === 'macro_release') currentMode = 'release';

    if (def && def.hasKeycode && currentMode !== 'tap') {
      html += '<span class="step-desc">(mode: ' + currentMode + ')</span>';
    }

    html += '<button class="btn-danger btn-sm" data-remove-step="' + i + '" style="margin-left:auto;">&#10005;</button>';

    div.innerHTML = html;
    container.appendChild(div);
  });

  // Add a datalist for keycode auto-complete in macro steps
  if (!document.getElementById('macroKcList')) {
    var dl = document.createElement('datalist');
    dl.id = 'macroKcList';
    var allKc = [];
    Object.keys(ZMK_KEYCODES).forEach(function(cat) { allKc = allKc.concat(ZMK_KEYCODES[cat]); });
    dl.innerHTML = allKc.map(function(kc) { return '<option value="' + kc + '">'; }).join('');
    document.body.appendChild(dl);
  }
}

// ================================================================
// SECTION: BEHAVIOR SYSTEM
// Custom behaviors (hold-tap, sticky-key, tap-dance, etc.) are
// user-defined in the devicetree. renderKeymapBehaviorList() shows
// all of them. showBehaviorConfig() opens the config panel where
// you set timing, flavor, and other options for each behavior type.
// More on this code can be found in 'RefDoc' line 870
// ================================================================
// renderKeymapBehaviorList() â€” Shows all custom behaviors in a list with
// type (hold-tap, sticky-key, etc.), name, and Edit/Delete buttons.
function renderKeymapBehaviorList() {
  var list = document.getElementById('kmBehaviorList');
  list.innerHTML = '';
  keymapBehaviors.forEach(function(b, i) {
    var div = document.createElement('div');
    div.className = 'item';
    div.innerHTML =
      '<b>' + esc(b.name) + '</b>' +
      '<span style="color:var(--muted);">' + esc(b.type) + '</span>' +
      (b.label ? '<span>"' + esc(b.label) + '"</span>' : '') +
      '<button class="btn-sm" data-edit-behavior="' + i + '">Edit</button>' +
      '<button class="btn-danger btn-sm" data-remove-behavior="' + i + '">&#10005;</button>';
    list.appendChild(div);
  });
}

// showBehaviorConfig(type) â€” Opens the behavior editor with fields for
// the selected behavior type (timing, flavor, bindings, etc.).
// Each type shows different config options relevant to that behavior.
function showBehaviorConfig(type) {
  var container = document.getElementById('kmBehaviorConfig');
  if (type === 'hold-tap') {
    container.innerHTML =
      '<div class="input-row"><div class="input-group"><label>Tapping Term</label><input type="number" id="kmBehTappingTerm" value="200" min="0" style="width:70px;"> ms</div></div>' +
      '<div class="input-row"><div class="input-group"><label>Flavor</label><select id="kmBehFlavor"><option value="tap-preferred">tap-preferred</option><option value="hold-preferred">hold-preferred</option><option value="balanced">balanced</option></select></div></div>' +
      '<div class="input-row"><div class="input-group"><label>Hold Binding</label><input type="text" id="kmBehHoldBinding" placeholder="&mo 1" style="width:160px;"></div></div>' +
      '<div class="input-row"><div class="input-group"><label>Tap Binding</label><input type="text" id="kmBehTapBinding" placeholder="&kp" style="width:160px;"></div></div>' +
      '<div class="input-row"><div class="input-group"><label>Quick Tap (ms)</label><input type="number" id="kmBehQuickTap" value="" min="0" placeholder="none" style="width:70px;"></div>' +
      '<div class="input-group"><label>Require Prior Idle (ms)</label><input type="number" id="kmBehRequirePriorIdle" value="" min="0" placeholder="none" style="width:70px;"></div></div>' +
      '<div class="input-row"><div class="input-group"><label>Positional Hold (key positions)</label><input type="text" id="kmBehHoldTriggerPositions" placeholder="0 1 2 3 (blank=off)" style="width:180px;"></div></div>' +
      '<div class="input-row" style="gap:1em;flex-wrap:wrap;">' +
      '<label style="display:flex;align-items:center;gap:0.3em;cursor:pointer;"><input type="checkbox" id="kmBehRetroTap"> Retro-Tap</label>' +
      '<label style="display:flex;align-items:center;gap:0.3em;cursor:pointer;"><input type="checkbox" id="kmBehHoldWhileUndecided"> Hold While Undecided</label>' +
      '<label style="display:flex;align-items:center;gap:0.3em;cursor:pointer;"><input type="checkbox" id="kmBehHoldWhileUndecidedLinger"> HWU Linger</label>' +
      '<label style="display:flex;align-items:center;gap:0.3em;cursor:pointer;"><input type="checkbox" id="kmBehHoldTriggerOnRelease"> Hold Trigger on Release</label>' +
      '</div>';
  } else if (type === 'tap-dance') {
    container.innerHTML =
      '<div class="input-row"><div class="input-group"><label>Tapping Term</label><input type="number" id="kmBehTappingTerm" value="200" min="0" style="width:70px;"> ms</div></div>' +
      '<div class="input-row"><div class="input-group"><label>Bindings (comma-sep)</label><input type="text" id="kmBehTdBindings" placeholder="&kp A, &kp B" style="width:250px;"></div></div>';
  } else if (type === 'mod-morph') {
    container.innerHTML =
      '<div class="input-row"><div class="input-group"><label>Normal</label><input type="text" id="kmBehMmNormal" placeholder="&kp A" style="width:160px;"></div></div>' +
      '<div class="input-row"><div class="input-group"><label>Morphed</label><input type="text" id="kmBehMmMorphed" placeholder="&kp B" style="width:160px;"></div></div>' +
      '<div class="input-row"><div class="input-group"><label>Mods</label><input type="text" id="kmBehMmMods" placeholder="MOD_LSFT" style="width:160px;"></div></div>';
  } else if (type === 'sticky-key') {
    container.innerHTML =
      '<div class="input-row"><div class="input-group"><label>Release After (ms)</label><input type="number" id="kmBehSkRelease" value="1000" min="0" style="width:80px;"></div></div>' +
      '<div class="input-row"><div class="input-group"><label>Binding</label><input type="text" id="kmBehSkBinding" placeholder="&kp" style="width:160px;"></div></div>' +
      '<div class="input-row" style="gap:1em;flex-wrap:wrap;">' +
      '<label style="display:flex;align-items:center;gap:0.3em;cursor:pointer;"><input type="checkbox" id="kmBehSkQuickRelease"> Quick Release</label>' +
      '<label style="display:flex;align-items:center;gap:0.3em;cursor:pointer;"><input type="checkbox" id="kmBehSkLazy"> Lazy</label>' +
      '<label style="display:flex;align-items:center;gap:0.3em;cursor:pointer;"><input type="checkbox" id="kmBehSkIgnoreMods" checked> Ignore Modifiers</label>' +
      '</div>';
  } else if (type === 'macro') {
    container.innerHTML =
      '<p style="font-size:0.82em;color:var(--muted);">Macros are defined in the Macros section above. This creates a standalone macro behavior entry.</p>' +
      '<div class="input-row"><div class="input-group"><label>Params</label><select id="kmBehMacroParams"><option value="0">None (0 params)</option><option value="1">One param</option><option value="2">Two params</option></select></div></div>' +
      '<div class="input-row"><div class="input-group"><label>Wait (ms)</label><input type="number" id="kmBehMacroWait" value="" min="0" placeholder="default" style="width:70px;"></div></div>' +
      '<div class="input-row"><div class="input-group"><label>Tap (ms)</label><input type="number" id="kmBehMacroTap" value="" min="0" placeholder="default" style="width:70px;"></div></div>' +
      '<div class="input-row"><div class="input-group"><label>Bindings</label><input type="text" id="kmBehMacroBindings" placeholder="&macro_tap &kp A &kp B" style="width:300px;"></div></div>';
  } else if (type === 'sensor-rotate') {
    container.innerHTML =
      '<div class="input-row"><div class="input-group"><label>CW Binding</label><input type="text" id="kmBehSensorCW" placeholder="&kp C_VOL_UP" style="width:160px;"></div></div>' +
      '<div class="input-row"><div class="input-group"><label>CCW Binding</label><input type="text" id="kmBehSensorCCW" placeholder="&kp C_VOL_DN" style="width:160px;"></div></div>' +
      '<div class="input-row"><div class="input-group"><label>Tap (ms)</label><input type="number" id="kmBehSensorTap" value="" min="0" placeholder="default" style="width:70px;"></div></div>';
  } else if (type === 'key-toggle') {
    container.innerHTML =
      '<p style="font-size:0.82em;color:var(--muted);margin:0 0 0.3em;">Key Toggle sends a press on first use and release on second use. Binding-cells = 1 (takes a keycode parameter).</p>' +
      '<div class="input-row" style="gap:1em;flex-wrap:wrap;">' +
      '<label style="display:flex;align-items:center;gap:0.3em;cursor:pointer;"><input type="checkbox" id="kmBehKtToggleMode"> Custom toggle-mode</label>' +
      '</div>' +
      '<div class="input-row" id="kmBehKtToggleModeRow" style="display:none;"><div class="input-group"><label>Toggle Mode</label><select id="kmBehKtToggleModeVal"><option value="on">on</option><option value="off">off</option></select></div></div>';
    setTimeout(function() {
      var cb = document.getElementById('kmBehKtToggleMode');
      if (cb) cb.onchange = function() { document.getElementById('kmBehKtToggleModeRow').style.display = cb.checked ? '' : 'none'; };
    }, 0);
  } else if (type === 'caps-word') {
    container.innerHTML =
      '<p style="font-size:0.82em;color:var(--muted);margin:0 0 0.3em;">Caps Word capitalizes letters until a break key is pressed. Customize which keys continue the caps-word effect and which modifiers to apply.</p>' +
      '<div class="input-row"><div class="input-group"><label>Continue List</label><input type="text" id="kmBehCwContinueList" placeholder="UNDERSCORE MINUS BSPC" style="width:280px;"></div></div>' +
      '<div class="input-row"><div class="input-group"><label>Mods</label><input type="text" id="kmBehCwMods" placeholder="MOD_LSFT" style="width:160px;"></div></div>';
  } else {
    container.innerHTML = '';
  }
}

// ================================================================
// SECTION: QUICK-ASSIGN SYSTEM
// Press a keyboard shortcut (like the letter A) while a key is
// selected, and it assigns that keycode immediately. QA_KEYBOARD_MAP
// maps browser KeyboardEvent.code values to ZMK keycodes.
// openQuickAssign() activates the mode; closing it saves the result.
// More on this code can be found in 'RefDoc' line 949
// ================================================================
var QA_KEYBOARD_MAP = {
  // Maps KeyboardEvent.code â†’ ZMK keycode
  KeyA:'A',KeyB:'B',KeyC:'C',KeyD:'D',KeyE:'E',KeyF:'F',KeyG:'G',KeyH:'H',KeyI:'I',KeyJ:'J',
  KeyK:'K',KeyL:'L',KeyM:'M',KeyN:'N',KeyO:'O',KeyP:'P',KeyQ:'Q',KeyR:'R',KeyS:'S',KeyT:'T',
  KeyU:'U',KeyV:'V',KeyW:'W',KeyX:'X',KeyY:'Y',KeyZ:'Z',
  Digit1:'N1',Digit2:'N2',Digit3:'N3',Digit4:'N4',Digit5:'N5',Digit6:'N6',Digit7:'N7',Digit8:'N8',Digit9:'N9',Digit0:'N0',
  Minus:'MINUS',Equal:'EQUAL',BracketLeft:'LBKT',BracketRight:'RBKT',Backslash:'BSLH',
  Semicolon:'SEMI',Quote:'SQT',Backquote:'GRAVE',Comma:'COMMA',Period:'DOT',Slash:'FSLH',
  Enter:'ENTER',Space:'SPACE',Tab:'TAB',CapsLock:'CAPS',
  ShiftLeft:'LSHIFT',ShiftRight:'RSHIFT',ControlLeft:'LCTRL',ControlRight:'RCTRL',
  AltLeft:'LALT',AltRight:'RALT',MetaLeft:'LGUI',MetaRight:'RGUI',
  ArrowUp:'UP',ArrowDown:'DOWN',ArrowLeft:'LEFT',ArrowRight:'RIGHT',
  Home:'HOME',End:'END',PageUp:'PG_UP',PageDown:'PG_DN',Insert:'INSERT',Delete:'DEL',
  F1:'F1',F2:'F2',F3:'F3',F4:'F4',F5:'F5',F6:'F6',F7:'F7',F8:'F8',F9:'F9',F10:'F10',F11:'F11',F12:'F12',
  PrintScreen:'PRINTSCREEN',ScrollLock:'SCROLLLOCK',Pause:'PAUSE_BREAK',
  NumpadDivide:'KP_DIVIDE',NumpadMultiply:'KP_MULTIPLY',NumpadSubtract:'KP_MINUS',NumpadAdd:'KP_PLUS',
  NumpadEnter:'KP_ENTER',Numpad0:'KP_N0',Numpad1:'KP_N1',Numpad2:'KP_N2',Numpad3:'KP_N3',
  Numpad4:'KP_N4',Numpad5:'KP_N5',Numpad6:'KP_N6',Numpad7:'KP_N7',Numpad8:'KP_N8',Numpad9:'KP_N9',
  NumpadDecimal:'KP_DOT'
};

// On-screen keyboard layout (rows of {label, zmk, width?})
var QA_ONSCREEN_ROWS = [
  [{l:'`',z:'GRAVE'},{l:'1',z:'N1'},{l:'2',z:'N2'},{l:'3',z:'N3'},{l:'4',z:'N4'},{l:'5',z:'N5'},{l:'6',z:'N6'},{l:'7',z:'N7'},{l:'8',z:'N8'},{l:'9',z:'N9'},{l:'0',z:'N0'},{l:'-',z:'MINUS'},{l:'=',z:'EQUAL'},{l:'Bksp',z:'BSPC',w:'wide2'}],
  [{l:'Tab',z:'TAB',w:'wide2'},{l:'Q',z:'Q'},{l:'W',z:'W'},{l:'E',z:'E'},{l:'R',z:'R'},{l:'T',z:'T'},{l:'Y',z:'Y'},{l:'U',z:'U'},{l:'I',z:'I'},{l:'O',z:'O'},{l:'P',z:'P'},{l:'[',z:'LBKT'},{l:']',z:'RBKT'},{l:'\\',z:'BSLH'}],
  [{l:'Caps',z:'CAPS',w:'wide3'},{l:'A',z:'A'},{l:'S',z:'S'},{l:'D',z:'D'},{l:'F',z:'F'},{l:'G',z:'G'},{l:'H',z:'H'},{l:'J',z:'J'},{l:'K',z:'K'},{l:'L',z:'L'},{l:';',z:'SEMI'},{l:"'",z:'SQT'},{l:'Enter',z:'ENTER',w:'wide3'}],
  [{l:'Shift',z:'LSHIFT',w:'wide4'},{l:'Z',z:'Z'},{l:'X',z:'X'},{l:'C',z:'C'},{l:'V',z:'V'},{l:'B',z:'B'},{l:'N',z:'N'},{l:'M',z:'M'},{l:',',z:'COMMA'},{l:'.',z:'DOT'},{l:'/',z:'FSLH'},{l:'Shift',z:'RSHIFT',w:'wide4'}],
  [{l:'Ctrl',z:'LCTRL',w:'wide2'},{l:'GUI',z:'LGUI',w:'wide2'},{l:'Alt',z:'LALT',w:'wide2'},{l:'Space',z:'SPACE',w:'space'},{l:'Alt',z:'RALT',w:'wide2'},{l:'GUI',z:'RGUI',w:'wide2'},{l:'Ctrl',z:'RCTRL',w:'wide2'}],
  [{l:'Ins',z:'INSERT'},{l:'Del',z:'DEL'},{l:'Home',z:'HOME'},{l:'End',z:'END'},{l:'PgUp',z:'PG_UP'},{l:'PgDn',z:'PG_DN'},{l:'\u2190',z:'LEFT'},{l:'\u2193',z:'DOWN'},{l:'\u2191',z:'UP'},{l:'\u2192',z:'RIGHT'}],
  [{l:'F1',z:'F1'},{l:'F2',z:'F2'},{l:'F3',z:'F3'},{l:'F4',z:'F4'},{l:'F5',z:'F5'},{l:'F6',z:'F6'},{l:'F7',z:'F7'},{l:'F8',z:'F8'},{l:'F9',z:'F9'},{l:'F10',z:'F10'},{l:'F11',z:'F11'},{l:'F12',z:'F12'}]
];

var qaActive = false, qaKeyIndex = 0, qaOriginalBindings = null;

// openQuickAssign() â€” Activates quick-assign mode: press a key on your
// real keyboard and it instantly assigns that keycode to the selected SVG key.
// Uses QA_KEYBOARD_MAP to translate browser key events to ZMK keycodes.
function openQuickAssign() {
  if (!keymapLayers[activeLayerIndex] || keymapLayers[activeLayerIndex].status === 'reserved') return;
  qaActive = true;
  qaKeyIndex = 0;
  qaOriginalBindings = keymapLayers[activeLayerIndex].bindings.slice();
  document.getElementById('qaLayerName').textContent = keymapLayers[activeLayerIndex].displayName || keymapLayers[activeLayerIndex].name;
  document.getElementById('qaBehavior').value = '&kp';
  qaUpdateModVisibility();
  document.querySelectorAll('#qaModCheckboxes input[type=checkbox]').forEach(function(cb) { cb.checked = false; });
  renderQaMiniKeyboard();
  renderQaOnScreenKb();
  updateQaStatus();
  document.getElementById('qaOverlay').style.display = '';
  document.addEventListener('keydown', qaKeydownHandler, true);
}

function closeQuickAssign(cancel) {
  qaActive = false;
  document.getElementById('qaOverlay').style.display = 'none';
  document.removeEventListener('keydown', qaKeydownHandler, true);
  if (cancel && qaOriginalBindings && keymapLayers[activeLayerIndex]) {
    keymapLayers[activeLayerIndex].bindings = qaOriginalBindings;
  }
  qaOriginalBindings = null;
  renderKeyboardSvg('keyboardSvg');
  updateKeymapOutput();
}

function updateQaStatus() {
  var layer = keymapLayers[activeLayerIndex];
  if (!layer) return;
  var total = layer.bindings.length;
  var current = layer.bindings[qaKeyIndex] || '&trans';
  document.getElementById('qaStatus').innerHTML = 'Assigning key <b>' + qaKeyIndex + '</b> of <b>' + total + '</b> &mdash; Current: <code>' + esc(current) + '</code>';
  selectedKeyIndex = qaKeyIndex;
  renderKeyboardSvg('keyboardSvg');
  renderQaMiniKeyboard();
}

function qaUpdateModVisibility() {
  var beh = document.getElementById('qaBehavior').value;
  document.getElementById('qaModWrap').style.display = (beh === '&kp') ? '' : 'none';
}

function qaWrapWithModifiers(keycode) {
  var checkboxes = document.querySelectorAll('#qaModCheckboxes input[type=checkbox]');
  var mods = [];
  checkboxes.forEach(function(cb) { if (cb.checked) mods.push(cb.dataset.mod); });
  if (mods.length === 0) return keycode;
  var result = keycode;
  mods.reverse().forEach(function(m) {
    result = MOD_FUNCS[m] + '(' + result + ')';
  });
  return result;
}

function qaAssign(zmkKeycode) {
  if (!qaActive || !keymapLayers[activeLayerIndex]) return;
  pushUndo();
  var beh = document.getElementById('qaBehavior').value;

  if (beh === '&trans' || beh === '&none') {
    keymapLayers[activeLayerIndex].bindings[qaKeyIndex] = beh;
  } else if (beh === '&kp') {
    var wrapped = qaWrapWithModifiers(zmkKeycode);
    keymapLayers[activeLayerIndex].bindings[qaKeyIndex] = '&kp ' + wrapped;
  } else {
    // For layer behaviors, zmkKeycode might be a layer number
    keymapLayers[activeLayerIndex].bindings[qaKeyIndex] = beh + ' ' + zmkKeycode;
  }

  qaKeyIndex++;
  if (qaKeyIndex >= keymapLayers[activeLayerIndex].bindings.length) {
    closeQuickAssign(false);
    return;
  }
  updateQaStatus();
}

function qaKeydownHandler(e) {
  if (!qaActive) return;
  e.preventDefault();
  e.stopPropagation();
  if (e.code === 'Escape') {
    qaKeyIndex++;
    if (qaKeyIndex >= keymapLayers[activeLayerIndex].bindings.length) { closeQuickAssign(false); return; }
    updateQaStatus();
    return;
  }
  if (e.code === 'Backspace' && e.shiftKey) {
    closeQuickAssign(true);
    return;
  }
  if (e.code === 'Backspace') {
    if (qaKeyIndex > 0) qaKeyIndex--;
    updateQaStatus();
    return;
  }
  var zmk = QA_KEYBOARD_MAP[e.code];
  if (zmk) qaAssign(zmk);
}

function renderQaMiniKeyboard() {
  var container = document.getElementById('qaMiniKb');
  if (!keyboardLayout || !keymapLayers[activeLayerIndex]) {
    container.innerHTML = '<div style="text-align:center;color:var(--muted);padding:1em;font-size:0.85em;">No keyboard layout loaded</div>';
    return;
  }
  var layer = keymapLayers[activeLayerIndex];
  var scale = 32;
  var keySize = 30;
  var padding = 6;

  var maxCol = 0, maxRow = 0;
  keyboardLayout.forEach(function(k) {
    if (k.col + (k.w || 1) > maxCol) maxCol = k.col + (k.w || 1);
    if (k.row + (k.h || 1) > maxRow) maxRow = k.row + (k.h || 1);
  });

  var svgW = maxCol * scale + padding * 2;
  var svgH = maxRow * scale + padding * 2;

  var svg = '<svg class="keyboard-svg" viewBox="0 0 ' + svgW + ' ' + svgH + '" style="width:100%;max-width:' + svgW + 'px;">';

  keyboardLayout.forEach(function(k, idx) {
    var x = k.col * scale + padding;
    var y = k.row * scale + padding;
    var w = (k.w || 1) * scale - 2;
    var h = (k.h || 1) * scale - 2;
    var binding = layer.bindings[idx] || '&trans';
    var label = binding.replace(/^&\w+\s*/, '').substring(0, 6) || binding.substring(0, 6);
    if (binding === '&trans') label = 'â–½';
    else if (binding === '&none') label = 'âœ•';

    var cls = 'key-group';
    if (idx === qaKeyIndex) cls += ' qa-highlight';
    else if (qaOriginalBindings && layer.bindings[idx] !== qaOriginalBindings[idx]) cls += ' qa-done';

    svg += '<g class="' + cls + '" data-qa-key="' + idx + '">';
    svg += '<rect class="key-rect" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="3" ry="3"/>';
    svg += '<text class="key-label" x="' + (x + w / 2) + '" y="' + (y + h / 2) + '" font-size="7">' + esc(label) + '</text>';
    svg += '</g>';
  });

  svg += '</svg>';
  container.innerHTML = svg;

  // Click handler for mini keyboard keys
  container.onclick = function(e) {
    var g = e.target.closest('[data-qa-key]');
    if (g && qaActive) {
      qaKeyIndex = parseInt(g.dataset.qaKey);
      updateQaStatus();
    }
  };
}

function renderQaOnScreenKb() {
  var html = '';
  QA_ONSCREEN_ROWS.forEach(function(row) {
    html += '<div class="qa-kbd-row">';
    row.forEach(function(k) {
      var cls = 'qa-key' + (k.w ? ' ' + k.w : '');
      html += '<button class="' + cls + '" data-zmk="' + k.z + '">' + esc(k.l) + '</button>';
    });
    html += '</div>';
  });
  document.getElementById('qaOnScreenKb').innerHTML = html;
}

// ================================================================
// SECTION: CONDITIONAL LAYERS
// A conditional layer activates automatically when two or more
// other layers are active at the same time. For example, holding
// layer 1 + layer 2 could activate layer 3. These use the ZMK
// "tri_layer" or "conditional_layers" feature.
// More on this code can be found in 'RefDoc' line 870
// ================================================================
var editingCondLayerIndex = -1;

function renderKeymapCondLayerList() {
  var list = document.getElementById('kmCondLayerList');
  list.innerHTML = '';
  keymapConditionalLayers.forEach(function(c, i) {
    var ifNames = c.ifLayers.map(function(idx) {
      return keymapLayers[idx] ? (keymapLayers[idx].displayName || keymapLayers[idx].name) : idx;
    }).join(' + ');
    var thenName = keymapLayers[c.thenLayer] ? (keymapLayers[c.thenLayer].displayName || keymapLayers[c.thenLayer].name) : c.thenLayer;
    var div = document.createElement('div');
    div.className = 'item';
    div.innerHTML =
      '<b>' + esc(c.name) + '</b>' +
      '<span style="color:var(--muted);">if ' + esc(ifNames) + ' &rarr; then ' + esc(thenName) + '</span>' +
      '<button class="btn-sm" data-edit-condlayer="' + i + '">Edit</button>' +
      '<button class="btn-danger btn-sm" data-remove-condlayer="' + i + '">&#10005;</button>';
    list.appendChild(div);
  });
}

function populateCondLayerSelects() {
  var ifSel = document.getElementById('kmCondIfLayers');
  var thenSel = document.getElementById('kmCondThenLayer');
  var html = '';
  keymapLayers.forEach(function(l, i) {
    if (l.status === 'reserved') return;
    html += '<option value="' + i + '">' + i + ' - ' + esc(l.displayName || l.name) + '</option>';
  });
  ifSel.innerHTML = html;
  thenSel.innerHTML = html;
}

function populateSensorLayerSelect() {
  // No longer needed â€” sensor editor is per active layer
}

// ================================================================
// SECTION: SENSOR BINDINGS (Encoder Cards)
// Rotary encoders on the keyboard can trigger bindings when rotated.
// Each sensor entry has a layer index and a list of bindings
// (clockwise, counter-clockwise). The sensor editor shows visual
// cards for each encoder and lets you pick rotation actions.
// More on this code can be found in 'RefDoc' line 870
// ================================================================
var editingSensorIndex = -1;   // index within keymapSensorBindings
var editingSensorSubIdx = -1;  // which encoder token within that entry (-1 = adding new)

function parseSensorToken(token) {
  // Parse "&inc_dec_kp C_VOL_DN C_VOL_UP" or "&custom_behavior"
  token = (token || '').trim();
  if (token.indexOf('&inc_dec_kp') === 0) {
    var parts = token.split(/\s+/);
    return { behavior: '&inc_dec_kp', increment: parts[1] || '', decrement: parts[2] || '' };
  }
  return { behavior: 'custom', raw: token };
}

function sensorTokenDisplay(token) {
  var p = parseSensorToken(token);
  if (p.behavior === '&inc_dec_kp') {
    return { behavior: '&inc_dec_kp', cw: p.increment, ccw: p.decrement };
  }
  return { behavior: p.raw || '?', cw: '', ccw: '' };
}

function renderKeymapSensorList() {
  var area = document.getElementById('sensorBindingsArea');
  var container = document.getElementById('sensorCards');
  if (!area || !container) return;

  // Find sensor binding entry for active layer
  var layerSensor = null;
  var layerSensorIdx = -1;
  for (var si = 0; si < keymapSensorBindings.length; si++) {
    if (keymapSensorBindings[si].layerIndex === activeLayerIndex) {
      layerSensor = keymapSensorBindings[si];
      layerSensorIdx = si;
      break;
    }
  }

  var html = '';
  var encoderNames = ['encoder_left', 'encoder_right'];

  if (layerSensor && layerSensor.bindings.length > 0) {
    area.style.display = '';
    layerSensor.bindings.forEach(function(token, ti) {
      var d = sensorTokenDisplay(token);
      var name = encoderNames[ti] || ('encoder_' + ti);
      html += '<div class="sensor-card" data-sensor-idx="' + layerSensorIdx + '" data-sensor-sub="' + ti + '">';
      html += '<span class="sensor-label">' + esc(name) + '</span>';
      html += '<div class="sensor-icon">';
      html += '<span class="sensor-behavior">' + esc(d.behavior) + '</span>';
      if (d.cw) html += '<span class="sensor-cw">' + esc(d.cw) + '</span>';
      if (d.ccw) html += '<span class="sensor-ccw">' + esc(d.ccw) + '</span>';
      html += '</div>';
      html += '<button class="sensor-delete" data-del-sensor-idx="' + layerSensorIdx + '" data-del-sensor-sub="' + ti + '" title="Remove">&#10005;</button>';
      html += '</div>';
    });
    // Add button
    html += '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.3em;">';
    html += '<button class="sensor-add-btn" id="sensorAddBtn" title="Add encoder binding">+</button>';
    html += '</div>';
  } else {
    // No sensor bindings for this layer â€” show option to add
    area.style.display = '';
    html += '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.3em;">';
    html += '<button class="sensor-add-btn" id="sensorAddBtn" title="Add sensor binding for this layer">+</button>';
    html += '<span style="font-size:0.7em;color:var(--muted);">Add encoder</span>';
    html += '</div>';
  }

  container.innerHTML = html;
}

// ================================================================
// SECTION: KEYMAP OUTPUT GENERATION
// updateKeymapOutput() takes ALL the keymap data (layers, combos,
// macros, behaviors, conditional layers, sensor bindings) and
// writes a complete .keymap file as text. This is what you copy
// and paste back into your ZMK config folder.
// Uses generateBehaviorCode() (line 4302) for custom behavior blocks.
// More on this code can be found in 'RefDoc' line 984
// ================================================================
// updateKeymapOutput() â€” Generates the full .keymap file as text.
// Outputs #include lines, custom behaviors, macros, combos, conditional
// layers, the keymap {} block with all layers, and sensor bindings.
function updateKeymapOutput() {
  var out = '';

  // Use parsed includes from user's file if available, otherwise generate defaults
  if (keymapParsedIncludes && keymapParsedIncludes.length > 0) {
    keymapParsedIncludes.forEach(function(inc) { out += inc + '\n'; });
  } else {
    out += '/*\n * Generated by ZMK Keymap Editor v4\n */\n\n';
    out += '#include <behaviors.dtsi>\n';
    out += '#include <dt-bindings/zmk/bt.h>\n';
    out += '#include <dt-bindings/zmk/keys.h>\n';
    out += '#include <dt-bindings/zmk/outputs.h>\n';
    out += '#include <dt-bindings/zmk/rgb.h>\n';
    out += '//#include "corne-rgb.dtsi" //CHANGE IF USING DIFFERENT FILE NAME; MAKE SURE TO UNCOMMENT\n';
    // Auto-detect additional includes
    var usesMouse = false, usesBacklight = false, usesExtPower = false;
    keymapLayers.forEach(function(l) {
      l.bindings.forEach(function(b) {
        if (b.startsWith('&mkp') || b.startsWith('&mmv') || b.startsWith('&msc')) usesMouse = true;
        if (b.startsWith('&bl ')) usesBacklight = true;
        if (b.startsWith('&ext_power')) usesExtPower = true;
      });
    });
    if (usesMouse) out += '#include <dt-bindings/zmk/mouse.h>\n';
    if (usesBacklight) out += '#include <dt-bindings/zmk/backlight.h>\n';
    if (usesExtPower) out += '#include <dt-bindings/zmk/ext_power.h>\n';
  }
  out += '\n';

  // If we have preserved raw pre-keymap blocks from the parsed source, output them verbatim
  // This preserves original combos, behaviors, macros formatting from the user's source file
  if (keymapParsedRawBlocks) {
    out += keymapParsedRawBlocks + '\n\n';
    // Also output any NEW combos/behaviors/macros added via the editor (not from the parsed source)
    var editorOnlyCombos = keymapCombos.filter(function(c) { return c._fromEditor; });
    if (editorOnlyCombos.length) {
      out += '/ {\n    combos {\n        compatible = "zmk,combos";\n';
      editorOnlyCombos.forEach(function(c) {
        out += '        ' + c.name + ' {\n';
        out += '            bindings = <' + c.binding + '>;\n';
        out += '            key-positions = <' + c.positions.join(' ') + '>;\n';
        if (c.layers) out += '            layers = <' + c.layers + '>;\n';
        out += '            timeout-ms = <' + c.timeout + '>;\n';
        if (c.requirePriorIdle) out += '            require-prior-idle-ms = <' + c.requirePriorIdle + '>;\n';
        if (c.slowRelease) out += '            slow-release;\n';
        out += '        };\n';
      });
      out += '    };\n};\n\n';
    }
    var editorOnlyBehaviors = keymapBehaviors.filter(function(b) { return b._fromEditor; });
    if (editorOnlyBehaviors.length) {
      out += '/ {\n    behaviors {\n';
      editorOnlyBehaviors.forEach(function(b) {
        out += generateBehaviorCode(b);
      });
      out += '    };\n};\n\n';
    }
    var editorOnlyMacros = keymapMacros.filter(function(m) { return m._fromEditor; });
    if (editorOnlyMacros.length) {
      out += '/ {\n    macros {\n';
      editorOnlyMacros.forEach(function(m) {
        var paramType = m.paramType || 0;
        var compatible = 'zmk,behavior-macro';
        var bindingCells = 0;
        if (paramType === 1) { compatible = 'zmk,behavior-macro-one-param'; bindingCells = 1; }
        else if (paramType === 2) { compatible = 'zmk,behavior-macro-two-param'; bindingCells = 2; }
        out += '        ' + m.name + ': ' + m.name + ' {\n';
        out += '            compatible = "' + compatible + '";\n';
        out += '            #binding-cells = <' + bindingCells + '>;\n';
        if (m.label) out += '            label = "' + m.label + '";\n';
        if (m.waitMs) out += '            wait-ms = <' + m.waitMs + '>;\n';
        if (m.tapMs) out += '            tap-ms = <' + m.tapMs + '>;\n';
        out += '            bindings = <' + m.steps.join(' ') + '>;\n';
        out += '        };\n';
      });
      out += '    };\n};\n\n';
    }
  } else {
  // No raw blocks â€” generate from parsed data (default behavior)

  // Custom behaviors
  var nativeKeymapBehaviors = keymapBehaviors.filter(function(b) { return !b._fromRgb && !b._fromDtsi; });
  if (nativeKeymapBehaviors.length) {
    out += '/ {\n    behaviors {\n';
    nativeKeymapBehaviors.forEach(function(b) {
      out += generateBehaviorCode(b);
    });
    out += '    };\n};\n\n';
  }

  // Combos â€” only output native (non-RGB) combos; RGB combos stay in the .dtsi
  var nativeCombos = keymapCombos.filter(function(c) { return !c._fromRgb; });

  if (nativeCombos.length) {
    out += '/ {\n    combos {\n        compatible = "zmk,combos";\n';
    nativeCombos.forEach(function(c) {
      out += '        ' + c.name + ' {\n';
      out += '            bindings = <' + c.binding + '>;\n';
      out += '            key-positions = <' + c.positions.join(' ') + '>;\n';
      if (c.layers) out += '            layers = <' + c.layers + '>;\n';
      out += '            timeout-ms = <' + c.timeout + '>;\n';
      if (c.requirePriorIdle) out += '            require-prior-idle-ms = <' + c.requirePriorIdle + '>;\n';
      if (c.slowRelease) out += '            slow-release;\n';
      out += '        };\n';
    });
    out += '    };\n};\n\n';
  }

  // Macros
  var nativeKeymapMacros = keymapMacros.filter(function(m) { return !m._fromRgb; });
  if (nativeKeymapMacros.length) {
    out += '/ {\n    macros {\n';
    nativeKeymapMacros.forEach(function(m) {
      var paramType = m.paramType || 0;
      var compatible = 'zmk,behavior-macro';
      var bindingCells = 0;
      if (paramType === 1) { compatible = 'zmk,behavior-macro-one-param'; bindingCells = 1; }
      else if (paramType === 2) { compatible = 'zmk,behavior-macro-two-param'; bindingCells = 2; }
      out += '        ' + m.name + ': ' + m.name + ' {\n';
      out += '            compatible = "' + compatible + '";\n';
      out += '            #binding-cells = <' + bindingCells + '>;\n';
      if (m.label) out += '            label = "' + m.label + '";\n';
      if (m.waitMs) out += '            wait-ms = <' + m.waitMs + '>;\n';
      if (m.tapMs) out += '            tap-ms = <' + m.tapMs + '>;\n';
      out += '            bindings = <' + m.steps.join(' ') + '>;\n';
      out += '        };\n';
    });
    out += '    };\n};\n\n';
  }

  } // end of raw blocks else

  // Note: Blink macros are RGB-tab items â€” output only in RGB generator, not in keymap output

  // Keymap â€” track layer positions for highlighting
  var layerMarkers = []; // { start, end, layerIndex }
  out += '/ {\n    keymap {\n        compatible = "zmk,keymap";\n\n';
  keymapLayers.forEach(function(l, li) {
    if (l.status === 'reserved') {
      out += '        ' + l.name + ' { status = "reserved"; };\n\n';
      return;
    }
    var layerStart = out.length;
    out += '        ' + l.name + ' {\n';
    if (l.displayName && l.displayName !== l.name) {
      out += '            display-name = "' + l.displayName + '";\n';
    }
    out += '            bindings = <\n';

    // Format bindings in rows matching the keyboard layout with column alignment
    var layoutRows = {};
    if (keyboardLayout) {
      keyboardLayout.forEach(function(k, ki) {
        if (!layoutRows[k.row]) layoutRows[k.row] = [];
        layoutRows[k.row].push({ col: k.col, idx: ki });
      });
    }
    var rowKeys = Object.keys(layoutRows).sort(function(a, b) { return a - b; });
    if (rowKeys.length > 0) {
      // Sort entries in each row by column
      rowKeys.forEach(function(rk) { layoutRows[rk].sort(function(a, b) { return a.col - b.col; }); });

      // Collect all unique column numbers across the entire layout
      var colSet = {};
      keyboardLayout.forEach(function(k) { colSet[k.col] = true; });
      var allCols = Object.keys(colSet).map(Number).sort(function(a, b) { return a - b; });

      // Find split: detect left/right halves via largest x-position gap across ALL rows
      var xLookup = {};
      keyboardLayout.forEach(function(k) { xLookup[k.row + ',' + k.col] = k.x; });
      var splitX = -1;
      var maxXGap = 2;
      rowKeys.forEach(function(rk) {
        var entries = layoutRows[rk];
        for (var gi = 1; gi < entries.length; gi++) {
          var xPrev = xLookup[rk + ',' + entries[gi - 1].col] || 0;
          var xCurr = xLookup[rk + ',' + entries[gi].col] || 0;
          if (xCurr - xPrev > maxXGap) {
            maxXGap = xCurr - xPrev;
            splitX = (xPrev + xCurr) / 2;
          }
        }
      });
      // Classify columns as left/right by their max x-position vs the split midpoint
      var leftCols = [], rightCols = [];
      if (splitX >= 0) {
        var colMaxX = {};
        keyboardLayout.forEach(function(k) {
          if (colMaxX[k.col] === undefined || k.x > colMaxX[k.col]) colMaxX[k.col] = k.x;
        });
        allCols.forEach(function(c) {
          if (colMaxX[c] !== undefined && colMaxX[c] < splitX) leftCols.push(c);
          else rightCols.push(c);
        });
      } else {
        leftCols = allCols;
      }

      // Compute per-column binding widths across ALL layers
      var colWidths = {};
      allCols.forEach(function(c) { colWidths[c] = 0; });
      keymapLayers.forEach(function(layer) {
        if (layer.status === 'reserved') return;
        rowKeys.forEach(function(rk) {
          layoutRows[rk].forEach(function(entry) {
            var b = layer.bindings[entry.idx] || '&none';
            if (b.length > colWidths[entry.col]) colWidths[entry.col] = b.length;
          });
        });
      });

      // Output formatted rows for this layer
      rowKeys.forEach(function(rk) {
        var rowE = layoutRows[rk];
        var rowColMap = {};
        rowE.forEach(function(e) { rowColMap[e.col] = e; });

        // Build left and right halves with proper column padding
        var leftParts = [];
        leftCols.forEach(function(c) {
          if (rowColMap[c]) {
            var b = l.bindings[rowColMap[c].idx] || '&none';
            leftParts.push({ text: b, width: colWidths[c] });
          }
        });
        var rightParts = [];
        rightCols.forEach(function(c) {
          if (rowColMap[c]) {
            var b = l.bindings[rowColMap[c].idx] || '&none';
            rightParts.push({ text: b, width: colWidths[c] });
          }
        });

        // Pad each binding to its column width
        var padStr = function(parts, padAll) {
          return parts.map(function(p, i) {
            if (padAll || i < parts.length - 1) {
              var s = p.text;
              while (s.length < p.width) s += ' ';
              return s;
            }
            return p.text;
          }).join('  ');
        };
        // Pad ALL left columns (including last) so right side aligns consistently
        var leftStr = padStr(leftParts, true);
        // Don't pad last right column (no trailing whitespace needed)
        var rightStr = padStr(rightParts, false);

        // Calculate leading indent for rows with fewer left-side keys (e.g. thumb cluster)
        var indent = '';
        // Also calculate trailing padding for missing end-of-left-side columns (e.g. encoder slots)
        var tailPad = '';
        if (leftParts.length < leftCols.length) {
          var missingWidth = 0;
          var foundFirst = false;
          var tailWidth = 0;
          // Scan forward for leading missing cols
          leftCols.forEach(function(c) {
            if (rowColMap[c]) { foundFirst = true; return; }
            if (!foundFirst) {
              missingWidth += colWidths[c] + 2;
            }
          });
          // Scan backward for trailing missing cols (only if at least one col is present)
          if (foundFirst) {
            for (var ti = leftCols.length - 1; ti >= 0; ti--) {
              if (rowColMap[leftCols[ti]]) break;
              tailWidth += colWidths[leftCols[ti]] + 2;
            }
          }
          indent = ' '.repeat(missingWidth);
          tailPad = ' '.repeat(tailWidth);
        }
        // Calculate leading indent for missing right-side start columns (e.g. no encoder on some rows)
        var rightIndent = '';
        if (rightParts.length > 0 && rightParts.length < rightCols.length) {
          var rightMissing = 0;
          var rightFoundFirst = false;
          rightCols.forEach(function(c) {
            if (rowColMap[c]) { rightFoundFirst = true; return; }
            if (!rightFoundFirst) {
              rightMissing += colWidths[c] + 2;
            }
          });
          rightIndent = ' '.repeat(rightMissing);
        }

        var line = indent;
        if (rightParts.length > 0) {
          line += leftStr + tailPad + '    ' + rightIndent + rightStr;
        } else {
          line += leftStr;
        }
        out += '                ' + line + '\n';
      });
    } else {
      // Fallback: just dump all bindings, 12 per line
      for (var bi = 0; bi < l.bindings.length; bi += 12) {
        out += '                ' + l.bindings.slice(bi, bi + 12).join('  ') + '\n';
      }
    }
    out += '            >;\n';
    // Sensor bindings for this layer
    var layerSensors = keymapSensorBindings.filter(function(s) { return s.layerIndex === li; });
    if (layerSensors.length > 0) {
      var sensorParts = layerSensors.map(function(s) { return s.bindings.join(' '); });
      out += '            sensor-bindings = <' + sensorParts.join(' ') + '>;\n';
    }
    out += '        };\n\n';
    layerMarkers.push({ start: layerStart, end: out.length, layerIndex: li });
  });
  out += '    };\n};\n';

  // Conditional layers
  if (keymapConditionalLayers.length) {
    out += '\n/ {\n    conditional_layers {\n        compatible = "zmk,conditional-layers";\n';
    keymapConditionalLayers.forEach(function(c) {
      out += '        ' + c.name + ' {\n';
      out += '            if-layers = <' + c.ifLayers.join(' ') + '>;\n';
      out += '            then-layer = <' + c.thenLayer + '>;\n';
      out += '        };\n';
    });
    out += '    };\n};\n';
  }

  // Build highlighted HTML output
  var hlOut = '';
  var lastPos = 0;
  layerMarkers.sort(function(a, b) { return a.start - b.start; });
  layerMarkers.forEach(function(m) {
    hlOut += esc(out.substring(lastPos, m.start));
    if (m.layerIndex === activeLayerIndex) {
      hlOut += '<span class="hl-layer">' + esc(out.substring(m.start, m.end)) + '</span>';
    } else {
      hlOut += esc(out.substring(m.start, m.end));
    }
    lastPos = m.end;
  });
  hlOut += esc(out.substring(lastPos));
  document.getElementById('kmOutput').innerHTML = hlOut;
  document.getElementById('kmOutput').dataset.rawText = out;
  // Scroll to highlighted layer
  var hlEl = document.querySelector('#kmOutput .hl-layer');
  if (hlEl) {
    var pre = document.getElementById('kmOutput');
    var preRect = pre.getBoundingClientRect();
    var hlRect = hlEl.getBoundingClientRect();
    var scrollTarget = pre.scrollTop + (hlRect.top - preRect.top) - preRect.height / 3;
    pre.scrollTop = Math.max(0, scrollTarget);
  }
  // Reset edit mode when output is regenerated
  var editTa = document.getElementById('kmOutputEdit');
  var editBtn = document.getElementById('kmEditToggle');
  if (editTa && editTa.style.display !== 'none') {
    editTa.style.display = 'none';
    document.getElementById('kmOutput').style.display = '';
    if (editBtn) { editBtn.innerHTML = '&#9998; Edit'; editBtn.style.background = 'var(--item-bg)'; editBtn.style.color = 'var(--text)'; editBtn.style.borderColor = 'var(--border)'; }
  }
  var activeCount = keymapLayers.filter(function(l) { return l.status !== 'reserved'; }).length;
  document.getElementById('kmOutputStats').textContent = activeCount + ' layers \u00B7 ' + keymapCombos.length + ' combos \u00B7 ' + keymapMacros.length + ' macros \u00B7 ' + keymapConditionalLayers.length + ' cond. layers';
}

// ================================================================
// SECTION: BEHAVIOR CODE GENERATION
// generateBehaviorCode() turns a custom behavior object into its
// ZMK devicetree text block. Each behavior type (hold-tap, sticky-key,
// tap-dance, caps-word, etc.) has its own format with specific
// properties. Called by updateKeymapOutput() for each custom behavior.
// More on this code can be found in 'RefDoc' line 1042
// ================================================================
function generateBehaviorCode(b) {
  var out = '';
  out += '        ' + b.name + ': ' + b.name + ' {\n';
  if (b.type === 'hold-tap') {
    out += '            compatible = "zmk,behavior-hold-tap";\n';
    if (b.label) out += '            label = "' + b.label + '";\n';
    out += '            #binding-cells = <2>;\n';
    out += '            tapping-term-ms = <' + (b.config.tappingTerm || 200) + '>;\n';
    if (b.config.quickTap) out += '            quick-tap-ms = <' + b.config.quickTap + '>;\n';
    if (b.config.requirePriorIdle) out += '            require-prior-idle-ms = <' + b.config.requirePriorIdle + '>;\n';
    out += '            flavor = "' + (b.config.flavor || 'tap-preferred') + '";\n';
    out += '            bindings = <' + (b.config.holdBinding || '&mo 0') + '>, <' + (b.config.tapBinding || '&kp') + '>;\n';
    if (b.config.holdTriggerPositions) out += '            hold-trigger-key-positions = <' + b.config.holdTriggerPositions + '>;\n';
    if (b.config.retroTap) out += '            retro-tap;\n';
    if (b.config.holdWhileUndecided) out += '            hold-while-undecided;\n';
    if (b.config.holdWhileUndecidedLinger) out += '            hold-while-undecided-linger;\n';
    if (b.config.holdTriggerOnRelease) out += '            hold-trigger-on-release;\n';
  } else if (b.type === 'tap-dance') {
    out += '            compatible = "zmk,behavior-tap-dance";\n';
    if (b.label) out += '            label = "' + b.label + '";\n';
    out += '            #binding-cells = <0>;\n';
    out += '            tapping-term-ms = <' + (b.config.tappingTerm || 200) + '>;\n';
    out += '            bindings = ' + (b.config.bindings || '<>') + ';\n';
  } else if (b.type === 'mod-morph') {
    out += '            compatible = "zmk,behavior-mod-morph";\n';
    if (b.label) out += '            label = "' + b.label + '";\n';
    out += '            #binding-cells = <0>;\n';
    out += '            bindings = <' + (b.config.normalBinding || '') + '>, <' + (b.config.morphedBinding || '') + '>;\n';
    out += '            mods = <(' + (b.config.mods || 'MOD_LSFT') + ')>;\n';
  } else if (b.type === 'sticky-key') {
    out += '            compatible = "zmk,behavior-sticky-key";\n';
    if (b.label) out += '            label = "' + b.label + '";\n';
    out += '            #binding-cells = <1>;\n';
    out += '            release-after-ms = <' + (b.config.releaseAfter || 1000) + '>;\n';
    out += '            bindings = <' + (b.config.binding || '&kp') + '>;\n';
    if (b.config.quickRelease) out += '            quick-release;\n';
    if (b.config.lazy) out += '            lazy;\n';
    if (b.config.ignoreMods) out += '            ignore-modifiers;\n';
  } else if (b.type === 'macro') {
    var params = parseInt(b.config.macroParams) || 0;
    var compatible = 'zmk,behavior-macro';
    var cells = 0;
    if (params === 1) { compatible = 'zmk,behavior-macro-one-param'; cells = 1; }
    else if (params === 2) { compatible = 'zmk,behavior-macro-two-param'; cells = 2; }
    out += '            compatible = "' + compatible + '";\n';
    if (b.label) out += '            label = "' + b.label + '";\n';
    out += '            #binding-cells = <' + cells + '>;\n';
    if (b.config.macroWait) out += '            wait-ms = <' + b.config.macroWait + '>;\n';
    if (b.config.macroTap) out += '            tap-ms = <' + b.config.macroTap + '>;\n';
    out += '            bindings = <' + (b.config.macroBindings || '') + '>;\n';
  } else if (b.type === 'sensor-rotate') {
    out += '            compatible = "zmk,behavior-sensor-rotate";\n';
    if (b.label) out += '            label = "' + b.label + '";\n';
    out += '            #sensor-binding-cells = <0>;\n';
    if (b.config.sensorTap) out += '            tap-ms = <' + b.config.sensorTap + '>;\n';
    out += '            bindings = <' + (b.config.sensorCW || '&kp C_VOL_UP') + '>, <' + (b.config.sensorCCW || '&kp C_VOL_DN') + '>;\n';
  } else if (b.type === 'key-toggle') {
    out += '            compatible = "zmk,behavior-key-toggle";\n';
    if (b.label) out += '            label = "' + b.label + '";\n';
    out += '            #binding-cells = <1>;\n';
    if (b.config.toggleMode) out += '            toggle-mode = "' + b.config.toggleMode + '";\n';
  } else if (b.type === 'caps-word') {
    out += '            compatible = "zmk,behavior-caps-word";\n';
    if (b.label) out += '            label = "' + b.label + '";\n';
    out += '            #binding-cells = <0>;\n';
    if (b.config.continueList) out += '            continue-list = <' + b.config.continueList + '>;\n';
    if (b.config.mods) out += '            mods = <(' + b.config.mods + ')>;\n';
  }
  out += '        };\n';
  return out;
}

// ================================================================
// SECTION: CROSS-TAB DATA SYNC
// When you switch between the RGB tab and the Keymap tab, data
// needs to be copied between them so they stay in agreement.
// syncCrossTabData() copies keymap layers/combos/behaviors into
// the RGB tab's arrays. syncRgbToKeymap() copies RGB data back.
// Layers are sorted by index so they appear in order (0, 1, 2...).
// More on this code can be found in 'RefDoc' line 1107
// ================================================================
// syncCrossTabData() â€” Copies keymap layers, combos, behaviors, and macros
// into the RGB tab's arrays so the RGB Generator sees them. Sorts layers
// by index (0, 1, 2...) so they display in order. Called when switching to RGB tab.
function syncCrossTabData() {
  // Reflect keymap editor layers into RGB generator layer list
  // Build lookup of existing RGB layer base keys AND indexes to avoid duplicates
  var existingBaseKeys = {};
  var existingIndexes = {};
  layers.forEach(function(l) {
    existingBaseKeys[baseKey(l.name)] = true;
    if (l.index !== '' && l.index !== undefined) existingIndexes[String(l.index)] = true;
  });
  Object.keys(colorValueMap).forEach(function(ck) { existingBaseKeys[baseKey(ck)] = true; });

  keymapLayers.forEach(function(kl, i) {
    if (kl.status === 'reserved') return;
    var idxStr = String(i);
    // Match by index first â€” if an RGB layer already covers this index, skip
    if (existingIndexes[idxStr]) return;
    var klBase = baseKey(kl.name);
    // Also try stripping trailing _N (e.g. abc_0 â†’ ABC, nmrw_1 â†’ NMRW)
    var klBaseStripped = klBase.replace(/_\d+$/, '');
    // Also try matching by displayName (e.g. "ABC", "KPAD")
    var dispBase = kl.displayName ? kl.displayName.toUpperCase().replace(/[^A-Z0-9]/g, '_') : '';
    if (existingBaseKeys[klBase] || existingBaseKeys[klBaseStripped] || (dispBase && existingBaseKeys[dispBase])) return;
    // Push as a real layer entry so user can assign RGB color
    var layerName = 'LAYER_' + (dispBase || klBaseStripped || klBase);
    layers.push({
      name: layerName,
      index: idxStr,
      h: '', s: '', b: '',
      label: kl.displayName || kl.name,
      _fromKeymap: true
    });
    existingBaseKeys[klBase] = true;
    existingIndexes[idxStr] = true;
    if (klBaseStripped !== klBase) existingBaseKeys[klBaseStripped] = true;
    if (dispBase) existingBaseKeys[dispBase] = true;
  });

  // Sort RGB layers by index so they display in sequential keymap order (0, 1, 2...)
  // Layers without an index (orphans) go to the end of the list
  layers.sort(function(a, b) {
    var ai = (a.index !== '' && a.index !== undefined) ? parseInt(a.index) : 9999;
    var bi = (b.index !== '' && b.index !== undefined) ? parseInt(b.index) : 9999;
    return ai - bi;
  });

  // Reflect keymap behaviors into RGB behavior macro selection
  keymapBehaviors.forEach(function(kb) {
    var exists = behaviors.some(function(b) { return b.name === kb.name; });
    if (!exists) {
      behaviors.push({
        name: kb.name,
        label: kb.label || kb.name,
        macro: '',
        _fromKeymap: true
      });
    }
  });
}

// syncRgbToKeymap() â€” Copies RGB tab data (behaviors, macros) back into
// the keymap tab's arrays. Called when switching to the Keymap tab.
function syncRgbToKeymap() {
  // Upstream RGB macros into keymap macros list (so they appear in behavior dropdown)
  var existingMacroNames = {};
  keymapMacros.forEach(function(m) { existingMacroNames[m.name] = true; });

  // RGB tab macros (TO_RGB_MACRO, MOMENTARY_RGB_MACRO, etc.)
  macros.forEach(function(m) {
    if (!existingMacroNames[m.name]) {
      existingMacroNames[m.name] = true;
      keymapMacros.push({
        name: m.name,
        label: m.name,
        steps: [],  // RGB macros are helper-based, steps aren't standard
        paramType: 0,
        waitMs: '',
        tapMs: '',
        _fromRgb: true
      });
    }
  });

  // RGB tab blink macros
  blinkMacros.forEach(function(bm) {
    if (!existingMacroNames[bm.name]) {
      existingMacroNames[bm.name] = true;
      keymapMacros.push({
        name: bm.name,
        label: bm.label || bm.name,
        steps: ['&macro_tap', '&kp ' + bm.key],
        paramType: 0,
        waitMs: '',
        tapMs: '',
        _fromRgb: true
      });
    }
  });

  // RGB tab behaviors (RGB_HOLD_TAP) into keymap behaviors
  var existingBehNames = {};
  keymapBehaviors.forEach(function(b) { existingBehNames[b.name] = true; });

  behaviors.forEach(function(b) {
    if (b._fromKeymap) return; // don't loop back
    if (!existingBehNames[b.name]) {
      existingBehNames[b.name] = true;
      keymapBehaviors.push({
        name: b.name,
        type: 'hold-tap',
        label: b.label || b.name,
        config: {
          tappingTerm: 200,
          flavor: 'tap-preferred',
          holdBinding: '&mo 0',
          tapBinding: '&kp'
        },
        _fromRgb: true
      });
    }
  });

  // Sync dtsi native behaviors (hm, ltq, td_numcaps, etc.) into keymap behaviors
  dtsiNativeBehaviors.forEach(function(db) {
    if (!existingBehNames[db.name]) {
      existingBehNames[db.name] = true;
      keymapBehaviors.push({
        name: db.name,
        type: db.type,
        label: db.label || db.name,
        config: db.config,
        _fromDtsi: true
      });
    }
  });

  // Note: RGB tab combos are NOT synced to keymap â€” they stay in the .dtsi output
}

// ================================================================
// SECTION: FLOATING VALUE PICKER
// A searchable dropdown that appears when you click a text input.
// Instead of typing a value like "LSHIFT", you click the input and
// a floating list appears with all valid options. You can type to
// filter. Used for keycode inputs, layer selectors, and more.
// More on this code can be found in 'RefDoc' line 1130
// ================================================================
var vpState = {
  open: false,
  choices: [],  // { code, description? }
  results: [],
  highlighted: -1,
  showAll: false,
  query: '',
  searchThreshold: 12,
  showAllThreshold: 80,
  onSelect: null, // callback(item)
  param: '',
  currentValue: ''
};

function fuzzyMatch(query, target) {
  if (!query) return { score: 0, html: esc(target), match: true };
  var qi = 0, ti = 0, score = 0, html = '', lastMatch = -1;
  var ql = query.toLowerCase(), tl = target.toLowerCase();
  while (qi < ql.length && ti < tl.length) {
    if (tl[ti] === ql[qi]) {
      // consecutive matches score higher
      score += (lastMatch === ti - 1) ? 10 : 1;
      html += '<span class="vp-match">' + esc(target[ti]) + '</span>';
      lastMatch = ti; qi++; ti++;
    } else {
      html += esc(target[ti]); ti++;
    }
  }
  if (qi < ql.length) return { score: 0, html: esc(target), match: false };
  while (ti < tl.length) { html += esc(target[ti]); ti++; }
  return { score: score, html: html, match: true };
}

function vpBuildChoices(param, currentBindBehavior) {
  var choices = [];
  if (param === 'behaviour' || param === 'behavior') {
    // All known behaviors
    ZMK_BEHAVIORS.forEach(function(b) {
      choices.push({ code: b.name, description: b.label });
    });
    // Custom behaviors from keymap
    keymapBehaviors.forEach(function(b) {
      if (!choices.some(function(c) { return c.code === '&' + b.name; })) {
        choices.push({ code: '&' + b.name, description: b.label || b.type });
      }
    });
    // Macros as behaviors
    keymapMacros.forEach(function(m) {
      if (!m._fromRgb && !choices.some(function(c) { return c.code === '&' + m.name; })) {
        choices.push({ code: '&' + m.name, description: 'Macro' + (m.paramType > 0 ? ' (' + m.paramType + ' param)' : '') });
      }
    });
  } else if (param === 'keycode') {
    Object.keys(ZMK_KEYCODES).forEach(function(cat) {
      ZMK_KEYCODES[cat].forEach(function(kc) {
        choices.push({ code: kc, description: cat });
      });
    });
  } else if (param === 'layer') {
    keymapLayers.forEach(function(l, i) {
      if (l.status === 'reserved') return;
      choices.push({ code: String(i), description: l.displayName || l.name });
    });
  } else if (param === 'bt_action') {
    BT_ACTIONS.forEach(function(a) { choices.push({ code: a, description: 'Bluetooth' }); });
  } else if (param === 'rgb_action') {
    RGB_ACTIONS.forEach(function(a) { choices.push({ code: a, description: 'RGB' }); });
  } else if (param === 'out_action') {
    OUT_ACTIONS.forEach(function(a) { choices.push({ code: a, description: 'Output' }); });
  } else if (param === 'bl_action') {
    BL_ACTIONS.forEach(function(a) { choices.push({ code: a, description: 'Backlight' }); });
  } else if (param === 'ep_action') {
    EP_ACTIONS.forEach(function(a) { choices.push({ code: a, description: 'Power' }); });
  } else if (param === 'button') {
    MOUSE_BUTTONS.forEach(function(a) { choices.push({ code: a, description: 'Mouse Button' }); });
  } else if (param === 'direction' && currentBindBehavior === '&mmv') {
    MOUSE_MOVES.forEach(function(a) { choices.push({ code: a, description: 'Mouse Move' }); });
  } else if (param === 'direction' && currentBindBehavior === '&msc') {
    MOUSE_SCROLLS.forEach(function(a) { choices.push({ code: a, description: 'Mouse Scroll' }); });
  } else if (param === 'modifier') {
    ['LSHIFT','LCTRL','LALT','LGUI','RSHIFT','RCTRL','RALT','RGUI',
     'LSHFT','LEFT_SHIFT','RIGHT_SHIFT','RSHFT','LEFT_CONTROL','RIGHT_CONTROL',
     'LEFT_ALT','RIGHT_ALT','LEFT_GUI','RIGHT_GUI','LWIN','RWIN','LCMD','RCMD'].forEach(function(m) {
      choices.push({ code: m, description: 'Modifier' });
    });
  }
  return choices;
}

function vpGetParamType(behavior, paramIndex) {
  var behDef = ZMK_BEHAVIORS.find(function(b) { return b.name === behavior; });
  if (!behDef || !behDef.params || !behDef.params[paramIndex]) return 'keycode';
  return behDef.params[paramIndex];
}

function vpPromptForParam(param) {
  var map = {
    'keycode': 'Select key code',
    'layer': 'Select layer',
    'modifier': 'Select modifier',
    'behaviour': 'Select behaviour',
    'behavior': 'Select behaviour',
    'bt_action': 'Select Bluetooth action',
    'rgb_action': 'Select RGB action',
    'out_action': 'Select output',
    'bl_action': 'Select backlight action',
    'ep_action': 'Select power action',
    'button': 'Select mouse button',
    'direction': 'Select direction'
  };
  return map[param] || 'Select value';
}

// openValuePicker(anchorRect, param, currentValue, behavior, onSelect) â€”
// Shows the floating search widget near the input field. Lists all valid
// values for the given parameter type. Typing filters the list instantly.
function openValuePicker(anchorRect, param, currentValue, behavior, onSelect) {
  vpState.open = true;
  vpState.param = param;
  vpState.currentValue = currentValue;
  vpState.onSelect = onSelect;
  vpState.behavior = behavior;
  vpState.query = '';
  vpState.highlighted = -1;
  vpState.showAll = false;
  vpState.choices = vpBuildChoices(param, behavior);

  var overlay = document.getElementById('vpOverlay');
  var dialog = document.getElementById('vpDialog');
  var search = document.getElementById('vpSearch');
  var prompt = document.getElementById('vpPrompt');
  var modeBar = document.getElementById('vpModeBar');

  prompt.textContent = vpPromptForParam(param);

  // Mode bar: show switchable tabs for behavior + each param type
  var modes = [{ id: 'behavior', label: 'Behavior' }];
  var behDef = ZMK_BEHAVIORS.find(function(b) { return b.name === behavior; });
  if (behDef && behDef.params) {
    behDef.params.forEach(function(p, idx) {
      modes.push({ id: p, label: vpPromptForParam(p).replace('Select ', ''), paramIdx: idx });
    });
  } else if (param !== 'behavior') {
    // Custom behavior: add mode for current param type
    modes.push({ id: param, label: vpPromptForParam(param).replace('Select ', '') });
  }
  modeBar.innerHTML = '';
  if (modes.length > 1) {
    modes.forEach(function(m) {
      var cls = m.id === param ? 'vp-mode-btn active' : 'vp-mode-btn';
      modeBar.innerHTML += '<button class="' + cls + '" data-vp-mode="' + m.id + '">' + esc(m.label) + '</button>';
    });
  }

  overlay.style.display = '';
  vpState.query = '';
  search.value = '';
  search.style.display = vpState.choices.length > vpState.searchThreshold ? '' : 'none';

  // Position dialog near anchor
  var dx = anchorRect.left + anchorRect.width / 2 - 160; // center the 320px dialog
  var dy = anchorRect.bottom + 6;
  // Keep within viewport
  if (dx < 8) dx = 8;
  if (dx + 320 > window.innerWidth - 8) dx = window.innerWidth - 328;
  if (dy + 280 > window.innerHeight) dy = anchorRect.top - 280;
  if (dy < 8) dy = 8;
  dialog.style.left = dx + 'px';
  dialog.style.top = dy + 'px';

  vpRenderResults();
  search.focus();
  search.select();
}

function closeValuePicker() {
  vpState.open = false;
  document.getElementById('vpOverlay').style.display = 'none';
}

function vpRenderResults() {
  var list = document.getElementById('vpResults');
  var counter = document.getElementById('vpCounter');
  var q = vpState.query.trim();
  var results = [];

  if (!q && !vpState.showAll && vpState.choices.length > vpState.showAllThreshold) {
    results = vpState.choices.slice(0, vpState.searchThreshold);
  } else if (!q) {
    results = vpState.choices;
  } else {
    // Fuzzy filter
    vpState.choices.forEach(function(c) {
      var m = fuzzyMatch(q, c.code);
      if (m.match) {
        results.push({ code: c.code, description: c.description, score: m.score, html: m.html });
      }
    });
    results.sort(function(a, b) { return b.score - a.score; });
    results = results.slice(0, 40);
  }

  vpState.results = results;
  if (vpState.highlighted >= results.length) vpState.highlighted = results.length - 1;

  var html = '';
  results.forEach(function(r, i) {
    var cls = i === vpState.highlighted ? ' class="vp-hl"' : '';
    var displayHtml = r.html ? r.html : esc(r.code);
    var desc = r.description ? '<span class="vp-desc">' + esc(r.description) + '</span>' : '';
    html += '<li data-vp-idx="' + i + '"' + cls + ' title="' + esc(r.description || r.code) + '">' + displayHtml + desc + '</li>';
  });
  list.innerHTML = html;

  // Counter
  var total = vpState.choices.length;
  if (total > vpState.searchThreshold && !vpState.showAll && !q) {
    counter.innerHTML = 'Showing ' + results.length + ' of ' + total + '. <a id="vpShowAll">Show all</a>';
  } else {
    counter.textContent = results.length + ' result' + (results.length !== 1 ? 's' : '');
  }
}

function vpScrollHighlightIntoView() {
  var list = document.getElementById('vpResults');
  var el = list.querySelector('.vp-hl');
  if (el) {
    var top = el.offsetTop, bottom = top + el.offsetHeight;
    var scrollTop = list.scrollTop, scrollH = list.clientHeight;
    if (top < scrollTop) list.scrollTop = top;
    else if (bottom > scrollTop + scrollH) list.scrollTop = bottom - scrollH;
  }
}

// ================================================================
// SECTION: TAB SYSTEM & DARK MODE
// switchTab() shows/hides the RGB tab or Keymap tab and triggers
// data sync. The dark mode toggle changes CSS variables for colors.
// More on this code can be found in 'RefDoc' line 1165
// ================================================================
// switchTab(tabId) â€” Switches between RGB Generator and Keymap Editor tabs.
// Hides one tab's content and shows the other. Triggers data sync between tabs.
function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  document.querySelectorAll('.tab-panel').forEach(function(panel) {
    panel.classList.toggle('active', panel.id === tabId);
  });
  // Refresh the target tab
  if (tabId === 'tabKeymap') {
    syncRgbToKeymap();
    populateBehaviorDropdown();
    renderLayerTabs();
    renderKeyboardSvg('keyboardSvg');
    renderKeymapComboList();
    renderKeymapMacroList();
    renderKeymapBehaviorList();
    renderKeymapCondLayerList();
    renderKeymapSensorList();
    updateKeymapOutput();
  } else {
    // Cross-tab reflection: sync behaviors from keymap editor into RGB generator behavior macro dropdown
    syncCrossTabData();
    rgbRenderAll();
  }
}

function toggleDarkMode() {
  var current = document.documentElement.getAttribute('data-theme');
  var next = current === 'dark' ? '' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  document.getElementById('darkToggle').innerHTML = next === 'dark' ? '&#9788; Light' : '&#9790; Dark';
  try { localStorage.setItem('zmk-theme', next); } catch(e) {}
}

function loadTheme() {
  try {
    var saved = localStorage.getItem('zmk-theme');
    if (saved === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.getElementById('darkToggle').innerHTML = '&#9788; Light';
    }
  } catch(e) {}
}

// ================================================================
// SECTION: INITIALIZATION (DOMContentLoaded)
// This giant block runs once when the page first loads. It wires up
// ALL the button clicks, form inputs, drag-and-drop handlers, and
// keyboard shortcuts. Think of it as the "startup checklist" that
// connects every UI element to its function.
// More on this code can be found in 'RefDoc' line 1195
// ================================================================
document.addEventListener('DOMContentLoaded', function() {
  loadTheme();

  // --- Tab switching ---
  document.querySelector('.tab-bar').addEventListener('click', function(e) {
    var btn = e.target.closest('.tab-btn');
    if (btn && btn.dataset.tab) switchTab(btn.dataset.tab);
  });

  // --- Dark mode ---
  document.getElementById('darkToggle').onclick = toggleDarkMode;

  // --- RGB Generator wiring (Tab 1) ---
  document.getElementById('parseBtn').onclick = parseUserCode;
  document.getElementById('rgbClearSyncBtn').onclick = function() {
    // Remove items synced from Keymap tab
    layers = layers.filter(function(l) { return !l._fromKeymap; });
    behaviors = behaviors.filter(function(b) { return !b._fromKeymap; });
    Object.keys(colorValueMap).forEach(function(k) { if (colorValueMap[k]._autoSync) { delete colorValueMap[k]; delete colorLabelMap[k]; } });
    rgbRenderAll();
    showStatus('userCodeStatus', 'Cleared synced keymap data');
  };
  document.getElementById('addLayerBtn').onclick = addLayer;
  document.getElementById('addMacroBtn').onclick = addMacro;
  document.getElementById('addBehaviorBtn').onclick = addBehavior;
  document.getElementById('addComboBtn').onclick = addCombo;
  // Show/hide RGB combo mini-keyboard and sync positions
  document.getElementById('comboPos').addEventListener('focus', function() {
    var wrap = document.getElementById('rgbComboMiniKbWrap');
    // Parse existing positions from the field
    var val = this.value.trim();
    if (val && rgbEditingComboIndex < 0) {
      rgbComboSelectedPositions = val.split(/[\s,]+/).map(Number).filter(function(n) { return !isNaN(n); });
    }
    wrap.style.display = '';
    renderRgbComboMiniKb();
  });
  document.getElementById('rgbComboMiniKb').addEventListener('click', function(e) {
    var group = e.target.closest('.key-group');
    if (!group) return;
    var ki = parseInt(group.dataset.key);
    if (isNaN(ki)) return;
    var idx = rgbComboSelectedPositions.indexOf(ki);
    if (idx >= 0) rgbComboSelectedPositions.splice(idx, 1);
    else rgbComboSelectedPositions.push(ki);
    renderRgbComboMiniKb();
  });
  document.getElementById('addBlinkMacroBtn').onclick = addBlinkMacro;
  document.getElementById('copyOutputBtn').onclick = function() {
    var out = document.getElementById('output');
    out.select(); document.execCommand('copy');
  };
  document.getElementById('includeHelpers').onchange = updateRgbOutput;
  document.getElementById('macroType').onchange = function() {
    var g = document.getElementById('releaseColorGroup');
    if (this.value === 'MOMENTARY_RGB_MACRO') g.classList.remove('hidden');
    else g.classList.add('hidden');
  };

  // Macro editor sub-window wiring
  document.getElementById('meditType').onchange = function() {
    var rg = document.getElementById('meditReleaseGroup');
    if (this.value === 'MOMENTARY_RGB_MACRO') rg.style.display = '';
    else rg.style.display = 'none';
  };
  document.getElementById('meditSaveBtn').onclick = function() {
    if (macroEditorIndex < 0 || macroEditorIndex >= macros.length) return;
    macros[macroEditorIndex].name = document.getElementById('meditName').value.trim() || macros[macroEditorIndex].name;
    macros[macroEditorIndex].type = document.getElementById('meditType').value;
    macros[macroEditorIndex].layer = document.getElementById('meditLayer').value;
    macros[macroEditorIndex].color = document.getElementById('meditColor').value;
    macros[macroEditorIndex].releaseColor = document.getElementById('meditType').value === 'MOMENTARY_RGB_MACRO'
      ? document.getElementById('meditReleaseColor').value : '';
    closeMacroEditor();
    rgbRenderAll();
  };
  document.getElementById('meditCancelBtn').onclick = closeMacroEditor;
  document.getElementById('macroEditorOverlay').onclick = function(e) {
    if (e.target === this) closeMacroEditor();
  };
  document.getElementById('showOrphans').onchange = function() { renderLayerList(); updateRgbOutput(); };
  syncColorInputs();
  initCollapsible();
  initResize('resizeHandle', 'outputWrap');
  initResize('kmResizeHandle', 'kmOutputWrap');
  rgbRenderAll();

  // --- Keymap Editor wiring (Tab 2) ---
  // Load default layout
  loadLayout(DEFAULT_CORNE_LAYOUT);
  renderKeyboardSvg('keyboardSvg');
  renderKeymapSensorList();
  populateKeycodeGrids();

  // Layout import
  document.getElementById('kmLoadLayoutBtn').onclick = function() {
    var overlay = document.getElementById('layoutJsonOverlay');
    overlay.style.display = 'flex';
  };
  document.getElementById('layoutJsonCancelBtn').onclick = function() {
    document.getElementById('layoutJsonOverlay').style.display = 'none';
  };
  document.getElementById('layoutJsonApplyBtn').onclick = function() {
    try {
      var json = JSON.parse(document.getElementById('layoutJsonInput').value);
      loadLayout(json);
      renderKeyboardSvg('keyboardSvg');
      renderKeymapSensorList();
      document.getElementById('layoutJsonOverlay').style.display = 'none';
      showStatus('kmLayoutStatus', 'Layout loaded: ' + keyboardLayout.length + ' keys');
    } catch(e) {
      alert('Invalid JSON: ' + e.message);
    }
  };
  document.getElementById('kmUseDefaultLayoutBtn').onclick = function() {
    loadLayout(DEFAULT_CORNE_LAYOUT);
    renderKeyboardSvg('keyboardSvg');
    renderKeymapSensorList();
    showStatus('kmLayoutStatus', 'Default Corne layout loaded (42 keys)');
  };
  document.getElementById('kmUseLotus58Btn').onclick = function() {
    loadLayout(DEFAULT_LOTUS58_LAYOUT);
    renderKeyboardSvg('keyboardSvg');
    renderKeymapSensorList();
    showStatus('kmLayoutStatus', 'Lotus58 layout loaded (60 keys)');
  };

  // Keymap parse
  document.getElementById('kmParseBtn').onclick = function() {
    var text = document.getElementById('kmKeymapPaste').value;
    if (!text.trim()) { alert('Paste a .keymap file first'); return; }
    parseKeymap(text);
    activeLayerIndex = 0;
    selectedKeyIndex = -1;
    document.getElementById('bindingEditor').classList.remove('visible');
    renderLayerTabs();
    populateBehaviorDropdown();
    renderKeyboardSvg('keyboardSvg');
    renderKeymapComboList();
    renderKeymapMacroList();
    renderKeymapBehaviorList();
    renderKeymapCondLayerList();
    renderKeymapSensorList();
    updateKeymapOutput();
    showStatus('kmParseStatus', 'Parsed: ' + keymapLayers.length + ' layers, ' + keymapCombos.length + ' combos, ' + keymapMacros.length + ' macros, ' + keymapBehaviors.length + ' behaviors, ' + keymapConditionalLayers.length + ' cond. layers');
  };

  document.getElementById('kmClearSyncBtn').onclick = function() {
    // Remove items synced from RGB tab
    keymapMacros = keymapMacros.filter(function(m) { return !m._fromRgb; });
    keymapBehaviors = keymapBehaviors.filter(function(b) { return !b._fromRgb && !b._fromDtsi; });
    populateBehaviorDropdown();
    renderKeymapMacroList();
    renderKeymapBehaviorList();
    updateKeymapOutput();
    showStatus('kmParseStatus', 'Cleared synced RGB data');
  };

  // Layer tabs event delegation (now sidebar)
  var layerTabsEl = document.getElementById('layerSidebar');
  layerTabsEl.addEventListener('click', function(e) {
    // Delete button in layer tab
    var delBtn = e.target.closest('.lt-delete[data-delete-layer]');
    if (delBtn) {
      e.stopPropagation();
      var delIdx = parseInt(delBtn.dataset.deleteLayer);
      if (keymapLayers.length <= 1) { alert('Cannot delete the only layer.'); return; }
      if (!confirm('Delete layer ' + delIdx + ' (' + (keymapLayers[delIdx].displayName || keymapLayers[delIdx].name) + ')?')) return;
      keymapLayers.splice(delIdx, 1);
      if (activeLayerIndex >= keymapLayers.length) activeLayerIndex = keymapLayers.length - 1;
      if (activeLayerIndex < 0) activeLayerIndex = 0;
      renderLayerTabs();
      renderKeyboardSvg('keyboardSvg');
      renderKeymapSensorList();
      updateKeymapOutput();
      return;
    }
    // Inline rename: click on lt-name of the active tab
    var nameSpan = e.target.closest('.lt-name');
    if (nameSpan) {
      var parentTab = nameSpan.closest('.layer-tab');
      if (parentTab && parentTab.classList.contains('active')) {
        e.stopPropagation();
        var layerIdx = parseInt(parentTab.dataset.layer);
        if (isNaN(layerIdx) || !keymapLayers[layerIdx]) return;
        var layer = keymapLayers[layerIdx];
        var currentName = layer.displayName || layer.name;
        var input = document.createElement('input');
        input.type = 'text';
        input.value = currentName;
        input.style.cssText = 'width:100%;font-size:0.82em;padding:0 4px;border:1px solid var(--accent);border-radius:3px;background:var(--card);color:var(--text);outline:none;';
        nameSpan.textContent = '';
        nameSpan.appendChild(input);
        input.focus();
        input.select();
        function finishInlineRename() {
          var val = input.value.trim();
          if (val && val !== currentName) {
            pushUndo();
            layer.displayName = val;
            layer.name = val.toLowerCase().replace(/[^a-z0-9_]/g, '_');
          }
          renderLayerTabs();
          updateLayerHeader();
          updateKeymapOutput();
        }
        input.addEventListener('blur', finishInlineRename);
        input.addEventListener('keydown', function(ev) {
          if (ev.key === 'Enter') { ev.preventDefault(); input.blur(); }
          if (ev.key === 'Escape') { input.value = currentName; input.blur(); }
        });
        return;
      }
    }
    var tab = e.target.closest('.layer-tab');
    if (!tab) return;
    if (tab.id === 'addLayerTabBtn') {
      pushUndo();
      var newName = 'new_layer_' + keymapLayers.length;
      var numKeys = keyboardLayout ? keyboardLayout.length : 42;
      var newBindings = [];
      for (var ni = 0; ni < numKeys; ni++) newBindings.push('&trans');
      keymapLayers.push({ name: newName, displayName: 'NEW', bindings: newBindings, status: 'active' });
      activeLayerIndex = keymapLayers.length - 1;
      renderLayerTabs();
      renderKeyboardSvg('keyboardSvg');
      renderKeymapSensorList();
      updateKeymapOutput();
      return;
    }
    if (tab.dataset.layer !== undefined) {
      activeLayerIndex = parseInt(tab.dataset.layer);
      selectedKeyIndex = -1;
      document.getElementById('bindingEditor').classList.remove('visible');
      renderLayerTabs();
      renderKeyboardSvg('keyboardSvg');
      renderKeymapSensorList();
      updateKeymapOutput();
    }
  });

  // --- Layer tab DRAG-AND-DROP reordering ---
  var dragSrcIndex = null;
  layerTabsEl.addEventListener('dragstart', function(e) {
    var tab = e.target.closest('.layer-tab[data-layer]');
    if (!tab || tab.id === 'addLayerTabBtn') { e.preventDefault(); return; }
    dragSrcIndex = parseInt(tab.dataset.layer);
    tab.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(dragSrcIndex));
  });
  layerTabsEl.addEventListener('dragend', function(e) {
    document.querySelectorAll('.layer-tab.dragging').forEach(function(t) { t.classList.remove('dragging'); });
    document.querySelectorAll('.layer-tab.drag-over').forEach(function(t) { t.classList.remove('drag-over'); });
    dragSrcIndex = null;
  });
  layerTabsEl.addEventListener('dragover', function(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    var tab = e.target.closest('.layer-tab[data-layer]');
    if (tab && parseInt(tab.dataset.layer) !== dragSrcIndex) {
      document.querySelectorAll('.layer-tab.drag-over').forEach(function(t) { t.classList.remove('drag-over'); });
      tab.classList.add('drag-over');
    }
  });
  layerTabsEl.addEventListener('dragleave', function(e) {
    var tab = e.target.closest('.layer-tab');
    if (tab) tab.classList.remove('drag-over');
  });
  layerTabsEl.addEventListener('drop', function(e) {
    e.preventDefault();
    document.querySelectorAll('.layer-tab.drag-over').forEach(function(t) { t.classList.remove('drag-over'); });
    var tab = e.target.closest('.layer-tab[data-layer]');
    if (!tab) return;
    var dropIndex = parseInt(tab.dataset.layer);
    if (isNaN(dropIndex) || dragSrcIndex === null || dragSrcIndex === dropIndex) return;
    pushUndo();
    // Move the layer in the array
    var moving = keymapLayers.splice(dragSrcIndex, 1)[0];
    keymapLayers.splice(dropIndex, 0, moving);
    // Update activeLayerIndex to follow the previously active layer
    if (activeLayerIndex === dragSrcIndex) {
      activeLayerIndex = dropIndex;
    } else if (dragSrcIndex < activeLayerIndex && dropIndex >= activeLayerIndex) {
      activeLayerIndex--;
    } else if (dragSrcIndex > activeLayerIndex && dropIndex <= activeLayerIndex) {
      activeLayerIndex++;
    }
    dragSrcIndex = null;
    renderLayerTabs();
    renderKeyboardSvg('keyboardSvg');
    renderKeymapSensorList();
    updateKeymapOutput();
  });

  // --- Layer name inline rename on click ---
  document.getElementById('layerNameDisplay').addEventListener('dblclick', function(e) {
    var nameEl = e.target;
    var layerIdx = parseInt(nameEl.dataset.layerIndex);
    if (isNaN(layerIdx) || !keymapLayers[layerIdx]) return;
    var layer = keymapLayers[layerIdx];
    var currentName = layer.displayName || layer.name;
    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'layer-name-input';
    input.value = currentName;
    nameEl.textContent = '';
    nameEl.appendChild(input);
    input.focus();
    input.select();
    var committed = false;
    function commitRename() {
      if (committed) return;
      committed = true;
      var newName = input.value.trim();
      if (newName && newName !== currentName) {
        pushUndo();
        layer.displayName = newName;
        layer.name = newName.toLowerCase().replace(/[^a-z0-9_]/g, '_');
        updateKeymapOutput();
      }
      renderLayerTabs();
    }
    input.addEventListener('blur', commitRename);
    input.addEventListener('keydown', function(ev) {
      if (ev.key === 'Enter') { ev.preventDefault(); input.blur(); }
      if (ev.key === 'Escape') { ev.preventDefault(); input.value = currentName; input.blur(); }
    });
  });

  // --- Layer context menu ---
  document.getElementById('layerCtxBtn').addEventListener('click', function(e) {
    e.stopPropagation();
    showLayerContextMenu(e.target);
  });
  document.getElementById('layerCtxMenu').addEventListener('click', function(e) {
    var item = e.target.closest('.ctx-menu-item');
    if (item && item.dataset.action) {
      handleCtxAction(item.dataset.action);
    }
  });

  // --- Keycode search ---
  var kcSearchInput = document.getElementById('kcSearchInput');
  var kcSearchClear = document.getElementById('kcSearchClear');
  kcSearchInput.addEventListener('input', function() {
    var q = this.value.trim().toLowerCase();
    kcSearchClear.style.display = q ? '' : 'none';
    document.querySelectorAll('#beKeycodeSection .keycode-btn').forEach(function(btn) {
      var match = !q || btn.dataset.kc.toLowerCase().indexOf(q) >= 0;
      btn.classList.toggle('hidden', !match);
    });
  });
  kcSearchClear.addEventListener('click', function() {
    kcSearchInput.value = '';
    kcSearchClear.style.display = 'none';
    document.querySelectorAll('#beKeycodeSection .keycode-btn').forEach(function(btn) {
      btn.classList.remove('hidden');
    });
  });

  // Keyboard SVG click â†’ opens floating ValuePicker + binding editor
  document.getElementById('keyboardSvg').addEventListener('click', function(e) {
    var group = e.target.closest('.key-group');
    if (!group) return;
    var keyIdx = parseInt(group.dataset.key);
    if (isNaN(keyIdx)) return;
    if (keymapLayers.length === 0) return;

    // Close any existing picker
    if (vpState.open) closeValuePicker();

    selectedKeyIndex = keyIdx;
    renderKeyboardSvg('keyboardSvg');

    // Also open the panel editor for detailed editing
    showBindingEditor(keyIdx);

    // Determine what was clicked via element and current binding
    var binding = keymapLayers[activeLayerIndex].bindings[keyIdx] || '';
    var parts = binding.trim().split(/\s+/);
    var behavior = parts[0] || '';
    var clickedEl = e.target;

    // Determine param type for popup
    var paramType, currentVal;
    if (clickedEl.classList.contains('key-label-top') || !behavior || behavior === '&trans' || behavior === '&none') {
      // Clicked behavior label or empty key â†’ show behavior picker
      paramType = 'behavior';
      currentVal = behavior;
    } else {
      // Clicked main label â†’ show param picker
      var behDef = ZMK_BEHAVIORS.find(function(b) { return b.name === behavior; });
      if (behDef && behDef.params.length > 0) {
        paramType = behDef.params[0];
        currentVal = parts.slice(1).join(' ');
      } else if (parts.length > 1) {
        // Custom behavior with params: infer type from param count
        // Hold-taps have 2 params: first is layer/modifier, second is keycode
        // Tap-dances and others with 1 param: show keycode picker
        var customBeh = keymapBehaviors.find(function(b) { return '&' + b.name === behavior; });
        if (customBeh && customBeh.type === 'hold-tap' && parts.length >= 3) {
          // Show keycode picker for the tap key (last param)
          paramType = 'keycode';
          currentVal = parts[parts.length - 1];
        } else {
          paramType = 'keycode';
          currentVal = parts[parts.length - 1];
        }
      } else {
        // No-param behavior â†’ behavior picker
        paramType = 'behavior';
        currentVal = behavior;
      }
    }

    // Get anchor rect from the SVG group
    var rect = group.getBoundingClientRect();
    openValuePicker(rect, paramType, currentVal, behavior, function(selected) {
      pushUndo();
      var currentParam = vpState.param;
      if (currentParam === 'behavior') {
        // Change behavior, reset params
        var newBeh = selected.code;
        var newBehDef = ZMK_BEHAVIORS.find(function(b) { return b.name === newBeh; });
        var newBinding = newBeh;
        if (newBehDef && newBehDef.cells > 0) {
          if (newBehDef.params[0] === 'layer') newBinding += ' 0';
          else if (newBehDef.params[0] === 'keycode') newBinding += ' A';
          else if (newBehDef.params[0] === 'bt_action') newBinding += ' BT_CLR';
          else if (newBehDef.params[0] === 'rgb_action') newBinding += ' RGB_TOG';
          else if (newBehDef.params[0] === 'out_action') newBinding += ' OUT_TOG';
          else if (newBehDef.params[0] === 'bl_action') newBinding += ' BL_TOG';
          else if (newBehDef.params[0] === 'ep_action') newBinding += ' EP_TOG';
          else if (newBehDef.params[0] === 'button') newBinding += ' LCLK';
          else if (newBehDef.params[0] === 'direction') newBinding += ' MOVE_UP';
          else if (newBehDef.params[0] === 'modifier') newBinding += ' LSHIFT';
          if (newBehDef.cells >= 2 && newBehDef.params[1] === 'keycode') newBinding += ' A';
        }
        keymapLayers[activeLayerIndex].bindings[keyIdx] = newBinding;
      } else {
        // Determine which param index to update based on current param type
        var curBinding = keymapLayers[activeLayerIndex].bindings[keyIdx] || '';
        var curParts = curBinding.trim().split(/\s+/);
        var curBehavior = curParts[0] || '';
        var curBehDef = ZMK_BEHAVIORS.find(function(b) { return b.name === curBehavior; });
        if (curBehDef && curBehDef.params) {
          var pIdx = curBehDef.params.indexOf(currentParam);
          if (pIdx >= 0) {
            while (curParts.length < pIdx + 2) curParts.push('');
            curParts[pIdx + 1] = selected.code;
            keymapLayers[activeLayerIndex].bindings[keyIdx] = curParts.join(' ');
          } else {
            // Fallback: set first param
            if (curParts.length < 2) curParts.push(selected.code);
            else curParts[1] = selected.code;
            keymapLayers[activeLayerIndex].bindings[keyIdx] = curParts.join(' ');
          }
        } else {
          // Custom behavior: update last param (most common: tap key in hold-tap)
          curParts[curParts.length - 1] = selected.code;
          keymapLayers[activeLayerIndex].bindings[keyIdx] = curParts.join(' ');
        }
      }
      closeValuePicker();
      renderKeyboardSvg('keyboardSvg');
      showBindingEditor(keyIdx);
      updateKeymapOutput();
    });
  });

  // Binding editor behavior dropdown change
  document.getElementById('beBehavior').addEventListener('change', function() {
    updateBindingEditorFields(this.value, []);
  });

  // Keycode grid click
  document.querySelectorAll('.keycode-grid').forEach(function(grid) {
    grid.addEventListener('click', function(e) {
      var btn = e.target.closest('.keycode-btn');
      if (!btn) return;
      var kc = btn.dataset.kc;
      // Determine which param to fill
      var behavior = document.getElementById('beBehavior').value;
      if (behavior === '&lt' || behavior === '&mt') {
        var p2 = document.getElementById('beParam2');
        if (p2) p2.value = kc;
      } else {
        var p1 = document.getElementById('beParam1');
        if (p1) p1.value = kc;
      }
    });
  });

  // Apply / Cancel binding
  document.getElementById('beApplyBtn').onclick = function() {
    applyBinding();
    cancelBindingEditor();
  };
  document.getElementById('beCancelBtn').onclick = cancelBindingEditor;
  // Quick-set &none / &trans
  document.getElementById('beSetNone').onclick = function() {
    if (selectedKeyIndex >= 0) {
      pushUndo();
      keymapLayers[activeLayerIndex].bindings[selectedKeyIndex] = '&none';
      cancelBindingEditor();
      renderKeyboardSvg('keyboardSvg');
      updateKeymapOutput();
    }
  };
  document.getElementById('beSetTrans').onclick = function() {
    if (selectedKeyIndex >= 0) {
      pushUndo();
      keymapLayers[activeLayerIndex].bindings[selectedKeyIndex] = '&trans';
      cancelBindingEditor();
      renderKeyboardSvg('keyboardSvg');
      updateKeymapOutput();
    }
  };

  // --- Undo/Redo button clicks ---
  document.getElementById('kmUndoBtn').onclick = performUndo;
  document.getElementById('kmRedoBtn').onclick = performRedo;

  // --- Global keyboard shortcuts ---
  document.addEventListener('keydown', function(e) {
    // Only active when keymap tab is visible
    if (document.getElementById('tabKeymap').style.display === 'none') return;
    // Don't intercept when typing in inputs
    var tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select' || e.target.isContentEditable) return;
    if (e.ctrlKey && !e.shiftKey && e.key === 'z') { e.preventDefault(); performUndo(); }
    else if ((e.ctrlKey && e.key === 'y') || (e.ctrlKey && e.shiftKey && e.key === 'z') || (e.ctrlKey && e.shiftKey && e.key === 'Z')) { e.preventDefault(); performRedo(); }
    else if (e.key === 'Escape') { cancelBindingEditor(); closeValuePicker(); }
  });

  // --- Floating ValuePicker events ---
  document.getElementById('vpOverlay').addEventListener('click', function(e) {
    // Click outside dialog â†’ close
    if (e.target === this) closeValuePicker();
  });
  document.getElementById('vpSearch').addEventListener('input', function() {
    vpState.query = this.value;
    vpState.highlighted = -1;
    vpRenderResults();
  });
  document.getElementById('vpSearch').addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      vpState.highlighted = vpState.highlighted < vpState.results.length - 1 ? vpState.highlighted + 1 : 0;
      vpRenderResults();
      vpScrollHighlightIntoView();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      vpState.highlighted = vpState.highlighted > 0 ? vpState.highlighted - 1 : vpState.results.length - 1;
      vpRenderResults();
      vpScrollHighlightIntoView();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (vpState.highlighted >= 0 && vpState.highlighted < vpState.results.length) {
        var item = vpState.results[vpState.highlighted];
        if (vpState.onSelect) vpState.onSelect(item);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeValuePicker();
    }
  });
  document.getElementById('vpResults').addEventListener('click', function(e) {
    var li = e.target.closest('li[data-vp-idx]');
    if (li) {
      var idx = parseInt(li.dataset.vpIdx);
      var item = vpState.results[idx];
      if (item && vpState.onSelect) vpState.onSelect(item);
    }
  });
  document.getElementById('vpResults').addEventListener('mouseover', function(e) {
    var li = e.target.closest('li[data-vp-idx]');
    if (li) {
      var newIdx = parseInt(li.dataset.vpIdx);
      if (newIdx !== vpState.highlighted) {
        // Just swap CSS class, don't re-render (which destroys DOM and breaks click)
        var prev = this.querySelector('.vp-hl');
        if (prev) prev.classList.remove('vp-hl');
        li.classList.add('vp-hl');
        vpState.highlighted = newIdx;
      }
    }
  });
  document.getElementById('vpCounter').addEventListener('click', function(e) {
    if (e.target.id === 'vpShowAll') {
      vpState.showAll = true;
      vpState.query = '';
      document.getElementById('vpSearch').value = '';
      vpRenderResults();
    }
  });
  document.getElementById('vpModeBar').addEventListener('click', function(e) {
    var btn = e.target.closest('.vp-mode-btn[data-vp-mode]');
    if (!btn || !vpState.open) return;
    var newParam = btn.dataset.vpMode;
    vpState.param = newParam;
    vpState.query = '';
    vpState.highlighted = -1;
    vpState.showAll = false;
    vpState.choices = vpBuildChoices(newParam, vpState.behavior);
    document.getElementById('vpPrompt').textContent = vpPromptForParam(newParam);
    document.getElementById('vpSearch').value = '';
    document.getElementById('vpSearch').style.display = vpState.choices.length > vpState.searchThreshold ? '' : 'none';
    // Update mode bar active state
    this.querySelectorAll('.vp-mode-btn').forEach(function(b) {
      b.classList.toggle('active', b.dataset.vpMode === newParam);
    });
    vpRenderResults();
    document.getElementById('vpSearch').focus();
  });

  // Keymap output copy
  document.getElementById('kmCopyBtn').onclick = function() {
    var editTa = document.getElementById('kmOutputEdit');
    var raw;
    if (editTa.style.display !== 'none') {
      raw = editTa.value;
    } else {
      var el = document.getElementById('kmOutput');
      raw = el.dataset.rawText || el.textContent;
    }
    navigator.clipboard.writeText(raw).catch(function() {
      var ta = document.createElement('textarea');
      ta.value = raw; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
    });
  };

  // Keymap output edit toggle
  document.getElementById('kmEditToggle').onclick = function() {
    var pre = document.getElementById('kmOutput');
    var ta = document.getElementById('kmOutputEdit');
    var btn = document.getElementById('kmEditToggle');
    var enteringEdit = (ta.style.display === 'none');
    if (enteringEdit) {
      ta.value = pre.dataset.rawText || pre.textContent;
      pre.style.display = 'none';
      ta.style.display = '';
      btn.innerHTML = '&#10003; Apply';
      btn.style.background = 'var(--success)';
      btn.style.color = '#fff';
      btn.style.borderColor = 'var(--success)';
    } else {
      // Re-parse edited text back into the tool
      var editedText = ta.value;
      if (editedText.trim()) {
        parseKeymap(editedText);
        if (activeLayerIndex >= keymapLayers.length) activeLayerIndex = 0;
        selectedKeyIndex = -1;
        document.getElementById('bindingEditor').classList.remove('visible');
        renderLayerTabs();
        populateBehaviorDropdown();
        renderKeyboardSvg('keyboardSvg');
        renderKeymapComboList();
        renderKeymapMacroList();
        renderKeymapBehaviorList();
        renderKeymapCondLayerList();
        renderKeymapSensorList();
        updateKeymapOutput();
        showStatus('kmParseStatus', 'Applied edits: ' + keymapLayers.filter(function(l) { return l.status !== 'reserved'; }).length + ' layers');
      }
      pre.style.display = '';
      ta.style.display = 'none';
      btn.innerHTML = '&#9998; Edit';
      btn.style.background = 'var(--item-bg)';
      btn.style.color = 'var(--text)';
      btn.style.borderColor = 'var(--border)';
    }
  };

  // --- Layer Customize dialog ---
  document.getElementById('lcOkBtn').onclick = function() {
    var layer = keymapLayers[activeLayerIndex];
    if (!layer) return;
    pushUndo();
    var newName = document.getElementById('lcName').value.trim();
    var newLabel = document.getElementById('lcLabel').value.trim();
    if (newName) layer.name = newName.toLowerCase().replace(/[^a-z0-9_]/g, '_');
    layer.displayName = newLabel || layer.name;
    closeLayerCustomizeDialog();
    renderLayerTabs();
    updateKeymapOutput();
  };
  document.getElementById('lcCancelBtn').onclick = closeLayerCustomizeDialog;
  document.getElementById('layerCustomizeOverlay').addEventListener('click', function(e) {
    if (e.target === this) closeLayerCustomizeDialog();
  });

  // --- Combo editor ---
  document.getElementById('kmAddComboBtn').onclick = function() {
    editingComboIndex = -1;
    comboSelectedPositions = [];
    document.getElementById('kmComboName').value = 'combo_' + keymapCombos.length;
    document.getElementById('kmComboBind').value = '&kp ESC';
    document.getElementById('kmComboTimeout').value = '50';
    document.getElementById('kmComboLayers').value = '';
    document.getElementById('kmComboSlowRelease').checked = false;
    document.getElementById('kmComboRequirePriorIdle').value = '';
    document.getElementById('kmComboEditor').style.display = '';
    renderComboMiniKb();
  };
  document.getElementById('kmComboSaveBtn').onclick = function() {
    pushUndo();
    var combo = {
      name: document.getElementById('kmComboName').value || 'combo_' + keymapCombos.length,
      binding: document.getElementById('kmComboBind').value,
      positions: comboSelectedPositions.slice().sort(function(a,b) { return a-b; }),
      layers: document.getElementById('kmComboLayers').value,
      timeout: parseInt(document.getElementById('kmComboTimeout').value) || 50
    };
    if (editingComboIndex >= 0) {
      combo._fromEditor = keymapCombos[editingComboIndex]._fromEditor || false;
      keymapCombos[editingComboIndex] = combo;
    } else {
      combo._fromEditor = true;
      keymapCombos.push(combo);
    }
    document.getElementById('kmComboEditor').style.display = 'none';
    editingComboIndex = -1;
    renderKeymapComboList();
    updateKeymapOutput();
  };

  // Combo mini keyboard click
  document.getElementById('comboMiniKb').addEventListener('click', function(e) {
    var group = e.target.closest('.key-group');
    if (!group) return;
    var ki = parseInt(group.dataset.key);
    if (isNaN(ki)) return;
    var idx = comboSelectedPositions.indexOf(ki);
    if (idx >= 0) comboSelectedPositions.splice(idx, 1);
    else comboSelectedPositions.push(ki);
    renderComboMiniKb();
  });

  // Combo list events
  document.getElementById('kmComboList').addEventListener('click', function(e) {
    if (e.target.dataset.removeCombo !== undefined) {
      pushUndo();
      keymapCombos.splice(parseInt(e.target.dataset.removeCombo), 1);
      renderKeymapComboList();
      updateKeymapOutput();
    }
    if (e.target.dataset.editCombo !== undefined) {
      var ci = parseInt(e.target.dataset.editCombo);
      editingComboIndex = ci;
      var c = keymapCombos[ci];
      document.getElementById('kmComboName').value = c.name;
      document.getElementById('kmComboBind').value = c.binding;
      document.getElementById('kmComboTimeout').value = c.timeout;
      document.getElementById('kmComboLayers').value = c.layers;
      document.getElementById('kmComboSlowRelease').checked = !!c.slowRelease;
      document.getElementById('kmComboRequirePriorIdle').value = c.requirePriorIdle || '';
      populateComboKeyPositionCheckboxes();
      if (c.keyPositions && c.keyPositions.length) {
        c.keyPositions.forEach(function(pos) {
          var cb = document.querySelector('#comboKeyPositions input[value="' + pos + '"]');
          if (cb) cb.checked = true;
        });
      }
      renderComboMiniKb();
      document.getElementById('comboEditor').style.display = '';
    }
  });

  // --- Macro editor ---
  var macroAddedViaButton = false;
  document.getElementById('kmAddMacroBtn').onclick = function() {
    pushUndo();
    macroAddedViaButton = true;
    editingMacroIndex = -1;
    keymapMacros.push({ name: 'macro_' + keymapMacros.length, label: '', steps: ['&macro_tap', '&kp A'], paramType: 0, waitMs: '', tapMs: '', _fromEditor: true });
    editingMacroIndex = keymapMacros.length - 1;
    var m = keymapMacros[editingMacroIndex];
    document.getElementById('kmMacroName').value = m.name;
    document.getElementById('kmMacroLabel').value = '';
    document.getElementById('kmMacroParamType').value = '0';
    document.getElementById('kmMacroWaitMs').value = '';
    document.getElementById('kmMacroTapMs').value = '';
    document.getElementById('kmMacroEditor').style.display = '';
    renderMacroSteps();
  };
  document.getElementById('kmMacroCancelBtn').onclick = function() {
    if (macroAddedViaButton && undoStack.length > 0) {
      // Revert the add-macro action
      performUndo();
    }
    macroAddedViaButton = false;
    document.getElementById('kmMacroEditor').style.display = 'none';
    editingMacroIndex = -1;
    renderKeymapMacroList();
  };
  document.getElementById('kmMacroSaveBtn').onclick = function() {
    pushUndo();
    macroAddedViaButton = false;
    if (editingMacroIndex >= 0) {
      keymapMacros[editingMacroIndex].name = document.getElementById('kmMacroName').value || 'macro_' + editingMacroIndex;
      keymapMacros[editingMacroIndex].label = document.getElementById('kmMacroLabel').value;
      keymapMacros[editingMacroIndex].paramType = parseInt(document.getElementById('kmMacroParamType').value) || 0;
      keymapMacros[editingMacroIndex].waitMs = document.getElementById('kmMacroWaitMs').value;
      keymapMacros[editingMacroIndex].tapMs = document.getElementById('kmMacroTapMs').value;
    }
    document.getElementById('kmMacroEditor').style.display = 'none';
    editingMacroIndex = -1;
    renderKeymapMacroList();
    populateBehaviorDropdown();
    updateKeymapOutput();
  };
  document.getElementById('kmMacroAddStep').onclick = function() {
    if (editingMacroIndex >= 0) {
      keymapMacros[editingMacroIndex].steps.push('&kp A');
      renderMacroSteps();
    }
  };
  document.getElementById('kmMacroAddString').onclick = function() {
    if (editingMacroIndex < 0) return;
    var str = prompt('Enter text string to type (letters, numbers, spaces):');
    if (!str) return;
    var macro = keymapMacros[editingMacroIndex];
    // Add &macro_tap if not already present as last control
    var lastStep = macro.steps.length > 0 ? macro.steps[macro.steps.length - 1] : '';
    if (lastStep !== '&macro_tap') {
      macro.steps.push('&macro_tap');
    }
    // Convert each character to &kp KEYCODE
    for (var ci = 0; ci < str.length; ci++) {
      var ch = str[ci];
      var kc = charToZmkKeycode(ch);
      if (kc) macro.steps.push('&kp ' + kc);
    }
    renderMacroSteps();
  };

  // Macro step container events (delegated)
  document.getElementById('kmMacroSteps').addEventListener('click', function(e) {
    if (e.target.dataset.removeStep !== undefined && editingMacroIndex >= 0) {
      keymapMacros[editingMacroIndex].steps.splice(parseInt(e.target.dataset.removeStep), 1);
      renderMacroSteps();
    }
    if (e.target.dataset.moveUp !== undefined && editingMacroIndex >= 0) {
      var idx = parseInt(e.target.dataset.moveUp);
      if (idx > 0) {
        var steps = keymapMacros[editingMacroIndex].steps;
        var tmp = steps[idx]; steps[idx] = steps[idx - 1]; steps[idx - 1] = tmp;
        renderMacroSteps();
      }
    }
    if (e.target.dataset.moveDown !== undefined && editingMacroIndex >= 0) {
      var idx2 = parseInt(e.target.dataset.moveDown);
      var steps2 = keymapMacros[editingMacroIndex].steps;
      if (idx2 < steps2.length - 1) {
        var tmp2 = steps2[idx2]; steps2[idx2] = steps2[idx2 + 1]; steps2[idx2 + 1] = tmp2;
        renderMacroSteps();
      }
    }
  });

  // Handle macro step type dropdown changes
  document.getElementById('kmMacroSteps').addEventListener('change', function(e) {
    if (e.target.dataset.stepType !== undefined && editingMacroIndex >= 0) {
      var stepIdx = parseInt(e.target.dataset.stepType);
      var newType = e.target.value;
      // Convert type to default step string
      var newStep = macroStepToString(newType, 'A', '100', keymapMacros[editingMacroIndex].steps[stepIdx]);
      keymapMacros[editingMacroIndex].steps[stepIdx] = newStep;
      renderMacroSteps();
    }
  });

  // Handle macro step parameter changes (keycode, time, raw)
  document.getElementById('kmMacroSteps').addEventListener('input', function(e) {
    if (editingMacroIndex < 0) return;
    var stepIdx;
    if (e.target.dataset.stepKeycode !== undefined) {
      stepIdx = parseInt(e.target.dataset.stepKeycode);
      var classified = classifyMacroStep(keymapMacros[editingMacroIndex].steps[stepIdx]);
      keymapMacros[editingMacroIndex].steps[stepIdx] = macroStepToString(classified.type, e.target.value, classified.time, '');
    }
    if (e.target.dataset.stepTime !== undefined) {
      stepIdx = parseInt(e.target.dataset.stepTime);
      var classified2 = classifyMacroStep(keymapMacros[editingMacroIndex].steps[stepIdx]);
      keymapMacros[editingMacroIndex].steps[stepIdx] = macroStepToString(classified2.type, '', e.target.value, '');
    }
    if (e.target.dataset.stepRaw !== undefined) {
      stepIdx = parseInt(e.target.dataset.stepRaw);
      keymapMacros[editingMacroIndex].steps[stepIdx] = e.target.value;
    }
  });

  // Macro list events
  document.getElementById('kmMacroList').addEventListener('click', function(e) {
    if (e.target.dataset.removeMacro !== undefined) {
      pushUndo();
      keymapMacros.splice(parseInt(e.target.dataset.removeMacro), 1);
      renderKeymapMacroList();
      populateBehaviorDropdown();
      updateKeymapOutput();
    }
    if (e.target.dataset.editMacro !== undefined) {
      editingMacroIndex = parseInt(e.target.dataset.editMacro);
      var m = keymapMacros[editingMacroIndex];
      document.getElementById('kmMacroName').value = m.name;
      document.getElementById('kmMacroLabel').value = m.label || '';
      document.getElementById('kmMacroParamType').value = String(m.paramType || 0);
      document.getElementById('kmMacroWaitMs').value = m.waitMs || '';
      document.getElementById('kmMacroTapMs').value = m.tapMs || '';
      document.getElementById('kmMacroEditor').style.display = '';
      renderMacroSteps();
    }
  });

  // --- Behavior editor ---
  document.getElementById('kmAddBehaviorBtn').onclick = function() {
    editingBehaviorIndex = -1;
    document.getElementById('kmBehaviorName').value = 'new_behavior';
    document.getElementById('kmBehaviorType').value = 'hold-tap';
    document.getElementById('kmBehaviorLabel').value = '';
    showBehaviorConfig('hold-tap');
    document.getElementById('kmBehaviorEditor').style.display = '';
  };
  document.getElementById('kmBehaviorType').onchange = function() {
    showBehaviorConfig(this.value);
  };
  document.getElementById('kmBehaviorCancelBtn').onclick = function() {
    document.getElementById('kmBehaviorEditor').style.display = 'none';
    editingBehaviorIndex = -1;
  };
  document.getElementById('kmBehaviorSaveBtn').onclick = function() {
    pushUndo();
    var type = document.getElementById('kmBehaviorType').value;
    var config = {};
    if (type === 'hold-tap') {
      config = {
        tappingTerm: document.getElementById('kmBehTappingTerm').value || '200',
        flavor: document.getElementById('kmBehFlavor').value,
        holdBinding: document.getElementById('kmBehHoldBinding').value,
        tapBinding: document.getElementById('kmBehTapBinding').value,
        quickTap: document.getElementById('kmBehQuickTap').value || '',
        requirePriorIdle: document.getElementById('kmBehRequirePriorIdle').value || '',
        holdTriggerPositions: document.getElementById('kmBehHoldTriggerPositions').value || '',
        retroTap: document.getElementById('kmBehRetroTap').checked,
        holdWhileUndecided: document.getElementById('kmBehHoldWhileUndecided').checked,
        holdWhileUndecidedLinger: document.getElementById('kmBehHoldWhileUndecidedLinger').checked,
        holdTriggerOnRelease: document.getElementById('kmBehHoldTriggerOnRelease').checked
      };
    } else if (type === 'tap-dance') {
      config = {
        tappingTerm: document.getElementById('kmBehTappingTerm').value || '200',
        bindings: document.getElementById('kmBehTdBindings').value
      };
    } else if (type === 'mod-morph') {
      config = {
        normalBinding: document.getElementById('kmBehMmNormal').value,
        morphedBinding: document.getElementById('kmBehMmMorphed').value,
        mods: document.getElementById('kmBehMmMods').value
      };
    } else if (type === 'sticky-key') {
      config = {
        releaseAfter: document.getElementById('kmBehSkRelease').value || '1000',
        binding: document.getElementById('kmBehSkBinding').value,
        quickRelease: document.getElementById('kmBehSkQuickRelease').checked,
        lazy: document.getElementById('kmBehSkLazy').checked,
        ignoreMods: document.getElementById('kmBehSkIgnoreMods').checked
      };
    } else if (type === 'macro') {
      config = {
        macroParams: document.getElementById('kmBehMacroParams').value || '0',
        macroWait: document.getElementById('kmBehMacroWait').value,
        macroTap: document.getElementById('kmBehMacroTap').value,
        macroBindings: document.getElementById('kmBehMacroBindings').value
      };
    } else if (type === 'sensor-rotate') {
      config = {
        sensorCW: document.getElementById('kmBehSensorCW').value,
        sensorCCW: document.getElementById('kmBehSensorCCW').value,
        sensorTap: document.getElementById('kmBehSensorTap').value
      };
    } else if (type === 'key-toggle') {
      var ktCb = document.getElementById('kmBehKtToggleMode');
      config = {
        toggleMode: (ktCb && ktCb.checked) ? document.getElementById('kmBehKtToggleModeVal').value : ''
      };
    } else if (type === 'caps-word') {
      config = {
        continueList: document.getElementById('kmBehCwContinueList').value || '',
        mods: document.getElementById('kmBehCwMods').value || ''
      };
    }
    var beh = {
      name: document.getElementById('kmBehaviorName').value || 'new_behavior',
      type: type,
      label: document.getElementById('kmBehaviorLabel').value,
      config: config
    };
    if (editingBehaviorIndex >= 0) {
      beh._fromEditor = keymapBehaviors[editingBehaviorIndex]._fromEditor || false;
      keymapBehaviors[editingBehaviorIndex] = beh;
    } else {
      beh._fromEditor = true;
      keymapBehaviors.push(beh);
    }
    document.getElementById('kmBehaviorEditor').style.display = 'none';
    editingBehaviorIndex = -1;
    renderKeymapBehaviorList();
    populateBehaviorDropdown();
    updateKeymapOutput();
  };

  // Behavior list events
  document.getElementById('kmBehaviorList').addEventListener('click', function(e) {
    if (e.target.dataset.removeBehavior !== undefined) {
      pushUndo();
      keymapBehaviors.splice(parseInt(e.target.dataset.removeBehavior), 1);
      renderKeymapBehaviorList();
      populateBehaviorDropdown();
      updateKeymapOutput();
    }
    if (e.target.dataset.editBehavior !== undefined) {
      editingBehaviorIndex = parseInt(e.target.dataset.editBehavior);
      var b = keymapBehaviors[editingBehaviorIndex];
      document.getElementById('kmBehaviorName').value = b.name;
      document.getElementById('kmBehaviorType').value = b.type;
      document.getElementById('kmBehaviorLabel').value = b.label || '';
      showBehaviorConfig(b.type);
      // Fill config fields
      if (b.type === 'hold-tap') {
        document.getElementById('kmBehTappingTerm').value = b.config.tappingTerm || '200';
        document.getElementById('kmBehFlavor').value = b.config.flavor || 'tap-preferred';
        document.getElementById('kmBehHoldBinding').value = b.config.holdBinding || '';
        document.getElementById('kmBehTapBinding').value = b.config.tapBinding || '';
        document.getElementById('kmBehQuickTap').value = b.config.quickTap || '';
        document.getElementById('kmBehRequirePriorIdle').value = b.config.requirePriorIdle || '';
        document.getElementById('kmBehHoldTriggerPositions').value = b.config.holdTriggerPositions || '';
        document.getElementById('kmBehRetroTap').checked = !!b.config.retroTap;
        document.getElementById('kmBehHoldWhileUndecided').checked = !!b.config.holdWhileUndecided;
        document.getElementById('kmBehHoldWhileUndecidedLinger').checked = !!b.config.holdWhileUndecidedLinger;
        document.getElementById('kmBehHoldTriggerOnRelease').checked = !!b.config.holdTriggerOnRelease;
      } else if (b.type === 'tap-dance') {
        document.getElementById('kmBehTappingTerm').value = b.config.tappingTerm || '200';
        document.getElementById('kmBehTdBindings').value = b.config.bindings || '';
      } else if (b.type === 'mod-morph') {
        document.getElementById('kmBehMmNormal').value = b.config.normalBinding || '';
        document.getElementById('kmBehMmMorphed').value = b.config.morphedBinding || '';
        document.getElementById('kmBehMmMods').value = b.config.mods || '';
      } else if (b.type === 'sticky-key') {
        document.getElementById('kmBehSkRelease').value = b.config.releaseAfter || '1000';
        document.getElementById('kmBehSkBinding').value = b.config.binding || '';
        document.getElementById('kmBehSkQuickRelease').checked = !!b.config.quickRelease;
        document.getElementById('kmBehSkLazy').checked = !!b.config.lazy;
        document.getElementById('kmBehSkIgnoreMods').checked = !!b.config.ignoreMods;
      } else if (b.type === 'macro') {
        document.getElementById('kmBehMacroParams').value = b.config.macroParams || '0';
        document.getElementById('kmBehMacroWait').value = b.config.macroWait || '';
        document.getElementById('kmBehMacroTap').value = b.config.macroTap || '';
        document.getElementById('kmBehMacroBindings').value = b.config.macroBindings || '';
      } else if (b.type === 'sensor-rotate') {
        document.getElementById('kmBehSensorCW').value = b.config.sensorCW || '';
        document.getElementById('kmBehSensorCCW').value = b.config.sensorCCW || '';
        document.getElementById('kmBehSensorTap').value = b.config.sensorTap || '';
      } else if (b.type === 'key-toggle') {
        var ktHasMode = !!b.config.toggleMode;
        var ktCb = document.getElementById('kmBehKtToggleMode');
        if (ktCb) ktCb.checked = ktHasMode;
        var ktRow = document.getElementById('kmBehKtToggleModeRow');
        if (ktRow) ktRow.style.display = ktHasMode ? '' : 'none';
        if (ktHasMode) { var ktVal = document.getElementById('kmBehKtToggleModeVal'); if (ktVal) ktVal.value = b.config.toggleMode; }
      } else if (b.type === 'caps-word') {
        document.getElementById('kmBehCwContinueList').value = b.config.continueList || '';
        document.getElementById('kmBehCwMods').value = b.config.mods || '';
      }
      document.getElementById('kmBehaviorEditor').style.display = '';
    }
  });

  // --- Quick-Assign overlay ---
  document.getElementById('qaOnScreenKb').addEventListener('click', function(e) {
    var btn = e.target.closest('.qa-key');
    if (!btn || !qaActive) return;
    qaAssign(btn.dataset.zmk);
  });
  document.getElementById('qaSkipBtn').onclick = function() {
    if (!qaActive) return;
    qaKeyIndex++;
    if (qaKeyIndex >= keymapLayers[activeLayerIndex].bindings.length) { closeQuickAssign(false); return; }
    updateQaStatus();
  };
  document.getElementById('qaBackBtn').onclick = function() {
    if (!qaActive) return;
    if (qaKeyIndex > 0) qaKeyIndex--;
    updateQaStatus();
  };
  document.getElementById('qaDoneBtn').onclick = function() { closeQuickAssign(false); };
  document.getElementById('qaCancelBtn').onclick = function() { closeQuickAssign(true); };
  document.getElementById('qaBehavior').onchange = function() { qaUpdateModVisibility(); };

  // --- Conditional layers editor ---
  document.getElementById('kmAddCondLayerBtn').onclick = function() {
    editingCondLayerIndex = -1;
    populateCondLayerSelects();
    document.getElementById('kmCondName').value = 'tri_layer';
    document.getElementById('kmCondLayerEditor').style.display = '';
  };
  document.getElementById('kmCondCancelBtn').onclick = function() {
    document.getElementById('kmCondLayerEditor').style.display = 'none';
    editingCondLayerIndex = -1;
  };
  document.getElementById('kmCondSaveBtn').onclick = function() {
    pushUndo();
    var ifSel = document.getElementById('kmCondIfLayers');
    var ifLayers = [];
    for (var oi = 0; oi < ifSel.options.length; oi++) {
      if (ifSel.options[oi].selected) ifLayers.push(parseInt(ifSel.options[oi].value));
    }
    var thenLayer = parseInt(document.getElementById('kmCondThenLayer').value);
    var condName = document.getElementById('kmCondName').value || 'tri_layer';
    var cond = { name: condName, ifLayers: ifLayers, thenLayer: thenLayer };
    if (editingCondLayerIndex >= 0) {
      keymapConditionalLayers[editingCondLayerIndex] = cond;
    } else {
      keymapConditionalLayers.push(cond);
    }
    document.getElementById('kmCondLayerEditor').style.display = 'none';
    editingCondLayerIndex = -1;
    renderKeymapCondLayerList();
    updateKeymapOutput();
  };
  document.getElementById('kmCondLayerList').addEventListener('click', function(e) {
    if (e.target.dataset.removeCondlayer !== undefined) {
      pushUndo();
      keymapConditionalLayers.splice(parseInt(e.target.dataset.removeCondlayer), 1);
      renderKeymapCondLayerList();
      updateKeymapOutput();
    }
    if (e.target.dataset.editCondlayer !== undefined) {
      var ci = parseInt(e.target.dataset.editCondlayer);
      editingCondLayerIndex = ci;
      var c = keymapConditionalLayers[ci];
      populateCondLayerSelects();
      document.getElementById('kmCondName').value = c.name;
      // Set multi-select values
      var ifSel = document.getElementById('kmCondIfLayers');
      for (var oi = 0; oi < ifSel.options.length; oi++) {
        ifSel.options[oi].selected = c.ifLayers.indexOf(parseInt(ifSel.options[oi].value)) >= 0;
      }
      document.getElementById('kmCondThenLayer').value = c.thenLayer;
      document.getElementById('kmCondLayerEditor').style.display = '';
    }
  });

  // --- Sensor bindings modal editor ---
  function openSensorModal(sensorIdx, subIdx, isNew) {
    editingSensorIndex = sensorIdx;
    editingSensorSubIdx = subIdx;
    var overlay = document.getElementById('sensorModalOverlay');
    var encoderNames = ['encoder_left', 'encoder_right'];

    if (isNew) {
      // Adding new encoder
      var name = encoderNames[subIdx >= 0 ? subIdx : 0] || 'encoder';
      document.getElementById('smEncoderName').textContent = name;
      document.getElementById('smBehavior').value = '&inc_dec_kp';
      document.getElementById('smIncrement').value = 'C_VOL_UP';
      document.getElementById('smDecrement').value = 'C_VOL_DN';
      document.getElementById('smCustomBinding').value = '';
      document.getElementById('smCustomRow').style.display = 'none';
      document.getElementById('smIncDecParams').style.display = '';
    } else {
      // Editing existing
      var s = keymapSensorBindings[sensorIdx];
      var token = s.bindings[subIdx] || '';
      var name = encoderNames[subIdx] || ('encoder_' + subIdx);
      document.getElementById('smEncoderName').textContent = name;
      var p = parseSensorToken(token);
      if (p.behavior === '&inc_dec_kp') {
        document.getElementById('smBehavior').value = '&inc_dec_kp';
        document.getElementById('smIncrement').value = p.increment || '';
        document.getElementById('smDecrement').value = p.decrement || '';
        document.getElementById('smCustomBinding').value = '';
        document.getElementById('smCustomRow').style.display = 'none';
        document.getElementById('smIncDecParams').style.display = '';
      } else {
        document.getElementById('smBehavior').value = 'custom';
        document.getElementById('smCustomBinding').value = p.raw || '';
        document.getElementById('smCustomRow').style.display = '';
        document.getElementById('smIncDecParams').style.display = 'none';
      }
    }
    // Update icon preview
    updateSensorIconPreview();
    overlay.style.display = 'flex';
  }

  function updateSensorIconPreview() {
    var icon = document.getElementById('smIconPreview');
    var beh = document.getElementById('smBehavior').value;
    if (beh === '&inc_dec_kp') {
      var inc = document.getElementById('smIncrement').value || '?';
      var dec = document.getElementById('smDecrement').value || '?';
      icon.innerHTML = '<span style="font-size:0.5em;color:var(--accent2);position:absolute;top:-1px;">&inc_dec_kp</span>' +
        '<span style="font-size:0.55em;display:flex;align-items:center;gap:1px;">&#x21BB;' + esc(inc) + '</span>' +
        '<span style="font-size:0.55em;display:flex;align-items:center;gap:1px;">&#x21BA;' + esc(dec) + '</span>';
    } else {
      var raw = document.getElementById('smCustomBinding').value || '?';
      icon.innerHTML = '<span style="font-size:0.55em;">' + esc(raw) + '</span>';
    }
  }

  function closeSensorModal() {
    document.getElementById('sensorModalOverlay').style.display = 'none';
    editingSensorIndex = -1;
    editingSensorSubIdx = -1;
  }

  document.getElementById('smBehavior').addEventListener('change', function() {
    var custom = this.value === 'custom';
    document.getElementById('smCustomRow').style.display = custom ? '' : 'none';
    document.getElementById('smIncDecParams').style.display = custom ? 'none' : '';
    updateSensorIconPreview();
  });
  document.getElementById('smIncrement').addEventListener('input', updateSensorIconPreview);
  document.getElementById('smDecrement').addEventListener('input', updateSensorIconPreview);
  document.getElementById('smCustomBinding').addEventListener('input', updateSensorIconPreview);

  document.getElementById('smCancelBtn').onclick = closeSensorModal;
  document.getElementById('sensorModalOverlay').addEventListener('click', function(e) {
    if (e.target === this) closeSensorModal();
  });

  document.getElementById('smApplyBtn').onclick = function() {
    pushUndo();
    var beh = document.getElementById('smBehavior').value;
    var bindingStr;
    if (beh === 'custom') {
      bindingStr = document.getElementById('smCustomBinding').value.trim() || '&none';
    } else {
      var inc = document.getElementById('smIncrement').value.trim() || 'C_VOL_UP';
      var dec = document.getElementById('smDecrement').value.trim() || 'C_VOL_DN';
      bindingStr = '&inc_dec_kp ' + inc + ' ' + dec;
    }

    if (editingSensorIndex >= 0 && editingSensorSubIdx >= 0) {
      // Editing existing token
      keymapSensorBindings[editingSensorIndex].bindings[editingSensorSubIdx] = bindingStr;
    } else if (editingSensorIndex >= 0 && editingSensorSubIdx === -1) {
      // Adding new encoder to existing layer entry
      keymapSensorBindings[editingSensorIndex].bindings.push(bindingStr);
    } else {
      // Creating new sensor entry for this layer
      keymapSensorBindings.push({ layerIndex: activeLayerIndex, bindings: [bindingStr] });
    }
    closeSensorModal();
    renderKeymapSensorList();
    updateKeymapOutput();
  };

  // Event delegation for sensor cards
  document.getElementById('sensorCards').addEventListener('click', function(e) {
    // Delete button
    var delBtn = e.target.closest('.sensor-delete');
    if (delBtn) {
      e.stopPropagation();
      pushUndo();
      var idx = parseInt(delBtn.dataset.delSensorIdx);
      var sub = parseInt(delBtn.dataset.delSensorSub);
      keymapSensorBindings[idx].bindings.splice(sub, 1);
      if (keymapSensorBindings[idx].bindings.length === 0) {
        keymapSensorBindings.splice(idx, 1);
      }
      renderKeymapSensorList();
      updateKeymapOutput();
      return;
    }
    // Add button
    if (e.target.id === 'sensorAddBtn' || e.target.closest('#sensorAddBtn')) {
      // Find if there's already an entry for active layer
      var existingIdx = -1;
      for (var si = 0; si < keymapSensorBindings.length; si++) {
        if (keymapSensorBindings[si].layerIndex === activeLayerIndex) { existingIdx = si; break; }
      }
      if (existingIdx >= 0) {
        var newSubIdx = keymapSensorBindings[existingIdx].bindings.length;
        openSensorModal(existingIdx, -1, true);
        // Set encoder name based on position
        var encoderNames2 = ['encoder_left', 'encoder_right'];
        document.getElementById('smEncoderName').textContent = encoderNames2[newSubIdx] || ('encoder_' + newSubIdx);
        editingSensorSubIdx = -1;
      } else {
        openSensorModal(-1, -1, true);
      }
      return;
    }
    // Click on card to edit
    var card = e.target.closest('.sensor-card');
    if (card) {
      var sIdx = parseInt(card.dataset.sensorIdx);
      var sSub = parseInt(card.dataset.sensorSub);
      openSensorModal(sIdx, sSub, false);
    }
  });

  // --- Sensor key code picker ---
  (function() {
    var keyGroups = [
      { label: 'Volume', keys: ['C_VOL_UP', 'C_VOL_DN', 'C_MUTE'] },
      { label: 'Media', keys: ['C_NEXT', 'C_PREV', 'C_PP', 'C_STOP', 'C_RW', 'C_FF'] },
      { label: 'Navigation', keys: ['PG_UP', 'PG_DN', 'UP', 'DOWN', 'LEFT', 'RIGHT', 'HOME', 'END'] },
      { label: 'Brightness', keys: ['C_BRI_UP', 'C_BRI_DN'] },
      { label: 'Scroll', keys: ['K_SCROLL_UP', 'K_SCROLL_DOWN'] },
      { label: 'Tabs', keys: ['LC(TAB)', 'LC(LS(TAB))'] },
      { label: 'Zoom', keys: ['LC(EQUAL)', 'LC(MINUS)'] },
      { label: 'Undo/Redo', keys: ['LC(Z)', 'LC(Y)'] }
    ];

    function buildPicker(containerId, inputId) {
      var container = document.getElementById(containerId);
      if (!container) return;
      container.innerHTML = '';
      keyGroups.forEach(function(g) {
        var lbl = document.createElement('div');
        lbl.className = 'sm-key-picker-label';
        lbl.textContent = g.label;
        container.appendChild(lbl);
        var row = document.createElement('div');
        row.style.cssText = 'display:flex;flex-wrap:wrap;gap:3px;';
        g.keys.forEach(function(k) {
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.textContent = k;
          btn.onclick = function() {
            document.getElementById(inputId).value = k;
            document.getElementById(inputId).dispatchEvent(new Event('input'));
          };
          row.appendChild(btn);
        });
        container.appendChild(row);
      });
    }

    buildPicker('smIncKeyPicker', 'smIncrement');
    buildPicker('smDecKeyPicker', 'smDecrement');
  })();

  // --- RGB output edit toggle ---
  document.getElementById('rgbEditToggle').onclick = function() {
    var ta = document.getElementById('output');
    var btn = document.getElementById('rgbEditToggle');
    var isEditing = !ta.readOnly;
    if (!isEditing) {
      // Enter edit mode
      ta.readOnly = false;
      ta.style.borderColor = 'var(--accent)';
      btn.innerHTML = '&#10003; Apply';
      btn.style.background = 'var(--success)';
      btn.style.color = '#fff';
      btn.style.borderColor = 'var(--success)';
    } else {
      // Apply edits: re-parse the text
      var editedText = ta.value.trim();
      if (editedText) {
        document.getElementById('userCodePaste').value = editedText;
        parseUserCode();
        renderLayerList();
        updateRgbOutput();
      }
      ta.readOnly = true;
      ta.style.borderColor = '';
      btn.innerHTML = '&#9998; Edit';
      btn.style.background = 'var(--item-bg)';
      btn.style.color = 'var(--text)';
      btn.style.borderColor = 'var(--border)';
    }
  };

  // --- Initial render ---
  renderLayerTabs();
  renderKeymapComboList();
  renderKeymapMacroList();
  renderKeymapBehaviorList();
  renderKeymapCondLayerList();
  renderKeymapSensorList();
});

function showStatus(elementId, msg) {
  var el = document.getElementById(elementId);
  el.textContent = msg;
  el.style.display = 'inline';
  setTimeout(function() { el.style.display = 'none'; }, 4000);
}
