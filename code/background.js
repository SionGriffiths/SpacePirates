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
	
	if (toggleSunEffect) {
		addSunFlare();
	}
	
	
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
}

function addSunFlare(){
	
	c.save();
	
	// Create gradient
	var grd = c.createRadialGradient(75,75,5,90,60,1500);
	grd.addColorStop( 0.2, "rgba(250, 209, 84, 0.6)");
	//grd.addColorStop( 0.4, "rgba(240, 193, 38, 0.2)"); 
	grd.addColorStop( 0.8, "transparent");

	// Fill with gradient
	c.fillStyle=grd;
	c.fillRect(0,0,canvasE.width, canvasE.height);
	c.restore();
}
