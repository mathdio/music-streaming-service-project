import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    searchText: '',
    disableButton: true,
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const inputMinLimit = 2;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
    if (value.length >= inputMinLimit) {
      this.setState({
        disableButton: false,
      });
    }
  };

  render() {
    const { searchText, disableButton } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            name="searchText"
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
            value={ searchText }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ disableButton }
            onClick={ this.handleLogin }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
