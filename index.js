const X_CLASS = "x";
const CIRCEL_CLASS = "circel";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const board = document.querySelector("[data-board]");
const cells = document.querySelectorAll("[data-cell]");
const winningMessageText = document.querySelector("[data-winning-message-tex]");
const winningMessage = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
restartButton.addEventListener("click", startGame);
let circelTurn;
let currentClass;
startGame();

function startGame() {
  circelTurn = false;
  currentClass = circelTurn ? CIRCEL_CLASS : X_CLASS;
  [...cells].map((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCEL_CLASS);
    cell.removeEventListener("click", handelClick);
    cell.addEventListener("click", handelClick, { once: true });
  });
  sethowerState();
  // winningMessage.classList.remove("show");
  winningMessage.style.setProperty("display", "none");
}
function handelClick(event) {
  const cell = event.target;
  currentClass = circelTurn ? CIRCEL_CLASS : X_CLASS;
  cell.classList.add(currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
    return;
  }
  if (checkDraw()) {
    endGame(true);
    return;
  }
  swapTurn();
  sethowerState();
}
function swapTurn() {
  circelTurn = !circelTurn;
}
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) =>
    combination.every((value) => cells[value].classList.contains(currentClass))
  );
}
function checkDraw() {
  return [...cells].every(
    (cell) =>
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCEL_CLASS)
  );
}
function endGame(isDraw) {
  if (isDraw) {
    // winningMessage.classList.add("show");
    winningMessage.style.setProperty("display", "flex");
    winningMessageText.innerHTML = "Draw";
  } else {
    // winningMessage.classList.add("show");
    winningMessage.style.setProperty("display", "flex");
    winningMessageText.innerHTML = `${
      circelTurn ? "Circel" : "X"
    } win's the game`;
  }
}
function sethowerState() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCEL_CLASS);
  board.classList.add(circelTurn ? CIRCEL_CLASS : X_CLASS);
}
