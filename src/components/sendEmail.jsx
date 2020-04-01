import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import '../styles/sharing.scss';


export default function AlertDialog(props) {
  const {openEmail, setOpenEmail} =  props;
  const [email, setEmail] = React.useState(null);
  const [isEmailNotLegal, setIsEmailNotLegal] = React.useState(false);
  const regex = RegExp(/^(.+)@(.+){2,}.(.+){2,}$/);
  const {shareWithEmail} = props;



  const handleCloseEmail = () => {
    setOpenEmail(false);
  };

  const changeEmail = (event) => {
    const tagName = event.target.value;
   setEmail(tagName);
    console.log('PIKA PI: ', tagName);
    console.log('OVED?', regex.test(email))
}

const checkEmail = () => {
    if (regex.test(email) === true){
        //סגור חלון
        setIsEmailNotLegal(false);
        shareWithEmail(email);
        handleCloseEmail();
        alert('המייל נשלח!');
    } else{
        //הצג ארור
        setIsEmailNotLegal(true);
    }
}


  return (
    <div>
      <Dialog
        open={openEmail}
        onClose={handleCloseEmail}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <input type="text" name="sendEmail" placeholder={"מייל לשליחה"} value={email} onChange={changeEmail}/>
          {isEmailNotLegal && <div className="invalidEmail">אנא הכנס מייל חוקי</div> }
          </DialogContentText>
        </DialogContent>
        <DialogActions id="sendButton">
          <Button onClick={checkEmail} color="primary" autoFocus>
            שלח
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}