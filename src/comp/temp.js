
import { WiThermometerExterior } from "react-icons/wi";
import { Stack } from "@mui/system";

function Temp(props) {
    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <div className="border-solid border-t-2 border-r-2 border-l-2 w-[40%] text-center">
                <h1 className={"font-extralight text-9xl inline-block m-0"}>{props.temp + "°C"}</h1>
            </div>
            <div className="border-solid border-t-2 border-r-2 w-[20%] text-center">
                <WiThermometerExterior className={"text-9xl inline-block mb-0"} />
            </div>
            <div className="border-solid border-t-2 border-r-2 w-[40%] text-center">
                <h1 className={"font-extralight text-9xl inline-block m-0"}>{props.temp + "°F"}</h1>
            </div>
        </Stack>
    )
}

export default Temp