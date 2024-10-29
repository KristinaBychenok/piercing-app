import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  DateTime,
  LoadedServicesType,
  LoadedStudiosType,
  LoadedDataSliceType,
} from './index.types'

const initState: LoadedDataSliceType = {
  data: [],
  services: [],
  studios: [],
}

export const loadedDataSlice = createSlice({
  name: 'loadedData',
  initialState: initState,
  reducers: {
    addLoadedData: (state, action: PayloadAction<DateTime[]>) => {
      state.data = action.payload
    },
    addServices: (state, action: PayloadAction<LoadedServicesType[]>) => {
      state.services = action.payload
    },
    addStudios: (state, action: PayloadAction<LoadedStudiosType[]>) => {
      state.studios = action.payload
    },
    clearLoadedData: (state) => {
      state.data = []
      state.services = []
    },
  },
})

export const { addLoadedData, addServices, addStudios, clearLoadedData } =
  loadedDataSlice.actions

export default loadedDataSlice.reducer
