import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react';
import '../style/dashboardMain.css'
import '../style/meetingInfo.scss'
import Auth from '../../modules/auth/Auth'
import DeletePersonPopup from './DeletePersonPopup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import panelBtn from '../../icons/Asset 7@3x11@2x.png'

const Participants = (props) => {

    const [participants, setParticipants] = useState(null)
    const [showDeletePersonPopup, setShowDeletePersonPopup] = useState(false)
    const [participantId, setParticipantId] = useState(null)
    const [maxPaticipants, setMaxParticipants] = useState(null)

    useEffect(() => {
        (async () => {
            let path = props.history.location.pathname.split("/")
            let meetingId = path[path.length - 1]
            props.CreateMeetingStore.setMeetingId(meetingId)
            let [success, err] = await Auth.superAuthFetch(
                `/api/meetings/getParticipants`,
                {
                    method: 'POST',
                    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: Number(props.CreateMeetingStore.meetingId) })
                }, true);
            if (err) {
                console.log(err)
                // this.setError = 'משהו השתבש, נסה שנית מאוחר יותר'
            }
            if (success) {
                setMaxParticipants(success.pop())
                setParticipants(success)
            }
        })()
    }, [])

    const spliceFromArr = (id) => {
        let index = participants.findIndex(e => {
            return e.id === id;
        });
        let par = JSON.parse(JSON.stringify(participants))
        par.splice(index, 1)
        setParticipants(par)
    }

    return (
        <div>
            {!participants ?
                <div className='headLine noRes' style={{ margin: 0 }}>
                    <div className="spinner-border" role="status">
                        <span className="sr-only">טוען...</span>
                    </div>
                </div> :

                participants.length === 0 ?
                    <div className='headLine noRes' style={{ margin: 0, padding: '5vh 0' }}>עדיין לא נרשמו אנשים למפגש</div> :
                    <div>
                        <table className="allTableStyle" style={{ margin: 0, borderRadius: '0 0 7px 7px' }}>
                            <tbody>
                                <tr className="tableHead">
                                    <th>שם</th>
                                    <th>דואר אלקטרוני</th>
                                    <th>טלפון</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                {participants.map((participant, index) =>
                                    (<tr key={index} className="tableBodyStyle">
                                        <td className='name position-relative'>
                                            <div className='position-absolute'>
                                                <div style={{ marginRight: '1.5vw', marginLeft: '2vw', width: '2.5vh', fontSize: '2vh' }} className='trash' onClick={() => {
                                                    setShowDeletePersonPopup(true)
                                                    setParticipantId(participant.id)
                                                }}>
                                                    <FontAwesomeIcon icon={['fas', 'trash']} />
                                                    <div className='trashText' style={{ right: '-27px' }}>מחק משתתף</div>
                                                </div>
                                            </div>
                                            {participant.name}
                                        </td>
                                        <td className='email'>{participant.email}</td>
                                        <td className='phone'>{participant.phone}</td>

                                        < td className='edit' >
                                            <div>
                                                <div className={participant.isPanelist ? 'panelistContain' : 'panelContain'} onClick={()=>{}} >
                                                    <div
                                                        className='panelBtn'
                                                        style={{
                                                            width: "20px",
                                                            height: "34px",
                                                            WebkitMaskSize: "20px 34px",
                                                            WebkitMaskImage: `Url(${panelBtn})`
                                                        }}>
                                                    </div>
                                                    {!participant.isPanelist && <div className='panelText position-absolute'>הגדר כפאנליסט</div>}
                                                </div>
                                            </div>
                                        </td>
                                        <td></td>
                                    </tr>)
                                )}
                            </tbody>
                        </table>
                        {participants && maxPaticipants && <div style={{ position: 'absolute', color: 'var(--custom-gray)', left: '10vw', paddingTop: '1vh' }}>מספר המשתתפים: {maxPaticipants} / {participants.length}</div>}
                    </div>
            }
            {showDeletePersonPopup && <DeletePersonPopup handleClose={() => setShowDeletePersonPopup(false)} meetingId={props.CreateMeetingStore.meetingId} participantId={participantId} spliceFromArr={spliceFromArr} />}
        </div >
    )
}

export default inject('CreateMeetingStore')(observer(Participants))