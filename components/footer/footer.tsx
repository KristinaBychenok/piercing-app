import { useCallback } from 'react'
import { ContentWrapper } from '../layouts/contentWrapper'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { clearForm } from '../../components/form/form.slice'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { Logo } from '../logo/logo'
import { Typography } from '@mui/material'
import { InstagramButton } from '../buttons/instagram'
import { FacebookButton } from '../buttons/facebook'
import { TikTokButton } from '../buttons/tictok'

export const Footer = () => {
  const dispatch = useDispatch()
  const { locale } = useRouter()

  const onClickLogoHandler = useCallback(() => {
    dispatch(clearForm())
  }, [dispatch])

  const t = useTranslations()

  return (
    <div className={`w-full bg-[#1E1E1E] border-t border-white border-solid`}>
      <ContentWrapper>
        <div className="flex flex-row items-center justify-between w-full">
          <Link
            href={'/'}
            locale={locale}
            className="text-2xl my-7 font-sans font-inter"
            onClick={onClickLogoHandler}
          >
            <Logo />
          </Link>
          <div className="hidden tablet:flex flex-col items-center">
            <Link href="/agreement" locale={locale || 'en'} target="_blank">
              {t('footer.policy')}
            </Link>
            <Typography className="font-inter font-basic text-12 pt-4">
              © 2024 Daryauo piercing. {t('footer.rights')}
            </Typography>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex flex-row gap-4">
              <InstagramButton />
              <FacebookButton />
              <TikTokButton />
            </div>
            <Typography className="font-inter font-basic text-12 pt-4">
              {t('footer.city')}
            </Typography>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}
