
// save progress every 2 minutes

var saveprogress_interval = setInterval(saveProgress, 120000);

function saveProgress() {
	playtime = Date.now() - starttime;
	var boughtUpgradesList;
	var save = window.btoa(totalhamstercount +
		"-" + hamstercount +
		"-" + bighamsterclicks +
		"-" + rarehamsterclicks +
		"-" + islandlevel +
		"-" + worldlevel +
		"-" + hamsterlevel +
		"-" + housinglevel +
		"-" + foodlevel +
		"-" + drinklevel +
		"-" + basehamsterspersecond +
		"-" + hamstercapacity +
		"-" + hamstersperclick +
		"-" + starttime +
		"-" + boughtUpgrades.join()
	);
	localStorage.setItem("savegame", save);
	
	var notice = new SaveNotice();
	notice.element.className += " animation-snackbar";
}

// check for already saved progress

function getProgress() {
	if (localStorage.getItem("savegame") != null) {
		var save = window.atob(localStorage.getItem("savegame")).split("-");
		
		totalhamstercount = parseInt(save[0]);
		hamstercount = parseInt(save[1]);
		bighamsterclicks = parseInt(save[2]);
		rarehamsterclicks = parseInt(save[3]);
		islandlevel = parseInt(save[4]);
		worldlevel = parseInt(save[5]);
		hamsterlevel = parseInt(save[6]);
		housinglevel = parseInt(save[7]);
		foodlevel = parseInt(save[8]);
		drinklevel = parseInt(save[9]);
		basehamsterspersecond = parseInt(save[10]);
		hamstercapacity = parseInt(save[11]);
		hamstersperclick = parseInt(save[12]);
		starttime = parseInt(save[13]);
		boughtUpgrades = save[14].split(",");
	}
}
