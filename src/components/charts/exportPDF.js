import ReactToPdf from "react-to-pdf";
import React, { useRef } from "react";
import Pie from "./pie";
import dataPie from "../data/dataPie";
import "../App.css";

const MyComponent = () => {
  const ref = useRef();
  const options = {
    orientation: "portrait",
    format: "a4",
  };
  return (
    <React.Fragment>
      <div>
        <ReactToPdf
          targetRef={ref}
          filename="generado.pdf"
          x={15}
          options={options}
        >
          {({ toPdf }) => <button onClick={toPdf}>Generar pdf</button>}
        </ReactToPdf>
        <div
          style={{
            width: 500,
            height: 500,
            background: "white",
          }}
          ref={ref}
        >
          <Pie data={dataPie} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyComponent;
