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
		this.collisionRadius = this.size + 10;
		this.x = x;
		this.y = y;
		
		this.graphic;
		
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
	c.translate(gameMap.translateX(fuelpiece.x), gameMap.translateY(fuelpiece.y));
	if (fuelpiece.fType == 0) {
		fuelpiece.graphic = fuelImage1;
	} else {
		fuelpiece.graphic = fuelImage2;
	}
	c.drawImage(fuelpiece.graphic, -(fuelpiece.size/2), -(fuelpiece.size/2), fuelpiece.size*z, fuelpiece.size*z);
	if(toggleDebug==true) {
		c.beginPath();
		c.strokeStyle = 'yellow';
		c.arc(0 + (fuelpiece.size * 1.5), 0 + (fuelpiece.size * 1.5),fuelpiece.collisionRadius,0,2*Math.PI, true);		
		c.stroke();
	}
	c.restore();
}

function detectFuelCollisions() {
	
	for (var i = 0; i < fuelCells.length; i++) {
		var thisFuelCell = fuelCells[i];
	var  collisionOccured = liesWithinRadius(
							Ship.X,
							Ship.Y,
							thisFuelCell.x + (thisFuelCell.size * 1.5),
							thisFuelCell.y + (thisFuelCell.size * 1.5),
							thisFuelCell.collisionRadius);
	
	if(collisionOccured) {
		if (thisFuelCell.fType == 0) { 
			if (fuel < 90) {
				fuel = fuel + 10; }
				else { fuel = 100; }
		}
		
		else { 
			if (fuel < 75) {
				fuel = fuel + 25;
			} else { fuel = 100; }
		}
		
		thisFuelCell.isCollected = true;
		Game.printToDebugConsole("Collision Detected");
	}
	}
}

this.updateFuel = function() {
	
		detectFuelCollisions();
	for (var i = 0; i < fuelCells.length; i++) {	
		if(fuelCells[i].isCollected) {
						fuelCells.splice(i, 1);
			Game.printToDebugConsole("Removed fuel cell " + fuelCells.length + " remaining");
		}
	}
}