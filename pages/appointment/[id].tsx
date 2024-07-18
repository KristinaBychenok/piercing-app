import { useEffect, useState } from 'react'
import { Form } from '../../components/form/form'
import { ContentWrapper } from '../../components/layouts/contentWrapper'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import {
  BookingDataT,
  addAppointmentData,
} from '../../components/form/form.slice'
import {
  AppointmentDataT,
  fetchSchedule,
  fetchServices,
  getAppointment,
} from '../../helpers/fetch.helpers'
import {
  DateTime,
  LoadedDataType,
  LoadedServicesType,
} from '../../store/index.types'
import { RootState } from '../../store/store'
import { GetStaticPathsContext, GetStaticPropsContext } from 'next'
import { setIsLoading } from '../../store/settings.slice'
import { Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import { addLoadedData, addServices } from '../../store/index.slice'

export default function Appointment({
  loadedData,
}: {
  loadedData: LoadedDataType
}) {
  const t = useTranslations()
  const router = useRouter()
  const dispatch = useDispatch()
  const services = useSelector((state: RootState) => state.loadedData?.services)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    dispatch(setIsLoading(true))

    dispatch(addLoadedData(loadedData.data))
    dispatch(addServices(loadedData.services))

    const getAppointmentData = async () => {
      const loadedAppointmentData: AppointmentDataT | undefined =
        await getAppointment(router.query.id as string)

      if (loadedAppointmentData?.error_message || !loadedAppointmentData) {
        setIsError(true)
        return
      }

      const serviceType =
        services.find(
          (service) => String(service.id) === loadedAppointmentData.service
        )?.type || 'ears'

      const appointmentData: BookingDataT = {
        name: loadedAppointmentData.name || '',
        phone: loadedAppointmentData.phone,
        email: loadedAppointmentData.email,
        studio: loadedAppointmentData.studio,
        serviceType: serviceType,
        service: loadedAppointmentData.service,
        date: loadedAppointmentData.date,
        time: loadedAppointmentData.time,
        message: loadedAppointmentData.message,
      }
      dispatch(addAppointmentData({ ...appointmentData }))
      dispatch(setIsLoading(false))
    }

    if (!!router.query.id) getAppointmentData()
  }, [
    dispatch,
    loadedData.data,
    loadedData.services,
    router.query.id,
    services,
  ])

  return (
    <ContentWrapper>
      {!isError && (
        <div className="flex flex-col laptop:flex-row py-6 laptop:py-16 w-full">
          <div className="flex flex-col w-full">
            <Typography
              variant="h2"
              className="font-inter font-basic pb-8"
              fontSize={32}
            >
              {t('reschedule.title')}
            </Typography>
            <Typography className="font-inter font-light pb-10" fontSize={17}>
              {t('reschedule.subTitle')}
            </Typography>
            <Form isEdit={true} appointmentId={router.query.id as string} />
          </div>
        </div>
      )}
      {!!isError && <p>{t('reschedule.error')}</p>}
    </ContentWrapper>
  )
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const loadedData: DateTime[] | undefined = await fetchSchedule('1')
  const loadedServices: LoadedServicesType[] | undefined = await fetchServices()

  return {
    props: {
      loadedData: {
        data: loadedData,
        services: loadedServices,
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
