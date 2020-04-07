import React, { useState, useEffect, useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/listOfMeetings.css'
import { inject, observer, PropTypes } from 'mobx-react';
import lock from '../icons/blue-lock.svg'
import tell from '../icons/tell.svg'
import ImageOfFallen from './ImageOfFallen'
import '../styles/animations.scss'
import candle from '../icons/candle-dark-blue.svg'
import clock from '../icons/clock.svg'
import participants from '../icons/participants.png'
import ContainFilters from './ContainFilters'

const ComputerList = (props) => {

    return (
     <div className='meetingsFullPage'>
         <div className='buttonOnMeetings grow' onClick={()=>{
             props.history.push('/create-meeting')
         }} >אני רוצה ליזום מפגש</div>
       {!props.MeetingsStore.error ? 
            <div className='mainPage-meetings'>
                <div className='meetings-title'>רשימת המפגשים</div>
                <div className='meetings-second-title'>כל המפגשים הוירטואליים שלנו מחכים לכם כאן </div>
                <div className='containSearch'>
                    <input
                        style={{ flexGrow: 1 }}
                        type="text"
                        value={props.MeetingsStore.searchInput}
                        className='input-meetings'
                        onChange={(e) => props.MeetingsStore.changeSearchInput(e)}
                        placeholder="חיפוש שם נופל, שם מפגש, שם מארח/ת"
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
                <ContainFilters className='containFilters' t={props.t} />


                {props.MeetingsStore.meetings ? props.MeetingsStore.meetings.map((meeting, index) => {
                    return (
                        <div key={index} className='containMeetingCard'>
                            <div  onClick={() => {
                                props.history.push(`/meeting/${meeting.id}`)
                            }}
                            style={{ cursor: 'pointer' }}
                            >
                                <ImageOfFallen
                                    className='imageOfFallen'
                                    array={meeting.fallens_meetings}
                                    width='15em'
                                    height='21em'
                                />
                            </div>
                            <div
                                style={{ cursor:'pointer' }}
                                className='meetingCard'
                                onClick={() => {
                                    props.history.push(`/meeting/${meeting.id}`)
                                }}
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
                                        מארח/ת: {meeting.meetingOwner && meeting.meetingOwner.name}
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
                                    {meeting.participants_num >= meeting.max_participants ? 'אין יותר מקום' : !meeting.isOpen ? props.t("meetingIsClosed") : 'הצטרף למפגש' }
                                     
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
export default inject('MeetingsStore')(observer(ComputerList));
