import { Typography } from '@mui/material'
import { ContentWrapper } from '../../layouts/contentWrapper'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { InstagramButton } from '../../../components/buttons/instagram'
import { FacebookButton } from '../../../components/buttons/facebook'
import { TikTokButton } from '../../../components/buttons/tictok'

export const Contacts = () => {
  const t = useTranslations()
  const studios = useSelector((state: RootState) => state.loadedData.studios)

  return (
    <ContentWrapper>
      <div
        id="contacts"
        className="flex flex-col laptop:flex-row items-start laptop:items-center w-[400px] laptop:w-full justify-center pt-32 pb-12 mx-auto"
      >
        <div className="flex flex-col laptop:self-end">
          <Typography className="flex font-inter font-basic text-56 text-white pb-8">
            {t('contacts.title')}
          </Typography>
          <Typography className="flex font-inter font-light text-17 text-white pb-4">
            {t('contacts.city')}
          </Typography>
          {studios.map((studio, index) => {
            return (
              <Typography
                key={studio.address}
                className="flex font-inter font-basic text-17 text-white italic"
              >
                {studio.address}
              </Typography>
            )
          })}
        </div>
        <div className="py-10 laptop:py-0 laptop:px-10">
          <Image
            src={'/contacts.jpg'}
            alt="contacts-image"
            width={400}
            height={400}
            className="overflow-auto"
            priority={false}
          />
        </div>
        <div className="flex flex-col laptop:self-start">
          <a
            href="tel:+48780743556"
            className="flex font-inter font-basic text-17 text-white italic pb-4 cursor-pointer hover:text-yellow-light active:text-yellow-default"
          >
            +48 780-743-556
          </a>
          <a
            href="mailto:daryauo.piercing@gmail.com"
            className="flex font-inter font-light text-17 text-white pb-4 cursor-pointer hover:text-yellow-light active:text-yellow-default"
          >
            daryauo.piercing@gmail.com
          </a>
          <div className="flex flex-row gap-4">
            <InstagramButton />
            <FacebookButton />
            <TikTokButton />
          </div>
        </div>
      </div>
    </ContentWrapper>
  )
}
