
function Map() {


	// The center of the screen, in GameMap terms
	this.currentX = 0;
	this.currentY = 0;

	
	this.canvasE;
	
	this.canvasWidth;
	this.canvasHeight;
	
	this.gameXasCanvasX;
	this.gameYasCanvasY;
	
	this.boundaryRadius;
	this.boundaryShift; 
	this.boundaryShiftDirectionX;
	this.boundaryShiftDirectionY;
	
	
	this.translateX = function(gameX) {
	
		// Return canvas x
		var xPositionOnCanvas = -gameX;
		return (this.gameXasCanvasX - xPositionOnCanvas*z - this.currentX*z);
	}
	
	this.translateY = function(gameY) {
	
		// Return canvas y
		var yPositionOnCanvas = -gameY;
		return (this.gameYasCanvasY - yPositionOnCanvas*z - this.currentY*z);
	}

	
	
	this.initialize = function() {
	
		this.canvasE = document.getElementById('maincanvas');
	
		this.canvasWidth = this.canvasE.width;
		this.canvasHeight = this.canvasE.height;
		
		this.gameXasCanvasX =  this.canvasWidth / 2;
		this.gameYasCanvasY =  this.canvasHeight / 2;
		
		this.boundaryRadiusX = this.canvasWidth / 5;
		this.boundaryRadiusY = this.canvasHeight / 5;
	
		this.boundaryShift = false;
		this.boundaryShiftDirectionX = " ";
		this.boundaryShiftDirectionY = " ";
	
	}
	
	
	/*
	this.test = function() {
	
		Game.printToDebugConsole("CurrentX, CurrentY = " + this.currentX + " " + this.currentY);
		Game.printToDebugConsole("cX and cY as canvasX, canvasY = " + this.currentXasCanvasX + " " + this.currentYasCanvasY);
		Game.printToDebugConsole("Canvas Width: " + canvasWidth + " Canvas Height: " + canvasHeight);
		
		
	}



	this.paintARectTest = function(gameX, gameY) {
	
		var canvasE = document.getElementById('maincanvas');
		var c = canvasE.getContext("2d");
		
		c.save();
		c.fillStyle = "red";
		c.fillRect(this.translateX(gameX), this.translateY(gameY), 100, 100);
		c.restore();
	
	}
	*/
}

