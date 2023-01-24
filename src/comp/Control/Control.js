import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import "./Control.css";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";
import { MdOutlineLightMode } from "react-icons/md";
import { GiWaterTank } from "react-icons/gi";
import { updateControlSettings } from "../../util/http";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const marks = [
  {
    value: 0,
    label: "0V",
  },
  {
    value: 5,
    label: "5V",
  },
];

export default function Control({ lightPower, irrigation }) {
  const [sliderValue, setSliderValue] = useState(lightPower);
  const [switchValue, setSwitchValue] = useState(irrigation);
  const [openToast, setOpenToast] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  function sliderValueText(value) {
    return `${value}V`;
  }

  const handleSliderChange = (event, newValue) => {
    if (typeof newValue === "number") {
      setSliderValue(newValue);
    }
  };

  const handleSwitchChange = (event) => {
    setSwitchValue(event.target.checked);
  };

  async function onClickHandler() {
    const data = { lightPower: sliderValue, irrigation: switchValue ? 1 : 0 };
    const result = await updateControlSettings(data);
    if (!result) {
      setSeverity("error");
      setMessage("Failed to save changes");
    } else {
      setSeverity("success");
      setMessage("Successfully saved changes");
    }
    setOpenToast(true);
  }

  const switchLabel = switchValue ? "ON" : "AUTOMATIC";
  return (
    <>
      <div className="control-container">
        <view className="control-item">
          <div className="control-text-container">
            <text className="control-title">Lights</text>
          </div>
          <view className="control-slider-container">
            <MdOutlineLightMode size={"2em"} />
            <Slider
              className="control-slider"
              aria-label="Default"
              valueLabelDisplay="auto"
              valueLabelFormat={sliderValueText}
              min={0}
              max={5}
              getAriaValueText={sliderValueText}
              marks={marks}
              step={0.1}
              onChangeCommitted={handleSliderChange}
              value={sliderValue}
            />
          </view>
        </view>
        <view className="control-item">
          <div className="control-text-container">
            <text className="control-title">Irrigation</text>
          </div>
          <view className="control-switch-container">
            <GiWaterTank size={"2em"} />
            <view className="control-switch">
              <FormControlLabel
                control={
                  <Switch
                    onChange={handleSwitchChange}
                    checked={switchValue}
                    size="medium"
                  />
                }
                label={switchLabel}
              />
            </view>
          </view>
        </view>
      </div>
      <view className="control-button">
        <Button onClick={onClickHandler} variant="contained">
          Apply Changes
        </Button>
      </view>
      <Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={() => setOpenToast(false)}
      >
        <Alert severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
