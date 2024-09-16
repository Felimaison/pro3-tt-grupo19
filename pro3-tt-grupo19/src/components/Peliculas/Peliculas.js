import React, { Component } from "react";
import PeliculaCard from "../PeliculaCard/PeliculaCard"; 
import "./Peliculas.css"


class Peliculas extends Component {
  constructor() {
    super();
    this.state = {
      populares: [],
      nowPlaying: [],
      favoritos: [],
    };
  }

  componentDidMount() {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=0331cddd490fdf784d51f00d86f1b001")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ populares: data.results.slice(0, 5) });
      })
      .catch((error) => console.log(error));

    fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=0331cddd490fdf784d51f00d86f1b001")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ nowPlaying: data.results.slice(0, 5) });
      })
      .catch((error) => console.log(error));

    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    this.setState({ favoritos });
  }

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
    const { populares, nowPlaying } = this.state;

    return (
      <div className="peliculas">
        <section>
          <h2>PELÍCULAS POPULARES</h2>
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
          <a href="/more/category/popular">Ver Todas - Películas más populares</a>
        </section>

        <section>
          <h2>PELÍCULAS EN CARTELERA</h2>
          <div className="contenedor-peliculas">
            {nowPlaying.length > 0 ? (
              nowPlaying.map((movie) => (
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
          <a href="/more/category/now_playing">Ver Todas - Películas en cartelera</a>
        </section>
      </div>
    );
  }
}

export default Peliculas;