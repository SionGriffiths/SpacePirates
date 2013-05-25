
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








this.trackOntoScreen = function() {

	switch (this.AISequenceCounter) {
	
	// Initially place the ship outside canvas view (even if player ship moving)
	case 0:		this.x = gameMap.currentX + (-1200 + Math.floor(Math.random()* 2400));
				this.y = gameMap.currentY + (-1200 + Math.floor(Math.random()* 2400));
				this.AISequenceCounter += 1;
				Game.printToDebugConsole("Ship Placed");
				break;
				
	// Choose a central point, and face it	
	case 1:		this.nextLocationX = gameMap.currentX + (-600 + Math.floor(Math.random() * 1200));
				this.nextLocationY = gameMap.currentY + (-400 + Math.floor(Math.random() * 800));
				var angleDegree = findAngleBetweenTwoPoints(this.x, this.y, this.nextLocationX, this.nextLocationY);
				var faceDirection = 360 - angleDegree - 90;
				if (faceDirection < 0) {faceDirection += 360;}
				this.direction = faceDirection;
				this.AISequenceCounter += 1;
				Game.printToDebugConsole("Selected Location");
				break;
	
	// Move towards target point, until reached
	case 2:		var comparitiveX = Math.abs((this.x - this.nextLocationX));
				var comparitiveY = Math.abs((this.y - this.nextLocationY));
				
				if (comparitiveX > 2) {
					if (this.nextLocationX > this.x && comparitiveX > 7) {this.x += 7;}
					else {this.x += 5;}
					if (this.nextLocationX < this.x && comparitiveX > 7) {this.x -= 7;}
					else {this.x -= 5;}
					
				}
				
				if (comparitiveY > 2) {
					if (this.nextLocationY > this.y && comparitiveY > 7) {this.y += 7;}
					else {this.y += 5;}
					if (this.nextLocationY < this.y && comparitiveY > 7) {this.y -= 7;}
					else {this.y -= 5;}
				}
				
				
				if (comparitiveX <= 25 && comparitiveY <= 25) {
					this.AISequenceCounter += 1;
				}
				Game.printToDebugConsole("Moving Towards Target");
				break;
	
	// Target reached, switch to trackPlayer mode
	case 3:		this.AISequenceCounter = 0;
				this.AISequence = 1;
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










this.update = function() {

	if (this.AISequence != 2) {

		var playerCloseBy = liesWithinRadius(Ship.X,Ship.Y,this.x,this.y,750/z);

		if (playerCloseBy) {
			
			if (this.AISequence != 3) {	this.AISequenceCounter = 0; }
			this.AISequence = 3;
			
		}
		else {
		
			this.AISequenceCounter = 0;
			this.AISequence = 1;
		
		}

		
	}
	
	
	
	//Game.printToDebugConsole("Enemy Ship Sequence: " + this.AISequence);
	//Game.printToDebugConsole("Close By: " + playerCloseBy);
	
	//this.AISequence = 3;

	switch (this.AISequence) {
	
	case 1:		this.faceTowardsAPoint();
				break;
	case 2:		this.trackOntoScreen();
				break;
	case 3:		this.engagePlayerShipStationary();
				break;
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







this.moveToAPoint = function() {

	switch (this.AISequenceCounter) {
	
	case 0:		var facingPoint = this.faceTowardsAPoint();
				if (facingPoint) { this.AISequenceCounter = 1; }
				break;
	case 1:		
	

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
	//for (var i = 0; i < Game.enemyShips.length; i++) {
	
		for (var i = 0; i < Game.enemyShips.length; i++) {
			Game.enemyShips[i].update();
			Game.enemyShips[i].detectCollisions();
		}
		

	//}
}


// Add an enemy ship to the array
function addNewEnemyShip(enemyShip){
	Game.enemyShips.push(enemyShip);
}