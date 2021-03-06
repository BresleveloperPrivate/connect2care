import React, { useState } from 'react';
import '../styles/listOfMeetings.css'
import { inject, observer} from 'mobx-react';
import Auth from '../modules/auth/Auth'
import '../styles/animations.scss'

const ListOfMeetingsUser = (props) => {

    const [myMeetings, setMyMeetings] = useState(false)
    const [level, setLevel] = useState(1)
    const [error, setError] = useState(false)

    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')

    return (
        <div className='meetingsFullPage'>
            {!error ?
                <div className={props.LanguageStore.lang !== 'heb' ? 'mainPage-meetings mainPage-meetings-ltr' : 'mainPage-meetings'} style={{ width: '85%' }}>
                    <div className={props.LanguageStore.lang !== 'heb' ? 'meetings-title tal' : 'tar meetings-title'}>המפגשים שלי</div>
                    <div className={props.LanguageStore.lang !== 'heb' ? 'meetings-second-title tal' : 'meetings-second-title tar'} onClick={() => {
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
                                        if(res){
                                            setLevel(2)
                                        }else{
                                            setError('שגיאה יאי')
                                        }
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

                                        setMyMeetings(meetings)

                                    })()
                                }}>התחבר</div>
                        </div>
                    }
                </div>
                :
                'null'
            }
        </div>
    );
}
export default inject('LanguageStore')(observer(ListOfMeetingsUser))
