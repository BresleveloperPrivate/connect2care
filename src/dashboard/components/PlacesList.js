import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style/erasList.css';
import './style/places.css'
import './style/placesList.css';
import Flower from './icons/flower.png';
import PopoverMenu from './PopoverMenu'
import recommendedIcon from './icons/metro-pin.svg'
import Select from './Select'
import AllAreas from './AllAreas'
import Auth from '../modules/auth/Auth';
import Loading from './Loading';
import ErrorMethod from './ErrorMethod';
import DeletePlacePopup from './DeletePlacePopup';

const PlacesList = (props) => {

    const [loadingIndex, setLoadingIndex] = useState(-1)
    const [selectedArea, setSelectedArea] = useState("")
    const [selectedEra, setSelectedEra] = useState(0)
    const [inputValue, setInputValue] = useState("")
    const [error, setError] = useState("");
    const [showDeletePlacePopup, setShowDeletePlacePopup] = useState([false, '', null])

    useEffect(() => {
        (async () => {
            await props.ManagerStore.fetchAllPlaces()
            if (!props.ManagerStore.allEras) {
                await props.ManagerStore.fetchAllEras()
            }
        })()
    }, []);

    const handleChangeRecommended = async (placeId, name) => {
        setLoadingIndex(placeId)
        let [isRecommended, err] = await Auth.superAuthFetch('/api/places/changeRecommendedStatus', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "placeId": placeId
            })
        }, true)
        setLoadingIndex(-1)
        if (err) {
            props.ManagerStore.setError(`לא הצלחנו לעדכן את האתר ${name} לאתר מומלץ`)
            return
        }
        props.ManagerStore.updateIsRecommended(placeId, isRecommended)
    }

    const printAllPlaces = () => {
        let placesTable = []
        if (props.ManagerStore.allPlaces) {
            if (!filterPlacesWithInput().length)
                setError("לא נמצאו תוצאות")

            placesTable = filterPlacesWithInput().map(([index, place]) => {
                const popoverMenuContent = [
                    <div className="cursor d-flex align-items-center" onClick={() => { handleChangeRecommended(Number(index), place.name) }}>
                        <div
                            className="ml-3"
                            style={{
                                WebkitMaskImage: `Url(${recommendedIcon})`,
                                background: "var(--custom-gray)",
                                width: '0.8rem',
                                height: '0.8rem',
                                webkitMaskSize: '0.8rem 0.8rem'
                            }}>
                        </div>
                        {loadingIndex === Number(index) ?
                            <div className="spinner" style={{ textAlign: "unset", padding: 0, margin: "5px" }}>
                                <div style={{ backgroundColor: "var(--custom-gray)" }} className="bounce1"></div>
                                <div style={{ backgroundColor: "var(--custom-gray)" }} className="bounce2"></div>
                                <div style={{ backgroundColor: "var(--custom-gray)" }} className="bounce3"></div>
                            </div> :

                            place.isRecommended ? 'הסר המלצה' : 'הגדר אתר כמומלץ'}
                    </div>,
                    <div className="cursor" onClick={() => { props.history.push('/edit-place/' + place.id) }}>
                        <FontAwesomeIcon icon={['fas', 'pen']} className="ml-3" style={{ fontSize: '0.7rem' }} />
                        ערוך אתר
                    </div>,
                    <div className="cursor" onClick={() => { setShowDeletePlacePopup([true, place.name, place.id]) }}>
                        <FontAwesomeIcon icon={['fas', 'trash']} className="ml-3" style={{ fontSize: '0.7rem' }} />
                        מחק אתר
                    </div>
                ]

                return (
                    <tr key={index} className="tableBodyStyle">
                        <td style={{ maxWidth: "18vw", overflowX: "auto" }}>{place.name}</td>
                        <td>{place.area}</td>
                        <td style={{ maxWidth: "10vw" }}>
                            <div style={{ overflowX: "auto", maxHeight: "5vh" }}>
                                {place.eras && place.eras.map((era, index) =>
                                    era ? <img key={index} style={{ margin: '2px 5px', width: "30px", height: '30px', borderRadius: '50%', objectFit: 'cover' }} src={era.Images ? era.Images.path : Flower} alt={place.eras && place.eras.name} /> : null
                                )}
                            </div>
                        </td>
                        <td className="openMenuIcon">
                            <div className="containPinAndMenu">
                                {Number(index) === loadingIndex ? <div className="spinner">
                                    <div className="bounce1"></div>
                                    <div className="bounce2"></div>
                                    <div className="bounce3"></div>
                                </div> :
                                    place.isRecommended ? <img className="recommendedPin" src={recommendedIcon} alt='recommended' /> : <div></div>}
                                <PopoverMenu content={popoverMenuContent} width='175px' />
                            </div>
                        </td>
                    </tr>
                )
            })
        }
        return placesTable
    }

    const filterPlaces = () => {
        if (!selectedArea && !selectedEra) {
            return Object.entries(props.ManagerStore.allPlaces)
        }
        if (selectedArea && !selectedEra) {
            return Object.entries(props.ManagerStore.allPlaces).filter((value) => selectedArea === value[1].area)
        }
        if (!selectedArea && selectedEra) {
            return Object.entries(props.ManagerStore.allPlaces).filter((value) => value[1].eras.some(era => era.id === selectedEra))
        }
        if (selectedArea && selectedEra) {
            return Object.entries(props.ManagerStore.allPlaces).filter((value) => selectedArea === value[1].area && value[1].eras.some(era => era.id === selectedEra))
        }
    }

    const filterPlacesWithInput = () => {
        let places = filterPlaces()
        if (!places.length) {
            setError("לא נמצאו תוצאות")
            return places
        }
        if (!inputValue) {
            places.sort((a, b) => a[1].name > b[1].name ? 1 : -1)
            return places
        }
        let newList = places.filter(item => {
            const name = item[1].name.toLowerCase()
            const filter = inputValue.toLowerCase()
            return name.includes(filter)
        })
        newList.sort((a, b) => a[1].name > b[1].name ? 1 : -1)
        return newList
    }

    const setSelectedAreaAndError = (area) => {
        setSelectedArea(area);
        setError("")
    }

    return (
        <div className="paddingBottomDiv">
            <div className="headLine">ציוני דרך</div>
            {
                props.ManagerStore.error === ("לא הצלחנו להביא את התקופות המבוקשות" || "לא הצלחנו להביא את המקומות המבוקשים") ?
                    <div className="errorNotFound" style={{ color: "#ab0202c7" }}>{props.ManagerStore.error}</div>
                    :
                    <div> {!props.ManagerStore.allPlaces || !props.ManagerStore.allEras ?
                        <Loading {...props} height="calc(92vh - 77px - 12rem)" width="4rem" />
                        : <div>
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
                                <div className="selectFilters" style={{ zIndex: "1" }}>
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
                                </div>
                            </div>

                            {error === "" ? <table className="allTableStyle">
                                <tbody>
                                    <tr className="tableHead">
                                        <th>אתר</th>
                                        <th>אזור</th>
                                        <th>תקופה</th>
                                        <th className="threeDotsMenu"></th>
                                    </tr>
                                    {printAllPlaces()}
                                </tbody>
                            </table> :
                                <div className="errorNotFound">{error}</div>}
                        </div>
                    }
                        {props.ManagerStore.error && <ErrorMethod />}
                    </div>
            }
            {showDeletePlacePopup[0] && <DeletePlacePopup isPlace={true} name={showDeletePlacePopup[1]} idToDelete={showDeletePlacePopup[2]} handleDismiss={() => setShowDeletePlacePopup([false, '', null])} />}
        </div>
    );
}

export default inject('ManagerStore')(observer(PlacesList));