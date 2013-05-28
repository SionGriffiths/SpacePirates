//=============================================
// Config Globals
//=============================================

// Instantiate variables

var clockCycle = 1; // (1 - 60) based on game cycles per second (fps).
var cycleTime = 0;
var cycleSwitch = 0;

var z = 1.0;
var canvasE;
var c;
var fps = 50;
var waitTime = 1000 / fps;
var canvasWidth;
var canvasHeight;

var numOfImages = 36;
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
var togglePerformance = false;
var instructionsDisplayed = true;

var toggleSunEffect = true;
var toggleSound = true;

var AsteroidsPainted = 0;
var PlanetsPainted = 0;

// Print to debug
var thisCode = "";
var lastCode = ""; 
var messageLog = new Array();
var messageLogString = " ";



// Performance variables

var apsD;
var apfD;
var asteroidPaintStart;
var asteroidPaintFinish;
var asteroidPaintTemp = 0;
var asteroidPaintTime;

var bpsD;
var bpfD;
var bgPaintStart;
var bgPaintFinish;
var bgPaintTemp = 0;
var bgPaintTime;

var acsD;
var acfD;
var asteroidCollisionStart;
var asteroidCollisionFinish;
var asteroidCollisionTemp = 0;
var asteroidCollisionTime;

var scsD;
var scfD;
var shipCollisionStart;
var shipCollisionFinish;
var shipCollisionTemp = 0;
var shipCollisionTime;

var mpsD;
var mpfD;
var munitionsPaintStart;
var munitionsPaintFinish;
var munitionsPaintTemp = 0;
var munitionsPaintTime;

var musD;
var mufD;
var munitionsUpdateStart;
var munitionsUpdateFinish;
var munitionsUpdateTemp = 0;
var munitionsUpdateTime;

