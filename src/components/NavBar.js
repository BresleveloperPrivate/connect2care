import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import '../styles/navbar.scss'
import ourBrothers from '../icons/logo.svg'
import menu from '../icons/menu.png'
import SideNavBar from './SideNavBar'
import { withRouter } from 'react-router-dom';
import '../styles/animations.scss'
import Language from './Language';


class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            right: false
        }
        this.setOptions()
    }

    componentDidMount=()=>{
        window.addEventListener('resize', this.onResize, false)
    }

    onResize = (e) => {
        this.props.LanguageStore.setWidth(e.target.innerWidth)
    }

    // This function open the side nav bar or close it, depends of the situation
    toggleDrawer = (open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.setState({ right: open })
    };

    setOptions = () => {

        this.options =
            [{ option: this.props.t("meetingsList"), path: '/meetings' },
            { option: this.props.t("myMeetings"), path: '/my-meetings' },
            { option: this.props.t("whoWeAre"), path: 'https://ourbrothers.co.il/about', open: true },
            { option: this.props.t("donate"), path: 'https://ourbrothers.co.il/donate', open: true },
            { option: this.props.t("contactUs"), path: 'https://ourbrothers.co.il/contact', open: true }]
    }

    changelng = (lng) => {
        this.props.changeLanguage(lng);
        this.setOptions()
    }

    render() {
        return (
            <div className={'navbar ' + this.props.className}>
                <div className='containMenu'>
                    <img onClick={this.toggleDrawer(true)} className='pointer' src={menu} alt="menu" style={{ height: "70%" }} />
                </div>
                <div className='containLanguage'>
                    <Language changeLanguage={this.changelng} />
                </div>


                <div className='navbarOptions'>
                    {this.options.map((value, index) => {
                        return (
                            <div key={index}
                                onClick={() => {
                                    !value.open ?
                                        this.props.history.push(value.path) :
                                        window.open(value.path)
                                }}
                                className='optionInNavbar grow-bold pointer'

                            >
                                {value.option}
                            </div>

                        )
                    })}


                </div>

                <div className='navbarIcon'>
                    <div className='containIconNavbar'>
                        <img alt="alt" src={ourBrothers} height='100%' />
                    </div>
                </div>
                <SideNavBar history={this.props.history}
                    changeLanguage={this.props.changeLanguage}
                    toggleDrawer={this.toggleDrawer}
                    options={this.options}
                    right={this.state.right}
                />
            </div>


        );
    }
}

// export default withRouter(NavBar);
export default inject('LanguageStore')(observer(withRouter(NavBar)));
