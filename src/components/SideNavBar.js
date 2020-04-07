import React, { useState } from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import '../styles/sideNavBar.css'
import cancel from '../icons/cancel.svg'
import Auth from '../modules/auth/Auth';
import Language from './Language';

// component show the side nav bar with all the options of the student
const SideNavBar = (props) => {

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
                // onClick={props.toggleDrawer(false)}
                // onKeyDown={props.toggleDrawer(false)}
            >

                <List className='sideOptionsContainer d-flex flex-column justify-content-around'>
                    <img className="cancelIcon" src={cancel} alt={cancel}
                        onClick={props.toggleDrawer(false)} />
                     <div style={{width:'100%' , display:'flex' , justifyContent:'center'}}><Language changeLanguage={props.changeLanguage} mode2={true} /></div>

                    {props.options.map((text, index) => {
                        if (text === null) return null
                        return (
                            <ListItem index={index} button className='containSideListItem' key={text.option} onClick={() => {
                                props.toggleDrawer(false)
                                !text.open ?
                                    props.history.push(text.path) :
                                    window.open(text.path)
                            }}>
                                <ListItemText disableTypography className='optionTextContainer' primary={text.option} />
                            </ListItem>
                        )
                    })}

                </List>
            </div>
        </SwipeableDrawer>)
}

export default SideNavBar;
