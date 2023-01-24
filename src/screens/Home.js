import Gauge from "../comp/Gauge/gauge";
import Thermometer from "../comp/Thermometer/Thermometer ";
import Weather from "../comp/Weather/Weather";
import WaterTank from "../comp/WaterTank/WaterTank";
import Control from "../comp/Control/Control";

function Home({ sensorData }) {
  return (
    <div className="App">
      <view className="data-row">
        <view className="data-item">
          <Thermometer
            theme="light"
            value={sensorData.temperature}
            max="50"
            format="°C"
            size="small"
            showVal={false}
          />
        </view>
        <view className="data-item">
          <WaterTank waterTank={sensorData.waterTank} />
        </view>
        <view className="data-item">
          <Control
            lightPower={sensorData.lightPower}
            irrigation={sensorData.irrigation}
          />
        </view>
      </view>
      <view className="data-row">
        <view className="data-item">
          <Gauge
            title="Humidity"
            precent={sensorData.humidity / 100}
            nrOfLevels={5}
            value={sensorData.humidity}
          />
        </view>

        <view className="data-item">
          <Weather />
        </view>
        <view className="data-item">
          <Gauge
            title="Soil Moisture"
            precent={sensorData.soilMoisture / 100}
            nrOfLevels={5}
            value={sensorData.soilMoisture}
          />
        </view>
      </view>
    </div>
  );
}

export default Home;
