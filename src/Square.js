
import React from 'react'

function Square(props) {
  const highlightClass = props.isHighlight ? 'square highlight' : 'square'; //(9)Boardから受け取ったisHighlightを参照してsquareクラスとは別にhighlightというクラスを与える
  return (
    <button className={highlightClass} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square
