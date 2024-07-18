import {
  DateTime,
  LoadedDataType,
  LoadedServicesType,
} from '../store/index.types'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { addLoadedData, addServices } from '../store/index.slice'
import { fetchSchedule, fetchServices } from '../helpers/fetch.helpers'
import { ModalComponent } from '../components/modal/modal'
import { addStudio } from '../components/form/form.slice'
import { Main } from '../components/sections/main/main'
import { About } from '../components/sections/about/about'
import { Contacts } from '../components/sections/contacts/contacts'
import { Wrapper } from '../components/layouts/wrapper'
import { GetStaticPropsContext } from 'next'

export default function Home({ loadedData }: { loadedData: LoadedDataType }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(addLoadedData(loadedData.data))
    dispatch(addServices(loadedData.services))
    dispatch(addStudio('1'))
  }, [loadedData.data, loadedData.services])

  return (
    <Wrapper>
      <Main />
      <About />
      <Contacts />
      <ModalComponent />
    </Wrapper>
  )
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const loadedData: DateTime[] | undefined = await fetchSchedule('1')
  const loadedServices: LoadedServicesType[] | undefined = await fetchServices()

  // By returning { props: { loadedData } }, the Home component
  // will receive `loadedData` as a prop at build time
  return {
    props: {
      messages: (await import(`../messages/${context.locale}.json`)).default,
      loadedData: {
        data: loadedData,
        services: loadedServices,
      },
    },
  }
}
