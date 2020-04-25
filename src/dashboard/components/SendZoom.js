import React, { useState } from 'react'
import Select from '../../components/Select'
import Auth from '../../modules/auth/Auth'

const SendZoom = (props) => {

    const [isSaved, setIsSaved] = useState(false)
    const [date, setDate] = useState('')
    const [timeHour, setTimeHour] = useState('')
    const [timeMinute, setTimeMinute] = useState('')
    const [recipient, setRecipient ]

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

    const recipients = [
        { data: 'מארח' },
        { data: 'משתתפים' }
    ]

    const onClickBtn = async () => {
        setIsSaved(true)
        if (date === '' || timeHour === '' || timeMinute === '') return
        let time = timeHour + ':' + timeMinute
        console.log(date, time)
        let [success, err] = await Auth.superAuthFetch(
            `/api/meetings/sendMailHost`,
            {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ time: time, date: date })
            }, true);
        console.log("success", success)
        // setWaitForData(false)
        if (err) {
            // setErr(true)
            return
        }

    }

    return (
        <div className='filters' style={{ padding: '5vh 3vw' }}>
            <div className="containDateAndTime" style={{ width: '100%', marginRight: '0' }}>
                <div className='containDateInput position-relative' style={{ width: '35%', borderRadius: '5px', border: (isSaved && date === '' ? "2px solid #EC5A5A" : "unser") }}>
                    <div className="textAboveInput">{props.t("date")}</div>
                    <Select
                        backgroundColor='var(--custom-background-light-blue)'
                        className='selectBorder'
                        color='#A5A4BF'
                        selectTextDefault={date !== '' && props.t("meetingIsClosed")}
                        arr={meetingDate}
                        width='100%'
                        onChoseOption={(value) => { setDate(value.data) }} />
                </div>

                <div className='containSelectTime position-relative' style={{ marginRight: 0 }}>
                    <div className="textAboveInput">שעה (שעון ישראל):</div>
                    <div style={{ width: '36%', borderRadius: '5px', border: (isSaved && timeMinute === '' ? "2px solid #EC5A5A" : "unser") }}>
                        <div style={{ padding: '0 10px', backgroundColor: 'var(--custom-background-light-blue)', borderRadius: '5px' }}>
                            <Select
                                backgroundColor='var(--custom-background-light-blue)'
                                className='selectBorder'
                                color='#A5A4BF'
                                selectTextDefault={timeMinute !== '' ? timeMinute : "דקות"}
                                arr={meetingTimeMinute}
                                width='100%'
                                onChoseOption={(value) => { setTimeMinute(value.data) }} />
                        </div>
                    </div>

                    <div className="timeDot" style={{ marginBottom: 0 }}>:</div>
                    <div style={{ width: '36%', borderRadius: '5px', border: (isSaved && timeMinute === '' ? "2px solid #EC5A5A" : "unser") }}>
                        <div style={{ padding: '0 10px', backgroundColor: 'var(--custom-background-light-blue)', borderRadius: '5px' }}>
                            <Select
                                backgroundColor='var(--custom-background-light-blue)'
                                className='selectBorder'
                                color='#A5A4BF'
                                selectTextDefault={timeHour !== "" ? timeHour : "שעות"}
                                arr={meetingTimeHour}
                                width='100%'
                                onChoseOption={(value) => { setTimeHour(value.data) }} />
                        </div>
                    </div>
                </div>

                <div style={{ width: '36%', borderRadius: '5px', border: (isSaved && timeMinute === '' ? "2px solid #EC5A5A" : "unser") }}>
                    <div style={{ padding: '0 10px', backgroundColor: 'var(--custom-background-light-blue)', borderRadius: '5px' }}>
                        <Select
                            backgroundColor='var(--custom-background-light-blue)'
                            className='selectBorder'
                            color='#A5A4BF'
                            selectTextDefault={timeHour !== "" ? timeHour : "שעות"}
                            arr={recipients}
                            width='100%'
                            onChoseOption={(value) => { setTimeHour(value.data) }} />
                    </div>
                </div>

                <div
                    style={{ float: 'unset', marginTop: 'unset' }}
                    className='searchBtn pointer'
                    onClick={() => {
                        onClickBtn()
                    }}>שלח קישור לזום</div>
            </div>

        </div>
    )
}

export default SendZoom;