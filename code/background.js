//=============================================
// Background
//=============================================

// Background vars
var backgroundStars = new Array();
var numOfStars = 80;
var star;
var backgroundStarColours;
var numOfStarColours;

// Background manager
function paintBackground(){
	
	// Paint the background black
	c.save();
	c.fillStyle = "black";
	c.fillRect(0,0,canvasE.width, canvasE.height);
	c.restore();
	

	updateStarPositions();	
	
	for (var i = 0; i < backgroundStars.length; i++){
		c.save();
		c.fillStyle = backgroundStars[i][3];
		c.font = backgroundStars[i][2] + "px arial";
		c.shadowColor = "white";
		c.shadowBlur = backgroundStars[i][2] / 10;
		c.fillText(star, backgroundStars[i][0], backgroundStars[i][1]);
		c.restore();
	}
	
	if (toggleSunEffect) {
		addSunFlare();
	}
}

// Initialize the stars with their random coordinates and size
function initializeBackground(){
	
	backgroundStars = new Array();
	
	star = ".";
	
	backgroundStarColours = new Array();
	backgroundStarColours[0] = "#BF004D";
	backgroundStarColours.push("#B3AF4F");
	backgroundStarColours.push("#B1E39A");
	backgroundStarColours.push("#B0C9FF");
	backgroundStarColours.push("#FFE226");
	backgroundStarColours.push("#FAF682");
	backgroundStarColours.push("#D9D9D9");
	backgroundStarColours.push("#C4C4C2");
	backgroundStarColours.push("#FFDEDE");
	backgroundStarColours.push("#DEFFFD");
	backgroundStarColours.push("#CAC5E6");
	backgroundStarColours.push("#FFC400");
	backgroundStarColours.push("#FFFFFF");
	backgroundStarColours.push("#FFFFFF");
	numOfStarColours = backgroundStarColours.length;
	
	for (var i = 0; i < numOfStars; i++){

		var starData = new Array();
		var starDataX = Math.floor(Math.random()*canvasE.width);
		var starDataY = Math.floor(Math.random()*canvasE.height);
		var starDataSize = Math.floor(Math.random() * 30);
		var starDataColour = backgroundStarColours[Math.floor(Math.random()*(numOfStarColours + 1))];

		starData.push(starDataX);
		starData.push(starDataY);
		starData.push(starDataSize);
		starData.push(starDataColour);
		
		backgroundStars.push(starData);
		previousMaps.push(backgroundStars);
		
	}		
	Game.printToDebugConsole(numOfStars + " stars created");	
}

function updateStarPositions(){
	// If the ship moves, move the stars very very slightly,
	// with the largest (closest) ones moving more.
	if (gameMap.boundaryShift) {
	
		for (var i = 0; i < backgroundStars.length; i++) {
			
			var movement = backgroundStars[i][2] / 45;
			
			switch (gameMap.boundaryShiftDirectionX) {
			
			case "Left": 	backgroundStars[i][0] += movement;
							if ((backgroundStars[i][0] + 2) > canvasWidth) {
								backgroundStars[i][0] = -2;
								backgroundStars[i][1] = Math.floor(Math.random() * canvasHeight);
							}
							break;
							
			case "Right":	backgroundStars[i][0] -= movement;
							if ((backgroundStars[i][0] - 2) < -2) {
								backgroundStars[i][0] = canvasWidth + 2;
								backgroundStars[i][1] = Math.floor(Math.random() * canvasHeight);
							}
							break;
			}

			switch (gameMap.boundaryShiftDirectionY) {
			
			case "Up":		backgroundStars[i][1] += movement;
							if ((backgroundStars[i][1] + 2) > canvasHeight) {
								backgroundStars[i][1] = -2;
								backgroundStars[i][0] = Math.floor(Math.random() * canvasWidth);
							}
							break;
							
			case "Down":	backgroundStars[i][1] -= movement;
							if ((backgroundStars[i][1] - 2) < -2) {
								backgroundStars[i][1] = canvasHeight + 2;
								backgroundStars[i][0] = Math.floor(Math.random() * canvasWidth);
							}
							break;
			}
			
			//if ((backgroundStars[i][0] + 
			
		
		}
	}
	
}

function addSunFlare(){
	
	c.save();
	
	// Create gradient
	var grd = c.createRadialGradient(gameMap.translateX(-100),gameMap.translateY(-100),5,gameMap.translateX(-100),gameMap.translateY(-100),800);
	grd.addColorStop( 0.2, "rgba(247, 209, 84, 1)");
	grd.addColorStop( 0.4, "rgba(240, 193, 38, 0.4)"); 
	grd.addColorStop( 0.8, "transparent");

	// Fill with gradient
	c.fillStyle=grd;
	c.fillRect(gameMap.translateX(-800),gameMap.translateY(-800), 2000, 2000);
	c.restore();
}
