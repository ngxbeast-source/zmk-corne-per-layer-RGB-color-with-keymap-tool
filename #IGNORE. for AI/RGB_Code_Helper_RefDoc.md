# RGB_Code_Helper — Code Reference Guide
# ==========================================
# This document is a companion to `RGB_Code_Helper.html`.
# It explains how the code works in plain language for someone learning
# JavaScript and HTML for the first time.
#
# HOW TO USE THIS GUIDE:
# --------------------------------------------------------
#   - Code comments in the HTML file say things like:
#       "More on this code can be found in 'RefDoc' line XXX"
#   - That means you should come here and look at the line number XXX for more detail.
#   - Similarly, this document says things like:
#       "Ref. Line 974 in code"
#   - That means the actual code is on that line in RGB_Code_Helper.html.
#
# Lines referenced here match the file after the latest update.
# If the code file is updated, these references should be updated too.

# ============================================================
# TABLE OF CONTENTS
# ============================================================
# Line 35  — Section 1:  What This Tool Does (Overview)
# Line 70  — Section 2:  File Structure (HTML, CSS, JS)
# Line 105 — Section 3:  Global Data Model (the "memory" of the tool)
# Line 165 — Section 4:  Undo/Redo System
# Line 215 — Section 5:  Default Keyboard Layouts
# Line 245 — Section 6:  ZMK Keycodes & Behavior Reference Tables
# Line 280 — Section 7:  Color Utilities (HSB, Hex, RGB)
# Line 320 — Section 8:  HSB Color Picker
# Line 365 — Section 9:  RGB Tab Helper Functions
# Line 410 — Section 10: .dtsi Code Parser (parseUserCode)
# Line 465 — Section 11: RGB Tab Rendering (Lists, Dropdowns, UI)
# Line 515 — Section 12: RGB Output Generation (updateRgbOutput)
# Line 595 — Section 13: SVG Keyboard Renderer
# Line 640 — Section 14: Binding Labels (how keys show text)
# Line 680 — Section 15: .keymap File Parser (parseKeymap)
# Line 750 — Section 16: Layer Tabs & Management
# Line 800 — Section 17: Binding Editor (how you change a key)
# Line 855 — Section 18: Combo, Macro, & Behavior Editors
# Line 920 — Section 19: Quick-Assign System
# Line 970 — Section 20: Keymap Output Generation (updateKeymapOutput)
# Line 1040 — Section 21: Behavior Code Generation
# Line 1080 — Section 22: Cross-Tab Sync (how RGB & Keymap tabs talk)
# Line 1130 — Section 23: Value Picker (floating search widget)
# Line 1165 — Section 24: Tab Switching & Dark Mode
# Line 1195 — Section 25: DOMContentLoaded (wiring everything up)
# Line 1245 — Section 26: Layer Ordering (how layers stay in sequence)

# ============================================================
# SECTION 1: WHAT THIS TOOL DOES (Overview)
# ============================================================
# Ref. Lines 1-6 in code (HTML head)
#
# This is a single-file web tool for configuring ZMK keyboards.
# ZMK is firmware that runs on keyboards like the Corne or Lotus58.
# The tool has two tabs:
#
#   Tab 1 — RGB Generator:
#     You paste .dtsi code (a ZMK configuration format) and the tool
#     parses it into editable layers, colors, macros, behaviors, and
#     combos. When you change things, it regenerates the .dtsi output.
#
#   Tab 2 — Keymap Editor:
#     You paste a .keymap file and the tool parses it into visual layers.
#     You see an SVG picture of the keyboard. Click a key to change its
#     binding. The tool regenerates the .keymap file as output.
#
# Both tabs share data. When you switch between them, the tool syncs
# layers, behaviors, and macros so they stay in agreement.
#
# The whole tool is one HTML file with embedded CSS and JavaScript.
# No server, no build step — just open the file in a browser.

# ============================================================
# SECTION 2: FILE STRUCTURE (HTML, CSS, JS)
# ============================================================
# Ref. Lines 1-6340 in code
#
# The file has three main parts:
#
#   1. CSS Styles (lines 7-340):
#      These control how everything looks: colors, spacing, fonts,
#      button styles, dark mode, etc. The tool uses CSS custom
#      properties (variables like --bg, --fg) for dark/light theme.
#
#   2. HTML Body (lines 341-971):
#      The page layout. All the buttons, text fields, dropdowns,
#      and hidden panels (like the binding editor, overlays, etc.)
#      are defined here as HTML elements. Each element has an "id"
#      so the JavaScript can find and control it.
#
#   3. JavaScript (lines 972-6340):
#      This is where all the logic lives. It starts with data
#      variables (line 974), then functions for parsing, rendering,
#      and generating code, and ends with event wiring at line 4938
#      inside a DOMContentLoaded block.
#
# Think of it like a building:
#   - CSS is the paint and decorations (how it looks)
#   - HTML is the rooms and furniture (what's on the page)
#   - JavaScript is the electricity and plumbing (how it works)

# ============================================================
# SECTION 3: GLOBAL DATA MODEL (the "memory" of the tool)
# ============================================================
# Ref. Lines 974-1013 in code
#
# The tool stores everything in JavaScript arrays and variables.
# Think of each array as a "notebook" that holds a list of items.
#
# --- RGB Tab Data (used by the RGB Generator tab) ---
#
#   layers        (line 976)  — List of layers with names, index numbers,
#                               and HSB color values. Example entry:
#                               { name: "LAYER_ABC", index: "0", h: "19",
#                                 s: "100", b: "17", label: "ABC" }
#
#   macros        (line 977)  — RGB macros (like MOMENTARY_RGB_MACRO).
#   behaviors     (line 978)  — RGB tab behavior list.
#   combos        (line 979)  — RGB tab combo definitions.
#   blinkMacros   (line 980)  — Blink macros (LED blink sequences).
#   colorValueMap (line 982)  — A lookup table: color name → HSB values.
#   colorLabelMap (line 983)  — A lookup table: color name → display label.
#
# --- Keymap Tab Data (used by the Keymap Editor tab) ---
#
#   keymapLayers            (line 986)  — Parsed keymap layers. Each has:
#                                         { name, displayName, bindings[], status }
#   keymapCombos            (line 987)  — Parsed combos from .keymap file.
#   keymapMacros            (line 988)  — Parsed macros from .keymap file.
#   keymapBehaviors         (line 989)  — Custom behaviors (hold-tap, etc).
#   keymapConditionalLayers (line 990)  — Conditional layer rules.
#   keymapSensorBindings    (line 991)  — Encoder rotation bindings per layer.
#   keyboardLayout          (line 992)  — Physical key positions (from JSON).
#
# --- State Variables ---
#
#   activeLayerIndex        (line 993)  — Which layer tab is selected right now.
#   selectedKeyIndex        (line 994)  — Which key is being edited (-1 = none).
#   editingComboIndex       (line 995)  — Which combo is being edited (-1 = none).
#   editingMacroIndex       (line 996)  — Which macro is being edited (-1 = none).
#   editingBehaviorIndex    (line 997)  — Which behavior is being edited (-1 = none).
#
# WHY TWO SETS OF DATA?
#   The RGB tab and Keymap tab each have their own data because they
#   parse different file formats (.dtsi vs .keymap). The "sync" functions
#   (syncCrossTabData and syncRgbToKeymap) copy data between them.
#   More on syncing: see Section 22 (line 1080 in this doc).

# ============================================================
# SECTION 4: UNDO/REDO SYSTEM
# ============================================================
# Ref. Lines 1015-1131 in code
#
# The undo system works like a camera taking snapshots:
#
#   snapshotState() (line 1008) — Takes a "photo" of ALL data:
#     keymapLayers, keymapCombos, keymapMacros, keymapBehaviors,
#     keymapConditionalLayers, keymapSensorBindings, and activeLayerIndex.
#     It uses JSON.parse(JSON.stringify(...)) to make a deep copy.
#     A "deep copy" means it copies everything inside the arrays too,
#     not just the array references. This way, changing the original data
#     later won't affect the snapshot.
#
#   restoreState(snap) (line 1037) — Loads a snapshot back.
#     Replaces all data arrays with the saved copies.
#
#   pushUndo() (line 1057) — Saves current state BEFORE a change.
#     Every time you edit something (add a layer, change a key, etc),
#     the code calls pushUndo() first. This saves the "before" state
#     so you can undo back to it. Keeps up to 50 entries (UNDO_LIMIT).
#
#   performUndo() (line 1065) — Goes back one step.
#     Moves current state to the redo stack, loads previous state.
#
#   performRedo() (line 1074) — Goes forward one step.
#     Moves current state to undo stack, loads the redo state.
#
#   fullRender() (line 1063) — Refreshes the entire UI after undo/redo.
#     Without this, the screen would show old data.
#
# The keyboard shortcuts Ctrl+Z (undo) and Ctrl+Y (redo) trigger
# these functions. See the DOMContentLoaded section (line 4722).

# ============================================================
# SECTION 5: DEFAULT KEYBOARD LAYOUTS
# ============================================================
# Ref. Lines 1133-1210 in code
#
# A "layout" describes the physical positions and sizes of every key
# on the keyboard. The tool uses this to draw the SVG keyboard picture.
#
# DEFAULT_CORNE_LAYOUT (line 1109):
#   42 keys arranged in a split ergonomic layout.
#   Each key has: x (horizontal position), y (vertical position),
#   w (width, defaults to 1), h (height, defaults to 1),
#   and optionally r (rotation angle) and rx/ry (rotation center).
#
# DEFAULT_LOTUS58_LAYOUT (line 1143):
#   A larger 60-key layout with built-in encoders.
#
# These defaults are used when no custom layout JSON is imported.
# The function loadLayout() (line 2237) applies the layout to
# the SVG renderer. See Section 13 (line 595 in this doc).

# ============================================================
# SECTION 6: ZMK KEYCODES & BEHAVIOR REFERENCE TABLES
# ============================================================
# Ref. Lines 1212-1283 in code
#
# ZMK_KEYCODES (line 1183):
#   A big lookup table of every key the keyboard can send.
#   Organized by category: Letters, Numbers, Punctuation, Modifiers,
#   Navigation, Function keys, Keypad, Media, etc.
#   Each entry has a display name (what you see on the button)
#   and the ZMK code (what goes in the .keymap file).
#
# ZMK_BEHAVIORS (line 1202):
#   A list of all built-in ZMK behaviors like &kp (key press),
#   &mo (momentary layer), &bt (bluetooth), &rgb_ug (RGB controls).
#   Each entry says how many parameters it takes.
#   Used by the binding editor dropdown (see Section 17, line 800).
#
# BT_ACTIONS, RGB_ACTIONS, OUT_ACTIONS, BL_ACTIONS, EP_ACTIONS (line 1234):
#   Sub-lists of specific actions for behaviors that have sub-commands.
#   Example: BT_ACTIONS has BT_CLR, BT_SEL, BT_NXT, etc.
#
# MOUSE_BUTTONS, MOUSE_MOVES, MOUSE_SCROLLS (line 1240):
#   Mouse emulation keycodes for &mkp, &mmv, and &msc behaviors.

# ============================================================
# SECTION 7: COLOR UTILITIES (HSB, Hex, RGB)
# ============================================================
# Ref. Lines 1285-1326 in code
#
# These small functions convert colors between different formats.
# Keyboards use HSB (Hue, Saturation, Brightness) for LED colors.
# Web browsers use Hex (#FF0000) or RGB for display.
#
#   hsbToHex(h, s, b) (line 1251):
#     Converts HSB values to a hex color string like "#FF3300".
#     Used to show color swatches in the layer list.
#     h = 0-360 (color wheel position), s = 0-100, b = 0-100.
#
#   hasHsbVal(v) (line 1267):
#     Checks if a value is a valid HSB number (not empty, not undefined).
#     Returns true for 0 (which is a valid color value).
#     This is important because in JavaScript, 0 is "falsy" —
#     a simple `if (v)` check would wrongly treat 0 as empty.
#
#   baseKey(name) (line 1280):
#     Strips "LAYER_" or "RGB_" prefix from a layer name and
#     converts to uppercase. Example: "LAYER_ABC" → "ABC".
#     Used for matching layers between RGB and Keymap tabs.
#
#   esc(str) (line 1285):
#     Escapes HTML characters to prevent injection.
#     Converts < > & " ' into safe HTML entities.

# ============================================================
# SECTION 8: HSB COLOR PICKER
# ============================================================
# Ref. Lines 1328-1522 in code
#
# This is the floating color picker popup that appears when you
# click a color swatch in the layer list.
#
# It's "lazy loaded" — the HTML elements for the picker are only
# created the first time you open it (ensureHsbPicker, line 1289).
# This is a common technique to avoid slowing down the initial page load.
#
# The picker shows:
#   - A hue bar (rainbow strip) at the bottom
#   - A saturation/brightness square (the big gradient area)
#   - H, S, B number inputs for precise values
#   - A "copy hex" button
#
# How it works:
#   1. openHsbPicker(layerIdx, anchorEl) — Opens the picker for a layer.
#      Reads the layer's current H, S, B values and displays them.
#   2. The user drags on the hue bar or S/V square to pick a color.
#   3. applyHsbPickerValue(h, s, b) — Saves the chosen color back to
#      the layer data and updates the swatch and output.
#   4. closeHsbPicker() — Hides the picker.

# ============================================================
# SECTION 9: RGB TAB HELPER FUNCTIONS
# ============================================================
# Ref. Lines 1524-1640 in code
#
# Small functions used by other parts of the RGB tab.
#
#   layerOptionsHTML(selected) (line 1476):
#     Builds the <option> tags for a layer dropdown menu.
#     Sorts layers by index so they appear in sequential order
#     (0, 1, 2, ...). The "selected" parameter pre-selects one.
#
#   colorOptionsHTML(selected) (line 1490):
#     Builds <option> tags for a color dropdown (only layers
#     that have HSB values assigned).
#
#   macroRefOptionsHTML(selected) (line 1497):
#     Builds <option> tags for a macro reference dropdown.
#
#   updateHeaderDropdowns() (line ~1535):
#     Refreshes all dropdown menus in the RGB macro and combo editors
#     with the latest layer and color lists.
#
#   addLayer(), addMacro(), addBehavior(), addCombo(), addBlinkMacro():
#     Functions that append new empty items to the data arrays.

# ============================================================
# SECTION 10: .dtsi CODE PARSER (parseUserCode)
# ============================================================
# Ref. Lines 1643-1815 in code
#
# This is the parser for the RGB Generator tab. When you paste
# .dtsi code and click "Parse Imported Code", this function runs.
#
# What it does:
#   1. Reads the text from the import textarea.
#   2. Uses regular expressions (regex) to find patterns in the text:
#      - #define LAYER_xxx N       → creates a layer with index N
#      - #define RGB_xxx RGB_COLOR_HSB(h,s,b) → creates a color
#      - ZMK_MACRO(...) blocks    → parses macros
#      - BLINK_SEQ macros         → parses blink macros
#      - Native ZMK behaviors     → parses hold-tap, tap-dance, etc.
#   3. Fills the layers[], macros[], behaviors[], combos[], and
#      blinkMacros[] arrays with parsed data.
#   4. Calls rgbRenderAll() to refresh the UI.
#
# REGEX (Regular Expressions):
#   These are patterns that find text. For example:
#   /#define\s+(LAYER_\S+)\s+(\d+)/  finds lines like "#define LAYER_ABC 0"
#   The \s+ means "one or more spaces", \S+ means "one or more non-spaces",
#   and \d+ means "one or more digits". The parentheses capture the matched
#   parts so you can use them (layer name and index number).
#   More on regex: see any JavaScript regex tutorial.

# ============================================================
# SECTION 11: RGB TAB RENDERING (Lists, Dropdowns, UI)
# ============================================================
# Ref. Lines 1817-2150 in code
#
# These functions draw the RGB tab's visual elements.
#
#   rgbRenderAll() (line 1752):
#     Master function that refreshes everything in the RGB tab.
#     Calls renderLayerList, updateHeaderDropdowns, updateRgbOutput,
#     renderLayerTabs (to update keymap tab's layer color dots).
#
#   renderLayerList() (line 1763):
#     Draws the rows in the "Layers & Colors" section.
#     For each layer, it creates input fields for Index, H, S, B,
#     Label, plus a color swatch and a delete button.
#     Orphan layers (no index) are shown faded.
#     The "layers.forEach(function(l, i) {...})" loop goes through
#     every layer in the array and builds HTML for each one.
#
#   renderMacroList(), renderBehaviorList(), renderComboList(),
#   renderBlinkMacroList():
#     Similar rendering functions for other RGB tab sections.
#
#   updateHeaderDropdowns() (line ~1535):
#     Fills the macro's Layer and Color dropdown menus.
#     Uses layerOptionsHTML() and colorOptionsHTML() to build options.

# ============================================================
# SECTION 12: RGB OUTPUT GENERATION (updateRgbOutput)
# ============================================================
# Ref. Lines 2152-2314 in code
#
# This is the function that generates the .dtsi output text shown
# in the "Generated Output" pane of the RGB tab.
#
# How it works step by step:
#
#   1. MERGE layers (lines 2084-2106):
#      Combines layers that refer to the same thing (by name or index).
#      This prevents duplicate #define lines in the output.
#      Uses two lookup tables: "merged" (by name) and "mergedByIndex" (by index).
#
#   2. SORT by index (lines 2106-2113):
#      After merging, sorts layers by their index number (0, 1, 2, 3...).
#      Layers without an index go to the end.
#      This ensures the output shows #define lines in sequential order.
#
#   3. WRITE LAYER DEFINES (lines 2114-2120):
#      Outputs lines like: #define LAYER_ABC 0
#
#   4. WRITE COLOR DEFINES (lines 2122-2132):
#      Outputs lines like: #define RGB_ABC RGB_COLOR_HSB(19,100,17)
#      Only for layers that have all three H, S, B values set.
#
#   5. WRITE HELPER MACROS (lines ~2134-2180):
#      Outputs BLINK_SEQ, MOMENTARY_RGB_MACRO, and ZMK_MACRO definitions.
#
#   6. WRITE MACRO INVOCATIONS (lines ~2180-2220):
#      Outputs macro entries using the template selected (MOMENTARY, etc).
#
#   7. WRITE COMBOS (lines ~2220-2236):
#      Outputs combo definitions using key positions and bindings.
#
# The final string is placed in the output textarea and also rendered
# with syntax highlighting in the output pane.

# ============================================================
# SECTION 13: SVG KEYBOARD RENDERER
# ============================================================
# Ref. Lines 2316-2427 in code
#
# These functions draw the keyboard picture using SVG (Scalable
# Vector Graphics — a way to draw shapes in HTML).
#
#   loadLayout(layoutObj) (line 2237):
#     Takes a keyboard layout (array of key positions) and stores it.
#     Triggers a re-render of the keyboard SVG.
#
#   renderKeyboardSvg(targetId, options) (line 2247):
#     The main drawing function. For each key in the layout:
#       - Calculates the position (x, y) and size (w, h)
#       - Handles rotated keys (some ergonomic keys are angled)
#       - Adds click handlers so you can click a key to edit it
#       - Shows the current binding label on each key
#     The SVG is placed inside the HTML element whose id matches targetId.
#
# Split keyboard detection:
#   The code looks for a "gap" — a big horizontal space between keys.
#   Keys before the gap are the left half, keys after are the right half.
#   This gap is used for formatting the .keymap output with proper alignment.

# ============================================================
# SECTION 14: BINDING LABELS (how keys show text)
# ============================================================
# Ref. Lines 2429-2524 in code
#
#   bindingToLabels(binding) (line 2344):
#     Converts a binding string like "&kp A" into display labels
#     for the SVG key. Returns { top, bottom, full } where:
#       - top = short behavior name (e.g., "A")
#       - bottom = parameter (e.g., "")
#       - full = complete binding text
#     Handles special cases: &trans shows "▽", &none shows "✕",
#     &mo shows "MO 2", &lt shows "LT 3 SPC", etc.
#
#   simplifyKeycode(kc) (line 2402):
#     Shortens keycode names for display: ESCAPE→ESC, DELETE→DEL, etc.
#
#   simplifyMod(mod) (line 2423):
#     Shortens modifier names: LEFT_CONTROL→LCTL, RIGHT_SHIFT→RSFT, etc.
#
#   getLayerLabel(idx) (line 2436):
#     Returns a display name for a layer index number.
#     Looks at keymapLayers and layers arrays for a matching name.

# ============================================================
# SECTION 15: .keymap FILE PARSER (parseKeymap)
# ============================================================
# Ref. Lines 2534-2838 in code
#
# This is the parser for the Keymap Editor tab. When you paste a
# .keymap file and click "Parse .keymap", this function runs.
#
# What it does:
#   1. Extracts #include lines (line 2455) for output preservation.
#   2. Finds the "keymap {" block (line 2475).
#   3. Extracts "raw blocks" — any devicetree blocks BEFORE the keymap
#      (combos, behaviors, macros) so they can be preserved in output.
#   4. For each layer inside the keymap block:
#      a. Reads the layer name from the node label (e.g., "abc_0")
#      b. Reads display-name or label (e.g., "ABC")
#      c. Reads the "bindings = <...>" section
#      d. Reads sensor-bindings if present
#      e. Detects "status = reserved" layers (skipped in UI)
#   5. Parses combos from a "combos {" block.
#   6. Parses macros from ZMK_MACRO nodes.
#   7. Parses custom behaviors (hold-tap, mod-morph, tap-dance,
#      sticky-key, key-toggle, caps-word, sensor-rotate).
#   8. Parses conditional layers.
#
# Layer indices are assigned sequentially: the first layer parsed
# gets index 0, the second gets index 1, etc. This matches the
# order they appear in the .keymap file.
#
# After parsing, the function triggers a full re-render of the UI.

# ============================================================
# SECTION 16: LAYER TABS & MANAGEMENT
# ============================================================
# Ref. Lines 2871-3125 in code
#
#   renderLayerTabs() (line 2774):
#     Draws the layer sidebar on the left side of the Keymap tab.
#     Each layer gets a tab showing its name, index number, and
#     (optionally) a colored dot from the RGB tab.
#     Active (selected) layer is highlighted. Reserved layers are hidden.
#
#   updateLayerHeader() (line ~2830):
#     Updates the layer name displayed above the keyboard SVG.
#
#   showLayerContextMenu() (line ~2840):
#     Shows a right-click menu with options like "Add Layer Above",
#     "Move Up", "Rename", "Delete", etc.
#
#   handleCtxAction(action) (line ~2880):
#     Executes the chosen context menu option. Uses pushUndo()
#     before making changes so you can undo them.

# ============================================================
# SECTION 17: BINDING EDITOR (how you change a key)
# ============================================================
# Ref. Lines 3117-3410 in code
#
# When you click a key on the SVG keyboard, the binding editor opens.
#
#   populateKeycodeGrids() (line 3003):
#     Fills the keycode button grid using ZMK_KEYCODES data.
#     Creates clickable buttons organized by category.
#
#   populateBehaviorDropdown() (line 3020):
#     Fills the behavior dropdown with ZMK_BEHAVIORS entries plus
#     any custom behaviors defined in the keymap.
#
#   showBindingEditor(keyIdx) (line 3075):
#     Opens the editor panel for a specific key. Reads the current
#     binding and fills in the behavior, parameters, and modifiers.
#
#   updateBindingEditorFields(behavior, params) (line ~3150):
#     Adjusts the editor UI based on the selected behavior.
#     Different behaviors need different input fields.
#     Example: &kp needs a keycode, &bt needs a BT action, etc.
#
#   applyBinding() (line 3243):
#     Saves the edited binding back to the layer data.
#     Calls pushUndo() first, then updates keymapLayers.
#
#   cancelBindingEditor() (line ~3270):
#     Closes the editor without saving.

# ============================================================
# SECTION 18: COMBO, MACRO, & BEHAVIOR EDITORS
# ============================================================
# Ref. Lines 3411-3698 in code
#
# These render and manage the combo, macro, and behavior lists
# in the Keymap Editor tab.
#
#   renderComboMiniKb() (line 3280):
#     Draws a small keyboard picture for selecting combo key positions.
#     You click keys on the mini-keyboard to choose which keys
#     trigger the combo.
#
#   renderKeymapComboList() (line 3305):
#     Displays the list of combos with their names, bindings, and
#     key positions. Includes edit and delete buttons.
#
#   renderKeymapMacroList() (line 3325):
#     Displays the list of macros with names and step previews.
#
#   renderKeymapBehaviorList() (line 3456):
#     Displays custom behaviors with type, name, and config summary.
#
#   showBehaviorConfig(type) (line 3472):
#     When you select a behavior type (hold-tap, tap-dance, etc),
#     this shows the appropriate configuration fields.
#     Different types need different settings:
#       - hold-tap: tapping-term, flavor, hold/tap bindings, etc.
#       - tap-dance: tapping-term, binding list
#       - mod-morph: normal/morphed bindings, modifier mask
#       - sticky-key: release time, binding, quick-release, lazy
#       - key-toggle: optional toggle-mode
#       - caps-word: continue-list, modifier mask
#       - macro: params, wait/tap times, binding steps
#       - sensor-rotate: CW/CCW/tap bindings

# ============================================================
# SECTION 19: QUICK-ASSIGN SYSTEM
# ============================================================
# Ref. Lines 3700-3912 in code
#
# Quick-assign lets you rapidly assign keycodes to every key
# by pressing keys on your physical keyboard.
#
#   openQuickAssign() — Opens the QA overlay on the first key.
#   qaAssign(zmkCode) — Assigns a code and moves to the next key.
#   qaKeydownHandler(e) — Listens for physical key presses and
#     converts them to ZMK keycodes using QA_KEYBOARD_MAP.
#   closeQuickAssign(cancelled) — Closes the overlay. If cancelled,
#     reverts all changes using undo.
#
# The on-screen keyboard (rendered by renderQaOnScreenKb) provides
# a visual alternative for keys not on your physical keyboard.

# ============================================================
# SECTION 20: KEYMAP OUTPUT GENERATION (updateKeymapOutput)
# ============================================================
# Ref. Lines 4039-4419 in code
#
# This is the biggest output function. It generates the complete
# .keymap file text from all the parsed/edited data.
#
# Output order:
#   1. #include lines (preserved from original file)
#   2. Pre-keymap raw blocks (if the file had custom combos/behaviors
#      outside the keymap block, they're preserved verbatim)
#   3. Custom behavior definitions (generated from keymapBehaviors)
#   4. Combo definitions
#   5. Macro definitions
#   6. The "keymap { compatible = ... }" block with all layers
#   7. Conditional layers
#
# Column alignment:
#   The binding output uses column-aligned formatting so the .keymap
#   file looks neat. It calculates the width of each column and pads
#   shorter bindings with spaces. Split keyboards get a visual gap
#   between the left and right halves.
#
# Syntax highlighting:
#   The output is also rendered as colored HTML in the preview pane.
#   Keywords, strings, and comments get different colors.

# ============================================================
# SECTION 21: BEHAVIOR CODE GENERATION
# ============================================================
# Ref. Lines 4414-4503 in code
#
#   generateBehaviorCode(b) (line 4227):
#     Takes a behavior object ({name, type, label, config}) and
#     generates the devicetree code for it.
#     Each behavior type has a different "compatible" string and
#     different properties. For example:
#       - hold-tap: compatible = "zmk,behavior-hold-tap"
#         properties: tapping-term-ms, flavor, bindings, quick-tap-ms, etc.
#       - tap-dance: compatible = "zmk,behavior-tap-dance"
#         properties: tapping-term-ms, bindings
#     This function is called by updateKeymapOutput() (line 3864)
#     when generating the behavior section of the .keymap file.

# ============================================================
# SECTION 22: CROSS-TAB SYNC (how RGB & Keymap tabs talk)
# ============================================================
# Ref. Lines 4494-4662 in code
#
# The two tabs have separate data, but they need to stay in agreement.
#
#   syncCrossTabData() (line 4302):
#     Called when switching TO the RGB tab.
#     Goes through every keymapLayer and adds matching entries to
#     the RGB layers[] array (if they don't already exist).
#     Matching is done by: index first, then by name.
#     After syncing, sorts layers by index so they appear in order.
#
#   syncRgbToKeymap() (line 4361):
#     Called when switching TO the Keymap tab.
#     Copies RGB macros into the keymap macro list so they appear
#     in the behavior dropdown.
#
# Layer Index Matching:
#   The keymap parser assigns indices 0, 1, 2, 3... to layers in
#   the order they appear in the file. The sync function uses these
#   indices so RGB layer "LAYER_ABC" at index 0 matches keymap
#   layer "abc_0" which is also parsed as index 0.
#
# After syncing, layers are sorted by index number so the RGB editor
# shows them in the same order as the keymap (0, 1, 2, 3...).
# See also: Section 26 (line 1245 in this doc).

# ============================================================
# SECTION 23: VALUE PICKER (floating search widget)
# ============================================================
# Ref. Lines 4644-4890 in code
#
# The value picker is a floating search box that appears when you
# need to choose a parameter value (like a keycode or layer number).
#
#   openValuePicker() — Shows the picker next to the input field.
#   closeValuePicker() — Hides it.
#   vpBuildChoices(param, currentBindBehavior) — Builds the list of
#     choices based on what parameter you're editing.
#     For example: if editing a &kp binding, shows all keycodes.
#     If editing a &mo binding, shows layer numbers.
#   vpRenderResults() — Draws the filtered list based on the search query.
#   fuzzyMatch(query, target) — Checks if the search query matches.
#
# KEYBOARD NAVIGATION:
#   Arrow Up/Down moves the highlight, Enter selects, Escape closes.
#   This is wired in the DOMContentLoaded block (line 4722).

# ============================================================
# SECTION 24: TAB SWITCHING & DARK MODE
# ============================================================
# Ref. Lines 4886-4936 in code
#
#   switchTab(tabId) (line 4675):
#     Switches between the RGB Generator and Keymap Editor tabs.
#     Hides one tab panel, shows the other.
#     When switching to Keymap: calls syncRgbToKeymap().
#     When switching to RGB: calls syncCrossTabData() and rgbRenderAll().
#
#   toggleDarkMode() (line 4701):
#     Switches between light and dark color themes.
#     Sets the "data-theme" attribute on the <html> element.
#     The CSS uses this attribute to apply different colors.
#
#   loadTheme() (line ~4710):
#     Checks localStorage for a saved theme preference.
#     localStorage is like a tiny file that the browser remembers.

# ============================================================
# SECTION 25: DOMContentLoaded (wiring everything up)
# ============================================================
# Ref. Lines 4938-6330 in code
#
# This is the longest section. It runs once when the page finishes
# loading. Its job is to connect HTML elements to JavaScript functions.
#
# "Event listeners" are the connectors:
#   element.onclick = function() { ... }
#   — means "when this element is clicked, run this function."
#
#   element.addEventListener('input', function(e) { ... })
#   — means "when the user types in this field, run this function."
#
# This section wires up:
#   - Tab buttons (lines 4724-4740)
#   - RGB parse button, Add buttons for layers/macros/etc.
#   - Macro editor open/close/save/delete
#   - Keymap parse button, layout import
#   - Layer drag-and-drop reordering
#   - Layer inline name editing
#   - Layer context menu
#   - Keyboard SVG key clicks → binding editor
#   - Binding editor Apply/Cancel
#   - Undo/Redo keyboard shortcuts (Ctrl+Z, Ctrl+Y)
#   - Value picker keyboard navigation
#   - Combo editor add/save
#   - Macro step editor add/remove/move
#   - Behavior editor open/save/cancel
#   - Quick-Assign buttons
#   - Conditional layer editor
#   - Sensor binding modal
#   - Output copy buttons
#   - Initial render calls
#
# Each subsection is marked with a comment like "// ---" in the code.
# The pattern is always: find the HTML element by id, then attach
# a function that runs when the user interacts with it.

# ============================================================
# SECTION 26: LAYER ORDERING (how layers stay in sequence)
# ============================================================
# This section explains the layer ordering feature that ensures
# layers appear in sequential order (0, 1, 2, 3...) everywhere.
#
# THE PROBLEM:
#   When a .keymap file is parsed, layers get sequential indices
#   (abc_0 = index 0, nmrw_1 = index 1, etc.). But the RGB tab
#   might already have layers with different ordering (pre-existing
#   layers were added first, synced layers get appended at the end).
#
# THE SOLUTION (three places):
#
#   1. syncCrossTabData() — Ref. Line 4505 in code
#      After adding keymap layers to the RGB list, sorts the
#      entire layers[] array by index number. Layers without
#      an index (orphans) go to the end. This makes the layer
#      list in the RGB editor display in sequential order.
#
#   2. updateRgbOutput() — Ref. Line 2152 in code
#      After merging duplicate layers, sorts the merged array
#      by index before generating output. This makes the
#      #define LAYER_xxx lines appear in sequential order.
#
#   3. layerOptionsHTML() — Ref. Line 1531 in code
#      When building dropdown menus, sorts layers by index
#      before creating the <option> tags. This makes the
#      dropdown show layers in sequential order.
#
# The sort function used is:
#   .sort(function(a, b) {
#     var ai = parseInt(a.index) or 9999;
#     var bi = parseInt(b.index) or 9999;
#     return ai - bi;
#   })
# This puts layer index 0 first, index 1 second, etc.
# Layers with no index get 9999 so they sort to the end.
