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
				
	// SPACEBAR - Red Laser
	case 32:	Game.fireShipLaserPulse(0);
				Game.playPewPewPew();
				break;
				
	// B - Blue Laser
	case 66:	Game.fireShipLaserPulse(1);
				Game.playPewPewPew();
				break;
				
	// G - Green Laser
	case 71:	Game.fireShipLaserPulse(2);
				Game.playPewPewPew();
				break;
		
		
	// P - place an enemy ship - development convenience
	case 80:	EnemyShip.instantiate(500, 300);
				break;

	// O - Place an asteroid
	case 79:    var randAst = [1];
				var tempAsteroid = new Asteroid(randAst);
				break; 
				
	// Y - toggle debug graphics
	case 89:    DebugToggle();
				break;
				
	// T - toggle instructions
	case 84:	toggleInstructions();
				break;
				
	// L - toggle sun effect
	case 76:	if (toggleSunEffect) { toggleSunEffect = false; }
				else { toggleSunEffect = true; }
				
	// J - toggle sound effects
	case 74:	if (toggleSound) { toggleSound = false; }
				else { toggleSound = true; }
	
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
