import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type SettingsSliceT = {
  isModalOpen: boolean
  isLoading: boolean
  fetchError: string
}

const initState: SettingsSliceT = {
  isModalOpen: false,
  isLoading: false,
  fetchError: '',
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
    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload
    },
  },
})

export const { setIsModalOpen, setIsLoading, setFetchError } =
  settingsSlice.actions

export default settingsSlice.reducer
