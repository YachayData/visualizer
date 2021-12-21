import "./App.css";
import { Container, Row, Col } from "reactstrap";
import ResponsiveRadar from "./components/radar";
import ResponsiveBar from "./components/bar";
import ResponsiveSwarmPlot from "./components/swarmPlot";
import ResponsiveLine from "./components/line";
import GlobalMap from "./components/globalMap/globalMap";
import dataBar from "./data/dataBar";
import dataRadar from "./data/dataRadar";
import dataSwarmPlot from "./data/dataSwarmPlot";
import dataLine from "./data/dataLine";
import dataGlobalMap from "./data/dataGlobalMap";

function App() {
  const barKeys = ["hot dog", "burger", "sandwich", "kebab", "fries", "donut"];
  const radarKeys = ["chardonay", "carmenere", "syrah"];
  const groupsSwarmPlot = ["group A", "group B", "group C"];

  return (
    <div className="App">
      <h1>Gráficos de prueba</h1>
      <ResponsiveBar
        data={dataBar}
        keys={barKeys}
        indexBy={"country"}
        axisXLegend={"country"}
        axisYLegend={"food"}
      />
      <ResponsiveLine
        data={dataLine}
        axisXLegend={"transportation"}
        axisYLegend={"count"}
      />
      <ResponsiveRadar data={dataRadar} keys={radarKeys} />
      <ResponsiveSwarmPlot
        data={dataSwarmPlot}
        groups={groupsSwarmPlot}
        id={"id"}
        value={"price"}
        size={"volume"}
        axisXLegend={"group"}
        axisYLegend={"price"}
      />
      <GlobalMap data={dataGlobalMap} />
    </div>
  );
}

export default App;
