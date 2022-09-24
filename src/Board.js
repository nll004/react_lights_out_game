import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board for Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** creates a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];

    for(let row = 0; row < nrows; row ++){
      let column = [];
      for(let col = 0; col < ncols; col++){
        // randomly assign '.' or '0' to cells
        if(Math.random() > 0.5) column.push(true);
        else column.push(false);
      };
      initialBoard.push(column)
    }
    console.log('Initial board', initialBoard);
    return initialBoard;
  }

  function hasWon() {
    console.log('hasWon func checked')

    if(board.forEach(r => r.every(val => val === false))) {
      console.log('Winner!')
    }
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard

      // TODO: in the copy, flip this cell and the cells around it

      // TODO: return the copy
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()){
    alert("Horray! All lights are off!")
    return
  }
  else {
    return (
      board.map((r,y) =>
        <tr className="Board-row" key={y}>
          { r.map((c,x) =>
              <Cell id={`${x}-${y}`}
                    isLit={c}
                    key={`${x}-${y}`}
              />
          )}
        </tr>
      )
    )
  }

}

export default Board;
