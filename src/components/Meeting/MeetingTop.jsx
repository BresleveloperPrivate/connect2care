import React from 'react';
import { inject, observer } from 'mobx-react';



const MeetingTop = ({ name, owner, description, date, time ,LanguageStore , t}) => {
    const meetingDate = [
        { option: t('all'), data: false },
        { option: t('sunday'), data: 'יום ראשון, ב באייר, 26.04' },
        { option: t('monday'), data: 'יום שני, ג באייר, 27.04' },
        { option: t('tuesday'), data: 'יום שלישי, ד באייר, 28.04' },
        { option: t('wednesday'), data: 'יום רביעי, ה באייר, 29.04' },
    ]
    
    return(
    <div style={LanguageStore.lang !== 'heb' ? {alignItems:'flex-end'}:{}} id="meetingTop">
        {name && name.length !== 0 && <div id="meetingName">{name}</div>}
        {owner && owner.length !== 0 && <div style={{direction: LanguageStore.lang !== 'heb' ? 'ltr' : 'rtl'}} id="meetingOwner"> {LanguageStore.lang !== 'heb' ? 'Host' : 'מארח/ת'}: {owner}</div>}
        {description && description.length !== 0 && 
        <p style={LanguageStore.lang !== 'heb' ? {textAlign:'left'}:{textAlign:'right'}} id="meetingDescription">
            {description}</p>
            }
        {((date && date.length !== 0) || (time && time.length !== 0)) && <div id="meetingDateTime">

            {t(meetingDate.find(val=> val.data === date).option)} | {LanguageStore.lang !== 'heb' ? 'At' : 'בשעה'} {time}
            
            </div>}
    </div>
)};

export default inject('LanguageStore')(observer(MeetingTop));