import React from 'react';
import { makeStyles, Avatar } from '@material-ui/core';

const useStyles = makeStyles({
    avatar: {
        height: 167,
        width: 132,
        marginRight: 49
    }
});

const MeetingFallen = ({ fallen: { first_name, last_name, falling_date, image_link } }) => {
    const { avatar } = useStyles();
    return (
        <div className="meetingFallen">
            <Avatar src={image_link} className={avatar} variant="square" />
            <div className="meetingFallenDescription">
                <img alt="alt" src="./images/lightBlueCandleIcon.svg" className="fallenCandle" />
                <div className="fallenName">{`${first_name || ''} ${last_name || ''}`}</div>
                <div className="fallenDate">{falling_date}</div>
            </div>
        </div>
    );
}

export default MeetingFallen;