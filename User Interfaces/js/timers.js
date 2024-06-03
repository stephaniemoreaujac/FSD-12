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
//    alert("I'm so dizzy");

    clearInterval(timerRL);
    clearInterval(timerUD);

    clearInterval(timerBackground);
    clearInterval(timerH1);
    document.querySelector('body').innerHTML = "<h1>I'm so dizzy</h1>";
    clearTimeout(timerDizzy);
}

/*
Create a new timer that will change the background of body every 2 seconds and alternate between black and red.
Create a time that will alternate all the H1 text between black and orange every 2.5 seconds.
Make sure that your colors will never be black at the same time.

Instead of alerting "I'm so dizzy" to your user, change the html of body to show the following code : 
	<h1>I'm so dizzy</h1>

*/
let timerBackground, timerH1;
let countBackground=0, countH1=0;
let colorBackground, colorH1;

/**
 * Setup intervals for DOM practice
 */
function styleTimer(){
    timerBackground = setInterval(completeBackground, 2000);
    timerH1 = setInterval(completeH1, 2500);
    timerDizzy = setTimeout( completeDizzy, 10000);

}

/**
 * Change body's background color
 */
function completeBackground(){
    let item = document.getElementsByTagName('body')[0];

    let newColor = (countBackground++%2) ? "black" : "red";
    if (newColor != colorH1){
        item.style.backgroundColor = newColor;
        colorBackground = newColor;
    }
}

/**
 * Change H1's font color
 */
function completeH1(){
    let items = document.querySelectorAll("h1");
    let newColor = countH1++ % 2 ? "black" : "orange";
    // if (newColor != colorBackground){
    if (newColor != document.querySelector('body').style.backgroundColor){
        colorH1 = newColor;
        for (let i = 0; i<items.length; i++){
            items[i].style.color = newColor;
        }
    }
}


styleTimer();