import { Header } from '../../components/header/header'
import { ContentWrapper } from '../../components/layouts/contentWrapper'
import { Button } from '../../components/buttons/button'
import { Typography } from '@mui/material'
import { GetStaticPropsContext } from 'next'
import { useTranslations } from 'next-intl'
import { useCallback } from 'react'
import { clearForm } from '../../components/form/form.slice'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'
import { Logo } from '../../components/logo/logo'

export default function Deleted() {
  const t = useTranslations()

  const dispatch = useDispatch()

  const onClickHandler = useCallback(() => {
    dispatch(clearForm())
  }, [dispatch])

  return (
    <div className="flex flex-col w-full h-fit">
      <div
        className={`flex w-full h-[1px] bg-white absolute top-[122px]`}
      ></div>
      <ContentWrapper>
        <div className="flex flex-col w-full mx-auto ">
          <Link
            href={'/'}
            className="text-2xl my-7 font-sans font-inter w-full"
            onClick={onClickHandler}
          >
            <Logo />
          </Link>

          <div className="flex flex-col pt-16 w-[1000px]">
            <Typography
              variant="h2"
              className="font-inter font-basic pb-8"
              fontSize={32}
            >
              {t('reschedule.successfullyCanceld.title')}
            </Typography>
            <Typography className="font-inter font-light mb-10" fontSize={17}>
              {t('reschedule.successfullyCanceld.subtitle')}
            </Typography>
            <Button
              name={t('reschedule.buttonReturn')}
              href="/"
              onClick={onClickHandler}
            />
          </div>
          <div className="flex w-full h-[450px] mt-16 mb-6 overflow-hidden items-center justify-center object-center">
            <Image
              src={'/canceld.jpg'}
              alt="canceld-image"
              width={6240}
              height={4160}
              priority={false}
              className="h-[450px] object-cover"
            />
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../messages/${context.locale}.json`)).default,
    },
  }
}
