import React, { useState, useEffect } from 'react';
import { observer, PropTypes, inject } from 'mobx-react';
import '../styles/support.css'
import Phone from '../icons/phone.svg'
import Email from '../icons/email-green.svg'

const Support = (props) => {

    return (
        <div id="supportContainDiv" style={props.LanguageStore.lang !== "heb" && props.LanguageStore.width > 550 ? { textAlign: "left", marginLeft: "12vw" } : {}}>
            <div className="supportHeadLine">{props.LanguageStore.lang !== "heb" ? "Support - We are here for you" : "תמיכה - אנחנו פה בשבילכם"}</div>
            <div className="supportSecondLine">{props.LanguageStore.lang !== "heb" ? "You will find different tutorials here for connecting and remembering meet-up" : "תוכלו למצוא כאן הדרכות שונות עבור מפגשי מתחברים וזוכרים"}</div>
            <div className="containSupportLink">
                <div>
                    <div className="divExplaniationSupport">
                        <div className="divContainSupport">
                            <div className="textDivSupport">{props.LanguageStore.lang !== "heb" ? "Technical Explanation leader meet-up" : "הסבר טכני למוביל מפגש"}</div>
                        </div>
                    </div>
                    <div onClick={() => window.open(`${process.env.REACT_APP_DOMAIN}/Technical Explanation leader meet-up.pdf`)} style={props.LanguageStore.lang !== "heb" ? { float: "right" } : {}} className="watchHere">{props.LanguageStore.lang !== "heb" ? "To view click here" : "לצפייה לחץ כאן"}</div>
                </div>

                <div>
                    <div className="divExplaniationSupport">
                        <div className="divContainSupport">
                            <div className="textDivSupport" >{props.LanguageStore.lang !== "heb" ? "In their memory - convergence guidelines" : "לזכרם- קווים מנחים להתכנסות"}</div>
                        </div>
                    </div>
                    <div onClick={() => window.open(`${process.env.REACT_APP_DOMAIN}/In their memory - convergence guidelines.pdf`)} style={props.LanguageStore.lang !== "heb" ? { float: "right" } : {}} className="watchHere">{props.LanguageStore.lang !== "heb" ? "To view click here" : "לצפייה לחץ כאן"}</div>
                </div>

                <div>
                    <div className="divExplaniationSupport">
                        <div className="divContainSupport">
                            <div className="textDivSupport">{props.LanguageStore.lang !== "heb" ? "ZOOM Meeting Host Kit" : "ערכת מארח מפגש ZOOM"}</div>
                        </div>
                    </div>
                    <div onClick={() => window.open(`${process.env.REACT_APP_DOMAIN}/ZOOM Meeting Host Kit.pdf`)} style={props.LanguageStore.lang !== "heb" ? { float: "right" } : {}} className="watchHere">{props.LanguageStore.lang !== "heb" ? "To view click here" : "לצפייה לחץ כאן"}</div>
                </div>

            </div>

            <div className="supportMsg">{props.LanguageStore.lang !== "heb" ?
                <div>If you still need help,<br /> our support center is at your service!</div> :
                <div>אם עדיין אתם זקוקים לעזרה, <br />מוקד התמיכה שלנו עומד לשירותכם!</div>
            }</div>
            <div className="containPhoneAndEmail">
                <div className="d-flex align-items-center margin-right-left-text" style={{ marginBottom: "2vw" }}>
                    <img src={Phone} style={{ width: "22px" }} />
                    <div className="textContact" style={props.LanguageStore.lang === "heb" ? { marginRight: "4vw" } : { marginLeft: "4vw" }}>058-409-4624</div>
                </div>
                <div className="d-flex align-items-center margin-right-left-text" style={{ marginBottom: "2vw" }}>
                    <img className="" src={Email} style={{ width: "22px" }} />
                    <div className="textContact" style={props.LanguageStore.lang === "heb" ? { marginRight: "4vw" } : { marginLeft: "4vw" }}>Zikaron@ourbrothers.org</div>
                </div>
            </div>
        </div>
    )
}

export default inject('LanguageStore')(observer(Support))