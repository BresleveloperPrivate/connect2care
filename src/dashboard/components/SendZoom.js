import React, { useState } from 'react'
import Select from '../../components/Select'
import Auth from '../../modules/auth/Auth'
import DownArrow from '../../icons/Icon awesome-chevron-down.svg'
import { meetingDate } from '../../consts/Meetings.consts';


const SendZoom = (props) => {
    const [isSaved, setIsSaved] = useState(false)
    const [date, setDate] = useState('')
    const [timeHour, setTimeHour] = useState('')
    const [timeMinute, setTimeMinute] = useState('')
    const [recipient, setRecipient] = useState('')
    const [waitForData, setWaitForData] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

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

    const recipients = [
        { option: 'מארח', data: 'מארח' },
        { option: 'משתתפים', data: 'משתתפים' }
    ]

    const onClickBtn = async () => {
        setIsSaved(true)
        if (date === '' || timeHour === '' || timeMinute === '' || recipient === '') return
        let time = timeHour + ':' + timeMinute
        setWaitForData(false)
        if (recipient === 'מארח') {
            let [, err] = await Auth.superAuthFetch(
                `/api/meetings/sendMailHost`,
                {
                    method: 'POST',
                    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                    body: JSON.stringify({ time: time, date: date })
                }, true);
            setWaitForData(false)
            if (err) {
                // setErr(true)
                return
            }
        }

        else {
            let [, err] = await Auth.superAuthFetch(
                `/api/meetings/sendMailParticipants`,
                {
                    method: 'POST',
                    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                    body: JSON.stringify({ time: time, date: date })
                }, true);
            setWaitForData(false)
            if (err) {
                return
            }
        }

        setIsSaved(false)
        setDate('')
        setRecipient('')
        setTimeHour('')
        setTimeMinute('')
    }

    return (
        <div className='filters'>
            <div style={{ margin: 'unset', padding: '2vh 5vw', display: 'flex' }} className='headLine pointer' onClick={() => setIsOpen((isFilterOpen) => !isOpen)}>
                <div style={{ width: '20vw' }}>שלח מייל עם קישור לזום</div>
                <img style={{ width: '2.5vh', marginRight: '46vw', transform: isOpen ? 'rotate(-180deg)' : 'rotate(0deg)' }} src={DownArrow} alt='arrow' />
            </div>
            <div className="filtersContainer" style={isOpen ? { psdding: 'unset', paddingTop: '1vh', height: '15vh' } : { height: 0, padding: '0 5vw', overflow: 'hidden' }}>

                <div className="containDateAndTime" style={{ width: '100%', marginRight: '0', alignItems: 'center', marginLeft: 0 }}>
                    <div className='containDateInput position-relative' style={{ width: '35%', borderRadius: '5px', border: ((isSaved && date === '') ? "2px solid #EC5A5A" : "unset") }}>
                        <div className="textAboveInput">{props.t("date")}</div>
                        <Select
                            backgroundColor='var(--custom-background-light-blue)'
                            className='selectBorder'
                            color='#A5A4BF'
                            selectTextDefault={date !== '' ? date : 'בחר'}
                            arr={meetingDate(props)?.slice(1)}
                            width='100%'
                            onChoseOption={(value) => { setDate(value.data) }} />
                    </div>

                    <div className='containSelectTime position-relative' style={{ marginRight: 0, width: '22%' }}>
                        <div className="textAboveInput">שעה (שעון ישראל):</div>
                        <div style={{ width: '45%', borderRadius: '5px', border: ((isSaved && timeMinute === '') ? "2px solid #EC5A5A" : "unset") }}>
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

                        <div className="timeDot" style={{ marginBottom: 0, padding: '0px 1vh' }}>:</div>
                        <div style={{ width: '45%', borderRadius: '5px', border: ((isSaved && timeHour === '') ? "2px solid #EC5A5A" : "unset") }}>
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
                    <div className='containDateInput position-relative' style={{ width: '14%', borderRadius: '5px', border: ((isSaved && recipient === '') ? "2px solid #EC5A5A" : "unset") }}>
                        <div id='recipients' className="textAboveInput">נמען</div>
                        <Select
                            backgroundColor='var(--custom-background-light-blue)'
                            className='selectBorder'
                            color='#A5A4BF'
                            selectTextDefault={recipient !== "" ? recipient : "בחר"}
                            arr={recipients}
                            width='100%'
                            onChoseOption={(value) => { setRecipient(value.data) }} />
                    </div>

                    <div
                        style={{ float: 'unset', marginTop: 'unset' }}
                        className='searchBtn pointer'
                        onClick={() => {
                            onClickBtn()
                        }}>{waitForData ?
                            <div className="spinner">
                                <div className="bounce1"></div>
                                <div className="bounce2"></div>
                                <div className="bounce3"></div>
                            </div>
                            : "שלח"
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SendZoom;
