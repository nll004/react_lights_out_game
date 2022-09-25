import React from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Lights Out</h1>
        <p>Select a cell to toggle lights. Turn all of the lights off to win!</p>
        <div className="Board">
          <table className="Board-table">
            <tbody>
              <Board nrows={4} ncols={6} chanceLightStartsOn={.5}/>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
