import React from 'react'; 
import Artist from '../Artist/Artist';
import './ArtistList.scss';

const ArtistList = ({
  data,
  switchArtist,
  loadMoreArtist
}) => {
  return (
    <div className="artists-list list" onScroll={loadMoreArtist}>
      {
        data.map( artist => 
          <Artist 
            handleClick={switchArtist}
            data={artist}
            key={artist.userId}            
          /> )
      }
    </div>
  )
}

export default ArtistList;