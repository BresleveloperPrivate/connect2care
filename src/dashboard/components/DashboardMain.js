import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react';
import TopBarManager from './TopBarManager'
import Filters from './Filters'
import MeetingsList from './MeetingsList'
import '../style/dashboardMain.css'

const DashboardMain = (props) => {

    useEffect(() => {
        (async () => {
            props.ManagerStore.setPage(1)
            props.ManagerStore.setReadMore(false)
            await props.ManagerStore.fetchMeetingsDashboard()
        })()
    }, [])

    return (
        <div style={{ minHeight: '100vh', width: '100vw', backgroundColor: 'var(--custom-background-light-blue)', paddingBottom: '10vh' }}>
            <TopBarManager />
            <Filters t={props.t} />
            <div className="textStyle" style={{ margin: '4vh 15vw 2.5vh 0px', width: 'fit-content', fontSize: "3vh", fontWeight: "bold" }}>מאגר מפגשים</div>
            <div style={{ color: 'var(--custom-gray)', padding: '0 11vw', textAlign: 'right' }}>תוצאות: {props.ManagerStore.meetingsNum}</div>
            <MeetingsList t={props.t} history={props.history} />
        </div>
    )
}

export default inject('ManagerStore')(observer(DashboardMain))