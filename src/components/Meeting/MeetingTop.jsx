import React from 'react';

const MeetingTop = ({ name, owner, description, date, time }) => (
    <div id="meetingTop">
        <div id="meetingName">{name}</div>
        <div id="meetingOwner">מנחה: {owner}</div>
        <p id="meetingDescription">{description}</p>
        <div id="meetingDateTime">{`${date} | ${time}`}</div>
    </div>
);

export default MeetingTop;