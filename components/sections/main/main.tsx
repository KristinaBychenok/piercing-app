import { Typography } from '@mui/material'
import { Button } from '../../buttons/button'
import { ContentWrapper } from '../../layouts/contentWrapper'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export const Main = () => {
  const t = useTranslations()
  return (
    <ContentWrapper>
      <div className="flex flex-col w-full pt-6 laptop:pt-16">
        <div className="flex flex-col laptop:flex-row justify-between items-start laptop:items-center desktop:items-end">
          <div className="flex flex-col desktop:flex-row items-start desktop:items-end pb-3 laptop:pb-0">
            <Typography
              variant="h1"
              className="desktop:pr-6 font-sans font-inter"
              fontSize={56}
            >
              {t('main.title')}
            </Typography>
            <Typography
              fontSize={24}
              className="font-sans font-inter"
              fontWeight={200}
            >
              {t('main.subTitle')}
            </Typography>
          </div>
          <Button name={t('main.button')} href="/#booking" />
        </div>
        <div className="flex items-center justify-center w-full mt-6 h-[246px] laptop:h-[726px] relative">
          <Image
            src={'/main.jpg'}
            alt="main-image"
            priority={true}
            width={1344}
            height={726}
            // sizes="(min-width: 1440px ) 1440px 726px, (min-width: 1024px) 928px 726px, (min-width: 768px) 672px 246px, 328px 246px"
            className="w-full object-cover h-[246px] laptop:h-[726px]"
            fill={false}
          />
          <Typography
            className="font-sans font-inter text-black-default absolute p-4 tablet:p-[50px] right-0 bottom-0 text-end"
            fontSize={24}
          >
            {t('main.text')}
          </Typography>
        </div>
      </div>
    </ContentWrapper>
  )
}
