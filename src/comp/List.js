import axios from "axios";
import React, { useState, useEffect } from "react";
import GameOverScreen from "./GameOverScreen"; // GameOverScreen 컴포넌트 import
import Fireworks from "../Fireworks";
import Wrong from "../Wrong";

function List() {
  
  const [comCount, setComCount] = useState(0);
  const [read, setRead] = useState(false);

  const [keyword, setKeyword] = useState("");
  const [wordList, setWordList] = useState([
    "컴퓨터",
    "복숭아",
    "사다리",
    "구구단",
    "정수기",
    "선풍기",
    "돌맹이",
    "경찰차",
    "신발장" /*...*/,
  ]);
  const [gameOver, setGameOver] = useState(false); // 게임 종료 여부
  const [isListVisible, setIsListVisible] = useState(true); // List.js 컴포넌트의 표시 여부

  const [timeLeft, setTimeLeft] = useState(180); // 초 단위로 게임 시간 설정
  const [step, setStep] = useState(1); //
  const [lives, setLives] = useState(3); // 목숨

  const [showFireworks, setShowFireworks] = useState(false); // 맞출시 폭죽 표시 여부
  const [showWrong, setShowWrong] = useState(false); // 틀릴 시 엑스 표시 여부
  const [roundTimeLeft, setRoundTimeLeft] = useState(10); // 1라운드 타이머

  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때 랜덤 단어 선택
    let roundTimer,timer; 
    if(lives){
      clearInterval(roundTimer)
      clearInterval(timer)
      const randomIndex = Math.floor(Math.random() * wordList.length);
      const initialWord = wordList[randomIndex];
      setKeyword(initialWord);

      roundTimer = setInterval(() => {
        setRoundTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      // 1초마다 타이머 감소
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      // 3분(180초)이 지나면 게임 종료
      setTimeout(() => {
        setGameOver(true);
        clearInterval(timer); // 타이머 정지
        setIsListVisible(false); // List.js 컴포넌트 숨기기
      }, 180000); // 180초(3분) 후에 게임 종료
  }
  if (lives === 0) {
    setGameOver(true);
    // clearInterval(timer); // 타이머 정지
    setIsListVisible(false); // List.js 컴포넌트 숨기기
  }

    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      clearInterval(roundTimer);
      clearInterval(timer);
    };
  }, [lives]); // 빈 배열을 전달하여 한 번만 실행

  // useEffect(() => {
  //   // 20초 동안 입력이 없으면 목숨을 감소시킴
  //   console.log("----------------------");
  //   if (roundTimeLeft === 0) {
  //     setLives((prevLives) => prevLives - 1);
  //     setRoundTimeLeft(10); // 타이머를 다시 초기화
  //   }
  // }, [roundTimeLeft == 0]);

  useEffect(
    (gameOver) => {
      // gameOver 상태가 변경될 때 List.js 컴포넌트의 표시 여부를 업데이트
      setIsListVisible(!gameOver);
    },
    [gameOver]
  );

  function exClick(e) {
    window.location.replace("/ending_game/");
  }

  function text(e) {
    e.preventDefault();
    let word = e.target.title.value;

    let url = `https://port-0-jsonserver-jvvy2blm5sv7xz.sel5.cloudtype.app/endgame?word=${word}`;

    if (word[0] !== keyword[keyword.length - 1]) {
      // 틀린 단어를 입력할 때마다 목숨 감소
      setLives((prevLives) => prevLives - 1);
      setRoundTimeLeft(10);
      /*lives((prevLives) => prevLives - 1);*/
      
      return;
    }

    axios(url).then((res) => {
      let result = res.data.channel.item;
      if (result) {
        let reg = new RegExp(word);
        let find = result.filter((obj) => reg.test(obj.word));
        let num = find.filter((obj) => obj.word.indexOf(word) == 0);

        if (!num.length) {
          setLives((prevLives) => prevLives - 1);
          console.log("잘 좀 생각해봐~ 이런 단어는 없어!");

          setShowWrong(true);
          setTimeout(() => {
            setShowWrong(false);
          }, 25000); // 3초 후에 폭죽 숨김 (원하는 시간으로 수정)
        } else {
          setKeyword(word);
          setStep((prevStep) => prevStep + 1); // 정답을 맞출 때마다 step 증가
          // 정답을 맞추면 폭죽 표시
          // setShowFireworks(true);
          setRoundTimeLeft(10);

          // 정답을 맞췄을 때 효과 추가
          const problemElement = document.querySelector(".problem");
          problemElement.classList.add("correct");

          // 일정 시간 후에 효과 제거 (예: 0.3초 후)
          setTimeout(() => {
            problemElement.classList.remove("correct");
          }, 500);

          setShowFireworks(true);
          // 일정 시간 후에 폭죽 숨김
          setTimeout(() => {
            setShowFireworks(false);
          }, 1300); // 3초 후에 폭죽 숨김 (원하는 시간으로 수정)

          setComCount(comCount + 1);
          setRead(true);
          console.log("단어가 존재합니다!!!");
        }
      } else {
        setLives((prevLives) => prevLives - 1);
        console.log("검색되질않습니다");

        setShowWrong(true);
        setTimeout(() => {
          setShowWrong(false);
        }, 25000); // 3초 후에 폭죽 숨김 (원하는 시간으로 수정)

        // 1라운드 타이머를 초기화
        setRoundTimeLeft(10);
      }
    });
    e.target.title.value = "";
  }

  function computer() {
    let lastChar = keyword[keyword.length - 1];
    lastChar = applyTwoVowelLaw(lastChar); // 두음법칙 적용

    console.log(applyTwoVowelLaw);

    let url = `https://port-0-jsonserver-jvvy2blm5sv7xz.sel5.cloudtype.app/endgame?word=${lastChar}`;

    

    axios(url).then((res) => {
      //
      let result = res.data.channel.item;
      let reg = /[\-\^]/g;
      let comWord = result.filter((t) => !reg.test(t.word));
      let comWord2 = comWord.filter((t) => !reg.test(t.word));
      let comWord3 = comWord2.filter((t) => !reg.test(t.word));
      let comWord4 = comWord3.filter((t) => !reg.test(t.word));
      let comWord5 = comWord4.filter(
        (t) => !reg.test(t.word) && t.word.length >= 2
      );

      let ranNum = Math.floor(Math.random() * comWord5.length - 1);

      if (comWord5.length) {
        setKeyword(comWord5[ranNum]["word"]);
        setRead(false);
      }
    });
  }

  useEffect(() => {
    computer();
  }, [comCount]);

  // 두음법칙 적용
  function applyTwoVowelLaw(word) {
    if (typeof word !== "string" || word.length === 0) {
      // word가 문자열이 아니거나 비어있는 경우, 또는 undefined인 경우 처리
      return word; // 두음법칙을 적용하지 않고 그대로 반환
    }

    const lastChar = word.charAt(word.length - 1); // 마지막 글자
    const isVowel = /[aeiouAEIOU]/.test(lastChar); // 모음 여부 확인

    if (!isVowel) {
      // 마지막 글자가 자음일 경우
      if (lastChar === "ㄴ") {
        return word.slice(0, -1) + "ㄹ";
      } else if (lastChar === "ㄹ") {
        return word.slice(0, -1) + "ㄴ";
      } else {
        return word;
      }
    } else {
      // 마지막 글자가 모음인 경우
      return word;
    }
  }

  console.log(gameOver)

  return (
    <>
      {isListVisible && ( // List.js 컴포넌트의 표시 여부에 따라 렌더링
        <div className="game_wrap">
          {/* 게임 종료 여부에 따라 화면을 렌더링 */}
          {!gameOver && (
            <div className="setting">
              <div className="btn">
                <button className="set">환경설정</button>
                <button className="exit" onClick={exClick}>
                  나가기
                </button>
              </div>
              <div className="life">
                {/* 목숨 표시 */}
                <img
                  src="./heart.png"
                  className={`heart heart1 ${lives >= 1 ? "" : "hidden"}`}
                ></img>
                <img
                  src="./heart.png"
                  className={`heart heart2 ${lives >= 2 ? "" : "hidden"}`}
                ></img>
                <img
                  src="./heart.png"
                  className={`heart heart3 ${lives >= 3 ? "" : "hidden"}`}
                ></img>
              </div>
            </div>
          )}
          {gameOver && <GameOverScreen exClick={exClick} gameOver={gameOver} />}

          {!gameOver && (
            <div className="del">
              <div className="half">
                {/* 게임 시간 막대 바 */}
                <div className="timer_bar">
                  <div
                    className="timer_bar_fill"
                    style={{ width: `${(timeLeft / 180) * 100}%` }}
                  ></div>
                  {/* <div
                    className="timer_bar_two"
                    style={{ width: `${(roundTimeLeft / 10) * 100}%` }}
                  ></div> */}
                </div>
                {/* 게임 시간을 표시 */}
                <div className="timer">남은 시간: {timeLeft}초</div>
                {/* <div className="roundtimer">게임 시간: {roundTimeLeft}초</div> */}
              </div>

              <div className="tt_wrap">
                <div className="title">
                  <figure className="bg">
                    <img src="./conn.png" alt="" />
                  </figure>
                  <figure className="pk">
                    <img src="./pinnkk.png" alt="" />
                  </figure>
                  <p className="problem">{keyword}</p>
                  <p className="fst">{keyword[keyword.length - 1]}</p>
                </div>
                <div className="earth">
                  <figure>
                    <img src="./world_earth.png" class="earth_img" alt="" />
                    <figcaption>
                      step <br />
                      {step}
                    </figcaption>
                  </figure>
                </div>
              </div>
              <div className="chatt">
                <form onSubmit={text}>
                  <input
                    type="text"
                    name="title"
                    className="ct01"
                    readOnly={read}
                  ></input>
                  <input type="submit" className="ct02"></input>
                </form>
              </div>
              <div className="fireworks-container">
                {showFireworks && <Fireworks />}
              </div>
              <div className="Wrong-container">{showWrong && <Wrong />}</div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default List;
