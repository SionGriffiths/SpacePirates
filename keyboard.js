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
	Game.printToDebugConsole("Added EventListeners to Canvas");
}





//=========================================================================
// Fire actions based on keyEvents
//=========================================================================
function keyEventFired(e) {
	
	var input = e.keyCode;
	//Game.printToDebugConsole(input);
	
	switch (input) {
	
	// W
	case 87:	Game.movePlayerShip("Forwards");


<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
				//Game.playThrust();

=======
					Game.playThrust();
>>>>>>> c2c7d794950ae7c75e1ab1da18769ea0590e164f
=======
					Game.playThrust();
>>>>>>> c2c7d794950ae7c75e1ab1da18769ea0590e164f
=======
					Game.playThrust();
>>>>>>> c2c7d794950ae7c75e1ab1da18769ea0590e164f

				break;
				
	// S
	case 83:	Game.movePlayerShip("Backwards");
				break;
				
	// A
	case 65:	Game.movePlayerShip("Left");
				break;
				
	// D
	case 68:	Game.movePlayerShip("Right");
				break;
				
	// ESC
	case 27:	gameRunning = false;
				break;
				
	// SPACEBAR
	case 32:	Game.fireShipLaserPulse();
				break;
	}
	
}

function keyEventOver(e) {
	
	var input = e.keyCode;
	
	switch (input) {
	
	// W
	case 87:	Game.stopMovePlayerShip("Forwards");
				break;
	
	// S
	case 83:	Game.stopMovePlayerShip("Backwards");
				break;
					
	// A
	case 65:	Game.stopMovePlayerShip("Left");
				break;
					
	// D
	case 68:	Game.stopMovePlayerShip("Right");
				break;
	}
	
}
