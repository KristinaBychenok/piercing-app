export type LoadedDataType = {
  data: DateTime[]
  services: LoadedServicesType[]
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
  name_eng: string
  name_pl: string
  type: string
}
