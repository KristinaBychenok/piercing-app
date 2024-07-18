import { useSelector } from 'react-redux'
import { Header } from '../../components/header/header'
import { ContentWrapper } from '../../components/layouts/contentWrapper'
import { RootState } from '../../store/store'
import { Button } from '../../components/buttons/button'
import { useGetFormDataHook } from '../../components/form/form.hooks'
import { studios } from '../../components/form/form.constants'
import { Typography } from '@mui/material'
import { GetStaticPropsContext } from 'next'
import { useTranslations } from 'next-intl'
import dayjs from 'dayjs'

export default function Rescheduled() {
  const bookingForm = useSelector(
    (state: RootState) => state.bookingForm.bookingData
  )
  const t = useTranslations()
  const { services, serviceTypes } = useGetFormDataHook(false)

  return (
    <>
      <Header />
      <ContentWrapper>
        <div className="mt-16 flex flex-col">
          <Typography
            variant="h2"
            className="font-inter font-basic pb-8"
            fontSize={32}
          >
            {t('reschedule.successfullyRescheduled')}
          </Typography>
          <Typography className="font-inter font-basic mb-6" fontSize={17}>
            {t('reschedule.details.title')}:
          </Typography>
          <div className="flex flex-col pl-4 border-l border-white border-solid mb-8">
            <Typography className="font-inter font-basic" fontSize={17}>
              {bookingForm.name}
            </Typography>
            <Typography className="font-inter font-basic pb-4" fontSize={14}>
              {bookingForm.email}
            </Typography>
            <Typography className="font-inter font-basic" fontSize={17}>
              {dayjs(new Date(bookingForm.date)).format('DD MMM YYYY')}
            </Typography>
            <Typography className="font-inter font-basic pb-4" fontSize={14}>
              {bookingForm.time}
            </Typography>
            <Typography className="font-inter font-basic" fontSize={17}>
              {t('reschedule.details.serviceTypeField')}:
            </Typography>
            <Typography className="font-inter font-basic pb-4" fontSize={14}>
              {
                serviceTypes.find(
                  (serviceType) =>
                    String(serviceType.value) === bookingForm.serviceType
                )?.label
              }
            </Typography>
            <Typography className="font-inter font-basic" fontSize={17}>
              {t('reschedule.details.serviceField')}:
            </Typography>
            <Typography className="font-inter font-basic" fontSize={14}>
              {
                services.find(
                  (service) => String(service.value) === bookingForm.service
                )?.label
              }
            </Typography>
          </div>
          <Typography className="font-inter font-basic mb-6" fontSize={17}>
            Wroclaw,{' '}
            {
              studios.find((studio) => studio.value === bookingForm.studio)
                ?.label
            }
          </Typography>
          <Button name={t('reschedule.buttonReturn')} href="/" />
        </div>
      </ContentWrapper>
    </>
  )
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../messages/${context.locale}.json`)).default,
    },
  }
}
