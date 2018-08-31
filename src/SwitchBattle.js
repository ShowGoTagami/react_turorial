import React from 'react'
import Game from './Game'

class SwitchBattle extends React.Component{
  constructor(props){
    super(props);
    this.state={
      line:this.props.line,
      battle:null
    }
  }
  switchBattle(char){
    this.setState({
      battle:char,
    });
  }

  render() {
    if(this.state.battle !== null) return <Game line={this.state.line} battle={this.state.battle}/> ;
    return(
      <div>
        <div className="intro">Select type of Battle!</div>
        <button type="button" className="square_btn" name="ccc" value="ccc" onClick={()=>this.switchBattle("player")}>Player Battle</button>
        <button type="button" className="square_btn" name="ddd" value="ddd" onClick={()=>this.switchBattle("cpu")}>CPU Battle</button>
      </div>
    );
  }

}


export default SwitchBattle
