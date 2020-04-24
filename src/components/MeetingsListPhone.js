import React, { useState, useEffect, useRef } from 'react';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const PhoneList = (props) => {
    const [speech, setSpeech] = useState(true)
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
                    <div className={props.LanguageStore.lang !== 'heb' ? 'meetings-title tal' : 'tar meetings-title'}>{props.t('meetingsList')}</div>
                    <div className={props.LanguageStore.lang !== 'heb' ? 'meetings-second-title tal' : 'meetings-second-title tar'}> {props.t('meetingsList2')}  </div>
                    <div className='containSearch'>
                        <div className='input-meetings' style={{ display: 'flex', alignItems: 'center', padding: '1vh 10px' }}>
                            <input
                                onKeyDown={onKeyDown}
                                style={{ flexGrow: 1 }}
                                type="text"
                                value={props.MeetingsStore.searchInput}
                                className='inputPhoneView'
                                onChange={(e) => props.MeetingsStore.changeSearchInput(e)}
                                placeholder={props.t('searchPlaceHolder')}
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
                                { height: '2em', width: '1.5em', display: 'flex', marginLeft: '0.8em', position: 'relative' }
                                :
                                { height: '2em', width: '1.5em', display: 'flex', marginRight: '0.8em', position: 'relative' }
                        }
                            onClick={() => {
                                if (!filter) {
                                    let filtersId = document.getElementById('filtersId')
                                    if (filtersId) {
                                        setTimeout(() => {
                                            filtersId.classList.add('overflow-visible')
                                        }, 1200)
                                    }
                                }
                                setFilter(!filter)

                            }}
                        >

                            {!localStorage.getItem('speech') && speech &&
                                <div className={props.LanguageStore.lang !== 'heb' ? 'speech-bubble-filter speech-bubble-filter-en' : 'speech-bubble-filter speech-bubble-filter-heb'}>
                                    <div style={
                                        props.LanguageStore.lang !== 'heb' ?
                                            { position: 'absolute', top: '8px', left: '8px' }
                                            : { position: 'absolute', top: '8px', right: '8px' }
                                    }><FontAwesomeIcon onClick={() => { localStorage.setItem('speech', true); setSpeech(false) }} icon={['fas', 'times']} style={{ fontSize: '1rem', cursor: 'pointer', color: 'white' }} /></div>

                                    {props.LanguageStore.lang !== 'heb' ?
                                    <div className='speech-bubble-filter-text'>

                                    Many families would love to see you join their virtual meet-ups.
                                    So, we have added a filter that will let you find the meet-ups that are still less crowded. <br />
                                    Join us for a joint commemoration.
                                 </div>
                                        :
                                        <div className='speech-bubble-filter-text'>

                                            הרבה משפחות ישמחו לראותכם במפגשים,
                        לכן הוספנו סינון המאפשר לראות אילו מפגשים פחות עמוסים. <br />
                        הצטרפו אלינו לחיבוק וזכרון משותף.
                        </div>

                                    }

                                    <div className={props.LanguageStore.lang !== 'heb' ? 'arrow-top arrow-top-en' : 'arrow-top arrow-top-heb'}> </div>
                                </div>}
                            <img style={{ cursor: 'pointer' }} height='100%' width='100%' src={filter ? filter2 : filter1} />
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
                        return (<MeetingCardPhone t={props.t} key={index} history={props.history} index={index} meeting={meeting} />)
                    }) : null}

                    {!props.MeetingsStore.meetings || props.MeetingsStore.loading ?
                        <div style={{ marginTop: '2em' }}>
                            <div className="spinner-border" style={{ color: 'var(--custom-blue)' }} role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                        : !props.MeetingsStore.meetings.length ?
                            <div style={{ marginTop: '1em', color: 'var(--custom-blue)', fontSize: '3em' }}>
                                {props.t('noMeetings')}
                            </div>

                            : null
                    }

                    <div style={
                        { display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minWidth: props.LanguageStore.width > 550 ? '30vw' : '40vw', width: 'fit-content', margin: 'auto', marginTop: '2.5em' }
                    }>
                        {props.MeetingsStore.loadMoreButton && props.MeetingsStore.meetings && !props.MeetingsStore.loading &&
                            <div
                                onClick={() => {
                                    props.MeetingsStore.search(true, false)
                                }}
                                className="loadMore-meetings grow">{props.t("load more")}</div>}
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
        </div >

    );
}
export default inject('MeetingsStore', 'LanguageStore')(observer(PhoneList));
