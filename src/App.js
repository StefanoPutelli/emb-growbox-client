import { useState } from "react";

import felice from "./img/felice.png";
import triste from "./img/triste.png";

import Thermometer from 'react-thermometer-component'

import Temp from "./comp/temp";
import Sole from "./comp/sun";
import Cloud from "./comp/cloud";
import Hum from "./comp/hum"

function App() {

  const boxStyle = "m-auto flex justify-center align-middle relative "

  const [mood, setMood] = useState(1);
  const [viewXY, setViewXY] = useState(window.innerWidth > window.innerHeight);

  const [cloudMoving, setCloudMoving] = useState(0)

  const [tempHeight, setTempHeight] = useState(100)

  window.addEventListener("resize", () => {
    setViewXY(getViewXY());
  });

  function getViewXY() {
    return (window.innerWidth > window.innerHeight)
  }

  window.addEventListener("resize", () => {
    document.getElementsByClassName("thermometer")[0].style.height = document.getElementById("boxona").clientHeight/3 + "px"
  })

  //add gauge display 

  return (
    <div className="App">
      <div id="landing" className="landing">
        <div className="h-screen w-screen flex justify-center align-middle">
          <div id="boxona"className={viewXY ? boxStyle + "w-[100vh] h-[100vh]" : boxStyle + "w-[100vw] h-[100vw]"}>
            <Sole />
            <div className="cursor-pointer" onClick={() => {
              if (cloudMoving) return
              setCloudMoving(true)
              let cloud_elem = document.getElementById("cloud")
              cloud_elem.ariaDisabled = true
              cloud_elem.classList.add("cloud_move")
              setTimeout(() => {
                document.getElementById("cloud").classList.remove("cloud_move")
                setCloudMoving(false)
              }, 9000)
            }}>
              <Cloud />
            </div>
            <div className="mt-[50%] w-[30%]">
              <img src={mood ? felice : triste} alt="felice" onClick={() => {
                setMood(!mood);
              }} />
            </div>
            <div className="absolute bottom-[20%] right-[7%]">
              <Thermometer
                theme="light"
                value="18"
                max="100"
                steps="3"
                format="°C"
                size="large"
              />
            </div>
          </div>
        </div>
      </div>
      <Temp temp="20" />
      <Hum hum="33" soil_hum="43" />
    </div>
  );
}

export default App;
