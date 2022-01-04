import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ButtonGroup from "@mui/material/ButtonGroup";
import data from "../data/data.json";
import regiones from "../data/data_regiones.json";
import comunas from "../data/data_comunas.json";
import {
  CssTextField,
  CssAutocomplete,
  CssButton,
  CssSelect,
} from "./customElements";

const plotOptions = (props) => {
  const [selected, setSelected] = useState(1);

  const handleChangeType = (e) => {
    props.setDataType(e.target.value);
  };

  return (
    <div>
      <FormControl size="medium">
        <InputLabel id="data type">Información</InputLabel>
        <CssSelect
          labelId="data type"
          id="data type"
          value={props.dataType}
          label="Información"
          onChange={handleChangeType}
          style={{ height: 35, width: "45vh" }}
        >
          {Object.keys(data).map((d) => {
            if (props.dataGranularity === "COMUNAS") {
              if (d === "UCI") {
                return <div />;
              } else {
                return (
                  <MenuItem value={d} key={d}>
                    {data[d]}
                  </MenuItem>
                );
              }
            } else {
              return (
                <MenuItem value={d} key={d}>
                  {data[d]}
                </MenuItem>
              );
            }
          })}
        </CssSelect>
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
        <FormControl style={{ width: "60vh" }}>
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
        <FormControl style={{ width: "60vh" }}>
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
