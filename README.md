React Tutorialの実践。
https://reactjs.org/tutorial/tutorial.html

<所要時間>
・通し読み & 写経：4h
・React本で基礎学習：4h
・チュートリアル再読 & 独自コード(リファレンス参照)：11h

<タスク>
・Reactチュートリアル本編：完了
・Reactチュートリアル追加課題：未完了
・React基礎本読む：完了

<以下、チュートリアル実装ステップ詳細>

React Tutorialのローカル開発環境の構築について
・node.jsをインストールする
・コンソールで以下のコマンドを打つ
$ npm install -g create-react-app
$ create-react-app my-app
・srcディレクトリ配下にすでに入っているファイルを全て削除する
$ cd my-app
$ rm -f serc/*
・index.css と　index.jsをsrcディレクトリに新規作成する。コードは以下をコピペ。
　 this CSS code. / this JS code.
・index.jsの先頭に以下のコードを追加する。
import React from 'react'; //
import ReactDOM from 'react-dom';
import './index.css';

■Propsで値を渡す  
・まず、9つのSquareにそれぞれ0~8の数字を入れるようにする
・そのために値(0~9)をBoardクラスからSquareクラスへ渡す。その時にpropsという値で渡す
　-propsとは「親コンポーネントからわたされた値(=不変のデータ)」
・受け取る側のSquareは以下のように変更する
//変更前
      <button className="square”>
        /* TODO *  ここに値を追加していく
      </button>
//変更後
      <button className="square”>
        {this.props.value} // props
      </button>

・これでBorad→Squareへ値を渡して、マスへ値を入れることができるようになった

■マスをクリックすると、”X”が表示されるようにする
・Squareの中に<button>を用意して１マス=ボタンにする
・ボタンを押下すると実行される関数を用意する。まずはalert() を表示させる。
・煩雑さを避けるためにアロー関数で表示する
    return (
      <button className="square" onClick={()=> { alert('click'); }}>
        {this.props.value}
      </button>
    );

・渡された値(0~9)を各マスが保持できるようにするために、propsで渡された値をstateに保持する
・stateを実装する場合はそのクラスにconstructor()を定義しないといけない
・さらにconstructor()ではsuper()メソッドを呼び出す必要がある

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  render() {
    return (
      <button className="square" onClick={() => alert('click')}>
        {this.props.value}
      </button>
    );
  }
}

・次にonClickと、実際にstateに値を保持させる
　-this.props.valueをthis.state.valueに変更する
　-alert()をthis.setState({value:'X'})に変更する
　 -stateはそのまま変更することができないため、setStateで値を変更させる
　-見やすいように改行、インデントを追加する

      <button
        className="square"
        onClick={() => this.setState({value: 'X'})}
      >
        {this.state.value}
      </button>

■stateを保持するコンポーネントを変更して、構造を帰る
・現状：子コンポーネントのSquareがstate(XなのかOなのか)を保持している
　　　　　→各ターンや勝敗の判定に際して各マスに問い合わせないといけないので煩雑
・理想：親コンポーネントのBoardがstateを保持する
    【note】React ではstateは親コンポーネントに保持させるのが理想

・まずBoardクラスにconstructor()を追加して、this.stateには子コンポーネントのSquareにnullを入れるようにする
・さらに、BoardからSquareに対してthis.stateに入っている値を渡すようにrenderSquare(i){}を変更する
　→stateは他から変更できないように、Squareから直接変更できないようにするため
・stateをprivateに保持するために、BoardからSquareへonClick()を渡すようにする

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

・これでBoardからSquareにはvalueとonClick()の２つが渡されるようになった
・続いてSquare側で受け取れるよう変更を加える
　-Squareではstateを保持する必要がないためconstructor()を削除する
　-さらに、render()内のthis.state.valueをthis.props.valueに変更する
　-同様に this.setState()をthis.props.onClick()に変更する
・これでSquareがクリックされたときに、Boardクラスで定義されたonClickが動く

■クリックされたときに動作、handleClick()を追加する
  handleClick(){
    // squares配列からコピーして定数squaresに入れる
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }

・ここでsquares配列を直接変更するのではなく、slice()でsquares配列をコピーしている
　→普遍性(immutability)を保持するため
　　-もし変更を許可すると、余計なバグが生まれる可能性がある
　   -さらにそのオブジェクトが変更されたどうかを検知する場合には全ての要素を比較しないといけないため非常に時間がかかる

・この時点で、Squareはstateを保持せずBoardに呼び出された時にだけ値を受け取る”controlled components"になった
　→ファンクションコンポーネントとしてSquareを修正する

function Square(props){
    return (
      <button className="square" onClick={props.onClick}}>
        {props.value}
      </button>
    );
}

■ターン交代ができるようにする
・Xのターン、Oのターンと交代できるようにする
・まず初めはXのターンとして、BoardのconstructorにxIsNext:trueを追加する
・切り替えは以下の考え方で実装する
　-handleClick(i)が呼ばれるたびに初期値(1)true → (2)false→ (3) true…とする
　-まずxIsNextの値(true / false)を参照して ‘X’ or ‘O’ どちらを表示させるか分岐
　-その後setState xIsNext: !this.state.xIsNextを反転させる
　　→これを繰り返すことでターン制を実現する

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    squares[i] = 'X';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

・その後、どちらのターンなのかを表示させる
  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

■勝者を判定・宣言する
・まずすでに用意されている勝敗を決定するfunctionをファイル末尾に追加する
・その上で、以下の２つを定義、実装する
　-勝者が決まったら宣言する
　-勝者が決まった、あるいはすでに値が入ったマスには上書きできないようにする

・勝者が決まったら宣言する
  render() {
    const winner = calculateWinner(this.state.squares); //winner に結果の値を入れる
    let status; // 状態を宣言
    if(winner){ // winner が決まっていたら
      status = 'Winner: ' + winner; // winnerを宣言する
    }else{      // winner が決まっていなかったら
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O’); // ターンを表示
    }

・勝者が決まった、あるいはすでに値が入ったマスには上書きできないようにする
  handleClick(i) {
    const squares = this.state.squares.slice();
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

・これでtic-tac-toe ゲームの基本機能〜勝者宣言までは実装完了

■「戻る」機能の追加
・n個まえのターンに戻る、機能を追加する
・では、履歴(=history)をどこが持つべきか？→Gameコンポーネント
　→Boardはボードを作る・表示することのみ、にして簡素化
　→Boardにて以下の実装を行う
　　-constructorの削除
　　-state→propsに変更
　　-stateusを表示していた部分はGameが担うため削除
・BoardからGameへクリック、表示周りの関数を移動させると、Boardは以下のようにシンプルになる
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

・Gameではhistoryという履歴を保持する変数を定義
・Gameコンポーネントのconstructor()を定義
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true
    };
  }

・Gameのconstructorではthis.stateを定義してsquaresを配列にもつhistoryとターンを決めるxIsNextの値を入れる

・history = 履歴の配列、current = いまいるステップhistory[i]をそれぞれに入れる
・handleClickもGameへ移動させた上で修正を加える
    -squares配列からsliceでコピーを定数squaresに入れる
    -setState()ではsquaresの配列を結合させる

■履歴を表示させる
・historyで履歴を保持させたので、それを表示して「戻る」機能を実装する
・Gameのrenderメソッド内で、moves配列を定義する
　-history配列の要素に対してstep, moveを用意して、moveがあれば’Go to move ‘を、
　 なければ(=初めなら)’Go to game start’を定数descへ代入する
　-さらに「戻る」ボタンも実装する

■liにkeyを追加する
・Reactでは<li>要素に対してkeyを追加しなければならない
　-理由：Reactではli要素が移動、順番変更されたとしてもそれぞれを認識するために固有のkeyを持たせる必要があるため
・よって、定数descのなかにある<li>に対しても固有のkey {move}を追加する
　→moveとは履歴(ステップ)のこと

■「戻る」のjumpToを完成させる
・現状では「戻る」ボタンを押してもjump先が指定されていないためエラーが返ってくる
・jumpToメソッドの実装手順
　-まずGameのconstructorでstepNumber:0を定義する
　-このstepNumberに、対して1クリックごとに+1をしていく
　-さらにxIsNextもこのstepNumberに渡される引数stepの数が奇数=false、偶数=trueとする
・jumpToメソッドを実装したあと、handleClickのhistoryに代入する履歴はstepNumber + 1までの配列とする
・そして、render()メソッド内currentに対してもhisotry配列のstepNumber番目の要素(=現在のステップ)を代入する
