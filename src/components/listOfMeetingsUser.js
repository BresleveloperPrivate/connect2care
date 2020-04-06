import React, { useState, useEffect, useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/listOfMeetings.css'
import { inject, observer, PropTypes } from 'mobx-react';
import lock from '../icons/blue-lock.svg'
import tell from '../icons/tell.svg'
import Select from './Select.js'
import Auth from '../modules/auth/Auth'
import ImageOfFallen from './ImageOfFallen'
import '../styles/animations.scss'
import candle from '../icons/candle-dark-blue.svg'
import clock from '../icons/clock.svg'
import participants from '../icons/participants.png'
import checkboxOn from '../icons/checkbox_on_light.svg'
import checkboxOff from '../icons/checkbox_off_light.svg'

const ListOfMeetingsUser = (props) => {


    const myCloseToTheFallen = [
        { option: 'הכל', data: false },
        { option: 'אח', data: 'אח' },
        { option: 'הורים', data: 'הורים' },
        { option: 'קרובי משפחה', data: 'קרובי משפחה' },
        { option: 'חבר', data: 'חבר' },
    ]
    const meetingLanguage = [
        { option: 'כל השפות', data: false },
        { option: 'עברית', data: 'עברית' },
        { option: 'English', data: 'English' },
        { option: 'français', data: 'français' },
        { option: 'العربية', data: 'العربية' },
        { option: 'русский', data: 'русский' },
        { option: 'አማርኛ', data: 'አማርኛ' },
        { option: 'español', data: 'español' },
    ]
    const meetingDate = [
        { option: 'כל התאריכים', data: false },
        { option: props.t('sunday'), data: 'יום ראשון, ב באייר, 26.04' },
        { option: 'יום שני, ג באייר, 27.04', data: 'יום שני, ג באייר, 27.04' },
        { option: 'יום שלישי, ד באייר, 28.04', data: 'יום שלישי, ד באייר, 28.04' },
        { option: 'יום רביעי, ה באייר, 29.04', data: 'יום רביעי, ה באייר, 29.04' },
    ]
        const meetingTime = [
        { option: 'כל השעות', data: false },
        { option: '12:00 - 09:00', data: [900, 1200] },
        { option: '15:00 - 12:00', data: [1200, 1500] },
        { option: '18:00 - 15:00', data: [1500, 1800] },
        { option: '21:00 - 18:00', data: [1800, 2100] },
        { option: '00:00 - 21:00', data: [2100, 2400] },
    ]

    useEffect(() => {
        (async () => {
            await props.MeetingsStore.search()
        })()
    }, []);

    return (
     <div className='meetingsFullPage'>
         <div className='buttonOnMeetings grow' onClick={()=>{
             props.history.push('/create-meeting')
         }} >אני רוצה ליזום מפגש</div>
       {!props.MeetingsStore.error ? 
            <div className='mainPage-meetings'>
                <div className='meetings-title'>רשימת המפגשים</div>
                <div className='meetings-second-title'>כל המפגשים הוירטואליים שלנו מחכים לכם כאן. </div>
                <div className='containSearch'>
                    <input
                        style={{ flexGrow: 1 }}
                        type="text"
                        value={props.MeetingsStore.searchInput}
                        className='input-meetings'
                        onChange={(e) => props.MeetingsStore.changeSearchInput(e)}
                        placeholder="חיפוש שם נופל, שם מפגש, שם מנחה"
                    />
                    <div
                        style={{ marginRight: '2em' }}
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
                        width='23%'
                        fetch={props.MeetingsStore.search}
                        selectTextDefault='תאריך המפגש'
                        arr={meetingDate}
                        className='input-meetings filter-meeting mr-0'
                        onChoseOption={(value) => {
                            props.MeetingsStore.changeMeetingDate(value.data)
                        }}
                        changeBackground={true}

                    />
                    <Select
                        selectTextDefault='שעה'
                        arr={meetingTime}
                        className='input-meetings filter-meeting'
                        onChoseOption={(value) => { 
                            props.MeetingsStore.changeMeetingTime(value.data)
                            props.MeetingsStore.search()
                        }}
                        changeBackground={true}
                    />
                    <Select
                        selectTextDefault='קרבה לחלל'
                        arr={myCloseToTheFallen}
                        className='input-meetings filter-meeting'
                        onChoseOption={
                            (value) => {
                                props.MeetingsStore.changeFallenRelative(value.data)
                                props.MeetingsStore.search()
                            }}
                            changeBackground={true}
                    />
                    <Select
                        selectTextDefault='שפת המפגש'
                        arr={meetingLanguage}
                        className='input-meetings filter-meeting'
                        onChoseOption={(value) => {
                            props.MeetingsStore.changeMeetingLanguage(value.data)
                            props.MeetingsStore.search()
                        }}
                        changeBackground={true}
                    />
                    <div className='availableOnly'>
                        <div
                        style={{height: '1.5em' , width: '1.5em' , display:'flex' , marginLeft:'0.3em' , cursor:'pointer'}}
                        onClick={()=>{
                            props.MeetingsStore.changeAvailableOnly(!props.MeetingsStore.availableOnly)
                            props.MeetingsStore.search()
                        }}>
                            <img height='100%' width='100%s' src={props.MeetingsStore.availableOnly ? checkboxOn : checkboxOff} />
                            </div>
                    הצג מפגשים זמינים בלבד
                    </div>
                </div>
                {props.MeetingsStore.meetings ? props.MeetingsStore.meetings.map((meeting, index) => {
                    return (
                        <div key={index} className='containMeetingCard'>
                            <div onClick={meeting.participants_num < meeting.max_participants ? () => {
                                props.history.push(`/meeting/${meeting.id}`)
                            } : () => { }}>
                                <ImageOfFallen
                                    className='imageOfFallen'
                                    array={meeting.fallens_meetings}
                                    width='15em'
                                    height='21em'
                                    isOpen={meeting.participants_num < meeting.max_participants}
                                />
                            </div>
                            <div
                                style={{ cursor: meeting.participants_num < meeting.max_participants ? 'pointer' : 'auto' }}
                                className='meetingCard'
                                onClick={meeting.participants_num < meeting.max_participants ? () => {
                                    props.history.push(`/meeting/${meeting.id}`)
                                } : () => { }}
                            >
                                <div className='meetingCardContent'>
                                    <div className='meetingName'>
                                        {meeting.name}
                                    </div>
                                    <div className='meetingFor'>
                                        <div style={{height:'1.7em' , marginLeft:'0.5em' , marginBottom:'0.5em'}}>
                                            <img src={candle} height='100%' />
                                        </div>
                                        <div>{meeting.fallens_meetings.map((fallen, index) => {
                                            if (index === 0) {
                                                return (
                                                    <span key={index}>לזכר {fallen.fallens.name} ז"ל</span>
                                                )
                                            }
                                            else if (index === meeting.fallens_meetings.length - 1) {
                                                return (
                                                    <span key={index}> ו{fallen.fallens.name} ז"ל</span>
                                                )
                                            }
                                            else {
                                                return (
                                                    <span key={index}>, {fallen.fallens.name} ז"ל</span>
                                                )
                                            }
                                        })}</div>
                                    </div>
                                    <div className='meetingDate'>
                                        <div style={{ height: '1.3em', marginBottom: '0.5em', marginLeft: '0.5em' }}>
                                            <img src={clock} height='100%' />
                                        </div>
                                        {meeting.date} | {meeting.time}
                                    </div>
                                    <div className='meetingOwner'>

                                        <div style={{ height: '1.3em', marginBottom: '0.6em', marginLeft: '0.5em' }}>
                                            <img src={tell} height='100%' />
                                        </div>
                                       מנחה: {meeting.meetingOwner && meeting.meetingOwner.name}
                                    </div>
                                    <div className='meetingDescription'>
                                        {meeting.description}
                                    </div>
                                </div>
                                <div className='leftPartOfMeetingCard'>
                                    <div className='participants'>
                                        <img width='100%' height='100%' src={participants} />
                                        <div className='numberOfParticipants'>{meeting.participants_num}</div>
                                    </div>
                                    <div className={!meeting.isOpen || meeting.participants_num >= meeting.max_participants ? 'meetingIsCloseBtn' :  'joinMeetingBtn grow' }> 
                                    {!meeting.isOpen || meeting.participants_num >= meeting.max_participants ? 
                                    <div style={{height:'0.9em' , width: '0.9em' , marginLeft:'0.4em' , display:'flex'}}>
                                        <img height='100%' width='100%' src={lock}/>
                                    </div> 
                                    : null }
                                    {meeting.participants_num >= meeting.max_participants ? 'אין יותר מקום' : !meeting.isOpen ? 'מפגש סגור' : 'הצטרף למפגש' }
                                     
                                      </div>
                                     {/* {!meeting.isOpen && meeting.participants_num < meeting.max_participants &&  <div className='comment'> ניתן לבקש להצטרף למפגש </div>} */}
                                </div>
                            </div>
                        </div>
                    )
                }) : null}

                    {!props.MeetingsStore.meetings ?
                     <div style={{marginTop: '10em'}}>
                        <div className="spinner-border" style={{color:'var(--custom-blue)'}} role="status">
                        <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                     : !props.MeetingsStore.meetings.length ?
                     <div  style={{marginTop: '10em' , color:'var(--custom-blue)' , fontSize:'2em'}}>
                         לא נמצאו מפגשים המתאימים לחיפוש שלך
                      </div>
                     
                      :null
                     }

                {props.MeetingsStore.loadMoreButton && props.MeetingsStore.meetings &&
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <div
                            onClick={() => {
                                props.MeetingsStore.search(true, false)
                            }}
                            className="loadMore-meetings grow">טען עוד</div>
                    </div>}
            </div>
                    :
                    <div className='mainPage-meetings'>
                    <div style={{paddingTop: '10em' , color:'var(--custom-blue)' , fontSize:'2em'}}>
                        {props.MeetingsStore.error.error.message === "No response, check your network connectivity" ? 'אנא בדוק את חיבור האינטרנט שלך' : ' אירעה שגיאה בהבאת הנתונים'}
                       </div>
                    </div> 
                }
        </div>

    );
}
export default inject('MeetingsStore')(observer(ListOfMeetingsUser));
