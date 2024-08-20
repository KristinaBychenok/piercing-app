import { Typography } from '@mui/material'
import { ContentWrapper } from '../../layouts/contentWrapper'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export const About = () => {
  const t = useTranslations()

  return (
    <ContentWrapper>
      <div
        id="about"
        className="flex flex-col laptop:flex-row items-center w-full justify-center pt-12 laptop:pt-32"
      >
        <Image
          src={'/about.jpg'}
          alt="about-image"
          width={489}
          height={668}
          className=""
          priority={false}
        />
        <div className="flex flex-col h-full items-start mt-10 tablet:mt-20 laptop:mt-0 laptop:ml-20 laptop:justify-end w-full laptop:w-[410px]">
          <Typography
            className="font-sans font-inter text-56 font-basic pb-8"
            fontSize={32}
          >
            {t('about.hello')}
          </Typography>
          <Typography className="font-sans font-inter text-17 pb-8 font-light">
            {t('about.text')}
          </Typography>
          <Typography className="font-sans font-inter text-17 italic">
            {t('about.bye')}
          </Typography>
        </div>
      </div>
    </ContentWrapper>
  )
}
