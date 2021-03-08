import React, { Component } from 'react';
import '../styles/donateFooter.css'
import donations from '../icons/donations.jpeg';

const DonateFooter = () => {

  return (
    <a href='https://ourbrothers.co.il/donate' target="_blank" rel="noopener noreferrer" className='donateContent'>
      <div className='iconContainer'>
        <img src={donations} alt="donate" className="donateIcon" /></div>
      <div className='donateText'>תרומה לעמותה</div>
    </a>
  )
}

export default DonateFooter;