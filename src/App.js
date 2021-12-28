import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import { Container, Row, Col } from "reactstrap";
// Gráficos
import ResponsiveLine from "./components/line";
import ResponsivePie from "./components/pie";

// Data
import dataPie from "./data/dataPie";
import { generateLinePlotData } from "./utils/plotData";

function App() {
  const [width, setWindowWidth] = useState(0);
  const [state, setState] = useState({
    currentRegion: "TOTAL",
    dataType: "UCI",
    data: [],
  });

  useEffect(() => {
    setState({
      data: generateLinePlotData(state.dataType, state.currentRegion),
    });
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  return (
    <div className="App">
      <h1>Mapa Covid</h1>
      <Fragment>
        <Container className="app-container">
          <Row
            style={{
              flex: 1,
              display: "flex",
              flexDirection: width > 900 ? "row" : "column",
            }}
          >
            <Col style={{ flex: 1 }}>
              <ResponsivePie data={dataPie} screenWidth={width} />
            </Col>
            <Col style={{ flex: 1 }}>
              <ResponsiveLine
                data={state.data}
                axisXLegend={"Fecha"}
                axisYLegend={"Cantidad"}
                screenWidth={width}
              />
            </Col>
          </Row>
        </Container>
      </Fragment>
    </div>
  );
}

export default App;
