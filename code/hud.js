// -----------------------------
// H.U.D 
// -----------------------------


function paintFuelGuage() {
	var FuelPercent = fuel;
	c.save();
	c.font="12px Verdana";
	c.fillStyle = "white";
	c.fillText("Fuel:   ", 5, canvasHeight - 20);
	c.strokeStyle = "blue";
	c.strokeRect(55, canvasHeight - 30, 100, 10);
	//c.fillStyle = "rgba(255,0,0, 0.3)";
	//c.fillRect(55, canvasHeight - 30, 100, 10);
	c.fillStyle = "blue";
	c.fillRect(55, canvasHeight - 30, FuelPercent, 10);
	c.restore();
	
	//Game.printToDebugConsole("Painting Fuel Guage" + clockCycle);
	
}

function paintShieldLevel() {
	var shieldPercent = (Ship.ShieldLevel/100)*100;
	c.save();
	c.font="12px Verdana";
	c.fillStyle = "white";
	c.fillText("Shield:   ", 5, canvasHeight - 60);
	c.strokeStyle = "white";
	c.strokeRect(55, canvasHeight - 70, 100, 10);
	c.fillStyle = "white";
	c.fillRect(55, canvasHeight - 70, shieldPercent, 10);
	c.restore();
}


function paintHitPointsLevel() {
	var hitPointsPercent = (Ship.HullStrength/100)*100;
	c.save();
	c.font="12px Verdana";
	c.fillStyle = "white";
	c.fillText("Hull:   ", 5, canvasHeight - 40);
	c.strokeStyle = "red";
	c.strokeRect(55, canvasHeight - 50, 100, 10);
	c.fillStyle = "red";
	c.fillRect(55, canvasHeight - 50, hitPointsPercent, 10);
	c.restore();


}

function paintInventory() {

	c.save();
	c.font="16px Verdana";
	c.fillStyle = "white";
	c.fillText("Cargo Hold", 5, 25);
	
	c.font = "12px Verdana";
	var height = 45;
	var difference = 15;
	
	if (Game.collectedResources.length == 0) {
		c.fillText("No Booty", 5, height);
	}
	
	else {
		for (var i = 0; i < Game.collectedResources.length; i++) {
			c.fillText(Game.collectedResources[i].type + ": " + Game.collectedResources[i].amount, 5, height + (difference*i));
		}
	}
}