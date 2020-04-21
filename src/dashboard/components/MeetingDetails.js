import React from 'react';
import { useEffect } from 'react';
import { useCopyToClipboard } from 'react-use';
import '../style/dashboardMain.css'
import '../style/meetingInfo.scss'
import '../../styles/createMeeting.css'
import { inject, observer } from 'mobx-react';
import ErrorMethod from '../../components/ErrorMethod';
import person from '../../icons/person.svg'
import materialInfo from '../../icons/material-info.svg'
import lock from '../../icons/lock.svg'
import Select from '../../components/Select'
import DeleteMeetingPopup from './DeleteMeetingPopup'
import checkbox_off_light from '../../icons/checkbox_off_light.svg'
import checkbox_on_light from '../../icons/checkbox_on_light.svg'
import FallenDetails from "../../components/FallenDetails"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MeetingDetails = (props) => {

    const [errorEmail, setErrorEmail] = React.useState(false)
    const [errorPhone, setErrorPhone] = React.useState(false)
    const [errorMaxParticipants, setErrorMaxParticipants] = React.useState(false)
    const [dataForFallen, setDataForFallen] = React.useState(false)
    const [isSaved, setIsSaved] = React.useState(false)
    const [success, setSuccess] = React.useState(false)
    const [showDeleteMeetingPopup, setShowDeleteMeetingPopup] = React.useState(false)
    const [, copyToClipboard] = useCopyToClipboard()


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
        (async () => {
            let path = props.history.location.pathname.split("/")
            let meetingId = path[path.length - 1]
            props.CreateMeetingStore.setMeetingId(meetingId)
            await props.CreateMeetingStore.getMeetingDetails()
        })()

        return () => { props.CreateMeetingStore.resetAll() }
    }, []);

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

    const showFallens = () => {
        if (!props.CreateMeetingStore.meetingDetails.fallens)
            props.CreateMeetingStore.changeFallens(0)

        return (
            <div>{props.CreateMeetingStore.meetingDetails.fallens && props.CreateMeetingStore.meetingDetails.fallens.length &&
                props.CreateMeetingStore.meetingDetails.fallens.map((fallen, index) => {
                    return <FallenDetails t={props.t} key={index} isSaved={isSaved} fallen={fallen} setDataForFallen={setDataForFallen} index={index} isDash={true} />
                })
            }
                {props.CreateMeetingStore.meetingId === -1 && <div className="addFallen grow" onClick={() => { props.CreateMeetingStore.changeFallens(props.CreateMeetingStore.meetingDetails.fallens.length) }}> + {props.t("addFallen")}</div>}
            </div>)
    }

    return (
        <div style={{ minHeight: '95vh', marginTop: '6vh' }}>
            {props.CreateMeetingStore.res ?
                <div style={{ textAlign: "right" }} className="CreateMeeting">
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
                            <img style={{ width: "18px", marginLeft: "1vh" }} src={person} alt="person" />
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
                                selectTextDefault={props.CreateMeetingStore.meetingDetails.language !== '' ? props.CreateMeetingStore.meetingDetails.language : props.t("meetingLanguage")}
                                arr={meetingLanguage}
                                width='calc(100% - 12vw)'
                                // selectedText={props.CreateMeetingStore.meetingDetails.language}
                                className={'inputStyle margin-right-text p-0 ' + (isSaved && (!props.CreateMeetingStore.meetingDetails.language || (props.CreateMeetingStore.meetingDetails.language && !props.CreateMeetingStore.meetingDetails.language.length)) ? "error" : "")}
                                onChoseOption={(value) => { props.CreateMeetingStore.changeMeetingLanguage(value.data) }} />
                        </div>

                        <div className="margin-right-text d-flex align-items-center" style={{ marginBottom: "2vh" }}>
                            <div className="d-flex align-items-center" onClick={() => props.CreateMeetingStore.changeMeetingOpenOrClose({ target: { value: true } })}>
                                <div>
                                    {Boolean(props.CreateMeetingStore.meetingDetails.isOpen) ?
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
                                    {!Boolean(props.CreateMeetingStore.meetingDetails.isOpen) ?
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
                            <div className='position-relative' style={{ marginBottom: '-2vh', marginTop: '3vh' }}>
                                <div className="textAboveInput  margin-right-text">קוד מפגש</div>
                                <input
                                    type="text"
                                    disabled
                                    className={'inputStyle margin-right-text ' + (isSaved && (!props.CreateMeetingStore.meetingDetails.owner.phone || (props.CreateMeetingStore.meetingDetails.owner.phone && !props.CreateMeetingStore.meetingDetails.owner.phone.length)) ? "error" : "")}
                                    onChange={() => { }}
                                    value={props.CreateMeetingStore.meetingDetails.code}
                                />
                            </div>
                        }
                        <div style={{ marginRight: '6vw', fontSize: '1.8vh', marginBottom: '2vh' }}>*מפגש פתוח - מפגש הפתוח לכל מי שמעוניין להצטרף, מפגש סגור - מפגש המיועד למשתתפים מוזמנים בלבד</div>
                        <br />
                        <div className="containDateAndTime">
                            <div className='containDateInput position-relative'>
                                {props.CreateMeetingStore.meetingDetails.date && <div className="textAboveInput">{props.t("date")}</div>}
                                <Select
                                    selectTextDefault={props.CreateMeetingStore.meetingDetails.date !== '' ? props.CreateMeetingStore.meetingDetails.date : props.t("meetingIsClosed")}
                                    arr={meetingDate}
                                    width='100%'
                                    // selectedText={props.CreateMeetingStore.meetingDetails.date}
                                    className={'inputStyle p-0 ' + (isSaved && (!props.CreateMeetingStore.meetingDetails.date || (props.CreateMeetingStore.meetingDetails.date && !props.CreateMeetingStore.meetingDetails.date.length)) ? "error" : "")}
                                    onChoseOption={(value) => { props.CreateMeetingStore.changeMeetingDate(value.data) }} />
                            </div>

                            <div className='containSelectTime position-relative'>

                                {((props.CreateMeetingStore.meetingDetails.timeHour || props.CreateMeetingStore.meetingDetails.timeMinute) && (props.CreateMeetingStore.meetingDetails.timeHour.length || props.CreateMeetingStore.meetingDetails.timeMinute.length)) && <div className="textAboveInput">שעה (שעון ישראל):</div>}
                                <Select
                                    selectTextDefault={props.CreateMeetingStore.meetingDetails.timeMinute !== '' ? props.CreateMeetingStore.meetingDetails.timeMinute : "דקות"}
                                    arr={meetingTimeMinute}
                                    width='100%'
                                    // selectedText={props.CreateMeetingStore.meetingDetails.date}
                                    className={'inputStyle p-0 ' + (isSaved && (!props.CreateMeetingStore.meetingDetails.timeHour || (props.CreateMeetingStore.meetingDetails.timeHour && !props.CreateMeetingStore.meetingDetails.timeHour.length)) ? "error" : "")}
                                    onChoseOption={(value) => { props.CreateMeetingStore.changeMeetingTimeMinute(value.data) }} />

                                <div className="timeDot">:</div>
                                <Select
                                    selectTextDefault={props.CreateMeetingStore.meetingDetails.timeHour !== "" ? props.CreateMeetingStore.meetingDetails.timeHour : "שעות"}
                                    arr={meetingTimeHour}
                                    width='100%'
                                    // selectedText={props.CreateMeetingStore.meetingDetails.date}
                                    className={'inputStyle p-0 ' + (isSaved && (!props.CreateMeetingStore.meetingDetails.timeMinute || (props.CreateMeetingStore.meetingDetails.timeMinute && !props.CreateMeetingStore.meetingDetails.timeMinute.length)) ? "error" : "")}
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
                                    if (props.CreateMeetingStore.meetingDetails && props.CreateMeetingStore.meetingDetails.fallens) {
                                        for (let fallen in props.CreateMeetingStore.meetingDetails.fallens) {
                                            if (fallen.relative === "האחים שלנו" || "בית אביחי" || "בית אבי חי") {
                                                if (props.CreateMeetingStore.meetingDetails.max_participants > 2000) {
                                                    setErrorMaxParticipants("מקסימום מספר המשתתפים חייב להיות 2000 או פחות")
                                                    return
                                                }
                                            }
                                        }
                                    }
                                    if (!errorMaxParticipants && props.CreateMeetingStore.meetingDetails.max_participants > 500)
                                        setErrorMaxParticipants(props.t("maximumNumberOfParticipantsMustBeLessThan500Participants"))
                                }}

                                onTouchEnd={() => {
                                    if (props.CreateMeetingStore.meetingDetails.max_participants < 10)
                                        setErrorMaxParticipants(props.t("maximumNumberOfParticipantsMustBe10ParticipantsOrMore"))
                                    if (props.CreateMeetingStore.meetingDetails && props.CreateMeetingStore.meetingDetails.fallens) {
                                        for (let fallen in props.CreateMeetingStore.meetingDetails.fallens) {
                                            if (fallen.relative === "האחים שלנו" || "בית אביחי" || "בית אבי חי") {
                                                if (props.CreateMeetingStore.meetingDetails.max_participants > 2000) {
                                                    setErrorMaxParticipants("מקסימום מספר המשתתפים חייב להיות 2000 או פחות")
                                                    return
                                                }
                                            }
                                        }
                                    }
                                    if (!errorMaxParticipants && props.CreateMeetingStore.meetingDetails.max_participants > 500)
                                        setErrorMaxParticipants(props.t("maximumNumberOfParticipantsMustBeLessThan500Participants"))
                                }}

                                onFocus={() => setErrorMaxParticipants(false)}
                                className={'inputStyle margin-right-text ' + (isSaved && (!props.CreateMeetingStore.meetingDetails.max_participants) ? "error" : "")}
                                onChange={props.CreateMeetingStore.changeNumberOfParticipants}
                                // style={errorMaxParticipants ?
                                //     { marginBottom: "0" } : {}}
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

                        </div>
                    </div>

                    {props.CreateMeetingStore.meetingDetails.zoomId && props.CreateMeetingStore.meetingDetails.zoomId !== '' &&
                        <div>
                            <div className='position-relative'>
                                <div className="textAboveInput  margin-right-text">קישור לזום משתתפים</div>
                                <input
                                    type="text"
                                    disabled={props.CreateMeetingStore.meetingDetails.max_participants > 300 || props.CreateMeetingStore.meetingDetails.owner.name !== 'האחים שלנו'}
                                    className={'inputStyle margin-right-text '}
                                    onChange={props.CreateMeetingStore.changeZoomId}
                                    value={props.CreateMeetingStore.meetingDetails.zoomId}
                                />
                                <FontAwesomeIcon className='copy' icon={['fas', 'copy']} onClick={() => { copyToClipboard(props.CreateMeetingStore.meetingDetails.zoomId) }} />
                            </div>
                            <div className='position-relative'>
                                <div className="textAboveInput  margin-right-text">קישור לזום מארח</div>
                                <input
                                    type="text"
                                    disabled
                                    className={'inputStyle margin-right-text '}
                                    onChange={() => { }}
                                    value={props.CreateMeetingStore.meetingDetails.zoomId.replace('j', 's')}
                                />
                                <FontAwesomeIcon className='copy' icon={['fas', 'copy']} onClick={(ssss) => { copyToClipboard(props.CreateMeetingStore.meetingDetails.zoomId.replace('j', 's')) }} />
                            </div>
                        </div>
                    }

                    <div className='d-flex align-items-center pb-5 pt-4' style={{ float: 'left' }}>
                        <div style={{ marginRight: '6vw', marginLeft: '2vw', width: '2.5vh' }} className='trash' onClick={() => setShowDeleteMeetingPopup(true)}>
                            <FontAwesomeIcon icon={['fas', 'trash']} />
                            <div className='trashText'>מחק מפגש</div>
                        </div>
                        {!props.CreateMeetingStore.meetingDetails.approved && props.CreateMeetingStore.meetingDetails.owner.email &&
                            <div
                                onClick={() => props.CreateMeetingStore.approveMeeting(props.CreateMeetingStore.meetingDetails.owner.email, props.CreateMeetingStore.meetingDetails.owner.name)}
                                className="grow"
                                style={{ cursor: 'pointer', marginLeft: '20px', backgroundColor: '#00726B', padding: '3px 3vw', borderRadius: '10px', color: 'white', fontSize: '20px' }}>
                                אישור מפגש
                                    </div>
                        }
                        {props.CreateMeetingStore.meetingDetails.approved && props.CreateMeetingStore.meetingDetails.owner.email && (!props.CreateMeetingStore.meetingDetails.zoomId || props.CreateMeetingStore.meetingDetails.zoomId === '') &&
                            <div
                                onClick={() => props.CreateMeetingStore.newZoom(props.CreateMeetingStore.meetingDetails.owner.email, props.CreateMeetingStore.meetingDetails.owner.name)}
                                className="grow"
                                style={{ cursor: 'pointer', marginLeft: '20px', backgroundColor: '#00726B', padding: '3px 3vw', borderRadius: '10px', color: 'white', fontSize: '20px' }}>
                                שלח מייל של זום חדש
                                    </div>
                        }
                        <div
                            className="grow"
                            style={{ cursor: 'pointer', backgroundColor: 'var(--custom-orange)', padding: '3px 3vw', borderRadius: '10px', color: 'white', fontSize: '20px' }}
                            onClick={async () => {
                                setIsSaved(true)
                                if (props.CreateMeetingStore.meetingId === -1) {
                                    let meeting = await props.CreateMeetingStore.createNewMeetingPost()
                                    if (meeting) {
                                        setSuccess(meeting[0])
                                    }
                                }
                                else {
                                    await props.CreateMeetingStore.updateMeeting()
                                }
                            }}>
                            {props.CreateMeetingStore.waitForData ?
                                <div className="spinner">
                                    <div className="bounce1"></div>
                                    <div className="bounce2"></div>
                                    <div className="bounce3"></div>
                                </div>
                                : props.t("save")
                            }

                            {/* {this.props.t("approval")} */}
                        </div>
                    </div>
                    {
                        props.CreateMeetingStore.error &&
                        <ErrorMethod {...props} />
                    }
                </div>
                :
                <div style={{ margin: '10vh auto 0 auto' }}>
                    <div className="spinner-border" style={{ color: 'var(--custom-blue)' }} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            }
            {showDeleteMeetingPopup && <DeleteMeetingPopup handleClose={() => setShowDeleteMeetingPopup(false)} meetingId={props.CreateMeetingStore.meetingId} history={props.history} />}
        </div>

    )
}

export default inject('CreateMeetingStore')(observer(MeetingDetails));