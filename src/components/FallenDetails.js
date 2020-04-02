import React, { useState, useEffect } from 'react';
import Select from './Select.js'

import { inject, observer, PropTypes } from 'mobx-react';
import blueCandle from '../icons/candle-blue.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import grayCandle from '../icons/gray-candle.svg'
import Auth from '../modules/auth/Auth'
import SearchFallen from './SearchFallen.jsx';

const FallenDetails = (props) => {
    const [dissmisedPic, setDissmisedPic] = useState(true)

    const myCloseToTheFallen = ["אח", "הורים", "קרובי משפחה", "חבר", "אחר"]

    const searchFallen = async (id) => {
        let [success, err] = await Auth.superAuthFetch(`/api/fallens?filter={"where": { "id": ${id}}, "include": { "relation": "meetings", "scope": { "include": "meetingOwner" } } }`);

        console.log("success", success)

        if (err || !success) {
            props.CreateMeetingStore.setError(err)
        }
        if (success) {
            await props.CreateMeetingStore.changeFallenDetails(success[0])
            props.setDataForFallen(true)
        }
    }

    let findImage = props.CreateMeetingStore.fallenDetails && props.CreateMeetingStore.fallenDetails[props.fallen.id] && props.CreateMeetingStore.fallenDetails[props.fallen.id].image && props.CreateMeetingStore.fallenDetails[props.fallen.id].image !== ""
    return (
        <div className="containFallenDetails">
            {window.innerWidth > 550 && <img style={{ marginLeft: "2vh" }} src={blueCandle} alt="blueCandle" />}
            <div style={window.innerWidth <= 550 ? {} : { width: "70%" }}>

                {props.CreateMeetingStore.fallenName && <div className="textAboveInput" style={{ width: "95%" }}>שם החלל</div>}

                <SearchFallen />

                <div className="searchButton pointer" onClick={() => searchFallen(Number(props.fallen.id))}>חפש</div>

                {props.CreateMeetingStore.fallenDetails && props.CreateMeetingStore.fallenDetails[props.fallen.id] && props.CreateMeetingStore.fallenDetails[props.fallen.id].fallingDate && <div className="textAboveInput">תאריך נפילה</div>}
                <input
                    type="text"
                    className='inputStyle dateContainer'
                    disabled
                    style={{ width: "95%", backgroundColor: "white" }}
                    value={props.CreateMeetingStore.fallenDetails && props.CreateMeetingStore.fallenDetails[props.fallen.id] && props.CreateMeetingStore.fallenDetails[props.fallen.id].fallingDate}
                    autoComplete="off"
                    placeholder="תאריך נפילה"
                />

                {props.CreateMeetingStore.meetingDetails.fallens[props.index].relative && <div className="textAboveInput">קרבה שלי אל החלל</div>}
                <Select
                    selectTextDefault='קרבה שלי אל החלל'

                    arr={myCloseToTheFallen.map((name) => {
                        return { option: name }
                    })}
                    // selectedText={props.CreateMeetingStore.meetingDetails.relationship}
                    width='95%'
                    className={'inputStyle p-0 ' + (props.isSaved && (!props.CreateMeetingStore.fallens || !props.CreateMeetingStore.fallens[props.index] || !props.CreateMeetingStore.fallens[props.index].relative) ? "error" : "")}
                    onChoseOption={(value) => { props.CreateMeetingStore.changeFallenRelative(value.option, props.fallen.id) }} />

                {(props.CreateMeetingStore.meetingDetails.fallens[props.index].relative !== "אח" &&
                    props.CreateMeetingStore.meetingDetails.fallens[props.index].relative !== "הורים" &&
                    props.CreateMeetingStore.meetingDetails.fallens[props.index].relative !== "קרובי משפחה" &&
                    props.CreateMeetingStore.meetingDetails.fallens[props.index].relative !== "חבר" &&
                    props.CreateMeetingStore.meetingDetails.fallens[props.index].relative !== null) &&
                    <input
                        type="text"
                        className={'inputStyle ' + (props.isSaved && (!props.CreateMeetingStore.fallens[props.index].relative || (props.CreateMeetingStore.otherRelationship[props.index].relative && !props.CreateMeetingStore.otherRelationship[props.index].relative.length)) ? "error" : "")}
                        style={{ width: "95%" }}
                        value={props.CreateMeetingStore.otherRelationship && props.CreateMeetingStore.otherRelationship.length >= props.index ? props.CreateMeetingStore.otherRelationship[props.index].relative : ""}
                        onChange={e => props.CreateMeetingStore.setOtherRelationship(e, props.fallen.id)}
                        autoComplete="off"
                        placeholder="קרבה שלי אל החלל"
                    />}
            </div>

            <div className={findImage && dissmisedPic ? "position-relative" : "candleImg"} >

                <img src={findImage && dissmisedPic ? props.CreateMeetingStore.fallenDetails[props.fallen.id].image : grayCandle}
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

export default inject('CreateMeetingStore')(observer(FallenDetails))