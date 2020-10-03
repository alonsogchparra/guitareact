import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import lotus from "../../images/lotus.svg";
import black_lotus from "../../images/black_lotus.svg";
import * as actions from "../../store/actions";

class FloatButton extends Component {
  render() {
    const { isDarkTheme } = this.props;

    return (
      <div>
        <div className="hide-on-med-and-down fixed-action-btn">
          <a
            className={`btn-floating tooltipped btn-large ${
              isDarkTheme ? "cyan accent-4" : "grey darken-3"
            }`}
            data-position="left"
            data-tooltip="Settings"
            rel="noopener noreferrer"
            href
          >
            <i
              className={`large material-icons ${
                isDarkTheme ? "black-text" : "white-text"
              }`}
            >
              settings
            </i>
          </a>

          <ul>
            <li>
              <a
                className={`btn-floating tooltipped ${
                  isDarkTheme ? "cyan accent-4" : "grey darken-3"
                }`}
                href="https://alonsogchparra.web.app/"
                target="_blank"
                rel="noopener noreferrer"
                data-position="left"
                data-tooltip="Visit my website"
              >
                <i className={`${isDarkTheme ? "black-text" : "white-text"}`}>
                  <img src={isDarkTheme ? black_lotus : lotus} alt="" />
                </i>
              </a>
            </li>
            <li>
              <a
                className={`btn-floating tooltipped ${
                  isDarkTheme ? "cyan accent-4" : "grey darken-3"
                }`}
                href="mailto:alonsogparra@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                data-position="left"
                data-tooltip="Contact me by Email"
              >
                <i className={`${isDarkTheme ? "black-text" : "white-text"}`}>
                  <FontAwesomeIcon icon={faAt} />
                </i>
              </a>
            </li>
            <li>
              <a
                className={`btn-floating tooltipped ${
                  isDarkTheme ? "cyan accent-4" : "grey darken-3"
                }`}
                href="https://www.linkedin.com/in/alonso-parra/"
                target="_blank"
                rel="noopener noreferrer"
                data-position="left"
                data-tooltip="Contact me on Linked In"
              >
                <i className={`${isDarkTheme ? "black-text" : "white-text"}`}>
                  <FontAwesomeIcon icon={faLinkedin} />
                </i>
              </a>
            </li>
            <li>
              <a
                className={`btn-floating tooltipped ${
                  isDarkTheme ? "cyan accent-4" : "grey darken-3"
                }`}
                href="https://github.com/aliens9889"
                target="_blank"
                rel="noopener noreferrer"
                data-position="left"
                data-tooltip="Check my Repo"
              >
                <i className={`${isDarkTheme ? "black-text" : "white-text"}`}>
                  <FontAwesomeIcon icon={faGithub} />
                </i>
              </a>
            </li>
            <li>
              <a
                className={`btn-floating tooltipped ${
                  isDarkTheme ? "cyan accent-4" : "grey darken-3"
                }`}
                href="https://www.ultimate-guitar.com/"
                target="_blank"
                rel="noopener noreferrer"
                data-position="left"
                data-tooltip="Go to Ultimate-Guitar.com"
              >
                <i
                  className={`material-icons ${
                    isDarkTheme ? "black-text" : "white-text"
                  }`}
                >
                  library_music
                </i>
              </a>
            </li>
            <li>
              <a
                className={`btn-floating tooltipped ${
                  isDarkTheme ? "cyan accent-4" : "grey darken-3"
                }`}
                onClick={() => this.props.onChangeTheme()}
                data-position="left"
                data-tooltip={
                  isDarkTheme ? "Active Light Theme" : "Active Dark Theme"
                }
                href
              >
                <i
                  className={`material-icons ${
                    isDarkTheme ? "black-text" : "white-text"
                  }`}
                >
                  {isDarkTheme ? "brightness_7" : "brightness_3"}
                </i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isDarkTheme: state.settings.isDarkTheme,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeTheme: () => dispatch(actions.changeTheme()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FloatButton);