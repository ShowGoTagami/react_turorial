import './index.css'
import React from 'react'
import Game3 from './Game3.js'
import Game5 from './Game5.js'
import ReactDOM from 'react-dom'


class Selector extends React.Component{
  state = { Component: null }

  selectGame3 = () => this.setState({Component: Game3})
  selectGame5 = () => this.setState({Component: Game5})

  render() {
    // 大文字始まりにしないと、JSXでコンポーネントと認識させられない
    const {Component} = this.state;
    if(Component) return <Component />;
    return(
      <div>
        <div className="intro">Select type of Game!</div>
        <button type="button" className="square_btn" name="aaa" value="aaa" onClick={this.selectGame3}>to 3x3 GAME</button>
        <button type="button" className="square_btn" name="bbb" value="bbb" onClick={this.selectGame5}>to 5x5 GAME</button>
      </div>
    );
  }
}

ReactDOM.render(<Selector />,document.getElementById('root'));
