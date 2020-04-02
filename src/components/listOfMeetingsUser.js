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


    const myCloseToTheFallen = ["הכל", "אח", "הורים", "קרובי משפחה", "חבר"]
    const meetingLanguage = ['כל השפות', 'עברית', 'English', 'français', 'العربية', 'русский', 'አማርኛ', 'español']
    const meetingDate = ['כל התאריכים', 'יום ראשון, ב באייר, 26.04', 'יום שני, ג באייר, 27.04', 'יום שלישי, ד באייר, 28.04', 'יום רביעי, ה באייר, 29.04']
    const meetingTime = [
        { option: 'כל השעות', data: false },
        { option: '12:00 - 09:00', data: [900, 1200] },
        { option: '15:00 - 12:00', data: [1200, 1500] },
        { option: '18:00 - 15:00', data: [1500, 1800] },
        { option: '21:00 - 18:00', data: [1800, 2100] },
        { option: '00:00 - 21:00', data: [2100, 2400] }]

    useEffect(() => {
        (async () => {
            await props.MeetingsStore.search()
        })()
    }, []);

    return (
        <div className='navBarMargin' style={{ paddingBottom: '7vh' }}>

            <div className='mainPage-meetings'>
                <div className='meetings-title'>רשימת המפגשים</div>
                <div >משפט כלשהו... </div>
                <div className='containSearch'>
                    <input
                        style={{ flexGrow: 1 }}
                        type="text"
                        className='input-meetings'
                        onChange={(e) => props.MeetingsStore.changeSearchInput(e)}
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
                        width='20%'
                        fetch={props.MeetingsStore.search}
                        selectTextDefault='תאריך המפגש'
                        arr={meetingDate.map((name) => {
                            return { option: name }
                        })}
                        className='input-meetings filter-meeting mr-0'
                        onChoseOption={(value) => {
                            if (value.option === 'כל התאריכים') value.option = 'תאריך המפגש'
                            props.MeetingsStore.changeMeetingDate(value.option)
                        }}
                        changeBackground={true}

                    />

                    <Select
                        fetch={props.MeetingsStore.search}
                        selectTextDefault='שעה'
                        arr={meetingTime.map((name) => {
                            return { option: name.option }
                        })}
                        className='input-meetings filter-meeting'
                        onChoseOption={(value) => { 
                            if (value.option === 'כל השעות') {
                                value.option = 'שעה'
                                props.MeetingsStore.changeMeetingTime(false)
                            }else{
                                props.MeetingsStore.changeMeetingTime(
                                meetingTime.find(val => val.option ===  value.option).data
                        )}
                        }}
                        changeBackground={true}
                    />

                    <Select
                        fetch={props.MeetingsStore.search}
                        selectTextDefault='קרבה לחלל'
                        arr={myCloseToTheFallen.map((name) => {
                            return { option: name }
                        })}
                        className='input-meetings filter-meeting'
                        onChoseOption={

                            (value) => {
                                if (value.option === 'הכל') value.option = 'קרבה לחלל'
                                props.MeetingsStore.changeFallenRelative(value.option)
                            }}
                            changeBackground={true}

                    />


                    <Select
                        fetch={props.MeetingsStore.search}
                        selectTextDefault='שפת המפגש'
                        arr={meetingLanguage.map((name) => {
                            return { option: name }
                        })}
                        className='input-meetings filter-meeting'
                        onChoseOption={(value) => {
                            if (value.option === 'כל השפות') {
                                value.option = 'שפת המפגש'}
                            props.MeetingsStore.changeMeetingLanguage(value.option)
                        }}
                        changeBackground={true}
                    />
                    <div className='availableOnly'>
                        <div
                        style={{height: '1.5em' , width: '1.5em' , display:'flex' , marginLeft:'0.3em'}}
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
                                    array={['https://www.ynet.co.il/PicServer5/2019/03/28/9151154/915115101000889801302no.jpg',
                                        'https://img.mako.co.il/2011/05/23/567895_c.jpg',
                                        'https://img.mako.co.il/2011/05/23/567895_c.jpg',
                                    ]}

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
                                        <div style={{height:'1.7vw' , marginLeft:'0.5vw' , marginBottom:'0.5em'}}>
                                            <img src={candle} height='100%' />
                                        </div>
                                        <div>{meeting.fallens.map((fallen, index) => {
                                            if (index === 0) {
                                                return (
                                                    <span>לזכר {fallen.name} ז"ל</span>
                                                )
                                            }

                                            else if (index === meeting.fallens.length - 1) {
                                                return (
                                                    <span> ו{fallen.name} ז"ל</span>
                                                )
                                            }

                                            else {
                                                return (
                                                    <span>, {fallen.name} ז"ל</span>
                                                )

                                            }
                                        })}</div>
                                    </div>
                                    <div className='meetingDate'>
                                        <div style={{ height: '1.4vw', marginBottom: '0.5vw', marginLeft: '0.5vw' }}>
                                            <img src={clock} height='100%' />
                                        </div>
                                        {meeting.date} | {meeting.time}
                                    </div>
                                    <div className='meetingOwner'>

                                        <div style={{ height: '1.4vw', marginBottom: '0.7vw', marginLeft: '0.5vw' }}>
                                            <img src={tell} height='100%' />
                                        </div>
                                        {meeting.meetingOwner && meeting.meetingOwner.name}  | {meeting.relationship}
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
                     <div style={{marginTop: '10vw'}}>
                        <div class="spinner-border" style={{color:'var(--custom-blue)'}} role="status">
                        <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                     : !props.MeetingsStore.meetings.length ?
                     <div  style={{marginTop: '10vw' , color:'var(--custom-blue)' , fontSize:'2em'}}>
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
        </div>

    );
}
export default inject('MeetingsStore')(observer(ListOfMeetingsUser));
