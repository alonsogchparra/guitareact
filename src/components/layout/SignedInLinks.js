/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { compose } from "redux";
import * as actions from "../../store/actions";

const SignedInLinks = ({ profile, onLogOut, history, isDarkTheme }) => {
  const backToSignIn = () => {
    onLogOut();
    history.push("/signin");
  };

  return (
    <div>
      <li>
        <NavLink
          to="/add"
          className={isDarkTheme ? "black-text" : "white-text"}
        >
          Add Song
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/list"
          className={isDarkTheme ? "black-text" : "white-text"}
        >
          Songs List
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/random"
          className={isDarkTheme ? "black-text" : "white-text"}
        >
          Random V1
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/random-version-two"
          className={isDarkTheme ? "black-text" : "white-text"}
        >
          Random V2
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/random-version-three"
          className={isDarkTheme ? "black-text" : "white-text"}
        >
          Random V3
        </NavLink>
      </li>
      <li>
        <a
          onClick={backToSignIn}
          className={isDarkTheme ? "black-text" : "white-text"}
        >
          Log Out
        </a>
      </li>
      <li>
        <NavLink
          to="/"
          className={`btn btn-floating ${
            isDarkTheme
              ? "grey darken-3 white-text"
              : "cyan accent-4 black-text"
          }`}
        >
          {profile.initials}
        </NavLink>
      </li>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isDarkTheme: state.settings.isDarkTheme,
});

const mapDispatchToProps = (dispatch) => ({
  onLogOut: () => dispatch(actions.logOut()),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SignedInLinks);
