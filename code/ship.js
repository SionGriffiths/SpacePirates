//=============================================
// Ship 
//=============================================


// Ship Vars
var shipImage;
var shipThrusterImage1;
var shipThrusterImage2;
var shipThrusterImage3;
var shipThrusterImage4;
var shipThrusterImage5;
var shipGunImage1;

var shipX = 250; // Canvas x
var shipY = 150; // Canvas y
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




function movePlayerShip(direction){
	if (fuel > 0) {

		//Game.printToDebugConsole("Moving Ship");	
	
		if (direction == "Forwards") {
			shipMovingForwards = true;
		
			fuel = fuel - (fuel / 100);
			if (fuel < 1) {
				fuel = 0;
			}
			//Game.printToDebugConsole("Fuel = " + fuel + "%");			
		}
	
	
		else if (direction == "Backwards") {
			shipMovingForwards = false;
			
			fuel = fuel - (fuel / 150);
			if (fuel < 1) {
				fuel = 0;
			}
			//Game.printToDebugConsole("Fuel = " + fuel + "%");
		}
	
		else if (direction == "Left") {
			shipTurningLeft = true;
		
			fuel = fuel - (fuel / 400);
			if (fuel < 1) {
				fuel = 0;
			}
			//Game.printToDebugConsole("Fuel = " + fuel + "%");
		}
	
		else if (direction == "Right") {
			shipTurningRight = true;
		
			fuel = fuel - (fuel / 400);
			if (fuel < 1) {
				fuel = 0;
			}
			//Game.printToDebugConsole("Fuel = " + fuel + "%");
		}
	} else {
		//Game.printToDebugConsole("Fuel is at " + fuel + "%");
		//Game.printToDebugConsole("Ship cannot fly");
	}
}


function stopMovePlayerShip(direction) {

	//Game.printToDebugConsole("Stop Moving Ship");	
	
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

// Paint the Ship
function paintPlayerShip() {
	c.save();
	c.translate(shipX, shipY);	
	c.rotate(shipDirection * TO_RADIANS);
	c.drawImage(shipImage, -50, -50, 100, 100);
	c.drawImage(getCurrentShipThrusterImage(), -50, 33, 100, 100);
	if(toggleDebug==true) {
		c.fillStyle="green";
		c.fillRect(-5,-5,10,10);
		c.strokeStyle = 'yellow';
		c.moveTo(0,0);
		c.lineTo(0,-60);
		c.stroke();	
		c.beginPath();
		c.arc(0,0,40,0,2*Math.PI);
		c.strokeStyle = 'red';
		c.stroke();
	}	
	c.restore();
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