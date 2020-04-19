import React, { Component } from 'react';
import '../styles/donate.css'
import src from '../icons/grayImage.png'

class Donate extends Component {

    componentDidMount = () => {
        let c = document.getElementById('DI')
        if (c) {
            let img = new Image;
            img.src = src;
            img.onload = function () {
                c.classList.remove('donateImage-before')
                c.classList.add('donateImage-after')
            }
        }
    }


    render() {
        return (
            <div className='containAllDonate'>

                    <div className='containDonate'>

                        <div className='donateText'>{this.props.t("wantToHelpUsKeepRemembering")}</div>
                        <div className='pointer grow donateButton' onClick={() => {
                            window.open('https://ourbrothers.co.il/donate')
                        }}>{this.props.t("toDonateToTheNonprofit")}</div>

                    </div>
                <div id='DI' className='donateImage-before'>  </div>
            </div>
        );
    }
}

export default Donate;