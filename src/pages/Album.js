import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    trackList: [],
    artistName: '',
    collectionName: '',
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
    });
  };

  render() {
    const { trackList, artistName, collectionName } = this.state;

    return (
      <div data-testid="page-album">
        <div>
          <Header />
          <h2 data-testid="artist-name">{artistName}</h2>
          <h3 data-testid="album-name">{collectionName}</h3>
          {trackList.map((song) => (
            <MusicCard
              key={ song.trackName }
              song={ song }
              // trackName={ song.trackName }
              // previewUrl={ song.previewUrl }
              // trackId={ song.trackId }
            />))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default Album;
