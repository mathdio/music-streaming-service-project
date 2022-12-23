import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { createUser } from '../services/userAPI';
import './Login.css';
import titleIcon from '../images/titleIcon.svg';

class Login extends React.Component {
  state = {
    loginName: '',
    invalidName: false,
    disableButton: true,
    loadingLogin: false,
    buttonClasses: 'Login-button',
  };

  checkInvalidName = () => {
    const { loginName } = this.state;
    const inputMinLimit = 3;
    if (loginName.length > 0 && loginName.length < inputMinLimit) {
      this.setState({
        invalidName: true,
        buttonClasses: 'Login-button Login-btn-with-warning',
      });
    } else {
      this.setState({
        invalidName: false,
        buttonClasses: 'Login-button',
      });
    }
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const inputMinLimit = 3;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => {
      this.checkInvalidName();
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
    const { loginName, disableButton, loadingLogin,
      invalidName, buttonClasses } = this.state;
    return (
      <main data-testid="page-login" className="Login-main-container">
        {loadingLogin ? <Loading />
          : (
            <form className="Login-form-container">
              <p className="Login-title-container">
                <img
                  alt=""
                  src={ titleIcon }
                  className="Login-title-icon"
                />
                Music Streaming Service
              </p>
              <input
                name="loginName"
                type="text"
                data-testid="login-name-input"
                onChange={ this.handleChange }
                value={ loginName }
                placeholder="What's your name?"
                className="Login-input"
              />
              {invalidName && (
                <div className="Login-warning-container">
                  <p>The chosen name must have at least 3 characters.</p>
                </div>
              )}
              <button
                type="button"
                data-testid="login-submit-button"
                disabled={ disableButton }
                onClick={ this.handleLogin }
                className={ buttonClasses }
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
