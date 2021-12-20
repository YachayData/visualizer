import logo from "./logo.svg";
import "./App.css";
import { Container, Row, Col } from "reactstrap";
import ResponsiveRadar from "./components/radar";
import ResponsiveBar from "./components/bar";
import ResponsiveSwarmPlot from "./components/swarmPlot";
import dataBar from "./data/dataBar";
import dataRadar from "./data/dataRadar";
import dataSwarmPlot from "./data/dataSwarmPlot";

function App() {
  return (
    <div className="App">
      <h1>Gráfico de prueba</h1>
      <ResponsiveRadar data={dataRadar} />
    </div>
  );
}

export default App;
