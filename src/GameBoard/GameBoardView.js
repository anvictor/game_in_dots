import React from 'react';
import './GameBoard.css';

function GameBoardView({matrixWidth, matrix, cellWidth,handleClick}) {
  return (
    <div className="GameBoard" style={{width: matrixWidth, height: matrixWidth}}>
      {matrix.map((frame, index) =>
        <div key={index}
             style={{
               backgroundColor: frame,
               width: cellWidth,
               height: cellWidth,
               border: "1px solid black",
               cursor: frame==="#42d8e8"?"pointer":"not-allowed"
             }}
             className="dotCell"
             onClick={()=>handleClick(index)}
        >
        </div>)}
    </div>
  );
}

export default GameBoardView


