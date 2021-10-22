import React from 'react';
import PropTypes from 'prop-types';

class ProfileEditForm extends React.Component {
  render() {
    const {
      image,
      email,
      name,
      description,
      handleChange,
      buttonDisable,
      updateUserInfo,
    } = this.props;
    return (
      <form autoComplete="off">
        <label htmlFor="profile-image">
          <input
            name="image"
            id="profile-image"
            type="text"
            value={ image }
            data-testid="edit-input-image"
            placeholder="Image URL"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="profile-name">
          Name
          <input
            autoComplete="off"
            name="name"
            id="profile-name"
            type="text"
            value={ name }
            data-testid="edit-input-name"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="profile-email">
          E-mail
          <input
            name="email"
            id="profile-email"
            type="text"
            value={ email }
            data-testid="edit-input-email"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="profile-description">
          Description
          <textarea
            name="description"
            id="profile-description"
            value={ description }
            data-testid="edit-input-description"
            onChange={ handleChange }
          />
        </label>
        <button
          disabled={ !buttonDisable }
          type="button"
          onClick={ updateUserInfo }
          data-testid="edit-button-save"
        >
          Save
        </button>
      </form>
    );
  }
}

ProfileEditForm.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  buttonDisable: PropTypes.bool.isRequired,
  updateUserInfo: PropTypes.func.isRequired,
};

export default ProfileEditForm;
