import React, { Component } from 'react';
import openImage from '../icons/openImage.png'
import lightBlueBackground from '../icons/lightBlueBackground.png'
import OptionsButtons from './OptionsButtons'
import '../styles/openingImage.css'

class openingImage extends Component {

componentDidMount=()=>{
    // document.addEventListener("DOMContentLoaded", function() {
        let c = document.getElementById('OIB')
        console.log(c)
        if(c){
            let img = new Image;
            img.src = openImage;
            img.onload = function () {
              c.classList.remove('openingImage-before')
              c.classList.add('openingImage-after')
            }
        }
       
    //   });
}

    render() {
        return (
            <div className='containOpening'>
                <div id='OIB' className='openingImage-before'> </div>

                <img className='lightBlueBackground' src={lightBlueBackground} />
                <div className='whiteLine'> </div>
                <OptionsButtons t={this.props.t} className='containOptions' />

            </div>
        );
    }
}

export default openingImage;