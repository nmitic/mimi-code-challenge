import React from 'react';
import './TrackPlayer.scss';

const TrackPlayer = ({
  data
}) => {
  return (
    <div className="track-player">
      <img src={data.artwork_url_retina} className="track-player__image"/>
      <h1 className="track-player__title">{data.title}</h1>
      <audio src={data.stream_url} controls autoPlay className="track-player__audio">
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}

export default TrackPlayer;