import React, { useState } from 'react'
import { inject, observer } from 'mobx-react';
import TopBarManager from './TopBarManager'
import '../style/dashboardMain.css'
import MeetingDetails from './MeetingDetails';
import Prticipants from './Participants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MeetingInfo = (props) => {

    const [page, setPage] = useState("MeetingDetails");

    return (
        <div style={{ minHeight: '95vh', overflow: 'auto', width: '100vw', backgroundColor: 'var(--custom-background-light-blue)', paddingBottom: '5vh' }}>
            <TopBarManager />
            <div className="headLine" style={{ marginTop: "6vh", fontSize: '3.5vh' }}>
                <FontAwesomeIcon className='pointer ml-3' icon="arrow-right" color="var(--custom-gray)" onClick={props.history.goBack} /> {props.t("editMeeting")}
            </div>
            <div className='meetingDetailsDash'>
                <div style={{ display: 'flex', color: 'var(--custom-gray)', padding: '1.5vh', borderBottom: '1px solid var(--custom-background-light-blue)', boxShadow: '0px 4px 6px #0000000A' }}>
                    <div style={{ margin: '0 3vw', borderBottom: page === 'MeetingDetails' ? 'var(--custom-orange) 1px solid' : 'unset', cursor: 'pointer' }} onClick={() => { setPage('MeetingDetails') }}>פרטי המפגש</div>
                    <div style={{ borderBottom: page === 'Prticipants' ? 'var(--custom-orange) 1px solid' : 'unset', cursor: 'pointer' }} onClick={() => { setPage('Prticipants') }}>משתתפים</div>
                </div>
                {page === 'MeetingDetails' ?
                    <MeetingDetails t={props.t} history={props.history} /> :
                    <Prticipants t={props.t} history={props.history} />
                }
            </div>
        </div >
    )
}

export default inject('ManagerStore')(observer(MeetingInfo))