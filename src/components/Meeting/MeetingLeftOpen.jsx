import React, { useMemo, useState, useCallback } from 'react';

import { createMuiTheme, ThemeProvider, makeStyles, Button } from '@material-ui/core';

import Auth from '../../modules/auth/Auth';

const useStyles = makeStyles(theme => ({
    input: {
        border: `${theme.palette.primary.main} 2px solid`,
        background: "none",
        outline: "none !important",
        width: '100%',
        color: theme.palette.primary.main,
        marginTop: 20,
        padding: "6.4px 12px",
        borderRadius: 4,

        "&::placeholder": {
            color: theme.palette.primary.main
        }
    },

    sendButton: {
        marginTop: 20,
        borderRadius: "100vh",
        outline: "none !important",
        padding: "6px 20px",
        alignSelf: "flex-end"
    },

    sendLabel: {
        color: theme.palette.secondary.main,
        fontWeight: "bold",
    }
}));

const MeetingLeftOpen = ({ meetingId, setNumOfPeople }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    const { input, sendButton, sendLabel } = useStyles();

    const onSend = useCallback(async () => {
        if (!!!name) { setErrorMsg('אנא מלא/י שם'); return; }
        if (!!!email) { setErrorMsg('אנא מלא/י דואר אלקטרוני'); return; }
        if (!!!phone) { setErrorMsg('אנא מלא/י מספר טלפון'); return; }

        if (!/^['"\u0590-\u05fe\s.-]*$/.test(name)) { setErrorMsg('השם אינו תקין'); return; }
        if (!/^(.+)@(.+){2,}\.(.+){2,}$/.test(email)) { setErrorMsg('הדואר אלקטרוני אינו תקין'); return; }
        if (!/(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{2,4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{2,4})/.test(phone)) { setErrorMsg('מספר הטלפון אינו תקין'); return; }

        setLoading(true);

        const [response, error] = await Auth.superAuthFetch(`/api/meetings/AddPersonToMeeting/${meetingId}`, {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ name, email, phone })
        });

        setLoading(false);

        if (error || response.error) { console.error('ERR:', error || response.error); error && setErrorMsg(error.msg); return; }

        setName('');
        setEmail('');
        setPhone('');
        alert('הוספת למפגש בהצלחה');
        setNumOfPeople(response.participantsNum);
    }, [name, email, phone, meetingId]);

    const inputs = useMemo(() => [
        [name, setName, 'שם'],
        [email, setEmail, 'דואר אלקטרוני'],
        [phone, setPhone, 'טלפון']
    ], [name, email, phone]);

    return (
        <div id="meetingPageLeft">
            <img alt="alt" src="./images/bigOpacityCandle.svg" id="meetingLeftCandle" />
            <div id="meetingLeftTitle">הצטרף למפגש</div>
            <div id="meetingLeftDescription">מלא את הפרטים ואנו נשלח לך קישור ותזכורת</div>

            <form>
                {inputs.map(([value, setValue, placeholder], index) => (
                    <input key={index} value={value} onChange={event => { setValue(event.target.value); setErrorMsg(null); }} placeholder={placeholder} type="text" className={input} />
                ))}
            </form>
            {errorMsg && <div id="meetingErrorMsg">{errorMsg}</div>}
            <Button disabled={loading} onClick={onSend} variant="contained" classes={{ root: sendButton, label: sendLabel }}>שלח</Button>
        </div>
    );
}

const theme = createMuiTheme({ direction: "rtl", palette: { primary: { main: "rgb(255, 255, 255)" }, secondary: { main: "#082551" } } });

export default props => (
    <ThemeProvider theme={theme}>
        <MeetingLeftOpen {...props} />
    </ThemeProvider>
);