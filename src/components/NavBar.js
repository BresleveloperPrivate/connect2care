import React, { Component } from 'react';
import '../styles/navbar.scss'
import ourBrothers from '../icons/ourBrothers.png'
import menu from '../icons/menu.png'
import SideNavBar from './SideNavBar'
import { withRouter } from 'react-router-dom';


const Options =
    [{ option: 'רשימת המפגשים', path: '/1' },
    { option: 'מי אנחנו', path: '/2' },
    { option: 'תרמו לנו', path: 'https://ourbrothers.co.il/donate', open: true },
    { option: 'צור קשר', path: '/3' }]

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
        return (
            <div className={'navbar ' + this.props.className}>
                    <div className='containMenu'>
                        <img onClick={this.toggleDrawer(true)} className='pointer' src={menu} alt="menu" style={{ height: "70%"}} />
                        </div>

                <div className='navbarOptions'>
                    {Options.map((value, index) => {
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
                        <img src={ourBrothers} height='100%' />
                    </div>
                </div>
                <SideNavBar history={this.props.history}
                 toggleDrawer={this.toggleDrawer} 
                 options={Options}
                 right={this.state.right}
                 />
            </div>


        );
    }
}

export default withRouter(NavBar);