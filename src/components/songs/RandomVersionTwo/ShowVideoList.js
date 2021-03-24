import React from "react";
import ShowVideoItem from "./ShowVideoItem";

const ShowVideoList = ({ videos, onVideoSelect }) => {
  const listOfVideos = videos.map((video, id) => (
    <ShowVideoItem onVideoSelect={onVideoSelect} key={id} video={video} />
  ));

  return <div className="row list_videos">{listOfVideos}</div>;
};

export default ShowVideoList;
