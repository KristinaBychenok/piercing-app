import { BookingDataT } from '../components/form/form.slice'
import { DateTime, LoadedServicesType } from '../store/index.types'

export type AppointmentDataT = Omit<BookingDataT, 'serviceType'> & {
  id: string
  error_message?: string
}

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

export const postAppointment = async (
  bookingForm: BookingDataT,
  lang: string
) => {
  try {
    const res = await fetch(
      'https://sea-lion-app-3q9lj.ondigitalocean.app/appointment',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: bookingForm.name,
          phone: bookingForm.phone,
          email: bookingForm.email,
          studio: bookingForm.studio,
          service: bookingForm.service,
          date: bookingForm.date,
          time: bookingForm.time,
          message: bookingForm.message,
          lang: lang,
        }),
      }
    )
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export const getAppointment = async (appointmentId: string) => {
  try {
    const res = await fetch(
      `https://sea-lion-app-3q9lj.ondigitalocean.app/appointment/${appointmentId}`
    )

    const loadedAppointment: AppointmentDataT = await res.json()

    return loadedAppointment
  } catch (error) {
    console.log(error)
  }
}

type editAppointmentDataT = {
  studio?: string
  serviceType?: string
  service?: string
  date?: string
  time?: string
  message?: string
}
export const editAppointment = async (
  bookingForm: editAppointmentDataT,
  appointmentId: string
) => {
  try {
    const res = await fetch(
      `https://sea-lion-app-3q9lj.ondigitalocean.app/appointment/${appointmentId}/edit`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studio: bookingForm.studio,
          service: bookingForm.service,
          date: bookingForm.date,
          time: bookingForm.time,
          message: bookingForm.message,
        }),
      }
    )
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export const deleteAppointment = async (appointmentId: string) => {
  try {
    const res = await fetch(
      `https://sea-lion-app-3q9lj.ondigitalocean.app/appointment/${appointmentId}/delete`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return res.json()
  } catch (error) {
    console.log(error)
  }
}
