import regiones from "../geodata/regiones.json";
import comunas from "../geodata/comunas.json";
import provincias from "../geodata/provincias.json";

import { ResponsiveChoropleth } from "@nivo/geo";

const MyResponsiveChoropleth = ({ data }) => (
  <ResponsiveChoropleth
    height={600}
    data={data}
    features={regiones.features}
    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    colors="nivo"
    domain={[0, 10000]}
    unknownColor="#666666"
    label="properties.NOM_REG"
    valueFormat=".2s"
    projectionTranslation={[1, -0.3]}
    projectionScale={650}
    projectionRotation={[0, 0, 0]}
    graticuleLineColor="#dddddd"
    borderWidth={0.5}
    borderColor="#152538"
    legends={[
      {
        anchor: "bottom-right",
        direction: "column",
        justify: true,
        translateX: -450,
        translateY: -200,
        itemsSpacing: 0,
        itemWidth: 94,
        itemHeight: 18,
        itemDirection: "left-to-right",
        itemTextColor: "#444444",
        itemOpacity: 0.85,
        symbolSize: 18,
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000000",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

export default MyResponsiveChoropleth;
