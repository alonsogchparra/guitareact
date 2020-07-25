import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions';
import { ReactComponent as Icon } from '../../guitareact_logo.svg';
import './AddSong.css';


class AddSong extends Component {

  state = {
    songTitle: "",
    artist: "",
  };

  onChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    this.props.onAddSong(this.state);
    this.props.history.push("/");
  }

  render () {

    const { auth, isDarkTheme, songError } = this.props;

    if(!auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="container">
        <div className="row flex_content">
          <div className="col m6 s12 hide-on-small-only center-align">
            <Icon width="150px" fill={isDarkTheme ? "#61DAFB" : "#212121"} />
          </div>
          <div className="col m6 s12 addsong_content">
            <form onSubmit={this.onSubmitHandler}>
              <h5 className={isDarkTheme ? "white-text" : "black-text"}>
                Add Song
              </h5>
              <div className="input-field">
                <label
                  htmlFor="song"
                  className={isDarkTheme ? "white-text" : "black-text"}
                >
                  Song Title
                </label>
                <input
                  type="text"
                  name="songTitle"
                  id="songTitle"
                  onChange={this.onChangeHandler}
                  className={isDarkTheme ? "white-text" : "black-text"}
                  required
                />
              </div>
              <div className="input-field">
                <label
                  htmlFor="artist"
                  className={isDarkTheme ? "white-text" : "black-text"}
                >
                  Artist's or Band's Name
                </label>
                <input
                  type="text"
                  name="artirst"
                  id="artist"
                  onChange={this.onChangeHandler}
                  className={isDarkTheme ? "white-text" : "black-text"}
                  required
                />
              </div>
              <div className="input-field">
                <button
                  className={`btn ${
                    isDarkTheme ? "cyan accent-4 waves-effect waves-light" : "grey darken-3 waves-effect waves-light"
                  } z-depth-0`}
                >
                  <span className={isDarkTheme ? "black-text" : "white-text"}>
                    Add
                  </span>
                </button>
                <div className="red-text center">
                  {songError ? <strong>{songError}</strong> : null}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  songError: state.song.songError,
  isDarkTheme: state.settings.isDarkTheme,
});

const mapDispatchToProps = (dispatch) => ({
  onAddSong: (song) => dispatch(actions.addSong(song))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSong)