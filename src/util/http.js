import axios from "axios";
import SensorData from "../model/sensorData";
//first step like all those apis i save the key and URl
const fireBaseUrl =
  "https://emb-grow-box-default-rtdb.europe-west1.firebasedatabase.app";

const getChangeControllersUrl = (ipAddress) => `http://${ipAddress}/control`;

const fetchLastData = async () => {
  const { data } = await axios.get(fireBaseUrl + "/sensorsData.json", {
    params: {
      orderBy: '"date"',
      limitToLast: 1,
    },
  });
  //   const key = data.key;
  for (const key in data) {
    const sensorData = new SensorData(data[key]);
    return sensorData;
  }
};

export const fetchDataFromLastWeek = async (lastWeekDate) => {
  const { data } = await axios.get(fireBaseUrl + "/sensorsData.json", {
    params: {
      orderBy: '"date"',
      startAt: lastWeekDate,
    },
  });
  const lastWeekData = [];
  for (const key in data) {
    const sensorData = new SensorData(data[key]);
    lastWeekData.push(sensorData);
  }
  return lastWeekData;
};

export default fetchLastData;

export const updateControlSettings = async (controlSettings) => {
  const { data } = await axios.get(fireBaseUrl + "/ipAddress.json");
  const url = getChangeControllersUrl(data);
  try {
    await axios.post(url, controlSettings);
    return true;
  } catch (error) {
    return false;
  }
};
