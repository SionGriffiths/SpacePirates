
//=============================================
// Main Game class
//=============================================

// Instantiate Object
var Game = new Object();



// Initialize the canvas
Game.initialize = function() {
	canvasE = document.getElementById('maincanvas');
	c = canvasE.getContext('2d');
	
	// c.fillStyle = 'rgb(200, 0, 0)';
 //    c.fillRect(10, 10, 50, 50);
 //    c.fillStyle = 'rgba(0, 0, 200, 0.5)';
 //    c.fillRect(30, 30, 50, 50);
	
	//canvasWidth = canvasE.width;
	//canvasHeight = canvasE.height;

	//Ship.X = 0;
	//Ship.Y = 0;
	Game.printToDebugConsole("Initializing background");	

	initializeBackground();
	Game.mode = 'loading';
}




// Display loading screen and preload images
Game.load = function() {

	

	Game.printToDebugConsole("Displaying load message");


	// Display loading screen
	var loadingPaneX = ((canvasWidth / 2) - ((canvasWidth / 1.5) / 2));
	var loadingPaneY = ((canvasHeight / 2) - ((canvasHeight / 3) / 2));
	var loadingPaneWidth = (canvasWidth / 1.5);
	var loadingPaneHeight = (canvasHeight / 3);
	
	c.save();
	drawRoundRect(c, loadingPaneX, loadingPaneY, loadingPaneWidth, loadingPaneHeight, 10, true, true);
	c.restore();
	
	var loadingMessage = 'Loading';
	var loadingMessageMetrics = c.measureText(loadingMessage);
	var loadingMessageWidth = loadingMessageMetrics.width;
	
	c.save();
	c.textAlign = "start";
	c.fillStyle = "white";
	c.font = "40px arial";
	c.shadowColor = "red";
	c.shadowOffsetX = 2;
	c.shadowOffsetY = 2;
	c.shadowBlur = 3;
	c.fillText(loadingMessage, (loadingPaneX + ((loadingPaneWidth / 2.5) - (loadingMessageWidth / 2))), 
																((loadingPaneY + (loadingPaneHeight / 2))));
	c.restore();
	
	
	var x = loadingPaneX + 10;
	var y = loadingPaneY + (loadingPaneHeight - 15);
	var xSpacing = (loadingPaneWidth - 20) / numOfImages;
		
	
	// Loading screen progress bar
	var drawProgressBar = function() {
		
		for (var i = 0; i < numOfImages; i++) {
			c.save();
			c.fillStyle = "red";
			c.strokeStyle = "red";
			c.strokeRect(x, y, xSpacing, 10);
			x += xSpacing;
			c.restore();
		}
	}
	
	
	// Display loading progress bar
	drawProgressBar();
	
	
	x = loadingPaneX + 10;
	
	var updateProgressBar = function() {
	c.save();
		c.fillStyle = "red";
		c.fillRect(x, y, xSpacing, 10);
		x += xSpacing;
	c.restore();
	}
	
	
	
	
	// Update loading progress bar based on (numOfImages - progress)
	Game.printToDebugConsole("Loading images");
	
	
	// Slow down the loading of the images, purely for the graphical effect
	// This will obviously be changed for the larger application :D
	setTimeout(function() {
		Ship.shipImage = new Image();
		Ship.shipImage.onload = updateProgressBar();
		imageLoadProgress += 1;
		Ship.shipImage.src = "images/ships/ship2.png";
	}, 50);	
	setTimeout(function() {
		Ship.ThrusterImage1 = new Image();
		Ship.ThrusterImage1.onload = updateProgressBar();
		imageLoadProgress += 1;
		Ship.ThrusterImage1.src = "images/thrust/thrust2.png";
	}, 100);
	setTimeout(function() {
		Ship.ThrusterImage2 = new Image();
		Ship.ThrusterImage2.onload = updateProgressBar();
		imageLoadProgress += 1;
		Ship.ThrusterImage2.src = "images/thrust/thrust4.png";
	}, 150);	
	setTimeout(function() {
		Ship.ThrusterImage3 = new Image();
		Ship.ThrusterImage3.onload = updateProgressBar();
		imageLoadProgress += 1;
		Ship.ThrusterImage3.src = "images/thrust/thrust3.png";
	}, 200);
	setTimeout(function() {
		Ship.ThrusterImage4 = new Image();
		Ship.ThrusterImage4.onload = updateProgressBar();
		imageLoadProgress += 1;
		Ship.ThrusterImage4.src = "images/thrust/thrust0.png";
	}, 250);
	setTimeout(function() {
		Ship.ThrusterImage5 = new Image();
		Ship.ThrusterImage5.onload = updateProgressBar();
		imageLoadProgress += 1;
		Ship.ThrusterImage5.src = "images/thrust/thrust1.png";
	}, 300);
	setTimeout(function() {
		shipGunImage1 = new Image();
		shipGunImage1.onload = updateProgressBar();
		imageLoadProgress += 1;
		shipGunImage1.src = 'images/guns/gun3.png';
	}, 350);
	setTimeout(function() {
		asteroidImage1 = new Image();
		asteroidImage1.onload = updateProgressBar();
		imageLoadProgress += 1;
		asteroidImage1.src = "images/misc/asteroid1.png";
	}, 400);
	setTimeout(function() {
		asteroidImage2 = new Image();
		asteroidImage2.onload = updateProgressBar();
		imageLoadProgress += 1;
		asteroidImage2.src = "images/misc/asteroid2.png";
	}, 450);	
	setTimeout(function() {
		fuelImage1 = new Image();
		fuelImage1.onload = updateProgressBar();
		imageLoadProgress += 1;
		fuelImage1.src = "images/misc/darkmatter.png";
	}, 500);
	setTimeout(function() {
		fuelImage2 = new Image();
		fuelImage2.onload = updateProgressBar();
		imageLoadProgress += 1;
		fuelImage2.src = "images/misc/darkmatter2.png";
	}, 550);
	setTimeout(function() {
		planetImage1 = new Image();
		planetImage1.onload = updateProgressBar();
		imageLoadProgress += 1;
		planetImage1.src = "images/planets/planet1.png";
	}, 600);
	setTimeout(function() {
		planetImage2 = new Image();
		planetImage2.onload = updateProgressBar();
		imageLoadProgress += 1;
		planetImage2.src = "images/planets/planet2.png";
	}, 650);
	setTimeout(function() {
		planetImage3 = new Image();
		planetImage3.onload = updateProgressBar();
		imageLoadProgress += 1;
		planetImage3.src = "images/planets/planet3.png";
	}, 700);
	setTimeout(function() {
		planetImage4 = new Image();
		planetImage4.onload = updateProgressBar();
		imageLoadProgress += 1;
		planetImage4.src = "images/planets/planet4.png";
	}, 750);
	setTimeout(function() {
		planetImage5 = new Image();
		planetImage5.onload = updateProgressBar();
		imageLoadProgress += 1;
		planetImage5.src = "images/planets/planet5.png";
	}, 800);
	setTimeout(function() {
		planetImage6 = new Image();
		planetImage6.onload = updateProgressBar();
		imageLoadProgress += 1;
		planetImage6.src = "images/planets/planet6.png";
	}, 850);
	setTimeout(function() {
		planetImage7 = new Image();
		planetImage7.onload = updateProgressBar();
		imageLoadProgress += 1;
		planetImage7.src = "images/planets/planet7.png";
	}, 900);
	setTimeout(function() {
		planetImage8 = new Image();
		planetImage8.onload = updateProgressBar();
		imageLoadProgress += 1;
		planetImage8.src = "images/planets/planet8.png";
	}, 950);
	setTimeout(function() {
		sunImage2 = new Image();
		sunImage2.onload = updateProgressBar();
		imageLoadProgress += 1;
		sunImage2.src = "images/suns/sun2.png";
	}, 1000);
	setTimeout(function() {
		bg0 = new Image();
		bg0.onload = updateProgressBar();
		imageLoadProgress += 1;
		bg0.src = "images/backgrounds/starsmicro.jpg";
	}, 1050);
	setTimeout(function() {
		bg1 = new Image();
		bg1.onload = updateProgressBar();
		imageLoadProgress += 1;
		bg1.src = "images/backgrounds/starstiny.jpg";
	}, 1100);
	setTimeout(function() {
		bg2 = new Image();
		bg2.onload = updateProgressBar();
		imageLoadProgress += 1;
		bg2.src = "images/backgrounds/starssmall.jpg";
	}, 1150);
	setTimeout(function() {
		bg3 = new Image();
		bg3.onload = updateProgressBar();
		imageLoadProgress += 1;
		bg3.src = "images/backgrounds/starsnormal.jpg";
	}, 1200);
	setTimeout(function() {
		bg4 = new Image();
		bg4.onload = updateProgressBar();
		imageLoadProgress += 1;
		bg4.src = "images/backgrounds/starsmed.jpg";
	}, 1250);
	setTimeout(function() {
		bg5 = new Image();
		bg5.onload = updateProgressBar();
		imageLoadProgress += 1;
		bg5.src = "images/backgrounds/starsbig.jpg";
	}, 1300);
	setTimeout(function() {
		bg6 = new Image();
		bg6.onload = updateProgressBar();
		imageLoadProgress += 1;
		bg6.src = "images/backgrounds/starshuge.jpg";
	}, 1350);
	setTimeout(function() {
		scrapMetalImage = new Image();
		scrapMetalImage.onload = updateProgressBar();
		imageLoadProgress += 1;
		scrapMetalImage.src = "images/misc/scrapmetal.png";
	}, 1400);
	setTimeout(function() {
		dryGoodsImage = new Image();
		dryGoodsImage.onload = updateProgressBar();
		imageLoadProgress += 1;
		dryGoodsImage.src = "images/misc/crate.png";
	}, 1450);
	setTimeout(function() {
		goldBarsImage = new Image();
		goldBarsImage.onload = updateProgressBar();
		imageLoadProgress += 1;
		goldBarsImage.src = "images/misc/gold.png";
	}, 1500);
	setTimeout(function() {
		platinumBarsImage = new Image();
		platinumBarsImage.onload = updateProgressBar();
		imageLoadProgress += 1;
		platinumBarsImage.src = "images/misc/platinum.png";
	}, 1550);
	setTimeout(function() {
		standardVagabondImage = new Image();
		standardVagabondImage.onload = updateProgressBar();
		imageLoadProgress += 1;
		standardVagabondImage.src = "images/ships/enemyship1.png";
	}, 1600);
	setTimeout(function() {
		tinyFighterImage = new Image();
		tinyFighterImage.onload = updateProgressBar();
		imageLoadProgress += 1;
		tinyFighterImage.src = "images/ships/enemyship2.png";
	}, 1650);
	setTimeout(function() {
		bigGunsShipImage = new Image();
		bigGunsShipImage.onload = updateProgressBar();
		imageLoadProgress += 1;
		bigGunsShipImage.src = "images/ships/enemyship3.png";
	}, 1700);
	setTimeout(function() {
		stealthShipImage = new Image();
		stealthShipImage.onload = updateProgressBar();
		imageLoadProgress += 1;
		stealthShipImage.src = "images/ships/enemyship4.png";
	}, 1750);
	setTimeout(function() {
		behemothShipImage = new Image();
		behemothShipImage.onload = updateProgressBar();
		imageLoadProgress += 1;
		behemothShipImage.src = "images/ships/enemyship5.png";
	}, 1800);	
		setTimeout(function() {
		fighterSquadronImage = new Image();
		fighterSquadronImage.onload = updateProgressBar();
		imageLoadProgress += 1;
		fighterSquadronImage.src = "images/ships/fightership1.png";
	}, 1850);
	setTimeout(function() {
		cargoShipImage = new Image();
		cargoShipImage.onload = updateProgressBar();
		imageLoadProgress += 1;
		cargoShipImage.src = "images/ships/cargoship1.png";
	}, 1900);
	setTimeout(function() {
		falconShipImage = new Image();
		falconShipImage.onload = updateProgressBar();
		imageLoadProgress += 1;
		falconShipImage.src = "images/ships/enemyship6.png";
	}, 1950);
	setTimeout(function() {
		frigateShipImage = new Image();
		frigateShipImage.onload = updateProgressBar();
		imageLoadProgress += 1;
		frigateShipImage.src = "images/ships/enemyship7.png";
	}, 2000);
	setTimeout(function() {
		corvetteShipImage = new Image();
		corvetteShipImage.onload = updateProgressBar();
		imageLoadProgress += 1;
		corvetteShipImage.src = "images/ships/enemyship8.png";
	}, 2050);

	setTimeout(function() {
		for(var i = 0; i < 12; i++) {var initialSolarSystem = new SolarSystem();}		
	}, 2150);




	Game.paused = false;
	// Call the game to run, after finished loading
	setTimeout(function() {
		Game.run();
	}, 1950);

	newAst = [];
	newAst = [0];
	var initialAsteroid1 = new Asteroid(newAst);
	var initialAsteroid2 = new Asteroid(newAst);
	var initialAsteroid3 = new Asteroid(newAst);
	var initialAsteroid4 = new Asteroid(newAst);
	newAst = [1];
	var initialAsteroid5 = new Asteroid(newAst);
	var initialAsteroid6 = new Asteroid(newAst);
	var initialAsteroid7 = new Asteroid(newAst);

	// setTimeout(function() {
	// 	for(var i = 0; i < 30; i++) { var tempPlanet = new Planet();}
	// }, 1000);
	
	Game.mode = 'play';

}



Game.zoomLevelStore = 3;

Game.togglePause = function(){
	if(Game.paused==true){Game.paused=false;}
	if(Game.paused==false){Game.paused=true;}
}

Game.toggleMap = function(){
	if(Game.mode=='map'){
		gameMap.changeZoomLevel('to', 3);
	}
	else if(Game.mode=='play'){
		Game.zoomLevelStore = gameMap.zoomLevel;
		gameMap.changeZoomLevel('to', 7);
	}
}



// Print to Debug
Game.printToDebugConsole = function(message){	
	console.log(message);
}



// Clear canvas
function clearCanvas() {
	canvasElement.width = canvasElement.width;
}



// Methods reside in ship.js
Game.movePlayerShip = function(direction) {
	Ship.move(direction);
} 
Game.stopMovePlayerShip = function(direction) {
	Ship.stopMove(direction);
}



// Sound playing
Game.playThrust = function(){	
	if (toggleSound) {	
		thrust.play();
	}
}
Game.playPewPewPew = function(){	
	if (toggleSound) {		
		if(pewN==1) {pew1.play();}
		if(pewN==2) {pew2.play();}
		if(pewN==3) {pew3.play();}		
		pewN += 1;
		if(pewN == 4) { pewN = 1;}		
	}
}


// Methods reside in munitions.js
Game.firePlayerShipLaserPulse = function(munitionsType) {	
	
	if (munitionsType == 0) {		
		if (Ship.gunTurret == 0) {
			Ship.gunTurret = 1;
			fireShipLaserPulse("RedLaser", Ship.X, Ship.Y, Ship.Direction, "Player Ship", Ship.Momentum, Ship.gunTurret);
		}
		else {
			Ship.gunTurret = 0;
			fireShipLaserPulse("RedLaser", Ship.X, Ship.Y, Ship.Direction, "Player Ship", Ship.Momentum, Ship.gunTurret);
		}		
	}
	
	else if (munitionsType == 1) {
		fireShipLaserPulse("BlueLaser", Ship.X, Ship.Y, Ship.Direction, "Player Ship", Ship.Momentum, 2);
	}
	
	else if (munitionsType == 2) {
		if (Ship.gunTurret == 0) {
			Ship.gunTurret = 1;
			fireShipLaserPulse("GreenLaser", Ship.X, Ship.Y, Ship.Direction, "Player Ship", Ship.Momentum, Ship.gunTurret);
		}
		else {
			Ship.gunTurret = 0;
			fireShipLaserPulse("GreenLaser", Ship.X, Ship.Y, Ship.Direction, "Player Ship", Ship.Momentum, Ship.gunTurret);
		}		
	}
	Game.playPewPewPew();	
}


// The Core Game Arrays
Game.solarsystems = new Array();
Game.enemyShips = new Array();
Game.asteroids = new Array();
Game.planets = new Array();
Game.resources = new Array();
Game.collectedResources = new Array();



// Some Ammo Vars
var lastRedLaserFireDate = new Date();
var lastRedLaserFireTime = lastRedLaserFireDate.getTime();
var lastBlueLaserFireDate = new Date();
var lastBlueLaserFireTime = lastBlueLaserFireDate.getTime();
var lastGreenLaserFireDate = new Date();
var lastGreenLaserFireTime = lastGreenLaserFireDate.getTime();

Game.playerFiringMunitions = false;
Game.playerMunitionsType = 0;





function fireNewMunitions() {
	if (Game.playerFiringMunitions) {	
		if (Game.playerMunitionsType == 0){
			var newRedLaserFireDate = new Date();
			var newRedLaserFireTime = newRedLaserFireDate.getTime();
			if (Math.abs(newRedLaserFireTime - lastRedLaserFireTime) > 100) {
				Game.firePlayerShipLaserPulse(Game.playerMunitionsType);
				lastRedLaserFireTime = newRedLaserFireTime;
			}
		}
		else if (Game.playerMunitionsType == 1){
			var newBlueLaserFireDate = new Date();
			var newBlueLaserFireTime = newBlueLaserFireDate.getTime();
			if (Math.abs(newBlueLaserFireTime - lastBlueLaserFireTime) > 1000) {
				Game.firePlayerShipLaserPulse(Game.playerMunitionsType);
				lastBlueLaserFireTime = newBlueLaserFireTime;
			}
		}
		else if (Game.playerMunitionsType == 2){
			var newGreenLaserFireDate = new Date();
			var newGreenLaserFireTime = newGreenLaserFireDate.getTime();
			if (Math.abs(newGreenLaserFireTime - lastGreenLaserFireTime) > 800) {
				Game.firePlayerShipLaserPulse(Game.playerMunitionsType);
				lastGreenLaserFireTime = newGreenLaserFireTime;
			}
		}		
	}	
}

Game.playerCollectedResource = function(resource) {
		
	switch (resource.type) {
	
	case "Scrap Metal":			if (typeof Game.collectedResources[0] == "undefined") {
									Game.collectedResources[0] = resource;
								}
								else { Game.collectedResources[0].amount += resource.amount; }
								break;
	case "Platinum Bars":		if (typeof Game.collectedResources[1] == "undefined") {
									Game.collectedResources[1] = resource;
								}
								else { Game.collectedResources[1].amount += resource.amount; }
								break;
	case "Gold Bars":			if (typeof Game.collectedResources[2] == "undefined") {
									Game.collectedResources[2] = resource;
								}
								else { Game.collectedResources[2].amount += resource.amount; }
								break;
	case "Commercial Goods":	if (typeof Game.collectedResources[3] == "undefined") {
									Game.collectedResources[3] = resource;
								}
								else { Game.collectedResources[3].amount += resource.amount; }
								break;
	}

}


Game.generateEnemyShipResources = function(ship) {

	switch (ship.type) {
	
	case "Standard Vagabond": 		var scrapMetal = new Resource("Scrap Metal", 200, ship.x, ship.y, scrapMetalImage);
									Game.resources.push(scrapMetal);
									break;
	case "Platinum Cargo Ship":		var platinum = new Resource("Platinum Bars", 50, ship.x, ship.y, platinumBarsImage);
									Game.resources.push(platinum);
									break;
	case "Gold Cargo Ship":			var gold = new Resource("Gold Bars", 100, ship.x, ship.y, goldBarsImage);
									Game.resources.push(gold);
									break;
	case "Commercial Cargo Ship":	var commercial = new Resource("Commercial Goods", 1000, ship.x, ship.y, dryGoodsImage);
									Game.resources.push(commercial);
									break;
	case "Behemoth Battleship":		var scrapMetal = new Resource("Scrap Metal", 1000, ship.x, ship.y, scrapMetalImage);
									Game.resources.push(scrapMetal);
									break;
	default:						var scrapMetal = new Resource("Scrap Metal", 50, ship.x, ship.y, scrapMetalImage);
									Game.resources.push(scrapMetal);
									break;
	}
}



// Paint - GAMELOOP
Game.paint = function() {

	if(Game.mode=='play'){
		clearCanvas();
		paintBackground();		
		paintSolarSystems();	
		paintPlanets();	
		paintDeployedMunitions();
		paintAsteroids2();
		Ship.paint();
		paintEnemyShips();
		paintFuel();
		paintResources();
		paintInventory();
		paintFuelGuage();
		paintShieldLevel();
		paintHitPointsLevel();
	}
	else if(Game.mode=='map') {
		clearCanvas();
		paintBackground();
		paintSolarSystems();	
		paintPlanets();	
		Ship.paint();	
	}
	else if (Game.mode == 'Player Ship Destroyed') {
	
		// Not sure?
	
	}

	if(toggleDebug){
		c.save();
		c.font="12px Verdana";
		var pcount = "P:" + Game.planets.length;
		var xandydisplay = "X: " + Math.round(Ship.X) + " Y:" + Math.round(Ship.Y);
		var astpaint = "Asteroids Painted: " + AsteroidsPainted;
		var planpaint = "Planets Painted: " + PlanetsPainted;
		c.fillStyle = "white";
		c.fillText(pcount, 10, 50);
		c.translate(0, 20);
		c.fillText(xandydisplay, 10, 50);
		c.translate(0, 20);
		c.fillText(astpaint, 10, 50);
		c.translate(0, 20);
		c.fillText(planpaint, 10, 50);
		c.translate(0, 20);
		c.fillText(cycleTime, 10, 50);
		c.restore();
	}
	
	if (togglePerformance) {		
		
		if (Game.mode ==  "map") {
			var cyclePercentage = ((cycleTime / (1000/fps)) * 100);	
			c.save();
			c.font="12px Verdana";
			c.fillStyle = "white";
			c.translate(0, 20);
			c.fillText("Percentage cycle time %: " + cyclePercentage.toFixed(0), 10, 350);
			c.restore();	
		}
		else {
			var cyclePercentage = ((cycleTime / (1000/fps)) * 100);	
			var astColPercentage = ((asteroidCollisionTime / (1000/fps)) * 100);	
			var shipColPercentage = ((shipCollisionTime / (1000/fps)) * 100);
			var astPaintPercentage = ((asteroidPaintTime / (1000/fps)) * 100);	
			var bgPaintPercentage = ((bgPaintTime / (1000/fps)) * 100);
			var munitionsPaintPercentage = ((munitionsPaintTime / (1000/fps)) * 100);
			var munitionsUpdatePercentage = ((munitionsUpdateTime / (1000/fps)) * 100);	
			
			c.save();
			c.font="12px Verdana";
			c.fillStyle = "white";
			c.translate(0, 20);
			c.fillText("Percentage cycle time %: " + cyclePercentage.toFixed(0), 10, 350);
			c.translate(0, 20);
			c.fillText("Background Paint time %: " + bgPaintPercentage.toFixed(0), 10, 350);
			c.translate(0, 20);
			c.fillText("Asteroid Paint time %: " + astPaintPercentage.toFixed(0), 10, 350);
			c.translate(0, 20);
			c.fillText("Asteroid Collision time %: " + astColPercentage.toFixed(0), 10, 350);
			c.translate(0, 20);
			c.fillText("Ship Collision time %: " + shipColPercentage.toFixed(0), 10, 350);
			c.translate(0, 20);
			c.fillText("Number of Asteroids: " + Game.asteroids.length.toFixed(0), 10, 350);
			c.translate(0, 20);
			c.fillText("Munitions Paint time %: " + munitionsPaintPercentage.toFixed(0), 10, 350);
			c.translate(0, 20);
			c.fillText("Munitions Update time %: " + munitionsUpdatePercentage.toFixed(0), 10, 350);
			c.translate(0, 20);
			c.fillText("Enemy Ships: " + this.enemyShips.length, 10, 350);
			c.restore();
		}
	}

}





// Update - GAMELOOP
Game.update = function() {	
	if(Game.mode=='play'){
		Ship.update();
		updateSolarSystems();
		updatePlanets();
		updateEnemyShips();
		updateDeployedMunitions();
		updateAsteroids2();
		updateFuel();
		fireNewMunitions();
		updateResources();

	}
	
	if (Game.mode == 'Player Ship Destroyed') {
	
		Ship.reset();
		fuel = Ship.maxFuel;
		
		gameMap.currentX = 0;
		gameMap.currentY = 0;
		gameMap.changeZoomLevel('to', 3);
		
		deployedMunitions = new Array();
		this.enemyShips = new Array();
		this.collectedResources = new Array();
		this.resources = new Array();
		this.mode = 'play';
	}
}
