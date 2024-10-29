import { Typography } from '@mui/material'
import { ContentWrapper } from '../../layouts/contentWrapper'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { InstagramButton } from '../../../components/buttons/instagram'
import { FacebookButton } from '../../../components/buttons/facebook'

export const Contacts = () => {
  const t = useTranslations()
  const studios = useSelector((state: RootState) => state.loadedData.studios)

  return (
    <ContentWrapper>
      <div
        id="contacts"
        className="flex flex-col laptop:flex-row items-start laptop:items-center w-[400px] laptop:w-full justify-center py-12 laptop:py-32 mx-auto"
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
                className="flex font-inter font-basic text-17 text-white italic pb-4"
              >
                Studio {index + 1}: {studio.address}
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
          <Typography className="flex font-inter font-basic text-17 text-white italic pb-4">
            +48 780-743-556
          </Typography>
          <Typography className="flex font-inter font-light text-17 text-white pb-4">
            daryauo.piercing@gmail.com
          </Typography>
          <div className="flex flex-row">
            <InstagramButton />
            <FacebookButton />
          </div>
        </div>
      </div>
    </ContentWrapper>
  )
}
