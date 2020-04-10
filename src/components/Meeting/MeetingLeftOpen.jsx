import React, { useMemo, useState, useCallback, useRef } from 'react';

import { createMuiTheme, ThemeProvider, makeStyles, Button } from '@material-ui/core';

import Auth from '../../modules/auth/Auth';
import checkboxOnWhite from '../../icons/checkbox_on_light_white.svg'
import checkboxOffWhite from '../../icons/checkbox_off_light_white.svg'

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
        fontSize: '2em',

        "&::placeholder": {
            color: theme.palette.primary.main
        }
    },

    sendButton: {
        marginTop: 20,
        borderRadius: "100vh",
        outline: "none !important",
        padding: "6px 20px",
        alignSelf: "flex-end",
        fontSize: '1.5em'
    },

    sendLabel: {
        color: theme.palette.secondary.main,
        fontWeight: "bold",
    }
}));

let v = false;

const MeetingLeftOpen = ({ meetingId, setNumOfPeople, available, props, t, mailDetails }) => {
    // console.log("mailDetails", mailDetails)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);
    const [readBylaw, setReadBylaw] = useState(false)
    // const readBylawRef = useRef();



    const { input, sendButton, sendLabel } = useStyles();

    const onSend = useCallback(async () => {
        console.log("v", readBylaw)
        if (!!!name) { setErrorMsg('אנא מלא/י שם'); return; }
        if (!!!email) { setErrorMsg('אנא מלא/י דואר אלקטרוני'); return; }
        if (!!!phone) { setErrorMsg('אנא מלא/י מספר טלפון'); return; }
        if (!readBylaw) { setErrorMsg('עליך לקרוא את התקנון לפני הצטרפות למפגש'); return }

        // if (!/^['"\u0590-\u05fe\s.-]*$/.test(name)) { setErrorMsg('השם אינו תקין'); return; }
        if (!(/^(.+)@(.+){2,}\.(.+){2,}$/).test(email)) { setErrorMsg('הדואר אלקטרוני אינו תקין'); return; }
        if (!(/(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{2,4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{2,4})/).test(phone)) { setErrorMsg('מספר הטלפון אינו תקין'); return; }

        setLoading(true);

        let text = null;
        if (mailDetails.fallens && typeof mailDetails.fallens !== "string") {
            if (mailDetails.fallens.length === 1)
                text = ` לזכרו של ${mailDetails.fallens[0].name} ז"ל`
            else {
                text = `לזכרם של `;
                mailDetails.fallens.map((x, index) => {
                    if (index === 0) {
                        text = text + `${x.name}`
                    }
                    else {
                        if (index === mailDetails.fallens.length - 1) {
                            text = text + ` ו${x.name}`
                        }
                        else {
                            text = text + `, ${x.name}`
                        }
                    }
                })
            }
            mailDetails.fallens = text;
        }
        console.log("text", text)



        console.log("text", mailDetails)
        const [response, error] = await Auth.superAuthFetch(`/api/meetings/AddPersonToMeeting/${meetingId}`, {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ name, email, phone, mailDetails })
        });

        setLoading(false);
        if (error && error.code === "ER_DUP_ENTRY") { setErrorMsg('לא ניתן להצטרף לאותו מפגש פעמיים.'); return; }
        if (error || response.error) { console.error('ERR:', error || response.error); error && setErrorMsg(error.msg); return; }

        setErrorMsg(null);
        setName('');
        setEmail('');
        setPhone('');
        setReadBylaw(false);
        alert('הצטרפת למפגש בהצלחה');
        setNumOfPeople(response.participantsNum);
    }, [name, email, phone, meetingId, readBylaw]);

    const inputs = useMemo(() => [
        [name, setName, 'שם'],
        [email, setEmail, t("email")],
        [phone, setPhone, t("phone")],

    ], [name, email, phone]);

    return (
        <div id="meetingPageLeft">
            <img alt="alt" src="./images/bigOpacityCandle.svg" id="meetingLeftCandle" />
            <div id="meetingLeftTitle">{available ? 'הצטרף למפגש' : 'לא ניתן להצטרף למפגש'}</div>
            <div id="meetingLeftDescription">{available ? 'מלא את הפרטים ואנו נשלח לך קישור ותזכורת' : 'אין עוד מקומות פנויים במפגש זה'}</div>

            {available &&
                <div>
                    <form>
                        {inputs.map(([value, setValue, placeholder], index) => (
                            <input key={index} value={value} onChange={event => { setValue(event.target.value); setErrorMsg(null); }} placeholder={placeholder} type="text" className={input} />
                        ))}
                        <div className="margin-right-text d-flex align-items-center" style={{ marginTop: '2vh', color: 'white', fontSize: '2.2vh' }}>
                            <div>
                                <img style={{ cursor: 'pointzer' }} onClick={() => { setReadBylaw(!readBylaw); }} src={readBylaw ? checkboxOnWhite : checkboxOffWhite} />

                            </div>
                            {/* <input type="checkbox" id="readBylaw" name="readBylaw" ref={readBylawRef} onChange={() => { setErrorMsg(null); }} /> */}
                            <label htmlFor="readBylaw" className="mb-0" style={{ marginRight: "1vh" }}>קראתי את <a href={`${process.env.REACT_APP_DOMAIN}/terms.pdf`} target="_blank">התקנון</a> ואני מסכים/ה לתנאי השימוש</label>
                        </div>

                    </form>
                    {errorMsg && <div id="meetingErrorMsg">{errorMsg}</div>}
                    <Button className='grow' disabled={loading} style={{ transition: 'transform 0.5s ease' }} onClick={onSend} variant="contained" classes={{ root: sendButton, label: sendLabel }}>שלח</Button>
                </div>
            }
        </div>
    );
}

const theme = createMuiTheme({ direction: "rtl", palette: { primary: { main: "rgb(255, 255, 255)" }, secondary: { main: "#082551" } } });

export default props => (
    <ThemeProvider theme={theme}>
        <MeetingLeftOpen {...props} />
    </ThemeProvider>
);