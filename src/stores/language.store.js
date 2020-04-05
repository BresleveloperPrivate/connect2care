import { observable, decorate, action } from 'mobx';
import heb from '../icons/heb.svg'
import en from '../icons/en.svg'

class ExampleStore {

    Options =
        [
            { option: 'עברית', short: 'heb', img: heb },
            { option: 'English', short: 'en', img: en },
            { option: 'עברית', short: 'heb', img: heb },
            { option: 'עברית', short: 'heb', img: heb },
            { option: 'עברית', short: 'heb', img: heb },
        ]

    selectedIndex = this.Options.findIndex(val => val.short === localStorage.getItem('lang'))
    setSelectedIndex = (index) => {
        this.selectedIndex = index
    }
}

decorate(ExampleStore, {
    Options: observable,
    selectedIndex: observable,
    setSelectedIndex: action
});

export default new ExampleStore();

