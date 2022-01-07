import dataDefault from "../data/data_default.json";
import { parseDate } from "./general";
// Nacional
import dataTotalCasesNacional from "../data/casos_totales_nacional.json";
import dataDailyTotalCasesNacional from "../data/casos_diarios_nacional.json";
import dataDeceasedNacional from "../data/fallecidos_acumulados_nacional.json";
import dataIncidenceRateNacional from "../data/tasa_incidencia_nacional.json";
import dataUCINacional from "../data/pacientes_UCI_nacional.json";
// Regiones
import dataTotalCasesRegiones from "../data/casos_totales_region.json";
import dataDailyTotalCasesRegiones from "../data/casos_diarios_region.json";
import dataDeceasedRegiones from "../data/fallecidos_acumulados_region.json";
import dataIncidenceRateRegiones from "../data/tasa_incidencia_region.json";
import dataUCIRegiones from "../data/pacientes_UCI_region.json";
// Comunas
import dataTotalCasesComunas from "../data/casos_totales_comuna.json";
import dataDailyTotalCasesComunas from "../data/casos_diarios_comuna.json";
import dataDeceasedComunas from "../data/fallecidos_acumulados_comuna.json";
import dataIncidenceRateComunas from "../data/tasa_incidencia_comuna.json";

export const generateLinePlotData = (props) => {
  var dataSource = {};
  var current = [];
  if (props.dataGranularity == "TOTAL") {
    current = ["TOTAL"];
    if (props.dataType == "TotalCases") {
      dataSource = dataTotalCasesNacional;
    } else if (props.dataType == "DailyTotalCases") {
      dataSource = dataDailyTotalCasesNacional;
    } else if (props.dataType == "UCI") {
      dataSource = dataUCINacional;
    } else if (props.dataType == "DECEASED") {
      dataSource = dataDeceasedNacional;
    } else if (props.dataType == "IncidenceRate") {
      dataSource = dataIncidenceRateNacional;
    }
  } else if (props.dataGranularity == "REGIONES") {
    current = props.currentRegion;
    if (props.dataType == "TotalCases") {
      dataSource = dataTotalCasesRegiones;
    } else if (props.dataType == "DailyTotalCases") {
      dataSource = dataDailyTotalCasesRegiones;
    } else if (props.dataType == "UCI") {
      dataSource = dataUCIRegiones;
    } else if (props.dataType == "DECEASED") {
      dataSource = dataDeceasedRegiones;
    } else if (props.dataType == "IncidenceRate") {
      dataSource = dataIncidenceRateRegiones;
    }
  } else if (props.dataGranularity == "COMUNAS") {
    current = props.currentComuna;
    if (props.dataType == "TotalCases") {
      dataSource = dataTotalCasesComunas;
    } else if (props.dataType == "DailyTotalCases") {
      dataSource = dataDailyTotalCasesComunas;
    } else if (props.dataType == "DECEASED") {
      dataSource = dataDeceasedComunas;
    } else if (props.dataType == "IncidenceRate") {
      dataSource = dataIncidenceRateComunas;
    }
  }
  const plotData = [];
  if (current.length === 0) {
    dataSource = dataDefault;
    current = [" "];
  }
  current.map((d) => {
    var data = dataSource[d]["data"];
    var info = {
      id: dataSource[d]["name"],
      color: "hsl(104, 70%, 50%)",
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
