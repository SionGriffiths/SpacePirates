// ------------------------------
// Solar Systems
// ------------------------------


function SolarSystem() {


	this.xandy = getNewSolarSystemPosition();
	this.x = this.xandy[0];
	this.y = this.xandy[1];
	this.Scale = 2000*(2+Math.round(Math.random()*7));
	this.Size = this.Scale / 2;
	this.gSize = this.Scale / 2.2;
	this.colour = getStarColour(Math.floor(Math.random()*10));


	if(Game.solarsystems.length>0) {this.SolarSystemNumber = Game.solarsystems.length;} else {this.SolarSystemNumber = 0;}


	this.PlanetCount = 2+(1+Math.round(Math.random()*8));
	this.AsteroidsCount = 10+(1+Math.round(Math.random()*50));
	this.PlanetOrbit = 1000;

	this.PlanetOrbitStep = (Math.PI*(this.PlanetOrbit*2))/this.PlanetCount;
	this.PlanetOffset = 500;
	this.PlanetSize = 100;


	this.Planets = Array();
	this.PlanetCoords = getCirclePoints(this.x,this.y,this.PlanetOrbit,this.PlanetCount);
	for(var i = 1; i < this.PlanetCount; i++){
		this.PlanetOffset += this.PlanetSize*2.2;
		this.PlanetOrbitStep = (Math.PI*(this.PlanetOrbit*2))/(1+Math.round(Math.random()*11));
		var planetVars = Array(this.SolarSystemNumber,'random',this.PlanetCoords[i-1].x,this.PlanetCoords[i-1].y,this.PlanetSize,this.PlanetOffset,this.PlanetOrbitStep*i);
		this.Planets[i] = new Planet(planetVars);
		if(i>(this.PlanetCount/2)) {
			this.PlanetSize -= (1+Math.floor(Math.random()*200));
		}
		else {
			this.PlanetSize += (1+Math.floor(Math.random()*300));
		}
		
	}
	this.Asteroids = Array();
	this.AsteroidsCoords = getCirclePoints(this.x,this.y,this.Size/0.9,this.AsteroidsCount);
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
		var grd = c.createRadialGradient(gameMap.translateX(this.x),gameMap.translateY(this.y),0,gameMap.translateX(this.x),gameMap.translateY(this.y),this.gSize*z);
		
		
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
		c.fillRect(gameMap.translateX(this.x-this.gSize),gameMap.translateY(this.y-this.gSize), this.Scale*z, this.Scale*z);
		c.drawImage(sunImage2, gameMap.translateX(this.x - (sunImage2.width/2)), gameMap.translateY(this.y - (sunImage2.height/2)), sunImage2.width*z, sunImage2.height*z);
		
		
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
									Game.solarsystems[i].Scale*1.8);

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
	console.log('SolarSystem XY OK - Total Times Tried : ' + totalTimesTried + ' SolarSystem Count ' + Game.solarsystems.length);
	return Array(newX,newY);
}
