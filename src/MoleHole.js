import React, { Component } from 'react';
import './MoleHole.css';

class MoleHole extends Component {

  calculateClasses(){
    let className = "MoleHole";
    if(this.props.mole){
      className += " withMole";
    }
    if(this.props.whacked) {
      className += " whacked ";
      className += this.props.mole ? "hit" :  "miss";
    }
    return className;
  }

  handleWhack = () => {
    const showWhack = this.props.whack;
    showWhack();
  }

  render(){
    return (
      <div
        className={this.calculateClasses()}
        onMouseDown={this.handleWhack}
      />
    );
  }
}

export default MoleHole;
