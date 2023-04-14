import React from "react";
import ArrowUpPath from "../../assets/triangle.png";
import "../../styles/Actions/Keyboard.css";
import { ARROW_UP, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT } from "../../constants";

const Keyboard = ({ handleChangeDirection }) => {
  return (
    <div className="keyboard mb-5">
      <div
        className="keyboard_up bg-white w-[60px] h-[60px] rounded-[30px] p-3 cursor-pointer"
        onClick={() => handleChangeDirection(ARROW_UP)}
      >
        <img src={ArrowUpPath} alt=""></img>
      </div>
      <div
        className="keyboard_left bg-white w-[60px] h-[60px] rounded-[30px] p-3 cursor-pointer"
        onClick={() => handleChangeDirection(ARROW_LEFT)}
      >
        <img src={ArrowUpPath} alt=""></img>
      </div>
      <div
        className="keyboard_down bg-white w-[60px] h-[60px] rounded-[30px] p-3 cursor-pointer"
        onClick={() => handleChangeDirection(ARROW_DOWN)}
      >
        <img src={ArrowUpPath} alt=""></img>
      </div>
      <div
        className="keyboard_right bg-white w-[60px] h-[60px] rounded-[30px] p-3 cursor-pointer"
        onClick={() => handleChangeDirection(ARROW_RIGHT)}
      >
        <img src={ArrowUpPath} alt=""></img>
      </div>
    </div>
  );
};

export default Keyboard;
