import React from "react";
import "./Loader.css"; // Importa los estilos para el loader

const Loader = () => {
  return (
    <div className="loader-container">
      <img src={'../giphy.webp'} alt="Loading..." className="loader-image" />
    </div>
  );
}

export default Loader;
