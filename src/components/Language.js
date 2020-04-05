/* <div className='optionInNavbar grow-bold pointer' onClick={() => { this.props.changeLanguage("heb"); this.setOptions() }} >עברית</div>
    <div className='optionInNavbar grow-bold pointer' onClick={() => { this.props.changeLanguage("en"); this.setOptions() }} >אנגלית</div>
    <div className='optionInNavbar grow-bold pointer' onClick={() => { this.props.changeLanguage("en"); this.setOptions() }} >רוסית</div> */

import React, { useState, useRef } from 'react'
import '../styles/animations.scss'
import { inject, observer } from 'mobx-react';
// import DownArrow from '../icons/Icon awesome-chevron-down.svg'
import useOnClickOutside from './UseOnClickOutside'
import '../styles/select.css'

const useForceUpdate = () => useState()[1];
const Language = (props) => {
    // This function open the side nav bar or close it, depends of the situation
    // toggleDrawer = (open) => event => {
    //     if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //         return;
    //     }
    //     this.setState({ right: open })
    // };

    // setOptions = () => {
    
    // }



    const ref = useRef()

    useOnClickOutside(ref, () => setIsSelectOpen(false));
    
    const [isSelectOpen, setIsSelectOpen] = useState(false)

    return (
        <div style={{ width: 'fit-content' }} onClick={() => setIsSelectOpen(isSelectOpen => !isSelectOpen)}
            ref={ref}>
            <div className='selectContainer' style={{ width: '90px', fontSize: '0.8em' }} >
                <div className='d-flex select align-items-center h-100'>
                    <div className="selectInput" style={{ width: '100%', display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '1vh 2vh', color: props.mode2 ? 'white' : null }}>
                        <div style={{ height: '1.2em', width: '1.2em', marginLeft: '0.4em', display: 'flex' }}><img style={{ borderRadius: '50%', objectFit: 'cover' }} height='100%' width='100%' src={props.LanguageStore.Options[props.LanguageStore.selectedIndex].img} /></div>
                        {props.LanguageStore.Options[props.LanguageStore.selectedIndex].option}
                    </div>
                    {/* <img style={{ marginLeft: '1vw' }} className="arrowInput" src={DownArrow} alt='arrow' /> */}
                </div>
                {isSelectOpen &&
                    <div className='optionsContainer' style={{ backgroundColor: props.backgroundColor || 'white', color: props.color || 'unset' }}>
                        {props.LanguageStore.Options.map((value, index) =>
                            <div style={{ cursor: 'pointer' }}
                                className='selectOption'
                                key={index}
                                onClick={() => {
                                    props.changeLanguage(value.short)
                                    //   this.setOptions()
                                    props.LanguageStore.setSelectedIndex(index)
                                    // forceUpdate()
                                }}>
                                <div style={{ display: 'flex', alignItems: 'center' }} className='optionInSelect'>
                                    <div style={{ height: '1.2em', width: '1.2em', marginLeft: '0.4em', display: 'flex' }}><img style={{ borderRadius: '50%', objectFit: 'cover' }} height='100%' width='100%' src={value.img} /></div>
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

export default inject('LanguageStore')(observer(Language))