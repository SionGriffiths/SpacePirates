
//=============================================
// Main Game class
//=============================================

// Instantiate variables
var Game = new Object();
var canvasE;
var c;
var fps = 60;
var waitTime = 1000 / fps;
var canvasWidth;
var canvasHeight;


var numOfImages = 4;
var imageLoadProgress = 0;
var shipImage;
var shipThrusterImage1;
var shipThrusterImage2;
var shipThrusterImage3;

var stars = new Array();


// Initialize the canvas
Game.initialize = function() {
	canvasE = document.getElementById('maincanvas');
	c = canvasE.getContext("2d");
	
	canvasWidth = canvasE.width;
	canvasHeight = canvasE.height;
	
	initializeBackground();
}

// Display loading screen and preload images
Game.load = function() {

	// Display loading screen
	var loadingPaneX = ((canvasWidth / 2) - ((canvasWidth / 1.5) / 2));
	var loadingPaneY = ((canvasHeight / 2) - ((canvasHeight / 3) / 2));
	var loadingPaneWidth = (canvasWidth / 1.5);
	var loadingPaneHeight = (canvasHeight / 3);
	
	drawRoundRect(c, loadingPaneX, loadingPaneY, loadingPaneWidth, loadingPaneHeight, 10, true, true);
	
	var loadingMessage = 'Loading';
	var loadingMessageMetrics = c.measureText(loadingMessage);
	var loadingMessageWidth = loadingMessageMetrics.width;
	
	c.save();
	c.textAlign = "start";
	c.fillStyle = "white";
	c.font = "20px arial";
	c.shadowColor = "red";
	c.shadowOffsetX = 2;
	c.shadowOffsetY = 2;
	c.shadowBlur = 3;
	c.fillText(loadingMessage, (loadingPaneX + ((loadingPaneWidth / 2.5) - (loadingMessageWidth / 2))), 
																((loadingPaneY + (loadingPaneHeight / 2))));
	c.restore();
	
	
	var x = loadingPaneX + 10;
	var y = loadingPaneY + (loadingPaneHeight - 15);
	var xSpacing = (loadingPaneWidth - 20) / numOfImages;
		
	
	// Loading screen progress bar
	var drawProgressBar = function() {
		
		for (var i = 0; i < numOfImages; i++) {
			c.save();
			c.fillStyle = "red";
			c.strokeStyle = "red";
			c.strokeRect(x, y, xSpacing, 10);
			x += xSpacing;
			c.restore();
		}
	}
	
	
	// Display loading progress bar
	drawProgressBar();
	
	
	x = loadingPaneX + 10;
	
	var updateProgressBar = function() {
		c.fillStyle = "red";
		c.fillRect(x, y, xSpacing, 10);
		x += xSpacing;
	}
	
	
	
	
	// Update loading progress bar based on (numOfImages - progress)
	
	// Slow down the loading of the images, purely for the graphical effect
	// This will obviously be changed for the larger application :D
	setTimeout(function() {
		shipImage = new Image();
		shipImage.onload = updateProgressBar();
		imageLoadProgress += 1;
		shipImage.src = "/images/ship2.png";
	}, 200);
	
	
	
	setTimeout(function() {
		shipThrusterImage1 = new Image();
		shipThrusterImage1.onload = updateProgressBar();
		imageLoadProgress += 1;
		shipThrusterImage1.src = "/images/thrust2.png";
	}, 400);
	
	setTimeout(function() {
		shipThrusterImage2 = new Image();
		shipThrusterImage2.onload = updateProgressBar();
		imageLoadProgress += 1;
		shipThrusterImage2.src = "/images/thrust4.png";
	}, 600);
	
	setTimeout(function() {
		shipThrusterImage3 = new Image();
		shipThrusterImage3.onload = updateProgressBar();
		imageLoadProgress += 1;
		shipThrusterImage3.src = "/images/thrust12.png";
	}, 800);

	
	// Call the game to run, after finished loading
	setTimeout(function() {
		Game.run();
	}, 1000);

}


Game.paint = function() {
	
	clearCanvas();
	updateBackground();
	
}




Game.update = function() {
	// Update game logic
}





// Print to debug
var thisCode = "";
var lastCode = ""; 
var messageLog = new Array();
var messageLogLength;
var messageLogString = " ";

Game.printToDebugConsole = function(e){
	
	messageLog.push(e);
	
	for (var i = 0; i < messageLog.length; i++){
	 messageLogString = messageLogString + "<br  />" + messageLog[i];
	}
	
	document.getElementById("debug").innerHTML = messageLogString;

	messageLogString = " ";
}



// Clear canvas
function clearCanvas() {
	canvasElement.width = canvasElement.width;
}


// Background manager
function updateBackground(){
	
	// Paint the background black
	c.save();
	c.fillStyle = "black";
	c.fillRect(0,0,canvasE.width, canvasE.height);
	c.restore();
	
	updateStarPositions();
	
}

function initializeBackground(){
	// Create the stars
	var star = ".";
	
	for (var i = 0; i < 20; i++){
		
	}
	
}

function updateStarPositions(){
	// If the ship moves, move the stars very very slightly
}



