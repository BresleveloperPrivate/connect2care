import React, { useState, useEffect } from 'react';
import '../styles/createMeeting.css'
import { inject, observer, PropTypes } from 'mobx-react';
import ErrorMethod from './ErrorMethod';

import person from '../icons/person.svg'

import lock from '../icons/lock.svg'
import Select from './Select.js'

import FallenDetails from "./FallenDetails"
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import { withStyles } from "@material-ui/core/styles";
import TextSIdeDiv from './TextSIdeDiv';

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
    const [dataForFallen, setDataForFallen] = useState(false)
    const [isSaved, setIsSaved] = useState(false)

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
    }, [props.CreateMeetingStore.meetingDetails.time, props.CreateMeetingStore.otherRelationship, props.CreateMeetingStore.meetingDetails.fallens, props.CreateMeetingStore.fallenDetails]);

    const getTimeValue = () => {
        let time = new Date()
        time.setHours(props.CreateMeetingStore.meetingDetails.time.split(":")[0])
        time.setMinutes(props.CreateMeetingStore.meetingDetails.time.split(":")[1])
        setTimeValue(time)
    }

    const showFallens = () => {
        if (!props.CreateMeetingStore.meetingDetails.fallens)
            props.CreateMeetingStore.changeFallens(0)

        return (
            <div>{props.CreateMeetingStore.meetingDetails.fallens && props.CreateMeetingStore.meetingDetails.fallens.length &&
                props.CreateMeetingStore.meetingDetails.fallens.map((fallen, index) => {
                    return <FallenDetails isSaved={isSaved} fallen={fallen} setDataForFallen={setDataForFallen} index={index} />
                })
            }
                <div className="addFallen grow" onClick={() => { props.CreateMeetingStore.changeFallens(props.CreateMeetingStore.meetingDetails.fallens.length) }}> + הוסף נופל</div>
            </div>)
    }

    return (
        <div style={{ textAlign: "right" }} className="CreateMeeting">
            <div className="createMeetingHeadLine margin-right-text" style={{ marginTop: "12vh" }}>{props.CreateMeetingStore.meetingId === -1 ? "יצירת המפגש" : "עריכת המפגש"}</div>
            <div className="createMeetingSecondSentence margin-right-text">שימו לב: על מנת לקיים מפגש יש צורך במינימום עשרה אנשים </div>
            <div>

                {props.CreateMeetingStore.meetingDetails.name && <div className="textAboveInput  margin-right-text">שם המפגש</div>}
                <input
                    type="text"
                    className={'inputStyle margin-right-text ' + (isSaved && (!props.CreateMeetingStore.meetingDetails.name || (props.CreateMeetingStore.meetingDetails.name && !props.CreateMeetingStore.meetingDetails.name.length)) ? "error" : "")}
                    onChange={props.CreateMeetingStore.changeMeetingName}
                    value={props.CreateMeetingStore.meetingDetails.name}
                    autoComplete="off"
                    placeholder="שם המפגש"
                />

                {props.CreateMeetingStore.meetingDetails.description && <div className="textAboveInput  margin-right-text">תאור קצר</div>}
                <textarea
                    className={'inputStyle textAreaStyle margin-right-text ' + (isSaved && (!props.CreateMeetingStore.meetingDetails.description || (props.CreateMeetingStore.meetingDetails.description && !props.CreateMeetingStore.meetingDetails.description.length)) ? "error" : "")}
                    onChange={props.CreateMeetingStore.changeShortDescription}
                    value={props.CreateMeetingStore.meetingDetails.description}
                    rows="2"
                    autoComplete="off"
                    placeholder="תאור קצר"
                />

                {showFallens()}

                <div className="margin-right-text d-flex align-items-end" style={{ marginBottom: "2vh" }}>
                    <img style={{ width: "18px", marginLeft: "1vh" }} src={person} alt="person" />
                    <div className="inputDetail">פרטי יוצר המפגש:</div>
                </div>

                {props.CreateMeetingStore.meetingDetails.owner.name && <div className="textAboveInput  margin-right-text">השם המלא שלך - מנחה המפגש</div>}
                <input
                    type="text"
                    className={'inputStyle margin-right-text ' + (isSaved && (!props.CreateMeetingStore.meetingDetails.owner.name || (props.CreateMeetingStore.meetingDetails.owner.name && !props.CreateMeetingStore.meetingDetails.owner.name.length)) ? "error" : "")}
                    onChange={props.CreateMeetingStore.changeMeetingFacilitatorName}
                    value={props.CreateMeetingStore.meetingDetails.owner.name}
                    autoComplete="off"
                    placeholder="השם המלא שלך - מנחה המפגש"
                />

                {props.CreateMeetingStore.meetingDetails.owner.email && <div className="textAboveInput  margin-right-text">דואר אלקטרוני</div>}
                <input
                    type="text"
                    className={'inputStyle margin-right-text ' + (isSaved && (!props.CreateMeetingStore.meetingDetails.owner.email || (props.CreateMeetingStore.meetingDetails.owner.email && !props.CreateMeetingStore.meetingDetails.owner.email.length)) ? "error" : "")}
                    onChange={props.CreateMeetingStore.changeMeetingFacilitatorEmail}
                    value={props.CreateMeetingStore.meetingDetails.owner.email}
                    autoComplete="off"
                    placeholder="דואר אלקטרוני"
                />

                {props.CreateMeetingStore.meetingDetails.owner.phone && <div className="textAboveInput  margin-right-text">טלפון</div>}
                <input
                    type="text"
                    className={'inputStyle margin-right-text ' + (isSaved && (!props.CreateMeetingStore.meetingDetails.owner.phone || (props.CreateMeetingStore.meetingDetails.owner.phone && !props.CreateMeetingStore.meetingDetails.owner.phone.length)) ? "error" : "")}
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
                    className={'inputStyle margin-right-text p-0 ' + (isSaved && (!props.CreateMeetingStore.meetingDetails.language || (props.CreateMeetingStore.meetingDetails.language && !props.CreateMeetingStore.meetingDetails.language.length)) ? "error" : "")}
                    onChoseOption={(value) => { props.CreateMeetingStore.changeMeetingLanguage(value.option) }} />

                <div className="margin-right-text d-flex align-items-center" style={{ marginBottom: "2vh" }}>
                    <input type="radio" className={(isSaved && !props.CreateMeetingStore.meetingDetails.isOpen) ? "error" : ""} id="open" name="meeting" value={true} onChange={props.CreateMeetingStore.changeMeetingOpenOrClose} />
                    <label for="open" className="mb-0" style={{ marginLeft: "2vh" }}>מפגש פתוח</label>
                    <input type="radio" id="close" name="meeting" value={false} className={(isSaved && !props.CreateMeetingStore.meetingDetails.isOpen) ? "error" : ""} onChange={props.CreateMeetingStore.changeMeetingOpenOrClose} />
                    <label for="close" className="mb-0"><img src={lock} alt="lock" style={{ marginLeft: "1vh", width: "1.5vh" }} />מפגש סגור</label>
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
                            className={'inputStyle p-0 ' + (isSaved && (!props.CreateMeetingStore.meetingDetails.date || (props.CreateMeetingStore.meetingDetails.date && !props.CreateMeetingStore.meetingDetails.date.length)) ? "error" : "")}
                            onChoseOption={(value) => { props.CreateMeetingStore.changeMeetingDate(value.option) }} />
                    </div>

                    <div style={window.innerWidth > 550 ? { width: "30%", marginRight: "2vh" } : {}}>

                        {props.CreateMeetingStore.meetingDetails.time && <div className="textAboveInput">שעה</div>}
                        <div className={'inputStyle d-flex align-items-center ' + (isSaved && (!props.CreateMeetingStore.meetingDetails.time || (props.CreateMeetingStore.meetingDetails.time && !props.CreateMeetingStore.meetingDetails.time.length)) ? "error" : "")} style={window.innerWidth > 550 ? { width: "100%" } : {}}>
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

                {props.CreateMeetingStore.meetingDetails.maxParticipants && <div className="textAboveInput  margin-right-text">מספר משתתפים מקסימלי</div>}
                <input
                    type="text"
                    className={'inputStyle margin-right-text ' + (isSaved && (!props.CreateMeetingStore.meetingDetails.maxParticipants || (props.CreateMeetingStore.meetingDetails.maxParticipants && !props.CreateMeetingStore.meetingDetails.maxParticipants.length)) ? "error" : "")}
                    onChange={props.CreateMeetingStore.changeNumberOfParticipants}
                    value={props.CreateMeetingStore.meetingDetails.maxParticipants}
                    autoComplete="off"
                    placeholder="מספר משתתפים מקסימלי"
                />

                <div className="containCreateMettingButton">
                    <div onClick={async() => {
                        setIsSaved(true)
                        let success = await props.CreateMeetingStore.createNewMeetingPost()
                        if(success){
                            console.log('yes')
                        }
                        }} className="createMeetingButton grow">{props.CreateMeetingStore.waitForData ?
                        <div className="spinner">
                            <div className="bounce1"></div>
                            <div className="bounce2"></div>
                            <div className="bounce3"></div>
                        </div>
                        : <div>צור מפגש</div>}</div>

                </div>
            </div>
            {props.CreateMeetingStore.error && <ErrorMethod {...props} />}
            {(!pressOnCancel || dataForFallen) && <TextSIdeDiv setPressOnCancel={setPressOnCancel} dataForFallen={dataForFallen} setDataForFallen={setDataForFallen} />}
        </div>)
}

export default inject('CreateMeetingStore')(observer(CreateMeeting));