import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import heb from '../icons/27122.svg';
import eng from '../icons/usFlag2.svg.webp';

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
                <div className="lgnP" onClick={() => { this.changelng("en"); }}>ENG<img src={eng} alt="english" className="flag" /></div> :
                <div className="lgnP" onClick={() => { this.changelng("heb"); }}>HEB<img src={heb} alt="hebrew" className="flag" /></div>}
            </div>


        );
    }
}


export default inject('LanguageStore')(observer(Lng))