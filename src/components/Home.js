import React, { Component } from 'react';
import '../styles/animations.scss'
// import NavBar from './NavBar'
import OpeningImage from './OpeningImage'
import Explanation from './Explanation'
import HowItWorks from './HowItWorks'
import OptionsButtons from './OptionsButtons'
import ImagesCollage from './ImagesCollage'
import Quote from './Quote'
import Donate from './Donate'
import Partners from './Partners'


class Home extends Component {

    render() {
        return (
            <div>

                {/* <NavBar
                    history={this.props.history}
                    className={'navbar-opening'}
                /> */}

                <OpeningImage />

                <Explanation explanation={1} />

                <HowItWorks />

                <Explanation explanation={2} />

                <OptionsButtons className='containOptionsBottom' />

                <ImagesCollage history={this.props.history} />

                <Quote />

                <Donate />

                <Partners />

            </div>
        );
    }
}

export default Home;