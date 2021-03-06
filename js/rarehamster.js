
// spawn a rare hamster every 5 minutes

var spawnrarehamster_interval = setInterval(spawnRareHamster, 300000);
var type = null;

function spawnRareHamster(type) {
	if (basehamsterspersecond > 0) {
		var rarehamster = new RareHamster(type);
	}
}

// boost the hps if a rare hamsters gives that effect

function rareHamsterBoost(rarehamster) {
	hamsterspersecondboost = rarehamster.boostMultiplier;
	updateHPS();
	var cancelboosttimeout = setTimeout(cancelBoost, rarehamster.boostDuration);
	function cancelBoost() {
		hamsterspersecondboost = 1;
		updateHPS();
	}
}

function rareHamsterBoostDuration(rarehamster) {
	let countdown = document.getElementById("rareHamsterBoostCountdown");
	if (!countdown) {
		countdown = document.createElement("div");
		countdown.setAttribute("id", "rareHamsterBoostCountdown");
	}
	countdown.className = "background-preset rare-hamster-" + rarehamster.rarehamstertype;
	countdown.style.cssText = "background-image: url(../pics/hamsters/rare_hamsters/" + rarehamster.rarehamstertype + "/boost_countdown.png);";
	
	let countdownOverlay = document.getElementById("rareHamsterBoostCountdownOverlay");
	if (!countdownOverlay) {
		countdownOverlay = document.createElement("div");
		countdownOverlay.setAttribute("id", "rareHamsterBoostCountdownOverlay");
	}
	countdown.appendChild(countdownOverlay);
	document.body.appendChild(countdown);
	
	var countdownDuration = rarehamster.boostDuration;
	var decreaseDisplay = setInterval(function() {
		document.getElementById("rareHamsterBoostCountdownOverlay").style.cssText = "width:" + ((countdownDuration / rarehamster.boostDuration) * 100) + "%;";
		countdownDuration -= 100;
	}, 100);
	setTimeout(function() {
		if (document.getElementById("rareHamsterBoostCountdown") != null) {
			document.body.removeChild(countdown);
		}
		clearInterval(decreaseDisplay);
	}, rarehamster.boostDuration);
}
