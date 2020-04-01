import React from 'react';

const MeetingTop = ({ name, owner, description, date, time }) => (
    <div id="meetingTop">
        {name && name.length !== 0 && <div id="meetingName">{name}</div>}
        {owner && owner.length !== 0 && <div id="meetingOwner">מנחה: {owner}</div>}
        {description && description.length !== 0 && <p id="meetingDescription">{description}</p>}
        {((date && date.length !== 0) || (time && time.length !== 0)) && <div id="meetingDateTime">{`${date}${time && ` | בשעה ${time}`}`}</div>}
    </div>
);

export default MeetingTop;