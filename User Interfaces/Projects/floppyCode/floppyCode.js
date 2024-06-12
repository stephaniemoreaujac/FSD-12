// Game area
let gameArea;
let gameAreaWidth = 360;
let gameAreaHeight = 640;
let context;

// Sounds
let myMusic;
let volume = 0.2;

// Function to change the volume
function setVolume(newVolume) {
	if (newVolume < 0) newVolume = 0;
	if (newVolume > 1) newVolume = 1;
	volume = newVolume;
	if (myMusic) {
		myMusic.volume = volume;
	}
}

//Pause
let showTutorial = true;
let pause = false;

// Get the volume control slider
let volumeControl = document.getElementById("volumeControl");

// Bird
let birdWidth = 34;
let birdHeight = 24;
let minTopPillarHeight = 100;
let maxTopPillarHeight = 300;
let bird;
let birdImage = new Image();
birdImage.src = "./images/javascript_pixel_logo.png";
let birdImageWidth = 64;
let birdImageHeight = 64;

//Sky
let skyX = 0; // X position of the sky
let skySpeed = 0;
0.3; // Speed of the sky

// Background
let groundX = 0; // X position of the ground
let groundSpeed = 2; // Speed of the ground movement
let groundHeight = 74; // Height of the ground

let skyImage = new Image();
skyImage.onload = function () {
	// The sky image is now loaded
};
skyImage.src =
	"./images/skytrees.gif"; // Sky image

let groundImage = new Image();
groundImage.onload = function () {
	// The ground image is now loaded
};
groundImage.src = "./images/ground.png";
// Physics
let velocityY = 0; // Bird jump speed
let pillarsPassed = 0; // Number of pillars passed
let gameOver = false; // Game over flag
let gameStarted = false; // Game started flag

// Scores
let score = 0; // Current score
let highScore = localStorage.getItem("highScore");
if (highScore === null) {
	highScore = 0;
} else {
	highScore = Number(highScore);
}

// Pillars
let pillarWidth = 50; // Width of the pillar
let topPillarImage = new Image(); // Top pillar image
let bottomPillarImage = new Image(); // Bottom pillar image

topPillarImage.onload = function () {
	imagesLoaded++;
	if (imagesLoaded == 2) {
		startGame();
	}
};
bottomPillarImage.onload = function () {
	imagesLoaded++;
	if (imagesLoaded == 2) {
		startGame();
	}
};
topPillarImage.src = "./images/ourcode2.png"; // Top pillar image
bottomPillarImage.src = "./images/ourcode2.png"; // Bottom pillar image

// Function to draw the tutorial
function drawTutorial() {
	context.fillStyle = "white";
	context.font = "20px monospace";
	context.textAlign = "center";
	context.fillText(
		"Welcome to Flappy Code!",
		gameArea.width / 2,
		gameArea.height / 2 - 100
	);
	context.fillText(
		"Press `Space` to jump",
		gameArea.width / 2,
		gameArea.height / 2 - 50
	);
	context.fillText(
		"Avoid the pillars",
		gameArea.width / 2,
		gameArea.height / 2
	);
	context.fillText(
		"Press `P` to un/pause",
		gameArea.width / 2,
		gameArea.height / 2 + 50
	);
	context.fillText(
		"Press `Enter` (⏎) to start",
		gameArea.width / 2,
		gameArea.height / 2 + 100
	);
}

window.onload = function () {
	// Start the game
	gameArea = document.getElementById("gameArea");
	gameArea.height = gameAreaHeight;
	gameArea.width = gameAreaWidth;
	context = gameArea.getContext("2d");

	let birdX = gameAreaWidth / 8; // Initial bird X position (1/8 of the game area width)
	let birdY = gameAreaHeight / 3; // Initial bird Y position (1/3 of the game area height)

	bird = {
		// Bird properties
		x: birdX,
		y: birdY,
		width: birdWidth,
		height: birdHeight,
		dead: false,
	};

	birdImage.onload = function () {
		// Bird image is now loaded
		context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);
	};

	requestAnimationFrame(update); // Start the game loop
	document.addEventListener("keydown", moveBird); // Add event listener for bird movement

	// Add event listeners for buttons
	document
		.getElementById("settingsButton")
		.addEventListener("click", showDifficultyMenu);
};

// Add pillars
let pillars = [];

// Define properties of a pillar
class Pillar {
	constructor(x, y, width, height, speed) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = speed;
	}
}

// Function for sounds
function sound(src) {
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	this.sound.volume = volume;
	this.play = function () {
		this.sound.play();
	};
	this.stop = function () {
		this.sound.pause();
	};
}

// Define difficulty settings
const difficulties = {
	easy: {
		gravity: 0.1,
		gapHeight: 200,
		pillarSpeed: 2,
		groundSpeed: 2,
		skySpeed: 0.3,
	},
	medium: {
		gravity: 0.1,
		gapHeight: 200,
		pillarSpeed: 2.5,
		groundSpeed: 2.5,
		skySpeed: 0.5,
	},
	hard: {
		gravity: 0.1,
		gapHeight: 150,
		pillarSpeed: 2.5,
		groundSpeed: 2.5,
		skySpeed: 0.5,
	},
};

// Default difficulty
let currentDifficulty = "easy"; // Default difficulty is easy
let gravity, gapHeight, pillarSpeed;
function setDifficulty(difficulty) {
	// Set difficulty
	currentDifficulty = difficulty;
	gravity = difficulties[difficulty].gravity; // Set gravity based on difficulty
	gapHeight = difficulties[difficulty].gapHeight; // Set gapHeight based on difficulty
	pillarSpeed = difficulties[difficulty].pillarSpeed; // Set pillarSpeed based on difficulty
	groundSpeed = difficulties[difficulty].groundSpeed; // Set groundSpeed based on difficulty
	skySpeed = difficulties[difficulty].skySpeed; // Set skySpeed based on difficulty
}

// Set initial difficulty
setDifficulty(currentDifficulty);

function showDifficultyMenu() {
	document.getElementById("difficultyMenu").style.display = "block";
}

function update() {
	// Game loop
	requestAnimationFrame(update);
	if (showTutorial) {
		drawTutorial();
		return;
	}
	if (gamePaused) {
		// Draw pause screen
		context.fillStyle = "white";
		context.font = "20px monospace";
		context.textAlign = "center";
		context.fillText("Game Paused", gameArea.width / 2, gameArea.height / 2);
		return;
	}

	if (!gameStarted) {
		// Draw start screen
		context.fillStyle = "white";
		context.font = "20px monospace";
		context.textAlign = "center";
		context.fillText(
			"Press Enter (⏎) to Start",
			gameArea.width / 2,
			gameArea.height / 2
		);
		return;
	}
	// Draw game over screen
	if (bird.dead) {
		gameOver = true;
		myMusic.stop();
		context.fillStyle = "rgba(0, 0, 0, 0.05)";
		context.fillRect(0, 0, gameArea.width, gameArea.height);
		context.fillStyle = "white";
		context.font = "30px monospace";
		context.textAlign = "center";
		context.fillText("Game Over", gameArea.width / 2, gameArea.height / 2);
		context.font = "20px monospace";
		context.fillText(
			"Score: " + score,
			gameArea.width / 2,
			gameArea.height / 2 + 50 // Distance from the top
		);

		// Update the high score if necessary
		if (score > highScore) {
			highScore = score;
			localStorage.setItem("highScore", highScore);
		}
		context.fillText(
			"High Score: " + highScore,
			gameArea.width / 2,
			gameArea.height / 2 + 80 // Distance from the top
		);
		context.fillText(
			"Press Enter (⏎) to play again",
			gameArea.width / 2,
			gameArea.height / 2 + 150 // Distance from the top
		);

		return;
	}
	context.clearRect(0, 0, gameArea.width, gameArea.height); // Clear the canvas
	// Draw the sky
	if (skyImage.complete) {
		context.drawImage(skyImage, skyX, 0);
		context.drawImage(skyImage, skyX + skyImage.width, 0);
	}

	// Update sky position
	skyX -= skySpeed;
	if (skyX <= -skyImage.width) {
		skyX = 0;
	}
	// Draw the ground
	if (groundImage.complete) {
		context.drawImage(
			groundImage,
			groundX,
			gameAreaHeight - groundHeight,
			gameAreaWidth,
			groundHeight
		);
		context.drawImage(
			groundImage,
			groundX + gameAreaWidth,
			gameAreaHeight - groundHeight,
			gameAreaWidth,
			groundHeight
		);
	}

	// Update ground position
	groundX -= groundSpeed;
	if (groundX <= -gameAreaWidth) {
		groundX = 0;
	}
	// Bird
	if (!bird.dead) {
		velocityY += gravity;
		bird.y = Math.max(bird.y + velocityY, 0); // Apply gravity to current bird.y, limit the bird.y to top of the canvas

		context.save();
		// Translate to the bird's position
		context.translate(bird.x + bird.width / 2, bird.y + bird.height / 2);

		// Rotate the context based on the bird's velocity
		if (velocityY < 0) {
			context.rotate((-20 * Math.PI) / 180); // Rotate 20 degrees upwards
		} else {
			context.rotate((20 * Math.PI) / 180); // Rotate 20 degrees downwards
		}

		// Draw the bird at (0, 0) and offset it by half its width and height to center it
		context.drawImage(
			birdImage,
			-bird.width / 2,
			-bird.height / 2,
			bird.width,
			bird.height
		);

		context.restore(); // Restore to its original state

		if (bird.y > gameArea.height) {
			// If bird falls below the canvas
			bird.dead = true; // Bird is dead
			myMusic.stop(); // Stop the music when the bird dies
			let loseGame = new sound("./sounds/lose.wav"); // Lose sound
			loseGame.volume = volume; // Set volume
			loseGame.play();
		}
	}
	// Generate new pillars
	if (
		pillars.length === 0 ||
		pillars[pillars.length - 1].x < gameAreaWidth - 300 // Distance between pillars
	) {
		let newPillarX = gameAreaWidth;
		let maxTopPillarHeight = gameAreaHeight - gapHeight - groundHeight; // Maximum height of the top pillar
		let topPillarHeight =
			Math.floor(
				Math.random() * (maxTopPillarHeight - minTopPillarHeight + 1)
			) + minTopPillarHeight;
		let bottomPillarHeight =
			gameAreaHeight - gapHeight - topPillarHeight - groundHeight; // Remaining height for the bottom pillar

		// Add new top pillar to the pillars array
		pillars.push(
			new Pillar(newPillarX, 0, pillarWidth, topPillarHeight, pillarSpeed)
		);

		// Add new bottom pillar to the pillars array
		pillars.push(
			new Pillar(
				newPillarX,
				gameAreaHeight - bottomPillarHeight - groundHeight,
				pillarWidth,
				bottomPillarHeight,
				pillarSpeed
			)
		);
	}

	// Draw and move pillars
	for (let i = 0; i < pillars.length; i++) {
		let pillar = pillars[i];
		// Draw pillar
		if (pillar.y === 0) {
			// This is a top pillar, so draw the top pillar image
			context.drawImage(
				topPillarImage,
				pillar.x,
				pillar.y,
				pillar.width,
				pillar.height
			);
		} else {
			// This is a bottom pillar, so draw the bottom pillar image
			context.drawImage(
				bottomPillarImage,
				pillar.x,
				pillar.y,
				pillar.width,
				pillar.height
			);
		}
		// Move pillar
		pillar.x -= pillar.speed;

		// Check if bird has passed pillar
		if (bird.x > pillar.x + pillar.width && !pillar.passed) {
			pillar.passed = true;
			pillarsPassed += 1;
			let newPoint = new sound("./sounds/point.mp3"); // Point sound
			newPoint.volume = volume; // Set volume
			newPoint.play();

			// If the number of pillars passed is even, increment the score
			if (pillarsPassed % 2 === 0) {
				score += 1;
			}
		}
		// Check if bird hits the top or bottom of the game area
		if (bird.y < 0 || bird.y > gameArea.height) {
			bird.dead = true;
			myMusic.stop(); // Stop the music
		}
		context.font = "20px monospace";
		context.fillText("Score: " + score, 90, 50); // Display score
		context.fillText("Best: " + highScore, 90, 90); // Display high score
		context.fillText(
			"Difficulty: " + currentDifficulty,
			gameArea.width - 120,
			600 // Display difficulty
		);
		// Check for collision with bird
		if (
			bird.x < pillar.x + pillar.width && // Check if bird is to the left of the pillar
			bird.x + bird.width > pillar.x && // Check if bird is to the right of the pillar
			bird.y < pillar.y + pillar.height && // Check if bird is above the pillar
			bird.y + bird.height > pillar.y // Check if bird is below the pillar
		) {
			if (!bird.dead) {
				bird.dead = true;
				myMusic.stop(); // Stop the music when the bird dies
				let loseGame = new sound("./sounds/lose.wav"); // Lose sound
				loseGame.volume = volume; // Set volume
				loseGame.play();
			}
		}

		// Check for collision with ground
		if (bird.y + bird.height >= gameAreaHeight - groundHeight) {
			if (!bird.dead) {
				bird.dead = true;
				myMusic.stop(); // Stop the music when the bird dies
				let loseGame = new sound("./sounds/lose.wav"); // Lose sound
				loseGame.volume = volume; // Set volume
				loseGame.play();
			}
		}
	}
	// Background images (sky and ground)
	function draw() {
		// Clear the canvas
		context.clearRect(0, 0, gameAreaWidth, gameAreaHeight);

		// Draw the sky
		context.drawImage(skyImage, 0, 0, gameAreaWidth, gameAreaHeight);

		// Draw the ground
		context.drawImage(
			groundImage,
			groundX,
			gameAreaHeight - groundImage.height,
			groundImage.width,
			groundImage.height
		);
		// Draw the ground again to fill the gap
		context.drawImage(
			groundImage,
			groundX + groundImage.width,
			gameAreaHeight - groundImage.height,
			groundImage.width,
			groundImage.height
		);

		// Move the ground
		groundX -= groundSpeed;
		if (groundX <= -groundImage.width) groundX = 0;
	}
}
// Moving the bird up when the space key is pressed
function moveBird(e) {
	if (e.code == "Space" && !bird.dead) {
		// Jump
		velocityY = -5;
	}
}
// Start the game when the enter key is pressed
window.addEventListener("keydown", function (event) {
	if (event.code === "Enter") {
		// Start the game when the enter key is pressed
		if (!gameStarted) {
			gameStarted = true;
			myMusic = new sound("./sounds/background.mp3");
			myMusic.volume = volume; // Set volume
			myMusic.play();
		} else if (bird.dead) {
			// Reset the game
			bird.dead = false;
			bird.y = gameArea.height / 2; // Reset the bird's position
			pillars = []; // Clear the pillars
			velocityY = 0; // Reset the bird's velocity
			score = 0; // Reset the score
			pillarsPassed = 0; // Reset the number of pillars passed
			myMusic.stop(); // Stop the music when the bird dies
			myMusic = new sound("./sounds/background.mp3"); // Create a new instance of the music
			myMusic.volume = volume; // Set volume
			myMusic.play(); // Start the music again
		}
	}
});
let gamePaused = false;1
// Pause the game when the P key is pressed
window.addEventListener("keydown", function (event) {
	if (event.code === "KeyP") {
		gamePaused = !gamePaused;
		if (gamePaused) {
			myMusic.stop();
		} else {
			myMusic.play();
		}
	}
});
//Change difficulty using 1, 2, 3 keys
window.addEventListener("keydown", function (event) {
	var easySound = new sound("./sounds/Easy.wav");
	var mediumSound = new sound("./sounds/Medium.wav");
	var hardSound = new sound("./sounds/Hard.wav");

	// Get all buttons
	var buttons = document.querySelectorAll("button");

	if (event.code === "Digit1") {
		setDifficulty("easy");
		easySound.volume = volume; // Set volume
		easySound.play();

		// Add 'selected' class to the easy button
		buttons[0].classList.add("selected");
		// Remove 'selected' class from other buttons
		buttons[1].classList.remove("selected");
		buttons[2].classList.remove("selected");
	}
	if (event.code === "Digit2") {
		setDifficulty("medium");
		mediumSound.volume = volume; // Set volume
		mediumSound.play();

		// Add 'selected' class to the medium button
		buttons[1].classList.add("selected");
		// Remove 'selected' class from other buttons
		buttons[0].classList.remove("selected");
		buttons[2].classList.remove("selected");
	}
	if (event.code === "Digit3") {
		setDifficulty("hard");
		hardSound.volume = volume; // Set volume
		hardSound.play();

		// Add 'selected' class to the hard button
		buttons[2].classList.add("selected");
		// Remove 'selected' class from other buttons
		buttons[0].classList.remove("selected");
		buttons[1].classList.remove("selected");
	}
});
// Make the buttons look like they are being pressed
// Get all the buttons
var buttons = document.querySelectorAll("button");
// Add click event listener to each button
for (var i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", function () {
		// Remove 'selected' class from all buttons

		for (var j = 0; j < buttons.length; j++) {
			buttons[j].classList.remove("selected");
		}

		// Add 'selected' class to the clicked button
		this.classList.add("selected");
	});
}

// Update the volume when the slider is moved
volumeControl.addEventListener("input", function () {
	setVolume(this.value);
});
// Prevent spacebar scrolling
window.addEventListener("keydown", function (e) {
	if (e.code === "Space") {
		e.preventDefault();
	}
});
// Start the game when the enter key is pressed
window.addEventListener("keydown", function (event) {
	if (event.code === "Enter") {
		showTutorial = false;
		gameStarted = true;
	}
});
