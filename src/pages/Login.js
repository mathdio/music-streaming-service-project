import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  render() {
    const { name, disableButton, createUser, onInputChange } = this.props;
    return (
      <div data-testid="page-login">
        <input
          name="name"
          type="text"
          data-testid="login-name-input"
          onChange={ onInputChange }
          value={ name }
        />
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ disableButton }
          onClick={ () => createUser({ name }) }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  name: PropTypes.string,
}.isRequired;

export default Login;
