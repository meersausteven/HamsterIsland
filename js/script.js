window.onload = function() {
	checkForProgress();
	updateStats();
	startTime();
	updateCageLevel();
	updateIslandLevel();
	updateDrinkLevel();
	updateFoodLevel();
	updateHPS();
}

	//============================
	//         Variables
	//============================
	
var totalhamstercount = 0, hamstercount = 0;
var hamstersperclick = 1;
var cagedhamsterclicks = 0, rarehamsterclicks = 0;
var basehamsterspersecond = 0;
var hamsterspersecondboost = 1;
var hamsterspersecond = 0;
var hamstermaximum = 10000;
var cagelevel = 0, foodlevel = 0, drinklevel = 0, islandlevel = 0;
var playtime = 0, starttime = 0;

	//============================
	//         Functions
	//============================

function startTime() {
	starttime = Date.now();
}
	
function updateHPS() {
	hamsterspersecond = basehamsterspersecond * hamsterspersecondboost;
	document.getElementById("hps_display").innerHTML = hamsterspersecond.toLocaleString() + " H/s";
}

function updateHamsterMaximum() {
	maximumdisplay = document.getElementById("maximum_display");
	if (hamstermaximum == "unlimited") {
		maximumdisplay.innerHTML = "Max: &infin; Hamsters";
	} else {
		maximumdisplay.innerHTML = "Max: " + hamstermaximum.toLocaleString() + " Hamsters";
	}
}

function updateCageLevel() {
	document.getElementById("hamster_cage").style.cssText = "background-image: url('pics/cage/level_" + cagelevel + ".png');";
}

function updateFoodLevel() {
	if (foodlevel > 0) {
		var hamsterfood = document.getElementById("hamster_food");
		if (foodlevel == 1) {
			hamsterfood.classList.remove("food-drink-not-bought");
		}
		hamsterfood.cssText = "background-image: url('pics/food/level_" + foodlevel + ".png');";
	}
}

function updateDrinkLevel() {
	if (drinklevel > 0) {
		var hamsterdrink = document.getElementById("hamster_drink");
		if (drinklevel == 1) {
			hamsterdrink.classList.remove("food-drink-not-bought");
		}
		hamsterdrink.cssText = "background-image: url('pics/drink/level_" + drinklevel + ".png');";
	}
}

function updateIslandLevel() {
	document.getElementById("hamster_island").style.cssText = "background-image: url('pics/island/level_" + islandlevel + ".png');";
}

function increaseHamsters(amount) {
	if (hamstercount < hamstermaximum) {
		var i = 0;
		function increaseCounter() {
			hamstercount += amount / 50;
			if (amount > 0) {
				totalhamstercount += amount / 50;
			}
			if (hamstercount > hamstermaximum) {
				var difference = hamstercount - hamstermaximum;
				hamstercount -= difference;
				totalhamstercount -= difference;
			}
			document.getElementById("counter").innerHTML = Math.round(hamstercount).toLocaleString() + " Hamsters";
			if (i++ < 50) {
				setTimeout(increaseCounter, 5);
			}
		}
		increaseCounter();
		//hamstercount = Math.round(hamstercount.toFixed(2));
		//totalhamstercount = Math.round(totalhamstercount.toFixed(2));
		//hamstercount = Math.round(hamstercount);
		//totalhamstercount = Math.round(totalhamstercount);
	}
	addNewUpgradesToShop();
	checkForBuyableUpgrades();
}

var hamsterspersecond_interval = setInterval(hamstersPerSecond, 10);

function hamstersPerSecond() {
  increaseHamsters(hamsterspersecond / 100);
}

function rareHamsterBoost(multiplier, duration) {
	hamsterspersecondboost = multiplier;
	updateHPS();
	var cancelboosttimeout = setTimeout(cancelBoost, duration);
	function cancelBoost() {
		hamsterspersecondboost = 1;
		updateHPS();
	}
}

var spawnrarehamster_interval = setInterval(spawnRareHamster, 300000);
var type = null;

function spawnRareHamster(type) {
	if (basehamsterspersecond > 0) {
		var rarehamster = new RareHamster(type);
	}
}

document.getElementById("hamster_cage").addEventListener("click", cageClick);

function cageClick(e) {
  increaseHamsters(hamstersperclick);
  cagedhamsterclicks++;
	if (hamstercount < hamstermaximum) {
		// create a particle with each click and move it in a random direction
		var particle = new Particle();
		var cagedHamster = document.querySelector("#caged_hamster");
		var hamsterStyle = getComputedStyle(cagedHamster);
		var hamsterHeight = parseFloat(hamsterStyle.height.replace("px", ""));
		var hamsterWidth = parseFloat(hamsterStyle.width.replace("px", ""));
		var hamsterTop = parseFloat(hamsterStyle.top.replace("px", ""));
		var hamsterLeft = parseFloat(hamsterStyle.left.replace("px", ""));
		particle.element.style.cssText = "top: " + (hamsterTop + hamsterHeight / 2 + particle.posY) + "px; left: " + (hamsterLeft + hamsterWidth / 2 + particle.posX) + "px;";
		particle.element.className += " particle-animation";
		
		// create a node that displays the clicked hamsters
		var clickedhamsters = new ClickedHamsters(e);
		clickedhamsters.element.className += " clicked-hamsters-animation";
	}
}

// save progress every 2 minutes

var savecookies_interval = setInterval(saveProgress, 120000);

function saveProgress() {
	playtime = Date.now() - starttime;
	var date = Date.now() + (365 * 24 * 60 * 60 * 1000);
	var expires = "expires = " + (new Date(date).toUTCString());
	document.cookie = "total = " + Math.round(totalhamstercount).toLocaleString() + ";" + expires;
	document.cookie = "hamsters = " + Math.round(hamstercount).toLocaleString() + ";" + expires;
	document.cookie = "clicked = " + cagedhamsterclicks + ";" + expires;
	document.cookie = "clickedrares = " + rarehamsterclicks + ";" + expires;
	document.cookie = "island = " + islandlevel + ";" + expires;
	document.cookie = "cage = " + cagelevel + ";" + expires;
	document.cookie = "food = " + foodlevel + ";" + expires;
	document.cookie = "drink = " + drinklevel + ";" + expires;
	document.cookie = "hps = " + basehamsterspersecond + ";" + expires;
	document.cookie = "max = " + hamstermaximum + ";" + expires;
	document.cookie = "perclick = " + hamstersperclick + ";" + expires;
	document.cookie = "starttime = " + starttime + ";" + expires;
	document.cookie = "playtime = " + playtime + ";" + expires;
	
	// display a small notice after saving
	var notice = new SaveNotice();
}

// check for already saved progress

function checkForProgress() {
	if (getProgress("total") != "") {
		totalhamstercount = getProgress("total");
	}
	if (getProgress("hamsters") != "") {
		hamstercount = getProgress("hamsters");
	}
	if (getProgress("clicked") != "") {
		cagedhamsterclicks = getProgress("clicked");
	}
	if (getProgress("clickedrares") != "") {
		rarehamsterclicks = getProgress("clickedrares");
	}
	if (getProgress("island") != "") {
		islandlevel = getProgress("island");
	}
	if (getProgress("cage") != "") {
		cagelevel = getProgress("cage");
	}
	if (getProgress("food") != "") {
		foodlevel = getProgress("food");
	}
	if (getProgress("drink") != "") {
		drinklevel = getProgress("drink");
	}
	if (getProgress("hps") != "") {
		hamsterspersecond = getProgress("hps");
	}
	if (getProgress("max") != "") {
		hamstermaximum = getProgress("max");
	}
	if (getProgress("perclick") != "") {
		hamstersperclick = getProgress("perclick");
	}
	if (getProgress("starttime") != "") {
		starttime = getProgress("starttime");
	}
	if (getProgress("playtime") != "") {
		playtime = getProgress("playtime");
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

// update statistics every 10 seconds

var updatestats_interval = setInterval(updateStats, 10000);

function updateStats() {
	var time = new Date(playtime);
	var playedseconds  = time.getSeconds();
	var playedminutes  = time.getMinutes();
	var playedhours  = time.getHours() - 1;
	var totalplaytime = playedhours + " hours " + playedminutes + " minutes " + playedseconds + " seconds";
	
	document.getElementById("stats_hamsters").innerHTML = Math.round(hamstercount).toLocaleString();
	document.getElementById("stats_max").innerHTML = hamstermaximum.toLocaleString();
	document.getElementById("stats_perclick").innerHTML = hamstersperclick.toLocaleString();
	document.getElementById("stats_hps").innerHTML = hamsterspersecond.toLocaleString();
	document.getElementById("stats_total").innerHTML = Math.round(totalhamstercount).toLocaleString();
	document.getElementById("stats_clicks").innerHTML = cagedhamsterclicks.toLocaleString();
	document.getElementById("stats_rareclicks").innerHTML = rarehamsterclicks.toLocaleString();
	document.getElementById("stats_playtime").innerHTML = totalplaytime;
	document.getElementById("stats_food").innerHTML = foodlevel;
	document.getElementById("stats_drink").innerHTML = drinklevel;
	document.getElementById("stats_cage").innerHTML = cagelevel;
	document.getElementById("stats_island").innerHTML = islandlevel;
}

// open / close the statistics

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

 // open / close the shop menu

var shopopen = false;

function toggleShop() {
  var shopbutton = document.getElementById("toggle_shop_button");
  var shop = document.getElementById("shop");
  if (shopopen === true) {
    shop.classList.remove("shop-open");
    shop.classList.add("shop-buying-impossible");
    shopbutton.classList.remove("shop-open-button");
    shopopen = false;
  } else {
    shop.classList.add("shop-open");
		shop.classList.remove("shop-buying-impossible");
    shopbutton.classList.add("shop-open-button");
    shopopen = true;
  }
}

	//============================
	//         Classes
	//============================

class Particle {
	constructor() {
		this.element = document.createElement("div");
		this.element.className = "particle";
		this.randeg = Math.floor(Math.random() * 361);
		this.posX = 100 * Math.cos(this.randeg);
		this.posY = 100 * Math.sin(this.randeg);
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
		this.element.innerHTML = "+" + hamstersperclick;
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
		this.element.className = "rare-hamster rare-hamster-" + this.rarehamstertype;
		this.element.id = "rare_hamster_" + this.rarehamstertype;
		this.posX = (Math.floor(Math.random() * 1001) / 10);
		this.posY = (Math.floor(Math.random() * 1001) / 10);
		this.element.style.cssText = "top: " + this.posY + "vh; left: " + this.posX + "vw;";
		
		// on click activate one of two possible effects with a 50% chance for either
		this.element.onclick = function() {
			let rarehamstertype = this.id.replace('rare_hamster_','');
			let fiftyfifty = Math.floor(Math.random() * 101);
			let boostDuration = 30000;
			let boostTimeworth;
			let boostMultiplier;
			switch (rarehamstertype) {
				case "bronze":
					// gives you 3 minutes worth of your H/s
					boostTimeworth = 3 * 60;
					// OR multiplies your current H/s by 3 for 30 seconds
					boostMultiplier = 3;
					break;
				case "silver":
					// gives you 7 minutes worth of your H/s
					boostTimeworth = 7 * 60;
					// OR multiplies your current H/s by 7 for 30 seconds
					boostMultiplier = 7;
					break;
				case "gold":
					// gives you 15 minutes worth of your H/s
					boostTimeworth = 15 * 60;
					// OR multiplies your current H/s by 15 for 30 seconds
					boostMultiplier = 15;
					break;
				case "diamond":
					// gives you 1 hour worth of your H/s
					boostTimeworth = 60 * 60;
					// OR multiplies your current H/s by 100 for 30 seconds
					boostMultiplier = 100;
					break;
				case "alexandrite":
					// gives you 24 hours worth of your H/s
					boostTimeworth = 60 * 60 * 24;
					// OR multiplies your current H/s by 1000 for 15 seconds
					boostMultiplier = 1000;
					boostDuration = 15000;
					break;
			}
			if (fiftyfifty > 50) {
				increaseHamsters(hamsterspersecond * boostTimeworth);
			} else {
				rareHamsterBoost(boostMultiplier, boostDuration);
			}
			
			// show a small text box with the activated effect
			let boostInfoBox = document.createElement("div");
			boostInfoBox.className = "boost-info-box rare-hamster-" + rarehamstertype;
			boostInfoBox.id = "boost_info_box";
			if (fiftyfifty > 50) {
				boostInfoBox.innerHTML = "The " + rarehamstertype + " hamster gifted you " + ((hamsterspersecond * boostTimeworth).toLocaleString()) + " hamsters!";
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

	//===============================
	// display upgrades if available
	//===============================

	// Upgrade names max. 3 word  each 12 letters
	// Upgrade description max. 160 letters

var cageupgrades = [
	{id:"c001", price:50, level:1, action:"add", value:1, upgradetype:"click", name:"Cardboard Box", tag:"cage", description:"An old cardboard box you found in the trash. At least hamsters aren't picky.", bought:false, displayed:false},
	{id:"c002", price:150, level:2, action:"add", value:1, upgradetype:"click", name:"Old Baby Crib", tag:"cage", description:"You bought it because they gave you a discount, even though you don't have a baby.", bought:false, displayed:false},
	{id:"c003", price:960, level:3, action:"add", value:2, upgradetype:"click", name:"Broken Fishtank", tag:"cage", description:"Now that this fishtank is broken, it won't hold any liquids anymore, but the sharp glass shards will hold your hamsters in place.", bought:false, displayed:false},
	{id:"c004", price:2460, level:4, action:"multiply", value:2, upgradetype:"click", name:"Home-made Cottage", tag:"cage", description:"You tried your best making this...cage... At least you made sure that the rusty nails keep the hamsters from getting out.", bought:false, displayed:false},
	{id:"c005", price:9990, level:5, action:"multiply", value:2, upgradetype:"click", name:"Barbed Wire Cage", tag:"cage", description:"Stolen from an old military base, this will definitly keep your hamsters in place.", bought:false, displayed:false},
	{id:"c006", price:16400, level:6, action:"multiply", value:2, upgradetype:"click", name:"Mime Wall", tag:"cage", description:"You can't see it, and you aren't quiet sure if there even is a wall at all, but MAN I love this trick!", bought:false, displayed:false},
	{id:"c007", price:37200, level:7, action:"multiply", value:2, upgradetype:"click", name:"Solid Concrete Walls", tag:"cage", description:"Even the old greeks knew thousands of years ago: No living being can walk through walls.", bought:false, displayed:false},
	{id:"c008", price:89400, level:8, action:"multiply", value:2, upgradetype:"click", name:"Cement Boots", tag:"cage", description:"'I just can't let you walk away like this, Luigi. You hurt the family, and for that you get these fancy shoes.", bought:false, displayed:false},

];

var foodupgrades = [
	{id:"f001", price:75, level:1 ,action:"add", value:1, upgradetype:"auto", name:"Bag of Universal Food", tag:"food", description:"Some universal food for everything that needs to eat. You don't know if it's healthy, but who cares?", bought:false, displayed:false},
	{id:"f002", price:375, level:2, action:"multiply", value:2, upgradetype:"auto", name:"Low Quality Food", tag:"food", description:"Not the best, but it's cheap. They eat it regardless.", bought:false, displayed:false},
	{id:"f003", price:1750, level:3, action:"multiply", value:2, upgradetype:"auto", name:"Rotten Lettuce", tag:"food", description:"They said organic food is healthier for animals. I bet they feel dumb now, huh?", bought:false, displayed:false},
	{id:"f004", price:7360, level:4, action:"multiply", value:2, upgradetype:"auto", name:"Greasy Fries", tag:"food", description:"These fries aren't actually old, they were sold just 5 minutes ago but the employees don't feel the need to make them fresh.", bought:false, displayed:false},
	{id:"f005", price:13337, level:5, action:"multiply", value:2, upgradetype:"auto", name:"Pepper Flavored Triangles", tag:"food", description:"The food of the elite. One triangle holds the power of 1.21 Gigawatts of energy.", bought:false, displayed:false},
	{id:"f006", price:34200, level:6, action:"multiply", value:2, upgradetype:"auto", name:"Bubble Gum", tag:"food", description:"The flavor lasts for about 20 seconds and after that it feels like chewing on an old car tire.", bought:false, displayed:false},
	{id:"f007", price:62500, level:7, action:"multiply", value:2, upgradetype:"auto", name:"Kentucky Grilled Turkey", tag:"food", description:"I can't believe that's not turkey! (Actually just consists of saw dust).", bought:false, displayed:false},
	{id:"f008", price:138000, level:8, action:"multiply", value:2, upgradetype:"auto", name:"Old Halloween Candy", tag:"food", description:"It actually tastes pretty good! I especially love that you can feel your teeth desintegrate from the sugar.", bought:false, displayed:false},

];

var drinkupgrades = [
	{id:"d001", price:125, level:1, action:"add", value:1, upgradetype:"auto", name:"Plepsi™ Soda", tag:"drink", description:"The cheapest lemonade you got at the store. Good that hamsters can't taste. Or can they?", bought:false, displayed:false},
	{id:"d002", price:650, level:2, action:"multiply", value:2, upgradetype:"auto", name:"Cheap Lemonade", tag:"drink", description:"Cheap lemonade you bought from a suspicious man behind a dumpster. As long as your hamsters have something to drink they shouldn't dehydrate.", bought:false, displayed:false},
	{id:"d003", price:2200, level:3, action:"multiply", value:2, upgradetype:"auto", name:"Spoiled Milk", tag:"drink", description:"Milk that clearly stood too long in the sun. Just call it Sour Cream and no one will complain about the taste.", bought:false, displayed:false},
	{id:"d004", price:10600, level:4, action:"multiply", value:2, upgradetype:"auto", name:"Coffee", tag:"drink", description:"Dark coffee you fished out of a trash can from McHamsters.", bought:false, displayed:false},
	{id:"d005", price:25750, level:5, action:"multiply", value:2, upgradetype:"auto", name:"Diet Plepsi™", tag:"drink", description:"'Diet' means it's healthier, right? 'No sugar' means 'Not unhealthy' right? RIGHT?", bought:false, displayed:false},
	{id:"d006", price:55800, level:6, action:"multiply", value:2, upgradetype:"auto", name:"Organic Pig Milk", tag:"drink", description:"This is the healthies drink in the world! Well... at least it says 'organic' so it has to be.", bought:false, displayed:false},
	{id:"d007", price:126000, level:7, action:"multiply", value:2, upgradetype:"auto", name:"Pumpkin Spice Soy Frappuccino", tag:"drink", description:"'My Pumpkin Spice Soy Frappuccino brings all the boys to the yard' -said no one ever because it's just a fashion drink.", bought:false, displayed:false},
	{id:"d008", price:267000, level:8, action:"multiply", value:2, upgradetype:"auto", name:"Hamster Energy", tag:"drink", description:"One can contains just as much energy as five atomic bombs that had too much sugar before bedtime.", bought:false, displayed:false},

];

var islandupgrades = [
	{id:"i001", price:10000, level:1, action:"maxhamsters", upgradetype:"other", value:200000, name:"Bigger Island", tag:"island", description:"Bigger island mean more space. More space means more hamsters. More hamsters means more upgrades.", bought:false, displayed:false},
	{id:"i002", price:200000, level:2, action:"maxhamsters", upgradetype:"other", value:5000000, name:"Forest Peninsula", tag:"island", description:"A nice little forest filled with wolves, tigers, bears, dragons, zombies, vampires and 100 meters tall laser dinosaurs for your hamsters to play in!.", bought:false, displayed:false},

];

function addNewUpgradesToShop() {
  var allupgrades = cageupgrades.concat(foodupgrades, drinkupgrades, islandupgrades);
  allupgrades.forEach(function(upgrade) {
	if ((upgrade.price <= totalhamstercount) && (upgrade.bought === false) && (upgrade.displayed === false)) {
		if (upgrade.level != 0) {
			if ((upgrade.tag == "cage") && (cagelevel != upgrade.level - 1)) {
				return;
			} else if ((upgrade.tag == "food") && (foodlevel != upgrade.level - 1)) {
				return;
			} else if ((upgrade.tag == "drink") && (drinklevel != upgrade.level - 1)) {
				return;
			} else if ((upgrade.tag == "island") && (islandlevel != upgrade.level - 1)) {
				return;
			}
		}
		upgrade.displayed = true;
		var upgradeelement = document.createElement("div");
			upgradeelement.className = "shop-upgrade shop-item shop-item-unbuyable shop-" + upgrade.tag + "-upgrade";
			upgradeelement.setAttribute("id", "upgrade_" + upgrade.id);
			upgradeelement.innerHTML = "<h1>" + upgrade.name + "</h1><h2>Costs: " + upgrade.price.toLocaleString() + " Hamsters</h2><p class='shop-item-icon' style='background-image: url(./pics/upgrades/" + upgrade.id + ".png)';'></p>";
			upgradeelement.onclick = function() {
				var index = this.id.replace('upgrade_','');
				var allupgrades = cageupgrades.concat(foodupgrades, drinkupgrades, islandupgrades);
				for (var i = 0; i < allupgrades.length; i++) {
					if (allupgrades[i].id == index) {
						var upgrade = allupgrades[i];
					}
				}
				if (hamstercount >= upgrade.price) {
					if (upgrade.upgradetype == "auto") {
						if (upgrade.action == "multiply") {
							basehamsterspersecond *= upgrade.value;
						} else if (upgrade.action == "add") {
							basehamsterspersecond += upgrade.value;
						}
					}
					if (upgrade.upgradetype == "click") {
						if (upgrade.action == "multiply") {
							hamstersperclick *= upgrade.value;
						} else if (upgrade.action == "add") {
							hamstersperclick += upgrade.value;
						}
					}
					if ((upgrade.upgradetype == "other") && (upgrade.action == "maxhamsters")) {
						hamstermaximum = upgrade.value;
						updateHamsterMaximum();
					}
					switch (upgrade.tag) {
					case "cage":
						cagelevel++;
						updateCageLevel();
						break;
					case "drink":
						drinklevel++;
						updateDrinkLevel();
						break;
					case "food":
						foodlevel++;
						updateFoodLevel();
						break;
					case "island":
						islandlevel++;
						updateIslandLevel();
						break;
					}
					increaseHamsters(-(upgrade.price));
					upgrade.bought = true;
					updateHPS();

					if (typeof document.getElementById("upgrade_info_box") !== "undefined") {
						var infobox = document.getElementById("upgrade_info_box");
						infobox.parentNode.removeChild(infobox);
					}
					var thiselement = document.getElementById(this.id);
					thiselement.parentNode.removeChild(thiselement);
				}
			}
			upgradeelement.onmouseenter = function() {
				var index = this.id.replace("upgrade_","");
				var allupgrades = cageupgrades.concat(foodupgrades, drinkupgrades, islandupgrades);
				for (var i = 0; i < allupgrades.length; i++) {
					if (allupgrades[i].id == index) {
						var upgrade = allupgrades[i];
					}
				}
				var action;
				if (upgrade.upgradetype == "auto") {
					if (upgrade.action == "multiply") {
						action = "Mulitplies your Hamsters per second by " + upgrade.value + ".";
					} else if (upgrade.action == "add") {
						action = "Adds " + upgrade.value + " to your current Hamsters per second.";
					}
				}
				if (upgrade.upgradetype == "click") {
					if (upgrade.action == "multiply") {
						action = "Mulitplies your hamsters per click by " + upgrade.value + ".";
					} else if (upgrade.action == "add") {
						action = "Adds " + upgrade.value + " to your current hamsters per click.";
					}
				}
				if (upgrade.action == "maxhamsters") {
					action = "Increases your max. amount of hamsters to " + upgrade.value.toLocaleString() + ".";
				}
				var upgradebox = document.getElementById("upgrade_" + upgrade.id);
				var upgradeposition = upgradebox.getBoundingClientRect();
				var infobox = document.createElement("div");
					infobox.setAttribute("id", "upgrade_info_box");
					infobox.innerHTML = "<h3>" + upgrade.description + "</h3><h4>" + action + "</h4>";
					infobox.style.cssText = "width:" + (upgradebox.clientWidth - 20) + "px;top:" + (upgradeposition.top - upgradebox.clientHeight) + "px;left:" + (upgradeposition.left + 5) + "px;";
				document.body.appendChild(infobox);
			}
			upgradeelement.onmouseleave = function() {
				var infobox = document.getElementById("upgrade_info_box");
				infobox.parentNode.removeChild(infobox);
			}
		document.getElementById("shop").appendChild(upgradeelement);
    }
  });
}

function checkForBuyableUpgrades() {
	var allupgrades = cageupgrades.concat(foodupgrades, drinkupgrades, islandupgrades);
	allupgrades.forEach(function(upgrade) {
		if ((upgrade.bought === false) && (upgrade.displayed === true) && (hamstercount >= upgrade.price)) {
			document.getElementById("upgrade_" + upgrade.id).classList.remove("shop-item-unbuyable");
		} else if ((upgrade.bought === false) && (upgrade.displayed === true) && (hamstercount < upgrade.price)) {
			document.getElementById("upgrade_" + upgrade.id).classList.add("shop-item-unbuyable");
		}
	});
}
