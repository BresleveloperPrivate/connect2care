import React from 'react';
import { inject, observer } from 'mobx-react';

import { LockOutlined } from "@material-ui/icons";

const MeetingLeftClosed = ({ full, LanguageStore, t }) => (
    <div id="meetingPageLeft" style={{ direction: LanguageStore.lang !== 'heb' ? 'ltr' : 'rtl' }}>
        <div id='meetingPageLeftInside' >
            <img alt="alt" src="./images/bigOpacityCandle.svg" id="meetingLeftCandle" />
                {LanguageStore.lang !== 'heb' ?
                    <div id="meetingLeftTitle">
                        <LockOutlined /><span>The meeting is full</span>
                    </div>
                    :
                    <div id="meetingLeftTitle">
                        <LockOutlined /><span>המפגש מלא</span>
                    </div>}
            <div
                className={LanguageStore.lang !== 'heb' ? 'tal' : 'tar'}
                id="meetingLeftDescription">
                {LanguageStore.lang !== 'heb' ?
                    'This meeting cannot be joined' :
                    'לא ניתן להצטרף למפגש זה'
                }
                <br /><br />
                <strong>{LanguageStore.lang !== 'heb' ?
                    'Connect and remember with a selection of other meetings.' :
                    'מתחברים וזוכרים במבחר מפגשים נוספים.'
                }</strong>
            </div>

        </div>
    </div>
);
export default inject('LanguageStore')(observer(MeetingLeftClosed));
