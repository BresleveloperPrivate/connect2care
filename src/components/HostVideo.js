import React from "react";
import "../styles/hostVideo.css";

const HostVideo = (props) => {
  return (
    <div className="host-video">
      <iframe
        title='video'
        width="716"
        height="403"
        src='https://www.youtube.com/embed/WTJAOPVBg_s?rel=0&autoplay=1&mute=1&loop=1'
        frameborder='0'
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default HostVideo;