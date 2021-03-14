import React from "react";
import "../styles/footer.css";
import { Link } from "react-router-dom";
import logo from "../icons/logo.svg";
import email from "../icons/email.svg";
import facebook from "../icons/facebook.svg";
import whatsapp from "../icons/whatsapp.svg";
import instagram from "../icons/CombinedShape.svg";
import youtube from "../icons/youtube.svg";
// import instagram from '../icons/instagram.svg';
import DonateFooter from './DonateButton';

const Footer = (props) => {
  return (
    <div>
      {/* <DonateFooter /> */}
      <div id="footer">
        <div className="footer-content">
          <div className="footer1 footer-section">
            <img src={logo} alt="logo" className="logo" />
          </div>
          {/* <div className="footer2 footer-section">
            <div className="footer-headline">ניווט</div>
            <div className="footer-links">
              <Link to="/">
                <div>דף הבית</div>
              </Link>
              <Link to="/meetings">
                <div>רשימת מפגשים</div>
              </Link>
              <Link to="/info">
                <div>שאלות</div>
              </Link>
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
              <Link to="/meetings">
                <div>מפת מפגשים</div>
              </Link>
              <Link to="/create-meeting">
                <div>אני רוצה לספר</div>
              </Link>
              <Link to="/create-meeting">
                <div>אני רוצה לארח</div>
              </Link>
              <Link to="/meetings">
                <div>אני רוצה להשתתף</div>
              </Link>
            </div>
          </div> */}
          <div className="footer4 footer-section" 
          // style={props.LanguageStore.lang === "heb" ? { marginRight: "1vw" } : { marginLeft: "1vw" }}
          >
            {/* <div className="footer-headline">פרטי התקשרות</div> */}
            <div className="footer-links">
              <div>
                אימייל:
                <br />
                <div className='email'>zikaron@ourbrothers.org</div>
              </div>
              <div className="icons">
                <a
                  href={"https://www.facebook.com/ourbrotherss"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div>
                    <img src={facebook} alt="facebook" className="icon" />
                  </div>
                </a>

                <a href={'mailto:zikaron@ourbrothers.org'} target="_blank" rel="noopener noreferrer">
                  <div>
                    <img src={email} alt="email" className="icon" />
                  </div>
                </a>

                <a
                  href={
                    "https://www.youtube.com/channel/UCgKTy9WBTcb2Udm0tqwIzAg"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div>
                    <img src={youtube} alt="youtube" className="youtube icon" />
                  </div>
                </a>

                <a
                  href={"https://www.instagram.com/ourbrothers2021/"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div>
                    <img src={instagram} alt="instagram" className="icon" />
                  </div>
                </a>
              </div>
              <a
                href={"https://ourbrothers.co.il/assets/docs/%D7%AA%D7%A0%D7%90%D7%99%20%D7%A9%D7%99%D7%9E%D7%95%D7%A9%20%D7%94%D7%90%D7%97%D7%99%D7%9D%20%D7%A9%D7%9C%D7%A0%D7%95.pdf"}
                target="_blank"
                rel="noopener noreferrer"
              >תקנון ותנאי שימוש</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Footer;
