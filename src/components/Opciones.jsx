import React from "react";

const Opciones = ({ setHoras, setMinutos, setSegundos }) => {
  return (
    <div className="container-opciones">
      <h2>Opciones</h2>
      <div className="opciones">
        <div>
          <h3>Horas</h3>
          <p onClick={() => setHoras(4) & setMinutos(0) & setSegundos(0)}>4</p>
          <p onClick={() => setHoras(8) & setMinutos(0) & setSegundos(0)}>8</p>
          <p onClick={() => setHoras(12) & setMinutos(0) & setSegundos(0)}>
            12
          </p>
        </div>

        <div>
          <h3>Minutos</h3>
          <p onClick={() => setMinutos(10) & setHoras(0) & setSegundos(0)}>
            10
          </p>
          <p onClick={() => setMinutos(15) & setHoras(0) & setSegundos(0)}>
            15
          </p>
          <p onClick={() => setMinutos(30) & setHoras(0) & setSegundos(0)}>
            30
          </p>
          <p onClick={() => setMinutos(45) & setHoras(0) & setSegundos(0)}>
            45
          </p>
        </div>

        <div>
          <h3>Segundos</h3>
          <p onClick={() => setSegundos(10) & setHoras(0) & setMinutos(0)}>
            10
          </p>
          <p onClick={() => setSegundos(30) & setHoras(0) & setMinutos(0)}>
            30
          </p>
          <p onClick={() => setSegundos(60) & setHoras(0) & setMinutos(0)}>
            60
          </p>
        </div>
      </div>
    </div>
  );
};

export default Opciones;
