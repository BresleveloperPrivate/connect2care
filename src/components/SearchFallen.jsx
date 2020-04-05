import React, { useCallback, useState, useMemo, useEffect } from 'react';

import { TextField, createMuiTheme, ThemeProvider, List, ListItem, ListItemAvatar, ListItemText, Avatar, makeStyles, CircularProgress } from '@material-ui/core';
import { Search } from "@material-ui/icons";
import throttle from 'lodash/throttle';

import Auth from '../modules/auth/Auth';

import { useCreateMeetingStore } from '../stores/createMeeting.store';

const useStyles = makeStyles({
    inputWraper: {
        position: "relative",
        height: 'fit-content',
        width: '100%',
        marginRight: '30px'
    },

    list: {
        position: "absolute",
        backgroundColor: "white",
        zIndex: "10",
        maxHeight: "50vh",
        overflow: "auto",
        boxShadow: '0px 3px 6px #00000029',
        top: "calc(100% + 5px)",
        width: "100%"
    },

    loadingOrNoResults: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
    }
});

const SearchFallen = () => {
    const [searchValue, setSearchValue] = useState('');
    const [options, setOptions] = useState(null);
    const [showOptions, setShowOptions] = useState(true);

    const { inputWraper, list, loadingOrNoResults } = useStyles();

    const CreateMeetingStore = useCreateMeetingStore();

    const onChange = useCallback(event => {
        setOptions(null);
        setShowOptions(true);
        setSearchValue(event.target.value);
        CreateMeetingStore.changeFallenName(event);
    }, []);

    const onFallenClick = useCallback(async fallen => {
        setShowOptions(false);
        setSearchValue(fallen.name);

        const [response, error] = await Auth.superAuthFetch(`/api/fallens/${fallen.id}?filter={ "include": "meetings" }`);
        if (error || response.error) { console.error('ERR:', error || response.error); return; }
        CreateMeetingStore.changeFallenDetails(response);
    }, []);

    const fetch = useMemo(() => throttle(async (value, callback) => {
        const [response, error] = await Auth.superAuthFetch(`/api/fallens/SearchFallen`, {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ value })
        });

        if (error || response.error) { console.error('ERR:', error || response.error); setOptions([]); return; }

        callback(response);
    }, 200), []);

    useEffect(() => {
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

    return (
        <div className={inputWraper}>
            <TextField
                className='searchFallenInput'
                value={searchValue}
                onChange={onChange}
                placeholder="שם החלל"
                variant="outlined"
                color="primary"
                InputProps={{
                    endAdornment: <Search color="primary" />
                }}
            />

            {showOptions && searchValue.length > 0 && (
                <List className={list}>
                    {options ? options.length > 0 ? options.map(fallen => (
                        <ListItem button key={fallen.id} onClick={() => onFallenClick(fallen)}>
                            <ListItemAvatar>
                                <Avatar src={fallen.image_link || "./images/fallenFallback.jpeg"} variant="rounded" />
                            </ListItemAvatar>
                            <ListItemText primary={fallen.name} secondary={fallen.heb_falling_date} />
                        </ListItem>
                    )) : (
                        <div className={loadingOrNoResults}>לא נמצאו תוצאות</div>
                    ) : (
                        <div className={loadingOrNoResults}>
                            <CircularProgress color="primary" value={70} />
                        </div>
                    )}
                </List>
            )}
        </div>
    );
};

const theme = createMuiTheme({
    direction: "rtl",
    palette: {
        primary: {
            main: "#19A099"
        }
    }
});

export default props => (
    <ThemeProvider theme={theme}>
        <SearchFallen {...props} />
    </ThemeProvider>
);