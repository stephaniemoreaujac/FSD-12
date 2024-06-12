
class Cell {
    constructor(x, y, num) {
        this.x = x; // Set the x-coordinate of the cell
        this.y = y; // Set the y-coordinate of the cell
        this.num = num; // Set the number value of the cell
    }
}

let gameArray = []; // Create an array to store the game board
let emptyCell; // Create an object to store the empty cell coordinates
let startTime; // Create a variable to store the start time of the game
let moveCount = 0; // Create a variable to store the number of moves
let boardSize = 3; // Set the default board size

// Generate a random index for shuffling the game board
function randomIndex(size) {
    const indices = [...Array(size * size).keys()]; // Create an array of indices
    do {
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
            [indices[i], indices[j]] = [indices[j], indices[i]]; // Swap the elements at the indices
        }
    } while (!isSolvable(indices, size)); // Check if the generated array is solvable
    return indices; // Return the shuffled indices
}

// Check if the generated index is solvable
function isSolvable(indices, size) {
    let inversions = 0; // Create a variable to count the number of inversions
    for (let i = 0; i < indices.length; i++) {
        for (let j = i + 1; j < indices.length; j++) {
            if (indices[i] > 0 && indices[j] > 0 && indices[i] > indices[j]) {
                inversions++; // Increment the inversion count
            }
        }
    }
    if (size % 2 === 1) { // If the board size is odd
        return inversions % 2 === 0; // Return true if the inversion count is even
    } else { // If the board size is even
        const emptyRow = Math.floor(indices.indexOf(0) / size); // Calculate the row of the empty cell
        if (emptyRow % 2 === 0) { // If the empty cell is on an even row from the bottom
            return inversions % 2 === 1; // Return true if the inversion count is odd
        } else { // If the empty cell is on an odd row from the bottom
            return inversions % 2 === 0; // Return true if the inversion count is even
        }
    }
}

// Create the game board
function createLevel() {
    const size = boardSize; // Get the board size
    const indices = randomIndex(size); // Generate random indices for the game board
    const gameBoard = document.getElementById('game-board'); // Get the game board element
    gameBoard.innerHTML = ''; // Clear the board

    gameBoard.style.gridTemplateColumns = `repeat(${size}, 100px)`; // Set the grid template columns
    gameBoard.style.gridTemplateRows = `repeat(${size}, 100px)`; // Set the grid template rows

    gameArray = []; // Reset the game array
    for (let i = 0; i < size; i++) {
        gameArray[i] = []; // Create an empty array for each row
        for (let j = 0; j < size; j++) {
            const index = i * size + j; // Calculate the index of the cell
            const num = indices[index]; // Get the number value for the cell
            const cell = new Cell(i, j, num); // Create a new Cell object
            gameArray[i][j] = cell; // Store the cell in the game array

            const cellDiv = document.createElement('div'); // Create a new div element for the cell
            cellDiv.className = 'cell'; // Set the class name
            cellDiv.textContent = num === 0 ? '' : num; // Set the text content of the cell
            if (num === 0) {
                cellDiv.classList.add('empty'); // Add the 'empty' class to the cell
                emptyCell = { x: i, y: j }; // Store the coordinates of the empty cell
            }
            cellDiv.addEventListener('click', () => moveCell(i, j)); // Add a click event listener to the cell
            gameBoard.appendChild(cellDiv); // Append the cell div to the game board
        }
    }

    moveCount = 0; // Reset the move count
    startTime = new Date(); // Set the start time
    updateStatus(); // Update the game status
}

// Move a cell on the game board
function moveCell(x, y) {
    if ((Math.abs(emptyCell.x - x) === 1 && emptyCell.y === y) ||
        (Math.abs(emptyCell.y - y) === 1 && emptyCell.x === x)) {
        
        [gameArray[emptyCell.x][emptyCell.y], gameArray[x][y]] = [gameArray[x][y], gameArray[emptyCell.x][emptyCell.y]]; // Swap the cells
        
        const gameBoard = document.getElementById('game-board'); // Get the game board element
        gameBoard.children[emptyCell.x * boardSize + emptyCell.y].classList.remove('empty'); // Remove the 'empty' class from the previous empty cell
        gameBoard.children[emptyCell.x * boardSize + emptyCell.y].textContent = gameArray[emptyCell.x][emptyCell.y].num === 0 ? '' : gameArray[emptyCell.x][emptyCell.y].num; // Update the text content of the previous empty cell

        gameBoard.children[x * boardSize + y].classList.add('empty'); // Add the 'empty' class to the new empty cell
        gameBoard.children[x * boardSize + y].textContent = ''; // Clear the text content of the new empty cell

        emptyCell = { x, y }; // Update the coordinates of the empty cell
        moveCount++; // Increment the move count
        updateStatus(); // Update the game status

        // Play move sound
        document.getElementById('move-sound').play();

        if (checkWinCondition()) { // Check if the player has won the game
            const endTime = new Date(); // Get the end time
            const timeTaken = (endTime - startTime) / 1000; // Calculate the time taken in seconds
            // Play win sound
            document.getElementById('win-sound').play();
            setTimeout(() => alert(`You win! Time taken: ${timeTaken.toFixed(2)} seconds, Moves: ${moveCount}`), 100); // Show the win message
        }
    }
}

// Check if the player has won the game
function checkWinCondition() {
    let count = 1; // Create a variable to track the expected number value
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (i === boardSize - 1 && j === boardSize - 1) {
                // Check if the last cell is empty
                return gameArray[i][j].num === 0; // Return true if the last cell is empty
            }
            if (gameArray[i][j].num !== count) {
                return false; // Return false if the number value is not as expected
            }
            count++; // Increment the expected number value
        }
    }
    return true; // Return true if all number values are as expected
}

function updateStatus() {
    const status = document.getElementById('status'); // Get the status element
    status.textContent = `Moves: ${moveCount}`; // Update the text content
}

document.getElementById('restart-button').addEventListener('click', () => {
    document.getElementById('restart-sound').play(); // Play the restart sound
    createLevel(); // Restart the game
});

document.getElementById('board-size').addEventListener('change', (event) => {
    boardSize = parseInt(event.target.value); // Update the board size
    createLevel(); // Create a new game board
});

window.onload = createLevel; // Call the createLevel function when the window loads
