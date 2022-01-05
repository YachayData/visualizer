import time from "../data/ultima_actualizacion.json";
import "../App.css";

const Bottom = (props) => (
  <p
    className="sub-text"
    style={{ fontSize: props.screenWidth > 600 ? 14 : 11 }}
  >
    Última actualización {time.day}-{time.month}-{time.year} {time.hour}:
    {time.minute} <br />
    Creado por{" "}
    <a className="link" href="https://www.yachaydata.cl/">
      Yachay Data
    </a>
  </p>
);

export default Bottom;
