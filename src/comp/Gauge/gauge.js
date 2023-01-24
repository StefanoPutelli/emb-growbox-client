import GaugeChart from "react-gauge-chart";
import "./Gauge.css";

export default function Gauge({ title, precent, value }) {
  return (
    <view className="gauge-container">
      <div className="text-container">
        <text className="title">{title}</text>
      </div>
      <GaugeChart
        nrOfLevels={5}
        percent={precent}
        textColor={"black"}
        className="chart"
        hideText={true}
        colors={["red", "yellow", "green", "yellow", "red"]}
        arcsLength={[0.1, 0.2, 0.35, 0.2, 0.1]}
      />
      <div className="text-container">
        <p className="value">{value}</p>
      </div>
    </view>
  );
}
