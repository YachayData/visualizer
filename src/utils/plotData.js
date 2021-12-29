import dataUCI from "../data/pacientes_UCI.json";
import dataTotalCases from "../data/casos_totales_acumulados.json";
import dataDeceased from "../data/fallecidos_acumulados.json";
import dataIncidenceRate from "../data/tasa_incidencia.json";
import { parseDate } from "./general";

export const generateLinePlotData = (params) => {
  var dataSource = dataTotalCases;
  if (params.dataType == "UCI") {
    dataSource = dataUCI;
  } else if (params.dataType == "DECEASED") {
    dataSource = dataDeceased;
  } else if (params.dataType == "IncidenceRate") {
    dataSource = dataIncidenceRate;
  }
  const plotData = [];
  console.log(params.currentRegion);
  params.currentRegion.map((region) => {
    var data = dataSource[region]["data"];
    var info = {
      id: dataSource[region]["name"],
      color: "hsl(105, 70%, 50%)",
      data: Object.keys(data).map((d) => {
        return {
          x: parseDate(d),
          y: data[d],
        };
      }),
    };
    plotData.push(info);
  });
  return plotData;
};
