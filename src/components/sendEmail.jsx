import React from 'react';
import { inject, observer } from 'mobx-react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import '../styles/sharing.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function AlertDialog(props) {
  const { openEmail, setOpenEmail } = props;
  const [email, setEmail] = React.useState(null);
  const [isEmailNotLegal, setIsEmailNotLegal] = React.useState(false);
  const regex = RegExp(/^(.+)@(.+){2,}.(.+){2,}$/);
  const { shareWithEmail } = props;



  const handleCloseEmail = () => {
    setOpenEmail(false);
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
      alert('המייל נשלח!');
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
            <div className='containXButton'><FontAwesomeIcon onClick={() => { handleCloseEmail() }} icon={['fas', 'times']} style={{ fontSize: '1rem', cursor: 'pointer' }} /></div>
            <div className={props.LanguageStore.lang !== 'heb' ? 'tal shareEmailTitle2' : 'tar shareEmailTitle2'}>
              הכנס כאן את כתובת האימייל לשיתוף
            </div>
            <input type="text" className='emailInputSharing' name="sendEmail" placeholder={props.LanguageStore.lang !== 'heb' ?"Email address":'כתובת הדואר האלקטרוני'} value={email} onChange={changeEmail} />
            {isEmailNotLegal && <div className="invalidEmail">אנא הכנס מייל חוקי</div>}
          </DialogContentText>
        </DialogContent >
        <DialogActions className='popupSendEmail' id="sendButton">
          <div className='sendBtnSendEmail grow' onClick={checkEmail} autoFocus>
            {props.LanguageStore.lang !== 'heb' ? 'Share' : 'שתף'}
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default inject('LanguageStore')(observer(AlertDialog))