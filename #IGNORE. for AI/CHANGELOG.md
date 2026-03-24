# Project Change Log

This changelog combines:
- Git commit history available in this repo (sampled from the oldest currently visible commits up to now)
- Session memory from this workspace (design notes, bug hunts, and fix rounds)

Coverage note: this reflects everything I can reliably reconstruct from available history and session context.

## 2026-03-18 - Firmware and Layer Foundation Phase

### Major additions
- Added/iterated custom game-layer functionality and Game2 sublayer LED toggles.
- Added RGB hold-tap support for blink-test style functionality.
- Added blink helper support in the blank DTSI path.
- Continued expanding keymap layer definitions and behavior experiments.

### Minor/maintenance changes
- Multiple rapid syntax and typo fixes in keymap and macros.
- Several quick corrective commits (small binding/content corrections).
- README wording/grammar cleanups.

## 2026-03-19 - Tool Bootstrap

### Major additions
- First AI-generated HTML tool scaffold added to the repo.
- Initial direction established for an in-browser helper/generator workflow.

### Minor/maintenance changes
- Early warning that bootstrap version may contain bugs.

## 2026-03-20 - RGB_Code_Helper Expansion (Biggest Feature Wave)

### Major additions
- Introduced the new AI-constructed RGB Layer Helper and in-progress Keymap Editor.
- Evolved into a two-tab architecture:
  - RGB Generator tab (.dtsi parse/edit/generate)
  - Keymap Editor tab (.keymap parse/edit/generate)
- Added broad ZMK behavior handling across parse/edit/output flows, including:
  - hold-tap advanced options
  - sticky-key advanced options
  - key-toggle
  - caps-word
- Added full keymap data domains:
  - combos
  - macros
  - behaviors
  - conditional layers
  - sensor bindings
- Added cross-tab sync model for RGB <-> Keymap data and tagging of synced sources.
- Added native behavior parsing from DTSI and filtering logic to avoid duplicate output.
- Added Lotus58 default layout support in addition to Corne.

### Major UX additions
- Value picker and keyboard-driven editing flow improvements.
- Quick-assign support and binding shortcuts.
- Layer management enhancements (tabs, rename/customize, ordering operations).
- Layer color indicators and active-layer output highlighting.
- Output generation improvements for alignment/readability and include preservation.

### Major reliability additions
- Undo/redo system overhaul:
  - full-state snapshot/restore approach
  - broader mutation coverage
  - full UI re-render after state restore
  - fixed keyboard shortcut wiring and button handlers

### Minor/maintenance changes
- README/tool-picture updates.
- Streamlining passes and small index/syntax corrections.
- Cleanup/removal of obsolete files.

## 2026-03-22 (Session 3) - Devicetree Merge, Combo Layers Picker, Snapshot Fixes, Built-in Behaviors

### Major additions — Helper Macro Renames (Code Size Optimization)
- **`MOMENTARY_RGB_MACRO`** → **`MO_RGB`**: Renamed in dtsi helper definition, all macro call sites, and HTML tool (parser regex, output generation, UI type selects, type checks).
- **`TO_RGB_MACRO`** → **`TO_RGB`**: Same scope of changes.
- **`TO_RGB_PRESS_MACRO`** → **`TO_RGB_PRESS`**: Same scope of changes.
- **`RGB_HOLD_TAP`** → **`RGB_HT`**: Renamed in dtsi helper definition, all behavior call sites, and HTML tool (parser regex, output line, helper template, skip-check comment, sync comment).
- **`COMBO`** → **`C`**: Renamed in dtsi helper definition, all combo call sites, and HTML tool (parser regex, output line, helper template).
- Applied consistently across corne-rgb.dtsi and RGB_Code_Helper.html (parser, output gen, helper templates, HTML selects, DOMContentLoaded handlers).

### Helper Rename — Layer Prefix Shortening
- **`LAYER_`** → **`L_`**: Shortened the layer `#define` prefix in generated output (e.g., `#define L_ABC 0` instead of `#define LAYER_ABC 0`). Updated parser regex, `baseKey()` helper, output generation, keymap sync matching, and input placeholder across RGB_Code_Helper.html. RefDoc updated.

### Rename — hold_tap_ → RGB_ht_
- **Behavior node prefix rename**: All `hold_tap_*` behavior references renamed to `RGB_ht_*` across corne.keymap (7 binding references: `&hold_tap_nmrw` → `&RGB_ht_nmrw`, etc.) and HTML tool (placeholder text, output comment).

### Major additions — Auto-Prefix for Macro Node Names
- **`autoPrefix(name, type)` function**: Automatically prepends `to_` for TO_RGB macros and `top_` for TO_RGB_PRESS macros when adding or saving macros. Matches the dtsi naming convention where toggled macros use these prefixes.
- **Dynamic placeholder text**: Macro name placeholder updates based on selected type (`to_name`, `top_name`, `name_led`, `name_blink`).
- Applied in both `addMacro()` and `meditSaveBtn.onclick` save handler.

### Major additions — MO_BLINK Experimental Helper
- **New `MO_BLINK` helper `#define`**: Wraps `macro_press &mo layer BLINK_SEQ(color, return, wait)` + `macro_pause_for_release` + `macro_release &mo layer` into a single-line helper call. Added to corne-rgb.dtsi and as `HELPER_MO_BLINK` JS constant in the HTML tool.
- **`MO_BLINK ⚠` type option**: Added to both add form and edit overlay `<select>` dropdowns (marked experimental with ⚠).
- **Blink-specific UI fields**: `macroBlinkColor`, `macroBlinkReturn`, `macroBlinkWait` in add form; `meditBlinkColor`, `meditBlinkReturn`, `meditBlinkWait` in edit overlay. Fields show/hide based on type selection.
- **Parser**: Regex updated to match `MO_BLINK(...)` calls. Extracts `blinkColor`, `returnColor`, `wait` parameters.
- **Output**: `HELPER_MO_BLINK` emitted conditionally when MO_BLINK macros exist. Macro lines output as `MO_BLINK(name, "label", layer, blinkColor, returnColor, wait)`.
- **Render**: Shows `MO_BLINK ⚠` type label with blink-specific info (B: R: W:) in macro list.
- **`f_blink` converted**: In corne-rgb.dtsi, raw `ZMK_MACRO(f_blink, ...)` replaced with `MO_BLINK(f_blink, "F KEYS BLINK", FKEYS, F_BLINK_ON, RGB_NMRW, 80)`.

### Bug fixes — Layer Color Parsing and L_ Prefix Output
- **Colors not parsed in fallback path**: When layers lack `L_` prefix (e.g., `#define ABC 0`), the fallback layer parser's color lookup only checked `colorValueMap[m[1]]` (e.g., `colorValueMap["ABC"]`). Since colors are stored as `colorValueMap["RGB_ABC"]`, the lookup failed and no colors were matched. Fixed by adding `colorValueMap['RGB_' + m[1]]` fallback, matching the primary parser's behavior.
- **`L_` prefix incorrectly forced in output**: The layer output code (`var name = l.name.startsWith('L_') ? l.name : 'L_' + l.bk`) forced an `L_` prefix on layer names that didn't have one, producing `#define L_ABC 0` instead of `#define ABC 0`. Fixed to use `l.name` directly, preserving the original layer name as parsed.

### Bug fixes — Combo Double-Comma Output
- **Combo positions had double commas in output**: When parsing `C(name, bind, 4, 3, LAYERS)`, positions were stored as `"4, 3"` (with comma). The output then ran `pos.replace(/\s+/g, ', ')` which replaced the space after the comma, producing `"4,, 3"`. Fixed by storing positions space-separated (`"4 3"`) during parsing, so the output replace correctly produces `"4, 3"`.

### Major additions — Built-in Behaviors (Toggleable Presets)
- **New "Built-in Behaviors" section** in the Keymap Editor tab with checkbox toggles for 7 preset ZMK behaviors:
  - `&hm` — Homerow Mod (tap-preferred hold-tap with global-quick-tap, 200ms tapping term, 180ms quick-tap)
  - `&hml` — Timeless Homerow Mod Left (balanced, 280ms, require-prior-idle 150ms, positional hold-trigger-on-release)
  - `&hmr` — Timeless Homerow Mod Right (mirror of hml)
  - `&as` — Autoshift (tap-preferred, 135ms, quick-tap 0). Emits `#define AS(keycode) &as LS(keycode) keycode`
  - `&mo_tog` — Momentary-hold / Toggle-tap (hold-preferred, 200ms). Emits `#define MO_TOG(layer) &mo_tog layer layer`
  - `&td0` — Tap-Dance Example (200ms, `<&kp LSFT>, <&kp CAPS>`)
- **Toggle on/off**: When enabled, the behavior is added to `keymapBehaviors` with `_builtin` and `_fromEditor` flags. When disabled, it's removed. Dedup logic prevents clashes with parsed behaviors of the same name.
- **#define macros**: Autoshift and mo_tog presets output their `#define` helper macros after the `#include` block in the generated .keymap.
- **Binding dropdown**: Built-in behaviors appear with `(built-in)` tag instead of `(custom)`.
- **Behavior list**: Built-in behaviors are shown only in their own toggle section; hidden from the main behavior editor list.
- **`BUILTIN_BEHAVIORS` constant** (line 1317): Array of preset templates with id, name, type, label, config, desc, and optional `define` strings.
- **New functions**: `renderBuiltinBehaviorToggles()` (line 4075), `toggleBuiltinBehavior()` (line 4092).
- **Toggle sync**: Checkboxes sync after `parseKeymap()`, undo/redo (`fullRender()`), and initial page load.

### Major additions — globalQuickTap Support
- **Parser**: `parseKeymap()` now detects `global-quick-tap;` in hold-tap behavior blocks and stores it in `config.globalQuickTap`.
- **Editor**: Added "Global Quick Tap (deprecated)" checkbox to the hold-tap config panel in `showBehaviorConfig()`.
- **Output**: `generateBehaviorCode()` emits `global-quick-tap;` when enabled.
- **Save/Edit/Snapshot**: `globalQuickTap` preserved through save handler, edit handler, and undo/redo snapshots.

### Major additions (earlier in session)
- **Devicetree merge for editor-only items**: When a parsed .keymap has raw pre-keymap blocks (combos, behaviors, macros), new items created in the editor are now **merged INTO the existing devicetree sections** instead of being appended as separate `/ { ... };` blocks. If no existing section is found, a new block is created as before.
- **RGB combo layers picker**: The "Layers" input in the RGB combo section (both the header form and each inline combo row) now has a `+` dropdown that lists all available layers. Selecting a layer appends it to the text field (deduped).

### Improvements
- **Combo merge newline formatting**: Merged combos/behaviors/macros in keymap output now start on a new line after the previous block's closing `};` instead of appearing on the same line.
- **COMBO() output comma-separated positions**: RGB output `COMBO()` macro now formats positions as `4, 20` instead of `4 20`.
- **RGB combo limited to 2 key positions**: The mini-keyboard position picker for RGB combos now enforces a maximum of 2 key presses per combo.
- **RGB combo layers picker redesigned**: Replaced the text input + tiny `+` dropdown with a full-width "Add layer" dropdown and removable layer tag chips. Both the header form and inline combo rows use the new tag-based UI.

### Bug fixes
- **`_fromEditor` flag lost through undo/redo**: `snapshotState()` and `restoreState()` were not preserving `_fromEditor`, `slowRelease`, or `requirePriorIdle` on combos, nor `_fromEditor` on macros and behaviors. This caused editor-created items to lose their flag after undo/redo, making them invisible in the output when `keymapParsedRawBlocks` was set (which filters by `_fromEditor`). All three properties are now preserved in snapshots.
- **Cross-tab sync combo output loss**: When switching between tabs, combos created in the keymap editor would sometimes disappear from the output. Root cause was `_fromEditor` not surviving undo/redo cycles plus duplicate devicetree blocks causing visual confusion. Both underlying issues are now fixed.
- **Devicetree merge regex inserting at wrong position**: The merge regex `(    \};)` matched as a substring within deeper-indented `        };` (8-space inner combo/behavior closings), causing new items to be injected inside the last existing block rather than at the section level. Fixed by anchoring to `(\n    \};)` (newline + 4-space indent) so only the section-level closing is matched.
- **Duplicate behaviors in keymap editor UI**: `parseKeymap()` behavior/combo parsing pushed items without checking for existing names, causing duplicates when items were restored from cross-tab sync data before re-parsing the same text. Added name-based dedup checks to both behavior and combo push paths.

## 2026-03-21 (Session 2) - Macro Editor, Sync Architecture, Comments & Clear Layer

### Major additions — Macro Binding Editor
- Universal binding editor for macro steps: replaced simplistic `kp_tap` type with a `binding` type that lets you pick any ZMK behavior as a macro step.
- Context-aware parameter controls via `renderParamControl()`:
  - Layer behaviors (`&to`, `&mo`, `&tog`, `&sl`) → layer dropdown populated from `keymapLayers`
  - `&lt` → layer dropdown + keycode input with search
  - `&kp`, `&sk`, `&kt` → keycode input with floating search picker
  - `&bt` → BT_ACTIONS dropdown, `&out` → OUT_ACTIONS dropdown
  - Mouse behaviors → direction/button dropdowns
  - Unknown behaviors → generic text inputs with search fallback
- New helper function `updateMacroBindingStep()` reads param1/param2 from DOM and saves to the macro step.
- `openMacroKcSearch()` now accepts `targetAttr` parameter for targeting specific step params.
- Macro nesting support: macros selectable as step bindings (one macro can call another).

### Major additions — Clear Layer Feature
- Added "Clear Layer → &trans" and "Clear Layer → &none" options to the layer context menu.
- Replaces ALL key bindings in the active layer with the chosen value, with a confirmation dialog.

### Major additions — Comment Preservation in .dtsi Round-Trip
- Color define comments now preserved: inline comments like `/* BASE - Dim Yellow */` from `#define RGB_ABC RGB_COLOR_HSB(...)` lines are parsed, stored in `colorLabelMap`, displayed in the Label field, and re-emitted in the generated output.
- Macro section comments preserved: `//` and `/* */` comment lines preceding macro calls (e.g., `// Momentary Layers`, `//TOGGLED Layers`) are parsed, stored on macro objects as a `comment` property, and emitted in the generated output before each macro group.
- Original macro labels preserved: the second argument of macro calls (e.g., `"GameLayer LED Macro"`) is now stored as a `label` property and used in the output instead of falling back to the node name.
- Orphan color defines (blink helpers) also emit their labels as inline comments.

### Major architecture change — Cross-Tab Sync Redesign
- `syncRgbToKeymap()` now syncs ALL RGB data (macros, blink macros, behaviors, combos) into the keymap editor with `_fromRgb: true` flag. This lets users select RGB macros/behaviors as key bindings in the keymap editor.
- RGB items appear in the keymap editor's binding dropdowns and value picker but are **excluded from the .keymap output** (filtered by `_fromRgb` in output generation). They live in the .dtsi file.
- `_fromRgb` flag tracked through undo/redo snapshots, parseKeymap save/restore, and output filters.
- Clear Sync button removes `_fromRgb` macros, behaviors, and combos plus `_fromDtsi` behaviors.
- dtsi-native behaviors (hm, ltq, td_numcaps) still sync with `_fromDtsi` flag.

### Bug fixes
- Fixed `esc()` HTML entity mismatch in macro step editor: custom behaviors/macros used `'&' + esc(name)` creating `&amp;` vs `esc('&' + name)` causing selection failures. Fixed by using `esc(ref)` where `ref = '&' + name` consistently.
- Fixed duplicate layer sync bug: `parseUserCode()` restoration logic only checked layer names via `baseKey()`, not indexes. Added index-based dedup check (`parsedIndexes` map) matching `syncCrossTabData()`'s approach, preventing layers like `LAYER_GTGL` (index 8) and `LAYER_GAMETGL` (index 8) from both appearing.
- Fixed color label auto-populate bug: the `colorRe` regex used `\s*` after `RGB_COLOR_HSB(...)` which matched newlines, causing section header comments (e.g., `/* ---- HELPER DEFINITIONS ---- */`) from the next line to be captured as inline labels. Changed `\s*` to `[^\S\n]*` (horizontal whitespace only) to prevent cross-line matching.
- Fixed scroll bleed between tabs: added `html, body { height: 100%; overflow: hidden; }` so the document body never scrolls. Each tab panel's internal regions (`.editor-panel`, `.km-center`) handle their own scrolling via `overflow-y: auto`, keeping scroll contained within the active tab.
- Fixed helper `#define` templates falsely parsed as actual macros/behaviors/combos: when pasting code containing multi-line `#define` helper templates (e.g., `MOMENTARY_RGB_MACRO(node_name, ...)`, `RGB_HOLD_TAP(...)`, `COMBO(...)`), the parser's regexes would match the template parameter lists as if they were real instantiations. Fixed by stripping multi-line `#define` blocks (lines ending with `\`) into a `codeNoHelpers` variable before running macro/behavior/combo/blink regexes. Single-line `#define`s (layers, colors) are unaffected.

### Minor/maintenance changes
- RGB auto-labels removed from layer output (no longer auto-generate labels from layer names).
- Keymap behaviors and combos no longer leak into RGB output scope.

## 2026-03-21 - Stabilization, Documentation, and Regression Fixes

### Major additions
- Added comprehensive in-file guide comments throughout RGB_Code_Helper.
- Added companion reference manual:
  - RGB_Code_Helper_RefDoc.md
  - section-by-section mapping and deep explanation references

### Major behavior/output changes
- Layer ordering normalization added in multiple code paths so layers consistently appear in sequential index order across:
  - cross-tab merge/sync paths
  - layer option lists
  - generated output ordering

### Major bug fixes (runtime and wiring)
- Fixed combo edit flow regressions:
  - removed invalid/undefined helper call paths
  - corrected wrong editor element references
  - restored mini-keyboard position state restoration logic
- Fixed combo save payload omissions:
  - added slowRelease persistence
  - added requirePriorIdle persistence
- Wired previously missing combo cancel handler.

### Critical parser/runtime recovery
- Fixed a severe regression where a flattened guide-comment line swallowed the parseKeymap function declaration.
- Restored correct multi-line comment formatting above parseKeymap.
- Added missing closing brace for parseKeymap to restore script structural integrity.
- Result: dark mode, tab switching, and button wiring resumed execution after script parse recovery.

### Minor/maintenance changes
- Multiple corruption-recovery utility scripts created during emergency repair work (stored under `#IGNORE. for AI` Folder).
- Additional validation helpers added (_check.js, _validate.js, _code.txt snapshots) to support troubleshooting.

## Ongoing Notes

### Major themes across updates
- Project moved from static config editing to a full browser-based ZMK authoring workflow.
- Largest gains came from parser/output fidelity, behavior coverage, and undo/redo resilience.
- Recent cycle focused heavily on documentation plus post-documentation stabilization.

## 2026-03-22 (Session 3) - Keymap Editor Popup Overhaul & ValuePicker Removal

### Bug fix — `activeKmLayers` undefined
- **`updateKeymapOutput()` was completely broken**: Previous session's "keymap output gap" fix used a non-existent variable `activeKmLayers` (line ~5107) instead of `keymapLayers`. This threw a ReferenceError every time the function ran, preventing all keymap output updates. Fixed by changing to `keymapLayers.length - 1`.

### Major additions — Binding Editor Popup
- **Converted binding editor to popup overlay**: Replaced the old inline `.binding-editor` panel with a fixed-position overlay popup.
- **CSS**: New `.binding-editor-overlay` (fixed, z-index 300) + `.be-dialog` (520px, max-height 85vh, flex column with header/body/footer).
- **HTML**: Restructured `#bindingEditor` into 3 zones: header (title + key badge + &none/&trans quick buttons), scrollable body (behavior dropdown, param rows, modifiers, keycode search + category grids), footer (Apply + Cancel).
- **Backdrop click to close**: Clicking the dark backdrop behind the popup dismisses it.
- **Animations**: fadeIn (0.15s) + slideUp (0.2s), matching other overlays in the app.

### Major changes — ValuePicker Removed from SVG Click
- **Removed `openValuePicker()` call from keyboard SVG click handler**: The floating ValuePicker dropdown (Type to search... popup) no longer auto-opens when clicking a key on the SVG keyboard. The binding editor popup now handles all key editing.
- **ValuePicker system preserved**: The `openValuePicker()`/`closeValuePicker()` functions and `vpState` remain in the code for potential future use; only the SVG click trigger was removed.
- **SVG click simplified**: Handler now only sets `selectedKeyIndex`, re-renders the SVG, and opens `showBindingEditor(keyIdx)`.

### Major additions — Keymap Editor Popup Overlays
- **Combo editor popup** (`#kmComboOverlay`): Replaced inline `#kmComboEditor` (`display:none` panel) with a fixed overlay popup. Contains: Name, Binding, Timeout, Layers, Require Prior Idle, Slow Release, combo mini-keyboard. Header has title + close button, footer has Save + Cancel.
- **Macro editor popup** (`#kmMacroOverlay`): Replaced inline `#kmMacroEditor` with a wider (600px) overlay popup. Contains: Name, Label, Params, Wait/Tap timing, step search, step list, + Add Step / + String Sequence buttons. Header has title + close button, footer has Save + Cancel.
- **Behavior editor popup** (`#kmBehaviorOverlay`): Replaced inline `#kmBehaviorEditor` with a 580px overlay popup. Contains: Name, Type dropdown, Label, dynamic `#kmBehaviorConfig` area. Header has title + close button, footer has Save + Cancel.
- **Conditional layer editor popup** (`#kmCondLayerOverlay`): Replaced inline `#kmCondLayerEditor` with a 440px overlay popup. Contains: Condition name, multi-select "When these layers are active", "Activate this layer" dropdown. Header has title + close button, footer has Save + Cancel.
- **Shared CSS**: New `.km-popup-overlay` / `.km-popup-dialog` / `.km-popup-header` / `.km-popup-body` / `.km-popup-footer` classes using the same fadeIn + slideUp animation pattern.
- **Backdrop click to close**: All 4 popup overlays dismiss when clicking the dark backdrop.
- **Reset function updated**: `fullRender()` reset code now closes all overlay popups via `classList.remove('visible')` instead of the old `style.display = 'none'`.

### Major additions — List Search/Filter
- **Search inputs added to all 4 list sections**: Combos, Macros, Behaviors, and Conditional Layers each have a "Filter..." search input above their item list.
- **Real-time filtering**: Typing in the search input hides non-matching items in the list. Clear button resets the filter.
- **Macro step search**: Inside the macro editor popup, a "Search steps..." input filters visible macro steps.
- **Shared search CSS**: `.section-body .km-search-wrap` styles mirror the existing `.kc-search-wrap` pattern from the binding editor.
- **Reusable `setupListSearch()` function**: Wires input/clear events for any search + list pair.

### Minor themes across updates
- Frequent small correctness passes (typos, wiring, indexing, formatting consistency).
- Readability and UX polish layered on top of parser and model improvements.

## 2026-03-22 (Session 3, Continued) - Popup Editors, Output Restructure, UI Modernization

### Bug fixes — Blink Fields Visibility
- **Missing `.hidden` CSS class**: The blink-specific fields (Blink Color, Return Color, Wait) in the macro add form used `class="hidden"` to hide, but no generic `.hidden` CSS rule existed — only scoped `.release-color-group.hidden` and `.keycode-btn.hidden`. Added `.hidden { display: none !important; }` to the global CSS, fixing blink fields showing for non-blink macro types.

### Bug fixes — Native Behaviors Lost in RGB Output
- **Parser skipping macro-one-param/two-param types**: The native behavior parser had a `continue` statement that skipped `zmk,behavior-macro-one-param` and `zmk,behavior-macro-two-param` types, preventing user behaviors like `blnk:`, `caps_blink`, `num_blink` from being stored. Removed the `continue`; these types are now parsed as `'macro-one-param'`/`'macro-two-param'`.
- **`_rawText` property**: Each parsed native behavior now stores its full matched text as `_rawText`, enabling faithful re-emission in the RGB output without re-serialization.
- **Output emission**: Native macro behaviors (macro-one-param) are emitted after the `macros {}` block. Native non-macro behaviors (hold-tap, tap-dance, etc.) are emitted inside a `behaviors {}` block. Both use `_rawText` for verbatim output.

### Bug fixes — Missing Closing `};` in RGB Output
- **Complete output restructure**: RGB output now properly wraps all content in a root `/ { ... };` block. Sections include: `macros {}` (non-MO_BLINK macros), native macro behaviors, blink macros (ZMK_MACRO), standalone MO_BLINK calls, `behaviors {}` (RGB_HT + native behaviors), and `combos { compatible = "zmk,combos"; ... }`. All properly indented (4-space root, 8-space section inner).

### Bug fixes — Keymap Output Bottom Gap
- **Conditional newline**: Changed unconditional `\n\n` after every layer's closing `};` to only add the extra blank line between layers, not after the last one. Eliminates the gap before the closing `};`.

### Bug fixes — #include Path Not Updating on Layout Switch
- **Layout switch handlers**: Both the "Use Corne" and "Use Lotus58" layout buttons now update `keymapParsedIncludes` by regex-replacing the dtsi filename, and call `updateKeymapOutput()` to regenerate output with the correct `#include` path.

### Major additions — Combo Editor Popup
- **New `#comboEditorOverlay`**: Full popup editor for combos, matching the macro editor pattern. Fields: Name, Binding, Layer picker (dropdown + removable tag chips), Positions (mini keyboard SVG inside the popup with click-to-toggle). No 2-position limit in the popup editor (unlike the inline add form).
- **`renderComboList()` redesign**: Replaced inline input fields with read-only display showing name, binding, positions, and layer tags. Each combo row has an Edit button that opens the popup, and a Delete button.
- **JS functions**: `openComboEditor(idx)`, `closeComboEditor()`, `ceditRenderLayerTags()`, `ceditGetLayers()`, `ceditRenderMiniKb()`. Save handler writes all fields back to the combo object.
- **Global state**: `comboEditorIndex`, `ceditSelectedPositions[]`.

### Major additions — Behavior Editor Popup
- **New `#behaviorEditorOverlay`**: Popup editor for behaviors with fields: Name, Label, Macro Ref (dropdown). Follows same `.editor-overlay`/`.editor-dialog` pattern.
- **`renderBehaviorList()` redesign**: Replaced inline fields with read-only display (name, label, macro ref arrow). Edit/Delete buttons per row.
- **JS functions**: `openBehaviorEditor(idx)`, `closeBehaviorEditor()`. Save handler updates behavior fields.

### UI Modernization
- **Shared overlay CSS**: New `.editor-overlay` and `.editor-dialog` classes used by all three popup editors (macro, combo, behavior). Theme-aware using CSS variables.
- **Overlay animations**: `fadeIn` (0.15s) on backdrop, `slideUp` (0.2s) on dialog.
- **Section hover effects**: Box-shadow enhancement on hover, background highlight on section heads.
- **Item hover effects**: Accent border color and subtle box-shadow on hover.
- **Button improvements**: `transform: scale(0.97)` on `:active`, box-shadow on hover, 5px border-radius.
- **Input focus glow**: Box-shadow ring on focus for better visibility.
- **New CSS classes**: `.btn-edit`, `.item-detail`, `.item-detail.muted`, `.item-tags`.

## 2026-03-22 (Session 3, Continued) - Combo Layer Picker & Behavior Binding Dropdowns

### Major additions — Combo Layer Tag Picker
- **Layer picker in keymap combo editor**: Replaced the plain text `kmComboLayers` input with a `<select>` dropdown + removable tag chips, matching the RGB tab's combo editor pattern.
- **New JS functions**: `kmComboLayerOptionsHTML()`, `kmComboRenderLayerTags(layersStr)`, `kmComboGetLayers()` — mirrors `ceditRenderLayerTags` / `ceditGetLayers` from the RGB combo editor.
- **Event wiring**: `kmComboLayerPicker` onchange adds layers as tag chips (no duplicates); tag × click removes the layer.
- **Reuses existing CSS**: `.layer-tags`, `.layer-tag`, `.layer-tag .tag-x` classes already defined.

### Major additions — Behavior Editor Binding Dropdowns
- **Datalist suggestions for binding fields**: All behavior config binding inputs now have `list="behBindingDL"` providing a dropdown of all available behaviors (ZMK_BEHAVIORS + custom keymapBehaviors + keymapMacros).
- **Datalist suggestions for modifier fields**: Mod-morph `Mods` and Caps-word `Mods` inputs now have `list="behModsDL"` providing MOD_LSFT, MOD_RSFT, MOD_LCTL, MOD_RCTL, MOD_LALT, MOD_RALT, MOD_LGUI, MOD_RGUI suggestions.
- **Affected fields**: Hold-tap (Hold/Tap Binding), Mod-morph (Normal, Morphed, Mods), Sticky-key (Binding), Sensor-rotate (CW/CCW Binding), Caps-word (Mods).
- **Free text preserved**: Datalist approach keeps inputs as `<input type="text">` with dropdown suggestions, allowing custom values for advanced ZMK configurations.
- **New JS function**: `populateBehDataLists()` — called from `showBehaviorConfig()` to refresh datalist options whenever the behavior config panel renders.
- **Static `<datalist>` elements**: `behBindingDL` and `behModsDL` added inside the behavior overlay body.

## Source Basis (for this changelog)
- Git history sample in this repo (latest 40 entries queried).
- Repository memory notes:
  - architecture summary
  - issue/fix ledger
- Session memory notes and prior conversation summaries from this workspace session.

## 2026-03-23 (Session 4) - Build Fix, Parser Enhancements, MO_BLINK Migration to Blink Section

### Bug fix — Extra `};` Build Error in corne-rgb.dtsi
- **Stray closing brace**: `corne-rgb.dtsi` had an extra `};` on line ~160 that prematurely closed the root `/ {}` node. This caused a `west build` parse error (`expected label reference (&foo)`) because `ZMK_MACRO(caps_blink, ...)` and everything after fell outside the device tree root. Removed the stray `};`.

### Major additions — KP_BLINK Parsing & Output
- **`KP_BLINK()` parser**: Added dedicated `kpBlinkRe` regex with balanced-paren walker to parse `KP_BLINK()` helper invocations directly into `blinkMacros[]` with `_helper: 'KP_BLINK'` flag.
- **`HELPER_KP_BLINK` string**: New JS constant for the KP_BLINK helper `#define`. Conditionally emitted in output when blink macros have non-`&mo` keys.
- **Output**: Blink macros with `_helper === 'KP_BLINK'` (or no `_helper`) output as `KP_BLINK()` helper calls when `includeHelpers` is on, or raw `ZMK_MACRO` when off.

### Bug fix — Parentheses in Labels
- **`splitArgs()` function**: Created a new argument splitter that respects quoted strings and balanced parentheses, replacing naive `.split(',')` or `([^)]+)` regex captures.
- **Balanced-paren walkers**: Updated `macroRe`, `behRe`, and `kpBlinkRe` regexes to use balanced-paren walking with `lastIndex` advancement, so labels like `"F KEYS BLINK; STANDALONE"` with special characters are parsed correctly.

### Major addition — Comment Preservation (allSectionComments)
- **`allSectionComments` parser**: Scans the full dtsi code for `//` and `/* */` comments preceding `KP_BLINK`, `MO_BLINK`, `CMB`, and `RGB_HT` calls. Comments are stored by node name and re-emitted in output before each entry.
- **Affected sections**: Blink macros, combos, and standalone MO_BLINK entries all preserve associated comments through parse → edit → output round-trips.

### Major addition — Keymap Header Preservation
- **`keymapParsedHeaderLines` global**: `parseKeymap()` now saves header comment/blank lines (copyright notices, license text) that appear before `#include` lines.
- **Output**: `updateKeymapOutput()` outputs preserved header lines before includes.

### Major change — MO_BLINK Moved from Macros to Blink Section
- **Blink section UI redesign**: Added a Type dropdown (`KP_BLINK` / `MO_BLINK ⚠`) to the Blink / Status Macros add form. When MO_BLINK is selected, the Key input hides and a Layer dropdown appears. An amber experimental note (`⚠ MO_BLINK is experimental — binds a momentary layer + blink sequence.`) appears below the form.
- **Macros section cleanup**: Removed `MO_BLINK ⚠` from both the macro add form dropdown and macro editor dropdown. Removed all hidden blink-specific fields (`blinkColorGroup`, `blinkReturnGroup`, `blinkWaitGroup`, `meditBlinkColorGroup`, `meditBlinkReturnGroup`, `meditBlinkWaitGroup`).
- **Parser redirect**: `MO_BLINK(...)` invocations now push into `blinkMacros[]` (with `_helper: 'MO_BLINK'`, `layer`, `color`, `returnColor`, `wait`) instead of `macros[]`.
- **Blink list renderer**: `renderBlinkMacroList()` detects `_helper === 'MO_BLINK'` items and renders them with an amber `⚠ MO_BLINK` badge + Layer dropdown instead of Key text input.
- **Output generator**: MO_BLINK items generated within the blink/status macros section. Uses `MO_BLINK()` helper when helpers enabled, raw `ZMK_MACRO` with `&macro_press &mo` pattern when disabled. `HELPER_MO_BLINK` definition conditionally included based on `blinkMacros[]` (not `macros[]`).
- **Macro editor cleanup**: Removed all MO_BLINK branching from `addMacro()`, `renderMacroList()`, `openMacroEditor()`, `macroType.onchange`, `meditType.onchange`, `meditSaveBtn.onclick`, and `updateHeaderDropdowns()`.
- **`addBlinkMacro()` updated**: Now reads `blinkType` dropdown; for MO_BLINK, stores `layer` from `blinkLayer` select; for KP_BLINK, stores `key` from `blinkKey` input. Both tagged with `_helper` field.
- **`updateHeaderDropdowns()` updated**: Populates `blinkLayer` dropdown, toggles Key/Layer fields and experimental note based on `blinkType` selection.

## 2026-03-24 (Session 7) - Binding Picker Collapse Fix, Macro Color

### Bug fixes
- **Layer Actions section not collapsible**: The Layer Actions category in the binding picker popup had an inline `style="display:flex;flex-direction:column;"` on the grid element, which overrode the CSS `display:none` rule when the `.open` class was toggled off. Replaced inline style with a new `.bp-col` CSS class that only applies `flex-direction:column` when the parent has `.open`.
- **Macro buttons missing light-blue color**: Macro buttons in the binding picker popup used standard `.bp-btn` styling with no visual distinction. Added `.bp-btn-macro` class and CSS rule (`.bp-btn-macro .bp-btn-name { color: #9cc; }`) matching the established light-blue convention used in macro/behavior list labels elsewhere.

## 2026-03-24 (Session 6) - Binding Picker Popup, Layer Name Sync, Macro Line Breaking, Label Formatting

### Major additions — Binding Picker Popup
- **Replaced all `<select>` binding dropdowns** with clickable trigger buttons that open a shared popup overlay (`#bindingPickerOverlay`, z-index 400).
- **Popup sections**: Complete Bindings (zero-param), Layer Actions (grouped by &mo/&to/&tog/&sl with layer names), Behaviors (+ params), Custom Behaviors, Macros, Raw Code input at bottom.
- **Collapsible sections**: Each section has a clickable title that toggles open/closed state.
- **Keycode sub-panel**: Clicking `&kp`, `&kt`, or `&sk` in the Behaviors section opens a keycode grid (with search) reusing `ZMK_KEYCODES` and `kcDescs` data. Clicking a keycode selects e.g. `&kp A`.
- **Action sub-panels**: Clicking `&bt`, `&rgb_ug`, `&out`, `&bl`, `&ext_power`, `&mkp`, `&mmv`, `&msc` opens a sub-panel with their respective action lists (BT_ACTIONS, RGB_ACTIONS, etc.) as clickable buttons.
- **Hover tooltips**: All behavior buttons have `title` attributes showing descriptions from `ZMK_BEHAVIORS[].desc`.
- **Global `kcDescs`**: Extracted from local scope in `populateKeycodeGrids()` to global variable for reuse by popup keycode grids.
- **New functions** (~line 4864): `openBindingPicker()`, `closeBindingPicker()`, `selectBindingPickerValue()`, `renderBindingPickerSections()`, `showBindingPickerSubPanel()`, `hideBindingPickerSubPanel()`, `populatePickerKeycodeGrids()`.
- **Replaced functions**: `behBindingOptionsHTML()` removed; `bindingSelectHTML()` now returns trigger button + hidden input; `getBehBindingValue()` reads hidden input; `setBehBindingValue()` writes hidden input + updates button text.
- **New CSS**: `.bp-trigger`, `.bp-overlay`, `.bp-dialog`, `.bp-section`, `.bp-btn`, `.bp-layer-group`, `.bp-raw-row` classes (~line 281).
- **Event handlers**: Delegated click handlers on `document` for `.bp-trigger` buttons and on `#bindingPickerOverlay` for all popup interactions; keycode search input handler; raw input Enter key.
- **Removed**: Old `change` event handler for `.beh-binding-select` class; `behBindingOptionsHTML()` function; `__RAW__` value pattern.

### RGB layer names — use node name
- **`syncCrossTabData()`**: Changed layer name priority from `(dispBase || klBaseStripped || klBase)` to `(klBase || klBaseStripped || dispBase)`. RGB `#define` output now uses the keymap node name (e.g. `NEW_LAYER_1`) instead of display name (e.g. `NEW`).

### Layer name cross-tab sync on parse
- **RGB "Parse & Reflect"**: When parsing .dtsi while keymap layers exist, RGB layer names overwrite the matching keymap layer's `displayName` and `name` (by index). Orphan RGB layers (indices beyond keymap count) auto-create new empty keymap layers.
- **Keymap "Parse Keymap"**: When parsing .keymap while RGB layers exist, keymap layer names overwrite the matching RGB layer's `name` (preserving L_/LAYER_ prefix). Sync count shown in status message.

### Macro output line breaking
- **`macroBlock()`**: When a macro has >7 steps, the `bindings = <...>` output now wraps onto continuation lines (7 steps per line, indented 16 spaces for alignment).

### Label display formatting
- **`renderBehaviorList()` (RGB tab)**: Labels now display in light blue quoted text (`color:#9cc`, `&quot;label&quot;`) matching the macro list format.
- **`renderKeymapBehaviorList()` (keymap tab)**: Labels now use the same light blue quoted format for consistency across tabs.

## 2026-03-24 (Session 5) - Binding Editor Overhaul, Positional Hold Picker, Binding Select Dropdowns

### Major additions — Binding Editor Reformat
- **Keycode grid layout**: Changed from CSS grid (`grid-template-columns: repeat(auto-fill, minmax(52px, 1fr))`) to flexbox (`display: flex; flex-wrap: wrap; gap: 4px;`) with `white-space: nowrap` on buttons. Eliminates keycode label truncation.
- **Dialog widened**: Binding editor dialog width increased from 520px to 640px.
- **Keycode descriptions**: Added `KC_DESCRIPTIONS` map inside `populateKeycodeGrids()` with human-readable descriptions for 100+ keycodes. All keycode buttons get `title` attributes from this map for tooltip descriptions on hover.

### Major additions — String Sequence Custom Modal
- **Replaced browser `prompt()`**: The "+ String Sequence" button in the macro editor now opens a custom in-app modal (`#stringSeqOverlay`) with a `<textarea>`, live `#stringSeqPreview` showing the generated `&kp` steps, and Add/Cancel buttons.
- **HTML**: New overlay markup after macro overlay (~line 922).
- **JS handlers**: `kmAddStringSeqBtn` opens overlay; Add button converts text to tap/press/release steps and appends to macro.

### Major additions — Custom Mod-Tap & Layer-Tap (Built-in Behaviors)
- **`cmt` (Custom Mod-Tap)**: New BUILTIN_BEHAVIORS preset — hold-preferred hold-tap with 200ms tapping term. Named `cmt` to avoid overwriting built-in `&mt`.
- **`clt` (Custom Layer-Tap)**: New BUILTIN_BEHAVIORS preset — hold-preferred hold-tap with 200ms tapping term. Named `clt` to avoid overwriting built-in `&lt`.
- Both pulled from official ZMK hold-tap documentation.

### Major additions — Positional Hold Mini Keyboard Picker
- **Visual position picker**: Replaced text input for hold-tap `hold-trigger-key-positions` with SVG mini keyboard (same style as combo position picker).
- **New global**: `behPositionalSelectedPositions[]` (~line 4248).
- **New function**: `renderBehPositionalMiniKb()` — renders SVG keyboard in `#behPositionalMiniKb`, syncs hidden `#kmBehHoldTriggerPositions` input.
- **Click handler**: Event delegation on `#kmBehaviorConfig` for `.key-rect` clicks inside `#behPositionalMiniKb`.
- **Edit flow**: Existing positions parsed into array before `showBehaviorConfig()` call, then rendered.

### Major additions — Binding Select Dropdowns (All Keymap Binding Fields)
- **Converted to dropdowns**: Replaced ALL binding text inputs in behavior editor and combo editor with `<select>` dropdowns + "Raw Code" text input fallback.
- **New helper functions** (~line 4785):
  - `behBindingOptionsHTML(selected, optType)` — generates grouped `<option>` elements for `'binding'` or `'mods'` selects
  - `bindingSelectHTML(id, selected, optType, width)` — returns `<select>` + raw `<input>` wrapper HTML
  - `getBehBindingValue(id)` — reads effective value (select value or raw input text)
  - `setBehBindingValue(id, val)` — sets select or falls back to raw mode
- **Select groups**: Complete Bindings (zero-param: `&trans`, `&none`, etc.), Layer Actions (`&mo 0`, `&tog 1`, etc. with layer names), Behaviors needing params (`&kp`, `&mt`, etc.), Custom Behaviors, Macros, Raw Code.
- **Smart auto-switch**: Selecting a behavior needing parameters (e.g., `&kp`) auto-switches to raw mode with prefix pre-filled and focused.
- **Fields converted**: `kmBehHoldBinding`, `kmBehTapBinding`, `kmBehMmNormal`, `kmBehMmMorphed`, `kmBehMmMods` (mods type), `kmBehSkBinding`, `kmBehSensorCW`, `kmBehSensorCCW`, `kmBehCwMods` (mods type), `kmComboBind`.
- **Combo overlay**: `kmComboBind` changed from static `<input>` to a `<span id="kmComboBindWrap">` container, dynamically populated via `bindingSelectHTML()` when combo add/edit occurs.
- **Save handlers**: Updated to use `getBehBindingValue()` instead of `document.getElementById().value`.
- **Edit handlers**: Updated to use `setBehBindingValue()` for pre-populating values when editing existing behaviors/combos.
- **CSS**: New `.beh-binding-wrap`, `.beh-binding-select`, `.beh-binding-raw` classes (~line 274).
- **Change handler**: Delegated `change` event on `document` (~line 6335) for all `.beh-binding-select` elements.
- **Fields kept as text inputs**: `kmBehTdBindings` (tap-dance — complex multi-binding syntax), `kmBehMacroBindings` (macro — multi-step syntax), `kmBehCwContinueList` (caps-word continue list — space-separated keycodes).
- **Datalists now unused**: `behBindingDL` and `behModsDL` datalists + `populateBehDataLists()` function remain in code but no inputs reference them (all converted to `<select>`).

### Minor changes
- **L_ prefix removal**: `syncCrossTabData()` no longer prepends "L_" when syncing keymap layers into RGB tab.
- **HELPER_COMBO variable positions**: Updated to use `<keypos>` + `__VA_ARGS__` instead of hardcoded p1, p2.
- **&td0 removed** from BUILTIN_BEHAVIORS array.
- **&hm description updated**: "Universal homerow mod pulled from PandaKB firmware."
- **Macro RAW binding fix**: Step type change to 'custom' now passes empty `raw` string.
- **Auto-detect layout**: After `parseKeymap()`, auto-loads Lotus58 if ≥58 keys, Corne if ≤42 keys.
- **Behavior descriptions**: Added `desc` field to all `ZMK_BEHAVIORS` entries; shown in binding editor dropdown and `#beDescRow`.