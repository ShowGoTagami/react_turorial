
import React from 'react'
import Square3 from './Square3'

class Board3 extends React.Component {
  renderSquare(i) {
    return (
      <Square3
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
export default Board3
