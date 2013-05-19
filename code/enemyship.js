
var EnemyShip = new Object();

EnemyShip.x;
EnemyShip.y;
	
EnemyShip.type;
EnemyShip.strength;
EnemyShip.speed;
EnemyShip.width;
EnemyShip.height;	
EnemyShip.image;	
EnemyShip.direction;
EnemyShip.momentum;
EnemyShip.nextLocationX;
EnemyShip.nextLocationY;
EnemyShip.collisionRadius;


EnemyShip.draw = function() {
		c.save();
		c.translate(this.x, this.y);
		//c.translate((this.width / 2), (this.height / 2));
		c.rotate(this.direction * TO_RADIANS);
		c.drawImage(this.image, -(this.width / 2), -(this.height / 2), this.width, this.height);
		c.restore();
}



EnemyShip.instantiate = function(initialX, initialY) {

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

	this.nextLocationX = shipX;
	this.nextLocationY = shipY;
	
	this.collisionRadius = 80;
	
	this.AISequence = 2;
	this.AISequenceCounter = 0;
	
	this.update();
	
	addNewEnemyShip(this);
	
	
	
}


EnemyShip.faceTowardsPlayerShip = function() {
	var angleDegree = findAngleBetweenTwoPoints(this.x, this.y, this.nextLocationX, this.nextLocationY);
	var faceDirection = 360 - angleDegree - 90;
	
	if (faceDirection < 0) {
		faceDirection += 360;
	}
	
	if (faceDirection > this.direction) {
		this.direction += 1;
		if (this.direction > 359) {
			this.direction = 0;
		}
	}
	else {
		this.direction -= 1;
		if (this.direction < 0){
			this.direction = 359;
		}
	}
	this.nextLocationX = shipX;
	this.nextLocationY = shipY;
}








EnemyShip.trackOntoScreen = function() {

	switch (this.AISequenceCounter) {
	
	// Initially place the ship outside canvas view (even if player ship moving)
	case 0:		this.x = 100 - document.getElementById('maincanvas').width;
				this.y = document.getElementById('maincanvas').height / 2;
				this.AISequenceCounter += 1;
				Game.printToDebugConsole("Ship Placed");
				break;
				
	// Choose a central point, and face it	
	case 1:		this.nextLocationX = Math.floor(Math.random()*(document.getElementById('maincanvas').width / 2) + 50);
				var oneSixthY = document.getElementById('maincanvas').height / 6;
				this.nextLocationY = Math.floor((Math.random() * oneSixthY) + (4 * oneSixthY));
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
					if (this.nextLocationX > this.x && comparitiveX > 5) {this.x += 7;}
					else {this.x -= 1;}
				}
				
				if (comparitiveY > 2) {
					if (this.nextLocationY > this.y && comparitiveY > 5) {this.y += 7;}
					else {this.y -= 1;}
				}
				
				
				if (comparitiveX < 5 && comparitiveY < 5) {
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







EnemyShip.update = function() {

	switch (this.AISequence) {
	
	case 1:		this.faceTowardsPlayerShip();
				break;
	case 2:		this.trackOntoScreen();
				break;
	
	}
	
	
}


EnemyShip.detectCollisions = function() {
	
	for (var i = 0; i < deployedMunitions.length; i++) {
		var collisionOccured = liesWithinRadius(
			deployedMunitions[i].x,
			deployedMunitions[i].y,
			this.x,
			this.y,
			this.collisionRadius);
			
		if (collisionOccured) {
			Game.printToDebugConsole("Collision!");
			deployedMunitions[i].destroyed = true;
		}
		
	}
	
}



// Paint enemy ship objects, held in an array
function paintEnemyShips(){

	for (var i = 0; i < Game.enemyShips.length; i++) {
		Game.enemyShips[i].draw();
		//Game.enemyShips[i].update();
	}

}

// Update enemy ship objects
function updateEnemyShips() {
	//for (var i = 0; i < Game.enemyShips.length; i++) {
	
		// Only chooses zero for now, as only one object
		// is created, the same one :D
		Game.enemyShips[0].update();
		Game.enemyShips[0].detectCollisions();
	//}
}


// Add an enemy ship to the array
function addNewEnemyShip(enemyShip){
	Game.enemyShips.push(enemyShip);
}