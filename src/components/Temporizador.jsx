import React, { useEffect, useRef, useState } from "react";
import Sonidos from "./Sonidos";
import Iniciarfinalizar from "./Iniciarfinalizar";
import Opciones from "./Opciones";

const Temporizador = () => {
  // Estado del tiempo en segundos
  const [timeLeft, setTimeLeft] = useState(0);
  // Estado para controlar el temporizador ("Activado", "Pausado" o "Desactivado")
  const [activado, setAtivado] = useState("Desactivado");
  const intervaloRef = useRef(null);

  // Función auxiliar para convertir el total de segundos a horas, minutos y segundos
  const getTimeParts = (total) => {
    const horas = Math.floor(total / 3600);
    const minutos = Math.floor((total % 3600) / 60);
    const segundos = total % 60;
    return { horas, minutos, segundos };
  };

  // Efecto para manejar el intervalo según el estado de "activado"
  useEffect(() => {
    if (activado === "Activado") {
      intervaloRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(intervaloRef.current);
            intervaloRef.current = null;
            setAtivado("Desactivado");
            return 0;
          }
        });
      }, 1000);
    } else {
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
    }
    // Limpieza al desmontar el componente
    return () => clearInterval(intervaloRef.current);
  }, [activado]);

  // Funciones para incrementar y decrementar el tiempo
  const añadirHoras = () => {
    setTimeLeft((prev) => {
      const { horas, minutos, segundos } = getTimeParts(prev);
      const nuevoHoras = horas + 1;
      return nuevoHoras * 3600 + minutos * 60 + segundos;
    });
  };

  const quitarHoras = () => {
    setTimeLeft((prev) => {
      const { horas, minutos, segundos } = getTimeParts(prev);
      const nuevoHoras = horas > 0 ? horas - 1 : 0;
      return nuevoHoras * 3600 + minutos * 60 + segundos;
    });
  };

  const añadirMinutos = () => {
    setTimeLeft((prev) => {
      const { horas, minutos, segundos } = getTimeParts(prev);
      let nuevoMinutos = minutos + 1;
      let nuevoHoras = horas;
      if (nuevoMinutos === 60) {
        nuevoMinutos = 0;
        nuevoHoras += 1;
      }
      if (nuevoHoras >= 60) {
        nuevoHoras = 0;
        nuevoMinutos = 0;
      }
      return nuevoHoras * 3600 + nuevoMinutos * 60 + segundos;
    });
  };

  const quitarMinutos = () => {
    setTimeLeft((prev) => {
      const { horas, minutos, segundos } = getTimeParts(prev);
      let nuevoMinutos = minutos > 0 ? minutos - 1 : 0;
      return horas * 3600 + nuevoMinutos * 60 + segundos;
    });
  };

  const añadirSegundos = () => {
    setTimeLeft((prev) => {
      const { horas, minutos, segundos } = getTimeParts(prev);
      let nuevoSegundos = segundos + 1;
      let nuevoMinutos = minutos;
      let nuevoHoras = horas;
      if (nuevoSegundos === 60) {
        nuevoSegundos = 0;
        nuevoMinutos += 1;
      }
      if (nuevoMinutos === 60) {
        nuevoMinutos = 0;
        nuevoHoras += 1;
      }
      return nuevoHoras * 3600 + nuevoMinutos * 60 + nuevoSegundos;
    });
  };

  const quitarSegundos = () => {
    setTimeLeft((prev) => {
      const { horas, minutos, segundos } = getTimeParts(prev);
      let nuevoSegundos = segundos > 0 ? segundos - 1 : 0;
      return horas * 3600 + minutos * 60 + nuevoSegundos;
    });
  };

  // Función toggle para iniciar o pausar el temporizador, usando el mismo botón
  const toggleTempo = () => {
    if (activado === "Activado") {
      // Si está en ejecución, se pausa
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
      setAtivado("Pausado");
    } else {
      // Si está pausado o desactivado y hay tiempo, se inicia o reanuda
      if (timeLeft > 0) {
        setAtivado("Activado");
      }
    }
  };

  // Función para finalizar: detiene y reinicia el temporizador a cero
  const finalizarTempo = () => {
    clearInterval(intervaloRef.current);
    intervaloRef.current = null;
    setTimeLeft(0);
    setAtivado("Desactivado");
  };

  // Derivar las partes del tiempo a mostrar (horas, minutos, segundos)
  const { horas, minutos, segundos } = getTimeParts(timeLeft);

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
              <button aria-label="Añadir una hora" onClick={añadirHoras}>
                +
              </button>
              <button aria-label="Quitar una hora" onClick={quitarHoras}>
                -
              </button>
            </div>
          </div>
          <div>
            <input type="number" disabled value={minutos} />
            <h3>Minutos</h3>
            <div className="bontainer-but">
              <button
                aria-label="Añadir un minuto"
                onClick={añadirMinutos}
              >
                +
              </button>
              <button
                aria-label="Quitar un minuto"
                onClick={quitarMinutos}
              >
                -
              </button>
            </div>
          </div>
          <div>
            <input type="number" disabled value={segundos} />
            <h3>Segundos</h3>
            <div className="bontainer-but">
              <button
                aria-label="Añadir un segundo"
                onClick={añadirSegundos}
              >
                +
              </button>
              <button
                aria-label="Quitar un segundo"
                onClick={quitarSegundos}
              >
                -
              </button>
            </div>
          </div>
        </div>
      </div> 
      <Iniciarfinalizar
        activado={activado}
        activarTempo={toggleTempo}
        desactivarTempo={finalizarTempo}
      />
      <Opciones setTimeLeft={setTimeLeft} />
    </div>
  );
};

export default Temporizador;
