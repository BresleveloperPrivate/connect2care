// export default inject('MeetingsStore')(observer(CreateMeeting));


import React, { useState, useEffect } from 'react';
// import NavBar from './NavBar.js'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/createMeeting.css'
import { inject, observer, PropTypes } from 'mobx-react';
// import blueCandle from '../icons/candle-blue.svg'
// import grayCandle from '../icons/gray-candle.svg'
import person from '../icons/person.png'
// import lock from '../icons/lock.svg'
import Select from './Select.js'
import Auth from '../modules/auth/Auth'

import '../styles/animations.scss'

const ListOfMeetingsUser = (props) => {

    // const [selectedArea, setSelectedArea] = useState("")
    // const [selectedEra, setSelectedEra] = useState(0)
    // const [error, setError] = useState()

    const myCloseToTheFallen = ["הכל","אח", "הורים", "קרובי משפחה", "חבר"]
    const meetingLanguage = ['כל השפות','עברית', 'English', 'français', 'العربية', 'русский', 'አማርኛ', 'español']
    const meetingDate = ['כל התאריכים',"26.04 - יום ראשון", "27.04 - ערב יום הזכרון", "28.04 - יום הזכרון", "29.04- יום רביעי"]

    useEffect(() => {
        (async () => {
            let [meetings, err] = await Auth.superAuthFetch('/api/meetings?filter={"where":{"id":{"gt" : "0"}},"include":[{"relation":"fallens"}]}', {
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

            <div className="createMeetingHeadLine margin-right-text" style={{ marginTop: "12vh" }}>יצירת המפגש</div>
            <div className="createMeetingSecondSentence margin-right-text">שימו לב: על מנת לקיים מפגש יש צורך במינימום עשרה אנשים </div>
            <div>
                <input
                    type="text"
                    className='inputStyle margin-right-text'
                    onChange={props.CreateMeetingStore.changeMeetingName}
                    value={props.CreateMeetingStore.meetingDetails.name}
                    autoComplete="off"
                    placeholder="חיפוש"
                />

                <Select
                    selectTextDefault='קרבה לחלל'
                    arr={myCloseToTheFallen.map((name) => {
                        return { option: name }
                    })}
                    selectedText={props.CreateMeetingStore.meetingDetails.relationship}
                    width='95%'
                    className='inputStyle'
                    onChoseOption={(value) => { props.CreateMeetingStore.changeFallenRelative(value.option) }} />
            
            </div>



            <Select
                selectTextDefault='שפת המפגש'
                arr={meetingLanguage.map((name) => {
                    return { option: name }
                })}
                width='50%'
                selectedText={props.CreateMeetingStore.meetingDetails.language}
                className='inputStyle margin-right-text '
                onChoseOption={(value) => { props.CreateMeetingStore.changeMeetingLanguage(value.option) }} />

            <div style={{ width: "50%" }} className="d-flex margin-right-text justify-content-between">
                <Select
                    selectTextDefault='תאריך מפגש'
                    arr={meetingDate.map((name) => {
                        return { option: name }
                    })}
                    width='80%'
                    selectedText={props.CreateMeetingStore.meetingDetails.date}
                    className='inputStyle'
                    onChoseOption={(value) => { props.CreateMeetingStore.changeMeetingDate(value.option) }} />
                <input
                        type="time"
                        className='inputStyle'
                        style={{ marginRight: "2vh" }}
                        onChange={props.CreateMeetingStore.changeMeetingTime}
                        value={props.CreateMeetingStore.meetingDetails.time}
                        autoComplete="off"
                        placeholder="שעה"
                    />
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
export default inject('CreateMeetingStore')(observer(ListOfMeetingsUser));
