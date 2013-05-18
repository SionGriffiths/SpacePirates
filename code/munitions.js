//=============================================
// Munitions
//=============================================


function paintDeployedMunitions() {

	// For each item in the munitions array,
	// paint it at it's x and y coordinates.
	
	// Note, graphical missiles will need to
	// maintain direction data and rotate the
	// canvas for painting.
	
	for (var i = 0; i < deployedMunitions.length; i++) {
	
		c.save();
		c.translate(deployedMunitions[i].x, deployedMunitions[i].y);
		c.translate(20, 20);
		c.rotate(deployedMunitions[i].direction * TO_RADIANS);
		deployedMunitions[i].draw();
		c.restore();
	}	
}

function updateDeployedMunitions() {

	// For each item in the munitions array,
	// get it and update its x and y.
	// Perhaps change its graphic properties for
	// animation effect too.

	for (var i = 0; i < deployedMunitions.length; i++) {
		deployedMunitions[i].update();
	}	
}


function fireShipLaserPulse() {

	// Create a new munitions object with data
	var deployedLaser = new Object();
	
	deployedLaser.name = "RoundRedLaserPulse";

	deployedLaser.x = shipX + 20;
	deployedLaser.y = shipY + 20;

	deployedLaser.direction = shipDirection;
	deployedLaser.speed = 6 + shipMomentum;
	
	deployedLaser.numberOfAnimations = 4;
	deployedLaser.nextAnimationCalc = 0;
	
	deployedLaser.animations = new Array();
	deployedLaser.animations[0] = 0.5;
	deployedLaser.animations[1] = 1;
	deployedLaser.animations[2] = 3;
	deployedLaser.animations[3] = 5;
	
	deployedLaser.animationSize = 1;
	deployedLaser.innerSize = 2;
	deployedLaser.outerSize = 7;
	
	
	deployedLaser.draw = function() {
			//c.save();
			var gradient = c.createRadialGradient(-40, -40, this.innerSize, -40, -40, this.outerSize);
			gradient.addColorStop(0,"red");
			gradient.addColorStop(1,"transparent");
			c.fillStyle = gradient;
			c.fillRect(-60, -60, 40, 40);
			//c.restore();
	}
	
	deployedLaser.update = function() {

			this.innerSize = (this.animationSize + this.animations[this.nextAnimationCalc]);
			this.outerSize = (this.animationSize + 5 +(2 * this.animations[this.nextAnimationCalc]));
			this.nextAnimationCalc += 1;
			if (this.nextAnimationCalc >= this.numberOfAnimations) {
				this.nextAnimationCalc = 0;
			}
			
			this.x = this.x + this.speed * Math.cos((this.direction - 90) * TO_RADIANS);
			this.y = this.y + this.speed * Math.sin((this.direction - 90) * TO_RADIANS);

	}
		
	deployedMunitions.push(deployedLaser);
	
	Game.printToDebugConsole("One laser object added");
	Game.printToDebugConsole("Total deployedMunitions = " + deployedMunitions.length);
	
}