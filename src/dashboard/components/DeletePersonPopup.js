import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Auth from '../../modules/auth/Auth'
import '../style/popup.scss'

export default function DaletePersonPopup(props) {

    const [waitForData, setWaitForData] = useState(false)
    const [err, setErr] = useState(false)

    const deleteMeeting = async () => {
        setWaitForData(true)
        console.log(props.meetingId, props.participantId)
        let [success, err] = await Auth.superAuthFetch(
            `/api/meetings/deleteParticipant`,
            {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ meetingId: Number(props.meetingId), participantId: Number(props.participantId) })
            }, true);
        console.log("success", success)
        setWaitForData(false)
        if (err) {
            setErr(true)
            return
        }
        props.spliceFromArr(props.participantId)
        props.handleClose()
    }

    return (
        <div>
            <Dialog open={true} aria-labelledby="reset-modal">
                <div style={{ padding: ' 2vh 3vw', width: '35vw' }}>
                    <DialogContent>
                        <p className="text-center" style={{
                            fontSize: '2.9vh',
                            color: '#A5A4BF',
                            width: '100%',
                            direction: 'rtl'
                        }}>
                            האם אתה בטוח שברצונך למחוק משתתף זה?
                                </p>
                        <p className="text-center" style={{
                            color: '#A5A4BF',
                            fontSize: '2.5vh',
                            direction: 'rtl'
                        }}>
                            {/* יתכן שהמייל נשלח לספאם */}
                        </p>
                        {err && <div>לא הצלחנו למחוק את המשתתף. נסה שנית מאוחר יותר.</div>}
                    </DialogContent>
                    <DialogActions>
                        <div className='d-flex' style={{ width: '100%' }}>
                            <div
                                style={{ cursor: 'pointer', backgroundColor: 'var(--custom-dark-green)', padding: '3px 3vw', borderRadius: '10px', color: 'white', fontSize: '2.5vh' }}
                                onClick={() => {
                                    if (waitForData) return
                                    deleteMeeting()
                                }}>
                                {waitForData ?
                                    <div className="spinner">
                                        <div className="bounce1"></div>
                                        <div className="bounce2"></div>
                                        <div className="bounce3"></div>
                                    </div>
                                    : "מחק"
                                }
                                {/* {this.props.t("approval")} */}
                            </div>
                            <div
                                style={{ cursor: 'pointer', color: 'var(--custom-dark-green)', padding: '3px 10px', borderRadius: '10px', fontSize: '2.5vh', marginLeft: '2vw' }}
                                onClick={() => {
                                    props.handleClose()
                                }}>
                                ביטול
                            </div>
                        </div>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );
}