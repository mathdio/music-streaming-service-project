import React from 'react';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import './Album.css';

class Album extends React.Component {
  state = {
    trackList: [],
    artistName: '',
    collectionName: '',
    albumCover: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.gettingMusics(id);
  }

  gettingMusics = async (id) => {
    const musicsResult = await getMusics(id);
    const trackList = musicsResult.filter((element, index) => index > 0);
    this.setState({
      trackList,
      artistName: musicsResult[0].artistName,
      collectionName: musicsResult[0].collectionName,
      albumCover: musicsResult[0].artworkUrl100,
    });
  };

  render() {
    const { trackList, artistName, collectionName, albumCover } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <main className="Album-main-container">
          <div className="Album-infos">
            <div className="Album-artist-album-names">
              <h3 data-testid="album-name">{collectionName}</h3>
              <p data-testid="artist-name">{artistName}</p>
            </div>
            <img
              src={ albumCover }
              alt={ collectionName }
              className="Album-cover-img"
            />
          </div>
          <div className="Album-tracks-container">
            {trackList.map((song) => (
              <MusicCard
                key={ uuid() }
                song={ song }
                // trackName={ song.trackName }
                // previewUrl={ song.previewUrl }
                // trackId={ song.trackId }
              />))}
          </div>
        </main>
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default Album;
