import React, { Component } from 'react';
import './GameBoard.css';
import MoleHole from './MoleHole';

class GameBoard extends Component {

  rows = 3;
  holesPerRow = 3;
  moleProbability = 1/3;
  tickFrequency = 2000;
  whackShowDuration = 250;

  constructor(props){
    super(props);
    this.timeStarted = Date.now();
    this.state = { holes: [], hit: 0, escaped: 0, missed: 0, timeElapsed: 0 };
    for(let i = 0; i < this.rows * this.holesPerRow; i++) {
      this.state.holes.push({mole: false, whacked: false});
    }
  }

  componentDidMount() {
    window.onkeydown = this.handleKeyDown;
    this.tick();
    setInterval(this.calculateTimeElapsed, 1000);
  }

  handleKeyDown = (event) => {
    const key = event.key.toLowerCase();
    const keyMap = [
      'q', 'w', 'e',
      'a', 's', 'd',
      'z', 'x', 'c',
    ];
    const hole = keyMap.indexOf(key);
    if(hole >= 0) this.whack(hole);
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
    const isHit = this.state.holes[hole].mole;
    isHit ? this.addHit() : this.addMiss();
    this._setHoleState(hole, 'whacked', true);
    setTimeout(this.unwhack.bind(this, hole), this.whackShowDuration);
  }

  unwhack = (hole) => {
    this._setHoleState(hole, 'whacked', false);
    this._setHoleState(hole, 'mole', false);
  }

  moleUp = (hole) => {
    this._setHoleState(hole, 'mole', true);
  }

  moleDown = (hole) => {
    if(this.state.holes[hole].mole) this.addEscaped();
    this._setHoleState(hole, 'mole', false);
  }

  addHit = () => {
    this.setState( { hit: this.state.hit + 1 } );
  }

  addMiss = () => {
    this.setState( { missed: this.state.missed + 1 } );
  }

  addEscaped = () => {
    this.setState( { escaped: this.state.escaped + 1 } );
  }

  calculateTimeElapsed = () => {
    const time = Date.now() - this.timeStarted;
    this.setState( { timeElapsed: Math.floor(time/1000) } );
  }

  elapsedTime = () => {
    return this.state.timeElapsed;
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
        <div className="GameBoardFooter">
          <div className="scoreBoard">
            <div className='score'>
              HIT<br/>{this.state.hit}
            </div>
            <div className='score'>
              MISSED<br/>{this.state.missed}
            </div>
            <div className='score'>
              ESCAPED<br/>{this.state.escaped}
            </div>
            <div className='score'>
              TIME<br/>{this.elapsedTime()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GameBoard;
