import React from 'react';
import { inject, observer } from 'mobx-react';
import { SupervisorAccount } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    peopleIcon: {
        color: "rgba(255, 255, 255, 0.8)",
        position: "absolute",
        fontSize: 40,
        bottom: -9
    }
});

const MeetingBottom = ({ numOfPeople , LanguageStore }) => {
    const { peopleIcon } = useStyles();
    return (
        <div id="meetingPageBottom" style={{ direction: LanguageStore.lang !== 'heb' ? 'ltr' : 'rtl' }}>
            <div id="peopleCircle">
                <div id="peopleCircleNum">{numOfPeople}</div>
                <SupervisorAccount className={peopleIcon} />
            </div>
            <div id="peopleCircleText">

                {LanguageStore.lang !== 'heb' ?
                    'participants signed up for the meeting' : 'משתתפים נרשמו למפגש'
                }
            </div>
        </div>
    );
}
export default inject('LanguageStore')(observer(MeetingBottom))
