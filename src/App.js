import './App.css';
import { useState } from 'react';
import {useEffect} from 'react';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [timingType, setTimingType] = useState("session");
  const [play, setplay] = useState(false);

  const timeout = setTimeout(() => {
    if(timeLeft && play){
      setTimeLeft(timeLeft - 1)
    }
  },1000);
 
  const breakIncrement = () => breakLength<60? setBreakLength(breakLength + 1): setBreakLength(breakLength);



  const breakDecrement = () => breakLength>1? setBreakLength(breakLength - 1): setBreakLength(breakLength);

  const sessionIncrement = () => {
    if(sessionLength < 60){
      setSessionLength(sessionLength + 1);
      setTimeLeft(timeLeft + 60);
    }
  }

  const sessionDecrement = () => {
    if(sessionLength>10){
      setSessionLength(sessionLength - 1);
      setTimeLeft(timeLeft - 60);
  }
}
  const handleReset = () =>{
    clearTimeout(timeout);
    setplay(false);
    setTimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingType("session");
    const audio = document.getElementById("beep");
    audio.pause()
    audio.currentTime = 0;

  }

  const handlePlay = () => {
    clearTimeout(timeout);
    setplay(!play);
  }

  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if(!timeLeft && timingType === "session"){
      setTimeLeft(breakLength * 60);
      setTimingType("break")
      audio.play()
    }
    if(!timeLeft && timingType === "break"){
      setTimeLeft(sessionLength * 60)
      setTimingType("session")
      audio.pause()
      audio.currentTime = 0;

    }
  }
  const clock = () => {
    if(play){
      
      resetTimer()
    }else{
      clearTimeout(timeout)
    }
  }
  useEffect(() => {
    clock()
  }, [play,timeLeft,timeout])

  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  
  const title = timingType === "session" ? "session" : "break";
  
  

  return (
    <>
    <div className="Clock">
        <h1 id="mainHeading">25 + 5 Clock</h1>
        <div className="labels">
          <div id="break">
            <h2 id="break-label">Break Length</h2>
            <div className="value-portion">
              <img
                src={require("./images/up-arrow.png")}
                alt="Logo"
                width="34"
                height="34"
                id="break-increment"
                onClick={breakIncrement}
              />
              <div id="value-container">
                <h2 id="break-length">{breakLength}</h2>
              </div>
              <img
                src={require("./images/down-arrow.png")}
                alt="Logo"
                width="34"
                height="34"
                id="break-decrement"
                onClick={breakDecrement}
              />
            </div>
          </div>
          <div id="session">
            <h2 id="session-label">Session Length</h2>
            <div className="value-portion">
              <img
                src={require("./images/up-arrow.png")}
                alt="Logo"
                width="34"
                height="34"
                id="session-increment"
                disabled={play}
                onClick={sessionIncrement}
              />
              <div id="value-container">
                <h2 id="session-length">{sessionLength}</h2>
              </div>
              <img
                src={require("./images/down-arrow.png")}
                alt="Logo"
                width="34"
                height="34"
                id="session-decrement"
                disabled={play}
                onClick={sessionDecrement}
              />
            </div>
          </div>
        </div>
        <div id="main">
            <h3 id="timer-label">{title}</h3>
            <h1 id="time-left">{timeFormatter()}</h1>
        </div>
        <div id="setting-buttons">
        <img
                src={require("./images/play.png")}
                alt="Logo"
                width="34"
                height="34"
                id="start_stop"
                onClick={handlePlay}
              />
         <img
                src={require("./images/reset.png")}
                alt="Logo"
                width="34"
                height="34"
                id="reset"
                onClick={handleReset}
              />
        </div>
        <audio id="beep" preload="auto" src={require("./sounds/alarm_beeps.mp3")}></audio>
        <div>Made by Om Patel</div>
      </div>
    </>
  );
}

export default App;
