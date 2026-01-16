"use strict";


const timer = document.getElementById("timer"); //time->timer
const start = document.getElementById("start");
const stop = document.getElementById("stop"); //修正S->s
const reset = document.getElementById("reset");

let startTime;       // Startボタンクリック時の時刻
let timeoutid;       // ID
let stopTime = 0;    // Stopまでの経過時間
const sndStart = new Audio("sound/start.mp3"); 
const sndStopGood = new Audio("sound/stop2.mp3");
const sndStop = new Audio("sound/stop1.mp3");
const sndReset = new Audio("sound/reset.mp3");  
function playSound(a) {
  a.currentTime = 0;
  a.play().catch(() => { });
}

// ボタンを"初期"状態とする
setButtonStateInitial()

////////////////////////
// Startボタンクリック
////////////////////////

start.addEventListener("click", //修正S->s
  function () {
    playSound(sndStart);
    // ボタンをタイマー"動作中"状態とする
    //setButtonStaterunning();
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  }, false
);

////////////////////////
// Stopボタンクリック
////////////////////////
stop.addEventListener("click",
  function () {
    // タイマーを"停止中"状態とする
    setButtonStateStopped();//()追加
    clearTimeout(timeoutid); //setTimeout()でセットしたタイマーを解除する際に使用
    stopTime = Date.now() - startTime;
    //追加
    console.log("elapsed(ms) =", stopTime);
    //  (0–59)
    const sec = Math.floor(stopTime / 1000) % 60;
    if (sec === 10) {
      playSound(sndStopGood);
    } else {
      playSound(sndStop); 
    }
  }, false);//);追加


////////////////////////
// Resetボタンクリック
////////////////////////
//reset.addEventListener("change",

reset.addEventListener("click",
  function () {
    playSound(sndReset);//追加
    // ボタンを"初期"状態とする
    setButtonStateInitial(); //追加　
    timer.textContent = "00:00.000";
    clearTimeout(timeoutid);//追加　
    stopTime = 0;
  }
);


function countUp() {
  const d = new Date(Date.now() - startTime + stopTime);
  /* padStart()で２桁固定表示とする */
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  const ms = String(d.getMilliseconds()).padStart(3, "0");
  /* 描画 */
  timer.textContent = `${m}:${s}.${ms}`;

  timeoutid = setTimeout(() => {
    //再帰呼び出し
    countUp();
  }, 10);
}

// 初期 または Reset後
function setButtonStateInitial() {
  start.classList.remove("js-inactive");
  stop.classList.add("js-inactive");
  reset.classList.add("js-inactive");
  start.classList.remove("js-unclickable");
  stop.classList.add("js-unclickable");
  reset.classList.add("js-unclickable");
}

// 状態:タイマー動作中
function setButtonStateRunning() {
  timer.classList.add("timer-fontColor_hidden"); //時間を見えなくする
  start.classList.add("js-inactive");   // 非活性
  stop.classList.remove("js-inactive");  // 活性
  reset.classList.add("js-inactive");   // 非活性
  start.classList.add("js-unclickable");
  stop.classList.remove("js-unclickable");
  reset.classList.add("js-unclickable");
}

// 状態:タイマー停止中
function setButtonStateStopped() {
  timer.classList.remove("timer-fontColor_hidden"); //時間を見えるようにする
  timer.classList.add("timer_appear"); //時間をゆっくり表示　//.削除
  start.classList.add("js-inactive"); // 活性
  stop.classList.add("js-inactive");    // 非活性
  reset.classList.remove("js-inactive"); // 活性
  start.classList.add("js-unclickable");
  stop.classList.add("js-unclickable");
  reset.classList.remove("js-unclickable");
}