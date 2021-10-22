import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { song, handleCheckbox, songIsFavorite } = this.props;
    const { trackName, previewUrl, trackId } = song;
    return (
      <div>
        <div className="song-element" key={ trackName }>
          <p>{trackName}</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <div className="checkbox-container">
            <input
              className="toggle-checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              id={ trackId }
              onChange={ handleCheckbox }
              checked={ songIsFavorite }
            />
            <label htmlFor={ trackId } />
          </div>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  songIsFavorite: PropTypes.bool.isRequired,
};

export default MusicCard;
