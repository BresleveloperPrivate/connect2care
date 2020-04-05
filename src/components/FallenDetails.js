import React, { useState, useEffect } from 'react';
import Select from './Select.js'
import cancel from '../icons/cancel.svg'

import speachBooble from "../icons/speakBobble.svg"
import { observer, PropTypes } from 'mobx-react';

import blueCandle from '../icons/candle-blue.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import grayCandle from '../icons/gray-candle.svg'
import Auth from '../modules/auth/Auth'
import SearchFallen from './SearchFallen.jsx';
import { useCreateMeetingStore } from '../stores/createMeeting.store.js';

const FallenDetails = (props) => {
    const [dissmisedPic, setDissmisedPic] = useState(true)

    const myCloseToTheFallen = ["אח", "הורים", "קרובי משפחה", "חבר", "אחר"];

    const CreateMeetingStore = useCreateMeetingStore();

    const searchFallen = async (id) => {
        let [success, err] = await Auth.superAuthFetch(`/api/fallens?filter={"where": { "id": ${id}}, "include": { "relation": "meetings", "scope": { "include": "meetingOwner" } } }`);

        console.log("success", success)

        if (err || !success) {
            CreateMeetingStore.setError(err)
        }
        if (success) {
            await CreateMeetingStore.changeFallenDetails(success[0])
            props.setDataForFallen(true)
        }
    }

    let findImage = CreateMeetingStore.fallenDetails && CreateMeetingStore.fallenDetails[props.fallen.id] && CreateMeetingStore.fallenDetails[props.fallen.id].image && CreateMeetingStore.fallenDetails[props.fallen.id].image !== ""
    return (
        <div className="containFallenDetails">
            {window.innerWidth > 550 && <img style={{ marginLeft: "2vh" }} src={blueCandle} alt="blueCandle" />}
            <div style={{ width: window.innerWidth <= 550 ? "70%" : "", position: "relative" }}>

                {CreateMeetingStore.fallenName && <div className="textAboveInput" style={{ width: "95%" }}>שם החלל</div>}

                <div className='searchStyle' style={{ display: 'flex', marginBottom: '3vh' }}>
                    <SearchFallen />
<<<<<<< HEAD
=======
                    {/* <div style={{ marginTop: '0.6vh' }} className="searchButton pointer grow" onClick={() => searchFallen(Number(props.fallen.id))}>חפש</div> */}
>>>>>>> dc51c65a0e44516a2bd917e6661abad50f91096f
                </div>

                {CreateMeetingStore.fallenDetails && CreateMeetingStore.fallenDetails[props.fallen.id] && CreateMeetingStore.fallenDetails[props.fallen.id].fallingDate && <div className="textAboveInput">תאריך נפילה</div>}
                <input
                    type="text"
                    className='inputStyle dateContainer'
                    disabled
                    style={{ width: "95%", backgroundColor: "white" }}
                    value={(CreateMeetingStore.fallenDetails && CreateMeetingStore.fallenDetails[props.fallen.id] && CreateMeetingStore.fallenDetails[props.fallen.id].fallingDate) || ''}
                    autoComplete="off"
                    placeholder="תאריך נפילה"
                />

                {CreateMeetingStore.meetingDetails.fallens[props.index].relative && <div className="textAboveInput">קרבה שלי אל החלל</div>}
                <Select
                    selectTextDefault='קרבה שלי אל החלל'

                    arr={myCloseToTheFallen.map((name) => {
                        return { option: name }
                    })}
                    // selectedText={CreateMeetingStore.meetingDetails.relationship}
                    width='95%'
                    className={'inputStyle p-0 ' + (props.isSaved && (!CreateMeetingStore.fallens || !CreateMeetingStore.fallens[props.index] || !CreateMeetingStore.fallens[props.index].relative) ? "error" : "")}
                    onChoseOption={(value) => { CreateMeetingStore.changeFallenRelative(value.option, props.fallen.id) }} />
                {CreateMeetingStore.meetingDetails.fallens[props.index].needAlert ? <div className="speakBobble" style={{ bottom: CreateMeetingStore.meetingDetails.fallens[props.index].relative === "אחר" ? "55px" : "-10px" }}>
                    <img src={speachBooble} alt="speachBooble" />
                    <div className="position-absolute">
                        <img src={cancel} alt="cancel" className="cancelSpeakBooble pointer" onClick={() => { CreateMeetingStore.changeNeedAlert(false, props.fallen.id) }} />
                    חשוב שלכל מפגש תזמנו בן משפחה
                    </div>
                </div> : null}
                {(CreateMeetingStore.meetingDetails.fallens[props.index].relative !== "אח" &&
                    CreateMeetingStore.meetingDetails.fallens[props.index].relative !== "הורים" &&
                    CreateMeetingStore.meetingDetails.fallens[props.index].relative !== "קרובי משפחה" &&
                    CreateMeetingStore.meetingDetails.fallens[props.index].relative !== "חבר" &&
                    CreateMeetingStore.meetingDetails.fallens[props.index].relative !== null) &&
                    <input
                        type="text"
                        className={'inputStyle ' + (props.isSaved && (!CreateMeetingStore.fallens[props.index].relative || (CreateMeetingStore.otherRelationship[props.index].relative && !CreateMeetingStore.otherRelationship[props.index].relative.length)) ? "error" : "")}
                        style={{ width: "95%" }}
                        value={CreateMeetingStore.otherRelationship && CreateMeetingStore.otherRelationship.length >= props.index ? CreateMeetingStore.otherRelationship[props.index].relative : ""}
                        onChange={e => CreateMeetingStore.setOtherRelationship(e, props.fallen.id)}
                        autoComplete="off"
                        placeholder="קרבה שלי אל החלל"
                    />}
            </div>

            <div className={findImage && dissmisedPic ? "position-relative" : "candleImg"} >

                <img src={findImage && dissmisedPic ? CreateMeetingStore.fallenDetails[props.fallen.id].image : grayCandle}
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

export default observer(FallenDetails);