import React, { Component } from 'react';
import './GameBoard.css';
import MoleHole from './MoleHole';

class GameBoard extends Component {

  rows = 3;
  holesPerRow = 3;
  moleProbability = 1/3;
  tickFrequency = 2000;

  constructor(props){
    super(props);
    this.state = { holes: [] };
    for(let i = 0; i < this.rows * this.holesPerRow; i++) {
      this.state.holes.push({mole: false, whacked: false});
    }
  }

  componentDidMount() {
    this.tick();
  }

  tick = () => {
    const moleUp = this.moleUp.bind(this);
    const moleDown = this.moleDown.bind(this);
    const tock = this.tick.bind(this);
    const nextTick = this.tickFrequency;
    const moleUpThreshold = this.moleProbability;
    const showMole = (roll) => roll < moleUpThreshold;

    this.state.holes.forEach((hole, i) => {
      const roll = Math.random();
      showMole(roll) ? moleUp(i) : moleDown(i);
    });

    setTimeout(tock, nextTick);
  }

  moleRow = (rowNum) => {
    const startIndex = rowNum * this.holesPerRow;
    const stopIndex = startIndex + this.holesPerRow;
    const holes = [];

    for(let i = startIndex; i < stopIndex; i++){
      const holeState = this.state.holes[i];
      holes.push(
        <MoleHole
          key={i}
          whack={this.whack.bind(this, i)}
          unwhack={this.unwhack.bind(this, i)}
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

  whack = (hole) => {
    this._setHoleState(hole, 'whacked', true);
  }

  unwhack = (hole) => {
    this._setHoleState(hole, 'whacked', false);
    this._setHoleState(hole, 'mole', false);
  }

  moleUp = (hole) => {
    this._setHoleState(hole, 'mole', true);
  }

  moleDown = (hole) => {
    this._setHoleState(hole, 'mole', false);
  }

  _setHoleState = (hole, property, value) => {
    this.setState(state => {
      const prevHoleState = state.holes[hole];
      const holes = state.holes.slice(0);
      holes[hole] = { ...prevHoleState, [property]: value };
      return { ...state, holes };
    });
  }

  render() {
    return (
      <div className="GameBoard">
        { Array(this.rows).fill().map((_, i) => this.moleRow(i)) }
      </div>
    );
  }
}

export default GameBoard;
