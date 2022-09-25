import React from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Lights Out</h1>
        <p>Select a cell to toggle lights</p>
        <p>Wasting electricity is not great! Turn all of the lights out to win!</p>
      </div>
      <div className="Board">
        <table className="Board-table">
          <tbody>
            <Board nrows={6} ncols={6} chanceLightStartsOn={.1}/>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
