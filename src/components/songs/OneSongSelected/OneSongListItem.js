import React from 'react';

const OneSongListItem = ({ video, onVideoSelect }) => {
  return (
    <div>
      <div
        className="card video_item"
        onClick={() => onVideoSelect(video)}
        style={{ cursor: "pointer" }}
      >
        <div className="card-image">
          <img src={video.snippet.thumbnails.medium.url} alt="thumbnail"/>
        </div>
      </div>
    </div>
  )
}

export default OneSongListItem
