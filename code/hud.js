// -----------------------------
// H.U.D 
// -----------------------------


function paintFuelGuage() {
	var FuelPercent = fuel;
	c.save();
	c.strokeStyle = "red";
	c.strokeRect(10, canvasHeight - 30, 100, 10);
	c.fillStyle = "red";
	c.fillRect(10, canvasHeight - 30, FuelPercent, 10);
	c.restore();
	
	//Game.printToDebugConsole("Painting Fuel Guage" + clockCycle);
	
}

function paintShieldLevel() {
	var ShieldPercent = (Ship.ShieldLevel/100)*100;
	c.save();
	c.strokeStyle = "white";
	c.strokeRect(10, canvasHeight - 30, 100, 10);
	c.fillStyle = "white";
	c.fillRect(10, canvasHeight - 60, ShieldPercent, 10);
	c.restore();
}