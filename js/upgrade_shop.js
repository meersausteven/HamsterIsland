
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
	{id:"c001", price:50, level:1, world: 0, action:"add", value:1, name:"Cardboard Box", tag:"cage", description:"Alternatively you could use an empty toilet paper roll.", bought:false, displayed:false},
	{id:"c002", price:150, level:2, world: 0, action:"add", value:2, name:"Small Hamster Stall", tag:"cage", description:"Keeps your hamsters dry from the rain. Even though you keep them inside.", bought:false, displayed:false},
	{id:"c003", price:2360, level:3, world: 0, action:"add", value:3, name:"Wooden House", tag:"cage", description:"A little wooden hamster house. Makes your hamsters feel at home.", bought:false, displayed:false},
	{id:"c004", price:6460, level:4, world: 0, action:"add", value:4, name:"Fancy Castle", tag:"cage", description:"With this hamster castle your little kritters will feel protected and secure.", bought:false, displayed:false},
	{id:"c005", price:14990, level:5, world: 0, action:"add", value:5, name:"Luxurious Palace", tag:"cage", description:"In this luxury class housing your hamsters will be pampered like real kings.", bought:false, displayed:false},
	//world 1 upgrades - City Park Lake
	{id:"c001", price:50, level:1, world: 1, action:"add", value:2, name:"Lily Pad Hat", tag:"cage", description:"This cute little lily pad hat protects your small friends from the rain. The hamsters kinda look like kappas that way.", bought:false, displayed:false},
	{id:"c002", price:150, level:2, world: 1, action:"add", value:2, name:"Leaf Tent", tag:"cage", description:"A small little tent made from fallen leafs you found in the Park.", bought:false, displayed:false},
	{id:"c003", price:960, level:3, world: 1, action:"add", value:5, name:"", tag:"cage", description:"", bought:false, displayed:false},
	{id:"c004", price:2460, level:4, world: 1, action:"add", value:5, name:"", tag:"cage", description:"", bought:false, displayed:false},
	{id:"c005", price:9990, level:5, world: 1, action:"add", value:7, name:"", tag:"cage", description:"", bought:false, displayed:false},
	// world 2 upgrades - 
];
// Food upgrades increase hamsters generated per second
var foodupgrades = [
	// world 0 upgrades - Pet Shop
	{id:"f001", price:75, level:1, world: 0, action:"add", value:1, name:"Basic Hamster Food", tag:"food", description:"Just normal hamster food. Nothing more. Nothing less.", bought:false, displayed:false},
	{id:"f002", price:375, level:2, world: 0, action:"add", value:1, name:"Dry Oats", tag:"food", description:"Oats are packed with carbohydrates and supply your hamsters with energy.", bought:false, displayed:false},
	{id:"f003", price:1750, level:3, world: 0, action:"add", value:1, name:"Dried Barley", tag:"food", description:"Barley contains a lot of vitamins, keeping your hamsters healthy!", bought:false, displayed:false},
	{id:"f004", price:7360, level:4, world: 0, action:"add", value:2, name:"Bag of Hazelnuts", tag:"food", description:"Nuts are essential for hamsters, supplying them with oils and fat.", bought:false, displayed:false},
	{id:"f005", price:13337, level:5, world: 0, action:"add", value:2, name:"Fresh Cucumber", tag:"food", description:"Fresh vegetables supply water and vitamins. Perfect for keeping your heamsters healthy.", bought:false, displayed:false},
	{id:"f006", price:34200, level:6, world: 0, action:"add", value:2, name:"Gammarus", tag:"food", description:"You had to google <b>Gammarus</b>, didn't you? It's like a water insect. Yes, hamsters eat that.", bought:false, displayed:false},
	{id:"f007", price:62500, level:7, world: 0, action:"add", value:3, name:"Fruit Salad", tag:"food", description:"Most people that breed hamsters would say that fruits are unhealthy because of their high amounts of sugar, but look at them go!", bought:false, displayed:false},
	{id:"f008", price:138000, level:8, world: 0, action:"add", value:5, name:"Onion Slices", tag:"food", description:"Onion Onion Onion Onion Onion Onion Onion Onion Onion Onion Onion Onion Onion Onion...", bought:false, displayed:false},
	//world 1 upgrades - City Park Lake
	{id:"f009", price:386000, level:1, world: 1, action:"add", value:1, name:"Bread Crumbs", tag:"food", description:"The elderly always think your hamsters are ducks, so they just keep throwing their bread.", bought:false, displayed:false},
	{id:"f010", price:523900, level:2, world: 1, action:"add", value:1, name:"Dry Buns", tag:"food", description:"Those seniors just keep throwing their baking goods at your hamsters. I already told them a hundred times to stop.", bought:false, displayed:false},
	{id:"f011", price:612700, level:3, world: 1, action:"add", value:2, name:"Fresh Crossaints", tag:"food", description:"Okay wow, this is just unreasonable now. What's wrong with old people, throwing baking goods in public lakes?!", bought:false, displayed:false},
	{id:"f012", price:768000, level:4, world: 1, action:"add", value:2, name:"Whole Breads", tag:"food", description:"COULD SOMEONE PLEASE TELL THOSE PENSIONEERS TO STOP THROWING STUFF IN THE LAKE?!?", bought:false, displayed:false},
	{id:"f013", price:1185125, level:5, world: 1, action:"add", value:3, name:"Cupcakes", tag:"food", description:"Alright. Just keep going. I'm not gonna even bother anymore.", bought:false, displayed:false},
	{id:"f014", price:2220000, level:6, world: 1, action:"add", value:3, name:"Unfinished Birthday Cakes", tag:"food", description:"...", bought:false, displayed:false},
	{id:"f015", price:5291000, level:7, world: 1, action:"add", value:5, name:"Mac 'n' Cheese Made With Love", tag:"food", description:"...", bought:false, displayed:false},
	{id:"f016", price:8230000, level:8, world: 1, action:"add", value:7, name:"Old Ladies", tag:"food", description:"Ok. Someone just shoved the old people in the lake. Well at least they stopped throwing food in the lake.", bought:false, displayed:false},
	// world 2 upgrades - 
];
// Drink upgrades increase hamsters generated per second
var drinkupgrades = [
	// world 0 upgrades - Pet Shop
	{id:"d001", price:125, level:1, world: 0, action:"add", value:1, name:"Water", tag:"drink", description:"Just basic tap water. You gotta start somewhere.", bought:false, displayed:false},
	{id:"d002", price:650, level:2, world: 0, action:"add", value:1, name:"Mineral Water", tag:"drink", description:"Mineral water drawn from a fountain on top of a volcano. Healthy and refreshing!", bought:false, displayed:false},
	{id:"d003", price:2200, level:3, world: 0, action:"add", value:1, name:"Camomile Tea", tag:"drink", description:"Cooled down camomile tea keeps your hamsters healthy and hydrated.", bought:false, displayed:false},
	{id:"d004", price:10600, level:4, world: 0, action:"add", value:2, name:"Rose Hip Tea", tag:"drink", description:"Everybode prefers Rose hip over camomile, right? Your hamsters probably do so as well.", bought:false, displayed:false},
	{id:"d005", price:25750, level:5, world: 0, action:"add", value:2, name:"Peppermint Tea", tag:"drink", description:"Peppermint tea is perfect when you are having a cold; so when you are already healthy it should be even better!", bought:false, displayed:false},
	{id:"d006", price:55800, level:6, world: 0, action:"add", value:2, name:"Almond Milk", tag:"drink", description:"Tastes just like regular milk, but without the stress hormones and antibiotics.", bought:false, displayed:false},
	{id:"d007", price:126000, level:7, world: 0, action:"add", value:3, name:"Apple Juice", tag:"drink", description:"Sweet sweet apple juice. The kids love it and the hamsters run faster because of the sugar!", bought:false, displayed:false},
	{id:"d008", price:267000, level:8, world: 0, action:"add", value:5, name:"Plepsi Soda", tag:"drink", description:"Soda with 90% sugar makes your hamsters run at the speed of sound. Any faster and they'll turn blue and start collecting rings.", bought:false, displayed:false},
	//world 1 upgrades - City Park Lake
	{id:"d009", price:406900, level:1, world: 1, action:"add", value:1, name:"", tag:"drink", description:"", bought:false, displayed:false},
	{id:"d010", price:637000, level:2, world: 1, action:"add", value:1, name:"", tag:"drink", description:"", bought:false, displayed:false},
	{id:"d011", price:721960, level:3, world: 1, action:"add", value:2, name:"", tag:"drink", description:"", bought:false, displayed:false},
	{id:"d012", price:987000, level:4, world: 1, action:"add", value:2, name:"", tag:"drink", description:"", bought:false, displayed:false},
	{id:"d013", price:1645000, level:5, world: 1, action:"add", value:3, name:"", tag:"drink", description:"", bought:false, displayed:false},
	{id:"d014", price:3030303, level:6, world: 1, action:"add", value:3, name:"", tag:"drink", description:"", bought:false, displayed:false},
	{id:"d015", price:7777777, level:7, world: 1, action:"add", value:5, name:"", tag:"drink", description:"", bought:false, displayed:false},
	{id:"d016", price:9130000, level:8, world: 1, action:"add", value:7, name:"", tag:"drink", description:"", bought:false, displayed:false},
	// world 2 upgrades - 
];
// Island upgrades increase maximum amount of hamsters currently allowed
var islandupgrades = [
	// world 0 upgrades - Pet Shop
	{id:"i001", price:10000, level:1, world: 0, action:"add", value:7500, name:"Medium Cage", tag:"island", description:"A medium sized cage. Barely big enough for a small family of hamsters.", bought:false, displayed:false},
	{id:"i002", price:17500, level:2, world: 0, action:"add", value:16500, name:"Big Cage", tag:"island", description:"A big cage. It even fits your hamsters' parent in-laws!", bought:false, displayed:false},
	{id:"i003", price:34000, level:3, world: 0, action:"add", value:36000, name:"Large Cage", tag:"island", description:"A large cage. Large enough to house huge quantities of hamsters.", bought:false, displayed:false},
	{id:"i004", price:70000, level:4, world: 0, action:"add", value:80000, name:"Deluxe Cage", tag:"island", description:"The deluxe model. An entire town of hamsters could live in there!", bought:false, displayed:false},
	{id:"i005", price:150000, level:5, world: 0, action:"multiply", value:2, name:"Ultra Supreme Cage", tag:"island", description:"The best of the best. The enitre earth population of hamsters could fit in there!", bought:false, displayed:false},
	// world 1 upgrades - City Park Lake
	{id:"i006", price:300000, level:1, world: 1, action:"add", value:200000, name:"Small Lily Pads", tag:"island", description:"These lily pads will keep your hamsters afloat on the lake surface.", bought:false, displayed:false},
	{id:"i007", price:500000, level:2, world: 1, action:"add", value:350000, name:"Big Lily Pads", tag:"island", description:"Big lily pads that help your hamsters stay dry.", bought:false, displayed:false},
	{id:"i008", price:850000, level:3, world: 1, action:"add", value:425000, name:"Single Lotus Blad", tag:"island", description:"Bigger than any lily pads in the lake.", bought:false, displayed:false},
	{id:"i009", price:1275000, level:4, world: 1, action:"add", value:725000, name:"Mutliple Lotus Blads", tag:"island", description:"Even bigger lotus blads for all your hamsters.", bought:false, displayed:false},
	{id:"i010", price:2000000, level:5, world: 1, action:"multiply", value:5, name:"Victoria Lotus Leaves", tag:"island", description:"The world's biggest lotus leaves, keeping your hamsters from drowning.", bought:false, displayed:false},
	// world 2 upgrades - 
];
// Hamster upgrades increase hamsters per click 
var hamsterupgrades = [
	// world 0 upgrades - Pet Shop
	{id:"h001", price:13000, level:1, world: 0, action:"add", value:5, name:"Syrian Hamster", tag:"hamster", description:"The syrian hamster is very popular because of their soft fur.", bought:false, displayed:false},
	{id:"h002", price:78500, level:2, world: 0, action:"add", value:10, name:"Chinese Hamster", tag:"hamster", description:"The stripes of the chinese hamsters are the same with race cars. They make them go faster.", bought:false, displayed:false},
	{id:"h003", price:215000, level:3, world: 0, action:"add", value:25, name:"Golden Hamster", tag:"hamster", description:"As a kid I always thought golden hamsters are made of gold. Oh well, maybe in the future...", bought:false, displayed:false},
	// world 1 upgrades - City Park Lake
	{id:"h004", price:645000, level:1, world: 1, action:"add", value:15, name:"Water Hamster", tag:"hamster", description:"Your hamsters DNA mutated from living on the water the whole time. They even grew floating skins.", bought:false, displayed:false},
	{id:"h005", price:1850000, level:2, world: 1, action:"add", value:20, name:"Duck Hamster", tag:"hamster", description:"Somehow, I don't know how that hell that happened, your hamsters crossbred with ducks. You got hamster-duck hybrids now.", bought:false, displayed:false},
	{id:"h006", price:7550000, level:3, world: 1, action:"add", value:35, name:"Pensioneer Hamster", tag:"hamster", description:"They observed the grannies that fed your hamsters very carefully and now turned to grannies themselves.", bought:false, displayed:false},
	// world 2 upgrades - 
	
];
// World upgrades unlock new upgrades (new world starts with small island but same amount of max. hamsters. New design/theme for upgrades)
var worldupgrades = [
	{id: "w01", price: 300000, level: 1, name:"City Park Lake", tag:"world", description:"Taking your hamsters out for some fresh air is a brilliant idea!", bought: false, displayed: false},
	{id: "w02", price: 10000000, level: 2, name:"Underground Sanctuary", tag:"world", description:"Deep down under your hamsters will be safe from any predators, I think.", bought: false, displayed: false},
	{id: "w03", price: 99999999999, level: 3, name:"Bermuda Triangle", tag:"world", description:"Ohhh, so the hamsters were responsible for all the ships and airplanes vanishing near the Bermuda Triangle...", bought: false, displayed: false},
	{id: "w04", price: 9999999999999, level: 4, name:"Candy Land", tag:"world", description:"In this literal paradise your hamsters can live in harmony and diabetes.", bought: false, displayed: false},

];

function addNewUpgradesToShop() {
  var allupgrades = cageupgrades.concat(foodupgrades, drinkupgrades, islandupgrades, worldupgrades, hamsterupgrades);
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
				var allupgrades = cageupgrades.concat(foodupgrades, drinkupgrades, islandupgrades, worldupgrades, hamsterupgrades);
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
						hamsterlevel = 0;
						foodlevel = 0;
						drinklevel = 0;
						islandlevel = 0;
						updateIslandLevel();
						cagelevel = 0;
						updateCageLevel();
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
				var allupgrades = cageupgrades.concat(foodupgrades, drinkupgrades, islandupgrades, worldupgrades, hamsterupgrades);
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
				} else if (upgrade.tag == "cage" ||upgrade.tag == "hamster") {
					if (upgrade.action == "multiply") {
						action = "Increases your hamsters generated per click by " + upgrade.value + " times.";
					} else if (upgrade.action == "add") {
						action = "Increases your hamsters generated per click by " + upgrade.value + ".";
					}
				} else if (upgrade.tag == "island") {
					action = "Increases your max. amount of hamsters to " + upgrade.value.toLocaleString() + ".";
				} else if (upgrade.tag == "world") {
					action = "Sends your hamsters to a new world with new upgrades. You will keep all your already bought upgrades.";
				} else {
					// something went wrong, upgrade.tag not known
					action = "Error: Unknown upgrade-tag. If you see this, please tell the developer.";
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
	var allupgrades = cageupgrades.concat(foodupgrades, drinkupgrades, islandupgrades, worldupgrades, hamsterupgrades);
	allupgrades.forEach(function(upgrade) {
		if ((upgrade.bought === false) && (upgrade.displayed === true) && (hamstercount >= upgrade.price)) {
			document.getElementById("upgrade_" + upgrade.id).classList.remove("shop-item-unbuyable");
		} else if ((upgrade.bought === false) && (upgrade.displayed === true) && (hamstercount < upgrade.price)) {
			document.getElementById("upgrade_" + upgrade.id).classList.add("shop-item-unbuyable");
		}
	});
}
