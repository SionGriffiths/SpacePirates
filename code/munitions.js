//=============================================
// Munitions
//=============================================

function RedLaserMunition(originX, originY, targetDirection, aggressor, aggressorMomentum, turret) {

	this.name = "RedLaser";
	this.x = originX;
	this.y = originY;
	this.direction = targetDirection;
	this.origin = aggressor;
	this.speed = 11 + (aggressorMomentum / 2);
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
	this.gunTurret = turret;
	this.fireRate = 100; // Milisecond interval - hardcoded in Game: function fireNewMunitions()
	this.power = 1;
	
	
	this.draw = function() {

		if (!(this.destroyed)) {
			var gradient = c.createRadialGradient(0, 0, this.innerSize*z, 0, 0, this.outerSize*z);
			gradient.addColorStop(0,"red");
			gradient.addColorStop(1,"transparent");
			c.fillStyle = gradient;
			c.fillRect(-20*z, -20*z, 40*z, 40*z);
		}
		
		else {
			var gradient = c.createRadialGradient(0, 0, this.innerSize*z, 0, 0, this.outerSize*z);
			gradient.addColorStop(0,"red");
			gradient.addColorStop(0.5, "orange");
			gradient.addColorStop(1,"transparent");
			c.fillStyle = gradient;
			c.fillRect(-200*z, -200*z, 800*z, 800*z);
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

function BlueLaserMunition(originX, originY, targetDirection, aggressor, aggressorMomentum, turret) {
	
	this.name = "BlueLaser";
	this.x = originX;
	this.y = originY;
	this.direction = targetDirection;
	this.origin = aggressor;
	this.speed = 4 + (aggressorMomentum / 4);
	this.numberOfAnimations = 4;
	this.nextAnimationCalc = 0;
	this.lifetime = 480;
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
	this.gunTurret = turret;
	this.fireRate = 1000; // Milisecond interval - hardcoded in Game: function fireNewMunitions()
	this.power = 25;
	
	
	this.draw = function() {

		if (!(this.destroyed)) {
			var gradient = c.createRadialGradient(0, 0, this.innerSize*z, 0, 0, this.outerSize*z);
			gradient.addColorStop(0,"blue");
			gradient.addColorStop(0.5, "yellow");
			gradient.addColorStop(1,"transparent");
			c.fillStyle = gradient;
			c.fillRect(-20*z, -20*z, 40*z, 40*z);
		}
		
		else {
			var gradient = c.createRadialGradient(0, 0, this.innerSize*z, 0, 0, this.outerSize*z);
			gradient.addColorStop(0,"blue");
			gradient.addColorStop(0.5, "yellow");
			gradient.addColorStop(1,"transparent");
			c.fillStyle = gradient;
			c.fillRect(-200*z, -200*z, 800*z, 800*z);
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

function GreenLaserPulseMunition(originX, originY, targetDirection, aggressor, aggressorMomentum, turret){

	this.name = "GreenLaser";
	this.x = originX;
	this.y = originY;
	this.direction = targetDirection;
	this.origin = aggressor;
	this.speed = 8 + (aggressorMomentum / 2);
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
	this.gunTurret = turret;
	this.fireRate = 500; // Milisecond interval - hardcoded in Game: function fireNewMunitions()
	this.power = 6;
	
	
	this.draw = function() {
		
		if (!(this.destroyed)) {
			var gradient = c.createRadialGradient(0, 0, this.innerSize*z, 0, 0, this.outerSize*z);
			gradient.addColorStop(0,"green");
			gradient.addColorStop(0.5, "#0E8016");
			gradient.addColorStop(0.8, "#57FF62");
			gradient.addColorStop(1,"transparent");
			c.fillStyle = gradient;
			c.fillRect(-20*z, -20*z, 40*z, 40*z);
			var gradient = c.createRadialGradient(0, 12*z, this.innerSize*z, 0, 12*z, this.outerSize*z);
			gradient.addColorStop(0.1,"green");
			gradient.addColorStop(0.5, "#0E8016");
			gradient.addColorStop(0.9, "#8FFF96");
			gradient.addColorStop(1,"transparent");
			c.fillStyle = gradient;
			c.fillRect(-20*z, -20*z, 40*z, 40*z);
			var gradient = c.createRadialGradient(0, -12*z, this.innerSize*z, 0, -12*z, this.outerSize*z);
			gradient.addColorStop(0.1,"green");
			gradient.addColorStop(0.5, "#0E8016");
			gradient.addColorStop(0.9, "#8FFF96");
			gradient.addColorStop(1,"transparent");
			c.fillStyle = gradient;
			c.fillRect(-20*z, -40*z, 40*z, 40*z);
		}
		
		else {
			var gradient = c.createRadialGradient(0, 0, this.innerSize*z, 0, 0, this.outerSize*z);
			gradient.addColorStop(0,"green");
			gradient.addColorStop(0.5, "#0E8016");
			gradient.addColorStop(0.8, "#57FF62");
			gradient.addColorStop(1,"transparent");
			c.fillStyle = gradient;
			c.fillRect(-100*z, -100*z, 200*z, 200*z);
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
	
	mpsD = new Date();
	munitionsPaintStart = mpsD.getTime();
	
	
	for (var i = 0; i < deployedMunitions.length; i++) {
	
		if (deployedMunitions[i].origin == "Player Ship"){ 
			
			if (deployedMunitions[i].gunTurret == 0) {
			
				c.save();
				c.translate(gameMap.translateX(deployedMunitions[i].x), gameMap.translateY(deployedMunitions[i].y));
				c.rotate(deployedMunitions[i].direction * TO_RADIANS);
				c.translate(-16*z, -17*z);
				deployedMunitions[i].draw();
				
				if(toggleDebug==true) {
					c.beginPath();
					c.strokeStyle = 'blue';
					c.arc(0,0,20,0,2*Math.PI);			
					c.stroke();
				}

				c.restore();
			}
			
			else if (deployedMunitions[i].gunTurret == 1){
			
				c.save();
				c.translate(gameMap.translateX(deployedMunitions[i].x), gameMap.translateY(deployedMunitions[i].y));
				c.rotate(deployedMunitions[i].direction * TO_RADIANS);
				c.translate(16*z, -17*z);
				deployedMunitions[i].draw();
				
				if(toggleDebug==true) {
					c.beginPath();
					c.strokeStyle = 'blue';
					c.arc(0,0,20,0,2*Math.PI);			
					c.stroke();
				}

				c.restore();
			}
			
			else {
			
				c.save();
				c.translate(gameMap.translateX(deployedMunitions[i].x), gameMap.translateY(deployedMunitions[i].y));
				c.rotate(deployedMunitions[i].direction * TO_RADIANS);
				c.translate(0*z, -50*z);
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
		
		else if (deployedMunitions[i].origin == "Standard Vagabond") {
		
				c.save();
				c.translate(gameMap.translateX(deployedMunitions[i].x), gameMap.translateY(deployedMunitions[i].y));
				c.rotate(deployedMunitions[i].direction * TO_RADIANS);
				c.translate(5*z, -50*z);
				deployedMunitions[i].draw();
				
				if(toggleDebug==true) {
					c.beginPath();
					c.strokeStyle = 'blue';
					c.arc(0,0,20,0,2*Math.PI);			
					c.stroke();
				}

				c.restore();
		
		
		}
		
		else if (deployedMunitions[i].origin == "Platinum Cargo Ship") {
		
				c.save();
				c.translate(gameMap.translateX(deployedMunitions[i].x), gameMap.translateY(deployedMunitions[i].y));
				c.rotate(deployedMunitions[i].direction * TO_RADIANS);
				c.translate(5*z, -50*z);
				deployedMunitions[i].draw();
				
				if(toggleDebug==true) {
					c.beginPath();
					c.strokeStyle = 'blue';
					c.arc(0,0,20,0,2*Math.PI);			
					c.stroke();
				}

				c.restore();
		
		
		}
		
		else if (deployedMunitions[i].origin == "Gold Cargo Ship") {
		
				c.save();
				c.translate(gameMap.translateX(deployedMunitions[i].x), gameMap.translateY(deployedMunitions[i].y));
				c.rotate(deployedMunitions[i].direction * TO_RADIANS);
				c.translate(5*z, -50*z);
				deployedMunitions[i].draw();
				
				if(toggleDebug==true) {
					c.beginPath();
					c.strokeStyle = 'blue';
					c.arc(0,0,20,0,2*Math.PI);			
					c.stroke();
				}

				c.restore();
		
		
		}
		
		else if (deployedMunitions[i].origin == "Commercial Cargo Ship") {
		
				c.save();
				c.translate(gameMap.translateX(deployedMunitions[i].x), gameMap.translateY(deployedMunitions[i].y));
				c.rotate(deployedMunitions[i].direction * TO_RADIANS);
				c.translate(5*z, -50*z);
				deployedMunitions[i].draw();
				
				if(toggleDebug==true) {
					c.beginPath();
					c.strokeStyle = 'blue';
					c.arc(0,0,20,0,2*Math.PI);			
					c.stroke();
				}

				c.restore();
		
		
		}
		
		else if (deployedMunitions[i].origin == "Behemoth Battleship") {
				
			if (deployedMunitions[i].gunTurret == 0) {
				c.save();
				c.translate(gameMap.translateX(deployedMunitions[i].x), gameMap.translateY(deployedMunitions[i].y));
				c.rotate(deployedMunitions[i].direction * TO_RADIANS);
				c.translate(75*z, -170*z);
				deployedMunitions[i].draw();
				
				if(toggleDebug==true) {
					c.beginPath();
					c.strokeStyle = 'blue';
					c.arc(0,0,20,0,2*Math.PI);			
					c.stroke();
				}

				c.restore();
			}
			
			else if (deployedMunitions[i].gunTurret == 1) {
				c.save();
				c.translate(gameMap.translateX(deployedMunitions[i].x), gameMap.translateY(deployedMunitions[i].y));
				c.rotate(deployedMunitions[i].direction * TO_RADIANS);
				c.translate(-75*z, -170*z);
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
	}
	
	mpfD = new Date();
	munitionsPaintFinish = mpfD.getTime();
	
}

function updateDeployedMunitions() {

	musD = new Date();
	munitionsUpdateStart = musD.getTime();

	for (var i = 0; i < deployedMunitions.length; i++) {
		
		deployedMunitions[i].update();
		
		if (deployedMunitions[i].expiryCounter >= deployedMunitions[i].lifetime) {
		   deployedMunitions.splice(i, 1);
		}
		else if (deployedMunitions[i].destroySequence > 10) {
			deployedMunitions.splice(i, 1);
		}
	}

	

	mufD = new Date();
	munitionsUpdateFinish = mufD.getTime();
	
}


function fireShipLaserPulse(munitionsType, originX, originY, targetDirection, aggressor, aggressorMomentum, turret) {

	switch (munitionsType) {
	
	case "RedLaser": 	var deployedMunition = new RedLaserMunition(originX, originY, targetDirection, aggressor, aggressorMomentum, turret);
						break;
	case "BlueLaser":	var deployedMunition = new BlueLaserMunition(originX, originY, targetDirection, aggressor, aggressorMomentum, turret);
						break;
	case "GreenLaser":	var deployedMunition = new GreenLaserPulseMunition(originX, originY, targetDirection, aggressor, aggressorMomentum, turret);
						break;
	}
		
	deployedMunitions.push(deployedMunition);
	
	
}


