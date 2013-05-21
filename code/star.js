

function Star(params) {

this.x = params[0];
this.y = params[1];

this.size = params[2];
this.colour = getStarColour(params[3]);



}


function getStarColour(choice) {
	
	var selectedColour = "255,255,0";

	switch (choice) {
	
		case 0:	selectedColour = "255,255,0";
				break;
		case 1:	selectedColour = "191,120,6";
				break;
		case 2:	selectedColour = "245,221,184";
				break;
		case 3:	selectedColour = "111,190,191";
				break;
		case 4:	selectedColour = "23,35,207";
				break;
		case 5:	selectedColour = "252,257,251";
				break;
		case 6:	selectedColour = "37,196,37";
				break;
		case 7:	selectedColour = "194,21,21";
				break;
		case 8:	selectedColour = "131,176,53";
				break;
		case 9:	selectedColour = "214,217,210";
				break;
	}
	
	return selectedColour;
}