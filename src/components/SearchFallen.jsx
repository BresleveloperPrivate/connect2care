import React, { useCallback, useState, useMemo, useEffect } from 'react';

import { TextField, createMuiTheme, ThemeProvider, List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import { Search } from "@material-ui/icons";
import throttle from 'lodash/throttle';

import Auth from '../modules/auth/Auth';

import { useCreateMeetingStore } from '../stores/createMeeting.store';

const SearchFallen = () => {
    const [searchValue, setSearchValue] = useState('');
    const [options, setOptions] = useState([]);

    const createMeetingStore = useCreateMeetingStore();

    const onChange = useCallback(event => {
        setSearchValue(event.target.value);
        createMeetingStore.changeFallenName(event);
    }, []);

    const fetch = useMemo(() => throttle(async (value, callback) => {
        const [response, error] = await Auth.superAuthFetch(`/api/fallens/SearchFallen`, {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ value })
        });

        if (error || response.error) { console.error('ERR:', error || response.error); setOptions([]); return; }

        callback(response);
    }, 500), []);

    useEffect(() => {
        let active = true;

        if (searchValue === '') {
            setOptions([]);
            return undefined;
        }

        fetch(searchValue, options => {
            if (active) { setOptions(options || []); }
        });

        return () => {
            active = false;
        };
    }, [searchValue, fetch]);

    return (
        <div>
            <TextField
                value={searchValue}
                onChange={onChange}
                placeholder="שם החלל"
                variant="outlined"
                color="primary"
                InputProps={{
                    endAdornment: <Search color="primary" />
                }}
            />
            <div>
                <List>
                    {options.map(fallen => (
                        <ListItem button key={fallen.id}>
                            <ListItemAvatar>
                                <Avatar src={fallen.image_link || "./images/fallenFallback.jpeg"} />
                            </ListItemAvatar>
                            <ListItemText primary={fallen.name} secondary={fallen.heb_falling_date} />
                        </ListItem>
                    ))}
                </List>
            </div>
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