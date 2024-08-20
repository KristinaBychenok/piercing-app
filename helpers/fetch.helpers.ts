import { BookingDataT } from '../components/form/form.slice'
import {
  DateTime,
  LoadedServicesType,
  LoadedStudiosType,
} from '../store/index.types'

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

export const fetchStudios = async () => {
  try {
    const res = await fetch(
      `https://sea-lion-app-3q9lj.ondigitalocean.app/studios`
    )
    const loadedStudios: LoadedStudiosType[] = await res.json()

    return loadedStudios
  } catch (error) {
    console.log(error)
  }
}

export const postAppointment = async (
  bookingForm: Omit<BookingDataT, 'acceptAgreement' | 'appointmentId'>,
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
          name: bookingForm.name.value,
          phone: bookingForm.phone.value,
          email: bookingForm.email.value,
          studio: bookingForm.studio,
          service: bookingForm.service,
          date: bookingForm.date,
          time: bookingForm.time,
          message: bookingForm.message.value,
          lang: lang,
        }),
      }
    )
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export type GetAppointmentDataT = {
  name: string
  phone: string
  email: string
  studio: string
  serviceType: string
  service: string
  date: string
  time: string
  message: string
  id: string
  error_message?: string
  lang: string
}

export const getAppointment = async (appointmentId: string) => {
  try {
    const res = await fetch(
      `https://sea-lion-app-3q9lj.ondigitalocean.app/appointment/${appointmentId}`
    )

    const loadedAppointment: GetAppointmentDataT = await res.json()

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
  appointmentId: string,
  lang: string
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
          lang: lang,
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
