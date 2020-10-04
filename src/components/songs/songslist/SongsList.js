import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect, Link } from "react-router-dom";
import { compose } from "redux";
import SongContent from "./SongContent";
import Loading from "../../loading/Loading";
import * as actions from "../../../store/actions";
import "./SongsList.css";

class SongsList extends Component {
  state = {
    songs: [],
    searchField: "",
  };

  componentDidMount() {
    this.setState({
      songs: this.state.songs.concat(this.props.songs),
    });
  }

  onSearchChange = (e) => {
    e.preventDefault();
    this.setState({ searchField: e.target.value });
  };

  render() {
    const { auth, isDarkTheme, onDeleteSong } = this.props;
    const { songs, searchField } = this.state;
    const filteredSongs = songs.filter(
      (song) =>
        song.artist.toLowerCase().includes(searchField.toLocaleLowerCase()) ||
        song.songTitle.toLowerCase().includes(searchField.toLocaleLowerCase())
    );

    const checkList =
      songs === null || songs === undefined || songs === "" ? (
        <Loading />
      ) : (
        <div className="dashboard container_custom">
          <div className="center-align">
            <h4 className={isDarkTheme ? "white-text" : "black-text"}>
              Never it's too late to learn a new song and add it to your list.
            </h4>
            <Link
              to="/addsong"
              className={`btn z-depth-0 ${
                isDarkTheme
                  ? "cyan accent-4 waves-effect waves-light"
                  : "grey darken-3 waves-effect waves-light"
              }`}
            >
              <span className={isDarkTheme ? "black-text" : "white-text"}>
                Add Song
              </span>
            </Link>
          </div>

          <nav className={isDarkTheme ? "search_dark" : "search_light"}>
            <div className="nav-wrapper">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div class="input-field">
                  <input
                    id="search"
                    type="search"
                    placeholder="Find your Song or Artist"
                    onChange={(e) => this.onSearchChange(e)}
                  />
                  <label className="label-icon" for="search">
                    <i
                      className={
                        isDarkTheme
                          ? "material-icons search_icon_dark"
                          : "material-icons search_icon_light"
                      }
                    >
                      search
                    </i>
                  </label>
                </div>
              </form>
            </div>
          </nav>

          <div className="row">
            <div className="project-list section">
              {filteredSongs &&
                filteredSongs.map((song) => {
                  return (
                    <SongContent
                      key={song.id}
                      song={song}
                      auth={auth}
                      onDeleteSong={onDeleteSong}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      );

    if (!auth.uid) return <Redirect to="/signin" />;

    return <div>{checkList}</div>;
  }
}

const mapStateToProps = (state) => ({
  songs: state.firestore.ordered.songs,
  auth: state.firebase.auth,
  isDarkTheme: state.settings.isDarkTheme,
});

const mapDispatchToProps = (dispatch) => ({
  onDeleteSong: (id) => dispatch(actions.deleteSong(id)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {
      collection: "songs",
      orderBy: ["createdAt", "desc"],
    },
  ])
)(SongsList);