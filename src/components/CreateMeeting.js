import React, { useState, useEffect } from 'react';
import NavBar from './NavBar.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/createMeeting.css'
import { inject, observer, PropTypes } from 'mobx-react';
import blueCandle from '../icons/candle-blue.svg'
import grayCandle from '../icons/gray-candle.svg'
import person from '../icons/person.png'
import lock from '../icons/lock.svg'
import Select from './Select.js'

const CreateMeeting = (props) => {
    const [selectedArea, setSelectedArea] = useState("")
    const [selectedEra, setSelectedEra] = useState(0)
    const [error, setError] = useState()

    const myCloseToTheFallen = ["אח", "הורים", "קורבי משפחה", "חבר", "אחר"]
    const meetingLanguage = ['עברית', 'English', 'français', 'العربية', 'русский', 'አማርኛ', 'español']
    const meetingDate = ["26.04 - יום ראשון", "27.04 - ערב יום הזכרון", "28.04 - יום הזכרון", "29.04- יום רביעי"]

    //useEffect(() => {
    //  (async () => {
    //})()
    // }, []);
    const setSelectedAreaAndError = (area) => {
        setSelectedArea(area);
        setError("")
    }

    const searchFallen = () => {

    }

    return (
        <div style={{ textAlign: "right" }}>
            {/* <NavBar
                history={props.history}
                className={'navbar-opening'}
            /> */}

            <div className="createMeetingHeadLine margin-right-text" style={{ marginTop: "12vh" }}>יצירת המפגש</div>
            <div className="createMeetingSecondSentence margin-right-text">שימו לב: על מנת לקיים מפגש יש צורך במינימום עשרה אנשים </div>
            <div>
                <input
                    type="text"
                    className='inputStyle margin-right-text'
                    onChange={props.CreateMeetingStore.changeMeetingName}
                    value={props.CreateMeetingStore.meetingDetails.name}
                    autoComplete="off"
                    placeholder="שם המפגש"
                />
                <textarea className='inputStyle textAreaStyle margin-right-text'
                    onChange={props.CreateMeetingStore.changeShortDescription}
                    value={props.CreateMeetingStore.meetingDetails.description}
                    rows="2"
                    autoComplete="off"
                    placeholder="תאור קצר"
                />

                <div className="margin-right-text d-flex align-items-start" style={{ width: "65%" }}>
                    <img style={{ marginLeft: "2vh" }} src={blueCandle} alt="blueCandle" />
                    <div style={{ width: "70%" }}>
                        <input
                            type="text"
                            className='inputStyle'
                            style={{ width: "95%" }}
                            onChange={props.CreateMeetingStore.changeFallenName}
                            value={props.CreateMeetingStore.fallenName}
                            autoComplete="off"
                            placeholder="שם החלל"
                        />
                        <div className="searchButton pointer" onClick={() => searchFallen()}>חפש</div>
                        <input
                            type="text"
                            className='inputStyle'
                            style={{ width: "95%" }}
                            value={props.CreateMeetingStore.fallenDate}
                            autoComplete="off"
                            placeholder="תאריך נפילה"
                        />
                        <Select
                            selectTextDefault='קרבה שלי אל החלל'
                            arr={myCloseToTheFallen.map((name) => {
                                return { option: name }
                            })}
                            selectedText={props.CreateMeetingStore.meetingDetails.relationship}
                            width='95%'
                            className='inputStyle'
                            onChoseOption={(value) => { props.CreateMeetingStore.changeFallenRelative(value.option) }} />
                        {props.CreateMeetingStore.meetingDetails.relationship === "אחר" && <input
                            type="text"
                            className='inputStyle'
                            style={{ width: "95%" }}
                            // value={props.CreateMeetingStore.fallenName}        
                            autoComplete="off"
                            placeholder="תאריך נפילה"
                        />}
                    </div>
                    <div style={{ backgroundColor: "#EEEEEE", padding: "8.2vh", borderRadius: "4px" }} >
                        <img src={grayCandle} alt="grayCandle" style={{ height: "16vh" }} />
                    </div>
                </div>
                <div className="margin-right-text d-flex align-items-end" style={{ marginBottom: "2vh" }}>
                    <img style={{ width: "18px", marginLeft: "1vh" }} src={person} alt="person" />
                    <div className="inputDetail">פרטי יוצר המפגש:</div>
                </div>
                <input
                    type="text"
                    className='inputStyle margin-right-text'
                    onChange={props.CreateMeetingStore.changeMeetingFacilitatorName}
                    value={props.CreateMeetingStore.meetingDetails.owner.name}
                    autoComplete="off"
                    placeholder="השם המלא שלך - מנחה המפגש"
                />

                <input
                    type="text"
                    className='inputStyle margin-right-text'
                    onChange={props.CreateMeetingStore.changeMeetingFacilitatorEmail}
                    value={props.CreateMeetingStore.meetingDetails.owner.email}
                    autoComplete="off"
                    placeholder="דואר אלקטרוני"
                />

                <input
                    type="text"
                    className='inputStyle margin-right-text'
                    onChange={props.CreateMeetingStore.changeMeetingFacilitatorPhoneNumber}
                    value={props.CreateMeetingStore.meetingDetails.owner.phone}
                    autoComplete="off"
                    placeholder="טלפון"
                />

                <Select
                    selectTextDefault='שפת המפגש'
                    arr={meetingLanguage.map((name) => {
                        return { option: name }
                    })}
                    width='65%'
                    selectedText={props.CreateMeetingStore.meetingDetails.language}
                    className='inputStyle margin-right-text '
                    onChoseOption={(value) => { props.CreateMeetingStore.changeMeetingLanguage(value.option) }} />

                <div className="margin-right-text">
                    <input type="radio" id="open" name="meeting" value={true} onChange={props.CreateMeetingStore.changeMeetingOpenOrClose} />
                    <label for="open">מפגש פתוח</label>
                    <input type="radio" id="close" name="meeting" value={false} onChange={props.CreateMeetingStore.changeMeetingOpenOrClose} />
                    <label for="close"><img src={lock} alt="lock" />מפגש סגור</label>
                </div>
                <div style={{ width: "65%" }} className="d-flex margin-right-text justify-content-between">
                    <Select
                        selectTextDefault='תאריך'
                        arr={meetingDate.map((name) => {
                            return { option: name }
                        })}
                        width='80%'
                        selectedText={props.CreateMeetingStore.meetingDetails.date}
                        className='inputStyle'
                        onChoseOption={(value) => { props.CreateMeetingStore.changeMeetingDate(value.option) }} />
                    <input
                        type="time"
                        className='inputStyle'
                        style={{ marginRight: "2vh" }}
                        onChange={props.CreateMeetingStore.changeMeetingTime}
                        value={props.CreateMeetingStore.meetingDetails.time}
                        autoComplete="off"
                        placeholder="שעה"
                    />
                </div>

                <input
                    type="text"
                    className='inputStyle margin-right-text'
                    onChange={props.CreateMeetingStore.changeNumberOfParticipants}
                    value={props.CreateMeetingStore.meetingDetails.maxParticipants}
                    autoComplete="off"
                    placeholder="מספר משתתפים מקסימלי"
                />



            </div>
        </div>

    );

}

export default inject('CreateMeetingStore')(observer(CreateMeeting));