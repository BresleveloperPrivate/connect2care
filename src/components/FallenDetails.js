import React, { useState, useEffect } from 'react';
import Select from './Select.js'
import cancel from '../icons/cancel.svg'

import speachBooble from "../icons/speakBobble.svg"
import { observer, PropTypes, inject } from 'mobx-react';

import blueCandle from '../icons/candle-blue.svg'
import close from '../icons/close.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import grayCandle from '../icons/gray-candle.svg'
import fallenFallBack from "../icons/fallenFallback.jpeg"

import SearchFallen from './SearchFallen.jsx';
import { useCreateMeetingStore } from '../stores/createMeeting.store.js';

const FallenDetails = (props) => {
    const [dissmisedPic, setDissmisedPic] = useState(true)

    const myCloseToTheFallen = [
        { option: props.t('brother or sister'), data: 'אח/ות' },
        { option: props.t('parent'), data: 'הורים' },
        { option: props.t('family member'), data: 'קרובי משפחה' },
        { option: props.t('widower'), data: 'אלמן/ אלמנה' },
        { option: props.t('orphans'), data: 'יתומים' },
        { option: props.t('friend'), data: 'חבר/ה' },
        props.isDash && { option: 'בית אבי חי', data: 'בית אביחי' },
        props.isDash && { option: 'האחים שלנו', data: 'האחים שלנו' },
        !props.isDash && { option: props.t('other'), data: 'אחר' },
    ]
    const CreateMeetingStore = useCreateMeetingStore();

    useEffect(() => {

        props.LanguageStore.setWidth(window.innerWidth)

    }, [CreateMeetingStore.fallenDetails, CreateMeetingStore.fallenName, CreateMeetingStore.meetingDetails, CreateMeetingStore.meetingDetails.fallens]);


    let findImage = CreateMeetingStore.fallenDetails && CreateMeetingStore.fallenDetails[props.fallen.id]
    return (
        <div className="containFallenDetails">
            {props.LanguageStore.width > 550 && <img style={props.LanguageStore.lang !== "heb" ? { marginRight: "2vh" } : { marginLeft: "2vh" }} src={blueCandle} alt="blueCandle" />}
            <div style={{ width: props.LanguageStore.width > 550 ? "70%" : "", position: "relative" }}>

                {((CreateMeetingStore.fallenName && CreateMeetingStore.fallenName[props.index]) || CreateMeetingStore.fallenDetails && CreateMeetingStore.fallenDetails[props.fallen.id] && CreateMeetingStore.fallenDetails[props.fallen.id].name) && <div className="textAboveInput" style={{ width: "clac(100% - 6vw)" }}>

                    {props.LanguageStore.lang !== 'heb' ? 'Fallen name' : "שם החלל"}
                </div>}

                <div className='searchStyle' style={{ display: 'flex', marginBottom: '3vh' }}>
                    <SearchFallen setDataForFallen={props.setDataForFallen} index={props.index} fallen={props.fallen} isSaved={props.isSaved} />
                </div>

                <div className='position-relative'>
                    {CreateMeetingStore.fallenDetails && CreateMeetingStore.fallenDetails[props.fallen.id] && CreateMeetingStore.fallenDetails[props.fallen.id].fallingDate && <div className="textAboveInput">
                        {props.t('fallDate')}
                    </div>}
                    <input
                        type="text"
                        className='inputStyle dateContainer'
                        disabled
                        style={{ width: "95%" }}
                        value={(CreateMeetingStore.fallenDetails && CreateMeetingStore.fallenDetails[props.fallen.id] && CreateMeetingStore.fallenDetails[props.fallen.id].fallingDate) || ''}
                        autoComplete="off"
                        placeholder={props.t('fallDate')}
                    />
                </div>
                <div className='position-relative'>
                    {CreateMeetingStore.meetingDetails.fallens[props.index].relative && <div className="textAboveInput">
                        {props.t('my relative to the fallen')}
                    </div>}

                    <Select
                        img={props.isDash}
                        // disabled={CreateMeetingStore.meetingId !== -1}
                        selectTextDefault={CreateMeetingStore.meetingDetails.fallens[props.index].relative ? CreateMeetingStore.meetingDetails.fallens[props.index].relative :
                            props.t('my relative to the fallen')
                        }
                        defaultSelectRelative={props.t('my relative to the fallen')}
                        arr={myCloseToTheFallen}
                        // selectedText={CreateMeetingStore.meetingDetails.relationship}
                        width='95%'
                        className={'inputStyle p-0 ' + (props.isSaved && (!CreateMeetingStore.meetingDetails.fallens || (CreateMeetingStore.meetingDetails.fallens && !CreateMeetingStore.meetingDetails.fallens[props.index]) || (CreateMeetingStore.meetingDetails.fallens && CreateMeetingStore.meetingDetails.fallens[props.index] && !CreateMeetingStore.meetingDetails.fallens[props.index].relative)) ? "error" : "")}
                        onChoseOption={(value) => { CreateMeetingStore.changeFallenRelative(value.data, props.fallen.id) }} />
                    {CreateMeetingStore.meetingDetails.fallens[props.index].needAlert ?
                        <div className="speakBobble" style={{ bottom: CreateMeetingStore.meetingDetails.fallens[props.index].relative === "אחר" ? "-30px" : props.LanguageStore.width > 550 ? "-10px" : "-30px" }}>
                            <img src={speachBooble} alt="speachBooble" />
                            <div className="position-absolute" style={{ paddingTop: "1vh", fontSize: '0.8em', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                <img src={cancel} alt="cancel" className="cancelSpeakBooble pointer" onClick={() => { CreateMeetingStore.changeNeedAlert(false, props.fallen.id) }} />
                                {props.t('bringFamilyMember')}
                            </div>
                        </div> : null}
                </div>

                {CreateMeetingStore.meetingDetails.fallens[props.index].relative === "אחר" &&
                    <input
                        disabled={CreateMeetingStore.meetingId !== -1}
                        type="text"
                        className={'inputStyle ' + (CreateMeetingStore.meetingId !== -1 ? "dateContainer" : "") + (props.isSaved && (CreateMeetingStore.fallens && CreateMeetingStore.fallens[props.index] && !CreateMeetingStore.fallens[props.index].relative ||
                            (CreateMeetingStore.meetingDetails.otherRelationship && CreateMeetingStore.meetingDetails.otherRelationship[props.index] && CreateMeetingStore.meetingDetails.otherRelationship[props.index].relative && !CreateMeetingStore.meetingDetails.otherRelationship[props.index].relative.length)) ? "error" : "")}
                        style={{ width: "95%", marginBottom: CreateMeetingStore.meetingDetails.fallens.length > 1 && CreateMeetingStore.meetingId === -1 ? "2vh" : "4vh" }}
                        value={CreateMeetingStore.meetingDetails.otherRelationship && CreateMeetingStore.meetingDetails.otherRelationship.length > props.index && CreateMeetingStore.meetingDetails.otherRelationship[props.index].relative}
                        onChange={e => CreateMeetingStore.setOtherRelationship(e, props.index)}
                        autoComplete="off"
                        placeholder={props.t('my relative to the fallen')}

                    />}
                {CreateMeetingStore.meetingDetails.fallens.length > 1 && CreateMeetingStore.meetingId === -1 &&
                    <div className={"d-flex align-items-center pointer " + (props.LanguageStore.width > 550 ? "" : "margin-right-text")} style={{
                        width: "-webkit-fill-available",
                        marginBottom: "4vh"
                    }} onClick={() => CreateMeetingStore.deleteFromFallens(props.index)}>
                        <img src={close} alt="close" className="closeChoose" style={props.LanguageStore.lang === "heb" ? { marginLeft: "2vh", height: "22px", padding: "1px" } : { marginRight: "2vh", height: "22px", padding: "1px" }} />
                        <div className="deleteChooseText">
                            {props.LanguageStore.lang === "heb" ? "הסר בחירה" : "Remove selection"}
                        </div>
                    </div>
                }
            </div>
            <div className={(findImage && dissmisedPic ? "exictingPic" : "candleImg")} >

                <img src={(findImage && dissmisedPic) ? (CreateMeetingStore.fallenDetails[props.fallen.id].image !== "" && CreateMeetingStore.fallenDetails[props.fallen.id].image) ? CreateMeetingStore.fallenDetails[props.fallen.id].image : fallenFallBack : grayCandle}
                    alt="grayCandle" style={
                        findImage && dissmisedPic ? { height: "24vh", borderRadius: "4px" } : { height: "13vh" }} />
            </div>
        </div>
    )
}
export default inject('LanguageStore')(observer(FallenDetails))