import React, {Component} from "react"; 
import PeliculaCard from "../PeliculaCard/PeliculaCard";
import "./VerMas.css"

const enlaces = {
    popular:"https://api.themoviedb.org/3/movie/popular?api_key=0331cddd490fdf784d51f00d86f1b001",
    now_playing:"https://api.themoviedb.org/3/movie/now_playing?api_key=0331cddd490fdf784d51f00d86f1b001"
}

class VerMas extends Component {
    constructor(props){
        super(props);
        this.state = {
            pelis: [],
            pelisFiltradas: [],
            ValorFiltrado: "",
            favs: []

        }
    }

    componentDidMount(){
        const {category} = this.props.match.params
        const url = enlaces[category]

        if(url){
            fetch(url)
            .then((response)=> response.json())
            .then((data)=>{
                this.setState({
                    pelis:data.results,
                    pelisFiltradas:data.results
                })
            })
            .catch((e)=>console.log(e));
            
        }
        const favs = localStorage.getItem("favoritos") ? JSON.parse(localStorage.getItem("favoritos")) : []
        this.setState({favs})
    }

    añadirfavorito = (id) => {
        let {favs} = this.state;
        if(favs.includes(id)){
            favs = favs.filter((favoritoId)=> favoritoId !== id)
        }else{
            favs.push(id)
        }
        localStorage.setItem("favoritos", JSON.stringify(favs))
        this.setState({favs})
    }
    esFavorito = (id)=> {
        return this.state.favs.includes(id)
    }
    handleFilerChange = (event) => {
        const ValorFiltrado = event.target.value.toLowerCase()
        this.setState((prevState)=>({
            ValorFiltrado,
            pelisFiltradas: prevState.pelis.filter((peli)=>
                peli.title.toLowerCase().includes(ValorFiltrado)
            )
        }))
    }

    render(){
        const {pelisFiltradas} = this.state
        const {category} = this.props.match.params

        const tituloPag = category === "popular" ? "Peliculas Populares" : category === "now_playing" ? "Peliculas en cartelera" : "Peliculas en cartelera";

        return(
            <div className="paginaPelis">
        <h2>{tituloPag}</h2>
        <div className="contenedor-peliculas">
          {pelisFiltradas.length > 0 ? (
            pelisFiltradas.map((peli) => (
              <PeliculaCard
                key={peli.id}
                pelicula={peli}
                esFavorito={this.esFavorito}
                agregarFav={this.añadirfavorito}
              />
            ))
          ) : (
            <p>No se encontraron películas.</p>
          )}
        </div>
      </div>
        )
    }

}
export default VerMas;