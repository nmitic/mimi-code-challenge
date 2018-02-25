import React from 'react'; 
import './Track.scss';

const Track = ({
  name,
  permalink,
  handleClick,
  index
}) => {
  return (
    <div className="track-list__track" data-permalink={permalink} onClick={handleClick}>
      <small className="track-list__track__number">{index + 1}:</small> {name}
    </div>    
  )
}

export default Track;