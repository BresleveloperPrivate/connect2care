import React, { Component } from 'react';
import '../styles/openingImage.css'

class containOptions extends Component {

    render() {
        return (

                <div className={this.props.className}>
                        <div className='pointer grow firstOptionOpeningImage'>אני רוצה ליזום מפגש</div>
                        <div className='pointer grow secondOptionOpeningImage'>אני רוצה להשתתף במפגש</div>
                </div>

        );
    }
}

export default containOptions;