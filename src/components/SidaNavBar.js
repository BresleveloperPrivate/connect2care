import React, { useState } from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import '../styles/sideNavBar.css'
import cancel from '../icons/cancel.svg'
import Auth from './../modules/auth/Auth';

// component show the side nav bar with all the options of the student
const SideNavBar = (props) => {
    const navBarOptions = [
        { name: "עמוד הבית", path: '/' },
        { name: "המילון הכיתתי", path: '/dictionry-class' },
        { name: "מילון אישי", path: '/personal-dictionry' },
        { name: "אודות", path: '/about' },
        { name: "צור קשר", path: '/' }
    ]

    const logOut = async () => {
        Auth.logout(() => {
            let path = "/"
            if (window.location.hash === "") //normal 
            {
                if (window.location.pathname === path) {
                    window.location.reload(false);
                }
                else {
                    window.location.pathname = path;
                }
            }
            else //hash is probably #/, cordova and hash router case.
            {
                if (window.location.hash === ("#" + path)) {
                    window.location.reload(false);
                }
                else {
                    window.location.hash = "#" + path;
                }
            }
        });
    }


    return (
        <SwipeableDrawer
            anchor="right"
            open={props.right}
            onClose={props.toggleDrawer(false)}
            onOpen={props.toggleDrawer(true)}
        >
            <div
                className="outerSidebarContainer"
                role="presentation"
                onClick={props.toggleDrawer(false)}
                onKeyDown={props.toggleDrawer(false)}
            >
                <List className='sideOptionsContainer d-flex flex-column justify-content-around'>
                    <img className="cancelIcon" src={cancel} alt={cancel}
                        onClick={props.toggleDrawer(false)} />
                    {navBarOptions.map((text, index) => {
                        if (text === null) return null
                        return (
                            <ListItem index={index} button className='containSideListItem' key={text.name} onClick={() => {
                                props.history.push(text.path)
                            }}>
                                <ListItemText disableTypography className='optionTextContainer' primary={text.name} />
                            </ListItem>
                        )
                    })}
                    <ListItem index={navBarOptions.length} button className='containSideListItem' key='התנתק' onClick={logOut}>
                        <ListItemText disableTypography className='optionTextContainer' primary='התנתק' />
                    </ListItem>
                </List>
            </div>
        </SwipeableDrawer>)
}

export default SideNavBar;
