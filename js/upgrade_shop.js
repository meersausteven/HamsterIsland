
 // open / close the shop menu

document.getElementById("shop_button").addEventListener("click", toggleShop);

var shopopen = false;

function toggleShop() {
	var shopButton = document.getElementById("shop_button");
	var shopItemCounter = document.getElementById("shop_button_item_count");
	var shop = document.getElementById("shop");
	if (shopopen === true) {
		shop.classList.remove("shop-open");
		shop.classList.add("shop-buying-impossible");
		shopButton.classList.remove("shop-open-button");
		shopItemCounter.classList.remove("shop-open-button");
		shopButton.innerHTML = "OPEN SHOP";
		shopopen = false;
	} else {
		shop.classList.add("shop-open");
		shop.classList.remove("shop-buying-impossible");
		shopButton.classList.add("shop-open-button");
		shopItemCounter.classList.add("shop-open-button");
		shopButton.innerHTML = "CLOSE SHOP";
		shopopen = true;
	}
}

	//===============================
	// display upgrades if available
	//===============================

	// Upgrade names max. 3 word  each 12 letters
	// Upgrade description max. 160 letters

// Housing upgrades increase hamsters per click 
var housingupgrades = [
	// world 0 upgrades - Pet Shop
	{id:"c000", price:0, level:0, world: 0, action:"none", value:0, name:"Nothing", tag:"housing", description:"-", displayed:true},
	{id:"c001", price:50, level:1, world: 0, action:"add", value:1, name:"Cardboard Box", tag:"housing", description:"Alternatively you could use an empty toilet paper roll.", displayed:false},
	{id:"c002", price:150, level:2, world: 0, action:"add", value:2, name:"Small Hamster Stall", tag:"housing", description:"Keeps your hamsters dry from the rain. Even though you keep them inside.", displayed:false},
	{id:"c003", price:2360, level:3, world: 0, action:"add", value:3, name:"Wooden House", tag:"housing", description:"A little wooden hamster house. Makes your hamsters feel at home.", displayed:false},
	{id:"c004", price:6460, level:4, world: 0, action:"add", value:4, name:"Fancy Castle", tag:"housing", description:"With this hamster castle your little kritters will feel protected and secure.", displayed:false},
	{id:"c005", price:14990, level:5, world: 0, action:"add", value:5, name:"Luxurious Palace", tag:"housing", description:"In this luxury class housing your hamsters will be pampered like real kings.", displayed:false},
	//world 1 upgrades - City Park Lake
	{id:"c006", price:50, level:1, world: 1, action:"add", value:2, name:"Lily Pad Hat", tag:"housing", description:"This cute little lily pad hat protects your small friends from the rain. The hamsters kinda look like kappas that way.", displayed:false},
	{id:"c007", price:150, level:2, world: 1, action:"add", value:2, name:"Leaf Tent", tag:"housing", description:"A small little tent made from fallen leafs you found in the Park.", displayed:false},
	{id:"c008", price:960, level:3, world: 1, action:"add", value:5, name:"", tag:"housing", description:"", displayed:false},
	{id:"c009", price:2460, level:4, world: 1, action:"add", value:5, name:"", tag:"housing", description:"", displayed:false},
	{id:"c010", price:9990, level:5, world: 1, action:"add", value:7, name:"", tag:"housing", description:"", displayed:false},
	// world 2 upgrades - 
];
// Food upgrades increase hamsters generated per second
var foodupgrades = [
	// world 0 upgrades - Pet Shop
	{id:"f000", price:0, level:0, world: 0, action:"none", value:0, name:"Nothing", tag:"food", description:"-", displayed:true},
	{id:"f001", price:75, level:1, world: 0, action:"add", value:1, name:"Basic Hamster Food", tag:"food", description:"Just normal hamster food. Nothing more. Nothing less.", displayed:false},
	{id:"f002", price:375, level:2, world: 0, action:"add", value:1, name:"Dry Oats", tag:"food", description:"Oats are packed with carbohydrates and supply your hamsters with energy.", displayed:false},
	{id:"f003", price:1750, level:3, world: 0, action:"add", value:1, name:"Dried Barley", tag:"food", description:"Barley contains a lot of vitamins, keeping your hamsters healthy!", displayed:false},
	{id:"f004", price:7360, level:4, world: 0, action:"add", value:2, name:"Bag of Hazelnuts", tag:"food", description:"Nuts are essential for hamsters, supplying them with oils and fat.", displayed:false},
	{id:"f005", price:13337, level:5, world: 0, action:"add", value:2, name:"Fresh Cucumber", tag:"food", description:"Fresh vegetables supply water and vitamins. Perfect for keeping your heamsters healthy.", displayed:false},
	{id:"f006", price:34200, level:6, world: 0, action:"add", value:2, name:"Gammarus", tag:"food", description:"You had to google <b>Gammarus</b>, didn't you? It's like a water insect. Yes, hamsters eat that.", displayed:false},
	{id:"f007", price:62500, level:7, world: 0, action:"add", value:3, name:"Fruit Salad", tag:"food", description:"Most people that breed hamsters would say that fruits are unhealthy because of their high amounts of sugar, but look at them go!", displayed:false},
	{id:"f008", price:138000, level:8, world: 0, action:"add", value:5, name:"Onion Slices", tag:"food", description:"Onion Onion Onion Onion Onion Onion Onion Onion Onion Onion Onion Onion Onion Onion...", displayed:false},
	//world 1 upgrades - City Park Lake
	{id:"f009", price:386000, level:1, world: 1, action:"add", value:1, name:"Bread Crumbs", tag:"food", description:"The elderly always think your hamsters are ducks, so they just keep throwing their bread.", displayed:false},
	{id:"f010", price:523900, level:2, world: 1, action:"add", value:1, name:"Dry Buns", tag:"food", description:"Those seniors just keep throwing their baking goods at your hamsters. I already told them a hundred times to stop.", displayed:false},
	{id:"f011", price:612700, level:3, world: 1, action:"add", value:2, name:"Fresh Crossaints", tag:"food", description:"Okay wow, this is just unreasonable now. What's wrong with old people, throwing baking goods in public lakes?!", displayed:false},
	{id:"f012", price:768000, level:4, world: 1, action:"add", value:2, name:"Whole Breads", tag:"food", description:"COULD SOMEONE PLEASE TELL THOSE PENSIONEERS TO STOP THROWING STUFF IN THE LAKE?!?", displayed:false},
	{id:"f013", price:1185125, level:5, world: 1, action:"add", value:3, name:"Cupcakes", tag:"food", description:"Alright. Just keep going. I'm not gonna even bother anymore.", displayed:false},
	{id:"f014", price:2220000, level:6, world: 1, action:"add", value:3, name:"Unfinished Birthday Cakes", tag:"food", description:"...", displayed:false},
	{id:"f015", price:5291000, level:7, world: 1, action:"add", value:5, name:"Mac 'n' Cheese Made With Love", tag:"food", description:"...", displayed:false},
	{id:"f016", price:8230000, level:8, world: 1, action:"add", value:7, name:"Old Ladies", tag:"food", description:"Ok. Someone just shoved the old people in the lake. Well at least they stopped throwing food in the lake.", displayed:false},
	// world 2 upgrades - 
];
// Drink upgrades increase hamsters generated per second
var drinkupgrades = [
	// world 0 upgrades - Pet Shop
	{id:"d000", price:0, level:0, world: 0, action:"none", value:0, name:"Nothing", tag:"drink", description:"-", displayed:true},
	{id:"d001", price:125, level:1, world: 0, action:"add", value:1, name:"Water", tag:"drink", description:"Just basic tap water. You gotta start somewhere.", displayed:false},
	{id:"d002", price:650, level:2, world: 0, action:"add", value:1, name:"Mineral Water", tag:"drink", description:"Mineral water drawn from a fountain on top of a volcano. Healthy and refreshing!", displayed:false},
	{id:"d003", price:2200, level:3, world: 0, action:"add", value:1, name:"Camomile Tea", tag:"drink", description:"Cooled down camomile tea keeps your hamsters healthy and hydrated.", displayed:false},
	{id:"d004", price:10600, level:4, world: 0, action:"add", value:2, name:"Rose Hip Tea", tag:"drink", description:"Everybode prefers Rose hip over camomile, right? Your hamsters probably do so as well.", displayed:false},
	{id:"d005", price:25750, level:5, world: 0, action:"add", value:2, name:"Peppermint Tea", tag:"drink", description:"Peppermint tea is perfect when you are having a cold; so when you are already healthy it should be even better!", displayed:false},
	{id:"d006", price:55800, level:6, world: 0, action:"add", value:2, name:"Almond Milk", tag:"drink", description:"Tastes just like regular milk, but without the stress hormones and antibiotics.", displayed:false},
	{id:"d007", price:126000, level:7, world: 0, action:"add", value:3, name:"Apple Juice", tag:"drink", description:"Sweet sweet apple juice. The kids love it and the hamsters run faster because of the sugar!", displayed:false},
	{id:"d008", price:267000, level:8, world: 0, action:"add", value:5, name:"Plepsi Soda", tag:"drink", description:"Soda with 90% sugar makes your hamsters run at the speed of sound. Any faster and they'll turn blue and start collecting rings.", displayed:false},
	//world 1 upgrades - City Park Lake
	{id:"d009", price:406900, level:1, world: 1, action:"add", value:1, name:"", tag:"drink", description:"", displayed:false},
	{id:"d010", price:637000, level:2, world: 1, action:"add", value:1, name:"", tag:"drink", description:"", displayed:false},
	{id:"d011", price:721960, level:3, world: 1, action:"add", value:2, name:"", tag:"drink", description:"", displayed:false},
	{id:"d012", price:987000, level:4, world: 1, action:"add", value:2, name:"", tag:"drink", description:"", displayed:false},
	{id:"d013", price:1645000, level:5, world: 1, action:"add", value:3, name:"", tag:"drink", description:"", displayed:false},
	{id:"d014", price:3030303, level:6, world: 1, action:"add", value:3, name:"", tag:"drink", description:"", displayed:false},
	{id:"d015", price:7777777, level:7, world: 1, action:"add", value:5, name:"", tag:"drink", description:"", displayed:false},
	{id:"d016", price:9130000, level:8, world: 1, action:"add", value:7, name:"", tag:"drink", description:"", displayed:false},
	// world 2 upgrades - 
];
// Island upgrades increase capcity amount of hamsters currently allowed
var islandupgrades = [
	// world 0 upgrades - Pet Shop
	{id:"i000", price:0, level:0, world: 0, action:"none", value:0, name:"Tiny Cage", tag:"island", description:"-", displayed:true},
	{id:"i001", price:10000, level:1, world: 0, action:"add", value:7500, name:"Medium Cage", tag:"island", description:"A medium sized cage. Barely big enough for a small family of hamsters.", displayed:false},
	{id:"i002", price:17500, level:2, world: 0, action:"add", value:16500, name:"Big Cage", tag:"island", description:"A big cage. It even fits your hamsters' parent in-laws!", displayed:false},
	{id:"i003", price:34000, level:3, world: 0, action:"add", value:36000, name:"Large Cage", tag:"island", description:"A large cage. Large enough to house huge quantities of hamsters.", displayed:false},
	{id:"i004", price:70000, level:4, world: 0, action:"add", value:80000, name:"Deluxe Cage", tag:"island", description:"The deluxe model. An entire town of hamsters could live in there!", displayed:false},
	{id:"i005", price:150000, level:5, world: 0, action:"multiply", value:2, name:"Ultra Supreme Cage", tag:"island", description:"The best of the best. The enitre earth population of hamsters could fit in there!", displayed:false},
	// world 1 upgrades - City Park Lake
	{id:"i006", price:0, level:0, world: 1, action:"none", value:0, name:"Nothing", tag:"island", description:"-", displayed:true},
	{id:"i007", price:300000, level:1, world: 1, action:"add", value:200000, name:"Small Lily Pads", tag:"island", description:"These lily pads will keep your hamsters afloat on the lake surface.", displayed:false},
	{id:"i008", price:500000, level:2, world: 1, action:"add", value:350000, name:"Big Lily Pads", tag:"island", description:"Big lily pads that help your hamsters stay dry.", displayed:false},
	{id:"i009", price:850000, level:3, world: 1, action:"add", value:425000, name:"Single Lotus Blad", tag:"island", description:"Bigger than any lily pads in the lake.", displayed:false},
	{id:"i010", price:1275000, level:4, world: 1, action:"add", value:725000, name:"Mutliple Lotus Blads", tag:"island", description:"Even bigger lotus blads for all your hamsters.", displayed:false},
	{id:"i011", price:2000000, level:5, world: 1, action:"multiply", value:5, name:"Victoria Lotus Leaves", tag:"island", description:"The world's biggest lotus leaves, keeping your hamsters from drowning.", displayed:false},
	// world 2 upgrades - 
];
// Hamster upgrades increase hamsters per click 
var hamsterupgrades = [
	// world 0 upgrades - Pet Shop
	{id:"h000", price:0, level:0, world: 0, action:"none", value:0, name:"Common Hamster", tag:"hamster", description:"-", displayed:true},
	{id:"h001", price:13000, level:1, world: 0, action:"add", value:5, name:"Syrian Hamster", tag:"hamster", description:"The syrian hamster is very popular because of their soft fur.", displayed:false},
	{id:"h002", price:78500, level:2, world: 0, action:"add", value:10, name:"Chinese Hamster", tag:"hamster", description:"The stripes of the chinese hamsters are the same with race cars. They make them go faster.", displayed:false},
	{id:"h003", price:215000, level:3, world: 0, action:"add", value:25, name:"Golden Hamster", tag:"hamster", description:"As a kid I always thought golden hamsters are made of gold. Oh well, maybe in the future...", displayed:false},
	// world 1 upgrades - City Park Lake
	{id:"h004", price:645000, level:1, world: 1, action:"add", value:15, name:"Water Hamster", tag:"hamster", description:"Your hamsters DNA mutated from living on the water the whole time. They even grew floating skins.", displayed:false},
	{id:"h005", price:1850000, level:2, world: 1, action:"add", value:20, name:"Duck Hamster", tag:"hamster", description:"Somehow, I don't know how that hell that happened, your hamsters crossbred with ducks. You got hamster-duck hybrids now.", displayed:false},
	{id:"h006", price:7550000, level:3, world: 1, action:"add", value:35, name:"Pensioneer Hamster", tag:"hamster", description:"They observed the grannies that fed your hamsters very carefully and now turned to grannies themselves.", displayed:false},
	// world 2 upgrades - 
	
];
// World upgrades unlock new upgrades (new world starts with small island but same amount of max. hamsters. New design/theme for upgrades)
var worldupgrades = [
	{id: "w00", price: 0, level: 0, name:"Pet Shop", tag:"world", description:"-", displayed: true},
	{id: "w01", price: 300000, level: 1, name:"City Park Lake", tag:"world", description:"Taking your hamsters out for some fresh air is a brilliant idea!", displayed: false},
	{id: "w02", price: 10000000, level: 2, name:"Underground Sanctuary", tag:"world", description:"Deep down under your hamsters will be safe from any predators, I think.", displayed: false},
	{id: "w03", price: 99999999999, level: 3, name:"Bermuda Triangle", tag:"world", description:"Ohhh, so the hamsters were responsible for all the ships and airplanes vanishing near the Bermuda Triangle...", displayed: false},
	{id: "w04", price: 9999999999999, level: 4, name:"Candy Land", tag:"world", description:"In this literal paradise your hamsters can live in harmony and diabetes.", displayed: false},

];

var allUpgrades = housingupgrades.concat(foodupgrades, drinkupgrades, islandupgrades, hamsterupgrades, worldupgrades);

function addNewUpgradesToShop() {
	for (upgrade of allUpgrades) {
		if ( (upgrade.price <= totalhamstercount) && (!boughtUpgrades.includes(upgrade.id)) && (upgrade.displayed === false) ) {
			if ( (upgrade.tag != "world") && (typeof upgrade.world !== "undefined") ) {
				// only display upgrades that are one level higher than the current level of the upgrade type
				if ( (upgrade.tag == "housing") && (upgrade.level != housinglevel + 1) || (upgrade.world != worldlevel) ) {
					return;
				} else if ( (upgrade.tag == "food") && (upgrade.level != foodlevel + 1) || (upgrade.world != worldlevel) ) {
					return;
				} else if ( (upgrade.tag == "drink") && (upgrade.level != drinklevel + 1) || (upgrade.world != worldlevel) ) {
					return;
				} else if ( (upgrade.tag == "island") && (upgrade.level != islandlevel + 1) || (upgrade.world != worldlevel) ) {
					return;
				} else if ( (upgrade.tag == "hamster") && (upgrade.level != hamsterlevel + 1) || (upgrade.world != worldlevel) ) {
					return;
				}
			} else if ( (upgrade.tag == "world") && (upgrade.level == worldlevel + 1) ) {
				// only display world upgrades if all upgrades of the current world have been purchased
				if ( (islandlevel != 5) || (drinklevel != 8) || (foodlevel != 8) || (housinglevel != 5) || (hamsterlevel != 3) ) {
					return;
				}
			} else {
				return;
			}
			upgrade.displayed = true;
			var shopitem = new ShopItem(upgrade);
			checkForBuyableUpgrades();
		}
	};
}

function checkForBuyableUpgrades() {
	var itemList = document.getElementsByClassName("shop-item");
	if (itemList == null) {
		return;
	}
	for (upgrade of allUpgrades) {
		for (i = 0; i < itemList.length; i++) {
			var upgrade = getUpgrade(itemList[i]);
			if (upgrade.displayed !== true) {
				return;
			}
			if (hamstercount >= upgrade.price) {
				document.getElementById("upgrade_" + upgrade.id).classList.remove("shop-item-unbuyable");
			} else {
				document.getElementById("upgrade_" + upgrade.id).classList.add("shop-item-unbuyable");
			}
		}
	};
	countShopItems();
}

function getUpgrade(item) {
	var itemId = item.id.replace("upgrade_","");
	for (var i = 0; i < allUpgrades.length; i++) {
		if (allUpgrades[i].id == itemId) {
			return allUpgrades[i];
		}
	}	
}

function countShopItems() {
	var itemList = document.getElementsByClassName("shop-item");
	if (itemList != null) {
		// First count all items currently displayed in shop
		var totalItemCount = itemList.length;
		if (totalItemCount == 0) {
			return;
		}
		var unbuyableItemCount = 0;
		// Then count all items that can't be bought at the moment
		for (i = 0; i < itemList.length; i++) {
			if ( itemList[i].classList.contains("shop-item-unbuyable") ) {
				unbuyableItemCount++;
			}
		}
		var affordableItemCount = totalItemCount - unbuyableItemCount;
		var totalCountText = (totalItemCount > 1) ? (totalItemCount + " Items in Shop") : ("1 Item in Shop");
		var affordableCountText = "";
		if (affordableItemCount != 0) {
			var affordableCountText = (affordableItemCount > 1) ? (" | " + affordableItemCount + " Items affordable") : (" | 1 Item affordable");
		}
		document.getElementById("shop_button_item_count").innerHTML = totalCountText + affordableCountText;		
	}
}
