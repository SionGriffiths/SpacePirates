
//=============================================
// Main Game class
//=============================================

// Instantiate Object
var Game = new Object();



// Initialize the canvas
Game.initialize = function() {
	canvasE = document.getElementById('maincanvas');
	c = canvasE.getContext("2d");
	
	canvasWidth = canvasE.width;
	canvasHeight = canvasE.height;

	//Ship.X = 0;
	//Ship.Y = 0;
	
	Game.printToDebugConsole("Initializing background");
	
	initializeBackground();

}




// Display loading screen and preload images
Game.load = function() {

	Game.printToDebugConsole("Displaying load message");


	// Display loading screen
	var loadingPaneX = ((canvasWidth / 2) - ((canvasWidth / 1.5) / 2));
	var loadingPaneY = ((canvasHeight / 2) - ((canvasHeight / 3) / 2));
	var loadingPaneWidth = (canvasWidth / 1.5);
	var loadingPaneHeight = (canvasHeight / 3);
	
	c.save();
	drawRoundRect(c, loadingPaneX, loadingPaneY, loadingPaneWidth, loadingPaneHeight, 10, true, true);
	c.restore();
	
	var loadingMessage = 'Loading';
	var loadingMessageMetrics = c.measureText(loadingMessage);
	var loadingMessageWidth = loadingMessageMetrics.width;
	
	c.save();
	c.textAlign = "start";
	c.fillStyle = "white";
	c.font = "40px arial";
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
	c.save();
		c.fillStyle = "red";
		c.fillRect(x, y, xSpacing, 10);
		x += xSpacing;
	c.restore();
	}
	
	
	
	
	// Update loading progress bar based on (numOfImages - progress)
	Game.printToDebugConsole("Loading images");
	
	
	// Slow down the loading of the images, purely for the graphical effect
	// This will obviously be changed for the larger application :D
	setTimeout(function() {
		Ship.shipImage = new Image();
		Ship.shipImage.onload = updateProgressBar();
		imageLoadProgress += 1;
		Ship.shipImage.src = "images/ships/ship2.png";
	}, 200);	
	setTimeout(function() {
		Ship.ThrusterImage1 = new Image();
		Ship.ThrusterImage1.onload = updateProgressBar();
		imageLoadProgress += 1;
		Ship.ThrusterImage1.src = "images/thrust/thrust2.png";
	}, 600);
	setTimeout(function() {
		Ship.ThrusterImage2 = new Image();
		Ship.ThrusterImage2.onload = updateProgressBar();
		imageLoadProgress += 1;
		Ship.ThrusterImage2.src = "images/thrust/thrust4.png";
	}, 900);	
	setTimeout(function() {
		Ship.ThrusterImage3 = new Image();
		Ship.ThrusterImage3.onload = updateProgressBar();
		imageLoadProgress += 1;
		Ship.ThrusterImage3.src = "images/thrust/thrust3.png";
	}, 1100);
	setTimeout(function() {
		Ship.ThrusterImage4 = new Image();
		Ship.ThrusterImage4.onload = updateProgressBar();
		imageLoadProgress += 1;
		Ship.ThrusterImage4.src = "images/thrust/thrust0.png";
	}, 300);
	setTimeout(function() {
		Ship.ThrusterImage5 = new Image();
		Ship.ThrusterImage5.onload = updateProgressBar();
		imageLoadProgress += 1;
		Ship.ThrusterImage5.src = "images/thrust/thrust1.png";
	}, 500);
	setTimeout(function() {
		shipGunImage1 = new Image();
		shipGunImage1.onload = updateProgressBar();
		imageLoadProgress += 1;
		shipGunImage1.src = 'images/guns/gun3.png';
	}, 1200);
	setTimeout(function() {
		asteroidImage1 = new Image();
		asteroidImage1.onload = updateProgressBar();
		imageLoadProgress += 1;
		asteroidImage1.src = "images/misc/asteroid1.png";
	}, 600);
	setTimeout(function() {
		asteroidImage2 = new Image();
		asteroidImage2.onload = updateProgressBar();
		imageLoadProgress += 1;
		asteroidImage2.src = "images/misc/asteroid2.png";
	}, 600);	
	


	// Call the game to run, after finished loading
	setTimeout(function() {
		Game.run();
	}, 1500);

	newAst = [];
	newAst = [0];
	var initialAsteroid1 = new Asteroid(newAst);
	var initialAsteroid2 = new Asteroid(newAst);
	var initialAsteroid3 = new Asteroid(newAst);
	var initialAsteroid4 = new Asteroid(newAst);
	newAst = [1];
	var initialAsteroid5 = new Asteroid(newAst);
	var initialAsteroid6 = new Asteroid(newAst);
	var initialAsteroid7 = new Asteroid(newAst);

}

// Paint - GAMELOOP
Game.paint = function() {
	
	clearCanvas();

	paintBackground();
	paintFuelGuage();	
	paintDeployedMunitions();
	paintAsteroids();
	Ship.paint();
	paintEnemyShips();

	//console.log("Asteroids Array" + Game.asteroids.toString());
}

// Paint - GAMELOOP
Game.update = function() {
	

	Ship.update();
	updateEnemyShips();
	paintFuelGuage();
	updateDeployedMunitions();
	updateAsteroids();
	
}


function paintFuelGuage() {
	c.save();
	c.strokeStyle = "red";
	c.strokeRect(10, canvasHeight - 30, 100, 10);
	c.fillStyle = "red";
	c.fillRect(10, canvasHeight - 30, fuel, 10);
	c.restore();
}


// Print to debug
var thisCode = "";
var lastCode = ""; 
var messageLog = new Array();
var messageLogString = " ";

Game.printToDebugConsole = function(message){
	
	console.log(message);
}







// Clear canvas
function clearCanvas() {
	canvasElement.width = canvasElement.width;
}












// Methods reside in ship.js
Game.movePlayerShip = function(direction) {
	Ship.move(direction);
} 
Game.stopMovePlayerShip = function(direction) {
	Ship.stopMove(direction);
}







//sound playing
Game.playThrust = function(){
	
	if (toggleSound) {
	
		thrust.play();

	}
	}
Game.playPewPewPew = function(){
	
	if (toggleSound) {
		
		if(pewN==1) {pew1.play();}
		if(pewN==2) {pew2.play();}
		if(pewN==3) {pew3.play();}
		
		pewN += 1;

		if(pewN == 4) { pewN = 1;}
		
	}
}


// Methods reside in munitions.js
Game.fireShipLaserPulse = function(munitionsType) {
	
	
	
	if (munitionsType == 0) {
	
		fireShipLaserPulse("RedLaser", Ship.X, Ship.Y, Ship.Direction, "PlayerShip", Ship.Momentum);
	
	}
	
	else if (munitionsType == 1) {
	
		fireShipLaserPulse("BlueLaser", Ship.X, Ship.Y, Ship.Direction, "PlayerShip", Ship.Momentum);
	
	}
	
	else if (munitionsType == 2) {
	
		fireShipLaserPulse("GreenLaser", Ship.X, Ship.Y, Ship.Direction, "PlayerShip", Ship.Momentum);
	
	}
	
	// munitionsType, originX, originY, targetDirection, aggressor, aggressorMomentum
	
	
	
}

// Method resides in enemyship.js
//Game.paintEnemyShips = function() {
//	paintEnemyShips();
//}


Game.enemyShips = new Array();
Game.asteroids = new Array();
