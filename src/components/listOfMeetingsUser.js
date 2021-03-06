import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import CompList1 from './computer'
import CompList2 from './MeetingsListComp'

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
                props.MeetingsStore.view === 1?
                <CompList1 history={props.history} t={props.t} />
                :
                <CompList2 history={props.history} t={props.t} />

                :
                <PhoneList t={props.t} history={props.history} />
            }
        </div>

    );
}
export default inject('MeetingsStore' , 'LanguageStore')(observer(ListOfMeetingsUser));
