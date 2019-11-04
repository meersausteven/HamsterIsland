
// save progress every 2 minutes

var saveprogress_interval = setInterval(saveProgress, 120000);

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

function getProgress() {
	if (localStorage.getItem("savegame") != null) {
		var save = window.atob(localStorage.getItem("savegame")).split("-");
		
		console.log(save);
		
		totalhamstercount = parseInt(save[0]);
		hamstercount = parseInt(save[1]);
		cagedhamsterclicks = parseInt(save[2]);
		rarehamsterclicks = parseInt(save[3]);
		islandlevel = parseInt(save[4]);
		cagelevel = parseInt(save[5]);
		foodlevel = parseInt(save[6]);
		drinklevel = parseInt(save[7]);
		basehamsterspersecond = parseInt(save[8]);
		hamstermaximum = parseInt(save[9]);
		hamstersperclick = parseInt(save[10]);
		starttime = parseInt(save[11]);
		playtime = parseInt(save[12]);
	}
}
