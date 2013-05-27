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
Ship.AccelerationFactor = 0.4;
Ship.DecelerationFactor = 0.5;
Ship.ThrustPower = 1;

Ship.MaxSpeed = 18;


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
Ship.ShieldSize = 50;
Ship.ShieldLevel = 100;
Ship.MaxShieldLevel = 100;
Ship.HullStrength = 100;
Ship.MaxHullStrength = 100;


Ship.destroyed = false;
Ship.destroySequence = 0;
Ship.destroySequenceCounter = 0;

Ship.maxFuel = 100;




Ship.reset = function() {

	this.X = 0;
	this.Y = 0;
	this.Direction = 0;
	this.Momentum = 0;
	this.MomentumDirection = 0;
	this.Acceleration = 0;
	this.AccelerationFactor = 0.4;
	this.DecelerationFactor = 0.5;
	this.ThrustPower = 1;
	this.MaxSpeed = 18;
	this.MovingForwards = false;
	this.MovementModerator = 1;
	this.TurningLeft = false;
	this.TurningRight = false;
	this.thrustEffect = 0;
	this.currentShipThrusterImage;
	this.ShieldActive = false;
	this.ShieldTimer = 0;
	this.gunTurret = 0;
	this.ShieldSize = 50;
	this.ShieldLevel = 100;
	this.MaxShieldLevel = 100;
	this.HullStrength = 100;
	this.MaxHullStrength = 100;
	this.destroyed = false;
	this.destroySequence = 0;
	this.destroySequenceCounter = 0;

}

Ship.move = function(direction){
	if (fuel > 0) {

		if (direction == "Forwards") {
			Ship.MovingForwards = true;	
		}
		
		else if (direction == "Backwards") {
			this.MovingForwards = false;
			this.Momentum /= 1.5;
		}
	
		else if (direction == "Left") {
			this.TurningLeft = true;
		}
	
		else if (direction == "Right") {
			this.TurningRight = true;
		}
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

	if (!(this.destroyed)) {

		this.FuelUsage();

		// Only calculate and move one in 3 game loops
		this.MovementModerator += 1;
		
		if (this.MovementModerator == 3) {

		if (this.MovingForwards) {
			if (this.Acceleration <= 5) {
				this.Acceleration += this.AccelerationFactor;
			}
			
			this.Momentum = this.Momentum + (this.Acceleration / 2);

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
		
		this.CollisionDetection2();

		if(this.ShieldLevel < 0) {
			this.ShieldLevel = 0;
		}
		else if(this.ShieldLevel > this.MaxShieldLevel) {
			this.ShieldLevel = this.MaxShieldLevel;
		} 
		else {
			this.ShieldLevel +=0.2;
		}

		if (this.HullStrength > this.MaxHullStrength) {
			this.HullStrength = this.MaxHullStrength;
		}
		
		if (this.HullStrength < 0) {
			this.HullStrength = 0;
			this.destroyed = true;
		}

	}
}



// Paint the Ship
Ship.paint = function() {
	c.save();
	c.translate(gameMap.translateX(this.X), gameMap.translateY(this.Y));
	
	if (!(this.destroyed)) {
		
		c.rotate(this.Direction * TO_RADIANS);
		
		if(Game.mode=='play'){
			if (this.ShieldActive && this.ShieldLevel > 2) {
				c.save();
				c.scale(1*z, 1.5*z);
				c.beginPath();
				c.arc(0,0,40,0,2*Math.PI);
				var grd = c.createRadialGradient(0,0,5,0,0,70*z);
				grd.addColorStop(0.2,"rgba(255,255,255, 0.1)");
				grd.addColorStop(0.9, "rgba(255,255,255, 0.6)");
				c.fillStyle = grd;
				c.strokeStyle = "rgba(255,255,255, 0.8)";
				c.stroke();
				c.fill();
				c.restore();
			}		
			c.drawImage(this.shipImage, -50*z, -50*z, 100*z, 100*z);
			c.drawImage(this.getCurrentThrusterImage(), -50*z, 33*z, 100*z, 100*z);
		}
		if(Game.mode=='map'){
			c.fillStyle="orange";
			c.fillRect(-5,-5,10,10);
		}	
		if(toggleDebug==true) {
			c.fillStyle="green";
			c.fillRect(-5*z,-5*z,10*z,10*z);
			c.strokeStyle = 'yellow';
			c.moveTo(0,0);
			c.lineTo(0,-60*z);
			c.stroke();	
			c.beginPath();
			c.arc(0,0,40*z,0,2*Math.PI);
			c.strokeStyle = 'red';
			c.stroke();
		}
		
	}
	
	else {
	
		this.paintDestroyedSequence();
		
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
		this.Y = this.Y - this.Momenwum * Math.sin((this.Direction - 90) * TO_RADIANS);
	}
	
	
	
	var movementInitiated = false;
	var movementModerator = (100 - (this.Momentum / 1.5))*z;
	gameMap.boundaryShiftDirectionX = " ";
	gameMap.boundaryShiftDirectionY = " ";
	
	
	if (this.X > gameMap.currentX) {
		var difference = (this.X - gameMap.currentX)*z;
		
		if (z >= 1) {
			gameMap.currentX = this.X;
			gameMap.boundaryShift = true;
			gameMap.boundaryShiftDirectionX = "Right";
			movementInitiated = true;
		}
		
		
		if (difference > (gameMap.boundaryRadiusX / z) + (150 * z)) {
			
			gameMap.currentX += difference;
			gameMap.boundaryShift = true;
			gameMap.boundaryShiftDirectionX = "Right";
			
			movementInitiated = true;
		
		
		}
		
		else if (difference > (gameMap.boundaryRadiusX / z) + (50/z)) {
			
			gameMap.currentX += ((difference / movementModerator) / (10 * z));
			gameMap.boundaryShift = true;
			gameMap.boundaryShiftDirectionX = "Right";
			
			movementInitiated = true;
		
		
		}
		
		else if (difference > (gameMap.boundaryRadiusX / z)) {
			
			gameMap.currentX += (difference / movementModerator) * (10*z);
			gameMap.boundaryShift = true;
			gameMap.boundaryShiftDirectionX = "Right";
			
			movementInitiated = true;
		
		
		}
		
		else if (difference > 30*z) {
			
			gameMap.currentX += (difference / movementModerator) * (10*z);
			gameMap.boundaryShift = true;
			gameMap.boundaryShiftDirectionX = "Right";
			
			movementInitiated = true; 
		}
		
		
		
	}

	if (this.X < gameMap.currentX) {
		var difference = (gameMap.currentX - this.X)*z;
		
		if (z >= 1) {
			gameMap.currentX = this.X;
			gameMap.boundaryShift = true;
			gameMap.boundaryShiftDirectionX = "Left";
			movementInitiated = true; 
		}
		
		
		if (difference > (gameMap.boundaryRadiusX / z) + (150 * z)) {
			gameMap.currentX -= difference;
			gameMap.boundaryShift = true;
			gameMap.boundaryShiftDirectionX = "Left";
			
			movementInitiated = true; 
		
		}
		
		else if (difference > (gameMap.boundaryRadiusX / z) + (50/z)) {
			gameMap.currentX -= ((difference / movementModerator) / (10 * z));
			gameMap.boundaryShift = true;
			gameMap.boundaryShiftDirectionX = "Left";
			
			movementInitiated = true; 
		
		}
		
		else if (difference > (gameMap.boundaryRadiusX / z)) {
			gameMap.currentX -= (difference / movementModerator) * (10*z);
			gameMap.boundaryShift = true;
			gameMap.boundaryShiftDirectionX = "Left";
			
			movementInitiated = true; 
		
		}
		
		else if (difference > 30*z) {
		
			gameMap.currentX -= (difference / movementModerator) * (10*z);
			gameMap.boundaryShift = true;
			gameMap.boundaryShiftDirectionX = "Left";
			
			movementInitiated = true; 
		}
		
		
		
		
		
	}

	if (this.Y > gameMap.currentY) {
		var difference = (this.Y - gameMap.currentY)*z;
		
		if (z >= 1) {
		
			gameMap.currentY = this.Y;
			gameMap.boundaryShift = true;
			gameMap.boundaryShiftDirectionY = "Down";
			movementInitiated = true; 
		
		}
		
		if (difference >= (gameMap.boundaryRadiusY / z) + (100 * z)) {
		
			gameMap.currentY += difference;
			gameMap.boundaryShift = true;
			gameMap.boundaryShiftDirectionY = "Down";
			movementInitiated = true; 
		
		}
		
		
		
		else if (difference >= (gameMap.boundaryRadiusY / z) + (50 / z)) {
		
			gameMap.currentY += ((difference / movementModerator) / (10 * z));
			gameMap.boundaryShift = true;
			gameMap.boundaryShiftDirectionY = "Down";
			movementInitiated = true; 
		
		}
		
		
		else if (difference > (gameMap.boundaryRadiusY / 2)) {
		
			gameMap.currentY += (difference / movementModerator) * (10*z);
			gameMap.boundaryShift = true;
			gameMap.boundaryShiftDirectionY = "Down";
			movementInitiated = true; 
		
		}
		
		else if (difference > 30*z) {
			
			gameMap.currentY += (difference / movementModerator) * (10*z);
			gameMap.boundaryShift = true;
			gameMap.boundaryShiftDirectionY = "Down";
			movementInitiated = true; 
		}
	}
	
	
	
	
	
	if (this.Y < gameMap.currentY) {
		var difference = (gameMap.currentY - this.Y)*z;
		
		if (z >= 1) {
		
			gameMap.currentY = this.Y;
			gameMap.boundaryShift = true;
			gameMap.boundaryShiftDirectionY = "Up";
			movementInitiated = true; 
		
		}
		
		if (difference >= (gameMap.boundaryRadiusY / z) + (100 * z)) {
		
			gameMap.currentY -= difference;
			gameMap.boundaryShift = true;
			gameMap.boundaryShiftDirectionY = "Up";
			movementInitiated = true; 
		
		}
		
		
		else if (difference >= (gameMap.boundaryRadiusY / z) + (50 / z)) {
		
			gameMap.currentY -= ((difference / movementModerator) / (10 * z));
			gameMap.boundaryShift = true;
			gameMap.boundaryShiftDirectionY = "Up";
			movementInitiated = true; 
		
		}
		
		else if (difference > (gameMap.boundaryRadiusY / z)) {
		
			gameMap.currentY -= (difference / movementModerator) * (10*z);
			gameMap.boundaryShift = true;
			gameMap.boundaryShiftDirectionY = "Up";
			movementInitiated = true; 
		
		}
		
		
		else if (difference > 30*z) {
			
			gameMap.currentY -= (difference / movementModerator) * (10*z);
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











Ship.CollisionDetection2 = function(){
	
	scsD = new Date();
	shipCollisionStart = scsD.getTime();
	
	
	var localPlanets = getClosePlanets();
	
	
	for (var i = 0; i < localPlanets.length; i++) {
		var collisionOccured = liesWithinRadius(
			localPlanets[i].x,
			localPlanets[i].y,
			this.X,
			this.Y,
			localPlanets[i].Size*z);
			if(toggleDebug==true) {
				c.save();
				c.beginPath();
				c.strokeStyle = 'blue';
				c.arc(gameMap.translateX(localPlanets[i].x),gameMap.translateY(localPlanets[i].y),localPlanets[i].Size*z,0,2*Math.PI);		
				c.stroke();
				c.restore();
			}
		if (collisionOccured) {
			console.log('PLANET HAPPENED! :D');
			this.Momentum += localPlanets[i].massFactor;

			if(this.Y>localPlanets[i].y) {this.Direction +=4;}
			if(this.Y<localPlanets[i].y) {this.Direction -= 4;}
			if(this.X<localPlanets[i].x) {this.Direction +=4;}
			if(this.X>localPlanets[i].x) {this.Direction -= 4;}
		}
	}

	var localAsteroids = getCloseAsteroids();

	for (var i = 0; i < localAsteroids.length; i++) {
		var collisionOccured = liesWithinRadius(
			localAsteroids[i].x + localAsteroids[i].Scale ,
			localAsteroids[i].y + localAsteroids[i].Scale,
			this.X,
			this.Y,
			(this.ShieldSize + localAsteroids[i].Size)*z);
			
		if (collisionOccured) {
		
			this.ShieldActive = true;
			this.ShieldLevel -=  0.1;
		
			if (!(localAsteroids[i].recentlyHit)) {
			
			localAsteroids[i].recentlyHit = true;
			
			// Bounce Asteroid
			var allignedDirection = this.Direction - 90;
			if (allignedDirection < 0) { allignedDirection += 360; }
			var newAsteroidDirection;
			
			if (allignedDirection > localAsteroids[i].direction) {
				newAsteroidDirection = localAsteroids[i].direction - (Math.floor(Math.random() * 180));
			}
			else {
				newAsteroidDirection = localAsteroids[i].direction + (Math.floor(Math.random() * 180));
			}
			
			if (newAsteroidDirection < 0) { newAsteroidDirection += 360; }

			localAsteroids[i].direction = newAsteroidDirection;

			if (this.Momentum > 0) {
				localAsteroids[i].Speed += (this.Momentum / 2);
				if (localAsteroids[i].Speed > this.MaxSpeed) { localAsteroids[i].Speed = this.MaxSpeed; }
			}

			}
		}

		if(toggleDebug==true) {
			c.save();
			c.beginPath();
			c.strokeStyle = 'orange';
			c.arc(gameMap.translateX(this.X),gameMap.translateY(this.Y),60*z,0,2*Math.PI);		
			c.stroke();
			c.restore();
		}
		if(z<0.26) {
			c.save();
			c.beginPath();
			c.strokeStyle = 'orange';
			c.arc(gameMap.translateX(this.X),gameMap.translateY(this.Y),60*z,0,2*Math.PI);		
			c.stroke();
			c.restore();
		}
	}
	
	
	for (var i = 0; i < deployedMunitions.length; i++) {
	
		var collisionOccured = liesWithinRadius(
					deployedMunitions[i].x,
					deployedMunitions[i].y,
					this.X,
					this.Y,					
					//(this.ShieldSize + 10)*z);
					((this.ShieldSize/z) * 2) * (z / 1.1));
		
		if (collisionOccured && deployedMunitions[i].origin != "PlayerShip") {
			
			if (this.ShieldLevel > 2) { this.ShieldActive = true; }
			
			if (this.ShieldLevel - deployedMunitions[i].power < 0) {
				this.ShieldLevel -=  deployedMunitions[i].power;
				var difference = Math.abs(0 - this.ShieldLevel);
				this.HullStrength -= difference;
			}	
			else {
				this.ShieldLevel -=  deployedMunitions[i].power;
			}
			
			deployedMunitions[i].destroyed = true;
		
		}
		
	
	}
	
	scfD = new Date();
	shipCollisionFinish = scfD.getTime();
	
}












Ship.FuelUsage = function() {

	if (fuel < 1) {
		fuel = 0;
	}
	else {
		if (gameMap.boundaryShift) {
			fuel -= 0.01;
		}
		else {
			fuel += 0.005;
			
			if (fuel > this.maxFuel) { fuel = this.maxFuel; }
		}
	}
}



function getClosePlanets() {

	var closePlanets = new Array();

	for (var i = 0; i < Game.planets.length; i++) {
		var isCloseBy = liesWithinRadius(
			Game.planets[i].x,
			Game.planets[i].y,
			Ship.X,
			Ship.Y,
			canvasWidth / z);
	
		if (isCloseBy) { closePlanets.push(Game.planets[i]); }
		
	}
	
	return closePlanets;
	
	
}

// Paints the ship destroyed animation
Ship.paintDestroyedSequence = function(){

	switch (this.destroySequence) {

	case 0:		c.save();
				var gradient = c.createRadialGradient(0, 0, 1*z, 0, 0, 40*z);
				gradient.addColorStop(0.1,"rgba(219,0,0, 0.1)");
				gradient.addColorStop(0.5, "rgba(255,0,0, 0.5)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-400*z, -400*z, 1200*z, 1200*z);
				c.restore();
				this.destroySequence += 1;
				break;
	case 1:		c.save();
				var gradient = c.createRadialGradient(0, 0, 15*z, 0, 0, 70*z);
				gradient.addColorStop(0.1,"rgba(200,0,0, 0.1)");
				gradient.addColorStop(0.9, "rgba(180,10,10, 0.5)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-400*z, -400*z, 1200*z, 1200*z);
				c.restore();
				this.destroySequence += 1;
				break;
	case 2:		c.save();
				var gradient = c.createRadialGradient(0, 0, 20*z, 0, 0, 80*z);
				gradient.addColorStop(0.1,"rgba(255,0,0, 0.5)");
				gradient.addColorStop(0.9, "rgba(123,0,0, 0.5)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-400*z, -400*z, 1200*z, 1200*z);
				c.restore();
				this.destroySequence += 1;
				break;
	case 3:		c.save();
				var gradient = c.createRadialGradient(0, 0, 40*z, 0, 0, 120*z);
				gradient.addColorStop(0.1,"rgba(234,30,60, 0.9)");
				gradient.addColorStop(0.5, "rgba(255,0,0, 0.9)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-400*z, -400*z, 1200*z, 1200*z);
				c.restore();
				this.destroySequence += 1;
				break;
	case 4:		c.save();
				var gradient = c.createRadialGradient(0, 0, 50*z, 0, 0, 150*z);
				gradient.addColorStop(0.1,"rgba(255,0,91, 0.3)");
				gradient.addColorStop(0.9, "rgba(255,204,0, 0.3)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-400*z, -400*z, 1200*z, 1200*z);
				c.restore();
				if (this.destroySequenceCounter == 0) { 
					this.destroySequenceCounter = 1;
					this.destroySequence = 0;
				}
				else if (this.destroySequenceCounter == 1) {
					this.destroySequenceCounter = 2;
					this.destroySequence = 0;
				}
				else { this.destroySequenceCounter = 0; this.destroySequence += 1; }
				break;
	case 5:		c.save();
				var gradient = c.createRadialGradient(0, 0, 100*z, 0, 0, 380*z);
				gradient.addColorStop(0.5, "rgba(255,0,0, 0.2)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-400*z, -400*z, 1200*z, 1200*z);
				c.restore();
				this.destroySequence += 1;
				break;
	case 6:		c.save();
				var gradient = c.createRadialGradient(0, 0, 180*z, 0, 0, 410*z);
				gradient.addColorStop(0.5,"rgba(255,0,0, 0.7)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-600*z, -600*z, 1800*z, 1800*z);
				c.restore();
				this.destroySequence += 1;
				break;
	case 7:		c.save();
				var gradient = c.createRadialGradient(0, 0, 230*z, 0, 0, 610*z);
				gradient.addColorStop(0.5,"rgba(255,0,0, 0.8)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-800*z, -800*z, 2400*z, 2400*z);
				c.restore();
				this.destroySequence += 1;
				break;
	case 8:		c.save();
				var gradient = c.createRadialGradient(0, 0, 250*z, 0, 0, 800*z);
				gradient.addColorStop(0.5,"rgba(255,0,0, 0.9)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-1000*z, -1000*z, 3200*z, 3200*z);
				c.restore();
				this.destroySequence += 1;
				break;
	case 9:		c.save();
				var gradient = c.createRadialGradient(0, 0, 250*z, 0, 0, 800*z);
				gradient.addColorStop(0.5,"rgba(255,0,0, 0.8)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-1000*z, -1000*z, 3200*z, 3200*z);
				c.restore();
				this.destroySequence += 1;
				break;
	case 10:	c.save();
				var gradient = c.createRadialGradient(0, 0, 150*z, 0, 0, 600*z);
				gradient.addColorStop(0.5,"rgba(255,0,0, 0.7)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-1000*z, -1000*z, 3200*z, 3200*z);
				c.restore();
				this.destroySequence += 1;
				break;
	case 11:	c.save();
				var gradient = c.createRadialGradient(0, 0, 250*z, 0, 0, 800*z);
				gradient.addColorStop(0.5,"rgba(255,0,0, 0.6)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-1000*z, -1000*z, 3200*z, 3200*z);
				c.restore();
				this.destroySequence += 1;
				break;
	case 12:	c.save();
				var gradient = c.createRadialGradient(0, 0, 150*z, 0, 0, 400*z);
				gradient.addColorStop(0.5,"rgba(255,0,0, 0.5)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-1000*z, -1000*z, 3200*z, 3200*z);
				c.restore();
				this.destroySequence += 1;
				break;
	case 13:	c.save();
				var gradient = c.createRadialGradient(0, 0, 250*z, 0, 0, 800*z);
				gradient.addColorStop(0.5,"rgba(255,0,0, 0.4)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-1000*z, -1000*z, 3200*z, 3200*z);
				c.restore();
				this.destroySequence += 1;
				break;
	case 14:	c.save();
				var gradient = c.createRadialGradient(0, 0, 150*z, 0, 0, 600*z);
				gradient.addColorStop(0.5,"rgba(255,0,0, 0.6)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-1000*z, -1000*z, 3200*z, 3200*z);
				c.restore();
				this.destroySequence += 1;
				break;
	case 15:	c.save();
				var gradient = c.createRadialGradient(0, 0, 250*z, 0, 0, 800*z);
				gradient.addColorStop(0.5,"rgba(255,0,0, 0.4)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-1000*z, -1000*z, 3200*z, 3200*z);
				c.restore();
				this.destroySequence += 1;
				break;
	case 16:	c.save();
				var gradient = c.createRadialGradient(0, 0, 150*z, 0, 0, 500*z);
				gradient.addColorStop(0.5,"rgba(255,0,0, 0.3)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-1000*z, -1000*z, 3200*z, 3200*z);
				c.restore();
				this.destroySequence += 1;
				break;
	case 17:	c.save();
				var gradient = c.createRadialGradient(0, 0, 250*z, 0, 0, 800*z);
				gradient.addColorStop(0.5,"rgba(255,0,0, 0.2)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-1000*z, -1000*z, 3200*z, 3200*z);
				c.restore();
				this.destroySequence += 1;
				break;
	case 18:	c.save();
				var gradient = c.createRadialGradient(0, 0, 150*z, 0, 0, 500*z);
				gradient.addColorStop(0.5,"rgba(255,0,0, 0.1)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-1000*z, -1000*z, 3200*z, 3200*z);
				c.restore();
				this.destroySequence += 1;
				break;
	case 19:	Game.mode = 'Player Ship Destroyed';
				break;
	}
}