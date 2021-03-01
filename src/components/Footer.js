import React from 'react';
import '../styles/footer.css';
import { Link } from 'react-router-dom';
import logo from '../icons/logo.svg';
import email from '../icons/email.svg';
import facebook from '../icons/facebook.svg';
import whatsapp from '../icons/whatsapp.svg';
import instagram from '../icons/instagram.svg';
// import instagram from '../icons/instagram.svg';

const Footer = (props) => {
  return(
    <div id = 'footer'>
      <div className='footer1 footer-section'>
        <div><img src={logo} alt='logo' className='logo' /></div>
      </div>
      <div className='footer2 footer-section'>
        <div className='footer-headline'>
          ניווט
        </div>
        <div className='footer-links'>
          <Link to='/' target="_blank"><div>דף הבית</div></Link>
          <Link to='/meetings' target="_blank"><div>רשימת מפגשים</div></Link>
          {/*<Link to='/' target="_blank"><div>שאלות</div></Link>*/}
          <Link to='/contact' target="_blank"><div>צור קשר</div></Link>
          <Link to='/support' target="_blank"><div>תמיכה</div></Link>
        </div>
      </div>
      <div className='footer3 footer-section'>
        <div className='footer-headline'>
          רשימת מפגשים
        </div>
        <div className='footer-links'>
        <Link to='/' target="_blank"><div>מפת מפגשים</div></Link>
        <Link to='/' target="_blank"><div>אני רוצה לספר</div></Link>
        <Link to='/' target="_blank"><div>אני רוצה לארח</div></Link>
        <Link to='/' target="_blank"><div>אני רוצה להשתתף</div></Link>
        </div>
      </div>
      <div className='footer4 footer-section'>
        <div className='footer-headline'>
          פרטי התקשרות
        </div>
        <div className='footer-links'>
        <div>טלפון: 058-409-4624</div>
        <div>אימייל: info@ourbrothers.org</div>
          <div className='icons'>
          <Link to='/' target="_blank"><div><img src={facebook} alt='facebook' className='icon' /></div></Link>
          <Link to='/' target="_blank"><div><img src={email} alt='email' className='icon' /></div></Link>
          <Link to='/' target="_blank"><div>{/* <img src={} alt='youtube' className='icon' /> */}</div></Link>
          <Link to='/' target="_blank"><div><img src={whatsapp} alt='whatsapp' className='icon' /></div></Link>
          <Link to='/' target="_blank"><div><img src={instagram} alt='instagram' className='icon' /></div></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;