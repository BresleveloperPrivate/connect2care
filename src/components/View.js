import React from 'react';
import { inject, observer } from 'mobx-react';
import matrix from '../icons/matrix.svg'
import list from '../icons/list.svg'
import matrixGray from '../icons/matrix-gray.svg'
import listGray from '../icons/list-gray.svg'

const View = (props) => {
    return (
        props.MeetingsStore.view === 1 ?
            <div style={{ width: '100%', display: 'flex', marginTop: '3vh', direction: 'ltr', alignItems: 'center' }}>
                <div className='circle paddingCircle'  onClick={props.MeetingsStore.setView} style={{ height: '3vw', width: '3vw', display: 'flex', cursor: 'pointer' }}>
                    <img src={listGray} height='120%' width='120%' />
                </div>
                <div className='paddingCircle' style={{ height: '3vw', width: '3vw', display: 'flex', cursor: 'pointer', marginLeft: '5px' }}>
                    <img src={matrix} height='100%' width='100%' />
                </div>
            </div>

            :

            <div style={{ width: '100%', display: 'flex', marginTop: '3vh', direction: 'ltr', alignItems: 'center' }}>
                <div className='paddingCircle' style={{ height: '3vw', width: '3vw', display: 'flex', cursor: 'pointer' }}>
                    <img src={list} height='120%' width='120%' />
                </div>
                <div className='circle paddingCircle'  onClick={props.MeetingsStore.setView} style={{ height: '3vw', width: '3vw', display: 'flex', cursor: 'pointer', marginLeft: '5px' }}>
                    <img src={matrixGray} height='100%' width='100%' />
                </div>
            </div>
    );
}

export default inject('MeetingsStore', 'LanguageStore')(observer(View));
