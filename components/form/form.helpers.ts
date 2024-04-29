import { DateTime, LoadedServicesType } from '../../pages/index.types'
import dayjs from 'dayjs'

export const getTimes = (bookingFormDate: string, loadedData: DateTime[]) => {
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

  if (loadedDate) {
    loadedDate.busyTimes.forEach((time) => {
      avaliableTimes = avaliableTimes.filter((item) => item !== time)
    })
  }

  return avaliableTimes
}

export const getServices = (
  services: LoadedServicesType[],
  serviseType: string,
  lang: string
) => {
  return services
    .filter((service) => service.type === serviseType)
    .map((service) => {
      return {
        value: service.id,
        label: `${lang === 'en' ? service.name_eng : service.name_pl} - ${
          service.cost
        }zl - ${service.amt_time}min`,
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
