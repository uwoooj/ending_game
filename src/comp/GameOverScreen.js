import React from "react";

function GameOverScreen({ exClick }) {
  return (
    <div className="wrap">
      <p className="message">
        <img src="./end.png" alt="Game Over" />
      </p>
      <button className="restart" onClick={exClick}>
        다시 시작하기
      </button>
    </div>
  );
}

export default GameOverScreen;
