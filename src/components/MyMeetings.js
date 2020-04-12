import React, { useState, useEffect, useRef } from 'react';
import '../styles/listOfMeetings.css'
// import { inject, observer, PropTypes } from 'mobx-react';
import lock from '../icons/blue-lock.svg'
import tell from '../icons/tell.svg'
import Auth from '../modules/auth/Auth'
import ImageOfFallen from './ImageOfFallen'
import '../styles/animations.scss'
import candle from '../icons/candle-dark-blue.svg'
import clock from '../icons/clock.svg'
import participants from '../icons/participants.png'
import Dialog from '@material-ui/core/Dialog';
import MeetingCardPhone from './MeetingCardPhone'

const ListOfMeetingsUser = (props) => {

    const [myMeetings, setMyMeetings] = useState(false)
    const [level, setLevel] = useState(1)
    const [error, setError] = useState(false)

    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')

    return (

        <div className='meetingsFullPage'>


            {!error ?
                <div className={localStorage.getItem('lang') !== 'heb' ? 'mainPage-meetings mainPage-meetings-ltr' : 'mainPage-meetings'} style={{ width: '85%' }}>
                    <div className={localStorage.getItem('lang') !== 'heb' ? 'meetings-title tal' : 'tar meetings-title'}>המפגשים שלי</div>
                    <div className={localStorage.getItem('lang') !== 'heb' ? 'meetings-second-title tal' : 'meetings-second-title tar'} onClick={() => {
                    }} >
                        כאן ניתן לערוך ולצפות בפרטי המפגשים אליהם הצטרפת או יצרת
                     </div>

                    {level === 1 ?
                        <div>
                            <input type='text' className='InputConfirmPopup' value={email} placeholder='כתובת הדואר האלקטרוני שלך' onChange={(e) => { setEmail(e.target.value) }} />

                            <div
                                className='BtnsConfirmPopup grow'
                                onClick={() => {
                                    (async () => {
                                        let [res, err] = await Auth.superAuthFetch('/api/Codes/sendCode', {
                                            method: 'POST',
                                            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ email })
                                        })
                                        console.log(res)
                                        if(res){
                                            setLevel(2)
                                        }else{
                                            setError('שגיאה יאי')
                                        }

                                        // console.log(meetings)
                                        // setMyMeetings(meetings)

                                    })()
                                }}>שלחו לי קוד אימות</div>
                        </div>
                        :
                        <div>
                            <input type='text' className='InputConfirmPopup' placeholder='הכנס את קוד האימות שקיבלת באימייל' value={code} onChange={(e) => { setCode(e.target.value) }} />

                            <div
                                className='BtnsConfirmPopup grow'
                                onClick={() => {
                                    (async () => {
                                        let [meetings, err] = await Auth.superAuthFetch('/api/Codes/checkCode', {
                                            method: 'POST',
                                            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ email , code})
                                        })

                                        console.log(meetings)
                                        setMyMeetings(meetings)

                                    })()
                                }}>התחבר</div>
                        </div>

                    }



                    {/* {myMeetings ? myMeetings[option].map((meeting, index) => {
                        return (<MeetingCardPhone key={index} history={props.history} index={index} meeting={meeting} />)
                    }) : null} */}
                </div>
                :
                // <div className='mainPage-meetings'>
                //     <div style={{ paddingTop: '10em', color: 'var(--custom-blue)', fontSize: '2em' }}>
                //         {props.MeetingsStore.error.error.message === "No response, check your network connectivity" ? 'אנא בדוק את חיבור האינטרנט שלך' : ' אירעה שגיאה בהבאת הנתונים'}
                //     </div>
                // </div>
                'null'
            }



        </div>
    );
}
export default ListOfMeetingsUser;
