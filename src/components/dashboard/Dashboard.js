/* eslint-disable no-lone-blocks */
import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { ReactComponent as Icon } from "../../guitareact_logo.svg";
import './Dashboard.css';

class Dashboard extends Component {
  state = {
    localSongs: [],
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
        localSongs: this.state.localSongs.concat(
          songs
            .filter((song) => song.userId === auth.uid)
            .map((song) => {
              return song.userId === auth.uid
                ? {
                    id: song.id,
                    songTitle: song.songTitle,
                    artist: song.artist,
                  }
                : [];
            })
        ),
      });
    }
  };

  render() {
    const { profile, auth, isDarkTheme } = this.props;
    const { localSongs } = this.state;
    if (!auth.uid) return <Redirect to="/signin" />;

    const songsQuantity = localSongs.length > 1 ? "songs" : "song";

    const songsContent =
      localSongs.length === 0 ? (
        <h2 className={isDarkTheme ? "white-text" : "black-text"}>
          Loading...
        </h2>
      ) : (
        <div>
          <div className="col s12">
            <div
              className={`card z-depth-3 ${
                isDarkTheme ? "cyan acent-4" : "grey darken-3"
              }`}
            >
              <div className="card-content">
                <div className="card-title" style={{ fontSize: "50px" }}>
                  <strong className={isDarkTheme ? "black-text" : "white-text"}>
                    You have added {localSongs.length} {songsQuantity}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    const checkLoading =
      localSongs.length === 0 ||
      localSongs === undefined ||
      localSongs === null ? (
        <div className="center-align" style={{ marginTop: "200px" }}>
          <Icon fill={isDarkTheme ? "#61DAFB" : "#212121"}  className="icon_logo" />
          <h1
            className={isDarkTheme ? "white-text" : "black-text"}
            style={{ marginTop: "-15px" }}
          >
            Loading...
          </h1>
        </div>
      ) : (
        <div>
          <div className="center-align">
            <Icon fill={isDarkTheme ? "#61DAFB" : "#212121"} className="icon_logo" />
            <h1 className={isDarkTheme ? "white-text" : "black-text"}>
              Welcome {profile.firstName} {profile.lastName}!
            </h1>
            <h2 className={isDarkTheme ? "white-text" : "black-text"}>
              Let's play some music or add new ones
            </h2>
            {songsContent}
          </div>
        </div>
      );

    return <div className="container">{checkLoading}</div>;
  }
}

const mapStateToProps = (state) => ({
  profile: state.firebase.profile,
  auth: state.firebase.auth,
  songs: state.firestore.ordered.songs,
  isDarkTheme: state.settings.isDarkTheme,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "songs", orderBy: ["createdAt", "desc"] }])
)(Dashboard);