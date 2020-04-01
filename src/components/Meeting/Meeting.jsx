import React, { useState, useEffect } from 'react';

import { IconButton, ThemeProvider, createMuiTheme, makeStyles, Button } from '@material-ui/core';
import { ArrowForward, Share } from "@material-ui/icons";

import Auth from '../../modules/auth/Auth';

import MeetingFallen from './MeetingFallen';
import MeetingBottom from './MeetingBottom';
import MeetingTop from './MeetingTop';
import MeetingLeftOpen from './MeetingLeftOpen';
import MeetingLeftClosed from './MeetingLeftClosed';

const useStyles = makeStyles(theme => ({
    arrowButton: {
        color: theme.palette.primary.main,
        outline: "none !important"
    },

    shareButton: {
        background: '#F5C508',
        borderRadius: '100vh',
        outline: "none !important",

        '&:hover': {
            background: '#d9ae04'
        }
    },

    shareButtonLabel: {
        color: theme.palette.primary.main,
        fontWeight: 'bold'
    }
}));

const Meeting = ({ match: { params }, history: { goBack } }) => {
    const { meetingId } = params;

    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [description, setDescription] = useState('');
    const [isOpen, setIsOpen] = useState(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [fallens, setFallens] = useState([]);
    const [numOfPeople, setNumOfPeople] = useState('');

    useEffect(() => {
        (async () => {
            const [res, error] = await Auth.superAuthFetch(`/api/meetings/GetMeetingInfo/${meetingId}`);
            if (error || res.error) {
                console.log("woo too bad: ", error);
                setName('');
                setOwner('');
                setDescription('');
                setIsOpen(null);
                setDate('');
                setTime('');
                setFallens([]);
                setNumOfPeople('');
                return;
            }
            const { name, meetingOwner, description, isOpen, date, time, fallens, people } = res;
            setName(name);
            setOwner(meetingOwner ? meetingOwner.name : "");
            setDescription(description);
            setIsOpen(typeof isOpen === "boolean" ? isOpen : isOpen == 1);
            setDate(date);
            setTime(time);
            setFallens(fallens);
            setNumOfPeople(people.length)
        })();
    }, [meetingId]);

    const { arrowButton, shareButton, shareButtonLabel } = useStyles();

    return (
        <div id="meetingPage">
            <div id="meetingPageMain">
                <div id="meetingMainMain">

                    <div id="meetingButtons">
                        <IconButton className={arrowButton} onClick={goBack}><ArrowForward /></IconButton>
                        <Button variant="contained" className={shareButton} classes={{ label: shareButtonLabel }} startIcon={<Share color="primary" />}>הזמינו למפגש</Button>
                    </div>

                    <MeetingTop name={name} owner={owner} description={description} date={date} time={time} />

                    {fallens.length !== 0 && (
                        <div id="meetingFallenList">
                            {fallens.map((fallen, index) => (
                                <MeetingFallen key={index} fallen={fallen} />
                            ))}
                        </div>
                    )}

                </div>

                <MeetingBottom numOfPeople={numOfPeople} />

            </div>
            {isOpen !== null && isOpen !== undefined && isOpen ? (
                <MeetingLeftOpen isOpen={isOpen} meetingId={meetingId} />
            )
                : (
                    <MeetingLeftClosed />
                )
            }
        </div>
    );
}

const theme = createMuiTheme({ direction: "rtl", palette: { primary: { main: "#082551" }, secondary: { main: "#3586B1" } } });

export default props => (
    <ThemeProvider theme={theme}>
        <Meeting {...props} />
    </ThemeProvider>
);