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
	bpsD = new Date();
	bgPaintStart = bpsD.getTime();
	// Paint the background image
	var strSz = 1.75;
	switch(gameMap.zoomLevel){
		case 1: bg = bg0; strSz = 3.40; break;
		case 2: bg = bg1; strSz = 3.10; break;
		case 3: bg = bg2; strSz = 2.50; break;
		case 4: bg = bg3; strSz = 2.30; break;
		case 5: bg = bg4; strSz = 2.20; break;
		case 6: bg = bg5; strSz = 2.00; break;
		case 7: bg = bg6; break;
	}	
	c.save();
	c.drawImage(bg, 0, 0,canvasE.width, canvasE.height);
	c.restore();
	
	if(Game.mode=='play'){
		updateStarPositions();
	
				
		for (var i = 0; i < backgroundStars.length; i++){
			c.save();
			c.globalAlpha=0.25+(50/backgroundStars[i][2]);
			// c.fillStyle = backgroundStars[i][3];
			// c.font = backgroundStars[i][2]*z + "px arial";
			// c.shadowColor = "white";
			// c.shadowBlur = backgroundStars[i][2] / 10;
			// c.fillText(star, backgroundStars[i][0]*z, backgroundStars[i][1]*z);
			c.shadowColor=backgroundStars[i][3];
  			c.shadowBlur = 2*z; 
			c.strokeStyle = backgroundStars[i][3];
			//c.lineWidth = (backgroundStars[i][2]/14)*z;
			c.lineWidth = strSz;
			c.beginPath();
			c.moveTo(backgroundStars[i][4], backgroundStars[i][5]);
			c.lineTo(backgroundStars[i][0]+(1*z), backgroundStars[i][1]+(1*z));
			c.stroke();
			c.globalAlpha=0.8
			c.restore();

		}
		
	}



	
	bpfD = new Date();
	bgPaintFinish = bpfD.getTime();
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
	
	numOfStars = 100;

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
		starData.push(starDataX+2);
		starData.push(starDataY+2);
		
		backgroundStars.push(starData);
		previousMaps.push(backgroundStars);
		
	}		
	//Game.printToDebugConsole(numOfStars + " stars created");	
}

function updateStarPositions(){
	// If the ship moves, move the stars very very slightly,
	// with the largest (closest) ones moving more.
	
	
	for (var i = 0; i < backgroundStars.length; i++) {

		backgroundStars[i][4] = backgroundStars[i][0];
		backgroundStars[i][5] = backgroundStars[i][1];

		if (gameMap.boundaryShift) {

	

		var movementX = ((backgroundStars[i][2] / 60)*z) * Math.cos((Ship.Direction-90) * TO_RADIANS);
		var movementY = ((backgroundStars[i][2] / 60)*z) * Math.sin((Ship.Direction+90) * TO_RADIANS);

		
		

		

		switch (gameMap.boundaryShiftDirectionX) {
		
		case "Left": 	backgroundStars[i][0] += ((backgroundStars[i][2] / 20)*z) * Math.cos((Ship.Direction+90) * TO_RADIANS);
						if ((backgroundStars[i][0] + 2) > canvasWidth) {
							backgroundStars[i][0] = -2;
							backgroundStars[i][1] = Math.floor(Math.random() * canvasHeight);
							backgroundStars[i][4] = backgroundStars[i][0]-1;
							backgroundStars[i][5] = backgroundStars[i][1]-1;
						}
						break;
						
		case "Right":	backgroundStars[i][0] -= ((backgroundStars[i][2] / 20)*z) * Math.cos((Ship.Direction-90) * TO_RADIANS);
						if ((backgroundStars[i][0] - 2) < -2) {
							backgroundStars[i][0] = canvasWidth + 2;
							backgroundStars[i][1] = Math.floor(Math.random() * canvasHeight);
							backgroundStars[i][4] = backgroundStars[i][0]-1;
							backgroundStars[i][5] = backgroundStars[i][1]-1;
						}
						break;
		}

		switch (gameMap.boundaryShiftDirectionY) {
		
		case "Up":		backgroundStars[i][1] += ((backgroundStars[i][2] / 20)*z) * Math.sin((Ship.Direction+90) * TO_RADIANS);;
						if ((backgroundStars[i][1] + 2) > canvasHeight) {
							backgroundStars[i][1] = -2;
							backgroundStars[i][0] = Math.floor(Math.random() * canvasWidth);
							backgroundStars[i][4] = backgroundStars[i][0]-1;
							backgroundStars[i][5] = backgroundStars[i][1]-1;
						}
						break;
						
		case "Down":	backgroundStars[i][1] -= ((backgroundStars[i][2] / 20)*z) * Math.sin((Ship.Direction-90) * TO_RADIANS);;
						if ((backgroundStars[i][1] - 2) < -2) {
							backgroundStars[i][1] = canvasHeight + 2;
							backgroundStars[i][0] = Math.floor(Math.random() * canvasWidth);
							backgroundStars[i][4] = backgroundStars[i][0]-1;
							backgroundStars[i][5] = backgroundStars[i][1]-1;
						}
						break;
		}
		
		//if ((backgroundStars[i][0] + 
		}	
	
	}
	
	
}

// function addSunFlare(){
	
// 	c.save();
	
// 	// Create gradient
// 	var grd = c.createRadialGradient(gameMap.translateX(-100),gameMap.translateY(-100),5,gameMap.translateX(-100),gameMap.translateY(-100),800);
// 	grd.addColorStop( 0.2, "rgba(247, 209, 84, 1)");
// 	grd.addColorStop( 0.4, "rgba(240, 193, 38, 0.4)"); 
// 	grd.addColorStop( 0.8, "transparent");

// 	// Fill with gradient
// 	c.fillStyle=grd;
// 	c.fillRect(gameMap.translateX(-800),gameMap.translateY(-800), 2000, 2000);
// 	c.restore();
// }
