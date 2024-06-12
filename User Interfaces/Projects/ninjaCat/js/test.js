body {
    background-color: #cfbf9d;
    touch-action: manipulation; /* Disable double-tap on mobile */
}



/**
 * Ninja Cat training
 * Game: Catching items falling from the sky.
 * 
 * Points are accumulated when catching good items.
 * Lives are lost when getting hit by a bad item.
 * 
 * @author Alexie Lagarde, Iana Setrakova, Tamara Plante
 */

"use strict"; // only allow strict code
let game = {
    secondsPassed: null,
    oldTimeStamp: null,
    points: 0,
    lives: 0,
    items: {
        active: [],
        destroy: [] // For animated items showing destroy animation
    }
};
let player;


// Background image
let bgImg = document.getElementById('bgImg');

// Background image
let heart = document.getElementById('heart');
let pulseStartTime;
let pulsing = false;
const pulseDuration = 2000; // 2 seconds
const scaleMin = 0.8;
const scaleMax = 1.2;


// high score
let highScore = localStorage.getItem('highScore') || 0;

/**
 * Initialize the game and the default values.
 */
game.init = function()
{
    // Set key press and disable start game button
    leftPressed = false;
    rightPressed = false;
    start.disabled = "true";
    drawBackground(); 

    // Set up initial game values
    game.points = 0;
    game.lives = 9;
    game.secondsPassed = null;
    game.oldTimeStamp = null;
    game.drawLives();

    // Get a reference to our main elements
    player.init();

    // Start the gameLoop
    window.requestAnimationFrame(game.loop);
    game.items.generate();
}

/**
 * When the game ends.
 */
game.end = function() 
{
    player.cancelAnimationsAndEffects();
    game.items.clear();
    game.clearCanvas();
    game.drawGameOver();
    
    // Enable start game button
    start.disabled = "";

    // Check and update high score
    let msg = "";

    if (game.points > highScore) {
        highScore = game.points;
        localStorage.setItem('highScore', highScore);
        msg = "New High Score! " + highScore;
    } else {
        msg = "Game Over! Your score: " + game.points + ". High Score: " + highScore;
    }
    alert(msg); // A
}

/**
 * Check collisions between items and the player and items and the ground.
 */
game.checkCollision = function() {
    
    let items = game.items.active;

    for (let i in items) {

        if (player.isColliding(items[i])) {
            // Remove from the items and add points.
            let removed = items.splice(i, 1)[0];
            this.points += removed.points;
            console.log("current points: " + this.points);
            
            // random spawn on the x axis for the next nugget.
            item.x = Math.floor(Math.max(0, Math.random() * (canvas.width - item.width)));
            setTimeout(function() {items.push(item)}, 3000);
        }
        else if (items[i].y + items[i].height > canvas.height) { // ground hit 
            items.splice(i, 1); // remove item
        } 
    }
}

game.checkCollision = function(secondsPassed) 
{
    let items = game.items.active;

    // Update item positions and check collisions
    for (let i in items) {
        let item = items[i];

        // Remove items that fall beyond the canvas bottom edge
        if (item.y + item.height > canvas.height) {
            items.splice(i, 1);
        }
        // Remove the item colliding with the player and add points and activate special effects
        else if (player.isColliding(item)) {

        }
        // Update the item position
        else {
            item.update(secondsPassed);
        }
    }

    for (let i = items.length - 1; i >= 0; i--) {
        let fallingItem = items[i];

        if (fallingItem.y + fallingItem.height > canvas.height) {
            // Remove items that fall beyond the canvas
            items.splice(i, 1);
        } else {
            if (player.isColliding(fallingItem)) {
                // Remove collided items and add points
                let removedItem = items.splice(i, 1)[0];

                if (fallingItem instanceof Water) {
                    player.damage.activate();
                    game.items.destroy.push(removedItem);
                    fallingItem.destroy();
                    
                    game.lives--;
                    onLivesChange();

                    if (game.lives == 0) {
                        game.end();
                        return true;
                    }
                }
                else {
                    if (fallingItem.name == "nugget") {
                        player.powerUp.activate();
                    }
                    else if (fallingItem.name == "pepper") {
                        player.stun.activate();
                    }
                    else if (fallingItem.name == "donut") {
                        player.slow.activate();
                    }
                    game.points += removedItem.points;
                    //console.log("Current points: " + game.points);
                }
            }
        }
        fallingItem.update(game.secondsPassed); // Update the position
    }
}

/**
 * Lose a life. Return true if the game ends. 
 * You are a cat so you have more... hopefully.
 */
game.loseLife = function() {

    game.lives--;
    onLivesChange();

    if (game.lives == 0) {
        game.end();
        return true;
    }
}


/**
 * The main game loop.
 * Called from requestAnimationFrame.
 * @param {number} timeStamp the timestamp
 */
game.loop = function(timeStamp) 
{
    game.secondsPassed = (timeStamp - game.oldTimeStamp) / 1000;
    game.oldTimeStamp = timeStamp;

    // Remove items after their death animation.
    game.items.clearDestroyed();

    // Check for collisions and update positions.
    game.checkCollision(game.secondsPassed);

    // Add new items randomly
    game.items.generate();

    // Update player
    player.update(game.secondsPassed);

    // Clear canvas
    game.clearCanvas();

    // Draw items and player
    game.draw();

    // Request next frame
    window.requestAnimationFrame(game.loop);
}

/**
 * Drawing function.
 */
game.draw = function()
{
    game.items.draw();
    player.draw();

    // Draw the score on the GUI canvas
    game.drawScore();
}

/**
 * Clear all the game related canvas
 */
game.clearCanvas = function()
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    playerContext.clearRect(0, 0, playerCanvas.width, playerCanvas.height);
}

game.drawScore = function() {
    // Clear the GUI canvas
    guiContext.clearRect(0, 0, guiCanvas.width, guiCanvas.height);


    // Draw the button
    guiContext.fillStyle = '#5FCFD4'; // Background color

    // Draw the button background
    guiContext.fillRect(10, 10, 116, 30); // x, y, width, height

    // strokes
    guiContext.strokeStyle = '#222034'; // Border color #306082
    guiContext.lineWidth = 1; // Border width
   // guiContext.strokeRect(10, 10, 110, 30);  // complete stroke of the button


    // Draw the lines
    // left border line 
    guiContext.beginPath(); // Start a new path
    guiContext.moveTo(10, 11); // Move to the starting point
    guiContext.lineTo(10, 38); // Draw a line to the ending point
    guiContext.stroke(); // Stroke the line

    // top border line 
    guiContext.beginPath(); // Start a new path
    guiContext.moveTo(11, 10); // Move to the starting point
    guiContext.lineTo(125, 10); // Draw a line to the ending point
    guiContext.stroke(); // Stroke the line


    // right border line 
    guiContext.beginPath(); // Start a new path
    guiContext.moveTo(126, 11); // Move to the starting point
    guiContext.lineTo(126, 38); // Draw a line to the ending point
    guiContext.stroke(); // Stroke the line

    // bottom border line 
    guiContext.beginPath(); // Start a new path
    guiContext.moveTo(11, 40); // Move to the starting point
    guiContext.lineTo(125, 40); // Draw a line to the ending point
    guiContext.stroke(); // Stroke the line

    
    // gray highlights 
    guiContext.fillStyle = '#bfbfbf'; 
    guiContext.fillRect(11, 11, 114, 2);
    guiContext.fillRect(121, 11, 4, 28);
    
    // lightgray highlights 
    guiContext.fillStyle = '#e0e0e0'; 
    guiContext.fillRect(11, 11, 4, 28);
    guiContext.fillRect(11, 37, 114, 2);

    
    // Set text properties
    guiContext.font = '9px "Press Start 2P"'; 
    guiContext.fillStyle = '#222034'; 

    // Draw the score on the GUI canvas
    guiContext.fillText('Score: ' + game.points, 20, 30); // Text and position (x: 10, y: 30)
};


function onLivesChange() {
    pulseStartTime = performance.now();
    pulsing = true;
    requestAnimationFrame(pulseHeart);
}
// Pulse animation function
function pulseHeart(timestamp) {
    if (!pulseStartTime) pulseStartTime = timestamp;
    const elapsed = timestamp - pulseStartTime;
    const progress = elapsed / pulseDuration;

    if (progress < 1) {
        const scale = scaleMin + (scaleMax - scaleMin) * Math.sin(progress * Math.PI);
        game.drawLives(scale);
        requestAnimationFrame(pulseHeart);
    } else {
        pulsing = false;
        game.drawLives(); // draw normally after pulse ends
    }
}

game.drawLives = function(scale = 1) {  
    // Clear the lives canvas
    livesContext.clearRect(0, 0, livesCanvas.width, livesCanvas.height);  

    // Draw the heart image with scaling
    const heartWidth = heart.width / 4 * scale;
    const heartHeight = heart.height / 4 * scale;
    const heartX = 160 - (heartWidth / 2 - heart.width / 8);
    const heartY = 15 - (heartHeight / 2 - heart.height / 8);

    livesContext.drawImage(
        heart, 
        heartX, heartY, heartWidth, heartHeight
    );

    // Set text properties
    livesContext.font = '14px "Press Start 2P"'; 
    livesContext.fillStyle = '#222034'; 

    // Draw the score on the GUI canvas
    livesContext.fillText(game.lives, 200, 34); // Text and position (x: 200, y: 34)
}

// image background
function drawBackground() {
    bgContext.drawImage(bgImg, 0, 0,  (bgImg.width * bgCanvas.height/ bgImg.height), bgCanvas.height);
   
}


// draw on help canvas
function drawHelp() {
    helpContext.beginPath();
    helpContext.arc(22, 22, 18, 0, 2 * Math.PI);    
    helpContext.fillStyle = '#5FCFD4';
    helpContext.fill();

    helpContext.beginPath();
    helpContext.arc(22, 22, 18, 0, 2 * Math.PI);    
    helpContext.strokeStyle = '#222034';
    helpContext.lineWidth = 1;
    helpContext.stroke();

    helpContext.beginPath();
    helpContext.arc(22, 22, 16, 0, 2 * Math.PI);    
    helpContext.strokeStyle = '#bfbfbf';
    helpContext.lineWidth = 3;
    helpContext.stroke();

    
    
    // Set text properties
    helpContext.font = '14px "Press Start 2P"'; 
    helpContext.fillStyle = '#222034'; 

    // Draw the score on the GUI canvas
    helpContext.fillText("?", 16, 30); // Text and position (x: 10, y: 30)


}


game.drawGameOver = function() {
    // Clear the canvas
    /*context.clearRect(0, 0, canvas.width, canvas.height);*/

    // Create a gradient
    // Create a vertical gradient for the text fill
    let gradient = context.createLinearGradient(
        canvas.width / 2 -100, canvas.height / 2 + 12, // x0, y0 (bottom of the text)
        canvas.width / 2 -100, canvas.height / 2 -16 // x1, y1 (top of the text)    
    );  
    gradient.addColorStop(0, '#AA373C'); 
    gradient.addColorStop(1, '#E9B23D');

    // Draw the text backround stroke 1 
    context.strokeStyle = '#5FCFD4'; // Border color #306082
    context.lineWidth = 4; // Border width
    context.strokeRect(canvas.width / 2 - 150, canvas.height / 2 - 24, 300, 44);

    
    // Draw the text backround stroke 2 
    context.strokeStyle = '#000000'; // Border color #306082
    context.lineWidth = 1; // Border width
    context.strokeRect(canvas.width / 2 - 152, canvas.height / 2 - 26, 304, 48);

    // Draw "GAME OVER" text
    context.font = '30px "Press Start 2P"';
    context.fillStyle = gradient; // Set the gradient as the fill style

    context.strokeStyle = '#000000'; // Text stroke color
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    
    // Fill and stroke the text
    context.fillText('GAME OVER',canvas.width / 2, canvas.height / 2);
    context.strokeText('GAME OVER', canvas.width / 2, canvas.height / 2);

   
};






<div id="menu">
    <button id="left" disabled="true">
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M3 4a1 1 0 0 0-.822 1.57L6.632 12l-4.454 6.43A1 1 0 0 0 3 20h13.153a1 1 0 0 0 .822-.43l4.847-7a1 1 0 0 0 0-1.14l-4.847-7a1 1 0 0 0-.822-.43H3Z" clip-rule="evenodd"/>
        </svg>
    </button>
    <button id="start">Start game</button>
    <button id="right" disabled="true">
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M3 4a1 1 0 0 0-.822 1.57L6.632 12l-4.454 6.43A1 1 0 0 0 3 20h13.153a1 1 0 0 0 .822-.43l4.847-7a1 1 0 0 0 0-1.14l-4.847-7a1 1 0 0 0-.822-.43H3Z" clip-rule="evenodd"/>
        </svg>
    </button>
</div>




@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    overflow: hidden;
}

body {
    background-color: #306082;
}

#gameContainer {
    position: relative;
    top: 15px;
    margin: auto;
    width: 360px;
    /*height: 500px;*/
}

#playerCanvas {
    position: absolute;
    background-color: #40a1a6;
    /*margin: auto;*/
}

#game {
    border: 1px solid lightgrey;
    /*margin: auto;*/
    /*padding: 0;*/
    position: absolute;
    /*position: relative;*/
    /*top: 15px;*/
}


#bgCanvas {
    position: absolute;
    /*top: 15px;*/
    /*left: 50%;
    transform: translateX(-50%);*/
    z-index: 1; 
    display: block;
    margin: auto;
    padding: 0; 
}
#livesCanvas {
    background-color: lightblue;
}
#guiCanvas, #livesCanvas {    
    float: left;
}

#guiCanvas, #game, #playerCanvas, #bgCanvas, #helpCanvas, #livesCanvas {
    image-rendering: pixelated;
}

#menu {
    display: flex;
    direction: ltr;
    justify-content: center;
}
#helpCanvas{
    position: absolute;
    top:520px;
    left: 57%;
    width: 50px;
    height: 50px; 
    margin-top: 10px;  
    cursor: pointer; 
}

#helpInfo{    
    display: none; /* Initially hidden */
    width: 360px;
    max-height: 365px; 
    position: absolute;
    top:70px; 
    left: 50%;
    transform: translateX(-50%);
    z-index: 2; 
    background-color: lightgrey; 
    font-family: 'Press Start 2P', sans-serif;
}
#closeHelp {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    background-color: #5FCFD4;
    color: #000000;
    width: 30px;
    height:30px;
    border-radius: 50%;
    padding-left: 7px;
    font-family: 'Press Start 2P', sans-serif; 
    font-size: 12px;
}

#helpTitle{     
    font-size: 12px;
    text-transform: uppercase;
    color: #ff6600;  
    text-align: center;      
    margin-top: 25px;
}

.instruction-row {      
    margin-top: 10px;
    font-size: 9px;
    line-height: 2em;
    display: flex;
    align-ITEMS: center;
    margin-bottom: 10px;
}
.instruction-row .column {
    padding: 5px;
}
.instruction-row .image-column {
    width: 60px;
}
.instruction-row .text-column {
    flex: 1;
}
.instruction-row img {
    max-width: 100%;
    height: auto;
}


#start{
    width: 140px;
    height: 36px;
    margin-top: 20px;        
    font-family: 'Press Start 2P', sans-serif;
    font-size: 10px;
    text-transform: uppercase;
    color: #222034;  
    background: #5FCFD4;
    border: 0px;
    position: absolute;
    top:520px;
    box-shadow: 
    inset -4px 2px 1px 1px grey,
    inset -4px -2px 1px 1px lightgray,
    inset 4px 0px 1px 1px lightgray;  
}

#start:hover {
    cursor: pointer;
    background-color: #40a1a6;
}
  
#start:active {
    top: 520px;
    box-shadow: 
    -4px 2px 1px 1px grey,
    -4px -2px 1px 1px lightgray,
    4px 0px 1px 1px lightgray; 
}
  
#start::after {
    content: '';
    background: #306082;
    position: absolute;
    left: -1%;
    top: 0;
    width: 102%;
    height: 100%;
    z-index: -1;
}
  
#start::before {
    content: '';
    background: #306082;
    position: absolute;
    left: 0;
    top: -3%;
    width: 100%;
    height: 108%;
    z-index: -1;
}

/*
@media (min-width: 768px) {
    #game {
        width: 360px;
        height: 680px;
    }
}
*/

#intro {
    position: absolute;
}

#splash {
    /*position: relative;*/
    /*top: 266px;*/
    /*left: 50%;*/
    /*transform: translate(-50%, -50%);*/
    text-align: center;
    background-color: rgba(0, 0, 0, 0.47);
    /*width: 360px;*/
}


#container {
    width: 360px;
    height: 180px;
    position: relative;
    top:-380px;
    left:50%;
    transform: translate(-50%, -50%);
}

#logo{
    position: absolute;
    top: 80px;
    left:51.5%;
    transform: translate(-50%, -50%);
    
}

#container1{
    width: 360px;
    height: 60px;
    position: relative;
    bottom:200px;
    left:50%;
    transform: translate(-50%, -50%);
    /*background-color: ;*/
}

#cat{
    position: absolute;
    height:50px;
    /*top: 20px;*/
    bottom: 0;
    left:90px;
    transform: translate(-50%, -50%);
    z-index:10;
}


