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
    disableButton: true,
    loadingSearch: false,
    searchResult: [],
    firstSearch: false,
    resultsTitle: '',
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const inputMinLimit = 2;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
    if (value.length >= inputMinLimit) {
      this.setState({ disableButton: false });
    } else {
      this.setState({ disableButton: true });
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
      resultsTitle: `Showing albuns of: ${searchText}`,
    });
  };

  render() {
    const { searchText, disableButton,
      loadingSearch, searchResult, firstSearch, resultsTitle } = this.state;
    return (
      <div data-testid="page-search" className="Search-body-container">
        <Header />
        {loadingSearch
          ? (
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
              <div className="Search-loading-container">
                <Loading />
              </div>
            </main>)
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
                && (<p className="Search-no-results">No album found.</p>)}
              {(searchResult.length > 0 && firstSearch) && (
                <div className="Search-results-container">
                  <p className="Search-title-results">
                    {resultsTitle}
                  </p>
                  <div className="Search-albuns-container">
                    {searchResult.map((album) => {
                      const { collectionId, collectionName,
                        artworkUrl100, artistName } = album;
                      return (
                        <Link
                          to={ `/album/${collectionId}` }
                          data-testid={ `link-to-album-${collectionId}` }
                          className="Search-album-link"
                          key={ uuid() }
                        >
                          <div className="Search-album-card">
                            <img
                              src={ artworkUrl100 }
                              alt={ collectionName }
                              className="Search-album-img"
                            />
                            <p className="Search-album-name">
                              {collectionName}
                            </p>
                            <p className="Search-artist-name">
                              {artistName}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>) }
            </main>
          )}
      </div>
    );
  }
}

export default Search;
