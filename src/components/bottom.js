import time from "../data/ultima_actualizacion.json";
import "../App.css";

const Bottom = () => (
  <p className="sub-text">
    Última actualización {time.year}-{time.month}-{time.day} {time.hour}:
    {time.minute} <br />
    Creado por{" "}
    <a className="link" href="https://www.yachaydata.cl/">
      Yachay Data
    </a>
  </p>
);

export default Bottom;
