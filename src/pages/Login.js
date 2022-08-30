import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';

class Login extends React.Component {
  render() {
    const { loginName, disableButton, handleLogin,
      onInputChange, loadingLogin, savedLoginName } = this.props;
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
                    onChange={ onInputChange }
                    value={ loginName }
                  />
                  <button
                    type="button"
                    data-testid="login-submit-button"
                    disabled={ disableButton }
                    onClick={ handleLogin }
                  >
                    Entrar
                  </button>
                </form>)}
          </div>
        )
    );
  }
}

Login.propTypes = {
  name: PropTypes.string,
}.isRequired;

export default Login;
