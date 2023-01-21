import { useState, useEffect } from "react";

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
  const [viewXY, setViewXY] = useState(window.innerWidth - window.innerHeight);

  const [cloudMoving, setCloudMoving] = useState(0)

  function getViewXY() {
    return (window.innerWidth - (window.innerHeight - window.innerHeight / 10))
  }

  useEffect(() => {
    window.addEventListener("resize", () => {
      setViewXY(getViewXY());
    })
    return () => {
      window.removeEventListener("resize", () => {
        setViewXY(getViewXY());
      })
    }
  }, [viewXY])


  useEffect(() => {
    const cb = () => {
      window.addEventListener("load", () => {
        document.getElementsByClassName("thermometer")[0].style.height = document.getElementById("boxona").getBoundingClientRect().height / 4 + "px"
      })
    }
    const cb2 = () => {
      window.addEventListener("resize", () => {
        document.getElementsByClassName("thermometer")[0].style.height = document.getElementById("boxona").getBoundingClientRect().height / 4 + "px"
      })
    }

    return () => {
      window.removeEventListener("load", cb)
      window.removeEventListener("resize", cb2)
    }
  }, [viewXY])



  //add gauge display 

  return (
    <div className="App">
      <div id="landing" className="landing">
        <div className="h-screen w-screen flex justify-center align-middle">
          <div id="boxona" className={viewXY > 0 ? boxStyle + "w-[100vh] h-[100vh]" : boxStyle + "w-[100vw] h-[90vh] mt-[10vh] mb-[10vh]"}>
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
              }, 8000)
            }}>
              <Cloud />
            </div>
            <div className={viewXY > 0 ? "absolute w-[35%] bottom-[10%]" : "absolute w-[40%] bottom-[20%]"}>
              <img src={mood ? felice : triste} alt="felice" onClick={() => {
                setMood(!mood);
              }} />
            </div>
            <div className="absolute bottom-[50%] right-[2%] translate-y-[50%]">
              <Thermometer
                theme="light"
                value="18"
                max="100"
                format="°C"
                size="medium"
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
