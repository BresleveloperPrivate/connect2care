import React, { Component } from 'react';
import '../styles/partners.css'
import hilma from '../icons/hilma.png'
import can from '../icons/can.png'
import amit from '../icons/amit.png'
import facebook from '../icons/facebook.png'
import synamedia from '../icons/Synamedia.png'


class Partners extends Component {

    render() {
        return (

            <div className='containThanks'>

                <div className='thanks'>
                    תודה לשותפים שלנו
                        <div className='cover'>
                        <div className='arrow-bottom-green'></div>
                    </div>

                </div>

                <div className='containPartners'>
                    <div className='partner'><img src={can} height='110%' /></div>
                    <div className='partner'><img src={amit} height='110%' /></div>
                    <div className='partner'><img src={synamedia} height='130%' /></div>
                    <div className='partner'><img src={facebook} height='90%' /></div>
                    <div className='partner'><img src={hilma} height='70%' /></div>

                </div>

            </div>

        );
    }
}

export default Partners;