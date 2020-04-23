import React from 'react';
import { inject, observer } from 'mobx-react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import '../styles/sharing.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import envelope from '../icons/envelope.svg'

function AlertDialog(props) {
  const { openEmail, setOpenEmail } = props;
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [email, setEmail] = React.useState(null);
  const [isEmailNotLegal, setIsEmailNotLegal] = React.useState(false);
  const regex = RegExp(/^(.+)@(.+){2,}.(.+){2,}$/);
  const { shareWithEmail } = props;



  const handleCloseEmail = () => {
    setEmail('')
    setOpenEmail(false);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  const changeEmail = (event) => {
    const tagName = event.target.value;
    setEmail(tagName);
  }

  const checkEmail = () => {
    if (regex.test(email) === true) {
      //סגור חלון
      setIsEmailNotLegal(false);
      shareWithEmail(email);
      handleCloseEmail();
      setOpenSuccess(true)
    } else {
      //הצג ארור
      setIsEmailNotLegal(true);
    }
  }


  return (
    <div>
      <Dialog
        maxWidth='lg'
        open={openEmail}
        onClose={handleCloseEmail}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogContent style={{ direction: props.LanguageStore.lang !== 'heb' ? 'ltr' : 'rtl' }}
          className='popupSendEmail'>
          <DialogContentText id="alert-dialog-description">
            <div className='containXButton'><FontAwesomeIcon onClick={handleCloseEmail} icon={['fas', 'times']} style={{ fontSize: '1rem', cursor: 'pointer' }} /></div>
            <div className={props.LanguageStore.lang !== 'heb' ? 'tal shareEmailTitle2' : 'tar shareEmailTitle2'}>
              {props.LanguageStore.lang !== 'heb' ? "Please enter a friend's email here so we can invite them to the meet-up" : 'הכנס כאן את כתובת האימייל לשיתוף'}
            </div>
            <input onFocus={()=>{setIsEmailNotLegal(false)}} type="text" className='emailInputSharing' name="sendEmail" placeholder={props.LanguageStore.lang !== 'heb' ? "Email address" : 'כתובת הדואר האלקטרוני'} value={email} onChange={changeEmail} />
            <div className="invalidEmail">
              {isEmailNotLegal && props.LanguageStore.lang !== 'heb' ? 'Incorrect email address' : isEmailNotLegal ? 'כתובת המייל שגויה' : ''}
            </div>
          </DialogContentText>
        </DialogContent >
        <DialogActions className='popupSendEmail' id="sendButton">
          <div className='sendBtnSendEmail' onClick={checkEmail} autoFocus>
            {props.LanguageStore.lang !== 'heb' ? 'Share' : 'שתף'}
          </div>
        </DialogActions>
      </Dialog>


      <Dialog
        maxWidth='md'
        open={openSuccess}
        onClose={handleCloseSuccess}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogContent style={{ direction: props.LanguageStore.lang !== 'heb' ? 'ltr' : 'rtl' }}
          className='popupSendEmail'>
          <DialogContentText id="alert-dialog-description">
            <div style={{width:'40px' , margin: 'auto'}}><img src={envelope} width='100%'/></div>
            <div className='containXButton'><FontAwesomeIcon onClick={handleCloseSuccess} icon={['fas', 'times']} style={{ fontSize: '1rem', cursor: 'pointer' }} /></div>
            <div style={{padding:'1vh 2vw 4vh 2vw' , fontSize:'1.3em' , textAlign:'center'}} className={props.LanguageStore.lang !== 'heb' ? 'tal shareEmailTitle2' : 'tar shareEmailTitle2'}>
              {props.LanguageStore.lang !== 'heb' ? "The email was successfully sent" : 'האימייל נשלח בהצלחה'}
            </div>
          </DialogContentText>
        </DialogContent >
  
      </Dialog>
    </div>
  );
}

export default inject('LanguageStore')(observer(AlertDialog))