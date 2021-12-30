import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import { Container, Row, Col } from "reactstrap";
import ResponsiveLine from "./components/line";
import { generateLinePlotData } from "./utils/plotData";
import PlotOptions from "./components/plotOptions";

function App() {
  const [width, setWindowWidth] = useState(0);
  const [data, setData] = useState([]);
  const [dataType, setDataType] = useState("TotalCases");
  const [currentRegion, setCurrentRegion] = useState(["TOTAL"]);

  useEffect(() => {
    setData(
      generateLinePlotData({
        dataType: dataType,
        currentRegion: currentRegion,
      })
    );
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [dataType, currentRegion]);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  return (
    <div className="App">
      <h2>Visualizador datos COVID-19</h2>
      <Fragment>
        <Container className="app-container">
          <Row style={{ flex: 0.5, display: "flex" }}>
            <Col style={{ flex: 1 }}>
              <PlotOptions
                dataType={dataType}
                setDataType={(e) => setDataType(e)}
                currentRegion={currentRegion}
                setCurrentRegion={(e) => setCurrentRegion(e)}
              />
              <ResponsiveLine data={data} screenWidth={width} />
            </Col>
          </Row>
        </Container>
      </Fragment>
    </div>
  );
}

export default App;
