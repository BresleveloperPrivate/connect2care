import React from "react";
import "../styles/openingvideo.css";

const OpeningVideo = () => {
  return (
    <div className="opening-video">
      <iframe
        title='video'
        width="716"
        height="403"
        src='https://www.youtube.com/embed/jtR6HF3MQKw?rel=0&autoplay=1&mute=1&loop=1'
        frameborder='0'
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default OpeningVideo;
