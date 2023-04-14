import React from "react";

import { ARROW_UP, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT } from "../../constants";

const PauseButton = ({ handleOnGamePause, isPause }) => {
  return (
    <div
      className="w-full text-slate-200 text-center border rounded-2xl border-solid"
      onClick={() => handleOnGamePause()}
    >
      {isPause ? "繼續吃蘋果" : "休息一下"}
    </div>
  );
};

export default PauseButton;
