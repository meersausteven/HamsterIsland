
// save progress every 2 minutes

var savecookies_interval = setInterval(saveProgress, 120000);

function saveProgress() {
	playtime = Date.now() - starttime;
	var date = Date.now() + (365 * 24 * 60 * 60 * 1000);
	var expires = "expires = " + (new Date(date).toUTCString());
	var cookie = window.btoa(totalhamstercount +
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
	document.cookies = "save = " + cookie + ";" + expires;
	// display a small notice after saving
	console.log(cookie);
	var notice = new SaveNotice();
	notice.element.className += " animation-fade-up";
}

// check for already saved progress

function checkForProgress() {
	if (getProgress("save") != "") {
		let save = window.atob(getProgress("save")).split("-");
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

function getProgress(cookiename) {
	var name = cookiename + " = ";
	var decodedCookie = decodeURIComponent(document.cookie);
	var cookie = decodedCookie.split(';');
	for(var i = 0; i < cookie.length; i++) {
		var c = cookie[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

// development function

function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
