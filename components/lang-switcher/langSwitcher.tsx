import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

type LangsT = {
  code: string
  lang: string
}

const langs: LangsT[] = [
  { code: 'en', lang: 'EN' },
  { code: 'pl', lang: 'PL' },
]

export const LangSwitcher = ({ isDrawer }: { isDrawer: boolean }) => {
  const { locale, route } = useRouter()

  const liClassName = useCallback(
    (lang: LangsT) =>
      `mx-1 tablet:mx-3 p-1 cursor-pointer text-black tablet:text-white font-sans font-inter ${
        lang.code === locale ? 'font-super-bold' : 'font-basic'
      } ${
        isDrawer ? 'p-4 mb-6' : ''
      } hover:text-yellow-light active:text-yellow-default`,
    [isDrawer, locale]
  )

  return (
    <ul
      className={`flex ${isDrawer ? 'flex-col text-white ml-4' : 'flex-row'}`}
    >
      {langs.map((lang) => {
        return (
          <li key={lang.code} className={liClassName(lang)}>
            <Link href={route} locale={lang.code}>
              {lang.lang}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
