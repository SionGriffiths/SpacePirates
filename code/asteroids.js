//=============================================
// Asteroids
//=============================================




function Asteroid(paras) {	
	if(typeof paras[0] == 'undefined') {
		this.aType = Math.floor(Math.random()*2);
	} else {
		this.aType = paras[0];
	}
	
	this.inRange = true;

	this.direction = Math.floor(Math.random()*351);
	if(typeof paras[1] == 'undefined'){ this.x = (gameMap.currentX - 400) + Math.floor(Math.random()*800);} else {this.x = paras[1];}
	if(typeof paras[2] == 'undefined'){ this.y = (gameMap.currentY -150) + Math.floor(Math.random()*300);} else {this.y = paras[2];}
	this.Scale = 30 + Math.floor(Math.random()*71);
	if(paras[0]==1) {
		this.Scale = this.Scale * 1.3;
	} else {
		this.Scale = this.Scale * 0.8;
	}
	this.scaleWarp = 4 + Math.floor(Math.random()*9);
	this.scaleWarpFactor = (1+Math.floor(Math.random()*10))/200;
	this.scaleDir = Math.floor(Math.random()*2);
	
	this.Size = this.Scale/2;
	this.collisionRadius = this.Size;
	this.spin = 0;
	this.spinDir = Math.floor(Math.random()*2);
	this.spinFactor = (1+Math.floor(Math.random()*4))/100;

	this.hit = 0;

	if(typeof paras[3] == 'undefined') {
		this.Speed = (1+Math.floor(Math.random()*4))/11;
	} else {
		this.Speed = paras[3];
	}

	this.recentlyHit = false;
	this.recentHitCounter = 0;
	this.maxSpeed = Math.floor(Math.random() * 6);
	
	
	addAsteroid(this);


  
// Paint the Asteroid
this.draw = function() {
	if(this.inRange == true) {
		c.save();
		c.translate(gameMap.translateX(this.x), gameMap.translateY(this.y));
		c.translate(this.Scale*z, this.Scale*z);
		c.rotate(this.direction + this.spin * TO_RADIANS);
		if(this.aType==1) {
			this.graphic = asteroidImage1;
		} else {
			this.graphic = asteroidImage2;
		}
		c.drawImage(this.graphic, -this.Size*z, -this.Size*z, this.Scale*z, this.Scale*z);
		if(toggleDebug==true) {
			c.fillStyle="green";
			c.fillRect(-5,-5,10,10);
			c.beginPath();
			c.strokeStyle = 'green';
			c.arc(0,0,this.collisionRadius*z,0,2*Math.PI);		
			c.stroke();
			c.font="30px Arial";
			c.fillText(this.hit,10,20);
		}
		c.restore();
		AsteroidsPainted += 1;
	}
}



this.update = function() {
	/*
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

	*/
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
	

	// Used to bounce asteroid off objects, without insanity
	if (this.recentlyHit) {
	
		this.recentHitCounter += 1;
		
		if (this.recentHitCounter > (this.Size * 1.5)) {
			this.recentHitCounter = 0;
			this.recentlyHit = false;
		}
	
	}
	
	if (this.Speed > this.maxSpeed) {
		this.Speed -= 0.05;
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
			this.collisionRadius+10*z);

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
				if(this.hit>19){
					
					newAst = [0, this.x+this.Size, this.y+this.Size, 2];
					var babyAsteroid1 = new Asteroid(newAst);
					var babyAsteroid2 = new Asteroid(newAst);
					var doMakeFuel = Math.round(Math.random());
					if(doMakeFuel) {
						var newFuelCell = new FuelCell(1, newAst[1], newAst[2]);
					}
				} else {
					this.direction = deployedMunitions[i].direction -90;
					this.Speed += 0.1;
				}			
				this.hit += 1;
			} else {
				this.direction = deployedMunitions[i].direction -90;
				this.Speed += 0.1;
				this.hit += 2;
			}
			
			
			deployedMunitions[i].destroyed = true;
		}
	}
	
}


}

// Paint Asteroids objects, held in an array
function paintAsteroids(){
	AsteroidsPainted = 0;
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
		if(Game.asteroids[i].hit > 20) {
			Game.asteroids.splice(i, 1);
		}
		// If the asteroid has drifted WAY away from the current center
		// of the screen, dont deal with it.
		var distanceX = Math.abs(Game.asteroids[i].x - gameMap.currentX);
		if (distanceX > (gameMap.canvasWidth/2)/z) {
			Game.asteroids[i].inRange = false;
			//Game.asteroids.splice(i, 1);
		} else {
			Game.asteroids[i].inRange = true;
		}
		var distanceY = Math.abs(Game.asteroids[i].y - gameMap.currentY);
		if (distanceY > (gameMap.canvasHeight/2)/z) {
			Game.asteroids[i].inRange = false;
			//Game.asteroids.splice(i, 1);
		} else {
			Game.asteroids[i].inRange = true;
		}
		
		
	}
}

// Add an Asteroid to the array
function addAsteroid(asteroid){
	Game.asteroids.push(asteroid);
	//window.alert(Game.asteroids[0].x);

}
