import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import data from "../data/data.json";
import regiones from "../data/data_regiones.json";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

const plotOptions = (props) => {
  const [selected, setSelected] = useState(1);

  const handleChangeType = (e) => {
    props.setDataType(e.target.value);
  };

  const handleChangeRegion = (e) => {
    const {
      target: { value },
    } = e;
    props.setCurrentRegion([]);
    props.setCurrentRegion(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeComuna = (e) => {
    const {
      target: { value },
    } = e;
    props.setCurrentComuna([]);
    props.setCurrentComuna(
      typeof value === "string" ? value.split(",") : value
    );
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
        <FormControl size="medium">
          <InputLabel id="region">Regiones</InputLabel>
          <Select
            labelId="region"
            id="region"
            multiple
            value={props.currentRegion}
            onChange={handleChangeRegion}
            input={<OutlinedInput id="region" label="Regiones" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
            style={{ minheight: 40, width: "45vh" }}
          >
            {Object.keys(regiones).map((d) => (
              <MenuItem value={d} key={d}>
                {regiones[d]["name"]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : selected === 3 ? (
        <FormControl size="medium">
          <InputLabel id="comuna">Comunas</InputLabel>
          <Select
            labelId="comuna"
            id="comuna"
            multiple
            value={props.currentComuna}
            onChange={handleChangeComuna}
            input={<OutlinedInput id="comuna" label="Comunas" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
            style={{ minheight: 40, width: "45vh" }}
          >
            {Object.keys(regiones).map((region) =>
              Object.keys(regiones[region]["comunas"]).map((comuna) => (
                <MenuItem value={comuna} key={comuna}>
                  {regiones[region]["comunas"][comuna]}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      ) : (
        <div />
      )}
    </div>
  );
};

export default plotOptions;
