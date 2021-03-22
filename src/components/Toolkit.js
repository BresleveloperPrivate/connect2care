import React from 'react';
import { Link } from 'react-router-dom';
import ercatMovil from "../icons/ercatMovil.pdf";
import arrow from '../icons/Icon awesome-chevron-down.svg';

const Toolkit = () => {
  return(
    <div className='toolkit'>
      <button className='dropdownButton'>ארגז כלים למוביל מפגש&nbsp;<img src={arrow} alt='arrow' /></button>
      <ul className='dropdownMenu'>
        <li><Link to='/info'>שאלות ותשובות</Link></li>
        <li><a href={ercatMovil} target='_blank' without rel='noopener noreferrer'>ערכת מוביל מפגש</a></li>
        <li><Link to='/support'>תמיכה טכנית</Link></li>
      </ul>
    </div>
  )
}

export default Toolkit;

