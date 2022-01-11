import Popover from "@mui/material/Popover";
import { BsLink45Deg, BsCodeSlash } from "react-icons/bs";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "../App.css";

const PopoverShare = (props) => (
  <Popover
    id={props.id}
    open={props.open}
    anchorEl={props.anchorEl}
    onClose={props.handleClose}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
  >
    <div className="pop-up">
      <div className="close-button">
        <IconButton
          aria-label="close"
          variant="contained"
          onClick={props.handleClose}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <h3>¡Comparte la visualización!</h3>
      {props.copyStatus ? <p className="copied">Copiado</p> : <div />}
      <CopyToClipboard
        text={"https://www.yachaydata.cl/visualizer/"}
        onCopy={props.copyCode}
      >
        <Button variant="text" style={{ color: "gray", fontFamily: "Saira" }}>
          <BsLink45Deg size={17} /> Copiar URL
        </Button>
      </CopyToClipboard>
      <br />
      <CopyToClipboard
        text={
          '<iframe width="640" height="360" src="https://yachaydata.github.io/visualizer/" frameborder="0" allowfullscreen ></iframe>'
        }
        onCopy={props.copyCode}
      >
        <Button variant="text" style={{ color: "gray", fontFamily: "Saira" }}>
          <BsCodeSlash size={17} /> Insertar en tu sitio web
        </Button>
      </CopyToClipboard>
      <br />
      <br />
    </div>
  </Popover>
);

export default PopoverShare;
