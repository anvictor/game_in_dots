import React, {useEffect, useState} from 'react';
import './MenuBlock.css';
import axios from "axios";
import 'antd/dist/antd.css';
import {Menu, Dropdown, Button, Icon, Input} from 'antd';

function MenuBlock({getMode, handlePLAY, difficulty,isRunning}) {
  const [difficultyes, setDifficultyes] = useState([]);
  const [userName, setUserName] = useState("User");

  const menu = (
    <Menu>
      {difficultyes.map((item, index) =>
        <Menu.Item
          key={index}
          onClick={() => {
            getMode(item);
          }
          }
        >
          {item.name}
        </Menu.Item>)}

    </Menu>
  );

  const handleInput = (name) => {
    setUserName(name)
  };


  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://starnavi-frontend-test-task.herokuapp.com/game-settings',
      );
      const dropItems = [];
      for (let key in result.data) {
        dropItems.push(
          {
            name: key,
            field: result.data[key].field,
            delay: result.data[key].delay,
          }
        )
      }
      setDifficultyes(dropItems);
    };
    fetchData();
  }, []);

  return (
    <div className="Menu">
      <Dropdown
        overlay={menu}
        disabled={isRunning}
      >
        <Button>
          Pick game mode <Icon type="down"/>{difficulty.name}
        </Button>
      </Dropdown>
      <Input
        placeholder="Enter your name"
        onKeyUp={(e) => handleInput(e.target.value)}
        disabled={isRunning}
      />
      <Button
        type="primary"
        onClick={() => handlePLAY(userName)}
        disabled={isRunning}
      >PLAY</Button>
    </div>
  );
}

export default MenuBlock


