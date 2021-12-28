import {
  exportComponentAsJPEG,
  exportComponentAsPNG,
} from "react-component-export-image";
import React, { useRef } from "react";
import Pie from "./pie";
import dataPie from "../data/dataPie";
import "../App.css";

const ComponentToPrint = React.forwardRef((props, ref) => (
  <div className="ExportImage" ref={ref}>
    <Pie data={dataPie} />
  </div>
));

const MyComponent = () => {
  const componentRef = useRef();

  return (
    <React.Fragment>
      <ComponentToPrint ref={componentRef} />
      <br />
      <button onClick={() => exportComponentAsJPEG(componentRef)}>
        Export As JPEG
      </button>
      <button onClick={() => exportComponentAsPNG(componentRef)}>
        Export As PNG
      </button>
    </React.Fragment>
  );
};

export default MyComponent;
