import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type formStateT = {
  name: string
  phone: string
  studio: string
  procedure: string
  date: string
  time: string
}

const initState: formStateT = {
  name: '',
  phone: '',
  studio: '',
  procedure: '',
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
    addStudio: (state, action: PayloadAction<string>) => {
      state.studio = action.payload
    },
    addProcedure: (state, action: PayloadAction<string>) => {
      state.procedure = action.payload
    },
    addDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload
    },
    addTime: (state, action: PayloadAction<string>) => {
      state.time = action.payload
    },
  },
})

export const {
  addName,
  addPhone,
  addStudio,
  addProcedure,
  addDate,
  addTime,
} = bookingFormSlice.actions

export default bookingFormSlice.reducer
