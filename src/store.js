import { observable, action } from 'mobx';
import { getArtistsList, getTracksList, getTrack } from './utils';

class PopularArtistStore {
  @observable artists = [];
  @observable currentArtistPage = 1;
  @observable tracks= [];
  @observable track= {};
  
  @observable currentTrack = '';
  @observable currentArtist = '';
  @observable currentPageArtist = 1;
  @observable currentPageTracks = 1;

  @observable loadingTracks = false;
  @observable loadingArtists = false;

  @action fetchData = (dataType) => {

    switch (dataType) {

      case 'artists':
        this.loadingArtists = true;

        getArtistsList({
          page: this.currentArtistPage
        })
          .then(this.fetchArtistSuccess, this.fetchArtistError)
      break;

      case 'tracks':
        this.loadingTracks = true;
      
        getTracksList({
          artist: this.currentArtist,
          page: 1
        })
          .then(this.fetchTracksSuccess, this.fetchTracksError)
      break;
      
      case 'track':
        getTrack({
          artist: this.currentArtist,
          title: this.currentTrack
        })
          .then(this.fetchTrackSuccess, this.fetchTrackError)
      break;

      case 'tracksAppend':
        this.loadingTracks = true;
      
        getTracksList({
          artist: this.currentArtist,
          page: this.currentPageTracks
        })
          .then(this.fetchTracksAppendSuccess, this.fetchTracksAppendError)
        break;

    }
  }

  @action fetchArtistSuccess = (data) => {
    this.currentArtistPage += 1;
    this.artists = [...this.artists, ...data];
    this.loadingArtists = false;
  }

  @action fetchTracksSuccess = (data) => {
    this.currentPageTracks += 1;    
    this.tracks = data;
    this.loadingTracks = false;
  }

  @action fetchTrackSuccess = (data) => {
    this.track = data;
  }

  @action fetchTracksAppendSuccess = (data) => {
    this.currentPageTracks += 1;  
    this.tracks = [...this.tracks, ...data]
    this.loadingTracks = false;    
  }
}

export default new PopularArtistStore;