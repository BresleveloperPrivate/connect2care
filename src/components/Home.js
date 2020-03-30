import React, { Component } from 'react';
import OpeningImage from './OpeningImage'
import NavBar from './NavBar'
import Explanation from './Explanation'
import HowItWorks from './HowItWorks'

class Home extends Component {

    render() {
        return (
            <div>

                <NavBar
                    history={this.props.history}
                    className={'navbar-opening'}
                />

                <OpeningImage />

                <Explanation />

                <HowItWorks />

            </div>
        );
    }
}

export default Home;