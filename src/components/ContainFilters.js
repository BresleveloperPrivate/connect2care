
import checkboxOn from '../icons/checkbox_on_light.svg'
import checkboxOff from '../icons/checkbox_off_light.svg'
import Select from './Select.js'
import React, { useState, useEffect, useRef } from 'react';
import { inject, observer, PropTypes } from 'mobx-react';


const Filters = (props) => {

    const myCloseToTheFallen = [
        { option: props.t('all'), data: false },
        { option: props.t('brother or sister'), data: 'אח/ות' },
        { option: props.t('parent'), data: 'הורים' },
        { option: props.t('family member'), data: 'קרובי משפחה' },
        { option: props.t('friend'), data: 'חבר' },
        { option: props.t('widower'), data: 'אלמן/ אלמנה' },
        { option: props.t('orphans'), data: 'יתומים' },
        { option: props.t('avi chai'), data: 'בית אביחי' },
        { option: props.t('ourBrothers'), data: 'האחים שלנו' },
    ]

    const meetingLanguage = [
        { option: props.t('all'), data: false },
        { option: 'עברית', data: 'עברית' },
        { option: 'English', data: 'English' },
        { option: 'français', data: 'français' },
        { option: 'العربية', data: 'العربية' },
        { option: 'русский', data: 'русский' },
        { option: 'አማርኛ', data: 'አማርኛ' },
        { option: 'español', data: 'español' },
    ]
    const meetings = [
        { option: props.t('all meetings'), data: false },
        { option: props.t('open meetings'), data: 1 },
        { option: props.t('private meetings'), data: 2 },
        { option: props.t('full meetings'), data: 3 },
    ]
    const meetingDate = [
        { option: props.t('all'), data: false },
        { option: props.t('sunday'), data: 'יום ראשון, ב באייר, 26.04' },
        { option: props.t('monday'), data: 'יום שני, ג באייר, 27.04' },
        { option: props.t('tuesday'), data: 'יום שלישי, ד באייר, 28.04' },
        { option: props.t('wednesday'), data: 'יום רביעי, ה באייר, 29.04' },
    ]
    const meetingTime = [
        { option: props.t('all'), data: false },
        { option: '09:00 - 12:00', data: [900, 1200] },
        { option: '12:00 - 15:00', data: [1200, 1500] },
        { option: '15:00 - 18:00', data: [1500, 1800] },
        { option: '18:00 - 21:00', data: [1800, 2100] },
        { option: '21:00 - 00:00', data: [2100, 2400] },
    ]
    const participants = 
    
    props.LanguageStore.lang !== 'heb' ? [
        { option: props.t('all'), data: false },
        { option: '0 - 20', data: [0, 20] },
        { option: '20 - 50', data: [20, 50] },
        { option: '50 - 100', data: [50, 100] },
        { option: '100 - 200', data: [100, 200] },
        { option: '200+', data: [200, 1000] },
    ]
    : [
        { option: props.t('all'), data: false },
        { option: '20 - 0', data: [0, 20] },
        { option: '50 - 20', data: [20, 50] },
        { option: '100 - 50', data: [50, 100] },
        { option: '200 - 100', data: [100, 200] },
        { option: '200+', data: [200, 1000] },
    ]

    return (

        <div id='filtersId' className={props.className}>
            <div className={props.LanguageStore.lang !== 'heb' ? 'filterBy-left tal' : 'filterBy-right tar'}> {props.t('filter by')}:</div>
            <Select
                width={props.LanguageStore.width > 800 && props.LanguageStore.lang === 'heb' ? '14%' : props.LanguageStore.width > 800 ? '12%' : '100%'}
                default={props.MeetingsStore.status}
                selectTextDefault={props.t('all meetings')}
                arr={meetings}
                className={props.LanguageStore.lang !== 'heb' ? 'tal input-meetings mr-0' : 'tar input-meetings mr-0'}
                onChoseOption={(value) => {
                    props.MeetingsStore.changeMeetingStatus(value)
                    props.MeetingsStore.search()
                }}
                changeBackground={true}
            />

            <Select
                default={props.MeetingsStore.date}
                width={props.LanguageStore.width > 800 && props.LanguageStore.lang === 'heb' ? '14%' : props.LanguageStore.width > 800 ? '14%' : '100%'}
                // fetch={props.MeetingsStore.search}
                selectTextDefault={props.t('meeting date')}
                arr={meetingDate}
                className={props.LanguageStore.lang !== 'heb' ? 'tal input-meetings filter-meeting-left' : 'tar input-meetings filter-meeting-right'}
                onChoseOption={(value) => {
                    props.MeetingsStore.changeMeetingDate(value)
                    props.MeetingsStore.search()
                }}
                changeBackground={true}

            />
            <Select
                width={props.LanguageStore.width > 800 && props.LanguageStore.lang === 'heb' ? '14%' : props.LanguageStore.width > 800 ? '12%' : '100%'}
                default={props.MeetingsStore.time}
                selectTextDefault={props.t('meeting time')}
                arr={meetingTime}
                className={props.LanguageStore.lang !== 'heb' ? 'tal input-meetings filter-meeting-left' : 'tar input-meetings filter-meeting-right'}
                onChoseOption={(value) => {
                    props.MeetingsStore.changeMeetingTime(value)
                    props.MeetingsStore.search()
                }}
                changeBackground={true}
            />
            <Select
                img={true}
                width={props.LanguageStore.width > 800 && props.LanguageStore.lang === 'heb' && props.LanguageStore.width > 800 ? '14%' : props.LanguageStore.width > 800 ? '14%' : '100%'}
                default={props.MeetingsStore.fallenRelative.data ? props.MeetingsStore.fallenRelative : false}
                selectTextDefault={props.t('relationship to fallen')}
                arr={myCloseToTheFallen}
                className={props.LanguageStore.lang !== 'heb' ? 'tal input-meetings filter-meeting-left' : 'tar input-meetings filter-meeting-right'}
                onChoseOption={
                    (value) => {
                        props.MeetingsStore.changeFallenRelative(value)
                        props.MeetingsStore.search()
                    }}
                changeBackground={true}
            />
            <Select
                width={props.LanguageStore.width > 800 && props.LanguageStore.lang === 'heb' ? '14%' : props.LanguageStore.width > 800 ? '14%' : '100%'}
                default={props.MeetingsStore.language}
                selectTextDefault={props.t('meeting language')}
                arr={meetingLanguage}
                className={props.LanguageStore.lang !== 'heb' ? 'tal input-meetings filter-meeting-left' : 'tar input-meetings filter-meeting-right'}
                onChoseOption={(value) => {
                    props.MeetingsStore.changeMeetingLanguage(value)
                    props.MeetingsStore.search()
                }}
                changeBackground={true}
            />

            <Select
                width={props.LanguageStore.width > 800 && props.LanguageStore.lang === 'heb' ? '14%' : props.LanguageStore.width > 800 ? '18%' : '100%'}
                default={props.MeetingsStore.participants}
                selectTextDefault={props.t('participantsNum')}
                arr={participants}
                className={props.LanguageStore.lang !== 'heb' ? 'tal input-meetings filter-meeting-left' : 'tar input-meetings filter-meeting-right'}
                onChoseOption={(value) => {
                    props.MeetingsStore.changeMeetingParticipants(value)
                    props.MeetingsStore.search()
                }}
                changeBackground={true}
            />

            {/* <div className='availableOnly'>
                <div
                    style={{ height: '1.5em', width: '1.5em', display: 'flex', marginLeft: '0.3em', cursor: 'pointer' }}
                    onClick={() => {
                        props.MeetingsStore.changeAvailableOnly(!props.MeetingsStore.availableOnly)
                        props.MeetingsStore.search()
                    }}>
                    <img height='100%' width='100%s' src={props.MeetingsStore.availableOnly ? checkboxOn : checkboxOff} />
                </div>
                {props.t('show available meetings only')}
            </div> */}
        </div>

    )
}

export default inject('MeetingsStore', 'LanguageStore')(observer(Filters));





