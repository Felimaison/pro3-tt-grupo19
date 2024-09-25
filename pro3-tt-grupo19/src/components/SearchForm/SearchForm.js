import React, { Component } from "react";

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
    if (this.state.query.trim()) {
      this.props.history.push("/search", { query: this.state.query });
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

export default SearchForm
