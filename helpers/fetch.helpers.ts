import { FormStateT } from '../components/form/form.slice'
import {
  DateTime,
  LoadedDataType,
  LoadedServicesType,
} from '../pages/index.types'

export const fetchSchedule = async (studio: string) => {
  try {
    const res = await fetch(
      `https://sea-lion-app-3q9lj.ondigitalocean.app/schedule?studio=${studio}`
    )
    const loadedData: { data: DateTime[] } = await res.json()

    return loadedData.data
  } catch (error) {
    console.log(error)
  }
}

export const fetchServices = async () => {
  try {
    const res = await fetch(
      `https://sea-lion-app-3q9lj.ondigitalocean.app/services`
    )
    const loadedServices: LoadedServicesType[] = await res.json()

    return loadedServices
  } catch (error) {
    console.log(error)
  }
}

export const postAppointment = async (bookingForm: FormStateT) => {
  try {
    const res = await fetch(
      'https://sea-lion-app-3q9lj.ondigitalocean.app/appointment',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin':
          //   'https://sea-lion-app-3q9lj.ondigitalocean.app/appointment',
        },
        body: JSON.stringify({
          name: bookingForm.name,
          phone: bookingForm.phone,
          email: bookingForm.email,
          studio: bookingForm.studio,
          service: bookingForm.service,
          date: bookingForm.date,
          time: bookingForm.time,
        }),
      }
    )
    return res.json()
  } catch (error) {
    console.log(error)
  }
}
