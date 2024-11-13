import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type BookingDataT = {
  name: {
    value: string
    isValid: boolean
  }
  phone: {
    value: string
    isValid: boolean
  }
  email: {
    value: string
    isValid: boolean
  }
  studio: string
  serviceType: string
  service: string
  date: string
  time: string
  message: {
    value: string
    isValid: boolean
  }
  acceptAgreement: boolean
  acceptAge: boolean
  appointmentId: string
}

export type FormStateT = {
  bookingData: BookingDataT
  backup: BookingDataT
}

const initState: FormStateT = {
  bookingData: {
    name: {
      value: '',
      isValid: true,
    },
    phone: {
      value: '',
      isValid: true,
    },
    email: {
      value: '',
      isValid: true,
    },
    studio: '',
    serviceType: 'ears',
    service: '',
    date: '',
    time: '',
    message: {
      value: '',
      isValid: true,
    },
    acceptAgreement: false,
    acceptAge: false,
    appointmentId: '',
  },
  backup: {} as BookingDataT,
}

export const bookingFormSlice = createSlice({
  name: 'formSlice',
  initialState: initState,
  reducers: {
    addName: (
      state,
      action: PayloadAction<{
        value: string
        isValid: boolean
      }>
    ) => {
      state.bookingData.name.value = action.payload.value
      state.bookingData.name.isValid = action.payload.isValid
    },
    addPhone: (
      state,
      action: PayloadAction<{
        value: string
        isValid: boolean
      }>
    ) => {
      state.bookingData.phone.value = action.payload.value
      state.bookingData.phone.isValid = action.payload.isValid
    },
    addEmail: (
      state,
      action: PayloadAction<{
        value: string
        isValid: boolean
      }>
    ) => {
      state.bookingData.email.value = action.payload.value
      state.bookingData.email.isValid = action.payload.isValid
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
    addMessage: (
      state,
      action: PayloadAction<{
        value: string
        isValid: boolean
      }>
    ) => {
      state.bookingData.message.value = action.payload.value
      state.bookingData.message.isValid = action.payload.isValid
    },
    addAcceptAgreement: (state) => {
      state.bookingData.acceptAgreement = !state.bookingData.acceptAgreement
    },
    addAcceptAge: (state) => {
      state.bookingData.acceptAge = !state.bookingData.acceptAge
    },
    addAppointmentId: (state, action: PayloadAction<string>) => {
      state.bookingData.appointmentId = action.payload
    },
    clearForm: (state) => {
      state.bookingData.name = {
        value: '',
        isValid: true,
      }
      state.bookingData.phone = {
        value: '',
        isValid: true,
      }
      state.bookingData.email = {
        value: '',
        isValid: true,
      }
      state.bookingData.serviceType = 'ears'
      state.bookingData.service = ''
      state.bookingData.studio = ''
      state.bookingData.date = ''
      state.bookingData.time = ''
      state.bookingData.message = {
        value: '',
        isValid: true,
      }
      state.bookingData.acceptAgreement = false
      state.bookingData.acceptAge = false
      state.bookingData.appointmentId = ''
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
      state.bookingData.acceptAgreement = false
      state.bookingData.acceptAge = false
      state.bookingData.appointmentId = action.payload.appointmentId
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
  addAcceptAgreement,
  addAcceptAge,
  addAppointmentId,
  clearForm,
  addAppointmentData,
} = bookingFormSlice.actions

export default bookingFormSlice.reducer
