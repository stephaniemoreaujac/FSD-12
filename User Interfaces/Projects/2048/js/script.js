/*
2048 Game made for User Interfaces class project by:
Sean Darbyson, Jay Safdari, Amine Mankai
*/

let score = 0;
const winningNumber = 2048;
$(document).ready(function() {
    // Initialize the game grid
    initializeGrid();

    // Add initial numbers
    addNewNumber();
    addNewNumber();

    // Handle keydown events
    $(document).keydown(function(event) {
        let moved = false;
        switch(event.key) {
            case "ArrowUp":
                moved = moveUp();
                break;
            case "ArrowDown":
                moved = moveDown();
                break;
            case "ArrowLeft":
                moved = moveLeft();
                break;
            case "ArrowRight":
                moved = moveRight();
                break;
        }
        if (moved) {
            addNewNumber();
            if (checkGameOver()) {
                setTimeout(() => {
                    alert("Game Over!");
                }, 1000);
            }
        }
    });

    // Reset the game
    $('#reset-button').click(function() {
        resetGame();
    });
});

/**
 * Initializes the game grid by creating a 4x4 grid with unique IDs for each cell.
 */
function initializeGrid() {
    const gridContainer = $('#grid-container');
    for (let index = 0; index < 16; index++) {
        const gridCell = $('<div/>').addClass('grid-cell').attr('id', 'cell-' + index);
        gridContainer.append(gridCell);
    }
}

/**
 * Adds a new number (2 or 4) to a random empty cell in the grid.
 */
function addNewNumber() {
    let emptyCells = [];
    // Loop through all cells to find empty ones
    for (let i = 0; i < 16; i++) {
        if ($('#cell-' + i).text() === "") {
            emptyCells.push(i);
        }
    }
    // If there are any empty cells, add a new number to one of them
    if (emptyCells.length > 0) {
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const newValue = Math.random() < 0.80 ? 2 : 4;
        $('#cell-' + randomIndex).text(newValue).attr('class', 'grid-cell number-' + newValue);
    }
}

/**
 * Updates the score display.
 */
function updateScore() {
    $('#score').text(score);
}

/**
 * Resets the game by clearing the grid and adding initial numbers.
 */
function resetGame() {
    score = 0; 
    updateScore(); 
    for (let i = 0; i < 16; i++) {
        $('#cell-' + i).text("").attr('class', 'grid-cell');
    }
    addNewNumber();
    addNewNumber();
}

/**
 * Moves the numbers in the grid upwards and merges cells if necessary.
 * @returns {boolean} - Returns true if any cell was moved, otherwise false.
 */
function moveUp() {
    let moved = false;

    // Loop through each column
    for (let col = 0; col < 4; col++) {
        let cells = [];

        // Collect non-empty cells in the current column
        for (let row = 0; row < 4; row++) {
            let cell = $('#cell-' + (row * 4 + col)).text();
            if (cell !== "") {
                cells.push(parseInt(cell));
            }
        }

        cells = merge(cells);

        // Update the grid with merged values
        for (let row = 0; row < 4; row++) {
            
            // Check if the current cell value is different from the new value
            if ($('#cell-' + (row * 4 + col)).text() !== (cells[row] || "").toString()) {
                moved = true;
            }

            // Update the cell with the new value and assign the corresponding CSS class
            $('#cell-' + (row * 4 + col))
                .text(cells[row] || "")
                .attr('class', 'grid-cell ' + (cells[row] ? 'number-' + cells[row] : ''));
        }
    }
    return moved;
}

/**
 * Moves the numbers in the grid downwards and merges cells if necessary.
 * @returns {boolean} - Returns true if any cell was moved, otherwise false.
 */
function moveDown() {
    let moved = false;

    // Loop through each column
    for (let col = 0; col < 4; col++) {
        let cells = [];

        // Collect non-empty cells in the current column from bottom to top
        for (let row = 3; row >= 0; row--) {
            let cell = $('#cell-' + (row * 4 + col)).text();
            if (cell !== "") {
                cells.push(parseInt(cell));
            }
        }
        cells = merge(cells);
        for (let row = 3; row >= 0; row--) {
            if ($('#cell-' + (row * 4 + col)).text() !== (cells[3 - row] || "").toString()) {
                moved = true;
            }
            $('#cell-' + (row * 4 + col))
                .text(cells[3 - row] || "")
                .attr('class', 'grid-cell ' + (cells[3 - row] ? 'number-' + cells[3 - row] : ''));
        }
    }
    return moved;
}

/**
 * Moves the numbers in the grid to the left and merges cells if necessary.
 * @returns {boolean} - Returns true if any cell was moved, otherwise false.
 */
function moveLeft() {
    let moved = false;
    for (let row = 0; row < 4; row++) {
        let cells = [];
        for (let col = 0; col < 4; col++) {
            let cell = $('#cell-' + (row * 4 + col)).text();
            if (cell !== "") {
                cells.push(parseInt(cell));
            }
        }
        cells = merge(cells);
        for (let col = 0; col < 4; col++) {
            if ($('#cell-' + (row * 4 + col)).text() !== (cells[col] || "").toString()) {
                moved = true;
            }
            $('#cell-' + (row * 4 + col))
                .text(cells[col] || "")
                .attr('class', 'grid-cell ' + (cells[col] ? 'number-' + cells[col] : ''));
        }
    }
    return moved;
}

/**
 * Moves the numbers in the grid to the right and merges cells if necessary.
 * @returns {boolean} - Returns true if any cell was moved, otherwise false.
 */
function moveRight() {
    let moved = false;
    for (let row = 0; row < 4; row++) {
        let cells = [];
        for (let col = 3; col >= 0; col--) {
            let cell = $('#cell-' + (row * 4 + col)).text();
            if (cell !== "") {
                cells.push(parseInt(cell));
            }
        }
        cells = merge(cells);
        for (let col = 3; col >= 0; col--) {
            if ($('#cell-' + (row * 4 + col)).text() !== (cells[3 - col] || "").toString()) {
                moved = true;
            }
            $('#cell-' + (row * 4 + col))
                .text(cells[3 - col] || "")
                .attr('class', 'grid-cell ' + (cells[3 - col] ? 'number-' + cells[3 - col] : ''));
        }
    }
    return moved;
}

/**
 * Merges adjacent cells with the same value in a single direction.
 * @param {Array} cells - Array of cell values to be merged.
 * @returns {Array} - Merged array with combined values and empty spaces.
 */
function merge(cells) {
    // If there are no cells, return the empty array
    if (cells.length === 0) return cells;

    let merged = [];
    
    // Loop through the cells and merge adjacent cells with the same value
    while (cells.length > 0) {
        if (cells.length > 1 && cells[0] === cells[1]) {

            // If the first two cells have the same value, merge them
            let newValue = cells.shift() * 2;
            merged.push(newValue);
            cells.shift();
            // Add the merged value to the score
            score += newValue;
            updateScore();


            if (newValue === winningNumber) { 
                setTimeout(() => { alert("Congratulations! You win!"); }, 1000);
            }
        } else {
            // If the first two cells do not have the same value, move the first cell to the merged array
            merged.push(cells.shift());
        }
    }
    // Fill the remaining spaces with empty strings to maintain the grid size
    while (merged.length < 4) {
        merged.push("");
    }
    return merged;
}

/**
 * Checks if the game is over by determining if there are no empty cells and no possible merges.
 * @returns {boolean} - Returns true if the game is over, otherwise false.
 */
function checkGameOver() {
    // Check for any empty cells
    for (let i = 0; i < 16; i++) {
        if ($('#cell-' + i).text() === "") {
            return false;
        }
    }

    // Check for any possible merges
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            let current = $('#cell-' + (row * 4 + col)).text();

            // Check if the current cell can merge with the cell above
            if (row > 0 && current === $('#cell-' + ((row - 1) * 4 + col)).text()) {
                return false;
            }

            // Check if the current cell can merge with the cell below
            if (row < 3 && current === $('#cell-' + ((row + 1) * 4 + col)).text()) {
                return false;
            }

            // Check if the current cell can merge with the cell to the left
            if (col > 0 && current === $('#cell-' + (row * 4 + col - 1)).text()) {
                return false;
            }

            // Check if the current cell can merge with the cell to the right
            if (col < 3 && current === $('#cell-' + (row * 4 + col + 1)).text()) {
                return false;
            }
        }
    }

    // No empty cells and no possible merges
    return true;
}
