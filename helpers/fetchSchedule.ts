import { LoadedDataType } from '@/pages/index.types'

export const fetchSchedule = async (studio: string) => {
  try {
    const res = await fetch(
      `https://sea-lion-app-3q9lj.ondigitalocean.app/schedule?studio=${studio}`
    )
    const loadedData: LoadedDataType = await res.json()

    return loadedData
  } catch (error) {
    console.log(error)
  }
}
