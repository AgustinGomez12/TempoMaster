import React, { useState } from "react";
import logo from "../assets/logo-tipo.png";
import Menumovil from "./Menumovil";
import NavMobil from "./NavMobil";
const Header = () => {
  //Componete padre del menu de incio permite hacer el movimiento dentro de la web.

  //Agarrar boton
  const [botonNavbar,setBotonNavar] = useState(false)
  //Agarrar boton

  //Agarra el stylo de el tamño del nav
  const [navBarTamño,setNavBarTamaño] = useState(0)
  //Agarra el stylo de el tamño del nav
   
  //funcion para conectar boton
  const handleMenu = () => {
    setBotonNavar(!botonNavbar)
    if(!botonNavbar) {
      setNavBarTamaño(300)
      setCierreNav("flex")
    }else {
      setNavBarTamaño(0)
    }
  }
  //funcion para conectar boton

  return (
    <>
    <header>
      <div className="containerLogo">
        <figure className="containerImg">
          <img src={logo} alt="" />
        </figure>
      </div>

      <div className="containerTitulo">
        <h1>TempoMaster</h1>
      </div>

      <nav className="navBar">
      <Menumovil handleMenu={handleMenu}/>
        <ul className="MenuDeMovil">
          <li>
            <a href="">Temporizador</a>

            <a href="">Cronometro</a>

            <a href="">Hora</a>

            <a href="">Despertador</a>
          </li>
        </ul>
      </nav>
   
    </header>
    <NavMobil navBarTamño={navBarTamño} />
  
    </>
  );
};

export default Header;
