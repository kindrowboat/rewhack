import React, { Component } from 'react';
import './MoleHole.css';

class MoleHole extends Component {

  whackShowTime = 250;

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
    const hideWhack = this.props.unwhack;
    const showUntil = this.whackShowTime;
    showWhack();
    setTimeout(hideWhack, showUntil);
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
