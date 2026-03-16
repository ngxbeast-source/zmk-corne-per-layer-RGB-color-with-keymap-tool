# PandaKB ZMK Corne v3 RGB BLE — Per-Layer RGB

## Overview

This is a **VERY AMATEUR** attempt at implementing "Per-layer RGB colors into the firmware". There were a couple of roadblocks, but after much further reading, and thought, I came up with my own, albeit very messy, firmware utilizing macros and hold-taps to get this effect. This was just a small weekend project to help me understand ZMK a little bit more and to have a little "fun" with my build. I have the macros and hold-taps the way I like it, you're free to change the code if you wish, I'm sure there are ways I could simplify this code even more since I dont really know much at all; but for now it functions. This is more explained for someone, like myself, who has no background in ANY coding.
## Attribution
- Thanks to Nick Coutsos with his keymap editor (https://nickcoutsos.github.io/keymap-editor/) for helping me create macros and hold-taps. His website helped a total noob like myself the "right" way to structure this for my first time ever digging into code.
- And surprisingly CoPilot as well, for being able to work with my framework and show me some new tricks that I'm sure more seasoned veteran coders know about.
- This project is experimental; reuse at your own risk. 

Enjoy — Pull requests or suggestions to simplify and improve the code are welcome. Hopefully there is more work in the future with the RGB functionality, my knowledge is non-existent coming to this stuff; this was mostly done with the help of the docs so the idea is nothing new. It's just a fun little thing to make your keyboard do in the mean time until more RGB functions are upstreamed.

---

## Table of contents
- [Highlights / Features](#highlights--features)
- [Files of interest](#files-of-interest)
- [How it works](#how-it-works)
- [Game layer](#game-layer)
- [Toggle-Layer system](#toggle-layer-layer-system)
- [Notes and caveats](#notes-and-caveats)
- [AI update](#ai-update)
- [To Do](#to-do)
---

## Highlights / Features

- 13 layers (each with its own RGB color). The default/base layer uses a warm, dim orange/yellow.
- A deliberately designed "game" layer to reduce accidental activation.
- A deliberately designed "Toggle Layer" function for multiple dedicated layers
- Per-layer RGB macro definitions moved out of the main keymap into a separate file for maintainability.
- Layer RGB activation uses hold-taps and combo patterns to avoid running macros on simple taps.
- A CapsLock blink indicator has been implemented (logic can be improved); can extend to NumLock or other indicators.
- The `config/corne-rgb.dtsi` file should in theory work in any other keyboard since it doesn't affect the key map. We can isolate the RGB functions into one file for easier editing while only worrying about the layers in the .keymap file. (ty AI)

---

## Files of Interest

- `config/corne.keymap` — main keymap (focused on layer bindings).
- `config/corne-rgb.dtsi` — RGB macros and combos (per-layer color definitions and modular macros).
  - Include it in your `.keymap` with: `#include "corne-rgb.dtsi"` (adjust filename as needed).

---

## How It Works

- Layer color changes are triggered by macros in conjunction with `hold-taps`. This prevents unintended LED changes on simple taps.
- Hold-tap behavior is used to simulate home-row-mod behaviour for layer activation, while macros run only when the layer is actually activated.
- Combos are used for deliberate multi-key activation (for example, the game layer requires a simultaneous press of two keys on separate halves).
- Further instructions can be found in the `"corne-rgb.dtsi"`, I tried my best to format it to be understandable, my peanutbrain was running on bong water, cigarettes, and solder fumes at 3AM (much liek now)

---

## Game Layer

- Activation: press the top-left key on the left half AND the top-right key on the right half at the same time. This toggles the "game" layer and sets its RGB color.
- Deactivation: press the same combo again to return to the base layer and its color.
- The game layer includes a nested "functions" layer to access F-keys and numbers for convenience while gaming.
- Recommendation: use wired USB and switch the keyboard output to USB when using the game layer to avoid any potential input lag over BLE.
- Along with it's "own" "Toggle-Layer" system designed for game profiles.

---

## "Toggle-Layer" Layer System
- How to use: press the inward thumb keys to enter the Toggle Layer on both halves, then press a top-row key (or other assigned key) to switch to one of the toggled sub-layers. Press the gateway combo again to return to the Toggle Layer, then press it a second time to go back to the Base Layer.

- A separate "Toggle Layer" is activated by a pair of inward thumb keys (both halves). This acts as the gateway to multiple "Toggeled Layers".
- Toggled layers selected from the gateway have each their own "Sub-layer", or thumb-layers, with an individual RGB color. These sub-layers let you create dedicated small sub-layouts (each with its own distinct RGB setting), think momentary layers.
- The Toggle Layer reduces accidental activation, and less "key clutter" while allowing multiple dedicated layouts for different tasks (e.g., Photoshop, coding, emails, gaming).

- When making a Toggled Layer it's ***IMPORTANT*** that you add all sub-layouts, you'll be using in the Toggled Layer, BELOW the Toggled Layer! To avoid any "layer meshing" (layers can get "stuck" on top of each other [See zmk.dev #Layers or look at my layout/keymap, or layer numbers in `corne-rgb.dtsi` for an idea of how I pathed my layers.(https://zmk.dev/docs/keymaps#layers)]) or look at my layout/keymap, or layer numbers in `corne-rgb.dtsi` for an idea of how I pathed my layers.

![combos](corneCombos.png)
  - Red Bring Us To the Game Layer (MUST BE ON BASE LAYER TO ACCESS)
    - To leave the Game Layer press the combo twice until you return to the BASE layer
  - Blue Brings Us To the "Toggle-Layer" Layer (MUST BE ON BASE LAYER TO ACCESS)
    - To return to the BASE layer you can press the thumb buttons twice until you return to the BASE layer
  - Purple Brings Us to the "Game Toggle-Layer" Layer (MUST BE ON GAME LAYER TO ACCESS)

---

## Notes

- Early implementation mistake: layer-tap behavior was inside macros, causing macros to run on every layer-tap. I separated the layer-tap from macros so simple taps no longer trigger LED changes.
- There were some timing/overlap issues when combining certain macros (e.g., returning to default color after leaving the game layer). Conditional layer combos helped mitigate this.
- The current approach is functional but can likely be simplified; contributions and suggestions are welcome.

---

## AI Update

I used Copilot to help modularize and refine the macros and combos. The modular structure now makes it easier to add new layers and corresponding RGB behaviors — add a layer color/macro in `corne-rgb.dtsi` and #include that file in your keymap.

---

## To Do

- Improve the CapsLock blink logic and add a similar blink/indicator for NumLock and other toggles.
- Optional: document exact combo key positions for common Corne layouts (for clarity).

---

Edited with AI for clarity
