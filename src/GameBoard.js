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

  componentDidMount(){
    this.whack(1);
    this.moleUp(2);
    this.moleUp(4);
    this.whack(5);
  }

  moleRow(rowNum){
    const startIndex = rowNum * this.holesPerRow;
    const stopIndex = startIndex + this.holesPerRow;
    const holes = [];

    for(let i = startIndex; i < stopIndex; i++){
      const holeState = this.state.holes[i];
      holes.push(
        <MoleHole
          key={i}
          onClick={this.whack.bind(this, i)}
          {...holeState}
        />
      );
    }

    return(
      <div className="MoleRow" key={rowNum}>
        { holes }
      </div>
    );
  }

  whack(hole){
    this._setHoleState(hole, 'whacked', true);
  }

  moleUp(hole){
    this._setHoleState(hole, 'mole', true);
  }

  _setHoleState(hole, property, value) {
    this.setState(state => {
      const prevHoleState = state.holes[hole];
      const holes = state.holes.slice(0);
      holes[hole] = { ...prevHoleState, [property]: value };
      return { ...state, holes };
    });
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