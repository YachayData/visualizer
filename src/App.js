import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import { Container, Row, Col } from "reactstrap";
import LinePlot from "./components/linePlot";
import { generateLinePlotData } from "./utils/plotData";
import PlotOptions from "./components/plotOptions";
import Bottom from "./components/bottom";

function App() {
  const [width, setWindowWidth] = useState(0);
  const [data, setData] = useState([]);
  const [dataType, setDataType] = useState("DailyTotalCases");
  const [dataGranularity, setDataGranularity] = useState("TOTAL");
  const [currentRegion, setCurrentRegion] = useState([]);
  const [currentComuna, setCurrentComuna] = useState([]);

  useEffect(() => {
    setData(
      generateLinePlotData({
        dataType: dataType,
        dataGranularity: dataGranularity,
        currentRegion: currentRegion,
        currentComuna: currentComuna,
      })
    );
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [dataType, currentRegion, currentComuna, dataGranularity]);

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
                dataGranularity={dataGranularity}
                setDataGranularity={(e) => setDataGranularity(e)}
                currentRegion={currentRegion}
                setCurrentRegion={(e) => setCurrentRegion(e)}
                currentComuna={currentComuna}
                setCurrentComuna={(e) => setCurrentComuna(e)}
                screenWidth={width}
              />
              <LinePlot data={data} screenWidth={width} />
              <Bottom screenWidth={width} />
            </Col>
          </Row>
        </Container>
      </Fragment>
    </div>
  );
}

export default App;
