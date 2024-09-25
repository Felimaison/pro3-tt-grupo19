import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detalle from "./pages/Detalle";
import VerMas from "./pages/VerMas";
import Favoritos from "./pages/Favoritos";
import SearchResults from "./pages/SearchResults"; // Asegúrate de que esta ruta esté bien
import Header from "./components/Header/Header"; // Importa el componente Header
import Footer from "./components/Footer/Footer"; // Importa el componente Footer

function App() {
  return (
    <Router>
      <Header /> {/* Asegúrate de que Header esté bien importado */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/detalle/id/:id" component={Detalle} />
        <Route path="/more/category/:category" component={VerMas} />
        <Route path="/favorites" component={Favoritos} />
        <Route path="/search" component={SearchResults} /> {/* Ruta para resultados de búsqueda */}
      </Switch>
      <Footer /> {/* Asegúrate de que Footer esté bien importado */}
    </Router>
  );
}

export default App;
