import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react';
import TopBarManager from './TopBarManager'
import '../style/dashboardMain.css'
import MeetingDetails from './MeetingDetails';
import Prticipants from './Participants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MeetingInfo = (props) => {

    const [page, setPage] = useState("Prticipants");

    // useEffect(() => {
    // }, [])

    return (
        <div style={{ height: '100vh', overflow: 'auto', width: '100vw', backgroundColor: 'var(--custom-background-light-blue)', paddingBottom: '5vh' }}>
            <TopBarManager />
            <div className="headLine" style={{ marginTop: "6vh", fontSize: '3.5vh' }}>
                <FontAwesomeIcon className='pointer ml-3' icon="arrow-right" color="var(--custom-gray)" onClick={props.history.goBack} /> {props.t("editMeeting")}
            </div>
            <div className='meetingDetailsDash'>
                {/* כפתורים שמשנים את העמוד לפרטי המפגש או למשתתפים */}
                <div>
                    <div onClick={()=>{setPage('MeetingDetails')}}>פרטי המפגש</div>
                    <div onClick={()=>{setPage('Prticipants')}}>רשימת הנרשמים</div>
                </div>
                {page === 'MeetingDetails' ?
                    <MeetingDetails t={props.t} history={props.history} /> :
                    <Prticipants t={props.t} history={props.history} />
                }
            </div>
        </div>
    )
}

export default inject('ManagerStore')(observer(MeetingInfo))