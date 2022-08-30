import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
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
      savedLoginName ? <Redirect to="/search" />
        : (
          <div data-testid="page-login">
            {loadingLogin ? <Loading />
              : (
                <form>
                  <input
                    name="loginName"
                    type="text"
                    data-testid="login-name-input"
                    onChange={ this.handleChange }
                    value={ loginName }
                  />
                  <button
                    type="button"
                    data-testid="login-submit-button"
                    disabled={ disableButton }
                    onClick={ this.handleLogin }
                  >
                    Entrar
                  </button>
                </form>)}
          </div>
        )
    );
  }
}

export default Login;
