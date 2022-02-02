import React, { useState } from "react";
import time from "../data/ultima_actualizacion.json";
import "../App.css";
import IconButton from "@mui/material/IconButton";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import GetAppIcon from "@mui/icons-material/GetApp";
import PopoverShare from "./popoverShare";
import PopoverExport from "./popoverExport";

const Bottom = (props) => {
  const [anchorElShare, setAnchorElShare] = useState(null);
  const [anchorElExport, setAnchorElExport] = useState(null);
  const [copyStatus, setCopyStatus] = useState(false);

  // Share
  const handleClickShare = (event) => {
    setAnchorElShare(event.currentTarget);
  };

  const handleCloseShare = () => {
    setAnchorElShare(null);
  };

  const copyCode = () => {
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  const openShare = Boolean(anchorElShare);
  const idShare = open ? "simple-popover" : undefined;

  // Export
  const handleClickExport = (event) => {
    setAnchorElExport(event.currentTarget);
  };

  const handleCloseExport = () => {
    setAnchorElExport(null);
  };

  const openExport = Boolean(anchorElExport);
  const idExport = open ? "simple-popover" : undefined;

  return (
    <div>
      <p
        className="sub-text"
        style={{ fontSize: props.screenWidth > 600 ? 12 : 7 }}
      >
        Última actualización: {time.datetime} <br />
        Creado por{" "}
        <a
          className="link"
          href="https://www.yachaydata.cl/"
          target="_blank"
          rel="noreferrer"
        >
          Yachay Data
        </a>{" "}
        a partir de los datos del <br />
        Ministerio de Salud disponibilizados por la iniciativa
        <br />
        <a
          className="link"
          href="https://github.com/MinCiencia/Datos-COVID19"
          target="_blank"
          rel="noreferrer"
        >
          Datos-COVID19
        </a>{" "}
        del Ministerio de Ciencia.
      </p>
      <div className="share-button">
        <IconButton
          aria-label="share"
          aria-describedby={idShare}
          variant="contained"
          onClick={handleClickShare}
        >
          <ShareRoundedIcon />
        </IconButton>
        <IconButton
          aria-label="export"
          aria-describedby={idExport}
          variant="contained"
          onClick={handleClickExport}
        >
          <GetAppIcon />
        </IconButton>
      </div>
      <br />
      <PopoverShare
        id={idShare}
        open={openShare}
        copyCode={copyCode}
        handleClose={handleCloseShare}
        copyStatus={copyStatus}
        anchorEl={anchorElShare}
      />
      <PopoverExport
        id={idExport}
        open={openExport}
        handleClose={handleCloseExport}
        exportPNGStory={props.exportPNGStory}
        exportPNGPost={props.exportPNGPost}
        exportPDF={props.exportPDF}
        referencePNG={props.referencePNG}
        referencePDF={props.referencePDF}
        data={props.data}
        dataType={props.dataType}
        screenWidth={props.screenWidth}
        anchorEl={anchorElExport}
        handlePrint={props.handlePrint}
      />
    </div>
  );
};

export default Bottom;
