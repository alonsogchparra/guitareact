import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./SongContent.css";

const SongContent = ({ song, auth, onDeleteSong, isDarkTheme }) => {
  return auth.uid === song.userId ? (
    <div className="col s12 m4">
      <div
        className={`card z-depth-2 song-summary ${
          isDarkTheme ? "cyan accent-4" : "grey darken-3"
        }`}
      >
        <div className="card-content grey-text text-darken-3">
          <div className="card-title">
            <span className={isDarkTheme ? "black-text" : "white-text"}>
              <strong>{song.songTitle}</strong>
            </span>
          </div>
          <p className={isDarkTheme ? "black-text" : "white-text"}>
            <strong>{song.artist}</strong>
          </p>
          <p className={isDarkTheme ? "black-text" : "white-text"}>
            Posted by {song.userFirstName} {song.userLastName}
          </p>
          <div className={isDarkTheme ? "black-text" : "white-text"}>
            {moment(song.createdAt.toDate()).calendar()}
          </div>
        </div>
        <div
          className={
            isDarkTheme ? "card-action card_dark" : "card-action card_default"
          }
        >
          <button
            className={`btn ${
              isDarkTheme
                ? "red darken-4 waves-effect waves-light"
                : "red waves-effect waves-light"
            } btn_delete`}
            onClick={() => onDeleteSong(song.id)}
          >
            <span className={isDarkTheme ? "white-text" : "black-text"}>
              Delete
            </span>
          </button>
          <Link
            className={`btn ${
              isDarkTheme
                ? "light-green darken-4 waves-effect waves-light"
                : "light-green waves-effect waves-light"
            } btn_edit`}
            to={`/edit/${song.id}`}
          >
            <span className={isDarkTheme ? "white-text" : "black-text"}>
              Edit
            </span>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

const mapStateToProps = (state) => ({
  isDarkTheme: state.settings.isDarkTheme,
});

export default connect(mapStateToProps)(SongContent);