import React, { useState, useEffect, useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { inject, observer, PropTypes } from 'mobx-react';
import CompList from './MeetingsListComp'
import PhoneList from './MeetingsListPhone'

const ListOfMeetingsUser = (props) => {

    const [width, setWidth] = useState(false)

    useEffect(() => {
        (async () => {
            window.addEventListener('resize', onResize, false)
            await props.MeetingsStore.search()

        })()
    }, []);

    const onResize = (e) => {
        setWidth(e.target.innerWidth)
        console.log(e.target.innerWidth)
    }

    return (
        <div>
            {width > 550 ?
                <CompList t={props.t} />
                :
                <PhoneList t={props.t}/>
            }
        </div>

    );
}
export default inject('MeetingsStore')(observer(ListOfMeetingsUser));
