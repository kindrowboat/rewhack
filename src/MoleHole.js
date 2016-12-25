import React, { Component } from 'react';
import './MoleHole.css';

class MoleHole extends Component {
    
  calculateClasses(){
    let className = "MoleHole";
    if(this.props.mole){
      className += " withMole"
    }
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