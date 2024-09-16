import React from "react";
import "./Navbar.css"
function Navbar(){
    return(
        <header className="header">
      <div className="logo">
        <h1>Trabajo</h1>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <a to="/" className="nav-link">Home</a>
          </li>
          <li className="nav-item">
            <a to="/favoritos" className="nav-link">Favoritos</a>
          </li>
          <li className="nav-item">
            <a to="/ver-todas" className="nav-link">Ver todas</a>
          </li>
          <li className="nav-item">
          <form action="#" method="GET" className="search-form">
            <input type="text" placeholder="Busca aquí..." class="search-input"></input>
            <button type="submit" className="boton_buscar">Buscar</button>
        </form>
          </li>
        </ul>
        
      </nav>
      
    </header>
    )
}

export default Navbar;