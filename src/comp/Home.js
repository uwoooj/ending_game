import React from "react";


function Home() {
  function handleClick(e) {
    window.location.replace("/ending_game/Count");
  }


  return (
    <>
      <div className="wrap">
        <div className="bg">
          <h1>3분을 버텨라~</h1>
          <figure>
            <img src="/ending_game/cloud.png" className="cloud" alt="" />
          </figure>
          <figure>
            <img src="/ending_game/pinkmal.png" className="talk" alt="" />
          </figure>
          <button className="start" onClick={handleClick}>
            시작하러가기
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
