import React, { useState, useEffect } from 'react';

import { IconButton, ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core';
import { ArrowForward } from "@material-ui/icons";

import Auth from '../../modules/auth/Auth';

import MeetingFallen from './MeetingFallen';
import MeetingBottom from './MeetingBottom';
import MeetingTop from './MeetingTop';
import MeetingLeftOpen from './MeetingLeftOpen';
import MeetingLeftClosed from './MeetingLeftClosed';
import Sharing from '../Sharing';

const useStyles = makeStyles(theme => ({
    arrowButton: {
        color: theme.palette.primary.main,
        outline: "none !important"
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
    const [numOfPeople, setNumOfPeople] = useState(null);
    const [maxNum, setMaxNum] = useState(null);

    useEffect(() => {
        (async () => {
            const [res, error] = await Auth.superAuthFetch(`/api/meetings/GetMeetingInfo/${meetingId}`);
            if (error || res.error) { console.log("woo too bad: ", error); setName(''); setOwner(''); setDescription(''); setIsOpen(null); setDate(''); setTime(''); setFallens([]); setNumOfPeople(null); return; }
            const { name, meetingOwner, description, isOpen, date, time, fallens, participants_num, max_participants } = res;
            setName(name); setOwner(meetingOwner ? meetingOwner.name : ""); setDescription(description); setIsOpen(typeof isOpen === "boolean" ? isOpen : isOpen == 1); setDate(date); setTime(time); setFallens(fallens); setNumOfPeople(participants_num || 0); setMaxNum(max_participants)
        })();
    }, [meetingId]);

    const { arrowButton } = useStyles();

    return (
        <div id="meetingPage">
            <div id="meetingPageMain">
                <div id="meetingMainMain">

                    <div id="meetingButtons">
                        <IconButton className={arrowButton} onClick={goBack}><ArrowForward fontSize="large" /></IconButton>
                        <Sharing styleObject={{ fontSize: '18px', imageHeight: '24px' }} />
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
            {!!name && (isOpen !== null && isOpen !== undefined && isOpen && !(maxNum && numOfPeople && maxNum <= numOfPeople) ? (
                <MeetingLeftOpen setNumOfPeople={setNumOfPeople} meetingId={meetingId} />
            )
                : (
                    <MeetingLeftClosed full={maxNum && numOfPeople && maxNum <= numOfPeople} />
                )
            )}
        </div>
    );
}

const theme = createMuiTheme({ direction: "rtl", palette: { primary: { main: "#082551" }, secondary: { main: "#3586B1" } } });

export default props => (
    <ThemeProvider theme={theme}>
        <Meeting {...props} />
    </ThemeProvider>
);