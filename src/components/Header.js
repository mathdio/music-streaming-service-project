import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import titleIcon from '../images/titleIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import favoritesIcon from '../images/favoritesIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import './Header.css';

class Header extends React.Component {
  state = {
    loadingHeader: true,
    loginName: '',
  };

  componentDidMount() {
    this.gettingUser();
  }

  gettingUser = async () => {
    const loginUser = await getUser();
    this.setState({
      loginName: loginUser.name,
      loadingHeader: false,
    });
  };

  render() {
    const { loadingHeader, loginName } = this.state;
    return (
      loadingHeader ? <Loading />
        : (
          <header data-testid="header-component" className="Header-container">
            <p className="Header-title-container">
              <img
                alt=""
                src={ titleIcon }
                className="Header-title-icon"
              />
              Music Streaming Service
            </p>
            <div className="Header-links-container">
              <Link
                to="/search"
                data-testid="link-to-search"
                className="Header-link"
              >
                <img
                  alt=""
                  src={ searchIcon }
                  className="Header-icons"
                />
                <p className="Header-link-text">
                  Search
                </p>
              </Link>
              <Link
                to="/favorites"
                data-testid="link-to-favorites"
                className="Header-link"
              >
                <img
                  alt=""
                  src={ favoritesIcon }
                  className="Header-icons"
                />
                <p className="Header-link-text">
                  Favorites
                </p>
              </Link>
              <Link
                to="/profile"
                data-testid="link-to-profile"
                className="Header-link"
              >
                <img
                  alt=""
                  src={ profileIcon }
                  className="Header-icons"
                />
                <p className="Header-link-text">
                  Profile
                </p>
              </Link>
            </div>
            <p
              data-testid="header-user-name"
              className="Header-profile-name"
            >
              {loginName}
            </p>
          </header>)
    );
  }
}

export default Header;
