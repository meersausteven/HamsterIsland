
// save progress every 2 minutes

var savecookies_interval = setInterval(saveProgress, 120000);

function saveProgress() {
	playtime = Date.now() - starttime;
	var save = window.btoa(totalhamstercount +
		"-" + hamstercount +
		"-" + cagedhamsterclicks +
		"-" + rarehamsterclicks +
		"-" + islandlevel +
		"-" + cagelevel +
		"-" + foodlevel +
		"-" + drinklevel +
		"-" + basehamsterspersecond +
		"-" + hamstermaximum +
		"-" + hamstersperclick +
		"-" + starttime +
		"-" + playtime
	);
	
	console.log(save);
	localStorage.setItem("savegame", save);
	
	var notice = new SaveNotice();
	notice.element.className += " animation-fade-up";
}

// check for already saved progress

function checkForProgress() {
	if (localStorage.getItem(savegame);  != "") {
		var save = window.atob(getProgress("save")).split("-");
		
		console.log(save);
		
		totalhamstercount = save[0];
		hamstercount = save[1];
		cagedhamsterclicks = save[2];
		rarehamsterclicks = save[3];
		islandlevel = save[4];
		cagelevel = save[5];
		foodlevel = save[6];
		drinklevel = save[7];
		basehamsterspersecond = save[8];
		hamstermaximum = save[9];
		hamstersperclick = save[10];
		starttime = save[11];
		playtime = save[12];
	}
}
