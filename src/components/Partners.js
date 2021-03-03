import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import '../styles/partners.css'
import hilma from '../icons/hilma.png'
// import can from '../icons/can.png'
import amit from '../icons/amit.png'
import tobe from '../icons/tobe.png'
import synamedia from '../icons/Synamedia.png'
import zoom from '../icons/zoom.svg'
import logo1 from '../icons/logo1.jpg'
import logo2 from '../icons/logo2.png'
import logo3 from '../icons/logo3.png'
import logo4 from '../icons/logo4.jpg'
import logo5 from '../icons/logo5.png'
import logo6 from '../icons/logo6.png'
import logo7 from '../icons/logo7.PNG'
import logo8 from '../icons/logo8.png'
import nao from '../icons/nao.svg'
import jgive from '../icons/jgive.png'
import logo11 from '../icons/logo11.png'
import logo12 from '../icons/logo12.png'
import amdocs from '../icons/amdocs.jpeg'
import reblaze from '../icons/reblaze.jpeg'


class Partners extends Component {

    render() {
        return (

            <div className='containThanks'>

                <div className={this.props.LanguageStore.lang !== 'heb' ? 'thanks fdrr' : 'thanks'}>
                    {this.props.t('partners')}
                    {/* <div className='cover'>
                        <div className='arrow-bottom-green'></div>
                    </div> */}

                </div>

                <div className='containPartners'>
                    <div onClick={() => { window.open('https://www.matnasim.org.il/') }} className='partner'><img src={logo11} height='55%' /></div>
                    <div onClick={() => { window.open('http://www.amit.org.il/') }} className='partner'><img src={amit} height='115%' /></div>
                    <div onClick={() => { window.open('https://www.hilma.tech/') }} className='partner'><img src={hilma} height='55%' /></div>
                    <div onClick={() => { window.open('https://www.synamedia.com/') }} className='partner'><img src={synamedia} height='175%' /></div>
                    <div onClick={() => { window.open('https://grth.io/2bcloud/') }} className='partner'><img src={tobe} height='65%' /></div>
                    <div onClick={() => { window.open('https://www.bac.org.il/') }} className='partner'><img src={logo3} height='85%' /></div>
                    <div onClick={() => { window.open('http://www.my-idea.co.il/') }} className='partner'><img src={logo7} height='115%' /></div>
                    <div onClick={() => { window.open('https://edu.gov.il/noar/minhal/Pages/hp.aspx') }} className='partner'><img src={logo12} height='95%' /></div>
                    <div onClick={() => { window.open('https://zoom.us/') }} className='partner'><img src={zoom} height='45%' /></div>
                    <div onClick={() => { window.open('https://www.naotech.com/he/') }} className='partner'><img src={nao} height='45%' /></div>
                    <div onClick={() => { window.open('https://digistage.co.il/') }} className='partner'><img src={logo8} height='45%' /></div>
                    <div onClick={() => { window.open('https://www.schusterman.org/') }} className='partner '><img src={logo4} height='115%' /></div>
                    <div onClick={() => { window.open('https://he-il.facebook.com/facebook') }} className='partner'><img src={logo6} height='65%' /></div>
                    <div onClick={() => { window.open('https://payboxapp.com/il/home') }} className='partner'><img src={logo2} height='75%' /></div>
                    <div onClick={() => { window.open('https://www.wework.com/he-IL') }} className='partner fg0'><img src={logo1} height='85%' /></div>
                    <div onClick={() => { window.open('http://project21.co.il/') }} className='partner fg0'><img src={logo5} height='105%' /></div>
                    <div onClick={() => { window.open('https://www.jgive.com/new/he/ils') }} className='partner fg0'><img src={jgive} height='145%' /></div>
                    <div onClick={() => { window.open('https://www.amdocs.com/') }} className='partner fg0'><img src={amdocs} height='55%' /></div>
                    <div onClick={() => { window.open('https://www.reblaze.com/') }} className='partner fg0'><img src={reblaze} height='115%' /></div>



                </div>
            </div>

        );
    }
}

export default inject('LanguageStore')(observer(Partners));
