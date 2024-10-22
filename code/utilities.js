
//=============================================
// Utility class
//=============================================


/*
Author: Alex

Returns a boolean of whether a point lies within a radius of
another point. Useful for collision detection.
*/
function liesWithinRadius(checkPointX, checkPointY, centerX, centerY, radius) {

	return (Math.pow((checkPointX-centerX),2) + Math.pow((checkPointY-centerY),2) <= Math.pow(radius,2));

}





/*
Author: Alex

Finds the angle in degrees between one set of x and y values and another.
Parameters: originX, originY, targetX, targetY.
Returns: number in DEGREES
*/
function findAngleBetweenTwoPoints(x1, y1, x2, y2) {

	var relativeX = x2 - x1;
	var relativeY = y2 - y1;

	var tangent = Math.atan2(-relativeY, relativeX);

	if (tangent < 0) {
	   tangent += 2 * Math.PI;
	}
	
	return (tangent * TO_DEGREES);
}






/**
 * Author: Juan Mendes
 * Source: http://bit.ly/12s9dlI
 * 
 * Draws a rounded rectangle using the current state of the canvas. 
 * If you omit the last three params, it will draw a rectangle 
 * outline with a 5 pixel border radius 
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate 
 * @param {Number} width The width of the rectangle 
 * @param {Number} height The height of the rectangle
 * @param {Number} radius The corner radius. Defaults to 5;
 * @param {Boolean} fill Whether to fill the rectangle. Defaults to false.
 * @param {Boolean} stroke Whether to stroke the rectangle. Defaults to true.
 */
function drawRoundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == "undefined" ) {
    stroke = true;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (stroke) {
    ctx.stroke();
  }
  if (fill) {
    ctx.fill();
  }
  ctx.restore();
}



function printToDebugConsole(message){
  
  messageLog.push(message);
  
  for (var i = messageLog.length - 1; i > -1; i--){
   messageLogString = messageLogString + "<br  />" + messageLog[i];
  }
  
  document.getElementById("debug").innerHTML = messageLogString;

  messageLogString = " ";
  
  if (messageLog.length >= 15) {
    messageLog.splice(0,1);
  }
}



function DebugToggle(){ 
  if(toggleDebug == false) {
    toggleDebug = true;
    console.log('Debug ON');
  } else if(toggleDebug == true) {
    toggleDebug = false;
    console.log('Debug OFF');
  }
}
 

 

function toggleInstructions() {

	if (instructionsDisplayed) {	
		instructionsDisplayed = false;
		document.getElementById('instructions').style.display = "none";	
	}

}

function getCirclePoints(centerX,centerY,radius,segments){
  var totalPoints = new Array(); 
  for(var i=0; i<segments; i++){
    cx = centerX+radius*Math.sin(i*2*Math.PI/segments);
    cy = centerY+radius*Math.cos(i*2*Math.PI/segments);
    totalPoints.push({'x':cx,'y':cy});
  }
 // alert(totalPoints);
  return totalPoints;
}

function getOrbitPlot(acenterX,centerY,radius,distance){
    var newPoints = new Array();
    x = acenterX+radius*Math.sin(distance*2*Math.PI/1000);
    y =centerY+radius*Math.cos(distance*2*Math.PI/1000);

    //alert(acenterX);

    newPoints[0] = x;
    newPoints[1] = y;

    //alert(newPoints);
  return newPoints;
}











var lastZoomLevelChangeDate = new Date();
var lastZoomChangeTime = lastZoomLevelChangeDate.getTime();

/** This is high-level function.
 * It must react to delta being more/less than zero.
 */
function handle(delta) {
        
        var newZoomLevelChangeDate = new Date();
        var newZoomLevelChangeTime = newZoomLevelChangeDate.getTime();

        if (newZoomLevelChangeTime - lastZoomChangeTime > 40) {
          if (delta < 0) {
            gameMap.changeZoomLevel('up',1);
          }
          else {
             gameMap.changeZoomLevel('down',1);
          }
          lastZoomChangeTime = newZoomLevelChangeTime;
      }

}

function wheel(event){
        var delta = 0;
        if (!event) /* For IE. */
                event = window.event;
        if (event.wheelDelta) { /* IE/Opera. */
                delta = event.wheelDelta/500;
        } else if (event.detail) { 
                delta = -event.detail/3;
        }
        if (delta)
                handle(delta);
        if (event.preventDefault)
                event.preventDefault();
  event.returnValue = false;
}
if (window.addEventListener)
window.addEventListener('DOMMouseScroll', wheel, false);
window.onmousewheel = document.onmousewheel = wheel;









