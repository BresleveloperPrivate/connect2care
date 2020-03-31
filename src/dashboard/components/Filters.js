import React, { useState } from 'react'
import '../style/filters.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Filters = (props) => { 

    const [inputValue, setInputValue] = useState("")
    const [error, setError] = useState("");

    return (
        <div>
            <div className="filtersContainer">
                <div className="searchInputContainer">
                    <input className='searchPlaceInput'
                        type='text'
                        onChange={(e) => {
                            setInputValue(e.target.value); if (error !== "") setError("")
                        }}
                        value={inputValue}
                        placeholder={"חיפוש"}
                    />
                    {inputValue ?
                        <div style={{ width: '2%', marginLeft: '25px' }} className="iconInSearchInput"
                            onClick={() => { setInputValue(""); if (error !== "") setError("") }}>
                            <FontAwesomeIcon icon={['fas', 'times']} style={{ fontSize: '1rem' }} />
                        </div>
                        : <div className="iconInSearchInput">
                            <FontAwesomeIcon icon={['fas', 'search']} style={{ fontSize: '1rem' }} />
                        </div>
                    }
                </div>
                {/* <div className="selectFilters" style={{ zIndex: "1" }}>
                    <Select
                        selectTextDefault='כל האיזורים'
                        arr={[{ name: "כל האיזורים" }].concat(AllAreas).map((area) => {
                            return { option: area.name }
                        })}
                        width='35%'
                        onChoseOption={(value) => { value.option === "כל האיזורים" ? setSelectedAreaAndError("") : setSelectedAreaAndError(value.option) }} />

                    {props.ManagerStore.allEras &&
                        <Select
                            selectTextDefault='כל התקופות'
                            arr={[{ id: 0, name: "כל התקופות" }].concat(props.ManagerStore.allEras).map((era) => {
                                return { id: era.id, option: era.name }
                            })}
                            width='60%'
                            onChoseOption={(value) => {
                                setSelectedEra(value.id); setError("")
                            }} />
                    }
                </div> */}
            </div>
        </div>
    )
}

export default Filters