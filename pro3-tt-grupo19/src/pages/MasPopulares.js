import React, { Component } from 'react';
import PeliculaCard from '../components/PeliculaCard/PeliculaCard'; // Asegúrate de que la ruta es correcta
import Loader from '../components/Loader/Loader';

const api_key = "0331cddd490fdf784d51f00d86f1b001"; // Tu API key
const baseURL = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=`;

class MasPopulares extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: [],
      peliculasFiltradas: [],
      valorFiltrado: "",
      paginaActual: 1,
      loading: true, // Estado de carga
    };
  }

  componentDidMount() {
    this.fetchMovies();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.category !== prevProps.match.params.category) {
      this.fetchMovies();
    }
  }

  fetchMovies = () => {
    this.setState({ loading: true }); // Mostrar el loader al iniciar la carga

    fetch(`${baseURL}${this.state.paginaActual}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState((prevState) => ({
          peliculas: [...prevState.peliculas, ...data.results], // Concatenar nuevas películas
          peliculasFiltradas: [...prevState.peliculas, ...data.results],
          paginaActual: prevState.paginaActual + 1,
          loading: false, // Ocultar el loader al terminar la carga
        }));
      })
      .catch((err) => {
        console.error("Error al cargar las películas:", err);
        this.setState({ loading: false }); // Ocultar el loader en caso de error
      });
  };

  handleFilter = (e) => {
    const userValue = e.target.value.toLowerCase();
    this.setState({
      valorFiltrado: userValue,
      peliculasFiltradas: this.state.peliculas.filter((pelicula) =>
        pelicula.title.toLowerCase().includes(userValue)
      ),
    });
  };

  handleResetFilter = () => {
    this.setState({
      valorFiltrado: "",
      peliculasFiltradas: this.state.peliculas,
    });
  };

  handleLoadMore = () => {
    this.fetchMovies(); // Reutilizamos fetchMovies para cargar más películas
  };

  render() {
    return (
      <div className="mas-populares-container">
        {/* Input de filtrado */}
        <div className="filtro-container">
          <input
            type="text"
            value={this.state.valorFiltrado}
            onChange={this.handleFilter}
            placeholder="Filtrar películas"
            className="filtro-input"
          />
          <button onClick={this.handleResetFilter} className="filtro-boton">
            Eliminar Filtro
          </button>
        </div>
        
        {/* Mostrar loader o las películas */}
        {this.state.loading ? (
          <Loader /> // Componente de carga
        ) : (
          <>
            {/* Grid de películas filtradas usando PeliculaCard */}
            <div className="contenedor-peliculas">
              {this.state.peliculasFiltradas.length > 0 ? (
                this.state.peliculasFiltradas.map((pelicula) => (
                  <PeliculaCard
                    key={pelicula.id}
                    pelicula={pelicula}
                    esFavorito={() => false} // Lógica de favoritos
                    agregarFav={() => {}} // Función para agregar a favoritos
                  />
                ))
              ) : (
                <p>No se encontraron películas.</p>
              )}
            </div>
            <button onClick={this.handleLoadMore} className="cargar-mas-boton">
              Cargar Más
            </button>
          </>
        )}
      </div>
    );
  }
}

export default MasPopulares;
