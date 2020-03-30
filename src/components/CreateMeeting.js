import React, { useState, useEffect } from 'react';
import './styles/classDictionry.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import searchNotFound from './icons/notFound.svg'
import TopBar from './TopBar';
import { inject, observer } from 'mobx-react';
import InCheck from "./icons/in-Check.svg";
import New from "./icons/new.svg";


const CreateMeeting = (props) => {
    //const [AbcOnChange, setAbcOnChange] = useState(false);
    useEffect(() => {
        (async () => {
        })()
    }, []);

    return (
        <div
        // style={{ height: "100vh", width: "100vw" }}
        >

            creatennnnnnnnnnn
        </div>

    );

}

export default inject('StudentStore')(observer(CreateMeeting));