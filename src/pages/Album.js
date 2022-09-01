import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends React.Component {
  state = {
    trackList: [],
    artistName: '',
    collectionName: '',
    loadingFavorites: false,
    favoriteList: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.gettingMusics(id);
    this.setState({ loadingFavorites: true });
    const favoriteList = await getFavoriteSongs();
    this.setState({ loadingFavorites: false, favoriteList });
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
    const { trackList, artistName, collectionName,
      loadingFavorites, favoriteList } = this.state;

    return (
      <div data-testid="page-album">
        <div>
          <Header />
          <h2 data-testid="artist-name">{artistName}</h2>
          <h3 data-testid="album-name">{collectionName}</h3>
          {trackList.map((album) => (
            <MusicCard
              key={ album.trackName }
              album={ album }
              checked={ favoriteList.some((song) => song.trackName === album.trackName) }
            />))}
        </div>
        <span>{loadingFavorites && <Loading />}</span>
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default Album;
