var showCurrency;
var ticksPerSecond = 20;
var msPerTick = 1000 / ticksPerSecond;
var msPerSave = 60000;
var unfocusedTime;
var refocusedTime;
var updateGameInterval;
var saveGameInterval = setInterval(saveGame, msPerSave);
var store = document.getElementById("store-container");

function init() {
  //initializes game
  showCurrency = document.getElementById("showCurrency");
  let x = document.cookie;
  if (x.length > 0) {
    //execute code to import saved data from cookie
    restoreGame(x);
  }
  addStoreElements();
  setGameInterval();
}

document.addEventListener("visibilitychange", () => {
  if (!(document.visibilityState === "visible")) {
    unfocusedTime = new Date();
    clearInterval(updateGameInterval);
  } else if (document.visibilityState === "visible") {
    refocusedTime = new Date();
    setGameInterval();
    refocused(unfocusedTime, refocusedTime);
  }
});

function setGameInterval() {
  updateGameInterval = setInterval(function () {
    if (document.hasFocus) {
      updateGame();
    }
  }, msPerTick);
}

function refocused(un, re) {
  if (un == null) return;

  var difference = re.getTime() - un.getTime();
  Model.main.currency += (Model.main.currencyPerSecond * difference) / 1000;
}

function addStoreElements() {
  // console.log("length of upgrades " + Object.keys(Model.upgrades).length);
  var keys = Object.keys(Model.upgrades);

  for (let i = 0; i < Object.keys(Model.upgrades).length; i++) {
    console.log(
      "Iterating through forloop in addStoreElements, currently on index " + i
    );
    var key = keys[i];

    var cost = Model.upgrades[key].cost;
    var currencyPerSecond = Model.upgrades[key].currencyPerSecond;
    var name = Model.upgrades[key].name;

    console.log("Working on " + name);
    store.innerHTML += `
        <div id="store-element" onclick="buyUpgrade('${name}')">
        Buy ${name}
        <div><img src="./assets/images/${name}.png" onerror="this.onerror=null; this.src='./assets/images/default.png'" id="store-img"></div>
        <p id="${name}-price">Price ${Math.ceil(cost)}</p>
        Adds ${currencyPerSecond} silver per second
        </div>
        `;
  }
}

function clickedCurrency() {
  Model.main.currency += Model.main.currencyPerClick;
}
function updateGame() {
  //updates game on a setInterval
  console.log("running updateGame");
  //update Snowflakes
  Model.main.currency += Model.main.currencyPerSecond / ticksPerSecond;
  showCurrency.innerHTML = `${parseInt(Model.main.currency)} Silver`;
}

function buyUpgrade(type) {
  var upgrade = Model.upgrades[type];
  var newCost = upgrade.cost * upgrade.costMultiplier;
  if (Model.main.currency >= upgrade.cost) {
    Model.main.currency -= upgrade.cost;
    upgrade.cost = newCost;
    Model.main.currencyPerSecond += upgrade.currencyPerSecond;
    document.getElementById(
      `${upgrade.name}-price`
    ).innerHTML = `Price ${Math.ceil(newCost)}`;
  }
}

function saveGame(isManual) {
  if (isManual) {
    alert("Game saved successfully!");
  }
  document.cookie = generateGameSave();
}

function generateGameSave() {
  var save = JSON.stringify(Model);
  return save;
}

function restoreGame(save) {
  Model = JSON.parse(save);
}

function resetGame() {
  if (confirm("Are you sure you want to reset?")) {
    Model = MainModel;
    saveGame();
    reloadGame();
    alert("Game was reset");
  } else {
    alert("Game was not reset");
  }
}

function reloadGame() {
  document.location.reload();
}
