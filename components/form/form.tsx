import { FC, useMemo } from 'react'
import { useChangeFormHook } from './form.hooks'
import { DatePicker } from '../calendar/datePicker'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { LoadedDataType } from '@/pages/index.types'
import { TimePickerComponent } from '../calendar/timePicker'
import { FormControl, InputLabel, MenuItem, TextField } from '@mui/material'
import { ThemeProvider, useTheme } from '@mui/material/styles'
import { customFieldTheme, procedures, studios } from './form.constants'
import dayjs from 'dayjs'

export const Form: FC = () => {
  const bookingForm = useSelector((state: RootState) => state.bookingForm)
  const loadedData = useSelector((state: RootState) => state.loadedData)

  const times = useMemo(() => {
    const selectedDate = bookingForm.date

    const loadedDate = loadedData.data.find(
      (item) => item.date === selectedDate
    )
    const isDateAvaliable = loadedDate ? loadedDate.isAvailable : true

    if (!selectedDate || !isDateAvaliable) {
      return []
    }

    const isToday = selectedDate === dayjs().format('YYYY-MM-DD')
    const currentTime = dayjs().hour()
    const hours = ['11', '12', '13', '14', '15', '16', '17', '18', '19']
    const minutes = ['00', '15', '30', '45']
    const avaliableTimes: string[] = []

    if (!isToday) {
      hours.forEach((hour) => {
        minutes.forEach((minute) => avaliableTimes.push(hour + ':' + minute))
      })
      console.log('Not today')
    } else {
      if (currentTime < 11) {
        hours.forEach((hour) => {
          minutes.forEach((minute) => avaliableTimes.push(hour + ':' + minute))
        })
        console.log('currentTime < 11')
      } else if (currentTime > 20) {
        console.log('currentTime > 20')
        return avaliableTimes
      } else {
        const timeIndex = hours.findIndex(
          (item) => item === String(currentTime + 1)
        )
        console.log('timeIndex', timeIndex)
        if (!!timeIndex) {
          hours.slice(timeIndex).forEach((hour) => {
            minutes.forEach((minute) =>
              avaliableTimes.push(hour + ':' + minute)
            )
          })
          console.log('avaliableTimes', avaliableTimes)
        } else {
          console.log('no timeIndex')
          return avaliableTimes
        }
      }
    }

    return avaliableTimes
  }, [bookingForm.date, loadedData.data])

  const outerTheme = useTheme()

  const {
    handleChangeName,
    handleChangePhone,
    handleSelectProcedure,
    handleSelectStudio,
    handleChangeDate,
    handleChangeTime,
    handleSubmitForm,
  } = useChangeFormHook()

  return (
    <div className="flex flex-col w-full md:w-[572px] p-4 md:px-8 xl:px-12 py-10 border-y md:border md:mx-12">
      <FormControl>
        <p className="pb-8">
          Feel free to reach out to me for any questions or opportunities!
        </p>
        <ThemeProvider theme={customFieldTheme(outerTheme)}>
          <TextField
            type="text"
            required
            id="name"
            label="Name"
            placeholder="Name"
            fullWidth
            onChange={handleChangeName}
          />
          <TextField
            type="text"
            required
            id="phone"
            label="Phone"
            placeholder="Phone"
            fullWidth
            onChange={handleChangePhone}
          />
          <TextField
            required
            id="procedure"
            label="Procedure"
            placeholder="Procedure"
            fullWidth
            select
            onChange={handleSelectProcedure}
          >
            {procedures.map((procedure) => {
              return (
                <MenuItem key={procedure.value} value={procedure.value}>
                  {procedure.label}
                </MenuItem>
              )
            })}
          </TextField>
          <TextField
            required
            id="studio"
            label="Studio"
            placeholder="Studio"
            fullWidth
            select
            onChange={handleSelectStudio}
            defaultValue={'2'}
          >
            {studios.map((studio) => {
              return (
                <MenuItem key={studio.value} value={studio.value}>
                  {studio.label}
                </MenuItem>
              )
            })}
          </TextField>
          <DatePicker handleChangeDate={handleChangeDate} />
          <TextField
            required
            id="time"
            label="Time"
            placeholder="Time"
            fullWidth
            select
            onChange={handleChangeTime}
          >
            {times.map((timeSlot) => {
              return (
                <MenuItem key={timeSlot} value={timeSlot}>
                  {timeSlot}
                </MenuItem>
              )
            })}
          </TextField>
        </ThemeProvider>
        {/* <TimePickerComponent /> */}
        {/* <div className="flex flex-col m-2">
          <label htmlFor="time">Available Time</label>
          <input type="time" id="time" onChange={handleChangeTime} />
        </div> */}

        <button
          type="button"
          onClick={handleSubmitForm}
          className="flex flex-col m-4 p-5 w-60 items-center self-center rounded-md border"
        >
          Book Now
        </button>
      </FormControl>
    </div>
  )
}
