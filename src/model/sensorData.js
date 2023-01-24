class SensorData {
  constructor(data) {
    // console.log(data);
    this.date = new Date(data.date * 1000);
    this.temperature = data.temperature;
    this.humidity = data.humidity;
    this.soilMoisture = data.soilMoisture;
    this.lightPower = data.lightPower;
    this.irrigation = data.irrigation === 1 ? true : false;
    this.waterTank = data.waterTank;
  }
}

export default SensorData;
