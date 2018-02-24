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
      {index + 1}: {name}
    </div>    
  )
}

export default Track;