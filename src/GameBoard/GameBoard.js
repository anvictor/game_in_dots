import React, {useEffect, useRef, useState} from 'react';
import GameBoardView from './GameBoardView'
import './GameBoard.css';

function GameBoard({difficulty, size, isRunning, handleSTOP}) {
  if (size > 550) {
    size = 550
  }
  // difficulty.delay=100;
  const coeffWidth = 0.9;
  const max = +difficulty.field * +difficulty.field;
  const [matrix, setMatrix] = useState([]);
  const matrixWidth = `${difficulty.field ? size * coeffWidth : 0}px`;
  const cellWidth = `${size * coeffWidth / difficulty.field}px`;
  const [counter, setCounter] = useState(0);
  const [rndOrder, setRndOrder] = useState([]);
  const [isCurrent, setIsCurrent] = useState(false);

  const whoWinner = () => {
    const reducer = (accumulator, currentValue) => {
      accumulator += +(currentValue === "#e85a5f");
      return accumulator
    };
    const compScore = matrix.reduce(reducer, 0) / matrix.length;
    switch (true) {
      case compScore < 0.5 :
        return "User"
      case compScore === 0.5 :
        return "50% / 50%";
      case compScore > 0.5 :
        return "Computer";
    }

  };

  const handleClick = (index) => {
    if (isCurrent) {
      let localMatrix = [...matrix];
      if (''+localMatrix[index] === '#42d8e8'){
        localMatrix[index] = '#00e871';
        setMatrix(localMatrix)
      }
    }
  };

  useInterval(() => {
    const localMatrix = [...matrix];
    if (isCurrent) {
      localMatrix[rndOrder[counter - 1]] = `#42d8e8`;
      setMatrix(localMatrix);

      if (''+localMatrix[rndOrder[counter]] === '#42d8e8'){
        localMatrix[rndOrder[counter]] = '#e85a5f';
        setMatrix(localMatrix);
      }

      setCounter(counter - 1);
      if (counter < 1) {
        setIsCurrent(false);
        handleSTOP(whoWinner());
      }
    }
  }, difficulty.delay || 10000);

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }

      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  useEffect(() => {
    setIsCurrent(isRunning)
  }, [isRunning]);

  useEffect(() => {
    setCounter(max);
    let matrixContent = [];
    let order = [];
    let unorder = [];
    let rnd = 0;

    for (let i = 0; i < max; i++) {
      matrixContent.push('white');
      order.push(i);
    }
    setMatrix(matrixContent);
    for (let i = 0; i < max; i++) {
      rnd = getRandomInt(order.length);
      unorder.push(order[rnd]);
      order.splice(rnd, 1);
    }
    setRndOrder(unorder);
  }, [difficulty.field]);

  return (<div>
      <GameBoardView
        matrixWidth={matrixWidth}
        matrix={matrix}
        cellWidth={cellWidth}
        handleClick={handleClick}
      />
    </div>

  );
}

export default GameBoard


