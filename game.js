
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



// Initialize the canvas
Game.initialize = function() {
	canvasE = document.getElementById('maincanvas');
	c = canvasElement.getContext("2d");
	
	canvasWidth = canvasE.width;
	canvasHeight = canvasE.height;
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
		setTimeout(function() {
			c.fillStyle = "red";
			Game.printToDebugConsole("Update Progress Bar");
			c.fillRect(x, y, xSpacing, 10);
			x += xSpacing;
		}, 20);
		
	}
	
	
	
	
	// Update loading progress bar based on (numOfImages - progress)
	
	// Slow down the loading of the images, purely for the graphical effect
	// This will obviously be changed for the larger application :D
	setTimeout(function() {
		shipImage = new Image();
		shipImage.onload = updateProgressBar();
		shipImage.src = "/images/ship2.png";
	}, 200);
	
	
	
	setTimeout(function() {
		shipThrusterImage1 = new Image();
		shipThrusterImage1.onload = updateProgressBar();
		shipThrusterImage1.src = "/images/thrust2.png";
	}, 400);
	
	setTimeout(function() {
		shipThrusterImage2 = new Image();
		shipThrusterImage2.onload = updateProgressBar();
		shipThrusterImage2.src = "/images/thrust4.png";
	}, 600);
	
	setTimeout(function() {
		shipThrusterImage3 = new Image();
		shipThrusterImage3.onload = updateProgressBar();
		shipThrusterImage3.src = "/images/thrust12.png";
	}, 800);

	
}



Game.paint = function() {
	
	//c.fillRect(50,50,50,50);
	
}




Game.update = function() {
	// Update game logic
}





// Print to debug
var thisCode = "";
var lastCode = ""; 

Game.printToDebugConsole = function(e){
	thisCode = e;
	document.getElementById("debug").innerHTML = thisCode + "<br />" + lastCode;
	lastCode = thisCode;
}


