import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  state = {
    loading: true,
    disabledButton: false,
    loginName: '',
    email: '',
    image: '',
    description: '',
    profileUpdated: false,
  };

  async componentDidMount() {
    const user = await getUser();
    const { name, email, image, description } = user;
    this.setState({
      loading: false,
      loginName: name,
      email,
      image,
      description,
    });
  }

  checkForm = () => {
    const { loginName, email, image, description } = this.state;
    if (loginName === '' || email === '' || image === '' || description === '') {
      this.setState({ disabledButton: true });
    } else {
      this.setState({ disabledButton: false });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => { this.checkForm(); });
  };

  clickUpdate = async (user) => {
    await updateUser(user);
    this.setState({ profileUpdated: true });
  };

  render() {
    const { loading, loginName, email,
      image, description, disabledButton, profileUpdated } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading />
          : (
            <form>
              <input
                name="loginName"
                type="text"
                data-testid="edit-input-name"
                onChange={ this.handleChange }
                value={ loginName }
              />
              <input
                name="email"
                type="email"
                data-testid="edit-input-email"
                onChange={ this.handleChange }
                value={ email }
              />
              <input
                name="image"
                type="text"
                data-testid="edit-input-image"
                onChange={ this.handleChange }
                value={ image }
              />
              <input
                name="description"
                type="text"
                data-testid="edit-input-description"
                onChange={ this.handleChange }
                value={ description }
              />
              <button
                type="button"
                data-testid="edit-button-save"
                disabled={ disabledButton }
                onClick={ () => {
                  this.clickUpdate({
                    name: loginName,
                    email,
                    image,
                    description,
                  });
                } }
              >
                Editar perfil
              </button>
            </form>) }
        {profileUpdated && <Redirect push to="/profile" />}
      </div>
    );
  }
}

export default ProfileEdit;
