import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type SettingsSliceT = {
  isModalOpen: boolean
  isLoading: boolean
}

const initState: SettingsSliceT = {
  isModalOpen: false,
  isLoading: false,
}

export const settingsSlice = createSlice({
  name: 'settingsSlice',
  initialState: initState,
  reducers: {
    setIsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setIsModalOpen, setIsLoading } = settingsSlice.actions

export default settingsSlice.reducer
