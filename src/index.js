import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import SwitchBattle from './SwitchBattle.js'


class Selector extends React.Component{
  constructor(props){
    super();
    this.state = {
      line: 0
    };
  }
  switchType(num){
    this.setState({
      line:num,
    });
  }

  render() {
    if(this.state.line !== 0) return <SwitchBattle line={this.state.line}/> ;
    return(
      <div>
        <div className="intro">Select size of the Game field !</div>
        <button type="button" className="square_btn" name="aaa" value="aaa" onClick={()=>this.switchType(3)}>to 3x3 GAME</button>
        <button type="button" className="square_btn" name="bbb" value="bbb" onClick={()=>this.switchType(5)}>to 5x5 GAME</button>
      </div>
    );
  }
}

ReactDOM.render(<Selector />,document.getElementById('root'));
