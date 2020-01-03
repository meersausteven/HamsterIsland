
// update statistics every 10 seconds

var updatestats_interval = setInterval(updateStats, 10000);
var time = starttime - new Date().getTime();

function updateStats() {
	var playedseconds  = Date(time).getSeconds();
	var playedminutes  = Date(time).getMinutes();
	var playedhours  = Date(time).getHours();
	var totalplaytime = playedhours + ((playedhours == 1) ? " hour " : " hours ") + " hours " + playedminutes + ((playedminutes == 1) ? " minute " : " minutes ") + playedseconds + ((playedseconds == 1) ? " second " : " seconds");

	document.getElementById("stats_hamsters").innerHTML = convertToReadableNumber(hamstercount);
	document.getElementById("stats_max").innerHTML = convertToReadableNumber(hamstermaximum);
	document.getElementById("stats_perclick").innerHTML = convertToReadableNumber(hamstersperclick);
	document.getElementById("stats_hps").innerHTML = convertToReadableNumber(hamsterspersecond);
	document.getElementById("stats_total").innerHTML = convertToReadableNumber(totalhamstercount);
	document.getElementById("stats_clicks").innerHTML = convertToReadableNumber(cagedhamsterclicks);
	document.getElementById("stats_rareclicks").innerHTML = convertToReadableNumber(rarehamsterclicks);
	document.getElementById("stats_playtime").innerHTML = totalplaytime;
	document.getElementById("stats_food").innerHTML = foodlevel;
	document.getElementById("stats_drink").innerHTML = drinklevel;
	document.getElementById("stats_cage").innerHTML = cagelevel;
	document.getElementById("stats_island").innerHTML = islandlevel;
	document.getElementById("stats_hamsterlevel").innerHTML = hamsterlevel;
	document.getElementById("stats_world").innerHTML = worldlevel;
}

// open / close the statistics

document.getElementById("open_statistics").addEventListener("click", toggleStats);
document.getElementById("close_statistics").addEventListener("click", toggleStats);

var statsopen = false;

function toggleStats() {
  var openstats = document.getElementById("open_statistics");
  var closestats = document.getElementById("close_statistics");
  var stats = document.getElementById("statistics_screen");
  if (statsopen === true) {
    stats.classList.remove("stats-open");
    statsopen = false;
  } else {
    stats.classList.add("stats-open");
    statsopen = true;
  }
}

document.getElementById("delete_progress").addEventListener("click", toggleDialogueBox);
document.getElementById("abort").addEventListener("click", toggleDialogueBox);

function toggleDialogueBox() {
	var box = document.getElementById("clear_save_dialogue_box_container");
	if (box.classList.contains("visible")) {
		box.classList.remove("visible");
	} else {
		box.classList.add("visible");
	}
}

document.getElementById("clear_save").addEventListener("click", clearSave);

function clearSave() {
	localStorage.clear();
	location.reload();
}
