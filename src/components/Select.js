import React, { useState, useRef, useEffect } from 'react'
import DownArrow from '../icons/Icon awesome-chevron-down.svg'
import useOnClickOutside from './UseOnClickOutside'
import '../styles/select.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { inject, observer } from 'mobx-react';

import grass from '../icons/grass.png'
import ourBrothers from '../icons/ourBro.png'

const Select = (props) => {
    const ref = useRef()
    useOnClickOutside(ref, () => setIsSelectOpen(false));
    const disabled = props.disabled || false
    const [selectedOption, setSelectedOption] = useState(props.default || null)
    const [isSelectOpen, setIsSelectOpen] = useState(false)

    useEffect(() => {
    }, [props.selectTextDefault]);


    console.log("")
    if (props.defaultSelectRelative && (props.defaultSelectRelative !== props.selectTextDefault && props.selectTextDefault !== selectedOption)){
        setSelectedOption(props.selectTextDefault)
   
    }

    return (
        <div onClick={() => { if (!disabled) setIsSelectOpen(isSelectOpen => !isSelectOpen) }} className={"cursor " + props.className}
            style={{
                width: props.width, backgroundColor: props.backgroundColor ? props.backgroundColor :
                    props.changeBackground && selectedOption && selectedOption.data ? 'rgb(238, 238, 238)' : 'white',
                opacity: disabled ? 0.7 : 1
            }} ref={ref}>
            <div className={'selectContainer'}  >
                <div className='d-flex select align-items-center h-100'
                    style={{
                        backgroundColor: props.backgroundColor ? props.backgroundColor :
                            props.changeBackground && selectedOption && selectedOption.data ?
                                'rgb(238, 238, 238)' : 'white',
                        color: props.color || 'unset'
                    }}>
                    <div className={"selectInput " + (!selectedOption && props.selectTextDefault ? "changeDefauleSelectOpacity" : "")} style={{ width: '100%' }}>
                        {selectedOption && selectedOption.data ? selectedOption.option : props.selectTextDefault || 'בחר'}
                    </div>
                    {/* <img style={{ marginLeft: '1vw' }} className="arrowInput" src={DownArrow} alt='arrow' /> */}
                    <FontAwesomeIcon className={props.LanguageStore.lang !== 'heb' ? "arrowInput-tal" : 'arrowInput-tar'}
                        icon={["fas", "chevron-down"]} />
                </div>
                {isSelectOpen &&
                    <div className='optionsContainer' style={{ backgroundColor: props.backgroundColor || 'white', color: props.color || 'unset', maxHeight: props.maxHeight || null }}>
                        {props.arr && props.arr.map((value, index) =>
                            value ? <div
                                className='selectOption'
                                key={index}
                                onClick={() => {
                                    if (value.option !== selectedOption) {
                                        props.onChoseOption(value)
                                        setSelectedOption(value)
                                    }

                                }}>
                                <div className='optionInSelect'>
                                    {props.img &&
                                        <div className={props.LanguageStore.lang !== 'heb' ? 'containImgInSelect mr1' : 'containImgInSelect ml1'}>
                                            {props.img && value.data === 'בית אביחי' ?
                                                <img src={grass} width='140%' height='140%' />
                                                :
                                                props.img && value.data === 'האחים שלנו' ?
                                                    <img src={ourBrothers} width='140%' height='140%' />
                                                    : null}
                                        </div>}
                                    {value.option}
                                </div>
                            </div> : null
                        )}
                    </div>
                }
            </div>
        </div>
    )
}

export default inject('LanguageStore')(observer(Select));
