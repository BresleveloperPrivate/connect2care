import React, { Component } from 'react';
import '../styles/navbar.scss'
import ourBrothers from '../icons/ourBrothers.png'
import { withRouter } from 'react-router-dom';


const Options =
    [{ option: 'רשימת המפגשים', push: '/1' },
    { option: 'מי אנחנו', push: '/2' },
    { option: 'תרמו לנו', push: 'https://ourbrothers.co.il/donate', open: true },
    { option: 'צור קשר', push: '/3' }]

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

export default withRouter(NavBar);