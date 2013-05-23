// ---------------------------------------
// Planets (Yo!)
// ---------------------------------------

var planetImage1;
var planetImage2;
var planetImage3;
var planetImage4;
var planetImage5;
var planetImage6;
var planetImage7;
var planetImage8;

var planetImages = new Array();

function Planet(paras) {

// if(typeof paras[1] == 'undefined'){
// 	this.PlanetType = Math.floor(Math.random()*8);
// } else {
// 	if(paras[1]=='random'){
// 		this.PlanetType = Math.floor(Math.random()*8);
// 	} else {
// 		this.PlanetType = paras[1];
// 	}	
// }
this.PlanetType = Math.floor(Math.random()*8);
this.image;
this.image = choosePlanetTypeImage(this.PlanetType);


	// this.xandy = getNewPlanetPosition();
	// this.x = this.xandy[0];
	// this.y = this.xandy[1];

	this.x = paras[2];
	this.y = paras[3];

var SSNo = paras[0];
this.SolarSystemNumber = SSNo;

this.ScaleRandom = (1+Math.floor(Math.random()*paras[4]));
this.Scale = 200 + this.ScaleRandom;
if(this.random % 8 == 0) {this.Scale = this.Scale * 0.7;}
if(this.random % 20 == 0) {this.Scale = this.Scale * 2.0;} 
if(this.Scale < 100) {this.Scale = 100;}


if(this.Scale > paras[4]) {this.Scale = paras[4] + (this.Scale/4);}


this.Size = this.Scale / 2;
this.Spin = 0.01;
this.SpinSpeed = 0.35;

this.massFactor = this.Scale / 1000;

if(this.Size > 50) { this.orbitStroid = new Asteroid(Array(0,(this.x+this.Scale),this.y+this.Size)); }
if(this.Size > 200) { 
	this.orbitStroid = new Asteroid(Array(1,(this.x-this.Size),this.y-this.Size));
	this.orbitStroid = new Asteroid(Array(1,(this.x+this.Scale),this.y+this.Size));
	this.orbitStroid = new Asteroid(Array(0,(this.x+this.Size),this.y+this.Scale));
	this.massFactor = this.Scale / 300;
}


this.OrbitPosition = paras[6]; 
this.OrbitDistance = paras[5];
this.OrbitSpeed = 0.01 + (Math.floor(Math.random()*(this.Scale/100))/100);
this.plot = new Object();

addPlanet(this);


this.draw = function() {
	c.save();
	c.translate(gameMap.translateX(this.x), gameMap.translateY(this.y));
	c.rotate(this.Spin * TO_RADIANS);

	c.drawImage(this.image, -this.Size*z, -this.Size*z, this.Scale*z, this.Scale*z);	
	if(toggleDebug==true) {
		c.fillStyle="blue";
		c.fillRect(-5,-5,10,10);
		c.beginPath();
		c.strokeStyle = 'blue';
		c.arc(0,0,this.Size*z,0,2*Math.PI);		
		c.stroke();
		c.moveTo(0,0);
		c.lineTo(0,this.OrbitDistance*z);
		c.stroke();	
	}
	c.restore();
}

this.update = function(){
	//this.Spin += this.SpinSpeed;
	this.OrbitPosition += this.OrbitSpeed;
	this.Spin = 90 - findAngleBetweenTwoPoints(this.x, this.y, Game.solarsystems[this.SolarSystemNumber].x, Game.solarsystems[this.SolarSystemNumber].y);
	if(this.Spin<0){this.Spin+=360;}
	var OrbitData = Array(
				Game.solarsystems[this.SolarSystemNumber].x,
				Game.solarsystems[this.SolarSystemNumber].y,
				this.OrbitDistance,
				this.OrbitPosition
				);

	this.plot = getOrbitPlot(OrbitData[0], OrbitData[1], OrbitData[2], OrbitData[3]);
	this.x = this.plot[0];
	this.y = this.plot[1];

	
}


}


// Paint Planets objects, held in an array
function paintPlanets(){

	for (var i = 0; i < Game.planets.length; i++) {
		Game.planets[i].draw();
	}
}

// Update Planets objects
function updatePlanets() {
	for (var i = 0; i < Game.planets.length; i++) {
		Game.planets[i].update();
	}
}

// Add an Planet to the array
function addPlanet(planet){
	Game.planets.push(planet);

}


function choosePlanetTypeImage(planetType) {

	var image = new Image();

	switch (planetType) {
		case 0: image = planetImage1;
				break;
		case 1: image = planetImage2;
				break;
		case 2: image = planetImage3;
				break;
		case 3: image = planetImage4;
				break;
		case 4: image = planetImage5;
				break;
		case 5: image = planetImage6;
				break;
		case 6: image = planetImage7;
				break;
		case 7: image = planetImage8;
				break;
	}

	return image;
}

function getNewPlanetPosition() {
	
	var allChecksOK = false;
	var possibleUniverse = 4000;
	var totalTimesTried = 0;
	var timesTried = 0;


	while (!(allChecksOK)){

		var newX = -possibleUniverse + Math.floor(Math.random()*(possibleUniverse*2));
		var newY = -possibleUniverse + Math.floor(Math.random()*(possibleUniverse*2));

		var tooClose = false;
		var theseXYOK = true;

		var differenceOrigin = liesWithinRadius(
								gameMap.currentX,
								gameMap.currentY,
								newX,
								newY,
								800);
		if (differenceOrigin) {
			theseXYOK = false;
		}

		if(theseXYOK==true) {
			for (var i = 0; i < Game.planets.length; i++){
				tooClose = liesWithinRadius(
									Game.planets[i].x,
									Game.planets[i].y,
									newX,
									newY,
									Game.planets[i].Scale*2.5);


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
