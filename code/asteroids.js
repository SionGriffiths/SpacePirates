//=============================================
// Asteroids
//=============================================





function Asteroid() {	

	this.direction = Math.floor(Math.random()*351);
	this.x = 100 + Math.floor(Math.random()*251);
	this.y = 250 + Math.floor(Math.random()*201);
	this.Scale = 50 + Math.floor(Math.random()*41);
	this.Speed = (1+Math.floor(Math.random()*4))/15;
	this.collisionRadius = 30;
	addAsteroid(this);





  
// Paint the Asteroid
this.draw = function() {
	c.save();
	c.translate(this.x, this.y);
	c.translate(this.Scale, this.Scale);
	c.rotate(this.direction * TO_RADIANS);
	c.drawImage(asteroidImage1, -this.Scale, -this.Scale, this.Scale, this.Scale);
	c.restore();
}



this.update = function() {
	
	if (this.x <= (1 - this.Scale)) {
		this.prevDir = "right";
		this.x = canvasWidth;
	} else if (this.x >= canvasWidth) {
		
		this.prevDir = "left";
		this.x = 1;
	} else if (this.y <= (1 - this.Scale)) {

		this.prevDir = "up";
		this.y = canvasHeight;
	} else if (this.y >= canvasHeight) {
		
		this.prevDir = "down";
		this.y = 1;
	}

	//this.x = this.x + this.Speed * Math.cos(this.Direction * TO_RADIANS);
	//this.y = this.y + this.Speed * Math.sin(this.Direction * TO_RADIANS);

	this.x += 0.5 ;
	this.y += 0.5 ;

	//this.Direction += 0.1;
	//this.Scale += 0.02;

	//Game.printToDebugConsole("Updating Asteroid" + this.Speed + " " + this.x + " " + this.y);
}



this.detectCollisions = function() {
	
	for (var i = 0; i < deployedMunitions.length; i++) {
		var collisionOccured = liesWithinRadius(
			deployedMunitions[i].x,
			deployedMunitions[i].y,
			this.x,
			this.y,
			this.collisionRadius);
			
		if (collisionOccured) {
			Game.printToDebugConsole("Asteroid Collision!");
		}
	}
	
}


}

// Paint Asteroids objects, held in an array
function paintAsteroids(){

	for (var i = 0; i < Game.asteroids.length; i++) {
		Game.asteroids[i].draw();
		//Game.printToDebugConsole("How many a-droids: " + Game.asteroids.length);
	}
}

// Update Asteroids objects
function updateAsteroids() {
	for (var i = 0; i < Game.asteroids.length; i++) {
		Game.asteroids[i].update();
		Game.asteroids[i].detectCollisions();
	}
}

// Add an Asteroid to the array
function addAsteroid(asteroid){
	Game.asteroids.push(asteroid);
	//window.alert(Game.asteroids[0].x);

}