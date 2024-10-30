import { useDispatch, useSelector } from 'react-redux'
import { ContentWrapper } from '../../components/layouts/contentWrapper'
import { RootState } from '../../store/store'
import { Button } from '../../components/buttons/button'
import { useGetFormDataHook } from '../../components/form/form.hooks'
import { Typography } from '@mui/material'
import { GetStaticPropsContext } from 'next'
import { useTranslations } from 'next-intl'
import dayjs from 'dayjs'
import { useCallback, useEffect } from 'react'
import { clearForm } from '../../components/form/form.slice'
import Link from 'next/link'
import { setIsLoading } from '../../store/settings.slice'
import Image from 'next/image'
import { Logo } from '../../components/logo/logo'

export default function Rescheduled() {
  const bookingForm = useSelector(
    (state: RootState) => state.bookingForm.bookingData
  )
  const t = useTranslations()
  const { studios, services, serviceTypes } = useGetFormDataHook(false)
  const dispatch = useDispatch()

  const onClickHandler = useCallback(() => {
    dispatch(clearForm())
  }, [dispatch])

  useEffect(() => {
    dispatch(setIsLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col w-full h-fit">
      <div
        className={`flex w-full h-[1px] bg-white absolute top-[122px]`}
      ></div>
      <ContentWrapper>
        <div className="flex flex-col">
          <Link
            href={'/'}
            className="text-2xl my-7 font-sans font-inter"
            onClick={onClickHandler}
          >
            <Logo />
          </Link>
          <div className="flex flex-row my-16">
            <div className="hidden laptop:flex flex-col w-[455px] h-[770px] laptop:mr-12">
              <Image
                src={'/successfully.jpg'}
                alt="successfully-reschedule-image"
                width={455}
                height={770}
                className="overflow-auto h-[770px] object-cover"
                priority={false}
              />
            </div>
            <div className="flex flex-col">
              <Typography
                variant="h2"
                className="font-inter font-basic pb-8"
                fontSize={32}
              >
                {t('reschedule.successfullyRescheduled')}
              </Typography>
              <Typography className="font-inter font-light mb-6" fontSize={17}>
                {t('reschedule.details.title', {
                  number: bookingForm.appointmentId,
                })}
              </Typography>
              <Typography className="font-inter font-light mb-6" fontSize={17}>
                {t('reschedule.details.text', {
                  email: bookingForm.email.value,
                })}
              </Typography>
              <div className="flex flex-col pl-4 border-l border-white border-solid mb-8">
                <Typography className="font-inter font-light" fontSize={17}>
                  {bookingForm.name.value}
                </Typography>
                <Typography
                  className="font-inter font-light pb-4"
                  fontSize={14}
                >
                  {bookingForm.email.value}
                </Typography>
                <Typography className="font-inter font-light" fontSize={17}>
                  {dayjs(new Date(bookingForm.date)).format('DD MMM YYYY')}
                </Typography>
                <Typography
                  className="font-inter font-light pb-4"
                  fontSize={14}
                >
                  {bookingForm.time}
                </Typography>
                <Typography className="font-inter font-light" fontSize={17}>
                  {t('reschedule.details.serviceTypeField')}:
                </Typography>
                <Typography
                  className="font-inter font-light pb-4"
                  fontSize={14}
                >
                  {
                    serviceTypes.find(
                      (serviceType) =>
                        String(serviceType.value) === bookingForm.serviceType
                    )?.label
                  }
                </Typography>
                <Typography className="font-inter font-light" fontSize={17}>
                  {t('reschedule.details.serviceField')}:
                </Typography>
                <Typography className="font-inter font-light" fontSize={14}>
                  {
                    services.find(
                      (service) => String(service.value) === bookingForm.service
                    )?.label
                  }
                </Typography>
              </div>
              <Typography className="font-inter font-light mb-1" fontSize={17}>
                Wroclaw,{' '}
                {
                  studios?.find(
                    (studio) => String(studio.id) === bookingForm.studio
                  )?.address
                }
              </Typography>
              <Typography className="font-inter font-light mb-6" fontSize={17}>
                +48 780-743-556
              </Typography>
              <Button
                name={t('reschedule.buttonReturn')}
                href="/"
                onClick={onClickHandler}
              />
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
      messages: (await import(`../../messages/${context.locale}.json`)).default,
    },
  }
}
