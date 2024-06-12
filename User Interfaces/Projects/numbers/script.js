// Wait for the DOM content to be fully loaded before executing JavaScript
document.addEventListener("DOMContentLoaded", () => {
    let gridSize = 4;
    let gameBoard = document.getElementById('game-board');
    let grid = [];
    let selected = [];
    let movesLeft = gridSize * gridSize;
    let score = 0;
    let bestScore = localStorage.getItem('bestScore') || 0;

    // Update score display initially
    updateScore();

    /**
     * Function to update score display
     */
    function updateScore() {
        const scoreDisplay = document.getElementById('score');
        const bestScoreDisplay = document.getElementById('best-score');
        scoreDisplay.textContent = score;
        bestScoreDisplay.textContent = bestScore;
    }
    /**
     * Function to start or reset the game
     */
    function startGame() {
        gameBoard.innerHTML = ''; // Clear the game board
        selected = [];
        movesLeft = gridSize * gridSize;
        score = 0;
        updateScore();
        adjustBoardSize();

        // Generate the grid with random numbers between 1 and 9
        for (let row = 0; row < gridSize; row++) {
            grid[row] = [];
            for (let col = 0; col < gridSize; col++) {
                let number = Math.floor(Math.random() * 9) + 1;
                grid[row][col] = number;

                const square = document.createElement('div');
                square.classList.add('square');
                square.dataset.row = row;
                square.dataset.col = col;
                square.textContent = number;
                gameBoard.appendChild(square);

                // Add event listener for square click
                square.addEventListener('click', () => {
                    handleSquareClick(row, col, square);
                });
            }
        }
        // Hide the game over message
        document.getElementById('game-over-modal').style.display = 'none';
    }

    /**
     * Function to adjust the board size and square size
     */
    function adjustBoardSize() {
        let squareSize = 100;

        if (gridSize === 8) {
            squareSize = 50;
        } else if (gridSize === 10) {
            squareSize = 40;
        }

        document.documentElement.style.setProperty('--grid-size', gridSize);
        document.documentElement.style.setProperty('--square-size', `${squareSize}px`);
    }

    // Event listener for the Start Game button
    document.getElementById('start-game-btn').addEventListener('click', startGame);

    // Event listener for the Easy button
    document.getElementById('easy-level-btn').addEventListener('click', () => {
        gridSize = 4;
        startGame();
    });

    // Event listener for the Medium button
    document.getElementById('medium-level-btn').addEventListener('click', () => {
        gridSize = 8;
        startGame();
    });

    // Event listener for the Difficult button
    document.getElementById('difficult-level-btn').addEventListener('click', () => {
        gridSize = 10;
        startGame();
    });

    /**
     * Function to handle square click
     */
    function handleSquareClick(row, col, squareElement) {
        if (squareElement.classList.contains('cleared')) return;

        const alreadySelectedIndex = selected.findIndex(sq => sq.row === row && sq.col === col);
        if (alreadySelectedIndex !== -1) {
            // Deselect the square if it is already selected
            squareElement.classList.remove('selected');
            selected.splice(alreadySelectedIndex, 1);
        } else {
            // Select the square
            if (selected.length < 2) {
                squareElement.classList.add('selected');
                selected.push({ row, col, element: squareElement });

                if (selected.length === 2) {
                    const [first, second] = selected;
                    const firstNumber = grid[first.row][first.col];
                    const secondNumber = grid[second.row][second.col];

                    if (isPathClear(first, second) &&
                        (firstNumber === secondNumber || firstNumber + secondNumber === 10)) {
                        // Clear the squares
                        first.element.classList.add('cleared');
                        second.element.classList.add('cleared');
                        grid[first.row][first.col] = 0;
                        grid[second.row][second.col] = 0;
                        movesLeft -= 2;

                        // Update score
                        if (firstNumber === secondNumber) {
                            score += 5; // If the numbers are the same, add 5 points
                        } else {
                            score += 10; // If the numbers sum up to 10, add 10 points
                        }
                        updateScore();

                        // Check if the game is successfully completed
                        if (movesLeft === 0) {
                            endGame();
                        }
                    }

                    // Deselect squares after checking
                    setTimeout(() => {
                        first.element.classList.remove('selected');
                        second.element.classList.remove('selected');
                        selected = [];
                    }, 500);
                }
            }
        }
    }

    /**
  * Function to check if there are no more valid moves
  */
    function isPathClear(first, second) {
        if (first.row === second.row) {
            // Check horizontal path
            const row = first.row;
            const startCol = Math.min(first.col, second.col) + 1;
            const endCol = Math.max(first.col, second.col);
            for (let col = startCol; col < endCol; col++) {
                if (grid[row][col] !== 0) return false;
            }
            return true;
        } else if (first.col === second.col) {
            // Check vertical path
            const col = first.col;
            const startRow = Math.min(first.row, second.row) + 1;
            const endRow = Math.max(first.row, second.row);
            for (let row = startRow; row < endRow; row++) {
                if (grid[row][col] !== 0) return false;
            }
            return true;
        }
        // Check diagonal path
        const dx = Math.abs(first.row - second.row);
        const dy = Math.abs(first.col - second.col);

        if (dx === dy) {
            const rowStep = (second.row - first.row) / dx;
            const colStep = (second.col - first.col) / dy;
            let currentRow = first.row + rowStep;
            let currentCol = first.col + colStep;

            while (currentRow !== second.row && currentCol !== second.col) {
                if (grid[Math.round(currentRow)][Math.round(currentCol)] !== 0) return false;
                currentRow += rowStep;
                currentCol += colStep;
            }
            return true;
        }
        return false;
    }

    /**
     * Function to check if there are no more valid moves
     */
    function checkNoMoreMoves() {
        for (let row1 = 0; row1 < gridSize; row1++) {
            for (let col1 = 0; col1 < gridSize; col1++) {
                if (grid[row1][col1] === 0) continue;
                for (let row2 = 0; row2 < gridSize; row2++) {
                    for (let col2 = 0; col2 < gridSize; col2++) {
                        if ((row1 !== row2 || col1 !== col2) && grid[row2][col2] !== 0) {
                            if (isPathClear({ row: row1, col: col1 }, { row: row2, col: col2 })) {
                                const sum = grid[row1][col1] + grid[row2][col2];
                                if (grid[row1][col1] === grid[row2][col2] || sum === 10) { // Check if the numbers are equal or sum up to 10
                                    return false; // There is at least one valid move
                                }
                            }
                        }
                    }
                }
            }
        }
        return true; // No valid moves left
    }
    /**
  * Function to end the game
  */
    function endGame() {
        if (score > bestScore) {
            bestScore = score;
            localStorage.setItem('bestScore', bestScore);
        }

        // Show the modal with the final scores
        const modal = document.getElementById('game-over-modal');
        const gameOverMessage = document.getElementById('game-over-message');
        gameOverMessage.textContent = `Game Over!\nYour final score is ${score}.\nBest score is ${bestScore}.` ;
        modal.style.display = 'block';

    }

    // Check for game over condition
    setInterval(() => {
        if (checkNoMoreMoves()) {
            endGame();
        }
    }, 1000);
});
