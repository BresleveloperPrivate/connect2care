import React, { useState } from 'react'
import { inject, observer } from 'mobx-react';
import '../style/filters.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from '../../components/Select'
import DownArrow from '../../icons/Icon awesome-chevron-down.svg'

const Filters = (props) => {

    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [inputFallen, setInputFallen] = useState("")
    const [inputOwner, setInputOwner] = useState("")
    const [inputMeetingName, setInputMeetingName] = useState("")
    const [slectedDate, setSelectedDate] = useState("")
    const [slectedIsOpen, setSelectedIsOpen] = useState("")
    const [slectedRelationship, setSelectedRelationship] = useState("")
    const [slectedParticipants, setSlectedParticipants] = useState("")
    const [slectedApproved, setSlectedApproved] = useState("")

    const DATES = [
        { option: 'הכל', data: 'הכל' },
        { option: props.t('sunday'), data: 'יום ראשון, ב באייר, 26.04' },
        { option: props.t('monday'), data: 'יום שני, ג באייר, 27.04' },
        { option: props.t('tuesday'), data: 'יום שלישי, ד באייר, 28.04' },
        { option: props.t('wednesday'), data: 'יום רביעי, ה באייר, 29.04' },
    ]
    const RELATIONSHIPS = [
        { option: 'הכל', data: 'הכל' },
        { option: 'אח/ות', data: 'אח/ות' },
        { option: 'הורה', data: 'הורים' },
        { option: 'קרוב/ת משפחה', data: 'קרובי משפחה' },
        { option: 'חבר/ה', data: 'חבר' },
        { option: props.t('avi chai'), data: 'בית אביחי' },
        { option: props.t('ourBrothers'), data: 'האחים שלנו' },
    ]
    const IS_OPEN_ARR = [
        { option: 'הכל', data: 'הכל' },
        { option: 'פתוח', data: 'פתוח' },
        { option: 'סגור', data: 'סגור' }

    ]
    const PARTICIPANTS_NUM = [
        { option: 'הכל', data: 'הכל' },
        { option: '20 - 0', data: '20 - 0' },
        { option: '100 - 20', data: '100 - 20' },
        { option: '100+', data: '100+' }
    ]

    const APPROVEV = [
        { option: 'הכל', data: 'הכל' },
        { option: 'ממתין לאישור', data: 'ממתין לאישור' },
        { option: 'אושר', data: 'אושר' }
    ]

    const onClickBtn = (isExcel) => {
        let filters = {}
        if (inputFallen !== '') filters.fallen = inputFallen
        if (inputOwner !== '') filters.owner = inputOwner
        if (inputMeetingName !== '') filters.name = inputMeetingName
        if (slectedDate !== '') filters.date = slectedDate
        if (slectedIsOpen !== '') filters.isOpen = slectedIsOpen
        if (slectedApproved !== '') filters.approved = slectedApproved
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
        props.ManagerStore.fetchMeetingsDashboard(filters, false, isExcel)
    }

    return (
        <div className='filters'>
            <div style={{ margin: 'unset', padding: '2vh 5vw' }} className='headLine' onClick={() => setIsFilterOpen((isFilterOpen) => !isFilterOpen)}>
                סנן לפי
                <img className="pointer" style={{ width: '2.5vh', marginRight: '60vw', transform: isFilterOpen ? 'rotate(-180deg)' : 'rotate(0deg)' }} src={DownArrow} alt='arrow' />
            </div>
            <div className="filtersContainer" style={isFilterOpen ? { height: '40vh' } : { height: 0, padding: '0 5vw', overflow: 'hidden' }}>
                <div style={{ width: '50%' }}>
                    <div className='filterItem'>
                        <div className='textFilter'>{props.t("date")}</div>
                        <Select
                            backgroundColor='var(--custom-background-light-blue)'
                            className='selectBorder'
                            color='#A5A4BF'
                            selectTextDefault='הכל'
                            arr={DATES}
                            width='90%'
                            onChoseOption={(value) => { value.option === "הכל" ? setSelectedDate("") : setSelectedDate(value.data) }}
                        />
                    </div>
                    <div className='filterItem'>
                        <div className='textFilter'>פתוח / סגור</div>
                        <Select
                            backgroundColor='var(--custom-background-light-blue)'
                            className='selectBorder'
                            color='#A5A4BF'
                            selectTextDefault='הכל'
                            arr={IS_OPEN_ARR}
                            width='90%'
                            onChoseOption={(value) => { value.data === "הכל" ? setSelectedIsOpen("") : setSelectedIsOpen(value.data === 'פתוח') }}
                        />
                    </div>

                    <div className='filterItem'>
                        <div className='textFilter'>קרבה</div>
                        <Select
                            img={true}
                            backgroundColor='var(--custom-background-light-blue)'
                            className='selectBorder'
                            color='#A5A4BF'
                            selectTextDefault='הכל'
                            arr={RELATIONSHIPS}
                            width='90%'
                            onChoseOption={(value) => { value.data === "הכל" ? setSelectedRelationship("") : setSelectedRelationship(value.data) }}
                        />
                    </div>

                    <div className='filterItem'>
                        <div className='textFilter'>מספר משתתפים</div>
                        <Select
                            backgroundColor='var(--custom-background-light-blue)'
                            className='selectBorder'
                            color='#A5A4BF'
                            selectTextDefault='הכל'
                            arr={PARTICIPANTS_NUM}
                            width='90%'
                            onChoseOption={(value) => { value.data === "הכל" ? setSlectedParticipants("") : setSlectedParticipants(value.data) }}
                        />
                    </div>
                    <div className='filterItem'>
                        <div className='textFilter'>ממתין לאישור</div>
                        <Select
                            backgroundColor='var(--custom-background-light-blue)'
                            className='selectBorder'
                            color='#A5A4BF'
                            selectTextDefault='הכל'
                            arr={APPROVEV}
                            width='90%'
                            onChoseOption={(value) => { value.data === "הכל" ? setSlectedApproved("") : (value.data === 'ממתין לאישור' ? setSlectedApproved(false) : setSlectedApproved(true)) }}
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
                        <div className='textFilter'>חיפוש לפי מארח/ת</div>
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

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div
                            className='searchBtn pointer'
                            onClick={() => {
                                onClickBtn(true)
                            }}>יצא לאקסל</div>

                        <div
                            className='searchBtn pointer'
                            onClick={() => {
                                onClickBtn(false)
                                setIsFilterOpen(false)
                            }}>חפש</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default inject('ManagerStore')(observer(Filters))