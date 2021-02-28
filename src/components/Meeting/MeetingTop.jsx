import React from 'react';
import { meetingDate } from '../../consts/Meetings.consts';
import { inject, observer } from 'mobx-react';



const MeetingTop = ({ name, owner, description, date, time ,LanguageStore , t}) => {
    return(
    <div style={LanguageStore.lang !== 'heb' ? {alignItems:'flex-end'}:{}} id="meetingTop">
        {name && name.length !== 0 && <div id="meetingName">{name}</div>}
        {owner && owner.length !== 0 && <div style={{direction: LanguageStore.lang !== 'heb' ? 'ltr' : 'rtl'}} id="meetingOwner"> {LanguageStore.lang !== 'heb' ? 'Host' : 'מארח/ת'}: {owner}</div>}
        {description && description.length !== 0 && 
        <p style={LanguageStore.lang !== 'heb' ? {textAlign:'left'}:{textAlign:'right'}} id="meetingDescription">
            {description}</p>
            }
        {((date && date.length !== 0) || (time && time.length !== 0)) && <div id="meetingDateTime">

            {t(meetingDate({t}).find(val=> val.data === date)?.option)} | {LanguageStore.lang !== 'heb' ? 'At' : 'בשעה'} {time}
            
            </div>}
    </div>
)};

export default inject('LanguageStore')(observer(MeetingTop));