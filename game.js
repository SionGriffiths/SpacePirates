
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



var numOfImages = 7;
var imageLoadProgress = 0;
var shipImage;
var shipThrusterImage1;
var shipThrusterImage2;
var shipThrusterImage3;
var shipThrusterImage4;
var shipThrusterImage5;
var shipGunImage1;

var backgroundStars = new Array();
var numOfStars = 80;
var star;
var backgroundStarColours;
var numOfStarColours;

var shipX = 50; // Canvas x
var shipY = 50; // Canvas y
var shipDirection = 0; // Degrees

var shipMomentum = 0; // 0 - 6
var shipMomentumDirection = 0; // Degrees
var shipAcceleration = 0; // 0 - 6
var shipAccelerationFactor = 0.1;
var shipDecelerationFactor = 0.5;
var shipThrustPower = 1;
var shipMaxSpeed = 30;
var shipMovingForwards = false;
var shipMovementModerator = 1;

var shipTurningLeft = false;
var shipTurningRight = false;

var thrustEffect = 0;
var currentShipThrusterImage;


var TO_RADIANS = Math.PI / 180;
var TO_DEGREES = 180 / Math.PI;


var TO_RADIANS = Math.PI / 180;
var TO_DEGREES = 180 / Math.PI;

var deployedMunitions = new Array();


var previousDir;
var previousMaps = new Array();

var fuel = 100;


// Initialize the canvas
Game.initialize = function() {
	canvasE = document.getElementById('maincanvas');
	c = canvasE.getContext("2d");
	
	canvasWidth = canvasE.width;
	canvasHeight = canvasE.height;
	
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
		shipImage = new Image();
		shipImage.onload = updateProgressBar();
		imageLoadProgress += 1;
		shipImage.src = "images/ship2.png";
	}, 200);

	
	
	
	setTimeout(function() {
		shipThrusterImage1 = new Image();
		shipThrusterImage1.onload = updateProgressBar();
		imageLoadProgress += 1;
		shipThrusterImage1.src = "images/thrust2.png";
	}, 600);

	
	setTimeout(function() {
		shipThrusterImage2 = new Image();
		shipThrusterImage2.onload = updateProgressBar();
		imageLoadProgress += 1;
		shipThrusterImage2.src = "images/thrust4.png";
	}, 900);

	
	setTimeout(function() {
		shipThrusterImage3 = new Image();
		shipThrusterImage3.onload = updateProgressBar();
		imageLoadProgress += 1;
		shipThrusterImage3.src = "images/thrust3.png";
	}, 1100);


	setTimeout(function() {
		shipThrusterImage4 = new Image();
		shipThrusterImage4.onload = updateProgressBar();
		imageLoadProgress += 1;
		shipThrusterImage4.src = "images/thrust0.png";
	}, 300);

	setTimeout(function() {
		shipThrusterImage5 = new Image();
		shipThrusterImage5.onload = updateProgressBar();
		imageLoadProgress += 1;
		shipThrusterImage5.src = "images/thrust1.png";
	}, 500);


	setTimeout(function() {
		shipGunImage1 = new Image();
		shipGunImage1.onload = updateProgressBar();
		imageLoadProgress += 1;
		shipGunImage1.src = 'images/gun3.png';
	}, 1200);
	
	// Call the game to run, after finished loading
	setTimeout(function() {
		Game.run();
	}, 1500);

}












// Paint - GAMELOOP
Game.paint = function() {
	
	clearCanvas();

	paintBackground();
	paintFuelGuage();
	paintPlayerShip();
	paintDeployedMunitions();
	
}










// Paint - GAMELOOP
Game.update = function() {
		
	updatePlayerShip();
	paintFuelGuage();
	updateDeployedMunitions();
	
}



function paintFuelGuage() {
	c.save();
	c.strokeStyle = "red";
	c.strokeRect(10, canvasHeight - 30, 100, 10);
	c.fillStyle = "red";
	c.fillRect(10, canvasHeight - 30, fuel, 10);
	c.restore();
}


function updatePlayerShip() {

	// Only calculate and move one in 3 game loops
	shipMovementModerator += 1;
	
	if (shipMovementModerator == 3) {

	if (shipMovingForwards) {
		if (shipAcceleration <= 5) {
			shipAcceleration += shipAccelerationFactor;
		}
		
		shipMomentum = shipMomentum + shipAcceleration;

		if(shipMomentum > shipMaxSpeed) {
			shipMomentum = shipMaxSpeed;
		}


	}
	
	else {
		shipAcceleration = 0;
		if (shipMomentum > 0) {
			shipMomentum -= shipDecelerationFactor;
		}

		if(shipMomentum < 1) {
			shipMomentum = 0;
		}


	}
	
	
	updateShipCoordinates("Forwards");
	
	
	
	shipMovementModerator = 1;
	}
	
	if (shipTurningLeft) {
		changeShipDirection("Left");
	}
	
	else if (shipTurningRight) {
		changeShipDirection("Right");
	}
	
	
}













// Print to debug
var thisCode = "";
var lastCode = ""; 
var messageLog = new Array();
var messageLogString = " ";

Game.printToDebugConsole = function(message){
	
	messageLog.push(message);
	
	for (var i = messageLog.length - 1; i > -1; i--){
	 messageLogString = messageLogString + "<br  />" + messageLog[i];
	}
	
	document.getElementById("debug").innerHTML = messageLogString;

	messageLogString = " ";
	
	if (messageLog.length >= 15) {
		messageLog.splice(0,1);
	}
}







// Clear canvas
function clearCanvas() {
	canvasElement.width = canvasElement.width;
}











// Background manager
function paintBackground(){
	
	// Paint the background black
	c.save();
	c.fillStyle = "black";
	c.fillRect(0,0,canvasE.width, canvasE.height);
	c.restore();
	
	//addBlueRadialGradientFlare();
	
	updateStarPositions();
	
	
	
	for (var i = 0; i < backgroundStars.length; i++){
		c.save();
		c.fillStyle = backgroundStars[i][3];
		c.font = backgroundStars[i][2] + "px arial";
		c.shadowColor = "white";
		c.shadowBlur = backgroundStars[i][2] / 10;
		c.fillText(star, backgroundStars[i][0], backgroundStars[i][1]);
		c.restore();
	}
	

	
	
	
}





// Initialize the stars with their random coordinates and size
function initializeBackground(){
	
	backgroundStars = new Array();
	
	star = ".";
	
	backgroundStarColours = new Array();
	backgroundStarColours[0] = "#BF004D";
	backgroundStarColours.push("#B3AF4F");
	backgroundStarColours.push("#B1E39A");
	backgroundStarColours.push("#B0C9FF");
	backgroundStarColours.push("#FFE226");
	backgroundStarColours.push("#FAF682");
	backgroundStarColours.push("#D9D9D9");
	backgroundStarColours.push("#C4C4C2");
	backgroundStarColours.push("#FFDEDE");
	backgroundStarColours.push("#DEFFFD");
	backgroundStarColours.push("#CAC5E6");
	backgroundStarColours.push("#FFC400");
	backgroundStarColours.push("#FFFFFF");
	backgroundStarColours.push("#FFFFFF");
	numOfStarColours = backgroundStarColours.length;

	
	for (var i = 0; i < numOfStars; i++){

		var starData = new Array();
		var starDataX = Math.floor(Math.random()*canvasE.width);
		var starDataY = Math.floor(Math.random()*canvasE.height);
		var starDataSize = Math.floor(Math.random() * 30);
		var starDataColour = backgroundStarColours[Math.floor(Math.random()*(numOfStarColours + 1))];

		starData.push(starDataX);
		starData.push(starDataY);
		starData.push(starDataSize);
		starData.push(starDataColour);
		
		backgroundStars.push(starData);
		previousMaps.push(backgroundStars);
		
	}	

	
	Game.printToDebugConsole(numOfStars + " stars created");
	
}





function updateStarPositions(){
	// If the ship moves, move the stars very very slightly,
	// with the largest (closest) ones moving more.
}



function addBlueRadialGradientFlare(){
	
	c.save();
	
	// Create gradient
	var grd = c.createRadialGradient(75,75,5,90,60,1200);

	grd.addColorStop( 0.5, "#000000");
	grd.addColorStop( 0.01, "#1C2FAD");

	// Fill with gradient
	c.fillStyle=grd;
	c.fillRect(0,0,canvasE.width, canvasE.height);
	c.restore();
}


// Paint the Ship
function paintPlayerShip() {
	c.save();
	c.translate(shipX, shipY);
	c.translate(50, 70);
	c.rotate(shipDirection * TO_RADIANS);
	c.drawImage(shipImage, -50, -70, 100, 140);
	c.drawImage(getCurrentShipThrusterImage(), -50, 33, 100, 140);
	c.restore();
}





Game.movePlayerShip = function(direction){
	if (fuel > 0) {
		Game.printToDebugConsole("Moving Ship");
	
	
		if (direction == "Forwards") {
			shipMovingForwards = true;
		
			fuel = fuel - (fuel / 100);
			if (fuel < 1) {
				fuel = 0;
			}
			Game.printToDebugConsole("Fuel = " + fuel + "%");
			
		}
	
	
		else if (direction == "Backwards") {
			shipMovingForwards = false;
			
			fuel = fuel - (fuel / 150);
			if (fuel < 1) {
				fuel = 0;
			}
			Game.printToDebugConsole("Fuel = " + fuel + "%");
		}
	
		else if (direction == "Left") {
			shipTurningLeft = true;
		
			fuel = fuel - (fuel / 400);
			if (fuel < 1) {
				fuel = 0;
			}
			Game.printToDebugConsole("Fuel = " + fuel + "%");
		}
	
		else if (direction == "Right") {
			shipTurningRight = true;
		
			fuel = fuel - (fuel / 400);
			if (fuel < 1) {
				fuel = 0;
			}
			Game.printToDebugConsole("Fuel = " + fuel + "%");
		}
	} else {
		Game.printToDebugConsole("Fuel is at " + fuel + "%");
		Game.printToDebugConsole("Ship cannot fly");
	}
}




Game.stopMovePlayerShip = function(direction){

	Game.printToDebugConsole("Stop Moving Ship");
	
	
	if (direction == "Forwards") {
		shipMovingForwards = false;
	}

	if (direction == "Left") {
		shipTurningLeft = false;
	}
	
	if (direction == "Right") {
		shipTurningRight = false;
	}
}



// Find the ships new coordinates when moving in a direction
// new X = X * sin(angle) + Y * cos(angle) 
// new Y= X * sin(angle) + Y * -cos(angle)
function updateShipCoordinates(input) {
	
	if (input == "Forwards") {
		shipX = shipX + shipMomentum * Math.cos((shipDirection - 90) * TO_RADIANS);
		shipY = shipY + shipMomentum * Math.sin((shipDirection - 90) * TO_RADIANS);

	}
	
	else if (input == "Backwards") {
		shipX = shipX - shipMomentum * Math.cos((shipDirection - 90) * TO_RADIANS);
		shipY = shipY - shipMomentum * Math.sin((shipDirection - 90) * TO_RADIANS);
	}

	

	if (shipX <= -1) {
		if (previousDir == "left") {
			backgroundStars = [];
			backgroundStars = previousMaps[previousMaps.length - 3];
			previousMaps.push(backgroundStars);
		} else {
			initializeBackground();
		}
		previousDir = "right";
		shipX = canvasWidth - 2;
	} else if (shipX >= canvasWidth) {
		if (previousDir == "right") {
			backgroundStars = [];
			backgroundStars = previousMaps[previousMaps.length - 2];
			previousMaps.splice(previousMaps.length - 2);
			previousMaps.push(backgroundStars);
		} else {
			initializeBackground();
		}
		
		previousDir = "left";
		shipX = 2;
	} else if (shipY <= -1) {
		if (previousDir == "down") {
			backgroundStars = [];
			backgroundStars = previousMaps[previousMaps.length - 2];
			previousMaps.splice(previousMaps.length - 2);
			previousMaps.push(backgroundStars);
		} else { 
			initializeBackground();
		}
		
		previousDir = "up";
		shipY = canvasHeight - 2;
	} else if (shipY >= canvasHeight) {
		if (previousDir == "up") {
			backgroundStars = [];
			backgroundStars = previousMaps[previousMaps.length - 2];
			previousMaps.splice(previousMaps.length - 2);
			previousMaps.push(backgroundStars);
		} else {
			initializeBackground();
		}
		
		previousDir = "down";
		shipY = 2;
	}
	
}

// Change the angle the ship is facing
function changeShipDirection(input) {

	if (input == "Left") {
		if ( shipDirection <= 0 ) {
			shipDirection = 360;
		}
		else {
			shipDirection -= 7;
		}
	}
	
	if (input == "Right") {
		if (shipDirection >= 360) {
			shipDirection = 0;
		}
		else {
			shipDirection += 7;
		}
	}

}



function getCurrentShipThrusterImage() {

	var currentShipThrusterImage = shipThrusterImage1;
	
	if(shipMovingForwards == true) {
		switch (thrustEffect) {
		
		case 0:		currentShipThrusterImage = shipThrusterImage1;
					break;
		case 1:		currentShipThrusterImage = shipThrusterImage2;
					break;
		case 2:		currentShipThrusterImage = shipThrusterImage3;
					break;
		case 3:		currentShipThrusterImage = shipThrusterImage2;
					break;
		}
	} else {
		switch (thrustEffect) {
		
		case 0:		currentShipThrusterImage = shipThrusterImage4;
					break;
		case 1:		currentShipThrusterImage = shipThrusterImage5;
					break;
		case 2:		currentShipThrusterImage = shipThrusterImage4;
					break;
		case 3:		currentShipThrusterImage = shipThrusterImage5;
					break;
		}
	}



	thrustEffect += 1;
	
	if (thrustEffect == 4) { 
		thrustEffect = 0; 
	}
	
	return currentShipThrusterImage;
}



//sound playing
Game.playThrust = function(){
	
	thrust.play();
}

 

 




function paintDeployedMunitions() {

	// For each item in the munitions array,
	// paint it at it's x and y coordinates.
	
	// Note, graphical missiles will need to
	// maintain direction data and rotate the
	// canvas for painting.
	
	for (var i = 0; i < deployedMunitions.length; i++) {
	
		c.save();
		c.translate(deployedMunitions[i].x, deployedMunitions[i].y);
		c.translate(20, 20);
		c.rotate(deployedMunitions[i].direction * TO_RADIANS);
		deployedMunitions[i].draw();
		c.restore();
	}
	
	
}









function updateDeployedMunitions() {

	// For each item in the munitions array,
	// get it and update its x and y.
	// Perhaps change its graphic properties for
	// animation effect too.

	
	for (var i = 0; i < deployedMunitions.length; i++) {
		deployedMunitions[i].update();
	}
	
}



Game.fireShipLaserPulse = function() {

	// Create a new munitions object with data
	var deployedLaser = new Object();
	
	deployedLaser.name = "RoundRedLaserPulse";

	deployedLaser.x = shipX + 20;
	deployedLaser.y = shipY + 20;

	deployedLaser.direction = shipDirection;
	deployedLaser.speed = 6 + shipMomentum;
	
	deployedLaser.numberOfAnimations = 4;
	deployedLaser.nextAnimationCalc = 0;
	
	deployedLaser.animations = new Array();
	deployedLaser.animations[0] = 0.5;
	deployedLaser.animations[1] = 1;
	deployedLaser.animations[2] = 3;
	deployedLaser.animations[3] = 5;
	
	deployedLaser.animationSize = 1;
	deployedLaser.innerSize = 2;
	deployedLaser.outerSize = 7;
	
	
	deployedLaser.draw = function() {
			//c.save();
			var gradient = c.createRadialGradient(-40, -40, this.innerSize, -40, -40, this.outerSize);
			gradient.addColorStop(0,"red");
			gradient.addColorStop(1,"transparent");
			c.fillStyle = gradient;
			c.fillRect(-60, -60, 40, 40);
			//c.restore();
	}
	
	
	
	deployedLaser.update = function() {

			this.innerSize = (this.animationSize + this.animations[this.nextAnimationCalc]);
			this.outerSize = (this.animationSize + 5 +(2 * this.animations[this.nextAnimationCalc]));
			this.nextAnimationCalc += 1;
			if (this.nextAnimationCalc >= this.numberOfAnimations) {
				this.nextAnimationCalc = 0;
			}
			
			this.x = this.x + this.speed * Math.cos((this.direction - 90) * TO_RADIANS);
			this.y = this.y + this.speed * Math.sin((this.direction - 90) * TO_RADIANS);

	}
	
	
	
	
	
	deployedMunitions.push(deployedLaser);
	
	Game.printToDebugConsole("One laser object added");
	Game.printToDebugConsole("Total deployedMunitions = " + deployedMunitions.length);
	
}


