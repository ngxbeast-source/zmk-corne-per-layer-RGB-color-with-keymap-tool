# RGB_Code_Helper â€” Code Reference Guide
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
#       "Ref. Line 1268 in code"
#   - That means the actual code is on that line in RGB_Code_Helper.html.
#
# Lines referenced here match the file after the latest update.
# If the code file is updated, these references should be updated too.

# ============================================================
# TABLE OF CONTENTS
# ============================================================
# Line 57   â€” Section 1:  What This Tool Does (Overview)
# Line 82   â€” Section 2:  File Structure (HTML, CSS, JS)
# Line 114  â€” Section 3:  Global Data Model (the "memory" of the tool)
# Line 161  â€” Section 4:  Undo/Redo System
# Line 196  â€” Section 5:  Default Keyboard Layouts
# Line 217  â€” Section 6:  ZMK Keycodes & Behavior Reference Tables
# Line 242  â€” Section 7:  Color Utilities (HSB, Hex, RGB)
# Line 271  â€” Section 8:  HSB Color Picker
# Line 297  â€” Section 9:  RGB Tab Helper Functions
# Line 346  â€” Section 10: .dtsi Code Parser (parseUserCode)
# Line 403  â€” Section 11: RGB Tab Rendering (Lists, Dropdowns, UI)
# Line 431  â€” Section 12: RGB Output Generation (updateRgbOutput)
# Line 476  â€” Section 13: SVG Keyboard Renderer
# Line 501  â€” Section 14: Binding Labels (how keys show text)
# Line 525  â€” Section 15: .keymap File Parser (parseKeymap)
# Line 560  â€” Section 16: Layer Tabs & Management
# Line 582  â€” Section 17: Binding Editor (how you change a key)
# Line 613  â€” Section 18: Combo, Macro, Behavior & Built-in Behavior Editors
# Line 667  â€” Section 19: Quick-Assign System
# Line 685  â€” Section 20: Keymap Output Generation (updateKeymapOutput)
# Line 717  â€” Section 21: Behavior Code Generation
# Line 739  â€” Section 22: Cross-Tab Sync (how RGB & Keymap tabs talk)
# Line 829  â€” Section 23: Value Picker (floating search widget)
# Line 850  â€” Section 24: Tab Switching & Dark Mode
# Line 870  â€” Section 25: DOMContentLoaded (wiring everything up)
# Line 910  â€” Section 26: Layer Ordering (how layers stay in sequence)
# Line 949  â€” Section 27: Macro Param Controls (context-aware editing)
# Line 984  â€” Section 28: Comment Preservation (.dtsi round-trip)
# Line 1021 â€” Section 29: Clear Layer Feature
# Line 1042 â€” Section 30: Popup Editor Overlays (Combo & Behavior)
# Line 1078 â€” Section 31: RGB Output Structure (/ { ... }; wrapper)
# Line 1107 â€” Section 32: Layout Switch #include Update
# Line 1117 â€” Section 33: Keymap Editor Popup Overlays
# Line 1297 â€” Section 34: Binding Picker Popup (visual binding chooser)

# ============================================================
# SECTION 1: WHAT THIS TOOL DOES (Overview)
# ============================================================
# Ref. Lines 1-6 in code (HTML head)
#
# This is a single-file web tool for configuring ZMK keyboards.
# ZMK is firmware that runs on keyboards like the Corne or Lotus58.
# The tool has two tabs:
#
#   Tab 1 â€” RGB Generator:
#     You paste .dtsi code (a ZMK configuration format) and the tool
#     parses it into editable layers, colors, macros, behaviors, and
#     combos. When you change things, it regenerates the .dtsi output.
#
#   Tab 2 â€” Keymap Editor:
#     You paste a .keymap file and the tool parses it into visual layers.
#     You see an SVG picture of the keyboard. Click a key to change its
#     binding. The tool regenerates the .keymap file as output.
#
# Both tabs share data. When you switch between them, the tool syncs
# layers, behaviors, and macros so they stay in agreement.
#
# The whole tool is one HTML file with embedded CSS and JavaScript.
# No server, no build step â€” just open the file in a browser.

# ============================================================
# SECTION 2: FILE STRUCTURE (HTML, CSS, JS)
# ============================================================
# Ref. Lines 1-8200 in code
#
# The file has three main parts:
#
#   1. CSS Styles (lines 7-439):
#      These control how everything looks: colors, spacing, fonts,
#      button styles, dark mode, etc. The tool uses CSS custom
#      properties (variables like --bg, --fg) for dark/light theme.
#      The html and body elements have height:100% and overflow:hidden
#      to prevent document-level scrolling from bleeding between tabs;
#      each tab panel scrolls independently within its own container.
#
#   2. HTML Body (lines 440-1255):
#      The page layout. All the buttons, text fields, dropdowns,
#      and hidden panels (like the binding editor, overlays, etc.)
#      are defined here as HTML elements. Each element has an "id"
#      so the JavaScript can find and control it.
#
#   3. JavaScript (lines 1257-8127):
#      This is where all the logic lives. It starts with data
#      variables (line 1268), then functions for parsing, rendering,
#      and generating code, and ends with event wiring at line 6527
#      inside a DOMContentLoaded block.
#
# Think of it like a building:
#   - CSS is the paint and decorations (how it looks)
#   - HTML is the rooms and furniture (what's on the page)
#   - JavaScript is the electricity and plumbing (how it works)

# ============================================================
# SECTION 3: GLOBAL DATA MODEL (the "memory" of the tool)
# ============================================================
# Ref. Lines 1268-1310 in code
#
# The tool stores everything in JavaScript arrays and variables.
# Think of each array as a "notebook" that holds a list of items.
#
# --- RGB Tab Data (used by the RGB Generator tab) ---
#
#   layers        (line 1268) â€” List of layers with names, index numbers,
#                               and HSB color values. Example entry:
#                               { name: "L_ABC", index: "0", h: "19",
#                                 s: "100", b: "17", label: "ABC" }
#
#   macros        (line 1269) â€” RGB macros (like MO_RGB, TO_RGB).
#   behaviors     (line 1270) â€” RGB tab behavior list.
#   combos        (line 1271) â€” RGB tab combo definitions.
#   blinkMacros   (line 1272) â€” Blink macros (LED blink sequences).
#   colorValueMap (line 1274) â€” A lookup table: color name â†’ HSB values.
#   colorLabelMap (line 1275) â€” A lookup table: color name â†’ display label.
#
# --- Keymap Tab Data (used by the Keymap Editor tab) ---
#
#   keymapLayers            (line 1280) â€” Parsed keymap layers. Each has:
#                                         { name, displayName, bindings[], status }
#   keymapCombos            (line 1281) â€” Parsed combos from .keymap file.
#   keymapMacros            (line 1282) â€” Parsed macros from .keymap file.
#   keymapBehaviors         (line 1283) â€” Custom behaviors (hold-tap, etc).
#   keymapConditionalLayers (line 1284) â€” Conditional layer rules.
#   keymapSensorBindings    (line 1285) â€” Encoder rotation bindings per layer.
#   keyboardLayout          (line 1286) â€” Physical key positions (from JSON).
#
# --- State Variables ---
#
#   activeLayerIndex        (line 1290) â€” Which layer tab is selected right now.
#   selectedKeyIndex        (line 1291) â€” Which key is being edited (-1 = none).
#   editingComboIndex       (line 1292) â€” Which combo is being edited (-1 = none).
#   editingMacroIndex       (line 1293) â€” Which macro is being edited (-1 = none).
#   editingBehaviorIndex    (line 1294) â€” Which behavior is being edited (-1 = none).
#
# WHY TWO SETS OF DATA?
#   The RGB tab and Keymap tab each have their own data because they
#   parse different file formats (.dtsi vs .keymap). The "sync" functions
#   (syncCrossTabData and syncRgbToKeymap) copy data between them.
#   More on syncing: see Section 22 (line 739 in this doc).

# ============================================================
# SECTION 4: UNDO/REDO SYSTEM
# ============================================================
# Ref. Lines 1314-1497 in code
#
# The undo system works like a camera taking snapshots:
#
#   snapshotState() (line 1314) â€” Takes a "photo" of ALL data:
#     keymapLayers, keymapCombos, keymapMacros, keymapBehaviors,
#     keymapConditionalLayers, keymapSensorBindings, and activeLayerIndex.
#     It uses JSON.parse(JSON.stringify(...)) to make a deep copy.
#     A "deep copy" means it copies everything inside the arrays too,
#     not just the array references. This way, changing the original data
#     later won't affect the snapshot.
#
#   restoreState(snap) (line 1341) â€” Loads a snapshot back.
#     Replaces all data arrays with the saved copies.
#
#   pushUndo() (line 1368) â€” Saves current state BEFORE a change.
#     Every time you edit something (add a layer, change a key, etc),
#     the code calls pushUndo() first. This saves the "before" state
#     so you can undo back to it. Keeps up to 50 entries (UNDO_LIMIT).
#
#   performUndo() (line 1402) â€” Goes back one step.
#     Moves current state to the redo stack, loads previous state.
#
#   performRedo() (line 1408) â€” Goes forward one step.
#     Moves current state to undo stack, loads the redo state.
#
#   fullRender() (line 1377) â€” Refreshes the entire UI after undo/redo.
#     Without this, the screen would show old data.
#
# The keyboard shortcuts Ctrl+Z (undo) and Ctrl+Y (redo) trigger
# these functions. See the DOMContentLoaded section (line 6529).

# ============================================================
# SECTION 5: DEFAULT KEYBOARD LAYOUTS
# ============================================================
# Ref. Lines 1498-1576 in code
#
# A "layout" describes the physical positions and sizes of every key
# on the keyboard. The tool uses this to draw the SVG keyboard picture.
#
# DEFAULT_CORNE_LAYOUT (line 1498):
#   42 keys arranged in a split ergonomic layout.
#   Each key has: x (horizontal position), y (vertical position),
#   w (width, defaults to 1), h (height, defaults to 1),
#   and optionally r (rotation angle) and rx/ry (rotation center).
#
# DEFAULT_LOTUS58_LAYOUT (line 1531):
#   A larger 60-key layout with built-in encoders.
#
# These defaults are used when no custom layout JSON is imported.
# The function loadLayout() (line 3154) applies the layout to
# the SVG renderer. See Section 13 (line 479 in this doc).

# ============================================================
# SECTION 6: ZMK KEYCODES & BEHAVIOR REFERENCE TABLES
# ============================================================
# Ref. Lines 1577-1647 in code
#
# ZMK_KEYCODES (line 1577):
#   A big lookup table of every key the keyboard can send.
#   Organized by category: Letters, Numbers, Punctuation, Modifiers,
#   Navigation, Function keys, Keypad, Media, etc.
#   Each entry has a display name (what you see on the button)
#   and the ZMK code (what goes in the .keymap file).
#
# ZMK_BEHAVIORS (line 1596):
#   A list of all built-in ZMK behaviors like &kp (key press),
#   &mo (momentary layer), &bt (bluetooth), &rgb_ug (RGB controls).
#   Each entry says how many parameters it takes.
#   Used by the binding editor dropdown (see Section 17, line 582).
#
# BT_ACTIONS, RGB_ACTIONS, OUT_ACTIONS, BL_ACTIONS, EP_ACTIONS (line 1633):
#   Sub-lists of specific actions for behaviors that have sub-commands.
#   Example: BT_ACTIONS has BT_CLR, BT_SEL, BT_NXT, etc.
#
# MOUSE_BUTTONS, MOUSE_MOVES, MOUSE_SCROLLS (line 1638):
#   Mouse emulation keycodes for &mkp, &mmv, and &msc behaviors.

# ============================================================
# SECTION 7: COLOR UTILITIES (HSB, Hex, RGB)
# ============================================================
# Ref. Lines 1720-1763 in code
#
# These small functions convert colors between different formats.
# Keyboards use HSB (Hue, Saturation, Brightness) for LED colors.
# Web browsers use Hex (#FF0000) or RGB for display.
#
#   hsbToHex(h, s, b) (line 1720):
#     Converts HSB values to a hex color string like "#FF3300".
#     Used to show color swatches in the layer list.
#     h = 0-360 (color wheel position), s = 0-100, b = 0-100.
#
#   hasHsbVal(v) (line 1748):
#     Checks if a value is a valid HSB number (not empty, not undefined).
#     Returns true for 0 (which is a valid color value).
#     This is important because in JavaScript, 0 is "falsy" â€”
#     a simple `if (v)` check would wrongly treat 0 as empty.
#
#   baseKey(name) (line 1749):
#     Strips "L_" or "RGB_" prefix from a layer name and
#     converts to uppercase. Example: "L_ABC" â†’ "ABC".
#     Used for matching layers between RGB and Keymap tabs.
#
#   esc(str) (line 1750):
#     Escapes HTML characters to prevent injection.
#     Converts < > & " ' into safe HTML entities.

# ============================================================
# SECTION 8: HSB COLOR PICKER
# ============================================================
# Ref. Lines 1764-1956 in code
#
# This is the floating color picker popup that appears when you
# click a color swatch in the layer list.
#
# It's "lazy loaded" â€” the HTML elements for the picker are only
# created the first time you open it (ensureHsbPicker, line 1762).
# This is a common technique to avoid slowing down the initial page load.
#
# The picker shows:
#   - A hue bar (rainbow strip) at the bottom
#   - A saturation/brightness square (the big gradient area)
#   - H, S, B number inputs for precise values
#   - A "copy hex" button
#
# How it works:
#   1. openHsbPicker(layerIdx, anchorEl) â€” Opens the picker for a layer.
#      Reads the layer's current H, S, B values and displays them.
#   2. The user drags on the hue bar or S/V square to pick a color.
#   3. applyHsbPickerValue(h, s, b) â€” Saves the chosen color back to
#      the layer data and updates the swatch and output.
#   4. closeHsbPicker() â€” Hides the picker.

# ============================================================
# SECTION 9: RGB TAB HELPER FUNCTIONS
# ============================================================
# Ref. Lines 1957-2112 in code
#
# Small functions used by other parts of the RGB tab.
#
#   layerOptionsHTML(selected) (line 1957):
#     Builds the <option> tags for a layer dropdown menu.
#     Sorts layers by index so they appear in sequential order
#     (0, 1, 2, ...). The "selected" parameter pre-selects one.
#
#   colorOptionsHTML(selected) (line 1970):
#     Builds <option> tags for a color dropdown (only layers
#     that have HSB values assigned).
#
#   macroRefOptionsHTML(selected) (line 1995):
#     Builds <option> tags for a macro reference dropdown.
#
#   updateHeaderDropdowns() (line 2726):
#     Refreshes all dropdown menus in the RGB macro and combo editors
#     with the latest layer and color lists.
#     Also populates the combo layer picker dropdown (comboLayerPicker).
#
#   addLayer(), addMacro(), addBehavior(), addCombo(), addBlinkMacro():
#     Functions that append new empty items to the data arrays.
#
#   autoPrefix(name, type):
#     Returns the macro node name with an appropriate prefix based on type:
#       TO_RGB â†’ 'to_' + name   (e.g., to_game_led)
#       TO_RGB_PRESS â†’ 'top_' + name   (e.g., top_toglayers_leds)
#       Others â†’ name unchanged
#     Called by addMacro() and the edit-save handler to match dtsi naming
#     conventions.
#
# RGB COMBO LAYER PICKER:
#   Both the header combo form and each inline combo row have an
#   "Add layer" dropdown (<select>). Selecting a layer adds it as a
#   tag chip (deduped â€” won't add twice). Tags are removable via the
#   Ã— button on each tag. The underlying data is stored space-separated
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
# Ref. Lines 2113-2434 in code
#
# This is the parser for the RGB Generator tab. When you paste
# .dtsi code and click "Parse Imported Code", this function runs.
#
# What it does:
#   1. Reads the text from the import textarea.
#   2. Uses regular expressions (regex) to find patterns in the text:
#      - #define L_xxx N       â†’ creates a layer with index N
#      - #define RGB_xxx RGB_COLOR_HSB(h,s,b) â†’ creates a color
#      - ZMK_MACRO(...) blocks    â†’ parses macros
#      - BLINK_SEQ macros         â†’ parses blink macros
#      - Native ZMK behaviors     â†’ parses hold-tap, tap-dance, etc.
#   3. Fills the layers[], macros[], behaviors[], combos[], and
#      blinkMacros[] arrays with parsed data.
#   4. Syncs RGB layer names â†’ keymap layer names (if keymap layers exist).
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
#   LAYER PARSING â€” Two-pass approach:
#     Primary regex: /^#define\s+(L_[A-Za-z0-9_]+)\s+(\d+)$/gm
#       Matches layers WITH L_ prefix (e.g., #define L_ABC 0).
#       Color lookup tries: RGB_ + stripped name, stripped name, full name.
#     Fallback regex: /^#define\s+([A-Za-z0-9_]+)\s+(\d+)$/gm
#       Matches ANY #define number pattern (e.g., #define ABC 0).
#       Color lookup tries: RGB_ + name, then name itself.
#       This way, layer "ABC" correctly finds color "RGB_ABC".
#
#   MACRO PARSING â€” Supported types:
#     MO_RGB(name, "label", layer, activeColor, releaseColor)
#     TO_RGB(name, "label", layer, color)
#     TO_RGB_PRESS(name, "label", layer, color)
#     MO_BLINK(name, "label", layer, blinkColor, returnColor, wait)
#   Regex: /(TO_RGB_PRESS|TO_RGB|MO_BLINK|MO_RGB)\(([^)]+)\)/g
#   MO_BLINK is experimental â€” extracts blinkColor, returnColor, wait fields.
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
#   Single-line #defines (layers, colors) are NOT stripped â€” those are
#   parsed from the original `code` variable before stripping happens.

# ============================================================
# SECTION 11: RGB TAB RENDERING (Lists, Dropdowns, UI)
# ============================================================
# Ref. Lines 2435-2927 in code
#
# These functions draw the RGB tab's visual elements.
#
#   rgbRenderAll() (line 2435):
#     Master function that refreshes everything in the RGB tab.
#     Calls renderLayerList, updateHeaderDropdowns, updateRgbOutput,
#     renderLayerTabs (to update keymap tab's layer color dots).
#
#   renderLayerList() (line 2449):
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
#   updateHeaderDropdowns() (line 2726):
#     Fills the macro's Layer and Color dropdown menus.
#     Uses layerOptionsHTML() and colorOptionsHTML() to build options.

# ============================================================
# SECTION 12: RGB OUTPUT GENERATION (updateRgbOutput)
# ============================================================
# Ref. Lines 2928-3153 in code
#
# This is the function that generates the .dtsi output text shown
# in the "Generated Output" pane of the RGB tab.
#
# How it works step by step:
#
#   1. MERGE layers (lines 2886-2906):
#      Combines layers that refer to the same thing (by name or index).
#      This prevents duplicate #define lines in the output.
#      Uses two lookup tables: "merged" (by name) and "mergedByIndex" (by index).
#
#   2. SORT by index (lines 2916-2922):
#      After merging, sorts layers by their index number (0, 1, 2, 3...).
#      Layers without an index go to the end.
#      This ensures the output shows #define lines in sequential order.
#
#   3. WRITE LAYER DEFINES (lines 2924-2930):
#      Outputs lines like: #define ABC 0
#      Uses the layer's original parsed name directly (no prefix added).
#      If a layer was parsed with L_ prefix, it keeps L_. If not, it
#      outputs the bare name (e.g., ABC, NMRW, FKEYS).
#
#   4. WRITE COLOR DEFINES (lines 2932-2943):
#      Outputs lines like: #define RGB_ABC RGB_COLOR_HSB(19,100,17)
#      Only for layers that have all three H, S, B values set.
#
#   5. WRITE HELPER MACROS (lines ~2961-3001):
#      Outputs BLINK_SEQ, MO_RGB, TO_RGB, TO_RGB_PRESS, RGB_HT,
#      MO_BLINK (conditional â€” only if MO_BLINK macros exist), and C
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
# Ref. Lines 3154-3267 in code
#
# These functions draw the keyboard picture using SVG (Scalable
# Vector Graphics â€” a way to draw shapes in HTML).
#
#   loadLayout(layoutObj) (line 3154):
#     Takes a keyboard layout (array of key positions) and stores it.
#     Triggers a re-render of the keyboard SVG.
#
#   renderKeyboardSvg(targetId, options) (line 3168):
#     The main drawing function. For each key in the layout:
#       - Calculates the position (x, y) and size (w, h)
#       - Handles rotated keys (some ergonomic keys are angled)
#       - Adds click handlers so you can click a key to edit it
#       - Shows the current binding label on each key
#     The SVG is placed inside the HTML element whose id matches targetId.
#
# Split keyboard detection:
#   The code looks for a "gap" â€” a big horizontal space between keys.
#   Keys before the gap are the left half, keys after are the right half.
#   This gap is used for formatting the .keymap output with proper alignment.

# ============================================================
# SECTION 14: BINDING LABELS (how keys show text)
# ============================================================
# Ref. Lines 3268-3385 in code
#
#   bindingToLabels(binding) (line 3268):
#     Converts a binding string like "&kp A" into display labels
#     for the SVG key. Returns { top, bottom, full } where:
#       - top = short behavior name (e.g., "A")
#       - bottom = parameter (e.g., "")
#       - full = complete binding text
#     Handles special cases: &trans shows "â–½", &none shows "âœ•",
#     &mo shows "MO 2", &lt shows "LT 3 SPC", etc.
#
#   simplifyKeycode(kc) (line 3328):
#     Shortens keycode names for display: ESCAPEâ†’ESC, DELETEâ†’DEL, etc.
#
#   simplifyMod(mod) (line 3353):
#     Shortens modifier names: LEFT_CONTROLâ†’LCTL, RIGHT_SHIFTâ†’RSFT, etc.
#
#   getLayerLabel(idx) (line 3364):
#     Returns a display name for a layer index number.
#     Looks at keymapLayers and layers arrays for a matching name.

# ============================================================
# SECTION 15: .keymap FILE PARSER (parseKeymap)
# ============================================================
# Ref. Lines 3386-3734 in code
#
# This is the parser for the Keymap Editor tab. When you paste a
# .keymap file and click "Parse .keymap", this function runs.
#
# What it does:
#   1. Extracts #include lines (line 3412) for output preservation.
#   2. Finds the "keymap {" block (line 3422).
#   3. Extracts "raw blocks" â€” any devicetree blocks BEFORE the keymap
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
# Ref. Lines 3735-4054 in code
#
#   renderLayerTabs() (line 3735):
#     Draws the layer sidebar on the left side of the Keymap tab.
#     Each layer gets a tab showing its name, index number, and
#     (optionally) a colored dot from the RGB tab.
#     Active (selected) layer is highlighted. Reserved layers are hidden.
#
#   updateLayerHeader() (line 3771):
#     Updates the layer name displayed above the keyboard SVG.
#
#   showLayerContextMenu() (line 3801):
#     Shows a right-click menu with options like "Add Layer Above",
#     "Move Up", "Rename", "Delete", etc.
#
#   handleCtxAction(action) (line 3841):
#     Executes the chosen context menu option. Uses pushUndo()
#     before making changes so you can undo them.

# ============================================================
# SECTION 17: BINDING EDITOR (how you change a key)
# ============================================================
# Ref. Lines 4055-4354 in code
#
# When you click a key on the SVG keyboard, the binding editor opens.
#
#   populateKeycodeGrids() (line 4055):
#     Fills the keycode button grid using ZMK_KEYCODES data.
#     Creates clickable buttons organized by category.
#
#   populateBehaviorDropdown() (line 4076):
#     Fills the behavior dropdown with ZMK_BEHAVIORS entries plus
#     any custom behaviors defined in the keymap.
#
#   showBindingEditor(keyIdx) (line 4136):
#     Opens the editor panel for a specific key. Reads the current
#     binding and fills in the behavior, parameters, and modifiers.
#
#   updateBindingEditorFields(behavior, params) (line 4154):
#     Adjusts the editor UI based on the selected behavior.
#     Different behaviors need different input fields.
#     Example: &kp needs a keycode, &bt needs a BT action, etc.
#
#   applyBinding() (line 4311):
#     Saves the edited binding back to the layer data.
#     Calls pushUndo() first, then updates keymapLayers.
#
#   cancelBindingEditor() (line 4339):
#     Closes the editor without saving.

# ============================================================
# SECTION 18: COMBO, MACRO, BEHAVIOR & BUILT-IN BEHAVIOR EDITORS
# ============================================================
# Ref. Lines 4355-5215 in code
#
# These render and manage the combo, macro, and behavior lists
# in the Keymap Editor tab.
#
#   renderComboMiniKb() (line 4355):
#     Draws a small keyboard picture for selecting combo key positions.
#     You click keys on the mini-keyboard to choose which keys
#     trigger the combo.
#
#   renderKeymapComboList() (line 4392):
#     Displays the list of combos with their names, bindings, and
#     key positions. Includes edit and delete buttons.
#
#   renderKeymapMacroList() (line 4419):
#     Displays the list of macros with names and step previews.
#
#   renderKeymapBehaviorList() (line 4804):
#     Displays custom behaviors with type, name, and config summary.
#     Built-in behaviors (those with `_builtin` flag) are skipped here â€”
#     they are shown in the Built-in Behaviors toggle section instead.
#
#   renderBuiltinBehaviorToggles() (line 4824):
#     Renders the Built-in Behaviors section â€” a list of checkbox toggles
#     for preset ZMK behaviors defined in BUILTIN_BEHAVIORS (line 1648).
#     Each toggle shows the behavior name, type, and description.
#     Checkbox state syncs with keymapBehaviors (checked = behavior exists
#     in the array with matching `_builtin` id).
#
#   toggleBuiltinBehavior(presetId, enable) (line 4841):
#     Called when a built-in behavior checkbox changes. When enabled:
#     removes any parsed behavior with the same name (dedup), then adds
#     a deep copy of the preset config to keymapBehaviors with _builtin
#     and _fromEditor flags. When disabled: filters out by _builtin id.
#     Then re-renders toggles, behavior list, dropdown, and output.
#
#   showBehaviorConfig(type) (line 5134):
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
# Ref. Lines 5215-5557 in code
#
# Quick-assign lets you rapidly assign keycodes to every key
# by pressing keys on your physical keyboard.
#
#   openQuickAssign() â€” Opens the QA overlay on the first key.
#   qaAssign(zmkCode) â€” Assigns a code and moves to the next key.
#   qaKeydownHandler(e) â€” Listens for physical key presses and
#     converts them to ZMK keycodes using QA_KEYBOARD_MAP.
#   closeQuickAssign(cancelled) â€” Closes the overlay. If cancelled,
#     reverts all changes using undo.
#
# The on-screen keyboard (rendered by renderQaOnScreenKb) provides
# a visual alternative for keys not on your physical keyboard.

# ============================================================
# SECTION 20: KEYMAP OUTPUT GENERATION (updateKeymapOutput)
# ============================================================
# Ref. Lines 5558-6000 in code
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
# Ref. Lines 6001-6085 in code
#
#   generateBehaviorCode(b) (line 6001):
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
#     This function is called by updateKeymapOutput() (line 5558)
#     when generating the behavior section of the .keymap file.

# ============================================================
# SECTION 22: CROSS-TAB SYNC (how RGB & Keymap tabs talk)
# ============================================================
# Ref. Lines ~6086-6248 in code
#
# The two tabs have separate data, but they need to stay in agreement.
#
#   syncCrossTabData() (line 6086):
#     Called when switching TO the RGB tab.
#     Goes through every keymapLayer and adds matching entries to
#     the RGB layers[] array (if they don't already exist).
#     Matching is done by: index first, then by name.
#     After syncing, sorts layers by index so they appear in order.
#
#   syncRgbToKeymap() (line 6136):
#     Called when switching TO the Keymap tab.
#     Syncs ALL RGB data into keymap arrays with _fromRgb flag:
#       - macros[] â†’ keymapMacros (as paramType 0 with empty steps)
#       - blinkMacros[] â†’ keymapMacros (as paramType 0 with empty steps)
#       - behaviors[] â†’ keymapBehaviors (as hold-tap type)
#       - combos[] â†’ keymapCombos (positions converted from string to array)
#       - dtsiNativeBehaviors[] â†’ keymapBehaviors (with _fromDtsi flag)
#     Before syncing, removes any stale _fromRgb items from previous syncs.
#     Purpose: RGB macros/behaviors appear as selectable bindings in the
#     keymap editor's dropdowns and value picker, but are EXCLUDED from
#     the .keymap output (filtered by _fromRgb flag in updateKeymapOutput).
#
# Flags used:
#   _fromRgb  â€” Marks items synced from RGB tab. Included in UI, excluded from output.
#   _fromDtsi â€” Marks native dtsi behaviors (hm, ltq, td_numcaps). Excluded from output.
#   _fromKeymap â€” Marks RGB layers synced from keymap tab.
#   _fromEditor â€” Marks items added via the keymap editor UI (for raw-blocks path).
#   _builtin  â€” Marks behaviors added via the Built-in Behaviors toggles. Stores the
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
#   critical â€” without it, `    };` would match as a substring within deeper-
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
#   RGB "Parse & Reflect" (in parseUserCode, ~line 2382):
#     After the .dtsi is parsed, if keymapLayers already exist, the code
#     walks all parsed RGB layers by index. For each:
#       - If a keymap layer exists at that index â†’ its displayName and
#         node name are overwritten with the RGB layer's base name.
#         Example: RGB "L_GAME" at index 0 â†’ keymapLayers[0].displayName
#         becomes "GAME", keymapLayers[0].name becomes "game_0".
#       - If the index is BEYOND keymapLayers.length â†’ a new empty keymap
#         layer is created (with &trans bindings) using the RGB layer's name.
#         This supports "color templates" â€” RGB definitions that pre-define
#         more layers than the current keymap has.
#     Status message shows sync + new layer counts.
#
#   Keymap "Parse Keymap" (in kmParseBtn handler, ~line 6837):
#     After the .keymap is parsed, if RGB layers already exist, the code
#     walks all keymap layers by index. For each matching RGB layer:
#       - The RGB layer's name is overwritten using the keymap layer's
#         displayName (uppercased). The existing prefix is preserved:
#         L_OLD â†’ L_NEW, LAYER_OLD â†’ LAYER_NEW, OLD â†’ NEW.
#     If any names were synced, rgbRenderAll() refreshes the RGB tab.
#     Status message appends sync count.
#
# After syncing, layers are sorted by index number so the RGB editor
# shows them in the same order as the keymap (0, 1, 2, 3...).
# See also: Section 26 (line 910 in this doc).

# ============================================================
# SECTION 23: VALUE PICKER (floating search widget)
# ============================================================
# Ref. Lines 6351-6476 in code
#
# The value picker is a floating search box that appears when you
# need to choose a parameter value (like a keycode or layer number).
#
#   openValuePicker() â€” Shows the picker next to the input field.
#   closeValuePicker() â€” Hides it.
#   vpBuildChoices(param, currentBindBehavior) â€” Builds the list of
#     choices based on what parameter you're editing.
#     For example: if editing a &kp binding, shows all keycodes.
#     If editing a &mo binding, shows layer numbers.
#   vpRenderResults() â€” Draws the filtered list based on the search query.
#   fuzzyMatch(query, target) â€” Checks if the search query matches.
#
# KEYBOARD NAVIGATION:
#   Arrow Up/Down moves the highlight, Enter selects, Escape closes.
#   This is wired in the DOMContentLoaded block (line 6529).

# ============================================================
# SECTION 24: TAB SWITCHING & DARK MODE
# ============================================================
# Ref. Lines 6477-6528 in code
#
#   switchTab(tabId) (line 6477):
#     Switches between the RGB Generator and Keymap Editor tabs.
#     Hides one tab panel, shows the other.
#     When switching to Keymap: calls syncRgbToKeymap().
#     When switching to RGB: calls syncCrossTabData() and rgbRenderAll().
#
#   toggleDarkMode() (line 6503):
#     Switches between light and dark color themes.
#     Sets the "data-theme" attribute on the <html> element.
#     The CSS uses this attribute to apply different colors.
#
#   loadTheme() (line 6511):
#     Checks localStorage for a saved theme preference.
#     localStorage is like a tiny file that the browser remembers.

# ============================================================
# SECTION 25: DOMContentLoaded (wiring everything up)
# ============================================================
# Ref. Lines 6529-8198 in code
#
# This is the longest section. It runs once when the page finishes
# loading. Its job is to connect HTML elements to JavaScript functions.
#
# "Event listeners" are the connectors:
#   element.onclick = function() { ... }
#   â€” means "when this element is clicked, run this function."
#
#   element.addEventListener('input', function(e) { ... })
#   â€” means "when the user types in this field, run this function."
#
# This section wires up:
#   - Tab buttons (lines 6495-6499)
#   - RGB parse button, Add buttons for layers/macros/etc.
#   - Macro editor open/close/save/delete
#   - Keymap parse button, layout import
#   - Layer drag-and-drop reordering
#   - Layer inline name editing
#   - Layer context menu
#   - Keyboard SVG key clicks â†’ binding editor
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
#   1. syncCrossTabData() â€” Ref. Line 6043 in code
#      After adding keymap layers to the RGB list, sorts the
#      entire layers[] array by index number. Layers without
#      an index (orphans) go to the end. This makes the layer
#      list in the RGB editor display in sequential order.
#
#   2. updateRgbOutput() â€” Ref. Line 2885 in code
#      After merging duplicate layers, sorts the merged array
#      by index before generating output. This makes the
#      #define L_xxx lines appear in sequential order.
#
#   3. layerOptionsHTML() â€” Ref. Line 1957 in code
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
# Ref. Lines ~4486-4708 in code
#
# When editing macro steps, each step has a behavior (like &kp, &mo,
# &lt) and parameters. The editor provides context-aware controls
# based on which behavior is selected.
#
#   renderParamControl(stepIdx, paramNum, paramType, value, behavior):
#     Generates the right HTML input for a macro step parameter.
#     Returns different controls depending on the behavior:
#       - &to, &mo, &tog, &sl â†’ layer dropdown from keymapLayers
#       - &lt â†’ layer dropdown (param1) + keycode input with search (param2)
#       - &kp, &sk, &kt â†’ keycode input with search button
#       - &bt â†’ BT_ACTIONS dropdown (BT_CLR, BT_SEL, etc.)
#       - &out â†’ OUT_ACTIONS dropdown (OUT_TOG, OUT_USB, OUT_BLE)
#       - &mmv, &msc â†’ direction dropdown (MOVE_UP, SCROLL_DOWN, etc.)
#       - &mkp â†’ mouse button dropdown (LCLK, RCLK, MCLK)
#       - Unknown behaviors â†’ generic text input with search fallback
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
# Ref. Lines ~2137-2211 (parser) and ~2993-3075 (output) in code
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
# Ref. Lines ~3820-3850 (context menu) and ~3881-3901 (handler) in code
#
# The layer context menu (right-click a layer tab) now includes two
# "Clear Layer" options:
#
#   "Clear Layer â†’ &trans":
#     Sets ALL key bindings in the active layer to &trans.
#     &trans means "transparent" â€” the keypress passes through to
#     the layer below. Useful when creating overlay layers.
#
#   "Clear Layer â†’ &none":
#     Sets ALL key bindings in the active layer to &none.
#     &none means "do nothing" â€” the key is completely disabled.
#     Useful for blocking keys on specific layers.
#
# Both options show a confirmation dialog before executing.
# The action calls pushUndo() first so it can be undone with Ctrl+Z.

# ============================================================
# SECTION 30: POPUP EDITOR OVERLAYS (Combo & Behavior)
# ============================================================
# Ref. Lines ~2570-2632 (JS functions) and ~602-645 (HTML) in code
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
#     openComboEditor(idx) â€” populates fields from combos[idx], renders tags and mini-kb
#     closeComboEditor() â€” hides overlay, resets comboEditorIndex
#     ceditRenderLayerTags(str) â€” builds tag HTML from space-separated layer string
#     ceditGetLayers() â€” reads tags back into space-separated string
#     ceditRenderMiniKb() â€” renders keyboard SVG in popup using ceditSelectedPositions[]
#   Save writes all fields back to combos[comboEditorIndex] and calls rgbRenderAll().
#
# BEHAVIOR EDITOR POPUP:
#   Triggered by clicking "Edit" on a behavior row in renderBehaviorList().
#   Opens #behaviorEditorOverlay with fields:
#     - beditName: behavior node name
#     - beditLabel: display label
#     - beditMacro: dropdown for macro reference (populated by macroRefOptionsHTML)
#   Functions:
#     openBehaviorEditor(idx) â€” populates fields from behaviors[idx]
#     closeBehaviorEditor() â€” hides overlay
#   Save writes fields back and calls rgbRenderAll().
#
# SHARED CSS: Both use .editor-overlay (fixed backdrop) and .editor-dialog
#   (centered modal with theme variables). Animations: fadeIn on overlay,
#   slideUp on dialog.

# ============================================================
# SECTION 31: RGB OUTPUT STRUCTURE (/ { ... }; wrapper)
# ============================================================
# Ref. Lines ~3047-3127 in updateRgbOutput() in code
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
# SECTION 32: LAYOUT SWITCH #INCLUDE UPDATE
# ============================================================
# Ref. Lines ~7461-7486 in DOMContentLoaded in code
#
# When the user clicks "Use Corne" or "Use Lotus58" layout buttons,
# the handlers now also update keymapParsedIncludes[] by regex-replacing
# the dtsi filename (e.g., corne-rgb.dtsi <-> lotus58-rgb.dtsi).
# Then updateKeymapOutput() is called to regenerate with correct path.

# ============================================================
# SECTION 33: KEYMAP EDITOR POPUP OVERLAYS
# ============================================================
# Ref. Lines ~987-1257 (HTML) and ~7734-8034 (JS handlers) in code
#
# All keymap tab editors (combo, macro, behavior, conditional layers)
# now use popup overlay dialogs instead of inline collapsible panels.
#
# PATTERN:
#   Each editor follows the same CSS/HTML pattern:
#     .km-popup-overlay â€” fixed backdrop covering the viewport (z-index 300)
#     .km-popup-dialog â€” centered modal card (themed, rounded, shadowed)
#     .km-popup-header â€” title bar with section icon + close (Ã—) button
#     .km-popup-body â€” scrollable content area with form fields
#     .km-popup-footer â€” action bar with Save + Cancel buttons
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
#   Close: kmComboCancelBtn, kmComboCancelBtn2, backdrop click â†’ closeComboOverlay().
#
# MACRO EDITOR POPUP (#kmMacroOverlay):
#   Fields: Name, Label, Params dropdown, Wait/Tap timing, step search,
#   step list (editable), + Add Step, + String Sequence buttons.
#   Width: 600px (wider to accommodate step list).
#   Opened by: kmAddMacroBtn click (new macro) or Edit button on macro list.
#   Save: kmMacroSaveBtn writes to keymapMacros[editingMacroIndex].
#   Close: closeMacroOverlay() â€” also reverts add if macroAddedViaButton.
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
#     - kmComboLayerOptionsHTML() â€” builds <option> list from keymapLayers[].
#     - kmComboRenderLayerTags(layersStr) â€” renders layer indices as tag chips.
#     - kmComboGetLayers() â€” reads tag text content back to space-separated string.
#   Picker onchange adds layer (no duplicates), tag Ã— click removes it.
#   Reuses existing .layer-tags / .layer-tag / .tag-x CSS.
#
# BINDING SELECT DROPDOWNS & BINDING PICKER POPUP:
#   Behavior config binding fields and the combo binding field use a
#   binding picker popup system instead of plain <select> dropdowns.
#   A trigger button (.bp-trigger) with class "beh-binding-wrap" opens
#   a full-screen popup overlay (#bindingPickerOverlay) where the user
#   can browse categorized bindings, search keycodes, or type raw code.
#
#   CSS (Ref. Lines ~274-278 for .beh-binding-wrap, ~279-311 for .bp-* in code):
#     .beh-binding-wrap â€” inline-flex column wrapper with trigger button
#     .bp-overlay â€” fixed full-screen backdrop (z-index 400)
#     .bp-dialog â€” centered modal (540px, themed, rounded, shadowed)
#     .bp-header â€” title bar with close button
#     .bp-body â€” scrollable content with collapsible sections
#     .bp-section / .bp-section-grid â€” category headers + button grids
#     .bp-btn â€” individual binding choice buttons
#     .bp-raw-row â€” "Or type raw code" input at the bottom
#
#   HTML popup (Ref. Line 848 in code):
#     #bindingPickerOverlay contains a .bp-dialog with:
#       - #bpTitle (header), #bpCloseBtn (dismiss)
#       - #bpSections (main categorized binding list)
#       - #bpSubPanel (keycode sub-panel with search, shown for &kp etc.)
#       - #bpRawRow (raw code text input + Apply button)
#
#   Binding picker functions (Ref. Lines ~4864-5032 in code):
#
#     openBindingPicker(targetId, optType) â€” (line 4909)
#       Opens the picker popup. Sets bpTargetId to the caller's element id.
#       Calls renderBindingPickerSections() to populate the category grid.
#       optType = 'binding' (default) or 'mods' for modifier selection.
#
#     closeBindingPicker() â€” (line 4923)
#       Hides the popup overlay. Resets bpTargetId.
#
#     selectBindingPickerValue(val) â€” (line 4928)
#       Called when the user clicks a binding button. Writes the chosen
#       value into the target element identified by bpTargetId, then
#       closes the picker. For trigger buttons, updates the displayed text.
#
#     renderBindingPickerSections() â€” (line 4940)
#       Builds the categorized binding list inside #bpSections.
#       Categories: Complete Bindings (0-param like &trans, &none, &gresc),
#       Layer Actions (&mo, &tog, &to, &sl with layer names/numbers),
#       Behaviors needing params (clickable â†’ opens sub-panel for keycodes),
#       Custom Behaviors, Macros.
#       Each section is collapsible (click title to expand/collapse).
#
#     showBindingPickerSubPanel(prefix) â€” (line 5015)
#       Switches from the main sections view to a keycode search panel.
#       Shows a search bar + keycode grid for the given behavior prefix
#       (e.g., "&kp"). Clicking a keycode button calls selectBindingPickerValue
#       with the full binding string (e.g., "&kp A").
#
#     hideBindingPickerSubPanel() â€” (line 5047)
#       Returns from the keycode sub-panel to the main sections view.
#
#     populatePickerKeycodeGrids(container) â€” (line 5054)
#       Fills the sub-panel's keycode grid using ZMK_KEYCODES data.
#       Creates clickable buttons organized by category. Also appends
#       special action lists (BT_ACTIONS, RGB_ACTIONS, etc.) when the
#       behavior prefix requires them.
#
#   Remaining helper functions (Ref. Lines ~5033-5065 in code):
#
#     bindingSelectHTML(id, selected, optType, width) â€” (line 5078)
#       Returns HTML for a .bp-trigger button that opens the picker.
#       Displays the current binding value; clicking calls openBindingPicker().
#
#     getBehBindingValue(id) â€” (line 5092)
#       Reads the effective value from a trigger button's data-value attribute
#       or falls back to its text content.
#
#     setBehBindingValue(id, val) â€” (line 5098)
#       Sets the trigger button's data-value and displayed text.
#       Used by edit handlers when populating forms.
#
#   Event wiring (Ref. Lines ~6496-6510 in DOMContentLoaded):
#     - Backdrop click on #bindingPickerOverlay â†’ closeBindingPicker()
#     - #bpCloseBtn click â†’ closeBindingPicker()
#     - #bpSubBack click â†’ hideBindingPickerSubPanel()
#     - #bpRawApply click â†’ selectBindingPickerValue(raw input value)
#     - #bpKcSearch input â†’ filters keycode buttons in sub-panel
#     - #bpKcSearchClear â†’ clears search
#
#   Fields using the picker (in showBehaviorConfig, Ref. Line 5089):
#     Binding type triggers: kmBehHoldBinding, kmBehTapBinding, kmBehMmNormal,
#       kmBehMmMorphed, kmBehSkBinding, kmBehSensorCW, kmBehSensorCCW.
#     Modifier type triggers: kmBehMmMods, kmBehCwMods.
#     Combo binding: kmComboBind (inside #kmComboBindWrap container, line 848).
#   Fields kept as plain text inputs (complex syntax):
#     kmBehTdBindings (tap-dance), kmBehMacroBindings (macro),
#     kmBehCwContinueList (caps-word continue list).
#
#   Positional Hold Mini Keyboard (Ref. Lines ~4310-4352):
#     The hold-tap "hold-trigger-key-positions" field uses a visual SVG
#     mini keyboard picker (same pattern as combo position picker).
#     Global: behPositionalSelectedPositions[] (line 4362) holds selected position indices.
#     renderBehPositionalMiniKb() (line 4363) renders the SVG in #behPositionalMiniKb,
#     syncs the hidden #kmBehHoldTriggerPositions input.
#     Click handler via event delegation on #kmBehaviorConfig.

# ============================================================
# SECTION 34: BINDING PICKER POPUP (visual binding chooser)
# ============================================================
# Ref. Lines 4909-5077 (JS), 850-879 (HTML), 279-313 (CSS) in code
#
# The binding picker is a modal popup that replaces the old
# behBindingOptionsHTML() <select> approach. Instead of a dropdown,
# clicking a binding trigger button opens a categorized visual browser.
#
# ARCHITECTURE:
#   The picker uses a three-layer architecture:
#   1. Trigger button (.bp-trigger) â€” displays current value, clickable
#   2. Popup overlay (#bindingPickerOverlay) â€” modal with sections
#   3. Sub-panel (#bpSubPanel) â€” keycode search grid for multi-param behaviors
#
# USER FLOW:
#   1. User clicks a trigger button (e.g., Hold Binding in behavior editor)
#   2. openBindingPicker(targetId, optType) opens the popup
#   3. renderBindingPickerSections() builds categorized binding list:
#      - "Complete Bindings" â€” zero-param behaviors (&trans, &none, &gresc, etc.)
#      - "Layer Actions" â€” grouped by behavior (&mo, &tog, &to, &sl) with
#        per-layer buttons showing layer name + number
#      - "Behaviors (pick keycode)" â€” multi-param behaviors (&kp, &mt, etc.)
#        that open a keycode sub-panel on click
#      - "Custom Behaviors" â€” user-defined behaviors from keymapBehaviors
#      - "Macros" â€” user-defined macros from keymapMacros
#   4. User clicks a binding â†’ selectBindingPickerValue(val) writes it back
#   5. OR user clicks a multi-param behavior â†’ showBindingPickerSubPanel(prefix)
#      opens a keycode search grid (populatePickerKeycodeGrids)
#   6. OR user types raw code in #bpRawInput â†’ clicks Apply
#
# GLOBAL STATE:
#   bpTargetId â€” the id of the trigger button that opened the picker
#   bpOptType â€” 'binding' or 'mods' (determines what sections show)
#
# kcDescs (line 3990):
#   A global lookup table extracted from populateKeycodeGrids() that maps
#   keycode names to human-readable descriptions (e.g., 'A' â†’ 'Letter A').
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
