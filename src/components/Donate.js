import React, { Component } from 'react';
import '../styles/donate.css'

class Donate extends Component {

    render() {
        return (

            <div className='donateImage'>
                <div className='containDonate'>
                    
                  <div className='donateText'>רוצה לעזור לנו להמשיך לזכור?</div>  
                    <div className='pointer grow donateButton' onClick={()=>{
                        window.open('https://ourbrothers.co.il/donate')
                    }}>לתרומה לעמותה</div>
                    
                    </div>

            </div>

        );
    }
}

export default Donate;