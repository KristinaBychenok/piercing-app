import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type FormStateT = {
  name: string
  phone: string
  email: string
  studio: string
  serviceType: string
  service: string
  date: string
  time: string
}

const initState: FormStateT = {
  name: '',
  phone: '',
  email: '',
  studio: '',
  serviceType: 'ears',
  service: '',
  date: '',
  time: '',
}

export const bookingFormSlice = createSlice({
  name: 'formSlice',
  initialState: initState,
  reducers: {
    addName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    addPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload
    },
    addEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    addStudio: (state, action: PayloadAction<string>) => {
      state.studio = action.payload
    },
    addServiceType: (state, action: PayloadAction<string>) => {
      state.serviceType = action.payload
    },
    addService: (state, action: PayloadAction<string>) => {
      state.service = action.payload
    },
    addDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload
    },
    addTime: (state, action: PayloadAction<string>) => {
      state.time = action.payload
    },
    clearForm: (state) => {
      state.name = ''
      state.phone = ''
      state.email = ''
      state.serviceType = ''
      state.service = ''
      state.studio = '1'
      state.date = ''
      state.time = ''
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
  clearForm,
} = bookingFormSlice.actions

export default bookingFormSlice.reducer
