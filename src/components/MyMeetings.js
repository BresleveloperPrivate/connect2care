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
import Dialog from '@material-ui/core/Dialog';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ListOfMeetingsUser = (props) => {

    const [myMeetings ,setMyMeetings] = useState(false)
    const [option , setOption] = useState(0)
    const [error ,setError] = useState(false)

    const [open ,setOpen] = useState(true)
    const [level ,setlevel] = useState(1)
    const [type ,setType] = useState(false)
    const [email ,setEmail] = useState(false)
    const [phone ,setPhone] = useState(false)
    const [code ,setCode] = useState(false)

    return (
        <div>{!myMeetings ?

            <Dialog
            style={{zIndex:'5'}}
            open={open}
            // onClose={handleCloseEmail}
            >
      {level === 1? 
        <div className='emailAndPhonePopup'>
איפה נשלח לך קוד אימות?
        <div style={{width:'100%' , display:'flex' , justifyContent:'center' , alignItems:'center'}}>
           <div className='BtnsConfirmPopup grow' onClick={()=>{setType(1); setlevel(2)}}>
            SMS
          </div>
          <div className='BtnsConfirmPopup grow' onClick={()=>{setType(2) ; setlevel(2)}}>
            Email
          </div> 
        </div>  
        </div>
:


        <div className='emailAndPhonePopup'>
            <div style={{position:'absolute' , top: '10px' , right: '10px'}} ><FontAwesomeIcon className='pointer grow' icon="arrow-right" color="#ffffff" onClick={()=>setlevel(1)} /></div>
            <div style={{marginTop:'2vw'}}>
           {type === 2 ? 
            <input type='text' className='InputConfirmPopup' placeholder='הכנס אימייל'  onChange={(e)=>{setEmail(e.target.value)}}/> 
           :
            <input type='phone' className='InputConfirmPopup' placeholder='הכנס מספר טלפון' onChange={(e)=>{setPhone(e.target.value)}}/>
           }
           </div>
            
            <div 
            className='BtnsConfirmPopup grow'
            onClick={()=>{
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
        </div>}

        </Dialog>


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
