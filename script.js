const boxes = document.querySelectorAll(".box");


const restart = document.getElementById("restart");
const O = "O";
const X = "X";

const WINNING_SCORE = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let currentPlayer = O;

const board = [null, null, null, null, null, null, null, null, null];

const boxClicked = (e) => {
  const id = e.target.id;

  if (!board[id]) {
    board[id] = currentPlayer;
    e.target.innerText = currentPlayer;
    if (checkLine()) endGame();
    if (!board.some((e) => e === null)) endGame("draw");

    currentPlayer = currentPlayer === O ? X : O;
    
  }
};
const endGame = (result) => {
  intro.innerText =
    result === "draw"
      ? "It's a draw!"
      : "Player " + currentPlayer + " has won!";
  boxes.forEach((box) => box.removeEventListener("click", boxClicked));
  console.log("GAME ENDED!");
};

const resartGame = () => {
  currentPlayer = O;
  board.fill(null);
  boxes.forEach((box) => {
    box.innerText = "";
  });

  intro.innerText = "Let's play!";
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
};

const checkLine = () => {
  return WINNING_SCORE.some((combination) => {
    if (
      currentPlayer === board[combination[0]] &&
      board[combination[0]] === board[combination[1]] &&
      board[combination[0]] === board[combination[2]]
    )
      return true;
    return false;
  });
};

boxes.forEach((box) => box.addEventListener("click", boxClicked));
restart.addEventListener("click", resartGame);
