import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import '../style/Header.css';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    const user = await getUser();
    this.setState({
      user,
    });
  };

  render() {
    const { user } = this.state;
    return (
      <>
        <header className="header" data-testid="header-component">
          <Link to="/">
            <img
              className="header-img"
              src="/trybetunes-logo.png"
              alt="trybetunes logo"
            />
          </Link>
          <div className="userName-container">
            <img className="header-avatar" src="/avatar.png" alt="avatar" />
            <p className="header-user" data-testid="header-user-name">
              {user.name}
            </p>
          </div>
        </header>
        <div>
          <div className="nav-bar">
            <Link
              className="header-link"
              data-testid="link-to-search"
              to="/search"
            >
              <button
                className="header-button"
                type="button"
              >
                Search
              </button>
            </Link>
            <Link
              className="header-link"
              data-testid="link-to-favorites"
              to="/favorites"
            >
              <button className="header-button favorite-link" type="button">
                Favorites
              </button>
            </Link>
            <Link
              className="header-link"
              data-testid="link-to-profile"
              to="/profile"
            >
              <button className="header-button" type="button">
                Profile
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default Header;
