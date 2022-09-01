import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  state = {
    loadingAddSong: false,
  };

  handleAddSong = async (album) => {
    this.setState({ loadingAddSong: true });
    await addSong(album);
    this.setState({ loadingAddSong: false });
  };

  render() {
    const { loadingAddSong } = this.state;
    const { album } = this.props;
    const { trackName, previewUrl, trackId } = album;
    return (
      <div>
        {loadingAddSong ? <Loading />
          : (
            <div>
              <h4>{trackName}</h4>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
              <label htmlFor="favorite">
                Favorita
                <input
                  type="checkbox"
                  name={ trackName }
                  data-testid={ `checkbox-music-${trackId}` }
                  id="favorite"
                  onChange={ () => this.handleAddSong(album) }
                />
              </label>
            </div>) }
      </div>
    );
  }
}

MusicCard.propTypes = {
  album: PropTypes.object,
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
}.isRequired;

export default MusicCard;
