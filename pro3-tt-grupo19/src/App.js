import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import React from "react";
import { Switch, Route } from "react-router-dom";
import Detalle from "./pages/Detalle";
import Header from "./components/Header/Header";
import VerMas from "./pages/VerMas";
import Favoritos from "./pages/Favoritos";

function App() {
  return (
    <>
      <Header />
         <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/detalle/id/:id" component={Detalle} />
          <Route path="/more/category/:category" component={VerMas} />
          <Route path="/favorites" component={Favoritos} />
          </Switch>
      
    <Footer />
    </>
  );
}

export default App;
