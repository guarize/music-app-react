import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import AlbumsResult from './AlbumsResult';

class SearchArtist extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      loading: false,
      albums: [],
      artist: '',
      foundAlbums: false,
    };
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ artistName: value });
  };

  handleButtonClick = async (event) => {
    event.preventDefault();
    const { artistName } = this.state;
    const albumsList = await searchAlbumsAPI(artistName);
    this.setState({
      loading: false,
      artist: artistName,
      artistName: '',
      albums: albumsList,
      foundAlbums: true,
    });
  };

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.handleButtonClick(event);
    }
  }

  render() {
    const { artistName, loading, albums, artist, foundAlbums } = this.state;
    const ARTIST_CHARACTERS = 2;
    if (loading) return <Loading />;
    return (
      <div>
        <div className="search-container">
          <label htmlFor="search-artist">
            <input
              autoComplete="off"
              data-testid="search-artist-input"
              placeholder="Artist Name"
              type="text"
              name="artistName"
              value={ artistName }
              onChange={ this.handleChange }
              onKeyDown={ this.handleKeyDown }
              id="search-artist"
            />
          </label>
          <button
            disabled={ artistName.length < ARTIST_CHARACTERS }
            data-testid="search-artist-button"
            type="button"
            onClick={ this.handleButtonClick }
          >
            Search
          </button>
        </div>
        <div>
          {foundAlbums && <AlbumsResult albums={ albums } artist={ artist } />}
        </div>
      </div>
    );
  }
}

export default SearchArtist;
