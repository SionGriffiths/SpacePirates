// -----------------------------
// H.U.D 
// -----------------------------


function paintFuelGuage() {
	c.save();
	c.strokeStyle = "red";
	c.strokeRect(10, canvasHeight - 30, 100, 10);
	c.fillStyle = "red";
	c.fillRect(10, canvasHeight - 30, fuel, 10);
	c.restore();
}