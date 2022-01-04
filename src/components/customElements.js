import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { withStyles } from "@material-ui/core/styles";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";

export const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#8c2981",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#7E7E7E",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#8c2981",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#8c2981",
    },
    borderRadius: 30,
  },
});

export const CssAutocomplete = withStyles({
  tag: {
    backgroundColor: "#b73779",
    position: "relative",
    zIndex: 0,
    "& .MuiChip-label": {
      color: "white",
      fontFamily: "Saira",
    },
    "& .MuiChip-deleteIcon": {
      color: "white",
    },
  },
  input: {
    fontFamily: "Saira",
    fontSize: 13,
  },
  listbox: {
    fontFamily: "Saira",
    fontSize: 13,
  },
  root: {
    "& label": {
      fontSize: 17,
      fontFamily: "Saira",
    },
  },
})(Autocomplete);

export const CssButton = styled(Button)({
  borderRadius: 30,
  border: 0,
  backgroundColor: "#ccc",
  fontSize: 13,
  fontFamily: "Saira",
  color: "#555",
  textTransform: "capitalize",
  "&:focus": {
    color: "#555",
    backgroundColor: "#eee",
    border: 0,
  },
  "&:hover": {
    color: "#555",
    backgroundColor: "#eee",
    border: 0,
  },
});

export const CssSelect = styled(Select)({
  fontFamily: "Saira",
  borderRadius: 30,
  "&:hover": {
    "&& fieldset": {
      borderColor: "#8c2981",
    },
  },
});
