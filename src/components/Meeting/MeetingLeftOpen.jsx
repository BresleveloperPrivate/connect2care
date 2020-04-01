import React, { useRef, useMemo, useState, useCallback, useEffect } from 'react';

import { createMuiTheme, ThemeProvider, makeStyles, Popover, List, Button, ListItem, ListItemText } from '@material-ui/core';
import { ExpandMore } from "@material-ui/icons";

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

    select: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        "&:hover": {
            cursor: "pointer"
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

const selectOptions = ['אח', 'הורים', 'קרובי משפחה', 'חבר', 'אחר'];

const MeetingLeftOpen = ({ meetingId }) => {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const [selectValue, setSelectValue] = useState(null);
    const selectTarget = useRef();
    const [selectOpen, setSelectOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const { input, select, sendButton, sendLabel } = useStyles();

    useEffect(() => setErrorMsg(null), [selectValue]);

    const onSend = useCallback(async () => {
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const email = emailRef.current.value;
        const phone = phoneRef.current.value;

        if (!!!firstName) { setErrorMsg('אנא מלא/י שם פרטי'); return; }
        if (!!!lastName) { setErrorMsg('אנא מלא/י שם משפחה'); return; }
        if (!!!email) { setErrorMsg('אנא מלא/י דואר אלקטרוני'); return; }
        if (!!!phone) { setErrorMsg('אנא מלא/י מספר טלפון'); return; }
        if (!!!selectValue) { setErrorMsg('אנא מלא/י הקרבה אל הנופל'); return; }

        if (/^(.+)@(.+){2,}\.(.+){2,}$/.test(email)) { setErrorMsg('דואר אלקטרוני אינו תקין'); return; }
        if (isNaN(phone)) { setErrorMsg('מספר הטלפון אינו תקין'); return; }

        let [response, error] = await Auth.superAuthFetch(`/api/meetings/AddPersonToMeeting/${meetingId}`, {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, email, phone, relationship: selectValue })
        });
        if (error || response.error) { console.error('ERR:', error || response.error); return; }

    }, [firstNameRef, lastNameRef, emailRef, phoneRef, selectValue, meetingId]);

    const inputs = useMemo(() => [
        [firstNameRef, 'שם פרטי'],
        [lastNameRef, 'שם משפחה'],
        [emailRef, 'דואר אלקטרוני'],
        [phoneRef, 'טלפון']
    ], [firstNameRef, lastNameRef, emailRef, phoneRef]);

    return (
        <div id="meetingPageLeft">
            <img src="./images/bigOpacityCandle.svg" id="meetingLeftCandle" />
            <div id="meetingLeftTitle">הצטרף למפגש</div>
            <div id="meetingLeftDescription">מלא את הפרטים ואנו נשלח לך קישור ותזכורת</div>

            <form>
                {inputs.map(([ref, placeholder], index) => (
                    <input key={index} ref={ref} placeholder={placeholder} type="text" className={input} onChange={() => setErrorMsg(null)} />
                ))}
                <div ref={selectTarget} className={`${input} ${select}`} onClick={() => setSelectOpen(open => !open)}>
                    <div>{selectValue || 'הקרבה שלי אל הנופל'}</div>
                    <ExpandMore />
                </div>
                <Popover
                    anchorEl={selectTarget.current}
                    open={selectOpen}
                    onClose={() => setSelectOpen(false)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <List>
                        {selectOptions.map(option => (
                            <ListItem key={option} button onClick={() => { setSelectValue(option); setSelectOpen(false); }}>
                                <ListItemText primary={option} />
                            </ListItem>
                        ))}
                    </List>
                </Popover>
            </form>
            {errorMsg && <div id="meetingErrorMsg">{errorMsg}</div>}
            <Button onClick={onSend} variant="contained" classes={{ root: sendButton, label: sendLabel }}>שלח</Button>
        </div>
    );
}

const theme = createMuiTheme({ direction: "rtl", palette: { primary: { main: "rgb(255, 255, 255)" }, secondary: { main: "#082551" } } });

export default props => (
    <ThemeProvider theme={theme}>
        <MeetingLeftOpen {...props} />
    </ThemeProvider>
);