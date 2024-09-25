import React, { Component } from 'react';
import PeliculaCard from "../components/PeliculaCard/PeliculaCard"; // Usamos tu componente de PeliculaCard

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = () => {
    const query = this.props.location.state?.query;

    if (!query) {
      this.setState({ isLoading: false });
      return;
    }

    fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=0331cddd490fdf784d51f00d86f1b001`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          movies: data.results || [],
          isLoading: false,
        });
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
                    esFavorito={() => false} // Ajusta según tu lógica de favoritos
                    agregarFav={() => {}} // Ajusta según tu lógica de favoritos
                  />
                ))
              ) : (
                <p>No se encontraron películas.</p>
              )}
            </div>
          </>
        ) : (
          <p>Cargando...</p>
        )}
      </>
    );
  }
}

export default SearchResults;