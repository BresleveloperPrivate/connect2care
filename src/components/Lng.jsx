import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

class Lng extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lngToChoose: localStorage.getItem("lang") === null || localStorage.getItem("lang") === "heb" ? "heb" : "en"
        }
        
    }

    changelng = (x) => {
        this.props.changeLanguage(x);
        this.props.LanguageStore.setLang(x)
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


export default inject('LanguageStore')(observer(Lng))