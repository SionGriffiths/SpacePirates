
function EnemyShip() {

this.x;
this.y;
	
this.type;
this.strength;
this.speed;
this.width;
this.height;	
this.image;	
this.direction;
this.momentum;
this.nextLocationX;
this.nextLocationY;
this.collisionRadius;
this.lastFireTime;
this.target;
this.fireRate;
this.shieldActivated;
this.shieldLevel;
this.maxShieldLevel;
this.shieldTimer;
this.shieldSize;
this.hitPoints;
this.maxHitPoints;
this.destroyed;
this.destroySequence;
this.destroySequenceCounter;


this.draw = function() {

	c.save();
	c.translate(gameMap.translateX(this.x), gameMap.translateY(this.y));
	
	if (!(this.destroyed)) {
	
		// Paint Shield and health/shield levels
		switch (this.type) {
		
		case "Standard Vagabond":	if (this.shieldLevel < this.maxShieldLevel || this.hitPoints < this.maxHitPoints) {
										c.save();
										c.fillStyle = "white";
										c.fillRect(-50*z,120*z, (this.shieldLevel/2)*z, 10*z);
										c.fillStyle = "green";
										c.fillRect(-50*z,135*z, (this.hitPoints/2)*z, 10*z);
										c.restore();
									}
									c.rotate(this.direction * TO_RADIANS);
									if (this.shieldActivated && this.shieldLevel > 2) {
										c.save();
										c.scale(1*z, 1.5*z);
										c.beginPath();
										c.arc(-10,0,100,0,2*Math.PI);
										var grd = c.createRadialGradient(0,0,15*(z/3),0,0,120*(z/3));
										grd.addColorStop(0.2,"rgba(24,163,0, 0.1)");
										grd.addColorStop(0.9, "rgba(114,214,96, 0.6)");
										c.fillStyle = grd;
										c.strokeStyle = "rgba(170,255,156, 0.8)";
										c.stroke();
										c.fill();
										c.restore();
									}
									break;
		case "Behemoth Battleship":	if (this.shieldLevel < this.maxShieldLevel || this.hitPoints < this.maxHitPoints) {
										c.save();
										c.fillStyle = "white";
										c.fillRect(-100*z,220*z, (this.shieldLevel/2)*z, 10*z);
										c.fillStyle = "rgb(122,82,35)";
										c.fillRect(-100*z,235*z, (this.hitPoints/2)*z, 10*z);
										c.restore();
									}
									c.rotate(this.direction * TO_RADIANS);
									if (this.shieldActivated && this.shieldLevel > 2) {
										c.save();
										c.scale(1*z, 1.5*z);
										c.beginPath();
										c.arc(-10,0,200,0,2*Math.PI);
										var grd = c.createRadialGradient(0,0,10*(z/3),0,0,150*(z/3));
										grd.addColorStop(0.2, "black");
										grd.addColorStop(0.9, "rgba(153,89,15, 0.6)");
										c.fillStyle = grd;
										c.strokeStyle = "rgba(227,131,20, 0.8)";
										c.stroke();
										c.fill();
										c.restore();
									}
									break;
		case "Fighter Squadron":	if (this.shieldLevel < this.maxShieldLevel || this.hitPoints < this.maxHitPoints) {
										c.save();
										c.fillStyle = "white";
										c.fillRect(-50*z,60*z, (this.shieldLevel/2)*z, 10*z);
										c.fillStyle = "pink";
										c.fillRect(-50*z,72.5*z, (this.hitPoints/2)*z, 10*z);
										c.restore();
									}
									c.rotate(this.direction * TO_RADIANS);
									if (this.shieldActivated && this.shieldLevel > 2) {
										c.save();
										c.scale(1*z, 1.5*z);
										c.beginPath();
										c.arc(-2,0,40,0,2*Math.PI);
										var grd = c.createRadialGradient(0,0,15*(z/3),0,0,120*(z/3));
										grd.addColorStop(0.2,"rgba(247,92,144, 0.1)");
										grd.addColorStop(0.9, "rgba(247,129,168, 0.6)");
										c.fillStyle = grd;
										c.strokeStyle = "rgba(170,255,156, 0.8)";
										c.stroke();
										c.fill();
										c.restore();
									}
									break;
		default:					if (this.shieldLevel < this.maxShieldLevel || this.hitPoints < this.maxHitPoints) {
										c.save();
										c.fillStyle = "white";
										c.fillRect(-50*z,120*z, (this.shieldLevel/2)*z, 10*z);
										c.fillStyle = "green";
										c.fillRect(-50*z,135*z, (this.hitPoints/2)*z, 10*z);
										c.restore();
									}
									c.rotate(this.direction * TO_RADIANS);
									if (this.shieldActivated && this.shieldLevel > 2) {
										c.save();
										c.scale(1*z, 1.5*z);
										c.beginPath();
										c.arc(-10,0,100,0,2*Math.PI);
										var grd = c.createRadialGradient(0,0,15*(z/3),0,0,120*(z/3));
										grd.addColorStop(0.2,"rgba(24,163,0, 0.1)");
										grd.addColorStop(0.9, "rgba(114,214,96, 0.6)");
										c.fillStyle = grd;
										c.strokeStyle = "rgba(170,255,156, 0.8)";
										c.stroke();
										c.fill();
										c.restore();
									}
									break;
		}
		
		c.drawImage(this.image, -(this.width / 2)*z, -(this.height / 2)*z, this.width*z, this.height*z);
	}
	
	
	// Ship destroyed sequence
	else {
		this.paintDestroyedSequence();
	}
	
	c.restore();
}



this.createStandardVagabond = function(initialX, initialY) {

	this.x = initialX;
	this.y = initialY;
	this.type = "Standard Vagabond";
	this.strength = 2;
	this.speed = 12;
	this.width = 140;
	this.height = 180;
	this.image = new Image();
	this.image = standardVagabondImage;
	this.direction = 0;
	this.momentum = 0;
	this.nextLocationX = Ship.X;
	this.nextLocationY = Ship.Y;
	this.collisionRadius = 80;
	this.AISequence = 2;
	this.AISequenceCounter = 0;
	this.AISubSequenceCounter = 0;
	this.update();
	var lastFireDate = new Date();
	this.lastFireTime = lastFireDate.getTime();
	this.target = "Player Ship";
	this.fireRate = 400;
	this.turret = 1;
	this.shieldActivated = false;
	this.shieldLevel = 200;
	this.maxShieldLevel = 200;
	this.shieldTimer = 0;
	this.shieldSize = 100;
	this.hitPoints = 200;
	this.maxHitPoints = 200;
	this.destroyed = false;
	this.destroySequence = 0;
	this.destroySequenceCounter = 0;
	
	
	addNewEnemyShip(this);
}

// Behemoth class battle ship
this.createBehemothBattleship = function(initialX, initialY) {

	this.x = initialX;
	this.y = initialY;
	this.type = "Behemoth Battleship";
	this.strength = 10;
	this.speed = 4;
	this.width = 240;
	this.height = 330;
	this.image = new Image();
	this.image = behemothShipImage;
	this.direction = 0;
	this.momentum = 0;
	this.nextLocationX = Ship.X;
	this.nextLocationY = Ship.Y;
	this.collisionRadius = 220;
	this.AISequence = 2;
	this.AISequenceCounter = 0;
	this.AISubSequenceCounter = 0;
	this.update();
	var lastFireDate = new Date();
	this.lastFireTime = lastFireDate.getTime();
	this.target = "Player Ship";
	this.fireRate = 500;
	this.turret = 1;
	this.shieldActivated = false;
	this.shieldLevel = 800;
	this.maxShieldLevel = 800;
	this.shieldTimer = 0;
	this.shieldSize = 100;
	this.hitPoints = 800;
	this.maxHitPoints = 800;
	this.destroyed = false;
	this.destroySequence = 0;
	this.destroySequenceCounter = 0;


	addNewEnemyShip(this);
}



// Fighter squadron triplet ships
this.createFighterSquadron = function(initialX, initialY) {

	this.x = initialX;
	this.y = initialY;
	this.type = "Fighter Squadron";
	this.strength = 2;
	this.speed = 17;
	this.width = 50;
	this.height = 50;
	this.image = new Image();
	this.image = fighterSquadronImage;
	this.direction = 0;
	this.momentum = 0;
	this.nextLocationX = Ship.X;
	this.nextLocationY = Ship.Y;
	this.collisionRadius = 100;
	this.AISequence = 2;
	this.AISequenceCounter = 0;
	this.AISubSequenceCounter = 0;
	this.update();
	var lastFireDate = new Date();
	this.lastFireTime = lastFireDate.getTime();
	this.target = " ";
	this.fireRate = 50;
	this.turret = 1;
	this.shieldActivated = false;
	this.shieldLevel = 50;
	this.maxShieldLevel = 50;
	this.shieldTimer = 0;
	this.shieldSize = 50;
	this.hitPoints = 40;
	this.maxHitPoints = 40;
	this.destroyed = false;
	this.destroySequence = 0;
	this.destroySequenceCounter = 0;


	addNewEnemyShip(this);
}










this.faceTowardsAPoint = function() {
	
	var angleDegree = findAngleBetweenTwoPoints(this.x, this.y, this.nextLocationX, this.nextLocationY);
	var faceDirection = 360 - angleDegree - 90;
	
	if (faceDirection < 0) {
		faceDirection += 360;
	}
	
	if (faceDirection > this.direction) {
	
		
	
		if ((Math.abs(faceDirection - this.direction)) > 258) {
			this.direction += 357;
		}
	
		if ((Math.abs(faceDirection - this.direction)) > 15) {
			this.direction += 3;
		}
	
		this.direction += 1;
		
		if (this.direction > 359) {
			this.direction = 0;
		}
	}
	else {
	
		if ((Math.abs(faceDirection - this.direction)) > 258) {
			this.direction -= 357;
		}
	
		if ((Math.abs(faceDirection - this.direction)) > 15) {
			this.direction -= 3;
		}
	
		this.direction -= 1;
		
		if (this.direction < 0){
			this.direction = 359;
		}
	}
	
	if (this.target == "Player Ship") {
	
		this.nextLocationX = Ship.X;
		this.nextLocationY = Ship.Y;
	
	}
	
	if (Math.abs(faceDirection - this.direction) <= 2){
		return true;
	}
	else {
		return false;
	}
}








this.trackOntoScreen = function() {

	switch (this.AISequenceCounter) {
	
	// Initially place the ship outside canvas view (even if player ship moving)
	case 0:		this.x = gameMap.currentX + (-100 + -(canvasWidth/z));
				this.y = gameMap.currentY + (-100 + -(canvasHeight/z));
				this.AISequenceCounter += 1;
				this.target = "Arbitrary Point";
				Game.printToDebugConsole("Ship Placed");
				break;
				
	// Choose a central point, and face it	
	case 1:		this.nextLocationX = gameMap.currentX + ((-1400) + Math.floor(Math.random() * (2801)));
				this.nextLocationY = gameMap.currentY + ((-1400) + Math.floor(Math.random() * (2801)));
				var angleDegree = findAngleBetweenTwoPoints(this.x, this.y, this.nextLocationX, this.nextLocationY);
				var faceDirection = 360 - angleDegree - 90;
				if (faceDirection < 0) {faceDirection += 360;}
				this.direction = faceDirection;
				this.AISequenceCounter += 1;
				Game.printToDebugConsole("Selected Location");
				break;
	
	// Move towards target point, until reached
	case 2:		var arrivedAtTargetPoint = this.moveToAPoint(14);
				if (arrivedAtTargetPoint) { this.AISequenceCounter = 3; }
				Game.printToDebugConsole("Moving Towards Target");
				break;
	// Target reached, switch to trackPlayer mode
	case 3:		this.AISequenceCounter = 0;
				this.AISequence = 4;
				this.target = "Player Ship";
				Game.printToDebugConsole("Switched to Player Tracking");
				break;
				
	}

	
	
}





this.engagePlayerShipStationary = function() {

	switch (this.AISequenceCounter) {
	
		// Face the player ship
		case 0:		var targetAquired = this.faceTowardsAPoint();
					if (targetAquired) { this.AISequenceCounter = 1; }
					Game.printToDebugConsole("Aquiring Target");
					break;	
		
		// Fire weapons
		case 1:		this.fireLaserPulse();
					var targetAquired = this.faceTowardsAPoint();
					if (!(targetAquired)) { this.AISequenceCounter = 0; }
					Game.printToDebugConsole("Fired at Target");
					break;

		
	
	}
	
}



this.engagePlayerShipFollow = function() {

	switch (this.AISequenceCounter) {
	
		// Face the player ship
		case 0:		var targetAquired = this.faceTowardsAPoint();
					if (targetAquired) { this.AISequenceCounter = 1; }
					break;	
		
		// Fire weapons
		case 1:		this.fireLaserPulse();
					var targetAquired = this.faceTowardsAPoint();
					if (!(targetAquired)) { this.AISequenceCounter = 0; }
					else { this.AISequenceCounter = 2; }
					// Random move
					var randomMove = Math.floor(Math.random()*100);
					if (randomMove == 50) { this.AISequenceCounter = 4; }
					break;
		
		
		// Check within range
		case 2:		var shipCloseBy = this.isPlayerCloseBy(400);
					if (shipCloseBy) { this.AISequenceCounter = 0; }
					else { this.AISequenceCounter = 4;	}
					break;
		
		case 3:		this.target = "Arbitrary Point";
					var arrivedNextTargetPoint = this.moveToAPoint(this.speed);
					if (arrivedNextTargetPoint) { this.AISequenceCounter = 0; this.target = "Player Ship"}
					break;

		// Choose new location
		case 4:		var randomizer = Math.floor(Math.random()*4);
					switch (randomizer) {
						case 0:		this.nextLocationX = Ship.X + (300 + Math.floor(Math.random()*600)); 
									this.nextLocationY = Ship.Y + (300 + Math.floor(Math.random()*600));
									break;
						case 1:		this.nextLocationX = Ship.X - (300 + Math.floor(Math.random()*600)); 
									this.nextLocationY = Ship.Y - (300 + Math.floor(Math.random()*600));
									break;		
						case 2:		this.nextLocationX = Ship.X + (300 + Math.floor(Math.random()*600)); 
									this.nextLocationY = Ship.Y - (300 + Math.floor(Math.random()*600));
									break;
						case 3:		this.nextLocationX = Ship.X - (300 + Math.floor(Math.random()*600)); 
									this.nextLocationY = Ship.Y + (300 + Math.floor(Math.random()*600));
									break;
					}

					this.AISequenceCounter = 3;
					break;
	}


}





this.fighterSquadronDefend = function() {

	switch (this.AISequenceCounter) {
	
		// 
		case 0:		this.circleTarget();
					var enemiesInbound = this.checkForEnemies();
					if (enemiesInbound) { this.AISequenceCounter = 1; }
					break;
		case 1:		this.attack
		
		
		
	}
}







this.update = function() {

	if (!(this.destroyed)) {

		if (this.AISequence != 2 && this.AISequence != 4) {

			var playerCloseBy = this.isPlayerCloseBy(400);

			if (playerCloseBy) {
				
				if (this.AISequence != 4) {	this.AISequenceCounter = 0; }
				this.AISequence = 4;
				
			}
			else {
			
				this.AISequenceCounter = 0;
				this.AISequence = 1;
			
			}

			
		}


		switch (this.AISequence) {
		
		case 1:		this.faceTowardsAPoint();
					break;
		case 2:		this.trackOntoScreen();
					break;
		case 3:		this.engagePlayerShipStationary();
					break;
		case 4:		this.engagePlayerShipFollow();
					break;
		}

		//Game.printToDebugConsole("AISequence = " + this.AISequence);
		//Game.printToDebugConsole("AISequenceCount = " + this.AISequenceCounter);
		
		
		if (this.shieldActivated) {
			this.shieldTimer += 1;
			
			if (this.shieldTimer > 40) {
				this.shieldActivated = false;
				this.shieldTimer = 0;
			}
		}
		
		if (this.shieldLevel < 0) {
			this.shieldLevel = 0;
		}
		else if (this.shieldLevel > this.maxShieldLevel) {
			this.shieldLevel = this.maxShieldLevel;
		} 
		else {
			this.shieldLevel +=0.1;
		}
		
		if (this.hitPoints < 0) {
			this.hitPoints = 0;
			this.destroyed = true;
		}
		
	}
}




this.detectCollisions = function() {
	
	for (var i = 0; i < deployedMunitions.length; i++) {
		var collisionOccured = liesWithinRadius(
			deployedMunitions[i].x,
			deployedMunitions[i].y,
			this.x,
			this.y,
			((this.shieldSize/z) * 2) * (z / 1.1));
			//this.collisionRadius);
			
		if (collisionOccured && (deployedMunitions[i].origin == "Player Ship")) {
		
			this.shieldActivated = true;
			
			if ((this.shieldLevel - deployedMunitions[i].power) < 0) {
			
				this.shieldLevel -= deployedMunitions[i].power;
				var difference = Math.abs(0 - this.shieldLevel);
				this.hitPoints -= difference;
			
			}
			else {
				this.shieldLevel -= deployedMunitions[i].power;
			}
			
			deployedMunitions[i].destroyed = true;
		}
		
	}
	
}




this.fireLaserPulse = function() {
	
	// Flip direction
	var flippedDirection = this.direction - 180;
	if (flippedDirection < 0) { flippedDirection += 360; }
	
	
	var currentFireDate = new Date();
	var currentFireTime = currentFireDate.getTime();
	
	if (currentFireTime - this.lastFireTime > this.fireRate) {
	
		switch (this.type) {
	
		case "Standard Vagabond":
			fireShipLaserPulse("GreenLaser", this.x, this.y, flippedDirection, this.type, this.momentum, this.turret);
			this.lastFireTime = currentFireTime;
			break;
		
		case "Behemoth Battleship":
			fireShipLaserPulse("BlueLaser", this.x, this.y, flippedDirection, this.type, this.momentum + (this.strength*3), this.turret);
			if (this.turret == 0) { this.turret = 1; } else { this.turret = 0; }
			this.lastFireTime = currentFireTime;
			break;
			
		case "Fighter Squadron":
			fireShipLaserPulse("PinkLaser", this.x, this.y, flippedDirection, this.type, this.momentum, this.turret);
			this.lastFireTime = currentFireTime;
			break;
		
		default:	fireShipLaserPulse("GreenLaser", this.x, this.y, flippedDirection, this.type, this.momentum, this.turret);
					this.lastFireTime = currentFireTime;
					break;
		
		}
	}
}






this.moveToAPoint = function(speed) {

	switch (this.AISubSequenceCounter) {
	
	case 0:		var facingPoint = this.faceTowardsAPoint();
				if (facingPoint) { this.AISubSequenceCounter = 1; }
				break;
	case 1:		var comparitiveX = Math.abs((this.x - this.nextLocationX));
				var comparitiveY = Math.abs((this.y - this.nextLocationY));
				
				// Accuracy - *4 == less accurate positioning
				if (comparitiveX >= (speed*4)) {
					this.x = this.x + speed * Math.cos((this.direction + 90) * TO_RADIANS);
				}
				
				// Accuracy - *4 == less accurate positioning
				if (comparitiveY >= (speed*4)) {
					this.y = this.y + speed * Math.sin((this.direction + 90) * TO_RADIANS);
				}
				else {
					this.AISubSequenceCounter = 0; return true;
				}
				
				this.faceTowardsAPoint();
	}


}



// Returns true if player within radius
this.isPlayerCloseBy = function(radius) {
	return liesWithinRadius(Ship.X,Ship.Y,this.x,this.y, radius / z)
}





// Paints the ship destroyed animation
this.paintDestroyedSequence = function(){

	switch (this.destroySequence) {

	case 0:		c.save();
				var gradient = c.createRadialGradient(0, 0, 1*z, 0, 0, 40*z);
				gradient.addColorStop(0.1,"rgba(62,156,58, 0.1)");
				gradient.addColorStop(0.5, "rgba(100,181,96, 0.5)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-400*z, -400*z, 1200*z, 1200*z);
				c.restore();
				// if (this.destroySequenceCounter < 2) { this.destroySequenceCounter += 1; }
				// else { this.destroySequenceCounter = 0; this.destroySequence += 1; }
				this.destroySequence += 1;
				break;
	case 1:		c.save();
				var gradient = c.createRadialGradient(0, 0, 15*z, 0, 0, 70*z);
				gradient.addColorStop(0.1,"rgba(11,222,39, 0.1)");
				gradient.addColorStop(0.9, "rgba(11,222,39, 0.5)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-400*z, -400*z, 1200*z, 1200*z);
				c.restore();
				// if (this.destroySequenceCounter < 2) { this.destroySequenceCounter += 1; }
				// else { this.destroySequenceCounter = 0; this.destroySequence += 1; }
				this.destroySequence += 1;
				break;
	case 2:		c.save();
				var gradient = c.createRadialGradient(0, 0, 20*z, 0, 0, 80*z);
				gradient.addColorStop(0.1,"rgba(115,186,7, 0.5)");
				gradient.addColorStop(0.9, "rgba(28,186,0, 0.5)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-400*z, -400*z, 1200*z, 1200*z);
				c.restore();
				// if (this.destroySequenceCounter < 2) { this.destroySequenceCounter += 1; }
				// else { this.destroySequenceCounter = 0; this.destroySequence += 1; }
				this.destroySequence += 1;
				break;
	case 3:		c.save();
				var gradient = c.createRadialGradient(0, 0, 40*z, 0, 0, 120*z);
				gradient.addColorStop(0.1,"rgba(30,161,6, 0.9)");
				gradient.addColorStop(0.5, "rgba(30,201,0, 0.9)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-400*z, -400*z, 1200*z, 1200*z);
				c.restore();
				this.destroySequence += 1;
				break;
	case 4:		c.save();
				var gradient = c.createRadialGradient(0, 0, 50*z, 0, 0, 150*z);
				gradient.addColorStop(0.1,"rgba(113,240,91, 0.3)");
				gradient.addColorStop(0.9, "rgba(98,204,80, 0.3)");
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
				//this.destroySequence += 1;
				break;
	case 5:		c.save();
				var gradient = c.createRadialGradient(0, 0, 100*z, 0, 0, 380*z);
				gradient.addColorStop(0.5, "rgba(98,204,80, 0.2)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-400*z, -400*z, 1200*z, 1200*z);
				c.restore();
				// if (this.destroySequenceCounter < 2) { this.destroySequenceCounter += 1; }
				// else { this.destroySequenceCounter = 0; this.destroySequence += 1; }
				this.destroySequence += 1;
				break;
	case 6:		c.save();
				var gradient = c.createRadialGradient(0, 0, 180*z, 0, 0, 410*z);
				gradient.addColorStop(0.5,"rgba(98,204,80, 0.7)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-600*z, -600*z, 1800*z, 1800*z);
				c.restore();
				// if (this.destroySequenceCounter < 2) { this.destroySequenceCounter += 1; }
				// else { this.destroySequenceCounter = 0; this.destroySequence += 1; }
				this.destroySequence += 1;
				break;
	case 7:		c.save();
				var gradient = c.createRadialGradient(0, 0, 230*z, 0, 0, 610*z);
				gradient.addColorStop(0.5,"rgba(98,204,80, 0.8)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-800*z, -800*z, 2400*z, 2400*z);
				c.restore();
				// if (this.destroySequenceCounter < 2) { this.destroySequenceCounter += 1; }
				// else { this.destroySequenceCounter = 0; this.destroySequence += 1; }
				this.destroySequence += 1;
				break;
	case 8:		c.save();
				var gradient = c.createRadialGradient(0, 0, 250*z, 0, 0, 800*z);
				gradient.addColorStop(0.5,"rgba(98,204,80, 0.9)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-1000*z, -1000*z, 3200*z, 3200*z);
				c.restore();
				// if (this.destroySequenceCounter < 2) { this.destroySequenceCounter += 1; }
				// else { this.destroySequenceCounter = 0; this.destroySequence += 1; }
				this.destroySequence += 1;
				break;
	case 9:		c.save();
				var gradient = c.createRadialGradient(0, 0, 250*z, 0, 0, 800*z);
				gradient.addColorStop(0.5,"rgba(98,204,80, 0.8)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-1000*z, -1000*z, 3200*z, 3200*z);
				c.restore();
				// if (this.destroySequenceCounter < 2) { this.destroySequenceCounter += 1; }
				// else { this.destroySequenceCounter = 0; this.destroySequence += 1; }
				this.destroySequence += 1;
				break;
	case 10:	c.save();
				var gradient = c.createRadialGradient(0, 0, 150*z, 0, 0, 600*z);
				gradient.addColorStop(0.5,"rgba(98,204,80, 0.7)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-1000*z, -1000*z, 3200*z, 3200*z);
				c.restore();
				// if (this.destroySequenceCounter < 2) { this.destroySequenceCounter += 1; }
				// else { this.destroySequenceCounter = 0; this.destroySequence += 1; }
				this.destroySequence += 1;
				break;
	case 11:	c.save();
				var gradient = c.createRadialGradient(0, 0, 250*z, 0, 0, 800*z);
				gradient.addColorStop(0.5,"rgba(98,204,80, 0.6)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-1000*z, -1000*z, 3200*z, 3200*z);
				c.restore();
				// if (this.destroySequenceCounter < 2) { this.destroySequenceCounter += 1; }
				// else { this.destroySequenceCounter = 0; this.destroySequence += 1; }
				this.destroySequence += 1;
				break;
	case 12:	c.save();
				var gradient = c.createRadialGradient(0, 0, 150*z, 0, 0, 400*z);
				gradient.addColorStop(0.5,"rgba(98,204,80, 0.5)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-1000*z, -1000*z, 3200*z, 3200*z);
				c.restore();
				// if (this.destroySequenceCounter < 2) { this.destroySequenceCounter += 1; }
				// else { this.destroySequenceCounter = 0; this.destroySequence += 1; }
				this.destroySequence += 1;
				break;
	case 13:	c.save();
				var gradient = c.createRadialGradient(0, 0, 250*z, 0, 0, 800*z);
				gradient.addColorStop(0.5,"rgba(98,204,80, 0.4)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-1000*z, -1000*z, 3200*z, 3200*z);
				c.restore();
				// if (this.destroySequenceCounter < 2) { this.destroySequenceCounter += 1; }
				// else { this.destroySequenceCounter = 0; this.destroySequence += 1; }
				this.destroySequence += 1;
				break;
	case 14:	c.save();
				var gradient = c.createRadialGradient(0, 0, 150*z, 0, 0, 600*z);
				gradient.addColorStop(0.5,"rgba(29,196,0, 0.6)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-1000*z, -1000*z, 3200*z, 3200*z);
				c.restore();
				// if (this.destroySequenceCounter < 2) { this.destroySequenceCounter += 1; }
				// else { this.destroySequenceCounter = 0; this.destroySequence += 1; }
				this.destroySequence += 1;
				break;
	case 15:	c.save();
				var gradient = c.createRadialGradient(0, 0, 250*z, 0, 0, 800*z);
				gradient.addColorStop(0.5,"rgba(98,204,80, 0.4)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-1000*z, -1000*z, 3200*z, 3200*z);
				c.restore();
				// if (this.destroySequenceCounter < 2) { this.destroySequenceCounter += 1; }
				// else { this.destroySequenceCounter = 0; this.destroySequence += 1; }
				this.destroySequence += 1;
				break;
	case 16:	c.save();
				var gradient = c.createRadialGradient(0, 0, 150*z, 0, 0, 500*z);
				gradient.addColorStop(0.5,"rgba(98,204,80, 0.3)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-1000*z, -1000*z, 3200*z, 3200*z);
				c.restore();
				// if (this.destroySequenceCounter < 2) { this.destroySequenceCounter += 1; }
				// else { this.destroySequenceCounter = 0; this.destroySequence += 1; }
				this.destroySequence += 1;
				break;
	case 17:	c.save();
				var gradient = c.createRadialGradient(0, 0, 250*z, 0, 0, 800*z);
				gradient.addColorStop(0.5,"rgba(98,204,80, 0.2)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-1000*z, -1000*z, 3200*z, 3200*z);
				c.restore();
				// if (this.destroySequenceCounter < 2) { this.destroySequenceCounter += 1; }
				// else { this.destroySequenceCounter = 0; this.destroySequence += 1; }
				this.destroySequence += 1;
				break;
	case 18:	c.save();
				var gradient = c.createRadialGradient(0, 0, 150*z, 0, 0, 500*z);
				gradient.addColorStop(0.5,"rgba(29,196,0, 0.1)");
				gradient.addColorStop(1,"transparent");
				c.fillStyle = gradient;
				c.fillRect(-1000*z, -1000*z, 3200*z, 3200*z);
				c.restore();
				// if (this.destroySequenceCounter < 2) { this.destroySequenceCounter += 1; }
				// else { this.destroySequenceCounter = 0; this.destroySequence += 1; }
				this.destroySequence += 1;
				break;
	case 19: 	Game.generateEnemyShipResources(this);
				this.destroySequence += 1;
				break;
	}
}


// End of EnemyShip Object defintion
}



// Paint enemy ship objects, held in an array
function paintEnemyShips(){
	for (var i = 0; i < Game.enemyShips.length; i++) {
		Game.enemyShips[i].draw();
	}
}


// Update enemy ship objects
function updateEnemyShips() {

	for (var i = 0; i < Game.enemyShips.length; i++) {
		
		if (Game.enemyShips[i].destroyed) {
		
			if (Game.enemyShips[i].destroySequence == 20) {
				Game.enemyShips.splice(i, 1);
			}
			else { Game.enemyShips[i].update(); }
			
		
		}
		
		else {
			Game.enemyShips[i].detectCollisions();
			Game.enemyShips[i].update();
		}
	}

}


// Add an enemy ship to the array
function addNewEnemyShip(enemyShip){
	Game.enemyShips.push(enemyShip);
}


