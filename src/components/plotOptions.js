import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import ButtonGroup from "@mui/material/ButtonGroup";
import data from "../data/data.json";
import regiones from "../data/data_regiones.json";
import comunas from "../data/data_comunas.json";
import { CssTextField, CssAutocomplete, CssButton } from "./customElements";

const plotOptions = (props) => {
  const [selected, setSelected] = useState(1);

  return (
    <div>
      <FormControl style={{ width: "55vh" }}>
        {props.dataGranularity === "COMUNAS" ? (
          <CssAutocomplete
            disableClearable
            id="Información comunas"
            defaultValue={"TotalCases"}
            size="small"
            options={[
              "TotalCases",
              "DailyTotalCases",
              "DECEASED",
              "IncidenceRate",
            ]}
            onChange={(e, value) => {
              props.setDataType(value);
            }}
            getOptionLabel={(option) => data[option]}
            noOptionsText="No existen opciones"
            renderInput={(params) => (
              <CssTextField {...params} label="Información" placeholder="" />
            )}
          />
        ) : (
          <CssAutocomplete
            disableClearable
            id="Información Regiones y Nacional"
            defaultValue={"TotalCases"}
            size="small"
            options={Object.keys(data)}
            onChange={(e, value) => {
              props.setDataType(value);
            }}
            getOptionLabel={(option) => data[option]}
            noOptionsText="No existen opciones"
            renderInput={(params) => (
              <CssTextField {...params} label="Información" placeholder="" />
            )}
          />
        )}
      </FormControl>
      <br />
      <br />
      <ButtonGroup variant="outlined" aria-label="group" color="primary">
        <CssButton
          style={{ backgroundColor: selected == 1 ? "#eee" : "#ccc" }}
          onClick={() => {
            setSelected(1);
            props.setDataGranularity("TOTAL");
          }}
        >
          Total
        </CssButton>
        <CssButton
          style={{ backgroundColor: selected == 2 ? "#eee" : "#ccc" }}
          onClick={() => {
            setSelected(2);
            props.setDataGranularity("REGIONES");
            props.setCurrentRegion(["AP"]);
          }}
        >
          Regiones
        </CssButton>
        {props.dataType === "UCI" ? (
          <div />
        ) : (
          <CssButton
            style={{ backgroundColor: selected == 3 ? "#eee" : "#ccc" }}
            onClick={() => {
              setSelected(3);
              props.setDataGranularity("COMUNAS");
              props.setCurrentComuna(["Arica"]);
            }}
          >
            Comunas
          </CssButton>
        )}
      </ButtonGroup>
      <br />
      <br />
      {selected == 2 ? (
        <div>
          <FormControl style={{ width: "55vh" }}>
            <CssAutocomplete
              multiple
              id="Regiones"
              size="medium"
              options={Object.keys(regiones)}
              getOptionLabel={(option) => regiones[option]["name"]}
              value={props.currentRegion}
              onChange={(e, value) => {
                props.setCurrentRegion(value);
              }}
              filterSelectedOptions
              noOptionsText="No existen opciones"
              renderInput={(params) => (
                <CssTextField {...params} label="Regiones" placeholder="" />
              )}
            />
          </FormControl>
          <br />
          <br />
        </div>
      ) : selected === 3 ? (
        <div>
          <FormControl style={{ width: "55vh" }}>
            <CssAutocomplete
              multiple
              id="Comunas"
              size="medium"
              options={Object.keys(comunas)}
              getOptionLabel={(option) => comunas[option]}
              value={props.currentComuna}
              onChange={(e, value) => {
                props.setCurrentComuna(value);
              }}
              filterSelectedOptions
              noOptionsText="No existen opciones"
              renderInput={(params) => (
                <CssTextField {...params} label="Comunas" placeholder="" />
              )}
            />
          </FormControl>
          <br />
          <br />
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default plotOptions;
