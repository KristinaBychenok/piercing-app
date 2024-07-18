import { Typography } from '@mui/material'
import { Button } from '../../buttons/button'
import { ContentWrapper } from '../../layouts/contentWrapper'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export const Main = () => {
  const t = useTranslations()
  return (
    <div className="w-full py-6 laptop:py-16">
      <ContentWrapper>
        <div className="flex flex-col w-full">
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
            <Button name={t('main.button')} href="/#contacts" />
          </div>
          <div className="flex w-full mt-6 relative h-[246px] laptop:h-[726px]">
            <Image
              src={'/main.webp'}
              alt="main-image"
              priority={true}
              sizes="(min-width: 1440px) 1440px, (min-width: 1024px) 928px, (min-width: 768px) 672px, 328px"
              fill={true}
              className="h-full object-cover"
            />
            <Typography
              className="font-sans font-inter absolute p-4 tablet:p-[50px] right-0 bottom-0 text-end"
              fontSize={24}
            >
              {t('main.text')}
            </Typography>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}
