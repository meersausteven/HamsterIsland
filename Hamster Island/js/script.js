window.onload = function() {

	updateCageLevel();
	updateIslandLevel();
	updateDrinkLevel();
	updateFoodLevel();

}

	//=================
	//    Variables
	//=================

var totalhamstercount = 0;
var hamstercount = 0;
var hamstersperclick = 1;
var hamsterspersecond = 0;
var hamstermaximum = 10000;
var cagelevel = 0, islandlevel = 0, foodlevel = 0, drinklevel = 0;


	//============================
	//         Functions
	//============================

function updateHPS() {
	hpscounter = document.getElementById("hps_display");
	hpscounter.innerHTML = hamsterspersecond.toLocaleString() + " H/s";
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
	var increasecounter_interval = setInterval(increaseCounter, 15);
	var i = 0;
		function increaseCounter() {
			if (i == 15) {
				clearInterval(increaseCounter);
			} else {
				i++;
				hamstercount += amount / 15;
				if (amount > 0) {
					totalhamstercount += amount / 15;
				}
				document.getElementById("counter").innerHTML = Math.round(hamstercount).toLocaleString() + " Hamsters";
			}
		}
	}
	addNewUpgradesToShop();
	checkForBuyableUpgrades();
}

var hamsterspersecond_interval = setInterval(hamstersPerSecond, 10);

function hamstersPerSecond() {
  increaseHamsters(hamsterspersecond / 100);
}

document.getElementById("hamster_cage").addEventListener("click", cageClick);

function cageClick(e) {
  increaseHamsters(hamstersperclick);

	// create a particle with each click and move it in a random direction
  var particle = new Particle();
	var particleClass = document.querySelector(".particle");
	var particleStyle = getComputedStyle(particleClass);console.log(particleStyle.top);
	var particleStyleTop = parseFloat(particleStyle.top.replace("px", ""));
	var particleStyleLeft = parseFloat(particleStyle.left.replace("px", ""));
	particle.element.style.cssText = "top: " + (particleStyleTop + particle.posY) + "px; left: " + (particleStyleLeft + particle.posX) + "px; opacity: 0;";
	//console.log( (double particle.posY) + " - - "+ particleStyleTop +" | " + (double) particle.posX +" - - "+particleStyleLeft);
	// create a node that displays the clicked hamsters
	var clickedhamsters = new ClickedHamsters(e);
	clickedhamsters.element.style.cssText = "top: " + (clickedhamsters.posY - 100) + "px; left: " + clickedhamsters.posX + "px; opacity: 0;";
	//console.log(clickedhamsters.posY + " -> " + (clickedhamsters.posY-100) + "  x: " + clickedhamsters.posX);
}

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

		//setTimeout(function() {this.delete()}.bind(this), 1000);
	}
	delete() {
		document.body.removeChild(this.element);
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

	//===============================
	// display upgrades if available
	//===============================

	// Upgrade names max. 3 word  each 12 letters
	// Upgrade description max. 160 letters

var cageupgrades = [
	{id:"c001", price:50, level:1, action:"add", value:1, upgradetype:"click", name:"Cardboard Box", tag:"cage", description:"An old cardboard box you found in the trash. At least hamsters aren't picky.", bought:false, displayed:false},
	{id:"c002", price:150, level:2, action:"add", value:1, upgradetype:"click", name:"Old Baby Crib", tag:"cage", description:"You bought it because they gave you a discount, even though you don't have a baby.", bought:false, displayed:false},
	{id:"c003", price:450, level:3, action:"add", value:2, upgradetype:"click", name:"Broken Fishtank", tag:"cage", description:"Now that this fishtank is broken, it won't hold any liquids anymore, but the sharp glass shards will hold your hamsters in place.", bought:false, displayed:false},
	{id:"c004", price:960, level:4, action:"multiply", value:2, upgradetype:"click", name:"Home-made Cottage", tag:"cage", description:"You tried your best making this...cage... At least you made sure that the rusty nails keep the hamsters from getting out.", bought:false, displayed:false},
	{id:"c005", price:1600, level:5, action:"multiply", value:2, upgradetype:"click", name:"Barbed Wire Cage", tag:"cage", description:"Stolen from an old military base, this will definitly keep your hamsters in place.", bought:false, displayed:false},

];

var foodupgrades = [
	{id:"f001", price:75, level:1 ,action:"add", value:1, upgradetype:"auto", name:"Bag of Universal Food", tag:"food", description:"Some universal food for everything that needs to eat. You don't know if it's healthy, but who cares?", bought:false, displayed:false},
	{id:"f002", price:375, level:2, action:"multiply", value:2, upgradetype:"auto", name:"Low Quality Food", tag:"food", description:"Not the best, but it's cheap. They eat it regardless.", bought:false, displayed:false},
	{id:"f003", price:800, level:3, action:"multiply", value:2, upgradetype:"auto", name:"Rotten Lettuce", tag:"food", description:"They said organic food is healthier for animals. I bet they feel dumb now, huh?", bought:false, displayed:false},
	{id:"f003", price:1750, level:4, action:"multiply", value:2, upgradetype:"auto", name:"Greasy Fries", tag:"food", description:"These fries aren't actually old, they were sold just 5 minutes ago but the employees don't feel the need to make them fresh.", bought:false, displayed:false},

];

var drinkupgrades = [
	{id:"d001", price:125, level:1, action:"add", value:1, upgradetype:"auto", name:"Plepsi™ Soda", tag:"drink", description:"The cheapest lemonade you got at the store. Good that hamsters can't taste. Or can they?", bought:false, displayed:false},
	{id:"d002", price:650, level:2, action:"multiply", value:2, upgradetype:"auto", name:"Cheap Lemonade", tag:"drink", description:"Cheap lemonade you bought from a suspicious man behind a dumpster. As long as your hamsters have something to drink they shouldn't dehydrate.", bought:false, displayed:false},
	{id:"d003", price:1100, level:3, action:"multiply", value:2, upgradetype:"auto", name:"Spoiled Milk", tag:"drink", description:"Milk that clearly stood too long in the sun. Just call it Sour Cream and no one will complain about the taste.", bought:false, displayed:false},
	{id:"d004", price:2000, level:4, action:"multiply", value:2, upgradetype:"auto", name:"Coffee", tag:"drink", description:"Dark coffee you fished out of a trash can from McHamsters.", bought:false, displayed:false},

];

var islandupgrades = [
	{id:"i001", price:10000, level:1, action:"maxhamsters", upgradetype:"other", value:200000, name:"Bigger Island", tag:"island", description:"Bigger island mean more space. More space means more hamsters. More hamsters means more upgrades.", bought:false, displayed:false},

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
							hamsterspersecond *= upgrade.value;
						} else if (upgrade.action == "add") {
							hamsterspersecond += upgrade.value;
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
