# _extract_lines.ps1 — Run with: .\\_extract_lines.ps1
# Scans RGB_Code_Helper.html and prints every landmark line number
# the RefDoc references. Output is a ready-to-use mapping table.
# Works on any Windows machine (no Node.js required).

$ErrorActionPreference = 'Stop'
$htmlPath = Join-Path $PSScriptRoot '..\RGB_Code_Helper.html'
$lines = [System.IO.File]::ReadAllLines($htmlPath)
$total = $lines.Count

function Find-Line([string]$pattern, [int]$from = 0, [switch]$regex) {
    for ($i = $from; $i -lt $lines.Count; $i++) {
        if ($regex) { if ($lines[$i] -match $pattern) { return $i + 1 } }
        else        { if ($lines[$i].Contains($pattern))  { return $i + 1 } }
    }
    return $null
}

function Find-AllLines([string]$pattern, [switch]$regex) {
    $results = @()
    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($regex) { if ($lines[$i] -match $pattern) { $results += [pscustomobject]@{Name=$Matches[1];Line=($i+1)} } }
        else        { if ($lines[$i].Contains($pattern))  { $results += ($i + 1) } }
    }
    return $results
}

# ── STRUCTURAL ────────────────────────────────────────────────
$style   = Find-Line '<style>'
$body    = Find-Line '<body'
$script  = Find-Line '<script>'
$endHtml = Find-Line '</html>' -from ($total - 10)

# ── GLOBAL VARS ───────────────────────────────────────────────
$gvars = @(
    'var layers ','var macros ','var behaviors ','var combos ',
    'var blinkMacros ','var dtsiNativeBehaviors ',
    'var colorValueMap ','var colorLabelMap ',
    'var keymapLayers ','var keymapCombos ','var keymapMacros ',
    'var keymapBehaviors ','var keymapConditionalLayers ',
    'var keymapSensorBindings ','var keyboardLayout ',
    'var currentLayoutId ',
    'var activeLayerIndex ','var selectedKeyIndex ',
    'var editingComboIndex ','var editingMacroIndex ',
    'var editingBehaviorIndex ',
    'var comboSelectedPositions ','var rgbComboSelectedPositions ',
    'var rgbEditingComboIndex ',
    'var keymapParsedIncludes ','var keymapParsedHeaderLines ',
    'var keymapParsedRawBlocks ',
    'var undoStack ','var redoStack ','var UNDO_LIMIT '
)
$gvResults = @{}
foreach ($p in $gvars) {
    $ln = Find-Line $p -from ($script - 1)
    if ($ln) { $gvResults[$p.Trim()] = $ln }
}

# ── NAMED CONSTANTS ───────────────────────────────────────────
$consts = @(
    'var DEFAULT_CORNE_LAYOUT','var DEFAULT_LOTUS58_LAYOUT',
    'var ZMK_KEYCODES','var ZMK_BEHAVIORS',
    'var BT_ACTIONS','var RGB_ACTIONS','var OUT_ACTIONS',
    'var BL_ACTIONS','var EP_ACTIONS',
    'var MOUSE_BUTTONS','var MOUSE_MOVES','var MOUSE_SCROLLS',
    'var BUILTIN_BEHAVIORS','var QA_KEYBOARD_MAP',
    'var colorRe ','var behPositionalSelectedPositions'
)
$cResults = @{}
foreach ($p in $consts) {
    $ln = Find-Line $p -from ($script - 1)
    if ($ln) { $cResults[$p.Replace('var ','').Trim()] = $ln }
}

# ── ALL FUNCTION DECLARATIONS ─────────────────────────────────
$funcResults = Find-AllLines '^\s*function\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*\(' -regex

# ── DOMContentLoaded ──────────────────────────────────────────
$domReady = Find-Line "document.addEventListener('DOMContentLoaded'" -from ($script - 1)

# ── OUTPUT ────────────────────────────────────────────────────
Write-Host "=== RGB_Code_Helper.html - Line Number Extract ===" -ForegroundColor Cyan
Write-Host "Total lines: $total`n"

Write-Host "-- STRUCTURAL --" -ForegroundColor Yellow
Write-Host ("  <style>".PadRight(14) + " -> L$style")
Write-Host ("  <body".PadRight(14)   + " -> L$body")
Write-Host ("  <script>".PadRight(14)+ " -> L$script")
Write-Host ("  </html>".PadRight(14) + " -> L$endHtml")

Write-Host "`n-- GLOBAL VARS --" -ForegroundColor Yellow
$gvResults.GetEnumerator() | Sort-Object Value | ForEach-Object {
    Write-Host ("  " + $_.Key.PadRight(42) + " -> L" + $_.Value)
}

Write-Host "`n-- NAMED CONSTANTS --" -ForegroundColor Yellow
$cResults.GetEnumerator() | Sort-Object Value | ForEach-Object {
    Write-Host ("  " + $_.Key.PadRight(42) + " -> L" + $_.Value)
}

Write-Host "`n-- ALL FUNCTIONS ($($funcResults.Count) total) --" -ForegroundColor Yellow
foreach ($f in $funcResults) {
    Write-Host ("  " + $f.Name.PadRight(42) + " -> L" + $f.Line)
}

Write-Host "`n-- EVENT HANDLERS --" -ForegroundColor Yellow
Write-Host ("  DOMContentLoaded".PadRight(42) + " -> L$domReady")

# ── SECTION RANGE ESTIMATES ───────────────────────────────────
$fn = @{}
foreach ($f in $funcResults) { $fn[$f.Name] = $f.Line }

Write-Host "`n-- SECTION RANGES (for RefDoc) --" -ForegroundColor Yellow

# Pre-extract as plain ints to avoid PS array-subtraction issues
[int]$iStyle   = $style;  [int]$iBody = $body; [int]$iScript = $script; [int]$iEnd = $endHtml
[int]$iLayers  = $gvResults['var layers'];     [int]$iUndoLim = $gvResults['var UNDO_LIMIT']
[int]$iCorne   = $cResults['DEFAULT_CORNE_LAYOUT']; [int]$iLotus = $cResults['DEFAULT_LOTUS58_LAYOUT']
[int]$iZkc     = $cResults['ZMK_KEYCODES'];   [int]$iZbeh  = $cResults['ZMK_BEHAVIORS']
[int]$iBuiltin = $cResults['BUILTIN_BEHAVIORS']; [int]$iQa = $cResults['QA_KEYBOARD_MAP']

# Function line ints
[int]$fSnap     = $fn['snapshotState'];    [int]$fHsb     = $fn['hsbToHex']
[int]$fEnsure   = $fn['ensureHsbPicker'];  [int]$fLayOpt  = $fn['layerOptionsHTML']
[int]$fParse    = $fn['parseUserCode'];    [int]$fRgbAll  = $fn['rgbRenderAll']
[int]$fRgbOut   = $fn['updateRgbOutput'];  [int]$fLoad    = $fn['loadLayout']
[int]$fBind     = $fn['bindingToLabels'];  [int]$fPkm     = $fn['parseKeymap']
[int]$fLtabs    = $fn['renderLayerTabs'];  [int]$fPopKc   = $fn['populateKeycodeGrids']
[int]$fComboKb  = $fn['renderComboMiniKb'];[int]$fKmOut   = $fn['updateKeymapOutput']
[int]$fGenBeh   = $fn['generateBehaviorCode']; [int]$fSync = $fn['syncCrossTabData']
[int]$fFuzzy    = $fn['fuzzyMatch'];       [int]$fVp      = $fn['openValuePicker']
[int]$fSwitch   = $fn['switchTab'];        [int]$iDom     = $domReady

$ranges = [ordered]@{
    'S2  CSS'             = "$iStyle-$($iBody-1)"
    'S2  HTML'            = "$iBody-$($iScript-1)"
    'S2  JavaScript'      = "$($iScript+1)-$($iEnd-2)"
    'S3  Global Data'     = "$iLayers-$iUndoLim"
    'S4  Undo/Redo'       = "$fSnap-$($iCorne-1)"
    'S5  Layouts'         = "$iCorne-$($iZkc-1)"
    'S6  Keycodes/Beh'    = "$iZkc-$($iBuiltin-1)"
    'S7  Colors'          = "$fHsb-$($fEnsure-1)"
    'S8  HSB Picker'      = "$fEnsure-$($fLayOpt-1)"
    'S9  RGB Helpers'     = "$fLayOpt-$($fParse-1)"
    'S10 Parser'          = "$fParse-$($fRgbAll-1)"
    'S11 RGB Rendering'   = "$fRgbAll-$($fRgbOut-1)"
    'S12 RGB Output'      = "$fRgbOut-$($fLoad-1)"
    'S13 SVG'             = "$fLoad-$($fBind-1)"
    'S14 Binding Labels'  = "$fBind-$($fPkm-1)"
    'S15 Keymap Parser'   = "$fPkm-$($fLtabs-1)"
    'S16 Layer Tabs'      = "$fLtabs-$($fPopKc-1)"
    'S17 Binding Editor'  = "$fPopKc-$($fComboKb-1)"
    'S18 Combo/Macro/Beh' = "$fComboKb-$iQa"
    'S19 Quick-Assign'    = "$iQa-$($fKmOut-1)"
    'S20 Keymap Output'   = "$fKmOut-$($fGenBeh-1)"
    'S21 Beh Code Gen'    = "$fGenBeh-$($fSync-1)"
    'S22 Cross-Tab Sync'  = "$fSync-$($fFuzzy-1)"
    'S23 Value Picker'    = "$fVp-$($fSwitch-1)"
    'S24 Tab/DarkMode'    = "$fSwitch-$($iDom-1)"
    'S25 DOMContentLoaded'= "$iDom-$($iEnd-2)"
}
foreach ($sec in $ranges.Keys) {
    $r = $ranges[$sec]
    Write-Host ("  " + $sec.PadRight(25) + " -> L$r")
}

Write-Host "`nDone." -ForegroundColor Green
