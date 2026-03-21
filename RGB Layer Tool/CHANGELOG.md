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
- Multiple corruption-recovery utility scripts created during emergency repair work (stored under RGB Layer Tool folder).
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