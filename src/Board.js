import React from 'react'
import Square from './Square'

class Board extends React.Component {
  render() {
    const generateKey = (pre) =>{
      return pre + Date.now();
    }
    const rows = [...Array(this.props.line)].map((_, y) => {
      const cols = [...Array(this.props.line)].map((_, x) => {
        const n = x + (y * this.props.line);
        return <Square value={this.props.squares[n]} onClick={() => this.props.onClick(n)}key={generateKey(this.props.squares[n])+String(x)+String(y)} />
      })
      return <div className="board-row" key={generateKey(y)}>{cols}</div>
    })
    return (<div>{rows}</div>)
  }
}
export default Board
