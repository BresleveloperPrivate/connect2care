import React, { Component } from 'react';
import '../styles/navbar.scss'
import ourBrothers from '../icons/ourBrothers.png'

const Options =
    [{ option: 'רשימת המפגשים', push: '/' },
    { option: 'מי אנחנו', push: '/' },
    { option: 'תרמו לנו', push: 'https://ourbrothers.co.il/donate', open: true },
    { option: 'צור קשר', push: '/' }]

class NavBar extends Component {


    render() {
        // console.log("this.props.history", window.open("https://ourbrothers.co.il/donat"))
        return (
            <div className={'navbar ' + this.props.className}>
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
            </div>


        );
    }
}

export default NavBar;