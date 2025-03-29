import React from "react";

const Iniciarfinalizar = ({activarTempo,desactivarTempo,activado}) => {
  //Componente que le permite al temporizador inciar con dos botenes

  return (
    <div className="botones-inicoFinalizar">
      <button onClick={activarTempo}>{activado === "Activado" ? "Pausar" : "Inciar"}</button>
      <button onClick={desactivarTempo}>Finalizar</button>
    </div>
  );
};

export default Iniciarfinalizar;
