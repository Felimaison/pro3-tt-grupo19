// SearchForm.js
import React, { Component } from "react";
import "./SearchForm.css";

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ""
    };
  }

  handleFormChange = (e) => {
    this.setState({
      query: e.target.value
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
    
    // Validar que el query no esté vacío
    if (this.state.query && this.state.query !== "") {
      this.props.history.push("/search", { query: this.state.query });
    } else {
      alert("Por favor, ingresa un término de búsqueda.");
    }
  };

  render() {
    return (
      <div className="search">
        <form onSubmit={this.handleFormSubmit} className="search">
          <input
            placeholder="Buscar película"
            name="query"
            onChange={this.handleFormChange}
            value={this.state.query}
          />
          <button type="submit">Buscar</button>
        </form>
      </div>
    );
  }
}

export default SearchForm;
