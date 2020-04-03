import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import "../styles/errorMethod.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const ErrorMethod = (props) => {

    useEffect(() => {
        setTimeout(() => props.CreateMeetingStore.setError(false), 10000)
        return () => {
            props.CreateMeetingStore.setError(false)
        }
    }, [props.CreateMeetingStore.error]);

    return (
        <div className='errorMsg'>
            <FontAwesomeIcon className="errorMsgIcon"
                icon={["fas", "times"]}
                onClick={() => {
                    props.CreateMeetingStore.setError(false)
                }} />
            {props.CreateMeetingStore.error}
        </div>
    )
}

export default inject('CreateMeetingStore')(observer(ErrorMethod));