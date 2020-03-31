import React, { Component } from 'react';
import '../styles/howItWorks.css'

import Step1 from '../icons/step1.svg'
import Step2 from '../icons/step2.svg'
import Step3 from '../icons/step3.svg'
import Step4 from '../icons/step4.svg'
import Step5 from '../icons/step5.svg'
import Step6 from '../icons/step6.svg'
import Step7 from '../icons/step7.svg'


class HowItWorks extends Component {

    render() {
        return (

            <div className='containHowItWorks'>
                <div className='howItWorksTitle'>
                    איך זה עובד?
                </div>

                <div className='howItWorks'>
                    <div className='levels'>

                        <div className='howItWorksOption'>
                            יוצר מפגש
                        </div>
                        <div className='containSteps'>
                            <div className='step'>
                            <div className='containImageStep'>
                                    <img src={Step1} width='100%' />
                                    </div>
                                פותחים מפגש חדש
                                </div>
                            <div className='step'>
                            <div className='containImageStep'>
                                    <img src={Step2} width='100%' />
                                    </div>
                                משתפים את כולם
                                </div>
                            <div className='step'>
                                <div className='containImageStep'>
                                    <img src={Step3} width='100%' />
                                </div>
                                משתתפים במפגש הכנה עם
                                <strong>האחים שלנו</strong>
                            </div>

                        </div>
                        <div style={{ flexGrow: 0.5 }}></div>
                        <div className='howItWorksOption'>
                            משתתף במפגש
                        </div>
                        <div className='containSteps'>
                            <div className='step'>
                            <div className='containImageStep'>
                                    <img src={Step4} width='100%' />
                                    </div>
                                מחפשים מפגש מתאים

                                </div>
                            <div className='step'>
                            <div className='containImageStep'>
                                    <img src={Step5} width='100%' />
                                    </div>
                                נרשמים באתר
                                </div>
                            <div className='step'>
                            <div className='containImageStep'>
                                    <img src={Step6} width='100%' />
                                    </div>
                                משתפים חברים
                                </div>

                        </div>

                    </div>

                    <div className='result'>
                        <div className='coverSmall'>
                            <div className='arrow-left-blue'></div>
                        </div>

                        <div className='coverBig'>
                            <div className='arrow-left-gray'></div>
                        </div>
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