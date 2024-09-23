import React from "react";
import "./Navbar.css"
import { Link } from "react-router-dom"
function Navbar(){
    return(
        <header className="header">
      <div className="logo">
      <img src="/img/pochoclo.png" alt="Logo" />
      </div>
      
      <nav className="nav">
        <ul className="nav-list">
                <li ><Link className="nav-link" to="/">Home</Link></li>
                <li ><Link className="nav-link" to="/favorites">Favoritos</Link></li>
                <li ><Link className="nav-link" to="/more/category/popular">Películas más populares</Link></li>
                <li ><Link className="nav-link" to="/more/category/now_playing">Películas en cartelera</Link></li>
            </ul>
      </nav>
      
    </header>
    )
}

export default Navbar;