import React, {useState, useEffect} from 'react';
import MenuBlock from './MenuBlock'
import GameBoard from './GameBoard'
import LeaderBoard from './LeaderBoard'
import './App.css';
import axios from "axios";
import {message} from "antd";

function App() {
  const size = useWindowSize();
  const [difficulty, setDifficulty] = useState({});
  const [isRunning, setIsRunning] = useState(false);
  const [user, setUser] = useState("");
  const [winner, setWinner] = useState("");
  const [show, setShow] = useState(false);



  const getMode = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setShow(true);
    message.info(`${selectedDifficulty.name} selected`);
    message.info(`field = ${selectedDifficulty.field} x ${selectedDifficulty.field}`);
    message.info(`delay = ${selectedDifficulty.delay}ms`);
  };

  const handlePLAY = (data) => {
    message.info(`UserName  = ${data}`);
    setUser(data);
    if (difficulty.field) {
      setIsRunning(true)
    }
  };

  const handleSTOP = (winner) => {
    setShow(false);
    setIsRunning(false);
    message.info(`${winner === "50% / 50%"
      ?
      "No winner: 50% / 50%"
      :
      winner === "Computer"
        ?
        "Computer win"
        :
        user + " win"}`);
    const localWinner = `${winner === "50% / 50%"
      ?
      ""
      :
      winner === "Computer"
        ?
        winner
        :
        user}`;
    setShow(true);
    setWinner(localWinner)
  };

  useEffect(() => {

    if (winner) {

      const url = "https://starnavi-frontend-test-task.herokuapp.com/winners";
      const now = new Date();
      const stringMonth = `${
        new Intl.DateTimeFormat('en-US', {month: 'long'})
          .format(now.getMonth())}`;
      const stringDate = `${
        +now.getHours()<10 ? "0":""}${now.getHours()}:${
        +now.getMinutes()<10 ? "0":""}${now.getMinutes()}; ${
        +now.getDate() < 10 ? "0" : ""}${now.getDate()} ${
        stringMonth} ${
        now.getFullYear()};`;

      const requestBody = `winner=${winner}&date=${stringDate}`;

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      const fetchData = async () => {
        const result = await axios.post(
          url,
          requestBody,
          config);
      };
      fetchData();
    }
  }, [winner]);

  function useWindowSize() {
    const isClient = typeof window === 'object';

    function getSize() {
      return isClient ? window.innerWidth : undefined;
    }

    const [windowSize, setWindowSize] = useState(getSize);
    useEffect(() => {
      if (!isClient) {
        return false;
      }

      function handleResize() {
        setWindowSize(getSize());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    return windowSize;
  }

  return (
    <div className="GameInDots">

      <MenuBlock
        getMode={getMode}
        handlePLAY={handlePLAY}
        difficulty={difficulty}
        isRunning={isRunning}
      />
      <div className="GameInDots-body">
        <GameBoard
          show={show}
          difficulty={difficulty}
          size={size}
          isRunning={isRunning}
          handleSTOP={handleSTOP}
        />
        <LeaderBoard
          show={show}
        />
      </div>
    </div>
  );
}

export default App;
