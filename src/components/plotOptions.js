import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import ButtonGroup from "@mui/material/ButtonGroup";
import data from "../data/data.json";
import regiones from "../data/data_regiones.json";
import comunas from "../data/data_comunas.json";
import { CssTextField, CssAutocomplete, CssButton } from "./customElements";

const plotOptions = (props) => {
  const [selected, setSelected] = useState(1);

  const handleChangeType = (b) => {
    props.setDataType(e.target.value);
  };

  return (
    <div>
      <FormControl style={{ width: "50vh" }}>
        <CssAutocomplete
          disableClearable
          id="Información"
          defaultValue={"TotalCases"}
          options={Object.keys(data)}
          onChange={(e, value) => {
            props.setDataType(value);
          }}
          getOptionLabel={(option) => data[option]}
          renderInput={(params) => (
            <CssTextField {...params} label="Información" placeholder="" />
          )}
        />
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
        <FormControl style={{ width: "55vh" }}>
          <CssAutocomplete
            multiple
            id="tags-outlined"
            options={Object.keys(regiones)}
            getOptionLabel={(option) => regiones[option]["name"]}
            value={props.currentRegion}
            onChange={(e, value) => {
              props.setCurrentRegion(value);
            }}
            filterSelectedOptions
            renderInput={(params) => (
              <CssTextField {...params} label="Regiones" placeholder="" />
            )}
          />
        </FormControl>
      ) : selected === 3 ? (
        <FormControl style={{ width: "55vh" }}>
          <CssAutocomplete
            multiple
            id="tags-outlined"
            options={Object.keys(comunas)}
            getOptionLabel={(option) => comunas[option]}
            value={props.currentComuna}
            onChange={(e, value) => {
              props.setCurrentComuna(value);
            }}
            filterSelectedOptions
            renderInput={(params) => (
              <CssTextField {...params} label="Comunas" placeholder="" />
            )}
          />
        </FormControl>
      ) : (
        <div />
      )}
    </div>
  );
};

export default plotOptions;
