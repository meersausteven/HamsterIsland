
// update statistics every 10 seconds

var updatestats_interval = setInterval(updateStats, 10000);

function updateStats() {
	var time = new Date(playtime);
	var playedseconds  = time.getSeconds();
	var playedminutes  = time.getMinutes();
	var playedhours  = time.getHours() - 1;
	var totalplaytime = playedhours + " hours " + playedminutes + " minutes " + playedseconds + " seconds";

	document.getElementById("stats_hamsters").innerHTML = hamstercount.toLocaleString();
	document.getElementById("stats_max").innerHTML = hamstermaximum.toLocaleString();
	document.getElementById("stats_perclick").innerHTML = hamstersperclick.toLocaleString();
	document.getElementById("stats_hps").innerHTML = hamsterspersecond.toLocaleString();
	document.getElementById("stats_total").innerHTML = totalhamstercount.toLocaleString();
	document.getElementById("stats_clicks").innerHTML = cagedhamsterclicks.toLocaleString();
	document.getElementById("stats_rareclicks").innerHTML = rarehamsterclicks.toLocaleString();
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
