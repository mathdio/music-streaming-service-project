import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

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
      <div>
        <div>
          <h4>{trackName}</h4>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor={ `checkbox-music-${trackId}` }>
            Favorita
            <input
              type="checkbox"
              name={ trackName }
              data-testid={ `checkbox-music-${trackId}` }
              id={ `checkbox-music-${trackId}` }
              checked={ favoriteList.some((song) => song.trackName === trackName) }
              onChange={ this.handleChange }
            />
            <span>{loading && <Loading />}</span>
          </label>
        </div>
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
