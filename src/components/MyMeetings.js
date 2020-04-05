import React, { useState, useEffect, useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/listOfMeetings.css'
// import { inject, observer, PropTypes } from 'mobx-react';
import lock from '../icons/blue-lock.svg'
import tell from '../icons/tell.svg'
// import Select from './Select.js'
// import Auth from '../modules/auth/Auth'
import ImageOfFallen from './ImageOfFallen'
import '../styles/animations.scss'
import candle from '../icons/candle-dark-blue.svg'
import clock from '../icons/clock.svg'
import participants from '../icons/participants.png'
// import checkboxOn from '../icons/checkbox_on_light.svg'
// import checkboxOff from '../icons/checkbox_off_light.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ListOfMeetingsUser = (props) => {

    const [myMeetings ,setMyMeeting] = useState(false)
    const [error ,setError] = useState(false)
    const [email ,setEmail] = useState(false)
    const [phone ,setPhone] = useState(false)
    const [code ,setCode] = useState(false)

    // const myCloseToTheFallen = ["הכל", "אח", "הורים", "קרובי משפחה", "חבר"]
    // const meetingLanguage = ['כל השפות', 'עברית', 'English', 'français', 'العربية', 'русский', 'አማርኛ', 'español']
    // const meetingDate = ['כל התאריכים', 'יום ראשון, ב באייר, 26.04', 'יום שני, ג באייר, 27.04', 'יום שלישי, ד באייר, 28.04', 'יום רביעי, ה באייר, 29.04']
    // const meetingTime = [
    //     { option: 'כל השעות', data: false },
    //     { option: '12:00 - 09:00', data: [900, 1200] },
    //     { option: '15:00 - 12:00', data: [1200, 1500] },
    //     { option: '18:00 - 15:00', data: [1500, 1800] },
    //     { option: '21:00 - 18:00', data: [1800, 2100] },
    //     { option: '00:00 - 21:00', data: [2100, 2400] }]

    useEffect(() => {
        (async () => {
            // await props.MeetingsStore.search()
        })()
    }, []);

    return (
     <div className='meetingsFullPage'>
       {!error ? 
            <div className='mainPage-meetings' style={{ width: '95%'}}>
                <div className='meetings-title'>רשימת המפגשים שלי</div>
                {/* <div className='meetings-second-title'>כל המפגשים הוירטואליים שלנו מחכים לכם כאן. </div> */}
                {myMeetings ? myMeetings.map((meeting, index) => {
                    return (
                        <div key={index} className='containMeetingCard'>
                            <div className='editTool grow'>
                            <FontAwesomeIcon icon={['fas', 'pen']} style={{ fontSize: '1rem' , color: 'white' }} />
                            </div>
                            <div onClick={meeting.participants_num < meeting.max_participants ? () => {
                                props.history.push(`/meeting/${meeting.id}`)
                            } : () => { }}>
                                <ImageOfFallen
                                    className='imageOfFallen'
                                    array={meeting.fallens_meetings}
                                    width='15em'
                                    height='100%'
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
                                                    <span>לזכר {fallen.fallens.name} ז"ל</span>
                                                )
                                            }
                                            else if (index === meeting.fallens_meetings.length - 1) {
                                                return (
                                                    <span> ו{fallen.fallens.name} ז"ל</span>
                                                )
                                            }
                                            else {
                                                return (
                                                    <span>, {fallen.fallens.name} ז"ל</span>
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

                    {!myMeetings ?
                     <div style={{marginTop: '10em'}}>
                        <div class="spinner-border" style={{color:'var(--custom-blue)'}} role="status">
                        <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                     : !myMeetings.length ?
                     <div  style={{marginTop: '10em' , color:'var(--custom-blue)' , fontSize:'2em'}}>
                         לא נמצאו מפגשים
                      </div>
                     
                      :null
                     }

                {/* {props.MeetingsStore.loadMoreButton && props.MeetingsStore.meetings &&
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <div
                            onClick={() => {
                                props.MeetingsStore.search(true, false)
                            }}
                            className="loadMore-meetings grow">טען עוד</div>
                    </div>} */}
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
export default ListOfMeetingsUser;
