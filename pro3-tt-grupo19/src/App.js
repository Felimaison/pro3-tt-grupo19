import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detalle from "./pages/Detalle";
import VerMas from "./pages/VerMas";
import Favoritos from "./pages/Favoritos";
import SearchResults from "./pages/SearchResults"; 
import Header from "./components/Header/Header"; 
import Footer from "./components/Footer/Footer"; 
import MasCartelera from "./pages/MasCartelera"; 
import MasPopulares from "./pages/MasPopulares";

function App() {
  return (
    <Router>
      <Header /> {/* Asegúrate de que Header esté bien importado */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/detalle/id/:id" component={Detalle} /> {/* Ruta para detalle de película */}
        <Route path="/more/category/:category" component={VerMas} /> {/* Ruta para ver más categorías */}
        <Route path="/favorites" component={Favoritos} /> {/* Ruta para favoritos */}
        <Route path="/search" component={SearchResults} /> {/* Ruta para resultados de búsqueda */}
        <Route path="/vermas/category/cartelera" component={MasCartelera} /> {/* Estrenos */}
        <Route path="/vermas/category/estrenos" component={MasPopulares} /> {/* Estrenos */}
        <Route path="*" component={() => <div>404 Not Found</div>} /> {/* Ruta para 404 */}
      </Switch>
      <Footer /> {/* Asegúrate de que Footer esté bien importado */}
    </Router>
  );
}

export default App;
