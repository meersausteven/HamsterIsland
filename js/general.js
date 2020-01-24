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
var hamstermaximum = 10000;
var boughtUpgrades = [];
var cagelevel = 0, foodlevel = 0, drinklevel = 0, islandlevel = 0, hamsterlevel = 0, worldlevel = 0;
var starttime = 0;

	//============================
	//         Functions
	//============================

function startTime() {
	starttime = Date.now();
}

function increaseHamsters(amount) {
	if (hamstercount < hamstermaximum) {
		var divider = 20;
		if (amount != 0) {
			// two different functions to increase the count because i'm too dumb for an easy solution
			if ( (amount > divider) && (amount > 0) ) {
				// increase hamstercount smoothly, for amount > divider
				var i = 0;
				var repeat = setInterval(function() {
					if (i < divider) {
						hamstercount += Math.floor(amount / divider);
						updateHamsterCount();	
						i++;
					} else {
						clearInterval(repeat);
						hamstercount += amount % divider;
						updateHamsterCount();
					}
				}, 1000 / divider);
			} else {
				// increase hamstercount smoothly, for amount < divider
				var i = 1;
				hamstercount++;
				updateHamsterCount();
				
				var repeat = setInterval(function() {
					if (i < amount) {
						hamstercount++;
						i++;
						updateHamsterCount();
					} else {
						clearInterval(repeat);
					}
				}, Math.floor(1000 / amount));
			}
			if (amount > 0) {
				// don't change totalhamstercount for purchases
				totalhamstercount += amount;
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
	if (hamstercount < hamstermaximum) {
		// create a particle with each click and move it in a random direction
		var particle = new Particle();
		var cagedHamster = document.querySelector("#caged_hamster");
		var hamsterStyle = getComputedStyle(cagedHamster);
		var hamsterHeight = parseFloat(hamsterStyle.height.replace("px", ""));
		var hamsterWidth = parseFloat(hamsterStyle.width.replace("px", ""));
		var hamsterTop = parseFloat(hamsterStyle.top.replace("px", ""));
		var hamsterLeft = parseFloat(hamsterStyle.left.replace("px", ""));
		particle.element.style.cssText = "background-image: url(../pics/hamsters/particle_" + particle.hamstertype + ".png); top: " + (hamsterTop + hamsterHeight / 2 + particle.posY) + "px; left: " + (hamsterLeft + hamsterWidth / 2 + particle.posX) + "px; transform: rotate(" + Math.floor(Math.random() * 361) + "deg);";
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
