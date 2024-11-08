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
  fetchSchedule,
  fetchServices,
  fetchStudios,
  getAppointment,
} from '../../helpers/fetch.helpers'
import {
  DateTime,
  FetchAppointmentResult,
  FetchScheduleResult,
  FetchServicesResult,
  FetchStudiosResult,
  GetAppointmentDataT,
  LoadedDataType,
  LoadedServicesType,
  LoadedStudiosType,
} from '../../store/index.types'
import { RootState } from '../../store/store'
import { GetServerSidePropsContext } from 'next'
import { setFetchError, setIsLoading } from '../../store/settings.slice'
import { Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import { addLoadedData, addServices, addStudios } from '../../store/index.slice'
import Link from 'next/link'
import { AskDeleteAppointment } from '../../components/modals/askDeleteAppointment'
import Image from 'next/image'
import { Logo } from '../../components/logo/logo'
import { Error } from '../../components/error/error'

export default function Appointment({
  loadedData,
}: {
  loadedData: LoadedDataType & { loadedAppointmentData: FetchAppointmentResult }
}) {
  const t = useTranslations()
  const router = useRouter()
  const dispatch = useDispatch()
  const services = useSelector((state: RootState) => state.loadedData?.services)
  const [appointmentData, setAppointmentData] = useState(
    {} as GetAppointmentDataT
  )
  const fetchError = useSelector(
    (state: RootState) => state.settings.fetchError
  )

  useEffect(() => {
    // check fetch appointment errors
    if (!!loadedData.loadedAppointmentData.success) {
      const appointment: GetAppointmentDataT =
        loadedData.loadedAppointmentData.loadedAppointment!
      setAppointmentData(appointment)
    } else {
      dispatch(setFetchError(loadedData.loadedAppointmentData.error!))
    }

    return () => {
      dispatch(setFetchError(''))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    loadedData.loadedAppointmentData.error,
    loadedData.loadedAppointmentData.loadedAppointment,
    loadedData.loadedAppointmentData.success,
  ])

  useEffect(() => {
    if (appointmentData.lang && router.locale !== appointmentData.lang) {
      router.push(router.asPath, router.asPath, {
        locale: appointmentData.lang,
      })
    }
  }, [appointmentData.lang, router])

  useEffect(() => {
    dispatch(setIsLoading(true))

    // check fetch schedule errors
    if (!!loadedData.data.success) {
      const data: DateTime[] = loadedData.data.data!
      dispatch(addLoadedData(data))
    } else {
      dispatch(setFetchError(loadedData.data.error!))
    }

    // check fetch services errors
    if (!!loadedData.services.success) {
      const services: LoadedServicesType[] = loadedData.services.loadedServices!
      dispatch(addServices(services))
    } else {
      dispatch(setFetchError(loadedData.services.error!))
    }

    // check fetch studios errors
    if (!!loadedData.studios.success) {
      const studios: LoadedStudiosType[] = loadedData.studios.loadedStudios!
      dispatch(addStudios(studios))
    } else {
      dispatch(setFetchError(loadedData.studios.error!))
    }

    const serviceType =
      services.find((service) => String(service.id) === appointmentData.service)
        ?.type || 'ears'

    const appointmentDataToAdd: BookingDataT = {
      name: { value: appointmentData.name, isValid: true },
      phone: { value: appointmentData.phone, isValid: true },
      email: { value: appointmentData.email, isValid: true },
      studio: appointmentData.studio,
      serviceType: serviceType,
      service: appointmentData.service,
      date: appointmentData.date,
      time: appointmentData.time,
      message: { value: appointmentData.message || '', isValid: true },
      acceptAgreement: false,
      appointmentId: appointmentData.id,
    }
    dispatch(addAppointmentData({ ...appointmentDataToAdd }))

    dispatch(setIsLoading(false))
  }, [
    appointmentData,
    dispatch,
    loadedData.data.data,
    loadedData.data.error,
    loadedData.data.success,
    loadedData.services.error,
    loadedData.services.loadedServices,
    loadedData.services.success,
    loadedData.studios.error,
    loadedData.studios.loadedStudios,
    loadedData.studios.success,
    services,
  ])

  const onClickLogoHandler = useCallback(() => {
    dispatch(clearForm())
    dispatch(setFetchError(''))
  }, [dispatch])

  return (
    <div className="flex flex-col w-full h-fit">
      <div
        className={`flex w-full h-[1px] bg-white absolute top-[122px]`}
      ></div>
      <ContentWrapper>
        {fetchError && (
          <Error
            message={fetchError}
            onClose={() => dispatch(setFetchError(''))}
          />
        )}

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
              <Typography className="font-inter font-light" fontSize={17}>
                {t('reschedule.subTitle')}
              </Typography>
              <div className="flex flex-row">
                <Form isEdit={true} appointmentId={router.query.id as string} />
                <div className="hidden laptop:flex flex-col w-[297px] h-[970px] laptop:pt-10 laptop:ml-20 overflow-hidden object-center">
                  <Image
                    src={'/reschedule.jpg'}
                    alt="reschedule-image"
                    width={6240}
                    height={4160}
                    priority={false}
                    className="h-[770px] object-cover"
                  />
                  <Typography className="invisible laptop:visible laptop:flex font-inter font-basic text-48 desktop:text-56 text-grey-strong text-end pt-8">
                    {t('form.images.style')}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AskDeleteAppointment appointmentId={router.query.id as string} />
      </ContentWrapper>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const loadedAppointmentData: FetchAppointmentResult = await getAppointment(
    context.params?.id as string
  )
  const loadedStudios: FetchStudiosResult = await fetchStudios()
  const loadedServices: FetchServicesResult = await fetchServices()

  const studioId =
    !!loadedAppointmentData.success &&
    !!loadedAppointmentData?.loadedAppointment
      ? loadedAppointmentData?.loadedAppointment?.studio
      : !!loadedStudios.success
      ? String(loadedStudios.loadedStudios?.[0].id)
      : '1'
  const loadedData: FetchScheduleResult = await fetchSchedule(studioId)

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
