import React from 'react';
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    searchText: '',
    artist: '',
    disableButton: true,
    loadingSearch: false,
    searchResult: [],
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const inputMinLimit = 2;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
      artist: value,
    });
    if (value.length >= inputMinLimit) {
      this.setState({
        disableButton: false,
      });
    }
  };

  handleSearch = async () => {
    const { searchText } = this.state;
    this.setState({ loadingSearch: true });
    const responseSearch = await searchAlbumsAPI(searchText);
    this.setState({ searchText: '', loadingSearch: false, searchResult: responseSearch });
  };

  render() {
    const { searchText, artist, disableButton, loadingSearch, searchResult } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loadingSearch ? <Loading />
          : (
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
                onClick={ this.handleSearch }
              >
                Pesquisar
              </button>
            </form>)}
        { (searchResult.length === 0) ? (<p>Nenhum álbum foi encontrado</p>)
          : (
            <div>
              <p>
                Resultado de álbuns de:
                {' '}
                {artist}
              </p>
              {searchResult.map((album) => {
                const { collectionId, collectionName, artworkUrl100 } = album;
                return (
                  <div key={ uuid() }>
                    <img src={ artworkUrl100 } alt={ collectionName } />
                    <Link
                      to={ `/album/${collectionId}` }
                      data-testid={ `link-to-album-${collectionId}` }
                    >
                      {collectionName}
                    </Link>
                  </div>
                );
              })}
            </div>) }
      </div>
    );
  }
}

export default Search;
