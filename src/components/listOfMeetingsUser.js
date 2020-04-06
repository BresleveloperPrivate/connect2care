import React, { useState, useEffect, useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { inject, observer, PropTypes } from 'mobx-react';
import CompList from './MeetingsListComp'
import PhoneList from './MeetingsListPhone'

const ListOfMeetingsUser = (props) => {

    useEffect(() => {
        (async () => {
            await props.MeetingsStore.search()

        })()
    }, []);


    return (
        <div>
            {props.LanguageStore.width > 550 ?
                <CompList t={props.t} />
                :
                <PhoneList t={props.t}/>
            }
        </div>

    );
}
export default inject('MeetingsStore' , 'LanguageStore')(observer(ListOfMeetingsUser));
