import React, { Component } from 'react';
import './GameBoard.css';
import MoleHole from './MoleHole';

class GameBoard extends Component {

  rows = 3;
  holesPerRow = 3;

  constructor(props){
    super(props);
    this.state = { holes: [] };
    for(let i = 0; i < this.rows * this.holesPerRow; i++) {
      this.state.holes.push({mole: false, whacked: false});
    }
  }

  moleRow(rowNum){
    const startIndex = rowNum * this.holesPerRow;
    const stopIndex = startIndex + this.holesPerRow;
    const holes = [];

    for(let i = startIndex; i < stopIndex; i++){
      const holeState = this.state.holes[i];
      holes.push(<MoleHole {...holeState}/>);
    }

    return(
      <div className="MoleRow">
        { holes }
      </div>
    );
  }

  render(){
    return (
      <div className="GameBoard">
        { Array(this.rows).fill().map((_, i) => this.moleRow(i)) }
      </div>
    );
  }
}

export default GameBoard;