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

      <h1>{data.artistData.username}</h1>
      <img src={data.artistData.avatar_url} className="artists-list__image"/>
      <small className="artists-list__info">Track Count: {data.artistData.track_count}</small>
      <small className="artists-list__info">Download Count: {data.downloadCount}</small>      
      <small className="artists-list__info">Likes Count: {data.artistData.likes_count}</small>
      <small className="artists-list__info">Fallowers Count: {data.artistData.followers_count}</small>
      <small className="artists-list__info">From: {data.artistData.geo}</small>
    </div>
  )
}

export default Artist;