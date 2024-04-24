import { RootState } from '@/store/store'
import {
  DigitalClock,
  LocalizationProvider,
  TimePicker,
} from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'

export const TimePickerComponent = () => {
  const date = useSelector((state: RootState) => state.bookingForm.date)
  const today = dayjs().format('YYYY-MM-DD')

  const minTime =
    date === today
      ? dayjs()
          .set('hour', 11)
          .set('minute', 0)
          .format('HH:mm')
      : ''
  const maxTime = dayjs()
    .set('hour', 20)
    .set('minute', 0)
    .format('HH:mm')
  console.log(minTime)

  return (
    <div className="flex flex-col">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          label="Time"
          views={['hours', 'minutes']}
          format="hh:mm"
          timeSteps={{ minutes: 15 }}
          disablePast={date === today}
          //   minTime={}
          sx={{
            color: 'white',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '& .MuiOutlinedInput-notchedOutline.Mui-focused': {
              border: '2px solid white',
            },
            '& .MuiFormLabel-root': {
              color: 'grey',
            },
            '& .MuiFormLabel-root.Mui-focused': {
              color: 'white',
            },
          }}
        />
        <DigitalClock
          //  label="Time"
          //  views={['hours', 'minutes']}
          //  format="hh:mm"
          timeStep={15}
          disablePast={date === today}
          minTime={dayjs()
            .set('hour', 11)
            .set('minute', 0)}
          maxTime={dayjs()
            .set('hour', 20)
            .set('minute', 0)}
        />
        {/* <DigitalClock timeStep={15} /> */}
      </LocalizationProvider>
    </div>
  )
}

// function curry(func) {
//   return function fn1(...args1) {
//     if (args1.length < func.length) {
//       return function fn2(...args2) {
//         return fn1(...args1, ...args2)
//       }
//     } else {
//       return func(...args1)
//     }
//   }
// }

// const getSum = (a, b, c) => {
//   return a + b + c
// }

// const totalSum = curry(getSum)
// console.log(totalSum(1)(2)(3))

// function add(...args) {
//   let res = 0

//   return function fn1(...asrgs1) {
//     if (asrgs1.length > 0) {
//       return add(...args, ...asrgs1)
//     } else {
//       args.map((arg) => (res += arg))
//       return res
//     }
//   }
// }

// add(1)(2)()

// function add(num) {
//   let res = 0

//   function fn1(num1) {
//     if (num1) {
//       res += num1
//       return fn1
//     } else {
//       return res
//     }
//   }

//   return fn1(num)
// }

// add(1)(2)()
// add()
