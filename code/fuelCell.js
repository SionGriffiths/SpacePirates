//=============================================
// Fuel
//=============================================

function FuelCell(type, x, y) {

		this.fType = type;
		if(this.fType == 0) {
			this.size = 20;
		} else {
			this.size = 40;
		}
		this.collisionRadius = this.size;
		this.x = x;
		this.y = y;
		
		this.isCollected = false;
		
		addFuel(this);
	
		Game.printToDebugConsole("Fuel cell created");

}

function addFuel(fuel) {
	fuelCells.push(fuel);
	Game.printToDebugConsole("Fuel cell added to array" + fuel.x + " " + fuel.y);
}

function paintFuel() {
	for (var i = 0; i < fuelCells.length; i++) {
		drawFuel(fuelCells[i]);
	}
}

function drawFuel(fuelpiece) {

	c.save();
	c.translate(fuelpiece.x, fuelpiece.y);
	if (fuelpiece.fType == 0) {
		fuelpiece.graphic = fuelImage1;
	} else {
		fuelpiece.graphic = fuelImage2;
	}
	c.drawImage(fuelpiece.graphic, fuelpiece.Size, fuelpiece.Size);
	if(toggleDebug==true) {
		c.beginPath();
		c.strokeStyle = 'yellow';
		c.arc(0,0,fuelpiece.collisionRadius,0,2*Math.PI);		
		c.stroke();
	}
	c.restore();
}

function detectFuelCollisions() {
	var  collisionOccured = liesWithinRadius(
							shipX,
							shipY,
							this.x + this.size / 2,
							this.y + this.size / 2,
							this.collisionRadius);
	
	if(collisionOccured) {
		if (this.fType = 0) { 
			if (fuel < 90) {
				fuel = fuel + 10; }
				else { fuel = 100; }
		}
		
		else { 
			if (fuel < 75) {
				fuel = fuel + 25;
			} else { fuel = 100; }
		}
		
		this.isCollected = true;
		Game.printToDebugConsole("Collision Detected");
	}
}

this.updateFuel = function() {
	for (var i = 0; i < fuelCells.length; i++) {
		detectFuelCollisions();
		
		if(fuelCells[i].isCollected) {
			fuelCells.splice(i, 1);
		}
	}
}