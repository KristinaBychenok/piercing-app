import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type SettingsSliceT = {
  isModalOpen: {
    isOpen: boolean
    appointment: number | null
  }
  isLoading: boolean
}

const initState: SettingsSliceT = {
  isModalOpen: {
    isOpen: false,
    appointment: null,
  },
  isLoading: false,
}

export const settingsSlice = createSlice({
  name: 'settingsSlice',
  initialState: initState,
  reducers: {
    setIsModalOpen: (
      state,
      action: PayloadAction<{
        isOpen: boolean
        appointment: number | null
      }>
    ) => {
      state.isModalOpen = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setIsModalOpen, setIsLoading } = settingsSlice.actions

export default settingsSlice.reducer
