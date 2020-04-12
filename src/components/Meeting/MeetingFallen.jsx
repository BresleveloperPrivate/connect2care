import React from 'react';
import { makeStyles, Avatar } from '@material-ui/core';

(async () => {
    const res = await fetch("https://api.zoom.us/v2/users", {
        method: "POST",
        body: JSON.stringify({
            api_key: "xdUTS0PfRniExY5nSVf01w",
            api_secret: "m5R5G0HZBFoJDOgBQ3ieqk48W8XK1QFV0Uw8"
        })
    });
    console.log(res)
})();

const useStyles = makeStyles({
    avatar: {
        height: 167,
        width: 132,
        marginRight: 49
    }
});

const MeetingFallen = ({ fallen: { name, falling_date, image_link } }) => {
    const { avatar } = useStyles();
    return (
        <div className="meetingFallen">
            <Avatar src={image_link || "./images/fallenFallback.jpeg"} className={avatar} variant="rounded" />
            <div className="meetingFallenDescription">
                <img alt="alt" src="./images/lightBlueCandleIcon.svg" className="fallenCandle" />
                <div className="fallenName">{`${name || ''}`}</div>
                <div className="fallenDate">{falling_date.split("T")[0]}</div>
            </div>
        </div>
    );
}

export default MeetingFallen;