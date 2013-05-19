//=============================================
// Munitions
//=============================================

function RedLaserMunition(originX, originY, targetDirection, aggressor, aggressorMomentum) {

	this.name = "RedLaser";
	this.x = originX;
	this.y = originY;
	this.direction = targetDirection;
	this.origin = aggressor;
	this.speed = 6 + aggressorMomentum;
	this.numberOfAnimations = 4;
	this.nextAnimationCalc = 0;
	this.lifetime = 240;
	this.expiryCounter = 0;
	this.animations = new Array();
	this.animations[0] = 0.5;
	this.animations[1] = 1;
	this.animations[2] = 3;
	this.animations[3] = 5;
	this.animationSize = 1;
	this.innerSize = 2;
	this.outerSize = 7;
	this.destroyed = false;
	this.destroySequence = 0;
	
	this.draw = function() {

		if (!(this.destroyed)) {
			var gradient = c.createRadialGradient(0, 0, this.innerSize, 0, 0, this.outerSize);
			gradient.addColorStop(0,"red");
			gradient.addColorStop(1,"transparent");
			c.fillStyle = gradient;
			c.fillRect(-20, -20, 40, 40);
		}
		
		else {
			var gradient = c.createRadialGradient(0, 0, this.innerSize, 0, 0, this.outerSize);
			gradient.addColorStop(0,"red");
			gradient.addColorStop(0.5, "orange");
			gradient.addColorStop(1,"transparent");
			c.fillStyle = gradient;
			c.fillRect(-200, -200, 800, 800);
		}
	}
	
	this.update = function() {

			if (!(this.destroyed)) {
			
				this.innerSize = (this.animationSize + this.animations[this.nextAnimationCalc]);
				this.outerSize = (this.animationSize + 5 +(2 * this.animations[this.nextAnimationCalc]));
				this.nextAnimationCalc += 1;
				
				if (this.nextAnimationCalc >= this.numberOfAnimations) {
					this.nextAnimationCalc = 0;
				}
				
				this.x = this.x + this.speed * Math.cos((this.direction - 90) * TO_RADIANS);
				this.y = this.y + this.speed * Math.sin((this.direction - 90) * TO_RADIANS);

				this.expiryCounter += 1;
				
			}
			
			else {
			
				this.innerSize = (this.animationSize + this.animations[this.nextAnimationCalc]);
				this.outerSize = (this.animationSize + 5 +(2 * this.animations[this.nextAnimationCalc]));
				this.nextAnimationCalc += 1;
				
				if (this.nextAnimationCalc >= this.numberOfAnimations) {
					this.nextAnimationCalc = 0;
				}
				
				this.innerSize *= 3;
				this.outerSize *= 6;
				
				this.destroySequence += 1;
				
			}
	}
	

}

function BlueLaserMunition(originX, originY, targetDirection, aggressor, aggressorMomentum) {
	
	this.name = "BlueLaser";
	this.x = originX;
	this.y = originY;
	this.direction = targetDirection;
	this.origin = aggressor;
	this.speed = 10 + aggressorMomentum;
	this.numberOfAnimations = 4;
	this.nextAnimationCalc = 0;
	this.lifetime = 240;
	this.expiryCounter = 0;
	this.animations = new Array();
	this.animations[0] = 0.5;
	this.animations[1] = 1;
	this.animations[2] = 3;
	this.animations[3] = 5;
	this.animationSize = 1;
	this.innerSize = 2;
	this.outerSize = 7;
	this.destroyed = false;
	this.destroySequence = 0;
	
	this.draw = function() {

		if (!(this.destroyed)) {
			var gradient = c.createRadialGradient(0, 0, this.innerSize, 0, 0, this.outerSize);
			gradient.addColorStop(0,"blue");
			gradient.addColorStop(0.5, "yellow");
			gradient.addColorStop(1,"transparent");
			c.fillStyle = gradient;
			c.fillRect(-20, -20, 40, 40);
		}
		
		else {
			var gradient = c.createRadialGradient(0, 0, this.innerSize, 0, 0, this.outerSize);
			gradient.addColorStop(0,"blue");
			gradient.addColorStop(0.5, "yellow");
			gradient.addColorStop(1,"transparent");
			c.fillStyle = gradient;
			c.fillRect(-200, -200, 800, 800);
		}
	}
	
	this.update = function() {

			if (!(this.destroyed)) {
			
				this.innerSize = (this.animationSize + this.animations[this.nextAnimationCalc]);
				this.outerSize = (this.animationSize + 5 +(2 * this.animations[this.nextAnimationCalc]));
				this.nextAnimationCalc += 1;
				
				if (this.nextAnimationCalc >= this.numberOfAnimations) {
					this.nextAnimationCalc = 0;
				}
				
				this.x = this.x + this.speed * Math.cos((this.direction - 90) * TO_RADIANS);
				this.y = this.y + this.speed * Math.sin((this.direction - 90) * TO_RADIANS);

				this.expiryCounter += 1;
				
			}
			
			else {
			
				this.innerSize = (this.animationSize + this.animations[this.nextAnimationCalc]);
				this.outerSize = (this.animationSize + 5 +(2 * this.animations[this.nextAnimationCalc]));
				this.nextAnimationCalc += 1;
				
				if (this.nextAnimationCalc >= this.numberOfAnimations) {
					this.nextAnimationCalc = 0;
				}
				
				this.innerSize *= 6;
				this.outerSize *= 14;
				
				this.destroySequence += 1;
				
			}
	}

}

function GreenLaserPulseMunition(originX, originY, targetDirection, aggressor, aggressorMomentum){

	this.name = "GreenLaser";
	this.x = originX;
	this.y = originY;
	this.direction = targetDirection;
	this.origin = aggressor;
	this.speed = 4 + aggressorMomentum;
	this.numberOfAnimations = 6;
	this.nextAnimationCalc = 0;
	this.lifetime = 240;
	this.expiryCounter = 0;
	this.animations = new Array();
	this.animations[0] = 0.2;
	this.animations[1] = 0.5;
	this.animations[2] = 0.7;
	this.animations[3] = 1;
	this.animations[4] = 1.5;
	this.animations[5] = 2;
	this.animationSize = 1;
	this.innerSize = 2;
	this.outerSize = 7;
	this.destroyed = false;
	this.destroySequence = 0;
	
	this.draw = function() {
		
		if (!(this.destroyed)) {
			var gradient = c.createRadialGradient(0, 0, this.innerSize, 0, 0, this.outerSize);
			gradient.addColorStop(0,"green");
			gradient.addColorStop(0.5, "#0E8016");
			gradient.addColorStop(0.8, "#57FF62");
			gradient.addColorStop(1,"transparent");
			c.fillStyle = gradient;
			c.fillRect(-20, -20, 40, 40);
			var gradient = c.createRadialGradient(0, 15, this.innerSize, 0, 15, this.outerSize);
			gradient.addColorStop(0.1,"green");
			gradient.addColorStop(0.5, "#0E8016");
			gradient.addColorStop(0.9, "#8FFF96");
			gradient.addColorStop(1,"transparent");
			c.fillStyle = gradient;
			c.fillRect(-20, -20, 40, 40);
			var gradient = c.createRadialGradient(0, -15, this.innerSize, 0, -15, this.outerSize);
			gradient.addColorStop(0.1,"green");
			gradient.addColorStop(0.5, "#0E8016");
			gradient.addColorStop(0.9, "#8FFF96");
			gradient.addColorStop(1,"transparent");
			c.fillStyle = gradient;
			c.fillRect(-20, -40, 40, 40);
		}
		
		else {
			var gradient = c.createRadialGradient(0, 0, this.innerSize, 0, 0, this.outerSize);
			gradient.addColorStop(0,"green");
			gradient.addColorStop(0.5, "#0E8016");
			gradient.addColorStop(0.8, "#57FF62");
			gradient.addColorStop(1,"transparent");
			c.fillStyle = gradient;
			c.fillRect(-100, -100, 200, 200);
		}
		
		
		/*
		if (!(this.destroyed)) {
			var gradient = c.createRadialGradient(0, 0, this.innerSize, 0, 0, this.outerSize);
			gradient.addColorStop(0,"green");
			gradient.addColorStop(0.5, "#0E8016");
			gradient.addColorStop(0.8, "#57FF62");
			gradient.addColorStop(1,"transparent");
			c.fillStyle = gradient;
			c.fillRect(-20, -20, 40, 40);
			var gradient = c.createRadialGradient(0, 15, this.innerSize, 0, 15, this.outerSize);
			gradient.addColorStop(0,"green");
			gradient.addColorStop(0.5, "#0E8016");
			gradient.addColorStop(0.8, "#8FFF96");
			gradient.addColorStop(1,"transparent");
			c.fillStyle = gradient;
			c.fillRect(-20, -20, 40, 40);
		}
		
		else {
			var gradient = c.createRadialGradient(0, 0, this.innerSize, 0, 0, this.outerSize);
			gradient.addColorStop(0,"green");
			gradient.addColorStop(0.5, "#0E8016");
			gradient.addColorStop(0.8, "#57FF62");
			gradient.addColorStop(1,"transparent");
			c.fillStyle = gradient;
			c.fillRect(-100, -100, 200, 200);
		}
	}
	*/
	
	}
	
	
	this.update = function() {

			if (!(this.destroyed)) {
			
				this.innerSize = (this.animationSize + this.animations[this.nextAnimationCalc]);
				this.outerSize = (this.animationSize + 5 +(2 * this.animations[this.nextAnimationCalc]));
				this.nextAnimationCalc += 1;
				
				if (this.nextAnimationCalc >= this.numberOfAnimations) {
					this.nextAnimationCalc = 0;
				}
				
				this.x = this.x + this.speed * Math.cos((this.direction - 90) * TO_RADIANS);
				this.y = this.y + this.speed * Math.sin((this.direction - 90) * TO_RADIANS);

				this.expiryCounter += 1;
				
			}
			
			else {
			
				this.innerSize = (this.animationSize + this.animations[this.nextAnimationCalc]);
				this.outerSize = (this.animationSize + 5 +(2 * this.animations[this.nextAnimationCalc]));
				this.nextAnimationCalc += 1;
				
				if (this.nextAnimationCalc >= this.numberOfAnimations) {
					this.nextAnimationCalc = 0;
				}
				
				this.innerSize *= 5;
				this.outerSize *= 4;
				
				this.destroySequence += 1;
				
			}
	}


}




function paintDeployedMunitions() {

	// For each item in the munitions array,
	// paint it at it's x and y coordinates.
	
	// Note, graphical missiles will need to
	// maintain direction data and rotate the
	// canvas for painting.
	
	for (var i = 0; i < deployedMunitions.length; i++) {
	
		c.save();
		c.translate(deployedMunitions[i].x, deployedMunitions[i].y);
		c.rotate(deployedMunitions[i].direction * TO_RADIANS);
		c.translate(0, -50);
		deployedMunitions[i].draw();
		
		if(toggleDebug==true) {
			c.beginPath();
			c.strokeStyle = 'blue';
			c.arc(0,0,20,0,2*Math.PI);			
			c.stroke();
		}

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
		if (deployedMunitions[i].expiryCounter >= deployedMunitions[i].lifetime) {
		   deployedMunitions.splice(i, 1);
		}
		else if (deployedMunitions[i].destroySequence > 10) {
			deployedMunitions.splice(i, 1);
		}
	}	

	
}


function fireShipLaserPulse(munitionsType, originX, originY, targetDirection, aggressor, aggressorMomentum) {

	switch (munitionsType) {
	
	case "RedLaser": 	var deployedMunition = new RedLaserMunition(originX, originY, targetDirection, aggressor, aggressorMomentum);
						break;
	case "BlueLaser":	var deployedMunition = new BlueLaserMunition(originX, originY, targetDirection, aggressor, aggressorMomentum);
						break;
	case "GreenLaser":	var deployedMunition = new GreenLaserPulseMunition(originX, originY, targetDirection, aggressor, aggressorMomentum);
						//var secondaryMunition = new GreenLaserPulseMunition(originX + 5, originY + 5, targetDirection, aggressor, aggressorMomentum);
						//deployedMunitions.push(secondaryMunition);
						break;
	}
		
	deployedMunitions.push(deployedMunition);
	
	Game.printToDebugConsole("One munition object added");
	Game.printToDebugConsole("Total deployedMunitions = " + deployedMunitions.length);
	
}



/*
function fireShipLaserPulse() {

	// Create a new munitions object with data
	var deployedLaser = new Object();
	
	deployedLaser.name = "RoundRedLaserPulse";

	c.save();
	c.translate(shipX, shipY);

	c.translate(0, 0);

	c.rotate(shipDirection * TO_RADIANS);
	
	deployedLaser.x = shipX;
	deployedLaser.y = shipY;

	c.restore();

	deployedLaser.direction = shipDirection;
	deployedLaser.speed = 6 + shipMomentum;
	
	deployedLaser.numberOfAnimations = 4;
	deployedLaser.nextAnimationCalc = 0;

	deployedLaser.lifetime = 240;
	deployedLaser.expiryCounter = 0;
	
	deployedLaser.animations = new Array();
	deployedLaser.animations[0] = 0.5;
	deployedLaser.animations[1] = 1;
	deployedLaser.animations[2] = 3;
	deployedLaser.animations[3] = 5;
	
	deployedLaser.animationSize = 1;
	deployedLaser.innerSize = 2;
	deployedLaser.outerSize = 7;
	
	deployedLaser.destroyed = false;
	deployedLaser.destroySequence = 0;
	
	
	
	deployedLaser.draw = function() {

		if (!(this.destroyed)) {
			var gradient = c.createRadialGradient(0, 0, this.innerSize, 0, 0, this.outerSize);
			gradient.addColorStop(0,"red");
			gradient.addColorStop(1,"transparent");
			c.fillStyle = gradient;
			c.fillRect(-20, -20, 40, 40);
		}
		
		else {
			var gradient = c.createRadialGradient(0, 0, this.innerSize, 0, 0, this.outerSize);
			gradient.addColorStop(0,"red");
			gradient.addColorStop(0.5, "orange");
			gradient.addColorStop(1,"transparent");
			c.fillStyle = gradient;
			c.fillRect(-200, -200, 800, 800);
		}
	}
	
	deployedLaser.update = function() {

			if (!(this.destroyed)) {
			
				this.innerSize = (this.animationSize + this.animations[this.nextAnimationCalc]);
				this.outerSize = (this.animationSize + 5 +(2 * this.animations[this.nextAnimationCalc]));
				this.nextAnimationCalc += 1;
				
				if (this.nextAnimationCalc >= this.numberOfAnimations) {
					this.nextAnimationCalc = 0;
				}
				
				this.x = this.x + this.speed * Math.cos((this.direction - 90) * TO_RADIANS);
				this.y = this.y + this.speed * Math.sin((this.direction - 90) * TO_RADIANS);

				this.expiryCounter += 1;
				
			}
			
			else {
			
				this.innerSize = (this.animationSize + this.animations[this.nextAnimationCalc]);
				this.outerSize = (this.animationSize + 5 +(2 * this.animations[this.nextAnimationCalc]));
				this.nextAnimationCalc += 1;
				
				if (this.nextAnimationCalc >= this.numberOfAnimations) {
					this.nextAnimationCalc = 0;
				}
				
				this.innerSize *= 3;
				this.outerSize *= 6;
				
				this.destroySequence += 1;
				
			}
	}
		
	deployedMunitions.push(deployedLaser);
	
	Game.printToDebugConsole("One laser object added");
	Game.printToDebugConsole("Total deployedMunitions = " + deployedMunitions.length);
	
}

*/