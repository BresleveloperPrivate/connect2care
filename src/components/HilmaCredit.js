import React from 'react';
import hilmaWhite from '../icons/hilmaWhite.png'
import { observer, inject } from 'mobx-react';

const HilmaCredit = (props) => {
    return (
        <div
            className={"hilmaCredit " + (props.colorCredit === "white" ? "hilmaCredit-white " : " ") + (props.LanguageStore.lang !== 'heb' ? 'fdrr App-ltr ' : 'App-rtl ') + (props.LanguageStore.lang !== 'heb' ? ' fontSizeCreditEn' : '')}>
            {props.t('blueFooter')}
            <div style={{ height: '1em', marginRight: '4vw', display: 'flex', zIndex: '5' }}>
                <div style={{
                    width: "4em",
                    height: "100%",
                    WebkitMaskSize: "4em 100%",
                    background: (props.colorCredit === "white") ? 'var(--custom-dark-blue)' : 'white',
                    WebkitMaskImage: `Url(${hilmaWhite})`
                }}></div>
            </div>
        </div>
    )
}

export default inject('LanguageStore')(observer(HilmaCredit));