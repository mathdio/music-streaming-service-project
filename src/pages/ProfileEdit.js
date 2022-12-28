import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  state = {
    loading: true,
    disabledButton: false,
    name: '',
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
      name,
      email,
      image,
      description,
    }, () => this.checkForm);
  }

  checkForm = () => {
    const { name, email, image, description } = this.state;
    if (name === '' || email === '' || image === '' || description === '') {
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
    this.setState({ profileUpdated: true });
    await updateUser(user);
  };

  render() {
    const { loading, name, email,
      image, description, disabledButton, profileUpdated } = this.state;
    // if (profileUpdated) return <Redirect to="/profile" />;
    return (profileUpdated ? <Redirect to="/profile" />
      : (
        <div data-testid="page-profile-edit">
          <Header />
          {loading ? <Loading />
            : (
              <form>
                <input
                  name="name"
                  type="text"
                  data-testid="edit-input-name"
                  onChange={ this.handleChange }
                  value={ name }
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
                      name,
                      email,
                      image,
                      description,
                    });
                  } }
                >
                  Editar perfil
                </button>
              </form>) }
        </div>)
    );
  }
}

export default ProfileEdit;
