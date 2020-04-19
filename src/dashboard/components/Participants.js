import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react';
import '../style/dashboardMain.css'
import MeetingDetails from './MeetingDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Auth from '../../modules/auth/Auth'

const Participants = (props) => {

    const [participants, setParticipants] = useState(null)

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
                console.log(success)
                setParticipants(success)
            }
        })()
    }, [])

    return (
        <div>
            {participants && participants.length === 0 ?
                <div className='headLine noRes' style={{ margin: 0, padding: 0, paddingBottom: '5vh' }}>עדיין לא נרשמו אנשים למפגש</div> :
                <div></div>
            }
        </div>
    )
}

export default inject('CreateMeetingStore')(observer(Participants))