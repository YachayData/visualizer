import "./App.css";
import { Container, Row, Col } from "reactstrap";
// Gráficos
import ResponsiveBar from "./components/bar";
import ResponsiveBarGrouped from "./components/barGrouped";
import ResponsiveRadar from "./components/radar";
import ResponsiveSwarmPlot from "./components/swarmPlot";
import ResponsiveLine from "./components/line";
import GlobalMap from "./components/globalMap/globalMap";
import ResponsiveTreeMap from "./components/treeMap";
import ResponsivePie from "./components/pie";
import ResponsiveStream from "./components/stream";
// Data
import dataBar from "./data/dataBar";
import dataRadar from "./data/dataRadar";
import dataSwarmPlot from "./data/dataSwarmPlot";
import dataLine from "./data/dataLine";
import dataGlobalMap from "./data/dataGlobalMap";
import dataTreeMap from "./data/dataTreeMap";
import dataPie from "./data/dataPie";
import dataStream from "./data/dataStream";
import dataSport from "./data/dataSport";

function App() {
  const barKeys = ["hot dog", "burger", "sandwich", "kebab", "fries", "donut"];
  const radarKeys = ["chardonay", "carmenere", "syrah"];
  const swarmPlotGroups = ["group A", "group B", "group C"];
  const streamKeys = ["Raoul", "Josiane", "Marcel", "René", "Paul", "Jacques"];

  return (
    <div className="App">
      <h1>Gráficos de prueba</h1>
      <ResponsiveRadar data={dataSport} keys={["name"]} indexBy={"item"} />
      <ResponsiveBar
        data={dataBar}
        keys={barKeys}
        indexBy={"country"}
        axisXLegend={"country"}
        axisYLegend={"food"}
      />
      <ResponsiveBarGrouped
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
      <ResponsiveSwarmPlot
        data={dataSwarmPlot}
        groups={swarmPlotGroups}
        id={"id"}
        value={"price"}
        size={"volume"}
        axisXLegend={"group"}
        axisYLegend={"price"}
      />
      <ResponsiveTreeMap data={dataTreeMap} id={"name"} value={"loc"} />
      <ResponsivePie data={dataPie} />
      <ResponsiveStream
        data={dataStream}
        keys={streamKeys}
        axisXLegend={""}
        axisYLegend={""}
      />
      <GlobalMap data={dataGlobalMap} />
    </div>
  );
}

export default App;
