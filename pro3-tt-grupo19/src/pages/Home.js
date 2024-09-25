import React from "react";
import Peliculas from "../components/Peliculas/Peliculas";
import SearchForm from "../components/SearchForm/SearchForm"; // Importa el componente SearchForm

const Home = (props) => {
  return (
    <div className="home">
      {/* Pasamos las props de Home al SearchForm */}
      <SearchForm {...props} /> 

      {/* Lista de películas */}
      <Peliculas {...props} /> 
    </div>
  );
}

export default Home;
