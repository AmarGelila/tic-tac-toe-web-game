function randomStartPlayer() {
  return Math.floor(Math.random() * 2) === 0 ? "x" : "o";
}

function randomEmptyCell() {
  return Math.floor(Math.random() * 10);
}

function checkWin(board) {
  for (let i = 0; i < 7; i += 3) {
    if (
      (board[i] === "x" && board[i + 1] === "x" && board[i + 2] === "x") ||
      (board[i] === "o" && board[i + 1] === "o" && board[i + 2] === "o")
    ) {
      return [i, i + 1, i + 2];
    }
  }

  for (let i = 0; i < 3; i++) {
    if (
      (board[i] === "x" && board[i + 3] === "x" && board[i + 6] === "x") ||
      (board[i] === "o" && board[i + 3] === "o" && board[i + 6] === "o")
    ) {
      return [i, i + 3, i + 6];
    }
  }

  if (
    (board[2] === "x" && board[4] === "x" && board[6] === "x") ||
    (board[2] === "o" && board[4] === "o" && board[6] === "o")
  ) {
    return [2, 4, 6];
  }

  if (
    (board[0] === "x" && board[4] === "x" && board[8] === "x") ||
    (board[0] === "o" && board[4] === "o" && board[8] === "o")
  ) {
    return [0, 4, 8];
  }
}

export { randomStartPlayer, randomEmptyCell, checkWin };
