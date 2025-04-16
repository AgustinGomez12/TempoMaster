import React from "react";

const Iniciarfinalizar = ({activarTempo,desactivarTempo,activado,frenar,desactivarSonido}) => {
  //Componente que le permite al temporizador inciar con dos botenes
  



  return (
    <div className="botones-inicoFinalizar">  
      <button style={{
        background:activado === "Activado" ? "red" : ""
      }} onClick={activarTempo}>{activado === "Activado" ? "Pausar" : "Inciar"}</button>
      <button onClick={desactivarTempo}>Finalizar</button>
      <button onClick={() => desactivarSonido()} className="botonStopSong" style={{display:frenar}}>Stop</button>
    </div>
  );
};

export default Iniciarfinalizar;
