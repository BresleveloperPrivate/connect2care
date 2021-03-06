import React from "react";
import "../styles/footer.css";
import { Link } from "react-router-dom";
import logo from "../icons/logo.svg";
import email from "../icons/email.svg";
import facebook from "../icons/facebook.svg";
import whatsapp from "../icons/whatsapp.svg";
import instagram from "../icons/CombinedShape.svg";
import youtube from '../icons/youtube.svg';
// import instagram from '../icons/instagram.svg';

const Footer = (props) => {
  return (
    <div id="footer">
      <div className="footer-content">
        <div className="footer1 footer-section">
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div className="footer2 footer-section">
          <div className="footer-headline">ניווט</div>
          <div className="footer-links">
            <Link to="/">
              <div>דף הבית</div>
            </Link>
            <Link to="/meetings">
              <div>רשימת מפגשים</div>
            </Link>
            {/*<Link to='/'><div>שאלות</div></Link>*/}
            <Link to="/contact">
              <div>צור קשר</div>
            </Link>
            <Link to="/support">
              <div>תמיכה</div>
            </Link>
          </div>
        </div>
        <div className="footer3 footer-section">
          <div className="footer-headline">רשימת מפגשים</div>
          <div className="footer-links">
            <Link to="/listOfMeetingsUser">
              <div>מפת מפגשים</div>
            </Link>
            <Link to="/">
              <div>אני רוצה לספר</div>
            </Link>
            <Link to="/create-meeting">
              <div>אני רוצה לארח</div>
            </Link>
            <Link to="/meetings">
              <div>אני רוצה להשתתף</div>
            </Link>
          </div>
        </div>
        <div className="footer4 footer-section">
          <div className="footer-headline">פרטי התקשרות</div>
          <div className="footer-links">
            <div>טלפון:<br />058-409-4624</div>
            <div>אימייל:<br />info@ourbrothers.org</div>
            <div className="icons">

              <a href={'https://www.facebook.com/ourbrotherss'} target="_blank" rel="noopener noreferrer">
                <div>
                  <img src={facebook} alt="facebook" className="icon" />
                </div>
              </a>

              {/* <a href={'https://www.youtube.com/channel/UCgKTy9WBTcb2Udm0tqwIzAg'} target="_blank" rel="noopener noreferrer">
                <div>
                  <img src={email} alt="email" className="icon" />
                </div>
              </a> */}

              <a href={'https://www.youtube.com/channel/UCgKTy9WBTcb2Udm0tqwIzAg'} target="_blank" rel="noopener noreferrer">
                <div>
                  <img src={youtube} alt='youtube' className='youtube icon' />
                  </div>
              </a>
                
              {/* <a href={'https://www.youtube.com/channel/UCgKTy9WBTcb2Udm0tqwIzAg'} target="_blank" rel="noopener noreferrer">
                <div>
                  <img src={whatsapp} alt="whatsapp" className="icon" />
                </div>
              </a> */}

              <a href={'https://www.instagram.com/ourbrothers2021/'} target="_blank" rel="noopener noreferrer">
                <div>
                  <img src={instagram} alt="instagram" className="icon" />
                </div>
              </a>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
