import React from 'react';
import Email from '../icons/email-green.svg'
import { inject, observer } from 'mobx-react';
import instagram from '../icons/instagram.svg'
import SupportForm from './SupportForm';
import './../styles/contact.css'

const Info = (props) => {
    return (
        <div id="contactPage" style={props.LanguageStore.lang === "heb" ? { textAlign: "center" } : { textAlign: "left" }}>
            <div className="contactHeadLine">{props.LanguageStore.lang === "heb" ? "צרו קשר" : "Contact Us"}</div>
            <div className="contactSecondSentence">{props.LanguageStore.lang === "heb" ? "לתמיכה טכנית" : "For technical support"}</div>

            <SupportForm />

            <div className="d-flex align-items-center margin-right-left-text">
                <img className="" src={Email} style={{ width: "30px" }} />
                <div className="textContact" style={props.LanguageStore.lang === "heb" ? { marginRight: "4vw" } : { marginLeft: "4vw" }}>Zikaron@ourbrothers.org</div>
            </div>

            <div className="d-flex align-items-center margin-right-left-text">
                <div className="facebook-div" onClick={() => { window.open("https://www.facebook.com/ourbrotherss") }} style={props.LanguageStore.lang === "heb" ? { marginLeft: "2vh" } : { marginRight: "2vh" }} >
                    <div className="">Facebook</div>
                    <div className="contactFacebookImg" style={props.LanguageStore.lang === "heb" ? { marginRight: "1vh" } : { marginLeft: "1vh" }}></div>
                </div>

                <div className="facebook-div" onClick={() => { window.open("https://www.instagram.com/ourbrothers2020/") }}>
                    <div>Instagram</div>
                    <img src={instagram} style={props.LanguageStore.lang === "heb" ? { width: "20px", marginRight: "1vh" } : { width: "20px", marginLeft: "1vh" }} />
                </div>
            </div>
        </div>
    );
}

export default inject('LanguageStore')(observer(Info));
