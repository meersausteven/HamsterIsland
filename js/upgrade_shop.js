
 // open / close the shop menu

document.getElementById("toggle_shop_button").addEventListener("click", toggleShop);

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

// Cage upgrades increase hamsters per click 
var cageupgrades = [
	// world 0 upgrades - Pet Shop
	{id:"c001", price:50, level:1, world: 0, action:"add", value:1, name:"", tag:"cage", description:"An old cardboard box you found in the trash. At least hamsters aren't picky.", bought:false, displayed:false},
	{id:"c002", price:150, level:2, world: 0, action:"add", value:2, name:"", tag:"cage", description:"You bought it because they gave you a discount, even though you don't have a baby.", bought:false, displayed:false},
	{id:"c003", price:960, level:3, world: 0, action:"add", value:3, name:"", tag:"cage", description:"Now that this fishtank is broken, it won't hold any liquids anymore, but the sharp glass shards will hold your hamsters in place.", bought:false, displayed:false},
	{id:"c004", price:2460, level:4, world: 0, action:"add", value:4, name:"", tag:"cage", description:"You tried your best making this...cage... At least you made sure that the rusty nails keep the hamsters from getting out.", bought:false, displayed:false},
	{id:"c005", price:9990, level:5, world: 0, action:"add", value:5, name:"", tag:"cage", description:"Stolen from an old military base, this will definitly keep your hamsters in place.", bought:false, displayed:false},
	//world 1 upgrades - 
];
// Food upgrades increase hamsters generated per second
var foodupgrades = [
	// world 0 upgrades - Pet Shop
	{id:"f001", price:75, level:1, world: 0, action:"add", value:1, name:"Basic Hamster Food", tag:"food", description:"", bought:false, displayed:false},
	{id:"f002", price:375, level:2, world: 0, action:"add", value:1, name:"Dry Oats", tag:"food", description:"", bought:false, displayed:false},
	{id:"f003", price:1750, level:3, world: 0, action:"add", value:1, name:"Dried Barley", tag:"food", description:"", bought:false, displayed:false},
	{id:"f004", price:7360, level:4, world: 0, action:"add", value:2, name:"Bag of Hazelnuts", tag:"food", description:"", bought:false, displayed:false},
	{id:"f005", price:13337, level:5, world: 0, action:"add", value:2, name:"Fresh Cucumber", tag:"food", description:"", bought:false, displayed:false},
	{id:"f006", price:34200, level:6, world: 0, action:"add", value:2, name:"Gammarus", tag:"food", description:"", bought:false, displayed:false},
	{id:"f007", price:62500, level:7, world: 0, action:"add", value:3, name:"Fruit Basket", tag:"food", description:"", bought:false, displayed:false},
	{id:"f008", price:138000, level:8, world: 0, action:"add", value:5, name:"Onion Slices", tag:"food", description:"", bought:false, displayed:false},
	//world 1 upgrades -
];
// Drink upgrades increase hamsters generated per second
var drinkupgrades = [
	// world 0 upgrades - Pet Shop
	{id:"d001", price:125, level:1, world: 0, action:"add", value:1, name:"Water", tag:"drink", description:"", bought:false, displayed:false},
	{id:"d002", price:650, level:2, world: 0, action:"add", value:1, name:"Mineral Water", tag:"drink", description:"", bought:false, displayed:false},
	{id:"d003", price:2200, level:3, world: 0, action:"add", value:1, name:"Camomile Tea", tag:"drink", description:"", bought:false, displayed:false},
	{id:"d004", price:10600, level:4, world: 0, action:"add", value:2, name:"Rose Hip Tea", tag:"drink", description:"", bought:false, displayed:false},
	{id:"d005", price:25750, level:5, world: 0, action:"add", value:2, name:"Peppermint Tea", tag:"drink", description:"", bought:false, displayed:false},
	{id:"d006", price:55800, level:6, world: 0, action:"add", value:2, name:"Fresh Milk", tag:"drink", description:"", bought:false, displayed:false},
	{id:"d007", price:126000, level:7, world: 0, action:"add", value:3, name:"Apple Juice", tag:"drink", description:"", bought:false, displayed:false},
	{id:"d008", price:267000, level:8, world: 0, action:"add", value:5, name:"Plepsi Soda", tag:"drink", description:"", bought:false, displayed:false},
	//world 1 upgrades
];
// Island upgrades increase maximum amount of hamsters currently allowed
var islandupgrades = [
	// world 0 upgrades - Pet Shop
	{id:"i001", price:10000, level:1, world: 0, action:"add", value:7500, name:"Medium Cage", tag:"island", description:"A medium sized cage. Barely big enough for a small family of hamsters.", bought:false, displayed:false},
	{id:"i002", price:17500, level:2, world: 0, action:"add", value:16500, name:"Big Cage", tag:"island", description:"A big cage. It even fits your hamsters' parent in-laws!", bought:false, displayed:false},
	{id:"i003", price:34000, level:3, world: 0, action:"add", value:36000, name:"Large Cage", tag:"island", description:"A large cage. Large enough to house huge quantities of hamsters.", bought:false, displayed:false},
	{id:"i004", price:70000, level:4, world: 0, action:"add", value:80000, name:"Deluxe Cage", tag:"island", description:"The deluxe model. An entire town of hamsters could live in there!", bought:false, displayed:false},
	{id:"i005", price:150000, level:5, world: 0, action:"multiply", value:2, name:"Ultra Supreme Cage", tag:"island", description:"The best of the best. The enitre earth population of hamsters could fit in there!", bought:false, displayed:false},
	// world 1 upgrades -
];
// World upgrades unlock new upgrades (new world starts with small island but same amount of max. hamsters)
var worldupgrades = [
	{id: "w01", price: 300000, level: 1, name:"City Park Lake", tag:"world", description:"Taking your hamsters out for some fresh air is a brilliant idea!", bought: false, displayed: false},
	{id: "w02", price: 999999, level: 2,  name:"Underground Sanctuary", tag:"world", description:"Deep down under your hamsters will be safe from any predators, I think.", bought: false, displayed: false},
	{id: "w03", price: 9999999, level: 3,  name:"Forsaken Island", tag:"world", description:"Lonely islands always imply peace... and incest.", bought: false, displayed: false},
	{id: "w04", price: 99999999, level: 4,  name:"Candy Land", tag:"world", description:"In this literal paradise your hamsters can live in harmony and diabetes.", bought: false, displayed: false},

];
// Cage upgrades increase hamsters per click 
var hamsterupgrades = [
	// world 0 upgrades - Pet Shop
	{id:"h001", price:6969, level:1, world: 0, action:"add", value:5, name:"Syrian Hamster", tag:"hamster", description:"Bigger island mean more space. More space means more hamsters. More hamsters means more upgrades.", bought:false, displayed:false},
	{id:"h002", price:256000, level:2, world: 0, action:"add", value:10, name:"Chinese Hamster", tag:"hamster", description:"Bigger island mean more space. More space means more hamsters. More hamsters means more upgrades.", bought:false, displayed:false},
	{id:"h003", price:9999999, level:3, world: 0, action:"add", value:25, name:"Golden Hamster", tag:"hamster", description:"Bigger island mean more space. More space means more hamsters. More hamsters means more upgrades.", bought:false, displayed:false},
	// world 1 upgrades -
	
];

function addNewUpgradesToShop() {
  var allupgrades = cageupgrades.concat(foodupgrades, drinkupgrades, islandupgrades);
  allupgrades.forEach(function(upgrade) {
	if ((upgrade.price <= totalhamstercount) && (upgrade.bought === false) && (upgrade.displayed === false)) {
		if ( (upgrade.level != 0) && (upgrade.tag != "world") && (upgrade.world == worldlevel) ) {
			if ((upgrade.tag == "cage") && (cagelevel != upgrade.level - 1)) {
				return;
			} else if ((upgrade.tag == "food") && (foodlevel != upgrade.level - 1)) {
				return;
			} else if ((upgrade.tag == "drink") && (drinklevel != upgrade.level - 1)) {
				return;
			} else if ((upgrade.tag == "island") && (islandlevel != upgrade.level - 1)) {
				return;
			} else if ((upgrade.tag == "hamster") && (hamsterlevel != upgrade.level - 1)) {
				return;
			}
		} else if ( (upgrade.level != 0) && (upgrade.tag == "world") && (upgrade.level != worldlevel + 1) ) {
			return;
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
					if (upgrade.tag == "island") {
						if (upgrade.action == "add") {
							hamstermaximum += upgrade.value;
							updateHamsterMaximum();
						} else if (upgrade.action == "multiply") {
							hamstermaximum *= upgrade.value;
							updateHamsterMaximum();
						}
					} else if (upgrade.tag == "cage" || upgrade.tag == "hamster") {
						if (upgrade.action == "multiply") {
							hamstersperclick *= upgrade.value;
						} else if (upgrade.action == "add") {
							hamstersperclick += upgrade.value;
						}
					} else if (upgrade.tag == "drink" || upgrade.tag == "food") {
						increaseHPS(upgrade.value, upgrade.action);
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
					case "hamster":
						hamsterlevel++;
						updateHamsterLevel();
						break;
					case "world":
						worldlevel++;
						updateWorldLevel();
						break;
					}
					increaseHamsters(-(upgrade.price));
					upgrade.bought = true;
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
				if (upgrade.tag == "food" || upgrade.tag == "drink") {
					if (upgrade.action == "multiply") {
						action = "Increases your hamsters generated per second by " + upgrade.value + " times.";
					} else if (upgrade.action == "add") {
						action = "Increases your hamsters generated per second by " + upgrade.value + ".";
					}
				}
				if (upgrade.tag == "cage" ||upgrade.tag == "hamster") {
					if (upgrade.action == "multiply") {
						action = "Increases your hamsters generated per click by " + upgrade.value + " times.";
					} else if (upgrade.action == "add") {
						action = "Increases your hamsters generated per click by " + upgrade.value + ".";
					}
				}
				if (upgrade.tag == "island") {
					action = "Increases your max. amount of hamsters to " + upgrade.value.toLocaleString() + ".";
				}
				if (upgrade.tag == "world") {
						
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
