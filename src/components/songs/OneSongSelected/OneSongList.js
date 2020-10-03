import React from 'react';
import OneSongListItem from './OneSongListItem';

const OneSongList = ({ videos, onVideoSelect }) => {
  const listOfVideos = videos.map((video, id) => (
    <OneSongListItem onVideoSelect={onVideoSelect} key={id} video={video} />
  ))
  return (
    <div className="row list_videos">
      {listOfVideos}
    </div>
  )
}

export default OneSongList
