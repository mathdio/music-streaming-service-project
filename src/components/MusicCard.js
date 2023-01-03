import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';
import favoritesIcon from '../images/favoritesIcon.svg';
import './MusicCard.css';

class MusicCard extends React.Component {
  state = {
    loading: false,
    favoriteList: [],
  };

  async componentDidMount() {
    const favoriteList = await getFavoriteSongs();
    this.setState({ favoriteList });
  }

  handleChange = async ({ target }) => {
    const { song, handleFavoriteChange } = this.props;
    this.setState({ loading: true });
    if (target.checked) {
      await addSong(song);
    } else {
      await removeSong(song);
    }

    handleFavoriteChange();
    const updateFavoriteList = await getFavoriteSongs();
    this.setState({ loading: false, favoriteList: updateFavoriteList });
  };

  render() {
    const { loading, favoriteList } = this.state;
    const { song: { trackName, previewUrl, trackId } } = this.props;
    return (
      <div className="MusicCard-track-card">
        <p className="MusicCard-track-name">{trackName}</p>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
          className="MusicCard-audio-controller"
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <input
          type="image"
          src={ favoritesIcon }
          alt=""
          name={ trackName }
          data-testid={ `checkbox-music-${trackId}` }
          id={ `checkbox-music-${trackId}` }
          checked={ favoriteList.some((song) => song.trackName === trackName) }
          onChange={ this.handleChange }
          className="MusicCard-favorite-input"
        />
        {loading && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.object,
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  handleFavoriteChange: PropTypes.func,
}.isRequired;

MusicCard.defaultProps = {
  handleFavoriteChange: () => {},
};

export default MusicCard;
