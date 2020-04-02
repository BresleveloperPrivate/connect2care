import React, { useCallback, useState, useMemo, useEffect } from 'react';

import { TextField, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Search } from "@material-ui/icons";
import throttle from 'lodash/throttle';

import Auth from '../modules/auth/Auth';

const SearchFallen = () => {
    const [searchValue, setSearchValue] = useState('');
    const [options, setOptions] = useState([]);

    const onChange = useCallback(event => setSearchValue(event.target.value), []);

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

    console.log(options);

    return (
        <>
            <TextField
                value={searchValue}
                onChange={onChange}
                label="שם החלל"
                variant="outlined"
                color="primary"
                InputProps={{
                    endAdornment: <Search color="primary" />
                }}
            />
        </>
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