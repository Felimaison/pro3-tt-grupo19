// SearchResults.js
import React, { Component } from 'react';
import PeliculaCard from "../components/PeliculaCard/PeliculaCard"; 
import Loader from '../components/Loader/Loader';

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      isLoading: true,
      favoritos: [], 
    };
  }

  componentDidMount() {
    this.fetchMovies();
    this.loadFavoritos(); 
  }

  loadFavoritos = () => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    this.setState({ favoritos });
  }

  esFavorito = (id) => {
    return this.state.favoritos.includes(id);
  };

  toggleFavorito = (id) => {
    let { favoritos } = this.state;
    if (favoritos.includes(id)) {
      favoritos = favoritos.filter(favId => favId !== id); 
    } else {
      favoritos.push(id);
    }
    localStorage.setItem("favoritos", JSON.stringify(favoritos)); 
    this.setState({ favoritos });
  };

  fetchMovies = () => {
    const query = this.props.location.state?.query;

    if (!query) {
      this.setState({ isLoading: false });
      return;
    }

    this.setState({ isLoading: true }); // Activar el loader antes de buscar

    fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=0331cddd490fdf784d51f00d86f1b001`)
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => { // Simulamos un pequeño retraso para que el loader sea visible
          this.setState({
            movies: data.results || [],
            isLoading: false, // Desactivar el loader después de cargar los datos
          });
        }, 1000); // 1 segundo de retraso para que el loader se muestre
      })
      .catch((e) => console.log(e));
  };

  render() {
    const { movies, isLoading } = this.state;
    const query = this.props.location.state?.query || "";

    return (
      <>
        {!isLoading ? (
          <>
            <h2 className="titulo">Resultados de tu búsqueda: "{query}"</h2>
            <div className="contenedor-peliculas">
              {movies.length > 0 ? (
                movies.map((peli) => (
                  <PeliculaCard
                    key={peli.id}
                    pelicula={peli}
                    esFavorito={this.esFavorito} 
                    agregarFav={this.toggleFavorito} 
                  />
                ))
              ) : (
                <p>No se encontraron películas.</p>
              )}
            </div>
          </>
        ) : (
          <Loader /> // Mostrar loader mientras isLoading es true
        )}
      </>
    );
  }
}

export default SearchResults;
