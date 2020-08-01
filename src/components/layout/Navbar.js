import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import SignedOutLinks from "./SignedOutLinks";
import SignedInLinks from "./SignedInLinks";
import * as actions from "../../store/actions";
import './Navbar.css';

class Navbar extends Component {
  render() {
    const { auth, profile, onLogOut, isDarkTheme } = this.props;
    const links = auth.uid ? (
      <SignedInLinks profile={profile} />
    ) : (
      <SignedOutLinks />
    );
    const checkIsLoaded = isLoaded(auth) ? links : "";

    const sideNavLinks = auth.uid ? (
      <div>
        <li className="sidenav-close">
          <NavLink to="/addsong">Add Song</NavLink>
        </li>
        <li className="sidenav-close">
          <NavLink to="/list">Songs List</NavLink>
        </li>
        <li className="sidenav-close">
          <NavLink to="/random">Random V1</NavLink>
        </li>
        <li className="sidenav-close">
          <NavLink to="/random-version-two">Random V2</NavLink>
        </li>
        <li className="sidenav-close">
          <NavLink to="/random-version-three">Random V3</NavLink>
        </li>
        <li className="sidenav-close">
          <button
            style={{ width: "100%" }}
            className={`btn btn-block ${
              isDarkTheme ? "cyan accent-4" : "grey darken-3"
            }`}
            onClick={() => this.props.onChangeTheme()}
          >
            {isDarkTheme ? "Light Theme" : "Dark Theme"}
          </button>
        </li>
        <li className="sidenav-close">
          <a className="logout" onClick={onLogOut}>
            Log Out
          </a>
        </li>
      </div>
    ) : (
      <div>
        <li className="sidenav-close">
          <NavLink to="/signin">Sign In</NavLink>
        </li>
        <li className="sidenav-close">
          <NavLink to="/signup">Sign Up</NavLink>
        </li>
        <li className="sidenav-close">
          <button
            style={{ width: "100%" }}
            className={`btn btn-block ${
              isDarkTheme ? "cyan accent-4" : "grey darken-3"
            }`}
            onClick={() => this.props.onChangeTheme()}
          >
            {isDarkTheme ? "Light Theme" : "Dark Theme"}
          </button>
        </li>
      </div>
    );

    const sideNavCheckIsLoaded = isLoaded(auth) ? sideNavLinks : "";

    return (
      <div>
        <div className="nav-wrapper">
          <nav className={isDarkTheme ? "cyan accent-4" : "grey darken-3"}>
            <div className="container">
              <Link to="/" className="brand-logo">
                GuitaReact
              </Link>
              <a href="#" data-target="mobile-demo" className="sidenav-trigger">
                <i className="material-icons">menu</i>
              </a>
              <ul className="right hide-on-med-and-down">{checkIsLoaded}</ul>
            </div>
          </nav>
        </div>

        <ul className="sidenav" id="mobile-demo">
          {sideNavCheckIsLoaded}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  isDarkTheme: state.settings.isDarkTheme,
});

const mapDispatchToProps = (dispatch) => ({
  onLogOut: () => dispatch(actions.logOut()),
  onChangeTheme: () => dispatch(actions.changeTheme())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
