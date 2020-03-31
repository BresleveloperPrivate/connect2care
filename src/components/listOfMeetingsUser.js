
import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/createMeeting.css'
import { inject, observer, PropTypes } from 'mobx-react';
import person from '../icons/person.png'
import Select from './Select.js'
import Auth from '../modules/auth/Auth'

import '../styles/animations.scss'

const ListOfMeetingsUser = (props) => {

    const myCloseToTheFallen = ["הכל","אח", "הורים", "קרובי משפחה", "חבר"]
    const meetingLanguage = ['כל השפות','עברית', 'English', 'français', 'العربية', 'русский', 'አማርኛ', 'español']
    const meetingDate = ['כל התאריכים',"26.04 - יום ראשון", "27.04 - ערב יום הזכרון", "28.04 - יום הזכרון", "29.04- יום רביעי"]

    useEffect(() => {
        (async () => {
            let [meetings, err] = await Auth.superAuthFetch('/api/meetings?filter={"where":{"id":{"gt" : "0"}},"include":[{"relation":"fallens"}],"limit":"5"}', {
                method: 'GET',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            })
            if(err){
                console.log(err)
            }else{
                console.log(meetings)
            }
        })()
    }, []);

    return (
        <div className='navBarMargin'>

            <div className='meetings-title'>רשימת המפגשים</div>
            <div >משפט כלשהו... </div>
            <div>
                <input
                    type="text"
                    className='inputStyle margin-right-text'

                    onChange={(e)=>props.MeetingsStore.changeSearchInput(e)}
                    // value={}
                    placeholder="חיפוש"
                />

                <div onClick={()=>{
                    props.MeetingsStore.search()
                }}>חפש</div>

                <Select
                    selectTextDefault='קרבה לחלל'
                    arr={myCloseToTheFallen.map((name) => {
                        return { option: name }
                    })}
                    // selectedText={props.CreateMeetingStore.meetingDetails.relationship}
                    width='95%'
                    className='inputStyle'
                    onChoseOption={(value) => { props.MeetingsStore.changeFallenRelative(value.option) }}
                     />
            
            </div>



            <Select
                selectTextDefault='שפת המפגש'
                arr={meetingLanguage.map((name) => {
                    return { option: name }
                })}
                width='50%'
                // selectedText={props.CreateMeetingStore.meetingDetails.language}
                className='inputStyle margin-right-text '
                onChoseOption={(value) => { props.MeetingsStore.changeMeetingLanguage(value.option) }}
                 />

            <div style={{ width: "50%" }} className="d-flex margin-right-text justify-content-between">
                <Select
                    selectTextDefault='תאריך מפגש'
                    arr={meetingDate.map((name) => {
                        return { option: name }
                    })}
                    width='80%'
                    // selectedText={props.CreateMeetingStore.meetingDetails.date}
                    className='inputStyle'
                    onChoseOption={(value) => { props.MeetingsStore.changeMeetingDate(value.option) }} 
                    />
                {/* <input
                        type="time"
                        className='inputStyle'
                        style={{ marginRight: "2vh" }}
                        // onChange={props.CreateMeetingStore.changeMeetingTime}
                        // value={props.CreateMeetingStore.meetingDetails.time}
                        autoComplete="off"
                        placeholder="שעה"
                    /> */}
            </div>

            {/* <input
                type="text"
                className='inputStyle margin-right-text'
                onChange={props.CreateMeetingStore.changeNumberOfParticipants}
                value={props.CreateMeetingStore.meetingDetails.maxParticipants}
                autoComplete="off"
                placeholder="מספר משתתפים מקסימלי"
            /> */}
            <div style={{ width: "50%" }} className="d-flex margin-right-text justify-content-end">
                <div className="createMeetingButton">טען עוד</div>
            </div>

        </div>

    );
}
export default inject('MeetingsStore')(observer(ListOfMeetingsUser));
