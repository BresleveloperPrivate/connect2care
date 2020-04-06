import React, { Component } from 'react';
import '../styles/howItWorks.css'

import candle from '../icons/candle.svg'
import Step1 from '../icons/step1.svg'
import Step2 from '../icons/step2.svg'
import Step3 from '../icons/step3.svg'
import Step4 from '../icons/step4.svg'
import Step5 from '../icons/step5.svg'
import Step6 from '../icons/step6.svg'
import Step7 from '../icons/step7.png'


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
                            מארח/ת המפגש
                        </div>
                        <div className='containSteps'>
                            <div className='step'>
                                <div className='containImageStep'>
                                    <img alt="alt" src={Step1} width='100%' />
                                </div>
                                פותחים מפגש חדש
                                </div>
                            <div className='step'>
                                <div className='containImageStep'>
                                    <img alt="alt" src={Step2} width='100%' />
                                </div>
                                משתפים את כולם
                                </div>
                            <div className='step'>
                                <div className='containImageStep'>
                                    <img alt="alt" src={Step3} width='100%' />
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
                                    <img  alt="alt"src={Step4} width='100%' />
                                </div>
                                מחפשים מפגש מתאים

                                </div>
                            <div className='step'>
                                <div className='containImageStep'>
                                    <img alt="alt" src={Step5} width='100%' />
                                </div>
                                נרשמים באתר
                                </div>
                            <div className='step'>
                                <div className='containImageStep'>
                                    <img alt="alt" src={Step6} width='100%' />
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
                        <div style={{ flexGrow: 0.8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className='containImageStep'><img alt="alt" width='100%' src={Step7} /></div>
                        </div>
                        <div className='resultText'>
                            מתחברים לקישור של Zoom,<br />
                        מסדרים את המצלמה,
                      </div>
                        <div className='remember'>וזוכרים.</div>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                            <div className='containImageStep'><im alt="alt" width='40%' src={candle} /></div>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

export default HowItWorks;