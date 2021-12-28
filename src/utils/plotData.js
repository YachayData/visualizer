import dataUCI from "../data/pacientes_UCI.json";
import { parseDate } from "./general";

export const generateLinePlotData = ({ dataType, currentRegion }) => {
  console.log(dataType);
  const dataSource = dataUCI;
  const data = dataSource["TOTAL"]["data"];
  console.log(data);
  return [
    {
      id: dataSource["TOTAL"]["name"],
      color: "hsl(105, 70%, 50%)",
      data: Object.keys(data).map((d) => {
        return {
          x: parseDate(d),
          y: data[d],
        };
      }),
    },
  ];
};
