import React, { useEffect, useRef, useState, useCallback } from "react";
import Sonidos from "./Sonidos";
import Iniciarfinalizar from "./Iniciarfinalizar";
import Opciones from "./Opciones";
import alarmaSound from "../assets/sounds/chernobyl.mp3";
import campanaSound from "../assets/sounds/campana.mp3";
import melodiaSound from "../assets/sounds/ice-208715.mp3";

// Función auxiliar para convertir segundos en horas, minutos y segundos.
const getTimeParts = (total) => {
  const horas = Math.floor(total / 3600);
  const minutos = Math.floor((total % 3600) / 60);
  const segundos = total % 60;
  return { horas, minutos, segundos };
};

// Hook personalizado para gestionar la reproducción de audio
const useAudio = (url) => {
  const audioRef = useRef(null);

  const play = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(url);
    }
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) =>
        console.error("Error al reproducir el audio:", error)
      );
    }
  }, [url]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  const setLoop = useCallback((shouldLoop) => {
    if (audioRef.current) {
      audioRef.current.loop = shouldLoop;
    }
  }, []);

  return { play, stop, setLoop, audioRef };
};

const Temporizador = () => {
  // Estado del tiempo en segundos
  const [timeLeft, setTimeLeft] = useState(0);
  // Estado para controlar el temporizador: "Activado", "Pausado" o "Desactivado"
  const [activado, setActivado] = useState("Desactivado");
  const intervaloRef = useRef(null);
  // Estado para controlar el display de los botones de ajuste
  const [cambioDeDisplay, setCambioDeDisplay] = useState("flex");
  // Estado para almacenar el checkbox seleccionado (para elegir el sonido u opción)
  const [chekedd, setCheked] = useState(null);
  // Estado para el botón que permite frenar el sonido
  const [frenar, setFrenar] = useState("none");

  // Hooks para manejar los distintos sonidos
  const { play: playAlarma, stop: stopAlarma, setLoop: setLoopAlarma } = useAudio(alarmaSound);
  const { play: playCampana, stop: stopCampana, setLoop: setLoopCampana } = useAudio(campanaSound);
  const { play: playMelodia, stop: stopMelodia, setLoop: setLoopMelodia } = useAudio(melodiaSound);

  // Efecto para manejar el intervalo del temporizador según su estado
  useEffect(() => {
    if (activado === "Activado") {
      intervaloRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 0) return prev - 1;
          // Al llegar a 0, se limpia el intervalo y se cambia el estado
          clearInterval(intervaloRef.current);
          intervaloRef.current = null;
          setActivado("Desactivado");
          return 0;
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
      return (horas + 1) * 3600 + minutos * 60 + segundos;
    });
  };

  const quitarHoras = () => {
    setTimeLeft((prev) => {
      const { horas, minutos, segundos } = getTimeParts(prev);
      return (horas > 0 ? horas - 1 : 0) * 3600 + minutos * 60 + segundos;
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

  // Función para iniciar o pausar el temporizador
  const toggleTempo = () => {
    if (activado === "Activado") {
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
      setActivado("Pausado");
    } else if (timeLeft > 0) {
      setActivado("Activado");
    }
  };

  // Función para finalizar y reiniciar el temporizador a cero
  const finalizarTempo = () => {
    clearInterval(intervaloRef.current);
    intervaloRef.current = null;
    setTimeLeft(0);
    setActivado("Desactivado");
  };

  // Obtenemos las partes del tiempo a mostrar
  const { horas, minutos, segundos } = getTimeParts(timeLeft);

  // Control de la visibilidad de los botones de ajuste según el estado del temporizador
  useEffect(() => {
    setCambioDeDisplay(activado === "Activado" ? "none" : "flex");
  }, [activado]);

  // Manejo de la selección de las opciones (checkbox)
  const handleCheked = (option) => {
    setCheked((prev) => (prev === option ? null : option));
  };

  // Efecto para reproducir el sonido cuando se cumplan las condiciones:
  // - tiempo = 0
  // - el temporizador no esté activado
  // - se haya seleccionado una opción
  useEffect(() => {
    if (timeLeft === 0 && activado !== "Activado") {
      if (chekedd === "option1") {
        setLoopAlarma(true);
        playAlarma();
        setFrenar("flex");
      } else if (chekedd === "option2") {
        setLoopCampana(true);
        playCampana();
        setFrenar("flex");
      } else if (chekedd === "option3") {
        setLoopMelodia(true);
        playMelodia();
        setFrenar("flex");
      }
    }
  }, [
    timeLeft,
    chekedd,
    activado,
    playAlarma,
    playCampana,
    playMelodia,
    setLoopAlarma,
    setLoopCampana,
    setLoopMelodia,
  ]);

  // Función para desactivar el sonido que esté en reproducción
  const desactivarSonido = () => {
    setLoopAlarma(false);
    stopAlarma();
    setLoopCampana(false);
    stopCampana();
    setLoopMelodia(false);
    stopMelodia();
    setFrenar("none");
  };

  return (
    <div className="Temporizador">
      <h2>Temporizador</h2>
      <Sonidos chekedd={chekedd} handleCheked={handleCheked} />
      <div className="container-temporizador">
        <div className="container-imputsNunbers">
          <div>
            <input type="number" disabled value={horas} />
            <h3>Horas</h3>
            <div style={{ display: cambioDeDisplay }} className="bontainer-but">
              <button aria-label="Añadir una hora" onClick={añadirHoras}>
                +
              </button>
              <button aria-label="Quitar una hora" onClick={quitarHoras} disabled={horas === 0}>
                -
              </button>
            </div>
          </div>
          <div>
            <input type="number" disabled value={minutos} />
            <h3>Minutos</h3>
            <div style={{ display: cambioDeDisplay }} className="bontainer-but">
              <button aria-label="Añadir un minuto" onClick={añadirMinutos}>
                +
              </button>
              <button aria-label="Quitar un minuto" onClick={quitarMinutos} disabled={minutos === 0}>
                -
              </button>
            </div>
          </div>
          <div>
            <input type="number" disabled value={segundos} />
            <h3>Segundos</h3>
            <div style={{ display: cambioDeDisplay }} className="bontainer-but">
              <button aria-label="Añadir un segundo" onClick={añadirSegundos}>
                +
              </button>
              <button
                aria-label="Quitar un segundo"
                onClick={quitarSegundos}
                disabled={segundos === 0}
              >
                -
              </button>
            </div>
          </div>
        </div>
      </div>
      <Iniciarfinalizar
        frenar={frenar}
        desactivarSonido={desactivarSonido}
        activado={activado}
        activarTempo={toggleTempo}
        desactivarTempo={finalizarTempo}
      />
      <Opciones setTimeLeft={setTimeLeft} />
    </div>
  );
};

export default Temporizador;
