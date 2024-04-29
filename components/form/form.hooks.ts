import { RootState } from '../../store/store'
import { ChangeEventHandler, MouseEventHandler } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addName,
  addPhone,
  addEmail,
  addStudio,
  addService,
  addDate,
  addTime,
  addServiceType,
} from './form.slice'
import { Dayjs } from 'dayjs'
import { DateTime, LoadedDataType } from '../../pages/index.types'
import { fetchSchedule, postAppointment } from '../../helpers/fetch.helpers'
import { addLoadedData, clearLoadedData } from '../../pages/index.slice'
import { setIsModalOpen } from '../../store/settings.slice'

// const nameRegex = /[A-Za-z]+/i
// const phoneRegex = /([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[Ee]([+-]?\d+))?/i

export const useChangeFormHook = () => {
  const bookingForm = useSelector((state: RootState) => state.bookingForm)
  const dispatch = useDispatch()

  const handleChangeName: ChangeEventHandler<HTMLInputElement> = (value) => {
    dispatch(addName(value.target.value))
  }

  const handleChangePhone: ChangeEventHandler<HTMLInputElement> = (value) => {
    dispatch(addPhone(value.target.value))
  }
  const handleChangeEmail: ChangeEventHandler<HTMLInputElement> = (value) => {
    dispatch(addEmail(value.target.value))
  }
  const handleSelectServiceType: ChangeEventHandler<HTMLInputElement> = (
    value
  ) => {
    dispatch(addServiceType(value.target.value))
  }
  const handleSelectService: ChangeEventHandler<HTMLInputElement> = (value) => {
    dispatch(addService(String(value.target.value)))
  }
  const handleSelectStudio: ChangeEventHandler<HTMLInputElement> = async (
    value
  ) => {
    dispatch(addStudio(value.target.value))
    if (bookingForm.date) {
      dispatch(addDate(''))
    }
    if (bookingForm.time) {
      dispatch(addTime(''))
    }
    const loadedData: DateTime[] | undefined = await fetchSchedule(
      value.target.value
    )
    dispatch(addLoadedData(loadedData || []))
  }
  const handleChangeDate = (date: Dayjs) => {
    dispatch(addDate(date.format('YYYY-MM-DD')))
  }
  const handleChangeTime: ChangeEventHandler<HTMLInputElement> = (value) => {
    dispatch(addTime(value.target.value))
  }

  const handleSubmitForm: MouseEventHandler<HTMLButtonElement> = async () => {
    const result: { number_appointment: number } = await postAppointment({
      name: bookingForm.name,
      phone: bookingForm.phone,
      email: bookingForm.email,
      studio: bookingForm.studio,
      serviceType: bookingForm.serviceType,
      service: bookingForm.service,
      date: bookingForm.date,
      time: bookingForm.time,
    })
    dispatch(
      setIsModalOpen({ isOpen: true, appointment: result.number_appointment })
    )
    const loadedData = await fetchSchedule('1')
    dispatch(addLoadedData(loadedData || []))
  }

  return {
    handleChangeName,
    handleChangePhone,
    handleChangeEmail,
    handleSelectServiceType,
    handleSelectService,
    handleSelectStudio,
    handleChangeDate,
    handleChangeTime,
    handleSubmitForm,
  }
}
