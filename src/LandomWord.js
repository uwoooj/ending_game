import React from "react";

// 랜덤 단어 선택 함수 정의
function getRandomWord(wordList) {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
}

function RandomWord() {
  // 끝말잇기 단어 목록
  const wordList = [
    "컴퓨터",
    "복숭아",
    "사다리",
    "구구단",
    "정수기",
    "선풍기",
    "돌맹이",
    "경찰차",
    "신발장" /*...*/,
  ];

  // 초기 단어 선택
  const initialWord = getRandomWord(wordList);

  // JSX로 초기 단어 표시
  return (
    <div>
      <p>초기 단어: {initialWord}</p>
      {/* 여기에 게임 로직 및 컴포넌트를 추가하세요 */}
    </div>
  );
}

export default RandomWord;
