
// functions that update hps and upgrade levels

function updateHPS() {
	hamsterspersecond = basehamsterspersecond * hamsterspersecondboost;
	document.getElementById("hps_display").innerHTML = hamsterspersecond.toLocaleString() + " H/s";
}

function updateHamsterMaximum() {
	maximumdisplay = document.getElementById("maximum_display");
	if (hamstermaximum == "unlimited") {
		maximumdisplay.innerHTML = "Max: &infin; Hamsters";
	} else {
		maximumdisplay.innerHTML = "Max: " + hamstermaximum.toLocaleString() + " Hamsters";
	}
}

function updateCageLevel() {
	document.getElementById("hamster_cage").style.cssText = "background-image: url('pics/cage/level_" + cagelevel + ".png');";
}

function updateFoodLevel() {
	if (foodlevel > 0) {
		var hamsterfood = document.getElementById("hamster_food");
		if (foodlevel == 1) {
			hamsterfood.classList.remove("food-drink-not-bought");
		}
		hamsterfood.style.cssText = "background-image: url('pics/food/level_" + foodlevel + ".png');";
	}
}

function updateDrinkLevel() {
	if (drinklevel > 0) {
		var hamsterdrink = document.getElementById("hamster_drink");
		if (drinklevel == 1) {
			hamsterdrink.classList.remove("food-drink-not-bought");
		}
		hamsterdrink.style.cssText = "background-image: url('pics/drink/level_" + drinklevel + ".png');";
	}
}

function updateIslandLevel() {
	document.getElementById("hamster_island").style.cssText = "background-image: url('pics/island/level_" + islandlevel + ".png');";
}

function updateHamsterLevel() {
	document.getElementById("caged_hamster").style.cssText = "background-image: url('pics/hamster/level_" + hamsterlevel + ".png');";
}

function updateWorldLevel() {
	document.getElementById("hamster_sea").style.cssText = "background-image: url('pics/world/level_" + worldlevel + ".png');";
}
