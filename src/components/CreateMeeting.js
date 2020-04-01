import React, { useState, useEffect } from 'react';
import NavBar from './NavBar.js'
import '../styles/createMeeting.css'
import { inject, observer, PropTypes } from 'mobx-react';
import blueCandle from '../icons/candle-blue.svg'
import grayCandle from '../icons/gray-candle.svg'
import person from '../icons/person.png'
import lock from '../icons/lock.svg'
import Select from './Select.js'
import cancel from '../icons/cancel.svg'
import Business from '../icons/business.svg'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";

const CssTimePicker = withStyles({
    root: {
        '&': {
            width: '61px'
        },
        '& input': {
            color: '#157492',
            fontSize: '130%',
            textAlign: 'center',
        },
        '& .MuiInput-underline:hover': {
            borderBottomColor: "none"
        },
        '& .MuiInput-underline:before:hover': {
            borderBottomColor: "none"
        },
        '& .MuiInput-underline:before': {
            border: 'none',
        },
    },
})(TimePicker);

const CreateMeeting = (props) => {
    const [pressOnCancel, setPressOnCancel] = useState(false)
    const [error, setError] = useState()
    const [timeValue, setTimeValue] = useState()

    const myCloseToTheFallen = ["אח", "הורים", "קרובי משפחה", "חבר", "אחר"]
    const meetingLanguage = ['עברית', 'English', 'français', 'العربية', 'русский', 'አማርኛ', 'español']
    const meetingDate = [
        { name: "26.04 - יום ראשון", option: "26.04" },
        { name: "27.04 - ערב יום הזכרון", option: "27.04" },
        { name: "28.04 - יום הזכרון", option: "28.04" },
        { name: "29.04- יום רביעי", option: "2p.04" }]

    useEffect(() => {
        (async () => {
            // let path = props.history.location.pathname.split("/")
            // let meetingId = path[path.length - 1]
            // props.CreateMeetingStore.setMeetingId(meetingId)
            // await props.CreateMeetingStore.getMeetingDetails()
            getTimeValue()

        })()
    }, [props.CreateMeetingStore.meetingDetails.time]);

    const searchFallen = () => {

    }

    const getTimeValue = () => {
        let time = new Date()
        time.setHours(props.CreateMeetingStore.meetingDetails.time.split(":")[0])
        time.setMinutes(props.CreateMeetingStore.meetingDetails.time.split(":")[1])
        setTimeValue(time)
    }

    return (
        <div style={{ textAlign: "right" }} className="CreateMeeting">
            <div className="createMeetingHeadLine margin-right-text" style={{ marginTop: "12vh" }}>{props.CreateMeetingStore.meetingId === -1 ? "יצירת המפגש" : "עריכת המפגש"}</div>
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
                            // selectedText={props.CreateMeetingStore.meetingDetails.relationship}
                            width='95%'
                            className='inputStyle p-0'
                            onChoseOption={(value) => { props.CreateMeetingStore.changeFallenRelative(value.option) }} />

                        {(props.CreateMeetingStore.meetingDetails.relationship !== "אח" &&
                            props.CreateMeetingStore.meetingDetails.relationship !== "הורים" &&
                            props.CreateMeetingStore.meetingDetails.relationship !== "קורבי משפחה" &&
                            props.CreateMeetingStore.meetingDetails.relationship !== "חבר" &&
                            props.CreateMeetingStore.meetingDetails.relationship !== null) && <input
                                type="text"
                                className='inputStyle'
                                style={{ width: "95%" }}
                                value={props.CreateMeetingStore.meetingDetails.relationship}
                                autoComplete="off"
                                placeholder="קרבה שלי אל החלל"
                            />}
                    </div>
                    <div style={{ backgroundColor: "#EEEEEE", padding: "6.8vh", borderRadius: "4px" }} >
                        <img src={grayCandle} alt="grayCandle" style={{ height: "13vh" }} />
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
                    // selectedText={props.CreateMeetingStore.meetingDetails.language}
                    className='inputStyle margin-right-text p-0 '
                    onChoseOption={(value) => { props.CreateMeetingStore.changeMeetingLanguage(value.option) }} />

                <div className="margin-right-text d-flex align-items-center" style={{ marginBottom: "2vh" }}>
                    <input type="radio" id="open" name="meeting" value={true} onChange={props.CreateMeetingStore.changeMeetingOpenOrClose} />
                    <label for="open" className="mb-0" style={{ marginLeft: "2vh" }}>מפגש פתוח</label>
                    <input type="radio" id="close" name="meeting" value={false} onChange={props.CreateMeetingStore.changeMeetingOpenOrClose} />
                    <label for="close" className="mb-0"><img src={lock} alt="lock" style={{ marginLeft: "1vh", width: "1.5vh" }} />מפגש סגור</label>
                </div>
                <div style={{ width: "65%" }} className="d-flex margin-right-text justify-content-between">
                    <Select
                        selectTextDefault='תאריך'
                        arr={meetingDate.map((name) => {
                            return { option: name.name }
                        })}
                        width='80%'
                        // selectedText={props.CreateMeetingStore.meetingDetails.date}
                        className='inputStyle p-0'
                        onChoseOption={(value) => { props.CreateMeetingStore.changeMeetingDate(value.option, meetingDate) }} />

                    <div className='inputStyle d-flex align-items-center' style={{ marginRight: "2vh" }}>
                        <div style={{ marginLeft: "2vh" }}>
                            שעה:
                        </div>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <CssTimePicker
                                clearable
                                ampm={false}
                                okLabel={"אישור"}
                                cancelLabel="ביטול"
                                clearLabel={null}
                                value={timeValue}
                                onChange={props.CreateMeetingStore.changeMeetingTime}
                                style={{ textDecoration: 'underline', color: '#157492', cursor: "pointer" }}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                </div>

                <input
                    type="text"
                    className='inputStyle margin-right-text'
                    onChange={props.CreateMeetingStore.changeNumberOfParticipants}
                    value={props.CreateMeetingStore.meetingDetails.maxParticipants}
                    autoComplete="off"
                    placeholder="מספר משתתפים מקסימלי"
                />
                <div style={{ width: "65%" }} className="d-flex margin-right-text justify-content-end">
                    <div onClick={() => props.CreateMeetingStore.createNewMeetingPost()} className="createMeetingButton">צור מפגש</div>
                </div>
            </div>

            {!pressOnCancel && <div className="position-fixed containInputTextSide">
                <img src={cancel} alt="cancel" onClick={() => { setPressOnCancel(true) }} className="position-fixed" style={{ width: "2.5vh", left: "24%", top: "14vh", cursor: "pointer" }} />
                <br />
                <img src={Business} alt="Business" style={{ marginBottom: "8vh" }} />
                <div className="textSide">
                    ביצירת מפגש תוכלו לפתוח חדר וירטואלי אליו יגיעו חברים ומכרים <br /><br />
                    <strong>ביחד תספרו ותזכרו בסיפורם של היקרים לכם.</strong><br />
                    <br />
                 האחים שלנו כאן בשבילכם,
                 לפני המפגש נקיים מפגש הכנה בו נסביר כיצד פועל מפגש זום ואיך כדאי להנחות אירוע מסוג זה.
                </div>
            </div>}
        </div>
    );
}

export default inject('CreateMeetingStore')(observer(CreateMeeting));