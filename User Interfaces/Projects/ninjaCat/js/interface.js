/**
 * All the interface functions to help create the gui.
 * @author Iana Setrakova
 */

// Background image
let bgImg = document.getElementById("bgImg");

// Lives remaining
let heart = document.getElementById("heart");
let pulseStartTime;
let pulsing = false;
const pulseDuration = 2000; // 2 seconds
const scaleMin = 0.8;
const scaleMax = 1.2;

// Game over
let gameOverDiv = document.getElementById("gameOver");
let overlayLogo = document.querySelector("#gameOver img");

// Chicken nugget
let nuggetAnimContainer = document.getElementById("chicken-anim");
let nuggetAnim = document.getElementById("chicken-nugget");
let nuggetsAnim = document.getElementById("chicken-nuggets");

/**
 * Update the gameOver overlay with different string (html compatible).
 * @param {string} aTitle change the <h2> element
 * @param {string} aText change the gameOverMsg element
 * @param {string} aHeight update the height of the overlay
 */
function updateOverlay(aTitle, aText=undefined, aHeight=undefined)
{
    document.querySelector("#gameOver h2").innerHTML = aTitle;
    let gameOverMsg = document.querySelector("#gameOver p");
    
    // Hide the message box
    if (typeof aText === "undefined") {
        gameOverMsg.style.display = "none"
    }
    // Show the message box
    else {
        gameOverMsg.innerHTML = aText;
        gameOverMsg.style.display = "block"
    }

    if (typeof aHeight !== "undefined") {
        gameOverDiv.style.height = aHeight;
    }
}

/**
 * Display the overlay. Hide = true to hide the overlay instead.
 * @param {boolean} [hide] hide the display
 */
function displayOverlay(hide=false) 
{
    gameOverDiv.style.display = (hide) ? "none" : "block";
}

/**
 * Start the falling nugget animation.
 * Display the container and keep track of the events (start, end) 
 * of the nugget(s) with css animations.
 * @author Tamara Plante
 */
function nuggetAnimStart() 
{
    nuggetAnimContainer.style.display = "block";
    nuggetsAnim.style.display = "block";
    nuggetAnim.classList.add("chicken-nugget-anim1");
    nuggetAnim.style.display = "block";
}
/**
 * When the nugget is done falling.
 */
function nuggetAnimEnded()
{
    nuggetAnim.classList.remove("chicken-nugget-anim1");
    nuggetsAnim.classList.add("chicken-nuggets-anim1");
    nuggetAnim.style.display = "none";
}
/**
 * When the nuggets are in place, then we switch to the infinite animation.
 * @param {Event} e the event
 */
function nuggetsAnimEnded(e) 
{
    if (e.animationName.endsWith("anim1kf")) {
        nuggetsAnim.classList.remove("chicken-nuggets-anim1");
        nuggetsAnim.classList.add("chicken-nuggets-anim2"); // infinite animation
    }
}
/**
 * Reset the animations on the chicken nuggets.
 */
function resetNuggets()
{
    nuggetAnimContainer.style.display = "none";
    nuggetsAnim.classList.remove("chicken-nuggets-anim2");
}


// 
/**
 * The function to draw background image on backfground canvas
 */
function drawBackground() {
    const width = bgImg.width * bgCanvas.height / bgImg.height;
    const height = bgCanvas.height;
    drawImage(bgContext, bgImg, 0, 0, width, height);    
}

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
    clearCanvas(livesContext);

    // Draw the heart image with scaling
    const heartWidth = heart.width / 4 * scale;
    const heartHeight = heart.height / 4 * scale;
    const heartX = 160 - (heartWidth / 2 - heart.width / 8);
    const heartY = 15 - (heartHeight / 2 - heart.height / 8);

    drawImage(livesContext, heart, heartX, heartY, heartWidth, heartHeight);

     // draw the remaing lives text on the canvas
    drawText(livesContext, '14px', "Press Start 2P", "#222034", 200, 34, ((game.lives > -1) ? game.lives : "-1"));
}

game.drawScore = function() {
    clearCanvas(guiContext);

    // Draw the button background
    drawRect(guiContext, "#5FCFD4", 10, 10, 116, 30);

    // the button border lines   
    drawLine(guiContext, "#222034", 1, 10, 11, 10, 38);  // left border line 
    drawLine(guiContext, "#222034", 1, 11, 10, 125, 10); // top border line 
    drawLine(guiContext, "#222034", 1, 126, 11, 126, 38); // right border line 
    drawLine(guiContext, "#222034", 1, 11, 40, 125, 40);  // bottom border line 
    
    // the button gray highlights 
    drawRect(guiContext, "#bfbfbf", 11, 11, 114, 2);
    drawRect(guiContext, "#bfbfbf", 121, 11, 4, 28);
    
    // the button lightgray highlights 
    drawRect(guiContext, "#e0e0e0", 11, 11, 4, 28);
    drawRect(guiContext, "#e0e0e0", 11, 37, 114, 2);

    // draw score on button
    drawText(guiContext, '10px', "Press Start 2P", "#222034", 25, 30, game.points);
};


/**
 * Clears the canvas by removing all content.
 * @param {CanvasRenderingContext2D} context The canvas rendering context to clear.
 */
function clearCanvas(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
} 

/**
 * A function that draws the specified text on the canvas.
 * @param {CanvasRenderingContext2D} context - the canvas rendering context to draw on
 * @param {string} fontSize - the font size (e.g., "9px")
 * @param {string} fontName - the font name or family (e.g., "Arial")
 * @param {string} fillStyle - the fill color or style for the text (e.g. "#0000FF" or "blue")
 * @param {number} startX - the X-coordinate of the starting point for drawing the text
 * @param {number} startY - the Y-coordinate of the starting point for drawing the text
 * @param {string} text the text to display.
 */
function drawText(context, fontSize, fontName, fillStyle, startX, startY, text) {
    const font = fontSize + " \""+fontName+"\"";
    context.font = font; 
    context.fillStyle = fillStyle; 
    context.fillText(text, startX, startY);
}

/**
 * A function that draws a line with specified style and width on the canvas.
 * @param {CanvasRenderingContext2D} context - the canvas rendering context to draw on
 * @param {string} strokeStyle - the color of the line (stroke color)
 * @param {number} lineWidth - the width of the line
 * @param {number} startX - the x-coordinate of the starting point of the line
 * @param {number} startY - the y-coordinate of the starting point of the line
 * @param {number} endX - the x-coordinate of the ending point of the line
 * @param {number} endY - the y-coordinate of the ending point of the line
 */
function drawLine(context, strokeStyle, lineWidth, startX, startY, endX, endY) {
    context.strokeStyle = strokeStyle; // stroke color
    context.lineWidth = lineWidth; // stroke or line width
    context.beginPath(); 
    context.moveTo(startX, startY); // the starting point
    context.lineTo(endX, endY); // the ending point
    context.stroke(); // draw the line
}


/**
 * A function that draws a filled rectangle with specified fill style on the canvas.
 * @param {CanvasRenderingContext2D} context The canvas rendering context to draw on
 * @param {string} fillStyle - the fill color or style for the rectangle
 * @param {number} x - the X-coordinate of the top-left corner of the rectangle
 * @param {number} y - the Y-coordinate of the top-left corner of the rectangle
 * @param {number} width - the width of the rectangle
 * @param {number} height - the height of the rectangle
 */
function drawRect(context, fillStyle, x, y, width, height) {
    context.fillStyle = fillStyle; // set fill color
    context.fillRect(x, y, width, height); // draw the filled rectangle
}

/**
 * A function that draws an image on the canvas with optional scaling.
 * @param {CanvasRenderingContext2D} context - the canvas rendering context to draw on.
 * @param {HTMLImageElement} image - the image to draw.
 * @param {number} x - the x-coordinate of the top-left corner of the image
 * @param {number} y - the y-coordinate of the top-left corner of the image
 * @param {number} [width=image.naturalWidth] - the width of the image. Defaults to the image's natural width.
 * @param {number} [height=image.naturalHeight] - the height of the image. Defaults to the image's natural height.
 * @param {number} [scale=1] - the scaling factor to apply to the image dimensions. Defaults to 1 (no scaling).
 */
function drawImage(context, image, x, y, width = image.naturalWidth, height = image.naturalHeight, scale = 1) {
    context.drawImage(image, x, y, width * scale, height * scale);
}
