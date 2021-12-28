import { Pie } from "@nivo/pie";
import "../App.css";

const MyPie = ({ data, screenWidth }) => (
  <div className="pie-wrap">
    <Pie
      data={data}
      height={screenWidth > 600 ? 500 : 300}
      width={screenWidth > 600 ? 500 : 300}
      margin={{ top: 0, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={3.5}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      legends={[
        {
          anchor: "bottom",
          direction: screenWidth > 600 ? "row" : "column",
          justify: false,
          translateX: 0,
          translateY: screenWidth > 600 ? 25 : 65,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 16,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  </div>
);

export default MyPie;
