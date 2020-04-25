import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react';
import TopBarManager from './TopBarManager'
import Filters from './Filters'
import MeetingsList from './MeetingsList'
import '../style/dashboardMain.css'
import Select from '../../components/Select'

const DashboardMain = (props) => {

    const [isSaved, setIsSaved] = useState(false)
    const [date, setDate] = useState('')
    const [timeHour, setTimeHour] = useState('')
    const [timeMinute, setTimeMinute] = useState('')

    const meetingTimeHour = [
        { option: '08', data: '08' },
        { option: '09', data: '09' },
        { option: '10', data: '10' },
        { option: '11', data: '11' },
        { option: '12', data: '12' },
        { option: '13', data: '13' },
        { option: '14', data: '14' },
        { option: '15', data: '15' },
        { option: '16', data: '16' },
        { option: '17', data: '17' },
        { option: '18', data: '18' },
        { option: '19', data: '19' },
        { option: '20', data: '20' },
        { option: '21', data: '21' },
        { option: '22', data: '22' },
        { option: '23', data: '23' },
        { option: '00', data: '00' },
    ]
    const meetingTimeMinute = [
        { option: '00', data: '00' },
        { option: '30', data: '30' }
    ]
    const meetingDate = [
        { option: props.t('sunday'), data: 'יום ראשון, ב באייר, 26.04' },
        { option: props.t('monday'), data: 'יום שני, ג באייר, 27.04' },
        { option: props.t('tuesday'), data: 'יום שלישי, ד באייר, 28.04' },
        { option: props.t('wednesday'), data: 'יום רביעי, ה באייר, 29.04' },
    ]

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
            <div>
                <div>
                    <div className="containDateAndTime">
                        <div className='containDateInput position-relative'>
                            {date && <div className="textAboveInput">{props.t("date")}</div>}
                            <Select
                                selectTextDefault={date !== '' && props.t("meetingIsClosed")}
                                arr={meetingDate}
                                width='100%'
                                className={'inputStyle p-0 ' + (isSaved && date === '' ? "error" : "")}
                                onChoseOption={(value) => { setDate(value.data) }} />
                        </div>
                    </div>

                    <div className='containSelectTime position-relative'>
                        <div className="textAboveInput">שעה (שעון ישראל):</div>
                        <Select
                            selectTextDefault={timeMinute !== '' ? timeMinute : "דקות"}
                            arr={meetingTimeMinute}
                            width='100%'
                            className={'inputStyle p-0 ' + ((isSaved && timeHour === '') ? "error" : "")}
                            onChoseOption={(value) => { setTimeMinute(value.data) }} />

                        <div className="timeDot">:</div>
                        <Select
                            selectTextDefault={timeHour !== "" ? timeHour : "שעות"}
                            arr={meetingTimeHour}
                            width='100%'
                            // selectedText={props.CreateMeetingStore.meetingDetails.date}
                            className={'inputStyle p-0 ' + (isSaved && timeMinute === '') ? "error" : "")}
                            onChoseOption={(value) => { props.CreateMeetingStore.changeMeetingTimeHour(value.data) }} />
                    </div>
                </div>
            </div>
            <div className="textStyle" style={{ margin: '4vh 15vw 2.5vh 0px', width: 'fit-content', fontSize: "3vh", fontWeight: "bold" }}>מאגר מפגשים</div>
            <div style={{ color: 'var(--custom-gray)', padding: '0 11vw', textAlign: 'right' }}>תוצאות: {props.ManagerStore.meetingsNum}</div>
            <MeetingsList t={props.t} history={props.history} />
        </div>
    )
}

export default inject('ManagerStore')(observer(DashboardMain))