export type LoadedDataType = {
  data: FetchScheduleResult
  services: FetchServicesResult
  studios: FetchStudiosResult
}

export type LoadedDataSliceType = {
  data: DateTime[]
  services: LoadedServicesType[]
  studios: LoadedStudiosType[]
}

export interface DateTime {
  busyTimes: string[] | []
  date: string
  isAvailable: boolean
}

export type LoadedServicesType = {
  amt_time: number
  cost: number
  id: number
  name: string
  type: string
}

export type LoadedStudiosType = {
  address: string
  id: number
}

export type FetchScheduleResult = {
  success: boolean
  data?: DateTime[]
  error?: string
}

export type FetchServicesResult = {
  success: boolean
  loadedServices?: LoadedServicesType[]
  error?: string
}

export type FetchStudiosResult = {
  success: boolean
  loadedStudios?: LoadedStudiosType[]
  error?: string
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

export type FetchAppointmentResult = {
  success: boolean
  loadedAppointment?: GetAppointmentDataT
  error?: string
}

export type PostAppointmentResult = {
  success: boolean
  result?: { number_appointment: string }
  error?: string
}

export type EditAppointmentResult = {
  success: boolean
  result?: { message: string }
  error?: string
}

export type DeleteAppointmentResult = {
  success: boolean
  result?: { message: string }
  error?: string
}
