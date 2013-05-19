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

var Ship = new Object();



Ship.shipImage;

Ship.X = 250; // Canvas x
Ship.Y = 150; // Canvas y
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
	c.translate(this.X, this.Y);	
	c.rotate(this.Direction * TO_RADIANS);
	
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

	}
	
	else if (input == "Backwards") {
		this.X = this.X - this.Momentum * Math.cos((this.Direction - 90) * TO_RADIANS);
		this.Y = this.Y - this.Momentum * Math.sin((this.Direction - 90) * TO_RADIANS);
	}

	

	if (this.X <= -1) {
		if (previousDir == "left") {
			backgroundStars = [];
			backgroundStars = previousMaps[previousMaps.length - 3];
			previousMaps.push(backgroundStars);
		} else {
			initializeBackground();
		}
		previousDir = "right";
		this.X = canvasWidth - 2;
	} else if (this.X >= canvasWidth) {
		if (previousDir == "right") {
			backgroundStars = [];
			backgroundStars = previousMaps[previousMaps.length - 2];
			previousMaps.splice(previousMaps.length - 2);
			previousMaps.push(backgroundStars);
		} else {
			initializeBackground();
		}
		
		previousDir = "left";
		this.X = 2;
	} else if (this.Y <= -1) {
		if (previousDir == "down") {
			backgroundStars = [];
			backgroundStars = previousMaps[previousMaps.length - 2];
			previousMaps.splice(previousMaps.length - 2);
			previousMaps.push(backgroundStars);
		} else { 
			initializeBackground();
		}
		
		previousDir = "up";
		this.Y = canvasHeight - 2;
	} else if (this.Y >= canvasHeight) {
		if (previousDir == "up") {
			backgroundStars = [];
			backgroundStars = previousMaps[previousMaps.length - 2];
			previousMaps.splice(previousMaps.length - 2);
			previousMaps.push(backgroundStars);
		} else {
			initializeBackground();
		}
		
		previousDir = "down";
		this.Y = 2;
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

	var currentThrusterImage = this.ThrusterImage1;
	
	if(this.MovingForwards == true) {
		switch (this.thrustEffect) {
		
		case 0:		this.currentThrusterImage = this.ThrusterImage1;
					break;
		case 1:		this.currentThrusterImage = this.ThrusterImage2;
					break;
		case 2:		this.currentThrusterImage = this.ThrusterImage3;
					break;
		case 3:		this.currentThrusterImage = this.ThrusterImage2;
					break;
		}
	} else {
		switch (this.thrustEffect) {
		
		case 0:		this.currentThrusterImage = this.ThrusterImage4;
					break;
		case 1:		this.currentThrusterImage = this.ThrusterImage5;
					break;
		case 2:		this.currentThrusterImage = this.ThrusterImage4;
					break;
		case 3:		this.currentThrusterImage = this.ThrusterImage5;
					break;
		}
	}



	this.thrustEffect += 1;
	
	if (this.thrustEffect == 4) { 
		this.thrustEffect = 0; 
	}
	
	return currentThrusterImage;
}



Ship.CollisionDetection = function(){

	//this.ShieldActive = false;


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
			c.arc(this.X,this.Y,60,0,2*Math.PI);		
			c.stroke();
			c.restore();
		}
	}
	
}