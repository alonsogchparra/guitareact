import React, { Component } from "react";
import Loading from "../../loading/Loading";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import ImageGallery from "react-image-gallery";
import youtube from "../../../api/youtube";
import { key } from "../../../keys/youtube";
import { ReactComponent as Icon } from "../../../guitareact_logo.svg";
import "./RandomSongs.css";

export class RandomSongs extends Component {
  state = {
    musicList: [],
    copyMusicList: [],
    musicItem: "",
    isClicked: false,
    songCounter: 0,
    videos: [],
    isBTClicked: false,
    images: [],
    // ImageGallery
    showIndex: false,
    showBullets: false,
    infinite: true,
    showThumbnails: true,
    showFullscreenButton: true,
    showGalleryFullscreenButton: true,
    showPlayButton: true,
    showGalleryPlayButton: true,
    showNav: true,
    isRTL: false,
    slideDuration: 450,
    slideInterval: 2000,
    slideOnThumbnailOver: false,
    thumbnailPosition: "bottom",
    showVideo: {},
  };

  componentDidMount() {
    setTimeout(() => {
      this.checkSongs();
    }, 1000);
  }

  updateImages = (images) => {
    this.setState({
      images: images.map((image) => ({
        original: image.snippet.thumbnails.default.url,
        thumbnail: image.snippet.thumbnails.medium.url,
        embedUrl: `https://www.youtube.com/embed/${image.id.videoId}?rel=0&amp;autoplay=1`,
        description: image.snippet.title,
        renderItem: this._renderVideo.bind(this),
      })),
    });
  };

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

    const videoOptions = response.data.items;

    this.setState({
      videos: videoOptions,
      selectedVideo: response.data.items[0],
    });

    this.updateImages(videoOptions);
  };

  handleShowBTVideo = async (song, artist) => {
    const searchTerm = song + " " + artist + " backing Track";

    const response = await youtube.get("search", {
      params: {
        part: "snippet",
        maxResult: 5,
        key,
        q: searchTerm,
      },
    });

    const videoOptions = response.data.items;

    this.setState({
      videos: videoOptions,
      selectedVideo: response.data.items[0],
    });

    this.updateImages(videoOptions);
  };

  startOver = () => {
    this.setState({
      musicList: this.state.copyMusicList,
      isClicked: false,
      songCounter: 0,
      musicItem: "",
      videos: [],
    });
  };

  handleBackingTrack = () => {
    const { musicItem } = this.state;

    this.setState({
      isBTClicked: true,
      videos: [],
    });

    this.handleShowBTVideo(musicItem.songTitle, musicItem.artist);
  };

  handleOriginalVideo = () => {
    const { musicItem } = this.state;

    this.setState({
      isBTClicked: false,
      videos: [],
    });

    this.handleShowVideo(musicItem.songTitle, musicItem.artist);
  };

  //  IMAGE GALLERY METHODS

  _onSlide(index) {
    this._resetVideo();
    console.debug("slid to index", index);
  }

  _resetVideo() {
    this.setState({ showVideo: {} });

    if (this.state.showPlayButton) {
      this.setState({ showGalleryPlayButton: true });
    }

    if (this.state.showFullscreenButton) {
      this.setState({ showGalleryFullscreenButton: true });
    }
  }

  _toggleShowVideo(url) {
    this.state.showVideo[url] = !Boolean(this.state.showVideo[url]);
    this.setState({
      showVideo: this.state.showVideo,
    });

    if (this.state.showVideo[url]) {
      if (this.state.showPlayButton) {
        this.setState({ showGalleryPlayButton: false });
      }

      if (this.state.showFullscreenButton) {
        this.setState({ showGalleryFullscreenButton: false });
      }
    }
  }

  _renderVideo(item) {
    return (
      <div>
        {this.state.showVideo[item.embedUrl] ? (
          <div
            className="video-wrapper"
            style={{ position: "relative", paddingTop: "56.25%" }}
          >
            <a
              className="close-video"
              onClick={this._toggleShowVideo.bind(this, item.embedUrl)}
            ></a>
            <iframe
              src={item.embedUrl}
              frameBorder="0"
              allowFullScreen
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                maxHeight: "100%",
              }}
              allow="autoplay"
            ></iframe>
          </div>
        ) : (
          <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
            <div className="play-button"></div>
            <img className="image-gallery-image" src={item.original} />
            {item.description && (
              <span
                className="image-gallery-description"
                style={{ right: "0", left: "initial" }}
              >
                {item.description}
              </span>
            )}
          </a>
        )}
      </div>
    );
  }

  render() {
    const {
      musicList,
      musicItem,
      isClicked,
      copyMusicList,
      songCounter,
      videos,
      isBTClicked,
    } = this.state;

    const { isDarkTheme } = this.props;

    const quantitySongs = copyMusicList.length > 0 ? "songs" : "song";
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

    const showResult =
      musicList.length > 0 ? (
        <div className="col s12">
          <h5 className={isDarkTheme ? "white-text" : "black-text"}>
            You have{" "}
            <span className="music_number">{copyMusicList.length}</span>{" "}
            {quantitySongs} on your list. <br /> Songs Played:{" "}
            <span className="music_number">{songCounter}</span>
          </h5>
          <div className="col s12">
            <button
              className={`btn ${
                isDarkTheme ? "cyan accent-4" : "grey darken-3"
              } btn_track`}
              onClick={() => this.getSong()}
            >
              <strong className={isDarkTheme ? "black-text" : "white-text"}>
                {playOrNext}
              </strong>
            </button>
          </div>
          {musicPlaying}
        </div>
      ) : (
        <div className="col s12">
          <h5 className={isDarkTheme ? "white-text" : "black-text"}>
            You have{" "}
            <span className="music_number">{copyMusicList.length}</span>{" "}
            {quantitySongs} on your list. <br /> Songs Played:{" "}
            <span className="music_number">{songCounter}</span>
          </h5>
          <div className="col s12">
            <button
              className={`btn ${
                isDarkTheme ? "cyan accent-4" : "grey darken-3"
              } btn_track`}
              onClick={() => this.startOver()}
            >
              <strong className={isDarkTheme ? "black-text" : "white-text"}>
                Play Again
              </strong>
            </button>
            <h5 className={isDarkTheme ? "white-text" : "black-text"}>
              You played all the songs on your list. <br />
              Do you want to start over?
            </h5>
          </div>
          {musicPlaying}
        </div>
      );

    const backingTrackOrVideo = isBTClicked ? (
      <div>
        <div>
          <button
            className={`btn ${
              isDarkTheme ? "cyan accent-4" : "grey darken-3"
            } btn_track`}
            onClick={() => this.handleOriginalVideo()}
          >
            <strong className={isDarkTheme ? "black-text" : "white-text"}>
              Original Song
            </strong>
          </button>
        </div>
        <div>
          <ImageGallery
            items={this.state.images}
            lazyLoad={false}
            onImageLoad={this._onImageLoad}
            onSlide={this._onSlide.bind(this)}
            infinite={this.state.infinite}
            showBullets={this.state.showBullets}
            showFullscreenButton={
              this.state.showFullscreenButton &&
              this.state.showGalleryFullscreenButton
            }
            showPlayButton={
              this.state.showPlayButton && this.state.showGalleryPlayButton
            }
            showThumbnails={this.state.showThumbnails}
            showIndex={this.state.showIndex}
            showNav={this.state.showNav}
            isRTL={this.state.isRTL}
            thumbnailPosition={this.state.thumbnailPosition}
            slideDuration={parseInt(this.state.slideDuration)}
            slideInterval={parseInt(this.state.slideInterval)}
            slideOnThumbnailOver={this.state.slideOnThumbnailOver}
            additionalClass="app-image-gallery"
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
            onClick={() => this.handleBackingTrack()}
          >
            <strong className={isDarkTheme ? "black-text" : "white-text"}>
              Guitar Backing Track
            </strong>
          </button>
        </div>
        <div>
          <ImageGallery
            items={this.state.images}
            lazyLoad={false}
            onImageLoad={this._onImageLoad}
            onSlide={this._onSlide.bind(this)}
            infinite={this.state.infinite}
            showBullets={this.state.showBullets}
            showFullscreenButton={
              this.state.showFullscreenButton &&
              this.state.showGalleryFullscreenButton
            }
            showPlayButton={
              this.state.showPlayButton && this.state.showGalleryPlayButton
            }
            showThumbnails={this.state.showThumbnails}
            showIndex={this.state.showIndex}
            showNav={this.state.showNav}
            isRTL={this.state.isRTL}
            thumbnailPosition={this.state.thumbnailPosition}
            slideDuration={parseInt(this.state.slideDuration)}
            slideInterval={parseInt(this.state.slideInterval)}
            slideOnThumbnailOver={this.state.slideOnThumbnailOver}
            additionalClass="app-image-gallery"
          />
        </div>
      </div>
    );

    const showVideoGallery =
      videos.length > 0 ? (
        <div className="col s12" style={{ height: "70%" }}>
          {backingTrackOrVideo}
        </div>
      ) : (
        <div className="col s12">
          <Icon width="300px" fill={isDarkTheme ? "#61DAFB" : "#212121"} />
        </div>
      );

    const checkLoading =
      musicList.length === 0 && musicItem === "" ? (
        <Loading />
      ) : (
        <div>
          <h5
            className={`title_version_three ${
              isDarkTheme ? "white-text" : "black-text"
            }`}
          >
            Play Random Songs
          </h5>
          <h6 className={isDarkTheme ? "white-text" : "black-text"}>
            Ready to play some good music?
          </h6>
          <div className="row flex_custom">
            <div className="col m6 s12 show_result">{showResult}</div>
            <div className="col m6 s12">{showVideoGallery}</div>
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