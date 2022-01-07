import React, { useState, useEffect, Fragment } from "react";
import time from "../data/ultima_actualizacion.json";
import "../App.css";
import Popover from "@mui/material/Popover";
import { BsLink45Deg, BsCodeSlash } from "react-icons/bs";
import IconButton from "@mui/material/IconButton";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import CloseIcon from "@mui/icons-material/Close";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Button from "@mui/material/Button";

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
    setTimeout(() => setCopyStatus(false), 3000);
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
        <a className="link" href="https://www.yachaydata.cl/">
          Yachay Data
        </a>{" "}
        a partir de los datos del <br />
        Ministerio de Salud disponibilizados por la iniciativa
        <br />
        <a className="link" href="https://github.com/MinCiencia/Datos-COVID19">
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
        anchorEl={anchorEl}
        onClose={handleClose}
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
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <h3>¡Comparte la visualización!</h3>
          <p className="options-share">
            <BsLink45Deg size={17} /> Copiar URL
          </p>
          <CopyToClipboard
            text={"https://cpstuardo.github.io/visualizer/"}
            onCopy={copyCode}
          >
            <p className="option">https://cpstuardo.github.io/visualizer/</p>
          </CopyToClipboard>
          <p className="options-share">
            <BsCodeSlash size={17} /> Agregar a tu página web
          </p>
          <CopyToClipboard
            text={
              '<iframe width="640" height="360" src="https://cpstuardo.github.io/visualizer/" frameborder="0" allowfullscreen ></iframe>'
            }
            onCopy={copyCode}
          >
            <p className="option">
              <code className="option">
                &lt;iframe width=&quot;640&quot; height=&quot;360&quot;
                src=&quot;https://cpstuardo.github.io/visualizer/&quot;
                frameborder=&quot;0&quot; allowfullscreen &gt;&lt;/iframe&gt;
              </code>
            </p>
          </CopyToClipboard>
        </div>
      </Popover>
    </div>
  );
};

export default Bottom;
