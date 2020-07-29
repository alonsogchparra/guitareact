import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { ReactComponent as Icon } from "../../../guitareact_logo.svg";
import "./RandomSongs.css";

class RandomSongs extends Component {
  state = {
    musicList: [],
    copyMusicList: [],
    musicItem: "",
    isClicked: false,
    songCounter: 0,
  };

  componentDidMount() {
    setTimeout(() => {
      this.checkSongs();
    }, 1000);
  }

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
      });
    }
  };

  startOver = () => {
    this.setState({
      musicList: this.state.copyMusicList,
      isClicked: false,
      songCounter: 0,
      musicItem: "",
    });
  };

  render() {
    const {
      musicList,
      musicItem,
      isClicked,
      copyMusicList,
      songCounter,
    } = this.state;

    const { isDarkTheme } = this.props;

    const quantitySongs = copyMusicList.length > 1 ? "songs" : "song";
    const playOrNext = isClicked ? "Next" : "Play";

    const musicPlaying =
      musicItem === "" ? null : (
        <div className="col s12 m6">
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

    const showResult =
      musicList.length > 0 ? (
        <div>
          <button
            className={`btn-large ${
              isDarkTheme ? "cyan accent-4" : "grey darken-3"
            } z-depth-0`}
            onClick={() => this.getSong()}
          >
            <strong className={isDarkTheme ? "black-text" : "white-text"}>
              {playOrNext}
            </strong>
          </button>
          {musicPlaying}
        </div>
      ) : (
        <div>
          <div>
            <button
              className={`btn-large ${
                isDarkTheme ? "cyan accent-4" : "grey darken-3"
              } z-depth-0`}
              onClick={() => this.startOver()}
            >
              <strong className={isDarkTheme ? "black-text" : "white-text"}>
                Play Again
              </strong>
            </button>
            <h5 className={isDarkTheme ? "white-text" : "black-text"}>
              <strong>
                {" "}
                You played all the songs on your list. <br />
                Do you want to start over?
              </strong>
            </h5>
          </div>
          {musicPlaying}
        </div>
      );

    const checkLoading =
      musicList.length === 0 && musicItem === "" ? (
        <div className="loading_content">
          <Icon width="100px" fill={isDarkTheme ? "#61DAFB" : "#212121"} />
          <h1 className={isDarkTheme ? "white-text" : "black-text"}>
            Loading...
          </h1>
        </div>
      ) : (
        <div>
          <div className="col m6">
            <Icon width="100px" fill={isDarkTheme ? "#61DAFB" : "#212121"} />
          </div>
          <h3 className={isDarkTheme ? "white-text" : "black-text"}>
            Play Random Songs
          </h3>
          <h4 className={isDarkTheme ? "white-text" : "black-text"}>
            You have {copyMusicList.length} {quantitySongs} on your list. Songs
            Played: {songCounter}
          </h4>
          <h4 className={isDarkTheme ? "white-text" : "black-text"}>
            Ready to play some good music?
          </h4>
          {showResult}
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