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
var boughtUpgrades = [], boughtHamsters = ['h000'];
var cagelevel = 0, foodlevel = 0, drinklevel = 0, islandlevel = 0, hamsterlevel = 0, worldlevel = 0;
var starttime = 0;

	//============================
	//         Functions
	//============================

function startTime() {
	starttime = Date.now();
}

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
						if ( ( hamstercount + Math.floor(amount / divider) ) > hamstercapacity ) {
							amount = Math.floor(amount / divider) - ( ( hamstercount + Math.floor(amount / divider) ) - hamstercapacity );
							hamstercount += amount;
							totalhamstercount += amount;
							clearInterval(repeat);
						} else {
							hamstercount += Math.floor(amount / divider);
							totalhamstercount += Math.floor(amount / divider);
						}
						updateHamsterCount();	
						i++;
					} else {
						if ( ( hamstercount + (amount % divider) ) > hamstercapacity ) {
							amount = (amount % divider) - ( ( hamstercount + (amount % divider) ) - hamstercapacity );
							hamstercount += amount;
							totalhamstercount += amount;
							clearInterval(repeat);
						} else {
							hamstercount += amount % divider;
							totalhamstercount += amount % divider;
							clearInterval(repeat);
						}
						updateHamsterCount();
					}
				}, 1000 / divider);
			} else if ( (amount < divider) && (amount > 0) ) {
				// increase hamstercount smoothly, for amount < divider
				var i = 1;
				hamstercount++;
				totalhamstercount++;
				updateHamsterCount();
				
				var repeat = setInterval( function() {
					if (i < amount) {
						if (hamstercount < hamstercapacity) {
							hamstercount++;
							totalhamstercount++;
							updateHamsterCount();
							i++;
						}
					} else {
						clearInterval(repeat);
					}
				}, Math.floor(1000 / amount) );
			} else {
				if ( (hamstercount + amount) > hamstercapacity) {
					amount -= ( (hamstercount + amount) - hamstercapacity );
					hamstercount += amount;
					clearInterval(repeat);
				} else {
					hamstercount += amount;
				}
				updateHamsterCount();
			}
			addNewUpgradesToShop();
			checkForBuyableUpgrades();
		}
	}
}

// Cage Click

document.getElementById("hamster_cage").addEventListener("click", cageClick);

function cageClick(e) {
	addNewUpgradesToShop();
	checkForBuyableUpgrades();
	increaseHamsters(hamstersperclick);
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
