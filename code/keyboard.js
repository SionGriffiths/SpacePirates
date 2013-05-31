//=========================================================================
// Input - Keyboard Listeners and Actions
//=========================================================================


// Initialize variables
var canvasElement;


// Add event listeners to the canvas
function setupEventListeners() {
	canvasElement = document;
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
	case 87:	if(Game.mode=='play'){
					Game.movePlayerShip("Forwards");
					Game.playThrust();
				}
				
				break;

	// S
	case 83:	if(Game.mode=='play'){
					Game.movePlayerShip("Backwards");
				}
				break;
				
	// A
	case 65:	if(Game.mode=='play'){
					Game.movePlayerShip("Left");
				}
				break;
				
	// D
	case 68:	if(Game.mode=='play'){
					Game.movePlayerShip("Right");
				}
				break;
				
	// ESC
	case 27:	if(Game.mode=='play'){
					Game.togglePause();
				}
				break;
				
	// SPACEBAR - Red Laser
	case 32:	Game.playerFiringMunitions = true;
				Game.playerMunitionsType = 0;
				break;
				
	// B - Blue Laser
	case 66:	Game.playerFiringMunitions = true;
				Game.playerMunitionsType = 1;
				break;
				
	// G - Green Laser
	case 71:	Game.playerFiringMunitions = true;
				Game.playerMunitionsType = 2;
				break;
		
		
	// P - place an enemy ship - development convenience
	case 80:	var enemyShip = new EnemyShip();
				enemyShip.createStandardVagabond(0,0);
				enemyShip.fireRate = (350 + (Math.random()*1250));
				var randomType = Math.floor(Math.random()*7);
				if (randomType <= 3) { enemyShip.type = "Standard Vagabond"; }
				else if (randomType == 4) { enemyShip.type = "Gold Cargo Ship"; }
				else if (randomType == 5) { enemyShip.type = "Platinum Cargo Ship"; }
				else { enemyShip.type = "Commercial Cargo Ship"; }
				break;
	// The [ { Key - place a Behemoth ship - development convenience
	case 219:	var enemyShip = new EnemyShip();
				enemyShip.createBehemothBattleship(0,0);
				break;
	
	// The } ] Key - place a fighter ship - development convenience
	case 221:	var enemyShip = new EnemyShip();
				enemyShip.createFighterSquadron(0,0);
				break;		
				
	// O - Place an asteroid
	case 79:    var randAst = [1];
				var tempAsteroid = new Asteroid(randAst);
				break; 
	
	// F - Fuel - development
	case 70:    fuel = 100;
				break; 
				
				
	// M - Toggle Map Mode
	case 77:    Game.toggleMap();
				break; 
				
	// Y - toggle debug graphics
	case 89:    DebugToggle();
				break;
				
	// T - toggle instructions
	case 84:	toggleInstructions();
				break;
				
	// L - toggle performance
	case 76:	if (togglePerformance) { togglePerformance = false; }
				else { togglePerformance = true; }
				break;
				
	// J - toggle sound effects
	case 74:	if (toggleSound) { toggleSound = false; }
				else { toggleSound = true; }
				break;
	
	// + - ZOOOOOOOOOM
	case 187:	gameMap.changeZoomLevel('down',1);
				break;
	case 189:	gameMap.changeZoomLevel('up',1);
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
					
	// SPACEBAR - Red Laser
	case 32:	Game.playerFiringMunitions = false;
				break;
				
	// B - Blue Laser
	case 66:	Game.playerFiringMunitions = false;
				break;
				
	// G - Green Laser
	case 71:	Game.playerFiringMunitions = false;
				break;
	
	}
	
}
