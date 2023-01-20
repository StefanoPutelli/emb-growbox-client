import { WiHumidity } from "react-icons/wi";
import soil_hum from "../img/soil_hum.png";
import { Stack } from "@mui/system";

function Hum(props) {
    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <div className="border-solid border-t-2 border-r-2 border-l-2 w-[30%] text-center">
                <h1 className={"font-extralight text-9xl inline-block m-0"}>{props.hum + "%"}</h1>
            </div>
            <div className="border-solid border-t-2 border-r-2 w-[20%] text-center">
                <WiHumidity className={"text-9xl inline-block mb-0"} />
            </div>
            <div className="border-solid border-t-2 border-r-2 w-[20%] text-center">
                <img className="w-[100%]" src={soil_hum} alt="soil_hum" />
            </div>
            <div className="border-solid border-t-2 border-r-2 w-[30%] text-center">
                <h1 className={"font-extralight text-9xl inline-block m-0"}>{props.soil_hum + "%"}</h1>
            </div>
        </Stack>
    )
}

export default Hum