import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import '../styles/navbar.scss'
import ourBrothers from '../icons/oblogo.png'
import c2c from '../icons/logo.svg'
import menu from '../icons/menu.svg'
import SideNavBar from './SideNavBar'
import { withRouter } from 'react-router-dom';
// import '../styles/animations.scss'
// import Language from './Language';
import Lng from './Lng';
import logo10 from '../icons/logo10.png'
import hilma from '../icons/hilmasquare.png'
import matnas from '../icons/logo11.png'
// import tzahal from '../icons/tzahal.png'


class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            right: false,
            width:0
        }
        this.setOptions()
    }

    componentDidMount = () => {
        window.addEventListener('resize', this.onResize, false)
        this.props.LanguageStore.setWidth(window.innerWidth)
        this.setState({width:window.innerWidth, height:window.innerHeight})

    }

    onResize = (e) => {
        this.props.LanguageStore.setWidth(e.target.innerWidth)
        this.setState({width:e.target.innerWidth , height:e.target.innerHeight})
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
            { option: this.props.t("qna"), path: '/info' },
            // { option: this.props.t("donate"), path: 'https://ourbrothers.co.il/donate?referer=connect-2-care', open: true },
            { option: this.props.t("support"), path: '/support' },
            { option: this.props.t("contactUs"), path: '/contact' },
                // { option: this.props.t("meetingContent"), path: `${process.env.REACT_APP_DOMAIN}/meetingContent.pdf`, open: true }
            ]
    }

    changelng = (lng) => {
        this.props.changeLanguage(lng);
        this.setOptions()
        this.forceUpdate()
    }

    render() {
        return (
            <div className={this.props.LanguageStore.lang !== 'heb' ? 'navbar ' + this.props.className + ' fdrr' : 'navbar ' + this.props.className}>
                <div className='containMenu'>
                    <img onClick={this.toggleDrawer(true)} className='pointer' src={menu} alt="menu" style={{ height: "30%" }} />
                </div>
                {/* <div className='containLanguage'>
                    <Language changeLanguage={this.changelng} />
                </div> */}
                {this.options &&
                <div
                style={this.props.LanguageStore.lang !== 'heb' ? {flexDirection: 'row-reverse'} : {}}
                className='navbarOptions'>
                {/* <div className='optionInNavbar lngNB pointer'>
                    <Lng changeLanguage={this.changelng} />
                </div> */}

                    {this.state.width > 900 || this.state.height > 1200 ? <div className='containIconNavbar'>
                        <img onClick={() => {
                            this.props.history.replace('/')
                        }} alt="alt" src={c2c} height='120%'/>
                    </div> : null}
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

                    <div className='optionInNavbar lngNB pointer'>
                        <Lng changeLanguage={this.changelng}/>
                    </div>

                    <div style={{flexGrow: 1}}></div>


                    <div className='navbarLeft'>
                        {/* <div className='containIconNavbar'>
                            <img onClick={() => {
                                window.open('https://www.hilma.tech/')
                            }} alt="alt" src={hilma} height='60%'/>
                        </div> */}


                        {this.state.width <= 900 && this.state.height <= 1200 &&
                        <div className='containIconNavbar' style={{alignItems: 'center'}}>
                            <img onClick={() => {
                                this.props.history.replace('/')
                            }} alt="alt" src={c2c} height='135%'/>
                        </div>}

                    </div>
                    

                    {/* <div className={this.props.LanguageStore.lang !== 'heb' ? 'navbarIcon fdrr' : 'navbarIcon'}> */}

                    {/* </div> */}


                    <SideNavBar
                        history={this.props.history}
                        changeLanguage={this.changelng}
                        toggleDrawer={this.toggleDrawer}
                        options={this.options}
                        right={this.state.right}
                    />
                </div>}
            </div>)
    }
}

// export default withRouter(NavBar);
export default inject('LanguageStore')(observer(withRouter(NavBar)));
