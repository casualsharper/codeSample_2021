import React, { useState } from "react";
import {
  getSudokuBoard,
  solveSudoku,
  getSampleSudokuBoard,
  SudokuFieldProps,
} from "./sudoku/sudokuboard";
import "./App.css";

const App = () => {
  const [sudokuGrid, setSudokuGrid] = useState(getSudokuBoard());
  const [errorMessage, setErrorMessage] = useState("");

  function isNumeric(str: any) {
    return !isNaN(str) && !isNaN(parseFloat(str));
  }

  const onResetClicked = () => {
    setSudokuGrid(getSudokuBoard());
  };

  const onExampleClicked = () => {
    setSudokuGrid(getSampleSudokuBoard());
  };

  const onSolveClicked = () => {
    try {
      const newBoardState = solveSudoku(sudokuGrid);

      setSudokuGrid(newBoardState);
      setErrorMessage("");
    } catch {
      setErrorMessage("Error: Unsolvable sudoku");
    }
  };

  const onFieldKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const acceptedInputs = [
      "Digit0",
      "Digit1",
      "Digit2",
      "Digit3",
      "Digit4",
      "Digit5",
      "Digit6",
      "Digit7",
      "Digit8",
      "Digit9",
      "Numpad1",
      "Numpad2",
      "Numpad3",
      "Numpad4",
      "Numpad5",
      "Numpad6",
      "Numpad7",
      "Numpad8",
      "Numpad9",
      "Numpad0",
      "Space",
      "Backspace",
    ];

    const nextFieldInputs = ["Space", "Numpad0", "Digit0"];

    if (
      !acceptedInputs.includes(event.code) &&
      !(event.shiftKey || event.altKey || event.ctrlKey)
    ) {
      event.preventDefault();
      return;
    }

    if (!nextFieldInputs.includes(event.code)) {
      return;
    }
  };

  const onFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    sudokuField: SudokuFieldProps | undefined
  ) => {
    if (!event.target.value && sudokuField) {
      sudokuField.value = null;
      const tempSudoku = [...sudokuGrid];
      setSudokuGrid(tempSudoku);
    }

    const newValue = Array.from(event.target.value).pop();

    if (newValue && isNumeric(newValue) && sudokuField) {
      const newNumber = parseInt(newValue);

      if (newNumber > 9 || newNumber < 1) {
        return;
      }

      sudokuField.value = newNumber;
      const tempSudoku = [...sudokuGrid];
      setSudokuGrid(tempSudoku);
    }
  };

  const drawSudokuGrid = (sudokuGrid: SudokuFieldProps[]) => {
    const tbodies = [];
    let rows = [];

    for (let row = 0; row < 9; row++) {
      const rowFields = [];

      for (let column = 0; column < 9; column++) {
        const field = sudokuGrid?.find((f) => {
          return f.column === column && f.row === row;
        });
        rowFields.push(
          <td key={column}>
            <input
              type="number"
              pattern="\d*"
              onKeyDownCapture={onFieldKeyDown}
              onChange={(event) => {
                onFieldChange(event, field);
              }}
              value={field?.value ?? ""}
            ></input>
          </td>
        );
      }

      rows.push(<tr key={rows.length + 1}>{rowFields}</tr>);

      if ((row + 1) % 3 === 0) {
        tbodies.push(<tbody key={tbodies.length + 1}>{rows}</tbody>);
        rows = [];
      }
    }

    const sudokuGridFields = <>{tbodies}</>;

    return sudokuGridFields;
  };

  return (
    <div className="App">
      <table>
        <caption>Sudoku solver 3000</caption>
        <colgroup>
          <col />
          <col />
          <col />
        </colgroup>
        <colgroup>
          <col />
          <col />
          <col />
        </colgroup>
        <colgroup>
          <col />
          <col />
          <col />
        </colgroup>
        {drawSudokuGrid(sudokuGrid)}
      </table>
      <div>{errorMessage}</div>
      <div>
        <button onClick={onSolveClicked}>Solve</button>
        <button onClick={onExampleClicked}>Example</button>
        <button onClick={onResetClicked}>Reset</button>
      </div>
    </div>
  );
};

export default App;
