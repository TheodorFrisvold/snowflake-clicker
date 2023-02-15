var showFlakes;
var ticksPerSecond = 20;
var msPerTick = 1000/ticksPerSecond;

function init(){
    //initializes game
    showFlakes = document.getElementById("showFlakes");
    let x = document.cookie;
    if (x != null) {
        
    }
}

setInterval(updateGame, msPerTick);

function clickedSnowflake(){
    Model.main.snowflakes += Model.main.snowflakesPerClick;
}
function updateGame(){
    //updates game on a setInterval
    console.log("running updateGame");

    //update Snowflakes
    Model.main.snowflakes += Model.main.snowflakesPerSecond / ticksPerSecond;
    showFlakes.innerHTML = `${parseInt(Model.main.snowflakes)} Silver`;

}

function buyUpgrade(type) {
    if (type == shovel) {
        Model.main.snowflakesPerClick += 1;
        Model.main.snowflakesPerSecond += 1;
    }
}

function saveGame(){
    document.cookie = gameSave;
}