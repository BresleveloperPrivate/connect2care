import React from 'react';

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

const MeetingBottom = ({ numOfPeople }) => {
    const { peopleIcon } = useStyles();
    return (
        <div id="meetingPageBottom">
            <div id="peopleCircle">
                <div id="peopleCircleNum">{numOfPeople}</div>
                <SupervisorAccount className={peopleIcon} />
            </div>
            <div id="peopleCircleText">משתתפים נרשמו למפגש</div>
        </div>
    );
}

export default MeetingBottom;