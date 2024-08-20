import {
  DateTime,
  LoadedDataType,
  LoadedServicesType,
  LoadedStudiosType,
} from '../store/index.types'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
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
import { GetStaticPropsContext } from 'next'
import { RootState } from '../store/store'
import { Contacts } from '../components/sections/contacts/contacts'

export default function Home({ loadedData }: { loadedData: LoadedDataType }) {
  const dispatch = useDispatch()
  const bookingForm = useSelector(
    (state: RootState) => state.bookingForm.bookingData
  )
  const studios = useSelector((state: RootState) => state.loadedData.studios)

  useEffect(() => {
    dispatch(addServices(loadedData.services))
    dispatch(addStudios(loadedData.studios))

    const loadedScheduleData = async () => {
      const studioId = bookingForm.studio || String(loadedData.studios[0].id)

      const data: DateTime[] = (await fetchSchedule(studioId)) as DateTime[]
      dispatch(addLoadedData(data))
      dispatch(addStudio(studioId))
    }
    loadedScheduleData()
  }, [
    bookingForm.studio,
    dispatch,
    loadedData.services,
    loadedData.studios,
    studios,
  ])

  return (
    <Wrapper>
      <Main />
      <Booking />
      <About />
      <Contacts />
      <BookingConfirmationModal />
    </Wrapper>
  )
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const loadedServices: LoadedServicesType[] =
    (await fetchServices()) as LoadedServicesType[]
  const loadedStudios: LoadedStudiosType[] =
    (await fetchStudios()) as LoadedStudiosType[]

  // By returning { props: { loadedData } }, the Home component
  // will receive `loadedData` as a prop at build time
  return {
    props: {
      messages: (await import(`../messages/${context.locale}.json`)).default,
      loadedData: {
        services: loadedServices,
        studios: loadedStudios,
      },
    },
  }
}
