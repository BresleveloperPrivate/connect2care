import React, { Component } from 'react';
import '../styles/navbar.scss'
import ourBrothers from '../icons/ourBrothers.png'
import menu from '../icons/menu.svg'
import SideNavBar from './SidaNavBar'
import { withRouter } from 'react-router-dom';


const Options =
    [{ option: 'רשימת המפגשים', push: '/1' },
    { option: 'מי אנחנו', push: '/2' },
    { option: 'תרמו לנו', push: 'https://ourbrothers.co.il/donate', open: true },
    { option: 'צור קשר', push: '/3' }]

class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            right: false
        }
    }
    // This function open the side nav bar or close it, depends of the situation
    toggleDrawer = (open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.setState({ right: open })
    };

    render() {
        // console.log("this.props.history", window.open("https://ourbrothers.co.il/donat"))
        return (
            <div className={'navbar ' + this.props.className}>
                <img onClick={this.toggleDrawer(true)} className='pointer' src={menu} alt="menu" style={{ height: "70%"}} />

                <div className='navbarOptions'>
                    {Options.map((value, index) => {
                        return (
                            <div key={index}
                                onClick={() => {
                                    !value.open ?
                                        this.props.history.push(value.push) :
                                        window.open(value.push)
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
                        <img src={ourBrothers} height='100%' />
                    </div>
                </div>
                <SideNavBar history={this.props.history} toggleDrawer={this.toggleDrawer} right={this.state.right} />
            </div>


        );
    }
}

export default withRouter(NavBar);