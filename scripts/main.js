var showCurrency;
var ticksPerSecond = 20;
var msPerTick = 1000/ticksPerSecond;
var store = document.getElementById("store-container");

function init(){
    //initializes game
    showCurrency = document.getElementById("showCurrency");
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

        console.log("Working on " + Model.upgrades[key].name);
        store.innerHTML +=
        `
        <div>
        Buy ${Model.upgrades[key].name}
        Price ${cost}
        Benefit ${currencyPerSecond}
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
    var perClick = Model.upgrades[type].currencyPerSecond;
    modificationFunction(perClick, type);
}

function modificationFunction(currencyPerSecond, type){
    Model.main.currencyPerSecond += currencyPerSecond;
    var newCost = Math.ceil(Model.upgrades[type].cost * Model.upgrades[type].costMultiplier);
    Model.upgrades[type].cost = newCost;
}

function saveGame(){
    document.cookie = gameSave;
}