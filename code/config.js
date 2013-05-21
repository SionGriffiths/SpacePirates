//=============================================
// Config Globals
//=============================================

// Instantiate variables

var clockCycle = 1; // (1 - 60) based on game cycles per second (fps).

var canvasE;
var c;
var fps = 60;
var waitTime = 1000 / fps;
var canvasWidth;
var canvasHeight;

var numOfImages = 20;
var imageLoadProgress = 0;


var TO_RADIANS = Math.PI / 180;
var TO_DEGREES = 180 / Math.PI;


var TO_RADIANS = Math.PI / 180;
var TO_DEGREES = 180 / Math.PI;

var deployedMunitions = new Array();


var previousDir;
var previousMaps = new Array();

var fuelCells = new Array();
var fuel = 100;

var pewN = 1;

var toggleDebug = false;
var instructionsDisplayed = true;

var toggleSunEffect = true;
var toggleSound = true;