import React, { useState } from 'react';

import { Card, CardContent, makeStyles, IconButton, Collapse } from '@material-ui/core';
import { Add, Remove } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    cardRoot: {
        boxShadow: '0px 3px 6px #00000029',
        marginBottom: 30,
        width: '75vw',

        '@media only screen and (max-width: 768px)': {
            width: 'auto',
            marginRight: '6vw'
        }
    },

    cardContentRoot: {
        '@media only screen and (min-width: 768px)': {
            paddingLeft: 100,
            paddingRight: 100
        }
    },

    infoCardTitle: {
        color: theme.palette.primary.main
    },

    iconButton: {
        outline: 'none !important'
    },

    text: {
        color: theme.palette.primary.dark,
        cursor: 'pointer'
    }
}));

const InfoCard = ({ title, children }) => {
    const [open, setOpen] = useState(false);
    const { cardRoot, cardContentRoot, iconButton, infoCardTitle, text } = useStyles();

    const handleClick = () => setOpen(open => !open);

    return (
        <Card className={`${cardRoot} margin-right-text`}>
            <CardContent className={cardContentRoot}>
                <div className="infoCardTop">
                    <div className={`${infoCardTitle} infoCardTitle`}>{title}</div>
                    <IconButton className={iconButton} onClick={handleClick} color="secondary">
                        {open ? <Remove /> : <Add />}
                    </IconButton>
                </div>
                <Collapse in={open}>
                    <hr />
                    <div className={text} onClick={handleClick}>
                        {children}
                    </div>
                </Collapse>
            </CardContent>
        </Card>
    );
}

export default InfoCard;