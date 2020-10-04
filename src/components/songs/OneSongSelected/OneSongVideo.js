import React from "react";
import OneSongList from "./OneSongList";
import { ReactComponent as Icon } from "../../../guitareact_logo.svg";

const OneSongVideo = ({
  isBTClicked,
  isDarkTheme,
  videos,
  selectedVideo,
  videoSrc,
  onVideoSelect,
  handleOriginalVideo,
  handleBackingTrack,
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
        <OneSongList
          videos={videos}
          onVideoSelect={(video) => onVideoSelect(video)}
        />
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
        <OneSongList
          videos={videos}
          onVideoSelect={(video) => onVideoSelect(video)}
        />
      </div>
    </div>
  );

  const checkVideo = selectedVideo ? (
    <div className="col s12" style={{ height: "70%" }}>
      {backingTrackOrVideo}
    </div>
  ) : (
    <div>
      <Icon fill={isDarkTheme ? "#61DAFB" : "#212121"} className="icon_logo" />
    </div>
  );

  return <div>{checkVideo}</div>;
};

export default OneSongVideo;