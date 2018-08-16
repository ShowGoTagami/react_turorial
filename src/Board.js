
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
          var set = [];
          for(var i=0; i<=2; i++){
            var row = [];
            for(var j=i*3; j<=i*3+2; j++){
              row.push(this.renderSquare(j));
                }
              set.push(<div className="board-row" key={i}>{row}</div>);
          }
      return (
        <div>
          <div className="status">{/*status*/}</div>
          {set}
        </div>
      );
  }

}

export default Board
