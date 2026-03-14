


# PandaKB ZMK Corne v3 RGB BLE (Per-Layer RGB)
&nbsp;&nbsp;&nbsp;&nbsp;This is a **VERY AMATURE** attempt at implementing "Per-layer RGB colors into the firmware". There were a couple of roadblocks, but after much further reading, and thought, I came up with my own, albeit very messy, firmware utilizing macros and hold-taps to get this effect. This was just a small weekend project to help me understand ZMK a little bit more and to have a little "fun" with my build. I have the macros and hold-taps the way I like it, you're free to change the code if you wish, I'm sure there are ways I could simplify this code even more; but for now it functions.<br>



## Breakdown of My Project

Used https://nickcoutsos.github.io/keymap-editor/ for all of the macros and hold-taps
- ~~5~~ 11! Layers with their own color setting (the default layer color is a warm orange/yellow)
- Implemented a "gaming" layer combo (so that way there are no accidental presses)<br>
- The active `config/corne.keymap` now stays focused on layer bindings, while the RGB macros/combos live in `config/corne-rgb.dtsi` so the per-layer colors are easier to maintain.<br>
- The zero-parameter RGB macros in `config/corne-rgb.dtsi` now use ZMK's `ZMK_MACRO(...)` convenience C macro, so the macro definitions stay shorter without changing the RGB behavior.<br>
- The layers/macros behave the same way "home-row mods" work but since we cant put macros on home-rows we have to use "hold-tap"(or so I assume). This way we avoid triggering the LED change when the layer isn't "activated" and we just want a simple key tap; with NO LED change.<br>
<p>&nbsp;&nbsp;&nbsp;&nbsp;I made a silly mistake when I was first attempting this, I put the layertap behavior IN the macro, so it would run the whole macro whenever I just wanted a simple key tap. In theory it was working, it changed my colors when I pressed the correct layer key, but it did this <b>EVERYTIME</b> the layer key was pressed, and since I was using layer-tap before this I was frequently pressing these keys in my normal use. I figured I had to "separate" the layer-tap from the macro and just leave the layer in.<br> (It would give a nice little light show when I would type lol, before this fix.)</p><br>
<br>
<br>

### NEW MODULAR AI Implemented RGB config! (Can be copied easily)
<br>
&nbsp;&nbsp;&nbsp;&nbsp;Got super lazy and had copilot refine the code and it did a really surpringly well job. All of the combos and macros have been modularized, now adding a new layer color/macro has been made easier. Layouts for the new code format/structure can be found in corne-rgb.dtsi. Anyone can easily add this to their own builds now just be sure to add `#include corne-rgb.dtsi` to your .keymap file. Obviously change corne to whatever.
<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;Enjoy, this was just a small project to help me understand ZMK a little bit better, and to give my RGBs something to do. Thanks a lot to nickcoutsos, his program really helped with this project! ~~I still need to figure a way to change the LEDs back to default when coming off the gaming layer. Originally I wanted to put it on the Toggle/xtra2 layer but there was an issue, I believe to be with the macro inputs overlapping each other, the LED would go back to the "default" color unless you pressed the layer quickly (I might revisit this at some point it might just be a timing issue).~~ I just learned you
can make "conditional layer" combos.

## Game Layer
&nbsp;&nbsp;&nbsp;&nbsp;Activate the layer pressing this combo: the top left key, on the left keyboard, and the top right key, on the right keyboard, AT THE SAME TIME. This then changes the layer to the "gaming" layer and it's chosen corresponding color. To deactivate this layer, simply ~~press the left most thumb key on the right keyboard~~ press the same combo and it will go back to the base layer and switch to it's corresponding color. 
- The game layer features a "functions" layer within itself to access the most common top row keys, F and number keys, I found it challenging to play some FPS games with this board; but for some casual play it did well. (It was mostly just a muscle memory issue.)<br>
&nbsp;&nbsp;&nbsp;&nbsp;If deciding to play games with this it's recommended to plug it in via USB to negate/avoid any input lag AND to switch the output to USB on the keyboard. I`ll probably put toggle output to USB when switching to the game layer somewhere in the macro.<br>
## New "Toggle-Layer" Layer
&nbsp;&nbsp;&nbsp;&nbsp;Implemented a "new" system to the keyboard where we use combos to access a "hidden" layer, similar to the game layer it's "out of the way" from other keys reducing  the risk of accidental activation. It requires a more deliberate press but it's not as "inaccessible" as the game combo, which is designed to be a "deliberate" combo. The "Toggle Layer" layer is represented with a much brighter sharper LED color to bring awareness to your eyes, much like the "design" I chose for the LEDs where the LEDs are brighter if being used on a "sub layer" and dims when on the base layer(s).
In theory you can now add as many layers as you want as each "Toggle Layer" can have it's own set of "sub-layers", 1 "Toggle Layer" can have as many "sub-layers" as you can fit/work with. I'm sure there are more creative ways to use layers but for someone like me who uses only the thumb keys for my layers I become limited to only 4 extra layers, and with the scope of the utility I get from my PC 4 layers sometimes still isn't enough.
<br>
<br>
*Baby's first "program" for a stupid visual learner*
<br>
<br>
<br>
<br>
<br>
UPDATE:<br>
&nbsp;&nbsp;&nbsp;&nbsp;I got lazy and let AI refine the code, honestly for the better while maintaining the initial idea, there is now fully functioning per-layer RGB I even went ahead and added "toggle layers". In theory this is for when you're working on another program and you need a different set of layers and don't want to complicate your layouts, or if you are like me and just have a slow brain that can't process all the layer combos to get certain functions/hotkeys it becomes easier to have "dedicated layers". It essentially just gives your keyboard access to be fully modular for whatever your tasks may be, work in photoshop? Then you can switch to your photoshop layer and have all your photoshop macros in a more accessible/memorable layout. 
