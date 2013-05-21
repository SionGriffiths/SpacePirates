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

// if(typeof paras[0] == 'undefined'){
// 	this.PlanetType = Math.floor(Math.random()*8);
// } else {
// 	if(paras[0]=='random'){
// 		this.PlanetType = Math.floor(Math.random()*8);
// 	} else {
// 		this.PlanetType = paras[0];
// 	}	
// }
this.PlanetType = Math.floor(Math.random()*8);
this.image;
this.image = choosePlanetTypeImage(this.PlanetType);


	// this.xandy = getNewPlanetPosition();
	// this.x = this.xandy[0];
	// this.y = this.xandy[1];

	this.x = paras[1];
	this.y = paras[2];



this.ScaleRandom = (1+Math.floor(Math.random()*401));
this.Scale = 200 + this.ScaleRandom;
if(this.random % 8 == 0) {this.Scale = this.Scale * 0.7;}
if(this.random % 20 == 0) {this.Scale = this.Scale * 2.0;} 
if(this.Scale < 100) {this.Scale = 100;}

if(this.random % 5 == 0) {
	this.differenceOrigin = liesWithinRadius(
								0,
								0,
								this.x,
								this.y,
								2000);
	if (!this.differenceOrigin) {
		this.Scale = this.Scale * 1.5; 
	}
}
if(this.random % 5 == 0) {
	this.differenceOrigin2 = liesWithinRadius(
								0,
								0,
								this.x,
								this.y,
								6000);
	if (!this.differenceOrigin2) {
		this.Scale = this.Scale * 3; 
	}
}

if(this.Scale > paras[3]) {this.Scale = paras[3];}






this.Size = this.Scale / 2;
this.Spin = 0.01;
this.SpinSpeed = 0.03;

this.massFactor = this.Scale / 1000;

if(this.Size > 50) { this.orbitStroid = new Asteroid(Array(0,(this.x+this.Scale),this.y+this.Size)); }
if(this.Size > 200) { 
	this.orbitStroid = new Asteroid(Array(1,(this.x-this.Size),this.y-this.Size));
	this.orbitStroid = new Asteroid(Array(1,(this.x+this.Scale),this.y+this.Size));
	this.orbitStroid = new Asteroid(Array(0,(this.x+this.Size),this.y+this.Scale));
	this.massFactor = this.Scale / 300;
}



addPlanet(this);


this.draw = function() {
	c.save();
	c.translate(gameMap.translateX(this.x), gameMap.translateY(this.y));
	c.rotate(this.Spin * TO_RADIANS);
	//alert(this.image);
	c.drawImage(this.image, -this.Size, -this.Size, this.Scale, this.Scale);	
	if(toggleDebug==true) {
		c.fillStyle="blue";
		c.fillRect(-5,-5,10,10);
		c.beginPath();
		c.strokeStyle = 'blue';
		c.arc(0,0,this.Size,0,2*Math.PI);		
		c.stroke();
	}
	c.restore();
}

this.update = function(){
	this.Spin += this.SpinSpeed;
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
