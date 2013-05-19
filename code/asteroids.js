//=============================================
// Asteroids
//=============================================





function Asteroid() {	

	this.direction = Math.floor(Math.random()*351);
	this.x = 100 + Math.floor(Math.random()*901);
	this.y = 150 + Math.floor(Math.random()*601);
	this.Scale = 50 + Math.floor(Math.random()*101);
	this.Speed = (1+Math.floor(Math.random()*4))/11;
	this.Size = this.Scale/2;
	this.collisionRadius = this.Size;
	addAsteroid(this);


  
// Paint the Asteroid
this.draw = function() {
	c.save();
	c.translate(this.x, this.y);
	c.translate(this.Scale, this.Scale);
	c.rotate(this.direction * TO_RADIANS);
	c.drawImage(asteroidImage1, -this.Size, -this.Size, this.Scale, this.Scale);
	if(toggleDebug==true) {
		c.beginPath();
		c.strokeStyle = 'green';
		c.arc(0,0,this.collisionRadius,0,2*Math.PI);		
		c.stroke();
	}
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

	this.x = this.x + this.Speed * Math.cos(this.direction * TO_RADIANS);
	this.y = this.y + this.Speed * Math.sin(this.direction * TO_RADIANS);


	//this.direction += 0.1;
	//this.Scale += 0.02;

	//Game.printToDebugConsole("Updating Asteroid" + this.Speed + " " + this.x + " " + this.y);
}



this.detectCollisions = function() {
	
	for (var i = 0; i < deployedMunitions.length; i++) {
		var collisionOccured = liesWithinRadius(
			deployedMunitions[i].x,
			deployedMunitions[i].y,
			this.x + this.Scale,
			this.y + this.Scale,
			this.collisionRadius);
			if(toggleDebug==true) {
				c.save();
				c.beginPath();
				c.strokeStyle = 'pink';
				c.arc(this.x + this.Scale,this.y + this.Scale,this.collisionRadius,0,2*Math.PI);		
				c.stroke();
				c.restore();
			}
			
		if (collisionOccured) {
			Game.printToDebugConsole("Asteroid Collision!");

			this.direction = deployedMunitions[i].direction -90;
			this.Speed += 0.1;

			deployedMunitions[i].destroyed = true;
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