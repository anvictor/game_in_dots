import React, {useEffect, useState} from 'react';
import './LeaderBoard.css';
import axios from "axios";
import 'antd/dist/antd.css';
import {List} from 'antd';

function LeaderBoard({show}) {
  const [winners, setWinners] = useState([1, 2, 3]);

  const ifCorrectDateTime = (dateAndTimeString) => {
    if (dateAndTimeString.split(";").length < 2) {
      return false
    } else {
      let dateString = dateAndTimeString.split(";")[1];
      let dateArr = dateString.split(' ');
      let dateNumbersOnly = true;
      dateArr.forEach(item => {
        if (isNaN(+item)) {
          dateNumbersOnly = false
        }
      });
      if (dateNumbersOnly) {
        return false
      }
      let timeString = dateAndTimeString.split(";")[0];
      let timeArr = timeString.split(":");
      const time = `${timeArr[0] < 25 ? timeArr[0] + ":" + timeArr[1] : timeArr[1] + ":" + timeArr[0]}`;
      return `Date ${dateString} and Time ${time}`
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://starnavi-frontend-test-task.herokuapp.com/winners',
      );
      const winnersList = [];
      for (let key in result.data) {
        if (ifCorrectDateTime(result.data[key].date)) {
          winnersList.unshift(
            {
              winner: result.data[key].winner,
              dateAndTime: ifCorrectDateTime(result.data[key].date),
              id: result.data[key].id
            }
          )
        }
      }
      setWinners(winnersList);
    };
    fetchData();
  }, [show]);

  return (
    <div className="LeaderBoard" style={{visibility: `${show ? "visible" : "hidden"}`}}>
      <List
        header={<div>Leader Board</div>}
        dataSource={winners}
        renderItem={item =>
          (
            <List.Item>
              <span className="LeaderBoard-item">{item.winner}</span>
              <span className="LeaderBoard-item">{item.dateAndTime}</span>
            </List.Item>
          )}
      />
    </div>
  );
}

export default LeaderBoard


