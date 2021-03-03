import React, { Component } from 'react';
import '../styles/openingImage.css'
import { withRouter } from 'react-router-dom';
import { loadOptions } from '@babel/core';
import { inject, observer } from 'mobx-react';


class ContainOptions extends Component {

    render() {
        return (
            <div className='buttonsSection'>
                <div className='leftLine '></div>
                <div>
                    <div className={this.props.className}>
                        <div className={this.props.LanguageStore.lang !== 'heb' ? 'pointer grow firstOptionOpeningImage' : 'ml6vw pointer grow firstOptionOpeningImage'}
                            // onClick={() => {this.props.history.push('/create-meeting')}}
                            onClick={() => {
                                this.props && this.props.history.push("/create-meeting")
                            }}
                        >{this.props.t('IWantToInitiateAMeeting')}</div>
                        <div onClick={() => {
                            this.props.history.push('/meetings')
                        }} className={this.props.LanguageStore.lang !== 'heb' ? 'ml6vw pointer grow secondOptionOpeningImage' : 'pointer grow secondOptionOpeningImage'}>{this.props.t('IWantToAttendAMeeting')}</div>
                    </div>
                </div>
                <div className='rightLine'></div>
            </div>
        );
    }
}

export default inject('LanguageStore')(observer(withRouter(ContainOptions)));
