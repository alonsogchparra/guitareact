import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as Icon } from "../../guitareact_logo.svg";
import "./Loading.css";

const Loading = ({ isDarkTheme }) => {
  return (
    <div className="loading_content">
      <div className="center-align">
        <Icon
          fill={isDarkTheme ? "#61DAFB" : "#212121"}
          className="icon_logo"
        />
        <h1
          className={isDarkTheme ? "white-text" : "black-text"}
          style={{ marginTop: "-15px" }}
        >
          Loading...
        </h1>
        <div>
          <h5
            className={isDarkTheme ? "white-text" : "black-text"}
            style={{ fontWeight: "500" }}
          >
            Remember add songs to play your music!
          </h5>
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
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isDarkTheme: state.settings.isDarkTheme,
});

export default connect(mapStateToProps)(Loading);