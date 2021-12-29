import { Line } from "@nivo/line";

const MyLine = ({ data, screenWidth }) => (
  <Line
    data={data}
    height={screenWidth > 600 ? 300 : 250}
    width={screenWidth > 600 ? 600 : 450}
    margin={{ top: 30, right: 85, bottom: 65, left: 95 }}
    xScale={{
      type: "time",
      format: "%Y-%m-%d",
      precision: "day",
      useUTC: false,
    }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
    }}
    yFormat=",d"
    xFormat={"time:%Y-%m-%d"}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: "bottom",
      format: "%b %Y",
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
    }}
    enableGridX={false}
    pointSize={5}
    enablePoints={false}
    pointColor={{ theme: "background" }}
    pointBorderWidth={1}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={0}
    useMesh={true}
    curve={"monotoneX"}
    legends={[
      {
        anchor: "top-left",
        direction: "column",
        justify: false,
        translateX: 0,
        translateY: 0,
        itemsSpacing: -2,
        itemDirection: "left-to-right",
        itemWidth: 70,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

export default MyLine;
