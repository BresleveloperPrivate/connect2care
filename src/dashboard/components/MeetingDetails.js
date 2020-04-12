import React, { useState, useEffect } from 'react';
import '../style/dashboardMain.css'
import '../style/meetingInfo.css'
import '../../styles/createMeeting.css'
import { inject, observer, PropTypes } from 'mobx-react';
import ErrorMethod from '../../components/ErrorMethod';
import Success from '../../components/Success.jsx'
import person from '../../icons/person.svg'
import materialInfo from '../../icons/material-info.svg'
import lock from '../../icons/lock.svg'
import Select from '../../components/Select'

import FallenDetails from "../../components/FallenDetails"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const MeetingDetails = (props) => {

    const [pressOnCancel, setPressOnCancel] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPhone, setErrorPhone] = useState(false)
    const [errorMaxParticipants, setErrorMaxParticipants] = useState(false)
    const [timeValue, setTimeValue] = useState()
    const [dataForFallen, setDataForFallen] = useState(false)
    const [isSaved, setIsSaved] = useState(false)
    const [success, setSuccess] = useState(false)

    const meetingLanguage = [
        { option: 'עברית', data: 'עברית' },
        { option: 'English', data: 'English' },
        { option: 'français', data: 'français' },
        { option: 'العربية', data: 'العربية' },
        { option: 'русский', data: 'русский' },
        { option: 'አማርኛ', data: 'አማርኛ' },
        { option: 'español', data: 'español' },
    ]
    const meetingDate = [
        { option: props.t('sunday'), data: 'יום ראשון, ב באייר, 26.04' },
        { option: props.t('monday'), data: 'יום שני, ג באייר, 27.04' },
        { option: props.t('tuesday'), data: 'יום שלישי, ד באייר, 28.04' },
        { option: props.t('wednesday'), data: 'יום רביעי, ה באייר, 29.04' },
    ]
    const meetingTimeHour = [
        { option: '8', data: '8' },
        { option: '9', data: '9' },
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


    useEffect(() => {
        (async () => {
            let path = props.history.location.pathname.split("/")
            let meetingId = path[path.length - 1]
            props.CreateMeetingStore.setMeetingId(meetingId)
            await props.CreateMeetingStore.getMeetingDetails()
            // getTimeValue()
        })()
    }, []);


    // const getTimeValue = () => {
    //     let time = new Date()
    //     time.setHours(props.CreateMeetingStore.meetingDetails.time.split(":")[0])
    //     time.setMinutes(props.CreateMeetingStore.meetingDetails.time.split(":")[1])
    //     setTimeValue(time)
    // }

    const emailValidate = (e) => {
        console.log(e.target.value)
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;
        if (!e.target.value.match(regex)) {
            setErrorEmail(true)
        }
        else setErrorEmail(false)
    }
    const phoneValidate = (e) => {
        console.log(e.target.value)
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
                    return <FallenDetails key={index} isSaved={isSaved} fallen={fallen} setDataForFallen={setDataForFallen} index={index} />
                })
            }
                <div className="addFallen grow" onClick={() => { props.CreateMeetingStore.changeFallens(props.CreateMeetingStore.meetingDetails.fallens.length) }}> + {props.t("addFallen")}</div>
            </div>)
    }

    return (
        <div>
            {!success ?
                <div style={{ textAlign: "right" }} className="CreateMeeting">
                    <div className="headLine" style={{ marginTop: "6vh", fontSize: '3.5vh' }}>
                        <FontAwesomeIcon className='pointer ml-3' icon="arrow-right" color="var(--custom-gray)" onClick={props.history.goBack} /> {props.CreateMeetingStore.meetingId === -1 ? props.t("createTheMeeting") : props.t("editMeeting")}
                    </div>
                    {/* <div className="headLine" style={{ fontSize: '2vh' }}>*שימו לב: על מנת לקיים מפגש יש צורך במינימום עשרה אנשים </div> */}
                    <div className='meetingDetailsDash'>
                        <div className='position-relative'>
                            {props.CreateMeetingStore.meetingDetails.name && <div className="textAboveInput  margin-right-text">{props.t("meetingName")}</div>}
                            <input
                                type="text"
                                onBlur={() => props.CreateMeetingStore.getAllMeetings()}
                                onTouchEnd={() => props.CreateMeetingStore.getAllMeetings()}
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
                                disabled={props.CreateMeetingStore.meetingId === -1 ? false : true}
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
                                disabled={props.CreateMeetingStore.meetingId === -1 ? false : true}
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
                                disabled={props.CreateMeetingStore.meetingId === -1 ? false : true}
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
                                width='calc(73% - 12vw)'
                                // selectedText={props.CreateMeetingStore.meetingDetails.language}
                                className={'inputStyle margin-right-text p-0 ' + (isSaved && (!props.CreateMeetingStore.meetingDetails.language || (props.CreateMeetingStore.meetingDetails.language && !props.CreateMeetingStore.meetingDetails.language.length)) ? "error" : "")}
                                onChoseOption={(value) => { props.CreateMeetingStore.changeMeetingLanguage(value.data) }} />
                        </div>

                        <div className="margin-right-text d-flex align-items-center" style={{ marginBottom: "2vh" }}>
                            <input type="radio" className={(isSaved && !props.CreateMeetingStore.meetingDetails.isOpen) ? "error" : ""} id="open" name="meeting" value={true} onChange={props.CreateMeetingStore.changeMeetingOpenOrClose} checked={props.CreateMeetingStore.meetingDetails.isOpen} />
                            <label htmlFor="open" className="mb-0" style={{ marginLeft: "2vh" }}>{props.t("meetingIsOpen")}</label>
                            <input type="radio" id="close" name="meeting" value={false} className={(isSaved && !props.CreateMeetingStore.meetingDetails.isOpen) ? "error" : ""} onChange={props.CreateMeetingStore.changeMeetingOpenOrClose} checked={!props.CreateMeetingStore.meetingDetails.isOpen} />
                            <label htmlFor="close" className="mb-0"><img src={lock} alt="lock" style={{ marginLeft: "1vh", width: "1.5vh" }} />{props.t("meetingIsClosed")}</label>
                        </div>
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

                                {props.CreateMeetingStore.meetingDetails.time && <div className="textAboveInput">{props.t("time")}</div>}
                                {//<div className={'inputStyleTime inputStyle d-flex align-items-center ' + (isSaved && (!props.CreateMeetingStore.meetingDetails.time || (props.CreateMeetingStore.meetingDetails.time && !props.CreateMeetingStore.meetingDetails.time.length)) ? "error" : "")}>
                                }
                                <Select
                                    selectTextDefault="דקות"
                                    arr={meetingTimeMinute}
                                    width='100%'
                                    // selectedText={props.CreateMeetingStore.meetingDetails.date}
                                    className={'inputStyle p-0 ' + (isSaved && (!props.CreateMeetingStore.meetingDetails.timeHour || (props.CreateMeetingStore.meetingDetails.timeHour && !props.CreateMeetingStore.meetingDetails.timeHour.length)) ? "error" : "")}
                                    onChoseOption={(value) => { props.CreateMeetingStore.changeMeetingTimeHour(value.data) }} />

                                <div className="timeDot">:</div>
                                <Select
                                    selectTextDefault="שעות"
                                    arr={meetingTimeHour}
                                    width='100%'
                                    // selectedText={props.CreateMeetingStore.meetingDetails.date}
                                    className={'inputStyle p-0 ' + (isSaved && (!props.CreateMeetingStore.meetingDetails.timeMinute || (props.CreateMeetingStore.meetingDetails.timeMinute && !props.CreateMeetingStore.meetingDetails.timeMinute.length)) ? "error" : "")}
                                    onChoseOption={(value) => { props.CreateMeetingStore.changeMeetingTimeMinute(value.data) }} />

                                {//</div>
                                }
                            </div>

                        </div>
                        <div className="position-relative">
                            {props.CreateMeetingStore.meetingDetails.max_participants && <div className="textAboveInput  margin-right-text">{props.t("maxParticipationNumber")}</div>}
                            <input
                                type="text"
                                onBlur={() => {
                                    if (props.CreateMeetingStore.meetingDetails.max_participants < 10)
                                        setErrorMaxParticipants(props.t("maximumNumberOfParticipantsMustBe10ParticipantsOrMore"))
                                    else if (props.CreateMeetingStore.meetingDetails.max_participants > 3000)
                                        setErrorMaxParticipants(props.t("maximumNumberOfParticipantsMustBeLessThan3000Participants"))
                                }}

                                onTouchEnd={() => {
                                    if (props.CreateMeetingStore.meetingDetails.max_participants < 10)
                                        setErrorMaxParticipants(props.t("maximumNumberOfParticipantsMustBe10ParticipantsOrMore"))
                                    else if (props.CreateMeetingStore.meetingDetails.max_participants > 3000)
                                        setErrorMaxParticipants(props.t("maximumNumberOfParticipantsMustBeLessThan3000Participants"))
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

                        <div
                            className="containCreateMettingButton"
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
                            <div className="createMeetingButton grow">
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
                    </div>
                    {
                        props.CreateMeetingStore.error &&
                        <ErrorMethod {...props} />
                    }
                </div>
                : <Success history={props.history} meeting={success} t={props.t} />
            }
        </div>

    )
}

export default inject('CreateMeetingStore')(observer(MeetingDetails));