import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions";
import { ReactComponent as Icon } from "../../guitareact_logo.svg";
import "./SignUp.css";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.onSignUp(this.state);
  };

  render() {
    const { auth, authError, isDarkTheme } = this.props;

    if (auth.uid) return <Redirect to="/" />;

    return (
      <div className="container">
        <div className="row signup_content">
          <div className="col m6 s12 hide-on-small-only center-align logo_content">
            <Icon width="150px" fill={isDarkTheme ? "#61DAFB" : "#212121"} />
          </div>
          <div className="col m6 s12">
            <form onSubmit={this.submitHandler}>
              <h5 className={isDarkTheme ? "white-text" : "black-text"}>
                Sign Up
              </h5>
              <div className="input-field">
                <label
                  htmlFor="email"
                  className={isDarkTheme ? "white-text" : "black-text"}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={isDarkTheme ? "white-text" : "black-text"}
                  onChange={this.changeHandler}
                />
              </div>
              <div className="input-field">
                <label
                  htmlFor="firstname"
                  className={isDarkTheme ? "white-text" : "black-text"}
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className={isDarkTheme ? "white-text" : "black-text"}
                  onChange={this.changeHandler}
                />
              </div>
              <div className="input-field">
                <label
                  htmlFor="firstname"
                  className={isDarkTheme ? "white-text" : "black-text"}
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className={isDarkTheme ? "white-text" : "black-text"}
                />
              </div>
              <div className="input-field">
                <label
                  htmlFor="lastname"
                  className={isDarkTheme ? "white-text" : "black-text"}
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className={isDarkTheme ? "white-text" : "black-text"}
                />
              </div>
              <div className="input-field">
                <button
                  className={`btn z-depth-0 ${
                    isDarkTheme
                      ? "cyan accent-4 waves-effect waves-light"
                      : "grey darken-3 waves-effect waves-light"
                  }`}
                >
                  <span className={isDarkTheme ? "black-text" : "white-text"}>
                    Sign Up
                  </span>
                </button>
              </div>
              <div className="red-text center">
                {authError ? <strong>{authError}</strong> : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  authError: state.auth.authError,
  isDarkTheme: state.settings.isDarkTheme,
});

const mapDispatchToProps = (dispatch) => ({
  onSignUp: (newUser) => dispatch(actions.signUp(newUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);