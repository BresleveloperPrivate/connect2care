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
import Auth from '../modules/auth/Auth';

//pass me this: styleObject = {
    //buttonWidth: '?rem'
    //fontSize: '?rem'
    //imageWidth: '?px'
    //imageHeight: '?px'
//} Make sure these are strings!

export default function Sharing(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { styleObject } = props;

  const copyToClipboard = (str) => {
    // Create new element
    let el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
  }

  const shareWithWhatsApp = async () => {
    const text = `הי, נרשמתי למאגר מתנדבים של המדינה. עושים הכל לסייע בתקופה של הקורונה, זה מהיר ונגיש לכל העמותות כך שלא צריך להרשם במליון מקומות… תצטרף גם? מצא 20 חברים ושלח להם את הקישור הבא:`
    // const linkText = text + " " + this.state.inviteLink;
    const linkText = text + " " + "https://github.com/";
    const href = `whatsapp://send?text=${linkText}`;
    window.location.href = href;
    handleClose();
  };

  const shareWithEmail = async () => {
    let senderName = "מתחברים וזוכרים"
    let sendOptions = { to: 'reshit@carmel6000.amitnet.org', subject: 'dsfdsfds', html: '<h1>בדיקה</h1>' }
    let [res, err] = await Auth.superAuthFetch('api/meetings/SendShareEmail', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        senderName: senderName, sendOptions: sendOptions
      })
    })
    console.log(res, err)
    handleClose();
  };

  const shareWithFaceBook = async () => {
    window.open('https://www.facebook.com/sharer/sharer.php?u=https://lohamim.carmel6000.com', '_blank');
    handleClose();
  };

  return (
    <div>
      <Button id="sharingBox" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{width: styleObject.buttonWidth, fontSize: styleObject.fontSize}}>
      {/* <div className="sharingBox"> */}
        <img src={shareIt} width={styleObject.imageWidth} height={styleObject.imageHeight} />
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
        <MenuItem onClick={shareWithWhatsApp}><img width="20px" height="20px" src={whatsappIcon} id="platformIcon" /> <span id="platformName">Whatsapp</span> </MenuItem>
        <MenuItem onClick={shareWithFaceBook}><img width="20px" height="20px" src={facebookIcon} id="platformIcon" /> <span id="platformName">Facebook</span></MenuItem>
        <MenuItem onClick={shareWithEmail}><img width="20px" height="20px" src={emailIcon} id="platformIcon" /> <span id="platformName">דואר אלקטרוני</span></MenuItem>
        <MenuItem onClick={copyToClipboard("sfsfsfsfsfsaf")}><img width="20px" height="20px" src={linkIcon} id="platformIcon" /> <span id="platformName">העתק קישור</span></MenuItem>

      </Menu>
    </div>
  );
}
