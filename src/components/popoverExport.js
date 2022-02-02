import Popover from "@mui/material/Popover";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ImageIcon from "@mui/icons-material/Image";
import PdfIcon from "@mui/icons-material/PictureAsPdf";
import PrintIcon from "@mui/icons-material/Print";
import "../App.css";
import Exportable from "./exportable";

const PopoverExport = (props) => (
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
      <h3>Exportar visualización</h3>
      <Exportable
        data={props.data}
        referencePNG={props.referencePNG}
        referencePDF={props.referencePDF}
        dataType={props.dataType}
        screenWidth={props.screenWidth}
      />
      <Button
        variant="text"
        onClick={props.exportPNGPost}
        style={{ color: "gray", fontFamily: "Saira" }}
      >
        <ImageIcon size={17} /> Exportar PNG (1:1)
      </Button>
      <br />
      <Button
        variant="text"
        onClick={props.exportPNGStory}
        style={{ color: "gray", fontFamily: "Saira" }}
      >
        <ImageIcon size={17} /> Exportar PNG (9:16)
      </Button>
      <br />
      <Button
        variant="text"
        onClick={props.exportPDF}
        style={{ color: "gray", fontFamily: "Saira" }}
      >
        <PdfIcon size={17} /> Exportar PDF
      </Button>
      <br />
      <Button
        variant="text"
        onClick={props.handlePrint}
        style={{ color: "gray", fontFamily: "Saira" }}
      >
        <PrintIcon size={17} /> Imprimir
      </Button>
    </div>
  </Popover>
);

export default PopoverExport;
