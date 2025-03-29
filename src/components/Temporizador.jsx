import React, { useState } from "react";
import Sonidos from "./Sonidos";
import Iniciarfinalizar from "./Iniciarfinalizar";
import Opciones from "./Opciones";

const Temporizador = () => {
  //Conponente padre del temporizador (COMPONENTE LOGICO).

  //Estado de horas
  const [horas, setHoras] = useState(0);
  //Estado de horas

  //Estado de minutos
  const [minutos, setMinutos] = useState(0);
  //Estado de minutos

  //Estado de segundos
  const [segundos, setSegundos] = useState(0);
  //Estado de segundos

  //Estado para los botenes de arranque y frenado
  const [activado, setAtivado] = useState("")
  const [Desactivado, setDesactivado] = useState("")
  //Estado para los botenes de arranque y frenado
  
 
  


  //funcion para que el contador no se negativo
  const numerosNegativosN0 = () => {
    if(horas == 0) {
    setHoras(0)   
   }

   if(minutos == 0) {
    setMinutos(0)
   }

   if(segundos == 0){
    setSegundos(0) 
   }
  };
  //funcion para que el contador no se negativo

  //Funcion para añadir horas
  const añadirHoras = () => {
    setHoras((contador) => contador + 1);
    if(horas >= 60) {
      setHoras(0) 
    }
  };
  //Funcion para añadir horas

  //Funcion para quitar horas
  const quitarHoras = () => {
    setHoras((contador) => contador - 1);
    numerosNegativosN0()
  };
  //Funcion para quitar horas

  //Funcion para añadir minutos
  const añadirMinutos = () => {
    setMinutos((contador) => contador + 1);
    if(minutos === 60) {
      setMinutos(0)
      setHoras(hora => hora + 1)     
    }
    
    if(horas >= 60) {
      setHoras(0)
      alert("Tiempos exedidos")
    }
    
  };
  //Funcion para añadir minutos

  //Funcion para quitar minutos
  const quitarMinutos = () => {
    setMinutos((contador) => contador - 1);
    numerosNegativosN0()
  };
  //Funcion para quitar minutos

  //Funcion para añadir segundos
   const añadirSegundos = () => {
     setSegundos((contador) => contador + 1)
     if(segundos === 60) {
      setSegundos(0)
      setMinutos(minuto => minuto + 1)
     }
   };
  //Funcion para añadir segundos

  //Funcion para añadir segundos
  const quitarSegundos = () => {
    setSegundos((contador) => contador - 1)
    numerosNegativosN0()
  };
 //Funcion para añadir segundos

 //Funcion para Activar y Desactivar el temporizador
 const activarTempo = () => {
   setAtivado(alert("Activado"))
 }
//Funcion para Activar y Desactivar el temporizador

//Funcion para desactivar el temporizador
const desactivarTempo = () => {
  setDesactivado(alert("Desactivado"))
}
//Funcion para desactivar el temporizador

  return (
    <div className="Temporizador">
      <h2>Temporizador</h2>
      <Sonidos />
      <div className="container-temporizador">
        <div className="container-imputsNunbers">
          <div>
            <input type="number" disabled value={horas} />
            <h3>Horas</h3>
            <div className="bontainer-but">
              <button onClick={añadirHoras}>+</button>
              <button onClick={quitarHoras}>-</button>
            </div>
          </div>
          <div>
            <input type="number" disabled value={minutos} />
            <h3>Minutos</h3>
            <div className="bontainer-but">
              <button onClick={añadirMinutos}>+</button>
              <button onClick={quitarMinutos}>-</button>
            </div>
          </div>
          <div>
            <input type="number" disabled value={segundos} />
            <h3>Segundos</h3>
            <div className="bontainer-but">
              <button onClick={añadirSegundos}>+</button>
              <button onClick={quitarSegundos}>-</button>
            </div>
          </div>
        </div>
      </div>
      <Iniciarfinalizar activarTempo={activarTempo} desactivarTempo={desactivarTempo}/>
      <Opciones setHoras={setHoras} setMinutos={setMinutos} setSegundos={setSegundos} />
    </div>
  );
};

export default Temporizador;
