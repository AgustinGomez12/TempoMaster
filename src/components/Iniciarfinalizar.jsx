import React from "react";

const Iniciarfinalizar = ({activarTempo,desactivarTempo}) => {
  //Componente que le permite al temporizador inciar con dos botenes
  return (
    <div className="botones-inicoFinalizar">
      <button onClick={activarTempo}>Inciar</button>
      <button onClick={desactivarTempo}>Finalizar</button>
    </div>
  );
};

export default Iniciarfinalizar;
