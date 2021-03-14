import React from 'react';
import Phone from '../icons/phone.svg'
import Email from '../icons/email-green.svg'
import { inject, observer } from 'mobx-react';
import instagram from '../icons/instagram.svg'
import SupportForm from './SupportForm';
import './../styles/contact.css';
import { Link } from "react-router-dom";

const Info = (props) => {
    return (
        <div id="contactPage" style={props.LanguageStore.lang === "heb" ? { textAlign: "center" } : { textAlign: "left" }}>

            {/*<div className="contactHeadLine">{props.LanguageStore.lang === "heb" ? "צור קשר" : "Contact Us"}</div>
            <div className="contactSecondSentence">{props.LanguageStore.lang === "heb" ? "נשמח לעזור בכל נושא. השאירו הודעה והצוות הנפלא שלנו יחזור אליכם" : "We would be happy to help with any issue. Leave a message and our wonderful team will get back to you"}</div>*/}

            <div className="contactHeadLine">{props.LanguageStore.lang === "heb" ? "צרו קשר" : "Contact Us"}</div>

            {/* <SupportForm /> */}

            {/* <div className="d-flex align-items-center margin-right-left-text">
                <img src={Phone} style={{ width: "30px" }} />
                <div className="textContact" style={props.LanguageStore.lang === "heb" ? { marginRight: "4vw" } : { marginLeft: "4vw" }}>058-409-4624</div>
            </div> */}
            <div className="d-flex align-items-center margin-right-left-text contactMail">
                <img className="" src={Email} style={{ width: "30px" }} />
                <div className="textContact" style={props.LanguageStore.lang === "heb" ? { marginRight: "1vw" } : { marginLeft: "1vw" }}>Zikaron@ourbrothers.org</div>
            </div>

            <div className="d-flex align-items-center margin-right-left-text contactSocial">

                <div className="facebook-div" onClick={() => { window.open("https://www.facebook.com/ourbrotherss") }} style={props.LanguageStore.lang === "heb" ? { marginLeft: "2vh" } : { marginRight: "2vh" }} >
                    <div className="">Facebook</div>
                    <div className="contactFacebookImg" style={props.LanguageStore.lang === "heb" ? { marginRight: "1vh" } : { marginLeft: "1vh" }}></div>
                </div>

                <div className="facebook-div" onClick={() => { window.open("https://www.instagram.com/ourbrothers2021/") }} style={props.LanguageStore.lang === "heb" ? { marginLeft: "2vh" } : { marginRight: "2vh" }}>
                    <div>Instagram</div>
                    <img src={instagram} style={props.LanguageStore.lang === "heb" ? { width: "20px", marginRight: "1vh" } : { width: "20px", marginLeft: "1vh" }} />
                </div>

                <div className="facebook-div" onClick={() => { window.open("https://www.youtube.com/channel/UCgKTy9WBTcb2Udm0tqwIzAg") }}>
                    <div>Youtube</div>
                    <img src={instagram} style={props.LanguageStore.lang === "heb" ? { width: "20px", marginRight: "1vh" } : { width: "20px", marginLeft: "1vh" }} />
                </div>
            </div>

            <div className="contactSecondSentence">{props.LanguageStore.lang === "heb" ? "לתמיכה טכנית" : "For technical support"}</div>

            <div className="d-flex align-items-center margin-right-left-text contactMail">
                <img className="" src={Email} style={{ width: "30px" }} />
                <div className="textContact" style={props.LanguageStore.lang === "heb" ? { marginRight: "1vw" } : { marginLeft: "1vw" }}>help@ourbrothers.org</div>
            </div>

            <Link to="/support">
                <div className="supportButton">תמיכה טכנית</div>
            </Link>

        </div>
    );
}


export default inject('LanguageStore')(observer(Info));