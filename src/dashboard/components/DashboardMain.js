import React from 'react'
import TopBarManager from './TopBarManager'
import Filters from './Filters'
import MeetingsList from './MeetingsList'
import '../style/dashboardMain.css'

const DashboardMain = (props) => {

    return (
        <div>
            <TopBarManager />
            <div className="textStyle" style={{ margin:'7vh 8vw 4vh 0', width: 'fit-content', fontSize: "3vh", fontWeight: "bold" }}>מאגר מפגשים</div>
            <Filters />
            <MeetingsList/>
        </div>
    )
}

export default DashboardMain