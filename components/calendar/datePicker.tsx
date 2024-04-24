import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { ChangeEventHandler, FC, useCallback } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'
import { LoadedDataType } from '@/pages/index.types'
import { datePickerStyles } from './datePicker.constants'

type DatePickerPropsT = {
  handleChangeDate: (day: Dayjs) => void
}

// const StyledDay = styled(PickersDay)(({ theme }) => ({
//   borderRadius: theme.shape.borderRadius,
//   color:
//     theme.palette.mode === 'light'
//       ? theme.palette.secondary.dark
//       : theme.palette.secondary.light,
// }))

export const DatePicker: FC<DatePickerPropsT> = ({ handleChangeDate }) => {
  const loadedData = useSelector((state: RootState) => state.loadedData)

  const maxDay = dayjs().add(20, 'day')

  const isAvailable = useCallback(
    (date: Dayjs): boolean => {
      const day = date.format('YYYY-MM-DD')
      let result = false

      loadedData.data.forEach((item) => {
        if (item.date === day) result = !item.isAvailable
      })

      return result
    },
    [loadedData.data]
  )

  return (
    <div className="flex flex-col mb-5">
      {/* <p>Date</p> */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          views={['month', 'day']}
          disablePast
          maxDate={maxDay}
          shouldDisableDate={isAvailable}
          onChange={handleChangeDate}
          sx={datePickerStyles}
        />
      </LocalizationProvider>
    </div>
  )
}
