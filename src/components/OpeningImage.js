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
                <div style={{
                    position: 'absolute', right: '10%', bottom: '30%'
                }}>.גם השנה .במיוחד השנה מתחברים וזוכרים</div>
                <OptionsButtons className='containOptions' />

            </div>

        );
    }
}

export default openingImage;