import React, { Component } from 'react';
import '../styles/sharing.scss';
import shareIt from '../icons/share.svg';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import whatsappIcon from '../icons/whatsapp.svg';
import facebookIcon from '../icons/facebook.svg';
import emailIcon from '../icons/email.svg';
import linkIcon from '../icons/link.svg';


export default function Sharing() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button id="sharingBox" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
      {/* <div className="sharingBox"> */}
        <img src={shareIt} width="30px" height="30px" />
        <span className="inviteSpan">הזמינו למפגש</span>
        {/* </div> */}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem  onClick={handleClose}><img width="20px" height="20px" src={whatsappIcon} id="platformIcon"/> <span id="platformName">Whatsapp</span> </MenuItem>
        <MenuItem  onClick={handleClose}><img width="20px" height="20px" src={facebookIcon} id="platformIcon"/> <span id="platformName">Facebook</span></MenuItem>
        <MenuItem  onClick={handleClose}><img width="20px" height="20px" src={emailIcon} id="platformIcon"/> <span id="platformName">דואר אלקטרוני</span></MenuItem>
        <MenuItem  onClick={handleClose}><img width="20px" height="20px" src={linkIcon} id="platformIcon"/> <span id="platformName">העתק קישור</span></MenuItem>      
      </Menu>
    </div>
  );
}
