import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationEN from './locales/en/translation.json'
import translationJP from './locales/jp/translation.json'
import translationVI from './locales/vi/translation.json'

const resources = {
  en: {
    translation: translationEN,
  },
  jp: {
    translation: translationJP,
  },
  vi: {
    translation: translationVI,
  },
}

const currentLanguage = localStorage.getItem('language') || 'en'
if (!localStorage.getItem('language')) {
  localStorage.setItem('language', 'en')
}

i18n.use(initReactI18next).init({
  resources,
  lng: currentLanguage,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
