import { useCallback } from 'react'
import { ContentWrapper } from '../layouts/contentWrapper'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { clearForm } from '../../components/form/form.slice'
import { Navigation } from '../nav/nav'
import { LangSwitcher } from '../lang-switcher/langSwitcher'
import { useRouter } from 'next/router'
import { Logo } from '../logo/logo'

export const Header = () => {
  const dispatch = useDispatch()
  const { locale } = useRouter()

  const onClickLogoHandler = useCallback(() => {
    dispatch(clearForm())
  }, [dispatch])

  return (
    <div
      className={`w-full bg-[#1E1E1E] z-10 border-b fixed border-white border-solid`}
    >
      <ContentWrapper>
        <div className="flex flex-row items-center justify-between w-full">
          <Link
            href={'/'}
            locale={locale}
            className="text-2xl my-[14px] font-sans font-inter"
            onClick={onClickLogoHandler}
          >
            <Logo />
          </Link>
          <Navigation />
          <div className="hidden tablet:flex">
            <LangSwitcher isDrawer={false} />
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}
