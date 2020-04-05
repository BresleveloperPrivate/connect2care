import React, { useState, useEffect } from 'react';
import '../style/meetingInfo.css'
import { inject, observer, PropTypes } from 'mobx-react';
import blueCandle from '../../icons/candle-blue.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import grayCandle from '../../icons/gray-candle.svg'
import person from '../../icons/person.svg'
import clock from '../../icons/whiteClock.svg'
import candleWhiteGray from '../../icons/candleWhiteGray.svg'
import lock from '../../icons/lock.svg'
import lockWhite from '../../icons/lock-white.svg'
import Select from '../../components/Select'
import cancel from '../../icons/cancel.svg'
import Business from '../../icons/business.svg'
import Auth from '../../modules/auth/Auth'

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import { withStyles } from "@material-ui/core/styles";

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
    const [dissmisedPic, setDissmisedPic] = useState(true)
    const [dataForFallen, setDataForFallen] = useState(false)

    const myCloseToTheFallen = ["אח", "הורים", "קרובי משפחה", "חבר", "אחר"]
    const meetingLanguage = ['עברית', 'English', 'français', 'العربية', 'русский', 'አማርኛ', 'español']
    const meetingDate = [{ option: 'יום ראשון, ב באייר, 26.04' }, { option: 'יום שני, ג באייר, 27.04' }, { option: 'יום שלישי, ד באייר, 28.04' }, { option: 'יום רביעי, ה באייר, 29.04' }]

    useEffect(() => {
        (async () => {
            // let path = props.history.location.pathname.split("/")
            // let meetingId = path[path.length - 1]
            // props.CreateMeetingStore.setMeetingId(meetingId)
            // await props.CreateMeetingStore.getMeetingDetails()
            getTimeValue()

        })()
    }, [props.CreateMeetingStore.meetingDetails.time, props.CreateMeetingStore.meetingDetails.fallens, props.CreateMeetingStore.fallenDetails]);

    const searchFallen = async (id) => {
        let [success, err] = await Auth.superAuthFetch(`/api/fallens?filter={"where": { "id": ${id}}, "include": { "relation": "meetings", "scope": { "include": "meetingOwner" } } }`);

        console.log("success", success)

        if (err || !success) {
            props.CreateMeetingStore.setError(err)
        }
        if (success) {
            await props.CreateMeetingStore.changeFallenDetails(success[0])
            setDataForFallen(true)
        }
    }

    const getTimeValue = () => {
        let time = new Date()
        time.setHours(props.CreateMeetingStore.meetingDetails.time.split(":")[0])
        time.setMinutes(props.CreateMeetingStore.meetingDetails.time.split(":")[1])
        setTimeValue(time)
    }

    const showFallens = () => {
        if (!props.CreateMeetingStore.meetingDetails.fallens)
            props.CreateMeetingStore.changeFallens(0)

        return <div>{props.CreateMeetingStore.meetingDetails.fallens && props.CreateMeetingStore.meetingDetails.fallens.length &&
            props.CreateMeetingStore.meetingDetails.fallens.map((fallen, index) => {
                let findImage = props.CreateMeetingStore.fallenDetails && props.CreateMeetingStore.fallenDetails[fallen] && props.CreateMeetingStore.fallenDetails[fallen].image && props.CreateMeetingStore.fallenDetails[fallen].image !== ""
                return <div key={index} className="containFallenDetails">
                    {window.innerWidth > 550 && <img style={{ marginLeft: "2vh" }} src={blueCandle} alt="blueCandle" />}
                    <div style={window.innerWidth <= 550 ? {} : { width: "70%" }}>
                        <div className='position-relative'>
                            {props.CreateMeetingStore.fallenName && <div className="textAboveInput" style={{ width: "95%", position: 'absolute', top: '-17px' }}>שם החלל</div>}
                            <div className='inputStyle d-flex align-items-center' style={{ width: "95%" }}>
                                <input
                                    type="text"
                                    style={{ all: "unset", width: "calc(100% - 20px)" }}
                                    onChange={props.CreateMeetingStore.changeFallenName}
                                    value={props.CreateMeetingStore.fallenName}
                                    autoComplete="off"
                                    placeholder="שם החלל"
                                />
                                <FontAwesomeIcon icon={['fas', 'search']} style={{ fontSize: '20px', opacity: "0.5" }} />
                            </div>
                        </div>
                        <div className="searchButton pointer" onClick={() => searchFallen(Number(fallen))}>חפש</div>
                        {props.CreateMeetingStore.fallenDetails && props.CreateMeetingStore.fallenDetails[fallen] && props.CreateMeetingStore.fallenDetails[fallen].fallingDate && <div className="textAboveInput">תאריך נפילה</div>}
                        <input
                            type="text"
                            className='inputStyle'
                            style={{ width: "95%" }}
                            value={props.CreateMeetingStore.fallenDetails && props.CreateMeetingStore.fallenDetails[fallen] && props.CreateMeetingStore.fallenDetails[fallen].fallingDate}
                            autoComplete="off"
                            placeholder="תאריך נפילה"
                        />
                        {props.CreateMeetingStore.meetingDetails.relationship && <div className="textAboveInput">קרבה שלי אל החלל</div>}
                        <Select
                            selectTextDefault='קרבה שלי אל החלל'

                            arr={myCloseToTheFallen.map((name) => {
                                return { option: name }
                            })}
                            // selectedText={props.CreateMeetingStore.meetingDetails.relationship}
                            width='95%'
                            className='inputStyle p-0'
                            onChoseOption={(value) => { props.CreateMeetingStore.changeFallenRelative(value.option) }} />

                        {(props.CreateMeetingStore.meetingDetails.relationship === "אחר") &&
                            <input
                                type="text"
                                className='inputStyle'
                                style={{ width: "95%" }}
                                value={props.CreateMeetingStore.otherRelationship}
                                onChange={props.CreateMeetingStore.setOtherRelationship}
                                autoComplete="off"
                                placeholder="קרבה שלי אל החלל"
                            />}
                    </div>

                    <div className={findImage && dissmisedPic ? "position-relative" : "candleImg"} >

                        <img src={findImage && dissmisedPic ? props.CreateMeetingStore.fallenDetails[fallen].image : grayCandle}
                            alt="grayCandle" style={
                                findImage && dissmisedPic ? { height: "24vh" } : { height: "13vh" }} />
                        {findImage && dissmisedPic && <FontAwesomeIcon
                            color="#812863"
                            className={"pointer cancelPicture"}
                            onClick={() => setDissmisedPic(false)}
                            icon={["fas", "times-circle"]}
                        />}
                    </div>
                </div>
            })
        }
            <div className="addFallen" onClick={() => { props.CreateMeetingStore.changeFallens(props.CreateMeetingStore.meetingDetails.fallens.length) }}> + הוסף נופל</div>
        </div>

    }

    return (
        <div className="meetingDetails">
            <div className="createMeetingHeadLine margin-right-text" style={{ marginTop: "12vh" }}>{props.CreateMeetingStore.meetingId === -1 ? "יצירת המפגש" : "עריכת המפגש"}</div>
            <div className="createMeetingSecondSentence margin-right-text">שימו לב: על מנת לקיים מפגש יש צורך במינימום עשרה אנשים </div>
            <div>

                <div className='position-relative'>
                    {props.CreateMeetingStore.meetingDetails.name && <div style={{ position: 'absolute', top: '-17px' }} className="textAboveInput  margin-right-text">שם המפגש</div>}
                    <input
                        type="text"
                        className='inputStyle margin-right-text'
                        onChange={props.CreateMeetingStore.changeMeetingName}
                        value={props.CreateMeetingStore.meetingDetails.name}
                        autoComplete="off"
                        placeholder="שם המפגש"
                    />
                </div>

                <div className='position-relative'>
                    {props.CreateMeetingStore.meetingDetails.description && <div style={{ position: 'absolute', top: '-17px' }} className="textAboveInput  margin-right-text">תאור קצר</div>}
                    <textarea className='inputStyle textAreaStyle margin-right-text'
                        onChange={props.CreateMeetingStore.changeShortDescription}
                        value={props.CreateMeetingStore.meetingDetails.description}
                        rows="2"
                        autoComplete="off"
                        placeholder="תאור קצר"
                    />
                </div>

                {showFallens()}

                <div className="margin-right-text d-flex align-items-end" style={{ marginBottom: "2vh" }}>
                    <img style={{ width: "18px", marginLeft: "1vh" }} src={person} alt="person" />
                    <div className="inputDetail">פרטי יוצר המפגש:</div>
                </div>

                {props.CreateMeetingStore.meetingDetails.owner.name && <div className="textAboveInput  margin-right-text">השם המלא שלך - מנחה המפגש</div>}
                <input
                    type="text"
                    className='inputStyle margin-right-text'
                    onChange={props.CreateMeetingStore.changeMeetingFacilitatorName}
                    value={props.CreateMeetingStore.meetingDetails.owner.name}
                    autoComplete="off"
                    placeholder="השם המלא שלך - מנחה המפגש"
                />

                {props.CreateMeetingStore.meetingDetails.owner.email && <div className="textAboveInput  margin-right-text">דואר אלקטרוני</div>}
                <input
                    type="text"
                    className='inputStyle margin-right-text'
                    onChange={props.CreateMeetingStore.changeMeetingFacilitatorEmail}
                    value={props.CreateMeetingStore.meetingDetails.owner.email}
                    autoComplete="off"
                    placeholder="דואר אלקטרוני"
                />

                {props.CreateMeetingStore.meetingDetails.owner.phone && <div className="textAboveInput  margin-right-text">טלפון</div>}
                <input
                    type="text"
                    className='inputStyle margin-right-text'
                    onChange={props.CreateMeetingStore.changeMeetingFacilitatorPhoneNumber}
                    value={props.CreateMeetingStore.meetingDetails.owner.phone}
                    autoComplete="off"
                    placeholder="טלפון"
                />

                {props.CreateMeetingStore.meetingDetails.language && <div className="textAboveInput  margin-right-text">שפת המפגש</div>}
                <Select
                    selectTextDefault='שפת המפגש'
                    arr={meetingLanguage.map((name) => {
                        return { option: name }
                    })}
                    width='65%'
                    // selectedText={props.CreateMeetingStore.meetingDetails.language}
                    className='inputStyle margin-right-text p-0 '
                    onChoseOption={(value) => { props.CreateMeetingStore.changeMeetingLanguage(value.option) }} />

                <div className="margin-right-text d-flex align-items-center radioButtonContainer" style={{ marginBottom: "2vh" }}>
                    <div className="d-flex align-items-center">
                        <input type="radio" id="open" name="meeting" value={true} onChange={props.CreateMeetingStore.changeMeetingOpenOrClose} />
                        <label htmlFor="open" className="mb-0" style={{ marginLeft: "2vh" }}>מפגש פתוח</label>
                    </div>
                    <div className="d-flex align-items-center">
                        <input type="radio" id="close" name="meeting" value={false} onChange={props.CreateMeetingStore.changeMeetingOpenOrClose} />
                        <label htmlFor="close" className="mb-0"><img src={lock} alt="lock" style={{ marginLeft: "1vh", width: "1.5vh" }} />מפגש סגור</label>
                    </div>
                </div>
                <div className="containDateAndTime">
                    <div style={window.innerWidth > 550 ? { width: "80%" } : {}}>
                        {props.CreateMeetingStore.meetingDetails.date && <div className="textAboveInput">תאריך</div>}
                        <Select
                            selectTextDefault='תאריך'
                            arr={meetingDate.map((name) => {
                                return { option: name.option }
                            })}
                            width='100%'
                            // selectedText={props.CreateMeetingStore.meetingDetails.date}
                            className='inputStyle p-0'
                            onChoseOption={(value) => { props.CreateMeetingStore.changeMeetingDate(value.option) }} />
                    </div>
                    <div style={window.innerWidth > 550 ? { width: "30%" } : {}}>
                        {props.CreateMeetingStore.meetingDetails.time && <div className="textAboveInput">שעה</div>}

                        <div className='inputStyle d-flex align-items-center' style={window.innerWidth > 550 ? { marginRight: "2vh", width: "calc(100% - 2vh)" } : {}}>
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
                </div>
                {props.CreateMeetingStore.meetingDetails.max_participants && <div className="textAboveInput  margin-right-text">מספר משתתפים מקסימלי</div>}

                <input
                    type="text"
                    className='inputStyle margin-right-text'
                    onChange={props.CreateMeetingStore.changeNumberOfParticipants}
                    value={props.CreateMeetingStore.meetingDetails.max_participants}
                    autoComplete="off"
                    placeholder="מספר משתתפים מקסימלי"
                />
                <div className="containCreateMettingButton">
                    <div onClick={() => props.CreateMeetingStore.createNewMeetingPost()} className="createMeetingButton">צור מפגש</div>
                </div>
            </div>
        </div >
    );
}

export default inject('ManagerStore')(observer(CreateMeeting));