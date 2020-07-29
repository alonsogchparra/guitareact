import React from "react";

const ShowVideoItem = ({ video, onVideoSelect }) => {
  return (
    <div className="col m4 s4">
      <div
        className="card"
        onClick={() => onVideoSelect(video)}
        style={{ cursor: "pointer" }}
      >
        <div className="card-image">
          <img src={video.snippet.thumbnails.medium.url} alt="thumbnail" />
        </div>
      </div>
    </div>
  );
};

export default ShowVideoItem;
