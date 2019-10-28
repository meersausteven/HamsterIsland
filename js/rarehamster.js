
// spawn a rare hamster every 5 minutes

var spawnrarehamster_interval = setInterval(spawnRareHamster, 300000);
var type = null;

function spawnRareHamster(type) {
	if (basehamsterspersecond > 0) {
		var rarehamster = new RareHamster(type);
	}
}

// boost the hps if a rare hamsters gives that effect

function rareHamsterBoost(multiplier, duration) {
	hamsterspersecondboost = multiplier;
	updateHPS();
	var cancelboosttimeout = setTimeout(cancelBoost, duration);
	function cancelBoost() {
		hamsterspersecondboost = 1;
		updateHPS();
	}
}
