import React from 'react';
import Header from './Header';
import Loading from './Loading';
import MusicCard from './MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../style/Favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      favorites: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites = async () => {
    const TIMEOUT = 500;
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favorites: favoriteSongs,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, TIMEOUT);
  }

  handleCheckbox = async ({ target: { id, checked } }) => {
    const { favorites } = this.state;
    const songObj = favorites.find((song) => song.trackId === Number(id));
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
    const { loading, favorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="favorites-container">
          {
            favorites.map((song) => (
              <div className="favorites-songs" key={ song.trackId }>
                <img
                  className="song-thumb"
                  src={ song.artworkUrl100 }
                  alt="music thumb"
                />
                <MusicCard
                  album={ song.collectionName }
                  song={ song }
                  handleCheckbox={ this.handleCheckbox }
                  songIsFavorite={ this.songIsFavorite(song.trackId) }
                />
              </div>
            ))
          }
          {loading && <Loading />}
        </div>
      </div>
    );
  }
}

export default Favorites;
