import { Logo } from '../components/logo/logo'
import { ContentWrapper } from '../components/layouts/contentWrapper'
import Link from 'next/link'
import { Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import { GetStaticPropsContext } from 'next'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import Image from 'next/image'

export default function Custom404() {
  const t = useTranslations()

  return (
    <div className="flex flex-col w-full min-h-full">
      <div
        className={`flex w-full h-[1px] bg-white absolute top-[122px]`}
      ></div>
      <ContentWrapper>
        <div className="flex flex-col w-full m-auto">
          <Link href={'/'} className="text-2xl my-7 font-sans font-inter">
            <Logo />
          </Link>
          <div className="flex flex-col items-center laptop:flex-row py-6 laptop:py-16 w-full">
            <div className="flex flex-col w-full m-auto ">
              <Typography
                variant="h2"
                className="font-inter font-basic pb-8"
                fontSize={32}
              >
                {t('404.title')}
              </Typography>
              <Typography className="font-inter font-light pb-8" fontSize={17}>
                {t('404.subtitle')}
              </Typography>
              <Typography className="font-inter font-light pb-4" fontSize={17}>
                {t('404.text')}
              </Typography>
              <Typography className="font-inter font-light" fontSize={17}>
                - {t('404.text1')}
              </Typography>
              <Typography className="font-inter font-light" fontSize={17}>
                - {t('404.text2')}
              </Typography>
              <Link
                href={'/#'}
                className="flex flex-row gap-4 text-white normal-case w-fit font-inter font-basic text-14 mt-8 py-4 px-14 border hover:text-yellow-light active:text-yellow-default bg-transparent hover:bg-transparent active:bg-transparent"
              >
                <Typography>{t('policy.back')}</Typography>
              </Link>
            </div>
            <div className="flex mt-8 px-4 absolute bottom-16 right-0 laptop:right-56">
              <Image src="/dog.png" alt="dog" width={280} height={322} />
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../messages/${context.locale}.json`)).default,
    },
  }
}
