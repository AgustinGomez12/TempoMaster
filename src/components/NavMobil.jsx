import React, { useEffect, useState } from "react";

const NavMobil = ({navBarTamño}) => {

      

  return (
    <nav  className="navBarMobil">
      <ul style={{height:navBarTamño}}>
        <li>
          <a>Temporizador</a>
        </li>
        <li>
          <a>Cronometro</a>
        </li>
        <li>
          <a>Hora</a>
        </li>
        <li>
          <a>Despertador</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavMobil;
