
	//============================
	//         Classes
	//============================

class Particle {
	constructor() {
		this.element = document.createElement("div");
		this.element.className = "background-preset particle";
		this.hamstertype = Math.floor(Math.random() * hamsterlevel + 1);
		this.randeg = Math.floor(Math.random() * 361);
		this.posX = 100 * Math.cos(Math.floor(Math.random() * 361));
		this.posY = 100 * Math.sin(Math.floor(Math.random() * 361));
		this.element.style.cssText = "transform: rotate(" + this.randeg + "deg);";
		document.body.appendChild(this.element);
		setTimeout(function() {this.delete()}.bind(this), 1000);
	}
	delete() {
		document.body.removeChild(this.element);
	}
}

class ClickedHamsters {
	constructor(e) {
		this.element = document.createElement("div");
		this.element.innerHTML = "+" + hamstersperclick.toLocaleString();
		this.element.className = "clicked-hamsters";
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
		setTimeout(function() {this.delete()}.bind(this), 5000);
	}
	delete() {
		document.body.removeChild(this.element);
	}
}

class RareHamster {
	constructor(type) {
		this.element = document.createElement("div");
		if (type == null) {
			this.random1000 = (Math.floor(Math.random() * 1001) / 10);
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
		this.element.className = "background-preset rare-hamster rare-hamster-" + this.rarehamstertype;
		this.element.id = "rare_hamster_" + this.rarehamstertype;
		this.posX = (Math.floor(Math.random() * 1001) / 10);
		this.posY = (Math.floor(Math.random() * 1001) / 10);
		this.element.style.cssText = "top: " + this.posY + "vh; left: " + this.posX + "vw;";

		// on click activate one of two possible effects with a 50% chance for either
		this.element.onclick = function() {
			let rarehamstertype = this.id.replace('rare_hamster_','');
			let coinFlip = Math.floor(Math.random() * 101);
			let boostDuration = 30000;
			let hamsterMultiplier;
			let boostMultiplier;
			switch (rarehamstertype) {
				case "bronze":
					// gives you 25% of your current hamsters
					hamsterMultiplier = 0.25;
					// OR multiplies your current H/s by 3 for 30 seconds
					boostMultiplier = 3;
					break;
				case "silver":
					// gives you 50% of your current hamsters
					hamsterMultiplier = 0.5;
					// OR multiplies your current H/s by 7 for 30 seconds
					boostMultiplier = 7;
					break;
				case "gold":
					// gives you 100% of your current hamsters
					hamsterMultiplier = 1;
					// OR multiplies your current H/s by 15 for 30 seconds
					boostMultiplier = 15;
					break;
				case "diamond":
					// gives you 250% of your current hamsters
					hamsterMultiplier = 2.5;
					// OR multiplies your current H/s by 100 for 30 seconds
					boostMultiplier = 100;
					break;
				case "alexandrite":
					// gives you 1000% of your current hamsters
					hamsterMultiplier = 10;
					// OR multiplies your current H/s by 1000 for 15 seconds
					boostMultiplier = 1000;
					boostDuration = 15000;
					break;
				default:
					hamsterMultiplier = 0;
					boostMultiplier = 0;
					boostDuration = 0;
					break;
			}
			if (coinFlip > 50) {
				increaseHamsters(hamsterspersecond * hamsterMultiplier);
			} else {
				rareHamsterBoost(boostMultiplier, boostDuration);
			}

			// show a small text box with the activated effect
			let boostInfoBox = document.createElement("div");
			boostInfoBox.className = "boost-info-box rare-hamster-" + rarehamstertype;
			boostInfoBox.id = "boost_info_box";
			if (coinFlip > 50) {
				boostInfoBox.innerHTML = "The " + rarehamstertype + " hamster gifted you " + (Math.floor((hamsterspersecond * hamsterMultiplier)).toLocaleString()) + " hamsters!";
			} else {
				boostInfoBox.innerHTML = "The " + rarehamstertype + " hamster boosted your hamsters per second by " + boostMultiplier + " for " + (boostDuration / 1000) + " seconds!";
			}
			document.body.appendChild(boostInfoBox);

			// remove text box after 10 seconds
			setTimeout(
				function() {
					let infoBox = document.getElementById("boost_info_box");
					infoBox.parentNode.removeChild(infoBox);
				}, 10000
			);
			rarehamsterclicks++;
			let rarehamster = document.getElementById("rare_hamster_" + rarehamstertype);
			rarehamster.parentNode.removeChild(rarehamster);
		}

		document.body.appendChild(this.element);
		setTimeout(function() {this.delete()}.bind(this), 5000);
	}
	delete() {
		if (document.getElementById("rare_hamster_" + this.rarehamstertype) != null) {
			document.body.removeChild(this.element);
		}
	}
}
