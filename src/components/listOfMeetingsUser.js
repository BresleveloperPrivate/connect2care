import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/listOfMeetings.css'
import { inject, observer, PropTypes } from 'mobx-react';
import tell from '../icons/tell.svg'
import Select from './Select.js'
import Auth from '../modules/auth/Auth'
import ImageOfFallen from './ImageOfFallen'
import '../styles/animations.scss'
import candle from '../icons/candle-dark-blue.svg'
import clock from '../icons/clock.svg'

const ListOfMeetingsUser = (props) => {

    const myCloseToTheFallen = ["הכל", "אח", "הורים", "קרובי משפחה", "חבר"]
    const meetingLanguage = ['כל השפות', 'עברית', 'English', 'français', 'العربية', 'русский', 'አማርኛ', 'español']
    const meetingDate = ['כל התאריכים', 'יום ראשון, ב באייר, 26.04', 'יום שני, ג באייר, 27.04', 'יום שלישי, ד באייר, 28.04', 'יום רביעי, ה באייר, 29.04']

    useEffect(() => {
        (async () => {
            await props.MeetingsStore.search()
        })()
    }, []);

    return (
        <div className='navBarMargin' style={{paddingBottom:'7vh'}}>

            <div className='mainPage-meetings'>
                <div className='meetings-title'>רשימת המפגשים</div>
                <div >משפט כלשהו... </div>
                <div className='containSearch'>
                    <input
                        style={{ flexGrow: 1 }}
                        type="text"
                        className='input-meetings'

                        onChange={(e) => props.MeetingsStore.changeSearchInput(e)}
                        // value={}
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
                        width='25%'
                        fetch={props.MeetingsStore.search}
                        selectTextDefault='תאריך המפגש'
                        arr={meetingDate.map((name) => {
                            return { option: name }
                        })}
                        // selectedText={props.CreateMeetingStore.meetingDetails.date}
                        className='input-meetings filter-meeting mr-0'
                        onChoseOption={(value) => {
                            if (value.option === 'כל התאריכים') value.option = 'תאריך המפגש'
                            props.MeetingsStore.changeMeetingDate(value.option)
                        }}
                    />

                    <Select
                        fetch={props.MeetingsStore.search}
                        selectTextDefault='שעה'
                        arr={meetingDate.map((name) => {
                            return { option: name }
                        })}
                        // selectedText={props.CreateMeetingStore.meetingDetails.date}
                        className='input-meetings filter-meeting'
                        onChoseOption={(value) => { props.MeetingsStore.changeMeetingDate(value.option) }}
                    />

                    <Select
                        fetch={props.MeetingsStore.search}
                        selectTextDefault='קרבה לחלל'
                        arr={myCloseToTheFallen.map((name) => {
                            return { option: name }
                        })}
                        // selectedText={props.CreateMeetingStore.meetingDetails.relationship}
                        className='input-meetings filter-meeting'
                        onChoseOption={

                            (value) => {
                                if (value.option === 'הכל') value.option = 'קרבה לחלל'
                                props.MeetingsStore.changeFallenRelative(value.option)
                            }}
                    />


                    <Select
                        fetch={props.MeetingsStore.search}
                        selectTextDefault='שפת המפגש'
                        arr={meetingLanguage.map((name) => {
                            return { option: name }
                        })}
                        // selectedText={props.CreateMeetingStore.meetingDetails.language}
                        className='input-meetings filter-meeting'
                        onChoseOption={(value) => {
                            if (value.option === 'כל השפות') value.option = 'שפת המפגש'
                            props.MeetingsStore.changeMeetingLanguage(value.option)
                        }}
                    />

                 
                    {/* <div
                        style={{ marginRight: '2vw' }}
                        className='button-meetings'
                        onClick={() => {
                            props.MeetingsStore.search()
                        }}>
                        סנן
                    </div> */}


                </div>





                {props.MeetingsStore.meetings ? props.MeetingsStore.meetings.map((meeting, index) => {
                    return (
                        <div key={index} className='containMeetingCard'>
                            <div   onClick={meeting.isOpen ? ()=>{
                                    props.history.push(`/meeting/${meeting.id}`)
                                }: ()=>{}}>
                                <ImageOfFallen
                               
                                className='imageOfFallen'
                                    array={['https://www.ynet.co.il/PicServer5/2019/03/28/9151154/915115101000889801302no.jpg',
                                        'https://img.mako.co.il/2011/05/23/567895_c.jpg',
                                        'https://img.mako.co.il/2011/05/23/567895_c.jpg',
                                    ]} />
                            </div>
                            <div
                             className='meetingCard'
                             onClick={meeting.isOpen ? ()=>{
                                props.history.push(`/meeting/${meeting.id}`)
                            }: ()=>{}}
                             >

                                <div className='meetingCardContent'>
                                    <div className='meetingName'>
                                        {meeting.name}
                                    </div>
                                    <div className='meetingFor'>
                                        <div style={{height:'1.7vw' , marginLeft:'0.5vw' , marginBottom:'1vw'}}>
                                            <img src={candle} height='100%' />
                                            </div>
                                        <div>{meeting.fallens.map((fallen, index) => {
                                            if (index === 0) {
                                                return (
                                                    <span>לזכר {fallen.first_name} {fallen.last_name} ז"ל</span>
                                                )
                                            }

                                            else if (index === meeting.fallens.length - 1) {
                                                return (
                                                    <span> ו{fallen.first_name} {fallen.last_name} ז"ל</span>
                                                )
                                            }

                                            else{
                                                return (
                                                    <span>, {fallen.first_name} {fallen.last_name} ז"ל</span>
                                                )

                                            }
                                        })}</div>
                                    </div>
                                    <div className='meetingDate'>
                                    <div style={{height:'1.4vw' ,marginBottom: '0.5vw', marginLeft:'0.5vw'}}>
                                        <img src={clock} height='100%' />
                                        </div>
                                        {meeting.date} | {meeting.time}
                                    </div>
                                    <div className='meetingOwner'>
                                        
                                         <div style={{height:'1.4vw' ,marginBottom: '0.7vw', marginLeft:'0.5vw'}}>
                                        <img src={tell} height='100%' />
                                        </div>
                                       {meeting.meetingOwner.name}  | {meeting.relationship}
                                         </div>
                                    <div className='meetingDescription'>
{meeting.description}
                                    </div>
                                </div>
                                <div>
                                    {/* //div -> image
// join */}
                                </div>

                            </div>
                        </div>
                    )
                }) : null}



                {props.MeetingsStore.loadMoreButton && props.MeetingsStore.meetings &&
                <div style={{display:'flex' , justifyContent:'flex-end'}}>
                     <div
                    onClick={() => {
                        props.MeetingsStore.search(true, false)
                    }}
                    className="loadMore-meetings">טען עוד</div>
                    </div>}
            </div>
            {/* <input
                        type="time"
                        className='inputStyle'
                        style={{ marginRight: "2vh" }}
                        // onChange={props.CreateMeetingStore.changeMeetingTime}
                        // value={props.CreateMeetingStore.meetingDetails.time}
                        autoComplete="off"
                        placeholder="שעה"
                    /> */}

            {/* <input
                type="text"
                className='inputStyle margin-right-text'
                onChange={props.CreateMeetingStore.changeNumberOfParticipants}
                value={props.CreateMeetingStore.meetingDetails.maxParticipants}
                autoComplete="off"
                placeholder="מספר משתתפים מקסימלי"
            /> */}



        </div>

    );
}
export default inject('MeetingsStore')(observer(ListOfMeetingsUser));
