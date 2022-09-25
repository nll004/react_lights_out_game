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
        // randomly assign true or false to cells
        if(Math.random() >= chanceLightStartsOn) column.push(true);
        else column.push(false);
      };
      initialBoard.push(column)
    }
    return initialBoard;
  }

  function hasWon() {
    console.log('hasWon func checked', board)
    return board.map(r=>r.every(val => val === false))
  }

  function flipCellsAround(coord) {

    setBoard(oldBoard => {
      const [x, y] = coord.split("-").map(Number);

      const flipCell = (x, y, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
        // change values above, below, right and left if they exist on board
        if (x - 1 >= 0) boardCopy[y][x-1] = !boardCopy[y][x-1];
        if (x + 1 < ncols) boardCopy[y][x+1] = !boardCopy[y][x+1];
        if (y - 1 >= 0) boardCopy[y-1][x] = !boardCopy[y-1][x];
        if (y + 1 < nrows) boardCopy[y+1][x] = !boardCopy[y+1][x];

        return boardCopy
      };

      const boardCopy = JSON.parse(JSON.stringify(board)) // deep copy of board
      const rearrangedBoard = flipCell(x,y,boardCopy)

      return rearrangedBoard
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  // if (hasWon){
  //   return alert("Horray! All lights are off!")
  // }

  return (
    board.map((r,y) =>
      <tr className="Board-row" key={y}>
        { r.map((c,x) =>
            <Cell isLit={c}
                  key={`${x}-${y}`}
                  id={`${x}-${y}`}
                  coord={`${x}-${y}`}
                  flipCellsAround={flipCellsAround}
            />
        )}
      </tr>
    )
  )
}

export default Board;
