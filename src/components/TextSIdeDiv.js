import React, { useState, useEffect } from 'react';
import cancel from '../icons/cancel.svg'
import Business from '../icons/business.svg'
import { inject, observer, PropTypes } from 'mobx-react';
// import clock from '../icons/whiteclock.svg'
import candleWhiteGray from '../icons/candleWhiteGray.svg'
import lockWhite from '../icons/lock-white.svg'


const TextSideDiv = (props) => {
    return (
        <div className={"position-absolute sideTextGreen containInputTextSide " + (props.LanguageStore.lang !== 'heb' ? "tal leftDiv" : "tar")} style={props.dataForFallen ? { backgroundColor: "#082551" } : {}}>
            <img src={cancel} alt="cancel" className="cancelSideButton" onClick={() => { props.setPressOnCancel(true); props.setDataForFallen(false) }} />
            <div id="containDetailsSideBar">
                <img src={props.dataForFallen ? candleWhiteGray : Business} alt="Business" style={props.dataForFallen ? { marginBottom: "3vh", width: props.LanguageStore.width > 550 ? "55px" : "30px" } : { width: props.LanguageStore.width > 550 ? "60px" : "50px", marginBottom: "4vh" }} />

                {!props.dataForFallen ?

                    props.LanguageStore.lang !== 'heb' ?

                        <div className="textSide tal" style={{ direction: 'ltr' }}>
                            <div style={{ marginBottom: "2vh" }}>
                                By creating a meeting you can open a virtual room where friends and acquaintances will join. </div>
                            <strong>Together you will tell and remember the story of your fallen loved ones.</strong>
                            <div style={{ marginTop: "2vh" }}> Our Brothers are here for you,
                            Before the meet-up we will hold a preparatory session and explain how the zoom meeting works, and
                            provide tools for hosting the event.
                            </div>
                        </div>
                        :

                        <div className="textSide">
                            <div style={{ marginBottom: "2vh" }}>
                                ביצירת מפגש תוכלו לפתוח חדר וירטואלי אליו יגיעו חברים ומכרים. </div>
                            <strong>ביחד תספרו ותזכרו בסיפורם של היקרים לכם.</strong>
                            <div style={{ marginTop: "2vh" }}> האחים שלנו כאן בשבילכם,
                            לפני המפגש נקיים מפגש הכנה בו נסביר כיצד פועל מפגש זום ואיך כדאי להנחות אירוע מסוג זה.
                            </div>
                        </div>



                    :

                    <div>
                        {props.CreateMeetingStore.meetingDetails.fallens && props.CreateMeetingStore.meetingDetails.fallens.map((fallenId, index) => {
                            console.log("fallenId", fallenId, "index", index)
                            if (props.CreateMeetingStore.fallenDetails && props.CreateMeetingStore.fallenDetails[fallenId.id])
                                return (
                                    <div key={index}>
                                        <div style={{ fontSize: props.LanguageStore.width > 550 ? "30px" : "20px" }}>
                                            קיים מפגש נוסף לזכר <strong>{props.CreateMeetingStore.fallenDetails[fallenId.id].name}</strong>
                                        </div>
                                        {props.CreateMeetingStore.fallenDetails[fallenId.id].meetings && props.CreateMeetingStore.fallenDetails[fallenId.id].meetings.length &&
                                            props.CreateMeetingStore.fallenDetails[fallenId.id].meetings.map((meeting, i) => {
                                                console.log("meeting", meeting, "i", i)
                                                return (
                                                    <div key={i} className="containFallenDetailsSide">
                                                        <div style={{ fontWeight: "bold" }}> {meeting.name}</div>
                                                        <div > {props.t('host')}: {meeting.meetingOwner.name}</div>
                                                        <div style={{ fontSize: "18px" }} className="d-flex">
                                                            {/* <img src={clock} alt="clock" style={{ width: "20px", marginLeft: "1vh" }} /> */}
                                                            <div>{meeting.date.split(",")[0]} | {meeting.date.split(",")[1]} | {meeting.time}</div>
                                                        </div>
                                                        <div className="divIsOpen">
                                                            {meeting.isOpen ? props.t("meetingIsOpen") : <div><img alt="alt" src={lockWhite} alt="lockWhite" /> {props.t("meetingIsClosed")}</div>}
                                                        </div>
                                                    </div>
                                                )

                                            })
                                        }
                                    </div>
                                )
                        })}
                    </div>}
            </div>
            {props.dataForFallen && <div className="gotItButton pointer" onClick={() => { props.setPressOnCancel(true); props.setDataForFallen(false) }}>הבנתי</div>}
        </div>
    )
}

export default inject('CreateMeetingStore', 'LanguageStore')(observer(TextSideDiv))