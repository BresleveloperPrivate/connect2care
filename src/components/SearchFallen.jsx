import React, { useCallback, useState, useMemo, useEffect, useRef } from 'react';

import { createMuiTheme, ThemeProvider, List, ListItem, ListItemAvatar, ListItemText, Avatar, makeStyles, CircularProgress } from '@material-ui/core';
// import { Search } from "@material-ui/icons";
import debounce from 'lodash/debounce';
import { inject, observer } from 'mobx-react';

import Auth from '../modules/auth/Auth';
import fallenNotExistPic from '../icons/fallenNotExistPic.jpg'

import { useCreateMeetingStore } from '../stores/createMeeting.store';
// import { useLanguageStore } from '../stores/language.store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useOnClickOutside from './UseOnClickOutside';

// import Tooltip from "@material-ui/core/Tooltip";
// import { withStyles } from '@material-ui/core/styles';

// const LightTooltip = withStyles((theme) => ({
//     tooltip: {
//       backgroundColor: '#16B3AB',
//       color: 'white',
//       textAlign: 'center',
//       boxShadow: theme.shadows[1],
//       fontSize: 12,
//       fontFamily: 'Heebo',
//     },
//   }))(Tooltip);

// const LanguageStore = useLanguageStore();
const useStyles = makeStyles({
    inputWraper: {
        position: "relative",
        height: 'fit-content',
    },

    list: {
        position: "absolute",
        backgroundColor: "white",
        zIndex: "10",
        maxHeight: "50vh",
        overflow: "auto",
        boxShadow: '-3px 4px 15px rgba(185, 188, 199, 0.795)',
        borderRadius: '5px',

    },

    loadingOrNoResults: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
    }
});

const SearchFallen = observer((props) => {
    const [searchValue, setSearchValue] = useState('');
    const [options, setOptions] = useState(null);
    const [showOptions, setShowOptions] = useState(true);
    // const [imgCorrect, setImgCorrect] = useState();

    const { inputWraper, list, loadingOrNoResults } = useStyles();

    const CreateMeetingStore = useCreateMeetingStore();
    const ref = useRef()

    // const setImg = (index, value) => {
    //     let allImg = JSON.parse(JSON.stringify(imgCorrect))
    //     allImg[index] = value
    //     setImgCorrect(allImg)
    // }

    useOnClickOutside(ref, () => setShowOptions(false));

    const onChange = useCallback(event => {
        setOptions(null);
        setShowOptions(true);
        setSearchValue(event.target.value);
        CreateMeetingStore.changeFallenName(event.target.value, props.index);
    }, []);

    const onFallenClick = useCallback(async fallen => {
        // if (Object.keys(CreateMeetingStore.fallenDetails).indexOf(fallen.id) === -1) { }
        // else 
        setShowOptions(false);
        setSearchValue(fallen.name);
        // const [response, error] = await Auth.superAuthFetch(`/api/fallens/${fallen.id}?filter={ "include":{"relation":"meetings", "scope":{"include":"meetingOwner"}} }`);
        const [response, error] = await Auth.superAuthFetch(`/api/fallens/getFallen`, {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ id: fallen.id })
        });
        if (error || response.error) { console.error('ERR:', error || response.error); return; }
        CreateMeetingStore.changeFallenDetails(response, props.index);
        console.log("response", response, "response.meetings", response.meetings)
        if (response && response.meetings && response.meetings.length)
            props.setDataForFallen(true)
    }, []);

    const fetch = useMemo(() => debounce(async (value, callback) => {
        const [response, error] = await Auth.superAuthFetch(`/api/fallens/SearchFallen`, {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ value })
        });

        if (error || response.error) { console.error('ERR:', error || response.error); setOptions([]); return; }

        callback(response);
    }, 200), []);

    useEffect(() => {
        // let correct = []
        // for (let i = 0; i < props.array.length; i++) {
        //     correct.push(false)
        // }
        // setImgCorrect(correct)

        if (!showOptions) { setOptions([]); return; }

        let active = true;

        if (searchValue === '') { setOptions([]); return undefined; }

        fetch(searchValue, options => {
            if (active) { setOptions(options || []); }
        });

        return () => {
            active = false;
        };
    }, [searchValue, fetch]);

    useEffect(() => {
        if (CreateMeetingStore.fallenDetails && CreateMeetingStore.fallenDetails[props.fallen.id]) {
            setSearchValue(CreateMeetingStore.fallenDetails[props.fallen.id].name)
            setShowOptions(false)
        }
    }, [CreateMeetingStore.fallenDetails, CreateMeetingStore.fallenName])

    if (CreateMeetingStore.deleting) {
        if (CreateMeetingStore.fallenDetails && props.fallen && props.fallen.id && CreateMeetingStore.fallenDetails[props.fallen.id] && CreateMeetingStore.fallenDetails[props.fallen.id].name !== searchValue) {
            setSearchValue(CreateMeetingStore.fallenDetails[props.fallen.id].name)
            CreateMeetingStore.setDeleting(false)
        }
        else {
            setSearchValue("")
            CreateMeetingStore.setDeleting(false)
        }
    }

    return (
        <div className={inputWraper + " fallenSearchDiv"} ref={ref}>

            {/* <LightTooltip disableHoverListener title={props.LanguageStore.lang !== "heb"?"Enter a name as shown on Izkor/Laad website":"יש לכתוב את השם כפי שמופיע באתר יזכור/לעד"} placement="top" arrow>    */}
                <div
                    className={'inputStyle inputSelectFallen d-flex align-items-center ' + (props.isSaved && (!CreateMeetingStore.fallenDetails || (CreateMeetingStore.fallenDetails && !CreateMeetingStore.fallenDetails[props.fallen.id])) ? "error" : "")}
                    style={{ width: "100%", marginBottom: '0' }}>
                    <input
                        disabled={CreateMeetingStore.meetingId !== -1}
                        type="text"
                        style={{ all: "unset", width: "calc(100% - 20px)" }}
                        onChange={onChange}
                        value={searchValue}
                        autoComplete="off"
                        placeholder={props.LanguageStore.lang !== 'heb' ? 'Fallen name (according to Izkor/Laad site)' : "שם החלל (לפי אתר יזכור/לעד)"}
                        onClick={() => setShowOptions(true)}
                    />
                    <FontAwesomeIcon icon={['fas', 'search']} style={{ fontSize: '20px', opacity: "0.5" }} />
                </div>
            {/* </LightTooltip> */}

            {showOptions && searchValue.length > 0 && (
                <List className={list + " listSearch"}>
                    {options ? options.length > 0 ? options.map((fallen, index) => (
                        <ListItem button key={fallen.id} onClick={() => onFallenClick(fallen)}>
                            <ListItemAvatar>
                                <Avatar src={fallen.image_link || fallenNotExistPic} style={fallen.image_link ? { filter: "grayscale(1)" } : {}} variant="rounded" />
                                {/* <img onError={() => setImgCorrect(index, fallenNotExistPic)} src={imgCorrect ? imgCorrect : (fallen.image_link || fallenNotExistPic)} style={!imgCorrect && fallen.image_link ? { filter: "grayscale(1)" } : {}} variant="rounded" /> */}
                            </ListItemAvatar>
                            <ListItemText primary={fallen.name} secondary={fallen.heb_falling_date} />
                        </ListItem>
                    )) : (
                            <div className={loadingOrNoResults}>{props.LanguageStore.lang !== "heb" ? "No result found" : "לא נמצאו תוצאות"}</div>
                        ) : (
                            <div className={loadingOrNoResults}>
                                <CircularProgress color="primary" value={70} />
                            </div>
                        )}
                </List>
            )}
        </div>
    );
}
)

const theme = createMuiTheme({
    direction: "rtl",
    palette: {
        primary: {
            main: "#19A099"
        }
    }
});

export default inject('LanguageStore')(observer(props => (
    <ThemeProvider theme={theme}>
        <SearchFallen {...props} />
    </ThemeProvider>
)));