import React, { Component } from 'react';
import '../styles/openingImage.css'
import { withRouter } from 'react-router-dom';


class containOptions extends Component {

    render() {
        return (

            <div className={this.props.className}>
                <div className='pointer grow firstOptionOpeningImage'
                    // onClick={() => {this.props.history.push('/create-meeting')}}
                    onClick={() => {
                        this.props && this.props.history.push("/create-meeting")
                    }}
                >אני רוצה ליזום מפגש</div>
                <div className='pointer grow secondOptionOpeningImage'>אני רוצה להשתתף במפגש</div>
            </div>

        );
    }
}

export default withRouter(containOptions);