
import checkboxOn from '../icons/checkbox_on_light.svg'
import checkboxOff from '../icons/checkbox_off_light.svg'
import Select from './Select.js'
import React, { useState, useEffect, useRef } from 'react';
import { inject, observer, PropTypes } from 'mobx-react';


const Filters = (props) => {

const myCloseToTheFallen = [
    { option: 'הכל', data: false },
    { option: 'אח/ות', data: 'אח/ות' },
    { option: 'הורים', data: 'הורים' },
    { option: 'קרובי משפחה', data: 'קרובי משפחה' },
    { option: 'חבר', data: 'חבר' },
]
const meetingLanguage = [
    { option: 'כל השפות', data: false },
    { option: 'עברית', data: 'עברית' },
    { option: 'English', data: 'English' },
    { option: 'français', data: 'français' },
    { option: 'العربية', data: 'العربية' },
    { option: 'русский', data: 'русский' },
    { option: 'አማርኛ', data: 'አማርኛ' },
    { option: 'español', data: 'español' },
]
const meetingDate = [
    { option: 'כל התאריכים', data: false },
    { option: props.t('sunday'), data: 'יום ראשון, ב באייר, 26.04' },
    { option: props.t('monday'), data: 'יום שני, ג באייר, 27.04' },
    { option: props.t('tuesday'), data: 'יום שלישי, ד באייר, 28.04' },
    { option: props.t('wednesday'), data: 'יום רביעי, ה באייר, 29.04' },
]
const meetingTime = [
    { option: 'כל השעות', data: false },
    { option: '12:00 - 09:00', data: [900, 1200] },
    { option: '15:00 - 12:00', data: [1200, 1500] },
    { option: '18:00 - 15:00', data: [1500, 1800] },
    { option: '21:00 - 18:00', data: [1800, 2100] },
    { option: '00:00 - 21:00', data: [2100, 2400] },
]

    return (

        <div id='filtersId' className={props.className}>
            <div className='filterBy'>סנן לפי:</div>
            <Select
                default={props.MeetingsStore.date}
                width={props.LanguageStore.width > 550 ? '23%' : '100%'}
                fetch={props.MeetingsStore.search}
                selectTextDefault='תאריך המפגש'
                arr={meetingDate}
                className='input-meetings filter-meeting mr-0'
                onChoseOption={(value) => {
                    props.MeetingsStore.changeMeetingDate(value)
                    props.MeetingsStore.search()
                }}
                changeBackground={true}

            />
            <Select
                default={props.MeetingsStore.time}
                selectTextDefault='שעה'
                arr={meetingTime}
                className='input-meetings filter-meeting'
                onChoseOption={(value) => {
                    props.MeetingsStore.changeMeetingTime(value)
                    props.MeetingsStore.search()
                }}
                changeBackground={true}
            />
            <Select

                default={props.MeetingsStore.fallenRelative.data ? props.MeetingsStore.fallenRelative : false}
                selectTextDefault='קרבה לחלל'
                arr={myCloseToTheFallen}
                className='input-meetings filter-meeting'
                onChoseOption={
                    (value) => {
                        props.MeetingsStore.changeFallenRelative(value)
                        props.MeetingsStore.search()
                    }}
                changeBackground={true}
            />
            <Select
                default={props.MeetingsStore.language}
                selectTextDefault='שפת המפגש'
                arr={meetingLanguage}
                className='input-meetings filter-meeting'
                onChoseOption={(value) => {
                    props.MeetingsStore.changeMeetingLanguage(value)
                    props.MeetingsStore.search()
                }}
                changeBackground={true}
            />
            <div className='availableOnly'>
                <div
                    style={{ height: '1.5em', width: '1.5em', display: 'flex', marginLeft: '0.3em', cursor: 'pointer' }}
                    onClick={() => {
                        props.MeetingsStore.changeAvailableOnly(!props.MeetingsStore.availableOnly)
                        props.MeetingsStore.search()
                    }}>
                    <img height='100%' width='100%s' src={props.MeetingsStore.availableOnly ? checkboxOn : checkboxOff} />
                </div>
                    הצג מפגשים זמינים בלבד
                    </div>
        </div>

    )
}

export default inject('MeetingsStore','LanguageStore')(observer(Filters));





