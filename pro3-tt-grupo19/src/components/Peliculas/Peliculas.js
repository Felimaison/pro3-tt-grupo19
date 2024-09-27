// Peliculas.js
import React, { Component } from "react";
import PeliculaCard from "../PeliculaCard/PeliculaCard";
import "./Peliculas.css";

class Peliculas extends Component {
  constructor() {
    super();
    this.state = {
      populares: [],
      nowPlaying: [],
      favoritos: [],
      paginaActual: 1, // Estado para manejar la página actual
      cargando: false // Estado para indicar si está cargando más películas
    };
  }

  componentDidMount() {
    this.fetchPeliculas(); // Cargar las primeras películas
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    this.setState({ favoritos });
  }

  fetchPeliculas = () => {
    const { paginaActual } = this.state;
    this.setState({ cargando: true }); // Iniciar el estado de carga

    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=0331cddd490fdf784d51f00d86f1b001&page=${paginaActual}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState((prevState) => ({
          populares: [...prevState.populares, ...data.results], // Concatenar nuevas películas
          paginaActual: prevState.paginaActual + 1, // Incrementar la página
          cargando: false // Finalizar la carga
        }));
      })
      .catch((error) => {
        console.error("Error al cargar más películas:", error);
        this.setState({ cargando: false }); // Finalizar la carga en caso de error
      });
  };

  agregarFav = (id) => {
    let { favoritos } = this.state;
    if (favoritos.includes(id)) {
      favoritos = favoritos.filter((favoritoId) => favoritoId !== id);
    } else {
      favoritos.push(id);
    }
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    this.setState({ favoritos });
  };

  esFavorito = (id) => {
    return this.state.favoritos.includes(id);
  };

  render() {
    const { populares, cargando } = this.state;

    return (
      <div className="peliculas">
        <section>
          <h2> POPULARES</h2>
          <div className="contenedor-peliculas">
            {populares.length > 0 ? (
              populares.map((movie) => (
                <PeliculaCard
                  key={movie.id}
                  pelicula={movie}
                  esFavorito={this.esFavorito}
                  agregarFav={this.agregarFav}
                />
              ))
            ) : (
              <p>Cargando...</p>
            )}
          </div>
        </section>

        {/* Botón para cargar más películas */}
        <div className="load-more-container">
          <button onClick={this.fetchPeliculas} disabled={cargando}>
            {cargando ? "Cargando..." : "Cargar Más Películas"}
          </button>
        </div>
      </div>
    );
  }
}

export default Peliculas;
