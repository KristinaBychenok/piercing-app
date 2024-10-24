import { BookingDataT } from '../components/form/form.slice'
import {
  DateTime,
  LoadedServicesType,
  LoadedStudiosType,
} from '../store/index.types'

const URL = 'https://daryauo-piercing.pl/'

export const fetchSchedule = async (studio: string) => {
  try {
    const res = await fetch(`${URL}schedule?studio=${studio}`)
    const loadedData: { data: DateTime[] } = await res.json()

    return loadedData.data
  } catch (error) {
    console.log('Failed fetch studios schedule', error)
  }
}

export const fetchServices = async () => {
  try {
    const res = await fetch(`${URL}services`)
    const loadedServices: LoadedServicesType[] = await res.json()

    return loadedServices
  } catch (error) {
    console.log('Failed fetch services', error)
  }
}

export const fetchStudios = async () => {
  try {
    const res = await fetch(`${URL}studios`)
    const loadedStudios: LoadedStudiosType[] = await res.json()

    return loadedStudios
  } catch (error) {
    console.log('Failed fetch studios', error)
  }
}

export const postAppointment = async (
  bookingForm: Omit<BookingDataT, 'appointmentId'>,
  lang: string
) => {
  try {
    const res = await fetch(`${URL}appointment`, {
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
        consent: bookingForm.acceptAgreement,
        lang: lang,
      }),
    })
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
    const res = await fetch(`${URL}appointment/${appointmentId}`)

    const loadedAppointment: GetAppointmentDataT = await res.json()

    return loadedAppointment
  } catch (error) {
    console.log('Failed fetch appointment', error)
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
    const res = await fetch(`${URL}appointment/${appointmentId}/edit`, {
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
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export const deleteAppointment = async (appointmentId: string) => {
  try {
    const res = await fetch(`${URL}appointment/${appointmentId}/delete`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}
