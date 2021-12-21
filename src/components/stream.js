import { ResponsiveStream } from "@nivo/stream";

const MyResponsiveStream = ({ data, keys, axisXLegend, axisYLegend }) => (
  <ResponsiveStream
    data={data}
    keys={keys}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: axisXLegend,
      legendPosition: "middle",
      legendOffset: 36,
    }}
    axisLeft={{
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: axisYLegend,
      legendPosition: "middle",
      legendOffset: -40,
    }}
    enableGridX={true}
    enableGridY={false}
    offsetType="silhouette"
    colors={{ scheme: "nivo" }}
    fillOpacity={0.85}
    borderColor={{ theme: "background" }}
    dotSize={8}
    dotColor={{ from: "color" }}
    dotBorderWidth={2}
    dotBorderColor={{ from: "color", modifiers: [["darker", 0.7]] }}
    legends={[
      {
        anchor: "bottom-right",
        direction: "column",
        translateX: 100,
        itemWidth: 80,
        itemHeight: 20,
        itemTextColor: "#999999",
        symbolSize: 12,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000000",
            },
          },
        ],
      },
    ]}
  />
);

export default MyResponsiveStream;
