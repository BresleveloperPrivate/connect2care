import React, { useMemo, useState, useCallback, useRef } from 'react';
import { inject, observer } from 'mobx-react';

import { createMuiTheme, ThemeProvider, makeStyles, Button } from '@material-ui/core';
import { LockOutlined } from "@material-ui/icons";

import Auth from '../../modules/auth/Auth';
import checkboxOnWhite from '../../icons/checkbox_on_light_white.svg'
import checkboxOffWhite from '../../icons/checkbox_off_light_white.svg'

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import tick from '../../icons/tick.svg'

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
    const [openSuccess, setOpenSuccess] = useState(false);

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
            // response.error && setErrorMsg(response.error.msg)
            console.log(error, "error")
            if (error && error.error && error.error.code === "ER_DUP_ENTRY") {
                setErrorMsg(LanguageStore.lang !== 'heb' ? "You cannot join the same session twice." : 'לא ניתן להצטרף לאותו מפגש פעמיים.')
            }
            else if (error && error.error && error.error.email) {
                setErrorMsg(LanguageStore.lang !== 'heb' ? "please make sure that you entered a correct email address." : ".אנא בדוק שהכנסת כתובת אימייל נכונה")
            }
            else if (error && error.error && error.error.name && typeof error.error.name === "object") {
                setErrorMsg(LanguageStore.lang !== 'heb' ? "please make sure that you entered a correct name." : ".אנא בדוק שהכנסת שם נכון")
            }
            else if (error && error.error && error.error.phone) {
                setErrorMsg(LanguageStore.lang !== 'heb' ? "please make sure that you entered a correct phone number." : ".אנא בדוק שהכנסת מספר טלפון נכון")
            }
            else if (error && error.error && error.error.msg) {
                setErrorMsg(error.error.msg)
            }
            else {
                setErrorMsg(LanguageStore.lang !== 'heb' ? "Something went worng, please try again later." : ".משהו השתבש, אנא נסה שנית מאוחר יותר")
            }
            return;
        }

        setErrorMsg(null);
        setName('');
        setEmail('');
        setPhone('');
        setCode('');
        setReadBylaw(false);
        setOpenSuccess(true)

        // alert(LanguageStore.lang !== 'heb' ? 'You have successfully joined this meeting' : 'הצטרפת למפגש בהצלחה');
        setNumOfPeople(response.participantsNum);
    }, [name, email, phone, code, readBylaw, meetingId]);

    const setPhoneValue = (value) => {
        if (value.match(/[^0-9-+]/g) || value.length > 14) {
            return
        }
        setPhone(value)
    }

    const inputs = useMemo(() =>
        sendCode ? [
            [name, setName, LanguageStore.lang !== 'heb' ? 'Full name' : 'שם מלא'],
            [email, setEmail, LanguageStore.lang !== 'heb' ? 'Email' : 'דואר אלקטרוני'],
            [phone, setPhoneValue, LanguageStore.lang !== 'heb' ? 'Phone' : 'טלפון'],
            [code, setCode, LanguageStore.lang !== 'heb' ? 'Code' : 'קוד הצטרפות'],

        ] : [
                [name, setName, LanguageStore.lang !== 'heb' ? 'Full name' : 'שם מלא'],
                [email, setEmail, LanguageStore.lang !== 'heb' ? 'Email' : 'דואר אלקטרוני'],
                [phone, setPhoneValue, LanguageStore.lang !== 'heb' ? 'Phone' : 'טלפון'],

            ], [name, email, phone, code, LanguageStore.lang]);

    return (
        <div id="meetingPageLeft" style={{ direction: LanguageStore.lang !== 'heb' ? 'ltr' : 'rtl' }}>


            <Dialog
                maxWidth='md'
                open={openSuccess}
                onClose={() => { setOpenSuccess(false) }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogContent style={{ direction: LanguageStore.lang !== 'heb' ? 'ltr' : 'rtl', margin: 0 }}
                    className='popupSendEmail'>
                    <DialogContentText id="alert-dialog-description">
                        <div style={{ width: '40px', margin: 'auto' }}>
                            <img src={tick} width='100%' />
                        </div>
                        <div className='containXButton'>
                            <FontAwesomeIcon onClick={() => { setOpenSuccess(false) }} icon={['fas', 'times']} style={{ fontSize: '1rem', cursor: 'pointer' }} />
                        </div>
                        <div style={{ padding: '1vh 4vw 2vh 4vw', fontSize: '1.3em', color: '#2A3474', textAlign: 'center' }} className={LanguageStore.lang !== 'heb' ? 'tal shareEmailTitle2' : 'tar shareEmailTitle2'}>
                            {LanguageStore.lang !== 'heb' ? "You have successfully joined this meeting" : 'הצטרפת למפגש בהצלחה'}
                        </div>
                    </DialogContentText>
                </DialogContent >

            </Dialog>


            <div id='meetingPageLeftInside' >
                <img alt="alt" src="./images/bigOpacityCandle.svg" id="meetingLeftCandle" />
                {sendCode ?
                    LanguageStore.lang !== 'heb' ?
                        <div id="meetingLeftTitle">
                            <LockOutlined /><span>Private Meeting</span>
                        </div>
                        :
                        <div id="meetingLeftTitle">
                            <LockOutlined /><span>מפגש פרטי</span>
                        </div> :

                    <div id="meetingLeftTitle">
                        {LanguageStore.lang !== 'heb' ? <span>Join Meeting</span> : <span>הצטרף למפגש</span>}
                    </div>
                }
                <div id="meetingLeftDescription" className={LanguageStore.lang !== 'heb' ? 'tal' : 'tar'}>
                    {LanguageStore.lang !== 'heb' ?
                        'Fill in the details and we will send you a link and reminder.'
                        : 'מלא את הפרטים ואנו נשלח לך קישור ותזכורת.'
                    }

                </div>

                <div style={{ width: '100%' }}>
                    <form>
                        {inputs.map(([value, setValue, placeholder], index) => (

                            <div key={index}>
                                {index === 3 &&
                                    <div className={LanguageStore.lang !== 'heb' ? 'codeExplanation tal' : 'codeExplanation tar'}>
                                        {LanguageStore.lang !== 'heb' ?
                                            'In order to join a private meeting, you must enter the code you received from the meeting host.'
                                            :
                                            'על מנת להצטרף למפגש פרטי, עליך להזין את קוד ההצטרפות שקיבלת ממארח/ת המפגש.'

                                        }
                                    </div>
                                }
                                <input key={index} value={value} onChange={event => { setValue(event.target.value); setErrorMsg(null); }} placeholder={placeholder} type="text" className={input} />
                            </div>
                        ))}
                        <div className=" d-flex align-items-center" style={{ marginTop: '2vh', color: 'white', fontSize: '1.5em' }}>
                            <div>
                                <img style={{ cursor: 'pointer' }} onClick={() => { setReadBylaw(!readBylaw); setErrorMsg(null); }} src={readBylaw ? checkboxOnWhite : checkboxOffWhite} />

                            </div>
                            {/* <input type="checkbox" id="readBylaw" name="readBylaw" ref={readBylawRef} onChange={() => { setErrorMsg(null); }} /> */}
                            <label htmlFor="readBylaw" className="mb-0" style={{ marginRight: "1vh" }}>
                                {LanguageStore.lang !== 'heb' ?
                                    <div>Iv'e read and accepted the
                                     <a href={`${process.env.REACT_APP_DOMAIN}/terms.pdf`} target="_blank"> terms and conditions </a>.
                                    </div>
                                    :
                                    <div>אני מסכים/ה ל<a href={`${process.env.REACT_APP_DOMAIN}/terms.pdf`} target="_blank">תקנון</a> ולתנאי השימוש באתר.</div>
                                }
                            </label>
                        </div>

                    </form>
                    {errorMsg && <div id="meetingErrorMsg">{errorMsg}</div>}
                    <div className='grow joinBtn' style={{ transition: 'transform 0.5s ease' }} onClick={loading ? () => { } : () => onSend()}>
                        {LanguageStore.lang !== 'heb' ? 'Join' : 'הצטרף'}
                    </div>
                </div>
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