import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DateTime, LoadedDataType, LoadedServicesType } from './index.types'

const initState: LoadedDataType = {
  data: [],
  services: [],
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
    clearLoadedData: (state) => {
      state.data = []
      state.services = []
    },
  },
})

export const { addLoadedData, addServices, clearLoadedData } =
  loadedDataSlice.actions

export default loadedDataSlice.reducer
