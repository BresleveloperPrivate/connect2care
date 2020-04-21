import React, { useState, useEffect, useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { inject, observer } from 'mobx-react';
import CompList from './computer'
import PhoneList from './MeetingsListPhone'

const ListOfMeetingsUser = (props) => {

    useEffect(() => {
        (async () => {
            await props.MeetingsStore.search()

        })()
    }, []);


    return (
        <div>
            {props.LanguageStore.width > 800 ?
                <CompList history={props.history} t={props.t} />
                :
                <PhoneList t={props.t} history={props.history} />
            }
        </div>

    );
}
export default inject('MeetingsStore' , 'LanguageStore')(observer(ListOfMeetingsUser));
