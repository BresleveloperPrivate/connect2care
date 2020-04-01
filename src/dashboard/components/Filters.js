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
    const [slectedRelationship, setSelectedRelationship] = useState("")
    const [slectedParticipants, setSlectedParticipants] = useState("")
    const DATES = [{ option: 'בחר' }, { option: '26.04 - יום ראשון' }, { option: '27.04 - ערב יום הזכרון' }, { option: '28.04 - יום הזכרון' }, { option: '29.04- יום רביעי' }]
    const RELATIONSHIPS = [{ option: 'בחר' }, { option: 'אח' }, { option: 'הורים' }, { option: 'חבר' }, { option: 'קרוב משפחה' }, { option: 'אחר' }]
    const IS_OPEN_ARR = [{ option: 'בחר' }, { option: 'פתוח' }, { option: 'סגור' }]
    const PARTICIPANTS_NUM = [{ option: 'בחר' }, { option: '20 - 0' }, { option: '100 - 20' }, { option: '100+' }]

    return (
        <div className='filters'>
            <div className='headLine'>סנן לפי</div>
            <div className="filtersContainer">
                <div style={{ width: '50%' }}>
                    <div className='filterItem'>
                        <div className='textFilter'>תאריך</div>
                        <Select
                            backgroundColor='var(--custom-background-light-blue)'
                            color='#A5A4BF'
                            selectTextDefault='בחר'
                            arr={DATES}
                            width='90%'
                            onChoseOption={(value) => { value.option === "בחר" ? setSelectedDate("") : setSelectedDate(value.option) }}
                        />
                    </div>
                    <div className='filterItem'>
                        <div className='textFilter'>פתוח / סגור</div>
                        <Select
                            backgroundColor='var(--custom-background-light-blue)'
                            color='#A5A4BF'
                            selectTextDefault='בחר'
                            arr={IS_OPEN_ARR}
                            width='90%'
                            onChoseOption={(value) => { value.option === "בחר" ? setSelectedIsOpen("") : setSelectedIsOpen(value.option === 'פתוח') }}
                        />
                    </div>

                    <div className='filterItem'>
                        <div className='textFilter'>קרבה</div>
                        <Select
                            backgroundColor='var(--custom-background-light-blue)'
                            color='#A5A4BF'
                            selectTextDefault='בחר'
                            arr={RELATIONSHIPS}
                            width='90%'
                            onChoseOption={(value) => { value.option === "בחר" ? setSelectedRelationship("") : setSelectedRelationship(value.option) }}
                        />
                    </div>

                    <div className='filterItem'>
                        <div className='textFilter'>מספר משתתפים</div>
                        <Select
                            backgroundColor='var(--custom-background-light-blue)'
                            color='#A5A4BF'
                            selectTextDefault='בחר'
                            arr={PARTICIPANTS_NUM}
                            width='90%'
                            onChoseOption={(value) => { value.option === "בחר" ? setSlectedParticipants("") : setSlectedParticipants(value.option) }}
                        />
                    </div>
                </div>

                <div style={{ width: '50%' }}>
                    <div className='filterItem'>
                        <div className='textFilter'>חיפוש לפי נופל</div>
                        <div className="searchInputContainer">
                            <input className='searchPlaceInput'
                                type='text'
                                onChange={(e) => {
                                    setInputFallen(e.target.value)
                                }}
                                value={inputFallen}
                                placeholder={"חיפוש"}
                            />
                            {inputFallen ?
                                <div className="iconInSearchInput"
                                    onClick={() => { setInputFallen("") }}>
                                    <FontAwesomeIcon icon={['fas', 'times']} style={{ fontSize: '1rem' }} />
                                </div> :
                                <div className="iconInSearchInput">
                                    <FontAwesomeIcon icon={['fas', 'search']} style={{ fontSize: '1rem' }} />
                                </div>
                            }
                        </div>
                    </div>


                    <div className='filterItem'>
                        <div className='textFilter'>חיפוש לפי יוצר</div>
                        <div className="searchInputContainer">
                            <input className='searchPlaceInput'
                                type='text'
                                onChange={(e) => {
                                    setInputOwner(e.target.value)
                                }}
                                value={inputOwner}
                                placeholder={"חיפוש"}
                            />
                            {inputOwner ?
                                <div className="iconInSearchInput"
                                    onClick={() => { setInputOwner("") }}>
                                    <FontAwesomeIcon icon={['fas', 'times']} style={{ fontSize: '1rem' }} />
                                </div> :
                                <div className="iconInSearchInput">
                                    <FontAwesomeIcon icon={['fas', 'search']} style={{ fontSize: '1rem' }} />
                                </div>
                            }
                        </div>
                    </div>

                    <div className='filterItem'>
                        <div className='textFilter'>חיפוש לפי שם המפגש</div>
                        <div className="searchInputContainer">
                            <input className='searchPlaceInput'
                                type='text'
                                onChange={(e) => {
                                    setInputMeetingName(e.target.value)
                                }}
                                value={inputMeetingName}
                                placeholder={"חיפוש"}
                            />
                            {inputMeetingName ?
                                <div className="iconInSearchInput"
                                    onClick={() => { setInputMeetingName("") }}>
                                    <FontAwesomeIcon icon={['fas', 'times']} style={{ fontSize: '1rem' }} />
                                </div> :
                                <div className="iconInSearchInput">
                                    <FontAwesomeIcon icon={['fas', 'search']} style={{ fontSize: '1rem' }} />
                                </div>
                            }
                        </div>
                    </div>

                    <div
                        className='searchBtn'
                        onClick={() => {
                            let filters = {}
                            if (inputFallen !== '') filters.fallen = inputFallen
                            if (inputOwner !== '') filters.owner = inputOwner
                            if (inputMeetingName !== '') filters.name = inputMeetingName
                            if (slectedDate !== '') filters.date = slectedDate.slice(0, 5)
                            if (slectedIsOpen !== '') filters.isOpen = slectedIsOpen
                            if (slectedRelationship !== '') filters.relationship = slectedRelationship
                            if (slectedParticipants !== '') {
                                let splited = slectedParticipants.split(' ')
                                filters.participants = {}
                                if (splited.length === 1)
                                    filters.participants.min = 100
                                else {
                                    filters.participants.min = splited[2]
                                    filters.participants.max = splited[0]
                                }
                            }
                            props.ManagerStore.fetchMeetingsDashboard(filters)
                        }}>חפש</div>
                </div>

            </div>
        </div>
    )
}

export default inject('ManagerStore')(observer(Filters))