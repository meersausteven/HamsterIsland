window.onload = function() {
	getProgress();
	updateStats();
	startTime();
	updateCageLevel();
	updateIslandLevel();
	updateHamsterLevel();
	updateWorldLevel();
	updateDrinkLevel();
	updateFoodLevel();
	updateHPS();
}

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
var cagelevel = 0, foodlevel = 0, drinklevel = 0, islandlevel = 0, hamsterlevel = 0, worldlevel = 0;
var playtime = 0, starttime = 0;

	//============================
	//         Functions
	//============================

function startTime() {
	starttime = Date.now();
}

function increaseHamsters(amount) {
	if (hamstercount < hamstermaximum) {
		if (amount > 0) {
			totalhamstercount += amount;
		}
		for (i = 0; i <= 10; i++) {
			var repeat = setInterval(function() {
				if (i < 10) {
					console.log(i + ": " + amount/10);
					hamstercount += Math.floor(amount / 10);
					document.getElementById("counter").innerHTML = hamstercount.toLocaleString() + " Hamsters";
				} else {
					console.log(i + ": " + amount%10);
					hamstercount += amount % 10;
					document.getElementById("counter").innerHTML = hamstercount.toLocaleString() + " Hamsters";
					clearInterval(repeat);
				}
			}, 100);
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
