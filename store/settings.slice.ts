import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type SettingsSliceT = {
  isModalOpen: {
    isOpen: boolean
    appointment: number | null
  }
  language: string
}

const initState: SettingsSliceT = {
  isModalOpen: {
    isOpen: false,
    appointment: null,
  },
  language: 'en',
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
  },
})

export const { setIsModalOpen } = settingsSlice.actions

export default settingsSlice.reducer
