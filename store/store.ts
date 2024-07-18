import formReducer from '../components/form/form.slice'
import loadedDataReducer from './index.slice'
import settingsReducer from '../store/settings.slice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    loadedData: loadedDataReducer,
    bookingForm: formReducer,
    settings: settingsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
