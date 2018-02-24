import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './app.scss';

import ArtistList from './cmp/ArtistList/ArtistList';
import TracksList from './cmp/TrackList/TrackList';

import store from './store';
import { observer } from 'mobx-react';

@observer class App extends Component {
  render = () => {
    return (
      <div className="app-container">
        <TracksList 
          data={this.props.store.tracks} 
          trackData={this.props.store.track} 
          switchSong={this.switchSong}
          loadMoreTracks={this.infinitScrollTracks}
          isLoading={this.props.store.loadingTracks}          
        />
        
        <ArtistList 
          data={this.props.store.artists} 
          switchArtist={this.switchArtist}
          loadMoreArtist={this.infinitScroll}
          isLoading={this.props.store.loadingArtists}
        />

      </div>
    )
  }

  switchArtist = (e) => {
    const permalink = e.currentTarget.dataset.permalink;

    this.props.store.currentArtist = permalink;
    this.props.store.currentPageTracks = 1;

    this.props.store.fetchData('tracks');
  }

  switchSong = (e) => {
    const permalink = e.currentTarget.dataset.permalink;
    this.props.store.currentTrack = permalink;

    this.props.store.fetchData('track');
  }

  infinitScroll = (e) => {
    const scrolledAllTheWay = e.currentTarget.scrollHeight - e.currentTarget.scrollTop  === e.currentTarget.clientHeight;
    const isLoading = this.props.store.loadingArtists;
    
    if (scrolledAllTheWay && !isLoading) {
      this.props.store.fetchData('artists');
    }
  }

  infinitScrollTracks = (e) => {
    const scrolledAllTheWay = e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
    const isLoading = this.props.store.loadingTracks;
    
    if (scrolledAllTheWay && !isLoading) {
      this.props.store.fetchData('tracksAppend');      
    }
  }

  componentDidMount = () => {
    this.props.store.fetchData('artists');
  }
}

ReactDOM.render(
  <App store={store} />,
  document.getElementById('app')
)