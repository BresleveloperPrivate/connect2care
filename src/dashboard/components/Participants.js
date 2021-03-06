import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react';
import '../style/dashboardMain.css'
import '../style/meetingInfo.scss'
import '../style/filters.css'
import Auth from '../../modules/auth/Auth'
import DeletePersonPopup from './DeletePersonPopup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import panelBtn from '../../icons/Asset 7@3x11@2x.png'
import CancelPanelistPopup from './CancelPanelistPopup'
import downloadExcel from '../../functions/downloadExcel'

const Participants = (props) => {

    const [allParticipants, setAllParticipants] = useState(null)
    const [participants, setParticipants] = useState(null)
    const [showDeletePersonPopup, setShowDeletePersonPopup] = useState(false)
    const [currentParticipant, setCurrentParticipant] = useState(null)
    const [maxPaticipants, setMaxParticipants] = useState(null)
    const [canChangePanelist, setCanChangePanelist] = useState(false)
    const [showCancelPanelistPopup, setShowCancelPanelistPopup] = useState(false)
    const [inputSearch, setInputSearch] = useState('')

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
                // this.setError('משהו השתבש, נסה שנית מאוחר יותר');
            }
            if (success) {
                setCanChangePanelist(success.pop())
                setMaxParticipants(success.pop())
                setAllParticipants(success)
                setParticipants(success)
            }
        })()
    }, [])

    const spliceFromArr = (id) => {
        let index = participants.findIndex(e => e.id === id);
        let par = JSON.parse(JSON.stringify(participants))
        par.splice(index, 1)
        setParticipants(par)
    }

    const changePanelitStatus = async (participant) => {
        if (participant.isPanelist) {
            setCurrentParticipant(participant)
            setShowCancelPanelistPopup(true)
        }
        else {
            console.log("props.CreateMeetingStore.meetingDetailsOriginal.zoomId", props.CreateMeetingStore.meetingDetailsOriginal.zoomId)
            let [success, err] = await Auth.superAuthFetch(
                `/api/meetings/setPanelistStatus`,
                {
                    method: 'POST',
                    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                    body: JSON.stringify({ meetingId: Number(props.CreateMeetingStore.meetingId), participantId: Number(participant.id), isPanelist: true, participantName: participant.name, participantEmail: participant.email, zoomId: props.CreateMeetingStore.meetingDetailsOriginal.zoomId })
                }, true);
            if (err) {
                console.log(err)
                // this.setError('משהו השתבש, נסה שנית מאוחר יותר');
            }
            if (success) {
                setPanelistInArr(participant.id)
            }
        }
    }

    const setPanelistInArr = (id) => {
        let index = participants.findIndex(i => i.id === id)
        let participantsPS = JSON.parse(JSON.stringify(participants))
        participantsPS[index].isPanelist = !participantsPS[index].isPanelist
        setParticipants(participantsPS)
    }

    const onClickBtn = () => {
        let excetParticipants = participants.map(i => { return { name: i.name, email: i.email, phone: i.phone } })
        const columns = {
            ownerName: 'שם',
            ownerEmail: 'כתובת המייל',
            ownerPhone: 'פלפון'

        }

        downloadExcel(excetParticipants, columns, "מתחברים וזוכרים טבלאת משתתפים")

    }

    return (
        <div>
            {!participants ?
                <div className='headLine noRes' style={{ margin: 0 }}>
                    <div className="spinner-border" role="status">
                        <span className="sr-only">טוען...</span>
                    </div>
                </div> :

                allParticipants.length === 0 ?
                    <div className='headLine noRes' style={{ margin: 0, padding: '5vh 0' }}>עדיין לא נרשמו אנשים למפגש</div> :
                    <div>
                        <div className='filters' style={{ width: '55%', margin: '5vw', marginTop: '4vh', marginBottom: '20px', textAlign: 'right', boxShadow: 'unset' }}>
                            <div className='filterItem'>
                                <div className='textFilter'>חיפוש משתתף</div>
                                <div className="searchInputContainer position-relative">
                                    <input className='searchPlaceInput'
                                        type='text'
                                        onChange={(e) => {
                                            if (e.target.value === '') setParticipants(allParticipants)
                                            setInputSearch(e.target.value)
                                        }}
                                        value={inputSearch}
                                        placeholder={"חיפוש"}
                                    />
                                    {inputSearch &&
                                        <div className="iconInSearchInput position-absolute"
                                            style={{ left: '5vw', cursor: 'pointer' }}
                                            onClick={() => {
                                                setInputSearch("")
                                                setParticipants(allParticipants)
                                            }}>
                                            <FontAwesomeIcon icon={['fas', 'times']} style={{ fontSize: '1rem' }} />
                                        </div>}
                                    <div className="iconInSearchInput"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            let participantsSearch = participants.filter((e) => e.name.includes(inputSearch))
                                            setParticipants(participantsSearch)
                                        }}
                                    >
                                        <FontAwesomeIcon icon={['fas', 'search']} style={{ fontSize: '1rem' }} />
                                    </div>

                                </div>
                                <div className='searchBtn pointer'
                                    style={{ marginTop: '4vh', float: 'unset' }}
                                    onClick={() => {
                                        onClickBtn(true)
                                    }}>יצא לאקסל</div>
                                {participants && maxPaticipants && <div style={{ position: 'absolute', color: 'var(--custom-gray)', left: '11vw', paddingTop: '0' }}>מספר המשתתפים: {maxPaticipants} / {allParticipants.length}</div>}
                            </div>
                        </div>

                        <table className="allTableStyle" style={{ margin: 0, borderRadius: '0 0 7px 7px' }}>
                            <tbody>
                                <tr className="tableHead">
                                    <th style={{ paddingRight: '2vw' }}>שם</th>
                                    <th>דואר אלקטרוני</th>
                                    <th>טלפון</th>
                                    {canChangePanelist && <th></th>}
                                    <th></th>
                                </tr>
                                {participants.length === 0 ?
                                    <tr className='position-relative' style={{ height: '9vh' }}>
                                        <td><div className='position-absolute' style={{ width: '80%', fontSize: '3vh', fontWeight: 600, height: '1vh', lineHeight: '1vh' }}>לא נמצאו תוצאות</div></td>
                                    </tr> :
                                    participants.map((participant, index) =>
                                        (<tr key={index} className="tableBodyStyle">
                                            <td className='name position-relative' style={{ paddingRight: '2vw' }}>
                                                <div className='position-absolute'>
                                                    <div style={{ width: '4.5vw', fontSize: '2vh' }} className='trash' onClick={() => {
                                                        setShowDeletePersonPopup(true)
                                                        setCurrentParticipant(participant.id)
                                                    }}>
                                                        <FontAwesomeIcon icon={['fas', 'trash']} />
                                                        <div className='trashText'>מחק משתתף</div>
                                                    </div>
                                                </div>
                                                {participant.name}
                                            </td>
                                            <td className='email'>{participant.email}</td>
                                            <td className='phone'>{participant.phone}</td>

                                            {canChangePanelist && <td>
                                                <div>
                                                    <div className={participant.isPanelist ? 'panelistContain' : 'panelContain'} onClick={() => changePanelitStatus(participant)} >
                                                        <div
                                                            className='panelBtn'
                                                            style={{
                                                                width: "20px",
                                                                height: "34px",
                                                                WebkitMaskSize: "20px 34px",
                                                                WebkitMaskImage: `Url(${panelBtn})`
                                                            }}>
                                                        </div>
                                                        {!participant.isPanelist && <div className='panelText position-absolute'>הגדר כפאנליסט</div>}
                                                    </div>
                                                </div>
                                            </td>}
                                            <td></td>
                                        </tr>)
                                    )}
                            </tbody>
                        </table>
                    </div>
            }
            {showDeletePersonPopup && <DeletePersonPopup handleClose={() => setShowDeletePersonPopup(false)} meetingId={props.CreateMeetingStore.meetingId} participantId={currentParticipant} spliceFromArr={spliceFromArr} />}
            {showCancelPanelistPopup && <CancelPanelistPopup handleClose={() => setShowCancelPanelistPopup(false)} meetingId={props.CreateMeetingStore.meetingId} currentParticipant={currentParticipant} zoomId={props.CreateMeetingStore.meetingDetailsOriginal.zoomId} setPanelistInArr={setPanelistInArr} />}
        </div >
    )
}

export default inject('CreateMeetingStore')(observer(Participants))