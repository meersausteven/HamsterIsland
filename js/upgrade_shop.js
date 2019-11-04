
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

var cageupgrades = [
	{id:"c001", price:50, level:1, action:"add", value:1, name:"Cardboard Box", tag:"cage", description:"An old cardboard box you found in the trash. At least hamsters aren't picky.", bought:false, displayed:false},
	{id:"c002", price:150, level:2, action:"add", value:1, name:"Old Baby Crib", tag:"cage", description:"You bought it because they gave you a discount, even though you don't have a baby.", bought:false, displayed:false},
	{id:"c003", price:960, level:3, action:"add", value:2, name:"Broken Fishtank", tag:"cage", description:"Now that this fishtank is broken, it won't hold any liquids anymore, but the sharp glass shards will hold your hamsters in place.", bought:false, displayed:false},
	{id:"c004", price:2460, level:4, action:"multiply", value:2, name:"Home-made Cottage", tag:"cage", description:"You tried your best making this...cage... At least you made sure that the rusty nails keep the hamsters from getting out.", bought:false, displayed:false},
	{id:"c005", price:9990, level:5, action:"multiply", value:2, name:"Barbed Wire Cage", tag:"cage", description:"Stolen from an old military base, this will definitly keep your hamsters in place.", bought:false, displayed:false},
	{id:"c006", price:16400, level:6, action:"multiply", value:2, name:"Mime Wall", tag:"cage", description:"You can't see it, and you aren't quiet sure if there even is a wall at all, but MAN I love this trick!", bought:false, displayed:false},
	{id:"c007", price:37200, level:7, action:"multiply", value:2, name:"Solid Concrete Walls", tag:"cage", description:"Even the old greeks knew thousands of years ago: No living being can walk through walls.", bought:false, displayed:false},
	{id:"c008", price:89400, level:8, action:"multiply", value:2, name:"Cement Boots", tag:"cage", description:"'I just can't let you walk away like this, Luigi. You hurt the family, and for that you get these fancy shoes.", bought:false, displayed:false},

];

var foodupgrades = [
	{id:"f001", price:75, level:1 ,action:"add", value:1, name:"Bag of Universal Food", tag:"food", description:"Some universal food for everything that needs to eat. You don't know if it's healthy, but who cares?", bought:false, displayed:false},
	{id:"f002", price:375, level:2, action:"multiply", value:2, name:"Low Quality Food", tag:"food", description:"Not the best, but it's cheap. They eat it regardless.", bought:false, displayed:false},
	{id:"f003", price:1750, level:3, action:"multiply", value:2, name:"Rotten Lettuce", tag:"food", description:"They said organic food is healthier for animals. I bet they feel dumb now, huh?", bought:false, displayed:false},
	{id:"f004", price:7360, level:4, action:"multiply", value:2, name:"Greasy Fries", tag:"food", description:"These fries aren't actually old, they were sold just 5 minutes ago but the employees don't feel the need to make them fresh.", bought:false, displayed:false},
	{id:"f005", price:13337, level:5, action:"multiply", value:2, name:"Pepper Flavored Triangles", tag:"food", description:"The food of the elite. One triangle holds the power of 1.21 Gigawatts of energy.", bought:false, displayed:false},
	{id:"f006", price:34200, level:6, action:"multiply", value:2, name:"Bubble Gum", tag:"food", description:"The flavor lasts for about 20 seconds and after that it feels like chewing on an old car tire.", bought:false, displayed:false},
	{id:"f007", price:62500, level:7, action:"multiply", value:2, name:"Kentucky Grilled Turkey", tag:"food", description:"I can't believe that's not turkey! (Actually just consists of saw dust).", bought:false, displayed:false},
	{id:"f008", price:138000, level:8, action:"multiply", value:2, name:"Old Halloween Candy", tag:"food", description:"It actually tastes pretty good! I especially love that you can feel your teeth desintegrate from the sugar.", bought:false, displayed:false},

];

var drinkupgrades = [
	{id:"d001", price:125, level:1, action:"add", value:1, name:"Plepsi� Soda", tag:"drink", description:"The cheapest lemonade you got at the store. Good that hamsters can't taste. Or can they?", bought:false, displayed:false},
	{id:"d002", price:650, level:2, action:"multiply", value:2, name:"Cheap Lemonade", tag:"drink", description:"Cheap lemonade you bought from a suspicious man behind a dumpster. As long as your hamsters have something to drink they shouldn't dehydrate.", bought:false, displayed:false},
	{id:"d003", price:2200, level:3, action:"multiply", value:2, name:"Spoiled Milk", tag:"drink", description:"Milk that clearly stood too long in the sun. Just call it Sour Cream and no one will complain about the taste.", bought:false, displayed:false},
	{id:"d004", price:10600, level:4, action:"multiply", value:2, name:"Coffee", tag:"drink", description:"Dark coffee you fished out of a trash can from McHamsters.", bought:false, displayed:false},
	{id:"d005", price:25750, level:5, action:"multiply", value:2, name:"Diet Plepsi�", tag:"drink", description:"'Diet' means it's healthier, right? 'No sugar' means 'Not unhealthy' right? RIGHT?", bought:false, displayed:false},
	{id:"d006", price:55800, level:6, action:"multiply", value:2, name:"Organic Pig Milk", tag:"drink", description:"This is the healthies drink in the world! Well... at least it says 'organic' so it has to be.", bought:false, displayed:false},
	{id:"d007", price:126000, level:7, action:"multiply", value:2, name:"Pumpkin Spice Soy Frappuccino", tag:"drink", description:"'My Pumpkin Spice Soy Frappuccino brings all the boys to the yard' -said no one ever because it's just a fashion drink.", bought:false, displayed:false},
	{id:"d008", price:267000, level:8, action:"multiply", value:2, name:"Hamster Energy", tag:"drink", description:"One can contains just as much energy as five atomic bombs that had too much sugar before bedtime.", bought:false, displayed:false},

];

var islandupgrades = [
	{id:"i001", price:10000, level:1, action:"maxhamsters", value:200000, name:"Bigger Island", tag:"island", description:"Bigger island mean more space. More space means more hamsters. More hamsters means more upgrades.", bought:false, displayed:false},
	{id:"i002", price:200000, level:2, action:"maxhamsters", value:5000000, name:"Forest Peninsula", tag:"island", description:"A nice little forest filled with wolves, tigers, bears, dragons, zombies, vampires and 100 meters tall laser dinosaurs for your hamsters to play in!.", bought:false, displayed:false},

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
					if ((upgrade.tag == "island") && (upgrade.action == "maxhamsters")) {
						hamstermaximum = upgrade.value;
						updateHamsterMaximum();
					} else if (upgrade.tag == "cage") {
						if (upgrade.action == "multiply") {
							hamstersperclick *= upgrade.value;
						} else if (upgrade.action == "add") {
							hamstersperclick += upgrade.value;
						}
					} else {
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
						action = "Mulitplies your Hamsters per second by " + upgrade.value + ".";
					} else if (upgrade.action == "add") {
						action = "Adds " + upgrade.value + " to your current Hamsters per second.";
					}
				}
				if (upgrade.tag == "cage") {
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