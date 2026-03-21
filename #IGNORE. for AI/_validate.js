// Stub DOM functions so the code can be parsed
var document = { 
  addEventListener: function(){}, 
  getElementById: function(){ return { onclick: null, value:'', textContent:'', style:{}, checked:false, classList:{add:function(){},remove:function(){},toggle:function(){},contains:function(){return false}}, querySelector:function(){return null}, querySelectorAll:function(){return []}, innerHTML:'', appendChild:function(){}, addEventListener:function(){}, setAttribute:function(){}, getAttribute:function(){return ''}, focus:function(){}, select:function(){}, getBoundingClientRect:function(){return {top:0,left:0,right:0,bottom:0,width:0,height:0}} }; },
  querySelector: function(){ return { addEventListener:function(){} }; },
  querySelectorAll: function(){ return { forEach:function(){} }; },
  createElement: function(){ return { id:'', innerHTML:'', style:{}, appendChild:function(){}, addEventListener:function(){}, setAttribute:function(){} }; },
  body: { appendChild:function(){}, style:{} }
};
var window = { innerWidth:1920, innerHeight:1080, addEventListener: function(){} };
var setTimeout = function(){};
var alert = function(){};
var confirm = function(){ return true; };
var Set = function(){ this.has = function(){return false}; this.add = function(){}; };
var console = { log:function(){}, error:function(){} };

try {
  eval(arguments(0));
  WScript.Echo("SUCCESS: JavaScript parsed and evaluated without syntax errors");
} catch(e) {
  WScript.Echo("ERROR: " + e.name + " at line " + (e.number & 0xFFFF) + ": " + e.message);
}