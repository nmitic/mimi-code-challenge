import React from 'react';
import './Arist.scss';

const Artist = ({
  data,
  handleClick
}) => {
  return (
    <div
      className="artists-list__artist"
      onClick={handleClick}
      data-permalink={data.artistData.permalink}
    >
      <img src={data.artistData.avatar_url} className="artists-list__artist__image"/>
      <div>
        <small className="artists-list__artist__info">Name: {data.artistData.username}</small>      
        <small className="artists-list__artist__info">Track Count: {data.artistData.track_count}</small>
        <small className="artists-list__artist__info">Download Count: {data.downloadCount}</small>      
        <small className="artists-list__artist__info">Likes Count: {data.artistData.likes_count}</small>
        <small className="artists-list__artist__info">Fallowers Count: {data.artistData.followers_count}</small>
        <small className="artists-list__artist__info">From: {data.artistData.geo}</small> 
      </div>

    </div>
  )
}

export default Artist;