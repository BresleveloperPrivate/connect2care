import React, { Component } from 'react';
// import NavBar from './NavBar'
import ResponsiveImage from './ResponsiveImage';
import OpeningVideo from './OpeningVideo';
import Explanation from './Explanation'
import HowItWorks from './HowItWorks'
import OptionsButtons from './OptionsButtons'
import ImagesCollage from './ImagesCollage'
//import Quote from './Quote'
//import Donate from './Donate'
import Partners from './Partners'
import Info from './Contact';
import Footer from './Footer';
import Rights from './Rights';

 const Home = (props) => {

        return (
            <div>

                {/* <NavBar
                    history={this.props.history}
                    className={'navbar-opening'}
                /> */}

                <ResponsiveImage t={props.t}/>

                <OpeningVideo t={props.t} />

                <Explanation t={props.t} explanation={1} />

                <OptionsButtons t={props.t} className='containOptionsBottom' />

                <HowItWorks t={props.t} />

                {/*<Explanation t={props.t} explanation={2} />*/}

                {/*<OptionsButtons t={props.t} className='containOptionsBottom' />*/}

                <ImagesCollage t={props.t} history={props.history} />

                {/*<Quote t={props.t}/>

                <Donate t={props.t} />*/}

                <Partners t={props.t} />

                {/* <Info t={props.t} /> */}

                {/* <Footer t={props.t} /> */}

                {/* <Rights t={props.t} /> */}

            </div>
        );
    
}

export default Home;