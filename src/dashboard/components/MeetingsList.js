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
                    {props.ManagerStore.meetings ?
                        (!props.ManagerStore.meetings.length ?
                            <div className='headLine'>לא נמצאו תוצאות</div> :

                            props.ManagerStore.meetings.map((meeting, index) =>
                                <tr key={index} className="tableBodyStyle">
                                    <td className='date'>{meeting.date}</td>
                                    <td className='time'>{meeting.time}</td>
                                    <td className='fallen'>
                                        {meeting.fallens && meeting.fallens.map((fallen, index) =>
                                            <span key={index}>{fallen.first_name + ' ' + fallen.last_name + (index === (meeting.fallens.length - 1) ? '' : ', ')}</span>
                                        )}
                                    </td>
                                    <td className='owner'>{meeting.meetingOwner.name}</td>
                                    <td className='relationship'>{meeting.relationship}</td>
                                    <td className='name'>{meeting.name}</td>
                                    <td className='peopleNum'>{meeting.people.length}</td>
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
                                        <img src={pen} />
                                    </td>
                                </tr>
                            )
                        )
                        : null}
                </tbody>
            </table>


        </div>
    )
}

export default inject('ManagerStore')(observer(MeetingsList))