import React from 'react';
import OpeningVideo from './OpeningVideo';
import Explanation from './Explanation'
import HowItWorks from './HowItWorks'
import OptionsButtons from './OptionsButtons'
import ImagesCollage from './ImagesCollage'
import Partners from './Partners'
import Footer from './Footer';
import Rights from './Rights';

 const Home = (props) => {

        return (
            <div>
                <OpeningVideo t={props.t} />

                <Explanation t={props.t} explanation={1} />

                <OptionsButtons t={props.t} className='containOptionsBottom' />

                <HowItWorks t={props.t} />

                <ImagesCollage t={props.t} history={props.history} />

                <Partners t={props.t} />

                <Footer t={props.t} />

                <Rights t={props.t} />

            </div>
        );
    
}

export default Home;