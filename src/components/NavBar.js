import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import '../styles/navbar.scss'
import ourBrothers from '../icons/oblogo.png'
import c2c from '../icons/logo.svg'
import menu from '../icons/menu.svg'
import SideNavBar from './SideNavBar'
import { withRouter } from 'react-router-dom';
import '../styles/animations.scss'
// import Language from './Language';
import Lng from './Lng';


class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            right: false,
        }
        this.setOptions()
    }

    componentDidMount = () => {
        window.addEventListener('resize', this.onResize, false)
        this.props.LanguageStore.setWidth(window.innerWidth)
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
            [{ option: this.props.t("homePage"), path: '/' },
            { option: this.props.t("meetingsList"), path: '/meetings' },
            // { option: this.props.t("myMeetings"), path: '/my-meetings' },
            { option: this.props.t("whoWeAre"), path: 'https://ourbrothers.co.il/about?referer=connect-2-care', open: true },
            { option: this.props.t("donate"), path: 'https://ourbrothers.co.il/donate?referer=connect-2-care', open: true },
            { option: this.props.t("contactUs"), path: 'https://ourbrothers.co.il/contact?referer=connect-2-care', open: true },
            { option: this.props.t("meetingContent"), path: `${process.env.REACT_APP_DOMAIN}/meetingContent.pdf`, open: true }]
    }

    changelng = (lng) => {
        this.props.changeLanguage(lng);
        this.setOptions()
        this.forceUpdate()
    }

    render() {
        return (
            <div className={localStorage.getItem('lang') !== 'heb' ? 'navbar ' + this.props.className + ' fdrr' : 'navbar ' + this.props.className  }>
                <div className='containMenu'>
                    <img onClick={this.toggleDrawer(true)} className='pointer' src={menu} alt="menu" style={{ height: "30%" }} />
                </div>
                {/* <div className='containLanguage'>
                    <Language changeLanguage={this.changelng} />
                </div> */}
                {this.options && <div className='navbarOptions'>
                    <div className='optionInNavbar lngNB pointer'>
                        <Lng changeLanguage={this.changelng} />
                    </div>
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


                </div>}

                <div className={localStorage.getItem('lang') !== 'heb' ? 'navbarIcon fdrr' : 'navbarIcon'}>
                    <div className='containIconNavbar'>
                        <img alt="alt" src={ourBrothers} height='80%' className="oblogo" />
                    </div>
                    <div className='containIconNavbar'>
                        <img alt="alt" src={c2c} height='100%' />
                    </div>
                </div>
                <SideNavBar
                    history={this.props.history}
                    changeLanguage={this.changelng}
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
