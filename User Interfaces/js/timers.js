/*
    Write a function name bgTimer 
    Every 2.6 seconds output to the console the words right and left (alternating) 
    Every 3.9 seconds alternate the words UP and DOWN (alternating)
    After 15 seconds alert the user "I'm so dizzy" and stop all the timers
*/

let timerDizzy, timerRL, timerUD;
let countRL = 0, countUD = 0;

/**
 * Starts all the timers
 */
function bgTimer(){

    timerRL = setInterval( completeRL, 2600 );
    timerUD = setInterval( completeUD, 3900 );
    timerDizzy = setTimeout( completeDizzy, 10000);
}

/**
 * Right or Left output to the screen
 */
function completeRL(){
    if (countRL++ % 2)
        console.log("Right");
    else
        console.log("Left");
}

/**
 * Up or Down output to the screen
 */
function completeUD(){
    console.log( countUD++ % 2 ? "UP" : "DOWN" );
}

/**
 * execute dizzy afetr 15 seconds
 * alert user and stop timers
 */
function completeDizzy(){
    console.log("STOP");
    alert("I'm so dizzy");
    clearInterval(timerRL);
    clearInterval(timerUD);
    clearTimeout(timerDizzy);
}