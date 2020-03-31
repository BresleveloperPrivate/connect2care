import React, { Component } from 'react';
import '../styles/howItWorks.css'

class HowItWorks extends Component {

    render() {
        return (

            <div className='containHowItWorks'>

                <div className='howItWorks'>
                    <div className='levels'>
                        שלב 1 <br /><br />
                        שלב 1 <br /><br />
                        שלב 1 <br /><br />
                        <div className='coverSmall'>
                            <div className='arrow-left-blue'></div>
                        </div>

                        <div className='coverBig'>
                            <div className='arrow-left-gray'></div>
                        </div>

                    </div>

                    <div className='result'>
                        שלב 1 <br /><br />
                        שלב 1 <br /><br />
                        שלב 1 <br /><br />

                    </div>
                </div>

            </div>

        );
    }
}

export default HowItWorks;