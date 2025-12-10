import {
  DateTime,
  FetchScheduleResult,
  FetchServicesResult,
  FetchStudiosResult,
  LoadedDataType,
  LoadedServicesType,
  LoadedStudiosType,
} from '../store/index.types'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { addLoadedData, addServices, addStudios } from '../store/index.slice'
import {
  fetchSchedule,
  fetchServices,
  fetchStudios,
} from '../helpers/fetch.helpers'
import { BookingConfirmationModal } from '../components/modals/bookingConfirmation'
import { addStudio } from '../components/form/form.slice'
import { Main } from '../components/sections/main/main'
import { About } from '../components/sections/about/about'
import { Booking } from '../components/sections/booking/booking'
import { Wrapper } from '../components/layouts/wrapper'
import { GetServerSidePropsContext } from 'next'
import { RootState } from '../store/store'
import { Contacts } from '../components/sections/contacts/contacts'
import { Error } from '../components/error/error'
import { setFetchError } from '@/store/settings.slice'
import { Services } from '@/components/sections/services/services'

export default function Home({ loadedData }: { loadedData: LoadedDataType }) {
  const dispatch = useDispatch()
  const bookingForm = useSelector(
    (state: RootState) => state.bookingForm.bookingData
  )
  const studios = useSelector((state: RootState) => state.loadedData.studios)
  const fetchError = useSelector(
    (state: RootState) => state.settings.fetchError
  )

  // check fetch services errors
  useEffect(() => {
    if (!!loadedData.services.success) {
      const services: LoadedServicesType[] = loadedData.services.loadedServices!
      dispatch(addServices(services))
    } else {
      dispatch(setFetchError(loadedData.services.error!))
    }

    return () => {
      dispatch(setFetchError(''))
    }
  }, [
    dispatch,
    loadedData.services.error,
    loadedData.services.loadedServices,
    loadedData.services.success,
  ])

  // check fetch studios errors
  useEffect(() => {
    if (!!loadedData.studios.success) {
      const studios: LoadedStudiosType[] = loadedData.studios.loadedStudios!
      dispatch(addStudios(studios))
    } else {
      dispatch(setFetchError(loadedData.studios.error!))
    }

    return () => {
      dispatch(setFetchError(''))
    }
  }, [
    dispatch,
    loadedData.studios.error,
    loadedData.studios.loadedStudios,
    loadedData.studios.success,
  ])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const loadedScheduleData = async () => {
      const studioId =
        bookingForm.studio || String(loadedData.studios.loadedStudios?.[0].id)

      const result: FetchScheduleResult = await fetchSchedule(studioId)

      // check fetch schedule errors
      if (!!result.success) {
        const data: DateTime[] = result.data!
        dispatch(addLoadedData(data))
        dispatch(addStudio(studioId))
      } else {
        dispatch(setFetchError(result.error!))
      }
    }
    loadedScheduleData()

    return () => {
      dispatch(setFetchError(''))
    }
  }, [bookingForm.studio, dispatch, loadedData.studios.loadedStudios])

  return (
    <Wrapper>
      {fetchError && (
        <Error
          message={fetchError}
          onClose={() => dispatch(setFetchError(''))}
        />
      )}
      <Main />
      <Services />
      <Booking />
      <About />
      <Contacts />
      <BookingConfirmationModal />
    </Wrapper>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const loadedServicesResult: FetchServicesResult = await fetchServices()
  const loadedStudios: FetchStudiosResult = await fetchStudios()

  return {
    props: {
      messages: (await import(`../messages/${context.locale}.json`)).default,
      loadedData: {
        services: loadedServicesResult,
        studios: loadedStudios,
      },
    },
  }
}
