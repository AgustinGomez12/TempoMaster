import React from "react";

const Opciones = ({ setTimeLeft }) => {
  return (
    <div className="container-opciones">
      <h2>Opciones</h2>
      <div className="opciones">
        <div>
          <h3>Horas</h3>
          {/* Cada clic calcula el tiempo total en segundos para la opción escogida */}
          <p onClick={() => setTimeLeft(4 * 3600)}>4</p>
          <p onClick={() => setTimeLeft(8 * 3600)}>8</p>
          <p onClick={() => setTimeLeft(12 * 3600)}>12</p>
        </div>

        <div>
          <h3>Minutos</h3>
          <p onClick={() => setTimeLeft(10 * 60)}>10</p>
          <p onClick={() => setTimeLeft(15 * 60)}>15</p>
          <p onClick={() => setTimeLeft(30 * 60)}>30</p>
          <p onClick={() => setTimeLeft(45 * 60)}>45</p>
        </div>

        <div>
          <h3>Segundos</h3>
          <p onClick={() => setTimeLeft(10)}>10</p>
          <p onClick={() => setTimeLeft(30)}>30</p>
          <p onClick={() => setTimeLeft(60)}>60</p>
        </div>
      </div>
    </div>
  );
};

export default Opciones;
