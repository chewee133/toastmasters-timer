import { useEffect, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";

function App() {
  const borderSize = 50;
  const [StartTarget, setStartTarget] = useState(60 * 10);
  const [TimeLeft, setTimeLeft] = useState(StartTarget);
  const [ElapsedTime, setElapsedTime] = useState(0);
  const [DisplayedTime, setDisplayedTime] = useState(StartTarget);
  const [bgColor, setBgColor] = useState("white");
  const [txtColor, setTxtColor] = useState("black");
  const [flagRunning, setFlagRunning] = useState(false);
  const [borderWidth, setBorderWidth] = useState(borderSize);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchCurrentX, setTouchCurrentX] = useState(null);
  const [lastClick, setLastClick] = useState(null);
  const [lastClickDuration, setLastClickDuration] = useState(null);
  const [TotalMove, setTotalMove] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [timeConfig, setTimeConfig] = useState("60");
  const [history, setHistory] = useState([0, 0, 0]);

  const StartTimer = () => {
    setFlagRunning(true);
    setBorderWidth(0);
  };
  const StopTimer = () => {
    setFlagRunning(false);
    setBorderWidth(borderSize);
  };

  const handleClick = () => {
    if (Date.now() - lastClick < 300) {
      // handleDoubleClick();
    }
    if (flagRunning) {
      StopTimer();
    } else {
      StartTimer();
    }
    setLastClickDuration(Date.now() - lastClick);
    setLastClick(Date.now());
  };

  const handleDoubleClick = () => {
    setDisplayedTime(StartTarget);
    setTimeLeft(StartTarget);
  };

  const updateBgColor = () => {
    if (TimeLeft <= 0) {
      setBgColor("red");
      setTxtColor("white");
    } else if (TimeLeft <= timeConfig) {
      setBgColor("yellow");
      setTxtColor("black");
    } else if (TimeLeft <= timeConfig * 2) {
      setBgColor("green");
      setTxtColor("white");
    } else {
      setBgColor("white");
      setTxtColor("black");
    }
  };

  useEffect(() => {
    if (flagRunning) {
      const timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          return prevTimeLeft - 1;
        });
        setElapsedTime(StartTarget - TimeLeft + 1);
        setDisplayedTime(TimeLeft - 1);
      }, 1000);
      updateBgColor();
      return () => clearInterval(timer);
    }
  });

  const formatTime = (time) => {
    const Minutes = time > 0 ? Math.floor(time / 60) : Math.ceil(time / 60);
    const Seconds = time % 60;
    return `${Minutes}m ${Seconds}`;
  };

  const isMobileDevice = () => {
    return /Mobi|Android|iPhone/i.test(navigator.userAgent);
  };

  const handleMouseDown = (event) => {
    const posX = event.clientX ? event.clientX : event.touches[0].clientX;

    setIsMobile(isMobileDevice());

    // const posY = event.touches[0].clientY;
    setTouchStartX(posX);
    setTouchCurrentX(posX);
  };

  const DistUnit = 30;

  const handleMouseMove = (event) => {
    const posX = event.clientX ? event.clientX : event.touches[0].clientX;
    // const posY = event.touches[0].clientY;

    if (touchStartX !== null && flagRunning === false) {
      setTouchCurrentX(posX);
      const TotalMoveX = touchCurrentX - touchStartX;
      if (Math.abs(TotalMoveX) > DistUnit) {
        const timeChange =
          TotalMoveX > 0
            ? Math.floor(TotalMoveX / DistUnit) * 30
            : Math.ceil(TotalMoveX / DistUnit) * 30;
        setDisplayedTime(+timeChange + +StartTarget);
      }
    }
  };

  const handleMouseUp = () => {
    const TotalMoveX = touchCurrentX - touchStartX;
    setTotalMove(TotalMoveX);

    if (Math.abs(TotalMoveX) < DistUnit) {
      // handleClick();
    } else {
      const timeChange =
        TotalMoveX > 0
          ? Math.floor(TotalMoveX / DistUnit) * 30
          : Math.ceil(TotalMoveX / DistUnit) * 30;
      const newTime = +StartTarget + +timeChange;
      // setStartTarget(newTime);
      setTimeLeft(newTime);
      setDisplayedTime(newTime);
      setStartTarget(newTime);
    }

    setTouchStartX(null);
    setTouchCurrentX(null);
  };

  //configure the colour warning periods
  const handleRadioChange = (event) => {
    event.stopPropagation();
    setTimeConfig(event.target.value);
  };

  const styles = {
    myButton: {
      padding: "20px 50px",
      margin: "5px",
      // background: "#007bff",
      // fontSize: "30px",
      color: "navy",
      fontWeight: "bold",
      borderRadius: "5px",
      border: "3px solid #333",
    },
  };

  useEffect(() => {
    // Create a style tag
    const style = document.createElement("style");
    style.innerHTML = `
        @keyframes colorChange {
      0% {
        border-color: lightgrey;
      }
      25% {
        border-color: DeepSkyBlue;
      } 
      50% {
        border-color: DeepSkyBlue;
      }
      75% {
        border-color: lightgrey;
      }
      100% {
        border-color: lightgrey;
      }
    }
    .border-animation {
      animation: colorChange 2s  infinite;
    }  
    `;
    // @keyframes colorChange {
    //   0% {
    //     border-color: lightgrey;
    //     background-color: white;
    //   }
    //   25% {
    //     border-color: DeepSkyBlue;
    //     background-color: #E0FAFF;
    //   }
    //   50% {
    //     border-color: DeepSkyBlue;
    //     background-color: #E0FAFF;
    //   }
    //   75% {
    //     border-color: lightgrey;
    //     background-color: white;
    //   }
    //   100% {
    //     border-color: lightgrey;
    //     background-color: white;
    //   }
    // }
    // .border-animation {
    //   animation: colorChange 2s  infinite;
    // }
    // `;
    // style.innerHTML = `
    //   @keyframes moveAround {
    //     0% {

    //       border-top-color: DeepSkyBlue;
    //       border-right-color: DeepSkyBlue;
    //       border-bottom-color: transparent;
    //       border-left-color: transparent;
    //     }
    //     25% {
    //       border-top-color: transparent;
    //       border-right-color: DeepSkyBlue;
    //       border-bottom-color: DeepSkyBlue;
    //       border-left-color: transparent;
    //     }
    //     50% {
    //       border-top-color: transparent;
    //       border-right-color: transparent;
    //       border-bottom-color: DeepSkyBlue;
    //       border-left-color: DeepSkyBlue;
    //     }
    //     75% {
    //       border-top-color: DeepSkyBlue;
    //       border-right-color: transparent;
    //       border-bottom-color: transparent;
    //       border-left-color: DeepSkyBlue;
    //     }
    //     100% {
    //       border-top-color: DeepSkyBlue;
    //       border-right-color: DeepSkyBlue;
    //       border-bottom-color: transparent;
    //       border-left-color: transparent;
    //     }
    //   }
    //   .border-animation {
    //     position: absolute;
    //     width: 0;
    //     height: 0;
    //     border-width: ${borderWidth}px;
    //     border-style: solid;
    //     border-color: transparent;
    //     animation: moveAround 2s linear infinite, borderColorChange infinite;
    //   }
    //   `;
    // Append the style tag to the document head
    document.head.appendChild(style);

    // Cleanup the style tag on component unmount
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleStartStop = () => {
    if (flagRunning === true) {
      StopTimer();
    } else {
      StartTimer();
    }
  };

  const handleSetTimeTarget = (event) => {
    const targetTime = event.target.getAttribute("data-value");
    const timeWarning = event.target.getAttribute("data-warning");

    //save last recorded time
    addHistory(ElapsedTime);
    console.log(history);

    //set new time configuration
    setStartTarget(targetTime);
    setTimeConfig(timeWarning);

    //refresh display
    setDisplayedTime(targetTime);
    setTimeLeft(targetTime);
  };

  //History update: add curent time to history and shift history records
  const addHistory = (valHist) => {
    setHistory([valHist, ...history].slice(0, 3));
  };

  return (
    <div
      className={`App ${!flagRunning ? "border-animation" : ""}`}
      style={{
        backgroundColor: bgColor,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: 0,
        border: `${borderWidth}px solid grey`,
        boxSizing: "border-box",
        userSelect: "none",
      }}

      // onTouchStart={isMobile ? handleMouseDown : null}
      // onTouchMove={isMobile ? handleMouseMove : null}
      // onTouchEnd={isMobile ? handleMouseUp : null}
      // onMouseDown={isMobile ? null : handleMouseDown}
      // onMouseMove={isMobile ? null : handleMouseMove}
      // onMouseUp={isMobile ? null : handleMouseUp}

      // onClick={handleClick}
    >
      <h2 style={{ color: txtColor }}>
        Time left: {formatTime(DisplayedTime)}
      </h2>
      <h1 style={{ color: txtColor, marginBottom: 0 }}>
        Elasped time: {formatTime(ElapsedTime)}
      </h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {history.map((item, index) => {
          return <li key={index}>{formatTime(item)}</li>;
        })}
      </ul>
      <div
        style={{ ...styles.myButton, color: txtColor }}
        onClick={handleStartStop}
      >
        Start/Stop
      </div>
      <div
        style={{ ...styles.myButton, color: txtColor }}
        data-value="420"
        data-warning="60"
        onClick={handleSetTimeTarget}
      >
        5-7 minutes
      </div>
      <div
        style={{ ...styles.myButton, color: txtColor }}
        data-value="360"
        data-warning="60"
        onClick={handleSetTimeTarget}
      >
        4-6 minutes
      </div>
      <div
        style={{ ...styles.myButton, color: txtColor }}
        data-value="120"
        data-warning="30"
        onClick={handleSetTimeTarget}
      >
        1-2 minutes
      </div>
      <div
        style={{ ...styles.myButton, width: "70%", color: txtColor }}
        onTouchStart={isMobile ? handleMouseDown : null}
        onTouchMove={isMobile ? handleMouseMove : null}
        onTouchEnd={isMobile ? handleMouseUp : null}
        onMouseDown={isMobile ? null : handleMouseDown}
        onMouseMove={isMobile ? null : handleMouseMove}
        onMouseUp={isMobile ? null : handleMouseUp}
        // onClick={handleSetTimeTarget}
      >
        {"<--- Adjust --->"}
      </div>
      {/* <p style={{ color: txtColor }}>
        <u>Double tap</u> to reset the timer.
      </p>{" "} */}
      <p style={{ color: txtColor }}>
        <u>Select</u> for a short speech or a long speech:
      </p>
      <div>
        <label style={{ color: txtColor }}>
          <input
            type="radio"
            value="30"
            checked={timeConfig === "30"}
            onChange={handleRadioChange}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          />
          1 minute warning
        </label>
        <label style={{ color: txtColor }}>
          <input
            type="radio"
            value="60"
            checked={timeConfig === "60"}
            onChange={handleRadioChange}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          />
          2 minutes warning
        </label>
      </div>
    </div>
  );
}

export default App;
