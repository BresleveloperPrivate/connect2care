import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Auth from '../../modules/auth/Auth'

export default function DaletePersonPopup(props) {

    const [waitForData, setWaitForData] = useState(false)
    const [err, setErr] = useState(false)

    const deleteMeeting = async () => {
        setWaitForData(true)
        let [success, err] = await Auth.superAuthFetch(
            `/api/meetings/deleteParticipant`,
            {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ meetingId: Number(props.meetingId), participantId: Number(props.participantId) })
            }, true);
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
                <div style={{ padding: '10px' }}>
                    <DialogContent>
                        <p className="text-center" style={{
                            fontSize: '3.5vh',
                            color: '#168ec4',
                            width: '100%'
                        }}>
                            ?האם אתה בטוח שברצונך למחוק משתתף זה
                                </p>
                        <p className="text-center" style={{
                            color: '#168ec4',
                            fontSize: '20px',
                        }}>
                            {/* יתכן שהמייל נשלח לספאם */}
                        </p>
                        {err && <div>לא הצלחנו למחוק את המשתתף. נסה שנית מאוחר יותר.</div>}
                    </DialogContent>
                    <DialogActions>
                        <div className='d-flex' style={{ width: '100%' }}>
                            <div
                                style={{ cursor: 'pointer', backgroundColor: 'var(--custom-orange)', padding: '3px 10px', borderRadius: '10px', color: 'white', fontSize: '20px' }}
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
                                style={{ cursor: 'pointer', color: 'var(--custom-orange)', padding: '3px 10px', borderRadius: '10px', fontSize: '20px', marginLeft: '2vw' }}
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