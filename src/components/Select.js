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
                <div className='d-flex select align-items-center h-100'>
                    <div style={{ width: '100%' }}>{selectedOption || props.selectTextDefault || 'בחר'}</div>
                    <img src={DownArrow} alt='arrow' />
                </div>
                {isSelectOpen &&
                    <div className='optionsContainer'>
                        {props.arr && props.arr.map((value, index) =>
                            <div
                                className='selectOption'
                                key={index}
                                onClick={() => {
                                    props.onChoseOption(value)
                                    setSelectedOption(value.option)
                                }}>
                                <div style={{ margin: '1vh 2vh' }}>
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