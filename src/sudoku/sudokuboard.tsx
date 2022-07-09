export interface SudokuFieldProps {
    readonly row: number;
    readonly column: number;
    readonly block: number;
    value: number | null;
    possibleValues: number[];
}

const getBlockNumber = (row: number, column: number) => {
    return Math.ceil((column + 1) / 3) + Math.floor(((row + 1) - 0.1) / 3) * 3 - 1;
}

export const getSudokuBoard = () : SudokuFieldProps[]  => {
    const board = [];

    for (let column = 0; column < 9; column++) {
        for (let row = 0; row < 9; row++) {
                board.push({row: row, column: column, block: getBlockNumber(row, column), value: null, possibleValues: []});
        }  
    }

    return board;
}

export default getSudokuBoard;