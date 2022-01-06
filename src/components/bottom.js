import React, { useState, useEffect, Fragment } from "react";
import time from "../data/ultima_actualizacion.json";
import "../App.css";
import Popover from "@mui/material/Popover";
import { BsLink45Deg, BsCodeSlash } from "react-icons/bs";
import IconButton from "@mui/material/IconButton";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import CloseIcon from "@mui/icons-material/Close";

const Bottom = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <p
        className="sub-text"
        style={{ fontSize: props.screenWidth > 600 ? 14 : 7 }}
      >
        Última actualización: {time.day}-{time.month}-{time.year} {time.hour}:
        {time.minute} <br />
        Creado por{" "}
        <a className="link" href="https://www.yachaydata.cl/">
          Yachay Data
        </a>{" "}
        a partir de los datos del Ministerio de Salud <br /> disponibilizados
        por la iniciativa{" "}
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
          <p className="option">https://cpstuardo.github.io/visualizer/</p>
          <p className="options-share">
            <BsCodeSlash size={17} /> Agregar a tu página web
          </p>
          <p className="option">
            <code className="option">
              &lt;iframe width=&quot;640&quot; height=&quot;360&quot;
              src=&quot;https://cpstuardo.github.io/visualizer/&quot;
              frameborder=&quot;0&quot; allowfullscreen &gt;&lt;/iframe&gt;
            </code>
          </p>
        </div>
      </Popover>
    </div>
  );
};

export default Bottom;
