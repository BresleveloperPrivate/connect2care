import React from 'react';
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
import SendEmail from './sendEmail.jsx';
import { useCopyToClipboard } from 'react-use';
// import greenBackground from '../icons/greenBackground.png'

//pass me this: styleObject = {
//buttonWidth: '?rem'
//fontSize: '?rem'
//imageWidth: '?px'
//imageHeight: '?px'
//} Make sure these are strings!

export default function Sharing(props) {

  console.log(props.data)
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [openEmail, setOpenEmail] = React.useState(false);
  const [, copyToClipboard] = useCopyToClipboard();


  const handleOpenEmail = () => {
    setOpenEmail(true);
  };

  // const handleCloseEmail = () => {
  //   setOpenEmail(false);
  // };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { styleObject } = props;

  const shareWithWhatsApp = async () => {
    let name = 'דוד'
    const text =

      `
היי, אתה מוזמן למפגש Zoom לזכרו של ${props.data.name} ז"ל
    `
    // const linkText = text + " " + this.state.inviteLink;
    const linkText = text + "https://github.com/";
    const href = `whatsapp://send?text=${linkText}`;
    window.location.href = href;
    handleClose();
  };

  const shareWithEmail = async (passedEmail) => {
    console.log('CHECK: ', passedEmail);
    let senderName = "מתחברים וזוכרים"
    let string = `הוזמנת להשתתף במפגש Zoom - מתחברים וזוכרים`
    let fallens = ''
    for (let i = 0; i < props.data.fallens.length; i++) {
      if (i === 0) {
        fallens = fallens + ` ${props.data.fallens[i].name} ז"ל`
      }
      else if (i === props.data.fallens.length - 1) {
        fallens = fallens + ` ו${props.data.fallens[i].name} ז"ל`
      }
      else {
        fallens = fallens + `, ${props.data.fallens[i].name} ז"ל`
      }
    }
    let sendOptions = {
      to: passedEmail, subject: string, html:
        `
    <div style='width: 100%; max-width: 400px; height: fit-content ;  padding-bottom: 30px;
     background-color: #082551; direction: rtl'>
    <div style='display: flex ; width: 100%' >
      <div style='width: 100%;' >
        <img style='margin-right: 10%; margin-top: 10%;' width='60%' src="https://i.ibb.co/VqRC2ZS/green-Background.png" > 
      </div>
      <div style='width: 30%;' >
        <img width='100%' src="https://i.ibb.co/FByFZfx/New-Project-3-1.png"  > 
      </div>
    </div>
    <div style='color: white; font-size: 20px; width: 73%; margin: auto; margin-top: 20px; text-align: center;'> 
    היי, מחכים לך במפגש Zoom שלנו לזכר <br>
    <div style='font-size: 27px'><strong>${fallens}. </strong></div>
    </div>

    <div style='color: white ; margin-top: 20px ; text-align: center; font-size: 16px;'>${props.data.meetingDate} | ${props.data.meetingHour}</div>

    <a style='text-decoration: none;' href='lohamim.carmel6000.com/#/meeting/${props.data.meetingId}' >
     <div style=' margin: auto;
      width: fit-content;
       background-color: #19A099 ;
        padding: 5px 15px;
         border-radius: 100px ;
          font-size: 15px;
           color: white;
           margin-top: 40px;
           '  >לפרטים נוספים והצטרפות למפגש </div>
      </a>
    
    </div>
    ` }
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

    window.FB.ui({
      method: 'share_open_graph',
      action_type: 'og.shares',
      action_properties: JSON.stringify({
        object: {
          'og:url': `https://lohamim.carmel6000.com/#/meeting/${props.meetingId}?og_img=https://lohamim.carmel6000.com/connect.png`,
          'og:image': 'http://lohamim.carmel6000.com/connect.png'
        }
      })
    })
    // window.FB.ui({
    //   method: 'share_open_graph',
    //   action_type: 'og.shares',
    //   display: 'popup',
    //   action_properties: JSON.stringify({
    //     object: {
    //       'og:url': 'https://lohamim.carmel6000.com/#/?og_img=http://izkorcdn.azureedge.net/Data/korot/Image/506173.jpg',
    //       'og:title': 'crap in pita',
    //       'og:description': 'not tasty',
    //       'og:image': 'http://izkorcdn.azureedge.net/Data/korot/Image/506173.jpg'
    //     }
    //   })
    // }, function(response) {
    //   // Action after response
    //   console.log("res fb",response)
    // });
    // window.open('https://www.facebook.com/sharer/sharer.php?u=https://lohamim.carmel6000.com', '_blank');
    handleClose();
  };

  return (
    <div className="pointer containSharing">
      <div id={props.myId} aria-controls="simple-menu" aria-haspopup="true" className='grow' onClick={handleClick} style={{ width: styleObject.buttonWidth, transition: 'transform 0.5s ease' }}>
        {/* <div className="sharingBox"> */}
        <div className={props.containImageClassName}><img src={shareIt} alt="alt" width='100%' height='100%' /></div>
        <span className="inviteSpan">הזמינו למפגש</span>
        {/* </div> */}
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={shareWithWhatsApp}><img width="20px" height="20px" src={whatsappIcon} id="platformIcon" /> <span id="platformName">Whatsapp</span> </MenuItem>
        <MenuItem onClick={shareWithFaceBook}><img width="20px" height="20px" src={facebookIcon} id="platformIcon" /> <span id="platformName">Facebook</span></MenuItem>
        <MenuItem onClick={handleOpenEmail}><img width="20px" height="20px" src={emailIcon} id="platformIcon" /> <span id="platformName">דואר אלקטרוני</span></MenuItem>
        <MenuItem ><img width="20px" height="20px" src={linkIcon} id="platformIcon" /> <span onClick={() => copyToClipboard("aaaaaaaaa")} id="platformName">העתק קישור</span></MenuItem>

        <SendEmail openEmail={openEmail}
          setOpenEmail={setOpenEmail}
          shareWithEmail={shareWithEmail} />
      </Menu>


    </div>
  );
}
