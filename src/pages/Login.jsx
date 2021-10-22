import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { createUser } from '../services/userAPI';
import '../style/Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      loading: false,
      searchRedirect: false,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleButtonClick = async (event) => {
    event.preventDefault();
    const { name, email, image, description } = this.state;
    this.setState({ loading: true },
      () => createUser({ name, email, image, description })
        .then(() => this.setState({
          loading: false,
          searchRedirect: true,
        })));
  };

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.handleButtonClick(event);
    }
  }

  render() {
    const { name, loading, searchRedirect } = this.state;
    const REQUIRED_LENGTH = 3;
    if (searchRedirect) return <Redirect to="/search" />;
    return (
      <div className="login-page" data-testid="page-login">
        {loading ? (
          <Loading />
        ) : (
          <div className="login-input-img">
            <div>
              <img
                className="login-img"
                src="/undraw_audio_player_re_cl20.svg"
                alt="login"
              />
            </div>
            <div className="login-container">
              <label htmlFor="name">
                <input
                  autoComplete="off"
                  data-testid="login-name-input"
                  onChange={ this.handleChange }
                  type="text"
                  name="name"
                  value={ name }
                  onKeyDown={ this.handleKeyDown }
                  placeholder="Name"
                  id="name"
                />
              </label>
              <button
                data-testid="login-submit-button"
                disabled={ name.length < REQUIRED_LENGTH }
                type="button"
                onClick={ this.handleButtonClick }
              >
                Log In
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
