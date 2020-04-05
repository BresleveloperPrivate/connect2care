import React, { useState, useEffect } from 'react';
import '../style/meetingInfo.css'
import { inject, observer, PropTypes } from 'mobx-react';
import ErrorMethod from './ErrorMethod';
import Success from './Success.jsx'
import person from '../../icons/person.svg'

import lock from '../../icons/lock.svg'
import Select from './Select.js'

import FallenOfMeeting from "./FallenOfMeeting"
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
    const [success, setSuccess] = useState(false)

    const meetingLanguage = ['עברית', 'English', 'français', 'العربية', 'русский', 'አማርኛ', 'español']
    const meetingDate = [{ option: 'יום ראשון, ב באייר, 26.04' }, { option: 'יום שני, ג באייר, 27.04' }, { option: 'יום שלישי, ד באייר, 28.04' }, { option: 'יום רביעי, ה באייר, 29.04' }]

    useEffect(() => {
        (async () => {
            // let path = props.history.location.pathname.split("/")
            // let meetingId = path[path.length - 1]
            // props.ManagerMeetingStore.setMeetingId(meetingId)
            // await props.ManagerMeetingStore.getMeetingDetails()
            getTimeValue()

        })()
    }, [props.ManagerMeetingStore.meetingDetails.time, props.ManagerMeetingStore.otherRelationship, props.ManagerMeetingStore.meetingDetails.fallens, props.ManagerMeetingStore.fallenDetails]);

    const getTimeValue = () => {
        let time = new Date()
        time.setHours(props.ManagerMeetingStore.meetingDetails.time.split(":")[0])
        time.setMinutes(props.ManagerMeetingStore.meetingDetails.time.split(":")[1])
        setTimeValue(time)
    }

    const showFallens = () => {
        if (!props.ManagerMeetingStore.meetingDetails.fallens)
            props.ManagerMeetingStore.changeFallens(0)

        return (
            <div>{props.ManagerMeetingStore.meetingDetails.fallens && props.ManagerMeetingStore.meetingDetails.fallens.length &&
                props.ManagerMeetingStore.meetingDetails.fallens.map((fallen, index) => {
                    return <FallenOfMeeting key={index} isSaved={isSaved} fallen={fallen} setDataForFallen={setDataForFallen} index={index} />
                })
            }
                <div className="addFallen grow" onClick={() => { props.ManagerMeetingStore.changeFallens(props.ManagerMeetingStore.meetingDetails.fallens.length) }}> + הוסף נופל</div>
            </div>)
    }

    return (
        <div>
            {!success ?
                <div style={{ textAlign: "right" }} className="CreateMeeting">
                    <div className="createMeetingHeadLine margin-right-text" style={{ marginTop: "12vh" }}>{props.ManagerMeetingStore.meetingId === -1 ? "יצירת המפגש" : "עריכת המפגש"}</div>
                    <div className="createMeetingSecondSentence margin-right-text">שימו לב: על מנת לקיים מפגש יש צורך במינימום עשרה אנשים </div>
                    <div>

                        {props.ManagerMeetingStore.meetingDetails.name && <div className="textAboveInput  margin-right-text">שם המפגש</div>}
                        <input
                            type="text"
                            className={'inputStyle margin-right-text ' + (isSaved && (!props.ManagerMeetingStore.meetingDetails.name || (props.ManagerMeetingStore.meetingDetails.name && !props.ManagerMeetingStore.meetingDetails.name.length)) ? "error" : "")}
                            onChange={props.ManagerMeetingStore.changeMeetingName}
                            value={props.ManagerMeetingStore.meetingDetails.name || ''}
                            autoComplete="off"
                            placeholder="שם המפגש"
                        />

                        {props.ManagerMeetingStore.meetingDetails.description && <div className="textAboveInput  margin-right-text">תאור קצר</div>}
                        <textarea
                            className={'inputStyle textAreaStyle margin-right-text ' + (isSaved && (!props.ManagerMeetingStore.meetingDetails.description || (props.ManagerMeetingStore.meetingDetails.description && !props.ManagerMeetingStore.meetingDetails.description.length)) ? "error" : "")}
                            onChange={props.ManagerMeetingStore.changeShortDescription}
                            value={props.ManagerMeetingStore.meetingDetails.description || ''}
                            rows="2"
                            autoComplete="off"
                            placeholder="תאור קצר"
                        />

                        {showFallens()}

                        <div className="margin-right-text d-flex align-items-end" style={{ marginBottom: "2vh" }}>
                            <img style={{ width: "18px", marginLeft: "1vh" }} src={person} alt="person" />
                            <div className="inputDetail">פרטי יוצר המפגש:</div>
                        </div>

                        {props.ManagerMeetingStore.meetingDetails.owner.name && <div className="textAboveInput  margin-right-text">השם המלא שלך - מנחה המפגש</div>}
                        <input
                            type="text"
                            className={'inputStyle margin-right-text ' + (isSaved && (!props.ManagerMeetingStore.meetingDetails.owner.name || (props.ManagerMeetingStore.meetingDetails.owner.name && !props.ManagerMeetingStore.meetingDetails.owner.name.length)) ? "error" : "")}
                            onChange={props.ManagerMeetingStore.changeMeetingFacilitatorName}
                            value={props.ManagerMeetingStore.meetingDetails.owner.name || ''}
                            autoComplete="off"
                            placeholder="השם המלא שלך - מנחה המפגש"
                        />

                        {props.ManagerMeetingStore.meetingDetails.owner.email && <div className="textAboveInput  margin-right-text">דואר אלקטרוני</div>}
                        <input
                            type="text"
                            className={'inputStyle margin-right-text ' + (isSaved && (!props.ManagerMeetingStore.meetingDetails.owner.email || (props.ManagerMeetingStore.meetingDetails.owner.email && !props.ManagerMeetingStore.meetingDetails.owner.email.length)) ? "error" : "")}
                            onChange={props.ManagerMeetingStore.changeMeetingFacilitatorEmail}
                            value={props.ManagerMeetingStore.meetingDetails.owner.email || ''}
                            autoComplete="off"
                            placeholder="דואר אלקטרוני"
                        />

                        {props.ManagerMeetingStore.meetingDetails.owner.phone && <div className="textAboveInput  margin-right-text">טלפון</div>}
                        <input
                            type="text"
                            className={'inputStyle margin-right-text ' + (isSaved && (!props.ManagerMeetingStore.meetingDetails.owner.phone || (props.ManagerMeetingStore.meetingDetails.owner.phone && !props.ManagerMeetingStore.meetingDetails.owner.phone.length)) ? "error" : "")}
                            onChange={props.ManagerMeetingStore.changeMeetingFacilitatorPhoneNumber}
                            value={props.ManagerMeetingStore.meetingDetails.owner.phone}
                            autoComplete="off"
                            placeholder="טלפון"
                        />

                        {props.ManagerMeetingStore.meetingDetails.language && <div className="textAboveInput  margin-right-text">שפת המפגש</div>}
                        <Select
                            selectTextDefault='שפת המפגש'
                            arr={meetingLanguage.map((name) => {
                                return { option: name }
                            })}
                            width='65%'
                            // selectedText={props.ManagerMeetingStore.meetingDetails.language}
                            className={'inputStyle margin-right-text p-0 ' + (isSaved && (!props.ManagerMeetingStore.meetingDetails.language || (props.ManagerMeetingStore.meetingDetails.language && !props.ManagerMeetingStore.meetingDetails.language.length)) ? "error" : "")}
                            onChoseOption={(value) => { props.ManagerMeetingStore.changeMeetingLanguage(value.option) }} />

                        <div className="margin-right-text d-flex align-items-center" style={{ marginBottom: "2vh" }}>
                            <input type="radio" className={(isSaved && !props.ManagerMeetingStore.meetingDetails.isOpen) ? "error" : ""} id="open" name="meeting" value={true} onChange={props.ManagerMeetingStore.changeMeetingOpenOrClose} />
                            <label htmlFor="open" className="mb-0" style={{ marginLeft: "2vh" }}>מפגש פתוח</label>
                            <input type="radio" id="close" name="meeting" value={false} className={(isSaved && !props.ManagerMeetingStore.meetingDetails.isOpen) ? "error" : ""} onChange={props.ManagerMeetingStore.changeMeetingOpenOrClose} />
                            <label htmlFor="close" className="mb-0"><img src={lock} alt="lock" style={{ marginLeft: "1vh", width: "1.5vh" }} />מפגש סגור</label>
                        </div>

                        <div className="containDateAndTime">
                            <div className='containDateInput'>
                                {props.ManagerMeetingStore.meetingDetails.date && <div className="textAboveInput">תאריך</div>}
                                <Select
                                    selectTextDefault='תאריך'
                                    arr={meetingDate.map((name) => {
                                        return { option: name.option }
                                    })}
                                    width='100%'
                                    // selectedText={props.ManagerMeetingStore.meetingDetails.date}
                                    className={'inputStyle p-0 ' + (isSaved && (!props.ManagerMeetingStore.meetingDetails.date || (props.ManagerMeetingStore.meetingDetails.date && !props.ManagerMeetingStore.meetingDetails.date.length)) ? "error" : "")}
                                    onChoseOption={(value) => { props.ManagerMeetingStore.changeMeetingDate(value.option) }} />
                            </div>

                            <div className='containSelectTime'>

                                {props.ManagerMeetingStore.meetingDetails.time && <div className="textAboveInput">שעה</div>}
                                <div className={'inputStyle d-flex align-items-center ' + (isSaved && (!props.ManagerMeetingStore.meetingDetails.time || (props.ManagerMeetingStore.meetingDetails.time && !props.ManagerMeetingStore.meetingDetails.time.length)) ? "error" : "")}
                                 className='inputStyleTime'
                                 >
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <CssTimePicker
                                            clearable
                                            ampm={false}
                                            okLabel={"אישור"}
                                            cancelLabel="ביטול"
                                            clearLabel={null}
                                            value={timeValue}
                                            onChange={props.ManagerMeetingStore.changeMeetingTime}
                                            style={{ textDecoration: 'underline', color: '#157492', cursor: "pointer" }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                            </div>
                        </div>

                        {props.ManagerMeetingStore.meetingDetails.maxParticipants && <div className="textAboveInput  margin-right-text">מספר משתתפים מקסימלי</div>}
                        <input
                            type="text"
                            className={'inputStyle margin-right-text ' + (isSaved && (!props.ManagerMeetingStore.meetingDetails.maxParticipants || (props.ManagerMeetingStore.meetingDetails.maxParticipants && !props.ManagerMeetingStore.meetingDetails.maxParticipants.length)) ? "error" : "")}
                            onChange={props.ManagerMeetingStore.changeNumberOfParticipants}
                            value={props.ManagerMeetingStore.meetingDetails.maxParticipants}
                            autoComplete="off"
                            placeholder="מספר משתתפים מקסימלי"
                        />

                        <div className="containCreateMettingButton">
                            <div onClick={async () => {
                                setIsSaved(true)
                                let meeting = await props.ManagerMeetingStore.createNewMeetingPost()
                                if (meeting) {
                                    setSuccess(meeting[0])
                                }
                            }} className="createMeetingButton grow">{props.ManagerMeetingStore.waitForData ?
                                <div className="spinner">
                                    <div className="bounce1"></div>
                                    <div className="bounce2"></div>
                                    <div className="bounce3"></div>
                                </div>
                                : <div>צור מפגש</div>}</div>

                        </div>
                    </div>
                    {props.ManagerMeetingStore.error && <ErrorMethod {...props} />}
                    {(!pressOnCancel || dataForFallen) && <TextSIdeDiv setPressOnCancel={setPressOnCancel} dataForFallen={dataForFallen} setDataForFallen={setDataForFallen} />}
                </div>
                : <Success history={props.history} meeting={success} />
            }
        </div>

    )
}

export default inject('ManagerMeetingStore')(observer(CreateMeeting));