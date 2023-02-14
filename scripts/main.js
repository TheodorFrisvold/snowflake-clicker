var showFlakes;

function init(){
    //initializes game
    showFlakes = document.getElementById("showFlakes");
}

setInterval(updateGame, 50);

function clickedSnowflake(){
    Model.main.snowflakes += Model.main.snowflakesPerClick;
}
function updateGame(){
    //updates game on a setInterval
    console.log("running updateGame");
    showFlakes.innerHTML = `${Model.main.snowflakes} Snowflakes`;
}