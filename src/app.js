import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './app.scss';

import ArtistList from './cmp/ArtistList/ArtistList';
import TracksList from './cmp/TrackList/TrackList';

const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)

const pipe = (...functions) => data =>
  functions.reduce((value, func) => func(value), data)

const endPoint = {
  artistList: page => `http://localhost:3000/popularArtist?_page=${page}&_limit=20`,
  trackList: params => `https://api-v2.hearthis.at/${params.artist}/?type=tracks&page=${params.page}&count=20`,
  track: params => `https://api-v2.hearthis.at/${params.artist}/${params.title}/`
}

const getData = async (endPoint) => {
  const response = await fetch(endPoint);
  const data = await response.json();
  
  return data;
}

const getArtistsList = compose(getData, endPoint.artistList);
const getTracksList = compose(getData, endPoint.trackList);
const getTrack = compose(getData, endPoint.track);


class App extends Component {
  state = {
    artists: [],
    tracks: [],
    track: {},
    
    currentTrack: '',
    currentArtist: '',
    currentPageArtist: 1,
    currentPageTracks: 1,

    loadingTracks: false,
    loadingArtists: false
  }

  render = () => {
    return (
      <div className="app-container">

        <TracksList 
          data={this.state.tracks} 
          trackData={this.state.track} 
          switchSong={this.switchSong}
          loadMoreTracks={this.infinitScrollTracks}
        />
        
        <ArtistList 
          data={this.state.artists} 
          switchArtist={this.switchArtist}
          loadMoreArtist={this.infinitScroll}
        />

      </div>
    )
  }

  loadMoreArtist = (page) => {
    getArtistsList(page)
      .then(data => {
        this.setState((prevState, props) => {
          return {
            artists: [...prevState.artists, ...data]
          }
        })
      });
  }

  switchArtist = (e) => {
    const permalink = e.currentTarget.dataset.permalink;

    this.setState((prevState, props) => {
      return {
        currentArtist: permalink,
        scurrentPageTracks: 1 
      }
    }, () => {
      getTracksList({
        artist: this.state.currentArtist,
        page: this.state.currentPageTracks
      })
      .then(data => {
        this.setState((prevState, props) => {
          return {
            tracks: data
          }
        })
      });      
    })
  }

  switchSong = (e) => {
    const permalink = e.currentTarget.dataset.permalink;

    this.setState((prevState, props) => {
      return {
        currentTrack: permalink
      }
    }, () => {
      getTrack({
        artist: this.state.currentArtist,
        title: this.state.currentTrack
      })
      .then(data => {
        this.setState((prevState, props) => {
          return {
            track: data
          }
        })
      });      
    })
  }

  loadMoreTracks = () => {
    getTracksList({
      artist: this.state.currentArtist,
      page: this.state.currentPageTracks
    })
    .then(data => {
      this.setState((prevState, props) => {
        return {
          tracks: [...prevState.tracks, ...data]
        }
      })
    }); 
  }

  infinitScroll = (e) => {
    const scrolledAllTheWay = e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;

    if (scrolledAllTheWay) {
      this.setState((prevState, props) => {
        return {
          currentPageArtist: prevState.currentPageArtist + 1
        }
      }, () => {
        console.log(this.state.currentPageArtist)
        this.loadMoreArtist(this.state.currentPageArtist);
      })
    }
  }

  infinitScrollTracks = (e) => {
    const scrolledAllTheWay = e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
    if (scrolledAllTheWay) {
      this.setState((prevState, props) => {
        return {
          currentPageTracks: prevState.currentPageTracks + 1
        }
      }, () => {
        console.log(this.state.currentPageTracks)
        this.loadMoreTracks();
      })
    }
  }

  componentDidMount = () => {
    this.loadMoreArtist(this.state.currentPageArtist);
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)