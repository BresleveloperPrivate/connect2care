import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import '../styles/partners.css'
import hilma from '../icons/hilma.png'
import can from '../icons/can.png'
import amit from '../icons/amit.png'
import tobe from '../icons/tobe.png'
import synamedia from '../icons/Synamedia.png'
import zoom from '../icons/zoom.png'
import hilmaWhite from '../icons/hilmaWhite.png'
import logo1 from '../icons/logo1.jpg'
import logo2 from '../icons/logo2.png'
import logo3 from '../icons/logo3.png'
import logo4 from '../icons/logo4.jpg'
import logo5 from '../icons/logo5.png'
import logo6 from '../icons/logo6.png'
import logo7 from '../icons/logo7.PNG'
import logo8 from '../icons/logo8.png'
import nao from '../icons/nao.svg'

class Partners extends Component {

    render() {
        return (

            <div className='containThanks'>

                <div className={this.props.LanguageStore.lang !== 'heb' ? 'thanks fdrr' : 'thanks'}>
                    {this.props.t('partners')}
                        <div className='cover'>
                        <div className='arrow-bottom-green'></div>
                    </div>

                </div>

                <div className='containPartners'>
                    <div onClick={()=>{window.open('https://zoom.us/')}} className='partner'><img src={zoom} height='80%' /></div>
                    <div onClick={()=>{window.open('https://www.naotech.com/he/')}} className='partner'><img src={nao} height='30%' /></div>
                    <div onClick={()=>{window.open('http://www.amit.org.il/')}} className='partner'><img src={amit} height='130%' /></div>
                    <div onClick={()=>{window.open('https://www.hilma.tech/')}} className='partner'><img src={hilma} height='60%' /></div>
                    <div onClick={()=>{window.open('https://www.synamedia.com/')}} className='partner'><img src={synamedia} height='170%' /></div>
                    <div onClick={()=>{window.open('http://www.my-idea.co.il/')}} className='partner'><img src={logo7} height='110%' /></div>
                    <div onClick={()=>{window.open('https://www.kan.org.il/')}} className='partner'><img src={can} height='100%' /></div>
                    <div onClick={()=>{window.open('https://grth.io/2bcloud/')}} className='partner'><img src={tobe} height='60%' /></div>
                    <div onClick={()=>{window.open('https://he-il.facebook.com/facebook')}} className='partner'><img src={logo6} height='60%' /></div>
                    <div onClick={()=>{window.open('https://www.bac.org.il/')}} className='partner'><img src={logo3} height='90%' /></div>
                    <div onClick={()=>{window.open('http://project21.co.il/')}} className='partner'><img src={logo5} height='100%' /></div>
                    <div onClick={()=>{window.open('https://digistage.co.il/')}} className='partner'><img src={logo8} height='40%' /></div>
                    <div onClick={()=>{window.open('https://www.schusterman.org/')}} className='partner'><img src={logo4} height='90%' /></div>
                    <div onClick={()=>{window.open('https://www.wework.com/he-IL')}} className='partner'><img src={logo1} height='80%' /></div>
                    <div onClick={()=>{window.open('https://payboxapp.com/il/home')}} className='partner'><img src={logo2} height='60%' /></div>




                </div>
                <div className={this.props.LanguageStore.lang !== 'heb' ? 'hilmeCredit fdrr' : 'hilmeCredit'}>
                    האתר פותח כתרומה לחברה ע"י הילמה - הייטק למען החברה
                  <div style={{height:'1em' ,marginRight:'4vw' , display:'flex'}}><img src={hilmaWhite} height='100%' /></div> </div>

            </div>

        );
    }
}

export default inject('LanguageStore')(observer(Partners));
