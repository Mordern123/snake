import React from "react";
import Keyboard from "./Keyboards";
import PauseButton from "./PauseButton";

const Actions = ({ handleChangeDirection, handleOnGamePause, isPause }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <Keyboard handleChangeDirection={handleChangeDirection}></Keyboard>
      <PauseButton
        handleOnGamePause={handleOnGamePause}
        isPause={isPause}
      ></PauseButton>
    </div>
  );
};

export default Actions;
