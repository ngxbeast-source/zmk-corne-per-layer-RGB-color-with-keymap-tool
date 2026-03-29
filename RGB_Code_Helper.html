<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ZMK RGB &amp; Keymap Editor v0.33</title>
  <style>
    /* ====== THEME VARIABLES ====== */
    :root {
      --accent: #5a8cc8; --accent2: #4472a8; --bg: #eef1f5; --card: #fff; --border: #dde3ea;
      --text: #2d3a4a; --muted: #6b7d8e; --item-bg: #f7f9fb; --danger: #c0392b; --success: #27ae60;
      --topbar-bg: #2d3a4a; --topbar-text: #fff; --topbar-muted: #8fa4b8;
      --output-bg: #f0f2f5; --output-border: #d0d8e0; --output-text: #1a2a3a; --output-muted: #7a8a9a;
      --key-bg: #ffffff; --key-border: #c8cdd3; --key-hover: #e3ecf6; --key-selected: #5a8cc8;
      --key-trans-bg: #f0f0f0; --key-none-bg: #e0e0e0;
      --svg-bg: #f5f7fa;
    }
    [data-theme="dark"] {
      --accent: #6ea8e6; --accent2: #5a90cc; --bg: #1a1e26; --card: #232a34; --border: #3a4252;
      --text: #d0d8e0; --muted: #8a9bb0; --item-bg: #2a3240; --danger: #e74c3c; --success: #2ecc71;
      --topbar-bg: #151920; --topbar-text: #e0e8f0; --topbar-muted: #7a8ea0;
      --output-bg: #12161d; --output-border: #2a3040; --output-text: #e8eef6; --output-muted: #6a7a8a;
      --key-bg: #2a3240; --key-border: #4a5566; --key-hover: #3a4a5e; --key-selected: #5a8cc8;
      --key-trans-bg: #333d4a; --key-none-bg: #282f38;
      --svg-bg: #1e242e;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { height: 100%; overflow: hidden; }
    body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; background: var(--bg); color: var(--text); transition: background 0.2s, color 0.2s; }

    /* ====== TOPBAR ====== */
    .topbar { background: var(--topbar-bg); color: var(--topbar-text); padding: 0 1.2em; display: flex; align-items: center; gap: 0; position: sticky; top: 0; z-index: 100; box-shadow: 0 2px 8px rgba(0,0,0,0.15); height: 44px; }
    .topbar h1 { font-size: 1.1em; font-weight: 600; letter-spacing: 0.3px; margin-right: 1.5em; white-space: nowrap; }
    .topbar h1 small { color: var(--topbar-muted); font-size: 0.75em; font-weight: 400; margin-left: 0.3em; }
    .tab-bar { display: flex; gap: 0; height: 100%; }
    .tab-btn { background: none; color: var(--topbar-muted); border: none; padding: 0 1.2em; height: 100%; font-size: 0.92em; font-weight: 500; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.15s; display: flex; align-items: center; }
    .tab-btn:hover { color: var(--topbar-text); background: rgba(255,255,255,0.06); }
    .tab-btn.active { color: var(--topbar-text); border-bottom-color: var(--accent); }
    .topbar-right { margin-left: auto; display: flex; align-items: center; gap: 0.8em; }
    .dark-toggle { background: none; border: 1px solid var(--topbar-muted); color: var(--topbar-muted); border-radius: 4px; padding: 0.2em 0.6em; font-size: 0.82em; cursor: pointer; }
    .dark-toggle:hover { color: var(--topbar-text); border-color: var(--topbar-text); }

    /* ====== TAB PANELS ====== */
    .tab-panel { display: none; }
    .tab-panel.active { display: flex; }

    /* ====== RGB GENERATOR TAB (from test_v3) ====== */
    .main-layout { height: calc(100vh - 44px); overflow: hidden; }
    .editor-panel { flex: 1; min-width: 0; padding: 0.8em; overflow-y: auto; }
    .output-panel { width: 420px; min-width: 260px; max-width: 60vw; background: var(--output-bg); display: flex; flex-direction: column; }
    .resize-handle { width: 5px; cursor: col-resize; background: var(--topbar-bg); flex-shrink: 0; transition: background 0.15s; }
    .resize-handle:hover, .resize-handle.active { background: var(--accent); }
    .output-wrap { width: 420px; min-width: 260px; max-width: 60vw; display: flex; flex-shrink: 0; background: var(--output-bg); }
    .output-inner { display: flex; flex-direction: column; flex: 1; min-width: 0; }
    .output-inner .output-header { padding: 0.6em 1em 0.4em; display: flex; align-items: center; gap: 0.5em; flex-wrap: wrap; border-bottom: 1px solid var(--output-border); }
    .output-inner .output-header h2 { color: var(--topbar-muted); font-size: 0.95em; margin: 0; font-weight: 500; }
    .output-panel button { background: var(--accent); color: #fff; border: none; border-radius: 4px; padding: 0.3em 0.8em; font-size: 0.82em; cursor: pointer; font-weight: 500; }
    .output-panel button:hover { background: var(--accent2); }
    .output-panel label { color: var(--topbar-muted); font-size: 0.8em; display: flex; align-items: center; gap: 0.3em; cursor: pointer; }
    .output-panel label input[type="checkbox"] { accent-color: var(--accent); }
    .output-textarea { flex: 1; width: 100%; border: none; background: transparent; color: var(--output-text); font-family: 'Fira Code','Fira Mono','Consolas','Menlo',monospace; font-size: 0.88em; padding: 0.8em 1em; resize: none; line-height: 1.55; outline: none; }
    pre.output-pre { flex: 1; width: 100%; border: none; background: transparent; color: var(--output-text); font-family: 'Fira Code','Fira Mono','Consolas','Menlo',monospace; font-size: 0.88em; padding: 0.8em 1em; margin: 0; line-height: 1.55; overflow: auto; white-space: pre; tab-size: 4; user-select: text; }
    pre.output-pre .hl-layer { background: rgba(30, 80, 180, 0.35); display: inline; border-radius: 0; }
    pre.output-pre .hl-comment { color: #6a9955; }
    pre.output-pre .hl-keyword { color: #c586c0; }
    pre.output-pre .hl-string { color: #ce9178; }
    .output-stats { color: var(--output-muted); font-size: 0.75em; padding: 0.3em 1em; border-top: 1px solid var(--output-border); text-align: right; }

    .section { background: var(--card); border-radius: 8px; box-shadow: 0 1px 4px rgba(0,0,0,0.04); margin-bottom: 0.7em; border: 1px solid var(--border); overflow: hidden; transition: box-shadow 0.2s; }
    .section:hover { box-shadow: 0 2px 10px rgba(0,0,0,0.08); }
    .section-head { display: flex; align-items: center; justify-content: space-between; padding: 0.55em 0.9em; cursor: pointer; user-select: none; background: var(--card); border-bottom: 1px solid var(--border); transition: background 0.15s; }
    .section-head:hover { background: var(--item-bg); }
    .section-head h2 { font-size: 0.95em; color: var(--accent2); font-weight: 600; }
    .section-head .toggle-icon { color: var(--muted); font-size: 0.85em; transition: transform 0.25s ease; }
    .section-head .toggle-icon.collapsed { transform: rotate(-90deg); }
    .section-body { padding: 0.7em 0.9em; }
    .section-body.collapsed { display: none; }

    .input-row { display: flex; flex-wrap: wrap; gap: 0.4em; align-items: center; margin-bottom: 0.4em; }
    .input-group { display: flex; align-items: center; gap: 0.2em; }
    label { font-weight: 500; color: var(--muted); font-size: 0.85em; white-space: nowrap; }
    input[type="text"], input[type="number"], select { border: 1px solid var(--border); border-radius: 5px; padding: 0.3em 0.5em; font-size: 0.88em; background: var(--item-bg); color: var(--text); transition: border-color 0.15s, background 0.15s; }
    input[type="text"]:focus, input[type="number"]:focus, select:focus { border-color: var(--accent); outline: none; background: var(--card); box-shadow: 0 0 0 2px rgba(90,140,200,0.15); }
    input[type="range"] { accent-color: var(--accent); width: 70px; height: 16px; }
    textarea { font-family: 'Fira Mono','Consolas',monospace; font-size: 0.88em; border-radius: 5px; border: 1px solid var(--border); padding: 0.5em; resize: vertical; width: 100%; background: var(--item-bg); color: var(--text); }
    textarea:focus { border-color: var(--accent); outline: none; background: var(--card); }
    button { background: var(--accent); color: #fff; border: none; border-radius: 5px; padding: 0.3em 0.8em; font-size: 0.88em; font-weight: 500; cursor: pointer; transition: background 0.15s, transform 0.1s, box-shadow 0.15s; }
    button:hover { background: var(--accent2); box-shadow: 0 2px 6px rgba(0,0,0,0.12); }
    button:active { transform: scale(0.97); }
    .btn-danger { background: var(--danger); } .btn-danger:hover { background: #a5281b; }
    .btn-sm { padding: 0.2em 0.55em; font-size: 0.8em; }
    .btn-edit { background: var(--accent); color: #fff; }
    .btn-edit:hover { background: var(--accent2); }
    .item-detail { color: var(--text); font-size: 0.9em; }
    .item-detail.muted { color: var(--muted); font-size: 0.82em; }
    .item-tags { display: inline-flex; flex-wrap: wrap; gap: 3px; margin-left: auto; margin-right: 4px; }

    .color-swatch { position: relative; display: inline-block; width: 28px; height: 28px; border-radius: 6px; border: 2px solid var(--border); cursor: pointer; vertical-align: middle; transition: border-color 0.15s; flex-shrink: 0; }
    .color-swatch:hover { border-color: var(--accent); }
    .color-swatch input[type="color"] { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; border: none; padding: 0; }
    #hsbPickerPopup { position: fixed; z-index: 10000; background: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.45); display: none; width: 232px; user-select: none; }
    .hsbp-header { display: flex; justify-content: space-between; align-items: center; font-weight: 600; font-size: 0.82em; margin-bottom: 8px; color: var(--text); }
    .hsbp-close { cursor: pointer; font-size: 1.3em; color: var(--muted); line-height: 1; }
    .hsbp-close:hover { color: var(--danger); }
    .hsbp-sv-wrap { position: relative; width: 208px; height: 150px; margin-bottom: 8px; border-radius: 4px; overflow: hidden; border: 1px solid var(--border); cursor: crosshair; }
    .hsbp-sv-wrap canvas { display: block; width: 208px; height: 150px; }
    .hsbp-sv-cursor { position: absolute; width: 12px; height: 12px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 2px rgba(0,0,0,0.6); pointer-events: none; transform: translate(-50%, -50%); }
    .hsbp-hue-wrap { position: relative; width: 208px; height: 18px; margin-bottom: 10px; border-radius: 3px; overflow: hidden; border: 1px solid var(--border); cursor: pointer; }
    .hsbp-hue-wrap canvas { display: block; width: 208px; height: 18px; }
    .hsbp-hue-cursor { position: absolute; top: -1px; width: 6px; height: 20px; border: 2px solid #fff; border-radius: 2px; box-shadow: 0 0 2px rgba(0,0,0,0.5); pointer-events: none; transform: translateX(-50%); }
    .hsbp-row { display: flex; align-items: center; gap: 6px; }
    .hsbp-row .input-group { margin: 0; }
    .hsbp-row .input-group label { font-size: 0.78em; font-weight: 600; min-width: 10px; }
    .hsbp-row .input-group input { width: 46px; }
    .hsbp-preview { width: 32px; height: 32px; border-radius: 5px; border: 1px solid var(--border); margin-left: auto; flex-shrink: 0; }
    .item-list { margin-top: 0.3em; }
    .item { background: var(--item-bg); border-radius: 6px; padding: 0.4em 0.7em; margin-bottom: 0.35em; border: 1px solid var(--border); display: flex; flex-wrap: wrap; align-items: center; gap: 0.4em; font-size: 0.86em; transition: border-color 0.15s, box-shadow 0.15s; }
    .item:hover { border-color: var(--accent); box-shadow: 0 1px 6px rgba(90,140,200,0.1); }
    .item b { color: var(--accent2); min-width: 80px; font-size: 0.92em; }
    .item input[type="text"], .item input[type="number"] { width: 75px; }
    .item select { max-width: 160px; }
    .layer-tags { display: inline-flex; flex-wrap: wrap; gap: 3px; margin-left: 4px; vertical-align: middle; }
    .layer-tag { display: inline-flex; align-items: center; background: var(--accent); color: #fff; border-radius: 3px; padding: 1px 5px; font-size: 0.8em; white-space: nowrap; }
    .layer-tag .tag-x { margin-left: 4px; cursor: pointer; font-weight: bold; opacity: 0.7; }
    .layer-tag .tag-x:hover { opacity: 1; }
    .builtin-beh { display: flex; align-items: center; gap: 0.5em; padding: 0.3em 0.5em; margin-bottom: 0.25em; border-radius: 4px; border: 1px solid var(--border); background: var(--item-bg); font-size: 0.88em; }
    .builtin-beh label { cursor: pointer; display: flex; align-items: center; gap: 0.4em; flex: 1; min-width: 0; }
    .builtin-beh .bb-name { font-weight: 700; color: var(--accent2); min-width: 55px; }
    .builtin-beh .bb-type { color: var(--muted); font-size: 0.85em; }
    .builtin-beh .bb-desc { color: var(--muted); font-size: 0.82em; margin-left: auto; }
    .builtin-beh.bb-on { border-color: var(--accent); }
    .color-preview { display: inline-block; width: 18px; height: 18px; border-radius: 4px; border: 1px solid var(--border); vertical-align: middle; flex-shrink: 0; }
    .status-msg { color: var(--success); font-size: 0.85em; margin-left: 0.5em; }
    .release-color-group { transition: opacity 0.2s; }
    .release-color-group.hidden { opacity: 0.3; pointer-events: none; }
    .hidden { display: none !important; }
    .filter-bar { display: flex; align-items: center; gap: 0.6em; margin-bottom: 0.4em; font-size: 0.85em; }
    .filter-bar label { cursor: pointer; }

    /* ====== KEYMAP EDITOR TAB ====== */
    .km-layout { display: flex; height: calc(100vh - 44px); overflow: hidden; }
    .km-output { width: 420px; min-width: 260px; max-width: 60vw; background: var(--output-bg); display: flex; flex-direction: column; }

    /* SVG keyboard */
    .keyboard-container { background: var(--svg-bg); border-radius: 10px; border: 1px solid var(--border); padding: 1em; margin-bottom: 0.7em; overflow: hidden; resize: vertical; min-height: 120px; max-height: 80vh; display: flex; flex-direction: column; flex-shrink: 0; }
    .keyboard-svg { width: 100%; height: 100%; display: block; margin: 0 auto; min-height: 0; flex: 1; }
    .keyboard-svg .key-group { cursor: pointer; }
    .keyboard-svg .key-rect { fill: var(--key-bg); stroke: var(--key-border); stroke-width: 1.5; rx: 4; ry: 4; transition: fill 0.1s, stroke 0.1s; }
    .keyboard-svg .key-group:hover .key-rect { fill: var(--key-hover); stroke: var(--accent); }
    .keyboard-svg .key-group.selected .key-rect { fill: var(--key-hover); stroke: var(--key-selected); stroke-width: 2.5; }
    .keyboard-svg .key-group.key-trans .key-rect { fill: var(--key-trans-bg); stroke-dasharray: 4 2; }
    .keyboard-svg .key-group.key-none .key-rect { fill: var(--key-none-bg); opacity: 0.6; }
    .keyboard-svg .key-label { fill: var(--text); font-family: 'Segoe UI', system-ui, sans-serif; font-size: 10px; text-anchor: middle; dominant-baseline: central; pointer-events: none; }
    .keyboard-svg .key-label-top { fill: var(--muted); font-size: 7px; text-anchor: middle; dominant-baseline: auto; pointer-events: auto; cursor: pointer; font-variant: small-caps; }
    .keyboard-svg .key-label-top:hover { fill: var(--accent); text-decoration: underline; }
    .keyboard-svg .key-label-bottom { fill: var(--muted); font-size: 7px; text-anchor: middle; dominant-baseline: hanging; pointer-events: none; }

    /* Layer sidebar */
    .km-content { display: flex; flex: 1; min-width: 0; }
    .layer-sidebar { width: 42px; min-width: 42px; background: var(--card); border-right: 1px solid var(--border); display: flex; flex-direction: column; align-items: center; padding: 0.4em 0; gap: 2px; overflow-y: auto; overflow-x: hidden; transition: width 0.15s ease-in; }
    .layer-sidebar:hover { width: 160px; }
    .layer-sidebar-label { font-size: 0.65em; font-weight: 700; color: var(--accent2); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.3em; }
    .layer-tab { width: 34px; min-width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; background: var(--item-bg); border: 1px solid var(--border); border-radius: 17px; font-size: 0.82em; font-weight: 600; cursor: pointer; color: var(--text); transition: all 0.15s; position: relative; overflow: hidden; white-space: nowrap; }
    .layer-sidebar:hover .layer-tab { width: 148px; border-radius: 6px; justify-content: flex-start; padding-left: 0; }
    .layer-tab .lt-index { display: inline-flex; width: 34px; min-width: 34px; height: 34px; align-items: center; justify-content: center; font-weight: 700; }
    .layer-tab .lt-name { display: none; overflow: hidden; text-overflow: ellipsis; font-size: 0.82em; font-variant: small-caps; padding-right: 6px; }
    .layer-sidebar:hover .layer-tab .lt-name { display: inline-block; }
    .layer-tab .lt-delete { display: none; margin-left: auto; background: none; border: none; color: var(--muted); cursor: pointer; font-size: 0.9em; padding: 0 4px; }
    .layer-sidebar:hover .layer-tab .lt-delete { display: inline-block; }
    .layer-tab .lt-delete:hover { color: var(--danger); }
    .layer-tab:hover { background: rgba(60, 179, 113, 0.5); border-color: rgba(60, 179, 113, 0.7); color: #fff; }
    .layer-tab.active { background: rgb(60, 179, 113); color: #fff; border-color: rgb(60, 179, 113); }
    .layer-tab .lt-color { display: inline-block; width: 8px; height: 8px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.3); position: absolute; top: 3px; right: 3px; }
    .layer-sidebar:hover .layer-tab .lt-color { position: static; margin-left: auto; margin-right: 2px; flex-shrink: 0; }
    .layer-tab-add { width: 34px; height: 34px; background: none; border: 1px dashed var(--border); color: var(--muted); font-size: 1em; display: flex; align-items: center; justify-content: center; border-radius: 17px; cursor: pointer; }
    .layer-tab-add:hover { border-color: var(--accent); color: var(--accent); }
    .layer-tab[draggable="true"] { cursor: grab; user-select: none; }
    .layer-tab[draggable="true"]:active { cursor: grabbing; }
    .layer-tab.dragging { opacity: 0.35; transform: scale(0.92); }
    .layer-tab.drag-over { box-shadow: inset 0 0 0 2px var(--accent); border-color: var(--accent); }
    .km-center { flex: 1; min-width: 0; padding: 0.8em; overflow-y: auto; }

    /* Sub-tab navigation for editing sections */
    .km-subtab-bar { display: flex; gap: 2px; padding: 0.3em 0; margin-bottom: 0.5em; border-bottom: 2px solid var(--border); flex-wrap: wrap; }
    .km-subtab-btn { background: none; border: none; border-bottom: 2px solid transparent; color: var(--muted); font-size: 0.82em; font-weight: 500; padding: 0.35em 0.7em; cursor: pointer; border-radius: 4px 4px 0 0; transition: all 0.15s; margin-bottom: -2px; white-space: nowrap; }
    .km-subtab-btn:hover { color: var(--text); background: var(--item-bg); }
    .km-subtab-btn.active { color: var(--accent2); border-bottom-color: var(--accent); font-weight: 600; background: var(--card); }
    .km-subtab-content { }
    .km-subtab-panel { display: none; }
    .km-subtab-panel.active { display: block; }

    /* Layer header bar */
    .layer-header { display: flex; align-items: center; gap: 0.6em; margin-bottom: 0.5em; padding: 0.3em 0; }
    .layer-ctx-btn { background: var(--item-bg); border: 1px solid var(--border); border-radius: 4px; padding: 0.2em 0.5em; font-size: 0.9em; cursor: pointer; color: var(--muted); line-height: 1; }
    .layer-ctx-btn:hover { background: var(--key-hover); border-color: var(--accent); color: var(--text); }

    /* Sensor bindings display */
    .sensor-bindings-area { margin-top: 0.6em; }
    .sensor-bindings-area h4 { font-size: 0.85em; color: var(--muted); margin: 0 0 0.4em; font-weight: 600; }
    .sensor-cards { display: flex; gap: 1em; flex-wrap: wrap; }
    .sensor-card { display: flex; flex-direction: column; align-items: center; gap: 0.3em; cursor: pointer; padding: 0.5em 0.8em; border-radius: 8px; border: 1px solid var(--border); background: var(--item-bg); transition: border-color 0.15s, background 0.15s; min-width: 100px; position: relative; }
    .sensor-card:hover { border-color: var(--accent); background: var(--key-hover); }
    .sensor-card .sensor-label { font-size: 0.75em; font-weight: 600; color: var(--text); font-family: 'Consolas', 'Fira Code', monospace; }
    .sensor-card .sensor-icon { width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, var(--item-bg), #2a2a3a); border: 2px solid var(--border); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1px; position: relative; }
    .sensor-card:hover .sensor-icon { border-color: var(--accent); }
    .sensor-card .sensor-behavior { font-size: 0.6em; color: var(--accent2); position: absolute; top: -1px; left: 50%; transform: translateX(-50%); white-space: nowrap; opacity: 0.75; }
    .sensor-card .sensor-cw, .sensor-card .sensor-ccw { font-size: 0.65em; color: var(--text); display: flex; align-items: center; gap: 2px; }
    .sensor-card .sensor-cw::before { content: '\21BB'; font-size: 0.9em; color: var(--accent); }
    .sensor-card .sensor-ccw::before { content: '\21BA'; font-size: 0.9em; color: var(--accent); }
    .sensor-card .sensor-delete { position: absolute; top: -6px; right: -6px; width: 18px; height: 18px; border-radius: 50%; background: var(--danger, #e55); color: #fff; border: none; font-size: 0.7em; cursor: pointer; display: none; align-items: center; justify-content: center; line-height: 1; }
    .sensor-card:hover .sensor-delete { display: flex; }
    .sensor-add-btn { display: flex; align-items: center; justify-content: center; width: 56px; height: 56px; border-radius: 50%; border: 2px dashed var(--border); background: transparent; color: var(--muted); font-size: 1.5em; cursor: pointer; transition: border-color 0.15s, color 0.15s; }
    .sensor-add-btn:hover { border-color: var(--accent); color: var(--accent); }

    /* Sensor edit modal */
    .sensor-modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.55); z-index: 300; display: flex; align-items: center; justify-content: center; }
    .sensor-modal { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 1.2em 1.5em; min-width: 380px; max-width: 480px; color: var(--text); box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
    .sensor-modal h3 { margin: 0 0 0.8em; font-size: 1.05em; display: flex; align-items: center; gap: 0.5em; }
    .sensor-modal h3 code { background: var(--item-bg); padding: 0.15em 0.5em; border-radius: 4px; font-size: 0.9em; border: 1px solid var(--border); }
    .sensor-modal h3 .sensor-icon-sm { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, var(--item-bg), #2a2a3a); border: 2px solid var(--border); display: inline-flex; flex-direction: column; align-items: center; justify-content: center; margin-left: auto; }
    .sensor-modal .sm-row { margin-bottom: 0.6em; }
    .sensor-modal .sm-row label { display: block; font-size: 0.75em; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.2em; }
    .sensor-modal .sm-row select, .sensor-modal .sm-row input { width: 100%; padding: 0.35em 0.5em; border: 1px solid var(--border); border-radius: 4px; background: var(--item-bg); color: var(--text); font-size: 0.9em; box-sizing: border-box; }
    .sensor-modal .sm-row select:focus, .sensor-modal .sm-row input:focus { border-color: var(--accent); outline: none; }
    .sensor-modal .sm-params { border: 1px solid var(--border); border-radius: 6px; padding: 0.6em; background: rgba(0,0,0,0.1); margin-top: 0.4em; }
    .sensor-modal .sm-params .sm-param-label { font-size: 0.7em; font-weight: 700; text-transform: uppercase; color: var(--accent2); margin-bottom: 0.15em; }
    .sensor-modal .sm-actions { margin-top: 1em; display: flex; gap: 0.5em; justify-content: flex-end; }
    .sensor-modal .sm-actions button { padding: 0.35em 1.2em; border-radius: 4px; border: 1px solid var(--border); cursor: pointer; font-size: 0.9em; }
    .sensor-modal .sm-actions .sm-apply { background: var(--accent); color: #fff; border-color: var(--accent); font-weight: 600; }
    .sensor-modal .sm-actions .sm-apply:hover { opacity: 0.9; }
    .sensor-modal .sm-actions .sm-cancel { background: var(--item-bg); color: var(--text); }
    .sensor-modal .sm-actions .sm-cancel:hover { background: var(--key-hover); }
    .sm-key-picker { display: flex; flex-wrap: wrap; gap: 3px; margin-top: 0.3em; }
    .sm-key-picker button { padding: 0.2em 0.45em; font-size: 0.72em; border: 1px solid var(--border); border-radius: 3px; background: var(--item-bg); color: var(--text); cursor: pointer; font-family: inherit; white-space: nowrap; }
    .sm-key-picker button:hover { background: var(--accent); color: #fff; border-color: var(--accent); }
    .sm-key-picker-label { font-size: 0.65em; font-weight: 700; text-transform: uppercase; color: var(--muted); margin-top: 0.35em; letter-spacing: 0.5px; }

    /* Context menu */
    .ctx-menu { position: absolute; z-index: 150; background: var(--card); border: 1px solid var(--border); border-radius: 6px; box-shadow: 0 4px 16px rgba(0,0,0,0.15); min-width: 220px; padding: 0.3em 0; }
    .ctx-menu-item { padding: 0.4em 1em; font-size: 0.85em; cursor: pointer; color: var(--text); transition: background 0.1s; display: flex; align-items: center; gap: 0.5em; }
    .ctx-menu-item:hover { background: var(--key-hover); }
    .ctx-menu-item.ctx-danger { color: var(--danger); }
    .ctx-menu-item.ctx-danger:hover { background: rgba(192,57,43,0.1); }
    .ctx-menu-sep { height: 1px; background: var(--border); margin: 0.2em 0.5em; }
    .ctx-menu-item .ctx-key { margin-left: auto; color: var(--muted); font-size: 0.8em; }

    /* Modifier checkboxes */
    .mod-checkboxes { display: flex; flex-wrap: wrap; gap: 0.3em 0.8em; margin: 0.3em 0; }
    .mod-cb-label { display: flex; align-items: center; gap: 0.2em; font-size: 0.8em; cursor: pointer; color: var(--text); }
    .mod-cb-label input { accent-color: var(--accent); }

    /* Keycode search */
    .kc-search-wrap { position: relative; margin-bottom: 0.4em; }
    .kc-search-wrap input { width: 100%; padding: 0.35em 0.5em 0.35em 1.8em; border: 1px solid var(--border); border-radius: 4px; font-size: 0.85em; background: var(--item-bg); color: var(--text); }
    .kc-search-wrap input:focus { border-color: var(--accent); outline: none; background: var(--card); }
    .kc-search-wrap .search-icon { position: absolute; left: 0.5em; top: 50%; transform: translateY(-50%); color: var(--muted); font-size: 0.85em; pointer-events: none; }
    .kc-search-wrap .search-clear { position: absolute; right: 0.4em; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--muted); cursor: pointer; font-size: 0.9em; padding: 0; line-height: 1; }
    .keycode-btn.hidden { display: none; }

    /* Binding editor overlay */
    .binding-editor-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.45); z-index: 300; display: none; align-items: center; justify-content: center; animation: fadeIn 0.15s ease; }
    .binding-editor-overlay.visible { display: flex; }
    .be-dialog { background: var(--card); border: 1px solid var(--border); border-radius: 10px; width: 640px; max-width: 95vw; max-height: 85vh; color: var(--text); box-shadow: 0 12px 40px rgba(0,0,0,0.35); animation: slideUp 0.2s ease; display: flex; flex-direction: column; overflow: hidden; }
    .be-header { padding: 0.7em 1.2em; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 0.6em; }
    .be-header h3 { margin: 0; font-size: 1em; color: var(--accent2); font-weight: 600; }
    .be-header .be-key-badge { background: var(--item-bg); border: 1px solid var(--border); border-radius: 4px; padding: 0.1em 0.5em; font-size: 0.8em; color: var(--muted); }
    .be-header .be-quick-btns { margin-left: auto; display: flex; gap: 4px; }
    .be-body { padding: 0.8em 1.2em; overflow-y: auto; flex: 1; }
    .be-row { display: flex; flex-wrap: wrap; gap: 0.5em; align-items: center; margin-bottom: 0.5em; }
    .be-row label { min-width: 70px; font-weight: 600; font-size: 0.85em; }
    .be-row select, .be-row input { min-width: 120px; }
    .be-kc-scroll { max-height: 320px; overflow-y: auto; margin-top: 0.3em; padding-right: 4px; }
    .keycode-grid { display: flex; flex-wrap: wrap; gap: 3px; max-height: 200px; overflow-y: auto; padding: 0.3em; border: 1px solid var(--border); border-radius: 5px; background: var(--item-bg); margin-top: 0.3em; }
    .keycode-btn { background: var(--card); border: 1px solid var(--border); border-radius: 4px; padding: 0.25em 0.4em; font-size: 0.72em; cursor: pointer; text-align: center; color: var(--text); transition: all 0.1s; white-space: nowrap; }
    .keycode-btn:hover { background: var(--key-hover); border-color: var(--accent); transform: scale(1.04); }
    .keycode-btn.active { background: var(--accent); color: #fff; border-color: var(--accent); }
    .keycode-category { margin-top: 0.3em; }
    .keycode-category summary { font-size: 0.82em; font-weight: 600; color: var(--accent2); cursor: pointer; margin-bottom: 0.15em; padding: 0.2em 0; }
    .be-actions { padding: 0.6em 1.2em; border-top: 1px solid var(--border); display: flex; gap: 8px; align-items: center; }

    /* Behavior Picker Popup */
    .behp-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.4); z-index: 350; display: none; align-items: center; justify-content: center; animation: fadeIn 0.15s ease; }
    .behp-overlay.visible { display: flex; }
    .behp-dialog { background: var(--card); border: 1px solid var(--border); border-radius: 10px; width: 580px; max-width: 95vw; max-height: 80vh; color: var(--text); box-shadow: 0 12px 40px rgba(0,0,0,0.35); animation: slideUp 0.2s ease; display: flex; flex-direction: column; overflow: hidden; }
    .behp-header { padding: 0.5em 1em; border-bottom: 1px solid var(--border); display: flex; align-items: center; }
    .behp-header h3 { margin: 0; font-size: 0.95em; color: var(--accent2); font-weight: 600; flex: 1; }
    .behp-close { background: none; border: none; color: var(--muted); font-size: 1.2em; cursor: pointer; padding: 0 0.3em; }
    .behp-close:hover { color: var(--text); }
    .behp-body { padding: 0.6em 1em; overflow-y: auto; flex: 1; }
    .behp-search-wrap { position: relative; margin-bottom: 0.5em; }
    .behp-search-wrap input { width: 100%; padding: 0.35em 0.5em 0.35em 1.8em; border: 1px solid var(--border); border-radius: 4px; font-size: 0.85em; background: var(--item-bg); color: var(--text); box-sizing: border-box; }
    .behp-search-wrap input:focus { border-color: var(--accent); outline: none; background: var(--card); }
    .behp-search-wrap .search-icon { position: absolute; left: 0.5em; top: 50%; transform: translateY(-50%); color: var(--muted); font-size: 0.85em; pointer-events: none; }
    .behp-search-wrap .search-clear { position: absolute; right: 0.4em; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--muted); cursor: pointer; font-size: 0.9em; padding: 0; line-height: 1; }
    .behp-cat { margin-bottom: 0.4em; }
    .behp-cat summary { font-size: 0.82em; font-weight: 600; color: var(--accent2); cursor: pointer; padding: 0.2em 0; user-select: none; }
    .behp-cat-grid { display: flex; flex-wrap: wrap; gap: 4px; padding: 0.3em; border: 1px solid var(--border); border-radius: 5px; background: var(--item-bg); margin-top: 0.2em; }
    .behp-btn { background: var(--card); border: 1px solid var(--border); border-radius: 4px; padding: 0.3em 0.55em; font-size: 0.78em; cursor: pointer; color: var(--text); transition: all 0.1s; text-align: left; display: inline-flex; flex-direction: column; gap: 1px; }
    .behp-btn:hover { background: var(--key-hover); border-color: var(--accent); transform: scale(1.03); }
    .behp-btn.active { background: var(--accent); color: #fff; border-color: var(--accent); }
    .behp-btn .behp-name { font-weight: 600; white-space: nowrap; }
    .behp-btn .behp-label { font-size: 0.85em; color: var(--muted); white-space: nowrap; }
    .behp-btn:hover .behp-label { color: inherit; }
    .behp-btn.active .behp-label { color: rgba(255,255,255,0.85); }
    .behp-btn.hidden { display: none; }

    /* Multi-param sub-panel in binding picker */
    .bp-multi-row { display: flex; flex-wrap: wrap; gap: 0.5em; align-items: center; margin-bottom: 0.5em; }
    .bp-multi-row label { min-width: 70px; font-weight: 600; font-size: 0.85em; color: var(--accent2); }
    .bp-multi-row select, .bp-multi-row input[type=text] { min-width: 120px; font-size: 0.85em; padding: 0.3em 0.5em; border: 1px solid var(--border); border-radius: 4px; background: var(--item-bg); color: var(--text); }
    .bp-multi-row select:focus, .bp-multi-row input[type=text]:focus { border-color: var(--accent); outline: none; background: var(--card); }
    .bp-multi-mods { display: flex; flex-wrap: wrap; gap: 4px; margin: 0.3em 0; }
    .bp-multi-mods label { min-width: auto; font-weight: normal; font-size: 0.8em; display: inline-flex; align-items: center; gap: 3px; cursor: pointer; }
    .bp-multi-apply-row { margin-top: 0.5em; padding-top: 0.5em; border-top: 1px solid var(--border); }
    .bp-multi-apply { font-size: 0.85em; padding: 0.35em 1.2em; cursor: pointer; background: var(--accent); color: #fff; border: 1px solid var(--accent); border-radius: 4px; }
    .bp-multi-apply:hover { opacity: 0.9; }
    .be-actions .be-spacer { flex: 1; }

    /* Binding select (dropdown + raw-code fallback) */
    .beh-binding-wrap { display: inline-flex; flex-direction: column; gap: 0.2em; }
    .beh-binding-wrap select { font-size: 0.88em; padding: 0.3em 0.4em; border: 1px solid var(--border); border-radius: 4px; background: var(--item-bg); color: var(--text); }
    .beh-binding-wrap select:focus { border-color: var(--accent); outline: none; background: var(--card); }
    .beh-binding-wrap .beh-binding-raw { font-size: 0.88em; padding: 0.3em 0.5em; border: 1px solid var(--border); border-radius: 4px; background: var(--item-bg); color: var(--text); margin-top: 0.15em; }
    .beh-binding-wrap .beh-binding-raw:focus { border-color: var(--accent); outline: none; background: var(--card); }

    /* Binding picker trigger button */
    .bp-trigger { display: inline-flex; align-items: center; gap: 0.3em; font-size: 0.88em; padding: 0.3em 0.5em; border: 1px solid var(--border); border-radius: 4px; background: var(--item-bg); color: var(--text); cursor: pointer; min-width: 120px; text-align: left; }
    .bp-trigger:hover { border-color: var(--accent); background: var(--card); }
    .behp-trigger { display: inline-flex; align-items: center; gap: 0.3em; font-size: 0.88em; padding: 0.3em 0.5em; border: 1px solid var(--border); border-radius: 4px; background: var(--item-bg); color: var(--text); cursor: pointer; min-width: 120px; text-align: left; }
    .behp-trigger:hover { border-color: var(--accent); background: var(--card); }
    .bp-trigger .bp-trigger-text, .behp-trigger .bp-trigger-text { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .bp-trigger .bp-trigger-arrow, .behp-trigger .bp-trigger-arrow { color: var(--muted); font-size: 0.75em; flex-shrink: 0; }

    /* Binding picker raw row */
    .bp-raw-row { border-top: 1px solid var(--border); padding-top: 0.5em; margin-top: 0.3em; }

    /* Combo editor */
    .combo-mini-kb { max-width: 500px; margin: 0.4em 0; }

    /* Macro step editor */
    .macro-step { display: flex; align-items: center; gap: 0.4em; padding: 0.35em 0.4em; background: var(--item-bg); border: 1px solid var(--border); border-radius: 4px; margin-bottom: 3px; flex-wrap: wrap; }
    .macro-step .step-num { color: var(--muted); font-size: 0.8em; min-width: 20px; font-weight: 600; }
    .macro-step select { font-size: 0.82em; padding: 0.2em 0.3em; border: 1px solid var(--border); border-radius: 3px; background: var(--card); color: var(--text); min-width: 140px; }
    .macro-step input { font-size: 0.82em; padding: 0.2em 0.3em; border: 1px solid var(--border); border-radius: 3px; background: var(--card); color: var(--text); }
    .macro-step .step-desc { font-size: 0.75em; color: var(--muted); font-style: italic; }
    .macro-step .step-fields { display: flex; align-items: center; gap: 0.3em; flex-wrap: wrap; }
    .macro-step-move { background: none; border: none; color: var(--muted); cursor: pointer; font-size: 0.9em; padding: 0 0.15em; }
    .macro-step-move:hover { color: var(--accent); }
    .macro-kc-item:hover { background: var(--accent, #89b4fa); color: #000; }
    .ms-type-trigger { display: inline-flex; align-items: center; gap: 0.3em; font-size: 0.82em; padding: 0.25em 0.5em; border: 1px solid var(--border); border-radius: 4px; background: var(--card); color: var(--text); cursor: pointer; min-width: 140px; text-align: left; }
    .ms-type-trigger:hover { border-color: var(--accent); background: var(--item-bg); }
    .ms-type-trigger .ms-type-label { font-weight: 600; white-space: nowrap; }
    .ms-type-trigger .ms-type-desc { font-size: 0.85em; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .ms-beh-trigger { display: inline-flex; align-items: center; gap: 0.3em; font-size: 0.82em; padding: 0.25em 0.5em; border: 1px solid var(--border); border-radius: 4px; background: var(--card); color: var(--text); cursor: pointer; min-width: 120px; text-align: left; }
    .ms-beh-trigger:hover { border-color: var(--accent); background: var(--item-bg); }
    .mst-popup { position: fixed; z-index: 10000; background: var(--card); border: 1px solid var(--border); border-radius: 8px; box-shadow: 0 8px 32px rgba(0,0,0,0.45); width: 420px; max-height: 70vh; display: flex; flex-direction: column; animation: slideUp 0.15s ease; }
    .mst-popup-header { padding: 0.5em 0.8em; border-bottom: 1px solid var(--border); display: flex; align-items: center; }
    .mst-popup-header h4 { margin: 0; font-size: 0.9em; color: var(--accent2); font-weight: 600; flex: 1; }
    .mst-popup-close { background: none; border: none; color: var(--muted); font-size: 1.1em; cursor: pointer; padding: 0 0.2em; }
    .mst-popup-close:hover { color: var(--danger); }
    .mst-popup-body { padding: 0.5em; overflow-y: auto; flex: 1; display: flex; flex-direction: column; gap: 3px; }
    .mst-item { display: flex; align-items: center; gap: 0.5em; padding: 0.4em 0.6em; border: 1px solid var(--border); border-radius: 5px; background: var(--item-bg); cursor: pointer; transition: all 0.1s; }
    .mst-item:hover { background: var(--key-hover); border-color: var(--accent); }
    .mst-item.active { background: var(--accent); color: #fff; border-color: var(--accent); }
    .mst-item .mst-name { font-weight: 600; font-size: 0.88em; white-space: nowrap; min-width: 100px; }
    .mst-item .mst-desc { font-size: 0.78em; color: var(--muted); }
    .mst-item:hover .mst-desc { color: inherit; }
    .mst-item.active .mst-desc { color: rgba(255,255,255,0.85); }
    .macro-props { display: flex; flex-wrap: wrap; gap: 0.5em; margin: 0.3em 0; padding: 0.4em; background: var(--item-bg); border: 1px solid var(--border); border-radius: 4px; }
    .macro-props label { font-size: 0.82em; display: flex; align-items: center; gap: 0.3em; }
    .macro-props input, .macro-props select { font-size: 0.82em; padding: 0.2em 0.3em; border: 1px solid var(--border); border-radius: 3px; background: var(--card); color: var(--text); width: 70px; }
    .combo-mini-kb .key-rect { cursor: pointer; }
    .combo-mini-kb .key-group.combo-selected .key-rect { fill: var(--accent); stroke: var(--accent2); }
    .combo-mini-kb .key-group.combo-selected .key-label { fill: #fff; }

    /* Generic keymap popup overlay (shared by combo, macro, behavior, cond-layer editors) */
    .km-popup-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.45); z-index: 300; display: none; align-items: center; justify-content: center; animation: fadeIn 0.15s ease; }
    .km-popup-overlay.visible { display: flex; }
    .km-popup-dialog { background: var(--card); border: 1px solid var(--border); border-radius: 10px; width: 560px; max-width: 95vw; max-height: 85vh; color: var(--text); box-shadow: 0 12px 40px rgba(0,0,0,0.35); animation: slideUp 0.2s ease; display: flex; flex-direction: column; overflow: hidden; }
    .km-popup-header { padding: 0.7em 1.2em; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 0.6em; }
    .km-popup-header h3 { margin: 0; font-size: 1em; color: var(--accent2); font-weight: 600; flex: 1; }
    .km-popup-header .km-popup-close { background: none; border: none; color: var(--muted); font-size: 1.3em; cursor: pointer; padding: 0 0.2em; line-height: 1; }
    .km-popup-header .km-popup-close:hover { color: var(--danger); }
    .km-popup-body { padding: 0.8em 1.2em; overflow-y: auto; flex: 1; }
    .km-popup-body .input-row { display: flex; flex-wrap: wrap; gap: 0.5em; align-items: center; margin-bottom: 0.5em; }
    .km-popup-body .input-group { display: flex; flex-direction: column; gap: 0.15em; }
    .km-popup-body .input-group label { font-weight: 600; font-size: 0.82em; color: var(--accent2); }
    .km-popup-body .input-group input, .km-popup-body .input-group select { font-size: 0.88em; padding: 0.3em 0.5em; border: 1px solid var(--border); border-radius: 4px; background: var(--item-bg); color: var(--text); }
    .km-popup-body .input-group input:focus, .km-popup-body .input-group select:focus { border-color: var(--accent); outline: none; background: var(--card); }
    .km-popup-body .km-search-wrap { position: relative; margin-bottom: 0.5em; }
    .km-popup-body .km-search-wrap input { width: 100%; padding: 0.35em 0.5em 0.35em 1.8em; border: 1px solid var(--border); border-radius: 4px; font-size: 0.85em; background: var(--item-bg); color: var(--text); box-sizing: border-box; }
    .km-popup-body .km-search-wrap input:focus { border-color: var(--accent); outline: none; background: var(--card); }
    .km-popup-body .km-search-wrap .search-icon { position: absolute; left: 0.5em; top: 50%; transform: translateY(-50%); color: var(--muted); font-size: 0.85em; pointer-events: none; }
    .km-popup-body .km-search-wrap .search-clear { position: absolute; right: 0.4em; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--muted); cursor: pointer; font-size: 0.9em; padding: 0; line-height: 1; }
    .km-popup-footer { padding: 0.6em 1.2em; border-top: 1px solid var(--border); display: flex; gap: 8px; justify-content: flex-end; }
    .km-popup-footer button { min-width: 80px; }

    /* Section list search (outside popup, in section body) */
    .section-body .km-search-wrap { position: relative; }
    .section-body .km-search-wrap input { width: 100%; padding: 0.35em 0.5em 0.35em 1.8em; border: 1px solid var(--border); border-radius: 4px; font-size: 0.85em; background: var(--item-bg); color: var(--text); box-sizing: border-box; }
    .section-body .km-search-wrap input:focus { border-color: var(--accent); outline: none; background: var(--card); }
    .section-body .km-search-wrap .search-icon { position: absolute; left: 0.5em; top: 50%; transform: translateY(-50%); color: var(--muted); font-size: 0.85em; pointer-events: none; }
    .section-body .km-search-wrap .search-clear { position: absolute; right: 0.4em; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--muted); cursor: pointer; font-size: 0.9em; padding: 0; line-height: 1; }

    /* Quick-Assign overlay */
    .qa-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.55); z-index: 300; display: flex; align-items: center; justify-content: center; }
    .qa-panel { background: var(--card); border-radius: 12px; padding: 1.5em; width: 95%; max-width: 900px; max-height: 90vh; overflow-y: auto; border: 1px solid var(--border); box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
    .qa-panel h3 { color: var(--accent2); margin-bottom: 0.3em; font-size: 1.1em; }
    .qa-panel .qa-desc { color: var(--muted); font-size: 0.85em; margin-bottom: 0.8em; }
    .qa-current { background: var(--item-bg); border: 1px solid var(--border); border-radius: 6px; padding: 0.6em 0.8em; margin-bottom: 0.8em; font-size: 0.9em; }
    .qa-current b { color: var(--accent2); }
    .qa-mini-kb { background: var(--svg-bg); border: 1px solid var(--border); border-radius: 8px; padding: 0.5em; margin-bottom: 0.8em; overflow: visible; }
    .qa-mini-kb .keyboard-svg { width: 100%; display: block; }
    .qa-mini-kb .key-group { cursor: pointer; }
    .qa-mini-kb .key-group.qa-highlight .key-rect { fill: var(--accent); stroke: var(--accent2); stroke-width: 2.5; }
    .qa-mini-kb .key-group.qa-highlight .key-label { fill: #fff; }
    .qa-mini-kb .key-group.qa-done .key-rect { fill: var(--success); opacity: 0.7; }
    .qa-mini-kb .key-group.qa-done .key-label { fill: #fff; }
    .qa-config-row { display: flex; flex-wrap: wrap; gap: 0.6em; align-items: center; margin-bottom: 0.6em; padding: 0.5em; background: var(--item-bg); border: 1px solid var(--border); border-radius: 6px; }
    .qa-config-row label { font-size: 0.85em; font-weight: 500; color: var(--muted); white-space: nowrap; }
    .qa-config-row select { font-size: 0.85em; padding: 0.25em 0.4em; border: 1px solid var(--border); border-radius: 4px; background: var(--card); color: var(--text); }
    .qa-mod-checkboxes { display: flex; flex-wrap: wrap; gap: 0.2em 0.6em; }
    .qa-mod-cb { display: flex; align-items: center; gap: 0.2em; font-size: 0.78em; cursor: pointer; color: var(--text); }
    .qa-mod-cb input { accent-color: var(--accent); }
    .qa-kbd-row { display: flex; gap: 3px; margin-bottom: 3px; justify-content: center; }
    .qa-key { min-width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; background: var(--key-bg); border: 1px solid var(--key-border); border-radius: 4px; font-size: 0.75em; font-weight: 600; cursor: pointer; color: var(--text); transition: all 0.1s; padding: 0 0.3em; flex-shrink: 0; }
    .qa-key:hover { background: var(--key-hover); border-color: var(--accent); }
    .qa-key.wide2 { min-width: 56px; }
    .qa-key.wide3 { min-width: 72px; }
    .qa-key.wide4 { min-width: 100px; }
    .qa-key.wide5 { min-width: 120px; }
    .qa-key.space { min-width: 240px; }
    .qa-key.active { background: var(--accent); color: #fff; border-color: var(--accent2); }
    .qa-listening { display: inline-block; background: var(--success); color: #fff; font-size: 0.78em; padding: 0.15em 0.6em; border-radius: 3px; animation: qa-pulse 1.2s infinite; }
    @keyframes qa-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.6; } }
    .qa-actions { display: flex; gap: 0.5em; margin-top: 0.8em; }

    /* ====== EDITOR OVERLAYS (shared) ====== */
    .editor-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 300; display: flex; align-items: center; justify-content: center; animation: fadeIn 0.15s ease; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
    #macroEditorOverlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 300; align-items: center; justify-content: center; }
    .editor-dialog, .macro-editor-dialog { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 1.4em 1.6em; min-width: 380px; max-width: 540px; color: var(--text); box-shadow: 0 12px 40px rgba(0,0,0,0.35); animation: slideUp 0.2s ease; }
    .editor-dialog h3, .macro-editor-dialog h3 { margin: 0 0 1em 0; font-size: 1.05em; color: var(--accent2); border-bottom: 1px solid var(--border); padding-bottom: 0.6em; }
    .macro-editor-dialog .medit-fields, .editor-dialog .medit-fields { display: flex; flex-direction: column; gap: 10px; }
    .macro-editor-dialog .medit-actions, .editor-dialog .medit-actions { margin-top: 1.2em; display: flex; gap: 8px; justify-content: flex-end; border-top: 1px solid var(--border); padding-top: 0.8em; }
    .macro-editor-dialog .medit-actions button, .editor-dialog .medit-actions button { padding: 6px 18px; border-radius: 5px; font-weight: 500; }
    .editor-dialog .medit-fields .input-group { display: flex; align-items: center; gap: 0.5em; }
    .editor-dialog .medit-fields .input-group label { min-width: 70px; font-weight: 600; font-size: 0.85em; }

    /* ====== FLOATING VALUE PICKER ====== */
    .vp-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 250; background: rgba(0,0,0,0.25); }
    .vp-dialog { position: absolute; width: 320px; z-index: 260; background: var(--card); border: 1px solid var(--border); border-radius: 8px; box-shadow: 0 6px 24px rgba(0,0,0,0.25); padding: 0.6em 0.8em; font-family: 'Segoe UI', system-ui, sans-serif; }
    .vp-dialog .vp-prompt { margin: 0 0 0.3em; font-size: 0.85em; font-weight: 600; color: var(--accent2); }
    .vp-dialog .vp-search { display: block; width: 100%; height: 32px; line-height: 32px; font-size: 1em; margin: 0; padding: 4px 8px; border: 1px solid var(--border); border-radius: 4px; box-sizing: border-box; background: var(--item-bg); color: var(--text); outline: none; }
    .vp-dialog .vp-search:focus { border-color: var(--accent); background: var(--card); }
    ul.vp-results { font-family: 'Fira Code','Fira Mono','Consolas', monospace; list-style: none; max-height: 220px; overflow-y: auto; padding: 4px; margin: 4px 0 0; background: var(--output-bg); border-radius: 4px; }
    .vp-results li { cursor: pointer; color: var(--text); padding: 5px 8px; border-radius: 3px; font-size: 0.88em; transition: background 0.08s; }
    .vp-results li:hover, .vp-results li.vp-hl { background: var(--accent); color: #fff; }
    .vp-results li .vp-match { font-weight: 700; color: var(--danger); }
    .vp-results li:hover .vp-match, .vp-results li.vp-hl .vp-match { color: #fff; }
    .vp-results li .vp-desc { font-size: 0.78em; color: var(--muted); margin-left: 0.5em; font-family: 'Segoe UI', sans-serif; }
    .vp-results li:hover .vp-desc, .vp-results li.vp-hl .vp-desc { color: rgba(255,255,255,0.7); }
    .vp-counter { font-size: 0.72em; color: var(--muted); margin-top: 2px; }
    .vp-counter a { color: var(--accent); cursor: pointer; text-decoration: underline; }
    .vp-mode-bar { display: flex; gap: 4px; margin-bottom: 0.4em; }
    .vp-mode-btn { background: var(--item-bg); border: 1px solid var(--border); border-radius: 3px; padding: 2px 8px; font-size: 0.78em; cursor: pointer; color: var(--text); }
    .vp-mode-btn:hover { background: var(--key-hover); border-color: var(--accent); }
    .vp-mode-btn.active { background: var(--accent); color: #fff; border-color: var(--accent); }

    /* ====== ENHANCED KEY HOVER ====== */
    .keyboard-svg .key-group:hover .key-label,
    .keyboard-svg .key-group:hover .key-label-top,
    .keyboard-svg .key-group:hover .key-label-bottom { fill: #fff; }
    .keyboard-svg .key-group[data-simple="true"] .key-label { font-size: 13px; }
    .keyboard-svg .key-group[data-long="true"] .key-label { font-size: 7.5px; }
    .keyboard-svg .key-group[data-long="true"] .key-label-top { font-size: 6px; }

    @media (max-width: 900px) {
      .main-layout, .km-layout { flex-direction: column; height: auto; overflow: visible; }
      .output-wrap, .km-output { width: 100% !important; max-width: 100% !important; height: auto; min-height: 350px; }
      .resize-handle { display: none; }
    }
  </style>
</head>
<body>

  <!-- ====== TOPBAR ====== -->
  <div class="topbar">
    <h1>ZMK Per-Layer Color and Keymap Editor <small>v0.33</small></h1>
    <div class="tab-bar">
      <button class="tab-btn active" data-tab="tabRgb">RGB Generator</button>
      <button class="tab-btn" data-tab="tabKeymap">Keymap Editor</button>
    </div>
    <div class="topbar-right">
      <button class="dark-toggle" id="darkToggle">&#9790; Dark</button>
    </div>
  </div>

  <!-- ============================================================ -->
  <!-- TAB 1: RGB GENERATOR (from test_v3.html)                     -->
  <!-- ============================================================ -->
  <div class="tab-panel active main-layout" id="tabRgb">
    <div class="editor-panel">

      <!-- IMPORT -->
      <div class="section">
        <div class="section-head" data-toggle="importBody">
          <h2>&#128229; Import Code</h2>
          <span class="toggle-icon">&#9662;</span>
        </div>
        <div class="section-body" id="importBody">
          <textarea id="userCodePaste" rows="6" placeholder="Paste your .dtsi code here (layers, colors, macros, behaviors, combos, blink macros)..."></textarea>
          <div style="margin-top:0.4em;display:flex;align-items:center;gap:0.5em;">
            <button id="parseBtn">Parse &amp; Reflect</button>
            <button id="rgbSyncNamesBtn" title="Overwrite Keymap tab layer names with RGB layer names (by index)" style="background:#2a4a5a;color:#cde;border:1px solid #5a8a9a;font-size:0.85em;padding:0.25em 0.7em;border-radius:4px;cursor:pointer;">Sync Names → Keymap</button>
            <span id="userCodeStatus" class="status-msg" style="display:none;"></span>
            <button class="btn-sm" id="rgbUndoBtn" title="Undo (Ctrl+Z)" disabled style="margin-left:auto;background:var(--item-bg);color:var(--text);border:1px solid var(--border);">&#x21B6; Undo</button>
            <button class="btn-sm" id="rgbRedoBtn" title="Redo (Ctrl+Y)" disabled style="background:var(--item-bg);color:var(--text);border:1px solid var(--border);">&#x21B7; Redo</button>
          </div>
        </div>
      </div>

      <!-- LAYERS & COLORS -->
      <div class="section">
        <div class="section-head" data-toggle="layerBody">
          <h2>&#127912; Layers &amp; Colors</h2>
          <span class="toggle-icon">&#9662;</span>
        </div>
        <div class="section-body" id="layerBody">
          <div class="input-row">
            <div class="input-group"><label>Name</label><input type="text" id="layerName" placeholder="L_ABC" style="width:120px;"></div>
            <div class="input-group"><label>Idx</label><input type="number" id="layerIndex" min="0" placeholder="—" style="width:52px;"></div>
            <div class="input-group"><label>H</label><input type="range" id="hue" min="0" max="360" value="0"><input type="number" id="hueNum" min="0" max="360" value="0" style="width:52px;"></div>
            <div class="input-group"><label>S</label><input type="range" id="sat" min="0" max="100" value="100"><input type="number" id="satNum" min="0" max="100" value="100" style="width:52px;"></div>
            <div class="input-group"><label>B</label><input type="range" id="bri" min="0" max="100" value="50"><input type="number" id="briNum" min="0" max="100" value="50" style="width:52px;"></div>
            <div class="color-swatch" id="colorPreview">
              <input type="color" id="colorWheel" value="#ff0000" title="Pick a color">
            </div>
            <div class="input-group"><label>Label</label><input type="text" id="layerLabel" placeholder="Color label" style="width:100px;"></div>
            <button id="addLayerBtn">+ Add</button>
          </div>
          <div class="filter-bar">
            <label><input type="checkbox" id="showOrphans" checked> Show color-only defines (no layer index)</label>
          </div>
          <div class="item-list" id="layerList"></div>
        </div>
      </div>

      <!-- MACROS -->
      <div class="section">
        <div class="section-head" data-toggle="macroBody">
          <h2>&#9881; Macros</h2>
          <span class="toggle-icon">&#9662;</span>
        </div>
        <div class="section-body" id="macroBody">
          <div class="input-row">
            <div class="input-group"><label>Type</label>
              <select id="macroType"><option value="TO_RGB">TO_RGB</option><option value="MO_RGB">MO_RGB</option><option value="TO_RGB_PRESS">TO_RGB_PRESS</option></select>
            </div>
            <div class="input-group"><label>Name</label><input type="text" id="macroName" placeholder="to_name" style="width:110px;"></div>
            <div class="input-group"><label>Label</label><input type="text" id="macroLabel" placeholder="optional label" style="width:110px;"></div>
            <div class="input-group"><label>Layer</label><select id="macroLayer"></select></div>
            <div class="input-group"><label>Color</label><select id="macroColor"></select></div>
            <div class="input-group release-color-group" id="releaseColorGroup"><label>Release</label><select id="macroReleaseColor"></select></div>
            <button id="addMacroBtn">+ Add</button>
          </div>
          <div class="item-list" id="macroList"></div>
        </div>
      </div>

      <!-- BEHAVIORS -->
      <div class="section">
        <div class="section-head" data-toggle="behaviorBody">
          <h2>&#128260; Hold-Tap Behaviors</h2>
          <span class="toggle-icon">&#9662;</span>
        </div>
        <div class="section-body" id="behaviorBody">
          <div class="input-row">
            <div class="input-group"><label>Name</label><input type="text" id="behaviorName" placeholder="RGB_ht_name" style="width:120px;"></div>
            <div class="input-group"><label>Label</label><input type="text" id="behaviorLabel" placeholder="Label" style="width:120px;"></div>
            <div class="input-group"><label>Macro</label><select id="behaviorMacro"></select></div>
            <button id="addBehaviorBtn">+ Add</button>
          </div>
          <div class="item-list" id="behaviorList"></div>
        </div>
      </div>

      <!-- COMBOS -->
      <div class="section">
        <div class="section-head" data-toggle="comboBody">
          <h2>&#128279; Combos</h2>
          <span class="toggle-icon">&#9662;</span>
        </div>
        <div class="section-body" id="comboBody">
          <div class="input-row">
            <div class="input-group"><label>Name</label><input type="text" id="comboName" placeholder="combo_name" style="width:110px;"></div>
            <div class="input-group"><label>Bind</label><select id="comboBind" style="width:140px;"></select></div>
            <div class="input-group"><label>Pos</label><input type="text" id="comboPos" placeholder="0 1" style="width:60px;" readonly title="Click to select on keyboard"></div>
            <div class="input-group"><label>Layers</label><select id="comboLayerPicker" style="width:120px;cursor:pointer;" title="Pick a layer to add"><option value="">+ Add layer</option></select><span id="comboLayerTags" class="layer-tags"></span><input type="hidden" id="comboLayersInput"></div>
            <button id="addComboBtn">+ Add</button>
          </div>
          <div id="rgbComboMiniKbWrap" style="display:none;">
            <p style="font-size:0.82em;color:var(--muted);margin:0.2em 0;">Click keys to select combo trigger positions:</p>
            <div class="combo-mini-kb" id="rgbComboMiniKb"></div>
          </div>
          <div class="item-list" id="comboList"></div>
        </div>
      </div>

      <!-- BLINK MACROS -->
      <div class="section">
        <div class="section-head" data-toggle="blinkBody">
          <h2>&#128161; Blink / Status Macros</h2>
          <span class="toggle-icon">&#9662;</span>
        </div>
        <div class="section-body" id="blinkBody">
          <div class="input-row">
            <div class="input-group"><label>Type</label>
              <select id="blinkType"><option value="KP_BLINK">KP_BLINK</option><option value="MO_BLINK">MO_BLINK &#9888;</option></select>
            </div>
            <div class="input-group"><label>Name</label><input type="text" id="blinkName" placeholder="blink_macro" style="width:110px;"></div>
            <div class="input-group"><label>Label</label><input type="text" id="blinkLabel" placeholder="optional label" style="width:110px;"></div>
            <div class="input-group" id="blinkKeyGroup"><label>Key</label><input type="text" id="blinkKey" placeholder="CAPS" style="width:80px;"></div>
            <div class="input-group" id="blinkLayerGroup" style="display:none;"><label>Layer</label><select id="blinkLayer"></select></div>
            <div class="input-group"><label>Color</label><select id="blinkColor"></select></div>
            <div class="input-group"><label>Return</label><select id="blinkReturnColor"></select></div>
            <div class="input-group"><label>Wait</label><input type="number" id="blinkWait" value="80" min="0" style="width:50px;"></div>
            <button id="addBlinkMacroBtn">+ Add</button>
          </div>
          <p id="blinkExperimentalNote" style="display:none;margin:4px 0 2px;font-size:0.82em;color:#e8a735;">&#9888; MO_BLINK is <b>experimental</b> &mdash; binds a momentary layer + blink sequence. USE WITH RGB_HT!</p>
          <div class="item-list" id="blinkMacroList"></div>
        </div>
      </div>

      <!-- MACRO EDITOR SUB-WINDOW (hidden by default) -->
      <div id="macroEditorOverlay" style="display:none;">
        <div class="macro-editor-dialog">
          <h3>Edit Macro</h3>
          <div class="medit-fields">
            <div class="input-group"><label>Name</label><input type="text" id="meditName" style="width:160px;"></div>
            <div class="input-group"><label>Label</label><input type="text" id="meditLabel" placeholder="optional label" style="width:160px;"></div>
            <div class="input-group"><label>Type</label>
              <select id="meditType">
                <option value="TO_RGB">TO_RGB</option>
                <option value="MO_RGB">MO_RGB</option>
                <option value="TO_RGB_PRESS">TO_RGB_PRESS</option>
              </select>
            </div>
            <div class="input-group"><label>Layer</label><select id="meditLayer"></select></div>
            <div class="input-group"><label>Color</label><select id="meditColor"></select></div>
            <div class="input-group" id="meditReleaseGroup"><label>Release Color</label><select id="meditReleaseColor"></select></div>
          </div>
          <div class="medit-actions">
            <button id="meditSaveBtn">Save</button>
            <button id="meditCancelBtn">Cancel</button>
          </div>
        </div>
      </div>
    </div>

    <!-- COMBO EDITOR OVERLAY -->
    <div id="comboEditorOverlay" class="editor-overlay" style="display:none;">
      <div class="editor-dialog">
        <h3>&#128279; Edit Combo</h3>
        <div class="medit-fields">
          <div class="input-group"><label>Name</label><input type="text" id="ceditName" style="width:180px;"></div>
          <div class="input-group"><label>Binding</label><select id="ceditBind" style="width:220px;"></select></div>
          <div class="input-group"><label>Layers</label>
            <select id="ceditLayerPicker" style="width:140px;cursor:pointer;" title="Pick a layer"><option value="">+ Add layer</option></select>
            <span id="ceditLayerTags" class="layer-tags"></span>
          </div>
          <div>
            <label style="margin-bottom:4px;display:block;">Positions <small style="color:var(--muted);">(click keys)</small></label>
            <div class="combo-mini-kb" id="ceditMiniKb" style="max-width:440px;"></div>
          </div>
        </div>
        <div class="medit-actions">
          <button id="ceditSaveBtn">Save</button>
          <button id="ceditCancelBtn">Cancel</button>
        </div>
      </div>
    </div>

    <!-- BEHAVIOR EDITOR OVERLAY -->
    <div id="behaviorEditorOverlay" class="editor-overlay" style="display:none;">
      <div class="editor-dialog">
        <h3>&#128260; Edit Behavior</h3>
        <div class="medit-fields">
          <div class="input-group"><label>Name</label><input type="text" id="beditName" style="width:180px;"></div>
          <div class="input-group"><label>Label</label><input type="text" id="beditLabel" style="width:220px;"></div>
          <div class="input-group"><label>Macro Ref</label><select id="beditMacro" style="width:220px;"></select></div>
        </div>
        <div class="medit-actions">
          <button id="beditSaveBtn">Save</button>
          <button id="beditCancelBtn">Cancel</button>
        </div>
      </div>
    </div>

    <!-- RIGHT: OUTPUT -->
    <div class="output-wrap" id="outputWrap">
      <div class="resize-handle" id="resizeHandle"></div>
      <div class="output-inner">
        <div class="output-header">
          <h2>Generated Output</h2>
          <button id="copyOutputBtn">Copy</button>
          <button id="rgbEditToggle" style="background:var(--item-bg);color:var(--text);border:1px solid var(--border);font-size:0.82em;padding:0.3em 0.8em;border-radius:4px;cursor:pointer;">&#9998; Edit</button>
          <label><input type="checkbox" id="includeHelpers" checked> Helpers</label>
        </div>
        <textarea id="output" class="output-textarea" readonly></textarea>
        <div class="output-stats" id="outputStats">0 layers &middot; 0 macros &middot; 0 behaviors &middot; 0 combos</div>
      </div>
    </div>
  </div>

  <!-- ============================================================ -->
  <!-- TAB 2: KEYMAP EDITOR                                         -->
  <!-- ============================================================ -->
  <div class="tab-panel km-layout" id="tabKeymap">
    <!-- LAYER SIDEBAR -->
    <div class="layer-sidebar" id="layerSidebar"></div>

    <div class="km-center">

      <!-- IMPORT KEYMAP -->
      <div class="section">
        <div class="section-head" data-toggle="kmImportBody">
          <h2>&#128229; Import .keymap</h2>
          <span class="toggle-icon">&#9662;</span>
        </div>
        <div class="section-body" id="kmImportBody">
          <div class="input-row" style="margin-bottom:0.3em;">
            <button id="kmLoadLayoutBtn">Load Layout JSON</button>
            <button id="kmUseDefaultLayoutBtn">Use Default Corne</button>
            <button id="kmUseLotus58Btn">Use Lotus58</button>
            <span id="kmLayoutStatus" class="status-msg" style="display:none;"></span>
          </div>
          <textarea id="kmKeymapPaste" rows="6" placeholder="Paste your .keymap file content here..."></textarea>
          <div style="margin-top:0.4em;display:flex;align-items:center;gap:0.5em;">
            <button id="kmParseBtn">Parse Keymap</button>
            <button id="kmSyncNamesBtn" title="Overwrite RGB tab layer names with Keymap layer names (by index)" style="background:#2a4a5a;color:#cde;border:1px solid #5a8a9a;font-size:0.85em;padding:0.25em 0.7em;border-radius:4px;cursor:pointer;">Sync Names → RGB</button>
            <span id="kmParseStatus" class="status-msg" style="display:none;"></span>
          </div>
        </div>
      </div>

      <!-- LAYER HEADER -->
      <div class="layer-header" id="layerHeader">
        <div id="layerInlineEdit" style="display:flex;align-items:center;gap:0.5em;flex-wrap:wrap;">
          <div class="input-group" style="gap:3px;"><label style="font-size:0.75em;color:var(--muted);">Display</label><input type="text" id="lcInlineDisplay" style="width:120px;font-size:1.05em;font-weight:600;color:var(--accent2);background:var(--item-bg);border:1px solid var(--border);border-radius:4px;padding:0.15em 0.4em;" placeholder="Display name"></div>
          <div class="input-group" style="gap:3px;"><label style="font-size:0.75em;color:var(--muted);">Name</label><input type="text" id="lcInlineName" style="width:120px;font-size:0.85em;color:var(--text);background:var(--item-bg);border:1px solid var(--border);border-radius:4px;padding:0.15em 0.4em;" placeholder="layer_name"></div>
          <span style="font-size:0.8em;color:var(--muted);" id="lcInlineIdx"></span>
        </div>
        <button class="layer-ctx-btn" id="layerCtxBtn" title="Layer actions">&#8943;</button>
        <span style="margin-left:auto;display:flex;gap:4px;">
          <button class="btn-sm" id="kmUndoBtn" title="Undo (Ctrl+Z)" disabled style="background:var(--item-bg);color:var(--text);border:1px solid var(--border);">&#x21B6; Undo</button>
          <button class="btn-sm" id="kmRedoBtn" title="Redo (Ctrl+Y)" disabled style="background:var(--item-bg);color:var(--text);border:1px solid var(--border);">&#x21B7; Redo</button>
        </span>
      </div>

      <!-- SVG KEYBOARD -->
      <div class="keyboard-container" id="keyboardContainer">
        <svg class="keyboard-svg" id="keyboardSvg"></svg>
        <div style="text-align:center;font-size:0.7em;color:var(--muted);margin-top:2px;">Click key to edit &middot; Ctrl+Z undo &middot; Ctrl+Y redo &middot; Esc close</div>
      </div>

      <!-- SENSOR BINDINGS VISUAL DISPLAY -->
      <div class="sensor-bindings-area" id="sensorBindingsArea" style="display:none;">
        <h4>Sensor bindings</h4>
        <div class="sensor-cards" id="sensorCards"></div>
      </div>

      <!-- BINDING EDITOR OVERLAY -->
      <div class="binding-editor-overlay" id="bindingEditor">
        <div class="be-dialog">
          <div class="be-header">
            <h3>&#9000; Edit Key Binding</h3>
            <span class="be-key-badge" id="beKeyIndex">Key 0</span>
            <div class="be-quick-btns">
              <button id="beSetNone" title="Set &amp;none" style="font-size:0.78em; padding:3px 10px; background:var(--danger);">&amp;none</button>
              <button id="beSetTrans" title="Set &amp;trans" style="font-size:0.78em; padding:3px 10px; background:var(--accent2);">&amp;trans</button>
            </div>
          </div>
          <div class="be-body">
            <div class="be-row">
              <label>Behavior</label>
              <button class="behp-trigger" id="beBehaviorTrigger" type="button" style="width:260px;">
                <span class="bp-trigger-text" id="beBehaviorText">&mdash; Select &mdash;</span>
                <span class="bp-trigger-arrow">&#9662;</span>
              </button>
              <input type="hidden" id="beBehavior" value="">
            </div>
            <div id="beDescRow" style="padding:0 0.5em;font-size:0.78em;color:var(--muted);"></div>
            <div class="be-row" id="beParam1Row">
              <label id="beParam1Label">Param 1</label>
              <div id="beParam1Container"></div>
            </div>
            <div class="be-row" id="beParam2Row" style="display:none;">
              <label id="beParam2Label">Param 2</label>
              <div id="beParam2Container"></div>
            </div>
            <div id="beModSection" style="display:none;">
              <label style="font-weight:600;font-size:0.82em;color:var(--accent2);margin-bottom:0.1em;">Modifiers</label>
              <div class="mod-checkboxes" id="beModCheckboxes">
                <label class="mod-cb-label"><input type="checkbox" data-mod="LSHFT"> LSHFT</label>
                <label class="mod-cb-label"><input type="checkbox" data-mod="LALT"> LALT</label>
                <label class="mod-cb-label"><input type="checkbox" data-mod="LCTRL"> LCTRL</label>
                <label class="mod-cb-label"><input type="checkbox" data-mod="LGUI"> LGUI</label>
                <label class="mod-cb-label"><input type="checkbox" data-mod="RSHFT"> RSHFT</label>
                <label class="mod-cb-label"><input type="checkbox" data-mod="RALT"> RALT</label>
                <label class="mod-cb-label"><input type="checkbox" data-mod="RCTRL"> RCTRL</label>
                <label class="mod-cb-label"><input type="checkbox" data-mod="RGUI"> RGUI</label>
              </div>
            </div>
            <div id="beKeycodeSection" style="display:none;">
              <div class="kc-search-wrap">
                <span class="search-icon">&#128269;</span>
                <input type="text" id="kcSearchInput" placeholder="Search keycodes...">
                <button class="search-clear" id="kcSearchClear" style="display:none;">&times;</button>
              </div>
              <div class="be-kc-scroll">
                <details class="keycode-category" open>
                  <summary>Letters</summary>
                  <div class="keycode-grid" id="kcLetters"></div>
                </details>
                <details class="keycode-category">
                  <summary>Numbers</summary>
                  <div class="keycode-grid" id="kcNumbers"></div>
                </details>
                <details class="keycode-category">
                  <summary>Modifiers</summary>
                  <div class="keycode-grid" id="kcMods"></div>
                </details>
                <details class="keycode-category">
                  <summary>Control &amp; Whitespace</summary>
                  <div class="keycode-grid" id="kcControl"></div>
                </details>
                <details class="keycode-category">
                  <summary>Navigation</summary>
                  <div class="keycode-grid" id="kcNav"></div>
                </details>
                <details class="keycode-category">
                  <summary>Locks</summary>
                  <div class="keycode-grid" id="kcLocks"></div>
                </details>
                <details class="keycode-category">
                  <summary>Symbols</summary>
                  <div class="keycode-grid" id="kcSymbols"></div>
                </details>
                <details class="keycode-category">
                  <summary>Function Keys</summary>
                  <div class="keycode-grid" id="kcFkeys"></div>
                </details>
                <details class="keycode-category">
                  <summary>Numpad</summary>
                  <div class="keycode-grid" id="kcNumpad"></div>
                </details>
                <details class="keycode-category">
                  <summary>Media</summary>
                  <div class="keycode-grid" id="kcMedia"></div>
                </details>
                <details class="keycode-category">
                  <summary>Editing</summary>
                  <div class="keycode-grid" id="kcEdit"></div>
                </details>
                <details class="keycode-category">
                  <summary>Applications</summary>
                  <div class="keycode-grid" id="kcApps"></div>
                </details>
                <details class="keycode-category">
                  <summary>Miscellaneous</summary>
                  <div class="keycode-grid" id="kcMisc"></div>
                </details>
                <details class="keycode-category">
                  <summary>International</summary>
                  <div class="keycode-grid" id="kcInternational"></div>
                </details>
                <details class="keycode-category">
                  <summary>Language</summary>
                  <div class="keycode-grid" id="kcLanguage"></div>
                </details>
                <details class="keycode-category">
                  <summary>Power &amp; Lock</summary>
                  <div class="keycode-grid" id="kcPower"></div>
                </details>
              </div>
            </div>
          </div>
          <div class="be-actions">
            <button id="beApplyBtn">&#10003; Apply</button>
            <button id="beCancelBtn" style="background:var(--muted);">Cancel</button>
          </div>
        </div>
      </div>

      <!-- BEHAVIOR PICKER POPUP -->
      <div class="behp-overlay" id="behaviorPickerOverlay">
        <div class="behp-dialog">
          <div class="behp-header">
            <h3>Select Behavior</h3>
            <button class="behp-close" id="behpCloseBtn">&times;</button>
          </div>
          <div class="behp-body">
            <div class="behp-search-wrap">
              <span class="search-icon">&#128269;</span>
              <input type="text" id="behpSearchInput" placeholder="Search behaviors and macros...">
              <button class="search-clear" id="behpSearchClear" style="display:none;">&times;</button>
            </div>
            <div id="behpCategories"></div>
          </div>
        </div>
      </div>

      <!-- BINDING PICKER POPUP (shared by all binding trigger buttons) -->
      <div class="behp-overlay" id="bindingPickerOverlay" style="z-index:400;">
        <div class="behp-dialog">
          <div class="behp-header">
            <h3 id="bpTitle">Select Binding</h3>
            <button class="behp-close" id="bpCloseBtn">&times;</button>
          </div>
          <div class="behp-body" id="bpBody">
            <div class="behp-search-wrap" id="bpSearchWrap">
              <span class="search-icon">&#128269;</span>
              <input type="text" id="bpSearchInput" placeholder="Search bindings...">
              <button class="search-clear" id="bpSearchClear" style="display:none;">&times;</button>
            </div>
            <div id="bpSections"></div>
            <div id="bpSubPanel" style="display:none;">
              <div style="display:flex;align-items:center;gap:0.5em;margin-bottom:0.5em;">
                <button id="bpSubBack" style="font-size:0.82em;padding:2px 10px;cursor:pointer;background:var(--item-bg);border:1px solid var(--border);border-radius:4px;color:var(--text);">&larr; Back</button>
                <span id="bpSubTitle" style="font-weight:600;font-size:0.88em;color:var(--accent2);"></span>
              </div>
              <div class="behp-search-wrap" id="bpKcSearchWrap">
                <span class="search-icon">&#128269;</span>
                <input type="text" id="bpKcSearch" placeholder="Search keycodes...">
                <button class="search-clear" id="bpKcSearchClear" style="display:none;">&times;</button>
              </div>
              <div class="be-kc-scroll" id="bpSubScroll"></div>
            </div>
            <div class="bp-raw-row" id="bpRawRow">
              <label style="font-size:0.8em;font-weight:600;color:var(--muted);margin-bottom:2px;display:block;">Or type raw code:</label>
              <div style="display:flex;gap:4px;">
                <input type="text" id="bpRawInput" placeholder="e.g. &amp;kp A" style="flex:1;font-size:0.85em;padding:0.3em 0.5em;border:1px solid var(--border);border-radius:4px;background:var(--item-bg);color:var(--text);">
                <button id="bpRawApply" style="font-size:0.82em;padding:0.3em 0.8em;cursor:pointer;background:var(--accent);color:#fff;border:1px solid var(--accent);border-radius:4px;">Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SUB-TAB NAVIGATION -->
      <div class="km-subtab-bar" id="kmSubtabBar">
        <button class="km-subtab-btn active" data-subtab="kmSubCombos">&#128279; Combos</button>
        <button class="km-subtab-btn" data-subtab="kmSubMacros">&#9881; Macros</button>
        <button class="km-subtab-btn" data-subtab="kmSubBuiltin">&#9889; Built-in</button>
        <button class="km-subtab-btn" data-subtab="kmSubBehaviors">&#128260; Behaviors</button>
        <button class="km-subtab-btn" data-subtab="kmSubCondLayers">&#128256; Cond Layers</button>
      </div>

      <div class="km-subtab-content">

      <!-- SUB-TAB: COMBOS -->
      <div class="km-subtab-panel active" id="kmSubCombos">

      <!-- COMBOS -->
      <div class="section">
        <div class="section-head" data-toggle="kmComboBody">
          <h2>&#128279; Combos</h2>
          <span class="toggle-icon">&#9662;</span>
        </div>
        <div class="section-body" id="kmComboBody">
          <div class="input-row">
            <button id="kmAddComboBtn">+ Add Combo</button>
          </div>
          <div class="km-search-wrap" id="comboListSearchWrap" style="margin-top:0.4em;">
            <span class="search-icon">&#128269;</span>
            <input type="text" id="comboListSearch" placeholder="Filter combos...">
            <button class="search-clear" id="comboListSearchClear" style="display:none;">&times;</button>
          </div>
          <div class="item-list" id="kmComboList"></div>
        </div>
      </div>

      <!-- Combo editor popup overlay -->
      <div class="km-popup-overlay" id="kmComboOverlay">
        <div class="km-popup-dialog">
          <div class="km-popup-header">
            <h3>&#128279; Edit Combo</h3>
            <button class="km-popup-close" id="kmComboCancelBtn">&times;</button>
          </div>
          <div class="km-popup-body">
            <div class="input-row">
              <div class="input-group"><label>Name</label><input type="text" id="kmComboName" style="width:140px;"></div>
              <div class="input-group"><label>Binding</label><span id="kmComboBindWrap"></span></div>
            </div>
            <div class="input-row">
              <div class="input-group"><label>Timeout (ms)</label><input type="number" id="kmComboTimeout" value="50" min="0" style="width:70px;"></div>
              <div class="input-group"><label>Layers</label>
                <select id="kmComboLayerPicker" style="width:140px;cursor:pointer;" title="Pick a layer"><option value="">+ Add layer</option></select>
                <span id="kmComboLayerTags" class="layer-tags"></span>
              </div>
            </div>
            <div class="input-row">
              <div class="input-group"><label>Require Prior Idle (ms)</label><input type="number" id="kmComboRequirePriorIdle" value="" min="0" placeholder="none" style="width:80px;"></div>
              <label style="display:flex;align-items:center;gap:0.3em;cursor:pointer;margin-left:0.5em;"><input type="checkbox" id="kmComboSlowRelease"> Slow Release</label>
            </div>
            <p style="font-size:0.82em;color:var(--muted);margin:0.4em 0 0.2em;">Click keys to select combo trigger positions:</p>
            <div class="combo-mini-kb" id="comboMiniKb"></div>
          </div>
          <div class="km-popup-footer">
            <button id="kmComboSaveBtn">&#10003; Save Combo</button>
            <button id="kmComboCancelBtn2" style="background:var(--muted);">Cancel</button>
          </div>
        </div>
      </div>

      </div><!-- /kmSubCombos -->

      <!-- SUB-TAB: MACROS -->
      <div class="km-subtab-panel" id="kmSubMacros">

      <!-- MACROS -->
      <div class="section">
        <div class="section-head" data-toggle="kmMacroBody">
          <h2>&#9881; Macros</h2>
          <span class="toggle-icon">&#9662;</span>
        </div>
        <div class="section-body" id="kmMacroBody">
          <div class="input-row">
            <button id="kmAddMacroBtn">+ Add Macro</button>
          </div>
          <div class="km-search-wrap" id="macroListSearchWrap" style="margin-top:0.4em;">
            <span class="search-icon">&#128269;</span>
            <input type="text" id="macroListSearch" placeholder="Filter macros...">
            <button class="search-clear" id="macroListSearchClear" style="display:none;">&times;</button>
          </div>
          <div class="item-list" id="kmMacroList"></div>
        </div>
      </div>

      <!-- Macro editor popup overlay -->
      <div class="km-popup-overlay" id="kmMacroOverlay">
        <div class="km-popup-dialog" style="width:600px;">
          <div class="km-popup-header">
            <h3>&#9881; Edit Macro</h3>
            <button class="km-popup-close" id="kmMacroCancelBtn">&times;</button>
          </div>
          <div class="km-popup-body">
            <div class="input-row">
              <div class="input-group"><label>Name</label><input type="text" id="kmMacroName" style="width:160px;"></div>
              <div class="input-group"><label>Label</label><input type="text" id="kmMacroLabel" style="width:160px;"></div>
              <div class="input-group"><label>Params</label>
                <select id="kmMacroParamType">
                  <option value="0" title="Macro takes no parameters — invoked as &macro_name">None (0 params)</option>
                  <option value="1" title="Macro takes 1 parameter — invoked as &macro_name PARAM">One Param</option>
                  <option value="2" title="Macro takes 2 parameters — invoked as &macro_name P1 P2">Two Params</option>
                </select>
              </div>
            </div>
            <div class="macro-props">
              <label>Wait (ms) <input type="number" id="kmMacroWaitMs" value="" min="0" placeholder="default" title="Default macro wait time between steps"></label>
              <label>Tap (ms) <input type="number" id="kmMacroTapMs" value="" min="0" placeholder="default" title="Default macro tap time for keypresses"></label>
            </div>
            <p style="font-size:0.78em;color:var(--muted);margin:0.2em 0;">Each step is a macro action. Use the dropdown to pick the step type.</p>
            <div class="km-search-wrap">
              <span class="search-icon">&#128269;</span>
              <input type="text" id="macroStepSearch" placeholder="Search steps...">
              <button class="search-clear" id="macroStepSearchClear" style="display:none;">&times;</button>
            </div>
            <div id="kmMacroSteps" class="item-list"></div>
            <div class="input-row" style="margin-top:0.3em;flex-wrap:wrap;">
              <button id="kmMacroAddStep" class="btn-sm">+ Add Step</button>
              <button id="kmMacroAddString" class="btn-sm" style="background:var(--success);">+ String Sequence</button>
            </div>
          </div>
          <div class="km-popup-footer">
            <button id="kmMacroSaveBtn">&#10003; Save</button>
            <button id="kmMacroCancelBtn2" style="background:var(--muted);">Cancel</button>
          </div>
        </div>
      </div>

      <!-- String Sequence Modal -->
      <div class="km-popup-overlay" id="stringSeqOverlay">
        <div class="km-popup-dialog" style="width:460px;">
          <div class="km-popup-header">
            <h3>&#9997; String Sequence</h3>
            <button class="km-popup-close" id="stringSeqCloseBtn">&times;</button>
          </div>
          <div class="km-popup-body">
            <p style="font-size:0.82em;color:var(--muted);margin:0 0 0.5em;">Type the text you want the macro to produce. Each character becomes a <code>&amp;kp</code> step.</p>
            <textarea id="stringSeqInput" rows="4" style="width:100%;resize:vertical;font-family:inherit;font-size:0.92em;padding:0.5em;border:1px solid var(--border);border-radius:5px;background:var(--item-bg);color:var(--text);" placeholder="Hello World 123!"></textarea>
            <div id="stringSeqPreview" style="font-size:0.75em;color:var(--muted);margin-top:0.3em;max-height:60px;overflow-y:auto;"></div>
          </div>
          <div class="km-popup-footer">
            <button id="stringSeqAddBtn">&#10003; Add Steps</button>
            <button id="stringSeqCancelBtn" style="background:var(--muted);">Cancel</button>
          </div>
        </div>
      </div>

      </div><!-- /kmSubMacros -->

      <!-- SUB-TAB: BUILT-IN BEHAVIORS -->
      <div class="km-subtab-panel" id="kmSubBuiltin">

      <!-- BUILT-IN BEHAVIORS -->
      <div class="section">
        <div class="section-head" data-toggle="kmBuiltinBehBody">
          <h2>&#9889; Built-in Behaviors</h2>
          <span class="toggle-icon">&#9662;</span>
        </div>
        <div class="section-body" id="kmBuiltinBehBody">
          <p style="font-size:0.82em;color:var(--muted);margin:0 0 0.4em;">Toggle preset ZMK behaviors on/off. Enabled behaviors appear in the binding dropdown and are included in the output.</p>
          <div id="builtinBehaviorToggles"></div>
        </div>
      </div>

      </div><!-- /kmSubBuiltin -->

      <!-- SUB-TAB: BEHAVIORS -->
      <div class="km-subtab-panel" id="kmSubBehaviors">

      <!-- BEHAVIORS -->
      <div class="section">
        <div class="section-head" data-toggle="kmBehaviorBody">
          <h2>&#128260; Behaviors</h2>
          <span class="toggle-icon">&#9662;</span>
        </div>
        <div class="section-body" id="kmBehaviorBody">
          <div class="input-row">
            <button id="kmAddBehaviorBtn">+ Add Behavior</button>
          </div>
          <div class="km-search-wrap" id="behaviorListSearchWrap" style="margin-top:0.4em;">
            <span class="search-icon">&#128269;</span>
            <input type="text" id="behaviorListSearch" placeholder="Filter behaviors...">
            <button class="search-clear" id="behaviorListSearchClear" style="display:none;">&times;</button>
          </div>
          <div class="item-list" id="kmBehaviorList"></div>
        </div>
      </div>

      <!-- Behavior editor popup overlay -->
      <div class="km-popup-overlay" id="kmBehaviorOverlay">
        <div class="km-popup-dialog" style="width:580px;">
          <div class="km-popup-header">
            <h3>&#128260; Edit Behavior</h3>
            <button class="km-popup-close" id="kmBehaviorCancelBtn">&times;</button>
          </div>
          <div class="km-popup-body">
            <div class="input-row">
              <div class="input-group"><label>Name</label><input type="text" id="kmBehaviorName" style="width:160px;"></div>
              <div class="input-group"><label>Type</label>
                <select id="kmBehaviorType">
                  <option value="hold-tap" title="Hold for modifier, tap for keycode. Default ZMK hold-preferred flavor.">Hold-Tap</option>
                  <option value="mod-morph" title="Normal key on press, different key with modifier held.">Mod-Morph</option>
                  <option value="tap-dance" title="Different actions for single, double, triple tap etc.">Tap-Dance</option>
                  <option value="sticky-key" title="Activates modifier for the next keypress only.">Sticky Key</option>
                  <option value="key-toggle" title="Toggle a key on/off with each press.">Key Toggle</option>
                  <option value="caps-word" title="Capitalizes letters until a non-alpha key is pressed.">Caps Word</option>
                  <option value="macro" title="Sequence of key actions executed in order.">Macro</option>
                  <option value="sensor-rotate" title="Bind actions to encoder rotation (clockwise/counter-clockwise).">Sensor Rotation</option>
                </select>
              </div>
              <div class="input-group"><label>Label</label><input type="text" id="kmBehaviorLabel" style="width:160px;"></div>
            </div>
            <div id="kmBehaviorConfig"></div>
            <datalist id="behBindingDL"></datalist>
            <datalist id="behModsDL"></datalist>
          </div>
          <div class="km-popup-footer">
            <button id="kmBehaviorSaveBtn">&#10003; Save</button>
            <button id="kmBehaviorCancelBtn2" style="background:var(--muted);">Cancel</button>
          </div>
        </div>
      </div>

      </div><!-- /kmSubBehaviors -->

      <!-- SUB-TAB: CONDITIONAL LAYERS -->
      <div class="km-subtab-panel" id="kmSubCondLayers">

      <!-- CONDITIONAL LAYERS -->
      <div class="section">
        <div class="section-head" data-toggle="kmCondLayerBody">
          <h2>&#128256; Conditional Layers</h2>
          <span class="toggle-icon">&#9662;</span>
        </div>
        <div class="section-body" id="kmCondLayerBody">
          <div class="input-row">
            <button id="kmAddCondLayerBtn">+ Add Conditional Layer</button>
          </div>
          <div class="km-search-wrap" id="condLayerListSearchWrap" style="margin-top:0.4em;">
            <span class="search-icon">&#128269;</span>
            <input type="text" id="condLayerListSearch" placeholder="Filter layers...">
            <button class="search-clear" id="condLayerListSearchClear" style="display:none;">&times;</button>
          </div>
          <div class="item-list" id="kmCondLayerList"></div>
        </div>
      </div>

      <!-- Conditional layer editor popup overlay -->
      <div class="km-popup-overlay" id="kmCondLayerOverlay">
        <div class="km-popup-dialog" style="width:440px;">
          <div class="km-popup-header">
            <h3>&#128256; Edit Conditional Layer</h3>
            <button class="km-popup-close" id="kmCondCancelBtn">&times;</button>
          </div>
          <div class="km-popup-body">
            <div class="input-row">
              <div class="input-group"><label>Condition name</label><input type="text" id="kmCondName" placeholder="tri_layer" style="width:180px;"></div>
            </div>
            <div class="input-row">
              <div class="input-group"><label>When these layers are active</label>
                <select id="kmCondIfLayers" multiple style="width:100%;min-height:90px;"></select>
              </div>
            </div>
            <div class="input-row">
              <div class="input-group"><label>Activate this layer</label>
                <select id="kmCondThenLayer" style="width:100%;"></select>
              </div>
            </div>
          </div>
          <div class="km-popup-footer">
            <button id="kmCondSaveBtn">&#10003; Save</button>
            <button id="kmCondCancelBtn2" style="background:var(--muted);">Cancel</button>
          </div>
        </div>
      </div>

      <!-- SENSOR EDIT MODAL (hidden by default) -->
      <div class="sensor-modal-overlay" id="sensorModalOverlay" style="display:none;">
        <div class="sensor-modal">
          <h3>Set <code id="smEncoderName">encoder</code> bindings
            <span class="sensor-icon-sm" id="smIconPreview"></span>
          </h3>
          <div class="sm-row">
            <label>Behavior</label>
            <select id="smBehavior">
              <option value="&inc_dec_kp">&inc_dec_kp | Sensor Rotate (variable)</option>
              <option value="custom">Custom behavior reference</option>
            </select>
          </div>
          <div id="smCustomRow" class="sm-row" style="display:none;">
            <label>Custom binding</label>
            <input type="text" id="smCustomBinding" placeholder="&my_sensor_behavior">
          </div>
          <div id="smIncDecParams">
            <div class="sm-params">
              <div class="sm-param-label">Increment</div>
              <div class="sm-row">
                <label>Key Code</label>
                <input type="text" id="smIncrement" placeholder="C_VOL_UP">
                <div class="sm-key-picker" id="smIncKeyPicker"></div>
              </div>
            </div>
            <div class="sm-params" style="margin-top:0.4em;">
              <div class="sm-param-label">Decrement</div>
              <div class="sm-row">
                <label>Key Code</label>
                <input type="text" id="smDecrement" placeholder="C_VOL_DN">
                <div class="sm-key-picker" id="smDecKeyPicker"></div>
              </div>
            </div>
          </div>
          <div class="sm-actions">
            <button class="sm-apply" id="smApplyBtn">Apply</button>
            <button class="sm-cancel" id="smCancelBtn">Cancel</button>
          </div>
        </div>
      </div>

      </div><!-- /kmSubCondLayers -->
      </div><!-- /km-subtab-content -->
    </div>

    <!-- KEYMAP OUTPUT -->
    <div class="output-wrap" id="kmOutputWrap">
      <div class="resize-handle" id="kmResizeHandle"></div>
      <div class="output-inner">
        <div class="output-header">
          <h2>Generated .keymap</h2>
          <button id="kmCopyBtn">Copy</button>
          <button id="kmEditToggle" style="background:var(--item-bg);color:var(--text);border:1px solid var(--border);font-size:0.82em;padding:0.3em 0.8em;border-radius:4px;cursor:pointer;">&#9998; Edit</button>
          <label><input type="checkbox" id="kmIncludeRgbDtsi" checked> RGB .dtsi</label>
        </div>
        <pre class="output-pre" id="kmOutput"></pre>
        <textarea id="kmOutputEdit" class="output-textarea" style="display:none;flex:1;width:100%;border:none;background:transparent;color:var(--output-text);font-family:'Fira Code','Fira Mono','Consolas','Menlo',monospace;font-size:0.88em;padding:0.8em 1em;resize:none;line-height:1.55;outline:none;tab-size:4;white-space:pre;overflow:auto;"></textarea>
        <div class="output-stats" id="kmOutputStats">0 layers</div>
      </div>
    </div>
  </div>

  <!-- Quick-Assign Overlay -->
  <div class="qa-overlay" id="qaOverlay" style="display:none;">
    <div class="qa-panel">
      <h3>&#9000; Quick Assign - <span id="qaLayerName">Layer</span></h3>
      <div class="qa-desc">Click a key on the mini keyboard to jump to it, or walk through sequentially. Press a physical key or click the on-screen keyboard below to assign.</div>
      <div class="qa-mini-kb" id="qaMiniKb"></div>
      <div class="qa-current" id="qaStatus">Assigning key <b>0</b> of <b>42</b> &mdash; Current: <code>&trans</code></div>
      <div class="qa-config-row">
        <label>Behavior:</label>
        <select id="qaBehavior">
          <option value="&kp">&kp - Key Press</option>
          <option value="&trans">&trans - Transparent</option>
          <option value="&none">&none - None</option>
          <option value="&mo">&mo - Momentary Layer</option>
          <option value="&to">&to - To Layer</option>
          <option value="&tog">&tog - Toggle Layer</option>
          <option value="&sl">&sl - Sticky Layer</option>
          <option value="&bt">&bt - Bluetooth</option>
          <option value="&rgb_ug">&rgb_ug - RGB</option>
        </select>
        <span id="qaModWrap" style="display:none;">
          <label style="margin-left:0.5em;">Modifiers:</label>
          <span class="qa-mod-checkboxes" id="qaModCheckboxes">
            <label class="qa-mod-cb"><input type="checkbox" data-mod="LSHFT">LSft</label>
            <label class="qa-mod-cb"><input type="checkbox" data-mod="LALT">LAlt</label>
            <label class="qa-mod-cb"><input type="checkbox" data-mod="LCTRL">LCtl</label>
            <label class="qa-mod-cb"><input type="checkbox" data-mod="LGUI">LGui</label>
            <label class="qa-mod-cb"><input type="checkbox" data-mod="RSHFT">RSft</label>
            <label class="qa-mod-cb"><input type="checkbox" data-mod="RALT">RAlt</label>
            <label class="qa-mod-cb"><input type="checkbox" data-mod="RCTRL">RCtl</label>
            <label class="qa-mod-cb"><input type="checkbox" data-mod="RGUI">RGui</label>
          </span>
        </span>
      </div>
      <div id="qaOnScreenKb"></div>
      <div class="qa-desc" style="margin-top:0.5em;"><span class="qa-listening">&#9679; Listening for physical key press...</span> Press <b>Escape</b> to skip, <b>Backspace</b> to go back.</div>
      <div class="qa-actions">
        <button id="qaSkipBtn">Skip Key</button>
        <button id="qaBackBtn" style="background:var(--muted);">Back</button>
        <button id="qaDoneBtn" style="background:var(--success);">Done</button>
        <button id="qaCancelBtn" style="background:var(--danger);">Cancel</button>
      </div>
    </div>
  </div>

  <!-- Floating Value Picker -->
  <div class="vp-overlay" id="vpOverlay" style="display:none;">
    <div class="vp-dialog" id="vpDialog">
      <p class="vp-prompt" id="vpPrompt">Select key code</p>
      <div class="vp-mode-bar" id="vpModeBar"></div>
      <input type="text" class="vp-search" id="vpSearch" placeholder="Type to search..." autocomplete="off">
      <ul class="vp-results" id="vpResults"></ul>
      <div class="vp-counter" id="vpCounter"></div>
    </div>
  </div>

  <!-- Context menu (hidden, positioned dynamically) -->
  <div class="ctx-menu" id="layerCtxMenu" style="display:none;"></div>

  <!-- Hidden: Layout JSON import dialog -->
  <div id="layoutJsonOverlay" style="display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:200;align-items:center;justify-content:center;">
    <div style="background:var(--card);border-radius:10px;padding:1.2em;width:90%;max-width:600px;max-height:80vh;overflow:auto;border:1px solid var(--border);">
      <h3 style="margin-bottom:0.5em;color:var(--accent2);">Load Keyboard Layout JSON</h3>
      <textarea id="layoutJsonInput" rows="12" placeholder='Paste keyboard layout JSON (any keyboard .json format — Corne, Sofle, reviung41, etc.)...'></textarea>
      <div style="margin-top:0.4em;display:flex;gap:0.5em;">
        <button id="layoutJsonApplyBtn">Apply Layout</button>
        <button id="layoutJsonCancelBtn" style="background:var(--muted);">Cancel</button>
      </div>
    </div>
  </div>

<script>
// ================================================================
// SECTION: SHARED DATA MODEL
// These arrays hold ALL tool data. Think of them as notebooks:
// each one stores a list of items the user has created or parsed.
// The RGB tab and Keymap tab each have their own set of notebooks.
// More on this code can be found in 'RefDoc' line 104
// ================================================================

// --- RGB Tab data (filled when you parse .dtsi code) ---
var layers = [];            // Each entry: { name, index, h, s, b, label } — one per keyboard layer
var macros = [];            // RGB macro definitions (MO_RGB, TO_RGB, etc.)
var behaviors = [];         // RGB tab behavior references
var combos = [];            // RGB tab combo definitions
var blinkMacros = [];       // Blink macro LED sequences
var dtsiNativeBehaviors = []; // Native ZMK behaviors found in .dtsi (like &hm, &ltq, &td_numcaps)
var colorValueMap = {};       // Lookup table: color name → { h, s, b } values
var colorLabelMap = {};       // Lookup table: color name → display label string

// --- Keymap Tab data (filled when you parse a .keymap file) ---
// The keymap tab data is separate from RGB data. They are synced via
// syncCrossTabData() (line 4509) and syncRgbToKeymap() (line 4570).
var keymapLayers = [];    // Each layer: { name, displayName, bindings: string[], status }
var keymapCombos = [];    // Each combo: { name, binding, positions: number[], layers, timeout }
var keymapMacros = [];    // { name, label, steps: string[], paramType: 0|1|2, waitMs, tapMs }
var keymapBehaviors = []; // { name, type, label, config }
var keymapConditionalLayers = []; // { name, ifLayers: number[], thenLayer: number }
var keymapSensorBindings = [];    // Encoder rotation bindings: { layerIndex, bindings[] } per layer
var keyboardLayout = null; // Physical key positions from layout JSON (used by SVG renderer, line 2329)
var currentLayoutId = 'corne'; // Tracks which layout is loaded: 'corne' or 'lotus58'

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
var keymapParsedHeaderLines = null; // Saved header comment/blank lines above #include (preserved in output)
var keymapParsedRawBlocks = null; // Raw devicetree blocks before the keymap{} (preserved in output)

// ================================================================
// SECTION: UNDO/REDO SYSTEM
// Works like a camera: before each edit, take a "snapshot" of all data.
// If you undo, load the previous snapshot. If you redo, go forward again.
// More on this code can be found in 'RefDoc' line 151
// ================================================================
var undoStack = [];      // Array of past snapshots (up to UNDO_LIMIT)
var redoStack = [];      // Array of "undone" snapshots (for redo)
var UNDO_LIMIT = 50;    // Maximum undo steps saved
// snapshotState() — Takes a "photo" of all keymap data right now.
// Uses .slice() to make copies of arrays so future changes don't
// affect the saved snapshot. Returns a plain object with everything.
function snapshotState() {
  return {
    layers: keymapLayers.map(function(l) {
      return { name: l.name, displayName: l.displayName, bindings: l.bindings.slice(), status: l.status };
    }),
    combos: keymapCombos.map(function(c) {
      return { name: c.name, binding: c.binding, positions: c.positions.slice(), layers: c.layers, timeout: c.timeout, _fromRgb: c._fromRgb, _fromEditor: c._fromEditor, slowRelease: c.slowRelease, requirePriorIdle: c.requirePriorIdle };
    }),
    macros: keymapMacros.map(function(m) {
      return { name: m.name, label: m.label, steps: m.steps.slice(), paramType: m.paramType, waitMs: m.waitMs, tapMs: m.tapMs, _fromRgb: m._fromRgb, _fromEditor: m._fromEditor };
    }),
    behaviors: keymapBehaviors.map(function(b) {
      var cfg = {};
      for (var k in b.config) cfg[k] = b.config[k];
      return { name: b.name, type: b.type, label: b.label, config: cfg, _fromRgb: b._fromRgb, _fromDtsi: b._fromDtsi, _fromEditor: b._fromEditor, _builtin: b._builtin };
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
// restoreState(snap) — Loads a previous snapshot back into the
// global arrays, replacing current data. Used by undo and redo.
function restoreState(snap) {
  keymapLayers = snap.layers.map(function(l) {
    return { name: l.name, displayName: l.displayName, bindings: l.bindings.slice(), status: l.status };
  });
  keymapCombos = snap.combos.map(function(c) {
    return { name: c.name, binding: c.binding, positions: c.positions.slice(), layers: c.layers, timeout: c.timeout, _fromRgb: c._fromRgb, _fromEditor: c._fromEditor, slowRelease: c.slowRelease, requirePriorIdle: c.requirePriorIdle };
  });
  keymapMacros = snap.macros.map(function(m) {
    return { name: m.name, label: m.label, steps: m.steps.slice(), paramType: m.paramType, waitMs: m.waitMs, tapMs: m.tapMs, _fromRgb: m._fromRgb, _fromEditor: m._fromEditor };
  });
  keymapBehaviors = snap.behaviors.map(function(b) {
    var cfg = {};
    for (var k in b.config) cfg[k] = b.config[k];
    return { name: b.name, type: b.type, label: b.label, config: cfg, _fromRgb: b._fromRgb, _fromDtsi: b._fromDtsi, _fromEditor: b._fromEditor, _builtin: b._builtin };
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
// pushUndo() — Call this BEFORE making a change to save the current
// state. If the stack gets too big, it drops the oldest entry.
// Clears redo stack because new edits invalidate old redos.
function pushUndo() {
  undoStack.push(snapshotState());
  if (undoStack.length > UNDO_LIMIT) undoStack.shift();
  redoStack = [];
  updateUndoRedoBtns();
}
// fullRender() — Redraws ALL of the keymap tab's UI from scratch.
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
  document.getElementById('kmComboOverlay').classList.remove('visible');
  document.getElementById('kmMacroOverlay').classList.remove('visible');
  document.getElementById('kmBehaviorOverlay').classList.remove('visible');
  document.getElementById('kmCondLayerOverlay').classList.remove('visible');
  var sensorOverlay = document.getElementById('sensorModalOverlay'); if (sensorOverlay) sensorOverlay.style.display = 'none';
  renderLayerTabs();
  renderKeyboardSvg('keyboardSvg');
  renderKeymapComboList();
  renderKeymapMacroList();
  renderBuiltinBehaviorToggles();
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
// SECTION: RGB UNDO/REDO SYSTEM
// Parallel undo/redo for the RGB Generator tab. Works the same as
// keymap undo/redo but snapshots RGB-specific arrays.
// ================================================================
var rgbUndoStack = [];
var rgbRedoStack = [];
var RGB_UNDO_LIMIT = 50;

function rgbSnapshotState() {
  return {
    layers: layers.map(function(l) {
      var o = {}; for (var k in l) o[k] = l[k]; return o;
    }),
    macros: macros.map(function(m) {
      var o = {}; for (var k in m) o[k] = m[k]; return o;
    }),
    behaviors: behaviors.map(function(b) {
      var o = {}; for (var k in b) o[k] = b[k]; return o;
    }),
    combos: combos.map(function(c) {
      var o = {}; for (var k in c) o[k] = c[k]; return o;
    }),
    blinkMacros: blinkMacros.map(function(bm) {
      var o = {}; for (var k in bm) o[k] = bm[k]; return o;
    })
  };
}

function rgbRestoreState(snap) {
  layers = snap.layers.map(function(l) { var o = {}; for (var k in l) o[k] = l[k]; return o; });
  macros = snap.macros.map(function(m) { var o = {}; for (var k in m) o[k] = m[k]; return o; });
  behaviors = snap.behaviors.map(function(b) { var o = {}; for (var k in b) o[k] = b[k]; return o; });
  combos = snap.combos.map(function(c) { var o = {}; for (var k in c) o[k] = c[k]; return o; });
  blinkMacros = snap.blinkMacros.map(function(bm) { var o = {}; for (var k in bm) o[k] = bm[k]; return o; });
  colorValueMap = {}; colorLabelMap = {};
  layers.forEach(function(_, i) { updateColorMapFromLayer(i); });
}

function pushRgbUndo() {
  rgbUndoStack.push(rgbSnapshotState());
  if (rgbUndoStack.length > RGB_UNDO_LIMIT) rgbUndoStack.shift();
  rgbRedoStack = [];
  updateRgbUndoRedoBtns();
}

function performRgbUndo() {
  if (rgbUndoStack.length === 0) return;
  rgbRedoStack.push(rgbSnapshotState());
  rgbRestoreState(rgbUndoStack.pop());
  rgbRenderAll();
  updateRgbUndoRedoBtns();
}

function performRgbRedo() {
  if (rgbRedoStack.length === 0) return;
  rgbUndoStack.push(rgbSnapshotState());
  rgbRestoreState(rgbRedoStack.pop());
  rgbRenderAll();
  updateRgbUndoRedoBtns();
}

function updateRgbUndoRedoBtns() {
  var ub = document.getElementById('rgbUndoBtn');
  var rb = document.getElementById('rgbRedoBtn');
  if (ub) ub.disabled = rgbUndoStack.length === 0;
  if (rb) rb.disabled = rgbRedoStack.length === 0;
}

// ================================================================
// SECTION: DEFAULT KEYBOARD LAYOUTS
// These hardcoded objects describe the physical key positions of each
// keyboard. Each key has a row, column, x, and y coordinate that the
// SVG renderer (renderKeyboardSvg, line 2260) uses to draw the keys.
// If no layout JSON is uploaded, these defaults are used.
// More on this code can be found in 'RefDoc' line 186
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
        // Row 0: 6L + 6R = 12 keys (indices 0-11) — number row, no encoders
        {"row":0,"col":0,"x":0,"y":0.75},{"row":0,"col":1,"x":1,"y":0.5},{"row":0,"col":2,"x":2,"y":0.25},
        {"row":0,"col":3,"x":3,"y":0},{"row":0,"col":4,"x":4,"y":0.25},{"row":0,"col":5,"x":5,"y":0.5},
        {"row":0,"col":10,"x":9,"y":0.5},{"row":0,"col":11,"x":10,"y":0.25},{"row":0,"col":12,"x":11,"y":0},
        {"row":0,"col":13,"x":12,"y":0.25},{"row":0,"col":14,"x":13,"y":0.5},{"row":0,"col":15,"x":14,"y":0.75},
        // Row 1: 6L + 6R = 12 keys (indices 12-23) — QWERTY row
        {"row":1,"col":0,"x":0,"y":1.75},{"row":1,"col":1,"x":1,"y":1.5},{"row":1,"col":2,"x":2,"y":1.25},
        {"row":1,"col":3,"x":3,"y":1},{"row":1,"col":4,"x":4,"y":1.25},{"row":1,"col":5,"x":5,"y":1.5},
        {"row":1,"col":10,"x":9,"y":1.5},{"row":1,"col":11,"x":10,"y":1.25},{"row":1,"col":12,"x":11,"y":1},
        {"row":1,"col":13,"x":12,"y":1.25},{"row":1,"col":14,"x":13,"y":1.5},{"row":1,"col":15,"x":14,"y":1.75},
        // Row 2: 6L + 2 encoder push + 6R = 14 keys (indices 24-37) — home row + top encoder buttons
        {"row":2,"col":0,"x":0,"y":2.75},{"row":2,"col":1,"x":1,"y":2.5},{"row":2,"col":2,"x":2,"y":2.25},
        {"row":2,"col":3,"x":3,"y":2},{"row":2,"col":4,"x":4,"y":2.25},{"row":2,"col":5,"x":5,"y":2.5},
        {"row":2,"col":6,"x":6.5,"y":2},{"row":2,"col":9,"x":7.5,"y":2},
        {"row":2,"col":10,"x":9,"y":2.5},{"row":2,"col":11,"x":10,"y":2.25},{"row":2,"col":12,"x":11,"y":2},
        {"row":2,"col":13,"x":12,"y":2.25},{"row":2,"col":14,"x":13,"y":2.5},{"row":2,"col":15,"x":14,"y":2.75},
        // Row 3: 6L + 2 encoder push + 6R = 14 keys (indices 38-51) — bottom row + lower encoder buttons
        {"row":3,"col":0,"x":0,"y":3.75},{"row":3,"col":1,"x":1,"y":3.5},{"row":3,"col":2,"x":2,"y":3.25},
        {"row":3,"col":3,"x":3,"y":3},{"row":3,"col":4,"x":4,"y":3.25},{"row":3,"col":5,"x":5,"y":3.5},
        {"row":3,"col":6,"x":6,"y":3},{"row":3,"col":9,"x":8,"y":3},
        {"row":3,"col":10,"x":9,"y":3.5},{"row":3,"col":11,"x":10,"y":3.25},{"row":3,"col":12,"x":11,"y":3},
        {"row":3,"col":13,"x":12,"y":3.25},{"row":3,"col":14,"x":13,"y":3.5},{"row":3,"col":15,"x":14,"y":3.75},
        // Row 4: 4L + 4R thumb = 8 keys (indices 52-59) — flat, no rotation
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
// Editor (populateKeycodeGrids, line 3131) and to validate user input.
// ZMK_BEHAVIORS lists all built-in behaviors (&kp, &mo, &lt, etc.).
// More on this code can be found in 'RefDoc' line 207
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
  { name: '&kp', label: 'Key Press', desc: 'Send a keycode when pressed', params: ['keycode'], cells: 1 },
  { name: '&mt', label: 'Mod-Tap', desc: 'Hold for modifier, tap for keycode', params: ['modifier', 'keycode'], cells: 2 },
  { name: '&kt', label: 'Key Toggle', desc: 'Toggle a key on/off with each press', params: ['keycode'], cells: 1 },
  { name: '&sk', label: 'Sticky Key', desc: 'Activates modifier for the next keypress only', params: ['keycode'], cells: 1 },
  { name: '&gresc', label: 'Grave Escape', desc: 'Escape normally, grave (`) with shift/GUI', params: [], cells: 0 },
  { name: '&caps_word', label: 'Caps Word', desc: 'Capitalizes letters until a non-alpha key is pressed', params: [], cells: 0 },
  { name: '&key_repeat', label: 'Key Repeat', desc: 'Repeats the last pressed key', params: [], cells: 0 },
  // Layer navigation
  { name: '&mo', label: 'Momentary Layer', desc: 'Activates layer while held', params: ['layer'], cells: 1 },
  { name: '&lt', label: 'Layer-Tap', desc: 'Hold for layer, tap for keycode', params: ['layer', 'keycode'], cells: 2 },
  { name: '&to', label: 'To Layer', desc: 'Switches to a layer permanently', params: ['layer'], cells: 1 },
  { name: '&tog', label: 'Toggle Layer', desc: 'Toggles a layer on/off', params: ['layer'], cells: 1 },
  { name: '&sl', label: 'Sticky Layer', desc: 'Activates layer for the next keypress only', params: ['layer'], cells: 1 },
  // Mouse emulation
  { name: '&mkp', label: 'Mouse Button Press', desc: 'Sends a mouse button click', params: ['button'], cells: 1 },
  { name: '&mmv', label: 'Mouse Move', desc: 'Moves the mouse cursor in a direction', params: ['direction'], cells: 1 },
  { name: '&msc', label: 'Mouse Scroll', desc: 'Scrolls in a direction', params: ['direction'], cells: 1 },
  // Output & connectivity
  { name: '&bt', label: 'Bluetooth', desc: 'Bluetooth profile management (clear, select, next, prev)', params: ['bt_action'], cells: 1 },
  { name: '&out', label: 'Output Selection', desc: 'Switch between USB and BLE output', params: ['out_action'], cells: 1 },
  // Lighting
  { name: '&rgb_ug', label: 'RGB Underglow', desc: 'Control RGB underglow (toggle, color, brightness, effects)', params: ['rgb_action'], cells: 1 },
  { name: '&bl', label: 'Backlight', desc: 'Control backlight (toggle, brightness, cycle)', params: ['bl_action'], cells: 1 },
  // Power & system
  { name: '&ext_power', label: 'External Power', desc: 'Control external power output (toggle, on, off)', params: ['ep_action'], cells: 1 },
  { name: '&soft_off', label: 'Soft Off', desc: 'Puts the keyboard into deep sleep', params: [], cells: 0 },
  // Reset
  { name: '&sys_reset', label: 'System Reset', desc: 'Resets the keyboard MCU', params: [], cells: 0 },
  { name: '&bootloader', label: 'Bootloader', desc: 'Resets into bootloader mode for flashing', params: [], cells: 0 },
  // Misc
  { name: '&trans', label: 'Transparent', desc: 'Falls through to the next lower active layer', params: [], cells: 0 },
  { name: '&none', label: 'None Binding', desc: 'Explicitly does nothing; blocks lower layers', params: [], cells: 0 },
  { name: '&studio_unlock', label: 'Studio Unlock', desc: 'Unlocks ZMK Studio for live configuration', params: [], cells: 0 }
];

var BT_ACTIONS = ['BT_CLR','BT_CLR_ALL','BT_SEL 0','BT_SEL 1','BT_SEL 2','BT_SEL 3','BT_SEL 4','BT_NXT','BT_PRV','BT_DISC 0','BT_DISC 1','BT_DISC 2','BT_DISC 3','BT_DISC 4'];
var RGB_ACTIONS = ['RGB_TOG','RGB_EFF','RGB_EFR','RGB_HUI','RGB_HUD','RGB_SAI','RGB_SAD','RGB_BRI','RGB_BRD','RGB_SPI','RGB_SPD','RGB_COLOR_HSB(0,0,0)'];
var OUT_ACTIONS = ['OUT_TOG','OUT_USB','OUT_BLE'];
var BL_ACTIONS = ['BL_TOG','BL_ON','BL_OFF','BL_INC','BL_DEC','BL_CYCLE','BL_SET 50'];
var EP_ACTIONS = ['EP_TOG','EP_ON','EP_OFF'];
var MOUSE_BUTTONS = ['LCLK','RCLK','MCLK','MB4','MB5'];
var MOUSE_MOVES = ['MOVE_UP','MOVE_DOWN','MOVE_LEFT','MOVE_RIGHT'];
var MOUSE_SCROLLS = ['SCRL_UP','SCRL_DOWN','SCRL_LEFT','SCRL_RIGHT'];

var PARAM_DESCS = {
  BT_CLR: 'Clear current profile pairing', BT_CLR_ALL: 'Clear all profile pairings',
  'BT_SEL 0': 'Select BT profile 0', 'BT_SEL 1': 'Select BT profile 1',
  'BT_SEL 2': 'Select BT profile 2', 'BT_SEL 3': 'Select BT profile 3',
  'BT_SEL 4': 'Select BT profile 4', BT_NXT: 'Next BT profile', BT_PRV: 'Previous BT profile',
  'BT_DISC 0': 'Disconnect BT profile 0', 'BT_DISC 1': 'Disconnect BT profile 1',
  'BT_DISC 2': 'Disconnect BT profile 2', 'BT_DISC 3': 'Disconnect BT profile 3',
  'BT_DISC 4': 'Disconnect BT profile 4',
  RGB_TOG: 'Toggle RGB on/off', RGB_EFF: 'Next RGB effect', RGB_EFR: 'Previous RGB effect',
  RGB_HUI: 'Increase hue', RGB_HUD: 'Decrease hue', RGB_SAI: 'Increase saturation',
  RGB_SAD: 'Decrease saturation', RGB_BRI: 'Increase brightness', RGB_BRD: 'Decrease brightness',
  RGB_SPI: 'Increase effect speed', RGB_SPD: 'Decrease effect speed',
  'RGB_COLOR_HSB(0,0,0)': 'Set specific HSB color',
  OUT_TOG: 'Toggle between USB and BLE', OUT_USB: 'Force USB output', OUT_BLE: 'Force BLE output',
  BL_TOG: 'Toggle backlight on/off', BL_ON: 'Turn backlight on', BL_OFF: 'Turn backlight off',
  BL_INC: 'Increase brightness', BL_DEC: 'Decrease brightness', BL_CYCLE: 'Cycle brightness levels',
  'BL_SET 50': 'Set brightness to 50%',
  EP_TOG: 'Toggle external power on/off', EP_ON: 'Turn external power on', EP_OFF: 'Turn external power off',
  LCLK: 'Left mouse click', RCLK: 'Right mouse click', MCLK: 'Middle mouse click',
  MB4: 'Mouse button 4 (back)', MB5: 'Mouse button 5 (forward)',
  MOVE_UP: 'Move cursor up', MOVE_DOWN: 'Move cursor down',
  MOVE_LEFT: 'Move cursor left', MOVE_RIGHT: 'Move cursor right',
  SCRL_UP: 'Scroll up', SCRL_DOWN: 'Scroll down',
  SCRL_LEFT: 'Scroll left', SCRL_RIGHT: 'Scroll right'
};

// ================================================================
// BUILT-IN BEHAVIOR PRESETS
// Toggleable standard ZMK behavior templates from the ZMK docs.
// When enabled, these are added to keymapBehaviors and appear in
// the binding dropdown. Users can bind keys to them like any behavior.
// ================================================================
var BUILTIN_BEHAVIORS = [
  {
    id: 'hm', name: 'hm', label: 'Homerow Mods', type: 'hold-tap',
    desc: 'Universal homerow mod pulled from PandaKB firmware.',
    config: { tappingTerm: '200', flavor: 'tap-preferred', holdBinding: '&kp', tapBinding: '&kp',
              quickTap: '180', requirePriorIdle: '', holdTriggerPositions: '',
              retroTap: false, holdWhileUndecided: false, holdWhileUndecidedLinger: false,
              holdTriggerOnRelease: false, globalQuickTap: true }
  },
  {
    id: 'hml', name: 'hml', label: 'Timeless HRM Left', type: 'hold-tap',
    desc: 'Balanced homerow mod (left hand). Targets right-side keys.',
    config: { tappingTerm: '280', flavor: 'balanced', holdBinding: '&kp', tapBinding: '&kp',
              quickTap: '175', requirePriorIdle: '150', holdTriggerPositions: '',
              retroTap: false, holdWhileUndecided: false, holdWhileUndecidedLinger: false,
              holdTriggerOnRelease: true, globalQuickTap: false }
  },
  {
    id: 'hmr', name: 'hmr', label: 'Timeless HRM Right', type: 'hold-tap',
    desc: 'Balanced homerow mod (right hand). Targets left-side keys.',
    config: { tappingTerm: '280', flavor: 'balanced', holdBinding: '&kp', tapBinding: '&kp',
              quickTap: '175', requirePriorIdle: '150', holdTriggerPositions: '',
              retroTap: false, holdWhileUndecided: false, holdWhileUndecidedLinger: false,
              holdTriggerOnRelease: true, globalQuickTap: false }
  },
  {
    id: 'as', name: 'as', label: 'Autoshift', type: 'hold-tap',
    desc: 'AutoShift; Hold = Shifted key, Tap = Normal key. Use with AS(keycode) macro.',
    config: { tappingTerm: '135', flavor: 'tap-preferred', holdBinding: '&kp', tapBinding: '&kp',
              quickTap: '0', requirePriorIdle: '', holdTriggerPositions: '',
              retroTap: false, holdWhileUndecided: false, holdWhileUndecidedLinger: false,
              holdTriggerOnRelease: false, globalQuickTap: false },
    define: '#define AS(keycode) &as LS(keycode) keycode'
  },
  {
    id: 'mo_tog', name: 'mo_tog', label: 'Mo-Hold / Tog-Tap', type: 'hold-tap',
    desc: 'Hold = Momentary layer, Tap = Toggle layer. Use with MO_TOG(layer) macro.',
    config: { tappingTerm: '200', flavor: 'hold-preferred', holdBinding: '&mo', tapBinding: '&tog',
              quickTap: '', requirePriorIdle: '', holdTriggerPositions: '',
              retroTap: false, holdWhileUndecided: false, holdWhileUndecidedLinger: false,
              holdTriggerOnRelease: false, globalQuickTap: false },
    define: '#define MO_TOG(layer) &mo_tog layer layer'
  },
  {
    id: 'cmt', name: 'cmt', label: 'Custom Mod-Tap', type: 'hold-tap',
    desc: 'Configurable mod-tap. Hold = modifier, Tap = keycode. Default ZMK hold-preferred flavor.',
    config: { tappingTerm: '200', flavor: 'hold-preferred', holdBinding: '&kp', tapBinding: '&kp',
              quickTap: '', requirePriorIdle: '', holdTriggerPositions: '',
              retroTap: false, holdWhileUndecided: false, holdWhileUndecidedLinger: false,
              holdTriggerOnRelease: false, globalQuickTap: false }
  },
  {
    id: 'clt', name: 'clt', label: 'Custom Layer-Tap', type: 'hold-tap',
    desc: 'Configurable layer-tap. Hold = momentary layer, Tap = keycode. Default ZMK tap-preferred flavor.',
    config: { tappingTerm: '200', flavor: 'tap-preferred', holdBinding: '&mo', tapBinding: '&kp',
              quickTap: '', requirePriorIdle: '', holdTriggerPositions: '',
              retroTap: false, holdWhileUndecided: false, holdWhileUndecidedLinger: false,
              holdTriggerOnRelease: false, globalQuickTap: false }
  }
];

// ================================================================
// SECTION: COLOR UTILITY FUNCTIONS
// These small helper functions convert between color formats:
//   hsbToHex(h,s,b) — turns Hue/Saturation/Brightness into a #hex color
//   hexToRgb(hex) — turns a #hex color into r,g,b numbers
//   rgbToHsb(r,g,b) — turns r,g,b numbers into h,s,b
//   hasHsbVal(v) — checks if a value is non-empty
//   baseKey(name) — strips "L_" or "RGB_" prefix from a name
//   esc(str) — makes a string safe for HTML (prevents code injection)
// More on this code can be found in 'RefDoc' line 232
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
function baseKey(name) { return name.replace(/^LAYER_/i, '').replace(/^L_/i, '').replace(/^RGB_/i, '').toUpperCase(); }
function esc(str) { return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

// ================================================================
// SECTION: HSB COLOR PICKER POPUP
// A draggable popup that lets you pick a color visually. The big
// square area is the Saturation/Brightness picker; the thin strip
// on the right is the Hue slider. Drag either to choose a color.
// This updates the layer's h/s/b values and regenerates the output.
// Created once by ensureHsbPicker() and reused for every layer.
// More on this code can be found in 'RefDoc' line 261
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
  // Horizontal gradient: white → pure hue color
  var gradH = ctx.createLinearGradient(0, 0, w, 0);
  gradH.addColorStop(0, '#ffffff');
  gradH.addColorStop(1, 'hsl(' + hue + ',100%,50%)');
  ctx.fillStyle = gradH;
  ctx.fillRect(0, 0, w, h);
  // Vertical gradient: transparent → black
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
  pushRgbUndo();
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
// More on this code can be found in 'RefDoc' line 287
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

function comboBindOptionsHTML(selected) {
  var opts = [];
  macros.forEach(function(m) {
    var val = '&' + m.name;
    var sel = val === selected ? ' selected' : '';
    opts.push('<option value="' + esc(val) + '"' + sel + '>' + esc(val) + '</option>');
  });
  blinkMacros.forEach(function(bm) {
    var val = '&' + bm.name;
    var sel = val === selected ? ' selected' : '';
    opts.push('<option value="' + esc(val) + '"' + sel + '>' + esc(val) + '</option>');
  });
  behaviors.forEach(function(b) {
    var val = '&' + b.name;
    var sel = val === selected ? ' selected' : '';
    opts.push('<option value="' + esc(val) + '"' + sel + '>' + esc(val) + '</option>');
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

function initSubtabs() {
  var bar = document.getElementById('kmSubtabBar');
  if (!bar) return;
  bar.addEventListener('click', function(e) {
    var btn = e.target.closest('.km-subtab-btn');
    if (!btn) return;
    var target = btn.dataset.subtab;
    bar.querySelectorAll('.km-subtab-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    document.querySelectorAll('.km-subtab-panel').forEach(function(p) { p.classList.remove('active'); });
    var panel = document.getElementById(target);
    if (panel) panel.classList.add('active');
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
// More on this code can be found in 'RefDoc' line 313
// ================================================================
// splitArgs(str) — Split a comma-separated argument string respecting quoted strings.
// Commas inside "..." are not treated as delimiters, so labels like
// "F KEYS BLINK; (STANDALONE)" parse correctly.
function splitArgs(str) {
  var args = [], cur = '', inQuote = false;
  for (var i = 0; i < str.length; i++) {
    var ch = str[i];
    if (ch === '"') { inQuote = !inQuote; cur += ch; }
    else if (ch === ',' && !inQuote) { args.push(cur.trim()); cur = ''; }
    else { cur += ch; }
  }
  args.push(cur.trim());
  return args;
}

function parseUserCode() {
  pushRgbUndo();
  var code = document.getElementById('userCodePaste').value;
  // Preserve cross-tab data (items synced from Keymap tab)
  var savedBehaviors = behaviors.filter(function(b) { return b._fromKeymap; });
  var savedLayers = layers.filter(function(l) { return l._fromKeymap; });
  layers = []; macros = []; behaviors = []; combos = []; blinkMacros = []; dtsiNativeBehaviors = [];
  colorValueMap = {}; colorLabelMap = {};
  // Restore cross-tab data
  savedBehaviors.forEach(function(b) { behaviors.push(b); });
  var m;

  var colorRe = /^#define\s+([A-Za-z0-9_]+)\s+RGB_COLOR_HSB\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)[^\S\n]*(?:\/\*([^*]*)\*\/)?(?:[^\S\n]*\/\/(.*))?/gm;
  while ((m = colorRe.exec(code))) {
    var h = parseInt(m[2]), s = parseInt(m[3]), b = parseInt(m[4]);
    if (h === 0 && s === 0 && b === 0) continue;
    colorValueMap[m[1]] = { h: h, s: s, b: b };
    colorLabelMap[m[1]] = (m[5] || m[6] || '').trim();
  }

  var layerRe = /^#define\s+((?:LAYER_|L_)[A-Za-z0-9_]+)\s+(\d+)\s*$/gm;
  var foundLayer = false;
  while ((m = layerRe.exec(code))) {
    foundLayer = true;
    var stripped = m[1].replace(/^LAYER_/i, '').replace(/^L_/, '');
    var cv = colorValueMap['RGB_' + stripped] || colorValueMap[stripped] || colorValueMap[m[1]];
    var cl = colorLabelMap['RGB_' + stripped] || colorLabelMap[stripped] || colorLabelMap[m[1]] || '';
    layers.push({ name: m[1], index: m[2], h: cv ? String(cv.h) : '', s: cv ? String(cv.s) : '', b: cv ? String(cv.b) : '', label: cl });
  }
  if (!foundLayer) {
    layerRe = /^#define\s+([A-Za-z0-9_]+)\s+(\d+)\s*$/gm;
    while ((m = layerRe.exec(code))) {
      var stripped2 = m[1].replace(/^LAYER_/i, '').replace(/^L_/i, '');
      var cv2 = colorValueMap['RGB_' + m[1]] || colorValueMap[m[1]] || colorValueMap['RGB_' + stripped2] || colorValueMap[stripped2];
      var cl2 = colorLabelMap['RGB_' + m[1]] || colorLabelMap[m[1]] || colorLabelMap['RGB_' + stripped2] || colorLabelMap[stripped2] || '';
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
  // Check both name AND index to prevent duplicates (same index = same layer)
  var parsedIndexes = {};
  layers.forEach(function(l) {
    if (l.index !== '' && l.index !== undefined) parsedIndexes[String(l.index)] = true;
  });
  savedLayers.forEach(function(sl) {
    var nameExists = layerBaseKeys[baseKey(sl.name)];
    var indexExists = sl.index !== '' && sl.index !== undefined && parsedIndexes[String(sl.index)];
    if (!nameExists && !indexExists) {
      layers.push(sl);
      layerBaseKeys[baseKey(sl.name)] = true;
      if (sl.index !== '' && sl.index !== undefined) parsedIndexes[String(sl.index)] = true;
    }
  });

  // Strip multi-line #define helper templates (lines ending with \) so that
  // macro/behavior/combo regexes don't falsely match the template parameter lists.
  // Single-line #defines (layers, colors) are unaffected.
  var codeNoHelpers = code.replace(/^#define\s+[A-Za-z0-9_]+\([^)]*\)\s*\\[\s\S]*?(?:\n(?!.*\\)\s*[^\n]*)/gm, '');

  // Parse macro section comments (// and /* */ lines preceding each macro call)
  // Handles multi-line /* ... */ blocks that span several lines
  var macroSectionComments = {};
  var macroSectionMatch = codeNoHelpers.match(/macros\s*\{([\s\S]*?)\};/);
  if (macroSectionMatch) {
    var mLines = macroSectionMatch[1].split('\n');
    var pendingComments = [];
    var inBlockComment = false;
    for (var mi = 0; mi < mLines.length; mi++) {
      var mline = mLines[mi].trim();
      if (!mline) continue;
      if (inBlockComment) {
        pendingComments.push(mline);
        if (mline.indexOf('*/') !== -1) inBlockComment = false;
      } else if (mline.startsWith('//') || mline.startsWith('/*')) {
        pendingComments.push(mline);
        if (mline.startsWith('/*') && mline.indexOf('*/') === -1) inBlockComment = true;
      } else if (pendingComments.length > 0) {
        var mcName = mline.match(/(?:MO_BLINK|MO_RGB|TO_RGB|TO_RGB_PRESS)\(\s*([^,\s]+)/);
        if (mcName) macroSectionComments[mcName[1]] = pendingComments.join('\n');
        pendingComments = [];
      }
    }
  }

  // Parse comments for standalone macros/combos (KP_BLINK, MO_BLINK outside macros{}, CMB inside combos{})
  var allSectionComments = {};
  var acLines = codeNoHelpers.split('\n');
  var acPending = [];
  var acInBlock = false;
  for (var ai = 0; ai < acLines.length; ai++) {
    var aline = acLines[ai].trim();
    if (!aline) continue;
    if (acInBlock) {
      acPending.push(aline);
      if (aline.indexOf('*/') !== -1) acInBlock = false;
    } else if (aline.startsWith('//') || aline.startsWith('/*')) {
      acPending.push(aline);
      if (aline.startsWith('/*') && aline.indexOf('*/') === -1) acInBlock = true;
    } else {
      if (acPending.length > 0) {
        var acName = aline.match(/(?:KP_BLINK|MO_BLINK|MO_RGB|TO_RGB_PRESS|TO_RGB|CMB|RGB_HT)\(\s*([^,\s]+)/);
        if (acName) allSectionComments[acName[1]] = acPending.join('\n');
      }
      acPending = [];
    }
  }

  var macroRe = /(TO_RGB_PRESS|TO_RGB|MO_BLINK|MO_RGB)\(((?:[^)"]*"[^"]*")*[^")"]*)/g;
  while ((m = macroRe.exec(codeNoHelpers))) {
    // Advance past the matched content to find the real closing paren
    var mStart = m.index + m[0].length;
    var depth = 1;
    for (var mp = mStart; mp < codeNoHelpers.length && depth > 0; mp++) {
      if (codeNoHelpers[mp] === '(' ) depth++;
      else if (codeNoHelpers[mp] === ')') depth--;
    }
    var fullArgs = m[2];
    if (mp > mStart) fullArgs = m[2] + codeNoHelpers.substring(mStart, mp - 1);
    macroRe.lastIndex = mp;
    var args = splitArgs(fullArgs);
    var macroLabel = (args[1] || '').replace(/^"|"$/g, '').trim();
    if (m[1] === 'MO_BLINK') {
      blinkMacros.push({ name: args[0], key: '', layer: args[2] || '', color: args[3] || '', returnColor: args[4] || '', wait: args[5] || '80', label: macroLabel, _helper: 'MO_BLINK', comment: macroSectionComments[args[0]] || allSectionComments[args[0]] || '' });
    } else if (m[1] === 'MO_RGB') {
      macros.push({ name: args[0], type: m[1], layer: args[2] || '', color: args[3] || '', releaseColor: args[4] || '', label: macroLabel, comment: macroSectionComments[args[0]] || allSectionComments[args[0]] || '' });
    } else {
      macros.push({ name: args[0], type: m[1], layer: args[2] || '', color: args[3] || '', releaseColor: '', label: macroLabel, comment: macroSectionComments[args[0]] || allSectionComments[args[0]] || '' });
    }
  }

  var behRe = /RGB_HT\(((?:[^)"]*"[^"]*")*[^")"]*)/g;
  while ((m = behRe.exec(codeNoHelpers))) {
    var bStart = m.index + m[0].length;
    var bDepth = 1;
    for (var bp = bStart; bp < codeNoHelpers.length && bDepth > 0; bp++) {
      if (codeNoHelpers[bp] === '(') bDepth++;
      else if (codeNoHelpers[bp] === ')') bDepth--;
    }
    var bFullArgs = m[1];
    if (bp > bStart) bFullArgs = m[1] + codeNoHelpers.substring(bStart, bp - 1);
    behRe.lastIndex = bp;
    var bargs = splitArgs(bFullArgs);
    behaviors.push({ name: bargs[0], label: (bargs[1] || '').replace(/"/g, ''), macro: bargs[2] || '' });
  }

  var comboRe = /CMB\(([^)]+)\)/g;
  while ((m = comboRe.exec(codeNoHelpers))) {
    var cargs = m[1].split(',').map(function(x) { return x.trim(); });
    var pos, layersStr;
    if (cargs.length > 3 && /^\d+$/.test(cargs[3])) {
      pos = cargs[2] + ' ' + cargs[3];
      layersStr = cargs.slice(4).join(' ');
    } else {
      pos = cargs[2] || '';
      layersStr = cargs.slice(3).join(' ');
    }
    combos.push({ name: cargs[0], bind: cargs[1], pos: pos, layers: layersStr, comment: allSectionComments[cargs[0]] || '' });
  }

  // Parse KP_BLINK helper invocations into blinkMacros[]
  var kpBlinkRe = /KP_BLINK\(((?:[^)"]*"[^"]*")*[^")]*)/g;
  var seenBlinkNames = {};
  while ((m = kpBlinkRe.exec(codeNoHelpers))) {
    var kbStart = m.index + m[0].length;
    var kbDepth = 1;
    for (var kp = kbStart; kp < codeNoHelpers.length && kbDepth > 0; kp++) {
      if (codeNoHelpers[kp] === '(') kbDepth++;
      else if (codeNoHelpers[kp] === ')') kbDepth--;
    }
    var kbFullArgs = m[1];
    if (kp > kbStart) kbFullArgs = m[1] + codeNoHelpers.substring(kbStart, kp - 1);
    kpBlinkRe.lastIndex = kp;
    var kbargs = splitArgs(kbFullArgs);
    var kblabel = (kbargs[1] || '').replace(/^"|"$/g, '').trim();
    var kbName = kbargs[0];
    if (!seenBlinkNames[kbName]) {
      seenBlinkNames[kbName] = true;
      blinkMacros.push({ name: kbName, key: kbargs[2] || '', color: kbargs[3] || '', returnColor: kbargs[4] || '', wait: kbargs[5] || '80', label: kblabel, _helper: 'KP_BLINK', comment: allSectionComments[kbName] || '' });
    }
  }

  var blinkBlockRe = /ZMK_MACRO\(\s*([A-Za-z0-9_]+)\s*,([\s\S]*?)\n\s*\)/g;
  var bb;
  while ((bb = blinkBlockRe.exec(codeNoHelpers))) {
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
    blinkMacros.push({ name: bname, key: bkey, color: bcolor, returnColor: breturnColor, wait: bwait, label: blabel, comment: allSectionComments[bname] || '' });
  }

  // Parse native ZMK behaviors from dtsi (hold-tap, tap-dance, mod-morph, sticky-key, sensor-rotate, macros)
  var dtsiBehRe = /(\w+)\s*:\s*(\w+)\s*\{([^}]*compatible\s*=\s*"zmk,behavior-[^"]*"[^}]*)\}/g;
  var dbm;
  var rgbBehNames = {};
  behaviors.forEach(function(b) { rgbBehNames[b.name] = true; });
  while ((dbm = dtsiBehRe.exec(codeNoHelpers))) {
    var dbname = dbm[1];
    if (rgbBehNames[dbname]) continue; // skip RGB_HT behaviors already parsed
    var dbbody = dbm[3];
    var dbcompat = dbbody.match(/compatible\s*=\s*"([^"]*)"/);
    if (!dbcompat) continue;
    var dblabel = dbbody.match(/label\s*=\s*"([^"]*)"/);
    var dbtype = '', dbconfig = {};
    if (dbcompat[1] === 'zmk,behavior-hold-tap') {
      dbtype = 'hold-tap';
      var dtt = dbbody.match(/tapping-term-ms\s*=\s*<(\d+)>/);
      var dfl = dbbody.match(/flavor\s*=\s*"([^"]*)"/);
      var dbn = dbbody.match(/bindings\s*=\s*<([^>]*)>\s*,\s*<([^>]*)>/);
      var dqt = dbbody.match(/quick-tap-ms\s*=\s*<(\d+)>/);
      var drpi = dbbody.match(/require-prior-idle-ms\s*=\s*<(\d+)>/);
      var dhtp = dbbody.match(/hold-trigger-key-positions\s*=\s*<([^>]*)>/);
      dbconfig = {
        tappingTerm: dtt ? dtt[1] : '200', flavor: dfl ? dfl[1] : 'tap-preferred',
        holdBinding: dbn ? dbn[1].trim() : '', tapBinding: dbn ? dbn[2].trim() : '',
        quickTap: dqt ? dqt[1] : '', requirePriorIdle: drpi ? drpi[1] : '',
        holdTriggerPositions: dhtp ? dhtp[1].trim() : '',
        retroTap: /retro-tap\s*;/.test(dbbody),
        holdWhileUndecided: /hold-while-undecided\s*;/.test(dbbody.replace(/hold-while-undecided-linger/g, '')),
        holdWhileUndecidedLinger: /hold-while-undecided-linger\s*;/.test(dbbody),
        holdTriggerOnRelease: /hold-trigger-on-release\s*;/.test(dbbody),
        globalQuickTap: /global-quick-tap\s*;/.test(dbbody)
      };
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
      dbtype = dbcompat[1] === 'zmk,behavior-macro-one-param' ? 'macro-one-param' : 'macro-two-param';
    } else {
      continue;
    }
    dtsiNativeBehaviors.push({ name: dbname, type: dbtype, label: dblabel ? dblabel[1] : '', config: dbconfig, _fromDtsi: true, _rawText: dbm[0] });
  }

  // Sort layers by index so they display in sequential order (0, 1, 2...)
  // Layers without an index (orphans) go to the end of the list
  layers.sort(function(a, b) {
    var ai = (a.index !== '' && a.index !== undefined) ? parseInt(a.index) : 9999;
    var bi = (b.index !== '' && b.index !== undefined) ? parseInt(b.index) : 9999;
    return ai - bi;
  });

  var status = document.getElementById('userCodeStatus');
  var msg = 'Parsed: ' + layers.length + ' layers, ' + macros.length + ' macros, ' + behaviors.length + ' behaviors, ' + dtsiNativeBehaviors.length + ' native behaviors, ' + combos.length + ' combos, ' + blinkMacros.length + ' blink macros.';
  status.textContent = msg;
  status.style.display = 'inline';
  setTimeout(function() { status.style.display = 'none'; }, 6000);
  rgbRenderAll();
}

// propagateLayerRenames(renameMap) — When layer names change, updates
// macro layer/color references and combo layer references to match.
function propagateLayerRenames(renameMap) {
  if (!renameMap || Object.keys(renameMap).length === 0) return;
  // Build lookup: old base key → new name, old color → new color
  var nameMap = {};   // oldName → newName (full name match)
  var colorMap = {};  // oldColor → newColor
  Object.keys(renameMap).forEach(function(oldName) {
    var newName = renameMap[oldName];
    nameMap[oldName] = newName;
    nameMap[baseKey(oldName)] = baseKey(newName); // bare key match too
    colorMap['RGB_' + baseKey(oldName)] = 'RGB_' + baseKey(newName);
  });
  macros.forEach(function(m) {
    if (nameMap[m.layer]) m.layer = nameMap[m.layer];
    if (colorMap[m.color]) m.color = colorMap[m.color];
    if (colorMap[m.releaseColor]) m.releaseColor = colorMap[m.releaseColor];
  });
  // Rename macro node names: replace old base key within the name (case-insensitive)
  var macroRenameMap = {}; // oldMacroName → newMacroName
  Object.keys(renameMap).forEach(function(oldName) {
    var oldBk = baseKey(oldName).toLowerCase();
    var newBk = baseKey(renameMap[oldName]).toLowerCase();
    if (oldBk === newBk) return;
    macros.forEach(function(m) {
      var re = new RegExp(oldBk.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      if (re.test(m.name)) {
        var updated = m.name.replace(re, newBk);
        macroRenameMap[m.name] = updated;
        m.name = updated;
      }
    });
  });
  // Update behavior references to track renamed macros, and rename behavior names/labels
  if (Object.keys(macroRenameMap).length > 0 || Object.keys(renameMap).length > 0) {
    behaviors.forEach(function(b) {
      if (macroRenameMap[b.macro]) b.macro = macroRenameMap[b.macro];
      Object.keys(renameMap).forEach(function(oldName) {
        var oldBk = baseKey(oldName);
        var newBk = baseKey(renameMap[oldName]);
        if (oldBk === newBk) return;
        var re = new RegExp(oldBk.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
        if (re.test(b.name))  b.name  = b.name.replace(re, newBk.toLowerCase());
        if (re.test(b.label)) b.label = b.label.replace(re, newBk);
      });
    });
  }
  combos.forEach(function(c) {
    if (!c.layers) return;
    var parts = c.layers.trim().split(/\s+/);
    var changed = false;
    for (var i = 0; i < parts.length; i++) {
      if (nameMap[parts[i]]) { parts[i] = nameMap[parts[i]]; changed = true; }
    }
    if (changed) c.layers = parts.join(' ');
  });
  // Migrate colorValueMap / colorLabelMap entries: old color key → new color key
  Object.keys(colorMap).forEach(function(oldCk) {
    var newCk = colorMap[oldCk];
    if (oldCk === newCk) return;
    if (colorValueMap[oldCk]) {
      colorValueMap[newCk] = colorValueMap[oldCk];
      delete colorValueMap[oldCk];
    }
    if (colorLabelMap[oldCk] !== undefined) {
      colorLabelMap[newCk] = colorLabelMap[oldCk];
      delete colorLabelMap[oldCk];
    }
  });
}

// resequenceLayers() — Re-numbers all indexed layers sequentially (0, 1, 2...)
// Orphan layers (no index) are left untouched.
function resequenceLayers() {
  var indexed = layers.filter(function(l) {
    return l.index !== '' && l.index !== undefined;
  });
  indexed.sort(function(a, b) {
    return parseInt(a.index) - parseInt(b.index);
  });
  for (var i = 0; i < indexed.length; i++) {
    indexed[i].index = String(i);
  }
}

// RGB Render functions
// rgbRenderAll() — Redraws the entire RGB tab: layer list, macro
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

// renderLayerList() — Rebuilds the "Layers" card in the RGB tab.
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
      '<div class="input-group"><label>Name</label><input type="text" value="' + esc(l.name) + '" data-field="name" data-i="' + i + '" style="width:110px;font-weight:600;color:var(--accent2);"></div>' +
      '<div class="input-group"><label>Idx</label><input type="number" value="' + esc(l.index) + '" min="0" style="width:52px" data-field="index" data-i="' + i + '"></div>' +
      '<div class="input-group"><label>H</label><input type="number" min="0" max="360" value="' + esc(l.h) + '" style="width:52px" data-field="h" data-i="' + i + '"></div>' +
      '<div class="input-group"><label>S</label><input type="number" min="0" max="100" value="' + esc(l.s) + '" style="width:52px" data-field="s" data-i="' + i + '"></div>' +
      '<div class="input-group"><label>B</label><input type="number" min="0" max="100" value="' + esc(l.b) + '" style="width:52px" data-field="b" data-i="' + i + '"></div>' +
      '<div class="color-swatch" style="background:' + hex + ';" data-color-pick="' + i + '" title="Pick color (HSB)"></div>' +
      '<div class="input-group"><label>Lbl</label><input type="text" value="' + esc(l.label || '') + '" data-field="label" data-i="' + i + '" style="width:110px"></div>' +
      '<button class="btn-danger btn-sm" data-remove="layer" data-i="' + i + '">&#10005;</button>';
    list.appendChild(div);
  });
  list.onclick = function(e) {
    if (e.target.dataset.remove === 'layer') { pushRgbUndo(); layers.splice(parseInt(e.target.dataset.i), 1); resequenceLayers(); rgbRenderAll(); return; }
    // Open HSB picker on swatch click
    var swatch = e.target.closest('[data-color-pick]');
    if (swatch && swatch.dataset.colorPick !== undefined) {
      openHsbPicker(parseInt(swatch.dataset.colorPick), swatch);
    }
  };
  var _rgbLayerUndoPushed = false;
  var _oldLayerName = null;
  var _oldLayerIdx = -1;
  list.addEventListener('focusin', function(e) {
    if (e.target.dataset.field && !_rgbLayerUndoPushed) { _rgbLayerUndoPushed = true; pushRgbUndo(); }
    if (e.target.dataset.field === 'name') {
      var li = parseInt(e.target.dataset.i);
      if (!isNaN(li) && layers[li]) { _oldLayerName = layers[li].name; _oldLayerIdx = li; }
    }
  });
  list.addEventListener('focusout', function(e) {
    _rgbLayerUndoPushed = false;
    if (_oldLayerName !== null && _oldLayerIdx >= 0 && layers[_oldLayerIdx]) {
      var cur = layers[_oldLayerIdx].name;
      if (cur !== _oldLayerName) {
        var map = {}; map[_oldLayerName] = cur;
        propagateLayerRenames(map);
        rgbRenderAll();
      }
    }
    _oldLayerName = null; _oldLayerIdx = -1;
  });
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
    if (field === 'index') {
      resequenceLayers();
      rgbRenderAll();
      return;
    }
    if (field === 'name') {
      colorValueMap = {}; colorLabelMap = {};
      layers.forEach(function(_, li) { updateColorMapFromLayer(li); });
      updateHeaderDropdowns();
    }
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
    var typeLabel = m.type === 'TO_RGB' ? 'TO_RGB' : m.type === 'MO_RGB' ? 'MO_RGB' : 'TO_PRESS';
    var infoStr = 'L:' + esc(m.layer) + ' C:' + esc(m.color) + (m.releaseColor ? ' R:' + esc(m.releaseColor) : '');
    var labelStr = m.label ? '<span style="color:#9cc;font-size:0.82em;margin:0 4px;" title="Label">&quot;' + esc(m.label) + '&quot;</span>' : '';
    div.innerHTML =
      '<b>' + esc(m.name) + '</b>' +
      labelStr +
      '<span style="color:#888;font-size:0.85em;margin:0 6px;">' + typeLabel + '</span>' +
      '<span style="color:#aaa;font-size:0.85em;">' + infoStr + '</span>' +
      '<button class="btn-sm" data-edit-macro="' + i + '" style="margin-left:auto;padding:2px 8px;background:#3a3a5a;color:#e0e0e0;border:1px solid #555;border-radius:4px;cursor:pointer;">&#9998; Edit</button>' +
      '<button class="btn-danger btn-sm" data-remove="macro" data-i="' + i + '" style="margin-left:4px;">&#10005;</button>';
    list.appendChild(div);
  });
  list.onclick = function(e) {
    if (e.target.dataset.remove === 'macro') { pushRgbUndo(); macros.splice(parseInt(e.target.dataset.i), 1); rgbRenderAll(); }
    if (e.target.dataset.editMacro !== undefined) { openMacroEditor(parseInt(e.target.dataset.editMacro)); }
  };
}

var macroEditorIndex = -1;

function openMacroEditor(idx) {
  macroEditorIndex = idx;
  var m = macros[idx];
  var overlay = document.getElementById('macroEditorOverlay');
  document.getElementById('meditName').value = m.name;
  document.getElementById('meditLabel').value = m.label || '';
  document.getElementById('meditType').value = m.type;
  document.getElementById('meditLayer').innerHTML = layerOptionsHTML(m.layer);
  document.getElementById('meditColor').innerHTML = colorOptionsHTML(m.color);
  document.getElementById('meditReleaseColor').innerHTML = colorOptionsHTML(m.releaseColor || '');
  var releaseGroup = document.getElementById('meditReleaseGroup');
  releaseGroup.style.display = m.type === 'MO_RGB' ? '' : 'none';
  overlay.style.display = 'flex';
}

function closeMacroEditor() {
  document.getElementById('macroEditorOverlay').style.display = 'none';
  macroEditorIndex = -1;
}

// ---- COMBO EDITOR POPUP ----
var comboEditorIndex = -1;
var ceditSelectedPositions = [];

function openComboEditor(idx) {
  comboEditorIndex = idx;
  var c = combos[idx];
  document.getElementById('ceditName').value = c.name;
  document.getElementById('ceditBind').innerHTML = comboBindOptionsHTML(c.bind);
  // Layer picker
  document.getElementById('ceditLayerPicker').innerHTML = '<option value="">+ Add layer</option>' + layerOptionsHTML('');
  // Layer tags
  ceditRenderLayerTags(c.layers);
  // Mini-kb positions
  var posStr = (c.pos || '').trim();
  ceditSelectedPositions = posStr ? posStr.split(/[\s,]+/).map(Number).filter(function(n) { return !isNaN(n); }) : [];
  ceditRenderMiniKb();
  document.getElementById('comboEditorOverlay').style.display = 'flex';
}

function closeComboEditor() {
  document.getElementById('comboEditorOverlay').style.display = 'none';
  comboEditorIndex = -1;
}

function ceditRenderLayerTags(layersStr) {
  var tagsEl = document.getElementById('ceditLayerTags');
  var parts = (layersStr || '').trim() ? layersStr.trim().split(/\s+/) : [];
  tagsEl.innerHTML = parts.map(function(p) {
    return '<span class="layer-tag">' + esc(p) + '<span class="tag-x" data-layer="' + esc(p) + '">&times;</span></span>';
  }).join('');
}

function ceditGetLayers() {
  var tags = document.getElementById('ceditLayerTags').querySelectorAll('.layer-tag');
  var parts = [];
  tags.forEach(function(t) {
    var txt = t.childNodes[0].textContent.trim();
    if (txt) parts.push(txt);
  });
  return parts.join(' ');
}

function ceditRenderMiniKb() {
  var container = document.getElementById('ceditMiniKb');
  if (!keyboardLayout) { container.innerHTML = '<em>No layout loaded</em>'; return; }
  container.innerHTML = '<svg class="keyboard-svg combo-mini-kb-svg" id="ceditMiniSvg"></svg>';
  renderKeyboardSvg('ceditMiniSvg', { scale: 36, keySize: 33, comboMode: true, comboPositions: ceditSelectedPositions });
}

// ---- BEHAVIOR EDITOR POPUP ----
var behaviorEditorIndex = -1;

function openBehaviorEditor(idx) {
  behaviorEditorIndex = idx;
  var b = behaviors[idx];
  document.getElementById('beditName').value = b.name;
  document.getElementById('beditLabel').value = b.label;
  document.getElementById('beditMacro').innerHTML = macroRefOptionsHTML(b.macro);
  document.getElementById('behaviorEditorOverlay').style.display = 'flex';
}

function closeBehaviorEditor() {
  document.getElementById('behaviorEditorOverlay').style.display = 'none';
  behaviorEditorIndex = -1;
}

function renderBehaviorList() {
  var list = document.getElementById('behaviorList');
  list.innerHTML = '';
  behaviors.forEach(function(b, i) {
    var div = document.createElement('div');
    div.className = 'item';
    var macroLabel = b.macro || '—';
    var behLabelStr = b.label ? '<span style="color:#9cc;font-size:0.82em;margin:0 4px;" title="Label">&quot;' + esc(b.label) + '&quot;</span>' : '';
    div.innerHTML =
      '<b>' + esc(b.name) + '</b>' +
      behLabelStr +
      '<span class="item-detail muted">&rarr; ' + esc(macroLabel) + '</span>' +
      '<button class="btn-edit btn-sm" data-edit="behavior" data-i="' + i + '">&#9998; Edit</button>' +
      '<button class="btn-danger btn-sm" data-remove="behavior" data-i="' + i + '">&#10005;</button>';
    list.appendChild(div);
  });
  list.onclick = function(e) {
    if (e.target.dataset.remove === 'behavior') { pushRgbUndo(); behaviors.splice(parseInt(e.target.dataset.i), 1); rgbRenderAll(); }
    if (e.target.dataset.edit === 'behavior') { openBehaviorEditor(parseInt(e.target.dataset.i)); }
  };
}

function renderComboList() {
  var list = document.getElementById('comboList');
  list.innerHTML = '';
  combos.forEach(function(c, i) {
    var div = document.createElement('div');
    div.className = 'item';
    var layerParts = (c.layers || '').trim() ? c.layers.trim().split(/\s+/) : [];
    var tagsHtml = layerParts.map(function(p) {
      return '<span class="layer-tag">' + esc(p) + '</span>';
    }).join(' ');
    div.innerHTML =
      '<b>' + esc(c.name) + '</b>' +
      '<span class="item-detail">' + esc(c.bind) + '</span>' +
      '<span class="item-detail muted">P:' + esc(c.pos) + '</span>' +
      '<span class="item-tags">' + tagsHtml + '</span>' +
      '<button class="btn-edit btn-sm" data-edit="combo" data-i="' + i + '">&#9998; Edit</button>' +
      '<button class="btn-danger btn-sm" data-remove="combo" data-i="' + i + '">&#10005;</button>';
    list.appendChild(div);
  });
  list.onclick = function(e) {
    if (e.target.dataset.remove === 'combo') { pushRgbUndo(); combos.splice(parseInt(e.target.dataset.i), 1); rgbRenderAll(); }
    if (e.target.dataset.edit === 'combo') { openComboEditor(parseInt(e.target.dataset.i)); }
  };
}

function renderBlinkMacroList() {
  var list = document.getElementById('blinkMacroList');
  list.innerHTML = '';
  blinkMacros.forEach(function(bm, i) {
    var colorHex = colorValueMap[bm.color] ? hsbToHex(colorValueMap[bm.color].h, colorValueMap[bm.color].s, colorValueMap[bm.color].b) : '#ccc';
    var retHex = colorValueMap[bm.returnColor] ? hsbToHex(colorValueMap[bm.returnColor].h, colorValueMap[bm.returnColor].s, colorValueMap[bm.returnColor].b) : '#ccc';
    var isMoBlink = bm._helper === 'MO_BLINK';
    var div = document.createElement('div');
    div.className = 'item';
    var secondField;
    if (isMoBlink) {
      secondField = '<span style="color:#e8a735;font-size:0.82em;margin:0 4px;" title="Experimental">&#9888; MO_BLINK</span>' +
        '<div class="input-group"><label>Layer</label><select data-field="layer" data-i="' + i + '">' + layerOptionsHTML(bm.layer || '') + '</select></div>';
    } else {
      secondField = '<div class="input-group"><label>Key</label><input type="text" value="' + esc(bm.key) + '" data-field="key" data-i="' + i + '" style="width:90px"></div>';
    }
    div.innerHTML =
      '<b>' + esc(bm.name) + '</b>' +
      '<div class="input-group"><label>Label</label><input type="text" value="' + esc(bm.label || '') + '" data-field="label" data-i="' + i + '" placeholder="label" style="width:110px"></div>' +
      secondField +
      '<div class="input-group"><label>Color</label><select data-field="color" data-i="' + i + '">' + colorOptionsHTML(bm.color) + '</select><span class="color-preview" style="background:' + colorHex + '" title="' + esc(bm.color) + '"></span></div>' +
      '<div class="input-group"><label>Ret</label><select data-field="returnColor" data-i="' + i + '">' + colorOptionsHTML(bm.returnColor) + '</select><span class="color-preview" style="background:' + retHex + '" title="' + esc(bm.returnColor) + '"></span></div>' +
      '<div class="input-group"><label>Wait</label><input type="number" value="' + esc(bm.wait) + '" data-field="wait" data-i="' + i + '" style="width:48px"></div>' +
      '<button class="btn-danger btn-sm" data-remove="blink" data-i="' + i + '">&#10005;</button>';
    list.appendChild(div);
  });
  list.onclick = function(e) { if (e.target.dataset.remove === 'blink') { pushRgbUndo(); blinkMacros.splice(parseInt(e.target.dataset.i), 1); rgbRenderAll(); } };
  var _rgbBlinkUndoPushed = false;
  list.addEventListener('focusin', function(e) {
    if (e.target.dataset.field && !_rgbBlinkUndoPushed) { _rgbBlinkUndoPushed = true; pushRgbUndo(); }
  });
  list.addEventListener('focusout', function() { _rgbBlinkUndoPushed = false; });
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
  document.getElementById('blinkLayer').innerHTML = layerOptionsHTML('');
  document.getElementById('behaviorMacro').innerHTML = macroRefOptionsHTML('');
  // Populate combo bind dropdown with macros/behaviors from RGB tab
  var cbSel = document.getElementById('comboBind');
  if (cbSel) cbSel.innerHTML = comboBindOptionsHTML('');
  // Populate combo layer picker dropdown
  var clp = document.getElementById('comboLayerPicker');
  if (clp) clp.innerHTML = '<option value="">+ Add layer</option>' + layerOptionsHTML('');
  renderComboLayerTags();
  var macroTypeEl = document.getElementById('macroType');
  var releaseGroup = document.getElementById('releaseColorGroup');
  if (macroTypeEl.value === 'MO_RGB') releaseGroup.classList.remove('hidden');
  else releaseGroup.classList.add('hidden');
  // Toggle blink type fields
  var blinkTypeEl = document.getElementById('blinkType');
  var isMoBlink = blinkTypeEl && blinkTypeEl.value === 'MO_BLINK';
  document.getElementById('blinkKeyGroup').style.display = isMoBlink ? 'none' : '';
  document.getElementById('blinkLayerGroup').style.display = isMoBlink ? '' : 'none';
  document.getElementById('blinkExperimentalNote').style.display = isMoBlink ? '' : 'none';
}

function renderComboLayerTags() {
  var tags = document.getElementById('comboLayerTags');
  if (!tags) return;
  var val = (document.getElementById('comboLayersInput').value || '').trim();
  var parts = val ? val.split(/\s+/) : [];
  tags.innerHTML = parts.map(function(p) {
    return '<span class="layer-tag">' + esc(p) + '<span class="tag-x" data-layer="' + esc(p) + '">&times;</span></span>';
  }).join('');
}

function addLayer() {
  pushRgbUndo();
  var name = document.getElementById('layerName').value.trim() || 'NEW_COLOR';
  var idxVal = document.getElementById('layerIndex').value;
  layers.push({ name: name, index: idxVal, h: document.getElementById('hue').value, s: document.getElementById('sat').value, b: document.getElementById('bri').value, label: document.getElementById('layerLabel').value });
  rgbRenderAll();
}
function autoPrefix(name, type) {
  if (type === 'TO_RGB' && !name.startsWith('to_')) return 'to_' + name;
  if (type === 'TO_RGB_PRESS' && !name.startsWith('top_')) return 'top_' + name;
  return name;
}
function addMacro() {
  pushRgbUndo();
  var type = document.getElementById('macroType').value;
  var rawName = document.getElementById('macroName').value.trim() || 'new_macro';
  var name = autoPrefix(rawName, type);
  var obj = { name: name, type: type, layer: document.getElementById('macroLayer').value, color: document.getElementById('macroColor').value, releaseColor: type === 'MO_RGB' ? document.getElementById('macroReleaseColor').value : '', label: document.getElementById('macroLabel').value.trim() };
  macros.push(obj);
  rgbRenderAll();
}
function addBehavior() {
  pushRgbUndo();
  behaviors.push({ name: document.getElementById('behaviorName').value.trim() || 'new_behavior', label: document.getElementById('behaviorLabel').value, macro: document.getElementById('behaviorMacro').value });
  rgbRenderAll();
}
function addCombo() {
  pushRgbUndo();
  var pos = document.getElementById('comboPos').value.trim();
  if (!pos && rgbComboSelectedPositions.length) {
    pos = rgbComboSelectedPositions.slice().sort(function(a,b) { return a-b; }).join(' ');
  }
  combos.push({ name: document.getElementById('comboName').value.trim() || 'new_combo', bind: document.getElementById('comboBind').value, pos: pos, layers: document.getElementById('comboLayersInput').value });
  rgbComboSelectedPositions = [];
  rgbEditingComboIndex = -1;
  document.getElementById('rgbComboMiniKbWrap').style.display = 'none';
  document.getElementById('comboPos').value = '';
  document.getElementById('comboLayersInput').value = '';
  rgbRenderAll();
}
function addBlinkMacro() {
  pushRgbUndo();
  var btype = document.getElementById('blinkType').value;
  var obj = { name: document.getElementById('blinkName').value.trim() || 'new_blink', color: document.getElementById('blinkColor').value, returnColor: document.getElementById('blinkReturnColor').value, wait: document.getElementById('blinkWait').value || '80', label: document.getElementById('blinkLabel').value.trim(), comment: '', _helper: btype };
  if (btype === 'MO_BLINK') {
    obj.key = '';
    obj.layer = document.getElementById('blinkLayer').value;
  } else {
    obj.key = document.getElementById('blinkKey').value;
    obj.layer = '';
  }
  blinkMacros.push(obj);
  rgbRenderAll();
}

function updateColorMapFromLayer(i) {
  var l = layers[i];
  var ck = l.name.replace(/^LAYER_/i, '').replace(/^L_/, '');
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
  '#define MO_RGB(node_name, node_label, layer, active_color, release_color) \\\n' +
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
  '#define TO_RGB(node_name, node_label, layer, color) \\\n' +
  '        ZMK_MACRO(node_name, \\\n' +
  '            bindings = \\\n' +
  '                <&macro_tap>, \\\n' +
  '                <&to layer>, \\\n' +
  '                <&macro_tap>, \\\n' +
  '                <&rgb_ug color>; \\\n' +
  '            label = node_label; \\\n' +
  '        )\n';

var HELPER_TO_PRESS =
  '#define TO_RGB_PRESS(node_name, node_label, layer, color) \\\n' +
  '        ZMK_MACRO(node_name, \\\n' +
  '            bindings = \\\n' +
  '                <&macro_tap>, \\\n' +
  '                <&to layer>, \\\n' +
  '                <&macro_press>, \\\n' +
  '                <&rgb_ug color>; \\\n' +
  '            label = node_label; \\\n' +
  '        )\n';

var HELPER_HOLD_TAP =
  '#define RGB_HT(node_name, node_label, macro_ref) \\\n' +
  '        node_name: node_name { \\\n' +
  '            compatible = "zmk,behavior-hold-tap"; \\\n' +
  '            label = node_label; \\\n' +
  '            bindings = <&macro_ref>, <&kp>; \\\n' +
  '            #binding-cells = <2>; \\\n' +
  '            tapping-term-ms = <200>; \\\n' +
  '            flavor = "tap-preferred"; \\\n' +
  '            quick-tap-ms = <180>; \\\n' +
  '            global-quick-tap; \\\n' +
  '        };\n';

var HELPER_COMBO =
  '#define CMB(name, bind, keypos, ...) \\\n' +
  '    name { bindings = <bind>; key-positions = <keypos>; layers = <__VA_ARGS__>; timeout-ms = <50>; }\n';

// EXPERIMENTAL: Momentary-layer + blink sequence helper
var HELPER_MO_BLINK =
  '/* EXPERIMENTAL: Momentary + Blink helper (use with RGB_HT) */\n' +
  '#define MO_BLINK(node_name, node_label, layer, blink_color, return_color, wait) \\\n' +
  '        ZMK_MACRO(node_name, \\\n' +
  '            label = node_label; \\\n' +
  '            bindings = <&macro_press &mo layer BLINK_SEQ(blink_color, return_color, wait)>, \\\n' +
  '                       <&macro_pause_for_release>, \\\n' +
  '                       <&macro_release &mo layer>; \\\n' +
  '        )\n';

// EXPERIMENTAL: KP_BLINK helper — hardcoded &kp + blink (used with tap-dance)
var HELPER_KP_BLINK =
  '/* EXPERIMENTAL: Blink helper - Hardcode a &kp you want to "blink", used in conjunction with tap-dance*/\n' +
  '#define KP_BLINK(node_name, node_label, key, blink_color, return_color, wait) \\\n' +
  '         ZMK_MACRO(node_name, \\\n' +
  '            label = node_label; \\\n' +
  '            bindings = <&macro_tap &kp key>, \\\n' +
  '            <BLINK_SEQ(blink_color, return_color, wait)>; \\\n' +
  '        )\n';

// RGB output generation
// updateRgbOutput() — Generates the .dtsi output text for the RGB tab.
// Strips section header comments (/* ---- ... ---- */ lines) from a stored
// comment string so they don't duplicate the hardcoded section headers in output.
function stripSectionHeaders(comment) {
  if (!comment) return '';
  var lines = comment.split('\n').filter(function(line) {
    return !/^\s*\/\*\s*----.*----\s*\*\/\s*$/.test(line);
  });
  return lines.join('\n').replace(/^\s+|\s+$/g, '');
}

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
      var name = l.name;
      out += '#define ' + name + ' ' + l.index + '\n';
    }
  });

  // Reserved RGB action names that must not be used as color define names
  var reservedRgbNames = {};
  RGB_ACTIONS.forEach(function(a) { reservedRgbNames[a.split('(')[0]] = true; });
  var colorRenameMap = {}; // tracks renamed colors: old name -> new name

  out += '\n/* ---- STEP 1a: DEFINE COLORS ---- */\n';
  mergedArr.forEach(function(l) {
    if (l.index === '' || l.index === undefined) return; // non-layer (blink helpers) go through orphan path
    if (hasHsbVal(l.h) && hasHsbVal(l.s) && hasHsbVal(l.b)) {
      var name = l.name.startsWith('RGB_') ? l.name : 'RGB_' + l.bk;
      name = name.replace(/\s/g, '_');
      // Avoid collision with ZMK built-in RGB action names (e.g. RGB_TOG)
      if (reservedRgbNames[name]) {
        var newName = 'RGB_LYR_' + l.bk;
        colorRenameMap[name] = newName;
        name = newName;
      }
      var cmt = l.label ? '      /* ' + l.label + ' */' : '';
      out += '#define ' + name + ' RGB_COLOR_HSB(' + l.h + ',' + l.s + ',' + l.b + ')' + cmt + '\n';
    }
  });

  var mergedBKs = {};
  mergedArr.forEach(function(l) { if (l.index !== '' && l.index !== undefined) mergedBKs[l.bk] = true; });
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
        var olbl = colorLabelMap[ck] || '';
        var ocmt = olbl ? '      /* ' + olbl + ' */' : '';
        out += '#define ' + ck + ' RGB_COLOR_HSB(' + v.h + ',' + v.s + ',' + v.b + ')' + ocmt + '\n';
      });
    }
  }

  // Resolve renamed color references
  function rc(colorName) { return colorRenameMap[colorName] || colorName; }

  if (includeHelpers) {
    out += '\n/* ---- HELPER DEFINITIONS ---- */\n';
    out += HELPER_BLINK_SEQ;
    out += HELPER_MOMENTARY;
    out += HELPER_TO;
    out += HELPER_TO_PRESS;
    out += HELPER_HOLD_TAP;
    out += HELPER_COMBO;
    if (blinkMacros.some(function(bm) { return bm._helper === 'MO_BLINK'; })) {
      out += HELPER_MO_BLINK;
    }
    if (blinkMacros.some(function(bm) { return bm._helper !== 'MO_BLINK' && bm.key && bm.key.indexOf('&mo') !== 0; })) {
      out += HELPER_KP_BLINK;
    }
  }

  var hasNativeMacroBeh = dtsiNativeBehaviors.some(function(db) { return db.type === 'macro-one-param' || db.type === 'macro-two-param'; });
  var hasMacroBlock = macros.length > 0;
  var hasMacros = macros.length || blinkMacros.length || hasNativeMacroBeh;
  var hasBehaviors = behaviors.length || dtsiNativeBehaviors.some(function(db) { return db.type !== 'macro-one-param' && db.type !== 'macro-two-param'; });
  var hasContent = hasMacros || hasBehaviors || combos.length;

  if (hasContent) out += ' /{\n';

  if (hasMacroBlock) {
    out += '    /* ---- STEP 2+3: MACROS ---- */\n';
    out += '    macros {\n';
    macros.forEach(function(m) {
      var mc = stripSectionHeaders(m.comment);
      if (mc) out += '        ' + mc.replace(/\n/g, '\n        ') + '\n';
      var lbl = m.label || m.name;
      if (m.type === 'MO_RGB') {
        out += '        MO_RGB(' + m.name + ', "' + lbl + '", ' + m.layer + ', ' + rc(m.color) + ', ' + rc(m.releaseColor) + ')\n';
      } else if (m.type === 'TO_RGB_PRESS') {
        out += '        TO_RGB_PRESS(' + m.name + ', "' + lbl + '", ' + m.layer + ', ' + rc(m.color) + ')\n';
      } else {
        out += '        TO_RGB(' + m.name + ', "' + lbl + '", ' + m.layer + ', ' + rc(m.color) + ')\n';
      }
    });
    out += '    };\n';
  }

  // Native macro behaviors (macro-one-param, etc.) go after macros section but inside / {}
  if (hasNativeMacroBeh) {
    dtsiNativeBehaviors.forEach(function(db) {
      if (db.type === 'macro-one-param' || db.type === 'macro-two-param') {
        var lines = (db._rawText || '').split('\n');
        var minIndent = Infinity;
        lines.forEach(function(ln, li) { if (li > 0 && ln.trim()) { var m = ln.match(/^(\s*)/); minIndent = Math.min(minIndent, m[1].length); } });
        if (minIndent === Infinity) minIndent = 0;
        var raw = lines.map(function(ln, li) { return li === 0 ? ln.replace(/^\s+/, '') : ln.substring(minIndent); }).join('\n');
        if (!/;\s*$/.test(raw)) raw += ';';
        out += '    ' + raw.replace(/\n/g, '\n    ') + '\n';
      }
    });
  }

  if (blinkMacros.length) {
    out += '    /* ---- (optional) BLINK/STATUS MACROS ---- */\n';
    var seenBlink = {};
    blinkMacros.forEach(function(bm) {
      if (!bm.color || !bm.returnColor) return;
      if (seenBlink[bm.name]) return;
      seenBlink[bm.name] = true;
      var bc = stripSectionHeaders(bm.comment);
      if (bc) out += '    ' + bc.replace(/\n/g, '\n    ') + '\n';
      if (bm._helper === 'MO_BLINK') {
        // MO_BLINK output
        var mlbl = bm.label || bm.name;
        if (includeHelpers) {
          out += '    MO_BLINK(' + bm.name + ', "' + mlbl + '", ' + (bm.layer || '') + ', ' + rc(bm.color) + ', ' + rc(bm.returnColor) + ', ' + (bm.wait || '80') + ')\n';
        } else {
          out += '    ZMK_MACRO(' + bm.name + ',\n';
          if (bm.label) out += '        label = "' + bm.label + '";\n';
          out += '        bindings = <&macro_press &mo ' + (bm.layer || '') + ' BLINK_SEQ(' + rc(bm.color) + ', ' + rc(bm.returnColor) + ', ' + (bm.wait || '80') + ')>,\n';
          out += '                   <&macro_pause_for_release>,\n';
          out += '                   <&macro_release &mo ' + (bm.layer || '') + '>;\n';
          out += '    )\n';
        }
      } else if (includeHelpers && bm.key && bm.key.indexOf('&mo') !== 0) {
        var blbl = bm.label || bm.name;
        out += '        KP_BLINK(' + bm.name + ', "' + blbl + '", ' + bm.key + ', ' + rc(bm.color) + ', ' + rc(bm.returnColor) + ', ' + bm.wait + ')\n';
      } else {
        out += '    ZMK_MACRO(' + bm.name + ',\n';
        if (bm.label) out += '        label = "' + bm.label + '";\n';
        if (bm.key && bm.key.indexOf('&mo') === 0) {
          out += '        bindings = <&macro_press ' + bm.key + ' BLINK_SEQ(' + rc(bm.color) + ', ' + rc(bm.returnColor) + ', ' + bm.wait + ')>,\n';
          out += '                   <&macro_pause_for_release>,\n';
          out += '                   <&macro_release ' + bm.key + '>;\n';
        } else {
          out += '        bindings = <&macro_tap &kp ' + bm.key + ' BLINK_SEQ(' + rc(bm.color) + ', ' + rc(bm.returnColor) + ', ' + bm.wait + ')>;\n';
        }
        out += '    )\n';
      }
    });
  }

  if (hasBehaviors) {
    out += '    /* ---- STEP 4: BEHAVIORS - HOLD-TAP ---- */\n';
    out += '    behaviors {\n';
    behaviors.forEach(function(b) {
      out += '        RGB_HT(' + b.name + ', "' + b.label + '", ' + b.macro + ')\n';
    });
    // Native behaviors (hold-tap, tap-dance, etc.) inside behaviors section
    dtsiNativeBehaviors.forEach(function(db) {
      if (db.type !== 'macro-one-param' && db.type !== 'macro-two-param') {
        var lines = (db._rawText || '').split('\n');
        var minIndent = Infinity;
        lines.forEach(function(ln, li) { if (li > 0 && ln.trim()) { var m = ln.match(/^(\s*)/); minIndent = Math.min(minIndent, m[1].length); } });
        if (minIndent === Infinity) minIndent = 0;
        var raw = lines.map(function(ln, li) { return li === 0 ? ln.replace(/^\s+/, '') : ln.substring(minIndent); }).join('\n');
        if (!/;\s*$/.test(raw)) raw += ';';
        out += '\n        ' + raw.replace(/\n/g, '\n        ') + '\n';
      }
    });
    out += '    };\n';
  }

  if (combos.length) {
    out += '    /* ---- (OPTIONAL) STEP 5: COMBOS ---- */\n';
    out += '    combos {\n';
    out += '        compatible = "zmk,combos";\n';
    combos.forEach(function(c) {
      var cc = stripSectionHeaders(c.comment);
      if (cc) out += '        ' + cc.replace(/\n/g, '\n        ') + '\n';
      out += '        CMB(' + c.name + ', ' + c.bind + ', ' + c.pos.trim() + ', ' + c.layers + ');\n';
    });
    out += '    };\n';
  }

  // Any standalone native behaviors that go after combos (like td_numcaps tap-dance)
  // These are behaviors placed outside the behaviors{} block in the dtsi
  // (Already included inside behaviors{} above)

  if (hasContent) out += ' };\n';

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
// More on this code can be found in 'RefDoc' line 408
// ================================================================
var KEY_SCALE = 56; // pixels per unit
var KEY_SIZE = 52;  // inner key size (slightly less than KEY_SCALE for gap)
var KEY_RADIUS = 5;

// loadLayout(layoutObj) — Takes a keyboard layout JSON and extracts
// the physical key position array. Accepts multiple JSON formats:
//   1. { layouts: { "<name>": { layout: [...] } } } — standard keyboard .json
//   2. { layout: [...] } — direct layout wrapper
//   3. [...] — flat array of key positions
// If keys lack row/col fields (common in community .json files), they are
// inferred from x/y positions: a new row starts when x drops by more than 2
// from the previous key (indicating the line wrapped back to the left side).
// The keyboard name (e.g. "Sofle") is extracted from the layout key and stored
// in currentLayoutId for use in #include "-rgb.dtsi" output generation.
function loadLayout(layoutObj) {
  var layoutArr = null;
  var layoutName = null;

  // Format 1: { layouts: { "<name>": { layout: [...] } } }
  if (layoutObj && layoutObj.layouts && typeof layoutObj.layouts === 'object') {
    var keys = Object.keys(layoutObj.layouts);
    if (keys.length > 0) {
      layoutName = keys[0];
      var inner = layoutObj.layouts[layoutName];
      if (inner && Array.isArray(inner.layout)) {
        layoutArr = inner.layout;
      }
    }
    // An explicit "id" field overrides the layout key name
    if (layoutObj.id) layoutName = layoutObj.id;
  }

  // Format 2: { layout: [...] }
  if (!layoutArr && layoutObj && Array.isArray(layoutObj.layout)) {
    layoutArr = layoutObj.layout;
    if (layoutObj.id) layoutName = layoutObj.id;
  }

  // Format 3: flat array of key positions
  if (!layoutArr && Array.isArray(layoutObj)) {
    layoutArr = layoutObj;
  }

  if (!layoutArr || layoutArr.length === 0) {
    keyboardLayout = null;
    return;
  }

  // Infer row and col from x/y positions if the first key lacks a row field.
  // Row breaks are detected when x drops significantly (> 2 units) from the
  // previous key, which means the layout wrapped to a new physical row.
  if (layoutArr[0].row === undefined) {
    var row = 0;
    var colInRow = 0;
    for (var i = 0; i < layoutArr.length; i++) {
      if (i > 0 && layoutArr[i].x < layoutArr[i - 1].x - 2) {
        row++;
        colInRow = 0;
      }
      layoutArr[i].row = row;
      layoutArr[i].col = colInRow++;
    }
  }

  keyboardLayout = layoutArr;

  // Set currentLayoutId from the layout name (e.g. "Sofle" → "sofle",
  // "LAYOUT_split_3x6_3" → "layout_split_3x6_3"). This name is used
  // to generate the correct #include "<name>-rgb.dtsi" in output.
  if (layoutName) {
    currentLayoutId = layoutName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
  }
}

// renderKeyboardSvg(targetId, options) — Draws the keyboard as SVG.
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

// bindingToLabels(binding) — Turns a ZMK binding string like "&kp A"
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
  // Custom behaviors: &hm, &RGB_ht_*, &td_*, &f_blink_test, etc.
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

// simplifyKeycode(kc) — Shortens long ZMK keycode names for display.
// For example, "LEFT_SHIFT" becomes "LSHFT", "BACKSPACE" becomes "BSPC".
function simplifyKeycode(kc) {
  if (!kc) return '';
  // Handle compound modifiers: LS(LA(DOWN)) → LS+LA DOWN
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

// getLayerLabel(idx) — Returns a human-readable label for a layer
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
// More on this code can be found in 'RefDoc' line 457
// ================================================================
// parseKeymap(text) — The main .keymap parser. Reads ZMK devicetree text
// and extracts layers, combos, macros, behaviors, conditional layers, and
// sensor bindings. This is the biggest function in the file. It works by
// using regex patterns to find each section of the devicetree format.
function parseKeymap(text) {
  // Preserve cross-tab synced data across re-parse (RGB macros/behaviors and dtsi behaviors)
  var savedMacros = keymapMacros.filter(function(m) { return m._fromRgb; });
  var savedBehaviors = keymapBehaviors.filter(function(b) { return b._fromRgb || b._fromDtsi; });
  var savedCombos = keymapCombos.filter(function(c) { return c._fromRgb; });
  keymapLayers = [];
  keymapCombos = [];
  keymapMacros = [];
  keymapBehaviors = [];
  keymapConditionalLayers = [];
  keymapSensorBindings = [];
  // Restore cross-tab data
  savedMacros.forEach(function(m) { keymapMacros.push(m); });
  savedBehaviors.forEach(function(b) { keymapBehaviors.push(b); });
  savedCombos.forEach(function(c) { keymapCombos.push(c); });

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
  keymapParsedHeaderLines = headerLines.length ? headerLines : null;

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
      var comboExists = keymapCombos.some(function(ec) { return ec.name === cname; });
      if (!comboExists) {
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
        var hwu = /hold-while-undecided\s*;/.test(bbody.replace(/hold-while-undecided-linger/g, ''));
        var hwul = /hold-while-undecided-linger\s*;/.test(bbody);
        var htor = /hold-trigger-on-release\s*;/.test(bbody);
        var gqt = /global-quick-tap\s*;/.test(bbody);
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
          holdTriggerOnRelease: htor,
          globalQuickTap: gqt
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
      var behExists = keymapBehaviors.some(function(eb) { return eb.name === bname; });
      if (!behExists) {
        keymapBehaviors.push({ name: bname, type: btype, label: blabel ? blabel[1] : '', config: config });
      }
    }
  }
}

// parseBindings(str) — Splits a bindings string like "&kp A &mo 1 &trans"
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
// More on this code can be found in 'RefDoc' line 488
// ================================================================
// renderLayerTabs() — Rebuilds the layer sidebar tabs (left panel).
// Each layer gets a clickable tab. Active layer is highlighted.
// Reserved layers are shown dimmed. Click a tab to switch layers.
function renderLayerTabs() {
  var container = document.getElementById('layerSidebar');
  var html = '<div class="layer-sidebar-label">Layers</div>';
  keymapLayers.forEach(function(l, i) {
    if (l.status === 'reserved') return;
    var cls = i === activeLayerIndex ? 'layer-tab active' : 'layer-tab';
    // Look up matching RGB layer color — match by index first, then by name
    var colorDot = '';
    var idxStr = String(i);
    var lName = l.name.toUpperCase();
    var dispUpper = l.displayName ? l.displayName.toUpperCase().replace(/[^A-Z0-9]/g, '_') : '';
    var rgbMatch = layers.find(function(rl) {
      // Index match (most reliable across name differences)
      if (rl.index !== '' && rl.index !== undefined && String(rl.index) === idxStr) return true;
      // Name match fallbacks
      if (rl.name === l.name || rl.name === 'L_' + lName) return true;
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
  var displayEl = document.getElementById('lcInlineDisplay');
  var nameEl = document.getElementById('lcInlineName');
  var idxEl = document.getElementById('lcInlineIdx');
  // Skip update if user is actively typing in the inline fields
  if (document.activeElement === displayEl || document.activeElement === nameEl) return;
  if (keymapLayers.length > 0 && keymapLayers[activeLayerIndex] && keymapLayers[activeLayerIndex].status !== 'reserved') {
    var l = keymapLayers[activeLayerIndex];
    displayEl.value = l.displayName || '';
    nameEl.value = l.name;
    idxEl.textContent = '(layer ' + activeLayerIndex + ')';
    displayEl.disabled = false;
    nameEl.disabled = false;
  } else {
    displayEl.value = '';
    nameEl.value = '';
    idxEl.textContent = 'No layer';
    displayEl.disabled = true;
    nameEl.disabled = true;
  }
}

// ================================================================
// SECTION: LAYER CONTEXT MENU
// Right-clicking a layer tab opens a dropdown with options:
// rename, change display name, toggle status, move up/down, delete.
// More on this code can be found in 'RefDoc' line 488
// ================================================================
// showLayerContextMenu(anchorEl) — Opens a right-click menu next to
// a layer tab with options to rename, change status, move, or delete.
function showLayerContextMenu(anchorEl) {
  var menu = document.getElementById('layerCtxMenu');
  var items = [
    { label: 'Duplicate Layer', action: 'duplicate' },
    { label: 'Delete Layer', action: 'delete', danger: true },
    { sep: true },
    { label: 'Clear Layer \u2192 &trans', action: 'clear-trans' },
    { label: 'Clear Layer \u2192 &none', action: 'clear-none' },
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
  } else if (action === 'clear-trans') {
    if (!confirm('Clear all bindings in this layer to &trans?')) return;
    for (var i = 0; i < layer.bindings.length; i++) {
      layer.bindings[i] = '&trans';
    }
  } else if (action === 'clear-none') {
    if (!confirm('Clear all bindings in this layer to &none?')) return;
    for (var i = 0; i < layer.bindings.length; i++) {
      layer.bindings[i] = '&none';
    }
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
  // Inline editing — just focus the display name field
  var el = document.getElementById('lcInlineDisplay');
  if (el) { el.focus(); el.select(); }
}

// ================================================================
// SECTION: MODIFIER HELPERS
// These helpers translate ZMK modifier function names like LS(A)
// into human-readable labels. MOD_FUNCS maps short names to their
// function wrappers. Used by bindingToLabels() and the binding editor.
// More on this code can be found in 'RefDoc' line 433
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
// More on this code can be found in 'RefDoc' line 510
// ================================================================
// populateKeycodeGrids() — Fills the keycode picker tabs (letters,
// numbers, symbols, etc.) with clickable buttons for every ZMK keycode.
var kcDescs = {
  // Numbers
  N0:'0',N1:'1',N2:'2',N3:'3',N4:'4',N5:'5',N6:'6',N7:'7',N8:'8',N9:'9',
  NUMBER_0:'0 (alias)',NUMBER_1:'1 (alias)',NUMBER_2:'2 (alias)',NUMBER_3:'3 (alias)',NUMBER_4:'4 (alias)',
  NUMBER_5:'5 (alias)',NUMBER_6:'6 (alias)',NUMBER_7:'7 (alias)',NUMBER_8:'8 (alias)',NUMBER_9:'9 (alias)',
  // Modifiers
  LSHIFT:'Left Shift',LSHFT:'Left Shift',LEFT_SHIFT:'Left Shift',RSHIFT:'Right Shift',RSHFT:'Right Shift',RIGHT_SHIFT:'Right Shift',
  LCTRL:'Left Control',LEFT_CONTROL:'Left Control',RCTRL:'Right Control',RIGHT_CONTROL:'Right Control',
  LALT:'Left Alt',LEFT_ALT:'Left Alt',RALT:'Right Alt',RIGHT_ALT:'Right Alt',
  LGUI:'Left GUI (Win/Cmd)',LWIN:'Left Windows',LCMD:'Left Command',LMETA:'Left Meta',LEFT_GUI:'Left GUI',
  RGUI:'Right GUI (Win/Cmd)',RWIN:'Right Windows',RCMD:'Right Command',RMETA:'Right Meta',RIGHT_GUI:'Right GUI',
  // Navigation
  UP:'Arrow Up',DOWN:'Arrow Down',LEFT:'Arrow Left',RIGHT:'Arrow Right',
  HOME:'Home',END:'End',PG_UP:'Page Up',PAGE_UP:'Page Up',PG_DN:'Page Down',PAGE_DOWN:'Page Down',
  // Control
  ESC:'Escape',ESCAPE:'Escape',ENTER:'Enter',RET:'Return',RETURN:'Return',SPACE:'Spacebar',TAB:'Tab',
  BSPC:'Backspace',BACKSPACE:'Backspace',DEL:'Delete',DELETE:'Delete',INS:'Insert',INSERT:'Insert',
  // Locks
  CAPS:'Caps Lock',CLCK:'Caps Lock',CAPSLOCK:'Caps Lock',SLCK:'Scroll Lock',SCROLLLOCK:'Scroll Lock',
  LNLCK:'Num Lock',KP_NLCK:'Num Lock',KP_NUM:'Num Lock',KP_NUMLOCK:'Num Lock',
  // Symbols
  MINUS:'- Hyphen',EQUAL:'= Equals',LBKT:'[ Left Bracket',LBRC:'[ Left Bracket',LEFT_BRACKET:'[ Left Bracket',
  RBKT:'] Right Bracket',RBRC:'] Right Bracket',RIGHT_BRACKET:'] Right Bracket',
  BSLH:'\\ Backslash',BACKSLASH:'\\ Backslash',GRAVE:'` Grave Accent',
  SQT:"' Single Quote",APOS:"' Apostrophe",APOSTROPHE:"' Apostrophe",
  SEMI:'; Semicolon',COMMA:', Comma',DOT:'. Period',FSLH:'/ Forward Slash',SLASH:'/ Slash',
  NON_US_HASH:'# Non-US Hash',NUHS:'# Non-US Hash',NON_US_BSLH:'\\ Non-US Backslash',NUBS:'\\ Non-US Backslash',
  TILDE:'~ Tilde',EXCL:'! Exclamation',EXCLAMATION:'! Exclamation',AT:'@ At Sign',
  HASH:'# Hash',POUND:'# Pound',DLLR:'$ Dollar',DOLLAR:'$ Dollar',PRCNT:'% Percent',PERCENT:'% Percent',
  CARET:'^ Caret',AMPS:'& Ampersand',AMPERSAND:'& Ampersand',ASTRK:'* Asterisk',ASTERISK:'* Asterisk',STAR:'* Star',
  LPAR:'( Left Paren',RPAR:') Right Paren',LEFT_PARENTHESIS:'( Left Paren',RIGHT_PARENTHESIS:') Right Paren',
  UNDER:'_ Underscore',UNDERSCORE:'_ Underscore',PLUS:'+ Plus',PIPE:'| Pipe',PIPE2:'| Pipe2',
  COLON:': Colon',DQT:'" Double Quote',DOUBLE_QUOTES:'" Double Quote',
  LT:'< Less Than',LESS_THAN:'< Less Than',GT:'> Greater Than',GREATER_THAN:'> Greater Than',
  QMARK:'? Question Mark',QUESTION:'? Question',
  // Numpad
  KP_N0:'Numpad 0',KP_N1:'Numpad 1',KP_N2:'Numpad 2',KP_N3:'Numpad 3',KP_N4:'Numpad 4',
  KP_N5:'Numpad 5',KP_N6:'Numpad 6',KP_N7:'Numpad 7',KP_N8:'Numpad 8',KP_N9:'Numpad 9',
  KP_PLUS:'Numpad +',KP_MINUS:'Numpad -',KP_SUBTRACT:'Numpad -',KP_MULTIPLY:'Numpad *',KP_ASTERISK:'Numpad *',
  KP_DIVIDE:'Numpad /',KP_SLASH:'Numpad /',KP_DOT:'Numpad .',KP_ENTER:'Numpad Enter',KP_EQUAL:'Numpad =',
  KP_COMMA:'Numpad ,',KP_LPAR:'Numpad (',KP_RPAR:'Numpad )',KP_CLEAR:'Numpad Clear',
  // Media
  C_VOL_UP:'Volume Up',C_VOLUME_UP:'Volume Up',C_VOL_DN:'Volume Down',C_VOLUME_DOWN:'Volume Down',C_MUTE:'Mute',
  C_PLAY_PAUSE:'Play/Pause',C_PP:'Play/Pause',C_NEXT:'Next Track',C_PREV:'Previous Track',C_STOP:'Stop',
  C_PLAY:'Play',C_PAUSE:'Pause',C_RECORD:'Record',C_REC:'Record',C_REWIND:'Rewind',C_RW:'Rewind',
  C_FAST_FORWARD:'Fast Forward',C_FF:'Fast Forward',C_EJECT:'Eject',
  C_BRI_UP:'Brightness Up',C_BRI_INC:'Brightness Up',C_BRI_DN:'Brightness Down',C_BRI_DEC:'Brightness Down',
  C_BRI_MIN:'Brightness Min',C_BRI_MAX:'Brightness Max',C_BRI_AUTO:'Brightness Auto',
  // Editing
  C_AC_CUT:'Cut',K_CUT:'Cut',C_AC_COPY:'Copy',K_COPY:'Copy',C_AC_PASTE:'Paste',K_PASTE:'Paste',
  C_AC_UNDO:'Undo',K_UNDO:'Undo',C_AC_REDO:'Redo',K_REDO:'Redo',K_AGAIN:'Again',
  C_AC_SELECT_ALL:'Select All',C_AC_FIND:'Find',
  // Applications
  C_AC_SEARCH:'Search',C_AL_CALCULATOR:'Calculator',C_AL_CALC:'Calculator',C_AC_BOOKMARKS:'Bookmarks',
  C_AL_MY_COMPUTER:'My Computer',C_AL_FILES:'File Manager',C_AL_TEXT_EDITOR:'Text Editor',C_AL_EMAIL:'Email Client',
  GLOBE:'Globe / Fn',C_AC_HOME:'Browser Home',C_AC_BACK:'Browser Back',C_AC_FORWARD:'Browser Forward',
  C_AC_REFRESH:'Refresh',C_AC_CLOSE:'Close',C_AC_EXIT:'Exit',
  C_AC_SCROLL_UP:'Scroll Up',C_AC_SCROLL_DOWN:'Scroll Down',
  C_AC_ZOOM_IN:'Zoom In',C_AC_ZOOM_OUT:'Zoom Out',
  // Misc
  PSCRN:'Print Screen',PRINTSCREEN:'Print Screen',PAUSE_BREAK:'Pause/Break',
  K_APP:'Application Key',K_CMENU:'Context Menu',K_CANCEL:'Cancel',K_POWER:'Power',K_SLEEP:'Sleep',
  // Power
  C_PWR:'Power',C_POWER:'Power',K_PWR:'Power',C_SLEEP:'Sleep',C_AL_LOCK:'Lock Screen',C_MENU:'Menu'
};
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
      var tip = kcDescs[kc] ? ' title="' + esc(kcDescs[kc]) + '"' : '';
      return '<button class="keycode-btn" data-kc="' + kc + '"' + tip + '>' + kc + '</button>';
    }).join('');
  });
}

// populateBehaviorDropdown() — Rebuilds the behavior picker popup
// with categorized sections for built-in behaviors, custom behaviors,
// and all macro types. Called whenever behaviors/macros change.
function populateBehaviorDropdown() {
  var container = document.getElementById('behpCategories');
  if (!container) return;

  // Define built-in behavior categories from ZMK_BEHAVIORS
  var builtinCats = [
    { title: 'Key Press', filter: function(b) { return ['&kp','&mt','&kt','&sk','&gresc','&caps_word','&key_repeat'].indexOf(b.name) >= 0; } },
    { title: 'Layer Navigation', filter: function(b) { return ['&mo','&lt','&to','&tog','&sl'].indexOf(b.name) >= 0; } },
    { title: 'Mouse', filter: function(b) { return ['&mkp','&mmv','&msc'].indexOf(b.name) >= 0; } },
    { title: 'Connectivity', filter: function(b) { return ['&bt','&out'].indexOf(b.name) >= 0; } },
    { title: 'Lighting', filter: function(b) { return ['&rgb_ug','&bl','&ext_power'].indexOf(b.name) >= 0; } },
    { title: 'System', filter: function(b) { return ['&soft_off','&sys_reset','&bootloader','&trans','&none','&studio_unlock'].indexOf(b.name) >= 0; } }
  ];

  var html = '';

  // Built-in ZMK behaviors — grouped by category
  builtinCats.forEach(function(cat) {
    var items = ZMK_BEHAVIORS.filter(cat.filter);
    if (!items.length) return;
    html += '<details class="behp-cat" open><summary>' + esc(cat.title) + '</summary><div class="behp-cat-grid">';
    items.forEach(function(b) {
      html += '<button class="behp-btn" data-behp="' + esc(b.name) + '" title="' + esc(b.desc || '') + '">' +
        '<span class="behp-name">' + esc(b.name) + '</span>' +
        '<span class="behp-label">' + esc(b.label) + '</span></button>';
    });
    html += '</div></details>';
  });

  // Custom behaviors from keymapBehaviors
  if (keymapBehaviors.length) {
    var presets = keymapBehaviors.filter(function(cb) { return cb._builtin; });
    var customs = keymapBehaviors.filter(function(cb) { return !cb._builtin; });

    if (presets.length) {
      html += '<details class="behp-cat"><summary>Built-in Presets (' + presets.length + ')</summary><div class="behp-cat-grid">';
      presets.forEach(function(cb) {
        var ref = '&' + cb.name;
        html += '<button class="behp-btn" data-behp="' + esc(ref) + '" title="' + esc(cb.type + (cb.label ? ' — ' + cb.label : '')) + '">' +
          '<span class="behp-name">' + esc(ref) + '</span>' +
          '<span class="behp-label">' + esc(cb.label || cb.type || 'preset') + '</span></button>';
      });
      html += '</div></details>';
    }

    if (customs.length) {
      html += '<details class="behp-cat"><summary>Custom Behaviors (' + customs.length + ')</summary><div class="behp-cat-grid">';
      customs.forEach(function(cb) {
        var ref = '&' + cb.name;
        html += '<button class="behp-btn" data-behp="' + esc(ref) + '" title="' + esc(cb.type + (cb.label ? ' — ' + cb.label : '')) + '">' +
          '<span class="behp-name">' + esc(ref) + '</span>' +
          '<span class="behp-label">' + esc(cb.label || cb.type || 'custom') + '</span></button>';
      });
      html += '</div></details>';
    }
  }

  // Keymap macros
  var addedMacros = {};
  if (keymapMacros.length) {
    html += '<details class="behp-cat"><summary>Keymap Macros (' + keymapMacros.length + ')</summary><div class="behp-cat-grid">';
    keymapMacros.forEach(function(m) {
      var ref = '&' + m.name;
      if (addedMacros[ref]) return;
      addedMacros[ref] = true;
      var pLabel = m.paramType === 1 ? '1-param' : m.paramType === 2 ? '2-param' : 'macro';
      var mTitle = m.label ? m.label + ' (' + pLabel + ')' : pLabel;
      var mDisp = m.label || pLabel;
      html += '<button class="behp-btn" data-behp="' + esc(ref) + '" title="' + esc(mTitle) + '">' +
        '<span class="behp-name">' + esc(ref) + '</span>' +
        '<span class="behp-label">' + esc(mDisp) + '</span></button>';
    });
    html += '</div></details>';
  }

  // Blink macros
  var blinkItems = blinkMacros.filter(function(bm) { return !addedMacros['&' + bm.name]; });
  if (blinkItems.length) {
    html += '<details class="behp-cat"><summary>Blink Macros (' + blinkItems.length + ')</summary><div class="behp-cat-grid">';
    blinkItems.forEach(function(bm) {
      var ref = '&' + bm.name;
      addedMacros[ref] = true;
      var bmTitle = bm.label ? bm.label + ' (blink)' : 'blink macro';
      var bmDisp = bm.label || 'blink';
      html += '<button class="behp-btn" data-behp="' + esc(ref) + '" title="' + esc(bmTitle) + '">' +
        '<span class="behp-name">' + esc(ref) + '</span>' +
        '<span class="behp-label">' + esc(bmDisp) + '</span></button>';
    });
    html += '</div></details>';
  }

  // RGB macros
  var rgbItems = macros.filter(function(m) { return !addedMacros['&' + m.name]; });
  if (rgbItems.length) {
    html += '<details class="behp-cat"><summary>RGB Macros (' + rgbItems.length + ')</summary><div class="behp-cat-grid">';
    rgbItems.forEach(function(m) {
      var ref = '&' + m.name;
      addedMacros[ref] = true;
      var rmTitle = m.label ? m.label + ' (RGB)' : 'RGB macro';
      var rmDisp = m.label || 'RGB';
      html += '<button class="behp-btn" data-behp="' + esc(ref) + '" title="' + esc(rmTitle) + '">' +
        '<span class="behp-name">' + esc(ref) + '</span>' +
        '<span class="behp-label">' + esc(rmDisp) + '</span></button>';
    });
    html += '</div></details>';
  }

  // Behaviors found in keymap bindings but not in any known list
  var knownBehaviors = {};
  ZMK_BEHAVIORS.forEach(function(b) { knownBehaviors[b.name] = true; });
  keymapBehaviors.forEach(function(cb) { knownBehaviors['&' + cb.name] = true; });
  Object.keys(addedMacros).forEach(function(k) { knownBehaviors[k] = true; });
  var fromKeymap = [];
  keymapLayers.forEach(function(l) {
    l.bindings.forEach(function(b) {
      var beh = b.split(/\s+/)[0];
      if (beh && !knownBehaviors[beh]) { knownBehaviors[beh] = true; fromKeymap.push(beh); }
    });
  });
  if (fromKeymap.length) {
    html += '<details class="behp-cat"><summary>From Keymap (' + fromKeymap.length + ')</summary><div class="behp-cat-grid">';
    fromKeymap.forEach(function(beh) {
      html += '<button class="behp-btn" data-behp="' + esc(beh) + '" title="found in keymap bindings">' +
        '<span class="behp-name">' + esc(beh) + '</span>' +
        '<span class="behp-label">keymap</span></button>';
    });
    html += '</div></details>';
  }

  container.innerHTML = html;
}

function openBehaviorPicker() {
  populateBehaviorDropdown();
  var overlay = document.getElementById('behaviorPickerOverlay');
  overlay.classList.add('visible');
  // Highlight current selection
  var current = document.getElementById('beBehavior').value;
  overlay.querySelectorAll('.behp-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.dataset.behp === current);
  });
  var searchInput = document.getElementById('behpSearchInput');
  searchInput.value = '';
  searchInput.focus();
}

function closeBehaviorPicker() {
  document.getElementById('behaviorPickerOverlay').classList.remove('visible');
}

function selectBehaviorPickerItem(behaviorName) {
  document.getElementById('beBehavior').value = behaviorName;
  // Update trigger button display text
  var behDef = ZMK_BEHAVIORS.find(function(b) { return b.name === behaviorName; });
  var displayText = behaviorName;
  if (behDef) {
    displayText = behaviorName + ' — ' + behDef.label;
  } else {
    // Check custom behaviors
    var cb = keymapBehaviors.find(function(c) { return '&' + c.name === behaviorName; });
    if (cb) displayText = behaviorName + (cb.label ? ' — ' + cb.label : ' (' + (cb.type || 'custom') + ')');
  }
  document.getElementById('beBehaviorText').textContent = displayText;
  document.getElementById('beBehaviorTrigger').title = behDef ? behDef.desc : (cb ? (cb.label || cb.type) : behaviorName);
  closeBehaviorPicker();
  updateBindingEditorFields(behaviorName, []);
}

// showBindingEditor(keyIdx) — Opens the binding editor panel for the
// key at position keyIdx. Pre-fills the behavior dropdown and parameters
// from the key's current binding. Called when you click a key on the SVG.
function showBindingEditor(keyIdx) {
  selectedKeyIndex = keyIdx;
  var editor = document.getElementById('bindingEditor');
  editor.classList.add('visible');
  document.getElementById('beKeyIndex').textContent = 'Key ' + keyIdx;

  var binding = keymapLayers[activeLayerIndex].bindings[keyIdx] || '';
  var parts = binding.trim().split(/\s+/);
  var behavior = parts[0] || '&kp';

  // Clear modifier checkboxes
  document.querySelectorAll('#beModCheckboxes input[type=checkbox]').forEach(function(cb) { cb.checked = false; });

  document.getElementById('beBehavior').value = behavior;
  // Update trigger button display
  var behDef = ZMK_BEHAVIORS.find(function(b) { return b.name === behavior; });
  var displayText = behavior;
  if (behDef) {
    displayText = behavior + ' \u2014 ' + behDef.label;
  } else {
    var cbDef = keymapBehaviors.find(function(c) { return '&' + c.name === behavior; });
    if (cbDef) displayText = behavior + (cbDef.label ? ' \u2014 ' + cbDef.label : ' (' + (cbDef.type || 'custom') + ')');
  }
  document.getElementById('beBehaviorText').textContent = displayText;
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

  // Show behavior description
  var descRow = document.getElementById('beDescRow');
  if (descRow) descRow.textContent = behDef && behDef.desc ? behDef.desc : '';

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
      var ttl = PARAM_DESCS[a] ? ' title="' + esc(PARAM_DESCS[a]) + '"' : '';
      bhtml += '<option value="' + a + '"' + sel + ttl + '>' + a + '</option>';
    });
    bhtml += '</select>';
    p1Container.innerHTML = bhtml;
  } else if (behavior === '&rgb_ug') {
    p1Label.textContent = 'Action';
    var rhtml = '<select id="beParam1">';
    RGB_ACTIONS.forEach(function(a) {
      var sel = params.join(' ') === a ? ' selected' : '';
      var ttl = PARAM_DESCS[a] ? ' title="' + esc(PARAM_DESCS[a]) + '"' : '';
      rhtml += '<option value="' + a + '"' + sel + ttl + '>' + a + '</option>';
    });
    rhtml += '</select>';
    p1Container.innerHTML = rhtml;
  } else if (behavior === '&out') {
    p1Label.textContent = 'Action';
    var ohtml = '<select id="beParam1">';
    OUT_ACTIONS.forEach(function(a) {
      var sel = params.join(' ') === a ? ' selected' : '';
      var ttl = PARAM_DESCS[a] ? ' title="' + esc(PARAM_DESCS[a]) + '"' : '';
      ohtml += '<option value="' + a + '"' + sel + ttl + '>' + a + '</option>';
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
      var ttl = PARAM_DESCS[a] ? ' title="' + esc(PARAM_DESCS[a]) + '"' : '';
      blhtml += '<option value="' + a + '"' + sel + ttl + '>' + a + '</option>';
    });
    blhtml += '</select>';
    p1Container.innerHTML = blhtml;
  } else if (behavior === '&ext_power') {
    p1Label.textContent = 'Action';
    var ephtml = '<select id="beParam1">';
    EP_ACTIONS.forEach(function(a) {
      var sel = params.join(' ') === a ? ' selected' : '';
      var ttl = PARAM_DESCS[a] ? ' title="' + esc(PARAM_DESCS[a]) + '"' : '';
      ephtml += '<option value="' + a + '"' + sel + ttl + '>' + a + '</option>';
    });
    ephtml += '</select>';
    p1Container.innerHTML = ephtml;
  } else if (behavior === '&mkp') {
    p1Label.textContent = 'Button';
    var mkhtml = '<select id="beParam1">';
    MOUSE_BUTTONS.forEach(function(a) {
      var sel = params.join(' ') === a ? ' selected' : '';
      var ttl = PARAM_DESCS[a] ? ' title="' + esc(PARAM_DESCS[a]) + '"' : '';
      mkhtml += '<option value="' + a + '"' + sel + ttl + '>' + a + '</option>';
    });
    mkhtml += '</select>';
    p1Container.innerHTML = mkhtml;
  } else if (behavior === '&mmv') {
    p1Label.textContent = 'Direction';
    var mvhtml = '<select id="beParam1">';
    MOUSE_MOVES.forEach(function(a) {
      var sel = params.join(' ') === a ? ' selected' : '';
      var ttl = PARAM_DESCS[a] ? ' title="' + esc(PARAM_DESCS[a]) + '"' : '';
      mvhtml += '<option value="' + a + '"' + sel + ttl + '>' + a + '</option>';
    });
    mvhtml += '</select>';
    p1Container.innerHTML = mvhtml;
  } else if (behavior === '&msc') {
    p1Label.textContent = 'Direction';
    var mshtml = '<select id="beParam1">';
    MOUSE_SCROLLS.forEach(function(a) {
      var sel = params.join(' ') === a ? ' selected' : '';
      var ttl = PARAM_DESCS[a] ? ' title="' + esc(PARAM_DESCS[a]) + '"' : '';
      mshtml += '<option value="' + a + '"' + sel + ttl + '>' + a + '</option>';
    });
    mshtml += '</select>';
    p1Container.innerHTML = mshtml;
  } else if (behavior === '&kt') {
    p1Label.textContent = 'Keycode';
    p1Container.innerHTML = '<input type=\"text\" id=\"beParam1\" value=\"' + esc(params.join(' ')) + '\" style=\"width:160px;\">';
    kcSection.style.display = '';
    modSection.style.display = '';
  } else {
    // Smart custom behavior / macro param handling
    var customBeh = keymapBehaviors.find(function(c) { return '&' + c.name === behavior; });
    var customMacro = keymapMacros.find(function(m) { return '&' + m.name === behavior; });

    if (customBeh && (customBeh.type === 'hold-tap' || customBeh.type === 'layer-tap')) {
      // Hold-tap or layer-tap: figure out param types from config
      var holdBind = customBeh.config && customBeh.config.holdBinding ? customBeh.config.holdBinding : '';
      var tapBind = customBeh.config && customBeh.config.tapBinding ? customBeh.config.tapBinding : '';
      var isLayerHold = (holdBind === '&mo' || holdBind === '&to' || holdBind === '&tog' || holdBind === '&sl' || customBeh.type === 'layer-tap');
      var isKpHold = (holdBind === '&kp');
      var isMacroHold = (!isLayerHold && !isKpHold && holdBind);

      if (isMacroHold) {
        // Macro-hold: param 1 is always 0 (auto-filled), only show tap keycode
        p1Label.textContent = 'Tap Keycode';
        p1Container.innerHTML = '<input type="text" id="beParam1" value="' + esc(params[1] || '') + '" style="width:160px;" placeholder="e.g. SPACE">';
        p1Row.style.display = '';
        p2Row.style.display = 'none';
        kcSection.style.display = '';
        modSection.style.display = '';
        if (descRow) descRow.textContent = (customBeh.label || customBeh.type) + ' (hold: macro, tap: &kp) — first param auto-set to 0';
      } else if (isLayerHold) {
        // Param 1: Layer dropdown
        p1Label.textContent = 'Layer';
        var lhtml = '<select id="beParam1">';
        keymapLayers.forEach(function(l, i) {
          if (l.status === 'reserved') return;
          var sel = String(i) === String(params[0]) ? ' selected' : '';
          lhtml += '<option value="' + i + '"' + sel + '>' + i + ' - ' + esc(l.displayName || l.name) + '</option>';
        });
        lhtml += '</select>';
        p1Container.innerHTML = lhtml;
        // Param 2: Keycode with picker
        p2Label.textContent = 'Tap Keycode';
        p2Container.innerHTML = '<input type="text" id="beParam2" value="' + esc(params.slice(1).join(' ')) + '" style="width:160px;">';
        p1Row.style.display = '';
        p2Row.style.display = '';
        kcSection.style.display = '';
        modSection.style.display = '';
        if (descRow) descRow.textContent = customBeh.label ? customBeh.type + ' — ' + customBeh.label : customBeh.type;
      } else {
        // Standard hold-tap with two keycodes (e.g. &hm)
        p1Label.textContent = 'Hold Param';
        p1Container.innerHTML = '<input type="text" id="beParam1" value="' + esc(params[0] || '') + '" style="width:160px;">';
        p2Label.textContent = 'Tap Keycode';
        p2Container.innerHTML = '<input type="text" id="beParam2" value="' + esc(params.slice(1).join(' ')) + '" style="width:160px;">';
        p1Row.style.display = '';
        p2Row.style.display = '';
        kcSection.style.display = '';
        modSection.style.display = '';
        if (descRow) descRow.textContent = customBeh.label ? customBeh.type + ' — ' + customBeh.label : customBeh.type;
      }
    } else if (customMacro) {
      // Macro: show params based on paramType
      if (descRow) descRow.textContent = 'Macro' + (customMacro.label ? ' — ' + customMacro.label : '');
      if (customMacro.paramType === 0 || !customMacro.paramType) {
        p1Row.style.display = 'none';
        p2Row.style.display = 'none';
      } else if (customMacro.paramType === 1) {
        p1Label.textContent = 'Param';
        p1Container.innerHTML = '<input type="text" id="beParam1" value="' + esc(params[0] || '') + '" style="width:160px;">';
        p1Row.style.display = '';
        p2Row.style.display = 'none';
        kcSection.style.display = '';
      } else {
        p1Label.textContent = 'Param 1';
        p1Container.innerHTML = '<input type="text" id="beParam1" value="' + esc(params[0] || '') + '" style="width:160px;">';
        p2Label.textContent = 'Param 2';
        p2Container.innerHTML = '<input type="text" id="beParam2" value="' + esc(params.slice(1).join(' ')) + '" style="width:160px;">';
        p1Row.style.display = '';
        p2Row.style.display = '';
        kcSection.style.display = '';
      }
    } else {
      // Fully unknown — raw param input
      p1Label.textContent = 'Params';
      p1Container.innerHTML = '<input type="text" id="beParam1" value="' + esc(params.join(' ')) + '" style="width:200px;">';
      p1Row.style.display = '';
      p2Row.style.display = 'none';
    }
  }
}

// applyBinding() — Reads the current binding editor values (behavior,
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
    // Macro-hold custom HTs: auto-prefix 0 before the tap keycode
    var customBehApply = keymapBehaviors.find(function(c) { return '&' + c.name === behavior; });
    if (customBehApply && (customBehApply.type === 'hold-tap' || customBehApply.type === 'layer-tap')) {
      var applyHoldBind = customBehApply.config && customBehApply.config.holdBinding ? customBehApply.config.holdBinding : '';
      var applyIsLayer = (applyHoldBind === '&mo' || applyHoldBind === '&to' || applyHoldBind === '&tog' || applyHoldBind === '&sl' || customBehApply.type === 'layer-tap');
      var applyIsKp = (applyHoldBind === '&kp');
      if (!applyIsLayer && !applyIsKp && applyHoldBind) {
        // Macro-hold: wrap modifiers on tap keycode, prepend 0
        p1Val = wrapWithModifiers(p1Val);
        binding += ' 0 ' + p1Val;
        // Skip p2 handling since we only have one param
        keymapLayers[activeLayerIndex].bindings[selectedKeyIndex] = binding;
        renderKeyboardSvg('keyboardSvg');
        updateKeymapOutput();
        return;
      }
    }
    binding += ' ' + p1Val;
  }
  if (p2El && p2El.value) {
    var p2Val = p2El.value;
    // Apply modifier wrapping for keycode param in &lt, &mt, or custom hold-tap
    var customBeh = keymapBehaviors.find(function(c) { return '&' + c.name === behavior; });
    if (behavior === '&lt' || behavior === '&mt' ||
        (customBeh && (customBeh.type === 'hold-tap' || customBeh.type === 'layer-tap'))) {
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
// Clicking "Edit" opens the combo editor panel (line 5643+).
// More on this code can be found in 'RefDoc' line 541
// ================================================================
// renderComboMiniKb() — Draws a small keyboard inside the combo editor
// panel. Clicking keys toggles their selection as combo positions.
function renderComboMiniKb() {
  var container = document.getElementById('comboMiniKb');
  if (!keyboardLayout) { container.innerHTML = ''; return; }
  container.innerHTML = '<svg class="keyboard-svg combo-mini-kb-svg" id="comboMiniSvg"></svg>';
  renderKeyboardSvg('comboMiniSvg', { scale: 36, keySize: 33, comboMode: true, comboPositions: comboSelectedPositions });
}

var behPositionalSelectedPositions = [];
function renderBehPositionalMiniKb() {
  var container = document.getElementById('behPositionalMiniKb');
  if (!container || !keyboardLayout) return;
  container.innerHTML = '<svg class="keyboard-svg combo-mini-kb-svg" id="behPosMiniSvg"></svg>';
  renderKeyboardSvg('behPosMiniSvg', { scale: 36, keySize: 33, comboMode: true, comboPositions: behPositionalSelectedPositions });
  var posInput = document.getElementById('kmBehHoldTriggerPositions');
  if (posInput) posInput.value = behPositionalSelectedPositions.slice().sort(function(a,b){return a-b;}).join(' ');
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

// renderKeymapComboList() — Shows all combos in a list with name, binding,
// and key positions. Each combo has Edit/Delete buttons.
function renderKeymapComboList() {
  var list = document.getElementById('kmComboList');
  list.innerHTML = '';
  keymapCombos.forEach(function(c, i) {
    if (c._fromRgb || c._fromDtsi) return;
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
// More on this code can be found in 'RefDoc' line 541
// ================================================================
// renderKeymapMacroList() — Shows all macros in a list with name, label,
// and step count. Each macro has Edit/Delete buttons.
function renderKeymapMacroList() {
  var list = document.getElementById('kmMacroList');
  list.innerHTML = '';
  keymapMacros.forEach(function(m, i) {
    if (m._fromRgb || m._fromDtsi) return;
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
  { value: 'binding', label: 'Binding', desc: 'Any ZMK binding (&kp, &mo, &to, macros, etc.)', hasBinding: true },
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
  { value: 'custom', label: 'Custom / Raw', desc: 'Enter a raw binding string', hasRaw: true }
];

function classifyMacroStep(stepStr) {
  stepStr = stepStr.trim();
  if (stepStr === '&macro_tap') return { type: 'macro_tap' };
  if (stepStr === '&macro_press') return { type: 'macro_press' };
  if (stepStr === '&macro_release') return { type: 'macro_release' };
  if (stepStr === '&macro_pause_for_release') return { type: 'macro_pause' };
  if (stepStr.startsWith('&macro_wait_time')) return { type: 'wait_time', time: stepStr.replace('&macro_wait_time', '').trim() || '100' };
  if (stepStr.startsWith('&macro_tap_time')) return { type: 'tap_time', time: stepStr.replace('&macro_tap_time', '').trim() || '100' };
  if (stepStr === '&macro_param_1to1') return { type: 'param_1to1' };
  if (stepStr === '&macro_param_1to2') return { type: 'param_1to2' };
  if (stepStr === '&macro_param_2to1') return { type: 'param_2to1' };
  if (stepStr === '&macro_param_2to2') return { type: 'param_2to2' };
  // Any &behavior binding (including &kp, &mo, &to, &lt, custom macros, etc.)
  if (stepStr.startsWith('&')) {
    var parts = stepStr.split(/\s+/);
    return { type: 'binding', behavior: parts[0], params: parts.slice(1).join(' ') };
  }
  return { type: 'custom', raw: stepStr };
}

function macroStepToString(type, opts) {
  opts = opts || {};
  var def = MACRO_STEP_TYPES.find(function(s) { return s.value === type; });
  if (!def) return opts.raw || '';
  if (def.ctrl && def.hasTime) return def.ctrl + ' ' + (opts.time || '100');
  if (def.ctrl) return def.ctrl;
  if (def.hasBinding) return (opts.behavior || '&kp') + (opts.params ? ' ' + opts.params : '');
  if (def.hasRaw) return opts.raw || '';
  return '';
}

// Helper: read param controls for a binding step and save to the macro
function updateMacroBindingStep(stepIdx) {
  if (editingMacroIndex < 0) return;
  var behBtn = document.querySelector('[data-step-beh-trigger="' + stepIdx + '"]');
  var beh = behBtn ? behBtn.dataset.currentBeh : '&kp';
  var p1 = document.querySelector('[data-step-param1="' + stepIdx + '"]');
  var p2 = document.querySelector('[data-step-param2="' + stepIdx + '"]');
  var pGeneric = document.querySelector('[data-step-params="' + stepIdx + '"]');
  var params = '';
  if (p1 && p2) params = (p1.value || '') + (p2.value ? ' ' + p2.value : '');
  else if (p1) params = p1.value || '';
  else if (pGeneric) params = pGeneric.value || '';
  keymapMacros[editingMacroIndex].steps[stepIdx] = macroStepToString('binding', { behavior: beh, params: params });
}

// Macro step type popup management
function openMacroStepTypePicker(stepIdx, anchorEl) {
  closeMacroStepTypePicker();
  var currentType = anchorEl.dataset.currentType || 'binding';
  var popup = document.createElement('div');
  popup.className = 'mst-popup';
  popup.id = 'macroStepTypePopup';

  // Position near anchor, ensure it fits within viewport
  var rect = anchorEl.getBoundingClientRect();
  popup.style.left = Math.min(rect.left, window.innerWidth - 440) + 'px';
  var popTop = Math.min(rect.bottom + 4, window.innerHeight - 400);
  popup.style.top = popTop + 'px';
  popup.style.maxHeight = Math.max(200, window.innerHeight - popTop - 10) + 'px';

  var html = '<div class="mst-popup-header"><h4>Select Step Type</h4><button class="mst-popup-close" id="mstCloseBtn">&times;</button></div>';
  html += '<div class="mst-popup-body">';
  MACRO_STEP_TYPES.forEach(function(st) {
    var cls = st.value === currentType ? ' active' : '';
    html += '<div class="mst-item' + cls + '" data-mst-value="' + st.value + '">';
    html += '<span class="mst-name">' + esc(st.label) + '</span>';
    html += '<span class="mst-desc">' + esc(st.desc) + '</span>';
    html += '</div>';
  });
  html += '</div>';
  popup.innerHTML = html;
  document.body.appendChild(popup);

  // Click handler for selecting a step type
  popup.querySelector('.mst-popup-body').onclick = function(e) {
    var item = e.target.closest('[data-mst-value]');
    if (!item || editingMacroIndex < 0) return;
    var newType = item.dataset.mstValue;
    var newStep = macroStepToString(newType, { behavior: '&kp', params: 'A', time: '100', raw: '' });
    keymapMacros[editingMacroIndex].steps[stepIdx] = newStep;
    closeMacroStepTypePicker();
    renderMacroSteps();
  };

  popup.querySelector('#mstCloseBtn').onclick = function() { closeMacroStepTypePicker(); };

  // Close on outside click
  setTimeout(function() {
    document.addEventListener('mousedown', function closeMst(e) {
      var p = document.getElementById('macroStepTypePopup');
      if (!p || !p.contains(e.target)) {
        closeMacroStepTypePicker();
        document.removeEventListener('mousedown', closeMst);
      }
    });
  }, 10);
}

function closeMacroStepTypePicker() {
  var p = document.getElementById('macroStepTypePopup');
  if (p) p.remove();
}

// Open binding picker for a macro step's behavior selection
function openMacroStepBehPicker(stepIdx) {
  openBindingPicker(null);
  bpCallback = function(value) {
    if (editingMacroIndex < 0) return;
    // value is a full binding string like "&kp A", "&mo 1", "&none" etc.
    keymapMacros[editingMacroIndex].steps[stepIdx] = value;
    renderMacroSteps();
  };
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

    // Step type trigger button (opens popup picker)
    var typeDef = MACRO_STEP_TYPES.find(function(s) { return s.value === classified.type; });
    html += '<button class="ms-type-trigger" data-step-type-trigger="' + i + '" data-current-type="' + esc(classified.type) + '" title="' + esc(typeDef ? typeDef.desc : '') + '">';
    html += '<span class="ms-type-label">' + esc(typeDef ? typeDef.label : classified.type) + '</span>';
    html += '<span class="ms-type-desc"> \u2014 ' + esc(typeDef ? typeDef.desc : '') + '</span>';
    html += '</button>';

    // Sub-fields based on type
    html += '<span class="step-fields">';
    var def = MACRO_STEP_TYPES.find(function(s) { return s.value === classified.type; });

    if (def && def.hasBinding) {
      var beh = classified.behavior || '&kp';
      var par = classified.params || '';

      // Behavior trigger button (opens binding picker popup)
      var behLabel = beh;
      var behZmk = ZMK_BEHAVIORS.find(function(b) { return b.name === beh; });
      if (behZmk) behLabel = beh + ' \u2014 ' + behZmk.label;
      else {
        var behCb = keymapBehaviors.find(function(cb) { return '&' + cb.name === beh; });
        if (behCb) behLabel = beh + ' (custom ' + (behCb.type || '') + ')';
        else {
          var behMacro = keymapMacros.find(function(m, mi) { return '&' + m.name === beh && mi !== editingMacroIndex; });
          if (behMacro) behLabel = beh + ' (macro)';
        }
      }
      html += '<button class="ms-beh-trigger" data-step-beh-trigger="' + i + '" data-current-beh="' + esc(beh) + '" title="Click to pick behavior">' + esc(behLabel) + '</button>';

      // Context-aware parameter controls based on behavior
      var behDef = ZMK_BEHAVIORS.find(function(b) { return b.name === beh; });
      var paramTypes = behDef ? behDef.params : null;

      if (paramTypes && paramTypes.length === 0) {
        // No params needed (e.g. &none, &trans, &gresc)
      } else if (paramTypes && paramTypes.length === 1) {
        // Single parameter
        html += renderParamControl(i, 1, paramTypes[0], par, beh);
      } else if (paramTypes && paramTypes.length === 2) {
        // Two parameters — split by first space
        var spIdx = par.indexOf(' ');
        var p1val = spIdx >= 0 ? par.substring(0, spIdx) : par;
        var p2val = spIdx >= 0 ? par.substring(spIdx + 1) : '';
        html += renderParamControl(i, 1, paramTypes[0], p1val, beh);
        html += renderParamControl(i, 2, paramTypes[1], p2val, beh);
      } else {
        // Unknown behavior (custom behaviors, macros) — generic text + search
        html += '<input type="text" data-step-params="' + i + '" value="' + esc(par) + '" placeholder="params" style="width:120px;">';
        html += '<button class="btn-sm" data-step-pick="' + i + '" title="Search keycodes" style="padding:2px 6px;font-size:0.85em;">&#x1F50D;</button>';
      }
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

    if (def && def.hasBinding && currentMode !== 'tap') {
      html += '<span class="step-desc">(mode: ' + currentMode + ')</span>';
    }

    html += '<button class="btn-danger btn-sm" data-remove-step="' + i + '" style="margin-left:auto;">&#10005;</button>';

    div.innerHTML = html;
    container.appendChild(div);
  });
}

// Render a single parameter control based on its type
function renderParamControl(stepIdx, paramNum, paramType, value, behavior) {
  var attr = 'data-step-param' + paramNum;
  var pickAttr = 'data-step-pick' + paramNum;

  // Keycode or modifier: text input + search button
  if (paramType === 'keycode' || paramType === 'modifier') {
    return '<input type="text" ' + attr + '="' + stepIdx + '" value="' + esc(value) + '" placeholder="' + paramType + '" style="width:100px;">' +
           '<button class="btn-sm" ' + pickAttr + '="' + stepIdx + '" title="Search keycodes" style="padding:2px 6px;font-size:0.85em;">&#x1F50D;</button>';
  }

  // Layer: dropdown of parsed layers
  if (paramType === 'layer') {
    var h = '<select ' + attr + '="' + stepIdx + '" style="min-width:80px;">';
    var foundLayer = false;
    keymapLayers.forEach(function(l, li) {
      var sel = String(li) === String(value) ? ' selected' : '';
      if (sel) foundLayer = true;
      h += '<option value="' + li + '"' + sel + '>' + li + ': ' + esc(l.displayName || l.name) + '</option>';
    });
    if (!foundLayer && value !== '') h += '<option value="' + esc(value) + '" selected>' + esc(value) + '</option>';
    h += '</select>';
    return h;
  }

  // Direction: depends on behavior (&mmv = moves, &msc = scrolls)
  if (paramType === 'direction') {
    var dirs = (behavior === '&msc') ? MOUSE_SCROLLS : MOUSE_MOVES;
    var h = '<select ' + attr + '="' + stepIdx + '" style="min-width:100px;">';
    var foundDir = false;
    dirs.forEach(function(d) {
      var sel = d === value ? ' selected' : '';
      if (sel) foundDir = true;
      var ttl = PARAM_DESCS[d] ? ' title="' + esc(PARAM_DESCS[d]) + '"' : '';
      h += '<option value="' + esc(d) + '"' + sel + ttl + '>' + esc(d) + '</option>';
    });
    if (!foundDir && value) h += '<option value="' + esc(value) + '" selected>' + esc(value) + '</option>';
    h += '</select>';
    return h;
  }

  // Enum params: bt_action, out_action, rgb_action, bl_action, ep_action, button
  var enumMap = {
    bt_action: BT_ACTIONS, out_action: OUT_ACTIONS, rgb_action: RGB_ACTIONS,
    bl_action: BL_ACTIONS, ep_action: EP_ACTIONS, button: MOUSE_BUTTONS
  };
  if (enumMap[paramType]) {
    var vals = enumMap[paramType];
    var h = '<select ' + attr + '="' + stepIdx + '" style="min-width:100px;">';
    var foundVal = false;
    vals.forEach(function(v) {
      var sel = v === value ? ' selected' : '';
      if (sel) foundVal = true;
      var ttl = PARAM_DESCS[v] ? ' title="' + esc(PARAM_DESCS[v]) + '"' : '';
      h += '<option value="' + esc(v) + '"' + sel + ttl + '>' + esc(v) + '</option>';
    });
    if (!foundVal && value) h += '<option value="' + esc(value) + '" selected>' + esc(value) + '</option>';
    h += '</select>';
    return h;
  }

  // Fallback: generic text input
  return '<input type="text" ' + attr + '="' + stepIdx + '" value="' + esc(value) + '" placeholder="' + paramType + '" style="width:100px;">';
}

// Macro step keycode search popup
var macroKcPopupStepIdx = -1;
var macroKcPopupTargetAttr = 'data-step-params';
function openMacroKcSearch(stepIdx, anchorEl, targetAttr) {
  macroKcPopupStepIdx = stepIdx;
  macroKcPopupTargetAttr = targetAttr || 'data-step-params';
  var existing = document.getElementById('macroKcPopup');
  if (existing) existing.remove();

  var popup = document.createElement('div');
  popup.id = 'macroKcPopup';
  popup.style.cssText = 'position:fixed;z-index:10000;background:var(--panel-bg,#1e1e2e);border:1px solid var(--border,#555);border-radius:8px;box-shadow:0 8px 32px rgba(0,0,0,0.5);padding:10px;width:320px;max-height:400px;display:flex;flex-direction:column;';

  // Position near anchor
  var rect = anchorEl.getBoundingClientRect();
  popup.style.left = Math.min(rect.left, window.innerWidth - 340) + 'px';
  popup.style.top = Math.min(rect.bottom + 4, window.innerHeight - 420) + 'px';

  // Search input
  var searchRow = document.createElement('div');
  searchRow.style.cssText = 'display:flex;gap:6px;margin-bottom:8px;align-items:center;';
  searchRow.innerHTML = '<span style="font-size:1.1em;">&#x1F50D;</span><input type="text" id="macroKcSearchInput" placeholder="Search keycodes..." style="flex:1;padding:4px 8px;background:var(--input-bg,#2a2a3e);color:var(--text,#e0e0e0);border:1px solid var(--border,#555);border-radius:4px;">' +
    '<button id="macroKcCloseBtn" style="background:none;border:none;color:var(--muted,#888);cursor:pointer;font-size:1.2em;">&times;</button>';
  popup.appendChild(searchRow);

  // Modifier checkboxes
  var modRow = document.createElement('div');
  modRow.style.cssText = 'display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px;font-size:0.8em;';
  var mods = ['LSHFT','LALT','LCTRL','LGUI','RSHFT','RALT','RCTRL','RGUI'];
  mods.forEach(function(mod) {
    modRow.innerHTML += '<label style="display:flex;align-items:center;gap:2px;cursor:pointer;"><input type="checkbox" data-macro-mod="' + mod + '"> ' + mod + '</label>';
  });
  popup.appendChild(modRow);

  // Results list
  var list = document.createElement('div');
  list.id = 'macroKcResults';
  list.style.cssText = 'overflow-y:auto;flex:1;min-height:100px;';
  popup.appendChild(list);

  document.body.appendChild(popup);

  // Build all keycodes
  var allKc = [];
  Object.keys(ZMK_KEYCODES).forEach(function(cat) {
    ZMK_KEYCODES[cat].forEach(function(kc) {
      allKc.push({ code: kc, cat: cat });
    });
  });

  function renderResults(filter) {
    var f = (filter || '').toUpperCase();
    var html = '';
    var count = 0;
    allKc.forEach(function(item) {
      if (f && item.code.indexOf(f) < 0 && item.cat.toUpperCase().indexOf(f) < 0) return;
      if (count >= 200) return;
      count++;
      html += '<div class="macro-kc-item" data-kc="' + item.code + '" style="padding:3px 8px;cursor:pointer;border-bottom:1px solid var(--border,#333);display:flex;justify-content:space-between;">';
      html += '<b>' + item.code + '</b><span style="color:var(--muted,#888);font-size:0.85em;">' + item.cat + '</span></div>';
    });
    if (!count) html = '<div style="padding:8px;color:var(--muted);">No matches</div>';
    list.innerHTML = html;
  }

  renderResults('');

  var searchInput = document.getElementById('macroKcSearchInput');
  searchInput.focus();
  searchInput.oninput = function() { renderResults(searchInput.value); };

  // Click on keycode to apply
  list.onclick = function(e) {
    var item = e.target.closest('[data-kc]');
    if (!item || editingMacroIndex < 0 || macroKcPopupStepIdx < 0) return;
    var kc = item.dataset.kc;
    // Wrap with selected modifiers
    var selectedMods = [];
    popup.querySelectorAll('[data-macro-mod]').forEach(function(cb) {
      if (cb.checked) selectedMods.push(cb.dataset.macroMod);
    });
    var paramStr = kc;
    // Nest modifiers: LS(LA(key)) etc.
    selectedMods.reverse().forEach(function(mod) {
      var modMap = { LSHFT: 'LS', LALT: 'LA', LCTRL: 'LC', LGUI: 'LG', RSHFT: 'RS', RALT: 'RA', RCTRL: 'RC', RGUI: 'RG' };
      paramStr = (modMap[mod] || mod) + '(' + paramStr + ')';
    });

    // Update the param input for this step
    var paramInput = document.querySelector('[' + macroKcPopupTargetAttr + '="' + macroKcPopupStepIdx + '"]');
    if (paramInput) {
      paramInput.value = paramStr;
      paramInput.dispatchEvent(new Event('input', { bubbles: true }));
      paramInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
    popup.remove();
  };

  // Close button
  document.getElementById('macroKcCloseBtn').onclick = function() { popup.remove(); };

  // Close on outside click
  setTimeout(function() {
    document.addEventListener('mousedown', function closeMacroKc(e) {
      if (!popup.contains(e.target)) { popup.remove(); document.removeEventListener('mousedown', closeMacroKc); }
    });
  }, 10);
}

// ================================================================
// SECTION: BEHAVIOR SYSTEM
// Custom behaviors (hold-tap, sticky-key, tap-dance, etc.) are
// user-defined in the devicetree. renderKeymapBehaviorList() shows
// all of them. showBehaviorConfig() opens the config panel where
// you set timing, flavor, and other options for each behavior type.
// More on this code can be found in 'RefDoc' line 541
// ================================================================
// renderKeymapBehaviorList() — Shows all custom behaviors in a list with
// type (hold-tap, sticky-key, etc.), name, and Edit/Delete buttons.
function renderKeymapBehaviorList() {
  var list = document.getElementById('kmBehaviorList');
  list.innerHTML = '';
  keymapBehaviors.forEach(function(b, i) {
    if (b._builtin || b._fromRgb) return;
    var div = document.createElement('div');
    div.className = 'item';
    var badge = b._fromDtsi ? '<span style="color:#e8a;font-size:0.72em;margin:0 4px;opacity:0.8;" title="Parsed from .dtsi — edit to include in .keymap output">dtsi</span>' : '';
    div.innerHTML =
      '<b>' + esc(b.name) + '</b>' +
      '<span style="color:var(--muted);">' + esc(b.type) + '</span>' +
      badge +
      (b.label ? '<span style="color:#9cc;font-size:0.82em;margin:0 4px;" title="Label">&quot;' + esc(b.label) + '&quot;</span>' : '') +
      '<button class="btn-sm" data-edit-behavior="' + i + '">Edit</button>' +
      '<button class="btn-danger btn-sm" data-remove-behavior="' + i + '">&#10005;</button>';
    list.appendChild(div);
  });
}

// renderBuiltinBehaviorToggles() — Renders the checkbox toggles for
// preset ZMK behaviors. When toggled ON, the behavior is added to
// keymapBehaviors with _builtin flag. When OFF, it's removed.
function renderBuiltinBehaviorToggles() {
  var container = document.getElementById('builtinBehaviorToggles');
  if (!container) return;
  container.innerHTML = '';
  BUILTIN_BEHAVIORS.forEach(function(preset) {
    var isOn = keymapBehaviors.some(function(b) { return b._builtin === preset.id; });
    var div = document.createElement('div');
    div.className = 'builtin-beh' + (isOn ? ' bb-on' : '');
    div.innerHTML =
      '<label><input type="checkbox" data-builtin-id="' + preset.id + '"' + (isOn ? ' checked' : '') + '>' +
      '<span class="bb-name">&' + esc(preset.name) + '</span>' +
      '<span class="bb-type">' + esc(preset.type) + '</span></label>' +
      '<span class="bb-desc">' + preset.desc + '</span>';
    container.appendChild(div);
  });
}

function toggleBuiltinBehavior(presetId, enable) {
  var preset = null;
  BUILTIN_BEHAVIORS.forEach(function(p) { if (p.id === presetId) preset = p; });
  if (!preset) return;
  pushUndo();
  if (enable) {
    // Check if already exists as builtin
    var exists = keymapBehaviors.some(function(b) { return b._builtin === preset.id; });
    if (!exists) {
      // Remove any parsed behavior with same name first (avoid duplicates)
      keymapBehaviors = keymapBehaviors.filter(function(b) { return b.name !== preset.name; });
      var cfg = {};
      for (var k in preset.config) cfg[k] = preset.config[k];
      keymapBehaviors.push({
        name: preset.name, type: preset.type, label: preset.label,
        config: cfg, _builtin: preset.id, _fromEditor: true
      });
    }
  } else {
    keymapBehaviors = keymapBehaviors.filter(function(b) { return b._builtin !== preset.id; });
  }
  renderBuiltinBehaviorToggles();
  renderKeymapBehaviorList();
  populateBehaviorDropdown();
  updateKeymapOutput();
}

// --- Keymap Combo Layer Picker (tag chips) ---
function kmComboLayerOptionsHTML() {
  return keymapLayers.map(function(l, i) {
    return '<option value="' + i + '">' + esc(l.name || 'Layer ' + i) + ' (' + i + ')</option>';
  }).join('');
}
function kmComboRenderLayerTags(layersStr) {
  var tagsEl = document.getElementById('kmComboLayerTags');
  var parts = (layersStr || '').trim() ? layersStr.trim().split(/\s+/) : [];
  tagsEl.innerHTML = parts.map(function(p) {
    return '<span class="layer-tag">' + esc(p) + '<span class="tag-x" data-layer="' + esc(p) + '">&times;</span></span>';
  }).join('');
}
function kmComboGetLayers() {
  var tags = document.getElementById('kmComboLayerTags').querySelectorAll('.layer-tag');
  var parts = [];
  tags.forEach(function(t) {
    var txt = t.childNodes[0].textContent.trim();
    if (txt) parts.push(txt);
  });
  return parts.join(' ');
}

// --- Binding picker popup system (replaces select dropdowns) ---
var bpTargetId = null;
var bpTargetType = null;
var bpKeycodePrefix = '';
var bpCallback = null; // optional callback for non-target-id usage (tap-dance slots, macro steps)

// Action lists for param behaviors
var BP_ACTION_MAP = {
  '&bt': { title: 'Bluetooth Action', list: function() { return BT_ACTIONS; } },
  '&rgb_ug': { title: 'RGB Action', list: function() { return RGB_ACTIONS; } },
  '&out': { title: 'Output Selection', list: function() { return OUT_ACTIONS; } },
  '&bl': { title: 'Backlight', list: function() { return BL_ACTIONS; } },
  '&ext_power': { title: 'External Power', list: function() { return EP_ACTIONS; } },
  '&mkp': { title: 'Mouse Button', list: function() { return MOUSE_BUTTONS; } },
  '&mmv': { title: 'Mouse Move', list: function() { return MOUSE_MOVES; } },
  '&msc': { title: 'Mouse Scroll', list: function() { return MOUSE_SCROLLS; } }
};
var BP_KC_BEHAVIORS = ['&kp', '&kt', '&sk'];

function openBindingPicker(targetId, optType) {
  bpTargetId = targetId;
  bpTargetType = optType || 'binding';
  bpKeycodePrefix = '';
  bpCallback = null;
  var overlay = document.getElementById('bindingPickerOverlay');
  document.getElementById('bpTitle').textContent = bpTargetType === 'mods' ? 'Select Modifier' : 'Select Binding';
  renderBindingPickerSections();
  document.getElementById('bpSubPanel').style.display = 'none';
  document.getElementById('bpSections').style.display = '';
  document.getElementById('bpSearchWrap').style.display = '';
  document.getElementById('bpRawRow').style.display = '';
  document.getElementById('bpRawInput').value = '';
  var bpSrch = document.getElementById('bpSearchInput');
  bpSrch.value = '';
  document.getElementById('bpSearchClear').style.display = 'none';
  overlay.classList.add('visible');
  bpSrch.focus();
}

function closeBindingPicker() {
  document.getElementById('bindingPickerOverlay').classList.remove('visible');
  bpTargetId = null;
  bpCallback = null;
}

function selectBindingPickerValue(val) {
  if (bpCallback) {
    bpCallback(val);
    closeBindingPicker();
    return;
  }
  if (!bpTargetId) return;
  var hidden = document.getElementById(bpTargetId + '_val');
  var trigger = document.getElementById(bpTargetId);
  if (hidden) hidden.value = val;
  if (trigger) {
    var textSpan = trigger.querySelector('.bp-trigger-text');
    if (textSpan) textSpan.textContent = val || '\u2014 Select \u2014';
  }
  closeBindingPicker();
}

function renderBindingPickerSections() {
  var sections = document.getElementById('bpSections');
  sections.innerHTML = '';
  if (bpTargetType === 'mods') {
    var mods = ['MOD_LSFT','MOD_RSFT','MOD_LCTL','MOD_RCTL','MOD_LALT','MOD_RALT','MOD_LGUI','MOD_RGUI'];
    var html = '<details class="behp-cat" open><summary>Modifiers</summary><div class="behp-cat-grid">';
    mods.forEach(function(m) {
      html += '<button class="behp-btn bp-val-btn" data-bp-val="' + esc(m) + '" title="' + esc(m) + '">' +
        '<span class="behp-name">' + esc(m) + '</span></button>';
    });
    html += '</div></details>';
    sections.innerHTML = html;
    return;
  }
  var html = '';
  // Complete Bindings (zero-param)
  var cg = '';
  ZMK_BEHAVIORS.forEach(function(b) {
    if (b.cells === 0) {
      cg += '<button class="behp-btn bp-val-btn" data-bp-val="' + esc(b.name) + '" title="' + esc(b.desc) + '">' +
        '<span class="behp-name">' + esc(b.name) + '</span><span class="behp-label">' + esc(b.label) + '</span></button>';
    }
  });
  if (cg) html += '<details class="behp-cat" open><summary>Complete Bindings</summary><div class="behp-cat-grid">' + cg + '</div></details>';
  // Layer Actions
  var layerBehs = [
    { prefix: '&mo', label: 'Momentary', desc: 'Activates layer while held' },
    { prefix: '&to', label: 'To Layer', desc: 'Switches to a layer permanently' },
    { prefix: '&tog', label: 'Toggle', desc: 'Toggles a layer on/off' },
    { prefix: '&sl', label: 'Sticky Layer', desc: 'Activates layer for one keypress' }
  ];
  layerBehs.forEach(function(lb) {
    var lg = '';
    keymapLayers.forEach(function(l, i) {
      var val = lb.prefix + ' ' + i;
      lg += '<button class="behp-btn bp-val-btn" data-bp-val="' + esc(val) + '" title="' + esc(lb.desc + ' (' + l.name + ')') + '">' +
        '<span class="behp-name">' + i + '</span><span class="behp-label">' + esc(l.name) + '</span></button>';
    });
    if (lg) html += '<details class="behp-cat" open><summary>' + esc(lb.prefix) + ' \u2014 ' + esc(lb.label) + '</summary><div class="behp-cat-grid">' + lg + '</div></details>';
  });
  // Behaviors needing params
  var pg = '';
  var skipPrefixes = ['&mo','&to','&tog','&sl'];
  ZMK_BEHAVIORS.forEach(function(b) {
    if (b.cells > 0 && skipPrefixes.indexOf(b.name) === -1) {
      pg += '<button class="behp-btn bp-param-btn" data-bp-param="' + esc(b.name) + '" title="' + esc(b.desc) + '">' +
        '<span class="behp-name">' + esc(b.name) + '</span><span class="behp-label">' + esc(b.label) + '</span></button>';
    }
  });
  if (pg) html += '<details class="behp-cat" open><summary>Behaviors (+ params)</summary><div class="behp-cat-grid">' + pg + '</div></details>';
  // Custom Behaviors
  if (keymapBehaviors.length) {
    var presets = keymapBehaviors.filter(function(cb) { return cb._builtin; });
    var customs = keymapBehaviors.filter(function(cb) { return !cb._builtin; });
    if (presets.length) {
      var prg = '';
      presets.forEach(function(cb) {
        var val = '&' + cb.name;
        if (cb.type === 'hold-tap' || cb.type === 'layer-tap') {
          prg += '<button class="behp-btn bp-param-btn" data-bp-param="' + esc(val) + '" title="' + esc('built-in: ' + (cb.label || cb.type || '')) + '">' +
            '<span class="behp-name">' + esc(val) + '</span><span class="behp-label">' + esc(cb.label || cb.type) + '</span></button>';
        } else {
          prg += '<button class="behp-btn bp-val-btn" data-bp-val="' + esc(val) + '" title="' + esc('built-in: ' + (cb.label || cb.type || '')) + '">' +
            '<span class="behp-name">' + esc(val) + '</span><span class="behp-label">' + esc(cb.label || cb.type) + '</span></button>';
        }
      });
      html += '<details class="behp-cat"><summary>Built-in Presets (' + presets.length + ')</summary><div class="behp-cat-grid">' + prg + '</div></details>';
    }
    if (customs.length) {
      var cug = '';
      customs.forEach(function(cb) {
        var val = '&' + cb.name;
        if (cb.type === 'hold-tap' || cb.type === 'layer-tap') {
          cug += '<button class="behp-btn bp-param-btn" data-bp-param="' + esc(val) + '" title="' + esc('custom: ' + (cb.label || cb.type || '')) + '">' +
            '<span class="behp-name">' + esc(val) + '</span><span class="behp-label">' + esc(cb.label || cb.type) + '</span></button>';
        } else {
          cug += '<button class="behp-btn bp-val-btn" data-bp-val="' + esc(val) + '" title="' + esc('custom: ' + (cb.label || cb.type || '')) + '">' +
            '<span class="behp-name">' + esc(val) + '</span><span class="behp-label">' + esc(cb.label || cb.type) + '</span></button>';
        }
      });
      html += '<details class="behp-cat"><summary>Custom Behaviors (' + customs.length + ')</summary><div class="behp-cat-grid">' + cug + '</div></details>';
    }
  }
  // Macros
  var mg = '', addedM = {};
  keymapMacros.forEach(function(m) {
    var ref = '&' + m.name;
    if (!addedM[ref]) {
      addedM[ref] = true;
      if (m.paramType >= 1) {
        var pLabel = m.paramType === 1 ? '1-param' : '2-param';
        var pmTitle = m.label ? m.label + ' (' + pLabel + ')' : pLabel + ' macro';
        var pmDisp = m.label || pLabel;
        mg += '<button class="behp-btn bp-param-btn" data-bp-param="' + esc(ref) + '" title="' + esc(pmTitle) + '">' +
          '<span class="behp-name">' + esc(ref) + '</span><span class="behp-label">' + esc(pmDisp) + '</span></button>';
      } else {
        var zmTitle = m.label ? m.label + ' (macro)' : 'Macro';
        var zmDisp = m.label || 'macro';
        mg += '<button class="behp-btn bp-val-btn" data-bp-val="' + esc(ref) + '" title="' + esc(zmTitle) + '">' +
          '<span class="behp-name">' + esc(ref) + '</span><span class="behp-label">' + esc(zmDisp) + '</span></button>';
      }
    }
  });
  if (mg) html += '<details class="behp-cat"><summary>Macros (' + Object.keys(addedM).length + ')</summary><div class="behp-cat-grid">' + mg + '</div></details>';
  sections.innerHTML = html;
}

// Determines the multi-param configuration for a behavior prefix.
// Returns null if not a multi-param behavior.
function getBpMultiParamConfig(prefix) {
  if (prefix === '&lt') return { title: 'Layer-Tap', params: [
    { label: 'Layer', type: 'layer' },
    { label: 'Keycode', type: 'keycode' }
  ]};
  if (prefix === '&mt') return { title: 'Mod-Tap', params: [
    { label: 'Hold Key', type: 'keycode' },
    { label: 'Tap Key', type: 'keycode' }
  ]};
  // Parameterized macros from keymap
  var cleanName = prefix.replace(/^&/, '');
  var macro = keymapMacros.find(function(m) { return m.name === cleanName; });
  if (macro && macro.paramType >= 1) {
    if (macro.paramType === 1) {
      return { title: 'Macro — ' + cleanName, params: [
        { label: 'Param', type: 'keycode' }
      ]};
    } else {
      return { title: 'Macro — ' + cleanName, params: [
        { label: 'Param 1', type: 'keycode' },
        { label: 'Param 2', type: 'keycode' }
      ]};
    }
  }
  // Custom hold-tap / layer-tap behaviors
  var customBeh = keymapBehaviors.find(function(c) { return c.name === cleanName; });
  if (customBeh && (customBeh.type === 'hold-tap' || customBeh.type === 'layer-tap')) {
    var holdBind = customBeh.config && customBeh.config.holdBinding ? customBeh.config.holdBinding : '';
    var isLayerHold = (holdBind === '&mo' || holdBind === '&to' || holdBind === '&tog' || holdBind === '&sl' || customBeh.type === 'layer-tap');
    var isKpHold = (holdBind === '&kp');
    // Macro-hold: holdBinding is a macro (not &kp, not a layer op) — param 1 is always 0
    var isMacroHold = (!isLayerHold && !isKpHold && holdBind);
    if (isMacroHold) {
      return { title: customBeh.label || customBeh.type, macroHold: true, params: [
        { label: 'Tap Keycode', type: 'keycode' }
      ]};
    }
    return { title: customBeh.label || customBeh.type, params: [
      { label: isLayerHold ? 'Layer' : 'Hold Param', type: isLayerHold ? 'layer' : 'keycode' },
      { label: 'Tap Keycode', type: 'keycode' }
    ]};
  }
  return null;
}

function showBindingPickerSubPanel(prefix) {
  bpKeycodePrefix = prefix;
  document.getElementById('bpSections').style.display = 'none';
  document.getElementById('bpSearchWrap').style.display = 'none';
  document.getElementById('bpRawRow').style.display = 'none';
  var panel = document.getElementById('bpSubPanel');
  panel.style.display = '';
  var title = document.getElementById('bpSubTitle');
  var searchWrap = document.getElementById('bpKcSearchWrap');
  var scroll = document.getElementById('bpSubScroll');

  // Multi-param behaviors (layer-tap, mod-tap, custom hold-taps)
  var mpConfig = getBpMultiParamConfig(prefix);
  if (mpConfig) {
    title.textContent = prefix + ' \u2014 ' + mpConfig.title;
    searchWrap.style.display = 'none';
    var html = '';
    mpConfig.params.forEach(function(p, idx) {
      html += '<div class="bp-multi-row">';
      html += '<label>' + esc(p.label) + '</label>';
      if (p.type === 'layer') {
        html += '<select id="bpMultiP' + idx + '">';
        keymapLayers.forEach(function(l, i) {
          if (l.status === 'reserved') return;
          html += '<option value="' + i + '">' + i + ' - ' + esc(l.displayName || l.name) + '</option>';
        });
        html += '</select>';
      } else {
        html += '<input type="text" id="bpMultiP' + idx + '" placeholder="' + esc(p.label) + '" style="width:160px;">';
      }
      html += '</div>';
    });
    // Modifier checkboxes for keycode params
    var hasKeycode = mpConfig.params.some(function(p) { return p.type === 'keycode'; });
    if (hasKeycode) {
      html += '<div class="bp-multi-mods" id="bpMultiMods">';
      ['LSHFT','LALT','LCTRL','LGUI','RSHFT','RALT','RCTRL','RGUI'].forEach(function(m) {
        html += '<label><input type="checkbox" data-mod="' + m + '"> ' + m + '</label>';
      });
      html += '</div>';
    }
    // Apply button
    html += '<div class="bp-multi-apply-row"><button class="bp-multi-apply" id="bpMultiApply">\u2713 Apply</button></div>';
    // Keycode picker search + grid
    if (hasKeycode) {
      html += '<div class="kc-search-wrap" style="margin-top:0.4em;">';
      html += '<span class="search-icon">&#128269;</span>';
      html += '<input type="text" id="bpMultiKcSearch" placeholder="Search keycodes...">';
      html += '<button class="search-clear" id="bpMultiKcClear" style="display:none;">&times;</button>';
      html += '</div>';
    }
    html += '<div class="bp-multi-kc-scroll" style="max-height:260px;overflow-y:auto;margin-top:0.3em;"></div>';
    scroll.innerHTML = html;
    // Populate keycode grid + wire search
    if (hasKeycode) {
      var kcContainer = scroll.querySelector('.bp-multi-kc-scroll');
      populatePickerKeycodeGrids(kcContainer);
      var mpSearch = document.getElementById('bpMultiKcSearch');
      var mpClear = document.getElementById('bpMultiKcClear');
      if (mpSearch) {
        mpSearch.addEventListener('input', function() {
          var q = this.value.trim().toLowerCase();
          mpClear.style.display = q ? '' : 'none';
          kcContainer.querySelectorAll('.bp-sub-btn').forEach(function(btn) {
            var kc = (btn.dataset.bpKc || '').toLowerCase();
            var desc = (btn.title || '').toLowerCase();
            btn.classList.toggle('hidden', q && kc.indexOf(q) === -1 && desc.indexOf(q) === -1);
          });
          kcContainer.querySelectorAll('.keycode-category').forEach(function(det) {
            var anyVisible = det.querySelectorAll('.bp-sub-btn:not(.hidden)').length > 0;
            det.style.display = anyVisible ? '' : 'none';
            if (q && anyVisible) det.open = true;
            if (!q) det.removeAttribute('style');
          });
        });
        mpClear.addEventListener('click', function() { mpSearch.value = ''; mpSearch.dispatchEvent(new Event('input')); mpSearch.focus(); });
      }
    }
    return;
  }

  // Action list behaviors (bt, rgb_ug, out, bl, etc.)
  if (BP_ACTION_MAP[prefix]) {
    title.textContent = prefix + ' \u2014 ' + BP_ACTION_MAP[prefix].title;
    searchWrap.style.display = 'none';
    var actions = BP_ACTION_MAP[prefix].list();
    scroll.innerHTML = '<div class="keycode-grid">' + actions.map(function(a) {
      return '<button class="keycode-btn bp-sub-btn" data-bp-action="' + esc(a) + '">' + esc(a) + '</button>';
    }).join('') + '</div>';
  } else if (BP_KC_BEHAVIORS.indexOf(prefix) > -1) {
    // Single keycode behaviors (kp, kt, sk)
    title.textContent = prefix + ' \u2014 Select Keycode';
    searchWrap.style.display = '';
    document.getElementById('bpKcSearch').value = '';
    document.getElementById('bpKcSearchClear').style.display = 'none';
    populatePickerKeycodeGrids(scroll);
  } else {
    // Fallback: raw mode
    hideBindingPickerSubPanel();
    document.getElementById('bpRawInput').value = prefix + ' ';
    document.getElementById('bpRawInput').focus();
    return;
  }
}

function hideBindingPickerSubPanel() {
  document.getElementById('bpSubPanel').style.display = 'none';
  document.getElementById('bpSections').style.display = '';
  document.getElementById('bpSearchWrap').style.display = '';
  document.getElementById('bpRawRow').style.display = '';
  bpKeycodePrefix = '';
}

function populatePickerKeycodeGrids(container) {
  var catMap = {
    letters: 'Letters', numbers: 'Numbers', modifiers: 'Modifiers',
    control: 'Control & Whitespace', navigation: 'Navigation',
    locks: 'Locks', symbols: 'Symbols', fkeys: 'Function Keys',
    numpad: 'Numpad', media: 'Media', editing: 'Editing',
    applications: 'Applications', misc: 'Miscellaneous',
    international: 'International', language: 'Language', power: 'Power & Lock'
  };
  var html = '';
  Object.keys(catMap).forEach(function(cat) {
    if (!ZMK_KEYCODES[cat] || !ZMK_KEYCODES[cat].length) return;
    var isFirst = cat === 'letters';
    html += '<details class="keycode-category"' + (isFirst ? ' open' : '') + '><summary>' + catMap[cat] + '</summary><div class="keycode-grid">';
    ZMK_KEYCODES[cat].forEach(function(kc) {
      var tip = kcDescs[kc] ? ' title="' + esc(kcDescs[kc]) + '"' : '';
      html += '<button class="keycode-btn bp-sub-btn" data-bp-kc="' + kc + '"' + tip + '>' + kc + '</button>';
    });
    html += '</div></details>';
  });
  container.innerHTML = html;
}

// Returns HTML for a binding trigger button with hidden value input.
function bindingSelectHTML(id, selected, optType, width) {
  var w = width || '160px';
  selected = (selected || '').trim();
  var displayText = selected || '\u2014 Select \u2014';
  return '<span class="beh-binding-wrap">' +
    '<button type="button" class="bp-trigger" id="' + id + '" data-bp-type="' + esc(optType || 'binding') + '" style="width:' + w + ';">' +
      '<span class="bp-trigger-text">' + esc(displayText) + '</span>' +
      '<span class="bp-trigger-arrow">&#9662;</span>' +
    '</button>' +
    '<input type="hidden" id="' + id + '_val" value="' + esc(selected) + '">' +
    '</span>';
}

// Read the effective value from a binding picker (hidden input).
function getBehBindingValue(id) {
  var hidden = document.getElementById(id + '_val');
  return hidden ? hidden.value.trim() : '';
}

// Set a binding picker to a value and update its trigger button text.
function setBehBindingValue(id, val) {
  val = (val || '').trim();
  var hidden = document.getElementById(id + '_val');
  if (hidden) hidden.value = val;
  var trigger = document.getElementById(id);
  if (trigger) {
    var textSpan = trigger.querySelector('.bp-trigger-text');
    if (textSpan) textSpan.textContent = val || '\u2014 Select \u2014';
  }
}

// --- Behavior binding / modifier datalist helpers ---
function populateBehDataLists() {
  var html = '';
  ZMK_BEHAVIORS.forEach(function(b) {
    html += '<option value="' + esc(b.name) + '">';
  });
  keymapBehaviors.forEach(function(cb) {
    html += '<option value="&' + esc(cb.name) + '">';
  });
  var added = {};
  keymapMacros.forEach(function(m) {
    var ref = '&' + m.name;
    if (!added[ref]) { added[ref] = true; html += '<option value="' + esc(ref) + '">'; }
  });
  var dl = document.getElementById('behBindingDL');
  if (dl) dl.innerHTML = html;
  var mods = ['MOD_LSFT','MOD_RSFT','MOD_LCTL','MOD_RCTL','MOD_LALT','MOD_RALT','MOD_LGUI','MOD_RGUI'];
  var mhtml = mods.map(function(m) { return '<option value="' + m + '">'; }).join('');
  var mdl = document.getElementById('behModsDL');
  if (mdl) mdl.innerHTML = mhtml;
}

// showBehaviorConfig(type) — Opens the behavior editor with fields for
// the selected behavior type (timing, flavor, bindings, etc.).
// Each type shows different config options relevant to that behavior.
function showBehaviorConfig(type) {
  var container = document.getElementById('kmBehaviorConfig');
  if (type === 'hold-tap') {
    container.innerHTML =
      '<div class="input-row"><div class="input-group"><label>Tapping Term</label><input type="number" id="kmBehTappingTerm" value="200" min="0" style="width:70px;"> ms</div></div>' +
      '<div class="input-row"><div class="input-group"><label>Flavor</label><select id="kmBehFlavor"><option value="tap-preferred">tap-preferred</option><option value="hold-preferred">hold-preferred</option><option value="balanced">balanced</option></select></div></div>' +
      '<div class="input-row"><div class="input-group"><label>Hold Binding</label>' + bindingSelectHTML('kmBehHoldBinding', '', 'binding', '180px') + '</div></div>' +
      '<div class="input-row"><div class="input-group"><label>Tap Binding</label>' + bindingSelectHTML('kmBehTapBinding', '', 'binding', '180px') + '</div></div>' +
      '<div class="input-row"><div class="input-group"><label>Quick Tap (ms)</label><input type="number" id="kmBehQuickTap" value="" min="0" placeholder="none" style="width:70px;"></div>' +
      '<div class="input-group"><label>Require Prior Idle (ms)</label><input type="number" id="kmBehRequirePriorIdle" value="" min="0" placeholder="none" style="width:70px;"></div></div>' +
      '<div class="input-row"><div class="input-group"><label>Positional Hold (key positions)</label><input type="hidden" id="kmBehHoldTriggerPositions"></div></div>' +
      '<p style="font-size:0.78em;color:var(--muted);margin:0.1em 0 0.2em;">Click keys to toggle positional hold-trigger positions (blank = off):</p>' +
      '<div class="combo-mini-kb" id="behPositionalMiniKb"></div>' +
      '<div class="input-row" style="gap:1em;flex-wrap:wrap;">' +
      '<label style="display:flex;align-items:center;gap:0.3em;cursor:pointer;"><input type="checkbox" id="kmBehRetroTap"> Retro-Tap</label>' +
      '<label style="display:flex;align-items:center;gap:0.3em;cursor:pointer;"><input type="checkbox" id="kmBehHoldWhileUndecided"> Hold While Undecided</label>' +
      '<label style="display:flex;align-items:center;gap:0.3em;cursor:pointer;"><input type="checkbox" id="kmBehHoldWhileUndecidedLinger"> HWU Linger</label>' +
      '<label style="display:flex;align-items:center;gap:0.3em;cursor:pointer;"><input type="checkbox" id="kmBehHoldTriggerOnRelease"> Hold Trigger on Release</label>' +
      '<label style="display:flex;align-items:center;gap:0.3em;cursor:pointer;"><input type="checkbox" id="kmBehGlobalQuickTap"> Global Quick Tap (legacy)</label>' +
      '</div>';
  } else if (type === 'tap-dance') {
    container.innerHTML =
      '<div class="input-row"><div class="input-group"><label>Tapping Term</label><input type="number" id="kmBehTappingTerm" value="200" min="0" style="width:70px;"> ms</div></div>' +
      '<label style="font-weight:600;font-size:0.85em;margin-top:0.4em;display:block;">Bindings <span style="font-weight:400;color:var(--muted);">(tap 1&times;, 2&times;, 3&times;&hellip;)</span></label>' +
      '<div id="kmBehTdSlots" style="display:flex;flex-wrap:wrap;gap:6px;margin:0.3em 0;"></div>' +
      '<div style="margin-top:0.3em;"><button type="button" id="kmBehTdAddSlot" class="btn-sm">+ Add Binding</button></div>' +
      '<input type="hidden" id="kmBehTdBindings" value="">';
  } else if (type === 'mod-morph') {
    container.innerHTML =
      '<div class="input-row"><div class="input-group"><label>Normal</label>' + bindingSelectHTML('kmBehMmNormal', '', 'binding', '180px') + '</div></div>' +
      '<div class="input-row"><div class="input-group"><label>Morphed</label>' + bindingSelectHTML('kmBehMmMorphed', '', 'binding', '180px') + '</div></div>' +
      '<div class="input-row"><div class="input-group"><label>Mods</label>' + bindingSelectHTML('kmBehMmMods', '', 'mods', '160px') + '</div></div>';
  } else if (type === 'sticky-key') {
    container.innerHTML =
      '<div class="input-row"><div class="input-group"><label>Release After (ms)</label><input type="number" id="kmBehSkRelease" value="1000" min="0" style="width:80px;"></div></div>' +
      '<div class="input-row"><div class="input-group"><label>Binding</label>' + bindingSelectHTML('kmBehSkBinding', '', 'binding', '180px') + '</div></div>' +
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
      '<div class="input-row"><div class="input-group"><label>CW Binding</label>' + bindingSelectHTML('kmBehSensorCW', '', 'binding', '180px') + '</div></div>' +
      '<div class="input-row"><div class="input-group"><label>CCW Binding</label>' + bindingSelectHTML('kmBehSensorCCW', '', 'binding', '180px') + '</div></div>' +
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
      '<div class="input-row"><div class="input-group"><label>Mods</label>' + bindingSelectHTML('kmBehCwMods', '', 'mods', '160px') + '</div></div>';
  } else {
    container.innerHTML = '';
  }
  populateBehDataLists();
  if (type === 'hold-tap') renderBehPositionalMiniKb();
  if (type === 'tap-dance') initTdSlots();
}

// ---- Tap-Dance Binding Slots ----
var tdSlotBindings = []; // array of binding strings for TD slots

function initTdSlots() {
  tdSlotBindings = [];
  var addBtn = document.getElementById('kmBehTdAddSlot');
  if (addBtn) addBtn.onclick = function() { tdSlotBindings.push(''); renderTdSlots(); };
  renderTdSlots();
}

function parseTdBindings(str) {
  // Parse "<&kp A>, <&kp B>, <&c_blink>" → ["&kp A", "&kp B", "&c_blink"]
  if (!str || !str.trim()) return [];
  var matches = str.match(/<([^>]+)>/g);
  if (!matches) return [str.trim()];
  return matches.map(function(m) { return m.replace(/^<|>$/g, '').trim(); });
}

function tdSlotsSerialized() {
  return tdSlotBindings.filter(function(b) { return b; }).map(function(b) { return '<' + b + '>'; }).join(', ');
}

function renderTdSlots() {
  var container = document.getElementById('kmBehTdSlots');
  if (!container) return;
  container.innerHTML = '';
  tdSlotBindings.forEach(function(b, i) {
    var slot = document.createElement('div');
    slot.style.cssText = 'display:flex;align-items:center;gap:4px;background:var(--input-bg);border:1px solid var(--border);border-radius:6px;padding:3px 6px;';
    var label = document.createElement('span');
    label.style.cssText = 'font-size:0.75em;color:var(--muted);min-width:18px;';
    label.textContent = (i + 1) + '.';
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'bp-trigger';
    btn.style.cssText = 'width:180px;font-size:0.85em;';
    btn.innerHTML = '<span class="bp-trigger-text">' + esc(b || '\u2014 Select \u2014') + '</span><span class="bp-trigger-arrow">\u25BE</span>';
    btn.dataset.tdSlotIdx = i;
    btn.title = b || 'Click to pick a binding';
    btn.onclick = function() { openTdSlotPicker(i); };
    var rmBtn = document.createElement('button');
    rmBtn.className = 'btn-danger btn-sm';
    rmBtn.style.cssText = 'padding:1px 6px;font-size:0.8em;';
    rmBtn.textContent = '\u2715';
    rmBtn.title = 'Remove this binding';
    rmBtn.onclick = function() { tdSlotBindings.splice(i, 1); renderTdSlots(); };
    slot.appendChild(label);
    slot.appendChild(btn);
    slot.appendChild(rmBtn);
    container.appendChild(slot);
  });
  // Sync hidden input
  var hidden = document.getElementById('kmBehTdBindings');
  if (hidden) hidden.value = tdSlotsSerialized();
}

var activeTdSlotIdx = -1;
function openTdSlotPicker(idx) {
  activeTdSlotIdx = idx;
  bpCallback = function(val) {
    tdSlotBindings[activeTdSlotIdx] = val;
    renderTdSlots();
    activeTdSlotIdx = -1;
  };
  bpTargetType = 'binding';
  renderBindingPickerSections();
  document.getElementById('bindingPickerOverlay').classList.add('visible');
}

// ================================================================
// SECTION: QUICK-ASSIGN SYSTEM
// Press a keyboard shortcut (like the letter A) while a key is
// selected, and it assigns that keycode immediately. QA_KEYBOARD_MAP
// maps browser KeyboardEvent.code values to ZMK keycodes.
// openQuickAssign() activates the mode; closing it saves the result.
// More on this code can be found in 'RefDoc' line 577
// ================================================================
var QA_KEYBOARD_MAP = {
  // Maps KeyboardEvent.code → ZMK keycode
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

// openQuickAssign() — Activates quick-assign mode: press a key on your
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
    if (binding === '&trans') label = '▽';
    else if (binding === '&none') label = '✕';

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
// More on this code can be found in 'RefDoc' line 541
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
  // No longer needed — sensor editor is per active layer
}

// ================================================================
// SECTION: SENSOR BINDINGS (Encoder Cards)
// Rotary encoders on the keyboard can trigger bindings when rotated.
// Each sensor entry has a layer index and a list of bindings
// (clockwise, counter-clockwise). The sensor editor shows visual
// cards for each encoder and lets you pick rotation actions.
// More on this code can be found in 'RefDoc' line 541
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
    // No sensor bindings for this layer — show option to add
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
// Uses generateBehaviorCode() (line 4425) for custom behavior blocks.
// More on this code can be found in 'RefDoc' line 595
// ================================================================
// updateKeymapOutput() — Generates the full .keymap file as text.
// Outputs #include lines, custom behaviors, macros, combos, conditional
// layers, the keymap {} block with all layers, and sensor bindings.
function updateKeymapOutput() {
  var out = '';

  // Use parsed includes from user's file if available, otherwise generate defaults
  var includeRgbDtsi = document.getElementById('kmIncludeRgbDtsi') && document.getElementById('kmIncludeRgbDtsi').checked;
  if (keymapParsedIncludes && keymapParsedIncludes.length > 0) {
    // Output preserved header lines (copyright comment, etc.) before includes
    if (keymapParsedHeaderLines && keymapParsedHeaderLines.length) {
      keymapParsedHeaderLines.forEach(function(line) { out += line + '\n'; });
    }
    // Check if existing includes already have the rgb dtsi include
    var hasRgbInclude = keymapParsedIncludes.some(function(inc) { return inc.indexOf('-rgb.dtsi') >= 0; });
    keymapParsedIncludes.forEach(function(inc) { out += inc + '\n'; });
    // Add rgb dtsi include if toggle is on and not already present.
    // Uses currentLayoutId so the filename matches the loaded keyboard.
    if (includeRgbDtsi && !hasRgbInclude) {
      var dtsiName = currentLayoutId + '-rgb.dtsi';
      out += '#include "' + dtsiName + '"\n';
    }
  } else {
    out += '/*\n * Generated by RGB Keymap Editor v0.33\n */\n\n';
    out += '#include <behaviors.dtsi>\n';
    out += '#include <dt-bindings/zmk/bt.h>\n';
    out += '#include <dt-bindings/zmk/keys.h>\n';
    out += '#include <dt-bindings/zmk/outputs.h>\n';
    out += '#include <dt-bindings/zmk/rgb.h>\n';
    if (includeRgbDtsi) {
      var dtsiName2 = currentLayoutId + '-rgb.dtsi';
      out += '#include "' + dtsiName2 + '"\n';
    }
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

  // Emit #define macros for enabled built-in behaviors that have them
  var hasDefines = false;
  keymapBehaviors.forEach(function(b) {
    if (b._builtin) {
      var preset = null;
      BUILTIN_BEHAVIORS.forEach(function(p) { if (p.id === b._builtin) preset = p; });
      if (preset && preset.define) { out += preset.define + '\n'; hasDefines = true; }
    }
  });
  if (hasDefines) out += '\n';

  // If we have preserved raw pre-keymap blocks from the parsed source, output them
  // with any NEW editor-only items merged into the existing devicetree sections.
  if (keymapParsedRawBlocks) {
    var rawOut = keymapParsedRawBlocks;

    // Build text snippets for editor-only items to merge
    var editorOnlyCombos = keymapCombos.filter(function(c) { return c._fromEditor; });
    var editorOnlyBehaviors = keymapBehaviors.filter(function(b) { return b._fromEditor; });
    var editorOnlyMacros = keymapMacros.filter(function(m) { return m._fromEditor; });

    // Helper: generate combo text block
    function comboBlock(c) {
      var s = '';
      s += '        ' + c.name + ' {\n';
      s += '            bindings = <' + c.binding + '>;\n';
      s += '            key-positions = <' + c.positions.join(' ') + '>;\n';
      if (c.layers) s += '            layers = <' + c.layers + '>;\n';
      s += '            timeout-ms = <' + c.timeout + '>;\n';
      if (c.requirePriorIdle) s += '            require-prior-idle-ms = <' + c.requirePriorIdle + '>;\n';
      if (c.slowRelease) s += '            slow-release;\n';
      s += '        };\n';
      return s;
    }
    function macroBlock(m) {
      var paramType = m.paramType || 0;
      var compatible = 'zmk,behavior-macro';
      var bindingCells = 0;
      if (paramType === 1) { compatible = 'zmk,behavior-macro-one-param'; bindingCells = 1; }
      else if (paramType === 2) { compatible = 'zmk,behavior-macro-two-param'; bindingCells = 2; }
      var s = '';
      s += '        ' + m.name + ': ' + m.name + ' {\n';
      s += '            compatible = "' + compatible + '";\n';
      s += '            #binding-cells = <' + bindingCells + '>;\n';
      if (m.label) s += '            label = "' + m.label + '";\n';
      if (m.waitMs) s += '            wait-ms = <' + m.waitMs + '>;\n';
      if (m.tapMs) s += '            tap-ms = <' + m.tapMs + '>;\n';
      if (m.steps.length > 7) {
        var lines = [];
        for (var si = 0; si < m.steps.length; si += 7) {
          lines.push('<' + m.steps.slice(si, si + 7).join(' ') + '>');
        }
        s += '            bindings = ' + lines[0] + ';\n';
        for (var li = 1; li < lines.length; li++) {
          s += '                ' + lines[li] + ';\n';
        }
      } else {
        s += '            bindings = <' + m.steps.join(' ') + '>;\n';
      }
      s += '        };\n';
      return s;
    }

    // Merge combos into existing combos section, or create new block
    if (editorOnlyCombos.length) {
      var comboInsert = '';
      editorOnlyCombos.forEach(function(c) { comboInsert += comboBlock(c); });
      // Find the section-level closing (4-space indent at start of line, not 8-space inner closings)
      var comboCloseRe = /(combos\s*\{[^]*?)(\n    \};)/;
      var cm = rawOut.match(comboCloseRe);
      if (cm) {
        var insertPos = cm.index + cm[1].length;
        rawOut = rawOut.substring(0, insertPos) + '\n' + comboInsert + rawOut.substring(insertPos);
      } else {
        rawOut += '\n/ {\n    combos {\n        compatible = "zmk,combos";\n' + comboInsert + '    };\n};\n';
      }
    }

    // Merge behaviors into existing behaviors section, or create new block
    if (editorOnlyBehaviors.length) {
      var behInsert = '';
      editorOnlyBehaviors.forEach(function(b) { behInsert += generateBehaviorCode(b); });
      var behCloseRe = /(behaviors\s*\{[^]*?)(\n    \};)/;
      var bm = rawOut.match(behCloseRe);
      if (bm) {
        var bInsertPos = bm.index + bm[1].length;
        rawOut = rawOut.substring(0, bInsertPos) + '\n' + behInsert + rawOut.substring(bInsertPos);
      } else {
        rawOut += '\n/ {\n    behaviors {\n' + behInsert + '    };\n};\n';
      }
    }

    // Merge macros into existing macros section, or create new block
    if (editorOnlyMacros.length) {
      var macInsert = '';
      editorOnlyMacros.forEach(function(m) { macInsert += macroBlock(m); });
      var macCloseRe = /(macros\s*\{[^]*?)(\n    \};)/;
      var mm = rawOut.match(macCloseRe);
      if (mm) {
        var mInsertPos = mm.index + mm[1].length;
        rawOut = rawOut.substring(0, mInsertPos) + '\n' + macInsert + rawOut.substring(mInsertPos);
      } else {
        rawOut += '\n/ {\n    macros {\n' + macInsert + '    };\n};\n';
      }
    }

    out += rawOut + '\n\n';
  } else {
  // No raw blocks — generate from parsed data (default behavior)

  // Custom behaviors
  var nativeKeymapBehaviors = keymapBehaviors.filter(function(b) { return !b._fromRgb && !b._fromDtsi; });
  if (nativeKeymapBehaviors.length) {
    out += '/ {\n    behaviors {\n';
    nativeKeymapBehaviors.forEach(function(b) {
      out += generateBehaviorCode(b);
    });
    out += '    };\n};\n\n';
  }

  // Combos — only output native (non-RGB) combos; RGB combos stay in the .dtsi
  var nativeCombos = keymapCombos.filter(function(c) { return !c._fromRgb && !c._fromDtsi; });

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
  var nativeKeymapMacros = keymapMacros.filter(function(m) { return !m._fromRgb && !m._fromDtsi; });
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
      if (m.steps.length > 7) {
        var mlines = [];
        for (var si = 0; si < m.steps.length; si += 7) {
          mlines.push('<' + m.steps.slice(si, si + 7).join(' ') + '>');
        }
        out += '            bindings = ' + mlines[0] + ';\n';
        for (var mli = 1; mli < mlines.length; mli++) {
          out += '                ' + mlines[mli] + ';\n';
        }
      } else {
        out += '            bindings = <' + m.steps.join(' ') + '>;\n';
      }
      out += '        };\n';
    });
    out += '    };\n};\n\n';
  }

  } // end of raw blocks else

  // Note: Blink macros are RGB-tab items — output only in RGB generator, not in keymap output

  // Keymap — track layer positions for highlighting
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

      // Compute per-column binding widths for THIS layer only (avoids excessive padding from other layers)
      var colWidths = {};
      allCols.forEach(function(c) { colWidths[c] = 0; });
      rowKeys.forEach(function(rk) {
        layoutRows[rk].forEach(function(entry) {
          var b = l.bindings[entry.idx] || '&none';
          if (b.length > colWidths[entry.col]) colWidths[entry.col] = b.length;
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
    out += '        };\n';
    if (li < keymapLayers.length - 1) out += '\n'; // blank line between layers, not after last
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
// getKeyPositionsForSide(side) — Returns a space-separated string of key
// indices belonging to the given side ('left' or 'right') of a split keyboard.
// Uses the same split detection as updateKeymapOutput(): finds the largest
// horizontal gap in the layout's x-positions to split left vs right halves.
// Used by generateBehaviorCode() to auto-fill hold-trigger-key-positions
// for hml (needs right-side keys) and hmr (needs left-side keys).
function getKeyPositionsForSide(side) {
  if (!keyboardLayout || keyboardLayout.length === 0) return '';
  // Build x-position lookup and detect largest horizontal gap (the split)
  var splitX = -1;
  var maxXGap = 2;
  keyboardLayout.forEach(function(k, i) {
    for (var j = i + 1; j < keyboardLayout.length; j++) {
      var kj = keyboardLayout[j];
      // Only compare keys in same row to find the split
      if (k.row === kj.row) {
        var gap = Math.abs(kj.x - k.x);
        if (gap > maxXGap) {
          maxXGap = gap;
          splitX = (Math.min(k.x, kj.x) + Math.max(k.x, kj.x)) / 2;
        }
      }
    }
  });
  if (splitX < 0) return ''; // No split detected (not a split keyboard)
  // Collect key indices for the requested side
  var positions = [];
  keyboardLayout.forEach(function(k, i) {
    if (side === 'left' && k.x < splitX) positions.push(i);
    else if (side === 'right' && k.x >= splitX) positions.push(i);
  });
  return positions.join(' ');
}

// generateBehaviorCode() turns a custom behavior object into its
// ZMK devicetree text block. Each behavior type (hold-tap, sticky-key,
// tap-dance, caps-word, etc.) has its own format with specific
// properties. Called by updateKeymapOutput() for each custom behavior.
// For hml/hmr built-in behaviors, hold-trigger-key-positions are auto-
// generated from the loaded keyboard layout using getKeyPositionsForSide().
// More on this code can be found in 'RefDoc' line 623
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
    // Auto-generate hold-trigger-key-positions for hml/hmr built-in behaviors:
    // hml (left homerow mod) needs right-side key positions so taps on the
    // opposite hand don't interfere; hmr needs left-side positions.
    var autoPositions = '';
    if (b._builtin === 'hml') autoPositions = getKeyPositionsForSide('right');
    else if (b._builtin === 'hmr') autoPositions = getKeyPositionsForSide('left');
    var finalPositions = autoPositions || b.config.holdTriggerPositions || '';
    if (finalPositions) out += '            hold-trigger-key-positions = <' + finalPositions + '>;\n';
    if (b.config.retroTap) out += '            retro-tap;\n';
    if (b.config.holdWhileUndecided) out += '            hold-while-undecided;\n';
    if (b.config.holdWhileUndecidedLinger) out += '            hold-while-undecided-linger;\n';
    if (b.config.holdTriggerOnRelease) out += '            hold-trigger-on-release;\n';
    if (b.config.globalQuickTap) out += '            global-quick-tap;\n';
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
// More on this code can be found in 'RefDoc' line 640
// ================================================================
// syncCrossTabData() — Copies keymap layers, combos, behaviors, and macros
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
    // Match by index first — if an RGB layer already covers this index, skip
    if (existingIndexes[idxStr]) return;
    var klBase = baseKey(kl.name);
    // Also try stripping trailing _N (e.g. abc_0 → ABC, nmrw_1 → NMRW)
    var klBaseStripped = klBase.replace(/_\d+$/, '');
    // Also try matching by displayName (e.g. "ABC", "KPAD")
    var dispBase = kl.displayName ? kl.displayName.toUpperCase().replace(/[^A-Z0-9]/g, '_') : '';
    if (existingBaseKeys[klBase] || existingBaseKeys[klBaseStripped] || (dispBase && existingBaseKeys[dispBase])) return;
    // Push as a real layer entry so user can assign RGB color
    // Use the keymap node name (not display name) so RGB defines match the layer name
    var layerName = (klBase || klBaseStripped || dispBase);
    layers.push({
      name: layerName,
      index: idxStr,
      h: '', s: '', b: '',
      label: '',
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

}

// syncRgbToKeymap() — Copies RGB tab data (behaviors, macros) back into
// the keymap tab's arrays. Called when switching to the Keymap tab.
function syncRgbToKeymap() {
  // Sync RGB macros, behaviors, and combos INTO the keymap editor so they
  // appear as selectable bindings. They get _fromRgb flag so they are
  // excluded from the .keymap output (they live in the .dtsi file).

  // First remove any stale _fromRgb items from previous syncs
  keymapMacros = keymapMacros.filter(function(m) { return !m._fromRgb; });
  keymapBehaviors = keymapBehaviors.filter(function(b) { return !b._fromRgb; });
  keymapCombos = keymapCombos.filter(function(c) { return !c._fromRgb; });

  var existingMacNames = {};
  keymapMacros.forEach(function(m) { existingMacNames[m.name] = true; });

  var existingBehNames = {};
  keymapBehaviors.forEach(function(b) { existingBehNames[b.name] = true; });

  var existingComboNames = {};
  keymapCombos.forEach(function(c) { existingComboNames[c.name] = true; });

  // Sync RGB macros (TO_RGB, MO_RGB, TO_RGB_PRESS)
  macros.forEach(function(rm) {
    if (!existingMacNames[rm.name]) {
      existingMacNames[rm.name] = true;
      keymapMacros.push({
        name: rm.name,
        paramType: 0,
        steps: [],
        label: rm.label || rm.name,
        _fromRgb: true
      });
    }
  });

  // Sync blink macros (caps_blink, num_blink, f_blink, etc.)
  blinkMacros.forEach(function(bm) {
    if (!existingMacNames[bm.name]) {
      existingMacNames[bm.name] = true;
      keymapMacros.push({
        name: bm.name,
        paramType: 0,
        steps: [],
        label: bm.label || bm.name,
        _fromRgb: true
      });
    }
  });

  // Sync RGB behaviors (RGB_HT instances)
  behaviors.forEach(function(rb) {
    if (!existingBehNames[rb.name]) {
      existingBehNames[rb.name] = true;
      keymapBehaviors.push({
        name: rb.name,
        type: 'hold-tap',
        label: rb.label || rb.name,
        config: { tappingTerm: '200', flavor: 'tap-preferred', holdBinding: '&' + rb.macro, tapBinding: '&kp' },
        _fromRgb: true
      });
    }
  });

  // Sync dtsi native behaviors (hm, ltq, td_numcaps, etc.)
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

  // Sync RGB combos
  combos.forEach(function(rc) {
    if (!existingComboNames[rc.name]) {
      existingComboNames[rc.name] = true;
      keymapCombos.push({
        name: rc.name,
        binding: rc.bind,
        positions: rc.pos.split(/[\s,]+/).filter(Boolean),
        layers: rc.layers,
        timeout: 50,
        _fromRgb: true
      });
    }
  });
}

// ================================================================
// SECTION: FLOATING VALUE PICKER
// A searchable dropdown that appears when you click a text input.
// Instead of typing a value like "LSHIFT", you click the input and
// a floating list appears with all valid options. You can type to
// filter. Used for keycode inputs, layer selectors, and more.
// More on this code can be found in 'RefDoc' line 669
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
      if (!choices.some(function(c) { return c.code === '&' + m.name; })) {
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
    BT_ACTIONS.forEach(function(a) { choices.push({ code: a, description: PARAM_DESCS[a] || 'Bluetooth' }); });
  } else if (param === 'rgb_action') {
    RGB_ACTIONS.forEach(function(a) { choices.push({ code: a, description: PARAM_DESCS[a] || 'RGB' }); });
  } else if (param === 'out_action') {
    OUT_ACTIONS.forEach(function(a) { choices.push({ code: a, description: PARAM_DESCS[a] || 'Output' }); });
  } else if (param === 'bl_action') {
    BL_ACTIONS.forEach(function(a) { choices.push({ code: a, description: PARAM_DESCS[a] || 'Backlight' }); });
  } else if (param === 'ep_action') {
    EP_ACTIONS.forEach(function(a) { choices.push({ code: a, description: PARAM_DESCS[a] || 'Power' }); });
  } else if (param === 'button') {
    MOUSE_BUTTONS.forEach(function(a) { choices.push({ code: a, description: PARAM_DESCS[a] || 'Mouse Button' }); });
  } else if (param === 'direction' && currentBindBehavior === '&mmv') {
    MOUSE_MOVES.forEach(function(a) { choices.push({ code: a, description: PARAM_DESCS[a] || 'Mouse Move' }); });
  } else if (param === 'direction' && currentBindBehavior === '&msc') {
    MOUSE_SCROLLS.forEach(function(a) { choices.push({ code: a, description: PARAM_DESCS[a] || 'Mouse Scroll' }); });
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

// openValuePicker(anchorRect, param, currentValue, behavior, onSelect) —
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
// More on this code can be found in 'RefDoc' line 690
// ================================================================
// switchTab(tabId) — Switches between RGB Generator and Keymap Editor tabs.
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
// More on this code can be found in 'RefDoc' line 710
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

  // --- Binding picker popup event handlers ---
  // Open picker on trigger button click
  document.addEventListener('click', function(e) {
    var trigger = e.target.closest('.bp-trigger');
    if (trigger && trigger.id !== 'beBehaviorTrigger') {
      e.preventDefault();
      openBindingPicker(trigger.id, trigger.dataset.bpType || 'binding');
    }
  });
  // Popup interactions (delegated)
  document.getElementById('bindingPickerOverlay').addEventListener('click', function(e) {
    // Backdrop click → close
    if (e.target === this) { closeBindingPicker(); return; }
    // Close button
    if (e.target.id === 'bpCloseBtn' || e.target.closest('#bpCloseBtn')) { closeBindingPicker(); return; }
    // Direct value selection
    var valBtn = e.target.closest('.behp-btn[data-bp-val]');
    if (valBtn) { selectBindingPickerValue(valBtn.dataset.bpVal); return; }
    // Param behavior → open sub-panel (keycode grid, action list, or raw)
    var paramBtn = e.target.closest('.behp-btn[data-bp-param]');
    if (paramBtn) { showBindingPickerSubPanel(paramBtn.dataset.bpParam); return; }
    // Sub-panel keycode click
    var kcBtn = e.target.closest('.bp-sub-btn[data-bp-kc]');
    if (kcBtn) {
      // If in multi-param mode, fill the appropriate keycode input
      var mpConfig = getBpMultiParamConfig(bpKeycodePrefix);
      if (mpConfig) {
        // Prefer the currently focused keycode input, else last keycode input
        var targetInput = null;
        var focused = document.activeElement;
        for (var pi = 0; pi < mpConfig.params.length; pi++) {
          if (mpConfig.params[pi].type === 'keycode') {
            var inp = document.getElementById('bpMultiP' + pi);
            if (inp && inp === focused) { targetInput = inp; break; }
          }
        }
        if (!targetInput) {
          for (var pi2 = mpConfig.params.length - 1; pi2 >= 0; pi2--) {
            if (mpConfig.params[pi2].type === 'keycode') {
              var inp2 = document.getElementById('bpMultiP' + pi2);
              if (inp2 && inp2.tagName === 'INPUT') { targetInput = inp2; break; }
            }
          }
        }
        if (targetInput) { targetInput.value = kcBtn.dataset.bpKc; return; }
      }
      // Direct select: for macro-hold, auto-insert 0
      var directMpConfig = getBpMultiParamConfig(bpKeycodePrefix);
      if (directMpConfig && directMpConfig.macroHold) {
        selectBindingPickerValue(bpKeycodePrefix + ' 0 ' + kcBtn.dataset.bpKc); return;
      }
      selectBindingPickerValue(bpKeycodePrefix + ' ' + kcBtn.dataset.bpKc); return;
    }
    // Sub-panel action click
    var actBtn = e.target.closest('.bp-sub-btn[data-bp-action]');
    if (actBtn) { selectBindingPickerValue(bpKeycodePrefix + ' ' + actBtn.dataset.bpAction); return; }
    // Multi-param Apply button
    if (e.target.id === 'bpMultiApply' || e.target.closest('#bpMultiApply')) {
      var mpConfig = getBpMultiParamConfig(bpKeycodePrefix);
      if (mpConfig) {
        var parts = [bpKeycodePrefix];
        // Macro-hold: auto-insert 0 as first param
        if (mpConfig.macroHold) parts.push('0');
        // Collect modifier checkboxes
        var mods = [];
        document.querySelectorAll('#bpMultiMods input[type=checkbox]:checked').forEach(function(cb) {
          mods.push(cb.dataset.mod);
        });
        // Find the last keycode param index (modifiers apply to it)
        var lastKcIdx = -1;
        mpConfig.params.forEach(function(p, idx) { if (p.type === 'keycode') lastKcIdx = idx; });
        mpConfig.params.forEach(function(p, idx) {
          var el = document.getElementById('bpMultiP' + idx);
          var val = el ? el.value.trim() : '';
          // Apply modifier wrapping only to the last keycode param
          if (p.type === 'keycode' && val && idx === lastKcIdx && mods.length) {
            mods.forEach(function(m) { val = m + '(' + val + ')'; });
          }
          if (val) parts.push(val);
        });
        selectBindingPickerValue(parts.join(' '));
      }
      return;
    }
    // Back from sub-panel
    if (e.target.id === 'bpSubBack' || e.target.closest('#bpSubBack')) { hideBindingPickerSubPanel(); return; }
    // Raw apply
    if (e.target.id === 'bpRawApply' || e.target.closest('#bpRawApply')) {
      var rawVal = document.getElementById('bpRawInput').value.trim();
      if (rawVal) selectBindingPickerValue(rawVal);
      return;
    }
  });
  // Raw input Enter key
  document.getElementById('bpRawInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      var rawVal = this.value.trim();
      if (rawVal) selectBindingPickerValue(rawVal);
    }
  });
  // Keycode search in sub-panel
  document.getElementById('bpKcSearch').addEventListener('input', function() {
    var q = this.value.trim().toLowerCase();
    document.getElementById('bpKcSearchClear').style.display = q ? '' : 'none';
    document.querySelectorAll('#bpSubScroll .bp-sub-btn').forEach(function(btn) {
      var kc = (btn.dataset.bpKc || '').toLowerCase();
      var desc = (btn.title || '').toLowerCase();
      btn.classList.toggle('hidden', q && kc.indexOf(q) === -1 && desc.indexOf(q) === -1);
    });
    document.querySelectorAll('#bpSubScroll .keycode-category').forEach(function(det) {
      var anyVisible = det.querySelectorAll('.bp-sub-btn:not(.hidden)').length > 0;
      det.style.display = anyVisible ? '' : 'none';
      if (q && anyVisible) det.open = true;
      if (!q) det.removeAttribute('style');
    });
  });
  document.getElementById('bpKcSearchClear').addEventListener('click', function() {
    document.getElementById('bpKcSearch').value = '';
    this.style.display = 'none';
    document.querySelectorAll('#bpSubScroll .bp-sub-btn').forEach(function(btn) { btn.classList.remove('hidden'); });
    document.querySelectorAll('#bpSubScroll .keycode-category').forEach(function(det) {
      det.removeAttribute('style');
    });
  });

  // Binding picker main search
  (function() {
    var bpSearch = document.getElementById('bpSearchInput');
    var bpClear = document.getElementById('bpSearchClear');
    bpSearch.addEventListener('input', function() {
      var q = this.value.toLowerCase().trim();
      bpClear.style.display = q ? '' : 'none';
      var cats = document.querySelectorAll('#bpSections .behp-cat');
      cats.forEach(function(det) {
        var btns = det.querySelectorAll('.behp-btn');
        var anyVisible = false;
        btns.forEach(function(btn) {
          var text = ((btn.dataset.bpVal || btn.dataset.bpParam || '') + ' ' + btn.textContent).toLowerCase();
          var match = !q || text.indexOf(q) >= 0;
          btn.classList.toggle('hidden', !match);
          if (match) anyVisible = true;
        });
        det.style.display = anyVisible ? '' : 'none';
        if (q && anyVisible) det.open = true;
      });
    });
    bpClear.addEventListener('click', function() {
      bpSearch.value = '';
      bpSearch.dispatchEvent(new Event('input'));
      bpSearch.focus();
    });
  })();

  // --- RGB Generator wiring (Tab 1) ---
  document.getElementById('parseBtn').onclick = parseUserCode;
  document.getElementById('rgbSyncNamesBtn').onclick = function() {
    if (layers.length === 0) { showStatus('userCodeStatus', 'No RGB layers to sync from'); return; }
    if (keymapLayers.length === 0) { showStatus('userCodeStatus', 'No keymap layers to sync to'); return; }
    var nameSyncCount = 0;
    var newLayerCount = 0;
    var keyCount = keyboardLayout ? keyboardLayout.length : 42;
    layers.forEach(function(rgbL) {
      if (rgbL.index === '' || rgbL.index === undefined) return;
      var idx = parseInt(rgbL.index);
      if (idx < 0 || isNaN(idx)) return;
      var rgbBase = baseKey(rgbL.name);
      if (!rgbBase) return;
      if (idx < keymapLayers.length) {
        if (keymapLayers[idx].status !== 'reserved') {
          keymapLayers[idx].displayName = rgbBase;
          keymapLayers[idx].name = rgbBase.toLowerCase() + '_' + idx;
          nameSyncCount++;
        }
      } else {
        while (keymapLayers.length <= idx) {
          var gapIdx = keymapLayers.length;
          var gapRgb = null;
          for (var gi = 0; gi < layers.length; gi++) {
            if (layers[gi].index === String(gapIdx)) { gapRgb = layers[gi]; break; }
          }
          var gapBase = gapRgb ? baseKey(gapRgb.name) : ('LAYER_' + gapIdx);
          keymapLayers.push({
            name: gapBase.toLowerCase() + '_' + gapIdx,
            displayName: gapBase,
            bindings: new Array(keyCount).fill('&trans'),
            status: 'active'
          });
          newLayerCount++;
        }
      }
    });
    if (nameSyncCount > 0 || newLayerCount > 0) {
      renderLayerTabs();
      renderKeyboardSvg('keyboardSvg');
      updateKeymapOutput();
    }
    var msg = 'Synced ' + nameSyncCount + ' layer name(s) → Keymap.';
    if (newLayerCount > 0) msg += ' Created ' + newLayerCount + ' new keymap layer(s).';
    showStatus('userCodeStatus', msg);
  };
  document.getElementById('addLayerBtn').onclick = addLayer;
  document.getElementById('addMacroBtn').onclick = addMacro;
  document.getElementById('addBehaviorBtn').onclick = addBehavior;
  document.getElementById('rgbUndoBtn').onclick = performRgbUndo;
  document.getElementById('rgbRedoBtn').onclick = performRgbRedo;
  document.getElementById('addComboBtn').onclick = addCombo;
  // Combo layer picker: append selected layer as tag
  document.getElementById('comboLayerPicker').onchange = function() {
    if (!this.value) return;
    var inp = document.getElementById('comboLayersInput');
    var cur = inp.value.trim();
    var parts = cur ? cur.split(/\s+/) : [];
    if (parts.indexOf(this.value) < 0) {
      parts.push(this.value);
      inp.value = parts.join(' ');
      renderComboLayerTags();
    }
    this.value = '';
  };
  document.getElementById('comboLayerTags').addEventListener('click', function(e) {
    if (e.target.classList.contains('tag-x')) {
      var layer = e.target.dataset.layer;
      var inp = document.getElementById('comboLayersInput');
      var parts = inp.value.trim().split(/\s+/).filter(function(p) { return p !== layer; });
      inp.value = parts.join(' ');
      renderComboLayerTags();
    }
  });
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
    else if (rgbComboSelectedPositions.length < 2) rgbComboSelectedPositions.push(ki);
    renderRgbComboMiniKb();
  });
  document.getElementById('addBlinkMacroBtn').onclick = addBlinkMacro;
  document.getElementById('copyOutputBtn').onclick = function() {
    var ta = document.getElementById('output');
    var text = ta.value;
    navigator.clipboard.writeText(text).catch(function() {
      ta.select(); document.execCommand('copy');
    });
  };
  document.getElementById('includeHelpers').onchange = updateRgbOutput;
  document.getElementById('macroType').onchange = function() {
    var g = document.getElementById('releaseColorGroup');
    var ni = document.getElementById('macroName');
    g.classList.add('hidden');
    if (this.value === 'MO_RGB') { g.classList.remove('hidden'); ni.placeholder = 'name_led'; }
    else { ni.placeholder = this.value === 'TO_RGB_PRESS' ? 'top_name' : 'to_name'; }
  };

  // Blink type selector wiring
  document.getElementById('blinkType').onchange = function() {
    var isMo = this.value === 'MO_BLINK';
    document.getElementById('blinkKeyGroup').style.display = isMo ? 'none' : '';
    document.getElementById('blinkLayerGroup').style.display = isMo ? '' : 'none';
    document.getElementById('blinkExperimentalNote').style.display = isMo ? '' : 'none';
  };

  // Macro editor sub-window wiring
  document.getElementById('meditType').onchange = function() {
    var rg = document.getElementById('meditReleaseGroup');
    rg.style.display = this.value === 'MO_RGB' ? '' : 'none';
  };
  document.getElementById('meditSaveBtn').onclick = function() {
    if (macroEditorIndex < 0 || macroEditorIndex >= macros.length) return;
    pushRgbUndo();
    var newType = document.getElementById('meditType').value;
    var rawName = document.getElementById('meditName').value.trim() || macros[macroEditorIndex].name;
    macros[macroEditorIndex].name = autoPrefix(rawName, newType);
    macros[macroEditorIndex].label = document.getElementById('meditLabel').value.trim();
    macros[macroEditorIndex].type = newType;
    macros[macroEditorIndex].layer = document.getElementById('meditLayer').value;
    macros[macroEditorIndex].color = document.getElementById('meditColor').value;
    macros[macroEditorIndex].releaseColor = newType === 'MO_RGB'
      ? document.getElementById('meditReleaseColor').value : '';
    closeMacroEditor();
    rgbRenderAll();
  };
  document.getElementById('meditCancelBtn').onclick = closeMacroEditor;
  document.getElementById('macroEditorOverlay').onclick = function(e) {
    if (e.target === this) closeMacroEditor();
  };

  // ---- Combo editor popup wiring ----
  document.getElementById('ceditSaveBtn').onclick = function() {
    if (comboEditorIndex < 0 || comboEditorIndex >= combos.length) return;
    pushRgbUndo();
    combos[comboEditorIndex].name = document.getElementById('ceditName').value.trim() || combos[comboEditorIndex].name;
    combos[comboEditorIndex].bind = document.getElementById('ceditBind').value.trim();
    combos[comboEditorIndex].layers = ceditGetLayers();
    combos[comboEditorIndex].pos = ceditSelectedPositions.slice().sort(function(a,b){return a-b;}).join(' ');
    closeComboEditor();
    rgbRenderAll();
  };
  document.getElementById('ceditCancelBtn').onclick = closeComboEditor;
  document.getElementById('comboEditorOverlay').onclick = function(e) {
    if (e.target === this) closeComboEditor();
  };
  document.getElementById('ceditLayerPicker').onchange = function() {
    if (!this.value) return;
    var cur = ceditGetLayers();
    var parts = cur ? cur.split(/\s+/) : [];
    if (parts.indexOf(this.value) < 0) {
      parts.push(this.value);
      ceditRenderLayerTags(parts.join(' '));
    }
    this.value = '';
  };
  document.getElementById('ceditLayerTags').onclick = function(e) {
    if (e.target.classList.contains('tag-x')) {
      var layer = e.target.dataset.layer;
      var cur = ceditGetLayers();
      var parts = cur.split(/\s+/).filter(function(p) { return p !== layer; });
      ceditRenderLayerTags(parts.join(' '));
    }
  };
  document.getElementById('ceditMiniKb').addEventListener('click', function(e) {
    var group = e.target.closest('.key-group');
    if (!group) return;
    var ki = parseInt(group.dataset.key);
    if (isNaN(ki)) return;
    var idx = ceditSelectedPositions.indexOf(ki);
    if (idx >= 0) ceditSelectedPositions.splice(idx, 1);
    else ceditSelectedPositions.push(ki);
    ceditRenderMiniKb();
  });

  // ---- Behavior editor popup wiring ----
  document.getElementById('beditSaveBtn').onclick = function() {
    if (behaviorEditorIndex < 0 || behaviorEditorIndex >= behaviors.length) return;
    pushRgbUndo();
    behaviors[behaviorEditorIndex].name = document.getElementById('beditName').value.trim() || behaviors[behaviorEditorIndex].name;
    behaviors[behaviorEditorIndex].label = document.getElementById('beditLabel').value.trim();
    behaviors[behaviorEditorIndex].macro = document.getElementById('beditMacro').value;
    closeBehaviorEditor();
    rgbRenderAll();
  };
  document.getElementById('beditCancelBtn').onclick = closeBehaviorEditor;
  document.getElementById('behaviorEditorOverlay').onclick = function(e) {
    if (e.target === this) closeBehaviorEditor();
  };

  document.getElementById('showOrphans').onchange = function() { renderLayerList(); updateRgbOutput(); };
  syncColorInputs();
  initCollapsible();
  initSubtabs();
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
      var oldId = currentLayoutId;
      loadLayout(json);
      // Update any existing parsed #include paths to use the new keyboard's dtsi name
      if (keymapParsedIncludes && oldId !== currentLayoutId) {
        keymapParsedIncludes = keymapParsedIncludes.map(function(inc) {
          return inc.replace(new RegExp('[a-z0-9_]+-rgb\\.dtsi', 'gi'), currentLayoutId + '-rgb.dtsi');
        });
      }
      renderKeyboardSvg('keyboardSvg');
      renderKeymapSensorList();
      updateKeymapOutput();
      document.getElementById('layoutJsonOverlay').style.display = 'none';
      showStatus('kmLayoutStatus', 'Layout loaded: ' + keyboardLayout.length + ' keys (' + currentLayoutId + ')');
    } catch(e) {
      alert('Invalid JSON: ' + e.message);
    }
  };
  document.getElementById('kmUseDefaultLayoutBtn').onclick = function() {
    loadLayout(DEFAULT_CORNE_LAYOUT);
    // Update parsed #include paths to use corne dtsi name (replaces any keyboard's -rgb.dtsi)
    if (keymapParsedIncludes) {
      keymapParsedIncludes = keymapParsedIncludes.map(function(inc) {
        return inc.replace(/[a-z0-9_]+-rgb\.dtsi/gi, 'corne-rgb.dtsi');
      });
    }
    renderKeyboardSvg('keyboardSvg');
    renderKeymapSensorList();
    updateKeymapOutput();
    showStatus('kmLayoutStatus', 'Default Corne layout loaded (42 keys)');
  };
  document.getElementById('kmUseLotus58Btn').onclick = function() {
    loadLayout(DEFAULT_LOTUS58_LAYOUT);
    // Update parsed #include paths to use lotus58 dtsi name (replaces any keyboard's -rgb.dtsi)
    if (keymapParsedIncludes) {
      keymapParsedIncludes = keymapParsedIncludes.map(function(inc) {
        return inc.replace(/[a-z0-9_]+-rgb\.dtsi/gi, 'lotus58-rgb.dtsi');
      });
    }
    renderKeyboardSvg('keyboardSvg');
    renderKeymapSensorList();
    updateKeymapOutput();
    showStatus('kmLayoutStatus', 'Lotus58 layout loaded (60 keys)');
  };

  // Keymap parse
  document.getElementById('kmParseBtn').onclick = function() {
    var text = document.getElementById('kmKeymapPaste').value;
    if (!text.trim()) { alert('Paste a .keymap file first'); return; }
    parseKeymap(text);
    // Auto-detect layout based on key count
    if (keymapLayers.length > 0) {
      var bindCount = keymapLayers[0].bindings.length;
      if (bindCount >= 58 && currentLayoutId !== 'lotus58') {
        loadLayout(DEFAULT_LOTUS58_LAYOUT);
      } else if (bindCount <= 42 && currentLayoutId !== 'corne') {
        loadLayout(DEFAULT_CORNE_LAYOUT);
      }
    }
    activeLayerIndex = 0;
    selectedKeyIndex = -1;
    document.getElementById('bindingEditor').classList.remove('visible');
    renderLayerTabs();
    populateBehaviorDropdown();
    renderKeyboardSvg('keyboardSvg');
    renderKeymapComboList();
    renderKeymapMacroList();
    renderBuiltinBehaviorToggles();
    renderKeymapBehaviorList();
    renderKeymapCondLayerList();
    renderKeymapSensorList();
    updateKeymapOutput();
    showStatus('kmParseStatus', 'Parsed: ' + keymapLayers.length + ' layers, ' + keymapCombos.length + ' combos, ' + keymapMacros.length + ' macros, ' + keymapBehaviors.length + ' behaviors, ' + keymapConditionalLayers.length + ' cond. layers');
  };

  document.getElementById('kmSyncNamesBtn').onclick = function() {
    if (keymapLayers.length === 0) { showStatus('kmParseStatus', 'No keymap layers to sync from'); return; }
    if (layers.length === 0) { showStatus('kmParseStatus', 'No RGB layers to sync to'); return; }
    var synced = 0;
    var renameMap = {};
    keymapLayers.forEach(function(kl, idx) {
      if (kl.status === 'reserved') return;
      var idxStr = String(idx);
      for (var ri = 0; ri < layers.length; ri++) {
        if (layers[ri].index === idxStr) {
          var newBase = kl.displayName
            ? kl.displayName.toUpperCase().replace(/[^A-Z0-9_]/g, '_')
            : baseKey(kl.name);
          if (!newBase) break;
          var oldName = layers[ri].name;
          var newName;
          if (/^L_/i.test(oldName))      newName = 'L_' + newBase;
          else if (/^LAYER_/i.test(oldName)) newName = 'LAYER_' + newBase;
          else                           newName = newBase;
          if (oldName !== newName) { renameMap[oldName] = newName; }
          layers[ri].name = newName;
          synced++;
          break;
        }
      }
    });
    propagateLayerRenames(renameMap);
    if (synced > 0) rgbRenderAll();
    showStatus('kmParseStatus', 'Synced ' + synced + ' layer name(s) → RGB tab');
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
    document.querySelectorAll('#beKeycodeSection .keycode-category').forEach(function(det) {
      var anyVisible = det.querySelectorAll('.keycode-btn:not(.hidden)').length > 0;
      det.style.display = anyVisible ? '' : 'none';
      if (q && anyVisible) det.open = true;
      if (!q) det.removeAttribute('style');
    });
  });
  kcSearchClear.addEventListener('click', function() {
    kcSearchInput.value = '';
    kcSearchClear.style.display = 'none';
    document.querySelectorAll('#beKeycodeSection .keycode-btn').forEach(function(btn) {
      btn.classList.remove('hidden');
    });
    document.querySelectorAll('#beKeycodeSection .keycode-category').forEach(function(det) {
      det.removeAttribute('style');
    });
  });

  // Keyboard SVG click → opens binding editor popup
  document.getElementById('keyboardSvg').addEventListener('click', function(e) {
    var group = e.target.closest('.key-group');
    if (!group) return;
    var keyIdx = parseInt(group.dataset.key);
    if (isNaN(keyIdx)) return;
    if (keymapLayers.length === 0) return;

    selectedKeyIndex = keyIdx;
    renderKeyboardSvg('keyboardSvg');
    showBindingEditor(keyIdx);
  });

  // Binding editor behavior trigger button → opens behavior picker
  document.getElementById('beBehaviorTrigger').addEventListener('click', function() {
    openBehaviorPicker();
  });

  // Behavior picker: click a behavior button
  document.getElementById('behpCategories').addEventListener('click', function(e) {
    var btn = e.target.closest('.behp-btn');
    if (!btn) return;
    selectBehaviorPickerItem(btn.dataset.behp);
  });

  // Behavior picker: close button
  document.getElementById('behpCloseBtn').addEventListener('click', closeBehaviorPicker);

  // Behavior picker: click overlay background to close
  document.getElementById('behaviorPickerOverlay').addEventListener('click', function(e) {
    if (e.target === this) closeBehaviorPicker();
  });

  // Behavior picker: search filter
  (function() {
    var searchInput = document.getElementById('behpSearchInput');
    var clearBtn = document.getElementById('behpSearchClear');
    searchInput.addEventListener('input', function() {
      var q = this.value.toLowerCase().trim();
      clearBtn.style.display = q ? '' : 'none';
      var cats = document.querySelectorAll('#behpCategories .behp-cat');
      cats.forEach(function(det) {
        var btns = det.querySelectorAll('.behp-btn');
        var anyVisible = false;
        btns.forEach(function(btn) {
          var text = (btn.dataset.behp + ' ' + btn.textContent).toLowerCase();
          var match = !q || text.indexOf(q) >= 0;
          btn.classList.toggle('hidden', !match);
          if (match) anyVisible = true;
        });
        det.style.display = anyVisible ? '' : 'none';
        if (q && anyVisible) det.open = true;
      });
    });
    clearBtn.addEventListener('click', function() {
      searchInput.value = '';
      searchInput.dispatchEvent(new Event('input'));
      searchInput.focus();
    });
  })();

  // Keycode grid click (handles both built-in & custom hold-tap 2-param behaviors)
  document.querySelectorAll('.keycode-grid').forEach(function(grid) {
    grid.addEventListener('click', function(e) {
      var btn = e.target.closest('.keycode-btn');
      if (!btn) return;
      var kc = btn.dataset.kc;
      // Determine which param to fill
      var behavior = document.getElementById('beBehavior').value;
      var p2El = document.getElementById('beParam2');
      // Check for macro-hold custom behavior (only has Param 1 = tap keycode)
      var clickCustomBeh = keymapBehaviors.find(function(c) { return '&' + c.name === behavior; });
      var clickIsMacroHold = false;
      if (clickCustomBeh && (clickCustomBeh.type === 'hold-tap' || clickCustomBeh.type === 'layer-tap')) {
        var clickHold = clickCustomBeh.config && clickCustomBeh.config.holdBinding ? clickCustomBeh.config.holdBinding : '';
        var clickIsLayer = (clickHold === '&mo' || clickHold === '&to' || clickHold === '&tog' || clickHold === '&sl' || clickCustomBeh.type === 'layer-tap');
        var clickIsKp = (clickHold === '&kp');
        clickIsMacroHold = (!clickIsLayer && !clickIsKp && clickHold);
      }
      if (clickIsMacroHold) {
        // Macro-hold: only Param 1 exists (the tap keycode)
        var p1mh = document.getElementById('beParam1');
        if (p1mh) p1mh.value = kc;
      } else if (p2El && (behavior === '&lt' || behavior === '&mt')) {
        p2El.value = kc;
      } else {
        // For custom hold-taps with visible beParam2, fill Param 2
        var customBeh = keymapBehaviors.find(function(c) { return '&' + c.name === behavior; });
        if (p2El && customBeh && (customBeh.type === 'hold-tap' || customBeh.type === 'layer-tap')) {
          p2El.value = kc;
        } else {
          var p1El = document.getElementById('beParam1');
          if (p1El) p1El.value = kc;
        }
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
  // Close binding editor on backdrop click
  document.getElementById('bindingEditor').onclick = function(e) {
    if (e.target === this) cancelBindingEditor();
  };

  // --- Undo/Redo button clicks ---
  document.getElementById('kmUndoBtn').onclick = performUndo;
  document.getElementById('kmRedoBtn').onclick = performRedo;

  // --- Global keyboard shortcuts ---
  document.addEventListener('keydown', function(e) {
    var tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select' || e.target.isContentEditable) return;
    var rgbVisible = document.getElementById('tabRgb').classList.contains('active');
    var kmVisible = document.getElementById('tabKeymap').classList.contains('active');
    if (e.ctrlKey && !e.shiftKey && e.key === 'z') {
      e.preventDefault();
      if (rgbVisible) performRgbUndo(); else if (kmVisible) performUndo();
    } else if ((e.ctrlKey && e.key === 'y') || (e.ctrlKey && e.shiftKey && e.key === 'z') || (e.ctrlKey && e.shiftKey && e.key === 'Z')) {
      e.preventDefault();
      if (rgbVisible) performRgbRedo(); else if (kmVisible) performRedo();
    } else if (e.key === 'Escape' && kmVisible) {
      // Close popups in order: binding picker → behavior picker → binding editor
      if (document.getElementById('bindingPickerOverlay').classList.contains('visible')) {
        closeBindingPicker();
      } else if (document.getElementById('behaviorPickerOverlay').classList.contains('visible')) {
        closeBehaviorPicker();
      } else {
        cancelBindingEditor(); closeValuePicker();
      }
    }
  });

  // --- Floating ValuePicker events ---
  document.getElementById('vpOverlay').addEventListener('click', function(e) {
    // Click outside dialog → close
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
  document.getElementById('kmIncludeRgbDtsi').onchange = function() { updateKeymapOutput(); };
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
        renderBuiltinBehaviorToggles();
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

  // --- Inline layer name/display editing ---
  var _lcUndoPushed = false;
  function lcInlineHandler(e) {
    var layer = keymapLayers[activeLayerIndex];
    if (!layer) return;
    if (!_lcUndoPushed) { _lcUndoPushed = true; pushUndo(); }
    var newName = document.getElementById('lcInlineName').value.trim();
    var newDisplay = document.getElementById('lcInlineDisplay').value.trim();
    if (newName) layer.name = newName.toLowerCase().replace(/[^a-z0-9_]/g, '_');
    layer.displayName = newDisplay || layer.name;
    renderLayerTabs();
    updateKeymapOutput();
  }
  document.getElementById('lcInlineName').addEventListener('input', lcInlineHandler);
  document.getElementById('lcInlineDisplay').addEventListener('input', lcInlineHandler);
  document.getElementById('lcInlineName').addEventListener('blur', function() { _lcUndoPushed = false; });
  document.getElementById('lcInlineDisplay').addEventListener('blur', function() { _lcUndoPushed = false; });

  // --- Combo editor ---
  document.getElementById('kmAddComboBtn').onclick = function() {
    editingComboIndex = -1;
    comboSelectedPositions = [];
    document.getElementById('kmComboName').value = 'combo_' + keymapCombos.length;
    document.getElementById('kmComboBindWrap').innerHTML = bindingSelectHTML('kmComboBind', '&kp ESC', 'binding', '180px');
    document.getElementById('kmComboTimeout').value = '50';
    document.getElementById('kmComboLayerPicker').innerHTML = '<option value="">+ Add layer</option>' + kmComboLayerOptionsHTML();
    kmComboRenderLayerTags('');
    document.getElementById('kmComboSlowRelease').checked = false;
    document.getElementById('kmComboRequirePriorIdle').value = '';
    document.getElementById('kmComboOverlay').classList.add('visible');
    renderComboMiniKb();
  };
  document.getElementById('kmComboSaveBtn').onclick = function() {
    pushUndo();
    var combo = {
      name: document.getElementById('kmComboName').value || 'combo_' + keymapCombos.length,
      binding: getBehBindingValue('kmComboBind'),
      positions: comboSelectedPositions.slice().sort(function(a,b) { return a-b; }),
      layers: kmComboGetLayers(),
      timeout: parseInt(document.getElementById('kmComboTimeout').value) || 50,
      slowRelease: document.getElementById('kmComboSlowRelease').checked,
      requirePriorIdle: document.getElementById('kmComboRequirePriorIdle').value
    };
    if (editingComboIndex >= 0) {
      combo._fromEditor = keymapCombos[editingComboIndex]._fromEditor || false;
      keymapCombos[editingComboIndex] = combo;
    } else {
      combo._fromEditor = true;
      keymapCombos.push(combo);
    }
    document.getElementById('kmComboOverlay').classList.remove('visible');
    editingComboIndex = -1;
    renderKeymapComboList();
    updateKeymapOutput();
  };

  // Cancel combo editing — hide overlay and reset state
  function closeComboOverlay() {
    document.getElementById('kmComboOverlay').classList.remove('visible');
    editingComboIndex = -1;
  }
  document.getElementById('kmComboCancelBtn').onclick = closeComboOverlay;
  document.getElementById('kmComboCancelBtn2').onclick = closeComboOverlay;
  document.getElementById('kmComboOverlay').addEventListener('click', function(e) {
    if (e.target === this) closeComboOverlay();
  });

  // Combo layer picker: add layer as tag chip
  document.getElementById('kmComboLayerPicker').onchange = function() {
    if (!this.value) return;
    var cur = kmComboGetLayers();
    var parts = cur ? cur.split(/\s+/) : [];
    if (parts.indexOf(this.value) < 0) {
      parts.push(this.value);
      kmComboRenderLayerTags(parts.join(' '));
    }
    this.value = '';
  };
  // Combo layer tags: remove on × click
  document.getElementById('kmComboLayerTags').onclick = function(e) {
    if (e.target.classList.contains('tag-x')) {
      var layer = e.target.dataset.layer;
      var cur = kmComboGetLayers();
      var parts = cur.split(/\s+/).filter(function(p) { return p !== layer; });
      kmComboRenderLayerTags(parts.join(' '));
    }
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
      document.getElementById('kmComboBindWrap').innerHTML = bindingSelectHTML('kmComboBind', c.binding, 'binding', '180px');
      document.getElementById('kmComboTimeout').value = c.timeout;
      document.getElementById('kmComboLayerPicker').innerHTML = '<option value="">+ Add layer</option>' + kmComboLayerOptionsHTML();
      kmComboRenderLayerTags(c.layers || '');
      document.getElementById('kmComboSlowRelease').checked = !!c.slowRelease;
      document.getElementById('kmComboRequirePriorIdle').value = c.requirePriorIdle || '';
      comboSelectedPositions = c.positions ? c.positions.slice() : [];
      renderComboMiniKb();
      document.getElementById('kmComboOverlay').classList.add('visible');
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
    document.getElementById('kmMacroOverlay').classList.add('visible');
    renderMacroSteps();
  };
  function closeMacroOverlay() {
    if (macroAddedViaButton && undoStack.length > 0) {
      performUndo();
    }
    macroAddedViaButton = false;
    document.getElementById('kmMacroOverlay').classList.remove('visible');
    editingMacroIndex = -1;
    renderKeymapMacroList();
  }
  document.getElementById('kmMacroCancelBtn').onclick = closeMacroOverlay;
  document.getElementById('kmMacroCancelBtn2').onclick = closeMacroOverlay;
  document.getElementById('kmMacroOverlay').addEventListener('click', function(e) {
    if (e.target === this) closeMacroOverlay();
  });
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
    document.getElementById('kmMacroOverlay').classList.remove('visible');
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
    document.getElementById('stringSeqInput').value = '';
    document.getElementById('stringSeqPreview').textContent = '';
    document.getElementById('stringSeqOverlay').classList.add('visible');
  };
  document.getElementById('stringSeqInput').addEventListener('input', function() {
    var str = this.value;
    if (!str) { document.getElementById('stringSeqPreview').textContent = ''; return; }
    var preview = [];
    for (var ci = 0; ci < str.length && ci < 60; ci++) {
      var kc = charToZmkKeycode(str[ci]);
      if (kc) preview.push('&kp ' + kc);
    }
    if (str.length > 60) preview.push('... +' + (str.length - 60) + ' more');
    document.getElementById('stringSeqPreview').textContent = preview.join(', ');
  });
  document.getElementById('stringSeqAddBtn').onclick = function() {
    if (editingMacroIndex < 0) return;
    var str = document.getElementById('stringSeqInput').value;
    if (!str) return;
    var macro = keymapMacros[editingMacroIndex];
    var lastStep = macro.steps.length > 0 ? macro.steps[macro.steps.length - 1] : '';
    if (lastStep !== '&macro_tap') {
      macro.steps.push('&macro_tap');
    }
    for (var ci = 0; ci < str.length; ci++) {
      var ch = str[ci];
      var kc = charToZmkKeycode(ch);
      if (kc) macro.steps.push('&kp ' + kc);
    }
    document.getElementById('stringSeqOverlay').classList.remove('visible');
    renderMacroSteps();
  };
  document.getElementById('stringSeqCancelBtn').onclick = function() {
    document.getElementById('stringSeqOverlay').classList.remove('visible');
  };
  document.getElementById('stringSeqCloseBtn').onclick = function() {
    document.getElementById('stringSeqOverlay').classList.remove('visible');
  };
  document.getElementById('stringSeqOverlay').addEventListener('click', function(e) {
    if (e.target === this) this.classList.remove('visible');
  });

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
    if (e.target.dataset.stepPick !== undefined && editingMacroIndex >= 0) {
      openMacroKcSearch(parseInt(e.target.dataset.stepPick), e.target, 'data-step-params');
    }
    if (e.target.dataset.stepPick1 !== undefined && editingMacroIndex >= 0) {
      openMacroKcSearch(parseInt(e.target.dataset.stepPick1), e.target, 'data-step-param1');
    }
    if (e.target.dataset.stepPick2 !== undefined && editingMacroIndex >= 0) {
      openMacroKcSearch(parseInt(e.target.dataset.stepPick2), e.target, 'data-step-param2');
    }
    // Step type trigger button — open popup picker
    var typeTrigger = e.target.closest('[data-step-type-trigger]');
    if (typeTrigger && editingMacroIndex >= 0) {
      openMacroStepTypePicker(parseInt(typeTrigger.dataset.stepTypeTrigger), typeTrigger);
    }
    // Step behavior trigger button — open binding picker popup
    var behTrigger = e.target.closest('[data-step-beh-trigger]');
    if (behTrigger && editingMacroIndex >= 0) {
      openMacroStepBehPicker(parseInt(behTrigger.dataset.stepBehTrigger));
    }
  });

  // Handle macro step dropdown changes (params only — step-type and behavior now use popup pickers)
  document.getElementById('kmMacroSteps').addEventListener('change', function(e) {
    // Handle structured param dropdown changes (param1/param2)
    if (e.target.dataset.stepParam1 !== undefined && editingMacroIndex >= 0) {
      updateMacroBindingStep(parseInt(e.target.dataset.stepParam1));
    }
    if (e.target.dataset.stepParam2 !== undefined && editingMacroIndex >= 0) {
      updateMacroBindingStep(parseInt(e.target.dataset.stepParam2));
    }
  });

  // Handle macro step parameter changes (params, param1, param2, time, raw)
  document.getElementById('kmMacroSteps').addEventListener('input', function(e) {
    if (editingMacroIndex < 0) return;
    var stepIdx;
    if (e.target.dataset.stepParams !== undefined) {
      updateMacroBindingStep(parseInt(e.target.dataset.stepParams));
    }
    if (e.target.dataset.stepParam1 !== undefined) {
      updateMacroBindingStep(parseInt(e.target.dataset.stepParam1));
    }
    if (e.target.dataset.stepParam2 !== undefined) {
      updateMacroBindingStep(parseInt(e.target.dataset.stepParam2));
    }
    if (e.target.dataset.stepTime !== undefined) {
      stepIdx = parseInt(e.target.dataset.stepTime);
      var classified2 = classifyMacroStep(keymapMacros[editingMacroIndex].steps[stepIdx]);
      keymapMacros[editingMacroIndex].steps[stepIdx] = macroStepToString(classified2.type, { time: e.target.value });
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
      document.getElementById('kmMacroOverlay').classList.add('visible');
      renderMacroSteps();
    }
  });

  // --- Built-in behavior toggles ---
  document.getElementById('builtinBehaviorToggles').addEventListener('change', function(e) {
    var cb = e.target;
    if (cb.type !== 'checkbox' || !cb.dataset.builtinId) return;
    toggleBuiltinBehavior(cb.dataset.builtinId, cb.checked);
  });

  // --- Behavior editor ---
  document.getElementById('kmAddBehaviorBtn').onclick = function() {
    editingBehaviorIndex = -1;
    behPositionalSelectedPositions = [];
    document.getElementById('kmBehaviorName').value = 'new_behavior';
    document.getElementById('kmBehaviorType').value = 'hold-tap';
    document.getElementById('kmBehaviorLabel').value = '';
    showBehaviorConfig('hold-tap');
    document.getElementById('kmBehaviorOverlay').classList.add('visible');
  };
  document.getElementById('kmBehaviorType').onchange = function() {
    showBehaviorConfig(this.value);
  };
  // Positional hold mini keyboard click handler (delegated on config container)
  document.getElementById('kmBehaviorConfig').addEventListener('click', function(e) {
    var group = e.target.closest('.key-group');
    if (!group) return;
    var mkb = e.target.closest('#behPositionalMiniKb');
    if (!mkb) return;
    var ki = parseInt(group.dataset.key);
    if (isNaN(ki)) return;
    var idx = behPositionalSelectedPositions.indexOf(ki);
    if (idx >= 0) behPositionalSelectedPositions.splice(idx, 1);
    else behPositionalSelectedPositions.push(ki);
    renderBehPositionalMiniKb();
  });
  function closeBehaviorOverlay() {
    document.getElementById('kmBehaviorOverlay').classList.remove('visible');
    editingBehaviorIndex = -1;
  }
  document.getElementById('kmBehaviorCancelBtn').onclick = closeBehaviorOverlay;
  document.getElementById('kmBehaviorCancelBtn2').onclick = closeBehaviorOverlay;
  document.getElementById('kmBehaviorOverlay').addEventListener('click', function(e) {
    if (e.target === this) closeBehaviorOverlay();
  });
  document.getElementById('kmBehaviorSaveBtn').onclick = function() {
    pushUndo();
    var type = document.getElementById('kmBehaviorType').value;
    var config = {};
    if (type === 'hold-tap') {
      config = {
        tappingTerm: document.getElementById('kmBehTappingTerm').value || '200',
        flavor: document.getElementById('kmBehFlavor').value,
        holdBinding: getBehBindingValue('kmBehHoldBinding'),
        tapBinding: getBehBindingValue('kmBehTapBinding'),
        quickTap: document.getElementById('kmBehQuickTap').value || '',
        requirePriorIdle: document.getElementById('kmBehRequirePriorIdle').value || '',
        holdTriggerPositions: document.getElementById('kmBehHoldTriggerPositions').value || '',
        retroTap: document.getElementById('kmBehRetroTap').checked,
        holdWhileUndecided: document.getElementById('kmBehHoldWhileUndecided').checked,
        holdWhileUndecidedLinger: document.getElementById('kmBehHoldWhileUndecidedLinger').checked,
        holdTriggerOnRelease: document.getElementById('kmBehHoldTriggerOnRelease').checked,
        globalQuickTap: document.getElementById('kmBehGlobalQuickTap').checked
      };
    } else if (type === 'tap-dance') {
      config = {
        tappingTerm: document.getElementById('kmBehTappingTerm').value || '200',
        bindings: tdSlotsSerialized()
      };
    } else if (type === 'mod-morph') {
      config = {
        normalBinding: getBehBindingValue('kmBehMmNormal'),
        morphedBinding: getBehBindingValue('kmBehMmMorphed'),
        mods: getBehBindingValue('kmBehMmMods')
      };
    } else if (type === 'sticky-key') {
      config = {
        releaseAfter: document.getElementById('kmBehSkRelease').value || '1000',
        binding: getBehBindingValue('kmBehSkBinding'),
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
        sensorCW: getBehBindingValue('kmBehSensorCW'),
        sensorCCW: getBehBindingValue('kmBehSensorCCW'),
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
        mods: getBehBindingValue('kmBehCwMods') || ''
      };
    }
    var beh = {
      name: document.getElementById('kmBehaviorName').value || 'new_behavior',
      type: type,
      label: document.getElementById('kmBehaviorLabel').value,
      config: config
    };
    if (editingBehaviorIndex >= 0) {
      beh._fromEditor = true;
      keymapBehaviors[editingBehaviorIndex] = beh;
    } else {
      beh._fromEditor = true;
      keymapBehaviors.push(beh);
    }
    document.getElementById('kmBehaviorOverlay').classList.remove('visible');
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
      // Parse positional hold positions into array before rendering config
      var posStr = (b.config && b.config.holdTriggerPositions) || '';
      behPositionalSelectedPositions = posStr.trim() ? posStr.trim().split(/[\s,]+/).map(Number).filter(function(n) { return !isNaN(n); }) : [];
      showBehaviorConfig(b.type);
      // Fill config fields
      if (b.type === 'hold-tap') {
        document.getElementById('kmBehTappingTerm').value = b.config.tappingTerm || '200';
        document.getElementById('kmBehFlavor').value = b.config.flavor || 'tap-preferred';
        setBehBindingValue('kmBehHoldBinding', b.config.holdBinding || '');
        setBehBindingValue('kmBehTapBinding', b.config.tapBinding || '');
        document.getElementById('kmBehQuickTap').value = b.config.quickTap || '';
        document.getElementById('kmBehRequirePriorIdle').value = b.config.requirePriorIdle || '';
        document.getElementById('kmBehRetroTap').checked = !!b.config.retroTap;
        document.getElementById('kmBehHoldWhileUndecided').checked = !!b.config.holdWhileUndecided;
        document.getElementById('kmBehHoldWhileUndecidedLinger').checked = !!b.config.holdWhileUndecidedLinger;
        document.getElementById('kmBehHoldTriggerOnRelease').checked = !!b.config.holdTriggerOnRelease;
        document.getElementById('kmBehGlobalQuickTap').checked = !!b.config.globalQuickTap;
      } else if (b.type === 'tap-dance') {
        document.getElementById('kmBehTappingTerm').value = b.config.tappingTerm || '200';
        tdSlotBindings = parseTdBindings(b.config.bindings || '');
        renderTdSlots();
      } else if (b.type === 'mod-morph') {
        setBehBindingValue('kmBehMmNormal', b.config.normalBinding || '');
        setBehBindingValue('kmBehMmMorphed', b.config.morphedBinding || '');
        setBehBindingValue('kmBehMmMods', b.config.mods || '');
      } else if (b.type === 'sticky-key') {
        document.getElementById('kmBehSkRelease').value = b.config.releaseAfter || '1000';
        setBehBindingValue('kmBehSkBinding', b.config.binding || '');
        document.getElementById('kmBehSkQuickRelease').checked = !!b.config.quickRelease;
        document.getElementById('kmBehSkLazy').checked = !!b.config.lazy;
        document.getElementById('kmBehSkIgnoreMods').checked = !!b.config.ignoreMods;
      } else if (b.type === 'macro') {
        document.getElementById('kmBehMacroParams').value = b.config.macroParams || '0';
        document.getElementById('kmBehMacroWait').value = b.config.macroWait || '';
        document.getElementById('kmBehMacroTap').value = b.config.macroTap || '';
        document.getElementById('kmBehMacroBindings').value = b.config.macroBindings || '';
      } else if (b.type === 'sensor-rotate') {
        setBehBindingValue('kmBehSensorCW', b.config.sensorCW || '');
        setBehBindingValue('kmBehSensorCCW', b.config.sensorCCW || '');
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
        setBehBindingValue('kmBehCwMods', b.config.mods || '');
      }
      document.getElementById('kmBehaviorOverlay').classList.add('visible');
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
    document.getElementById('kmCondLayerOverlay').classList.add('visible');
  };
  function closeCondLayerOverlay() {
    document.getElementById('kmCondLayerOverlay').classList.remove('visible');
    editingCondLayerIndex = -1;
  }
  document.getElementById('kmCondCancelBtn').onclick = closeCondLayerOverlay;
  document.getElementById('kmCondCancelBtn2').onclick = closeCondLayerOverlay;
  document.getElementById('kmCondLayerOverlay').addEventListener('click', function(e) {
    if (e.target === this) closeCondLayerOverlay();
  });
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
    document.getElementById('kmCondLayerOverlay').classList.remove('visible');
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
      var ifSel = document.getElementById('kmCondIfLayers');
      for (var oi = 0; oi < ifSel.options.length; oi++) {
        ifSel.options[oi].selected = c.ifLayers.indexOf(parseInt(ifSel.options[oi].value)) >= 0;
      }
      document.getElementById('kmCondThenLayer').value = c.thenLayer;
      document.getElementById('kmCondLayerOverlay').classList.add('visible');
    }
  });

  // --- List search/filter for combos, macros, behaviors, conditional layers ---
  function setupListSearch(searchId, clearId, listId) {
    var searchInput = document.getElementById(searchId);
    var clearBtn = document.getElementById(clearId);
    if (!searchInput || !clearBtn) return;
    searchInput.addEventListener('input', function() {
      var q = this.value.toLowerCase().trim();
      clearBtn.style.display = q ? '' : 'none';
      var items = document.getElementById(listId).querySelectorAll('.item');
      items.forEach(function(item) {
        var text = item.textContent.toLowerCase();
        item.style.display = (q && text.indexOf(q) < 0) ? 'none' : '';
      });
    });
    clearBtn.addEventListener('click', function() {
      searchInput.value = '';
      clearBtn.style.display = 'none';
      document.getElementById(listId).querySelectorAll('.item').forEach(function(item) {
        item.style.display = '';
      });
    });
  }
  setupListSearch('comboListSearch', 'comboListSearchClear', 'kmComboList');
  setupListSearch('macroListSearch', 'macroListSearchClear', 'kmMacroList');
  setupListSearch('behaviorListSearch', 'behaviorListSearchClear', 'kmBehaviorList');
  setupListSearch('condLayerListSearch', 'condLayerListSearchClear', 'kmCondLayerList');

  // Macro step search inside popup — filters visible steps
  (function() {
    var stepSearch = document.getElementById('macroStepSearch');
    var stepClear = document.getElementById('macroStepSearchClear');
    if (!stepSearch || !stepClear) return;
    stepSearch.addEventListener('input', function() {
      var q = this.value.toLowerCase().trim();
      stepClear.style.display = q ? '' : 'none';
      var steps = document.getElementById('kmMacroSteps').querySelectorAll('.macro-step');
      steps.forEach(function(step) {
        var text = step.textContent.toLowerCase();
        step.style.display = (q && text.indexOf(q) < 0) ? 'none' : '';
      });
    });
    stepClear.addEventListener('click', function() {
      stepSearch.value = '';
      stepClear.style.display = 'none';
      document.getElementById('kmMacroSteps').querySelectorAll('.macro-step').forEach(function(step) {
        step.style.display = '';
      });
    });
  })();

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
  renderBuiltinBehaviorToggles();
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
</script>
</body>
</html>
