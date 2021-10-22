import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';
import '../style/Album.css';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      album: {},
      songs: [],
      loading: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.getSongs();
    this.getFavorites();
  }

  getFavorites = async () => {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favorites: favoriteSongs,
      loading: false,
    });
  }

  getSongs = () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.setState({ loading: true },
      () => getMusics(id).then((response) => this.setState({
        loading: false,
        songs: response.slice(1),
        album: response[0],
      })));
  }

  handleCheckbox = async ({ target: { id, checked } }) => {
    const { songs } = this.state;
    const songObj = songs.find((song) => song.trackId === Number(id));
    this.setState({ loading: true },
      () => (checked ? addSong(songObj) : removeSong(songObj))
        .then(() => {
          this.getFavorites();
        }));
  };

  songIsFavorite = (id) => {
    const { favorites } = this.state;
    const result = favorites.some((song) => song.trackId === id);
    return result;
  }

  render() {
    const { loading, album, songs } = this.state;
    const { artworkUrl100, collectionName, artistName } = album;
    const MUSIC_AMOUNT = 6;
    return (
      <div data-testid="page-album">
        <Header />
        <div className="song-container">

          <div className="music-card playing">
            <img className="image" src={ artworkUrl100 } alt="album cover" />
            <div className="wave" />
            <div className="wave" />
            <div className="wave" />
            <div className="album-info">
              <h3 className="title" data-testid="album-name">{collectionName}</h3>
              <p className="artist" data-testid="artist-name">{artistName}</p>
            </div>
          </div>

          <div>
            {songs.slice(0, MUSIC_AMOUNT).map((song) => (
              <div key={ song.trackId }>
                <MusicCard
                  album={ album }
                  song={ song }
                  handleCheckbox={ this.handleCheckbox }
                  songIsFavorite={ this.songIsFavorite(song.trackId) }
                />
              </div>
            ))}
          </div>

        </div>
        {loading && <Loading />}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
