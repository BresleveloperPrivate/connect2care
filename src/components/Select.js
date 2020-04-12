import React, { useState, useRef } from 'react'
import DownArrow from '../icons/Icon awesome-chevron-down.svg'
import useOnClickOutside from './UseOnClickOutside'
import '../styles/select.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Select = (props) => {
    const ref = useRef()
    useOnClickOutside(ref, () => setIsSelectOpen(false));

    const [selectedOption, setSelectedOption] = useState(props.default || null)
    const [isSelectOpen, setIsSelectOpen] = useState(false)

    return (
        <div onClick={() => setIsSelectOpen(isSelectOpen => !isSelectOpen)} className={"cursor " + props.className}
            style={{
                width: props.width, backgroundColor: props.backgroundColor ? props.backgroundColor :
                    props.changeBackground && selectedOption && selectedOption.data ? 'rgb(238, 238, 238)' : 'white',
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
                    <FontAwesomeIcon className={localStorage.getItem('lang') !== 'heb' ? "arrowInput-tal" : 'arrowInput-tar'}
                        icon={["fas", "chevron-down"]} />
                </div>
                {isSelectOpen &&
                    <div className='optionsContainer' style={{ backgroundColor: props.backgroundColor || 'white', color: props.color || 'unset' }}>
                        {props.arr && props.arr.map((value, index) =>
                            <div
                                className='selectOption'
                                key={index}
                                onClick={() => {
                                    if (value.option !== selectedOption) {
                                        props.onChoseOption(value)
                                        setSelectedOption(value)
                                    }

                                }}>
                                <div className='optionInSelect'>
                                    {value.option}
                                </div>
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
    )
}

export default Select