import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const SignedOutLinks = ({ isDarkTheme }) => {
  return (
    <ul className="right">
      <li>
        <NavLink
          to="/signin"
          className={isDarkTheme ? "black-text" : "white-text"}
        >
          Sign In
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/signup"
          className={isDarkTheme ? "black-text" : "white-text"}
        >
          Sign Up
        </NavLink>
      </li>
    </ul>
  );
};

const mapStateToProps = (state) => ({
  isDarkTheme: state.settings.isDarkTheme,
});

export default connect(mapStateToProps)(SignedOutLinks);
