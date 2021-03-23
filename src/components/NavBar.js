import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import "../styles/navbar.scss";
import ourBrothers from "../icons/oblogo.png";
import c2c from "../icons/logo.svg";
import logoEnglish from "../icons/logoEnglish.jpg";
import menu from "../icons/menu.svg";
import SideNavBar from "./SideNavBar";
import { withRouter, Link } from "react-router-dom";
// import '../styles/animations.scss'
// import Language from './Language';
import Lng from "./Lng";

import logo10 from "../icons/logo10.png";
import hilma from "../icons/hilmasquare.png";
import matnas from "../icons/logo11.png";
// import tzahal from '../icons/tzahal.png'
import DonateButton from "./DonateButton";
import ercatMovil from "../icons/ercatMovil.pdf";
import englishErcatMovil from '../icons/englishErcatMovil.pdf'
import englishLogo2 from "../icons/logoEnglish2.jpg";
import arrow from '../icons/Icon awesome-chevron-down.svg';
import Toolkit from './Toolkit';
import '../styles/toolkit.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      right: false,
      width: 0,
    };
    this.setOptions();
  }

  componentDidMount = () => {
    window.addEventListener("resize", this.onResize, false);
    this.props.LanguageStore.setWidth(window.innerWidth);
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  onResize = (e) => {
    this.props.LanguageStore.setWidth(e.target.innerWidth);
    this.setState({ width: e.target.innerWidth, height: e.target.innerHeight });
  };

  // This function open the side nav bar or close it, depends of the situation
  toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    this.setState({ right: open });
  };

  setOptions = (lng) => {
    this.options = [
      { option: this.props.t("homePage"), path: "/" },
      { option: this.props.t("meetingsList"), path: "/meetings" },
      // { option: this.props.t("myMeetings"), path: '/my-meetings' },
      // { option: this.props.t("qna"), path: "/info" },
      // { option: this.props.t("hosting"), path: '/hosting' },
      // { option: this.props.t("toolkit"), path: "/toolkit" },

      // {
      //   option: (
      //     <div className="ercatMovil">
      //       <a
      //         href={ercatMovil}
      //         without
      //         rel="noopener noreferrer"
      //         target="_blank"
      //       >
      //         {this.props.t("toolkit")}
      //           &nbsp;<img src={arrow} alt='arrow' />
      //       </a>
      //     </div>
      //   ),
      // },
      
      {
        option: (
          // <div className="ercatMovil">
          //     {this.props.t("toolkit")}
          //       &nbsp;<img src={arrow} alt='arrow' />
            <div className='toolkit'>
              <button className='dropdownButton'>{this.props.t("hosting")}&nbsp;<img src={arrow} alt='arrow' /></button>
              <ul className='dropdownMenu'>
                <li><Link to='/info'>{this.props.t("qna")}</Link></li>
                <li><a href={this.props.LanguageStore.lang === "heb"?ercatMovil:englishErcatMovil} target='_blank' without rel='noopener noreferrer'>{this.props.t("toolkit")}</a></li>
                <li><a href={ercatMovil} target='_blank' without rel='noopener noreferrer'>{this.props.t("hostVideo")}</a></li>
                <li><a href={ercatMovil} target='_blank' without rel='noopener noreferrer'>{this.props.t("workshop")}</a></li>
                {/* <li><Link to='/support'>{this.props.t("support")}</Link></li> */}
              </ul>
          </div>
          // </div>
        ),
      },


      // {
      //   option: 
      //   <div>
      //     <a href={lng==='heb'? "https://ourbrothers.co.il/donate?referer=connect-2-care" : "https://www.jgive.com/new/en/ils/external/charity-organizations/2278"} target="_blank" without rel="noopener noreferrer">
      //       {lng==="heb"?"תרומה לעמותה":"Donate Us"}
      //     </a>
      //   </div>
      // },

      {
        option: this.props.t("donate"),
        path: this.props.LanguageStore.lang === "heb"
        ? "https://ourbrothers.co.il/donate?referer=connect-2-care"
        : "https://www.jgive.com/new/en/ils/external/charity-organizations/2278" ,
        open: true,
      },

      { option: this.props.t("contactUs"), path: "/contact" },
    ];
  };

  changelng = (lng) => {
    this.props.changeLanguage(lng);
    this.setOptions();
    this.forceUpdate();
  };

  render() {
    return (
      <div
        className={
          this.props.LanguageStore.lang !== "heb"
            ? "navbar " + this.props.className + " fdrr"
            : "navbar " + this.props.className
        }
      >
        <div className="containMenu">
          <img
            onClick={this.toggleDrawer(true)}
            className="pointer"
            src={menu}
            alt="menu"
            style={{ height: "30%" }}
          />
        </div>
        {/* <div className='containLanguage'>
                    <Language changeLanguage={this.changelng} />
                </div> */}
        {this.options && (
          <div
            // style={this.props.LanguageStore.lang !== 'heb' ? {flexDirection: 'row-reverse'} : {}}
            className="navbarOptions"
          >
            {/* <div className='optionInNavbar lngNB pointer'>
                    <Lng changeLanguage={this.changelng} />
                </div> */}

            {this.state.width > 900 || this.state.height > 1200 ? (
              <div className="containIconNavbar">
                {this.props.LanguageStore.lang !== "heb" ? (
                  <img
                    onClick={() => {
                      this.props.history.replace("/");
                    }}
                    alt="alt"
                    src={englishLogo2}
                    height="140%"
                  />
                ) : (
                  <img
                    onClick={() => {
                      this.props.history.replace("/");
                    }}
                    alt="alt"
                    src={c2c}
                    height="120%"
                  />
                )}
              </div>
            ) : null}

            {this.options.map((value, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    !value.open
                      ? this.props.history.push(value.path)
                      : window.open(value.path);
                  }}
                  className="optionInNavbar grow-bold pointer"
                >
                  {value.option}
                </div>
              );
            })}

            <div style={{ flexGrow: 1 }}></div>

            {/* <div className='containIconNavbar'>
                        <img onClick={() => {
                            window.open('https://www.hilma.tech/')
                        }} alt="alt" src={hilma} height='60%'/>
                    </div> */}

            <div className="navbarLeft">
              {/* 
                        <DonateButton /> */}

              <div className="optionInNavbar lngNB pointer">
                <Lng changeLanguage={this.changelng} />
              </div>

              <div className="ourBrothersLink">
                <a
                  href="https://ourbrothers.co.il/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {this.props.LanguageStore.lang !== "heb"
                    ? "Our Brothers"
                    : "האחים שלנו"}
                </a>
              </div>
            </div>

            {this.state.width <= 900 && this.state.height <= 1200 && (
              <div
                className="containIconNavbar"
                style={{ alignItems: "center"}}
              >
                {this.props.LanguageStore.lang !== "heb"?
                  <img
                  onClick={() => {
                    this.props.history.replace("/");
                  }}
                  alt="alt"
                  src={englishLogo2}
                  height="90%"
                  style={{display:'flex', position: 'absolute', left: '5vw'}}
                />
                :
                <img
                  onClick={() => {
                    this.props.history.replace("/");
                  }}
                  alt="alt"
                  src={c2c}
                  height="135%"
                />}
              </div>
            )}

            {/* <div className={this.props.LanguageStore.lang !== 'heb' ? 'navbarIcon fdrr' : 'navbarIcon'}> */}

            {/* </div> */}

            <SideNavBar
              history={this.props.history}
              changeLanguage={this.changelng}
              toggleDrawer={this.toggleDrawer}
              options={this.options}
              right={this.state.right}
            />
          </div>
        )}
      </div>
    );
  }
}

// export default withRouter(NavBar);
export default inject("LanguageStore")(observer(withRouter(NavBar)));
