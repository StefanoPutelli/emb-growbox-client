import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Graph from "../comp/Graph/Graph";
import { fetchDataFromLastWeek } from "../util/http";
import LinearProgress from "@mui/material/LinearProgress";

const relevantDates = [
  getDateBeforeXDays(6),
  getDateBeforeXDays(5),
  getDateBeforeXDays(4),
  getDateBeforeXDays(3),
  getDateBeforeXDays(2),
  getDateBeforeXDays(1),
  getDateBeforeXDays(0),
];

const labels = relevantDates.map((x) => x.toLocaleDateString("en-GB"));

function getDateBeforeXDays(day) {
  const now = new Date();

  let date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day);
  date.setHours(0, 0, 0, 0);
  return date;
}

function getSensorDataDividedByWeek(data) {
  const dataByWeek = Object.assign(
    {},
    ...relevantDates.map((x) => ({ [x]: 0 }))
  );
  for (const item of data) {
    const key = item.date;
    key.setHours(0, 0, 0, 0);
    if (dataByWeek[key] === 0) {
      dataByWeek[key] = item;
    }
  }
  for (const key in dataByWeek) {
    if (dataByWeek[key] === 0) {
      dataByWeek[key] = { temperature: 0, soilMoisture: 0 };
    }
  }
  const dataByWeekValues = [];
  for (const key in dataByWeek) {
    dataByWeekValues.push(dataByWeek[key]);
  }
  return dataByWeekValues;
}
export default function Graphs() {
  const [sensorData, setSensorData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromLastWeek(
        getDateBeforeXDays(6).getTime() / 1000
      );
      const dataDividedByWeek = getSensorDataDividedByWeek(data);
      setSensorData(dataDividedByWeek);
    }
    fetchData();
  }, []);

  if (sensorData.length === 0) {
    return <LinearProgress />;
  }
  return (
    <div className="data-row">
      <view className="data-item">
        <Graph
          labels={labels}
          label={"Soil Moisture"}
          graphData={sensorData.map((x) => x.soilMoisture)}
          title="Soil Moisture Data From Last Week"
          color={"green"}
        />
      </view>
      <view className="data-item">
        <Graph
          labels={labels}
          label={"Temperature"}
          graphData={sensorData.map((x) => x.temperature)}
          title="Temperature Data From Last Week"
          color={"rgb(255, 99, 132)"}
        />
      </view>
    </div>
  );
}
