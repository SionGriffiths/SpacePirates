// enemyship2.js

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
this.shieldActivated = false;



this.draw = function() {
		c.save();
		c.translate(gameMap.translateX(this.x), gameMap.translateY(this.y));
		c.rotate(this.direction * TO_RADIANS);
		c.drawImage(this.image, -(this.width / 2)*z, -(this.height / 2)*z, this.width*z, this.height*z);
		c.restore();
}



this.instantiate = function(initialX, initialY) {

	this.x = initialX;
	this.y = initialY;
	
	this.type = "Standard Vagabond";
	this.strength = 2;
	this.speed = 3;
	this.width = 140;
	this.height = 180;
	
	this.image = new Image();
	this.image.src = "images/ships/enemyship1.png";
	
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
	
	if (Math.abs(faceDirection - this.direction) < 2){
		return true;
	}
	else {
		return false;
	}
}




this.detectCollisions = function() {
	
	for (var i = 0; i < deployedMunitions.length; i++) {
		var collisionOccured = liesWithinRadius(
			deployedMunitions[i].x,
			deployedMunitions[i].y,
			this.x,
			this.y,
			this.collisionRadius);
			
		if (collisionOccured && (deployedMunitions[i].origin != this.type)) {
		
			this.shieldActivated = true;
		
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
		fireShipLaserPulse("GreenLaser", this.x, this.y, flippedDirection, this.type, this.momentum, 1);
		this.lastFireTime = currentFireTime;
	}
}





// Returns true if player within radius
this.isPlayerCloseBy = function(radius) {
	return liesWithinRadius(Ship.X,Ship.Y,this.x,this.y,radius/z)
}



this.moveToAPoint = function(speed) {

	switch (this.AISubSequenceCounter) {
	
	case 0:		var facingPoint = this.faceTowardsAPoint();
				if (facingPoint) { this.AISubSequenceCounter = 1; }
				break;
	case 1:		var comparitiveX = Math.abs((this.x - this.nextLocationX));
				var comparitiveY = Math.abs((this.y - this.nextLocationY));
				
				if (comparitiveX > speed) {
					this.x = this.x + speed * Math.cos((this.direction - 90) * TO_RADIANS);
					this.y = this.y + speed * Math.sin((this.direction - 90) * TO_RADIANS);
				}
				else {
					this.AISubSequenceCounter = 0; return true;
				}
	}


}


this.initialPlacement = function() {

	switch (this.AISequenceCounter) {
	
		case 0:		this.x = gameMap.currentX + (-1200 + Math.floor(Math.random()* 2400));
					this.y = gameMap.currentY + (-1200 + Math.floor(Math.random()* 2400));
					
					this.nextLocationX = gameMap.currentX + (-600 + Math.floor(Math.random() * 1200));
					this.nextLocationY = gameMap.currentY + (-400 + Math.floor(Math.random() * 800));
					var angleDegree = findAngleBetweenTwoPoints(this.x, this.y, this.nextLocationX, this.nextLocationY);
					var faceDirection = 360 - angleDegree - 90;
					if (faceDirection < 0) {faceDirection += 360;}
					this.direction = faceDirection;
					
					this.AISequenceCounter = 1;
					break;
		case 1:		var arrivedAtTargetPoint = this.moveToAPoint(15);
					if (arrivedAtTargetPoint) {
					
						this.nextLocationX = Ship.X;
						this.nextLocationY = Ship.Y;
					
						this.AISequenceCounter = 0;
						this.AISequence = 1;
					}
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
					break;
		
		
		// Check within range
		case 2:		var shipCloseBy = this.isPlayerCloseBy(450);
					if (shipCloseBy) { this.AISequenceCounter = 0; }
					else {
					
						this.nextLocationX = Ship.X; // + (-100 + Math.floor(Math.random()*200));
						this.nextLocationY = Ship.Y; // + (-100 + Math.floor(Math.random()*200));
						this.AISequenceCounter = 3;
					
					}
					break;
		
		case 3:		var arrivedNextTargetPoint = this.moveToAPoint(15);
					if (arrivedNextTargetPoint) { this.AISequenceCounter = 0; }
	
	}


}





this.update = function() {

	switch (this.AISequence) {
	
	case 0:		this.initialPlacement();
				break;
	case 1:		this.engagePlayerShipFollow();
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
		Game.enemyShips[i].update();
		Game.enemyShips[i].detectCollisions();
	}

}


// Add an enemy ship to the array
function addNewEnemyShip(enemyShip){
	Game.enemyShips.push(enemyShip);
}