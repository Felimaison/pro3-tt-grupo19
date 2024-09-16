import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";


function App() {
  return (
    <>
      <Navbar />
         <Switch>
          <Route exact path="/" component={Home}/>
          </Switch>
      
    <Footer />
    </>
  );
}

export default App;
