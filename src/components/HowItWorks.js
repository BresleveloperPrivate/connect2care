import React, { Component } from 'react';
import { inject, observer} from 'mobx-react';

import '../styles/howItWorks.css'

import candle from '../icons/candle.svg'
import Step1 from '../icons/step1.svg'
import Step2 from '../icons/step2.svg'
import Step3 from '../icons/step3.svg'
import Step4 from '../icons/step4.svg'
import Step5 from '../icons/step5.svg'
// import Step6 from '../icons/step6.svg'
// import Step7 from '../icons/step7.png'

import Group5 from '../icons/Group5.svg';
import Group6 from '../icons/Group6.svg';
import Group7 from '../icons/Group7.svg';
import noun_clock_3690327 from '../icons/noun_clock_3690327.svg';
import noun_edit_3697154 from '../icons/noun_edit_3697154.svg';
import Group12 from '../icons/Group12.svg';
import shape from '../icons/Shape.svg';

class HowItWorks extends Component {

    render() {
        return (

            <div className='containHowItWorks'>
                <div className={this.props.LanguageStore.lang !== 'heb' ? 'howItWorksTitle tal' : 'howItWorksTitle tar'}>
            {this.props.t('howItWorks')}
                </div>

                <div className={this.props.LanguageStore.lang !== 'heb' ? 'howItWorks fdrr' : 'howItWorks'}>
                    <div className='levels'>

                    <div className={this.props.LanguageStore.lang !== 'heb' ? 'howItWorksOption tal' : 'howItWorksOption tar'}>
                            {this.props.t('meetingHost')}
                            {/* מארח/ת המפגש */}
                        </div>
                        <div className='containSteps'>
                            <div className='step'>
                                <div className='containImageStep'>
                                    <img alt="alt" src={Group5} width='80%' />
                                </div>
                                {this.props.t('step1')}
                                </div>
                            <div className='step'>
                                <div className='containImageStep'>
                                    <img alt="alt" src={Group7} width='80%' />
                                </div>
                                {this.props.t('step2')}
                                </div>
                            <div className='step'>
                                <div className='containImageStep'>
                                    <img alt="alt" src={noun_clock_3690327} width='80%' />
                                </div>
                                {this.props.t('step3')}
                                {/* <strong>האחים שלנו</strong> */}
                            </div>

                        </div>

                        <div style={{ flexGrow: 0.1 }}></div>

                        <div className={this.props.LanguageStore.lang !== 'heb' ? 'howItWorksOption tal' : 'howItWorksOption tar'}>
                            {this.props.t('participantInMeeting')}
                        </div>
                        <div className='containSteps'>
                            <div className='step'>
                                <div className='containImageStep'>
                                    <img alt="alt" src={Group6} width='80%' />
                                </div>
                                {this.props.t('step4')}

                                </div>
                            <div className='step'>
                                <div className='containImageStep'>
                                    <img alt="alt" src={noun_edit_3697154} width='60%' />
                                </div>
                                {this.props.t('step5')}
                                </div>
                            <div className='step'>
                                <div className='containImageStep'>
                                    <img alt="alt" src={Group12} width='80%' />
                                </div>
                                {this.props.t('step6')}
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

                        {/* <div className='resultText'> */}
                            {/* מתחברים לקישור של Zoom,<br />
                        מסדרים את המצלמה, */}
                        {/* {this.props.t('step7-1')}
                        <br/>
                        {this.props.t('step7-2')} */}

                      {/* </div> */}
                        {/* <div style={{ padding: '20px 0px 10px 0px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className='containImageStep'><img alt="alt" width='100%' src={Step5} /></div>
                        </div> */}

                        <div className='howItWorksLeft'>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh' }}>
                                <div className={this.props.LanguageStore.lang !== 'heb' && this.props.LanguageStore.width > 550 ?'containImageStep tal': this.props.LanguageStore.width > 550 ? 'containImageStep tar': 'containImageStep'} style={{height:'fit-content'}}><img alt="alt" width='60%' src={shape} /></div>
                            </div>
                            <div className={this.props.LanguageStore.lang !== 'heb' ? 'remember tal' : 'remember tar'}>{this.props.t('remember')}</div>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

export default inject('LanguageStore')(observer(HowItWorks))