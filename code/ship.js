//=============================================
// Ship 
//=============================================

// Ship Vars
//var shipImage;


var Ship = new Object();

Ship.ThrusterImage1;
Ship.ThrusterImage2;
Ship.ThrusterImage3;
Ship.ThrusterImage4;
Ship.ThrusterImage5;
Ship.GunImage1;

Ship.shipImage;

Ship.X = 0; // Game X
Ship.Y = 0; // Game Y
Ship.Direction = 0; // Degrees

Ship.Momentum = 0; // 0 - 6
Ship.MomentumDirection = 0; // Degrees
Ship.Acceleration = 0; // 0 - 6
Ship.AccelerationFactor = 0.1;
Ship.DecelerationFactor = 0.5;
Ship.ThrustPower = 1;
Ship.MaxSpeed = 30;
Ship.MovingForwards = false;
Ship.MovementModerator = 1;

Ship.TurningLeft = false;
Ship.TurningRight = false;

Ship.thrustEffect = 0;
Ship.currentShipThrusterImage;
Ship.lastAsteroidHit;

Ship.ShieldActive = false;
Ship.ShieldTimer = 0;
Ship.gunTurret = 0; // 0 or 1 - left or right turret


Ship.move = function(direction){
	if (fuel > 0) {

		//Game.printToDebugConsole("Moving Ship");	
	
		if (direction == "Forwards") {
			Ship.MovingForwards = true;
		
			fuel = fuel - (fuel / 100);
			if (fuel < 1) {
				fuel = 0;
			}
			//Game.printToDebugConsole("Fuel = " + fuel + "%");			
		}
	
	
		else if (direction == "Backwards") {
			
			this.MovingForwards = false;
			
			this.Momentum /= 1.5;
			
			fuel = fuel - (fuel / 150);
			if (fuel < 1) {
				fuel = 0;
			}
			//Game.printToDebugConsole("Fuel = " + fuel + "%");
		}
	
		else if (direction == "Left") {
			this.TurningLeft = true;
		
			fuel = fuel - (fuel / 400);
			if (fuel < 1) {
				fuel = 0;
			}
			//Game.printToDebugConsole("Fuel = " + fuel + "%");
		}
	
		else if (direction == "Right") {
			this.TurningRight = true;
		
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



Ship.stopMove = function(direction) {

	//Game.printToDebugConsole("Stop Moving Ship");	
	
	if (direction == "Forwards") {
		this.MovingForwards = false;
	}

	if (direction == "Left") {
		this.TurningLeft = false;
	}
	
	if (direction == "Right") {
		this.TurningRight = false;
	}
}


Ship.update = function() {

	// Only calculate and move one in 3 game loops
	this.MovementModerator += 1;
	
	if (this.MovementModerator == 3) {

	if (this.MovingForwards) {
		if (this.Acceleration <= 5) {
			this.Acceleration += this.AccelerationFactor;
		}
		
		this.Momentum = this.Momentum + this.Acceleration;

		if(this.Momentum > this.MaxSpeed) {
			this.Momentum = this.MaxSpeed;
		}
	}	
	else {
		this.Acceleration = 0;
		if (this.Momentum > 0) {
			this.Momentum -= this.DecelerationFactor;
		}

		if(this.Momentum < 1) {
			this.Momentum = 0;
		}
	}	
	
	this.updateCoordinates("Forwards");	
	
	this.MovementModerator = 1;
	}
	
	if (this.TurningLeft) {
		this.changeDirection("Left");
	}
	
	else if (this.TurningRight) {
		this.changeDirection("Right");
	}
	
	if (this.ShieldActive) {
		this.ShieldTimer += 1;
		
		if (this.ShieldTimer > 40) {
			this.ShieldActive = false;
			this.ShieldTimer = 0;
		}
	}
	
	this.CollisionDetection();	
}



// Paint the Ship
Ship.paint = function() {
	c.save();
	c.translate(gameMap.translateX(this.X), gameMap.translateY(this.Y));
	c.rotate(this.Direction * TO_RADIANS);
	
	//Game.printToDebugConsole("P GameXY: " + this.X + " " + this.Y);
	//Game.printToDebugConsole("P CanvasXY: " + gameMap.translateX(this.X) + " " + gameMap.translateY(this.Y));
	
	if (this.ShieldActive) {
		c.save();
		c.scale(1, 1.5);
		c.beginPath();
		c.arc(0,0,40,0,2*Math.PI);
		var grd = c.createRadialGradient(0,0,5,0,0,70);
		grd.addColorStop(0.2,"rgba(255,255,255, 0.1)");
		grd.addColorStop(0.9, "white");
		c.fillStyle = grd;
		c.strokeStyle = "white";
		c.stroke();
		c.fill();
		c.restore();
	}
	
	c.drawImage(this.shipImage, -50, -50, 100, 100);
	c.drawImage(this.getCurrentThrusterImage(), -50, 33, 100, 100);
	
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

// Find the this.s new coordinates when moving in a direction
// new X = X * sin(angle) + Y * cos(angle) 
// new Y= X * sin(angle) + Y * -cos(angle)
Ship.updateCoordinates = function(input) {
	
	if (input == "Forwards") {
		this.X = this.X + this.Momentum * Math.cos((this.Direction - 90) * TO_RADIANS);
		this.Y = this.Y + this.Momentum * Math.sin((this.Direction - 90) * TO_RADIANS);
		//Game.printToDebugConsole("U GameXY: " + this.X + " " + this.Y);
		//Game.printToDebugConsole("U CanvasXY: " + gameMap.translateX(this.X) + " " + gameMap.translateY(this.Y));
	}
	
	else if (input == "Backwards") {
		this.X = this.X - this.Momentum * Math.cos((this.Direction - 90) * TO_RADIANS);
		this.Y = this.Y - this.Momentum * Math.sin((this.Direction - 90) * TO_RADIANS);
	}

	
	
	
	
	var movementInitiated = false;
	var movementModerator = 50 - (this.Momentum / 1.5);
	gameMap.boundaryShiftDirectionX = " ";
	gameMap.boundaryShiftDirectionY = " ";
	
	
	if (this.X > gameMap.currentX) {
		var difference = (this.X - gameMap.currentX);
		
		if (difference > 30) {
			
			gameMap.currentX += (difference / movementModerator);
			gameMap.boundaryShift = true;
			gameMap.boundaryShiftDirectionX = "Right";
			
			movementInitiated = true; 
		}
		
		if (difference > gameMap.boundaryRadiusX) {
			
			gameMap.currentX += (difference / movementModerator);
			gameMap.boundaryShift = true;
			gameMap.boundaryShiftDirectionX = "Right";
			
			movementInitiated = true;
		
		
		}
		
		if (difference > gameMap.boundaryRadiusX + 50) {
			
			gameMap.currentX += ((difference / movementModerator) / 2);
			gameMap.boundaryShift = true;
			gameMap.boundaryShiftDirectionX = "Right";
			
			movementInitiated = true;
		
		
		}
		
		
		
	}

	if (this.X < gameMap.currentX) {
		var difference = (gameMap.currentX - this.X);
		
		if (difference > 30) {
		
			gameMap.currentX -= (difference / movementModerator);
			gameMap.boundaryShift = true;
			gameMap.boundaryShiftDirectionX = "Left";
			
			movementInitiated = true; 
		}
		
		if (difference > gameMap.boundaryRadiusX) {
			gameMap.currentX -= (difference / movementModerator);
			gameMap.boundaryShift = true;
			gameMap.boundaryShiftDirectionX = "Left";
			
			movementInitiated = true; 
		
		}
		
		if (difference > gameMap.boundaryRadiusX + 50) {
			gameMap.currentX -= ((difference / movementModerator) / 2);
			gameMap.boundaryShift = true;
			gameMap.boundaryShiftDirectionX = "Left";
			
			movementInitiated = true; 
		
		}
		
	}

	if (this.Y > gameMap.currentY) {
		var difference = (this.Y - gameMap.currentY);
		
		if (difference > 30) {
			
			gameMap.currentY += (difference / movementModerator);
			gameMap.boundaryShift = true;
			gameMap.boundaryShiftDirectionY = "Down";
			movementInitiated = true; 
		}
		
		if (difference > gameMap.boundaryRadiusY) {
		
			gameMap.currentY += (difference / movementModerator);
			gameMap.boundaryShift = true;
			gameMap.boundaryShiftDirectionY = "Down";
			movementInitiated = true; 
		
		}
		
		if (difference > gameMap.boundaryRadiusY + 50) {
		
			gameMap.currentY += ((difference / movementModerator) / 2);
			gameMap.boundaryShift = true;
			gameMap.boundaryShiftDirectionY = "Down";
			movementInitiated = true; 
		
		}
	}
	
	if (this.Y < gameMap.currentY) {
		var difference = (gameMap.currentY - this.Y);
		
		if (difference > 30) {
			
			gameMap.currentY -= (difference / movementModerator);
			gameMap.boundaryShift = true;
			gameMap.boundaryShiftDirectionY = "Up";
			movementInitiated = true; 
		}
		
		if (difference > gameMap.boundaryRadiusY) {
		
			gameMap.currentY -= (difference / movementModerator);
			gameMap.boundaryShift = true;
			gameMap.boundaryShiftDirectionY = "Up";
			movementInitiated = true; 
		
		}
		
		if (difference > gameMap.boundaryRadiusY + 50) {
		
			gameMap.currentY -= ((difference / movementModerator) / 2);
			gameMap.boundaryShift = true;
			gameMap.boundaryShiftDirectionY = "Up";
			movementInitiated = true; 
		
		}
		
	}

	if (!movementInitiated) {
		gameMap.boundaryShift = false;
	}
	
	
}

// Change the angle the this. is facing
Ship.changeDirection = function(input) {

	if (input == "Left") {
		if ( this.Direction <= 0 ) {
			this.Direction = 360;
		}
		else {
			this.Direction -= 3;
		}
	}
	
	if (input == "Right") {
		if (this.Direction >= 360) {
			this.Direction = 0;
		}
		else {
			this.Direction += 3;
		}
	}
}



Ship.getCurrentThrusterImage = function() {

	this.currentThrusterImage = this.ThrusterImage1;
	
	if(this.MovingForwards == true) {
		switch (this.thrustEffect) {
		
		case 0:		this.currentShipThrusterImage = this.ThrusterImage1;
					break;
		case 1:		this.currentShipThrusterImage = this.ThrusterImage2;
					break;
		case 2:		this.currentShipThrusterImage = this.ThrusterImage3;
					break;
		case 3:		this.currentShipThrusterImage = this.ThrusterImage2;
					break;
		}
	} else {
		switch (this.thrustEffect) {
		
		case 0:		this.currentShipThrusterImage = this.ThrusterImage4;
					break;
		case 1:		this.currentShipThrusterImage = this.ThrusterImage5;
					break;
		case 2:		this.currentShipThrusterImage = this.ThrusterImage4;
					break;
		case 3:		this.currentShipThrusterImage = this.ThrusterImage5;
					break;
		}
	}

	this.thrustEffect += 1;
	
	if (this.thrustEffect == 4) { 
		this.thrustEffect = 0; 
	}
	
	return this.currentShipThrusterImage;
}



Ship.CollisionDetection = function(){

	//this.ShieldActive = false;
	for (var i = 0; i < Game.planets.length; i++) {
		var collisionOccured = liesWithinRadius(
			Game.planets[i].x,
			Game.planets[i].y,
			this.X,
			this.Y,
			Game.planets[i].Size);
			if(toggleDebug==true) {
				c.save();
				c.beginPath();
				c.strokeStyle = 'blue';
				c.arc(gameMap.translateX(Game.planets[i].x),gameMap.translateY(Game.planets[i].y),Game.planets[i].Size,0,2*Math.PI);		
				c.stroke();
				c.restore();
			}
		if (collisionOccured) {
			console.log('PLANET HAPPENED! :D');
			this.Momentum += Game.planets[i].massFactor;

			if(this.Y>Game.planets[i].y) {this.Direction +=4;}
			if(this.Y<Game.planets[i].y) {this.Direction -= 4;}
			if(this.X<Game.planets[i].x) {this.Direction +=4;}
			if(this.X>Game.planets[i].x) {this.Direction -= 4;}
		}
	}


	for (var i = 0; i < Game.asteroids.length; i++) {
		var collisionOccured = liesWithinRadius(
			Game.asteroids[i].x + Game.asteroids[i].Scale ,
			Game.asteroids[i].y + Game.asteroids[i].Scale,
			this.X,
			this.Y,
			80);
			
		if (collisionOccured) {
		
			this.ShieldActive = true;
		
		
			if (!(Game.asteroids[i].recentlyHit)) {
			
			Game.asteroids[i].recentlyHit = true;
		
			// Flash Shield Up
			//c.save();
			//c.beginPath();
			//c.strokeStyle = 'violet';
			//c.arc(this.X,this.Y,60,0,2*Math.PI);		
			//c.stroke();
			//c.restore();
	
			
			// DISPLAY SHIELD
	
	
	
			// Bounce Asteroid
			var allignedDirection = this.Direction - 90;
			if (allignedDirection < 0) { allignedDirection += 360; }
			var newAsteroidDirection;
			
			if (allignedDirection > Game.asteroids[i].direction) {
				newAsteroidDirection = Game.asteroids[i].direction - (Math.floor(Math.random() * 180));
			}
			else {
				newAsteroidDirection = Game.asteroids[i].direction + (Math.floor(Math.random() * 180));
			}
			
			if (newAsteroidDirection < 0) { newAsteroidDirection += 360; }

			Game.asteroids[i].direction = newAsteroidDirection;

			if (this.Momentum > 0) {
				Game.asteroids[i].Speed += (this.Momentum / 2);
			}

			}
		}

		if(toggleDebug==true) {
			c.save();
			c.beginPath();
			c.strokeStyle = 'orange';
			c.arc(gameMap.translateX(this.X),gameMap.translateY(this.Y),60,0,2*Math.PI);		
			c.stroke();
			c.restore();
		}
	}
	
}