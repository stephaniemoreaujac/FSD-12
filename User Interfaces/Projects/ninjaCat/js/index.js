/**
 * Initialize the html elements we need to setup the game.
 * When the start button triggers, game.init (game.js) is called.
 * 
 * Support keyboard, touchscreen
 * @author Tamara Plante, Iana Setrakova, Alexie Lagarde
 */

let forceLives;
let rightPressed = false;
let leftPressed = false;
let startBtn, pauseBtn, helpBtn, touchLeftBtn, touchRightBtn;

// How to play instruction (help)
let helpInfo, helpInstruction, closeHelp, scrollIndicator;

// Audio
let audioGame, audioGameOver, audioDamage, audioStun;
// Audio control
let isAudioPlaying = true;
let audioToggle, audioOnIcon, audioOffIcon;

// Main Game canvas
let canvas, context;
// Background canvas
let bgCanvas, bgContext;
// Player canvas
let playerCanvas, playerContext;
// gui canvas for displaying score
let guiCanvas, guiContext;
// lives canvas
let livesCanvas, livesContext;

window.onload = init;

function init() 
{   
    // Load game audio
    audioGame = new Audio("audio/game-music-loop-3-144252.mp3"); //https://pixabay.com/sound-effects/game-music-loop-3-144252/
    audioGame.volume = 0.1;
    audioGame.loop = true;
    // Load special effects audio
    audioGameOver = new Audio("audio/game-over_wind-172559.mp3"); // https://pixabay.com/sound-effects/wind-172559/
    audioDamage = new Audio("audio/damage_select-sound-121244.mp3"); // https://pixabay.com/sound-effects/select-sound-121244/
    audioStun = new Audio("audio/stun_DWILLY_vocal_ninja_kick.mp3"); // splice
    audioDamage.volume = 0.30;
    audioStun.volume = 0.15;

    // Show the splash intro
    intro();

    // Setup the important elements variables
    startBtn = document.getElementById("start");
    pauseBtn = document.getElementById("pause");
    touchLeftBtn = document.getElementById("buttonLeft");
    touchRightBtn = document.getElementById("buttonRight");
    helpBtn = document.getElementById("help");
    helpInfo = document.getElementById("helpInfo");
    helpInstruction = document.querySelector("#instruction");
    scrollIndicator = document.getElementById("scrollIndicator");
    closeHelp = document.getElementById("closeHelp");
    audioToggle = document.getElementById("audioToggle");
    audioOnIcon = document.getElementById("audioOnIcon");
    audioOffIcon = document.getElementById("audioOffIcon");

    // Load game canvases
    [canvas, context] = loadCanvas("game"); // main, with items
    // Background canvas
    [bgCanvas, bgContext] = loadCanvas("bgCanvas");
    // Player canvas
    [playerCanvas, playerContext] = loadCanvas("playerCanvas", true);
    // Gui canvas for displaying score
    [guiCanvas, guiContext] = loadCanvas("guiCanvas");
    // Lives canvas
    [livesCanvas, livesContext] = loadCanvas("livesCanvas");

    // Setup game instruction entries
    setupInstruction();

    // Setup audio
    let audioSetting = localStorage.getItem("audioSetting");
    game.toggleAudio((audioSetting == null) ? true : audioSetting === "true");

    // Audio listener
    audioToggle.addEventListener("click", game.toggleAudio);

    // Setup instruction listeners
    helpBtn.addEventListener("click", game.toggleInstruction);
    // Close the instruction button "x"
    closeHelp.addEventListener("click", game.toggleInstruction);
    // Add scroll event listener to helpInfo
    helpInstruction.addEventListener("scroll", () => {
        // Check if the content is at the top
        if (helpInstruction.scrollTop === 0) {
            // If at the top, show the scroll indicator
            scrollIndicator.style.display = "flex";
        } else {
            // If not at the top, hide the scroll indicator
            scrollIndicator.style.display = "none";
        }
    });

    // Setup chicken nugget(s)
    nuggetAnim.addEventListener("animationend", nuggetAnimEnded);
    nuggetsAnim.addEventListener("animationend", nuggetsAnimEnded);

    // Setup the key listeners
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    // Setup touchscreen buttons
    if (navigator.maxTouchPoints || "ontouchstart" in document.documentElement) {
        setupTouchscreen();
    }
    // Game listener
    pauseBtn.addEventListener("click", game.pause);
    startBtn.addEventListener("click", function() {
        // Reset the game
        if (game.isInit) game.reset(); 
        // Initialize the game, which will trigger the game after.
        else game.init(); 
    });
}

/**
 * Setup the game instruction html structure inside the helpInfo div.
 */
function setupInstruction() 
{
    let xhr = new XMLHttpRequest();
    // Open the request
    xhr.open("GET", "js/instruction.json");
    // Send the request
    xhr.send();
    // Handle the response
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && xhr.status == 200) { // request is complete and successful
            let instruction = JSON.parse(xhr.responseText);

            for (let key in instruction) {
                let entry = instruction[key];

                // Create the row for the entry
                let row = document.createElement("div");
                row.classList.add("instruction-row");
                helpInstruction.appendChild(row);

                // Create the image div
                let divImg = document.createElement("div");
                divImg.classList.add("column", "image-column");
                row.appendChild(divImg);

                // Create the image
                let img = document.createElement("img");
                img.src = "images/" + entry.src;
                img.alt = entry.alt;
                divImg.appendChild(img);

                // Create the description div
                let descDiv = document.createElement("div");
                descDiv.classList.add("column", "text-column");
                row.appendChild(descDiv);

                // Add the description
                descDiv.appendChild(document.createTextNode(entry.desc));
            }
        }
    }
}

/**
 * Get our canvas and context object and return them.
 * @param {string} aName the name of the canvas
 * @param {boolean} [isFrequentlyRead] if willReadFrequently should be activated (for shaders)
 * @returns the canvas and context
 */
function loadCanvas(aName, isFrequentlyRead=false) 
{
    let canvas = document.getElementById(aName);
    let context = canvas.getContext("2d", (isFrequentlyRead) ? { willReadFrequently: true } : undefined);

    return [canvas, context];
}

/**
 * Display the touch controls container
 * but hide the controls until the game starts.
 * Setup the event listeners for touchscreen.
 */
function setupTouchscreen() 
{
    document.getElementById("touchControl").style.display = "block";
    game.toggleMobileControls(true);

    for (let btn of [touchLeftBtn, touchRightBtn]) {
        btn.addEventListener("touchstart", touchDownHandler);
        btn.addEventListener("touchend", touchUpHandler);
    }
}


/**
 * Catch keyboard on key down events.
 * @param {Event} e the event
 */
function keyDownHandler(e) 
{
    switch (e.key) {
        case "Right":
        case "ArrowRight":
        case "d":
        case "D":
            rightPressed = true;
            break;
        case "Left":
        case "ArrowLeft":
        case "a":
        case "A":
            leftPressed = true;
    }
}
/**
 * Catch keyboard on key up events.
 * @param {Event} e the event
 */
function keyUpHandler(e) 
{
    switch (e.key) {
        case "Right":
        case "ArrowRight":
        case "d":
        case "D":
            rightPressed = false;
            if (game.isInstruction && game.isInit) secretCode(1);
            break;
        case "Left":
        case "ArrowLeft":
        case "a":
        case "A":
            leftPressed = false;
            if (game.isInstruction && game.isInit) secretCode(0);
            break;
        case "p":
            game.pause();
    }
}

/**
 * Catch touch down events on the mobile player controls.
 * Prevent default touch screen gestures/behaviors.
 * @param {Event} e the event
 */
function touchDownHandler(e)
{
    if (e.target.id == "buttonLeft") {
        leftPressed = true;
        touchLeftBtn.classList.add("pressed");
    }
    else if (e.target.id == "buttonRight") {
        rightPressed = true;
        touchRightBtn.classList.add("pressed");
    }
    e.preventDefault();
}
/**
 * Catch touch up events on the mobile player controls.
 * Prevent default touch screen gestures/behaviors.
 * @param {Event} e the event
 */
function touchUpHandler(e)
{
    if (e.target.id === "buttonLeft") {
        leftPressed = false;
        touchLeftBtn.classList.remove("pressed");
        if (game.isInstruction && game.isInit) secretCode(0);
    }
    else if (e.target.id == "buttonRight") {
        rightPressed = false;
        touchRightBtn.classList.remove("pressed");
        if (game.isInstruction && game.isInit) secretCode(1);
    }
    e.preventDefault();
}

/**
 * Fun little dev backdoor to set the number of lives
 * Specific condition to trigger the secret code: game is started and options are opened.
 * @author Tamara Plante
 */
let secretCodeSequence = [0, 1, 1, 0];
let sequence = [];
let sequenceStart = null;

function secretCode(code) {

    function resetCode() {
        sequence = [];
        sequenceStart = null;
    }
    // In seconds
    function getCurrentTime() {
        return performance.now() / 1000;
    }

    // Start the sequence
    if (!sequence.length) {
        sequenceStart = getCurrentTime();
    }
    // Expired sequence
    else if ((getCurrentTime() - sequenceStart) > 10) {
        console.log("Too slow!");
        resetCode();
        return;
    }

    sequence.push(code);

    // Check if the sequence is completed.
    if (!(sequence.length == secretCodeSequence.length)) return;

    // Check the sequence matches.
    for (let i in sequence) {
        if (sequence[i] != secretCodeSequence[i]) {
            console.log("wrong guess!");
            resetCode()
            return;
        }
    }

    // Prompt the user
    let lives = parseInt(prompt("How many lives? (infinite: -1)"));
    // Valid number was given
    if (lives >= -1) {
        if (lives == 0) lives = 1; // Trap 0, convert to 1 life.
        forceLives = lives;
        game.lives = lives;
    }
    // Anything else, treat as a reset to 9 lives.
    else {
        forceLives = undefined;
        game.lives = 9;
    }
    onLivesChange();
    resetCode();
}
