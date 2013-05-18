
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
		c.translate((this.width / 2), (this.height / 2));
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
	
	addNewEnemyShip(this);
	
	
	
}


EnemyShip.update = function() {

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
	for (var i = 0; i < Game.enemyShips.length; i++) {
		Game.enemyShips[i].update();
		Game.enemyShips[i].detectCollisions();
	}
}


// Add an enemy ship to the array
function addNewEnemyShip(enemyShip){
	Game.enemyShips.push(enemyShip);
}