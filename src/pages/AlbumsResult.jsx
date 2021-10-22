import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumsResult extends React.Component {
  render() {
    const { albums } = this.props;
    return (
      <div>
        {albums.length === 0 ? (
          <p className="no-album">No albums found</p>
        ) : (
          <div className="album-container">
            <div className="albums">
              {albums.map(
                ({
                  collectionId,
                  artistName,
                  collectionName,
                  artworkUrl100,
                }) => (
                  <div className="album-element" key={ collectionId }>
                    <Link
                      className="link-decoration"
                      data-testid={ `link-to-album-${collectionId}` }
                      to={ `/album/${collectionId}` }
                    >
                      <img src={ artworkUrl100 } alt={ collectionName } />
                      <div className="artist-text">
                        <p className="colletion-name">{collectionName}</p>
                        <p>{artistName}</p>
                      </div>
                    </Link>
                  </div>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

AlbumsResult.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AlbumsResult;
