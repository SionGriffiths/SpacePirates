//--------------
// Resources
//--------------

function Resource(type, amount, x, y, image) {

this.image = new Image();

this.x = x;
this.y = y;
this.size = 100;
this.isCollected = false;
this.collisionRadius = this.size + 30;
this.type = type;
this.amount = amount;
this.image = image;

this.draw = function() {
	c.drawImage(this.image, gameMap.translateX(this.x), gameMap.translateY(this.y), this.size*z, this.size*z);
}

this.setImage = function(image) {
	this.image = image;
}


this.update = function() {

	var collisionOccured = liesWithinRadius(
								Ship.X,
								Ship.Y,
								this.x,
								this.y,
								this.collisionRadius);
	if (collisionOccured) {
		Game.playerCollectedResource(this);
		this.isCollected = true;
	}

}


}

function updateResources() {
	
	
	for (var i = 0; i < Game.resources.length; i++) {
		
			Game.resources[i].update();
			
			if (Game.resources[i].isCollected) {
				Game.resources.splice(i, 1);
			}
		}
}


function paintResources() {

		for (var i = 0; i < Game.resources.length; i++) {
			Game.resources[i].draw();
		}
}
