import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends React.Component {
  state = {
    loading: false,
    favoriteList: [],
  };

  async componentDidMount() {
    this.handleFavoriteChange();
  }

  handleFavoriteChange = async () => {
    this.setState({ loading: true });
    const favoriteList = await getFavoriteSongs();
    this.setState({ loading: false, favoriteList }, () => {
    });
  };

  render() {
    const { loading, favoriteList } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading && <Loading />}
        {favoriteList.length > 0 && favoriteList.map((song) => (
          <MusicCard
            key={ song.trackName }
            song={ song }
            handleFavoriteChange={ this.handleFavoriteChange }
          />
        ))}
      </div>
    );
  }
}

export default Favorites;
