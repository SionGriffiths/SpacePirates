
//=============================================
// Main Game class
//=============================================

// Instantiate variables
var Game = new Object();
var canvasE;
var c;
var fps = 60;
var waitTime = 1000 / fps;

var numOfImages = 4;
var imageLoadProgress = 0;
var shipImage;
var shipThrusterImage1;
var shipThrusterImage2;
var shipThrusterImage3;



// Initialize the canvas
Game.initialize = function() {
	canvasE = document.getElementById('maincanvas');
	c = canvasElement.getContext("2d");
}

// Display loading screen and preload images
Game.load = function() {
	// Display loading screen
	// Display loading progress bar
	// Update loading progress bar based on (numOfImages - progress)
	
	shipImage = new Image();
	shipImage.onload = function() {
		imageLoadProgress += 1;
	}
	shipImage.src = "/images/ship2.png";
	
	
	
	shipThrusterImage1 = new Image();
	shipThrusterImage1.onload = function() {
		imageLoadProgress += 1;
	}
	shipThrusterImage1.src = "/images/thrust2.png";
	
	
	
	shipThrusterImage2 = new Image();
	shipThrusterImage2.onload = function() {
		imageLoadProgress += 1;
	}
	shipThrusterImage2.src = "/images/thrust4.png";
	
	
	
	shipThrusterImage3 = new Image();
	shipThrusterImage3.onload = function() {
		imageLoadProgress += 1;
	}
	shipThrusterImage3.src = "/images/thrust12.png";
}



Game.paint = function() {
	c.fillRect(50,50,50,50);
}




Game.update = function() {
	// Update game logic
}



Game.printToDebugConsole = function(e){
	var code = e;
	document.getElementById("debug").innerHTML = code;
}