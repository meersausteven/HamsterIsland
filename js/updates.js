
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
	var digits = number.toString().length;
	if (digits < 6) {
		return number.toLocaleString();
	} else if (digits < 9) {
		return (number / (10 ** 9)).toLocaleString() + " M";
	} else if (digits < 12) {
		return (number / (10 ** 12)).toLocaleString() + " B";
	} else if (digits < 15) {
		return (number / (10 ** 15)).toLocaleString() + " T";
	} else if (digits < 18) {
		return (number / (10 ** 18)).toLocaleString() + " Qa";
	} else if (digits < 21) {
		return (number / (10 ** 21)).toLocaleString() + " Qi";
	} else if (digits < 24) {
		return (number / (10 ** 24)).toLocaleString() + " Si";
	} else if (digits < 27) {
		return (number / (10 ** 27)).toLocaleString() + " Se";
	} else if (digits < 30) {
		return (number / (10 ** 30)).toLocaleString() + " O";
	} else if (digits < 33) {
		return (number / (10 ** 33)).toLocaleString() + " N";
	} else if (digits < 36) {
		return (number / (10 ** 36)).toLocaleString() + " D";
	} else {
		return (number / (10 ** 39)).toLocaleString() + " UnD";
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
