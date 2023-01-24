import Home from "./screens/Home";
import Navbar from "./comp/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Graphs from "./screens/Graphs";
import { useEffect, useState } from "react";
import fetchLastData from "./util/http";
function App() {
  const [sensorData, setSensorData] = useState();
  useEffect(() => {
    async function fetchSensorData() {
      const sensorData = await fetchLastData();
      setSensorData(sensorData);
    }
    fetchSensorData();
  }, []);
  if (!sensorData) {
    return <text>Loading...</text>;
  }
  return (
    <Router>
      <Navbar lastDate={sensorData.date} />
      <Routes>
        <Route path="/" exact element={<Home sensorData={sensorData}></Home>} />
        <Route path="/Graphs" exact element={<Graphs />} />
      </Routes>
    </Router>
  );
}

export default App;
