import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';
import ProfileEditForm from './ProfileEditForm';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      image: '',
      name: '',
      email: '',
      description: '',
      canRedirect: false,
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = () => {
    this.setState({ loading: true }, () => {
      getUser().then((response) => {
        this.setState({
          loading: false,
          ...response,
        });
      });
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleButtonDisable = () => {
    const { image, name, email, description } = this.state;
    const regex = /^\S+@\S+\.\S+$/;
    return (
      image.length > 0
      && name.length > 0
      && email.length > 0
      && regex.test(email)
      && description.length > 0
    );
  };

  updateUserInfo = (event) => {
    event.preventDefault();
    const { image, name, email, description } = this.state;
    this.setState(
      {
        loading: true,
      },
      () => updateUser({ image, name, email, description })
        .then(() => this.setState({
          canRedirect: true,
        })),
    );
  };

  render() {
    const {
      loading,
      image,
      email,
      name,
      description,
      canRedirect,
    } = this.state;
    if (canRedirect) return <Redirect to="/profile" />;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div className="profile-form">
            <ProfileEditForm
              image={ image }
              email={ email }
              name={ name }
              description={ description }
              buttonDisable={ this.handleButtonDisable() }
              handleChange={ this.handleChange }
              updateUserInfo={ this.updateUserInfo }
            />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
