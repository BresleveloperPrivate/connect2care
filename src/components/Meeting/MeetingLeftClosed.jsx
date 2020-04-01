import React from 'react';

import { LockOutlined } from "@material-ui/icons";

const MeetingLeftClosed = ({ full }) => (
    <div id="meetingPageLeft">
        <img src="./images/bigOpacityCandle.svg" id="meetingLeftCandle" />
        <div id="meetingLeftTitle"><LockOutlined /> מפגש {full ? 'מלא' : 'סגור'}</div>
        <div id="meetingLeftDescription">מפגש זה {full ? 'מלא' : 'סגור לקבוצה פרטית בלבד'}<br /><br />לא ניתן להצטרף למפגש זה<br /><br /> <strong>מתחברים וזוכרים במבחר מפגשים נוספים{full ? '.' : ' הפתוחים לכולם.'}</strong></div>
    </div>
);

export default MeetingLeftClosed;