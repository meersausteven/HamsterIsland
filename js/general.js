window.onload = function() {
	getProgress();
	updateStats();
	startTime();
	updateCageLevel();
	updateIslandLevel();
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
var cagelevel = 0, foodlevel = 0, drinklevel = 0, islandlevel = 0;
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
		if (amount <= 3) {
			hamstercount += amount;
			document.getElementById("counter").innerHTML = Math.round(hamstercount).toLocaleString() + " Hamsters";
		} else {
			let divider = Math.ceil((amount / 2) - 1);
			for (divider; divider > 0; divider--) {
				if ((amount % divider == 0)) {
					var norestdivider = amount / divider;
					break;
				}
			}
			var i = 1;
			function increaseCounter() {
				hamstercount += amount / norestdivider;
				if (hamstercount > hamstermaximum) {
					let difference = hamstercount - hamstermaximum;
					hamstercount -= difference;
					totalhamstercount -= difference;
				}
				document.getElementById("counter").innerHTML = Math.round(hamstercount).toLocaleString() + " Hamsters";
				if (i++ < norestdivider) {
					setTimeout(increaseCounter, 20);
				}
			}
			increaseCounter();
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
		particle.element.style.cssText = "top: " + (hamsterTop + hamsterHeight / 2 + particle.posY) + "px; left: " + (hamsterLeft + hamsterWidth / 2 + particle.posX) + "px;";
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
