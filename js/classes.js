
	//============================
	//         Classes
	//============================

class Particle {
	constructor() {
		this.element = document.createElement("div");
		this.element.className = "background-preset particle gui_element";
		this.hamsterId = boughtHamsters[Math.floor(Math.random() * boughtHamsters.length)];
		this.randeg = randomGenerator(360);
		this.posX = 100 * Math.cos(randomGenerator(360));
		this.posY = 100 * Math.sin(randomGenerator(360));
		this.element.style.cssText = "transform: rotate(" + this.randeg + "deg);";
		document.body.appendChild(this.element);
		//setTimeout(function() {this.delete()}.bind(this), 1000);
	}
	delete() {
		document.body.removeChild(this.element);
	}
}

class ClickedHamsters {
	constructor(e) {
		this.element = document.createElement("div");
		var displayedNumber = hamstersperclick;
		if ( (hamstersperclick + hamstercount) > hamstercapacity) {
			displayedNumber -= (hamstersperclick + hamstercount) - hamstercapacity;
		}
		this.element.innerHTML = "+" + convertToReadableNumber(displayedNumber);
		this.element.className = "clicked-hamsters gui_element";
		this.posX = e.clientX - 10;
		this.posY = e.clientY - 10;
		this.element.style.cssText = "top: " + this.posY + "px; left: " + this.posX + "px;";
		document.body.appendChild(this.element);
		setTimeout(function() {this.delete()}.bind(this), 1000);
	}
	delete() {
		document.body.removeChild(this.element);
	}
}

class SaveNotice {
	constructor() {
		this.element = document.createElement("div");
		this.element.innerHTML = "Game was saved.";
		this.element.className = "save-notice";
		document.body.appendChild(this.element);
		setTimeout(function() {this.delete()}.bind(this), 3000);
	}
	delete() {
		document.body.removeChild(this.element);
	}
}

var removeRareHamster;

class RareHamster {
	constructor(type) {
		this.element = document.createElement("div");
		if (type == null) {
			this.random1000 = randomGenerator(1000) / 10;
			if (this.random1000 > 99.9) {
				this.rarehamstertype = "alexandrite";
			} else if (this.random1000 > 95.0) {
				this.rarehamstertype = "diamond";
			} else if (this.random1000 > 85.0) {
				this.rarehamstertype = "gold";
			} else if (this.random1000 > 50.0) {
				this.rarehamstertype = "silver";
			} else {
				this.rarehamstertype = "bronze";
			}
		} else {
			this.rarehamstertype = type;
		}
		this.element.className = "background-preset rare-hamster " + this.rarehamstertype + "-hamster";
		this.element.id = "rare_hamster_" + this.rarehamstertype;
		this.posX = randomGenerator(1000) / 10;
		this.posY = randomGenerator(1000) / 10;
		this.element.style.cssText = "top: " + this.posY + "vh; left: " + this.posX + "vw;";
		// remove rare hamster after 10 seconds of not being clicked
		removeRareHamster = setTimeout(function() {this.delete()}.bind(this), 10000);
		// MOUSE CLICK EVENT
		this.element.onclick = function() {
			clearTimeout(removeRareHamster);
			this.rarehamstertype = this.id.replace('rare_hamster_','');
			var coinFlip = randomGenerator(100);
			this.boostDuration = 30000;
			switch (this.rarehamstertype) {
				case "bronze":
					// gives you 25% of your current hamsters
					this.hamsterMultiplier = 0.25;
					// OR multiplies your current H/s by 3 for 30 seconds
					this.boostMultiplier = 3;
					break;
				case "silver":
					// gives you 50% of your current hamsters
					this.hamsterMultiplier = 0.5;
					// OR multiplies your current H/s by 7 for 30 seconds
					this.boostMultiplier = 7;
					break;
				case "gold":
					// gives you 100% of your current hamsters
					this.hamsterMultiplier = 1;
					// OR multiplies your current H/s by 15 for 30 seconds
					this.boostMultiplier = 15;
					break;
				case "diamond":
					// gives you 250% of your current hamsters
					this.hamsterMultiplier = 2.5;
					// OR multiplies your current H/s by 100 for 30 seconds
					this.boostMultiplier = 100;
					break;
				case "alexandrite":
					// gives you 1000% of your current hamsters
					this.hamsterMultiplier = 10;
					// OR multiplies your current H/s by 1000 for 15 seconds
					this.boostMultiplier = 1000;
					this.boostDuration = 15000;
					break;
				default:
					this.hamsterMultiplier = 0;
					this.boostMultiplier = 0;
					this.boostDuration = 0;
					break;
			}
			if (coinFlip > 50) {
				increaseHamsters(Math.floor(hamstercount * this.hamsterMultiplier));
			} else {
				rareHamsterBoost(this);
				rareHamsterBoostDuration(this);
			}
			// show a small text box with the activated effect
			var boostInfoBox = document.createElement("div");
			boostInfoBox.className = "boost-info-box rare-hamster-" + this.rarehamstertype + " animation-infobox";
			boostInfoBox.id = "boost_info_box";
			if (coinFlip > 50) {
				boostInfoBox.innerHTML = "The " + this.rarehamstertype + " hamster gifted you " + convertToReadableNumber(Math.floor(hamstercount * this.hamsterMultiplier)) + " hamsters!";
			} else {
				boostInfoBox.innerHTML = "The " + this.rarehamstertype + " hamster boosted your hamsters per second by " + this.boostMultiplier + " for " + (this.boostDuration / 1000) + " seconds!";
			}
			document.body.appendChild(boostInfoBox);
			// remove text box after 5 seconds
			setTimeout(function() {
				var infoBox = document.getElementById("boost_info_box");
				infoBox.parentNode.removeChild(infoBox);
			}, 5000);
			rarehamsterclicks++;
			var rarehamster = document.getElementById("rare_hamster_" + this.rarehamstertype);
			rarehamster.parentNode.removeChild(rarehamster);
			}
		document.body.appendChild(this.element);
		}
	delete() {
		document.body.removeChild(this.element);
	}
}

class ShopItem {
	constructor(upgrade) {
		this.element = document.createElement("div");
		this.element.className = "shop-upgrade shop-item shop-item-unbuyable shop-" + upgrade.tag + "-upgrade";
		this.element.setAttribute("id", "upgrade_" + upgrade.id);
		this.element.innerHTML = "<h1>" + upgrade.name + "</h1>" +
			"<h2>Costs: " + convertToReadableNumber(upgrade.price) + " Hamsters</h2>" + 
			"<p class='shop-item-icon' style='background-image: url(./pics/shop/world_" + worldlevel + "/" + upgrade.id + ".png)';'></p>";
		// MOUSE CLICK EVENT
		this.element.onclick = function() {
			var upgrade = getUpgrade(this);
			boughtUpgrades.push(upgrade.id);
			// do necessary stuff depending on upgrade type (increase level, hps/capacity/etc.)
			if (hamstercount >= upgrade.price) {
				switch (upgrade.tag) {
				case "housing":
					if (upgrade.action == "multiply") {
						hamstersperclick *= upgrade.value;
					} else if (upgrade.action == "add") {
						hamstersperclick += upgrade.value;
					}
					housinglevel++;
					updateHousingLevel();
					break;
				case "drink":
					increaseHPS(upgrade.value, upgrade.action);
					drinklevel++;
					updateDrinkLevel();
					break;
				case "food":
					increaseHPS(upgrade.value, upgrade.action);
					foodlevel++;
					updateFoodLevel();
					break;
				case "island":
					if (upgrade.action == "add") {
						hamstercapacity += upgrade.value;
					} else if (upgrade.action == "multiply") {
						hamstercapacity *= upgrade.value;
					}
					updateHamsterCapacity();
					islandlevel++;
					updateIslandLevel();
					break;
				case "hamster":
					if (upgrade.action == "multiply") {
						hamstersperclick *= upgrade.value;
					} else if (upgrade.action == "add") {
						hamstersperclick += upgrade.value;
					}
					boughtHamsters.push(upgrade.id);
					hamsterlevel++;
					updateHamsterLevel();
					break;
				case "world":
					worldlevel++;
					updateWorldLevel();
					hamsterlevel = 0;
					foodlevel = 0;
					drinklevel = 0;
					islandlevel = 0;
					updateIslandLevel();
					housinglevel = 0;
					updateHousingLevel();
					break;
				}
				increaseHamsters(-(upgrade.price));
				// delete the info box of the bought shop item
				if (document.getElementById("upgrade_info_box_" + upgrade.id)) {
					var infobox = document.getElementById("upgrade_info_box_" + upgrade.id);
					infobox.parentNode.removeChild(infobox);
				}
				var shopItem = document.getElementById("upgrade_" + upgrade.id);
				shopItem.parentNode.removeChild(shopItem);
			}
		}
		// MOUSE MOVE EVENT
		this.element.onmousemove = function(e) {
			// display a small description when hovering the shop item
			var upgrade = getUpgrade(this);
			var action;
			if ( (upgrade.tag == "food" || upgrade.tag == "drink") ) {
				if (upgrade.action == "multiply") {
					action = "Multiplies your hamsters generated per second by " + upgrade.value + " times.";
				} else if (upgrade.action == "add") {
					action = "Increases your hamsters generated per second by " + upgrade.value + ".";
				}
			} else if ( (upgrade.tag == "housing") || (upgrade.tag == "hamster") ) {
				if (upgrade.action == "multiply") {
					action = "Multiplies your hamsters generated per click by " + upgrade.value + " times.";
				} else if (upgrade.action == "add") {
					action = "Increases your hamsters generated per click by " + upgrade.value + ".";
				}
			} else if (upgrade.tag == "island") {
				if (upgrade.action == "multiply") {
					action = "Multiplies your islands hamster capacity by " + upgrade.value + " times.";
				} else if (upgrade.action == "add") {
					action = "Increases your islands hamster capacity by " + convertToReadableNumber(upgrade.value) + ".";
				}
			} else if (upgrade.tag == "world") {
				action = "Sends your hamsters to a new world with new upgrades. You will keep all your already bought upgrades.";
			} else {
				// something went wrong, upgrade.tag not known
				action = "Error: Unknown upgrade-tag. If you see this, please tell the developer.";
			}
			var upgradebox = document.getElementById("upgrade_" + upgrade.id);
			var upgradeposition = upgradebox.getBoundingClientRect();
			var infobox;
			// check if there is already an info box on screen
			if (document.getElementById("upgrade_info_box_" + upgrade.id)) {
				infobox = document.getElementById("upgrade_info_box_" + upgrade.id);
			} else {
				// if not, create one
				var infobox = document.createElement("div");
				infobox.setAttribute("id", "upgrade_info_box_" + upgrade.id);
				infobox.className = "upgrade_info_box";
				infobox.innerHTML = "<h3>" + upgrade.description + "</h3><h4>" + action + "</h4>";
			}
			// move info box with mouse but keep it from moving outside of the screen
			var correctLeft = (e.clientX - ((upgradebox.clientWidth - 10) / 2)) + ((e.clientX - upgradeposition.left - (upgradebox.clientWidth / 2)) / 2);
			if (correctLeft < 10) {
				correctLeft = 10;
			} else if (correctLeft > window.innerWidth - upgradebox.clientWidth - 20) {
				 correctLeft = window.innerWidth - upgradebox.clientWidth - 20;
			}
			infobox.style.cssText = "width:" + (upgradebox.clientWidth - 10) + "px;" +
						"bottom:" + (document.getElementById("shop").clientHeight + 10) + "px;" +
						"left:" + correctLeft + "px;";
			document.body.appendChild(infobox);
		}
		// MOUSE LEAVE EVENT
		this.element.onmouseleave = function() {
			// remove shop item description when de-hovering
			var upgrade = getUpgrade(this);
			var infobox = document.getElementById("upgrade_info_box_" + upgrade.id);
			infobox.parentNode.removeChild(infobox);
		}
		document.getElementById("shop").appendChild(this.element);
	}
	delete() {
		document.body.removeChild(this.element);
	}
}
