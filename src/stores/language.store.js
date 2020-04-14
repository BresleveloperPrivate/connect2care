import { observable, decorate, action } from 'mobx';

import heb from '../icons/heb.svg'
import en from '../icons/en.svg'

class LanguageStore {

    width = 0

    setWidth = (width) => {
        this.width = width
    }

    lang = !localStorage.getItem("lang") || localStorage.getItem("lang") === "heb" ? "heb" : "en"

    setLang = (lang)=>{
        this.lang = lang
    }

    // Options =
    //     [
    //         { option: 'עברית', short: 'heb', img: heb },
    //         { option: 'English', short: 'en', img: en },
    //         { option: 'עברית', short: 'heb', img: heb },
    //         { option: 'עברית', short: 'heb', img: heb },
    //         { option: 'עברית', short: 'heb', img: heb },
    //     ]

    // selectedIndex = this.Options.findIndex(val => val.short === localStorage.getItem('lang')) || 0
    // setSelectedIndex = (index) => {
    //     this.selectedIndex = index
    // }
}

decorate(LanguageStore, {
    // Options: observable,
    // selectedIndex: observable,
    // setSelectedIndex: action,
    width: observable,
    setWidth: action,
    lang:observable,
    setLang: action

});

export default new LanguageStore();