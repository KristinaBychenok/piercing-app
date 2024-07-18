import { DateTime, LoadedServicesType } from '../../store/index.types'
import dayjs from 'dayjs'

export const getTimes = (
  bookingFormDate: string,
  loadedData: DateTime[],
  isEdit: boolean
) => {
  const selectedDate = bookingFormDate

  const loadedDate = loadedData.find((item) => item.date === selectedDate)
  const isDateAvaliable = loadedDate ? loadedDate.isAvailable : true

  if (!selectedDate || !isDateAvaliable) {
    return []
  }

  const isToday = selectedDate === dayjs().format('YYYY-MM-DD')
  const currentTime = dayjs().hour()
  const hours = ['11', '12', '13', '14', '15', '16', '17', '18', '19']
  const minutes = ['00', '15', '30', '45']
  let avaliableTimes: string[] = []

  if (!isToday) {
    hours.forEach((hour) => {
      minutes.forEach((minute) => avaliableTimes.push(hour + ':' + minute))
    })
  } else {
    if (currentTime < 11) {
      hours.forEach((hour) => {
        minutes.forEach((minute) => avaliableTimes.push(hour + ':' + minute))
      })
    }
    if (currentTime > 11 && currentTime < 20) {
      const timeIndex = hours.findIndex(
        (item) => item === String(currentTime + 1)
      )
      if (!!timeIndex) {
        hours.slice(timeIndex).forEach((hour) => {
          minutes.forEach((minute) => avaliableTimes.push(hour + ':' + minute))
        })
      }
    }
  }

  if (loadedDate && !isEdit) {
    loadedDate.busyTimes.forEach((time) => {
      avaliableTimes = avaliableTimes.filter((item) => item !== time)
    })
  }

  return avaliableTimes
}

export const getServices = (
  services: LoadedServicesType[],
  serviseType: string
) => {
  return services
    .filter((service) => service.type === serviseType)
    .map((service) => {
      return {
        value: service.id,
        name: service.name,
        type: service.type,
        cost: service.cost,
        time: service.amt_time,
      }
    })
}

export const getServiceTypes = (services: LoadedServicesType[]) => {
  return services.reduce((acc, service) => {
    if (acc.find((value) => value.value === service.type)) {
      return acc
    } else {
      acc.push({
        value: service.type,
        label: service.type,
      })
    }
    return acc
  }, [] as { value: string; label: string }[])
}

export const getDeletedTimes = (times: string[], duration: number) => {
  const deletedTimes: string[] = []

  times.forEach((timeString) => {
    const count = Math.ceil(duration / 15)

    // Convert time string to a Date object
    let date = new Date()
    let [hours, minutes] = timeString.split(':').map(Number)
    date.setHours(hours, minutes, 0, 0)

    // Subtract the duration (in milliseconds) count times
    for (let i = 1; i < count; i++) {
      date.setTime(date.getTime() - 15 * 60000)

      // Convert the Date object back to a time string
      let newHours = String(date.getHours()).padStart(2, '0')
      let newMinutes = String(date.getMinutes()).padStart(2, '0')
      let newTimeString = `${newHours}:${newMinutes}`
      deletedTimes.push(newTimeString)
    }
  })

  return deletedTimes
}
