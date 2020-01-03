
// spawn a rare hamster every 5 minutes

var spawnrarehamster_interval = setInterval(spawnRareHamster, 300000);
var type = null;

function spawnRareHamster(type) {
	if (basehamsterspersecond > 0) {
		var rarehamster = new RareHamster(type);
	}
}

// boost the hps if a rare hamsters gives that effect

function rareHamsterBoost(that) {
	hamsterspersecondboost = that.multiplier;
	updateHPS();
	var cancelboosttimeout = setTimeout(cancelBoost, that.duration);
	function cancelBoost() {
		hamsterspersecondboost = 1;
		updateHPS();
	}
}

function rareHamsterBoostDuration(that) {
	let countdown = document.getElementById("rareHamsterBoostCountdown");
	if (!countdown) {
		countdown = document.createElement("div");
		countdown.setAttribute("id", "rareHamsterBoostCountdown");
	}
	countdown.classname = "background-preset";
	countdown.cssText = "background-image: url(rare_hamster_countdown_" + that.rarehamstertype + ".png);";
	
	let countdownOverlay = document.getElementById("rareHamsterBoostCountdownOverlay");
	if (!element) {
		countdownOverlay = document.createElement("div");
		countdownOverlay.setAttribute("id", "rareHamsterBoostCountdownOverlay");
	}
	countdownOverlay.className = "countdown-overlay";
	countdownOverlay.cssText = "background-image: url(rare_hamster_countdown_" + that.rarehamstertype + ".png);";
	
	countdown.appendChild(countdownOverlay);
	document.body.appendChild(countdown);
	let countdownDuration = that.duration;
	setInterval(function() {
		document.getElementById("rareHamsterBoostCountdownOverlay").cssText = "width:" + ((countdownDuration / that.duration) * 100) + "%;";
		countdownDuration -= 100;
	}, 100);
	setTimeout(function() {this.delete()}.bind(this), that.boostDuration);
	}
	delete() {
		if (document.getElementById("rareHamsterBoostCountdown") != null) {
			document.body.removeChild(this.element);
		}
	}
}
