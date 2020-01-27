window.onload = function() { 
	updateGame();
};

	//============================
	//         Variables
	//============================

var totalhamstercount = 0, hamstercount = 0;
var hamstersperclick = 1;
var cagedhamsterclicks = 0, rarehamsterclicks = 0;
var basehamsterspersecond = 0;
var hamsterspersecondboost = 1;
var hamsterspersecond = 0;
var hamstercapacity = 10000;
var boughtUpgrades = [], boughtHamsters = [];
var cagelevel = 0, foodlevel = 0, drinklevel = 0, islandlevel = 0, hamsterlevel = 0, worldlevel = 0;
var starttime = 0;

	//============================
	//         Functions
	//============================

function startTime() {
	starttime = Date.now();
}

			var moreThanMax = 0;
function increaseHamsters(amount) {
	if (hamstercount < hamstercapacity) {
		if (amount != 0) {
			// two different functions to increase the count because i'm too dumb for an easy solution
			var divider = 20;
			if (amount > divider) {
				// increase hamstercount smoothly, for amount > divider
				var i = 0;
				var repeat = setInterval(function() {
					if (i < divider) {
						if (moreThanMax == 0) {
							if ( (hamstercount + Math.floor(amount / divider)) >= hamstercapacity) {
								hamstercount += Math.floor(amount / divider);
								moreThanMax = Math.floor(amount / divider) - (hamstercount - hamstercapacity);
								hamstercount = hamstercapacity;
								break;
							} else {
								hamstercount += Math.floor(amount / divider);
							}
						}
						updateHamsterCount();	
						i++;
					} else {
						if (moreThanMax == 0) {
							clearInterval(repeat);
							if ( (hamstercount + (amount % divider)) >= hamstercapacity) {
								hamstercount += amount % divider;
								moreThanMax = (amount % divider) - (hamstercount - hamstercapacity);
								hamstercount = hamstercapacity;
								break;
							} else {
								hamstercount += amount % divider;
							}
						}
						updateHamsterCount();
					}
				}, 1000 / divider);
			} else if ( (amount < divider) && (amount > 0) ) {
				// increase hamstercount smoothly, for amount < divider
				var i = 1;
				hamstercount++;
				updateHamsterCount();
				
				var repeat = setInterval(function() {
					if (i < amount) {
						if (hamstercount < hamstercapacity) {
							hamstercount++;
						}
						i++;
						updateHamsterCount();
					} else {
						clearInterval(repeat);
					}
				}, Math.floor(1000 / amount));
			} else {
				if (moreThanMax == 0) {
					if ( (hamstercount + amount) >= hamstercapacity) {
						hamstercount += amount;
						moreThanMax = amount - (hamstercount - hamstercapacity);
						hamstercount = hamstercapacity;
						break;
					} else {
						hamstercount += amount;
					}
				}
				updateHamsterCount();
			}
			if (amount > 0) {
				// don't change totalhamstercount for purchases
				if (moreThanMax == 0) {
					totalhamstercount += amount;
				} else {
					totalhamstercount += moreThanMax;	
				}
			}
		}
	}
	addNewUpgradesToShop();
	checkForBuyableUpgrades();
}

// Cage Click

document.getElementById("hamster_cage").addEventListener("click", cageClick);

function cageClick(e) {
  increaseHamsters(hamstersperclick);
  addNewUpgradesToShop();
  checkForBuyableUpgrades();
  cagedhamsterclicks++;
	if (hamstercount < hamstercapacity) {
		// create a particle with each click and move it in a random direction
		var particle = new Particle();
		var cagedHamster = document.querySelector("#caged_hamster");
		var hamsterStyle = getComputedStyle(cagedHamster);
		var hamsterHeight = parseFloat(hamsterStyle.height.replace("px", ""));
		var hamsterWidth = parseFloat(hamsterStyle.width.replace("px", ""));
		var hamsterTop = parseFloat(hamsterStyle.top.replace("px", ""));
		var hamsterLeft = parseFloat(hamsterStyle.left.replace("px", ""));
		particle.element.style.cssText = "background-image: url(../pics/hamsters/particle_" + particle.hamsterId + ".png); top: " + (hamsterTop + hamsterHeight / 2 + particle.posY) + "px; left: " + (hamsterLeft + hamsterWidth / 2 + particle.posX) + "px; transform: rotate(" + Math.floor(Math.random() * 361) + "deg);";
		particle.element.className += " animation-fade-out";

		// create a node that displays the clicked hamsters
		var clickedhamsters = new ClickedHamsters(e);
		clickedhamsters.element.className += " animation-fade-upwards";
	}
}

// Hamsters per second

var hamsterspersecond_interval = setInterval(hamstersPerSecond, 1000);

function hamstersPerSecond() {
  increaseHamsters(hamsterspersecond);
  addNewUpgradesToShop();
  checkForBuyableUpgrades();
}

function increaseHPS(amount, type) {
	if (type == "add") {
		basehamsterspersecond += amount;
	} else {
		basehamsterspersecond *= amount;
	}
	updateHPS();
}

function randomGenerator(max) {
	// generate random int from 0 - max
	return Math.floor(Math.random() * max + 1);
}
