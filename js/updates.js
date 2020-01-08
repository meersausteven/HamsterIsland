
// functions that update hps and upgrade levels

function updateHPS() {
	hamsterspersecond = basehamsterspersecond * hamsterspersecondboost;
	document.getElementById("hps_display").innerHTML = convertToReadableNumber(hamsterspersecond) + " H/s";
}

function updateHamsterMaximum() {
	maximumdisplay = document.getElementById("maximum_display");
	if (hamstermaximum == "unlimited") {
		maximumdisplay.innerHTML = "Max: &infin; Hamsters";
	} else {
		maximumdisplay.innerHTML = "Max: " + convertToReadableNumber(hamstermaximum) + " Hamsters";
	}
}

function updateHamsterCount() {
	let readableCount = convertToReadableNumber(hamstercount);
	document.getElementById("counter").innerHTML = readableCount + " Hamsters";
}

function updateCageLevel() {
	document.getElementById("hamster_cage").style.cssText = "background-image: url('pics/cage/world_" + worldlevel + "/level_" + cagelevel + ".png');";
}

function updateFoodLevel() {
	if (foodlevel > 0) {
		var hamsterfood = document.getElementById("hamster_food");
		if (foodlevel == 1) {
			hamsterfood.classList.remove("food-drink-not-bought");
		}
		hamsterfood.style.cssText = "background-image: url('pics/food/world_" + worldlevel + "/level_" + foodlevel + ".png');";
	}
}

function updateDrinkLevel() {
	if (drinklevel > 0) {
		var hamsterdrink = document.getElementById("hamster_drink");
		if (drinklevel == 1) {
			hamsterdrink.classList.remove("food-drink-not-bought");
		}
		hamsterdrink.style.cssText = "background-image: url('pics/drink/world_" + worldlevel + "/level_" + drinklevel + ".png');";
	}
}

function updateIslandLevel() {
	document.getElementById("hamster_island").style.cssText = "background-image: url('pics/island/world_" + worldlevel + "/level_" + islandlevel + ".png');";
}

function updateHamsterLevel() {
	document.getElementById("caged_hamster").style.cssText = "background-image: url('pics/hamster/world_" + worldlevel + "/level_" + hamsterlevel + ".png');";
}

function updateWorldLevel() {
	document.getElementById("hamster_sea").style.cssText = "background-image: url('pics/world/level_" + worldlevel + ".png');";
}

function convertToReadableNumber(number) {
	if (number < 1000000) {
		return number.toLocaleString();
	} else if (number < 1000000000) {
		return (number / 1000000).toLocaleString() + " M";
	} else if (number < 1000000000000) {
		return (number / 1000000000).toLocaleString() + " B";
	} else if (number < 1000000000000000) {
		return (number / 1000000000000).toLocaleString() + " T";
	} else if (number < 1000000000000000000) {
		return (number / 1000000000000000).toLocaleString() + " Qa";
	} else if (number < 1000000000000000000000) {
		return (number / 1000000000000000000).toLocaleString() + " Qi";
	} else if (number < 1000000000000000000000000) {
		return (number / 1000000000000000000000).toLocaleString() + " Si";
	} else if (number < 1000000000000000000000000000) {
		return (number / 1000000000000000000000000).toLocaleString() + " Se";
	} else if (number < 1000000000000000000000000000000) {
		return (number / 1000000000000000000000000000).toLocaleString() + " O";
	} else if (number < 1000000000000000000000000000000000) {
		return (number / 1000000000000000000000000000000).toLocaleString() + " N";
	} else if (number < 1000000000000000000000000000000000000) {
		return (number / 1000000000000000000000000000000000).toLocaleString() + " D";
	} else {
		return (number / 1000000000000000000000000000000000000).toLocaleString() + " UnD";
	}
}

function updateGame() {
	getProgress();
	startTime();
	updateCageLevel();
	updateIslandLevel();
	updateHamsterLevel();
	updateWorldLevel();
	updateDrinkLevel();
	updateFoodLevel();
	updateHPS();
	updateHamsterMaximum();
	updateHamsterCount();
	updateStats();
}
