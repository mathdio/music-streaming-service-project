import React from 'react';
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './Search.css';

class Search extends React.Component {
  state = {
    searchText: '',
    artist: '',
    disableButton: true,
    loadingSearch: false,
    searchResult: [],
    firstSearch: false,
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
    this.setState({
      searchText: '',
      loadingSearch: false,
      searchResult: responseSearch,
      firstSearch: true,
    });
  };

  render() {
    const { searchText, artist, disableButton,
      loadingSearch, searchResult, firstSearch } = this.state;
    return (
      <div data-testid="page-search" className="Search-body-container">
        <Header />
        {loadingSearch ? <Loading />
          : (
            <main className="Search-main-container">
              <form className="Search-form-container">
                <input
                  name="searchText"
                  type="text"
                  data-testid="search-artist-input"
                  placeholder="WRITE YOUR SEARCH"
                  onChange={ this.handleChange }
                  value={ searchText }
                  className="Search-input"
                />
                <button
                  type="button"
                  data-testid="search-artist-button"
                  disabled={ disableButton }
                  onClick={ this.handleSearch }
                  className="Search-button"
                >
                  SEARCH
                </button>
              </form>
              {(searchResult.length === 0 && firstSearch)
                && (<p>Nenhum álbum foi encontrado</p>)}
              {(searchResult.length > 0 && firstSearch) && (
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
            </main>
          )}
      </div>
    );
  }
}

export default Search;
