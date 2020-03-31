import React, { Component } from 'react';
import '../styles/partners.css'
import hilma from '../icons/hilma.png'
import can from '../icons/can.png'
import amit from '../icons/amit.png'
import facebook from '../icons/facebook.png'



class Partners extends Component {

    render() {
        return (

            <div className='containThanks'>

                <div className='thanks'>
                    תודה לשותפים שלנו
                        <div className='cover'>
                        <div className='arrow-bottom-yellow'></div>
                    </div>

                </div>

                <div className='containPartners'>
            <div style={{height:'8vw'}}><img src={can} height='100%'/></div>
            <div style={{height:'7vw'}}><img src={facebook} height='100%'/></div>
            <div style={{height:'7vw'}}><img src={amit} height='100%'/></div>
            <div style={{height:'5vw'}}><img src={hilma} height='100%'/></div>

                </div>

            </div>

        );
    }
}

export default Partners;