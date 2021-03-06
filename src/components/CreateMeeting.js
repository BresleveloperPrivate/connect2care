import React, { useState, useEffect } from 'react';
import '../styles/createMeeting.css'
import { inject, observer, PropTypes } from 'mobx-react';
import { meetingDate } from '../consts/Meetings.consts';
import ErrorMethod from './ErrorMethod';
import Success from './Success.jsx'
import person from '../icons/person.svg'
import materialInfo from '../icons/material-info.svg'
import checkbox_on_light from '../icons/checkbox_on_light.svg'
import checkbox_off_light from '../icons/checkbox_off_light.svg'
import lock from '../icons/lock.svg'
import Select from './Select.js'
import logo from '../icons/logo.svg'

import FallenDetails from "./FallenDetails"
import TextSIdeDiv from './TextSIdeDiv';

// import Tooltip from "@material-ui/core/Tooltip";
// import { withStyles } from '@material-ui/core/styles';

// const LightTooltip = withStyles((theme) => ({
//     tooltip: {
//       backgroundColor: '#16B3AB',
//       color: 'white',
//       textAlign: 'center',
//       boxShadow: theme.shadows[1],
//       fontSize: 12,
//       fontFamily: 'Heebo',
//     },
//   }))(Tooltip);

const CreateMeeting = (props) => {
    const [pressOnCancel, setPressOnCancel] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPhone, setErrorPhone] = useState(false)
    const [errorMaxParticipants, setErrorMaxParticipants] = useState(false)
    const [timeValue, setTimeValue] = useState()
    const [dataForFallen, setDataForFallen] = useState(false)
    const [isSaved, setIsSaved] = useState(false)
    const [success, setSuccess] = useState(false)
    const [readBylaw, setReadBylaw] = useState(false)

    const meetingLanguage = [
        { option: 'עברית', data: 'עברית' },
        { option: 'English', data: 'English' },
        { option: 'français', data: 'français' },
        { option: 'العربية', data: 'العربية' },
        { option: 'русский', data: 'русский' },
        { option: 'አማርኛ', data: 'አማርኛ' },
        { option: 'español', data: 'español' },
    ]
    const meetingTimeHour = [
        { option: '01', data: '01' },
        { option: '02', data: '02' },
        { option: '03', data: '03' },
        { option: '04', data: '04' },
        { option: '05', data: '05' },
        { option: '06', data: '06' },
        { option: '07', data: '07' },
        { option: '08', data: '08' },
        { option: '09', data: '09' },
        { option: '10', data: '10' },
        { option: '11', data: '11' },
        { option: '12', data: '12' },
        { option: '13', data: '13' },
        { option: '14', data: '14' },
        { option: '15', data: '15' },
        { option: '16', data: '16' },
        { option: '17', data: '17' },
        { option: '18', data: '18' },
        { option: '19', data: '19' },
        { option: '20', data: '20' },
        { option: '21', data: '21' },
        { option: '22', data: '22' },
        { option: '23', data: '23' },
        { option: '24', data: '24' },
    ]
    const meetingTimeMinute = [
        { option: '00', data: '00' },
        { option: '30', data: '30' }
    ]
    const meetingDates = meetingDate(props)?.slice(1);

    useEffect(() => {

        return () => props.CreateMeetingStore.resetAll()
    }, [])

    const showFallens = () => {
        if (!props.CreateMeetingStore.meetingDetails.fallens)
            props.CreateMeetingStore.changeFallens(null)

        return (
            <div>{props.CreateMeetingStore.meetingDetails.fallens && props.CreateMeetingStore.meetingDetails.fallens.length &&
                props.CreateMeetingStore.meetingDetails.fallens.map((fallen, index) => {
                    return <FallenDetails t={props.t} key={index} isSaved={isSaved} fallen={fallen} setDataForFallen={setDataForFallen} index={index} isDash={false} />
                })
            }
                {props.CreateMeetingStore.meetingDetails.fallens.length < 10 && <div className="addFallen grow" onClick={() => { props.CreateMeetingStore.changeFallens(props.CreateMeetingStore.meetingDetails.fallens.length) }}> + {props.t("addFallen")}</div>}
            </div>
        )
    }

    const emailValidate = (e) => {

        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;
        if (!e.target.value.match(regex)) {
            setErrorEmail(true)
            props.CreateMeetingStore.changeNotAllFieldsCorrect(true)
        }
        else {
            setErrorEmail(false)
            props.CreateMeetingStore.changeNotAllFieldsCorrect(false)
        }
    }

    const phoneValidate = (e) => {
        let regex = /(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{2,4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{2,4})/
        if (!e.target.value.match(regex)) {
            setErrorPhone(true)
            props.CreateMeetingStore.changeNotAllFieldsCorrect(true)
        }
        else {
            setErrorPhone(false)
            props.CreateMeetingStore.changeNotAllFieldsCorrect(false)
        }
    }

    return (
        <div>
            {false ?
                <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                    <div style={{ width: '30vw', height: 'fit-content' }}>
                        <img src={logo} width='100%' />
                    </div>

                    <div style={{ color: '#0A2D63', fontSize: '3vw', paddingTop: '5vh' }}>לא ניתן ליצור יותר מפגשים חדשים</div>
                    <div
                        onClick={() => {
                            props.history.replace('/')
                        }}
                        className='grow' style={{ color: 'white', cursor: 'pointer', marginTop: '2vh', backgroundColor: '#0A2D63', borderRadius: '100px', padding: '0.2vh 2vw' }}>חזור לדף הבית</div>
                </div> :
                !success ?
                    <div className="CreateMeeting" style={{ textAlign: props.LanguageStore.lang !== 'heb' ? "left" : "right" }}>
                        <div className="createMeetingHeadLine margin-right-text headlineCM">{props.CreateMeetingStore.meetingId === -1 ? props.t("createTheMeeting") : props.t("editMeeting")}</div>
                        <div className="createMeetingSecondSentence margin-right-text">
                            {props.LanguageStore.lang !== 'heb' ? "Please Note: There is a minimum of ten participants per meeting" : "שימו לב: על מנת לקיים מפגש יש צורך במינימום עשרה אנשים"}
                        </div>
                        <div>
                            <div className='position-relative'>
                                {props.CreateMeetingStore.meetingDetails.name && <div className="textAboveInput margin-right-text">{props.t("meetingName")}</div>}
                                <input
                                    type="text"
                                    onBlur={() => props.CreateMeetingStore.isNameExist()}

                                    onTouchEnd={() => props.CreateMeetingStore.isNameExist()}
                                    className={'inputStyle margin-right-text ' + (isSaved && (!props.CreateMeetingStore.meetingDetails.name || (props.CreateMeetingStore.meetingDetails.name && !props.CreateMeetingStore.meetingDetails.name.length)) ? "error" : "")}
                                    onChange={props.CreateMeetingStore.changeMeetingName}
                                    value={props.CreateMeetingStore.meetingDetails.name || ''}
                                    autoComplete="off"
                                    placeholder={props.t("meetingName")}
                                />
                                {props.CreateMeetingStore.nameMessage !== "" &&
                                    <div className="containNameExist margin-right-text">
                                        <img src={materialInfo} alt="materialInfo" style={{ marginLeft: "1vh" }} />
                                        <div >{props.CreateMeetingStore.nameMessage}</div>
                                    </div>
                                }
                            </div>

                            <div className='position-relative'>
                                {props.CreateMeetingStore.meetingDetails.description && <div className="textAboveInput margin-right-text">{props.t("shortDescription")}</div>}
                                <textarea
                                    className={'inputStyle textAreaStyle margin-right-text ' + (isSaved && (!props.CreateMeetingStore.meetingDetails.description || (props.CreateMeetingStore.meetingDetails.description && !props.CreateMeetingStore.meetingDetails.description.length)) ? "error" : "")}
                                    onChange={props.CreateMeetingStore.changeShortDescription}
                                    value={props.CreateMeetingStore.meetingDetails.description || ''}
                                    rows="2"
                                    autoComplete="off"
                                    placeholder={props.t("shortDescription")}
                                />
                            </div>

                            {showFallens()}

                            <div className="margin-right-text d-flex align-items-end" style={{ marginBottom: "4vh" }}>
                                <img style={props.LanguageStore.lang === "heb" ? { width: "18px", marginLeft: "1vh" } : { width: "18px", marginRight: "1vh" }} src={person} alt="person" />
                                <div className="inputDetail">{props.t("ownerDetails")}:</div>
                            </div>

                            <div className='position-relative'>
                                {props.CreateMeetingStore.meetingDetails.owner.name && <div className="textAboveInput margin-right-text">{props.t("ownerFullName")}</div>}
                                <input
                                    type="text"
                                    className={'inputStyle margin-right-text ' + (isSaved && (!props.CreateMeetingStore.meetingDetails.owner.name || (props.CreateMeetingStore.meetingDetails.owner.name && !props.CreateMeetingStore.meetingDetails.owner.name.length)) ? "error" : "")}
                                    onChange={props.CreateMeetingStore.changeMeetingFacilitatorName}
                                    value={props.CreateMeetingStore.meetingDetails.owner.name || ''}
                                    autoComplete="off"
                                    placeholder={props.t("ownerFullName")}
                                />
                            </div>

                            {/* <LightTooltip disableHoverListener title={props.LanguageStore.lang !== "heb"?"Enter a GMAIL address":"GMAIL יש לכתוב כתובת"} placement="top" arrow>    */}
                                <div className='position-relative'>
                                    {props.CreateMeetingStore.meetingDetails.owner.email && <div className="textAboveInput margin-right-text">{props.t("email")}</div>}
                                    <input
                                        type="email"
                                        className={'inputStyle margin-right-text ' + (isSaved && (!props.CreateMeetingStore.meetingDetails.owner.email || (props.CreateMeetingStore.meetingDetails.owner.email && !props.CreateMeetingStore.meetingDetails.owner.email.length)) ? "error" : "")}
                                        onTouchEnd={() => setErrorEmail(true)}
                                        onChange={props.CreateMeetingStore.changeMeetingFacilitatorEmail}
                                        value={props.CreateMeetingStore.meetingDetails.owner.email || ''}
                                        autoComplete="off"
                                        placeholder={props.t("email")}
                                        onBlur={emailValidate}
                                        onFocus={() => setErrorEmail(false)}
                                    />
                                    {errorEmail &&
                                        <div className="containNameExist margin-right-text">
                                            <img src={materialInfo} alt="materialInfo" style={{ marginLeft: "1vh" }} />
                                            <div>{props.t("pleaseCheckThatTheEmailAddressCorrect")}</div>
                                        </div>
                                    }
                                </div>
                            {/* </LightTooltip> */}

                            {/* <LightTooltip disableHoverListener title={props.LanguageStore.lang !== "heb"?"Enter your personal phone number, it will be your username":"נא לכתוב את מספר הטלפון האישי, הוא יהיה משתמש הזום שלכם"} placement="top" arrow> */}
                                <div className='position-relative'>
                                    {props.CreateMeetingStore.meetingDetails.owner.phone && <div className="textAboveInput margin-right-text">{props.t("phone")}</div>}
                                    <input
                                        type="phone"
                                        className={'inputStyle margin-right-text ' + (isSaved && (!props.CreateMeetingStore.meetingDetails.owner.phone || (props.CreateMeetingStore.meetingDetails.owner.phone && !props.CreateMeetingStore.meetingDetails.owner.phone.length)) ? "error" : "")}
                                        onChange={props.CreateMeetingStore.changeMeetingFacilitatorPhoneNumber}
                                        value={props.CreateMeetingStore.meetingDetails.owner.phone}
                                        autoComplete="off"
                                        style={{ direction: "ltr", textAlign: props.LanguageStore.lang !== "heb" ? "left" : "right" }}
                                        placeholder={props.t("phone")}
                                        onBlur={phoneValidate}
                                        onFocus={() => setErrorPhone(false)}
                                    />
                                    {errorPhone &&
                                        <div className="containNameExist margin-right-text">
                                            <img src={materialInfo} alt="materialInfo" style={{ marginLeft: "1vh" }} />
                                            <div>{props.t("numberNotCorrect")}</div>
                                        </div>
                                    }
                                </div>
                            {/* </LightTooltip> */}

                            <div className='position-relative'>
                                {props.CreateMeetingStore.meetingDetails.language && <div className="textAboveInput margin-right-text">{props.t("meetingLanguage")}</div>}
                                <Select
                                    selectTextDefault={props.t("meetingLanguage")}
                                    arr={meetingLanguage}
                                    width="calc(73% - 12vw)"

                                    // selectedText={props.CreateMeetingStore.meetingDetails.language}
                                    className={'inputStyle margin-right-text p-0 ' + (isSaved && (!props.CreateMeetingStore.meetingDetails.language || (props.CreateMeetingStore.meetingDetails.language && !props.CreateMeetingStore.meetingDetails.language.length)) ? "error" : "")}
                                    onChoseOption={(value) => { props.CreateMeetingStore.changeMeetingLanguage(value.data) }} />
                            </div>

                            <div className="margin-right-text d-flex align-items-center" style={{ marginBottom: "2vh" }}>
                                <div className="d-flex align-items-center" onClick={() => props.CreateMeetingStore.changeMeetingOpenOrClose({ target: { value: true } })}>
                                    <div>
                                        {props.CreateMeetingStore.meetingDetails.isOpen !== "" && Boolean(props.CreateMeetingStore.meetingDetails.isOpen) ?
                                            <img src={checkbox_on_light} /> :
                                            <div style={{
                                                width: "24px",
                                                height: "24px",
                                                WebkitMaskSize: "24px 24px",
                                                background: (isSaved && props.CreateMeetingStore.meetingDetails.isOpen === '' || props.CreateMeetingStore.meetingDetails.isOpen === null || props.CreateMeetingStore.meetingDetails.isOpen === undefined) ? '#c31a1a' : '#4d4f5c',
                                                WebkitMaskImage: `Url(${checkbox_off_light})`
                                            }}></div>
                                        }
                                    </div>
                                    <div style={props.LanguageStore.lang !== "heb" ? {} : { marginLeft: "2vh" }}>{props.t("meetingIsOpen")}</div>
                                </div>
                                <div style={props.LanguageStore.lang !== "heb" ? { marginLeft: "2vh" } : {}} className="d-flex align-items-center" onClick={() => props.CreateMeetingStore.changeMeetingOpenOrClose({ target: { value: false } })}>
                                    <div>
                                        {props.CreateMeetingStore.meetingDetails.isOpen !== "" && !Boolean(props.CreateMeetingStore.meetingDetails.isOpen) ?
                                            <img src={checkbox_on_light} /> :
                                            <div style={{
                                                width: "24px",
                                                height: "24px",
                                                WebkitMaskSize: "24px 24px",
                                                background: (isSaved && props.CreateMeetingStore.meetingDetails.isOpen === '' || props.CreateMeetingStore.meetingDetails.isOpen === null || props.CreateMeetingStore.meetingDetails.isOpen === undefined) ? '#c31a1a' : '#4d4f5c',
                                                WebkitMaskImage: `Url(${checkbox_off_light})`
                                            }}></div>
                                        }
                                    </div>
                                    <div style={props.LanguageStore.lang !== "heb" ? {} : { marginLeft: "2vh" }}>
                                        <img src={lock} alt="lock" style={props.LanguageStore.lang !== "heb" ? { marginRight: "1vh", width: "1.5vh" } : { marginLeft: "1vh", width: "1.5vh" }} />{props.t("meetingIsClosed")}</div>
                                </div>
                            </div>
                            {props.CreateMeetingStore.meetingDetails.code &&
                                <div className="openOrCloseDetails" style={{ marginRight: '6vw', marginLeft: '6vw', fontSize: '1.8vh', marginBottom: '2vh' }}>
                                    {props.LanguageStore.lang !== 'heb' ?
                                        '*Open Meeting - Open to anyone interested in joining, Closed Meeting - Meeting only for invited participants' :
                                        ' *מפגש פתוח - מפגש הפתוח לכל מי שמעוניין להצטרף, מפגש פרטי - מפגש המיועד למשתתפים מוזמנים בלבד'
                                    }

                                </div>}
                            <br />
                            <div className="containDateAndTime">
                                <div className='containDateInput position-relative'>
                                    {props.CreateMeetingStore.meetingDetails.date && <div className="textAboveInput">{props.t("date")}</div>}
                                    <Select
                                        selectTextDefault={props.CreateMeetingStore.meetingDetails.date === '' ? props.t("date") : props.CreateMeetingStore.meetingDetails.date}
                                        arr={meetingDates}
                                        width='100%'
                                        // selectedText={props.CreateMeetingStore.meetingDetails.date}
                                        className={'inputStyle p-0 ' + (isSaved && (!props.CreateMeetingStore.meetingDetails.date || (props.CreateMeetingStore.meetingDetails.date && !props.CreateMeetingStore.meetingDetails.date.length)) ? "error" : "")}
                                        onChoseOption={(value) => props.CreateMeetingStore.changeMeetingDate(value.data)} />
                                </div>

                                <div className='containSelectTime position-relative' style={props.LanguageStore.lang !== 'heb' && props.LanguageStore.width >= 1150 ? { direction: "rtl", marginLeft: "2vh", marginRight: "0px" } : { direction: "rtl" }}>

                                    {((props.CreateMeetingStore.meetingDetails.timeHour || props.CreateMeetingStore.meetingDetails.timeMinute) && (props.CreateMeetingStore.meetingDetails.timeHour.length || props.CreateMeetingStore.meetingDetails.timeMinute.length)) && <div className="textAboveInput">
                                        {props.LanguageStore.lang !== 'heb' ?
                                            'Time (Israel time)' :
                                            'שעה (שעון ישראל)'
                                        }:
{/* שעה (שעון ישראל): */}
                                    </div>}
                                    <Select
                                        selectTextDefault={props.CreateMeetingStore.meetingDetails.timeMinute !== '' ? props.CreateMeetingStore.meetingDetails.timeMinute : props.LanguageStore.lang !== 'heb' ? "Mintes" : "דקות"}
                                        arr={meetingTimeMinute}
                                        width='100%'
                                        // selectedText={props.CreateMeetingStore.meetingDetails.date}
                                        className={'inputStyle p-0 ' + (props.LanguageStore.lang !== "heb" ? "dir-ltr " : " ") + (isSaved && (!props.CreateMeetingStore.meetingDetails.timeHour || (props.CreateMeetingStore.meetingDetails.timeHour && !props.CreateMeetingStore.meetingDetails.timeHour.length)) ? "error" : "")}
                                        onChoseOption={(value) => { props.CreateMeetingStore.changeMeetingTimeMinute(value.data) }} />

                                    <div className="timeDot">:</div>
                                    <Select
                                        selectTextDefault={props.CreateMeetingStore.meetingDetails.timeHour !== "" ? props.CreateMeetingStore.meetingDetails.timeHour : props.LanguageStore.lang !== 'heb' ? "Hours" : "שעות"}
                                        arr={meetingTimeHour}
                                        width='100%'
                                        maxHeight='120px'
                                        // selectedText={props.CreateMeetingStore.meetingDetails.date}
                                        className={'inputStyle p-0 ' + (props.LanguageStore.lang !== "heb" ? "dir-ltr " : " ") + (isSaved && (!props.CreateMeetingStore.meetingDetails.timeMinute || (props.CreateMeetingStore.meetingDetails.timeMinute && !props.CreateMeetingStore.meetingDetails.timeMinute.length)) ? "error" : "")}
                                        onChoseOption={(value) => { props.CreateMeetingStore.changeMeetingTimeHour(value.data) }} />
                                </div>

                            </div>
                            <div className="position-relative">
                                {props.CreateMeetingStore.meetingDetails.max_participants && <div className="textAboveInput margin-right-text">{props.t("maxParticipationNumber")}</div>}
                                <input
                                    type="text"
                                    onBlur={() => {
                                        if (props.CreateMeetingStore.meetingDetails.max_participants < 10) {
                                            setErrorMaxParticipants(props.t("maximumNumberOfParticipantsMustBe10ParticipantsOrMore"))
                                            props.CreateMeetingStore.changeNotAllFieldsCorrect(true)
                                        }
                                        else if (props.CreateMeetingStore.meetingDetails.max_participants > 500) {
                                            setErrorMaxParticipants(props.t("maximumNumberOfParticipantsMustBeLessThan500Participants"))
                                            props.CreateMeetingStore.changeNotAllFieldsCorrect(true)
                                        }
                                        else props.CreateMeetingStore.changeNotAllFieldsCorrect(false)
                                    }}

                                    onTouchEnd={() => {
                                        if (props.CreateMeetingStore.meetingDetails.max_participants < 10) {
                                            setErrorMaxParticipants(props.t("maximumNumberOfParticipantsMustBe10ParticipantsOrMore"))
                                            props.CreateMeetingStore.changeNotAllFieldsCorrect(true)
                                        }
                                        else if (props.CreateMeetingStore.meetingDetails.max_participants > 500) {
                                            setErrorMaxParticipants(props.t("maximumNumberOfParticipantsMustBeLessThan500Participants"))
                                            props.CreateMeetingStore.changeNotAllFieldsCorrect(true)
                                        }
                                        else props.CreateMeetingStore.changeNotAllFieldsCorrect(false)
                                    }}
                                    onFocus={() => { setErrorMaxParticipants(false); props.CreateMeetingStore.changeNotAllFieldsCorrect(false) }}
                                    className={'inputStyle margin-right-text ' + (isSaved && (!props.CreateMeetingStore.meetingDetails.max_participants) ? "error" : "")}
                                    onChange={props.CreateMeetingStore.changeNumberOfParticipants}
                                    value={props.CreateMeetingStore.meetingDetails.max_participants}
                                    autoComplete="off"
                                    placeholder={props.t("maxParticipationNumber")}
                                />
                                {
                                    errorMaxParticipants &&
                                    <div className="containNameExist margin-right-text">
                                        <img src={materialInfo} alt="materialInfo" style={{ marginLeft: "1vh" }} />
                                        <div>{errorMaxParticipants}</div>
                                    </div>
                                }

                                <div className="margin-right-text d-flex align-items-center" style={{ marginBottom: "2vh" }}>

                                    <div className=" d-flex align-items-center" style={{ marginTop: '2vh' }}>
                                        {/* <div>
                                            <img style={{ cursor: 'pointer' }} onClick={() => { if (readBylaw === true) setReadBylaw(false); else setReadBylaw(true) }} src={readBylaw ? checkbox_on_light : checkbox_off_light} />
                                        </div> */}
                                        <div style={{ cursor: 'pointer' }} onClick={() => {
                                            if (readBylaw === true) setReadBylaw(false);
                                            else setReadBylaw(true)
                                            props.CreateMeetingStore.setError(false)

                                        }}>
                                            {Boolean(readBylaw) ?
                                                <img src={checkbox_on_light} /> :
                                                <div style={{
                                                    width: "24px",
                                                    height: "24px",
                                                    WebkitMaskSize: "24px 24px",
                                                    background: (isSaved && !readBylaw) ? '#c31a1a' : '#4d4f5c',
                                                    WebkitMaskImage: `Url(${checkbox_off_light})`
                                                }}></div>
                                            }
                                        </div>
                                        {/* <input style={{ margin: props.LanguageStore.lang !== 'heb' ? '0' : null }} type="radio" className={(isSaved && !readBylaw) ? "error" : ""} id="readBylaw" name="readBylaw" value={false} onClick={() => setReadBylaw(true)} /> */}
                                        <label htmlFor="readBylaw" className="mb-0" style={{ marginLeft: "2vh" }}>

                                            {props.LanguageStore.lang !== 'heb' ?
                                                <div>Iv'e read and accepted the
                                                    <a href={`${process.env.REACT_APP_DOMAIN}/terms.pdf`} target="_blank"> terms and conditions </a>.
                                                </div>
                                                :
                                                <div>אני מסכים/ה ל<span className='terms' onClick={()=>{window.open('https://ourbrothers.co.il/assets/docs/%D7%AA%D7%A0%D7%90%D7%99%20%D7%A9%D7%99%D7%9E%D7%95%D7%A9%20%D7%94%D7%90%D7%97%D7%99%D7%9D%20%D7%A9%D7%9C%D7%A0%D7%95.pdf')}}>תקנון</span> ולתנאי השימוש באתר.</div>
                                            }

                                        </label>
                                    </div>
                                </div>

                            </div>

                            <div className="containCreateMettingButton">
                                <div className="createMeetingButton grow" onClick={async () => {
                                    if (!props.CreateMeetingStore.waitForData && !props.CreateMeetingStore.error) {
                                        setIsSaved(true)
                                        if (!readBylaw) {
                                            let error = props.LanguageStore.lang !== 'heb' ? "You must read the terms before adding the meeting" : "עליך לקרוא את התקנון לפני ההוספה"
                                            props.CreateMeetingStore.setError(error)
                                            return
                                        }
                                        let meeting = await props.CreateMeetingStore.createNewMeetingPost(props.LanguageStore.lang)
                                        if (meeting) {
                                            setSuccess(meeting[0])
                                        }
                                    }
                                }}>
                                    {props.CreateMeetingStore.waitForData ?
                                        <div className="spinner">
                                            <div className="bounce1"></div>
                                            <div className="bounce2"></div>
                                            <div className="bounce3"></div>
                                        </div>
                                        : <div>{props.t("createMeeting")}</div>
                                    }
                                </div>
                            </div>
                        </div >
                        {
                            props.CreateMeetingStore.error &&
                            <ErrorMethod {...props} />
                        }
                        {(dataForFallen || !pressOnCancel) && <TextSIdeDiv t={props.t} setPressOnCancel={setPressOnCancel} dataForFallen={dataForFallen} setDataForFallen={setDataForFallen} />}
                    </div >
                    : <Success history={props.history} meeting={success} t={props.t} />
            }
        </div >

    )
}
export default inject('CreateMeetingStore', 'LanguageStore')(observer(CreateMeeting));
