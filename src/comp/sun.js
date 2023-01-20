import sole_raggi from "../img/sole_reggi.png";
import sole_centro from "../img/sole_centro.png";
import { useState, useEffect } from "react"
import { Box } from "@mui/system";

// stop propagation of scroll event when touching slider

export default function Sun(props) {
    const [light, setLight] = useState(0);
    const [touching, setTouching] = useState(false);

    useEffect(() => {
        const cb = () => {
            let val = 30 + (light / 100 * 40)
            document.getElementById("landing").style.background = "linear-gradient(0, white ,hsla(204, 92%, " + val + "%, 1))"
        }
        window.addEventListener("load", cb)
        return () => {
            window.removeEventListener("load", cb)
        }
    }, [light])

    useEffect(() => {
        const cb = (event) => {
            if (touching) {
                event.preventDefault()
            }
        }
        window.addEventListener("scroll", cb)
        return () => {
            window.removeEventListener("scroll", cb)
        }
    },[touching])

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
    

    function changeValue(value) {
        let val = 30 + (value / 100 * 40)
        document.getElementById("landing").style.background = "linear-gradient(0, white ,hsla(204, 92%, " + val + "%, 1))"
        setLight(value)
    }

    return (
        <div className="h-[100%] w-[100%] relative ml-5 mt-5">
            <div className="relative w-[30%] h-[25%]">
                <img className="absolute w-[100%] top-0" onClick={props.onClick_} src={sole_centro} alt="sun face" />
                <img id="ring" className="absolute w-[100%] top-0" style={getSunSize()} onClick={props.onClick_} src={sole_raggi} alt="sun" />
            </div>
                <input
                    id="slider"
                    type="range"
                    onTouchStart={() => {
                        setTouching(true)
                        console.log("touching")
                    }}
                    onTouchEnd={() => {
                        setTouching(false)
                        console.log("not touching")
                    }}
                    min={0}
                    max={100}
                    onChange={(e) => changeValue(e.target.value)}
                    value={light}
                />
        </div>
    )
}