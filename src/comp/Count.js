import React, { useState, useEffect } from "react";

function Count() {
  const [count, setCount] = useState(3);

  function handleClick(e) {
    window.location.replace("/ending_game/List");
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (count > 1) {
        setCount(count - 1);
      } else {
        clearInterval(timer);
        handleClick();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [count]);

  return (
    <>
      <div className="bg_wrap">
        <p className="count">{count}</p>
        {/* <p>Start</p> */}
      </div>
    </>
  );
}

export default Count;
