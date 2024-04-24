import { Form } from '@/components/form/form'
import { LoadedDataType } from './index.types'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { addLoadedData } from './index.slice'
import { fetchSchedule } from '@/helpers/fetchSchedule'

export default function Home({ loadedData }: { loadedData: LoadedDataType }) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(addLoadedData(loadedData))
  }, [dispatch, loadedData])

  return <Form />
}

export async function getStaticProps() {
  const loadedData: LoadedDataType | undefined = await fetchSchedule('2')

  // By returning { props: { loadedData } }, the Home component
  // will receive `loadedData` as a prop at build time
  return {
    props: {
      loadedData,
    },
  }
}
