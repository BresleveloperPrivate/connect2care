import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import openImage from '../icons/openImage.png'
import lightBlueBackground from '../icons/lightBlueBackground.png'
import lightBlueBackgroundEn from '../icons/lightBlueBackgroundEn.png'

import OptionsButtons from './OptionsButtons'
import '../styles/openingImage.css'

class openingImage extends Component {

    componentDidMount = () => {
        let c = document.getElementById('OIB')
        if (c) {
            let img = new Image;
            img.src = openImage;
            img.onload = function () {
                c.classList.remove('openingImage-before')
                c.classList.add('openingImage-after')
            }
        }
    }

    render() {
        return (
            <div className='containOpening'>
                {/*
                <div id='OIB' className='openingImage-before'> </div>

                <img className={this.props.LanguageStore.lang !== 'heb' ? 'lightBlueBackgroundEn' : 'lightBlueBackground'}
                    src={this.props.LanguageStore.lang !== 'heb' ? lightBlueBackgroundEn : lightBlueBackground} />

                <div className={this.props.LanguageStore.lang !== 'heb' ? 'whiteLineEn' : 'whiteLine'}> </div>
                <OptionsButtons t={this.props.t} className='containOptions' />
                */}
            </div>
        );
    }
}

export default inject('LanguageStore')(observer(openingImage))