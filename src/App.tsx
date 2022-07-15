import React, { useState } from "react";
import {
  getSudokuBoard,
  solveBoard,
  getSampleSudokuBoard,
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
    const tempSudokuGrid = [...sudokuGrid];

    const isSolved = solveBoard(tempSudokuGrid);

    setSudokuGrid(tempSudokuGrid);

    if (isSolved) {
      setErrorMessage("");
    } else {
      setErrorMessage("Unsolvable");
    }
  };

  const focusInputField = (fieldName: string) => {
    let focusInputField: HTMLInputElement | null = document.querySelector(
      'input[name="' + fieldName + '"]'
    );

    if (!focusInputField) {
      focusInputField = document.querySelector('input[name="field_0"]');
    }

    focusInputField?.focus();
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
    const previousFieldInputs = ["Backspace"];

    if (
      !acceptedInputs.includes(event.code) &&
      !(event.shiftKey || event.altKey || event.ctrlKey)
    ) {
      event.preventDefault();
      return;
    }

    let fieldNumber = parseInt(event.currentTarget.name.split("_")[1]);

    if (previousFieldInputs.includes(event.code)) {
      fieldNumber--;

      if (fieldNumber < 0) {
        fieldNumber = 80;
      }

      const previousFieldName = "field_" + fieldNumber;

      focusInputField(previousFieldName);

      return;
    }

    if (!nextFieldInputs.includes(event.code)) {
      return;
    }

    fieldNumber++;

    if (fieldNumber > 80) {
      fieldNumber = 0;
    }

    const nextFieldName = "field_" + fieldNumber;

    focusInputField(nextFieldName);
  };

  const onFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: number,
    column: number
  ) => {
    if (!event.target.value) {
      const tempSudoku = [...sudokuGrid];
      tempSudoku[row][column] = ".";
      setSudokuGrid(tempSudoku);
    }

    const newValue = Array.from(event.target.value).pop();

    if (newValue && isNumeric(newValue)) {
      const newNumber = parseInt(newValue);

      if (newNumber > 9 || newNumber < 1) {
        return;
      }

      const tempSudoku = [...sudokuGrid];
      tempSudoku[row][column] = newValue;
      setSudokuGrid(tempSudoku);

      const nextFieldName =
        "field_" + (parseInt(event.currentTarget.name.split("_")[1]) + 1);

      focusInputField(nextFieldName);
    }
  };

  const drawSudokuGrid = (sudokuGrid: any[][]) => {
    const tbodies = [];
    let rows = [];

    let fieldNum = 0;

    for (let row = 0; row < sudokuGrid.length; row++) {
      const rowFields = [];
      const columns = sudokuGrid[row];
      for (let column = 0; column < columns.length; column++) {
        rowFields.push(
          <td key={column}>
            <input
              name={"field_" + fieldNum.toString()}
              type="number"
              pattern="\d*"
              onKeyDownCapture={onFieldKeyDown}
              onChange={(event) => {
                onFieldChange(event, row, column);
              }}
              value={columns[column] === "." ? "" : columns[column]}
            ></input>
          </td>
        );

        fieldNum++;
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
