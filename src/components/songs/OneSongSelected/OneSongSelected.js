import React, { Component } from "react";
import OneSongVideo from "./OneSongVideo";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import youtube from "../../../api/youtube";
import { key } from "../../../keys/youtube";
import "./OneSongSelected.css";

class OneSongSelected extends Component {
  state = {
    isBTClicked: false,
    videos: [],
    selectedVideo: null,
  };

  componentDidMount() {
    const { song } = this.props;

    this.handleShowVideo(song.songTitle, song.artist);
  }

  onVideoSelect = (video) => this.setState({ selectedVideo: video });

  handleShowVideo = async (song, artist) => {
    const searchTerm = song + " " + artist;
    const response = await youtube.get("search", {
      params: {
        part: "snippet",
        maxResult: 5,
        key,
        q: searchTerm,
      },
    });

    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0],
    });
  };

  handleShowBTVideo = async (song, artist) => {
    const searchTerm = song + " " + artist + " backing track";

    const response = await youtube.get("search", {
      params: {
        part: "snippet",
        maxResult: 5,
        key,
        q: searchTerm,
      },
    });

    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0],
    });
  };

  handleOriginalVideo = () => {
    const { song } = this.props;

    this.setState({
      isBTClicked: false,
    });

    this.handleShowVideo(song.songTitle, song.artist);
  };

  handleBackingTrack = () => {
    const { song } = this.props;

    this.setState({
      isBTClicked: true,
    });

    this.handleShowBTVideo(song.songTitle, song.artist);
  };

  render() {
    const { isDarkTheme } = this.props;
    const { isBTClicked, selectedVideo, videos } = this.state;

    const videoSrc = selectedVideo
      ? `https://www.youtube.com/embed/${selectedVideo.id.videoId}`
      : null;

    return (
      <div className="container center">
        <div className="row">
          <div
            className="col m6 s12"
            style={{
              marginTop: "30px",
              marginLeft: "auto",
              marginRight: "auto",
              width: "100%",
            }}
          >
            <OneSongVideo
              isDarkTheme={isDarkTheme}
              isBTClicked={isBTClicked}
              videos={videos}
              selectedVideo={selectedVideo}
              videoSrc={videoSrc}
              onVideoSelect={(video) => this.onVideoSelect(video)}
              handleOriginalVideo={() => this.handleOriginalVideo()}
              handleBackingTrack={() => this.handleBackingTrack()}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const songs = state.firestore.data.songs;
  const song = songs ? songs[id] : null;

  return {
    song,
    isDarkTheme: state.settings.isDarkTheme,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "songs" }])
)(OneSongSelected);