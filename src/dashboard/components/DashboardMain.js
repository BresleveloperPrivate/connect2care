import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react';
import TopBarManager from './TopBarManager'
import Filters from './Filters'
import MeetingsList from './MeetingsList'
import '../style/dashboardMain.css'

const DashboardMain = (props) => {

    useEffect(() => {
        (async () => {
            await props.ManagerStore.fetchMeetingsDashboard()
        })()
    }, [])

    return (
        <div style={{ height: '100vh', overflow: 'auto', width: '100vw', backgroundColor: 'var(--custom-background-light-blue)', paddingBottom: '5vh' }}>
            <TopBarManager />
            <div className="textStyle" style={{ margin: '7vh 10vw 4vh 0', width: 'fit-content', fontSize: "3vh", fontWeight: "bold" }}>מאגר מפגשים</div>
            <Filters />
            <MeetingsList />
        </div>
    )
}

export default inject('ManagerStore')(observer(DashboardMain))