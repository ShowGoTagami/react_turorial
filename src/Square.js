
import React from 'react'

function Square(props) {
  return (
    <button className="square" onClick={props.onClick} key={props}>
      {props.value}
    </button>
  );
}

export default Square
