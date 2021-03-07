import React, { Component } from 'react';
import responsiveImage from '../icons/responsiveImage.png';
import '../styles/responsiveImage.css';

const ResponsiveImage = (props) => {
  return(
    <div className='responsiveImage'>
      <img src={responsiveImage} alt='responsiveImage' />
    </div>
  )
}

export default ResponsiveImage;