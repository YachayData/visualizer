import LinePlot from "./linePlot";
import dataTypes from "../data/data.json";
import "../App.css";
import { PDFExport } from "@progress/kendo-react-pdf";

const Exportable = (props) => {
  return (
    <PDFExport
      ref={props.referencePDF}
      paperSize="Letter"
      margin={10}
      fileName={"visualizador_covid.pdf"}
      author="Yachay"
      scale={1}
      title=""
      subject=""
      keywords=""
      forcePageBreak=".chapter"
      proxyURL="https://demos.telerik.com/kendo-ui/service/export"
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
};

export default Exportable;
