import { BookingDataT } from '../components/form/form.slice'
import {
  DateTime,
  LoadedServicesType,
  LoadedStudiosType,
  FetchScheduleResult,
  FetchServicesResult,
  FetchStudiosResult,
  FetchAppointmentResult,
  GetAppointmentDataT,
  EditAppointmentResult,
  PostAppointmentResult,
  DeleteAppointmentResult,
} from '../store/index.types'

const URL = 'https://api.daryauo-piercing.pl/'

export const fetchSchedule = async (
  studio: string
): Promise<FetchScheduleResult> => {
  try {
    const res = await fetch(`${URL}schedule?studio=${studio}`)
    if (res.status !== 200) {
      throw new Error(
        'An error occurred while loading the schedule. Please refresh the page and try again.'
      )
    }

    const loadedData: { data: DateTime[] } = await res.json()

    return { success: true, data: loadedData.data }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export const fetchServices = async (): Promise<FetchServicesResult> => {
  try {
    const res = await fetch(`${URL}services`)
    if (res.status !== 200) {
      throw new Error(
        'An error occurred while loading services. Please refresh the page and try again.'
      )
    }

    const loadedServices: LoadedServicesType[] = await res.json()

    return { success: true, loadedServices: loadedServices }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export const fetchStudios = async (): Promise<FetchStudiosResult> => {
  try {
    const res = await fetch(`${URL}studios`)

    if (res.status !== 200) {
      throw new Error(
        'An error occurred while loading studios. Please refresh the page and try again.'
      )
    }

    const loadedStudios: LoadedStudiosType[] = await res.json()

    return { success: true, loadedStudios: loadedStudios }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export const postAppointment = async (
  bookingForm: Omit<BookingDataT, 'appointmentId'>,
  lang: string
): Promise<PostAppointmentResult> => {
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

    if (res.status !== 200) {
      throw new Error(
        'An error occurred while adding appointment. Please refresh the page and try again.'
      )
    }

    const result = await res.json()

    return { success: true, result: result }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export const getAppointment = async (
  appointmentId: string
): Promise<FetchAppointmentResult> => {
  try {
    const res = await fetch(`${URL}appointment/${appointmentId}`)

    if (res.status !== 200) {
      throw new Error(
        'An error occurred while loading appointment data. Please refresh the page and try again.'
      )
    }
    const loadedAppointment: GetAppointmentDataT = await res.json()

    return { success: true, loadedAppointment: loadedAppointment }
  } catch (error) {
    return { success: false, error: (error as Error).message }
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
): Promise<EditAppointmentResult> => {
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

    if (res.status !== 200) {
      throw new Error(
        'An error occurred while editing appointment. Please refresh the page and try again.'
      )
    }

    const result = await res.json()

    return { success: true, result: result }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export const deleteAppointment = async (
  appointmentId: string
): Promise<DeleteAppointmentResult> => {
  try {
    const res = await fetch(`${URL}appointment/${appointmentId}/delete`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.status !== 200) {
      throw new Error(
        'An error occurred while deleting appointment. Please refresh the page and try again.'
      )
    }

    const result = await res.json()

    return { success: true, result: result }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}
