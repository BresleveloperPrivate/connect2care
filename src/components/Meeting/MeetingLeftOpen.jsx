import React, { useMemo, useState, useCallback, useRef } from 'react';
import { inject, observer } from 'mobx-react';

import { createMuiTheme, ThemeProvider, makeStyles, Button } from '@material-ui/core';
import { LockOutlined } from "@material-ui/icons";

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

const MeetingLeftOpen = ({ meetingId, setNumOfPeople, sendCode, t, mailDetails, LanguageStore }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);
    const [readBylaw, setReadBylaw] = useState(false)
    // const readBylawRef = useRef();



    const { input, sendButton, sendLabel } = useStyles();

    const onSend = useCallback(async () => {
        if (!!!name) { setErrorMsg('אנא מלא/י שם'); return; }
        if (!!!email) { setErrorMsg('אנא מלא/י דואר אלקטרוני'); return; }
        if (!!!phone) { setErrorMsg('אנא מלא/י מספר טלפון'); return; }
        if (sendCode && !!!code) { setErrorMsg('אנא מלא/י קוד הצטרפות '); return; }
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
        }
        mailDetails.fallensText = text;

        const [response, error] = await Auth.superAuthFetch(`/api/meetings/AddPersonToMeeting/${meetingId}`, {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ name, email, phone, myCode: code, mailDetails })
        });

        setLoading(false);

        if (error || response.error) {
            console.error('ERR:', error || response.error); error && setErrorMsg(error.error.msg);
            console.log(error)
            if (error && error.error && error.error.code === "ER_DUP_ENTRY") {
                setErrorMsg('לא ניתן להצטרף לאותו מפגש פעמיים.')
            }
            return;
        }

        setErrorMsg(null);
        setName('');
        setEmail('');
        setPhone('');
        setCode('');
        setReadBylaw(false);
        alert('הצטרפת למפגש בהצלחה');
        setNumOfPeople(response.participantsNum);
    }, [name, email, phone, code, readBylaw, meetingId]);

    const inputs = useMemo(() =>
        sendCode ? [
            [name, setName, LanguageStore.lang !== 'heb' ? 'Full name' : 'שם מלא'],
            [email, setEmail, LanguageStore.lang !== 'heb' ? 'Email' : 'דואר אלקטרוני'],
            [phone, setPhone, LanguageStore.lang !== 'heb' ? 'Phone' : 'טלפון'],
            [code, setCode, LanguageStore.lang !== 'heb' ? 'Code' : 'קוד הצטרפות'],

        ] : [
                [name, setName, LanguageStore.lang !== 'heb' ? 'Full name' : 'שם מלא'],
                [email, setEmail, LanguageStore.lang !== 'heb' ? 'Email' : 'דואר אלקטרוני'],
                [phone, setPhone, LanguageStore.lang !== 'heb' ? 'Phone' : 'טלפון'],

            ], [name, email, phone, code, LanguageStore.lang]);

    return (
        <div id="meetingPageLeft">
            <img alt="alt" src="./images/bigOpacityCandle.svg" id="meetingLeftCandle" />
            {/* <div> */}
                {sendCode ?
                    LanguageStore.lang !== 'heb' ?
                        <div id="meetingLeftTitle" style={{direction:'ltr'}}>
                             <LockOutlined /><span>Private Meeting</span> 
                        </div>
                        :
                        <div id="meetingLeftTitle">
                            <LockOutlined /><span>מפגש פרטי</span>  
                        </div>:
                    
            <div id="meetingLeftTitle">
                {LanguageStore.lang !== 'heb' ? <span>Join Meeting</span> : <span>הצטרף למפגש</span>}
            </div>
            }
        {/* </div> */}
            {/* <div id="meetingLeftTitle">{sendCode ? LanguageStore.lang !== 'heb' ? <span>Private Meeting</span> : <span>מפגש פרטי</span> <LockOutlined /> : LanguageStore.lang !== 'heb' ? 'Join Meeting' : 'הצטרף למפגש'}</div> */ }
    <div id="meetingLeftDescription">
        מלא את הפרטים ואנו נשלח לך קישור ותזכורת.
            {sendCode ? <div>על מנת להצטרף למפגש פרטי,
                עליך להזין את קוד ההצטרפות שקיבלת ממארח המפגש.</div> : ''}
    </div>

        <div>
            <form>
                {inputs.map(([value, setValue, placeholder], index) => (
                    <input key={index} value={value} onChange={event => { setValue(event.target.value); setErrorMsg(null); }} placeholder={placeholder} type="text" className={input} />
                ))}
                <div className=" d-flex align-items-center" style={{ marginTop: '2vh', color: 'white', fontSize: '2.2vh' }}>
                    <div>
                        <img style={{ cursor: 'pointer' }} onClick={() => { setReadBylaw(!readBylaw); setErrorMsg(null); }} src={readBylaw ? checkboxOnWhite : checkboxOffWhite} />

                    </div>
                    {/* <input type="checkbox" id="readBylaw" name="readBylaw" ref={readBylawRef} onChange={() => { setErrorMsg(null); }} /> */}
                    <label htmlFor="readBylaw" className="mb-0" style={{ marginRight: "1vh" }}>אני מסכים/ה ל<a href={`${process.env.REACT_APP_DOMAIN}/terms.pdf`} target="_blank">תקנון</a> ולתנאי השימוש באתר.</label>
                </div>

            </form>
            {errorMsg && <div id="meetingErrorMsg">{errorMsg}</div>}
            <Button className='grow' disabled={loading} style={{ transition: 'transform 0.5s ease' }} onClick={onSend} variant="contained" classes={{ root: sendButton, label: sendLabel }}>


                {LanguageStore.lang !== 'heb' ? 'Join' : 'הצטרף'}
            </Button>
        </div>

        </div >
    );
}

const theme = createMuiTheme({ direction: "rtl", palette: { primary: { main: "rgb(255, 255, 255)" }, secondary: { main: "#082551" } } });

export default inject('LanguageStore')(observer(props => (
    <ThemeProvider theme={theme}>
        <MeetingLeftOpen {...props} />
    </ThemeProvider>
)));