import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
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
    loadingLogin: false,
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
    this.setState({ loadingLogin: true });
    await createUser({ name: loginName });
    this.setState({ savedLoginName: true });
  };

  render() {
    const { loginName, disableButton, loadingLogin, savedLoginName } = this.state;
    return (
      <BrowserRouter>
        <Switch>
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
              loadingLogin={ loadingLogin }
              savedLoginName={ savedLoginName }
            />) }
          />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
