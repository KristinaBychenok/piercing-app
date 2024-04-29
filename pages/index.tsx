import { Form } from '../components/form/form'
import { DateTime, LoadedDataType, LoadedServicesType } from './index.types'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { addLoadedData, addServices } from './index.slice'
import { fetchSchedule, fetchServices } from '../helpers/fetch.helpers'
import { ModalComponent } from '../components/modal/modal'
import { addStudio } from '../components/form/form.slice'

export default function Home({ loadedData }: { loadedData: LoadedDataType }) {
  const dispatch = useDispatch()
  console.log('loadedServices', loadedData)

  useEffect(() => {
    dispatch(addLoadedData(loadedData.data))
    dispatch(addServices(loadedData.services))
    dispatch(addStudio('1'))
  }, [dispatch, loadedData])

  return (
    <>
      <Form />
      <ModalComponent />
    </>
  )
}

export async function getStaticProps() {
  const loadedData: DateTime[] | undefined = await fetchSchedule('1')
  const loadedServices: LoadedServicesType[] | undefined = await fetchServices()

  // By returning { props: { loadedData } }, the Home component
  // will receive `loadedData` as a prop at build time
  return {
    props: {
      loadedData: {
        data: loadedData,
        services: loadedServices,
      },
    },
  }
}
