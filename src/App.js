import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Loading from './pages/Loading';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import { createUser } from './services/userAPI';

class App extends React.Component {
  state = {
    loginName: '',
    disableButton: true,
    loading: false,
    savedLoginName: false,
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const inputMinLimit = 3;
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

  handleLogin = async () => {
    const { loginName } = this.state;
    this.setState({ loading: true });
    await createUser({ name: loginName });
    this.setState({ savedLoginName: true, });
  };

  render() {
    const { loginName, disableButton, loading, savedLoginName } = this.state;
    return (
      <BrowserRouter>
        <Route path="/album/:id" component={ Album } />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/profile" component={ Profile } />
        <Route path="/search" component={ Search } />
        <Route
          path="/"
          render={ () => (<Login
            name={ loginName }
            disableButton={ disableButton }
            handleLogin={ this.handleLogin }
            onInputChange={ this.handleChange }
            loading={ loading }
            savedLoginName={ savedLoginName }
          />) }
        />
        <Route path="*" component={ NotFound } />
      </BrowserRouter>
    );
  }
}

export default App;
