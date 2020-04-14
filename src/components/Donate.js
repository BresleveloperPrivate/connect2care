import React, { Component } from 'react';
import '../styles/donate.css'

class Donate extends Component {

    render() {
        return (

            <div className='donateImage'>
                <div className='containDonate'>
                    
                  <div className='donateText'>{this.props.t("wantToHelpUsKeepRemembering")}</div>  
                    <div className='pointer grow donateButton' onClick={()=>{
                        window.open('https://ourbrothers.co.il/donate')
                    }}>{this.props.t("toDonateToTheNonprofit")}</div>
                    
                    </div>

            </div>

        );
    }
}

export default Donate;