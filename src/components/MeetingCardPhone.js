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

const PhoneCard = (props) => {

    return (

        <div key={props.index}  className={props.LanguageStore.lang !== 'heb' ? 'containMeetingCard fdrr' : 'containMeetingCard' }>

            <div
                style={{ cursor:'pointer' }}
                className={props.LanguageStore.lang !== 'heb' ? 'meetingCard fdrr' :  'meetingCard' }
                onClick={() => {
                    props.history.push(`/meeting/${props.meeting.id}`)
                }}
            >

                

            <div>
                <ImageOfFallen
                    className='imageOfFallen'
                    array={props.meeting.fallens_meetings}
                    width={props.LanguageStore.width > 300 ? '12em' : '10em'}
                    height={props.LanguageStore.width > 300 ? '17em' : '15em'}
                />
            </div>
                <div className='meetingCardContent'>
                <div className={props.LanguageStore.lang !== 'heb' ? 'participants participants-right' : 'participants participants-left'}>
                    <img width='100%' height='100%' src={participants} />
                    <div className='numberOfParticipants'>{props.meeting.participants_num}</div>
                </div>
                    <div className={props.LanguageStore.lang !== 'heb' ? 'meetingName tal' : 'meetingName tar' }>
                        {props.meeting.name}
                    </div>
                    <div className='meetingFor'>
                        <div style={localStorage.getItem('lang')!== 'heb' ? 
                        {height:'1.7em' , marginRight:'0.5em' , marginBottom:'0.5em'}:
                        {height:'1.7em' , marginLeft:'0.5em' , marginBottom:'0.5em'}}>
                            <img src={candle} height='100%' />
                        </div>
                        <div>{props.meeting.fallens_meetings.map((fallen, index) => {
                            if (index === 0) {
                                return (
                                    <span key={index}>לזכר {fallen.fallens.name} ז"ל</span>
                                )
                            }
                            else if (index === props.meeting.fallens_meetings.length - 1) {
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
                        {props.LanguageStore.width > 300 ?
                    <div style={
                        localStorage.getItem('lang')!== 'heb' ? 
                        { height: '1.3em', marginBottom: '0.5em', marginRight: '0.5em' }:
                        { height: '1.3em', marginBottom: '0.5em', marginLeft: '0.5em' }}>
                                    <img src={clock} height='100%' />
                        </div> : null}
                        {props.meeting.date} | {props.meeting.time}
                    </div>
                    <div className='meetingOwner'>

                        <div style={
                            localStorage.getItem('lang')!== 'heb' ? 
                            { height: '1.3em', marginBottom: '0.6em', marginRight: '0.5em' }:
                            { height: '1.3em', marginBottom: '0.6em', marginLeft: '0.5em' }}>
                            <img src={tell} height='100%' />
                        </div>
                        מארח/ת: {props.meeting.meetingOwner && props.meeting.meetingOwner.name}
                    </div>
                    <div style={
                        localStorage.getItem('lang')!== 'heb' ? 
                        {width:'100%' , display:'flex' ,flexDirection:'row-reverse' , justifyContent:'flex-end'}
:
                        {width:'100%' , display:'flex' , justifyContent:'flex-end'}
                        }>
                    <div className={!props.meeting.isOpen || props.meeting.participants_num >= props.meeting.max_participants ? 'meetingIsCloseBtn' :  'joinMeetingBtn grow' }> 
                    {!props.meeting.isOpen || props.meeting.participants_num >= props.meeting.max_participants ? 
                    <div style={
                        props.LanguageStore.lang !== 'heb' ? 
                        {height:'0.9em' , width: '0.9em' , marginRight:'0.4em' , display:'flex'}
                        :
                        {height:'0.9em' , width: '0.9em' , marginLeft:'0.4em' , display:'flex'}                        
                        }>
                        <img height='100%' width='100%' src={lock}/>
                    </div> 
                    : null }
                    {props.meeting.participants_num >= props.meeting.max_participants ? 'אין יותר מקום' : !props.meeting.isOpen ? 'מפגש סגור' : 'הצטרף למפגש' }
                        </div>
                        </div>
                </div>
            </div>
        </div>
    )
}
export default inject('MeetingsStore','LanguageStore')(observer(PhoneCard));
