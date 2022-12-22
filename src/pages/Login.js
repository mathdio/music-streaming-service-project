import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { createUser } from '../services/userAPI';
import './Login.css';

class Login extends React.Component {
  state = {
    loginName: '',
    disableButton: true,
    loadingLogin: false,
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const inputMinLimit = 3;
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

  handleLogin = async () => {
    const { history } = this.props;
    const { loginName } = this.state;
    this.setState({ loadingLogin: true });
    await createUser({ name: loginName });
    history.push('./search');
  };

  render() {
    const { loginName, disableButton, loadingLogin } = this.state;
    return (
      <main data-testid="page-login" className="Login-main-container">
        {loadingLogin ? <Loading />
          : (
            <form className="Login-form-container">
              <input
                name="loginName"
                type="text"
                data-testid="login-name-input"
                onChange={ this.handleChange }
                value={ loginName }
                placeholder="What's your name?"
                className="Login-input"
              />
              <button
                type="button"
                data-testid="login-submit-button"
                disabled={ disableButton }
                onClick={ this.handleLogin }
                className="Login-button"
              >
                ENTER
              </button>
            </form>)}
      </main>

    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Login;
