
import React from 'react'
import Square from './Square'

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
      return (
        <div>
          {
            Array(3).fill(0).map((row, i) => {
              return(
                <div className="board-row" key={i}>
                  {
                    Array(3).fill(0).map((col,j)=>{
                      return(
                        this.renderSquare(i*3+j)
                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>
      );
  }
}
export default Board
