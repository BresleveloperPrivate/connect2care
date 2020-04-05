import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import translationEN from './translation/en/translationEN.en';
import translationHEB from './translation/heb/translationHEB.heb';

const resources = {
  en: {
    translation: translationEN
  },
  heb: {
    translation: translationHEB
  }
};

i18n
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem("lang") || "heb",
    fallbackLng: localStorage.getItem("lang") || "heb",

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;