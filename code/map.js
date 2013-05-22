
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
	
	this.zoomLevel = 3;
	
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

	this.changeZoomLevel = function(direction){
		if(direction=="up"){
			this.zoomLevel +=1;
			if(this.zoomLevel > 7){
				this.zoomLevel = 7;
			}
		}
		if(direction=="down"){
			this.zoomLevel -=1;
			if(this.zoomLevel < 1){
				this.zoomLevel = 1;
			}
		}
		switch(this.zoomLevel){
			case 1: z = 2.0;
					break;
			case 2: z = 1.5;
					break;
			case 3: z = 1;
					break;
			case 4: z = 0.75;
					break;
			case 5: z = 0.5;
					break;
			case 6: z = 0.25;
					Game.mode = 'play';
					break;
			case 7: z = 0.05;
					Game.mode = 'map';
					break;
		}
	}
	

	// this.getZoomStarCount = function(){
	// 	var stars = 80;
	// 	switch(this.zoomLevel){
	// 		case 1: stars = 20;
	// 				break;
	// 		case 2: stars = 40;
	// 				break;
	// 		case 3: stars = 80;
	// 				break;
	// 		case 4: stars = 320;
	// 				break;
	// 		case 5: stars = 1280;
	// 				break;
	// 		case 6: stars = 10240;
	// 				break;
	// 	}
	// 	return stars;
	// }
	
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

