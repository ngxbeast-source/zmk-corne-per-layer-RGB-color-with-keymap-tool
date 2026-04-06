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
#       "Ref. Line 1378 in code"
#   - That means the actual code is on that line in RGB_Code_Helper.html.
#
# Lines referenced here match the file after the latest update.
# If the code file is updated, these references should be updated too.

# ============================================================
# TABLE OF CONTENTS
# ============================================================
# Line   58   — Section 1:  What This Tool Does (Overview)
# Line   83   — Section 2:  File Structure (HTML, CSS, JS)
# Line  115  — Section 3:  Global Data Model (the "memory" of the tool)
# Line  162  — Section 4:  Undo/Redo System
# Line  197  — Section 5:  Default Keyboard Layouts
# Line  222  — Section 6:  ZMK Keycodes & Behavior Reference Tables
# Line  255  — Section 7:  Color Utilities (HSB, Hex, RGB)
# Line  284  — Section 8:  HSB Color Picker
# Line  310  — Section 9:  RGB Tab Helper Functions
# Line  359  — Section 10: .dtsi Code Parser (parseUserCode)
# Line  418  — Section 11: RGB Tab Rendering (Lists, Dropdowns, UI)
# Line  446  — Section 12: RGB Output Generation (updateRgbOutput)
# Line  491  — Section 13: SVG Keyboard Renderer
# Line  524  — Section 14: Binding Labels (how keys show text)
# Line  548  — Section 15: .keymap File Parser (parseKeymap)
# Line  583  — Section 16: Layer Tabs & Management
# Line  605  — Section 17: Binding Editor (how you change a key)
# Line  636  — Section 18: Combo, Macro, Behavior & Built-in Behavior Editors
# Line  690  — Section 19: Quick-Assign System
# Line  714  — Section 20: Keymap Output Generation (updateKeymapOutput)
# Line  750  — Section 21: Behavior Code Generation
# Line  778  — Section 22: Cross-Tab Sync (how RGB & Keymap tabs talk)
# Line  868  — Section 23: Value Picker (floating search widget)
# Line  889  — Section 24: Tab Switching & Dark Mode
# Line  909  — Section 25: DOMContentLoaded (wiring everything up)
# Line  957  — Section 26: Layer Ordering (how layers stay in sequence)
# Line  996  — Section 27: Macro Param Controls (context-aware editing)
# Line 1031 — Section 28: Comment Preservation (.dtsi round-trip)
# Line 1068 — Section 29: Clear Layer Feature
# Line 1089 — Section 30: Popup Editor Overlays (Combo & Behavior)
# Line 1125 — Section 31: RGB Output Structure (/ { ... }; wrapper)
# Line 1154 — Section 32: Layout Switch & JSON Import #include Update
# Line 1169 — Section 33: Keymap Editor Popup Overlays
# Line 1349 — Section 34: Binding Picker Popup (visual binding chooser)

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
# Ref. Lines 1-9178 in code
#
# The file has three main parts:
#
#   1. CSS Styles (lines 7-485):
#      These control how everything looks: colors, spacing, fonts,
#      button styles, dark mode, etc. The tool uses CSS custom
#      properties (variables like --bg, --fg) for dark/light theme.
#      The html and body elements have height:100% and overflow:hidden
#      to prevent document-level scrolling from bleeding between tabs;
#      each tab panel scrolls independently within its own container.
#
#   2. HTML Body (lines 486-1367):
#      The page layout. All the buttons, text fields, dropdowns,
#      and hidden panels (like the binding editor, overlays, etc.)
#      are defined here as HTML elements. Each element has an "id"
#      so the JavaScript can find and control it.
#
#   3. JavaScript (lines 1369-9176):
#      This is where all the logic lives. It starts with data
#      variables (line 1378), then functions for parsing, rendering,
#      and generating code, and ends with event wiring at line 7304
#      inside a DOMContentLoaded block.
#
# Think of it like a building:
#   - CSS is the paint and decorations (how it looks)
#   - HTML is the rooms and furniture (what's on the page)
#   - JavaScript is the electricity and plumbing (how it works)

# ============================================================
# SECTION 3: GLOBAL DATA MODEL (the "memory" of the tool)
# ============================================================
# Ref. Lines 1376-1418 in code
#
# The tool stores everything in JavaScript arrays and variables.
# Think of each array as a "notebook" that holds a list of items.
#
# --- RGB Tab Data (used by the RGB Generator tab) ---
#
#   layers        (line 1378) — List of layers with names, index numbers,
#                               and HSB color values. Example entry:
#                               { name: "L_ABC", index: "0", h: "19",
#                                 s: "100", b: "17", label: "ABC" }
#
#   macros        (line 1379) — RGB macros (like MO_RGB, TO_RGB).
#   behaviors     (line 1380) — RGB tab behavior list.
#   combos        (line 1381) — RGB tab combo definitions.
#   blinkMacros   (line 1382) — Blink macros (LED blink sequences).
#   colorValueMap (line 1384) — A lookup table: color name → HSB values.
#   colorLabelMap (line 1385) — A lookup table: color name → display label.
#
# --- Keymap Tab Data (used by the Keymap Editor tab) ---
#
#   keymapLayers            (line 1390) — Parsed keymap layers. Each has:
#                                         { name, displayName, bindings[], status }
#   keymapCombos            (line 1391) — Parsed combos from .keymap file.
#   keymapMacros            (line 1392) — Parsed macros from .keymap file.
#   keymapBehaviors         (line 1393) — Custom behaviors (hold-tap, etc).
#   keymapConditionalLayers (line 1394) — Conditional layer rules.
#   keymapSensorBindings    (line 1395) — Encoder rotation bindings per layer.
#   keyboardLayout          (line 1396) — Physical key positions (from JSON).
#
# --- State Variables ---
#
#   activeLayerIndex        (line 1400) — Which layer tab is selected right now.
#   selectedKeyIndex        (line 1401) — Which key is being edited (-1 = none).
#   editingComboIndex       (line 1402) — Which combo is being edited (-1 = none).
#   editingMacroIndex       (line 1403) — Which macro is being edited (-1 = none).
#   editingBehaviorIndex    (line 1404) — Which behavior is being edited (-1 = none).
#
# WHY TWO SETS OF DATA?
#   The RGB tab and Keymap tab each have their own data because they
#   parse different file formats (.dtsi vs .keymap). The "sync" functions
#   (syncCrossTabData and syncRgbToKeymap) copy data between them.
#   More on syncing: see Section 22 (line 747 in this doc).

# ============================================================
# SECTION 4: UNDO/REDO SYSTEM
# ============================================================
# Ref. Lines 1422-1605 in code
#
# The undo system works like a camera taking snapshots:
#
#   snapshotState() (line 1424) — Takes a "photo" of ALL data:
#     keymapLayers, keymapCombos, keymapMacros, keymapBehaviors,
#     keymapConditionalLayers, keymapSensorBindings, and activeLayerIndex.
#     It uses JSON.parse(JSON.stringify(...)) to make a deep copy.
#     A "deep copy" means it copies everything inside the arrays too,
#     not just the array references. This way, changing the original data
#     later won't affect the snapshot.
#
#   restoreState(snap) (line 1451) — Loads a snapshot back.
#     Replaces all data arrays with the saved copies.
#
#   pushUndo() (line 1478) — Saves current state BEFORE a change.
#     Every time you edit something (add a layer, change a key, etc),
#     the code calls pushUndo() first. This saves the "before" state
#     so you can undo back to it. Keeps up to 50 entries (UNDO_LIMIT).
#
#   performUndo() (line 1512) — Goes back one step.
#     Moves current state to the redo stack, loads previous state.
#
#   performRedo() (line 1518) — Goes forward one step.
#     Moves current state to undo stack, loads the redo state.
#
#   fullRender() (line 1487) — Refreshes the entire UI after undo/redo.
#     Without this, the screen would show old data.
#
# The keyboard shortcuts Ctrl+Z (undo) and Ctrl+Y (redo) trigger
# these functions. See the DOMContentLoaded section (line 7304).

# ============================================================
# SECTION 5: DEFAULT KEYBOARD LAYOUTS
# ============================================================
# Ref. Lines 1606-1684 in code
#
# A "layout" describes the physical positions and sizes of every key
# on the keyboard. The tool uses this to draw the SVG keyboard picture.
#
# DEFAULT_CORNE_LAYOUT (line 1606):
#   42 keys arranged in a split ergonomic layout.
#   Each key has: x (horizontal position), y (vertical position),
#   row, col (row/column indices for output formatting),
#   and optionally r (rotation angle) and rx/ry (rotation center).
#
# DEFAULT_LOTUS58_LAYOUT (line 1639):
#   A larger 60-key layout with built-in encoders.
#
# These defaults are used when no custom layout JSON is imported.
# The function loadLayout() (line 3432) applies the layout to
# the SVG renderer. See Section 13 (line 487 in this doc).
#
# Custom layouts (.json files from any keyboard) can be pasted via
# the "Load Layout JSON" button. loadLayout() accepts any key name
# inside the "layouts" object and infers row/col if missing.

# ============================================================
# SECTION 6: ZMK KEYCODES & BEHAVIOR REFERENCE TABLES
# ============================================================
# Ref. Lines 1685-1781 in code
#
# ZMK_KEYCODES (line 1687):
#   A big lookup table of every key the keyboard can send.
#   Organized by category: Letters, Numbers, Punctuation, Modifiers,
#   Navigation, Function keys, Keypad, Media, etc.
#   Each entry has a display name (what you see on the button)
#   and the ZMK code (what goes in the .keymap file).
#
# ZMK_BEHAVIORS (line 1706):
#   A list of all built-in ZMK behaviors like &kp (key press),
#   &mo (momentary layer), &bt (bluetooth), &rgb_ug (RGB controls).
#   Each entry says how many parameters it takes.
#   Used by the binding editor dropdown (see Section 17, line 593).
#
# BT_ACTIONS, RGB_ACTIONS, OUT_ACTIONS, BL_ACTIONS, EP_ACTIONS (line 1743):
#   Sub-lists of specific actions for behaviors that have sub-commands.
#   Example: BT_ACTIONS has BT_CLR, BT_SEL, BT_NXT, etc.
#
# MOUSE_BUTTONS, MOUSE_MOVES, MOUSE_SCROLLS (line 1748):
#   Mouse emulation keycodes for &mkp, &mmv, and &msc behaviors.
#
# PARAM_DESCS (line 1752):
#   A lookup object mapping parameter value names (e.g. "BT_CLR",
#   "RGB_TOG", "EP_ON") to human-readable descriptions shown as
#   hover tooltips on dropdown options in the binding editor.
#   Contains 55 entries across BT, RGB, OUT, BL, EP, and Mouse actions.
#   Used by updateBindingEditorFields(), renderParamControl(), and
#   vpBuildChoices() to add title attributes to <option> elements.

# ============================================================
# SECTION 7: COLOR UTILITIES (HSB, Hex, RGB)
# ============================================================
# Ref. Lines 1854-1897 in code
#
# These small functions convert colors between different formats.
# Keyboards use HSB (Hue, Saturation, Brightness) for LED colors.
# Web browsers use Hex (#FF0000) or RGB for display.
#
#   hsbToHex(h, s, b) (line 1856):
#     Converts HSB values to a hex color string like "#FF3300".
#     Used to show color swatches in the layer list.
#     h = 0-360 (color wheel position), s = 0-100, b = 0-100.
#
#   hasHsbVal(v) (line 1884):
#     Checks if a value is a valid HSB number (not empty, not undefined).
#     Returns true for 0 (which is a valid color value).
#     This is important because in JavaScript, 0 is "falsy" —
#     a simple `if (v)` check would wrongly treat 0 as empty.
#
#   baseKey(name) (line 1885):
#     Strips "L_" or "RGB_" prefix from a layer name and
#     converts to uppercase. Example: "L_ABC" → "ABC".
#     Used for matching layers between RGB and Keymap tabs.
#
#   esc(str) (line 1886):
#     Escapes HTML characters to prevent injection.
#     Converts < > & " ' into safe HTML entities.

# ============================================================
# SECTION 8: HSB COLOR PICKER
# ============================================================
# Ref. Lines 1898-2090 in code
#
# This is the floating color picker popup that appears when you
# click a color swatch in the layer list.
#
# It's "lazy loaded" — the HTML elements for the picker are only
# created the first time you open it (ensureHsbPicker, line 1900).
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
# Ref. Lines 2091-2263 in code
#
# Small functions used by other parts of the RGB tab.
#
#   layerOptionsHTML(selected) (line 2093):
#     Builds the <option> tags for a layer dropdown menu.
#     Sorts layers by index so they appear in sequential order
#     (0, 1, 2, ...). The "selected" parameter pre-selects one.
#
#   colorOptionsHTML(selected) (line 2106):
#     Builds <option> tags for a color dropdown (only layers
#     that have HSB values assigned).
#
#   macroRefOptionsHTML(selected) (line 2131):
#     Builds <option> tags for a macro reference dropdown.
#
#   updateHeaderDropdowns() (line 2944):
#     Refreshes all dropdown menus in the RGB macro and combo editors
#     with the latest layer and color lists.
#     Also populates the combo layer picker dropdown (comboLayerPicker).
#
#   addLayer(), addMacro(), addBehavior(), addCombo(), addBlinkMacro():
#     Functions that append new empty items to the data arrays.
#
#   autoPrefix(name, type):
#     Returns the macro node name with an appropriate prefix based on type:
#       TO_RGB → 'to_' + name   (e.g., to_game_led)
#       TO_RGB_PRESS → 'top_' + name   (e.g., top_toglayers_leds)
#       Others → name unchanged
#     Called by addMacro() and the edit-save handler to match dtsi naming
#     conventions.
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
#   of 2 key presses. The C() output formats positions as comma-
#   separated values (e.g. "4, 20") via .replace(/\s+/g, ', ').

# ============================================================
# SECTION 10: .dtsi CODE PARSER (parseUserCode)
# ============================================================
# Ref. Lines 2266-2630 in code
#
# This is the parser for the RGB Generator tab. When you paste
# .dtsi code and click "Parse Imported Code", this function runs.
#
# What it does:
#   1. Reads the text from the import textarea.
#   2. Uses regular expressions (regex) to find patterns in the text:
#      - #define L_xxx N       → creates a layer with index N
#      - #define RGB_xxx RGB_COLOR_HSB(h,s,b) → creates a color
#      - ZMK_MACRO(...) blocks    → parses macros
#      - BLINK_SEQ macros         → parses blink macros
#      - Native ZMK behaviors     → parses hold-tap, tap-dance, etc.
#   3. Fills the layers[], macros[], behaviors[], combos[], and
#      blinkMacros[] arrays with parsed data.
#   4. Syncs RGB layer names → keymap layer names (if keymap layers exist).
#      See Section 22 for details on this sync-on-parse behavior.
#   5. Calls rgbRenderAll() to refresh the UI.
#
# REGEX (Regular Expressions):
#   These are patterns that find text. For example:
#   /#define\s+([A-Za-z0-9_]+)\s+(\d+)/ finds lines like "#define ABC 0"
#   The \s+ means "one or more spaces", \S+ means "one or more non-spaces",
#   and \d+ means "one or more digits". The parentheses capture the matched
#   parts so you can use them (layer name and index number).
#
#   LAYER PARSING — Two-pass approach:
#     Primary regex: /^#define\s+(L_[A-Za-z0-9_]+)\s+(\d+)$/gm
#       Matches layers WITH L_ prefix (e.g., #define L_ABC 0).
#       Color lookup tries: RGB_ + stripped name, stripped name, full name.
#     Fallback regex: /^#define\s+([A-Za-z0-9_]+)\s+(\d+)$/gm
#       Matches ANY #define number pattern (e.g., #define ABC 0).
#       Color lookup tries: RGB_ + name, then name itself.
#       This way, layer "ABC" correctly finds color "RGB_ABC".
#
#   MACRO PARSING — Supported types:
#     MO_RGB(name, "label", layer, activeColor, releaseColor)
#     TO_RGB(name, "label", layer, color)
#     TO_RGB_PRESS(name, "label", layer, color)
#     MO_BLINK(name, "label", layer, blinkColor, returnColor, wait)
#   Regex: /(TO_RGB_PRESS|TO_RGB|MO_BLINK|MO_RGB)\(([^)]+)\)/g
#   MO_BLINK is experimental — extracts blinkColor, returnColor, wait fields.
#
#   More on regex: see any JavaScript regex tutorial.
#
# HELPER TEMPLATE STRIPPING:
#   Before running the macro/behavior/combo regexes, the parser creates
#   a `codeNoHelpers` copy of the code with all multi-line #define
#   blocks removed. Multi-line #defines are helper templates like
#   `#define MO_RGB(params...) \` that span multiple lines
#   using `\` continuation characters. Without stripping, the regex
#   would match the template's parameter names (node_name, node_label,
#   etc.) as if they were actual macro/behavior/combo instantiations.
#   Single-line #defines (layers, colors) are NOT stripped — those are
#   parsed from the original `code` variable before stripping happens.

# ============================================================
# SECTION 11: RGB TAB RENDERING (Lists, Dropdowns, UI)
# ============================================================
# Ref. Lines 2631-3155 in code
#
# These functions draw the RGB tab's visual elements.
#
#   rgbRenderAll() (line 2631):
#     Master function that refreshes everything in the RGB tab.
#     Calls renderLayerList, updateHeaderDropdowns, updateRgbOutput,
#     renderLayerTabs (to update keymap tab's layer color dots).
#
#   renderLayerList() (line 2645):
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
#   updateHeaderDropdowns() (line 2944):
#     Fills the macro's Layer and Color dropdown menus.
#     Uses layerOptionsHTML() and colorOptionsHTML() to build options.

# ============================================================
# SECTION 12: RGB OUTPUT GENERATION (updateRgbOutput)
# ============================================================
# Ref. Lines 3156-3412 in code
#
# This is the function that generates the .dtsi output text shown
# in the "Generated Output" pane of the RGB tab.
#
# How it works step by step:
#
#   1. MERGE layers (lines 3114-3134):
#      Combines layers that refer to the same thing (by name or index).
#      This prevents duplicate #define lines in the output.
#      Uses two lookup tables: "merged" (by name) and "mergedByIndex" (by index).
#
#   2. SORT by index (lines 3144-3150):
#      After merging, sorts layers by their index number (0, 1, 2, 3...).
#      Layers without an index go to the end.
#      This ensures the output shows #define lines in sequential order.
#
#   3. WRITE LAYER DEFINES (lines 3152-3158):
#      Outputs lines like: #define ABC 0
#      Uses the layer's original parsed name directly (no prefix added).
#      If a layer was parsed with L_ prefix, it keeps L_. If not, it
#      outputs the bare name (e.g., ABC, NMRW, FKEYS).
#
#   4. WRITE COLOR DEFINES (lines 3160-3171):
#      Outputs lines like: #define RGB_ABC RGB_COLOR_HSB(19,100,17)
#      Only for layers that have all three H, S, B values set.
#
#   5. WRITE HELPER MACROS (lines ~2961-3001):
#      Outputs BLINK_SEQ, MO_RGB, TO_RGB, TO_RGB_PRESS, RGB_HT,
#      MO_BLINK (conditional — only if MO_BLINK macros exist), and C
#      helper definitions.
#
#   6. WRITE MACRO INVOCATIONS (lines ~3001-3021):
#      Outputs macro entries using the helper templates. MO_BLINK macros
#      output as: MO_BLINK(name, "label", layer, blinkColor, returnColor, wait)
#
#   7. WRITE COMBOS (lines ~3021-3031):
#      Outputs combo definitions using key positions and bindings.
#
# The final string is placed in the output textarea and also rendered
# with syntax highlighting in the output pane.

# ============================================================
# SECTION 13: SVG KEYBOARD RENDERER
# ============================================================
# Ref. Lines 3432-3594 in code
#
# These functions draw the keyboard picture using SVG (Scalable
# Vector Graphics — a way to draw shapes in HTML).
#
#   loadLayout(layoutObj) (line 3432):
#     Takes a keyboard layout JSON and extracts the key position array.
#     Accepts three formats:
#       1. { layouts: { "<name>": { layout: [...] } } } — standard .json
#       2. { layout: [...] } — direct layout wrapper
#       3. [...] — flat array of key positions
#     If keys don't have row/col fields (common in community .json files
#     like Sofle, reviung41, etc.), they are inferred from x/y positions:
#     a new row starts when x drops by more than 2 from the previous key.
#     The keyboard name from the layout key (e.g. "Sofle") is stored in
#     currentLayoutId (line 1397) for use in #include "-rgb.dtsi" output.
#
#   renderKeyboardSvg(targetId, options) (line 3495):
#     The main drawing function. For each key in the layout:
#       - Calculates the position (x, y) and size
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
# Ref. Lines 3595-3712 in code
#
#   bindingToLabels(binding) (line 3595):
#     Converts a binding string like "&kp A" into display labels
#     for the SVG key. Returns { top, bottom, full } where:
#       - top = short behavior name (e.g., "A")
#       - bottom = parameter (e.g., "")
#       - full = complete binding text
#     Handles special cases: &trans shows "▽", &none shows "✕",
#     &mo shows "MO 2", &lt shows "LT 3 SPC", etc.
#
#   simplifyKeycode(kc) (line 3655):
#     Shortens keycode names for display: ESCAPE→ESC, DELETE→DEL, etc.
#
#   simplifyMod(mod) (line 3680):
#     Shortens modifier names: LEFT_CONTROL→LCTL, RIGHT_SHIFT→RSFT, etc.
#
#   getLayerLabel(idx) (line 3691):
#     Returns a display name for a layer index number.
#     Looks at keymapLayers and layers arrays for a matching name.

# ============================================================
# SECTION 15: .keymap FILE PARSER (parseKeymap)
# ============================================================
# Ref. Lines 3645-3993 in code
#
# This is the parser for the Keymap Editor tab. When you paste a
# .keymap file and click "Parse .keymap", this function runs.
#
# What it does:
#   1. Extracts #include lines (line 3671) for output preservation.
#   2. Finds the "keymap {" block (line 3681).
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
# Ref. Lines 3994-4313 in code
#
#   renderLayerTabs() (line 3994):
#     Draws the layer sidebar on the left side of the Keymap tab.
#     Each layer gets a tab showing its name, index number, and
#     (optionally) a colored dot from the RGB tab.
#     Active (selected) layer is highlighted. Reserved layers are hidden.
#
#   updateLayerHeader() (line 4030):
#     Updates the layer name displayed above the keyboard SVG.
#
#   showLayerContextMenu() (line 4060):
#     Shows a right-click menu with options like "Add Layer Above",
#     "Move Up", "Rename", "Delete", etc.
#
#   handleCtxAction(action) (line 4100):
#     Executes the chosen context menu option. Uses pushUndo()
#     before making changes so you can undo them.

# ============================================================
# SECTION 17: BINDING EDITOR (how you change a key)
# ============================================================
# Ref. Lines 4314-4836 in code
#
# When you click a key on the SVG keyboard, the binding editor opens.
#
#   populateKeycodeGrids() (line 4314):
#     Fills the keycode button grid using ZMK_KEYCODES data.
#     Creates clickable buttons organized by category.
#
#   populateBehaviorDropdown() (line 4335):
#     Fills the behavior dropdown with ZMK_BEHAVIORS entries plus
#     any custom behaviors defined in the keymap.
#
#   showBindingEditor(keyIdx) (line 4506):
#     Opens the editor panel for a specific key. Reads the current
#     binding and fills in the behavior, parameters, and modifiers.
#
#   updateBindingEditorFields(behavior, params) (line 4534):
#     Adjusts the editor UI based on the selected behavior.
#     Different behaviors need different input fields.
#     Example: &kp needs a keycode, &bt needs a BT action, etc.
#
#   applyBinding() (line 4774):
#     Saves the edited binding back to the layer data.
#     Calls pushUndo() first, then updates keymapLayers.
#
#   cancelBindingEditor() (line 4821):
#     Closes the editor without saving.

# ============================================================
# SECTION 18: COMBO, MACRO, BEHAVIOR & BUILT-IN BEHAVIOR EDITORS
# ============================================================
# Ref. Lines 4837-5979 in code
#
# These render and manage the combo, macro, and behavior lists
# in the Keymap Editor tab.
#
#   renderComboMiniKb() (line 4837):
#     Draws a small keyboard picture for selecting combo key positions.
#     You click keys on the mini-keyboard to choose which keys
#     trigger the combo.
#
#   renderKeymapComboList() (line 4874):
#     Displays the list of combos with their names, bindings, and
#     key positions. Includes edit and delete buttons.
#
#   renderKeymapMacroList() (line 4902):
#     Displays the list of macros with names and step previews.
#
#   renderKeymapBehaviorList() (line 5329):
#     Displays custom behaviors with type, name, and config summary.
#     Built-in behaviors (those with `_builtin` flag) are skipped here —
#     they are shown in the Built-in Behaviors toggle section instead.
#
#   renderBuiltinBehaviorToggles() (line 5349):
#     Renders the Built-in Behaviors section — a list of checkbox toggles
#     for preset ZMK behaviors defined in BUILTIN_BEHAVIORS (line 1784).
#     Each toggle shows the behavior name, type, and description.
#     Checkbox state syncs with keymapBehaviors (checked = behavior exists
#     in the array with matching `_builtin` id).
#
#   toggleBuiltinBehavior(presetId, enable) (line 5366):
#     Called when a built-in behavior checkbox changes. When enabled:
#     removes any parsed behavior with the same name (dedup), then adds
#     a deep copy of the preset config to keymapBehaviors with _builtin
#     and _fromEditor flags. When disabled: filters out by _builtin id.
#     Then re-renders toggles, behavior list, dropdown, and output.
#
#   showBehaviorConfig(type) (line 5825):
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
# Ref. Lines 6051-6428 in code
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
#
# renderQaMiniKeyboard() (line 6195) draws a compact mini version
# of the keyboard inside the Quick Assign panel. It uses x/y physical
# positions from keyboardLayout (same as renderKeyboardSvg, line 3495)
# so the shape matches the actual keyboard layout (split gap, thumb
# key rotation, etc.). Scale is 28px per unit (vs 56 in the main SVG).

# ============================================================
# SECTION 20: KEYMAP OUTPUT GENERATION (updateKeymapOutput)
# ============================================================
# Ref. Lines 6429-6919 in code
#
# This is the biggest output function. It generates the complete
# .keymap file text from all the parsed/edited data.
#
# Output order:
#   1. #include lines (preserved from original file, or generated defaults).
#      The RGB dtsi #include uses currentLayoutId dynamically:
#      `#include "<currentLayoutId>-rgb.dtsi"` — e.g. "corne-rgb.dtsi",
#      "sofle-rgb.dtsi", "reviung41-rgb.dtsi", depending on which layout
#      JSON was loaded. This name is set by loadLayout() (line 3434).
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
# Ref. Lines 6849-6976 in code
#
#   getKeyPositionsForSide(side) (line 6849):
#     Returns a space-separated string of key indices for the 'left'
#     or 'right' side of a split keyboard. Uses the same split detection
#     as updateKeymapOutput(): finds the largest x-position gap to
#     determine where left ends and right begins. Called by
#     generateBehaviorCode() to auto-fill hold-trigger-key-positions.
#
#   generateBehaviorCode(b) (line 6885):
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
#     For hml/hmr built-in behaviors, hold-trigger-key-positions are
#     auto-generated: hml gets right-side keys, hmr gets left-side keys.
#     This function is called by updateKeymapOutput() (line 6394)
#     when generating the behavior section of the .keymap file.

# ============================================================
# SECTION 22: CROSS-TAB SYNC (how RGB & Keymap tabs talk)
# ============================================================
# Ref. Lines ~6977-7139 in code
#
# The two tabs have separate data, but they need to stay in agreement.
#
#   syncCrossTabData() (line 6977):
#     Called when switching TO the RGB tab.
#     Goes through every keymapLayer and adds matching entries to
#     the RGB layers[] array (if they don't already exist).
#     Matching is done by: index first, then by name.
#     After syncing, sorts layers by index so they appear in order.
#
#   syncRgbToKeymap() (line 6911):
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
#   indices so RGB layer "L_ABC" at index 0 matches keymap
#   layer "abc_0" which is also parsed as index 0.
#
# LAYER NAME SYNC ON PARSE (deliberate user action):
#   Unlike the automatic tab-switch sync above, layer NAME synchronization
#   only happens when the user explicitly parses code:
#
#   RGB "Parse & Reflect" (in parseUserCode, ~line 2545):
#     After the .dtsi is parsed, if keymapLayers already exist, the code
#     walks all parsed RGB layers by index. For each:
#       - If a keymap layer exists at that index → its displayName and
#         node name are overwritten with the RGB layer's base name.
#         Example: RGB "L_GAME" at index 0 → keymapLayers[0].displayName
#         becomes "GAME", keymapLayers[0].name becomes "game_0".
#       - If the index is BEYOND keymapLayers.length → a new empty keymap
#         layer is created (with &trans bindings) using the RGB layer's name.
#         This supports "color templates" — RGB definitions that pre-define
#         more layers than the current keymap has.
#     Status message shows sync + new layer counts.
#
#   Keymap "Parse Keymap" (in kmParseBtn handler, ~line 7612):
#     After the .keymap is parsed, if RGB layers already exist, the code
#     walks all keymap layers by index. For each matching RGB layer:
#       - The RGB layer's name is overwritten using the keymap layer's
#         displayName (uppercased). The existing prefix is preserved:
#         L_OLD → L_NEW, LAYER_OLD → LAYER_NEW, OLD → NEW.
#     If any names were synced, rgbRenderAll() refreshes the RGB tab.
#     Status message appends sync count.
#
# After syncing, layers are sorted by index number so the RGB editor
# shows them in the same order as the keymap (0, 1, 2, 3...).
# See also: Section 26 (line 926 in this doc).

# ============================================================
# SECTION 23: VALUE PICKER (floating search widget)
# ============================================================
# Ref. Lines 7126-7251 in code
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
#   This is wired in the DOMContentLoaded block (line 7304).

# ============================================================
# SECTION 24: TAB SWITCHING & DARK MODE
# ============================================================
# Ref. Lines 7252-7303 in code
#
#   switchTab(tabId) (line 7252):
#     Switches between the RGB Generator and Keymap Editor tabs.
#     Hides one tab panel, shows the other.
#     When switching to Keymap: calls syncRgbToKeymap().
#     When switching to RGB: calls syncCrossTabData() and rgbRenderAll().
#
#   toggleDarkMode() (line 7278):
#     Switches between light and dark color themes.
#     Sets the "data-theme" attribute on the <html> element.
#     The CSS uses this attribute to apply different colors.
#
#   loadTheme() (line 7286):
#     Checks localStorage for a saved theme preference.
#     localStorage is like a tiny file that the browser remembers.

# ============================================================
# SECTION 25: DOMContentLoaded (wiring everything up)
# ============================================================
# Ref. Lines 7420-9280 in code
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
#   - Tab buttons (lines 7270-7274)
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
#
# initSubtabs(container) (line 2203):
#   A utility that sets up sub-tab switching within a container.
#   It finds elements with class "km-subtab-btn" and wires click
#   handlers to toggle visibility of matching "km-subtab-content"
#   panels. Called from DOMContentLoaded for each sub-tab group.
#   The Keymap center panel uses sub-tabs for Combos, Macros,
#   Behaviors, Conditional Layers, and Sensor Bindings.

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
#   1. syncCrossTabData() — Ref. Line 6861 in code
#      After adding keymap layers to the RGB list, sorts the
#      entire layers[] array by index number. Layers without
#      an index (orphans) go to the end. This makes the layer
#      list in the RGB editor display in sequential order.
#
#   2. updateRgbOutput() — Ref. Line 3156 in code
#      After merging duplicate layers, sorts the merged array
#      by index before generating output. This makes the
#      #define L_xxx lines appear in sequential order.
#
#   3. layerOptionsHTML() — Ref. Line 2093 in code
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
# Ref. Lines ~4938-5260 in code
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
# Ref. Lines ~2290-2364 (parser) and ~3221-3303 (output) in code
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
#   TO_RGB(game_led, "GameLayer LED Macro", ...)) is now stored
#   as macro.label and used in the output instead of defaulting to the
#   node name. This preserves the user's descriptive labels.

# ============================================================
# SECTION 29: CLEAR LAYER FEATURE
# ============================================================
# Ref. Lines ~4079-4109 (context menu) and ~4140-4160 (handler) in code
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

# ============================================================
# SECTION 30: POPUP EDITOR OVERLAYS (Combo & Behavior)
# ============================================================
# Ref. Lines ~2788-2846 (JS functions) and ~648-691 (HTML) in code
#
# COMBO EDITOR POPUP:
#   triggerered by clicking "Edit" on a combo row in renderComboList().
#   Opens #comboEditorOverlay with fields:
#     - ceditName: combo node name
#     - ceditBind: binding string (e.g., &kp ESC)
#     - ceditLayerPicker: dropdown to add layer tags
#     - ceditLayerTags: removable chip tags showing selected layers
#     - ceditMiniKb: mini SVG keyboard for click-to-toggle positions
#   Functions:
#     openComboEditor(idx) — populates fields from combos[idx], renders tags and mini-kb
#     closeComboEditor() — hides overlay, resets comboEditorIndex
#     ceditRenderLayerTags(str) — builds tag HTML from space-separated layer string
#     ceditGetLayers() — reads tags back into space-separated string
#     ceditRenderMiniKb() — renders keyboard SVG in popup using ceditSelectedPositions[]
#   Save writes all fields back to combos[comboEditorIndex] and calls rgbRenderAll().
#
# BEHAVIOR EDITOR POPUP:
#   Triggered by clicking "Edit" on a behavior row in renderBehaviorList().
#   Opens #behaviorEditorOverlay with fields:
#     - beditName: behavior node name
#     - beditLabel: display label
#     - beditMacro: dropdown for macro reference (populated by macroRefOptionsHTML)
#   Functions:
#     openBehaviorEditor(idx) — populates fields from behaviors[idx]
#     closeBehaviorEditor() — hides overlay
#   Save writes fields back and calls rgbRenderAll().
#
# SHARED CSS: Both use .editor-overlay (fixed backdrop) and .editor-dialog
#   (centered modal with theme variables). Animations: fadeIn on overlay,
#   slideUp on dialog.

# ============================================================
# SECTION 31: RGB OUTPUT STRUCTURE (/ { ... }; wrapper)
# ============================================================
# Ref. Lines ~3275-3355 in updateRgbOutput() in code
#
# The RGB output is now wrapped in a root devicetree block:
#
#   / {
#       macros {                    <-- non-MO_BLINK macro calls (MO_RGB, TO_RGB, etc.)
#           ...
#       };
#       <native macro behaviors>   <-- blnk:, caps_blink etc. (from _rawText)
#       <ZMK_MACRO blink macros>   <-- blink macros as ZMK_MACRO() calls
#       <MO_BLINK standalone>      <-- MO_BLINK() helper calls
#       behaviors {                 <-- RGB_HT() calls + native non-macro behaviors
#           ...
#       };
#       combos {                   <-- C() calls with compatible = "zmk,combos"
#           compatible = "zmk,combos";
#           ...
#       };
#   };
#
# Native behaviors parsed from user .dtsi code are stored with _rawText
# property containing their full original text. This allows verbatim
# re-emission without needing to reconstruct the complex ZMK syntax.
# Native behaviors with type 'macro-one-param' or 'macro-two-param' go
# after macros{}; others (hold-tap, tap-dance, etc.) go inside behaviors{}.

# ============================================================
# SECTION 32: LAYOUT SWITCH & JSON IMPORT #INCLUDE UPDATE
# ============================================================
# Ref. Lines ~7720-7750 in DOMContentLoaded in code
#
# When the user clicks "Use Corne", "Use Lotus58", or "Apply Layout"
# (for a custom JSON), the handlers update keymapParsedIncludes[] by
# regex-replacing any existing -rgb.dtsi filename with the new
# keyboard's name (e.g., sofle-rgb.dtsi → corne-rgb.dtsi).
# The regex /[a-z0-9_]+-rgb\.dtsi/gi matches any keyboard prefix.
# Then updateKeymapOutput() is called to regenerate with correct path.
#
# The JSON Apply handler (line ~7726) also saves oldId before calling
# loadLayout(), then compares to detect a name change and updates includes.

# ============================================================
# SECTION 33: KEYMAP EDITOR POPUP OVERLAYS
# ============================================================
# Ref. Lines ~988-1278 (HTML) and ~8509-8809 (JS handlers) in code
#
# All keymap tab editors (combo, macro, behavior, conditional layers)
# now use popup overlay dialogs instead of inline collapsible panels.
#
# PATTERN:
#   Each editor follows the same CSS/HTML pattern:
#     .km-popup-overlay — fixed backdrop covering the viewport (z-index 300)
#     .km-popup-dialog — centered modal card (themed, rounded, shadowed)
#     .km-popup-header — title bar with section icon + close (×) button
#     .km-popup-body — scrollable content area with form fields
#     .km-popup-footer — action bar with Save + Cancel buttons
#   CSS classes are shared across all 4 popups via the km-popup-* namespace.
#   Animations: fadeIn (0.15s) on overlay, slideUp (0.2s) on dialog.
#   Show/hide: classList.add/remove('visible') on the overlay element.
#   Backdrop click: clicking the dark backdrop dismisses the popup.
#
# COMBO EDITOR POPUP (#kmComboOverlay):
#   Fields: Name, Binding, Timeout (ms), Layers, Require Prior Idle (ms),
#   Slow Release checkbox, combo mini-keyboard (click positions).
#   Opened by: kmAddComboBtn click (new combo) or Edit button on combo list.
#   Save: kmComboSaveBtn writes to keymapCombos[editingComboIndex].
#   Close: kmComboCancelBtn, kmComboCancelBtn2, backdrop click → closeComboOverlay().
#
# MACRO EDITOR POPUP (#kmMacroOverlay):
#   Fields: Name, Label, Params dropdown, Wait/Tap timing, step search,
#   step list (editable), + Add Step, + String Sequence buttons.
#   Width: 600px (wider to accommodate step list).
#   Opened by: kmAddMacroBtn click (new macro) or Edit button on macro list.
#   Save: kmMacroSaveBtn writes to keymapMacros[editingMacroIndex].
#   Close: closeMacroOverlay() — also reverts add if macroAddedViaButton.
#   Step search: macroStepSearch input filters visible .macro-step elements.
#
# BEHAVIOR EDITOR POPUP (#kmBehaviorOverlay):
#   Fields: Name, Type dropdown (hold-tap, mod-morph, tap-dance, sticky-key,
#   key-toggle, caps-word, macro, sensor-rotate), Label, dynamic config area.
#   Width: 580px.
#   The #kmBehaviorConfig div is dynamically populated by showBehaviorConfig(type)
#   which renders different fields depending on the selected behavior type.
#   Opened by: kmAddBehaviorBtn click (new) or Edit button on behavior list.
#   Save: kmBehaviorSaveBtn reads type-specific config and writes to keymapBehaviors.
#   Close: closeBehaviorOverlay().
#
# CONDITIONAL LAYER EDITOR POPUP (#kmCondLayerOverlay):
#   Fields: Condition name, multi-select "When these layers are active",
#   "Activate this layer" dropdown.
#   Width: 440px (compact).
#   Opened by: kmAddCondLayerBtn click (new) or Edit button on cond layer list.
#   Save: kmCondSaveBtn reads selected layers and writes to keymapConditionalLayers.
#   Close: closeCondLayerOverlay().
#
# LIST SEARCH/FILTER:
#   Each section (combos, macros, behaviors, conditional layers) has a
#   search input above the item list. Typing filters list items in real-time
#   by matching against item text content (case-insensitive).
#   Wired by reusable setupListSearch(searchId, clearId, listId) function.
#   Search IDs: comboListSearch, macroListSearch, behaviorListSearch,
#   condLayerListSearch. Clear buttons reset the filter.
#
# VALUE PICKER:
#   The floating ValuePicker (#vpOverlay) no longer auto-opens on SVG key
#   clicks. The binding editor popup handles all key editing. The VP system
#   (openValuePicker, closeValuePicker, vpState) remains in code for potential
#   reuse but has no active triggers.
#
# COMBO LAYER TAG PICKER (keymap tab):
#   The combo editor's Layers field uses a <select> dropdown + removable tag
#   chips, matching the RGB tab's combo editor pattern (ceditLayerPicker).
#   Elements: kmComboLayerPicker (select), kmComboLayerTags (span.layer-tags).
#   JS functions:
#     - kmComboLayerOptionsHTML() — builds <option> list from keymapLayers[].
#     - kmComboRenderLayerTags(layersStr) — renders layer indices as tag chips.
#     - kmComboGetLayers() — reads tag text content back to space-separated string.
#   Picker onchange adds layer (no duplicates), tag × click removes it.
#   Reuses existing .layer-tags / .layer-tag / .tag-x CSS.
#
# BINDING SELECT DROPDOWNS & BINDING PICKER POPUP:
#   Behavior config binding fields and the combo binding field use a
#   binding picker popup system instead of plain <select> dropdowns.
#   A trigger button (.bp-trigger) with class "beh-binding-wrap" opens
#   a full-screen popup overlay (#bindingPickerOverlay) where the user
#   can browse categorized bindings, search keycodes, or type raw code.
#
#   CSS (Ref. Lines ~320-324 for .beh-binding-wrap, ~282-315 for .behp-* in code):
#     .beh-binding-wrap — inline-flex column wrapper with trigger button
#     .bp-overlay — fixed full-screen backdrop (z-index 400)
#     .bp-dialog — centered modal (540px, themed, rounded, shadowed)
#     .bp-header — title bar with close button
#     .bp-body — scrollable content with collapsible sections
#     .bp-section / .bp-section-grid — category headers + button grids
#     .bp-btn — individual binding choice buttons
#     .bp-raw-row — "Or type raw code" input at the bottom
#
#   HTML popup (Ref. Line 918 in code):
#     #bindingPickerOverlay contains a .bp-dialog with:
#       - #bpTitle (header), #bpCloseBtn (dismiss)
#       - #bpSections (main categorized binding list)
#       - #bpSubPanel (keycode sub-panel with search, shown for &kp etc.)
#       - #bpRawRow (raw code text input + Apply button)
#
#   Binding picker functions (Ref. Lines ~5435-5737 in code):
#
#     openBindingPicker(targetId, optType) — (line 5435)
#       Opens the picker popup. Sets bpTargetId to the caller's element id.
#       Calls renderBindingPickerSections() to populate the category grid.
#       optType = 'binding' (default) or 'mods' for modifier selection.
#
#     closeBindingPicker() — (line 5455)
#       Hides the popup overlay. Resets bpTargetId.
#
#     selectBindingPickerValue(val) — (line 5461)
#       Called when the user clicks a binding button. Writes the chosen
#       value into the target element identified by bpTargetId, then
#       closes the picker. For trigger buttons, updates the displayed text.
#
#     renderBindingPickerSections() — (line 5478)
#       Builds the categorized binding list inside #bpSections.
#       Categories: Complete Bindings (0-param like &trans, &none, &gresc),
#       Layer Actions (&mo, &tog, &to, &sl with layer names/numbers),
#       Behaviors needing params (clickable → opens sub-panel for keycodes),
#       Custom Behaviors, Macros.
#       Each section is collapsible (click title to expand/collapse).
#
#     showBindingPickerSubPanel(prefix) — (line 5632)
#       Switches from the main sections view to a keycode search panel.
#       Shows a search bar + keycode grid for the given behavior prefix
#       (e.g., "&kp"). Clicking a keycode button calls selectBindingPickerValue
#       with the full binding string (e.g., "&kp A").
#
#     hideBindingPickerSubPanel() — (line 5737)
#       Returns from the keycode sub-panel to the main sections view.
#
#     populatePickerKeycodeGrids(container) — (line 5745)
#       Fills the sub-panel's keycode grid using ZMK_KEYCODES data.
#       Creates clickable buttons organized by category. Also appends
#       special action lists (BT_ACTIONS, RGB_ACTIONS, etc.) when the
#       behavior prefix requires them.
#
#   Remaining helper functions (Ref. Lines ~5769-5800 in code):
#
#     bindingSelectHTML(id, selected, optType, width) — (line 5769)
#       Returns HTML for a .bp-trigger button that opens the picker.
#       Displays the current binding value; clicking calls openBindingPicker().
#
#     getBehBindingValue(id) — (line 5783)
#       Reads the effective value from a trigger button's data-value attribute
#       or falls back to its text content.
#
#     setBehBindingValue(id, val) — (line 5789)
#       Sets the trigger button's data-value and displayed text.
#       Used by edit handlers when populating forms.
#
#   Event wiring (Ref. Lines ~7271-7285 in DOMContentLoaded):
#     - Backdrop click on #bindingPickerOverlay → closeBindingPicker()
#     - #bpCloseBtn click → closeBindingPicker()
#     - #bpSubBack click → hideBindingPickerSubPanel()
#     - #bpRawApply click → selectBindingPickerValue(raw input value)
#     - #bpKcSearch input → filters keycode buttons in sub-panel
#     - #bpKcSearchClear → clears search
#
#   Fields using the picker (in showBehaviorConfig, Ref. Line 5825):
#     Binding type triggers: kmBehHoldBinding, kmBehTapBinding, kmBehMmNormal,
#       kmBehMmMorphed, kmBehSkBinding, kmBehSensorCW, kmBehSensorCCW.
#     Modifier type triggers: kmBehMmMods, kmBehCwMods.
#     Combo binding: kmComboBind (inside #kmComboBindWrap container, line 848).
#   Fields kept as plain text inputs (complex syntax):
#     kmBehTdBindings (tap-dance), kmBehMacroBindings (macro),
#     kmBehCwContinueList (caps-word continue list).
#
#   Positional Hold Mini Keyboard (Ref. Lines ~4844-4855):
#     The hold-tap "hold-trigger-key-positions" field uses a visual SVG
#     mini keyboard picker (same pattern as combo position picker).
#     Global: behPositionalSelectedPositions[] (line 4844) holds selected position indices.
#     renderBehPositionalMiniKb() (line 4845) renders the SVG in #behPositionalMiniKb,
#     syncs the hidden #kmBehHoldTriggerPositions input.
#     Click handler via event delegation on #kmBehaviorConfig.

# ============================================================
# SECTION 34: BINDING PICKER POPUP (visual binding chooser)
# ============================================================
# Ref. Lines 5435-5769 (JS), 918-955 (HTML), 282-315 (CSS) in code
#
# The binding picker is a modal popup that replaces the old
# behBindingOptionsHTML() <select> approach. Instead of a dropdown,
# clicking a binding trigger button opens a categorized visual browser.
#
# ARCHITECTURE:
#   The picker uses a three-layer architecture:
#   1. Trigger button (.bp-trigger) — displays current value, clickable
#   2. Popup overlay (#bindingPickerOverlay) — modal with sections
#   3. Sub-panel (#bpSubPanel) — keycode search grid for multi-param behaviors
#
# USER FLOW:
#   1. User clicks a trigger button (e.g., Hold Binding in behavior editor)
#   2. openBindingPicker(targetId, optType) opens the popup
#   3. renderBindingPickerSections() builds categorized binding list:
#      - "Complete Bindings" — zero-param behaviors (&trans, &none, &gresc, etc.)
#      - "Layer Actions" — grouped by behavior (&mo, &tog, &to, &sl) with
#        per-layer buttons showing layer name + number
#      - "Behaviors (pick keycode)" — multi-param behaviors (&kp, &mt, etc.)
#        that open a keycode sub-panel on click
#      - "Custom Behaviors" — user-defined behaviors from keymapBehaviors
#      - "Macros" — user-defined macros from keymapMacros
#   4. User clicks a binding → selectBindingPickerValue(val) writes it back
#   5. OR user clicks a multi-param behavior → showBindingPickerSubPanel(prefix)
#      opens a keycode search grid (populatePickerKeycodeGrids)
#   6. OR user types raw code in #bpRawInput → clicks Apply
#
# GLOBAL STATE:
#   bpTargetId — the id of the trigger button that opened the picker
#   bpOptType — 'binding' or 'mods' (determines what sections show)
#
# kcDescs (line 4249):
#   A global lookup table extracted from populateKeycodeGrids() that maps
#   keycode names to human-readable descriptions (e.g., 'A' → 'Letter A').
#   Used by the picker and sub-panel to show helpful descriptions on buttons.
#
# This approach offers better UX than the old <select> element:
#   - Visual browsing by category with expandable sections
#   - Full keycode search with filtering
#   - Layer actions show names instead of just numbers
#   - Raw code fallback always available at the bottom
#
# COLLAPSIBLE SECTIONS:
#   Section titles toggle .open class on parent .bp-section via click handler.
#   CSS shows/hides .bp-section-grid based on .open. The Layer Actions grid
#   uses .bp-col class for flex-direction:column layout (not inline style,
#   which would block the collapse toggle).
#
# MACRO STYLING:
#   Macro buttons use .bp-btn-macro class, with .bp-btn-name colored #9cc
#   (light-blue) matching the macro/behavior label convention elsewhere.
