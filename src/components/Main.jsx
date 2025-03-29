import React from "react";
import Temporizador from "./Temporizador";


const Main = () => {
  //Componente que almazenara toda la app como un contenedor.


  return (
    <main className="mainApp">
        <Temporizador/>
        <span className="publicidad">

        </span>
    </main>
  );
};

export default Main;
