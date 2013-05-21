// ------------------------------
// Solar Systems
// ------------------------------


function SolarSystem() {


	this.xandy = getNewSolarSystemPosition();
	this.x = this.xandy[0];
	this.y = this.xandy[1];
	this.Scale = 4000;
	this.Size = this.Scale / 2;
	this.InnerPlanetCount = 2+(1+Math.round(Math.random()*4));
	this.OuterPlanetCount = 2+(1+Math.round(Math.random()*6));
	this.AsteroidsCount = 10+(1+Math.round(Math.random()*50));
	this.colour = getStarColour(Math.floor(Math.random()*10));
	
	this.InnerPlanets = Array();
	this.InnerPlanetCoords = getCirclePoints(this.x,this.y,this.Size/2.5,this.InnerPlanetCount);
	for(var i = 1; i < this.InnerPlanetCount; i++){
		var planetVars = Array('random',this.InnerPlanetCoords[i-1].x,this.InnerPlanetCoords[i-1].y,200);
		this.InnerPlanets[i] = new Planet(planetVars);
	}
	this.OuterPlanets = Array();
	this.OuterPlanetCoords = getCirclePoints(this.x,this.y,this.Size/1.2,this.OuterPlanetCount);
	for(var i = 1; i < this.OuterPlanetCount; i++){
		var planetVars = Array('random',this.OuterPlanetCoords[i-1].x,this.OuterPlanetCoords[i-1].y,400);
		this.OuterPlanets[i] = new Planet(planetVars);
	}
	this.Asteroids = Array();
	this.AsteroidsCoords = getCirclePoints(this.x,this.y,this.Size/1.9,this.AsteroidsCount);
	for(var i = 1; i < this.AsteroidsCount; i++){
		var AstSize = Math.floor(Math.random()*2);
		var AstOffset = Math.floor(Math.random()*200);
		var asteroidVars = Array(AstSize,this.AsteroidsCoords[i-1].x+AstOffset,this.AsteroidsCoords[i-1].y+AstOffset);
		this.Asteroids[i] = new Asteroid(asteroidVars);
	}


	addSolarSystem(this);



	this.draw = function() {
		c.save();
		
		// Create gradient
		var grd = c.createRadialGradient(gameMap.translateX(this.x),gameMap.translateY(this.y),0,gameMap.translateX(this.x),gameMap.translateY(this.y),this.Size);
		
		
		grd.addColorStop( 0.1, 'rgba('+this.colour+',1)');
		grd.addColorStop( 0.2, 'rgba('+this.colour+',0.5)');
		grd.addColorStop( 0.4, 'rgba('+this.colour+', 0.2)');
		grd.addColorStop( 0.9, 'rgba('+this.colour+', 0.01)');
		grd.addColorStop( 1, "transparent");
		
		
		
		/*
		grd.addColorStop( 0.1, 'rgba('+this.colour+',1)');
		grd.addColorStop( 0.2, 'rgba('+this.colour+',0.7)');
		grd.addColorStop( 0.4, 'rgba('+this.colour+', 0.4)');
		grd.addColorStop( 0.9, 'rgba('+this.colour+', 0.05)');
		grd.addColorStop( 1, "transparent");
		
		*/
		
		
		// Fill with gradient
		c.fillStyle=grd;
		c.fillRect(gameMap.translateX(this.x-this.Size),gameMap.translateY(this.y-this.Size), this.Scale, this.Scale);
		c.drawImage(sunImage2, gameMap.translateX(this.x - (sunImage2.width/2)), gameMap.translateY(this.y - (sunImage2.height/2)), sunImage2.width, sunImage2.height);
		
		
		c.restore();
	}

	this.update = function(){
		
	}


}

// Paint SolarSystems objects, held in an array
function paintSolarSystems(){
	for (var i = 0; i < Game.solarsystems.length; i++) {
		Game.solarsystems[i].draw();
	}
}

// Update SolarSystems objects
function updateSolarSystems() {
	for (var i = 0; i < Game.solarsystems.length; i++) {
		Game.solarsystems[i].update();
	}
}





// Add a SolarSystem to the array
function addSolarSystem(solarsystem){
	Game.solarsystems.push(solarsystem);
}





function getNewSolarSystemPosition() {
	
	var allChecksOK = false;
	var possibleUniverse = 4000;
	var totalTimesTried = 0;
	var timesTried = 0;


	while (!(allChecksOK)){

		var newX = -possibleUniverse + Math.floor(Math.random()*(possibleUniverse*2));
		var newY = -possibleUniverse + Math.floor(Math.random()*(possibleUniverse*2));

		var tooClose = false;
		var theseXYOK = true;

		// var differenceOrigin = liesWithinRadius(
		// 						gameMap.currentX,
		// 						gameMap.currentY,
		// 						newX,
		// 						newY,
		// 						800);
		// if (differenceOrigin) {
		// 	theseXYOK = false;
		// }

		if(theseXYOK==true) {
			for (var i = 0; i < Game.solarsystems.length; i++){
				tooClose = liesWithinRadius(
									Game.solarsystems[i].x,
									Game.solarsystems[i].y,
									newX,
									newY,
									Game.solarsystems[i].Scale*0.9);

				if (tooClose) {
					theseXYOK = false;
				}
			}			
		}

		if(theseXYOK) {
			allChecksOK = true;
		}

		timesTried += 1;
		if(timesTried>1000) {
			possibleUniverse +=1000;
			totalTimesTried += timesTried;
			timesTried = 0;
			//alert('Universe Expanded to ' + possibleUniverse + ' Times Tried ' + totalTimesTried + ' Planet Count ' + Game.planets.length);
		}
	}
	totalTimesTried += timesTried;
	//alert('Planet XY OK - Total Times Tried : ' + totalTimesTried + ' Planet Count ' + Game.planets.length);
	return Array(newX,newY);
}