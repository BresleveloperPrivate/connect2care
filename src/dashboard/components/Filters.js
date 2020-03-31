import React, { useState } from 'react'
import { inject, observer } from 'mobx-react';
import '../style/filters.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from '../../components/Select'

const Filters = (props) => {

    const [inputFallen, setInputFallen] = useState("")
    const [inputOwner, setInputOwner] = useState("")
    const [inputMeetingName, setInputMeetingName] = useState("")
    const [slectedDate, setSelectedDate] = useState("")
    const [slectedIsOpen, setSelectedIsOpen] = useState("")
    const [slectedRelastionship, setSelectedRelastionship] = useState("")
    const [slectedParticipants, setSlectedParticipants] = useState("")
    const DATES = [{ option: 'בחר תאריך' }, { option: '26.04 - יום ראשון' }, { option: '27.04 - ערב יום הזכרון' }, { option: '28.04 - יום הזכרון' }, { option: '29.04- יום רביעי' }]
    const RELARIONSHIPS = [{ option: 'קרבה' }, { option: 'אח' }, { option: 'הורים' }, { option: 'חבר' }, { option: 'קרוב משפחה' }, { option: 'אחר' }]
    const IS_OPEN_ARR = [{ option: 'פתוח / סגור' }, { option: 'פתוח' }, { option: 'סגור' }]

    return (
        <div className='filters'>
            <div className="filtersContainer">
                <div className="searchInputContainer">
                    <input className='searchPlaceInput'
                        type='text'
                        onChange={(e) => {
                            setInputFallen(e.target.value)
                        }}
                        value={inputFallen}
                        placeholder={"חיפוש לפי נופל"}
                    />
                    {inputFallen ?
                        <div style={{ width: '2%', marginLeft: '25px' }} className="iconInSearchInput"
                            onClick={() => { setInputFallen("") }}>
                            <FontAwesomeIcon icon={['fas', 'times']} style={{ fontSize: '1rem' }} />
                        </div> :
                        <div className="iconInSearchInput">
                            <FontAwesomeIcon icon={['fas', 'search']} style={{ fontSize: '1rem' }} />
                        </div>
                    }
                </div>
                <div className="searchInputContainer">
                    <input className='searchPlaceInput'
                        type='text'
                        onChange={(e) => {
                            setInputOwner(e.target.value)
                        }}
                        value={inputOwner}
                        placeholder={"חיפוש לפי יוצר"}
                    />
                    {inputOwner ?
                        <div style={{ width: '2%', marginLeft: '25px' }} className="iconInSearchInput"
                            onClick={() => { setInputOwner("") }}>
                            <FontAwesomeIcon icon={['fas', 'times']} style={{ fontSize: '1rem' }} />
                        </div> :
                        <div className="iconInSearchInput">
                            <FontAwesomeIcon icon={['fas', 'search']} style={{ fontSize: '1rem' }} />
                        </div>
                    }
                </div>
                <div className="searchInputContainer">
                    <input className='searchPlaceInput'
                        type='text'
                        onChange={(e) => {
                            setInputMeetingName(e.target.value)
                        }}
                        value={inputMeetingName}
                        placeholder={"חיפוש לפי שם המפגש"}
                    />
                    {inputMeetingName ?
                        <div style={{ width: '2%', marginLeft: '25px' }} className="iconInSearchInput"
                            onClick={() => { setInputMeetingName("") }}>
                            <FontAwesomeIcon icon={['fas', 'times']} style={{ fontSize: '1rem' }} />
                        </div> :
                        <div className="iconInSearchInput">
                            <FontAwesomeIcon icon={['fas', 'search']} style={{ fontSize: '1rem' }} />
                        </div>
                    }
                </div>
                <Select
                    backgroundColor='var(--custom-background-light-blue)'
                    color='#A5A4BF'
                    selectTextDefault='בחר תאריך'
                    arr={DATES}
                    width='35%'
                    onChoseOption={(value) => { value.option === "בחר תאריך" ? setSelectedDate("") : setSelectedDate(value.option) }}
                />
                <Select
                    backgroundColor='var(--custom-background-light-blue)'
                    color='#A5A4BF'
                    selectTextDefault='פתוח / סגור'
                    arr={IS_OPEN_ARR}
                    width='35%'
                    onChoseOption={(value) => { value.option === "פתוח / סגור" ? setSelectedIsOpen("") : setSelectedIsOpen(value.option === 'פתוח') }}
                />
                <Select
                    backgroundColor='var(--custom-background-light-blue)'
                    color='#A5A4BF'
                    selectTextDefault='קרבה'
                    arr={RELARIONSHIPS}
                    width='35%'
                    onChoseOption={(value) => { value.option === "קרבה" ? setSelectedRelastionship("") : setSelectedRelastionship(value.option) }}
                />
                
                <div onClick={() => {
                    let filters = {}
                    if (inputFallen !== '') filters.fallen = inputFallen
                    if (inputOwner !== '') filters.owner = inputOwner
                    if (inputMeetingName !== '') filters.name = inputMeetingName
                    if (slectedDate !== '') filters.date = slectedDate.slice(0, 5)
                    if (slectedIsOpen !== '') filters.isOpen = slectedIsOpen
                    if (slectedRelastionship !== '') filters.Relastionship = slectedRelastionship
                    console.log(filters)
                    props.ManagerStore.fetchMeetingsDashboard(filters)
                }}>חפש</div>
            </div>
        </div>
    )
}

export default inject('ManagerStore')(observer(Filters))