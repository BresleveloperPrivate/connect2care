import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { inject, observer } from 'mobx-react';

import { IconButton, ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core';
// import { ArrowForward } from "@material-ui/icons";

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

const Meeting = ({ match: { params }, history: { goBack }, t , LanguageStore }) => {
    const { meetingId } = params;

    const [meeting, setMeeting] = useState({});

    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [description, setDescription] = useState('');
    const [isOpen, setIsOpen] = useState(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [fallens, setFallens] = useState([]);
    const [numOfPeople, setNumOfPeople] = useState(null);
    const [maxNum, setMaxNum] = useState(null);
    const [meetingIdError, setMeetingIdError] = useState(false);

    useEffect(() => {
        (async () => {
            const [res, error] = await Auth.superAuthFetch(`/api/meetings/GetMeetingInfo/${meetingId}`);
            const { name, meetingOwner, description, isOpen, date, time, fallens, participants_num, max_participants } = res;
            setMeeting({ meetingId, ...res }); setName(name); setOwner(meetingOwner ? meetingOwner.name : ""); setDescription(description); setIsOpen(typeof isOpen === "boolean" ? isOpen : isOpen == 1); setDate(date); setTime(time); setFallens(fallens); setNumOfPeople(participants_num || 0); setMaxNum(max_participants); setMeetingIdError(false);
        })();
    }, [meetingId]);

    const { arrowButton } = useStyles();

    if (meetingIdError) return <Redirect to="/not-found" />;

    return (
        <div id="meetingPage">
            <div id="meetingPageMain">
                <div id="meetingMainMain">
                    {isOpen !== null && isOpen !== undefined && isOpen &&<div
                    style={LanguageStore.lang !== 'heb' ? {justifyContent:'flex-start'} : {} }
                    id="meetingButtons">
                        {/* <IconButton className={arrowButton} onClick={goBack}><ArrowForward fontSize="medium" /></IconButton> */}
                        <Sharing myId={'sharingBoxMeeting'}
                            containImageClassName={'containSharingImageMeeting'}
                            styleObject={{ fontSize: '2em', imageHeight: '24px' }}
                            meetingId={meetingId}
                            data={meeting}
                            t={t}
                        />
                    </div>}

                    <MeetingTop t={t} name={name} owner={owner} description={description} date={date} time={time} />

                    {fallens.length !== 0 && (
                        <div id="meetingFallenList">
                            {fallens.map((fallen, index) => (
                                // console.log(fallen)
                                <MeetingFallen key={index} fallen={fallen} />
                            ))}
                        </div>
                    )}

                </div>

                <MeetingBottom numOfPeople={numOfPeople} />

            </div>
            {!!name && (isOpen !== null && isOpen !== undefined && !((maxNum >= 0)  && (numOfPeople > 0 || numOfPeople === 0) && maxNum <= numOfPeople) ? (
                <MeetingLeftOpen sendCode={!isOpen} t={t} mailDetails={{ "date": date, "time": time, "fallens": fallens }} setNumOfPeople={setNumOfPeople} meetingId={meetingId} />
            )
                : (
                    <MeetingLeftClosed t={t} />
                )
            )}
        </div>
    );
}

const theme = createMuiTheme({ direction: "rtl", palette: { primary: { main: "#082551" }, secondary: { main: "#3586B1" } } });

export default inject('LanguageStore')(observer(props => (
    <ThemeProvider theme={theme}>
        <Meeting {...props} />
    </ThemeProvider>
)));
