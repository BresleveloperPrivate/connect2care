import React from 'react'
import { inject, observer } from 'mobx-react';
import pen from '../icons/pen.svg';
import lock from '../../icons/lock.svg';

const MeetingsList = (props) => {

    return (
        <div>
            <table className="allTableStyle">
                <tbody>
                    <tr className="tableHead">
                        <th>תאריך</th>
                        <th>שעה</th>
                        <th>חללים</th>
                        <th>שם המנחה</th>
                        <th>קרבה</th>
                        <th>שם המפגש</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    {!props.ManagerStore.meetings ?
                        props.ManagerStore.loading ?
                            <tr className='headLine'>
                                <td colSpan="9" className='noRes'>
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">טוען...</span>
                                    </div>
                                </td>
                            </tr> :
                            <tr className='headLine'>
                                <td colSpan="9" className='noRes'>אירעה שגיאה, נסה שנית מאוחר יותר</td>
                            </tr> :
                        (!props.ManagerStore.meetings.length ?
                            <tr className='headLine'>
                                <td colSpan="9" className='noRes'>לא נמצאו תוצאות</td>
                            </tr> :

                            props.ManagerStore.meetings.map((meeting, index) =>
                                <tr key={index} className="tableBodyStyle">
                                    <td className='date'>{meeting.date && meeting.date.split(', ')[2]}</td>
                                    <td className='time'>{meeting.time}</td>
                                    <td className='fallen'>
                                        {meeting.fallens_meetings && meeting.fallens_meetings.map((fallenMeeting, index) =>
                                            <span key={index}>{fallenMeeting.fallens.name + (index === (meeting.fallens_meetings.length - 1) ? '' : ', ')}</span>
                                        )}
                                    </td>
                                    <td className='owner'>{meeting.meetingOwner && meeting.meetingOwner.name}</td>
                                    <td className='relationship'>{meeting.fallens_meetings && meeting.fallens_meetings.map((fallenMeeting, index) =>
                                        <span key={index}>{fallenMeeting.relationship + (index === (meeting.fallens_meetings.length - 1) ? '' : ', ')}</span>
                                    )}{meeting.relationship}</td>
                                    <td className='name'>{meeting.name}</td>
                                    <td className='peopleNum'>{meeting.participants_num}</td>
                                    <td className='isOpen'>
                                        {meeting.isOpen ? '' :
                                            <div
                                                style={{
                                                    width: "1.5vh",
                                                    height: "1.5vh",
                                                    WebkitMaskSize: "1.5vh 1.5vh",
                                                    background: 'var(--custom-gray)',
                                                    WebkitMaskImage: `Url(${lock})`
                                                }} >
                                            </div>
                                        }
                                    </td>
                                    <td className='edit'>
                                        <img alt="alt" src={pen} />
                                    </td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            {props.ManagerStore.readMore ?
                <div
                    className='readMore'
                    onClick={() => {
                        (async () => {
                            await props.ManagerStore.fetchMeetingsDashboard({}, true)
                        })()
                    }}>
                    טען עוד
                </div> : null
            }
        </div>
    )
}

export default inject('ManagerStore')(observer(MeetingsList))