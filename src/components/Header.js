import React from 'react';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    loadingHeader: false,
    loginName: '',
  };

  componentDidMount() {
    this.setState({
      loadingHeader: true,
    });
    const loginUser = getUser();
    this.setState({
      loginName: loginUser,
      loadingHeader: false,
    });
  }

  render() {
    const { loadingHeader, loginName } = this.state;
    return (
      loadingHeader ? <Loading />
        : (
          <header data-testid="header-component">
            <p data-testid="header-user-name">{ loginName.name }</p>
          </header>)
    );
  }
}

export default Header;
