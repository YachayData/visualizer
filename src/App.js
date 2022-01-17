import React, { useState, useEffect, Fragment, useRef } from "react";
import "./App.css";
import { Container, Row, Col } from "reactstrap";
import LinePlot from "./components/linePlot";
import { generateLinePlotData } from "./utils/plotData";
import PlotOptions from "./components/plotOptions";
import Bottom from "./components/bottom";
import { toPng } from "html-to-image";
import { PDFExport } from "@progress/kendo-react-pdf";

function App() {
  const [width, setWindowWidth] = useState(0);
  const [data, setData] = useState([]);
  const [dataType, setDataType] = useState("DailyTotalCases");
  const [dataGranularity, setDataGranularity] = useState("TOTAL");
  const [currentRegion, setCurrentRegion] = useState([]);
  const [currentComuna, setCurrentComuna] = useState([]);
  const pngExportComponent = useRef();
  const pdfExportComponent = useRef(null);

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

  const exportComponentAsPNGStory = () => {
    toPng(pngExportComponent.current, {
      cacheBust: true,
      canvasWidth: 1080,
      canvasHeight: 1920,
      backgroundColor: "white",
    }).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "visualizador_covid";
      link.href = dataUrl;
      link.click();
    });
  };

  const exportComponentAsPNGPost = (shape) => {
    toPng(pngExportComponent.current, {
      cacheBust: true,
      canvasWidth: 1080,
      canvasHeight: 1080,
      backgroundColor: "white",
    }).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "visualizador_covid";
      link.href = dataUrl;
      link.click();
    });
  };

  const exportComponentAsPDF = (e) => {
    pdfExportComponent.current.save();
  };

  return (
    <div className="App">
      <Fragment>
        <Container className="app-container">
          <Row style={{ flex: 0.5, display: "flex" }}>
            <Col style={{ flex: 1 }}>
              <PDFExport
                ref={pdfExportComponent}
                paperSize="auto"
                margin={30}
                fileName={"visualizador_covid"}
                author="Yachay"
              >
                <div className="export" ref={pngExportComponent}>
                  <h2>Visualizador datos COVID-19</h2>
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
                </div>
              </PDFExport>
              <Bottom
                screenWidth={width}
                exportPNGStory={exportComponentAsPNGStory}
                exportPNGPost={exportComponentAsPNGPost}
                exportPDF={exportComponentAsPDF}
              />
            </Col>
          </Row>
        </Container>
      </Fragment>
    </div>
  );
}

export default App;
