import React from 'react'
import Board from './Board'


class Game extends React.Component {
  constructor(props) {
    super(props);
    var type = this.props.line;
    type **= 2;
    this.state = {
      history: [
        {
          squares: Array(type).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      battle:this.props.battle
    };
  }

  // クリックする(=1手)の動作
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares,this.props.line) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
     this.setState({
      history: history.concat([
        {
          squares: squares,
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
    if(this.state.battle==="cpu"){
    var turnNow = this.state.xIsNext;
    cpuEasy(i,squares,turnNow);
    this.setState({
      xIsNext: turnNow
    });
    }
  }

  // ターンを戻す
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
    });
  }

  // 画面の描画
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares,this.props.line);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
        const selectedClass = this.state.stepNumber === move ? "bold" : "";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)} className={selectedClass}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            line={this.props.line}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

// 勝敗を決めるロジック
function calculateWinner(squares,line) {
  if(line===3){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
else{
  const lines = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20]
];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d, e] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[b] === squares[d] && squares[c] === squares[e]) {
      return squares[a];
    }
  }
  return null;
  }
}

function cpuEasy(i,squares,turnNow) {
  var l = squares.length;
  for(var a=0; a<l; a++){
    var j = Math.floor(Math.random()*l);
    if(squares[j]==null){
      squares[j]="O"
      turnNow = !turnNow;
      break;
    }
  }
}

export default Game
