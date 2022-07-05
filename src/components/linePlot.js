import "../App.css";
import { Line } from "@nivo/line";
import { BsFillCircleFill } from "react-icons/bs";

const integerFormat = (e) => {
  const num = e.toLocaleString("pt-BR");
  return num;
};

const MyLine = ({ data, screenWidth, isInteractive, fontFamily, prev }) => {
  const dataLength = data.length;
  return (
    <Line
      data={data}
      height={screenWidth > 600 ? 300 + 20 * dataLength : 250}
      width={screenWidth > 600 ? 550 : 450}
      margin={{
        top: 15 * dataLength + 10,
        right: prev ? 115 : screenWidth > 600 ? 50 : 90,
        bottom: screenWidth > 600 ? 20 : 45,
        left: prev ? 45 : screenWidth > 600 ? 60 : 110,
      }}
      xScale={{
        type: "time",
        format: "%d-%m-%y",
        precision: "day",
        useUTC: false,
      }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
      }}
      colors={{ scheme: "spectral" }}
      yFormat={integerFormat}
      xFormat={"time:%d-%m-%y"}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        format: "%m/%y",
        tickSize: 3,
        tickPadding: 4,
        tickValues: "every 3 months",
        tickRotation: screenWidth > 600 ? 0 : -50,
        legend: "",
        legendOffset: screenWidth > 600 ? 35 : 57,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 3,
        tickPadding: 4,
        tickRotation: 0,
        legend: "",
        legendOffset: 0,
        legendPosition: "middle",
        max: "auto",
        format: integerFormat,
      }}
      enableGridX={false}
      pointSize={5}
      enablePoints={false}
      pointColor={{ theme: "background" }}
      pointBorderWidth={1}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={0}
      useMesh={true}
      theme={{
        fontFamily: fontFamily,
      }}
      curve={"monotoneX"}
      tooltip={(d) => {
        return (
          <div className="tooltip">
            <BsFillCircleFill size={10} color={d.point.borderColor} />{" "}
            <b>{d.point.serieId} </b> <br />({d.point.data.xFormatted}):
            <br />
            {d.point.data.yFormatted}
          </div>
        );
      }}
      legends={[
        {
          anchor: "top",
          direction: "column",
          justify: false,
          translateX: -10,
          translateY: -15 * dataLength - 10,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 90,
          itemHeight: 13,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
        },
      ]}
      isInteractive={isInteractive}
    />
  );
};

export default MyLine;
