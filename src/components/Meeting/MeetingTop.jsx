import React from 'react';
import { inject, observer } from 'mobx-react';


const MeetingTop = ({ name, owner, description, date, time ,LanguageStore}) => (
    <div style={LanguageStore.lang !== 'heb' ? {alignItems:'flex-end'}:{}} id="meetingTop">
        {name && name.length !== 0 && <div id="meetingName">{name}</div>}
        {owner && owner.length !== 0 && <div id="meetingOwner">מארח/ת: {owner}</div>}
        {description && description.length !== 0 && 
        <p style={LanguageStore.lang !== 'heb' ? {textAlign:'left'}:{textAlign:'right'}} id="meetingDescription">
            {description}</p>
            }
        {((date && date.length !== 0) || (time && time.length !== 0)) && <div id="meetingDateTime">{`${date.split("T")[0]}${date && time && " | "}${time && `בשעה ${time}`}`}</div>}
    </div>
);

export default inject('LanguageStore')(observer(MeetingTop));