import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type BookingDataT = {
  name: string
  phone: string
  email: string
  studio: string
  serviceType: string
  service: string
  date: string
  time: string
  message: string
}

export type FormStateT = {
  bookingData: BookingDataT
  backup: BookingDataT
}

const initState: FormStateT = {
  bookingData: {
    name: '',
    phone: '',
    email: '',
    studio: '',
    serviceType: 'ears',
    service: '',
    date: '',
    time: '',
    message: '',
  },
  backup: {} as BookingDataT,
}

export const bookingFormSlice = createSlice({
  name: 'formSlice',
  initialState: initState,
  reducers: {
    addName: (state, action: PayloadAction<string>) => {
      state.bookingData.name = action.payload
    },
    addPhone: (state, action: PayloadAction<string>) => {
      state.bookingData.phone = action.payload
    },
    addEmail: (state, action: PayloadAction<string>) => {
      state.bookingData.email = action.payload
    },
    addStudio: (state, action: PayloadAction<string>) => {
      state.bookingData.studio = action.payload
    },
    addServiceType: (state, action: PayloadAction<string>) => {
      state.bookingData.serviceType = action.payload
    },
    addService: (state, action: PayloadAction<string>) => {
      state.bookingData.service = action.payload
    },
    addDate: (state, action: PayloadAction<string>) => {
      state.bookingData.date = action.payload
    },
    addTime: (state, action: PayloadAction<string>) => {
      state.bookingData.time = action.payload
    },
    addMessage: (state, action: PayloadAction<string>) => {
      state.bookingData.message = action.payload
    },
    clearForm: (state) => {
      state.bookingData.name = ''
      state.bookingData.phone = ''
      state.bookingData.email = ''
      state.bookingData.serviceType = ''
      state.bookingData.service = ''
      state.bookingData.studio = '1'
      state.bookingData.date = ''
      state.bookingData.time = ''
      state.bookingData.message = ''
      state.backup = {} as BookingDataT
    },
    addAppointmentData: (state, action: PayloadAction<BookingDataT>) => {
      state.bookingData.name = action.payload.name
      state.bookingData.phone = action.payload.phone
      state.bookingData.email = action.payload.email
      state.bookingData.serviceType = action.payload.serviceType
      state.bookingData.service = action.payload.service
      state.bookingData.studio = action.payload.studio
      state.bookingData.date = action.payload.date
      state.bookingData.time = action.payload.time
      state.bookingData.message = action.payload.message
      state.backup = {
        ...action.payload,
      }
    },
  },
})

export const {
  addName,
  addPhone,
  addEmail,
  addStudio,
  addServiceType,
  addService,
  addDate,
  addTime,
  addMessage,
  clearForm,
  addAppointmentData,
} = bookingFormSlice.actions

export default bookingFormSlice.reducer
