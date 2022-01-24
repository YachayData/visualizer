import LinePlot from "./linePlot";
import dataTypes from "../data/data.json";
import "../App.css";
import { PDFExport } from "@progress/kendo-react-pdf";

const Exportable = (props) => (
  <PDFExport
    ref={props.referencePDF}
    paperSize="auto"
    margin={30}
    fileName={"visualizador_covid"}
    author="Yachay"
  >
    <div className="export" ref={props.referencePNG}>
      <h4>{dataTypes[props.dataType]}</h4>
      <LinePlot
        data={props.data}
        screenWidth={props.screenWidth}
        isInteractive={false}
        fontFamily={"Montserrat"}
        prev={true}
      />
    </div>
  </PDFExport>
);

export default Exportable;
