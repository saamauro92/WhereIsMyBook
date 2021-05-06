import React from "react";
import { Link } from "react-router-dom";
import logo from "../../src/logo.png";
import lupa from "../../src/lupa.png";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarLogo">
        <img src={logo} className="App-logo" alt="logo" />
      </div>

      <div className="sidebar-wrapper">
        <Link className="sidebarButton" to="/persona">
          <p>Usuarios</p>
        </Link>
      </div>
      <div className="sidebar-wrapper">
        <Link className="sidebarButton" to="/categoria">
          <p>Géneros</p>
        </Link>
      </div>
      <div className="sidebar-wrapper">
        <Link className="sidebarButton" to="/libro">
          <p>Libros</p>
        </Link>
      </div>
      <div className="sidebar-footimg">
        <img src={lupa} className="App-logo" alt="lupa" />
      </div>
    </div>
  );
}

export default Sidebar;
