import React, { Component } from 'react';
import '../styles/explanation.css'

class Quote extends Component {

    render() {
        return (

            <div className='containQuote'>
                <div className='quote'>
                   "{this.props.t('quote')}"
               </div>


            </div>

        );
    }
}

export default Quote;