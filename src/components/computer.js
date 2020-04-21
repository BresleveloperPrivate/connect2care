import React, { useState, useEffect, useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import '../styles/listOfMeetings.css'
import '../styles/computer.scss'
import { inject, observer, PropTypes } from 'mobx-react';
import lock from '../icons/lock-white.svg'
import ImageOfFallen from './ImageOfFallen'
import '../styles/animations.scss'
import candle from '../icons/candle-dark-blue.svg'
import clock from '../icons/clock.svg'
import participants from '../icons/participants.png'
import ContainFilters from './ContainFilters'
import grass from '../icons/grass.png'
import ourBrothers from '../icons/ourBro.png'
import tell from '../icons/Asset 7@3x11.png';

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

    let checkSide = (index)=>{
        if(props.LanguageStore.lang !== 'heb'){
            if(index % 2 === 0 && Math.floor(index / 4) % 2 === 0){
                return 1
            } else if( index % 2 !== 0 && Math.floor(index / 4) % 2 !== 0){
                return 1
            }else{
                return 0
            }
        }else{
            if(index % 2 === 0 && Math.floor(index / 4) % 2 === 0){
                return 0
            } else if( index % 2 !== 0 && Math.floor(index / 4) % 2 !== 0){
                return 0
            }else{
                return 1
            }
        }
       
    }

    return (
        <div className='meetingsFullPage'>
            {(new Date()).getDate() < 28 && <div className={props.LanguageStore.lang !== 'heb' ? 'buttonOnMeetings-right buttonOnMeetings grow' : 'buttonOnMeetings-left buttonOnMeetings grow'} onClick={() => {
                props.history.push('/create-meeting')
            }} >{props.t('IWantToInitiateAMeeting')}</div>}
            {!props.MeetingsStore.error ?
                <div className='mainPage-meetings-comp'>
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
                            {props.LanguageStore.lang !== 'heb' ? 'Search' : 'חיפוש'}
                        </div>

                    </div>
                    <ContainFilters className='containFilters' t={props.t} />

                    <div className='containMeetings-comp'>
                        {props.MeetingsStore.meetings ? props.MeetingsStore.meetings.map((meeting, index) => {
                            return (
                                <div className="flip-card" onClick={() => {
                                    props.history.push(`/meeting/${meeting.id}`)
                                }}>
                                        <div className="flip-card-front">

                                            <div key={index} className={checkSide(index) ?'containMeetingCard2-comp' : 'containMeetingCard1-comp'}>
                                                <div style={{ cursor: 'pointer' }}
                                                >
                                                    <ImageOfFallen
                                                        className='imageOfFallen-comp'
                                                        array={meeting.fallens_meetings}
                                                        width='10vw'
                                                        height='15vw'
                                                    />
                                                </div>
                                                <div
                                                    style={{ cursor: 'pointer', direction: props.LanguageStore.lang !== 'heb' ? 'ltr' : 'rtl' }}
                                                    className={'meetingCard-comp'}
                                                    onClick={() => {
                                                        props.history.push(`/meeting/${meeting.id}`)
                                                    }}
                                                >

                                                    <div className='meetingCardContent-comp'>
                                                        <div className={props.LanguageStore.lang !== 'heb' ? 'meetingName-comp tal' : 'meetingName-comp tar'}>
                                                            {!meeting.isOpen && <div style={
                                                                props.LanguageStore.lang !== 'heb' ?
                                                                    { height: '2vw', width: '0.5em', display: 'flex', marginRight: '0.5vw', zIndex: 2 }
                                                                    :
                                                                    { height: '2vw', width: '0.5em', display: 'flex', marginLeft: '0.5vw', zIndex: 2 }
                                                            }>
                                                                <img height='100%' width='100%' src={lock} />
                                                            </div>}
                                                            {meeting.name}
                                                        </div>

                                                        <div className='meetingOwner-comp'>

                                                            <div style={
                                                                props.LanguageStore.lang !== 'heb' ?
                                                                    { height: '1.1em', marginBottom: '0.6em', marginRight: '0.5em' } :
                                                                    { height: '1.1em', marginBottom: '0.6em', marginLeft: '0.5em' }}>
                                                                {meeting.fallens_meetings.some(fallen => fallen.relationship === 'האחים שלנו') ?
                                                                    <img height='140%' src={ourBrothers} /> :
                                                                    meeting.fallens_meetings.some(fallen => fallen.relationship === 'בית אביחי') ?
                                                                        <img height='130%' src={grass} /> :
                                                                        <img height='100%' src={tell} />}
                                                            </div>
                                                            {props.t('host')}: {meeting.meetingOwner && meeting.meetingOwner.name}
                                                        </div>
                                                        {/* <div className={props.LanguageStore.lang !== 'heb' ? 'meetingDescription tal' : 'tar meetingDescription'}>
                                            {meeting.description}
                                        </div> */}
                                                        {console.log(index, 'index')}
                                                        {console.log(index % 2, 'index % 2')}
                                                        {console.log(index % 4, 'index % 4')}
                                                        {console.log(Math.floor(index % 4) % 2, 'Math.floor(index % 4) % 2')}

                                                        <div className={checkSide(index) ?'arrow-left-blue' :'arrow-right-blue'}></div>

                                                    </div>

                                                </div>
                                            </div>


                                        </div>
                                        <div className="flip-card-back">
                                        <div className={props.LanguageStore.lang !== 'heb' ? 'tal' : 'tar'}>
                                                {meeting.fallens_meetings.map((fallen, index) => {
                                                    if (index === 0) {
                                                        if (props.LanguageStore.lang !== 'heb') {
                                                            return (
                                                                <span key={index}>In memory of {fallen.fallens.name}</span>
                                                            )
                                                        } else {
                                                            return (
                                                                <span key={index}>לזכר {fallen.fallens.name} ז"ל</span>
                                                            )
                                                        }
                                                    }
                                                    else if (index === meeting.fallens_meetings.length - 1) {
                                                        if (props.LanguageStore.lang !== 'heb') {
                                                            return (
                                                                <span key={index}> and {fallen.fallens.name}</span>
                                                            )
                                                        } else {
                                                            return (
                                                                <span key={index}> ו{fallen.fallens.name} ז"ל</span>
                                                            )
                                                        }
                                                    }
                                                    else {
                                                        if (props.LanguageStore.lang !== 'heb') {
                                                            return (
                                                                <span key={index}>, {fallen.fallens.name}</span>
                                                            )
                                                        } else {
                                                            return (
                                                                <span key={index}>, {fallen.fallens.name} ז"ל</span>
                                                            )
                                                        }
                                                    }
                                                })}</div>
                                        </div>
                                    </div>


                            )
                        }) : null}
                    </div>

                    {!props.MeetingsStore.meetings || props.MeetingsStore.loading ?
                        <div style={props.MeetingsStore.meetings ? { marginTop: '2em' } : { marginTop: '10em' }}>
                            <div className="spinner-border" style={{ color: 'var(--custom-blue)' }} role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                        : !props.MeetingsStore.meetings.length ?
                            <div style={{ marginTop: '10em', color: 'var(--custom-blue)', fontSize: '2em' }}>
                                {props.t('noMeetings')}
                            </div>

                            : null
                    }

                    {props.MeetingsStore.loadMoreButton && props.MeetingsStore.meetings && !props.MeetingsStore.loading &&
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div
                                onClick={() => {
                                    props.MeetingsStore.search(true, false)
                                }}
                                className="loadMore-meetings grow">{props.t("load more")}</div>
                        </div>}
                </div>
                :
                <div className={props.LanguageStore.lang !== 'heb' ? 'mainPage-meetings mainPage-meetings-ltr' : 'mainPage-meetings'}>
                    <div style={{ paddingTop: '10em', color: 'var(--custom-blue)', fontSize: '2em' }}>
                        {props.MeetingsStore.error.message === "No response, check your network connectivity" ? 'אנא בדוק את חיבור האינטרנט שלך' : ' אירעה שגיאה בהבאת הנתונים'}
                    </div>
                </div>
            }
        </div >

    );
}
export default inject('MeetingsStore', 'LanguageStore')(observer(ComputerList));
