import React, { useState, useEffect } from 'react';
import cancel from '../icons/cancel.svg'
import Business from '../icons/business.svg'
import { inject, observer, PropTypes } from 'mobx-react';
import clock from '../icons/whiteClock.svg'
import candleWhiteGray from '../icons/candleWhiteGray.svg'
import lockWhite from '../icons/lock-white.svg'


const TextSideDiv = (props) => {
    return (
        <div className="position-fixed containInputTextSide" style={props.dataForFallen ? { backgroundColor: "#082551" } : {}}>
            <img src={cancel} alt="cancel" className="cancelSideButton" onClick={() => { props.setPressOnCancel(true); props.setDataForFallen(false) }} />
            <div id="containDetailsSideBar">
                <img src={props.dataForFallen ? candleWhiteGray : Business} alt="Business" style={props.dataForFallen ? { marginBottom: "3vh", width: window.innerWidth > 550 ? "55px" : "30px" } : { marginBottom: "5vh" }} />

                {!props.dataForFallen ? <div className="textSide">
                    <div style={{ marginBottom: "2vh" }}> ביצירת מפגש תוכלו לפתוח חדר וירטואלי אליו יגיעו חברים ומכרים </div>
                    <strong>ביחד תספרו ותזכרו בסיפורם של היקרים לכם.</strong>
                    <div style={{ marginTop: "2vh" }}> האחים שלנו כאן בשבילכם,
                    לפני המפגש נקיים מפגש הכנה בו נסביר כיצד פועל מפגש זום ואיך כדאי להנחות אירוע מסוג זה.</div>
                </div> :

                    <div>
                        {props.CreateMeetingStore.meetingDetails.fallens && props.CreateMeetingStore.meetingDetails.fallens.map((fallenId, index) => {
                            if (props.CreateMeetingStore.fallenDetails && props.CreateMeetingStore.fallenDetails[fallenId.id])
                                return (
                                    <div key={index}>
                                        <div style={{ fontSize: window.innerWidth > 550 ? "30px" : "20px" }}>
                                            קיים מפגש נוסף לזכרו של <strong>{props.CreateMeetingStore.fallenDetails[fallenId.id].name}</strong>
                                        </div>
                                        {props.CreateMeetingStore.fallenDetails[fallenId.id].meetings && props.CreateMeetingStore.fallenDetails[fallenId.id].meetings.length &&
                                            props.CreateMeetingStore.fallenDetails[fallenId.id].meetings.map((meeting, index) => {

                                                return (
                                                    <div key={index} className="containFallenDetailsSide">
                                                        <div style={{ fontWeight: "bold" }}> {meeting.name}</div>
                                                        <div >מנחה: {meeting.meetingOwner.name}</div>
                                                        <div style={{ fontSize: "18px" }} className="d-flex">
                                                            <img src={clock} alt="clock" style={{ width: "20px", marginLeft: "1vh" }} />
                                                            <div>{meeting.date.split(",")[0]} | {meeting.date.split(",")[1]} | {meeting.time}</div>
                                                        </div>
                                                        <div className="divIsOpen">
                                                            {!meeting.isOpen ? "מפגש פתוח" : <div><img alt="alt" src={lockWhite} alt="lockWhite" /> מפגש סגור</div>}
                                                        </div>
                                                    </div>
                                                )

                                            })
                                        }
                                    </div>
                                )
                        })}
                        <div className="gotItButton pointer" onClick={() => { props.setPressOnCancel(true); props.setDataForFallen(false) }}>הבנתי</div>
                    </div>}
            </div>
        </div>
    )
}

export default inject('CreateMeetingStore')(observer(TextSideDiv))