import React, { Component } from "react";
import Loading from "../../loading/Loading";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import youtube from "../../../api/youtube";
import ShowResult from "./ShowResult";
import ShowVideo from "./ShowVideo";
import { key } from "../../../keys/youtube";
import "./RandomSongs.css";

class RandomSongs extends Component {
  state = {
    musicList: [],
    copyMusicList: [],
    musicItem: "",
    isClicked: false,
    songCounter: 0,
    videos: [],
    selectedVideo: null,
    isBTClicked: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.checkSongs();
    }, 1000);
  }

  onVideoSelect = (video) => {
    this.setState({
      selectedVideo: video,
    });
  };

  checkSongs = () => {
    const { songs, auth } = this.props;

    if (songs === undefined) {
      return;
    } else {
      this.setState({
        musicList: this.state.musicList.concat(
          songs
            .filter((song) => song.userId === auth.uid)
            .map((song) => ({
              id: song.id,
              songTitle: song.songTitle,
              artist: song.artist,
            }))
        ),
        copyMusicList: this.state.copyMusicList.concat(
          songs
            .filter((song) => song.userId === auth.uid)
            .map((song) => ({
              id: song.id,
              songTitle: song.songTitle,
              artist: song.artist,
            }))
        ),
      });
    }
  };

  getRandomNumber = (min, max) => {
    let stepOne = max - min;
    let stepTwo = Math.random() * stepOne;
    let result = Math.floor(stepTwo) + min;
    return result;
  };

  getSong = () => {
    const { musicList } = this.state;

    this.setState({
      isClicked: true,
    });

    if (musicList.length === 0) {
      this.setState({
        musicItem: "",
      });
    } else {
      let randomIndex = this.getRandomNumber(0, musicList.length);
      let randomSong = musicList[randomIndex];

      this.setState((prevState) => ({
        musicList: prevState.musicList.filter(
          (music) => music.songTitle !== randomSong.songTitle
        ),
      }));

      this.setState({
        musicItem: randomSong,
        songCounter: this.state.songCounter + 1,
        isBTClicked: false,
      });

      this.handleShowVideo(randomSong.songTitle, randomSong.artist);
    }
  };

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

    const videoOptions = response.data.items.splice(1, 3);

    this.setState({
      videos: videoOptions,
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

    const videoOptions = response.data.items.splice(1, 3);

    this.setState({
      videos: videoOptions,
      selectedVideo: response.data.items[0],
    });
  };

  startOver = () => {
    this.setState({
      musicList: this.state.copyMusicList,
      isClicked: false,
      songCounter: 0,
      musicItem: "",
    });
  };

  handleBackingTrack = () => {
    const { musicItem } = this.state;

    this.setState({
      isBTClicked: true,
    });

    this.handleShowBTVideo(musicItem.songTitle, musicItem.artist);
  };

  handleOriginalVideo = () => {
    const { musicItem } = this.state;

    this.setState({
      isBTClicked: false,
    });

    this.handleShowVideo(musicItem.songTitle, musicItem.artist);
  };

  render() {
    const {
      musicList,
      musicItem,
      isClicked,
      copyMusicList,
      songCounter,
      videos,
      selectedVideo,
      isBTClicked,
    } = this.state;

    const { isDarkTheme } = this.props;

    const videoSrc = selectedVideo
      ? `https://www.youtube.com/embed/${selectedVideo.id.videoId}`
      : null;

    const quantitySongs = copyMusicList.length > 1 ? "songs" : "song";
    const playOrNext = isClicked ? "Next" : "Play";

    const musicPlaying =
      musicItem === "" ? null : (
        <div className="col s12">
          <div
            className={`card z-depth-3 ${
              isDarkTheme ? "cyan accent-4" : "grey darken-3"
            }`}
          >
            <div className="card-content">
              <div className="card-title">
                <strong className={isDarkTheme ? "black-text" : "white-text"}>
                  Song: {musicItem.songTitle} <br /> Artist/Band:{" "}
                  {musicItem.artist}
                </strong>
              </div>
            </div>
          </div>
        </div>
      );

    const checkLoading =
      musicList.length === 0 && musicItem === "" ? (
        <Loading />
      ) : (
        <div>
          <h3
            className={`title_version_two ${
              isDarkTheme ? "white-text" : "black-text"
            }`}
          >
            Play Random Songs
          </h3>
          <h4 className={isDarkTheme ? "white-text" : "black-text"}>
            Ready to play some good music?
          </h4>
          <div className="row">
            <div className="col m6 s12" style={{ marginTop: "30px" }}>
              <ShowResult
                musicList={musicList}
                musicPlaying={musicPlaying}
                copyMusicList={copyMusicList}
                quantitySongs={quantitySongs}
                playOrNext={playOrNext}
                isDarkTheme={isDarkTheme}
                songCounter={songCounter}
                getSong={() => this.getSong()}
                startOver={() => this.startOver()}
              />
            </div>
            <div className="col m6 s12" style={{ marginTop: "30px" }}>
              <ShowVideo
                isBTClicked={isBTClicked}
                handleOriginalVideo={() => this.handleOriginalVideo()}
                handleBackingTrack={() => this.handleBackingTrack()}
                onVideoSelect={(video) => this.onVideoSelect(video)}
                isDarkTheme={isDarkTheme}
                selectedVideo={selectedVideo}
                videoSrc={videoSrc}
                videos={videos}
              />
            </div>
          </div>
        </div>
      );

    return <div className="container center">{checkLoading}</div>;
  }
}

const mapStateToProps = (state) => ({
  songs: state.firestore.ordered.songs,
  auth: state.firebase.auth,
  isDarkTheme: state.settings.isDarkTheme,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "songs", orderBy: ["createdAt", "desc"] }])
)(RandomSongs);