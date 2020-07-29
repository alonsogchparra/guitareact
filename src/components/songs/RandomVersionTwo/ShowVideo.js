import React from "react";
import ShowVideoList from "./ShowVideoList";
import { ReactComponent as Icon } from "../../../guitareact_logo.svg";
import "./RandomSongs.css";

const ShowVideo = ({
  isBTClicked,
  handleOriginalVideo,
  handleBackingTrack,
  isDarkTheme,
  onVideoSelect,
  selectedVideo,
  videoSrc,
  videos,
}) => {
  const backingTrackOrVideo = isBTClicked ? (
    <div>
      <div>
        <button
          className={`btn ${
            isDarkTheme ? "cyan accent-4" : "grey darken-3"
          } btn_track`}
          onClick={() => handleOriginalVideo()}
        >
          <strong className={isDarkTheme ? "black-text" : "white-text"}>
            Original Song
          </strong>
        </button>
      </div>
      <div className="video-container">
        <iframe
          src={videoSrc}
          frameBorder="0"
          height="100%"
          width="100%"
          title="Video Player"
        ></iframe>
      </div>
      <div>
        <ShowVideoList videos={videos} onVideoSelect={onVideoSelect} />
      </div>
    </div>
  ) : (
    <div>
      <div>
        <button
          className={`btn ${
            isDarkTheme ? "cyan accent-4" : "grey darken-3"
          } btn_track`}
          onClick={() => handleBackingTrack()}
        >
          <strong className={isDarkTheme ? "black-text" : "white-text"}>
            Guitar Backing Track
          </strong>
        </button>
      </div>
      <div className="video-container">
        <iframe
          src={videoSrc}
          frameBorder="0"
          height="100%"
          width="100%"
          title="Video Player"
        ></iframe>
      </div>
      <div>
        <ShowVideoList videos={videos} onVideoSelect={onVideoSelect} />
      </div>
    </div>
  );
  return selectedVideo ? (
    <div className="col s12" style={{ height: "70%" }}>
      {backingTrackOrVideo}
    </div>
  ) : (
    <div>
      <Icon width="100px" fill={isDarkTheme ? "#61DAFB" : "#212121"} />
    </div>
  );
};

export default ShowVideo;
