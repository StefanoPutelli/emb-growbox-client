import sole_raggi from "../img/sole_reggi.png";
import sole_centro from "../img/sole_centro.png";
import { useState } from "react"
import { Slider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box} from "@mui/system";

export default function Sun(props) {
    const [light, setLight] = useState(0);

    let temp_light = 0;

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

    function changeValue(event, value) {
        temp_light = value;
        let val = 30 + (value/100*40)
        document.getElementById("landing").style.background = "linear-gradient(0, white ,hsla(204, 92%, " + val + "%, 1))" 
    }



    const StSlider = styled(Slider)({
        color: '#FFB81C',
    });

    return (
        <div className="h-[100%] w-[100%] absolute">
            <img className="absolute w-[30%] top-0" onClick={props.onClick_} src={sole_centro} alt="sun face" />
            <img id="ring" className="absolute w-[30%] top-0" style={getSunSize()} onClick={props.onClick_} src={sole_raggi} alt="sun" />
            <Box className="h-[50%] w-[30%] absolute bottom-[20%]">
                <div className="h-[100%] w-min block m-auto">
                    <StSlider

                        key={light}
                        defaultValue={light}
                        orientation="vertical"
                        min={0}
                        max={100}
                        onChange={changeValue}
                        onMouseUp={() => {
                            setLight(temp_light)
                        }}
                    />
                </div>
            </Box>
        </div>
    )
}