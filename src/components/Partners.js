import React, { Component } from 'react';
import '../styles/partners.css'
import hilma from '../icons/hilma.png'
import can from '../icons/can.png'
import amit from '../icons/amit.png'
import facebook from '../icons/facebook.png'
import synamedia from '../icons/Synamedia.png'

import hilmaWhite from '../icons/hilmaWhite.png'
import logo1 from '../icons/logo1.jpg'
import logo2 from '../icons/logo2.png'
import logo3 from '../icons/logo3.png'
import logo4 from '../icons/logo4.jpg'
import logo5 from '../icons/logo5.png'
import logo6 from '../icons/logo6.png'
import logo7 from '../icons/logo7.PNG'
import logo8 from '../icons/logo8.png'


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
                    {/* <div className='partner'><img src={can} height='110%' /></div>
                    <div className='partner'><img src={amit} height='110%' /></div>
                    <div className='partner'><img src={synamedia} height='130%' /></div>
                    <div className='partner'><img src={facebook} height='90%' /></div>
                    <div className='partner'><img src={hilma} height='70%' /></div> */}
                    <div className='partner'><img src={hilma} height='70%' /></div>
                    <div className='partner'><img src={synamedia} height='150%' /></div>
                    <div className='partner'><img src={amit} height='110%' /></div>
                    <div className='partner'><img src={can} height='110%' /></div>
                    <div className='partner'><img src={logo1} height='100%' /></div>
                    <div className='partner'><img src={logo2} height='60%' /></div>
                    <div className='partner'><img src={logo3} height='100%' /></div>
                    <div className='partner'><img src={logo4} height='100%' /></div>
                    <div className='partner'><img src={logo5} height='100%' /></div>
                    <div className='partner'><img src={logo6} height='80%' /></div>
                    <div className='partner'><img src={logo7} height='100%' /></div>
                    <div className='partner'><img src={logo8} height='50%' /></div>




                </div>
                <div className='hilmeCredit'>
                    האתר פותח כתרומה לחברה ע"י הילמה - הייטק למען החברה
                  <div style={{height:'1em' ,marginRight:'4vw' , display:'flex'}}><img src={hilmaWhite} height='100%' /></div> </div>

            </div>

        );
    }
}

export default Partners;