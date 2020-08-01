import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { ReactComponent as Icon } from "../../../guitareact_logo.svg";
import * as actions from "../../../store/actions";
import "../AddSong.css";

class EditSong extends Component {
  state = {
    songTitle: "",
    artist: "",
  };

  componentDidMount() {
    this.setState({
      songTitle: this.props.song.songTitle,
      artist: this.props.song.artist,
    });
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    this.props.onEditSong(this.props.match.params.id, this.state);
    this.props.history.push("/list");
  };

  render() {
    const { isDarkTheme } = this.props;

    return (
      <div className="container">
        <div className="row flex_content">
          <div className="col m6 s12 hide-on-small-only center-align">
            <Icon width="150px" fill={isDarkTheme ? "#61DAFB" : "#212121"} />
          </div>
          <div className="col m6 s12 addsong_content">
            <form onSubmit={this.onSubmitHandler}>
              <h5 className={isDarkTheme ? "white-text" : "black-text"}>
                Edit Song
              </h5>
              <div className="input-field">
                <label
                  htmlFor="song"
                  className={`active ${
                    isDarkTheme ? "white-text" : "black-text"
                  }`}
                >
                  Song Title
                </label>
                <input
                  type="text"
                  value={this.state.songTitle}
                  name="songTitle"
                  id="songTitle"
                  onChange={this.onChangeHandler}
                  required
                  className={isDarkTheme ? "white-text" : "black-text"}
                />
              </div>
              <div className="input-field">
                <label
                  htmlFor="artist"
                  className={`active ${
                    isDarkTheme ? "white-text" : "black-text"
                  }`}
                >
                  Namd of Artist or Band
                </label>
                <input
                  type="text"
                  value={this.state.artist}
                  name="artist"
                  id="artist"
                  onChange={this.onChangeHandler}
                  className={isDarkTheme ? "white-text" : "black-text"}
                  required
                />
              </div>
              <div className="input-field">
                <button
                  className={`btn ${
                    isDarkTheme
                      ? "cyan accent-4 waves-effect waves-light"
                      : "grey darken-3 waves-effect waves-light"
                  } z-depth-0`}
                >
                  <span className={isDarkTheme ? "black-text" : "white-text"}>
                    Update
                  </span>
                </button>
              </div>
            </form>
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
    auth: state.firebase.auth,
    song,
    isDarkTheme: state.settings.isDarkTheme,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onEditSong: (id, song) => dispatch(actions.editSong(id, song)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "songs" }])
)(EditSong);