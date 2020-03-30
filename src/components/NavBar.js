import React, { Component } from 'react';
import '../styles/navbar.scss'
import ourBrothers from '../icons/ourBrothers.png'

const Options =
    [{ option: 'רשימת המפגשים', push: '/1' },
    { option: 'מי אנחנו', push: '/2' },
    { option: 'תרמו לנו', push: '/3' },
    { option: 'צור קשר', push: '/4' }]

class NavBar extends Component {


    render() {
        return (

            <div className={'navbar ' + this.props.className}>
                <div className='navbarOptions'>
                    {Options.map((value, index) => {
                        return (
                            <div key={index}
                                onClick={() => {
                                    this.props.history.push(value.push)
                                }}
                                className='optionInNavbar pointer'
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
            </div>


        );
    }
}

export default NavBar;