//=============================================
// Asteroids
//=============================================




function Asteroid(paras) {	
	if(typeof paras[0] == 'undefined') {
		this.aType = Math.floor(Math.random()*2);
	} else {
		this.aType = paras[0];
	}
	
	this.direction = Math.floor(Math.random()*351);
	if(typeof paras[1] == 'undefined'){ this.x = 100 + Math.floor(Math.random()*901);} else {this.x = paras[1];}
	if(typeof paras[2] == 'undefined'){ this.y = 150 + Math.floor(Math.random()*601);} else {this.y = paras[2];}
	this.Scale = 50 + Math.floor(Math.random()*101);
	if(paras[0]==1) {
		this.Scale = this.Scale * 1.3;
	} else {
		this.Scale = this.Scale * 0.8;
	}
	this.scaleWarp = 4 + Math.floor(Math.random()*9);
	this.scaleWarpFactor = (1+Math.floor(Math.random()*10))/400;
	this.scaleDir = Math.floor(Math.random()*2);
	
	this.Size = this.Scale/2;
	this.collisionRadius = this.Size;
	this.spin = 0;
	this.spinDir = Math.floor(Math.random()*2);
	this.spinFactor = (1+Math.floor(Math.random()*4))/100;

	this.hit = false;

	if(typeof paras[3] == 'undefined') {
		this.Speed = (1+Math.floor(Math.random()*4))/11;
	} else {
		this.Speed = paras[3];
	}


	addAsteroid(this);


  
// Paint the Asteroid
this.draw = function() {
	c.save();
	c.translate(this.x, this.y);
	c.translate(this.Scale, this.Scale);
	c.rotate(this.direction + this.spin * TO_RADIANS);
	if(this.aType==1) {
		this.graphic = asteroidImage1;
	} else {
		this.graphic = asteroidImage2;
	}
	c.drawImage(this.graphic, -this.Size, -this.Size, this.Scale, this.Scale);
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
	if(this.spinDir==1) {
		this.spin += 0.3;
	} else {
		this.spin -= 0.3;
	}
	

	if(this.scaleDir == 1) {
		this.Scale += this.scaleWarpFactor;
		if(this.Scale > (this.Size*2)+this.scaleWarp ) { this.scaleDir = 0;}
	}
	if(this.scaleDir == 0) {
		this.Scale -= this.scaleWarpFactor;
		if(this.Scale < (this.Size*2)-this.scaleWarp ) { this.scaleDir = 1;}
	}
	

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

			if(this.aType==1) {
				if(this.hit==false){
					
					newAst = [0, this.x+this.Size, this.y+this.Size, 4];
					var babyAsteroid1 = new Asteroid(newAst);
					var babyAsteroid2 = new Asteroid(newAst);
				}
				

			} else {
				this.direction = deployedMunitions[i].direction -90;
				this.Speed += 0.1;
			}
			this.hit = true;



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
		if(Game.asteroids[i].hit == true) {
			Game.asteroids.splice(i, 1);
		}
	}
}

// Add an Asteroid to the array
function addAsteroid(asteroid){
	Game.asteroids.push(asteroid);
	//window.alert(Game.asteroids[0].x);

}
