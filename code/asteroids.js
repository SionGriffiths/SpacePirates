//=============================================
// Asteroids
//=============================================

// Asteroid Vars
var asteroidprevDir;
var asteroidDirection = Math.floor(Math.random()*351);
var asteroidX = 100 + Math.floor(Math.random()*251);
var asteroidY = 250 + Math.floor(Math.random()*201);
var asteroidScale = 50 + Math.floor(Math.random()*41);
var asteroidSpeed = (1+Math.floor(Math.random()*4))/15;


  
// Paint the Asteroid
function paintAsteroid() {

	c.save();
	c.translate(asteroidX, asteroidY);
	c.translate(asteroidScale, asteroidScale);
	c.rotate(asteroidDirection * TO_RADIANS);
	c.drawImage(asteroidImage1, -asteroidScale, -asteroidScale, asteroidScale, asteroidScale);
	c.restore();
}

function updateAsteroid() {
	
	if (asteroidX <= (1 - asteroidScale)) {
		asteroidprevDir = "right";
		asteroidX = canvasWidth;
	} else if (asteroidX >= canvasWidth) {
		
		asteroidprevDir = "left";
		asteroidX = 1;
	} else if (asteroidY <= (1 - asteroidScale)) {

		asteroidprevDir = "up";
		asteroidY = canvasHeight;
	} else if (asteroidY >= canvasHeight) {
		
		asteroidprevDir = "down";
		asteroidY = 1;
	}

	asteroidX = asteroidX + asteroidSpeed * Math.cos(asteroidDirection * TO_RADIANS);
	asteroidY = asteroidY + asteroidSpeed * Math.sin(asteroidDirection * TO_RADIANS);
	//asteroidDirection += 0.1;
	//asteroidScale += 0.02;
}
