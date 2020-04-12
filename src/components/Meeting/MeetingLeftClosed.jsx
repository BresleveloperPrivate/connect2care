import React from 'react';
import { inject, observer } from 'mobx-react';

import { LockOutlined } from "@material-ui/icons";

const MeetingLeftClosed = ({ full , LanguageStore }) => (
    <div
    style={LanguageStore.lang !== 'heb' ? {alignItems : 'flex-end'} : {}}
    id="meetingPageLeft">
        <img alt="alt" src="./images/bigOpacityCandle.svg" id="meetingLeftCandle" />
        <div id="meetingLeftTitle"><LockOutlined /> מפגש {full ? 'מלא' : 'סגור'}</div>
        <div 
        className={LanguageStore.lang !== 'heb' ? 'tal' : 'tar'}
        id="meetingLeftDescription">מפגש זה {full ? 'מלא' : 'סגור לקבוצה פרטית בלבד'}<br /><br />לא ניתן להצטרף למפגש זה<br /><br /> <strong>מתחברים וזוכרים במבחר מפגשים נוספים{full ? '.' : ' הפתוחים לכולם.'}</strong></div>
    </div>
);
export default inject('LanguageStore')(observer(MeetingLeftClosed));
