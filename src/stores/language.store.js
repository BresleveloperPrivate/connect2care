import { observable, decorate, action } from 'mobx';

class LanguageStore {
    width = 0

    setWidth = (width) => {
        this.width = width
    }

    lang = !localStorage.getItem("lang") || localStorage.getItem("lang") === "heb" ? "heb" : "en"

    setLang = (lang)=>{
        this.lang = lang
    }
}

decorate(LanguageStore, {
    width: observable,
    setWidth: action,
    lang:observable,
    setLang: action
});

export default new LanguageStore();
