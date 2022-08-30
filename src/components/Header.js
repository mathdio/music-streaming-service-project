import React from 'react';
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
          </header>)
    );
  }
}

export default Header;
