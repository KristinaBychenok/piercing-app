import { Typography } from '@mui/material'
import { Button } from '../../buttons/button'
import { ContentWrapper } from '../../layouts/contentWrapper'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export const About = () => {
  const t = useTranslations()

  return (
    <ContentWrapper>
      <div
        id="about"
        className="flex flex-col-reverse laptop:flex-row items-center w-full justify-center py-6 laptop:py-16"
      >
        <Image
          src={'/about.webp'}
          alt="about-image"
          width={489}
          height={731}
          className="w-full my-6 laptop:w-[489px]"
          priority={false}
        />
        <div className="flex flex-col w-full laptop:w-[645px] h-fit tablet:border border-white border-solid tablet:p-12 items-start">
          <Typography
            variant="h2"
            className="font-sans font-inter pb-8"
            fontSize={32}
          >
            {t('about.hello')}
          </Typography>
          <Typography
            className="font-sans font-inter pb-8 font-light"
            fontSize={17}
          >
            {t('about.text')}
          </Typography>
          <Typography
            className="font-sans font-inter mb-14"
            fontStyle="italic"
            fontSize={17}
          >
            {t('about.bye')}
          </Typography>
          <Button name={t('about.button')} href="/#contacts" />
        </div>
      </div>
    </ContentWrapper>
  )
}
