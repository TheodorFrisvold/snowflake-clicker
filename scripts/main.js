var showCurrency;
var ticksPerSecond = 20;
var msPerTick = 1000/ticksPerSecond;
var store = document.getElementById("store-container");

function init(){
    //initializes game
    showCurrency = document.getElementById("showCurrency");
    addStoreElements();
    let x = document.cookie;
    if (x != null) {
        //execute code to import saved data from cookie
    }

}

function addStoreElements(){
    // console.log("length of upgrades " + Object.keys(Model.upgrades).length);
    var keys = Object.keys(Model.upgrades);

    for (let i = 0; i < Object.keys(Model.upgrades).length; i++) {
        console.log("Iterating through forloop in addStoreElements, currently on index " + i);
        var key = keys[i];

        var cost = Model.upgrades[key].cost;
        var currencyPerSecond = Model.upgrades[key].currencyPerSecond;
        var name = Model.upgrades[key].name;

        console.log("Working on " + name);
        store.innerHTML +=
        `
        <div id="store-element" onclick="buyUpgrade('${name}')">
        Buy ${name}
        <div><img src="./assets/images/${name}.png" id="store-img"></div>
        <p id="${name}-price">Price ${cost}</p>
        Adds ${currencyPerSecond} silver per second
        </div>
        `;
    }  
}

setInterval(updateGame, msPerTick);

function clickedCurrency(){
    Model.main.currency += Model.main.currencyPerClick;
}
function updateGame(){
    //updates game on a setInterval
    console.log("running updateGame");
    //update Snowflakes
    Model.main.currency += Model.main.currencyPerSecond / ticksPerSecond;
    showCurrency.innerHTML = `${parseInt(Model.main.currency)} Silver`;
}

function buyUpgrade(type) {
    var upgrade = Model.upgrades[type];
    var newCost = upgrade.cost * upgrade.costMultiplier;
    if (Model.main.currency >= upgrade.cost){
        Model.main.currency -= upgrade.cost;
        upgrade.cost = newCost;
        Model.main.currencyPerSecond += upgrade.currencyPerSecond;
        document.getElementById(`${upgrade.name}-price`).innerHTML = `Price ${Math.ceil(newCost)}`
    }
}


function saveGame(){
    document.cookie = gameSave;
}