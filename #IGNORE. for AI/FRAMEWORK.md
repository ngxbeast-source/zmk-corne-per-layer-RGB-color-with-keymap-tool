# Folder Update Framework
# ========================
# This file describes the process for updating the reference files in
# `#IGNORE. for AI/` after code changes to `RGB_Code_Helper.html`.
#
# AI AGENT: Read this file FIRST when asked to "update the folder",
# "adjust references", or "update folder accordingly to end the session".

# ============================================================
# STEP 0: RUN THE LINE EXTRACTOR
# ============================================================
# Before doing ANYTHING, run the PowerShell extractor script:
#
#   powershell -ExecutionPolicy Bypass -File "#IGNORE. for AI\_extract_lines.ps1"
#
# (If Node.js is available, `node "#IGNORE. for AI/_extract_lines.js"` also works.)
#
# This prints every landmark line number in RGB_Code_Helper.html:
#   - Structural tags (<style>, <body>, <script>, </html>)
#   - All global var declarations
#   - All named constants (DEFAULT_CORNE_LAYOUT, ZMK_KEYCODES, etc.)
#   - All 150+ function declarations with exact line numbers
#   - DOMContentLoaded event handler
#   - Section range estimates (S2-S25) ready for RefDoc updates
#
# SAVE THIS OUTPUT — you will reference it in every subsequent step.

# ============================================================
# STEP 1: UPDATE CHANGELOG.md
# ============================================================
# File: #IGNORE. for AI/CHANGELOG.md
#
# Add a new session entry at the TOP of the changelog (newest first).
# Format:
#
#   ## YYYY-MM-DD (Session N)
#   - Brief description of change 1
#   - Brief description of change 2
#   ...
#
# Tips:
#   - Each bullet should be one sentence describing what was added/changed/fixed.
#   - Group related changes together.
#   - Mention new functions/features by name.
#   - Note any CSS additions or HTML structure changes.

# ============================================================
# STEP 2: UPDATE RefDoc LINE REFERENCES
# ============================================================
# File: #IGNORE. for AI/RGB_Code_Helper_RefDoc.md
#
# The RefDoc has line number cross-references in these forms:
#   "Ref. Lines XXXX-YYYY in code"
#   "(line XXXX)"
#   "lines XXXX-YYYY"
#
# WORKFLOW:
#   a. Use the extractor output from Step 0 as the source of truth.
#   b. Read the RefDoc and compare each "Ref. Line" / "(line ...)" reference
#      against the extractor output.
#   c. Use multi_replace_string_in_file to batch-update all stale references.
#
# WHAT TO UPDATE:
#   1. Section header "Ref. Lines" — the range at the top of each section.
#      Use the SECTION RANGES output from the extractor for these.
#
#   2. Individual "(line XXXX)" refs inside section text — match function/var
#      names to their line numbers from the extractor's FUNCTIONS and
#      CONSTANTS sections.
#
#   3. Internal cross-references — lines like "see Section 22 (line 640 in this doc)".
#      After updating section content, re-check RefDoc section header positions:
#        Select-String -Path "...\RGB_Code_Helper_RefDoc.md" -Pattern "^# SECTION \d+" |
#          ForEach-Object { "$($_.LineNumber): $($_.Line)" }
#      Then update the TABLE OF CONTENTS and any "in this doc" references.
#
#   4. The intro example line — line ~13 has a sample like "Ref. Line 974 in code".
#      Update to match the current `var layers` line.
#
# SECTION ↔ FUNCTION MAPPING (which functions belong to which RefDoc section):
#   S2  File Structure     → structural tags only (no functions)
#   S3  Global Data        → var declarations (layers..UNDO_LIMIT)
#   S4  Undo/Redo          → snapshotState, restoreState, pushUndo, fullRender,
#                             performUndo, performRedo
#   S5  Layouts            → DEFAULT_CORNE_LAYOUT, DEFAULT_LOTUS58_LAYOUT, loadLayout ref
#   S6  Keycodes           → ZMK_KEYCODES, ZMK_BEHAVIORS, BT_ACTIONS, MOUSE_BUTTONS
#   S7  Colors             → hsbToHex, hasHsbVal, baseKey, esc
#   S8  HSB Picker         → ensureHsbPicker, openHsbPicker
#   S9  RGB Helpers        → layerOptionsHTML, colorOptionsHTML, macroRefOptionsHTML,
#                             updateHeaderDropdowns
#   S10 Parser             → parseUserCode, colorRe
#   S11 RGB Rendering      → rgbRenderAll, renderLayerList, renderMacroList,
#                             openComboEditor, openBehaviorEditor, renderComboList,
#                             renderBehaviorList, renderBlinkMacroList, updateHeaderDropdowns
#   S12 RGB Output         → updateRgbOutput
#   S13 SVG                → loadLayout, renderKeyboardSvg
#   S14 Binding Labels     → bindingToLabels, simplifyKeycode, simplifyMod, getLayerLabel
#   S15 Keymap Parser      → parseKeymap
#   S16 Layer Tabs         → renderLayerTabs, updateLayerHeader, showLayerContextMenu,
#                             handleCtxAction
#   S17 Binding Editor     → populateKeycodeGrids, populateBehaviorDropdown,
#                             showBindingEditor, updateBindingEditorFields,
#                             applyBinding, cancelBindingEditor
#   S18 Combo/Macro/Beh    → renderComboMiniKb, renderKeymapComboList, renderKeymapMacroList,
#                             renderParamControl, updateMacroBindingStep, openMacroKcSearch,
#                             renderKeymapBehaviorList, renderBuiltinBehaviorToggles,
#                             toggleBuiltinBehavior, showBehaviorConfig,
#                             behBindingOptionsHTML, bindingSelectHTML,
#                             getBehBindingValue, setBehBindingValue,
#                             behPositionalSelectedPositions, renderBehPositionalMiniKb
#   S19 Quick-Assign       → QA_KEYBOARD_MAP, openQuickAssign
#   S20 Keymap Output      → updateKeymapOutput
#   S21 Beh Code Gen       → generateBehaviorCode
#   S22 Cross-Tab Sync     → syncCrossTabData, syncRgbToKeymap
#   S23 Value Picker       → openValuePicker, closeValuePicker
#   S24 Tab/DarkMode       → switchTab, toggleDarkMode, loadTheme
#   S25 DOMContentLoaded   → DOMContentLoaded listener
#   S26 Layer Ordering     → (references syncCrossTabData, updateRgbOutput, layerOptionsHTML)
#   S27 Macro Params       → renderParamControl, updateMacroBindingStep, openMacroKcSearch
#   S28 Comment Preserv.   → (ranges within parseUserCode and updateRgbOutput)
#   S29 Clear Layer        → (ranges within showLayerContextMenu and handleCtxAction)
#   S30 Popup Editors RGB  → openComboEditor, openBehaviorEditor
#   S31 RGB Output Struct. → (range within updateRgbOutput)
#   S32 Layout Switch      → (range within DOMContentLoaded)
#   S33 Keymap Popups      → (HTML range + DOMContentLoaded JS handlers)
#   S34 Binding Selects    → behBindingOptionsHTML, bindingSelectHTML, getBehBindingValue,
#                             setBehBindingValue, CSS range, showBehaviorConfig

# ============================================================
# STEP 3: UPDATE RefDoc CONTENT (if needed)
# ============================================================
# If the session added new features or changed existing behavior:
#   - Add a new SECTION at the end of the RefDoc, OR
#   - Update the relevant existing section text.
#
# When adding a new section:
#   1. Number it as the next available (e.g., Section 34, 35...).
#   2. Add a TABLE OF CONTENTS entry.
#   3. Include "Ref. Lines" at the top with the code range.
#   4. Explain what the feature does in plain language (RefDoc audience
#      is someone learning JS/HTML for the first time).

# ============================================================
# STEP 4: UPDATE _code.txt SNAPSHOT
# ============================================================
# File: #IGNORE. for AI/_code.txt
#
# This is a plain-text copy of the JS section from RGB_Code_Helper.html.
# Extract the content between <script> and </script> tags:
#
#   $html = Get-Content ..\RGB_Code_Helper.html -Raw
#   $start = $html.IndexOf('<script>') + '<script>'.Length
#   $end = $html.IndexOf('</script>')
#   $html.Substring($start, $end - $start).Trim() | Set-Content _code.txt -Encoding UTF8
#
# Or simply read the file and copy the JS section.
# This file is used as a quick-reference snapshot for AI context.

# ============================================================
# STEP 5: UPDATE _check.js COMMENTS (if needed)
# ============================================================
# File: #IGNORE. for AI/_check.js
#
# This file has inline comments like "More on this code can be found in
# 'RefDoc' line XXX". If RefDoc section positions changed, update those
# line references too. Search for "RefDoc' line" in _check.js.

# ============================================================
# STEP 6: VERIFY
# ============================================================
# After all updates:
#   1. Re-run the line extractor to confirm no drift.
#   2. Spot-check 3-5 RefDoc references against the extractor output.
#   3. Verify the TABLE OF CONTENTS matches actual section positions:
#        Select-String -Path "...\RGB_Code_Helper_RefDoc.md" -Pattern "^# SECTION \d+"
#   4. Confirm _code.txt matches the current <script> content.

# ============================================================
# ADDING NEW LANDMARKS TO THE EXTRACTOR
# ============================================================
# If a session adds new global vars, constants, or the RefDoc starts
# referencing new landmarks:
#   - For global vars: add the pattern to the $gvars array in _extract_lines.ps1
#   - For constants:   add the pattern to the $consts array
#   - Functions are auto-discovered (regex matches all `function X(` declarations)
#   - For new section ranges: add an entry to the $ranges ordered hashtable
#
# The Node.js version (_extract_lines.js) has parallel arrays — update both
# if Node.js support is needed.
