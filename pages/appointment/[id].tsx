import { useCallback, useEffect, useState } from 'react'
import { Form } from '../../components/form/form'
import { ContentWrapper } from '../../components/layouts/contentWrapper'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import {
  BookingDataT,
  addAppointmentData,
  clearForm,
} from '../../components/form/form.slice'
import {
  GetAppointmentDataT,
  fetchSchedule,
  fetchServices,
  fetchStudios,
  getAppointment,
} from '../../helpers/fetch.helpers'
import {
  DateTime,
  LoadedDataType,
  LoadedServicesType,
  LoadedStudiosType,
} from '../../store/index.types'
import { RootState } from '../../store/store'
import { GetStaticPathsContext, GetStaticPropsContext } from 'next'
import { setIsLoading } from '../../store/settings.slice'
import { Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import { addLoadedData, addServices, addStudios } from '../../store/index.slice'
import Link from 'next/link'
import { AskDeleteAppointment } from '../../components/modals/askDeleteAppointment'
import Image from 'next/image'
import { Logo } from '../../components/logo/logo'

export default function Appointment({
  loadedData,
}: {
  loadedData: LoadedDataType & { loadedAppointmentData: GetAppointmentDataT }
}) {
  const t = useTranslations()
  const router = useRouter()
  const dispatch = useDispatch()
  const services = useSelector((state: RootState) => state.loadedData?.services)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (
      loadedData.loadedAppointmentData.lang &&
      router.locale !== loadedData.loadedAppointmentData.lang
    ) {
      router.push(router.asPath, router.asPath, {
        locale: loadedData.loadedAppointmentData.lang,
      })
    }
  }, [loadedData.loadedAppointmentData.lang, router])

  useEffect(() => {
    dispatch(setIsLoading(true))

    dispatch(addLoadedData(loadedData.data))
    dispatch(addServices(loadedData.services))
    dispatch(addStudios(loadedData.studios))

    const loadedAppointmentData = loadedData.loadedAppointmentData
    if (loadedAppointmentData?.error_message || !loadedAppointmentData) {
      setIsError(true)
      return
    }

    const serviceType =
      services.find(
        (service) => String(service.id) === loadedAppointmentData.service
      )?.type || 'ears'

    const appointmentData: BookingDataT = {
      name: { value: loadedAppointmentData.name, isValid: true },
      phone: { value: loadedAppointmentData.phone, isValid: true },
      email: { value: loadedAppointmentData.email, isValid: true },
      studio: loadedAppointmentData.studio,
      serviceType: serviceType,
      service: loadedAppointmentData.service,
      date: loadedAppointmentData.date,
      time: loadedAppointmentData.time,
      message: { value: loadedAppointmentData.message || '', isValid: true },
      acceptAgreement: false,
      appointmentId: loadedAppointmentData.id,
    }
    dispatch(addAppointmentData({ ...appointmentData }))

    dispatch(setIsLoading(false))
  }, [
    dispatch,
    loadedData.data,
    loadedData.loadedAppointmentData,
    loadedData.services,
    loadedData.studios,
    services,
  ])

  const onClickLogoHandler = useCallback(() => {
    dispatch(clearForm())
  }, [dispatch])

  return (
    <div className="flex flex-col w-full h-fit">
      <div
        className={`flex w-full h-[1px] bg-white absolute top-[122px]`}
      ></div>
      <ContentWrapper>
        {!isError && (
          <div className="flex flex-col w-full m-auto">
            <Link
              href={'/'}
              className="text-2xl my-7 font-sans font-inter"
              onClick={onClickLogoHandler}
            >
              <Logo />
            </Link>
            <div className="flex flex-col laptop:flex-row py-6 laptop:py-16 w-full">
              <div className="flex flex-col w-full m-auto">
                <Typography
                  variant="h2"
                  className="font-inter font-basic pb-8"
                  fontSize={32}
                >
                  {t('reschedule.title')}
                </Typography>
                <Typography
                  className="font-inter font-light pb-10"
                  fontSize={17}
                >
                  {t('reschedule.subTitle')}
                </Typography>
                <div className="flex flex-row">
                  <Form
                    isEdit={true}
                    appointmentId={router.query.id as string}
                  />
                  <div className="hidden laptop:flex flex-col w-[297px] h-[970px] laptop:pt-10 laptop:ml-20">
                    <Image
                      src={'/reschedule.jpg'}
                      alt="reschedule-image"
                      width={297}
                      height={770}
                      className="overflow-auto h-[770px] object-cover"
                      priority={false}
                    />
                    <Typography className="invisible laptop:visible laptop:flex font-inter font-basic text-48 desktop:text-56 text-grey-strong text-end pt-8">
                      Enhance Style
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <AskDeleteAppointment appointmentId={router.query.id as string} />
        {!!isError && (
          <Typography
            variant="h2"
            className="font-inter font-basic p-8"
            fontSize={32}
          >
            {t('reschedule.error')}
          </Typography>
        )}
      </ContentWrapper>
    </div>
  )
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const loadedAppointmentData: GetAppointmentDataT = (await getAppointment(
    context.params?.id as string
  )) as GetAppointmentDataT
  const loadedStudios: LoadedStudiosType[] =
    (await fetchStudios()) as LoadedStudiosType[]
  const loadedServices: LoadedServicesType[] =
    (await fetchServices()) as LoadedServicesType[]
  const loadedData: DateTime[] = (await fetchSchedule(
    loadedAppointmentData?.studio || String(loadedStudios[0].id)
  )) as DateTime[]

  return {
    props: {
      loadedData: {
        data: loadedData,
        services: loadedServices,
        studios: loadedStudios,
        loadedAppointmentData: loadedAppointmentData,
      },
      messages: (await import(`../../messages/${context.locale}.json`)).default,
    },
  }
}

export const getStaticPaths = async (context: GetStaticPathsContext) => {
  return {
    paths: [],
    fallback: 'blocking', // true, false or "blocking"
  }
}
