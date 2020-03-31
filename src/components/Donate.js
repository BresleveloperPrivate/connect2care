import React, { Component } from 'react';
import '../styles/donate.css'

class Donate extends Component {

    render() {
        return (

            <div className='donateImage'>
                {/* <img className='openingImage' src={openImage} width='100%' /> */}
                {/* <img className='lightBlueBackground' src={lightBlueBackground} /> */}
                <div className='containDonate'>
                    
                  <div className='donateText'>רוצה לעזור לנו להמשיך לזכור?</div>  
                    <div className='pointer grow donateButton'>לתרומה לעמותה</div>
                    
                    </div>

            </div>

        );
    }
}

export default Donate;