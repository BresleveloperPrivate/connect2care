import React, { Component } from 'react';

class lng extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lngToChoose: localStorage.getItem("lang") === null || localStorage.getItem("lang") === "heb" ? "heb" : "en"
        }
        
    }

    changelng = (x) => {
        this.props.changeLanguage(x);
        this.setState({lngToChoose: x})
    }

    render() {
        return (
            <div >
                {this.state.lngToChoose === "heb" ?
                <div className="lgnP" onClick={() => { this.changelng("en"); }}>English</div> :
                <div className="lgnP" onClick={() => { this.changelng("heb"); }}>עברית</div>}
            </div>


        );
    }
}


export default lng;
