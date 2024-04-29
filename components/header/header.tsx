import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
// import { useTranslation } from 'next-i18next'

type LangsT = {
  code: string
  lang: string
}

const langs: LangsT[] = [
  { code: 'en', lang: 'EN' },
  { code: 'pl', lang: 'PL' },
  // { code: 'ru', lang: 'RU' },
]

export const Header = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  const liClassName = useCallback(
    (lang: LangsT) =>
      `mx-3 p-1 cursor-pointer ${
        lang.code === i18n.language ? 'bg-gray-500' : ''
      }`,
    [i18n.language]
  )

  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full md:px-8 xl:px-12">
      <h1 className="text-2xl my-7">Darya Logo</h1>
      <div className="hidden md:flex">
        {/* <nav>
          <ul className="flex flex-row">
            <li className="pr-10">About me</li>
            <li>Contacts</li>
          </ul>
        </nav> */}
      </div>
      <ul className="flex flex-row mb-5 md:my-7">
        {langs.map((lang) => {
          return (
            <li
              key={lang.code}
              className={liClassName(lang)}
              onClick={() => changeLanguage(lang.code)}
            >
              {lang.lang}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
