import { observable, decorate, action } from 'mobx';
import React, { createContext, useContext } from 'react';

import heb from '../icons/heb.svg'
import en from '../icons/en.svg'

class LanguageStore {

    width = 0

    setWidth = (width) => {
        this.width = width
    }

    Options =
        [
            { option: 'עברית', short: 'heb', img: heb },
            { option: 'English', short: 'en', img: en },
            { option: 'עברית', short: 'heb', img: heb },
            { option: 'עברית', short: 'heb', img: heb },
            { option: 'עברית', short: 'heb', img: heb },
        ]

    selectedIndex = this.Options.findIndex(val => val.short === localStorage.getItem('lang')) || 0
    setSelectedIndex = (index) => {
        this.selectedIndex = index
    }
}

decorate(LanguageStore, {
    Options: observable,
    selectedIndex: observable,
    setSelectedIndex: action,
    width: observable,
    setWidth: action

});

const languageStore = new LanguageStore();

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => (
    <LanguageContext.Provider value={languageStore}>
        {children}
    </LanguageContext.Provider>
);

export const useLanguageStore = () => useContext(LanguageContext);

export default languageStore;