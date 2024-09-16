import React, { Component } from "react";

class PeliculaCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verMasId: null,
    };
  }

  mostrarDescrip = () => {
    const { verMasId } = this.state;
    const { pelicula } = this.props;
    this.setState({
      verMasId: verMasId === pelicula.id ? null : pelicula.id,
    });
  };

  render() {
    const { pelicula, esFavorito, agregarFav } = this.props;
    const { verMasId } = this.state;

    return (
      <article className="pelicula">
        <img
          src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
          alt={pelicula.title}
        />
        <h3>{pelicula.title}</h3>

        <button onClick={this.mostrarDescrip}>
          {verMasId === pelicula.id ? "Ocultar descripción" : "Ver descripción"}
        </button>

        {verMasId === pelicula.id && <p>{pelicula.overview}</p>}

        <a className="boton_detalle" href={`/detail/id/${pelicula.id}`}>Ir a Detalle</a>

        {esFavorito(pelicula.id) ? (
          <button onClick={() => agregarFav(pelicula.id)}>Quitar de favoritos</button>
        ) : (
          <button onClick={() => agregarFav(pelicula.id)}>Agregar a favoritos</button>
        )}
      </article>
    );
  }
}

export default PeliculaCard;