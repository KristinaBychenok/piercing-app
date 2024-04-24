import { RootState } from '@/store/store'
import { ChangeEventHandler, MouseEventHandler } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addName,
  addPhone,
  addStudio,
  addProcedure,
  addDate,
  addTime,
} from './form.slice'
import dayjs, { Dayjs } from 'dayjs'
import { LoadedDataType } from '@/pages/index.types'
import { fetchSchedule } from '@/helpers/fetchSchedule'
import { addLoadedData } from '@/pages/index.slice'

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
  const handleSelectProcedure: ChangeEventHandler<HTMLInputElement> = (
    value
  ) => {
    dispatch(addProcedure(value.target.value))
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
    const loadedData: LoadedDataType | undefined = await fetchSchedule(
      value.target.value
    )
    dispatch(
      addLoadedData(
        loadedData || {
          data: [],
        }
      )
    )
  }
  const handleChangeDate = (date: Dayjs) => {
    dispatch(addDate(date.format('YYYY-MM-DD')))
  }
  const handleChangeTime: ChangeEventHandler<HTMLInputElement> = (value) => {
    dispatch(addTime(value.target.value))
  }

  const handleSubmitForm: MouseEventHandler<HTMLButtonElement> = async () => {
    const res = await fetch(
      'https://sea-lion-app-3q9lj.ondigitalocean.app/appointment',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':
            'https://sea-lion-app-3q9lj.ondigitalocean.app/appointment',
        },
        body: JSON.stringify({
          name: bookingForm.name,
          phone: bookingForm.phone,
          studio: bookingForm.studio,
          service: bookingForm.procedure,
          date: bookingForm.date,
          time: bookingForm.time,
        }),
        // mode: 'no-cors',
      }
    )
    // if (res.body)
    const data = res.body
    console.log(res)
  }

  return {
    handleChangeName,
    handleChangePhone,
    handleSelectProcedure,
    handleSelectStudio,
    handleChangeDate,
    handleChangeTime,
    handleSubmitForm,
  }
}
