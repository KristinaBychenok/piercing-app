import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { LoadedDataType } from './index.types'

const initState: LoadedDataType = {
  data: [],
}

export const loadedDataSlice = createSlice({
  name: 'loadedData',
  initialState: initState,
  reducers: {
    addLoadedData: (state, action: PayloadAction<LoadedDataType>) => {
      state.data = action.payload.data
    },
  },
})

export const { addLoadedData } = loadedDataSlice.actions

export default loadedDataSlice.reducer
