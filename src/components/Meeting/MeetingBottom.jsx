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

const MeetingBottom = ({ numOfPeople , LanguageStore , maxNum }) => {
    const { peopleIcon } = useStyles();
    return (
        <div id="meetingPageBottom" style={{ direction: LanguageStore.lang !== 'heb' ? 'ltr' : 'rtl' }}>
            <div id="peopleCircle">
                <div id="peopleCircleNum">{numOfPeople !== null ? numOfPeople : maxNum}</div>
                <SupervisorAccount className={peopleIcon} />
            </div>
            <div id="peopleCircleText">

                {numOfPeople === null ?
                 LanguageStore.lang !== 'heb' ?
                 'Maximum number of participants' : 'מספר המשתתפים המקסימלי'
                 :
                LanguageStore.lang !== 'heb' ?
                    `Participants signed up for the meet-up out of ${maxNum}` : `משתתפים נרשמו למפגש מתוך ${maxNum}`
                }
            </div>
        </div>
    );
}
export default inject('LanguageStore')(observer(MeetingBottom))
