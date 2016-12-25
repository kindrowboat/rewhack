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
    console.log(className);
    return className;
  }
  
  render(){
    return (
      <div className={this.calculateClasses()}>
      </div>
    );
  }
}

export default MoleHole;