
// functions that update hps and upgrade levels

function updateHPS() {
	hamsterspersecond = basehamsterspersecond * hamsterspersecondboost;
	document.getElementById("hps_display").innerHTML = convertToReadableNumber(hamsterspersecond) + " H/s";
}

function updateHamsterCapacity() {
	capacitydisplay = document.getElementById("capacity_display");
	if (hamstercapacity == "unlimited") {
		capacitydisplay.innerHTML = "Capacity: &infin; Hamsters";
	} else {
		capacitydisplay.innerHTML = "Capacity: " + convertToReadableNumber(hamstercapacity) + " Hamsters";
	}
}

function updateHamsterCount() {
	document.getElementById("counter").innerHTML = convertToReadableNumber(hamstercount) + " Hamsters";
}

function updateHousingLevel() {
	document.getElementById("hamster_housing").style.cssText = "background-image: url('pics/cage/world_" + worldlevel + "/level_" + housinglevel + ".png');";
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
	document.getElementById("big_hamster").style.cssText = "background-image: url('pics/hamster/world_" + worldlevel + "/level_" + hamsterlevel + ".png');";
}

function updateWorldLevel() {
	document.getElementById("hamster_sea").style.cssText = "background-image: url('pics/world/level_" + worldlevel + ".png');";
}

function convertToReadableNumber(number) {
	var digits = number.toString().length;
	if (digits < 7) {
		return number.toLocaleString();
	} else if (digits < 10) {
		return (number / (10 ** 6)).toLocaleString() + " M";
	} else if (digits < 13) {
		return (number / (10 ** 9)).toLocaleString() + " B";
	} else if (digits < 16) {
		return (number / (10 ** 12)).toLocaleString() + " T";
	} else if (digits < 19) {
		return (number / (10 ** 15)).toLocaleString() + " Qa";
	} else if (digits < 22) {
		return (number / (10 ** 18)).toLocaleString() + " Qi";
	} else if (digits < 25) {
		return (number / (10 ** 21)).toLocaleString() + " Si";
	} else if (digits < 28) {
		return (number / (10 ** 24)).toLocaleString() + " Se";
	} else if (digits < 31) {
		return (number / (10 ** 27)).toLocaleString() + " O";
	} else if (digits < 34) {
		return (number / (10 ** 30)).toLocaleString() + " N";
	} else if (digits < 37) {
		return (number / (10 ** 33)).toLocaleString() + " D";
	} else {
		return (number / (10 ** 36)).toLocaleString() + " UnD";
	}
}

function updateGame() {
	startTime();
	getProgress();
	updateHousingLevel();
	updateIslandLevel();
	updateHamsterLevel();
	updateWorldLevel();
	updateDrinkLevel();
	updateFoodLevel();
	updateHPS();
	updateHamsterCapacity();
	updateHamsterCount();
	updateStats();
}
