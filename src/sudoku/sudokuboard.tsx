const isValid = (board: string[][], row: number, col: number, k: number) => {
  for (let i = 0; i < 9; i++) {
    const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const n = 3 * Math.floor(col / 3) + (i % 3);
    if (
      board[row][i] === k.toString() ||
      board[i][col] === k.toString() ||
      board[m][n] === k.toString()
    ) {
      return false;
    }
  }
  return true;
};

export const solveBoard = (boardData: string[][]) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (boardData[i][j] === ".") {
        for (let k = 1; k <= 9; k++) {
          if (isValid(boardData, i, j, k)) {
            boardData[i][j] = `${k}`;
            if (solveBoard(boardData)) {
              return true;
            } else {
              boardData[i][j] = ".";
            }
          }
        }
        return false;
      }
    }
  }
  return true;
};

export const getSudokuBoard = (): string[][] => {
  const board: any[] = [];

  for (let row = 0; row < 9; row++) {
    board[row] = [];

    for (let column = 0; column < 9; column++) {
      board[row][column] = ".";
    }
  }

  return board;
};

export const getSampleSudokuBoard = (): string[][] => {
  const sampleBoard = getSudokuBoard();

  sampleBoard[0][0] = "2";
  sampleBoard[0][3] = "5";
  sampleBoard[0][4] = "3";
  sampleBoard[0][7] = "6";
  sampleBoard[0][8] = "4";

  sampleBoard[1][0] = "7";
  sampleBoard[1][2] = "3";
  sampleBoard[1][7] = "9";

  sampleBoard[2][6] = "1";
  sampleBoard[2][7] = "3";

  sampleBoard[3][0] = "1";
  sampleBoard[3][6] = "6";

  sampleBoard[4][1] = "8";
  sampleBoard[4][3] = "9";
  sampleBoard[4][7] = "2";
  sampleBoard[4][8] = "7";

  sampleBoard[5][0] = "3";
  sampleBoard[5][3] = "6";
  sampleBoard[5][5] = "7";
  sampleBoard[5][6] = "9";

  sampleBoard[6][4] = "4";
  sampleBoard[6][7] = "7";
  sampleBoard[6][8] = "1";

  sampleBoard[7][2] = "5";
  sampleBoard[7][5] = "6";
  sampleBoard[7][6] = "3";

  sampleBoard[8][1] = "3";
  sampleBoard[8][2] = "7";
  sampleBoard[8][4] = "9";
  sampleBoard[8][8] = "6";

  return sampleBoard;
};
