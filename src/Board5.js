import React from 'react'
import Square5 from './Square5'

class Board5 extends React.Component {
  render() {
    const rows = [...Array(5)].map((_, y) => {
      const cols = [...Array(5)].map((_, x) => {
        const n = x + (y * 5)
        return <Square5 value={this.props.squares[n]} onClick={() => this.props.onClick(n)} />
      })
      return <div className="board-row">{cols}</div>
    })
    return (<div>{rows}</div>)
  }
}
export default Board5
