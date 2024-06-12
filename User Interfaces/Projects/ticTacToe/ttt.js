var board = ["", "", "", "", "", "", "", "", ""];
var currentPlayer = "X";
var currentMove = 0;
var gameActive = true;
var historyInformation = Array(9).fill(null);

var winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/*
 * Function to check the winner of the game
 */
function checkWinner() {
  for (var i = 0; i < winningConditions.length; i++) {
    var [a, b, c] = winningConditions[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

/*
 * Function to handle the cell click event
 */
function handleCellClick() {
  var index = this.getAttribute("data-index");
  if (board[index] !== "" || !gameActive) {
    return;
  }

  board[index] = currentPlayer;
  for (let i = index + 1; i < board.length; i++) {
    board[i] = "";
  }
  this.textContent = currentPlayer;
  this.classList.add("disabled");
  currentMove++;
  historyInformation[currentMove] = board.slice();
  for (let i = currentMove + 1; i < historyInformation.length; i++) {
    historyInformation[i] = null;
  }

  renderInformation();

  if (checkWinner()) {
    document.querySelector("#message").textContent =
      "Player " + currentPlayer + " wins!";
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    document.querySelector("#message").textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  document.querySelector("#message").textContent =
    "Next Player: " + currentPlayer;
}

/*
 * Function to reset the game
 */
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  currentMove = 0;
  gameActive = true;
  historyInformation = Array(9).fill(null);
  historyInformation[0] = board.slice();
  let cells = document.querySelectorAll(".cell");
  cells.forEach(function (cell) {
    cell.textContent = "";
    cell.classList.remove("disabled");
  });
  document.querySelector("#message").textContent =
    "Next Player: " + currentPlayer;
  renderInformation();
}

/*
 * Function to render the history information
 */
function renderInformation() {
  const historyElement = document.getElementById("history");
  historyElement.innerHTML = "";
  for (let index = 0; index < historyInformation.length; index++) {
    let description;
    if (historyInformation[index] === null) {
      break;
    }
    if (index > 0) {
      description = "Go to move #" + index;
    } else {
      description = "Go to game start";
    }
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.classList.add("btn", "btn-sm", "m-1");
    button.setAttribute("data-index", index);
    button.textContent = description;
    button.addEventListener("click", handleHistoryClick);
    li.appendChild(button);
    historyElement.appendChild(li);
  }
}

/*
 * Function to handle the history click event
 */
function handleHistoryClick() {
  var index = this.getAttribute("data-index");
  board = historyInformation[index].slice();
  currentPlayer = index % 2 === 0 ? "X" : "O";
  currentMove = index;
  gameActive = true;
  const cells = document.querySelectorAll(".cell");
  cells.forEach(function (cell, index) {
    cell.textContent = board[index] === "" ? "" : board[index];
    cell.classList.toggle("disabled", board[index] !== "");
  });
  renderInformation();
}

/*
 * load the game board on window load
 */
window.onload = function () {
  const boardElement = document.getElementById("board");
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add(
      "cell",
      "bg-gray-100",
      "aspect-square",
      "flex",
      "items-center",
      "justify-center",
      "enabled:cursor-pointer",
      "text-2xl"
    );
    cell.setAttribute("data-index", i);
    cell.addEventListener("click", handleCellClick);
    boardElement.appendChild(cell);
  }
  resetGame();
};
