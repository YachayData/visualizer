import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import data from "../data/data.json";
import regiones from "../data/data_regiones.json";
import comunas from "../data/data_comunas.json";

const plotOptions = (props) => {
  const [selected, setSelected] = useState(1);

  const handleChangeType = (e) => {
    props.setDataType(e.target.value);
  };

  return (
    <div>
      <FormControl size="medium">
        <InputLabel id="data type">Información</InputLabel>
        <Select
          labelId="data type"
          id="data type"
          value={props.dataType}
          label="Información"
          onChange={handleChangeType}
          style={{ height: 35, width: "45vh" }}
        >
          {Object.keys(data).map((d) => {
            if (props.dataGranularity === "COMUNAS") {
              if (d === "UCI" || d === "IncidenceRate") {
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
        </Select>
      </FormControl>
      <br />
      <br />
      <ButtonGroup variant="outlined" aria-label="group" color="primary">
        <Button
          color={selected === 1 ? "secondary" : "primary"}
          onClick={() => {
            setSelected(1);
            props.setDataGranularity("TOTAL");
          }}
        >
          Total
        </Button>
        <Button
          color={selected === 2 ? "secondary" : "primary"}
          onClick={() => {
            setSelected(2);
            props.setDataGranularity("REGIONES");
            props.setCurrentRegion(["AP"]);
          }}
        >
          Regiones
        </Button>
        {props.dataType === "UCI" || props.dataType === "IncidenceRate" ? (
          <div />
        ) : (
          <Button
            color={selected === 3 ? "secondary" : "primary"}
            onClick={() => {
              setSelected(3);
              props.setDataGranularity("COMUNAS");
              props.setCurrentComuna(["Arica"]);
            }}
          >
            Comunas
          </Button>
        )}
      </ButtonGroup>
      <br />
      <br />
      {selected == 2 ? (
        <FormControl style={{ width: "60vh" }}>
          <Autocomplete
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
              <TextField {...params} label="Regiones" placeholder="" />
            )}
          />
        </FormControl>
      ) : selected === 3 ? (
        <FormControl style={{ width: "60vh" }}>
          <Autocomplete
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
              <TextField {...params} label="Comunas" placeholder="" />
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
