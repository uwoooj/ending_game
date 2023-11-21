import React, { useEffect } from "react"; // useEffect 함수를 import

function Wrong() {
  useEffect(() => {
    // 폭죽 애니메이션 시작 및 종료 로직을 추가합니다.

    // 애니메이션 종료 후에 컴포넌트를 언마운트하거나 숨깁니다.
    return () => {
      // 언마운트 또는 숨기기 로직을 추가합니다.
    };
  }, []);

  return (
    <div className="wrong">
      {/* 폭죽 이미지를 이곳에 추가합니다. */}
      <img src="./x5.gif" alt="Wrong" />
    </div>
  );
}

export default Wrong;
