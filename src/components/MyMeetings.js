import React, { useState, useEffect, useRef } from 'react';
import '../styles/listOfMeetings.css'
// import { inject, observer, PropTypes } from 'mobx-react';
import lock from '../icons/blue-lock.svg'
import tell from '../icons/tell.svg'
import Auth from '../modules/auth/Auth'
import ImageOfFallen from './ImageOfFallen'
import '../styles/animations.scss'
import candle from '../icons/candle-dark-blue.svg'
import clock from '../icons/clock.svg'
import participants from '../icons/participants.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ListOfMeetingsUser = (props) => {

    const [myMeetings ,setMyMeetings] = useState(false)
    const [option , setOption] = useState(0)
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

    // useEffect(() => {
    //     (async () => {
    //         let [meetings, err] = await Auth.superAuthFetch('/api/meetings/getMeetingsByUser', {
    //             method: 'POST',
    //             headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ obj: {email , phone , code} })
    //         })

    //         console.log(meetings)
    //         setMyMeetings(meetings)

    //     })()
    // }, []);

    return (
        <div>{!myMeetings ?
            //  <div style={{marginTop: '10em'}}>
            //     <div class="spinner-border" style={{color:'var(--custom-blue)'}} role="status">
            //     <span class="sr-only">Loading...</span>
            //     </div>
            // </div>
            <div className='emailAndPhonePopup'>

            הכנס אימייל:
            <input type='text' onChange={(e)=>{setEmail(e.target.value)}}/> <br/> <br/>
            הכנס מספר טלפון:
            <input type='phone' onChange={(e)=>{setPhone(e.target.value)}}/>
            <div onClick={()=>{
                (async () => {
                    let [meetings, err] = await Auth.superAuthFetch('/api/meetings/getMeetingsByUser', {
                        method: 'POST',
                        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                        body: JSON.stringify({ obj: {email , phone , code} })
                    })
        
                    console.log(meetings)
                    setMyMeetings(meetings)
        
                })()
            }}>שלח לי קוד אימות</div>

        </div>



             : !myMeetings.length ?
             <div  style={{marginTop: '10em' , color:'var(--custom-blue)' , fontSize:'2em'}}>
                 לא נמצאו מפגשים
              </div>
             
              :null
             }
     <div className='meetingsFullPage'>


       {!error ? 
            <div className='mainPage-meetings' style={{ width: '85%'}}>
                <div className='meetings-title'>רשימת המפגשים שלי</div>
                <div className='meetings-second-title' onClick={()=>{
                    setOption(0)
                }} >מפגשים שהצטרפתי </div>
                <div className='meetings-second-title' onClick={()=>{
                    setOption(1)
                }}>מפגשים שיזמתי </div>

                {myMeetings ? myMeetings[option].map((meeting, index) => {
                    return (
                        <div key={index} className='containMeetingCard'>
                            {option && <div className='editTool grow'>
                            <FontAwesomeIcon icon={['fas', 'pen']} style={{ fontSize: '1rem' , color: 'white' }} />
                            </div>}
                            <div onClick={meeting.participants_num < meeting.max_participants ? () => {
                                props.history.push(`/meeting/${meeting.id}`)
                            } : () => { }}>
                                <ImageOfFallen
                                    className='imageOfFallen'
                                    array={meeting.fallens_meetings ? meeting.fallens_meetings : meeting.meetings.fallens_meetings}
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
                                        <div>{meeting.fallens_meetings ? meeting.fallens_meetings : meeting.meetings.fallens_meetings .map((fallen, index) => {
                                            if (index === 0) {
                                                return (
                                                    <span>לזכר {fallen.fallens.name} ז"ל</span>
                                                )
                                            }
                                            else if (index === meeting.fallens_meetings ? meeting.fallens_meetings : meeting.meetings.fallens_meetings .length - 1) {
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
            </div>
                    :
                    <div className='mainPage-meetings'>
                    <div style={{paddingTop: '10em' , color:'var(--custom-blue)' , fontSize:'2em'}}>
                        {props.MeetingsStore.error.error.message === "No response, check your network connectivity" ? 'אנא בדוק את חיבור האינטרנט שלך' : ' אירעה שגיאה בהבאת הנתונים'}
                       </div>
                    </div> 
                }


                
        </div>
        </div>
    );
}
export default ListOfMeetingsUser;
