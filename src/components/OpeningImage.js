import React, { Component } from 'react';
import openImage from '../icons/openImage.png'
import lightBlueBackground from '../icons/lightBlueBackground.png'
import OptionsButtons from './OptionsButtons'
import '../styles/openingImage.css'

class openingImage extends Component {

    render() {
        return (

            <div className='openingImage'>
                {/* <img className='openingImage' src={openImage} width='100%' /> */}
                <img className='lightBlueBackground' src={lightBlueBackground} />
                <div className='whiteLine'> </div>
                <OptionsButtons t={this.props.t} className='containOptions' />

            </div>

        );
    }
}

export default openingImage;