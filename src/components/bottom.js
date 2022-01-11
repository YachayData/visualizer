import React, { useState } from "react";
import time from "../data/ultima_actualizacion.json";
import "../App.css";
import IconButton from "@mui/material/IconButton";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import Popover from "./popover";

const Bottom = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [copyStatus, setCopyStatus] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const copyCode = () => {
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <p
        className="sub-text"
        style={{ fontSize: props.screenWidth > 600 ? 12 : 7 }}
      >
        Última actualización: {time.day}-{time.month}-{time.year} {time.hour}:
        {time.minute} <br />
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
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
        >
          <ShareRoundedIcon />
        </IconButton>
      </div>
      <Popover
        id={id}
        open={open}
        copyCode={copyCode}
        handleClose={handleClose}
        copyStatus={copyStatus}
      />
    </div>
  );
};

export default Bottom;
