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

### Minor themes across updates
- Frequent small correctness passes (typos, wiring, indexing, formatting consistency).
- Readability and UX polish layered on top of parser and model improvements.

## Source Basis (for this changelog)
- Git history sample in this repo (latest 40 entries queried).
- Repository memory notes:
  - architecture summary
  - issue/fix ledger
- Session memory notes and prior conversation summaries from this workspace session.