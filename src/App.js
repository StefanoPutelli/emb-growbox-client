import { useState } from "react";

import felice from "./img/felice.png";
import triste from "./img/triste.png";

import Temp from "./comp/temp";
import SimpleDialog from "./comp/slider";
import Sole from "./comp/sun";
import Cloud from "./comp/cloud";

function App() {

  const boxStyle = "m-auto flex justify-center align-middle relative "

  const [mood, setMood] = useState(1);
  const [viewXY, setViewXY] = useState(window.innerWidth > window.innerHeight);
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(50);

  const handleClose = (value) => {
    setLight(value);
    setOpen(false);
  };

  window.addEventListener("resize", () => {
    setViewXY(getViewXY());
  });

  function getViewXY() {
    return (window.innerWidth > window.innerHeight)
  }

  function sunClicked() {
    setOpen(true);
  }

  function getSunSize(size_) {
    return {
      clipPath: "circle(" + shrinkSun(light) + "% at 50% 50%)"
    }
  }

  function shrinkSun(size_) {
    if (size_ > 100) {
      return 100;
    } else {
      return (size_ / 5 + 30);
    }
  }

  //add gauge display 

  return (
    <div className="App">
      <SimpleDialog
        light={light}
        open={open}
        onClose={handleClose}
      />
      <div className="landing">
        <div className="h-screen w-screen flex justify-center align-middle">
          <div className={viewXY ? boxStyle + "w-[100vh] h-[100vh]" : boxStyle + "w-[100vw] h-[100vw]"}>
            <Sole onClick_={sunClicked} style_={getSunSize()} />
            <Cloud />
            <div className="mt-[50%] w-[30%]">
              <img src={mood ? felice : triste} alt="felice" onClick={() => {
                setMood(!mood);
              }} />
            </div>
          </div>
        </div>
      </div>
      <Temp temp="20" />
      <Temp temp="20" />
      <Temp temp="20" />
    </div>
  );
}

export default App;
