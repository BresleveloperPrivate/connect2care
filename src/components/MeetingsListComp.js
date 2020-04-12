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

    const meetingDate = [
        { option: props.t('all'), data: false },
        { option: props.t('sunday'), data: 'יום ראשון, ב באייר, 26.04' },
        { option: props.t('monday'), data: 'יום שני, ג באייר, 27.04' },
        { option: props.t('tuesday'), data: 'יום שלישי, ד באייר, 28.04' },
        { option: props.t('wednesday'), data: 'יום רביעי, ה באייר, 29.04' },
    ]

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            props.MeetingsStore.search(false, true)
        }
    }

    return (
     <div className='meetingsFullPage'>
         <div className={props.LanguageStore.lang !== 'heb' ? 'buttonOnMeetings-right buttonOnMeetings grow' : 'buttonOnMeetings-left buttonOnMeetings grow'} onClick={()=>{
             props.history.push('/create-meeting')
         }} >{props.t('IWantToInitiateAMeeting')}</div>
       {!props.MeetingsStore.error ? 
            <div className={props.LanguageStore.lang !== 'heb' ? 'mainPage-meetings mainPage-meetings-ltr' : 'mainPage-meetings'}>
                <div className={props.LanguageStore.lang !== 'heb' ? 'meetings-title tal' : 'tar meetings-title'}>{props.t('meetingsList')}</div>
                <div className={props.LanguageStore.lang !== 'heb' ? 'meetings-second-title tal' : 'meetings-second-title tar'}> {props.t('meetingsList2')} </div>
                <div className='containSearch'>
                    <input
                        onKeyDown={onKeyDown}
                        style={{ flexGrow: 1 }}
                        type="text"
                        value={props.MeetingsStore.searchInput}
                        className='input-meetings'
                        onChange={(e) => props.MeetingsStore.changeSearchInput(e)}
                        placeholder={props.t('searchPlaceHolder')}
                    />
                    <div
                        style={props.LanguageStore.lang !== 'heb' ? { marginLeft: '2em' } : { marginRight: '2em' }}
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
                        <div key={index}  className={props.LanguageStore.lang !== 'heb' ? 'containMeetingCard fdrr' : 'containMeetingCard' }>
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
                                className={props.LanguageStore.lang !== 'heb' ? 'meetingCard fdrr' :  'meetingCard' }
                                onClick={() => {
                                    props.history.push(`/meeting/${meeting.id}`)
                                }}
                            >
                                <div className='meetingCardContent'>
                                    <div className={props.LanguageStore.lang !== 'heb' ? 'meetingName tal' : 'meetingName tar' }>
                                        {meeting.name}
                                    </div>
                                    <div className='meetingFor'>
                                    <div style={props.LanguageStore.lang !== 'heb' ?
                                        {height:'1.7em' , marginRight:'0.5em' , marginBottom:'0.5em'}:
                                        {height:'1.7em' , marginLeft:'0.5em' , marginBottom:'0.5em'}}>                    
                                     <img src={candle} height='100%' />
                                        </div>
                                        <div>{meeting.fallens_meetings.map((fallen, index) => {
                                                if (index === 0) {
                                                    if(props.LanguageStore.lang !== 'heb'){
                                                        return (
                                                            <span key={index}>In memory of {fallen.fallens.name}</span>
                                                        )
                                                    }else{
                                                    return (
                                                        <span key={index}>לזכר {fallen.fallens.name} ז"ל</span>
                                                    )
                                                }
                                                }
                                                else if (index === props.meeting.fallens_meetings.length - 1) {
                                                    if(props.LanguageStore.lang !== 'heb'){
                                                    return (
                                                        <span key={index}> and {fallen.fallens.name}</span>
                                                    )}else{
                                                        return (
                                                            <span key={index}> ו{fallen.fallens.name} ז"ל</span>
                                                        )
                                                    }
                                                }
                                                else {
                                                    if(props.LanguageStore.lang !== 'heb'){
                                                        return(
                                                            <span key={index}>, {fallen.fallens.name}</span>
                                                        )
                                                    }else{
                                                    return (
                                                        <span key={index}>, {fallen.fallens.name} ז"ל</span>
                                                    )}
                                                }
                                        })}</div>
                                    </div>
                                    <div className='meetingDate'>
                                    <div style={
                            props.LanguageStore.lang !== 'heb' ?
                            { height: '1.3em', marginBottom: '0.5em', marginRight: '0.5em' }:
                            { height: '1.3em', marginBottom: '0.5em', marginLeft: '0.5em' }}>                                   
                                     <img src={clock} height='100%' />
                                        </div>
                                        {props.t(meetingDate.find(val=> val.data === meeting.date).option)} | {meeting.time}
                                    </div>
                                    <div className='meetingOwner'>

                                    <div style={
                            props.LanguageStore.lang !== 'heb' ?
                            { height: '1.3em', marginBottom: '0.6em', marginRight: '0.5em' }:
                            { height: '1.3em', marginBottom: '0.6em', marginLeft: '0.5em' }}>                                        
                                <img src={tell} height='100%' />
                                        </div>
                                        {props.t('host')}: {meeting.meetingOwner && meeting.meetingOwner.name}
                                    </div>
                                    <div className={props.LanguageStore.lang !== 'heb' ?'meetingDescription tal' : 'tar meetingDescription'}>
                                        {meeting.description}
                                    </div>
                                </div>
                                <div className='leftPartOfMeetingCard'>
                                    <div className='participants'>
                                        <img width='100%' height='100%' src={participants} />
                                        <div className='numberOfParticipants'>{meeting.isOpen ? meeting.participants_num : meeting.max_participants}</div>
                                    </div>
                                    <div className={!meeting.isOpen || meeting.participants_num >= meeting.max_participants ? 'meetingIsCloseBtn' :  'joinMeetingBtn grow' }> 
                                    {!meeting.isOpen || meeting.participants_num >= meeting.max_participants ? 
                                    <div style={
                                        props.LanguageStore.lang !== 'heb' ? 
                                        {height:'0.9em' , width: '0.9em' , marginRight:'0.4em' , display:'flex'}
                                        :
                                        {height:'0.9em' , width: '0.9em' , marginLeft:'0.4em' , display:'flex'}
                                        }>
                                        <img height='100%' width='100%' src={lock}/>
                                    </div> 
                                    : null }
                                    {meeting.participants_num >= meeting.max_participants ? 'אין יותר מקום' : !meeting.isOpen ? props.t("meetingIsClosed") : props.t('joinTheMeeting') }
                                     
                                      </div>
                                     {/* {!meeting.isOpen && meeting.participants_num < meeting.max_participants &&  <div className='comment'> ניתן לבקש להצטרף למפגש </div>} */}
                                </div>
                            </div>
                        </div>
                    )
                }) : null}

                    {!props.MeetingsStore.meetings  || props.MeetingsStore.loading ?
                        <div style={props.MeetingsStore.meetings ? { marginTop: '2em' }:{ marginTop: '10em' }}>
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

                {props.MeetingsStore.loadMoreButton && props.MeetingsStore.meetings && !props.MeetingsStore.loading &&
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <div
                            onClick={() => {
                                props.MeetingsStore.search(true, false)
                            }}
                            className="loadMore-meetings grow">{props.t("load more")}</div>
                    </div>}
            </div>
                    :
                    <div className={props.LanguageStore.lang !== 'heb' ? 'mainPage-meetings mainPage-meetings-ltr' : 'mainPage-meetings'}>
                    <div style={{paddingTop: '10em' , color:'var(--custom-blue)' , fontSize:'2em'}}>
                        {props.MeetingsStore.error.message === "No response, check your network connectivity" ? 'אנא בדוק את חיבור האינטרנט שלך' : ' אירעה שגיאה בהבאת הנתונים'}
                       </div>
                    </div> 
                }
        </div>

    );
}
export default inject('MeetingsStore','LanguageStore')(observer(ComputerList));