//=========================================================================
// Input - Keyboard Listeners and Actions
//=========================================================================


// Initialize variables
var canvasElement;


// Add event listeners to the canvas
function setupEventListeners() {
	canvasElement = document.getElementById('maincanvas');
	canvasElement.addEventListener( "keydown", keyEventFired, true);
	canvasElement.addEventListener( "keyup", keyEventOver, true);
}





//=========================================================================
// Fire actions based on keyEvents
//=========================================================================
function keyEventFired(e) {
	
	var input = e.keyCode;
	Game.printToDebugConsole(input);
	
	switch (input) {
	
	// W
	case 87:	Game.playerShip.move("Forwards");
				break;
				
	// S
	case 83:	Game.playerShip.move("Backwards");
				break;
				
	// A
	case 65:	Game.playerShip.move("Left");
				break;
				
	// D
	case 68:	Game.playerShip.move("Right");
				break;
				
	// ESC
	case 27:	gameRunning = false;
				break;
				
	// SPACEBAR
	case 32:	gameStart();
				break;
	}
	
}

function keyEventOver(e) {
	
	var input = e.keyCode;
	
	switch (input) {
	
	// W
	case 87:	Game.playerShip.stopMove("Forwards");
				break;
	
	// S
	case 83:	Game.playerShip.stopMove("Backwards");
				break;
					
	// A
	case 65:	Game.playerShip.stopMove("Left");
				break;
					
	// D
	case 68:	Game.playerShip.stopMove("Right");
				break;
	}
	
	//window.alert(e.keyCode);
}
