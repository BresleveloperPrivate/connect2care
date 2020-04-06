import React, { useState, useEffect } from 'react';
import Select from '../../components/Select'
import cancel from '../../icons/cancel.svg'

import speachBooble from "../../icons/speakBobble.svg"

import blueCandle from '../../icons/candle-blue.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import grayCandle from '../../icons/gray-candle.svg'
import Auth from '../../modules/auth/Auth'
import SearchFallen from '../../components/SearchFallen.jsx';
import { inject, observer } from 'mobx-react';

const FallenDetails = (props) => {
    const [dissmisedPic, setDissmisedPic] = useState(true)

    const myCloseToTheFallen = [
        { option: 'אח', data: 'אח' },
        { option: 'הורים', data: 'הורים' },
        { option: 'קרובי משפחה', data: 'קרובי משפחה' },
        { option: 'חבר', data: 'חבר' },
    ]
    const searchFallen = async (id) => {
        let [success, err] = await Auth.superAuthFetch(`/api/fallens?filter={"where": { "id": ${id}}, "include": { "relation": "meetings", "scope": { "include": "meetingOwner" } } }`);

        console.log("success", success)

        if (err || !success) {
            props.ManagerMeetingStore.setError(err)
        }
        if (success) {
            await props.props.ManagerMeetingStore.changeFallenDetails(success[0])
            props.setDataForFallen(true)
        }
    }

    let findImage = props.ManagerMeetingStore.fallenDetails && props.ManagerMeetingStore.fallenDetails[props.fallen.id] && props.ManagerMeetingStore.fallenDetails[props.fallen.id].image && props.ManagerMeetingStore.fallenDetails[props.fallen.id].image !== ""
    return (
        <div className="containFallenDetails">
            {window.innerWidth > 550 && <img style={{ marginLeft: "2vh" }} src={blueCandle} alt="blueCandle" />}
            <div style={{ width: window.innerWidth <= 550 ? "70%" : "", position: "relative" }}>

                {props.ManagerMeetingStore.fallenName && <div className="textAboveInput" style={{ width: "95%" }}>שם החלל</div>}

                <div className='searchStyle' style={{ display: 'flex', marginBottom: '3vh' }}>
                    <SearchFallen />
                    {/* <div style={{ marginTop: '0.6vh' }} className="searchButton pointer grow" onClick={() => searchFallen(Number(props.fallen.id))}>חפש</div> */}
                </div>

                {props.ManagerMeetingStore.fallenDetails && props.ManagerMeetingStore.fallenDetails[props.fallen.id] && props.ManagerMeetingStore.fallenDetails[props.fallen.id].fallingDate && <div className="textAboveInput">תאריך נפילה</div>}
                <input
                    type="text"
                    className='inputStyle dateContainer'
                    disabled
                    style={{ width: "95%", backgroundColor: "white" }}
                    value={(props.ManagerMeetingStore.fallenDetails && props.ManagerMeetingStore.fallenDetails[props.fallen.id] && props.ManagerMeetingStore.fallenDetails[props.fallen.id].fallingDate) || ''}
                    autoComplete="off"
                    placeholder="תאריך נפילה"
                />

                {props.ManagerMeetingStore.meetingDetails.fallens[props.index].relative && <div className="textAboveInput">קרבה שלי אל החלל</div>}
                <Select
                    selectTextDefault='קרבה שלי אל החלל'

                    arr={myCloseToTheFallen}
                    // selectedText={props.ManagerMeetingStore.meetingDetails.relationship}
                    width='95%'
                    className={'inputStyle p-0 ' + (props.isSaved && (!props.ManagerMeetingStore.fallens || !props.ManagerMeetingStore.fallens[props.index] || !props.ManagerMeetingStore.fallens[props.index].relative) ? "error" : "")}
                    onChoseOption={(value) => { props.ManagerMeetingStore.changeFallenRelative(value.data, props.fallen.id) }} />
                {props.ManagerMeetingStore.meetingDetails.fallens[props.index].needAlert ? <div className="speakBobble" style={{ bottom: props.ManagerMeetingStore.meetingDetails.fallens[props.index].relative === "אחר" ? "55px" : "-10px" }}>
                    <img src={speachBooble} alt="speachBooble" />
                    <div className="position-absolute">
                        <img src={cancel} alt="cancel" className="cancelSpeakBooble pointer" onClick={() => { props.ManagerMeetingStore.changeNeedAlert(false, props.fallen.id) }} />
                    חשוב שלכל מפגש תזמנו בן משפחה
                    </div>
                </div> : null}
                {(props.ManagerMeetingStore.meetingDetails.fallens[props.index].relative !== "אח" &&
                    props.ManagerMeetingStore.meetingDetails.fallens[props.index].relative !== "הורים" &&
                    props.ManagerMeetingStore.meetingDetails.fallens[props.index].relative !== "קרובי משפחה" &&
                    props.ManagerMeetingStore.meetingDetails.fallens[props.index].relative !== "חבר" &&
                    props.ManagerMeetingStore.meetingDetails.fallens[props.index].relative !== null) &&
                    <input
                        type="text"
                        className={'inputStyle ' + (props.isSaved && (!props.ManagerMeetingStore.fallens[props.index].relative || (props.ManagerMeetingStore.otherRelationship[props.index].relative && !props.ManagerMeetingStore.otherRelationship[props.index].relative.length)) ? "error" : "")}
                        style={{ width: "95%" }}
                        value={props.ManagerMeetingStore.otherRelationship && props.ManagerMeetingStore.otherRelationship.length >= props.index ? props.ManagerMeetingStore.otherRelationship[props.index].relative : ""}
                        onChange={e => props.ManagerMeetingStore.setOtherRelationship(e, props.fallen.id)}
                        autoComplete="off"
                        placeholder="קרבה שלי אל החלל"
                    />}
            </div>

            <div className={findImage && dissmisedPic ? "position-relative" : "candleImg"} >

                <img src={findImage && dissmisedPic ? props.ManagerMeetingStore.fallenDetails[props.fallen.id].image : grayCandle}
                    alt="grayCandle" style={
                        findImage && dissmisedPic ? { height: "24vh" } : { height: "13vh" }} />
                {findImage && dissmisedPic && <FontAwesomeIcon
                    className={"pointer cancelPicture"}
                    onClick={() => setDissmisedPic(false)}
                    icon={["fas", "times-circle"]}
                />}
            </div>
        </div>
    )
}

export default inject('ManagerMeetingStore')(observer(FallenDetails))