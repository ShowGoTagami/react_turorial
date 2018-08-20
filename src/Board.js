
import React from 'react'
import Square from './Square'

class Board extends React.Component {

  renderSquare(i) {
    const resultLine = this.props.resultLine; // (5)Game→Boardのresult_lineを定数result_lineへ代入
    var isHighlight = false; //(6)ハイライトされているかどうかの状態を表す変数isHighlightを定義
    if(resultLine){    //(7)もしresult_lineが入ってきたら
        isHighlight = resultLine.indexOf(i) > -1; //result_lineが-1より大きい(=true)を代入する
    }
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        isHighlight={isHighlight} //(8)isHighlight(boolen)をSquareへ送る
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
export default Board
