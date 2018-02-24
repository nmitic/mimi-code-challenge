import React from 'react'; 
import TrackPlayer from '../TrackPlayer/TrackPlayer';
import Track from '../Track/Track';
import './TrackList.scss';

const TracksList = ({
  data,
  trackData,
  switchSong,
  loadMoreTracks,
  isLoading
}) => {
  return (
    <div className="track-list list">
      <TrackPlayer data={trackData}/>
      <div className="track-list__tracks" onScroll={loadMoreTracks}>    
        {
          data.map((track, index) => 
            <Track
              name={track.title} 
              key={track.id} 
              permalink={track.permalink} 
              handleClick={switchSong}
              index={index}
            /> )
        } 
      </div>
      <div className="loading-pulser">
        {
          isLoading && '...loading'
        }
      </div>     
    </div>
  )
}

export default TracksList;