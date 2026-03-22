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
# Line 50  — Section 1:  What This Tool Does (Overview)
# Line 75  — Section 2:  File Structure (HTML, CSS, JS)
# Line 104 — Section 3:  Global Data Model (the "memory" of the tool)
# Line 151 — Section 4:  Undo/Redo System
# Line 186 — Section 5:  Default Keyboard Layouts
# Line 207 — Section 6:  ZMK Keycodes & Behavior Reference Tables
# Line 232 — Section 7:  Color Utilities (HSB, Hex, RGB)
# Line 261 — Section 8:  HSB Color Picker
# Line 287 — Section 9:  RGB Tab Helper Functions
# Line 313 — Section 10: .dtsi Code Parser (parseUserCode)
# Line 341 — Section 11: RGB Tab Rendering (Lists, Dropdowns, UI)
# Line 369 — Section 12: RGB Output Generation (updateRgbOutput)
# Line 408 — Section 13: SVG Keyboard Renderer
# Line 433 — Section 14: Binding Labels (how keys show text)
# Line 457 — Section 15: .keymap File Parser (parseKeymap)
# Line 488 — Section 16: Layer Tabs & Management
# Line 510 — Section 17: Binding Editor (how you change a key)
# Line 541 — Section 18: Combo, Macro, Behavior & Built-in Behavior Editors
# Line 577 — Section 19: Quick-Assign System
# Line 595 — Section 20: Keymap Output Generation (updateKeymapOutput)
# Line 623 — Section 21: Behavior Code Generation
# Line 640 — Section 22: Cross-Tab Sync (how RGB & Keymap tabs talk)
# Line 669 — Section 23: Value Picker (floating search widget)
# Line 690 — Section 24: Tab Switching & Dark Mode
# Line 710 — Section 25: DOMContentLoaded (wiring everything up)
# Line 750 — Section 26: Layer Ordering (how layers stay in sequence)
# Line 790 — Section 27: Macro Param Controls (context-aware editing)
# Line 830 — Section 28: Comment Preservation (.dtsi round-trip)
# Line 865 — Section 29: Clear Layer Feature

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
# Ref. Lines 1-6346 in code
#
# The file has three main parts:
#
#   1. CSS Styles (lines 7-340):
#      These control how everything looks: colors, spacing, fonts,
#      button styles, dark mode, etc. The tool uses CSS custom
#      properties (variables like --bg, --fg) for dark/light theme.
#      The html and body elements have height:100% and overflow:hidden
#      to prevent document-level scrolling from bleeding between tabs;
#      each tab panel scrolls independently within its own container.
#
#   2. HTML Body (lines 342-971):
#      The page layout. All the buttons, text fields, dropdowns,
#      and hidden panels (like the binding editor, overlays, etc.)
#      are defined here as HTML elements. Each element has an "id"
#      so the JavaScript can find and control it.
#
#   3. JavaScript (lines 972-6343):
#      This is where all the logic lives. It starts with data
#      variables (line 974), then functions for parsing, rendering,
#      and generating code, and ends with event wiring at line 4949
#      inside a DOMContentLoaded block.
#
# Think of it like a building:
#   - CSS is the paint and decorations (how it looks)
#   - HTML is the rooms and furniture (what's on the page)
#   - JavaScript is the electricity and plumbing (how it works)

# ============================================================
# SECTION 3: GLOBAL DATA MODEL (the "memory" of the tool)
# ============================================================
# Ref. Lines 973-1013 in code
#
# The tool stores everything in JavaScript arrays and variables.
# Think of each array as a "notebook" that holds a list of items.
#
# --- RGB Tab Data (used by the RGB Generator tab) ---
#
#   layers        (line 982)  — List of layers with names, index numbers,
#                               and HSB color values. Example entry:
#                               { name: "LAYER_ABC", index: "0", h: "19",
#                                 s: "100", b: "17", label: "ABC" }
#
#   macros        (line 983)  — RGB macros (like MOMENTARY_RGB_MACRO).
#   behaviors     (line 984)  — RGB tab behavior list.
#   combos        (line 985)  — RGB tab combo definitions.
#   blinkMacros   (line 986)  — Blink macros (LED blink sequences).
#   colorValueMap (line 988)  — A lookup table: color name → HSB values.
#   colorLabelMap (line 989)  — A lookup table: color name → display label.
#
# --- Keymap Tab Data (used by the Keymap Editor tab) ---
#
#   keymapLayers            (line 994)  — Parsed keymap layers. Each has:
#                                         { name, displayName, bindings[], status }
#   keymapCombos            (line 995)  — Parsed combos from .keymap file.
#   keymapMacros            (line 996)  — Parsed macros from .keymap file.
#   keymapBehaviors         (line 997)  — Custom behaviors (hold-tap, etc).
#   keymapConditionalLayers (line 998)  — Conditional layer rules.
#   keymapSensorBindings    (line 999)  — Encoder rotation bindings per layer.
#   keyboardLayout          (line 1000) — Physical key positions (from JSON).
#
# --- State Variables ---
#
#   activeLayerIndex        (line 1003) — Which layer tab is selected right now.
#   selectedKeyIndex        (line 1004) — Which key is being edited (-1 = none).
#   editingComboIndex       (line 1005) — Which combo is being edited (-1 = none).
#   editingMacroIndex       (line 1006) — Which macro is being edited (-1 = none).
#   editingBehaviorIndex    (line 1007) — Which behavior is being edited (-1 = none).
#
# WHY TWO SETS OF DATA?
#   The RGB tab and Keymap tab each have their own data because they
#   parse different file formats (.dtsi vs .keymap). The "sync" functions
#   (syncCrossTabData and syncRgbToKeymap) copy data between them.
#   More on syncing: see Section 22 (line 640 in this doc).

# ============================================================
# SECTION 4: UNDO/REDO SYSTEM
# ============================================================
# Ref. Lines 1014-1131 in code
#
# The undo system works like a camera taking snapshots:
#
#   snapshotState() (line 1026) — Takes a "photo" of ALL data:
#     keymapLayers, keymapCombos, keymapMacros, keymapBehaviors,
#     keymapConditionalLayers, keymapSensorBindings, and activeLayerIndex.
#     It uses JSON.parse(JSON.stringify(...)) to make a deep copy.
#     A "deep copy" means it copies everything inside the arrays too,
#     not just the array references. This way, changing the original data
#     later won't affect the snapshot.
#
#   restoreState(snap) (line 1053) — Loads a snapshot back.
#     Replaces all data arrays with the saved copies.
#
#   pushUndo() (line 1080) — Saves current state BEFORE a change.
#     Every time you edit something (add a layer, change a key, etc),
#     the code calls pushUndo() first. This saves the "before" state
#     so you can undo back to it. Keeps up to 50 entries (UNDO_LIMIT).
#
#   performUndo() (line 1113) — Goes back one step.
#     Moves current state to the redo stack, loads previous state.
#
#   performRedo() (line 1119) — Goes forward one step.
#     Moves current state to undo stack, loads the redo state.
#
#   fullRender() (line 1089) — Refreshes the entire UI after undo/redo.
#     Without this, the screen would show old data.
#
# The keyboard shortcuts Ctrl+Z (undo) and Ctrl+Y (redo) trigger
# these functions. See the DOMContentLoaded section (line 4949).

# ============================================================
# SECTION 5: DEFAULT KEYBOARD LAYOUTS
# ============================================================
# Ref. Lines 1132-1210 in code
#
# A "layout" describes the physical positions and sizes of every key
# on the keyboard. The tool uses this to draw the SVG keyboard picture.
#
# DEFAULT_CORNE_LAYOUT (line 1140):
#   42 keys arranged in a split ergonomic layout.
#   Each key has: x (horizontal position), y (vertical position),
#   w (width, defaults to 1), h (height, defaults to 1),
#   and optionally r (rotation angle) and rx/ry (rotation center).
#
# DEFAULT_LOTUS58_LAYOUT (line 1173):
#   A larger 60-key layout with built-in encoders.
#
# These defaults are used when no custom layout JSON is imported.
# The function loadLayout() (line 2316) applies the layout to
# the SVG renderer. See Section 13 (line 408 in this doc).

# ============================================================
# SECTION 6: ZMK KEYCODES & BEHAVIOR REFERENCE TABLES
# ============================================================
# Ref. Lines 1211-1283 in code
#
# ZMK_KEYCODES (line 1219):
#   A big lookup table of every key the keyboard can send.
#   Organized by category: Letters, Numbers, Punctuation, Modifiers,
#   Navigation, Function keys, Keypad, Media, etc.
#   Each entry has a display name (what you see on the button)
#   and the ZMK code (what goes in the .keymap file).
#
# ZMK_BEHAVIORS (line 1238):
#   A list of all built-in ZMK behaviors like &kp (key press),
#   &mo (momentary layer), &bt (bluetooth), &rgb_ug (RGB controls).
#   Each entry says how many parameters it takes.
#   Used by the binding editor dropdown (see Section 17, line 510).
#
# BT_ACTIONS, RGB_ACTIONS, OUT_ACTIONS, BL_ACTIONS, EP_ACTIONS (line 1275):
#   Sub-lists of specific actions for behaviors that have sub-commands.
#   Example: BT_ACTIONS has BT_CLR, BT_SEL, BT_NXT, etc.
#
# MOUSE_BUTTONS, MOUSE_MOVES, MOUSE_SCROLLS (line 1280):
#   Mouse emulation keycodes for &mkp, &mmv, and &msc behaviors.

# ============================================================
# SECTION 7: COLOR UTILITIES (HSB, Hex, RGB)
# ============================================================
# Ref. Lines 1284-1326 in code
#
# These small functions convert colors between different formats.
# Keyboards use HSB (Hue, Saturation, Brightness) for LED colors.
# Web browsers use Hex (#FF0000) or RGB for display.
#
#   hsbToHex(h, s, b) (line 1295):
#     Converts HSB values to a hex color string like "#FF3300".
#     Used to show color swatches in the layer list.
#     h = 0-360 (color wheel position), s = 0-100, b = 0-100.
#
#   hasHsbVal(v) (line 1323):
#     Checks if a value is a valid HSB number (not empty, not undefined).
#     Returns true for 0 (which is a valid color value).
#     This is important because in JavaScript, 0 is "falsy" —
#     a simple `if (v)` check would wrongly treat 0 as empty.
#
#   baseKey(name) (line 1324):
#     Strips "LAYER_" or "RGB_" prefix from a layer name and
#     converts to uppercase. Example: "LAYER_ABC" → "ABC".
#     Used for matching layers between RGB and Keymap tabs.
#
#   esc(str) (line 1325):
#     Escapes HTML characters to prevent injection.
#     Converts < > & " ' into safe HTML entities.

# ============================================================
# SECTION 8: HSB COLOR PICKER
# ============================================================
# Ref. Lines 1327-1522 in code
#
# This is the floating color picker popup that appears when you
# click a color swatch in the layer list.
#
# It's "lazy loaded" — the HTML elements for the picker are only
# created the first time you open it (ensureHsbPicker, line 1339).
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
# Ref. Lines 1523-1640 in code
#
# Small functions used by other parts of the RGB tab.
#
#   layerOptionsHTML(selected) (line 1531):
#     Builds the <option> tags for a layer dropdown menu.
#     Sorts layers by index so they appear in sequential order
#     (0, 1, 2, ...). The "selected" parameter pre-selects one.
#
#   colorOptionsHTML(selected) (line 1544):
#     Builds <option> tags for a color dropdown (only layers
#     that have HSB values assigned).
#
#   macroRefOptionsHTML(selected) (line 1569):
#     Builds <option> tags for a macro reference dropdown.
#
#   updateHeaderDropdowns() (line 2020):
#     Refreshes all dropdown menus in the RGB macro and combo editors
#     with the latest layer and color lists.
#     Also populates the combo layer picker dropdown (comboLayerPicker).
#
#   addLayer(), addMacro(), addBehavior(), addCombo(), addBlinkMacro():
#     Functions that append new empty items to the data arrays.
#
# RGB COMBO LAYER PICKER:
#   Both the header combo form and each inline combo row have an
#   "Add layer" dropdown (<select>). Selecting a layer adds it as a
#   tag chip (deduped — won't add twice). Tags are removable via the
#   × button on each tag. The underlying data is stored space-separated
#   in a hidden input (header) or directly in the combo object (inline).
#   renderComboLayerTags() renders header tags from the hidden input.
#   Inline tags are rendered directly by renderComboList().
#
# RGB COMBO POSITION LIMIT:
#   The mini-keyboard position picker for RGB combos enforces a maximum
#   of 2 key presses. The COMBO() output formats positions as comma-
#   separated values (e.g. "4, 20") via .replace(/\s+/g, ', ').

# ============================================================
# SECTION 10: .dtsi CODE PARSER (parseUserCode)
# ============================================================
# Ref. Lines 1642-1815 in code
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
#
# HELPER TEMPLATE STRIPPING:
#   Before running the macro/behavior/combo regexes, the parser creates
#   a `codeNoHelpers` copy of the code with all multi-line #define
#   blocks removed. Multi-line #defines are helper templates like
#   `#define MOMENTARY_RGB_MACRO(params...) \` that span multiple lines
#   using `\` continuation characters. Without stripping, the regex
#   would match the template's parameter names (node_name, node_label,
#   etc.) as if they were actual macro/behavior/combo instantiations.
#   Single-line #defines (layers, colors) are NOT stripped — those are
#   parsed from the original `code` variable before stripping happens.

# ============================================================
# SECTION 11: RGB TAB RENDERING (Lists, Dropdowns, UI)
# ============================================================
# Ref. Lines 1816-2150 in code
#
# These functions draw the RGB tab's visual elements.
#
#   rgbRenderAll() (line 1817):
#     Master function that refreshes everything in the RGB tab.
#     Calls renderLayerList, updateHeaderDropdowns, updateRgbOutput,
#     renderLayerTabs (to update keymap tab's layer color dots).
#
#   renderLayerList() (line 1831):
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
#   updateHeaderDropdowns() (line 2020):
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
#   1. MERGE layers (lines 2155-2175):
#      Combines layers that refer to the same thing (by name or index).
#      This prevents duplicate #define lines in the output.
#      Uses two lookup tables: "merged" (by name) and "mergedByIndex" (by index).
#
#   2. SORT by index (lines 2185-2191):
#      After merging, sorts layers by their index number (0, 1, 2, 3...).
#      Layers without an index go to the end.
#      This ensures the output shows #define lines in sequential order.
#
#   3. WRITE LAYER DEFINES (lines 2193-2199):
#      Outputs lines like: #define LAYER_ABC 0
#
#   4. WRITE COLOR DEFINES (lines 2201-2212):
#      Outputs lines like: #define RGB_ABC RGB_COLOR_HSB(19,100,17)
#      Only for layers that have all three H, S, B values set.
#
#   5. WRITE HELPER MACROS (lines ~2230-2270):
#      Outputs BLINK_SEQ, MOMENTARY_RGB_MACRO, and ZMK_MACRO definitions.
#
#   6. WRITE MACRO INVOCATIONS (lines ~2270-2290):
#      Outputs macro entries using the template selected (MOMENTARY, etc).
#
#   7. WRITE COMBOS (lines ~2290-2300):
#      Outputs combo definitions using key positions and bindings.
#
# The final string is placed in the output textarea and also rendered
# with syntax highlighting in the output pane.

# ============================================================
# SECTION 13: SVG KEYBOARD RENDERER
# ============================================================
# Ref. Lines 2302-2427 in code
#
# These functions draw the keyboard picture using SVG (Scalable
# Vector Graphics — a way to draw shapes in HTML).
#
#   loadLayout(layoutObj) (line 2316):
#     Takes a keyboard layout (array of key positions) and stores it.
#     Triggers a re-render of the keyboard SVG.
#
#   renderKeyboardSvg(targetId, options) (line 2329):
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
# Ref. Lines 2428-2532 in code
#
#   bindingToLabels(binding) (line 2429):
#     Converts a binding string like "&kp A" into display labels
#     for the SVG key. Returns { top, bottom, full } where:
#       - top = short behavior name (e.g., "A")
#       - bottom = parameter (e.g., "")
#       - full = complete binding text
#     Handles special cases: &trans shows "▽", &none shows "✕",
#     &mo shows "MO 2", &lt shows "LT 3 SPC", etc.
#
#   simplifyKeycode(kc) (line 2489):
#     Shortens keycode names for display: ESCAPE→ESC, DELETE→DEL, etc.
#
#   simplifyMod(mod) (line 2514):
#     Shortens modifier names: LEFT_CONTROL→LCTL, RIGHT_SHIFT→RSFT, etc.
#
#   getLayerLabel(idx) (line 2525):
#     Returns a display name for a layer index number.
#     Looks at keymapLayers and layers arrays for a matching name.

# ============================================================
# SECTION 15: .keymap FILE PARSER (parseKeymap)
# ============================================================
# Ref. Lines 2533-2843 in code
#
# This is the parser for the Keymap Editor tab. When you paste a
# .keymap file and click "Parse .keymap", this function runs.
#
# What it does:
#   1. Extracts #include lines (line 2563) for output preservation.
#   2. Finds the "keymap {" block (line 2584).
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
#      Both combo and behavior parsing include name-based dedup checks
#      (`.some()`) before pushing to `keymapCombos`/`keymapBehaviors`,
#      preventing duplicates when items already exist from saved cross-tab
#      sync data that was restored before re-parsing.
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
# Ref. Lines 2874-3119 in code
#
#   renderLayerTabs() (line 2885):
#     Draws the layer sidebar on the left side of the Keymap tab.
#     Each layer gets a tab showing its name, index number, and
#     (optionally) a colored dot from the RGB tab.
#     Active (selected) layer is highlighted. Reserved layers are hidden.
#
#   updateLayerHeader() (line 2921):
#     Updates the layer name displayed above the keyboard SVG.
#
#   showLayerContextMenu() (line 2941):
#     Shows a right-click menu with options like "Add Layer Above",
#     "Move Up", "Rename", "Delete", etc.
#
#   handleCtxAction(action) (line 2980):
#     Executes the chosen context menu option. Uses pushUndo()
#     before making changes so you can undo them.

# ============================================================
# SECTION 17: BINDING EDITOR (how you change a key)
# ============================================================
# Ref. Lines 3120-3413 in code
#
# When you click a key on the SVG keyboard, the binding editor opens.
#
#   populateKeycodeGrids() (line 3131):
#     Fills the keycode button grid using ZMK_KEYCODES data.
#     Creates clickable buttons organized by category.
#
#   populateBehaviorDropdown() (line 3151):
#     Fills the behavior dropdown with ZMK_BEHAVIORS entries plus
#     any custom behaviors defined in the keymap.
#
#   showBindingEditor(keyIdx) (line 3209):
#     Opens the editor panel for a specific key. Reads the current
#     binding and fills in the behavior, parameters, and modifiers.
#
#   updateBindingEditorFields(behavior, params) (line 3227):
#     Adjusts the editor UI based on the selected behavior.
#     Different behaviors need different input fields.
#     Example: &kp needs a keycode, &bt needs a BT action, etc.
#
#   applyBinding() (line 3380):
#     Saves the edited binding back to the layer data.
#     Calls pushUndo() first, then updates keymapLayers.
#
#   cancelBindingEditor() (line 3408):
#     Closes the editor without saving.

# ============================================================
# SECTION 18: COMBO, MACRO, BEHAVIOR & BUILT-IN BEHAVIOR EDITORS
# ============================================================
# Ref. Lines 3414-3702 in code
#
# These render and manage the combo, macro, and behavior lists
# in the Keymap Editor tab.
#
#   renderComboMiniKb() (line 3424):
#     Draws a small keyboard picture for selecting combo key positions.
#     You click keys on the mini-keyboard to choose which keys
#     trigger the combo.
#
#   renderKeymapComboList() (line 3451):
#     Displays the list of combos with their names, bindings, and
#     key positions. Includes edit and delete buttons.
#
#   renderKeymapMacroList() (line 3478):
#     Displays the list of macros with names and step previews.
#
#   renderKeymapBehaviorList() (line 4055):
#     Displays custom behaviors with type, name, and config summary.
#     Built-in behaviors (those with `_builtin` flag) are skipped here —
#     they are shown in the Built-in Behaviors toggle section instead.
#
#   renderBuiltinBehaviorToggles() (line 4075):
#     Renders the Built-in Behaviors section — a list of checkbox toggles
#     for preset ZMK behaviors defined in BUILTIN_BEHAVIORS (line 1317).
#     Each toggle shows the behavior name, type, and description.
#     Checkbox state syncs with keymapBehaviors (checked = behavior exists
#     in the array with matching `_builtin` id).
#
#   toggleBuiltinBehavior(presetId, enable) (line 4092):
#     Called when a built-in behavior checkbox changes. When enabled:
#     removes any parsed behavior with the same name (dedup), then adds
#     a deep copy of the preset config to keymapBehaviors with _builtin
#     and _fromEditor flags. When disabled: filters out by _builtin id.
#     Then re-renders toggles, behavior list, dropdown, and output.
#
#   showBehaviorConfig(type) (line 4122):
#     When you select a behavior type (hold-tap, tap-dance, etc),
#     this shows the appropriate configuration fields.
#     Different types need different settings:
#       - hold-tap: tapping-term, flavor, hold/tap bindings, quick-tap,
#         require-prior-idle, hold-trigger-key-positions, retro-tap,
#         hold-while-undecided, hold-trigger-on-release, global-quick-tap
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
# Ref. Lines 3703-4041 in code
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
# Ref. Lines 4542-4930 in code
#
# This is the biggest output function. It generates the complete
# .keymap file text from all the parsed/edited data.
#
# Output order:
#   1. #include lines (preserved from original file)
#   2. #define macros for enabled built-in behaviors (e.g.,
#      `#define AS(keycode) &as LS(keycode) keycode` for autoshift,
#      `#define MO_TOG(layer) &mo_tog layer layer` for mo_tog).
#      Only emitted when the corresponding built-in behavior is toggled on.
#   3. Pre-keymap raw blocks (if the file had custom combos/behaviors
#      outside the keymap block, they're preserved verbatim)
#   4. Custom behavior definitions (generated from keymapBehaviors)
#   5. Combo definitions
#   6. Macro definitions
#   7. The "keymap { compatible = ... }" block with all layers
#   8. Conditional layers
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
# Ref. Lines 4960-5050 in code
#
#   generateBehaviorCode(b) (line 4972):
#     Takes a behavior object ({name, type, label, config}) and
#     generates the devicetree code for it.
#     Each behavior type has a different "compatible" string and
#     different properties. For example:
#       - hold-tap: compatible = "zmk,behavior-hold-tap"
#         properties: tapping-term-ms, flavor, bindings, quick-tap-ms,
#         require-prior-idle-ms, hold-trigger-key-positions, retro-tap,
#         hold-while-undecided, hold-trigger-on-release, global-quick-tap
#       - tap-dance: compatible = "zmk,behavior-tap-dance"
#         properties: tapping-term-ms, bindings
#     This function is called by updateKeymapOutput() (line 4542)
#     when generating the behavior section of the .keymap file.

# ============================================================
# SECTION 22: CROSS-TAB SYNC (how RGB & Keymap tabs talk)
# ============================================================
# Ref. Lines ~4780-4930 in code
#
# The two tabs have separate data, but they need to stay in agreement.
#
#   syncCrossTabData() (line ~4780):
#     Called when switching TO the RGB tab.
#     Goes through every keymapLayer and adds matching entries to
#     the RGB layers[] array (if they don't already exist).
#     Matching is done by: index first, then by name.
#     After syncing, sorts layers by index so they appear in order.
#
#   syncRgbToKeymap() (line ~4853):
#     Called when switching TO the Keymap tab.
#     Syncs ALL RGB data into keymap arrays with _fromRgb flag:
#       - macros[] → keymapMacros (as paramType 0 with empty steps)
#       - blinkMacros[] → keymapMacros (as paramType 0 with empty steps)
#       - behaviors[] → keymapBehaviors (as hold-tap type)
#       - combos[] → keymapCombos (positions converted from string to array)
#       - dtsiNativeBehaviors[] → keymapBehaviors (with _fromDtsi flag)
#     Before syncing, removes any stale _fromRgb items from previous syncs.
#     Purpose: RGB macros/behaviors appear as selectable bindings in the
#     keymap editor's dropdowns and value picker, but are EXCLUDED from
#     the .keymap output (filtered by _fromRgb flag in updateKeymapOutput).
#
# Flags used:
#   _fromRgb  — Marks items synced from RGB tab. Included in UI, excluded from output.
#   _fromDtsi — Marks native dtsi behaviors (hm, ltq, td_numcaps). Excluded from output.
#   _fromKeymap — Marks RGB layers synced from keymap tab.
#   _fromEditor — Marks items added via the keymap editor UI (for raw-blocks path).
#   _builtin  — Marks behaviors added via the Built-in Behaviors toggles. Stores the
#               preset id (e.g., 'hm', 'as', 'td_example'). Used to sync checkboxes,
#               show the '(built-in)' tag in dropdowns, skip in the main behavior list,
#               and emit #define macros in the output.
#
# DEVICETREE MERGE BEHAVIOR (raw-blocks output path):
#   When keymapParsedRawBlocks is set (user parsed a .keymap), the output
#   first copies the raw blocks, then MERGES any _fromEditor items into
#   existing combos/behaviors/macros sections within those raw blocks.
#   The merge uses regex to find the section closing `\n    };` (newline + 4-space
#   indent) and inserts the new items just before it. The newline anchor is
#   critical — without it, `    };` would match as a substring within deeper-
#   indented `        };` (8-space inner block closings), causing insertions
#   at the wrong position.
#   If no matching section exists in the raw blocks, a new `/ { ... };`
#   block is appended instead.
#
# SNAPSHOT PRESERVATION:
#   snapshotState() and restoreState() preserve _fromEditor, slowRelease,
#   and requirePriorIdle on combos, and _fromEditor and _builtin on
#   macros and behaviors, so undo/redo operations don't lose flags.
#
# Layer Index Matching:
#   The keymap parser assigns indices 0, 1, 2, 3... to layers in
#   the order they appear in the file. The sync function uses these
#   indices so RGB layer "LAYER_ABC" at index 0 matches keymap
#   layer "abc_0" which is also parsed as index 0.
#
# After syncing, layers are sorted by index number so the RGB editor
# shows them in the same order as the keymap (0, 1, 2, 3...).
# See also: Section 26 (line 750 in this doc).

# ============================================================
# SECTION 23: VALUE PICKER (floating search widget)
# ============================================================
# Ref. Lines 4647-4888 in code
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
#   This is wired in the DOMContentLoaded block (line 4949).

# ============================================================
# SECTION 24: TAB SWITCHING & DARK MODE
# ============================================================
# Ref. Lines 4889-4940 in code
#
#   switchTab(tabId) (line 4897):
#     Switches between the RGB Generator and Keymap Editor tabs.
#     Hides one tab panel, shows the other.
#     When switching to Keymap: calls syncRgbToKeymap().
#     When switching to RGB: calls syncCrossTabData() and rgbRenderAll().
#
#   toggleDarkMode() (line 4923):
#     Switches between light and dark color themes.
#     Sets the "data-theme" attribute on the <html> element.
#     The CSS uses this attribute to apply different colors.
#
#   loadTheme() (line 4931):
#     Checks localStorage for a saved theme preference.
#     localStorage is like a tiny file that the browser remembers.

# ============================================================
# SECTION 25: DOMContentLoaded (wiring everything up)
# ============================================================
# Ref. Lines 4941-6343 in code
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
#   - Tab buttons (lines 4952-4956)
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
#   1. syncCrossTabData() — Ref. Line 4509 in code
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

# ============================================================
# SECTION 27: MACRO PARAM CONTROLS (context-aware editing)
# ============================================================
# Ref. Lines ~3550-3760 in code
#
# When editing macro steps, each step has a behavior (like &kp, &mo,
# &lt) and parameters. The editor provides context-aware controls
# based on which behavior is selected.
#
#   renderParamControl(stepIdx, paramNum, paramType, value, behavior):
#     Generates the right HTML input for a macro step parameter.
#     Returns different controls depending on the behavior:
#       - &to, &mo, &tog, &sl → layer dropdown from keymapLayers
#       - &lt → layer dropdown (param1) + keycode input with search (param2)
#       - &kp, &sk, &kt → keycode input with search button
#       - &bt → BT_ACTIONS dropdown (BT_CLR, BT_SEL, etc.)
#       - &out → OUT_ACTIONS dropdown (OUT_TOG, OUT_USB, OUT_BLE)
#       - &mmv, &msc → direction dropdown (MOVE_UP, SCROLL_DOWN, etc.)
#       - &mkp → mouse button dropdown (LCLK, RCLK, MCLK)
#       - Unknown behaviors → generic text input with search fallback
#
#   updateMacroBindingStep(stepIdx):
#     Reads param1 and param2 values from the DOM inputs and saves
#     them back into the macro step. Uses data attributes:
#       data-step-param1, data-step-param2 (text inputs)
#       data-step-pick1, data-step-pick2 (search buttons)
#
#   openMacroKcSearch(stepIdx, anchorEl, targetAttr):
#     Opens the value picker for keycode searching. The targetAttr
#     parameter specifies which input to write the result into
#     (data-step-param1 or data-step-param2).
#
# When the behavior dropdown changes, the step is re-rendered with
# smart defaults appropriate for the new behavior.

# ============================================================
# SECTION 28: COMMENT PRESERVATION (.dtsi round-trip)
# ============================================================
# Ref. Lines ~1665-1740 (parser) and ~2218-2300 (output) in code
#
# When you paste a .dtsi file and the tool regenerates it, comments
# from the original code are now preserved:
#
# COLOR INLINE COMMENTS:
#   Lines like: #define RGB_ABC RGB_COLOR_HSB(19,100,17) /* BASE - Dim Yellow */
#   The regex captures two comment groups:
#     m[5] = /* block comment */ content
#     m[6] = // line comment content
#   These are stored in colorLabelMap[colorName] and displayed in the
#   "Lbl" field in the layer list. In the output, they appear as
#   inline /* comments */ after each color #define line.
#
#   IMPORTANT: The colorRe regex uses [^\S\n]* (horizontal whitespace
#   only) after the closing paren, NOT \s*. Using \s* would match
#   newlines and cause the regex to "hop" to the next line, capturing
#   section header comments (like /* ---- HELPER DEFINITIONS ---- */)
#   as color labels. This was a bug that was fixed.
#
# MACRO SECTION COMMENTS:
#   Comments like "// Momentary Layers" or "/* Toggled macros */" that
#   appear before macro calls in the macros{} block are parsed, stored
#   on each macro object as a .comment property, and emitted before the
#   macro in the generated output.
#   Parsing: scans the macros{} block line by line, accumulating comment
#   lines and associating them with the next macro call found.
#
# MACRO LABELS:
#   The second argument of macro calls (e.g., "GameLayer LED Macro" in
#   TO_RGB_MACRO(game_led, "GameLayer LED Macro", ...)) is now stored
#   as macro.label and used in the output instead of defaulting to the
#   node name. This preserves the user's descriptive labels.

# ============================================================
# SECTION 29: CLEAR LAYER FEATURE
# ============================================================
# Ref. Lines ~2960-2990 (context menu) and ~3020-3040 (handler) in code
#
# The layer context menu (right-click a layer tab) now includes two
# "Clear Layer" options:
#
#   "Clear Layer → &trans":
#     Sets ALL key bindings in the active layer to &trans.
#     &trans means "transparent" — the keypress passes through to
#     the layer below. Useful when creating overlay layers.
#
#   "Clear Layer → &none":
#     Sets ALL key bindings in the active layer to &none.
#     &none means "do nothing" — the key is completely disabled.
#     Useful for blocking keys on specific layers.
#
# Both options show a confirmation dialog before executing.
# The action calls pushUndo() first so it can be undone with Ctrl+Z.
