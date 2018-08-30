import './index.css'
import React from 'react'
import Game from './Game.js'
import ReactDOM from 'react-dom'


class Selector extends React.Component{
  constructor(props){
    super();
    this.state = {
      type: 0,
      line: 0
    };
  }
  switchType(num){
    this.setState({
      line:num,
      type:num**=2
    });
  }

  render() {
    if(this.state.type !== 0) return <Game type={this.state.type} line={this.state.line}/> ;
    return(
      <div>
        <div className="intro">Select type of Game!</div>
        <button type="button" className="square_btn" name="aaa" value="aaa" onClick={()=>this.switchType(3)}>to 3x3 GAME</button>
        <button type="button" className="square_btn" name="bbb" value="bbb" onClick={()=>this.switchType(5)}>to 5x5 GAME</button>
      </div>
    );
  }
}

ReactDOM.render(<Selector />,document.getElementById('root'));
