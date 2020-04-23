import React from 'react';
import '../styles/sharing.scss';
import shareIt from '../icons/share.svg';
// import Button from '@material-ui/core/Button';
// import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import whatsappIcon from '../icons/whatsapp.svg';
import facebookIcon from '../icons/facebook.svg';
import emailIcon from '../icons/email.svg';
import linkIcon from '../icons/link.svg';
import Auth from '../modules/auth/Auth';
import SendEmail from './sendEmail.jsx';
import { useCopyToClipboard } from 'react-use';
import useOnClickOutside from './UseOnClickOutside'

// import greenBackground from '../icons/greenBackground.png'

//pass me this: styleObject = {
//buttonWidth: '?rem'
//fontSize: '?rem'
//imageWidth: '?px'
//imageHeight: '?px'
//} Make sure these are strings!

export default function Sharing(props) {
  const ref = React.useRef()
  useOnClickOutside(ref, () => setOpenShare(false));
  const [openShare, setOpenShare] = React.useState(false);

  const [openEmail, setOpenEmail] = React.useState(false);
  const [, copyToClipboard] = useCopyToClipboard();
  let url = `${process.env.REACT_APP_DOMAIN}/#/meeting/${props.data.meetingId}`

  const handleOpenEmail = () => {
    setOpenEmail(true);
  };

  const handleClick = () => {
    setOpenShare(!openShare);
  };

  const handleClose = () => {
    setOpenShare(false);
  };

  const { styleObject } = props;

  // const getViewport = () => {
  //   let width = Math.max(document.documentElement.clientWidth, window.outerWidth || 0);
  //   let height = Math.max(document.documentElement.clientHeight, window.outerHeight || 0);
  //   if (width >= 490 && height >= 490) return true;
  //   else return false;
  // }

  const shareWithWhatsApp = async () => {
    let text = null;
    if (props.data.fallens.length === 1)
      text = `הצטרפו אלינו למפגש zoom לזכרו של ${props.data.fallens[0].name} ז"ל`
    else {
      text = `הצטרפו אלינו למפגש zoom לזכרם של `
      props.data.fallens.map((x, index) => {
        if (index === 0) {
          text = text + `${x.name}`
        }
        else {
          if (index === props.data.fallens.length - 1) {
            text = text + ` ו${x.name}`
          }
          else {
            text = text + ` ,${x.name},`
          }
        }
      })
    }
    let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) {
      //whats app web:
      let urlApp = `${process.env.REACT_APP_DOMAIN}?id=${props.data.meetingId}`
      let linkText = text + ":" + urlApp;
      let href = `https://web.whatsapp.com/send?text=${linkText}`;
      window.open(href, '_blank');
    } else {
      //whatsapp App:
      let urlApp = `${process.env.REACT_APP_DOMAIN}?id=${props.data.meetingId}`
      let linkText = text + ":" + urlApp;
      let href = `whatsapp://send?text=${linkText}`;
      window.location.assign(href);
    }
    handleClose();
  };

  const shareWithEmail = async (passedEmail) => {
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

    <div style='color: white ; margin-top: 20px ; text-align: center; font-size: 16px;'>${props.data.date} | ${props.data.time}</div>

    <a style='text-decoration: none;' href='${url}' >
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
    handleClose();
  };

const setCopiesd=()=>{
  let ctc = document.getElementById('CTC')
  if(ctc){
    ctc.classList.remove('opacity')
    setTimeout(()=>{
      ctc.classList.add('opacity')
    },2500)
  }
}

  const shareWithFaceBook = async () => {

    window.FB.ui({
      method: 'share_open_graph',
      action_type: 'og.shares',
      action_properties: JSON.stringify({
        object: {
          'og:url': url,
          'og:image': `${process.env.REACT_APP_DOMAIN}/connect.jpg`
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



    <div ref={ref} style={{ position: 'relative' }}>
      <div id={props.myId} aria-controls="simple-menu" aria-haspopup="true" className='grow' onClick={handleClick} style={{ width: styleObject.buttonWidth, cursor: 'pointer', transition: 'transform 0.5s ease' }}>
        <div className={props.containImageClassName}><img src={shareIt} alt="alt" width='100%' height='100%' /></div>
        <span className="inviteSpan">
          
{props.t('share')}
          </span>

      </div>

      <div id='CTC' className='copied opacity'>
    {props.t('copied')}
      </div>
      {openShare ? <div className='containShareOptions'>

        <MenuItem className='shareOption' onClick={shareWithWhatsApp}><img width="20px" height="20px" src={whatsappIcon} id="platformIcon" /> <span id="platformName">Whatsapp</span> </MenuItem>
        <MenuItem className='shareOption' onClick={shareWithFaceBook}><img width="20px" height="20px" src={facebookIcon} id="platformIcon" /> <span id="platformName">Facebook</span></MenuItem>
        <MenuItem className='shareOption' onClick={handleOpenEmail}><img width="20px" height="20px" src={emailIcon} id="platformIcon" /> <span id="platformName">{props.t("email")}</span></MenuItem>
        <MenuItem className='shareOption'><img width="20px" height="20px" src={linkIcon} id="platformIcon" /> <span onClick={() => {
          copyToClipboard(`${process.env.REACT_APP_DOMAIN}?id=${props.data.meetingId}`)
          handleClose()
          setCopiesd()
          }} id="platformName">
        {props.t('copy')}
          </span></MenuItem>
      </div> : null}
      <SendEmail openEmail={openEmail}
          setOpenEmail={setOpenEmail}
          shareWithEmail={shareWithEmail} />
    </div>
  );
}
