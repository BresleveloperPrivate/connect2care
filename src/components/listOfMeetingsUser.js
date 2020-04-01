
import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/listOfMeetings.css'
import { inject, observer, PropTypes } from 'mobx-react';
import person from '../icons/person.png'
import Select from './Select.js'
import Auth from '../modules/auth/Auth'

import '../styles/animations.scss'

const ListOfMeetingsUser = (props) => {

    const myCloseToTheFallen = ["הכל", "אח", "הורים", "קרובי משפחה", "חבר"]
    const meetingLanguage = ['כל השפות', 'עברית', 'English', 'français', 'العربية', 'русский', 'አማርኛ', 'español']
    const meetingDate = ['כל התאריכים', "26.04 - יום ראשון", "27.04 - ערב יום הזכרון", "28.04 - יום הזכרון", "29.04- יום רביעי"]

    useEffect(() => {
        (async () => {
            await props.MeetingsStore.search()
        })()
    }, []);

    return (
        <div className='navBarMargin'>

            <div className='mainPage-meetings'>
                <div className='meetings-title'>רשימת המפגשים</div>
                <div >משפט כלשהו... </div>
                <div className='containSearch'>
                    <input
                        style={{ flexGrow: 1 }}
                        type="text"
                        className='input-meetings'

                        onChange={(e) => props.MeetingsStore.changeSearchInput(e)}
                        // value={}
                        placeholder="חיפוש"
                    />
                    <div
                        style={{ marginRight: '2vw' }}
                        className={props.MeetingsStore.searchInput !== props.MeetingsStore.prevSearchInput ?
                            'button-meetings' : 'button-meetings disabled-button-meetings'}
                        onClick={props.MeetingsStore.searchInput !== props.MeetingsStore.prevSearchInput ?
                            () => {
                                props.MeetingsStore.search(false, true)
                            } : () => { }}>
                        חיפוש
                    </div>

                </div>
                <div className='containFilters'>

                    <div className='filterBy'>סנן לפי:</div>

                    <Select
                        fetch={props.MeetingsStore.search}
                        selectTextDefault='קרבה לחלל'
                        arr={myCloseToTheFallen.map((name) => {
                            return { option: name }
                        })}
                        // selectedText={props.CreateMeetingStore.meetingDetails.relationship}
                        className='input-meetings filter mr-0'
                        onChoseOption={(value) => { props.MeetingsStore.changeFallenRelative(value.option) }}
                    />


                    <Select
                        fetch={props.MeetingsStore.search}
                        selectTextDefault='שפת המפגש'
                        arr={meetingLanguage.map((name) => {
                            return { option: name }
                        })}
                        // selectedText={props.CreateMeetingStore.meetingDetails.language}
                        className='input-meetings filter'
                        onChoseOption={(value) => { props.MeetingsStore.changeMeetingLanguage(value.option) }}
                    />

                    <Select
                        fetch={props.MeetingsStore.search}
                        selectTextDefault='תאריך מפגש'
                        arr={meetingDate.map((name) => {
                            return { option: name }
                        })}
                        // selectedText={props.CreateMeetingStore.meetingDetails.date}
                        className='input-meetings filter'
                        onChoseOption={(value) => { props.MeetingsStore.changeMeetingDate(value.option) }}
                    />

                    <Select
                        fetch={props.MeetingsStore.search}
                        selectTextDefault='תאריך מפגש'
                        arr={meetingDate.map((name) => {
                            return { option: name }
                        })}
                        // selectedText={props.CreateMeetingStore.meetingDetails.date}
                        className='input-meetings filter'
                        onChoseOption={(value) => { props.MeetingsStore.changeMeetingDate(value.option) }}
                    />

                    {/* <div
                        style={{ marginRight: '2vw' }}
                        className='button-meetings'
                        onClick={() => {
                            props.MeetingsStore.search()
                        }}>
                        סנן
                    </div> */}


                </div>





                {props.MeetingsStore.meetings ? props.MeetingsStore.meetings.map((meeting, index) => {
                    return (<div>{meeting.name}</div>)
                }) : null}



                {props.MeetingsStore.loadMoreButton && <div
                    onClick={() => {
                        props.MeetingsStore.search(true, false)
                    }}
                    className="createMeetingButton">טען עוד</div>}
            </div>
            {/* <input
                        type="time"
                        className='inputStyle'
                        style={{ marginRight: "2vh" }}
                        // onChange={props.CreateMeetingStore.changeMeetingTime}
                        // value={props.CreateMeetingStore.meetingDetails.time}
                        autoComplete="off"
                        placeholder="שעה"
                    /> */}

            {/* <input
                type="text"
                className='inputStyle margin-right-text'
                onChange={props.CreateMeetingStore.changeNumberOfParticipants}
                value={props.CreateMeetingStore.meetingDetails.maxParticipants}
                autoComplete="off"
                placeholder="מספר משתתפים מקסימלי"
            /> */}



        </div>

    );
}
export default inject('MeetingsStore')(observer(ListOfMeetingsUser));
