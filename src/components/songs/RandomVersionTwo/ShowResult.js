import React from "react";

const ShowResult = ({
  musicList,
  musicPlaying,
  copyMusicList,
  quantitySongs,
  playOrNext,
  isDarkTheme,
  songCounter,
  getSong,
  startOver,
}) => {
  return musicList.length > 0 ? (
    <div className="col s12">
      <h5 className={isDarkTheme ? "white-text" : "black-text"}>
        You have <span className="music_number">{copyMusicList.length}</span> {quantitySongs} on your list. <br />{" "}
        Songs Played: <span className="music_number">{songCounter}</span>
      </h5>
      <div className="col s12">
        <button
          className={`btn ${
            isDarkTheme ? "cyan accent-4" : "grey darken-3"
          } z-depth-0 btn_track `}
          onClick={() => getSong()}
        >
          <strong className={isDarkTheme ? "black-text" : "white-text"}>
            {playOrNext}
          </strong>
        </button>
      </div>
      {musicPlaying}
    </div>
  ) : (
    <div className="col s12">
      <h5 className={isDarkTheme ? "white-text" : "black-text"}>
        You have {copyMusicList.length} {quantitySongs} on your list. <br />{" "}
        Songs Played: {songCounter}
      </h5>
      <div className="col s12">
        <button
          className={`btn ${
            isDarkTheme ? "cyan accent-4" : "grey darken-3"
          } btn_track`}
          onClick={() => startOver()}
        >
          <strong className={isDarkTheme ? "black-text" : "white-text"}>
            Play Again
          </strong>
        </button>
        <h5 className={`you_played_all ${isDarkTheme ? "white-text" : "black-text"}`}>
          You played all the songs on your list. <br />
          Do you want to start over?
        </h5>
      </div>
      {musicPlaying}
    </div>
  );
};

export default ShowResult;