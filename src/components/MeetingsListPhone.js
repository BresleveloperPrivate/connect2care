import React, { useState, useEffect, useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/listOfMeetings.css'
import { inject, observer, PropTypes } from 'mobx-react';
// import lock from '../icons/blue-lock.svg'
// import tell from '../icons/tell.svg'
// import ImageOfFallen from './ImageOfFallen'
import '../styles/animations.scss'
// import candle from '../icons/candle-dark-blue.svg'
// import clock from '../icons/clock.svg'
import participants from '../icons/participants.png'
import ContainFilters from './ContainFilters'
import filter1 from '../icons/filter1.svg'
import filter2 from '../icons/filter2.svg'
import search from '../icons/search.svg'
import MeetingCardPhone from './MeetingCardPhone'


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
                <div className={props.LanguageStore.lang !== 'heb' ? 'mainPage-meetings mainPage-meetings-ltr' : 'mainPage-meetings'}>
                    <div className={props.LanguageStore.lang !== 'heb' ? 'meetings-title tal' : 'tar meetings-title'}>רשימת המפגשים</div>
                    <div className={props.LanguageStore.lang !== 'heb' ? 'meetings-second-title tal' : 'meetings-second-title tar'}>כל המפגשים הוירטואליים שלנו מחכים לכם כאן </div>
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
                         <div style={
                            props.LanguageStore.lang !== 'heb' ?
                            { height: '1.8em', width: '1em', display: 'flex', marginLeft: '0.8em' }
                            : 
                           { height: '1.8em', width: '1em', display: 'flex', marginRight: '0.8em' }
                            }
                            onClick={
                                props.MeetingsStore.searchInput !== props.MeetingsStore.prevSearchInput ?
                                () => {
                                    props.MeetingsStore.search(false, true)
                                } : () => { }}
                        >
                            <img height='100%' width='100%' src={search} />
                        </div>
                        </div>
                        <div style={
                            props.LanguageStore.lang !== 'heb' ? 
                            { height: '2em', width: '1.5em', display: 'flex', marginLeft: '0.8em' }
:
                            { height: '2em', width: '1.5em', display: 'flex', marginRight: '0.8em' }
                        }
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
                        return (<MeetingCardPhone key={index} history={props.history} index={index} meeting={meeting} />)
                    }) : null}

                    {!props.MeetingsStore.meetings || props.MeetingsStore.loading ?
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

                    <div style={
                        { display: 'flex', justifyContent: 'center' , alignItems:'center', flexDirection:'column' , minWidth: props.LanguageStore.width > 550 ? '30vw' : '40vw' , width:'fit-content' , margin: 'auto' , marginTop:'2.5em' }
                    }>
                        {props.MeetingsStore.loadMoreButton && props.MeetingsStore.meetings && !props.MeetingsStore.loading &&
                            <div
                                onClick={() => {
                                    props.MeetingsStore.search(true, false)
                                }}
                                className="loadMore-meetings grow">טען עוד</div>}
                        <div className='buttonOnMeetings grow' onClick={() => {
                            props.history.push('/create-meeting')
                        }} >{props.t('IWantToInitiateAMeeting')}</div>
                    </div>


                </div>
                :
                <div className={props.LanguageStore.lang !== 'heb' ? 'mainPage-meetings mainPage-meetings-ltr' : 'mainPage-meetings'}>
                    <div style={{ paddingTop: '10em', color: 'var(--custom-blue)', fontSize: '3em' }}>
                        {props.MeetingsStore.error.error.message === "No response, check your network connectivity" ? 'אנא בדוק את חיבור האינטרנט שלך' : ' אירעה שגיאה בהבאת הנתונים'}
                    </div>
                </div>
            }
        </div>

    );
}
export default inject('MeetingsStore','LanguageStore')(observer(PhoneList));
