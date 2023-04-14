import React from "react";

const Score = ({ score, maxScore }) => {
  return (
    <div className="mb-2 flex flex-col">
      <div className="font-bold text-slate-100">{`獲得蘋果： ${score}`}</div>
      <div className="font-bold text-slate-100">{`最高紀錄： ${maxScore}`}</div>
    </div>
  );
};

export default Score;
