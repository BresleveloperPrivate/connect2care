import React from "react";
import "../styles/openingvideo.css";

const OpeningVideo = () => {
  return (
    <div className="opening-video">
      <iframe
        title='video'
        width='100%'
        height='100%'
        src='https://www.youtube.com/embed/c2dXt6aHem8?rel=0&autoplay=1&mute=1'
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default OpeningVideo;
