export type LoadedDataType = {
  data: DateTime[]
}

interface DateTime {
  busyTimes: string[] | []
  date: string
  isAvailable: boolean
}
