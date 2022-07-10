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

const mergeUnique = (arr1: any[], arr2: any[]) : any[] => {
    return arr1.concat(arr2.filter(function (item) {
        return arr1.indexOf(item) === -1;
    }));
}

const setBoardField = (row: number, column: number, value: number, tempBoard: SudokuFieldProps[]) => {
    const field = tempBoard.find(f => {return f.column === column && f.row === row});

    if(!field)
    {
        return;
    }

    field.value = value;
}

const solveOneStep = (tempBoard: SudokuFieldProps[]) : boolean => {
    let result = false;
    const emptyFields = tempBoard.filter(f => {return f.value === null});
    const possibleValues = [1,2,3,4,5,6,7,8,9];

    if(emptyFields.length === 0)
    {
        return false;
    }

    emptyFields.forEach(emptyField => {
        const row = tempBoard.filter(f => {return f.row === emptyField.row && f.value}).map(m => {return m.value});
        const column = tempBoard.filter(f => {return f.column === emptyField.column && f.value}).map(m => {return m.value});
        const block = tempBoard.filter(f => {return f.block === emptyField.block && f.value}).map(m => {return m.value});
        
        const usedValues = mergeUnique(mergeUnique(row,column), block);

        emptyField.possibleValues = possibleValues.filter(f => {return !usedValues.includes(f)})
    });

    const knownFields = tempBoard.filter(f => {return f.possibleValues.length === 1});

    const errorFields = tempBoard.filter(f => {return f.possibleValues.length === 0 && f.value === null});

    if(knownFields.length === 0 || errorFields.length !== 0)
    {
        throw new Error('Unsolvable');
    }
    
    knownFields.forEach(knownField => {
        knownField.value = knownField.possibleValues[0];
        result = true;
    });

    return result;
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

export const getSampleSudokuBoard = () : SudokuFieldProps[] => {
    const sampleBoard = getSudokuBoard();

    setBoardField(0,1,1,sampleBoard);
    setBoardField(0,5,9,sampleBoard);
    setBoardField(0,8,8,sampleBoard);
    setBoardField(1,0,2,sampleBoard);
    setBoardField(1,2,7,sampleBoard);
    setBoardField(1,4,3,sampleBoard);
    setBoardField(2,2,4,sampleBoard);
    setBoardField(2,3,6,sampleBoard);
    setBoardField(2,5,2,sampleBoard);
    setBoardField(2,7,3,sampleBoard);
    setBoardField(3,0,3,sampleBoard);
    setBoardField(3,1,7,sampleBoard);
    setBoardField(3,2,8,sampleBoard);
    setBoardField(3,3,4,sampleBoard);
    setBoardField(3,8,9,sampleBoard);
    setBoardField(4,0,4,sampleBoard);
    setBoardField(4,1,2,sampleBoard);
    setBoardField(4,2,9,sampleBoard);
    setBoardField(4,7,8,sampleBoard);
    setBoardField(4,8,1,sampleBoard);
    setBoardField(5,1,6,sampleBoard);
    setBoardField(5,2,1,sampleBoard);
    setBoardField(5,3,9,sampleBoard);
    setBoardField(5,4,2,sampleBoard);
    setBoardField(5,5,8,sampleBoard);
    setBoardField(5,6,4,sampleBoard);
    setBoardField(6,2,6,sampleBoard);
    setBoardField(6,4,8,sampleBoard);
    setBoardField(6,5,4,sampleBoard);
    setBoardField(6,6,3,sampleBoard);
    setBoardField(6,8,7,sampleBoard);
    setBoardField(7,1,4,sampleBoard);
    setBoardField(7,4,9,sampleBoard);
    setBoardField(7,7,1,sampleBoard);
    setBoardField(8,0,8,sampleBoard);
    setBoardField(8,1,3,sampleBoard);
    setBoardField(8,6,6,sampleBoard);
    setBoardField(8,8,4,sampleBoard);

    return sampleBoard;
}

export const solveSudoku = (sudokuBoard: SudokuFieldProps[]) : SudokuFieldProps[] => {
    const tempBoard = [...sudokuBoard];

    let result = false;

    do {
        result = solveOneStep(tempBoard);
    } while(result)

    return tempBoard;
}