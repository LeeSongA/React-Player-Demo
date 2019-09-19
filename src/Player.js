import React from "react";
import ReactPlayer from "react-player";
import "./Player.css";

const Player = () => (
  <div className="player-wrapper">
    <ReactPlayer
      url="https://firebasestorage.googleapis.com/v0/b/medflix3.appspot.com/o/test.mp4?alt=media&token=a056bf88-6cc4-4707-94dd-5cee00a95c6f"
      className="react-player"
      playing
      width="80%"
      height="80%"
      controls={true}
    />
  </div>
);

export default Player;
