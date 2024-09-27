import React, { Component } from 'react';
import PeliculaCard from '../components/PeliculaCard/PeliculaCard'; // Asegúrate de que la ruta es correcta
import Loader from '../components/Loader/Loader'; // Importa el componente Loader para la carga

const api_key = "0331cddd490fdf784d51f00d86f1b001"; // Tu API key
const baseURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=`;

class MasCartelera extends Component {
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
        console.log("Error al cargar las películas:", err);
        this.setState({ loading: false }); // Ocultar el loader en caso de error
      });
  };

  handleFilter = (e) => {
    const userValue = e.target.value;
    this.setState({
      valorFiltrado: userValue,
      peliculasFiltradas: this.state.peliculas.filter((pelicula) =>
        pelicula.title.toLowerCase().includes(userValue.toLowerCase())
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
      <>
        {/* Input de filtrado */}
        <input
          type="text"
          value={this.state.valorFiltrado}
          onChange={this.handleFilter}
          placeholder="Filtrar películas"
        />
        <button onClick={this.handleResetFilter}>Eliminar Filtro</button>
        
        {/* Mostrar loader o las películas */}
        {this.state.loading ? (
          <Loader /> // Componente de carga
        ) : (
          <>
            {/* Grid de películas filtradas usando PeliculaCard */}
            <div className="contenedor-peliculas">
              {this.state.peliculasFiltradas.map((pelicula) => (
                <PeliculaCard
                  key={pelicula.id}
                  pelicula={pelicula}
                  esFavorito={() => false} // Si tienes una lógica de favoritos, cámbialo
                  agregarFav={() => {}} // Si tienes una función para agregar a favoritos, cámbialo
                />
              ))}
            </div>
            <button onClick={this.handleLoadMore}>Cargar Más</button>
          </>
        )}
      </>
    );
  }
}

export default MasCartelera;
