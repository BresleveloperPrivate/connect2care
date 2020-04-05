import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react';
import TopBarManager from './TopBarManager'
import '../style/dashboardMain.css'
import MeetingDetails from './MeetingDetails';

const MeetingInfo = (props) => {

    useEffect(() => {
    }, [])

    return (
        <div style={{ height: '100vh', overflow: 'auto', width: '100vw', backgroundColor: 'var(--custom-background-light-blue)', paddingBottom: '5vh' }}>
            <TopBarManager />
            <MeetingDetails />
        </div>
    )
}

export default inject('ManagerStore')(observer(MeetingInfo))