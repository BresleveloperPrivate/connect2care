import React, { useState, useRef } from 'react'
import DownArrow from '../icons/Icon awesome-chevron-down.svg'
import useOnClickOutside from './UseOnClickOutside'
import '../styles/select.css'

const Select = (props) => {
    const ref = useRef()
    useOnClickOutside(ref, () => setIsSelectOpen(false));

    const [selectedOption, setSelectedOption] = useState(null)
    const [isSelectOpen, setIsSelectOpen] = useState(false)

    return (
        <div className={"cursor " + props.className} style={{ width: props.width }} ref={ref}>
            <div className='selectContainer' onClick={() => setIsSelectOpen(isSelectOpen => !isSelectOpen)}>
                <div className='d-flex select align-items-center h-100' style={{ backgroundColor: props.backgroundColor || 'white', color: props.color || 'unset' }}>
                    <div className="selectInput" style={{ width: '100%' }}>{selectedOption || props.selectTextDefault || 'בחר'}</div>
                    <img className="arrowInput" src={DownArrow} alt='arrow' />
                </div>
                {isSelectOpen &&
                    <div className='optionsContainer' style={{ backgroundColor: props.backgroundColor || 'white', color: props.color || 'unset' }}>
                        {props.arr && props.arr.map((value, index) =>
                            <div
                                className='selectOption'
                                key={index}
                                onClick={() => {
                                    props.onChoseOption(value)
                                    setSelectedOption(value.option)
                                }}>
                                <div style={{ padding: '1vh 2vh' }}>
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