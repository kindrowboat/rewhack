import React, { Component } from 'react';
import './GameBoard.css';
import MoleHole from './MoleHole';

class GameBoard extends Component {
  
  render(){
    return (
      <div className="GameBoard">
        <div className="MoleRow">
          <MoleHole mole/>
          <MoleHole/>
          <MoleHole/>
        </div>
        <div className="MoleRow">
          <MoleHole/>
          <MoleHole/>
          <MoleHole/>
        </div>
        <div className="MoleRow">
          <MoleHole/>
          <MoleHole mole/>
          <MoleHole/>
        </div>
      </div>
    );
  }
}

export default GameBoard;