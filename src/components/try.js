import React, { useState, useEffect } from 'react';
import '../styles/createMeeting.css'
import { inject, observer, PropTypes } from 'mobx-react';
import ErrorMethod from './ErrorMethod';
import Success from './Success.jsx'
import person from '../icons/person.svg'
import materialInfo from '../icons/material-info.svg'
import checkbox_on_light from '../icons/checkbox_on_light.svg'
import checkbox_off_light from '../icons/checkbox_off_light.svg'
import lock from '../icons/lock.svg'
import Select from './Select.js'
import logo from '../icons/logo'

import FallenDetails from "./FallenDetails"
import TextSIdeDiv from './TextSIdeDiv';

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
    const [wait, setWait] = useState(false)

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
        { option: '00', data: '00' },
    ]
    const meetingTimeMinute = [
        { option: '00', data: '00' },
        { option: '30', data: '30' }
    ]

    const date = (new Date()).getDate()
    const meetingDate = [
        date >= 25 ? null : { option: props.t('sunday'), data: 'יום ראשון, ב באייר, 26.04' },
        date >= 26 ? null : { option: props.t('monday'), data: 'יום שני, ג באייר, 27.04' },
        date >= 27 ? null : { option: props.t('tuesday'), data: 'יום שלישי, ד באייר, 28.04' },
        date >= 28 ? null : { option: props.t('wednesday'), data: 'יום רביעי, ה באייר, 29.04' },
    ]

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
        }
        else setErrorEmail(false)
    }

    const phoneValidate = (e) => {
        let regex = /(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{2,4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{2,4})/
        if (!e.target.value.match(regex)) {
            setErrorPhone(true)
        }
        else setErrorPhone(false)
    }

    return (
        <div>
            {(new Date()).getDate() >= 28 ?
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
                    <div className="createMeetingHeadLine margin-right-text" style={{ marginTop: "12vh" }}>{props.CreateMeetingStore.meetingId === -1 ? props.t("createTheMeeting") : props.t("editMeeting")}</div>
                    <div className="createMeetingSecondSentence margin-right-text">
                        {props.LanguageStore.lang !== 'heb' ? "Please Note: There is a minimum of ten participants per meeting" : "שימו לב: על מנת לקיים מפגש יש צורך במינימום עשרה אנשים"}
                    </div>
                    <div>
                        <div className='position-relative'>
                            {props.CreateMeetingStore.meetingDetails.name && <div className="textAboveInput  margin-right-text">{props.t("meetingName")}</div>}
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
                            {props.CreateMeetingStore.meetingDetails.description && <div className="textAboveInput  margin-right-text">{props.t("shortDescription")}</div>}
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
                            {props.CreateMeetingStore.meetingDetails.owner.name && <div className="textAboveInput  margin-right-text">{props.t("ownerFullName")}</div>}
                            <input
                                type="text"
                                className={'inputStyle margin-right-text ' + (isSaved && (!props.CreateMeetingStore.meetingDetails.owner.name || (props.CreateMeetingStore.meetingDetails.owner.name && !props.CreateMeetingStore.meetingDetails.owner.name.length)) ? "error" : "")}
                                onChange={props.CreateMeetingStore.changeMeetingFacilitatorName}
                                value={props.CreateMeetingStore.meetingDetails.owner.name || ''}
                                autoComplete="off"
                                placeholder={props.t("ownerFullName")}
                            />
                        </div>

                        <div className='position-relative'>
                            {props.CreateMeetingStore.meetingDetails.owner.email && <div className="textAboveInput  margin-right-text">{props.t("email")}</div>}
                            <input
                                type="text"
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

                        <div className='position-relative'>
                            {props.CreateMeetingStore.meetingDetails.owner.phone && <div className="textAboveInput  margin-right-text">{props.t("phone")}</div>}
                            <input
                                type="text"
                                className={'inputStyle margin-right-text ' + (isSaved && (!props.CreateMeetingStore.meetingDetails.owner.phone || (props.CreateMeetingStore.meetingDetails.owner.phone && !props.CreateMeetingStore.meetingDetails.owner.phone.length)) ? "error" : "")}
                                onChange={props.CreateMeetingStore.changeMeetingFacilitatorPhoneNumber}
                                value={props.CreateMeetingStore.meetingDetails.owner.phone}
                                autoComplete="off"
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

                        <div className='position-relative'>
                            {props.CreateMeetingStore.meetingDetails.language && <div className="textAboveInput  margin-right-text">{props.t("meetingLanguage")}</div>}
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
                                    {Boolean(props.CreateMeetingStore.meetingDetails.isOpen) !== "" && Boolean(props.CreateMeetingStore.meetingDetails.isOpen) ?
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
                                <div style={{ marginLeft: "2vh" }}>{props.t("meetingIsOpen")}</div>
                            </div>
                            <div className="d-flex align-items-center" onClick={() => props.CreateMeetingStore.changeMeetingOpenOrClose({ target: { value: false } })}>
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
                                <div style={{ marginLeft: "2vh" }}><img src={lock} alt="lock" style={{ marginLeft: "1vh", width: "1.5vh" }} />{props.t("meetingIsClosed")}</div>
                            </div>
                        </div>
                        {props.CreateMeetingStore.meetingDetails.code &&
                            <div className="openOrCloseDetails" style={{ marginRight: '6vw', marginLeft: '6vw', fontSize: '1.8vh', marginBottom: '2vh' }}>
                                {props.LanguageStore.lang !== 'heb' ?
                                    '*Open Meeting - Open to anyone interested in joining, Closed Meeting - Meeting only for invited participants' :
                                    '  *מפגש פתוח - מפגש הפתוח לכל מי שמעוניין להצטרף, מפגש פרטי - מפגש המיועד למשתתפים מוזמנים בלבד'
                                }


                            </div>}
                        <br />
                        <div className="containDateAndTime">
                            <div className='containDateInput position-relative'>
                                {props.CreateMeetingStore.meetingDetails.date && <div className="textAboveInput">{props.t("date")}</div>}
                                <Select
                                    selectTextDefault={props.CreateMeetingStore.meetingDetails.date !== '' ? props.CreateMeetingStore.meetingDetails.date === "יום שני, ג באייר, 27.04" ? props.t("monday") : props.CreateMeetingStore.meetingDetails.date : props.t("date")}
                                    arr={meetingDate}
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
                            {props.CreateMeetingStore.meetingDetails.max_participants && <div className="textAboveInput  margin-right-text">{props.t("maxParticipationNumber")}</div>}
                            <input
                                type="text"
                                onBlur={() => {
                                    if (props.CreateMeetingStore.meetingDetails.max_participants < 10)
                                        setErrorMaxParticipants(props.t("maximumNumberOfParticipantsMustBe10ParticipantsOrMore"))
                                    else if (props.CreateMeetingStore.meetingDetails.max_participants > 500)
                                        setErrorMaxParticipants(props.t("maximumNumberOfParticipantsMustBeLessThan500Participants"))
                                }}

                                onTouchEnd={() => {
                                    if (props.CreateMeetingStore.meetingDetails.max_participants < 10)
                                        setErrorMaxParticipants(props.t("maximumNumberOfParticipantsMustBe10ParticipantsOrMore"))
                                    else if (props.CreateMeetingStore.meetingDetails.max_participants > 500)
                                        setErrorMaxParticipants(props.t("maximumNumberOfParticipantsMustBeLessThan500Participants"))
                                }}
                                onFocus={() => setErrorMaxParticipants(false)}
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
                                    <div>
                                        <img style={{ cursor: 'pointer' }} onClick={() => { setReadBylaw(!readBylaw) }} src={readBylaw ? checkbox_on_light : checkbox_off_light} />

                                    </div>
                                    {/* <input style={{ margin: props.LanguageStore.lang !== 'heb' ? '0' : null }} type="radio" className={(isSaved && !readBylaw) ? "error" : ""} id="readBylaw" name="readBylaw" value={false} onClick={() => setReadBylaw(true)} /> */}
                                    <label htmlFor="readBylaw" className="mb-0" style={{ marginLeft: "2vh" }}>

                                        {props.LanguageStore.lang !== 'heb' ?
                                            <div>Iv'e read and accepted the
                                     <a href={`${process.env.REACT_APP_DOMAIN}/terms.pdf`} target="_blank"> terms and conditions </a>.
                                        </div>
                                            :
                                            <div>אני מסכים/ה ל<span className='contentClick' onClick={() => window.open(`${process.env.REACT_APP_DOMAIN}/terms.pdf`)}>תקנון</span> ולתנאי השימוש באתר.</div>
                                        }


                                    </label>
                                </div>
                            </div>


                        </div>

                        <div className="containCreateMettingButton">
                            <div className="createMeetingButton grow" onClick={async () => {
                                if (wait) return
                                if (!props.CreateMeetingStore.waitForData) {
                                    setWait(true)
                                    setIsSaved(true)
                                    if (!readBylaw) {
                                        let error = props.LanguageStore.lang !== 'heb' ? "You must read the terms before adding the meeting" : "עליך לקרוא את התקנון לפני ההוספה"
                                        props.CreateMeetingStore.setError(error)
                                        setWait(false)
                                        return
                                    }
                                    let meeting = await props.CreateMeetingStore.createNewMeetingPost(props.LanguageStore.lang)
                                    if (meeting) {
                                        setSuccess(meeting[0])
                                    }
                                    setWait(false)
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
                    {console.log("pressOnCancel", pressOnCancel, "dataForFallen", dataForFallen)}
                    {(dataForFallen || !pressOnCancel) && <TextSIdeDiv t={props.t} setPressOnCancel={setPressOnCancel} dataForFallen={dataForFallen} setDataForFallen={setDataForFallen} />}
                </div >
                : <Success history={props.history} meeting={success} t={props.t} />
        }
        </div >

    )
}
export default inject('CreateMeetingStore', 'LanguageStore')(observer(CreateMeeting));