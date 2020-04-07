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
import filter1 from '../icons/filter1.svg'
import filter2 from '../icons/filter2.svg'
import search from '../icons/search.svg'

const PhoneList = (props) => {

    const [filter, setFilter] = useState(false)
    
    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            props.MeetingsStore.search(false, true)
        }
    }

    return (
        <div className='meetingsFullPage'>

            {!props.MeetingsStore.error ?
                <div className='mainPage-meetings'>
                    <div className='meetings-title'>רשימת המפגשים</div>
                    <div className='meetings-second-title'>כל המפגשים הוירטואליים שלנו מחכים לכם כאן </div>
                    <div className='containSearch'>
                        <div className='input-meetings' style={{display:'flex' , alignItems:'center'}}>
                            <input
                            onKeyDown={onKeyDown}
                            style={{ flexGrow: 1 }}
                            type="text"
                            value={props.MeetingsStore.searchInput}
                            className='inputPhoneView'
                            onChange={(e) => props.MeetingsStore.changeSearchInput(e)}
                            placeholder="חיפוש שם נופל, שם מפגש, שם מארח/ת"
                        />
                         <div style={{ height: '1.8em', width: '1em', display: 'flex', marginRight: '0.8em' }}
                            onClick={() => {
                                props.MeetingsStore.search(false, true)
                            }}
                        >
                            <img height='100%' width='100%' src={search} />
                        </div>
                        </div>
                        <div style={{ height: '2em', width: '1.5em', display: 'flex', marginRight: '0.8em' }}
                            onClick={() => {
                                if(!filter){
                                    let filtersId = document.getElementById('filtersId')
                                    if(filtersId){
                                        setTimeout(()=>{
                                            filtersId.classList.add('overflow-visible')
                                        },1200)
                                    }
                                }
                                setFilter(!filter)

                            }}
                        >
                            <img height='100%' width='100%' src={filter ? filter2 : filter1} />
                        </div>
                        {/* <div
                        style={{ marginRight: '2em' }}
                        className={props.MeetingsStore.searchInput !== props.MeetingsStore.prevSearchInput ?
                            'button-meetings' : 'button-meetings disabled-button-meetings'}
                        onClick={props.MeetingsStore.searchInput !== props.MeetingsStore.prevSearchInput ?
                            () => {
                                props.MeetingsStore.search(false, true)
                            } : () => { }}>
                        חיפוש
                    </div> */}



                    </div>

                    <ContainFilters className={filter ? 'containFilters' : 'containFilters containFiltersClose'} t={props.t} />



                    {props.MeetingsStore.meetings ? props.MeetingsStore.meetings.map((meeting, index) => {
                        return (
                            <div key={index} className='containMeetingCard'>
                     
                                <div
                                    style={{ cursor:'pointer' }}
                                    className='meetingCard'
                                    onClick={() => {
                                        props.history.push(`/meeting/${meeting.id}`)
                                    }}
                                >

                                    <div className='participants'>
                                        <img width='100%' height='100%' src={participants} />
                                        <div className='numberOfParticipants'>{meeting.participants_num}</div>
                                    </div>

                                <div>
                                    <ImageOfFallen
                                        className='imageOfFallen'
                                        array={meeting.fallens_meetings}
                                        width={props.LanguageStore.width > 300 ? '12em' : '10em'}
                                        height={props.LanguageStore.width > 300 ? '17em' : '15em'}
                                    />
                                </div>
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
                                            {props.LanguageStore.width > 300 ?<div style={{ height: '1.3em', marginBottom: '0.5em', marginLeft: '0.5em' }}>
                                                <img src={clock} height='100%' />
                                            </div> : null}
                                            {meeting.date} | {meeting.time}
                                        </div>
                                        <div className='meetingOwner'>

                                            <div style={{ height: '1.3em', marginBottom: '0.6em', marginLeft: '0.5em' }}>
                                                <img src={tell} height='100%' />
                                            </div>
                                            מארח/ת: {meeting.meetingOwner && meeting.meetingOwner.name}
                                        </div>
                                        <div style={{width:'100%' , display:'flex' , justifyContent:'flex-end'}}>
                                        <div className={!meeting.isOpen || meeting.participants_num >= meeting.max_participants ? 'meetingIsCloseBtn' :  'joinMeetingBtn grow' }> 
                                        {!meeting.isOpen || meeting.participants_num >= meeting.max_participants ? 
                                        <div style={{height:'0.9em' , width: '0.9em' , marginLeft:'0.4em' , display:'flex'}}>
                                            <img height='100%' width='100%' src={lock}/>
                                        </div> 
                                        : null }
                                        {meeting.participants_num >= meeting.max_participants ? 'אין יותר מקום' : !meeting.isOpen ? 'מפגש סגור' : 'הצטרף למפגש' }
                                          </div>
                                          </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : null}

                    {!props.MeetingsStore.meetings ?
                        <div style={{ marginTop: '1em' }}>
                            <div className="spinner-border" style={{ color: 'var(--custom-blue)' }} role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                        : !props.MeetingsStore.meetings.length ?
                            <div style={{ marginTop: '1em', color: 'var(--custom-blue)', fontSize: '3em' }}>
                                לא נמצאו מפגשים המתאימים לחיפוש שלך
                      </div>

                            : null
                    }

                    <div style={{ display: 'flex', justifyContent: 'center' , alignItems:'center', flexDirection:'column' , minWidth:'50vw' , width:'fit-content' , margin: 'auto' , marginTop:'2.5em' }}>
                        {props.MeetingsStore.loadMoreButton && props.MeetingsStore.meetings &&
                            <div
                                onClick={() => {
                                    props.MeetingsStore.search(true, false)
                                }}
                                className="loadMore-meetings grow">טען עוד</div>}
                        <div className='buttonOnMeetings grow' onClick={() => {
                            props.history.push('/create-meeting')
                        }} >אני רוצה ליזום מפגש</div>
                    </div>


                </div>
                :
                <div className='mainPage-meetings'>
                    <div style={{ paddingTop: '10em', color: 'var(--custom-blue)', fontSize: '3em' }}>
                        {props.MeetingsStore.error.error.message === "No response, check your network connectivity" ? 'אנא בדוק את חיבור האינטרנט שלך' : ' אירעה שגיאה בהבאת הנתונים'}
                    </div>
                </div>
            }
        </div>

    );
}
export default inject('MeetingsStore','LanguageStore')(observer(PhoneList));
