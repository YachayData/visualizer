import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import data from "../data/data.json";
import regiones from "../data/dataRegiones.json";

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
          {Object.keys(data).map((d) => (
            <MenuItem value={d} key={d}>
              {data[d]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <br />
      <FormControl size="medium">
        <InputLabel id="region">Región</InputLabel>
        <Select
          labelId="region"
          id="region"
          multiple
          value={props.currentRegion}
          onChange={handleChangeRegion}
          input={<OutlinedInput id="region" label="Región" />}
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
              {regiones[d]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default plotOptions;
