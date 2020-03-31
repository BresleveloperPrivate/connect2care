import React, { useState } from 'react';

import { useMount } from 'react-use';
import { IconButton, ThemeProvider, createMuiTheme, makeStyles, Button } from '@material-ui/core';
import { ArrowForward, Share } from "@material-ui/icons";

import Auth from '../../modules/auth/Auth';

import MeetingFallen from './MeetingFallen';
import MeetingBottom from './MeetingBottom';
import MeetingTop from './MeetingTop';

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
    const [relationship, setRelationship] = useState('');
    const [language, setLanguage] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [maxParticipants, setMaxParticipants] = useState(30);

    const { arrowButton, shareButton, shareButtonLabel } = useStyles();

    useMount(async () => {
        // const [res, error] = await Auth.superAuthFetch(`/api/meetings/GetMeetingInfo/${meetingId}`);
        // if (error || res.error) { console.log("woo too bad: ", error); return; }
        const res = {
            name: 'מלחמת לבנון השניה',
            owner: 'משה לוי',
            description: 'אנחנו הולכים להיפגש, אבל קצת אחרת. נפגשים בבית, על הספה, לבד אבל ביחד, עם מצלמה דולקת ולב פתוח וחיבוק כל כך חזק שירגישו אותו גם מבעד למסך',
            relationship: '',
            language: 'עברית',
            isOpen: 1,
            date: `יום שני | ג' אייר, 27 באפריל`,
            time: '14:00',
        }
        const { name, owner, description, relationship, language, isOpen, date, time } = res;
        setName(name);
        setOwner(owner);
        setDescription(description);
        setRelationship(relationship);
        setLanguage(language);
        setIsOpen(isOpen);
        setDate(date);
        setTime(time);
    });
    return (
        <div id="meetingPage">
            <div id="meetingPageMain">
                <div id="meetingMainMain">

                    <div id="meetingButtons">
                        <IconButton className={arrowButton} onClick={goBack}><ArrowForward /></IconButton>
                        <Button variant="contained" className={shareButton} classes={{ label: shareButtonLabel }} startIcon={<Share color="primary" />}>הזמינו למפגש</Button>
                    </div>

                    <MeetingTop name={name} owner={owner} description={description} date={date} time={time} />

                    <div id="meetingFallenList">
                        {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, index) => (
                            <MeetingFallen key={index} />
                        ))}
                    </div>
                    
                </div>

                <MeetingBottom numOfPeople={15} />

            </div>
            <div id="meetingPageLeft"></div>
        </div>
    );
}

const theme = createMuiTheme({
    direction: "rtl",
    palette: {
        primary: {
            main: "#082551"
        },
        secondary: {
            main: "#3586B1"
        }
    }
})

export default props => <ThemeProvider theme={theme}><Meeting {...props} /></ThemeProvider>;