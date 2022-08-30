import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

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
          <header data-testid="header-component">
            <p data-testid="header-user-name">{loginName}</p>
            <Link to="/search" data-testid="link-to-search">Search</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
            <Link to="/profile" data-testid="link-to-profile">Profile</Link>
          </header>)
    );
  }
}

export default Header;
