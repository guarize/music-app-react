import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../style/Profile.css';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      image: '',
      name: '',
      email: '',
      description: '',
      loading: true,
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

  render() {
    const { loading, email, description, name, image } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading /> : (
          <div className="profile-container">
            <div className="profile-img-edit">
              <img data-testid="profile-image" src="/default.svg" alt="profile" />
              <Link to="/profile/edit">
                <button type="button">Edit Profile</button>
              </Link>
            </div>
            <div className="profile-info">
              <div>
                <h4>Name</h4>
                <p>{ name }</p>
              </div>
              <div>
                <h4>E-mail</h4>
                <p>{ email }</p>
              </div>
              <div>
                <h4>Description</h4>
                <p>{ description }</p>
              </div>
            </div>
          </div>)}
      </div>
    );
  }
}

export default Profile;
