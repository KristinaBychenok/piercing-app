import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import global_en from '../translations/en/translation.json'
import global_pl from '../translations/pl/translation.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: 'pl',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: global_en,
      },
      pl: {
        translation: global_pl,
      },
    },
  })
