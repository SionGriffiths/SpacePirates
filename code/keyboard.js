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

				Game.playThrust();

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
				Game.playPewPewPew();
				break;
		
	// P - place an enemy ship - development convenience
	case 80:	EnemyShip.instantiate(500, 300);
				break;


	case 79:    var randAst = [1];
				var tempAsteroid = new Asteroid(randAst);
				break; 

	case 89:    DebugToggle();
				break;

	case 84:	toggleInstructions();
				break;
	
	case 69:	var newfuelCell = new fuelCell(1, 40, 40);
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
